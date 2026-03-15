import { HOSTNAME_REGEX, ORGANIC_EXCLUDE, MOFU_REGEX } from "./sopFilters"

/* =============================================================================
   SOP REFERENCE NOTES
   ─────────────────────────────────────────────────────────────────────────────
   HOSTNAME_REGEX must equal (in sopFilters.ts):
     CD: (?i).*(www.cardekho|hindi.cardekho|tamil.cardekho|telugu.cardekho|
                kannada.cardekho|malayalam.cardekho|ai.cardekho).*
     BD: (?i).*(www.bikedekho|hindi.bikdekho).*

   ORGANIC_EXCLUDE must equal:
     (?i).*(chrome_notification|communication|connecto|moengage|sms|
             cpc|display|facebook|social|whatsapp|NA).*

   MOFU_REGEX must equal:
     (?i).*(price|spec|offer|dealer|compar|disc).*
     field: customEvent:pageTemplates  ← SOP uses pageTemplates (custom dimension)
============================================================================= */

export type GAReportType =
  | "TOFU"
  | "MOFU"
  | "PAGEVIEWS"
  | "TREND"
  | "HEATMAP"
  | "TRAFFIC_EROSION"

interface BuildQueryParams {
  report: GAReportType
  models?: string[] | string
  startDate: string
  endDate: string
  trafficType?: "overall" | "organic" | "inorganic"  // default: "overall"
  heatmapType?: "traffic" | "pageviews" | "mofu"
  targetModel?: string   // used only for TRAFFIC_EROSION
}

export function buildGA4Query({
  report,
  models = [],
  startDate,
  endDate,
  trafficType = "overall",   // SOP default: overall traffic unless specified
  heatmapType,
  targetModel,
}: BuildQueryParams) {

  const modelArray = (Array.isArray(models) ? models : models.split(","))
    .map((m) => m.trim().toLowerCase())
    .filter(Boolean)

  /* ─────────────────────────────────────────────────────────────────────────
     BASE FILTERS — applied to every report per SOP:
       1. hostName matches regex (MANDATORY per SOP for all reports)
       2. trafficType filter (overall = null/no filter; organic/inorganic applied)
       3. pagePathPlusQueryString does NOT contain "used"
       4. pagePath does NOT contain "virtual"  (excludes popup pages)
  ───────────────────────────────────────────────────────────────────────── */

  const baseFilters = [
    hostnameFilter(),
    trafficTypeFilter(trafficType),   // null for "overall" — filtered out by andGroup
    removeUsedFilter(),
    removeVirtualFilter(),
  ]

  switch (report) {

    /* =========================================================================
       TOFU — TOP OF FUNNEL USERS
       SOP: "To know the overall audience/users of a specific model or segment."

       Dimensions: Month, modelName, Session default channel group, page, Hostname
       Metrics:    Views, Total users
       Filters:    base + optional OEM/model regex
    ========================================================================= */

    case "TOFU":
      return {
        dateRanges: [{ startDate, endDate }],

        // SOP dimensions: Month, modelName, Session default channel group, page, Hostname
        dimensions: [
          { name: "yearMonth" },                    // Month
          { name: "customEvent:modelName" },         // modelName
          { name: "sessionDefaultChannelGroup" },    // Session default channel group
          { name: "pagePath" },                      // page
          { name: "hostName" },                      // Hostname
        ],

        // SOP metrics: Views, Total users
        metrics: [  
          { name: "totalUsers" },        // Total users
        ],

        limit: 50000,

        dimensionFilter: andGroup([
          ...baseFilters,
          modelFilter(modelArray),
        ]),
      }

    /* =========================================================================
       MOFU — MIDDLE OF FUNNEL USERS
       SOP: "To know the count of the audience visiting the middle of the funnel
             pages like price, compare, specifications, offer & dealer."

       Dimensions: Month, modelName, Session default channel group, page, Hostname
       Metrics:    Views, Total users
       Filters:    base + pageTemplates matches MOFU regex + optional model
    ========================================================================= */

    case "MOFU":
      return {
        dateRanges: [{ startDate, endDate }],

        // SOP dimensions: Month, modelName, Session default channel group, page, Hostname
        dimensions: [
          { name: "yearMonth" },                    // Month
          { name: "customEvent:modelName" },         // modelName
          { name: "sessionDefaultChannelGroup" },    // Session default channel group
          { name: "pagePath" },                      // page
          { name: "hostName" },                      // Hostname
        ],

        // SOP metrics: Views, Total users
        metrics: [
          { name: "screenPageViews" },   // Views
          { name: "totalUsers" },        // Total users
        ],

        limit: 50000,

        dimensionFilter: andGroup([
          ...baseFilters,
          modelFilter(modelArray),
          mofuFilter(),                  // SOP: pageTemplates MOFU regex
        ]),
      }

    /* =========================================================================
       PAGEVIEWS
       SOP: "To know the count of different pages visited by a user.
             This data is excluding Pop Up Pages."

       Same as TOFU but:
         - Only Views metric (not Total users)
         - virtual exclusion already in baseFilters (removeVirtualFilter)
         - used exclusion already in baseFilters (removeUsedFilter)
    ========================================================================= */

    case "PAGEVIEWS":
      return {
        dateRanges: [{ startDate, endDate }],

        // SOP dimensions: Month, modelName, Session default channel group, page, Hostname
        dimensions: [
          { name: "yearMonth" },                    // Month
          { name: "customEvent:modelName" },         // modelName
          { name: "sessionDefaultChannelGroup" },    // Session default channel group
          { name: "pagePath" },                      // page
          { name: "hostName" },                      // Hostname
        ],

        // SOP metric: Views only
        metrics: [
          { name: "screenPageViews" },   // Views
        ],

        limit: 50000,

        dimensionFilter: andGroup([
          ...baseFilters,
          modelFilter(modelArray),
        ]),
      }

    /* =========================================================================
       TREND
       SOP basis: date × modelName trend for users over time.
       Uses TOFU dimensions reduced to date + modelName for time-series charting.
    ========================================================================= */

    case "TREND":
      return {
        dateRanges: [{ startDate, endDate }],

        dimensions: [
          { name: "date" },                          // daily trend
          { name: "customEvent:modelName" },
        ],

        metrics: [
          { name: "totalUsers" },
        ],

        limit: 50000,

        dimensionFilter: andGroup([
          ...baseFilters,
          modelFilter(modelArray),
        ]),
      }

    /* =========================================================================
       TRAFFIC EROSION
       SOP: "To know what all other models are being visited by the users
             of a specific model."

       Method per SOP:
         - User Segment: modelName exactly matches <targetModel>
         - Condition Scoping: "Within the same event"
         - Rows: modelName
         - Values: TotalUsers
         - Filter: Pagepath + Querystring does not contain "used"
    ========================================================================= */

    case "TRAFFIC_EROSION": {
      if (!targetModel) throw new Error("TRAFFIC_EROSION requires targetModel")

      return {
        dateRanges: [{ startDate, endDate }],

        // SOP: Rows = modelName
        dimensions: [
          { name: "customEvent:modelName" },
        ],

        // SOP: Values = TotalUsers
        metrics: [
          { name: "totalUsers" },
        ],

        limit: 50000,

        dimensionFilter: andGroup([
          hostnameFilter(),

          // SOP: User segment — modelName exactly matches target model
          {
            filter: {
              fieldName: "customEvent:modelName",
              stringFilter: {
                matchType: "EXACT",
                value: targetModel.trim().toLowerCase(),
                caseSensitive: false,
              },
            },
          },

          // SOP Filter: Pagepath + Querystring does not contain "used"
          removeUsedFilter(),

          // Apply traffic type if specified
          trafficTypeFilter(trafficType),
        ]),
      }
    }

    /* =========================================================================
       HEATMAP
       SOP basis: MOFU page template filter over yearMonth × modelName.
       Returns month-wise, model-wise users and views.

       heatmapType:
         "mofu"      → applies MOFU pageTemplates filter (default for heatmap)
         "traffic"   → TOFU-style, no pageTemplate filter
         "pageviews" → pageviews only, no pageTemplate filter
    ========================================================================= */

    case "HEATMAP": {
      const heatmapFilters: any[] = [
        ...baseFilters,
        modelFilter(modelArray),
      ]

      // SOP: heatmap is MOFU-scoped by default; only skip if explicitly "traffic"/"pageviews"
      if (!heatmapType || heatmapType === "mofu") {
        heatmapFilters.push(mofuFilter())
      }

      const heatmapMetrics =
        heatmapType === "pageviews"
          ? [{ name: "screenPageViews" }]
          : [
              { name: "totalUsers" },         // Total users
              { name: "screenPageViews" },    // Views
            ]

      return {
        dateRanges: [{ startDate, endDate }],

        // SOP dimensions for heatmap: yearMonth × modelName
        dimensions: [
          { name: "yearMonth" },
          { name: "customEvent:modelName" },
        ],

        metrics: heatmapMetrics,

        limit: 50000,

        dimensionFilter: andGroup(heatmapFilters),
      }
    }

    default:
      throw new Error(`Unknown report type: ${report}`)
  }
}

/* =============================================================================
   HOSTNAME FILTER
   SOP (mandatory on all reports):
     hostName matches regex HOSTNAME_REGEX
   Uses PARTIAL_REGEXP — correct match type for (?i).*pattern.* style regex.
   FULL_REGEXP requires the regex to match the ENTIRE string; since the SOP
   pattern uses leading/trailing .* it works either way, but PARTIAL_REGEXP
   is semantically correct and consistent with all other regex filters here.
============================================================================= */

function hostnameFilter() {
  return {
    filter: {
      fieldName: "hostName",
      stringFilter: {
        matchType: "PARTIAL_REGEXP",   // PARTIAL_REGEXP — correct for (?i).*….* patterns
        value: HOSTNAME_REGEX,
        caseSensitive: false,
      },
    },
  }
}

/* =============================================================================
   TRAFFIC TYPE FILTER
   SOP (Organic users section):
     Session medium and Session source does NOT match regex ORGANIC_EXCLUDE
     for organic traffic.

   Returns null for "overall" (no filter applied = all traffic).
   The andGroup helper filters out nulls so this is safely ignored.
============================================================================= */

function trafficTypeFilter(type: "overall" | "organic" | "inorganic" = "overall") {

  if (type === "organic") {
    // Organic = exclude all paid/push/social channels
    return {
      notExpression: {
        filter: {
          fieldName: "sessionSourceMedium",
          stringFilter: {
            matchType: "PARTIAL_REGEXP",   // PARTIAL_REGEXP correct for (?i).*….* patterns
            value: ORGANIC_EXCLUDE,
            caseSensitive: false,
          },
        },
      },
    }
  }

  if (type === "inorganic") {
    // Inorganic = ONLY paid/push/social channels
    return {
      filter: {
        fieldName: "sessionSourceMedium",
        stringFilter: {
          matchType: "PARTIAL_REGEXP",
          value: ORGANIC_EXCLUDE,
          caseSensitive: false,
        },
      },
    }
  }

  // "overall" → return null → andGroup filters it out → no traffic restriction
  return null
}

/* =============================================================================
   REMOVE USED PAGES FILTER
   SOP: Page Path + query string does not contain "used"
   Applied to ALL reports including Traffic Erosion.
============================================================================= */

function removeUsedFilter() {
  return {
    notExpression: {
      filter: {
        fieldName: "pagePathPlusQueryString",
        stringFilter: {
          matchType: "CONTAINS",
          value: "used",
          caseSensitive: false,
        },
      },
    },
  }
}

/* =============================================================================
   REMOVE VIRTUAL / POPUP PAGES FILTER
   SOP (Page Views section): Page does not contain "virtual"
   Excludes pop-up pages from all page view counts.
   Renamed from removePopupFilter → removeVirtualFilter to match SOP language.
============================================================================= */

function removeVirtualFilter() {
  return {
    notExpression: {
      filter: {
        fieldName: "pagePath",
        stringFilter: {
          matchType: "CONTAINS",
          value: "virtual",
          caseSensitive: false,
        },
      },
    },
  }
}

/* =============================================================================
   MOFU PAGE TEMPLATE FILTER
   SOP: pageTemplate matches regex (?i).*(price|spec|offer|dealer|compar|disc).*

   CRITICAL FIX: field must be "customEvent:pageTemplates" (GA4 custom dimension)
   NOT "pageTemplate" (standard dimension that does not exist in GA4).
   The SOP exploration screenshots show "pageTemplates" as a custom dimension.
============================================================================= */

function mofuFilter() {
  return {
    filter: {
      fieldName: "customEvent:pageTemplates",   // SOP: custom dimension pageTemplates
      stringFilter: {
        matchType: "PARTIAL_REGEXP",             // PARTIAL_REGEXP correct for (?i).*….*
        value: MOFU_REGEX,
        caseSensitive: false,
      },
    },
  }
}

/* =============================================================================
   MODEL FILTER
   SOP: modelName matches regex (for multiple models: honda city|honda civic|honda amaze)
        OemName matches regex  (for multiple OEMs:   honda|maruti|hyundai)

   Normalises model name: replaces hyphens/underscores with spaces,
   then builds a word-order-flexible regex (word1.*word2.*word3).
   Checks both "customEvent:modelName" (custom dim) and fallback "modelName".
============================================================================= */

function modelFilter(models: string[]) {
  if (!models || models.length === 0) return null

  return {
    orGroup: {
      expressions: models.map((model) => {

        const normalized = model
          .toLowerCase()
          .replace(/[_-]/g, " ")
          .trim()

        // Build word-order-flexible regex: "honda city" → "honda.*city"
        const regex = normalized
          .split(" ")
          .filter(Boolean)
          .join(".*")

        // Check both custom event dimension and standard dimension fallback
        return {
          orGroup: {
            expressions: [
              {
                filter: {
                  fieldName: "customEvent:modelName",
                  stringFilter: {
                    matchType: "PARTIAL_REGEXP",
                    value: regex,
                    caseSensitive: false,
                  },
                },
              },
              {
                filter: {
                  fieldName: "modelName",
                  stringFilter: {
                    matchType: "PARTIAL_REGEXP",
                    value: regex,
                    caseSensitive: false,
                  },
                },
              },
            ],
          },
        }
      }),
    },
  }
}

/* =============================================================================
   AND GROUP HELPER
   Combines multiple filter expressions with AND logic.
   Automatically filters out null values (e.g. when trafficType = "overall").
============================================================================= */

function andGroup(expressions: (object | null | undefined)[]) {
  const valid = expressions.filter(Boolean)

  if (valid.length === 0) return undefined
  if (valid.length === 1) return valid[0]

  return {
    andGroup: {
      expressions: valid,
    },
  }
}