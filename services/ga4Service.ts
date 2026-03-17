
import { BetaAnalyticsDataClient } from "@google-analytics/data"

/* ----------------------------- */
/* VALID METRICS */
/* ----------------------------- */

const VALID_METRICS = [
  "totalUsers",
  "sessions",
  "engagementRate",
  "averageSessionDuration",
  "screenPageViews"
]

function validateMetrics(metrics: { name: string }[]) {
  for (const metric of metrics) {
    if (!VALID_METRICS.includes(metric.name)) {
      throw new Error(`Invalid GA metric used: ${metric.name}`)
    }
  }
}

/* ----------------------------- */
/* SINGLETON CLIENT */
/* ----------------------------- */

let client: BetaAnalyticsDataClient | null = null

function getClient() {
  if (!client) {
    client = new BetaAnalyticsDataClient({
      keyFilename: process.env.GA_KEY_FILE,
      private_key: process.env.GA_PRIVATE_KEY?.replace(/\\n/g, "\n")
    })
  }
  return client
}

/* ----------------------------- */
/* SIMPLE CACHE */
/* ----------------------------- */

const gaCache = new Map<string, any>()
const CACHE_TTL = 60000

function getCacheKey(request: any) {
  return JSON.stringify(request)
}

function getCache(key: string) {
  const cached = gaCache.get(key)
  if (!cached) return null

  if (Date.now() - cached.timestamp > CACHE_TTL) {
    gaCache.delete(key)
    return null
  }

  return cached.value
}

function setCache(key: string, value: any) {
  gaCache.set(key, {
    value,
    timestamp: Date.now()
  })
}

/* ----------------------------- */
/* DATE HELPERS */
/* ----------------------------- */

const GA4_RELATIVE_DATE = /^(\d+daysAgo|today|yesterday)$/i
function formatLocalDate(date: Date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, "0")
  const d = String(date.getDate()).padStart(2, "0")
  return `${y}-${m}-${d}`
}

function clampDateRange(startDate: string, endDate: string) {

  if (GA4_RELATIVE_DATE.test(startDate) || GA4_RELATIVE_DATE.test(endDate)) {
    return { startDate, endDate }
  }

  const start = new Date(startDate)
  const end = new Date(endDate)

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return { startDate: "180daysAgo", endDate: "today" }
  }

  const diff = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)

  if (diff > 30) {
    start.setDate(end.getDate() - 30)
  }

  return {
  startDate: formatLocalDate(start),
  endDate: formatLocalDate(end)
}
}

function clampHeatmapDateRange(startDate: string, endDate: string) {

  if (GA4_RELATIVE_DATE.test(startDate) || GA4_RELATIVE_DATE.test(endDate)) {
    return { startDate, endDate }
  }

  const start = new Date(startDate)
  const end = new Date(endDate)

  const diff = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)

  if (diff > 365) {

    const newStart = new Date(end)
    newStart.setMonth(newStart.getMonth() - 12)

    return {
  startDate: formatLocalDate(newStart),
  endDate: formatLocalDate(end)
}
  }

  return { startDate, endDate }
}

/* ----------------------------- */
/* HOSTNAME FILTER */
/* ----------------------------- */

function hostnameFilter() {
  return {
    filter: {
      fieldName: "hostName",
      stringFilter: {
        matchType: "FULL_REGEXP",
        value:
          "(?i).*(www.cardekho|hindi.cardekho|tamil.cardekho|telugu.cardekho|kannada.cardekho|malayalam.cardekho|ai.cardekho).*"
      }
    }
  }
}

/* ----------------------------- */
/* GLOBAL FILTERS */
/* ----------------------------- */

function buildGlobalFilters() {
  return [

    hostnameFilter(),

    {
      notExpression: {
        filter: {
          fieldName: "pagePathPlusQueryString",
          stringFilter: {
            matchType: "CONTAINS",
            value: "used"
          }
        }
      }
    },

    {
      notExpression: {
        filter: {
          fieldName: "customEvent:page",
          stringFilter: {
            matchType: "CONTAINS",
            value: "virtual"
          }
        }
      }
    }

  ]
}

/* ----------------------------- */
/* PAGE VIEW FILTER */
/* ----------------------------- */

function pageViewFilter() {
  return {
    filter: {
      fieldName: "eventName",
      stringFilter: {
        value: "page_view"
      }
    }
  }
}

/* ----------------------------- */
/* SAFE GA EXECUTION */
/* ----------------------------- */

async function runGA4Report(request: any) {

  const key = getCacheKey(request)
  const cached = getCache(key)

  if (cached) return cached

  const client = getClient()

  if (request.metrics) validateMetrics(request.metrics)

  const response = await client.runReport(request)

  setCache(key, response)

  return response
}

/* ----------------------------- */
/* TRAFFIC (TOFU) */
/* ----------------------------- */

export async function fetchTraffic(
  propertyId: string,
  startDate: string,
  endDate: string
) {

  const range = clampDateRange(startDate, endDate)

  const request = {

    property: `properties/${propertyId}`,

    dateRanges: [{ startDate: range.startDate, endDate: range.endDate }],

    dimensions: [
      { name: "date" },
      { name: "customEvent:modelName" }
    ],

    metrics: [
      { name: "totalUsers" },
      { name: "screenPageViews" }
    ],

    dimensionFilter: {
      andGroup: {
        expressions: [
          ...buildGlobalFilters(),
          pageViewFilter()
        ]
      }
    },

    limit: 10000
  }

  const [response]: any = await runGA4Report(request)

  return response?.rows || []
}

/* ----------------------------- */
/* PAGE BEHAVIOUR (MOFU) */
/* ----------------------------- */

export async function fetchPageBehaviour(
  propertyId: string,
  startDate: string,
  endDate: string
) {

  const range = clampDateRange(startDate, endDate)

  const request = {

    property: `properties/${propertyId}`,

    dateRanges: [{ startDate: range.startDate, endDate: range.endDate }],

    dimensions: [{ name: "customEvent:modelName" }],

    metrics: [
      { name: "totalUsers" },
      { name: "screenPageViews" }
    ],

    dimensionFilter: {
      andGroup: {
        expressions: [
          ...buildGlobalFilters(),
          pageViewFilter(),
          {
            filter: {
              fieldName: "customEvent:pageTemplates",
              stringFilter: {
                matchType: "FULL_REGEXP",
                value: "(?i).*(price|spec|offer|dealer|compar|disc).*"
              }
            }
          }
        ]
      }
    },

    limit: 10000
  }

  const [response]: any = await runGA4Report(request)

  return response?.rows || []
}

/* ----------------------------- */
/* ORGANIC / INORGANIC FILTER */
/* ----------------------------- */

const ORGANIC_EXCLUDE =
  "(?i).*(chrome_notification|communication|connecto|moengage|sms|cpc|display|facebook|social|whatsapp|NA).*"

function trafficFilter(type: "overall" | "organic" | "inorganic") {

  if (type === "organic") {
    return {
      notExpression: {
        filter: {
          fieldName: "sessionSourceMedium",
          stringFilter: {
            matchType: "FULL_REGEXP",
            value: ORGANIC_EXCLUDE
          }
        }
      }
    }
  }

  if (type === "inorganic") {
    return {
      filter: {
        fieldName: "sessionSourceMedium",
        stringFilter: {
          matchType: "FULL_REGEXP",
          value: ORGANIC_EXCLUDE
        }
      }
    }
  }

  return null
}

/* ----------------------------- */
/* HEATMAP */
/* ----------------------------- */
export async function fetchHeatmap(
  propertyId: string,
  startDate: string,
  endDate: string,
  models: string[] = [],
  trafficType: "overall" | "organic" | "inorganic" = "overall",
  funnel?: "mofu"
) {

  const range = clampHeatmapDateRange(startDate, endDate)

  const modelFilterExpressions = models.length
    ? [{
        orGroup: {
          expressions: models.map(model => ({
            filter: {
              fieldName: "customEvent:modelName",
              stringFilter: {
                matchType: "FULL_REGEXP",
                value: `(?i).*${model.replace(/[_-]/g,".*")}.*`
              }
            }
          }))
        }
      }]
    : []

  const trafficFilterExpression = trafficFilter(trafficType)

  const filters:any[] = [
    ...buildGlobalFilters(),
    ...modelFilterExpressions,
    pageViewFilter()
  ]

  if (funnel === "mofu") {
    filters.push({
      filter: {
        fieldName: "customEvent:pageTemplates",
        stringFilter: {
          matchType: "FULL_REGEXP",
          value: "(?i).*(price|spec|offer|dealer|compar|disc).*"
        }
      }
    })
  }

  if (trafficFilterExpression) {
    filters.push(trafficFilterExpression)
  }

  const request = {

    property: `properties/${propertyId}`,

    dateRanges: [
      { startDate: range.startDate, endDate: range.endDate }
    ],

    dimensions: [
      { name: "yearMonth" },
      { name: "customEvent:modelName" }
    ],

    metrics: [
      { name: "totalUsers" },
      { name: "screenPageViews" }
    ],

    dimensionFilter: {
      andGroup: {
        expressions: filters
      }
    },

    limit: 10000
  }

 const [response]: any = await runGA4Report(request)

const rows = response?.rows || []

const filteredResult = rows.filter(r => {

  const model = r.dimensionValues?.[1]?.value

  return model &&
    model !== "(not set)" &&
    model !== "unknown"
})

return filteredResult
}


export async function fetchAudience(
  propertyId: string,
  startDate: string,
  endDate: string,
  models: string[] = []
) {

  const range = clampDateRange(startDate, endDate)

  const modelFilterExpressions = models.length
    ? [{
        orGroup: {
          expressions: models.map(model => ({
            filter: {
              fieldName: "customEvent:modelName",
              stringFilter: {
                matchType: "FULL_REGEXP",
                value: `(?i).*${model.replace(/[_-]/g,".*")}.*`
              }
            }
          }))
        }
      }]
    : []

  const request = {

    property: `properties/${propertyId}`,

    dateRanges: [
      { startDate: range.startDate, endDate: range.endDate }
    ],

    dimensions: [
      { name: "userGender" },
      { name: "userAgeBracket" },
      { name: "customEvent:modelName" }
    ],

    metrics: [
      { name: "totalUsers" }
    ],

    dimensionFilter: {
      andGroup: {
        expressions: [
          ...buildGlobalFilters(),
          ...modelFilterExpressions
        ]
      }
    },

    limit: 10000
  }

  const [response]: any = await runGA4Report(request)

  return response?.rows || []
}

