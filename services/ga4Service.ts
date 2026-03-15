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
      credentials: {
        client_email: process.env.GA_CLIENT_EMAIL,
        private_key: process.env.GA_PRIVATE_KEY?.replace(/\\n/g, "\n")
      }
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
    startDate: start.toISOString().split("T")[0],
    endDate: end.toISOString().split("T")[0]
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
      startDate: newStart.toISOString().split("T")[0],
      endDate: end.toISOString().split("T")[0]
    }
  }

  return {
    startDate,
    endDate
  }
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
  return {
    andGroup: {
      expressions: [
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
              fieldName: "pagePath",
              stringFilter: {
                matchType: "CONTAINS",
                value: "virtual"
              }
            }
          }
        }
      ]
    }
  }
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

  try {

    const response = await client.runReport(request)

    setCache(key, response)

    return response

  } catch (error) {

    console.error("GA4 error:", error)
    throw error

  }
}

/* ----------------------------- */
/* TRAFFIC (TOFU) */
/* ----------------------------- */

export async function fetchTraffic(
  propertyId: string,
  startDate: string,
  endDate: string,
  baseModel?: string
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
          buildGlobalFilters(),
          pageViewFilter()
        ]
      }
    },

    limit: 50000
  }

  const [response]: any = await runGA4Report(request)

  return response?.rows || []
}

/* ----------------------------- */
/* PAGE BEHAVIOUR */
/* ----------------------------- */

/* ----------------------------- */
/* PAGE BEHAVIOUR (MOFU PAGES) */
/* ----------------------------- */

export async function fetchPageBehaviour(
  propertyId: string,
  startDate: string,
  endDate: string
) {

  const range = clampDateRange(startDate, endDate)

  const request = {

    property: `properties/${propertyId}`,

    dateRanges: [
      {
        startDate: range.startDate,
        endDate: range.endDate
      }
    ],

    dimensions: [
      { name: "customEvent:modelName" },
    ],

    metrics: [
      { name: "totalUsers" },
      { name: "screenPageViews" }
    ],

    dimensionFilter: {
      andGroup: {
        expressions: [

          buildGlobalFilters(),

          {
            filter: {
              fieldName: "customEvent:pageTemplates",
              stringFilter: {
                matchType: "PARTIAL_REGEXP",
                value: "(?i).*(price|spec|offer|dealer|compar|disc).*"
              }
            }
          }

        ]
      }
    },

    limit: 50000
  }

  const [response]: any = await runGA4Report(request)

  return response?.rows || []
}



/* ----------------------------- */
/* ENGAGEMENT (PV/UU) */
/* ----------------------------- */

export async function fetchEngagement(
  propertyId: string,
  startDate: string,
  endDate: string
) {

  const range = clampDateRange(startDate, endDate)

  const request = {

    property: `properties/${propertyId}`,

    dateRanges: [
      {
        startDate: range.startDate,
        endDate: range.endDate
      }
    ],

    dimensions: [
      { name: "date" },
      { name: "customEvent:modelName" }
    ],

    metrics: [
      { name: "screenPageViews" },
      { name: "totalUsers" },
      { name: "averageSessionDuration" }
    ],

    /* IMPORTANT: NO pageViewFilter() */

    dimensionFilter: {
      andGroup: {
        expressions: [
          buildGlobalFilters()
        ]
      }
    },

    limit: 50000
  }

  const [response]: any = await runGA4Report(request)

  if (!response?.rows) return []

  const monthModelMap: any = {}

  response.rows.forEach((row: any) => {

    const date = row.dimensionValues?.[0]?.value
    const model = row.dimensionValues?.[1]?.value || "(not_set)"

    const month = date.slice(0,6)

    const key = `${month}_${model}`

    const pv = Number(row.metricValues?.[0]?.value ?? 0)
    const users = Number(row.metricValues?.[1]?.value ?? 0)
    const duration = Number(row.metricValues?.[2]?.value ?? 0)

    if (!monthModelMap[key]) {
      monthModelMap[key] = {
        month,
        model,
        pv: 0,
        users: 0,
        duration: 0,
        days: 0
      }
    }

    monthModelMap[key].pv += pv
    monthModelMap[key].users += users
    monthModelMap[key].duration += duration
    monthModelMap[key].days += 1

  })

  return Object.values(monthModelMap).map((m:any)=>({

    month: `${m.month.slice(0,4)}-${m.month.slice(4,6)}`,

    model: m.model,

    /* PV per User */
    pv_uu: m.users
      ? Number((m.pv / m.users).toFixed(2))
      : 0,

    /* Session Duration (minutes) */
    avg_session_duration: m.days
      ? Number((m.duration / m.days / 60).toFixed(2))
      : 0

  }))
}

/* ----------------------------- */
/* HEATMAP */
/* ----------------------------- */
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
            value: ORGANIC_EXCLUDE,
            caseSensitive: false
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
          value: ORGANIC_EXCLUDE,
          caseSensitive: false
        }
      }
    }

  }

  return null
}
export async function fetchHeatmap(
  propertyId: string,
  startDate: string,
  endDate: string,
  models: string[] = [],
  trafficType: "overall" | "organic" | "inorganic" = "overall"
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
                value: `(?i).*${model.replace(/[_-]/g,".*")}.*`,
                caseSensitive: false
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
      { name: "yearMonth" },
      { name: "customEvent:modelName" }
    ],

    metrics: [
      { name: "totalUsers" },
      { name: "screenPageViews" }
    ],

    dimensionFilter: {
      andGroup: {
        expressions: [
          buildGlobalFilters(),
          ...modelFilterExpressions,
          {
            filter: {
              fieldName: "customEvent:pageTemplates",
              stringFilter: {
                matchType: "PARTIAL_REGEXP",
                value: "(?i).*(price|spec|offer|dealer|compar|disc).*"
              }
            }
          }
        ]
      }
    },

    limit: 50000
  }

  try {

    const [response]: any = await runGA4Report(request)

    return response?.rows || []

  } catch (error) {

    console.error("Heatmap API error:", error)
    return []

  }
}
/* ----------------------------- */
/* TRAFFIC EROSION (COMPETITOR) */
/* ----------------------------- */

/* ----------------------------- */
/* TRAFFIC EROSION (COMPETITOR) */
/* ----------------------------- */

export async function fetchTrafficErosion(
  propertyId: string,
  startDate: string,
  endDate: string,
  baseModel: string
) {

  const range = clampDateRange(startDate, endDate)

  const request = {

    property: `properties/${propertyId}`,

    dateRanges: [
      { startDate: range.startDate, endDate: range.endDate }
    ],

    dimensions: [
      { name: "customEvent:modelName" }
    ],

    metrics: [
      { name: "totalUsers" }
    ],

    dimensionFilter: {
      andGroup: {
        expressions: [
          buildGlobalFilters(),
          pageViewFilter()
        ]
      }
    },

    /* USER SEGMENT = VISITED BASE MODEL */

    segments: [
      {
        userSegment: {
          segmentFilters: [
            {
              simpleSegment: {
                orFiltersForSegment: [
                  {
                    segmentFilterClauses: [
                      {
                        dimensionFilter: {
                          filter: {
                            fieldName: "customEvent:modelName",
                            stringFilter: {
                              matchType: "FULL_REGEXP",
                              value: `(?i).*${baseModel.replace(/[_-]/g,".*")}.*`
                            }
                          }
                        }
                      }
                    ]
                  }
                ]
              }
            }
          ]
        }
      }
    ],

    limit: 50000
  }

  try {

    const [response]: any = await runGA4Report(request)

    return response?.rows || []

  } catch (error) {

    console.error("Traffic erosion API error:", error)

    return []

  }
}