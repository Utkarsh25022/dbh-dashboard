import useSWR from "swr"
import { DateRange } from "react-day-picker"
const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error("API request failed")
    }
    return res.json()
  })

import {
  kpiData,
  trendData,
  funnelData,
  trafficShareData,
  competitorData,
  deviceData,
  engagementTrendData,
  geographicData,
} from "./mock-data"

import type {
  KPIData,
  TrendPoint,
  FunnelStage,
  TrafficShareItem,
  CompetitorRow,
  DeviceData,
  EngagementTrendPoint,
  GeographicData,
} from "./types"

/* ------------------------------------------------ */
/* BASE URL HELPER (WORKS ON LAPTOP + PHONE) */
/* ------------------------------------------------ */

function getBaseURL() {
  if (typeof window !== "undefined") {
    return window.location.origin
  }
  return ""
}

/* ------------------------------------------------ */
/* DATE HELPER */
/* ------------------------------------------------ */

function buildDateParams(dateRange?: DateRange) {

  const today = new Date()
  const todayStr = today.toISOString().split("T")[0]

  if (!dateRange?.from) {
    return { start: "7daysAgo", end: "today" }
  }

  const start = dateRange.from.toISOString().split("T")[0]

  let end = dateRange.to
    ? dateRange.to.toISOString().split("T")[0]
    : start

  if (new Date(end) > today) end = todayStr

  return { start, end }
}

/* ------------------------------------------------ */
/* MODEL NORMALIZER */
/* ------------------------------------------------ */

function buildModelList(selectedModel: string | null, competitors: string[]) {

  if (!selectedModel) return []

  const list =
    [...new Set([selectedModel, ...competitors])]
      .map((m) => m?.toLowerCase().trim())
      .filter(Boolean)

  console.log("MODEL LIST:", list)

  return list
}

/* ------------------------------------------------ */
/* UNIVERSAL FETCHER */
/* ------------------------------------------------ */

async function apiFetcher<T>(url: string, fallback: T): Promise<T> {

  try {

    const res = await fetch(`${getBaseURL()}${url}`)

    if (!res.ok) throw new Error(`API error: ${res.status}`)

    const json = await res.json()

    if (json?.success && json?.data !== undefined) {
      return json.data
    }

    return json

  } catch (err) {

    console.error("API fallback triggered:", url, err)

    return fallback
  }
}

/* ------------------------------------------------ */
/* TREND FETCHER */
/* ------------------------------------------------ */

async function trendFetcher(url: string): Promise<TrendPoint[]> {

  try {

    const res = await fetch(`${getBaseURL()}${url}`)

    if (!res.ok) throw new Error(`Trend API error: ${res.status}`)

    const json = await res.json()

    if (json?.success && Array.isArray(json?.data)) {
      return json.data
    }

    return []

  } catch (err) {

    console.error("Trend API failed:", err)

    return []
  }
}

/* ------------------------------------------------ */
/* KPI DATA */
/* ------------------------------------------------ */

// export function useKPIData(
//   selectedModel: string | null,
//   competitors: string[],
//   dateRange?: DateRange,
//   trafficType: "overall" | "organic" | "inorganic" = "overall"
// ) {

//   const { start, end } = buildDateParams(dateRange)

//   const modelList = buildModelList(selectedModel, competitors)

//   const models = modelList.join(",")

//   const url =
//     `/api/analytics/overview?models=${models}&start=${start}&end=${end}&traffic=${trafficType}`

//   return useSWR<KPIData>(
//     ["kpi", models, start, end, trafficType],
//     () => apiFetcher(url, kpiData),
//     {
//       revalidateOnFocus: false,
//       dedupingInterval: 60000,
//     }
//   )
// }

/* ------------------------------------------------ */
/* TREND DATA */
/* ------------------------------------------------ */

export function useTrendData(
  selectedModel: string | null,
  competitors: string[],
  dateRange?: DateRange,
  trafficType: "overall" | "organic" | "inorganic" = "overall"
) {

  const { start, end } = buildDateParams(dateRange)

  const modelList = buildModelList(selectedModel, competitors)

  const models = modelList.join(",")

  const url =
    `/api/analytics/trend?models=${models}&start=${start}&end=${end}&traffic=${trafficType}`

  return useSWR<TrendPoint[]>(
  selectedModel
    ? ["trend", models, start, end, trafficType]
    : null,
  () => trendFetcher(url),
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
      fallbackData: [],
    }
  )
}

/* ------------------------------------------------ */
/* FUNNEL DATA */
/* ------------------------------------------------ */
export function useFunnelData(
  selectedModel: string | null,
  competitors: string[],
  dateRange?: DateRange,
  trafficType: "overall" | "organic" | "inorganic" = "overall"
) {

  const { start, end } = buildDateParams(dateRange)

  const models = selectedModel ?? ""

  const url =
    `/api/analytics/funnel?models=${models}&start=${start}&end=${end}&traffic=${trafficType}`

  return useSWR<FunnelStage[]>(
    selectedModel
      ? ["funnel", selectedModel, start, end, trafficType]
      : null,
    () => apiFetcher(url, funnelData),
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  )
}

/* ------------------------------------------------ */
/* TRAFFIC SHARE */
/* ------------------------------------------------ */

export function useTrafficShareData(
  selectedModel: string | null,
  competitors: string[],
  dateRange?: DateRange,
  trafficType: "overall" | "organic" | "inorganic" = "overall"
) {

  const { start, end } = buildDateParams(dateRange)

  const modelList = buildModelList(selectedModel, competitors)

  const models = modelList.join(",")

  const url =
    `/api/analytics/traffic?models=${models}&start=${start}&end=${end}&traffic=${trafficType}`

  return useSWR<TrafficShareItem[]>(
    selectedModel
      ? ["traffic-share", models, start, end, trafficType]
      : null,
    () => apiFetcher(url, trafficShareData),
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  )
}

/* ------------------------------------------------ */
/* COMPETITOR DATA */
/* ------------------------------------------------ */

function normalizeModel(name: string) {

  if (!name) return ""

  return name
    .toLowerCase()
    .replace(/\d{4}-\d{4}/g, "")
    .replace(/[_-]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

export function useCompetitorData(
  selectedModel: string | null,
  competitors: string[],
  dateRange?: DateRange
) {

  const focus =
    selectedModel ? normalizeModel(selectedModel) : null

  const { data, error, isLoading } = useSWR(
    focus
      ? `/api/analytics/competitors?focus=${encodeURIComponent(focus)}`
      : null,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000
    }
  )

  let rows: CompetitorRow[] = []

  if (data?.data) {

    const apiRows = data.data

    const normalizedCompetitors =
      competitors.map(normalizeModel)

    const filteredRows =
      normalizedCompetitors.length > 0
        ? apiRows.filter((r: any) =>
            normalizedCompetitors.includes(
              normalizeModel(r.model)
            )
          )
        : apiRows

    rows = filteredRows.map((r: any) => ({

      model: normalizeModel(r.model),

      trafficErosionRank:
        r.trafficErosionRank ?? null,

      reverseErosionRank:
        r.reverseErosionRank ?? null,

      performance:
        r.performance ?? null

    }))

    rows.sort(
      (a, b) =>
        (a.trafficErosionRank ?? 999) -
        (b.trafficErosionRank ?? 999)
    )
  }

  return {
    data: rows,
    isLoading
  }
}

/* ------------------------------------------------ */
/* DEVICE DATA */
/* ------------------------------------------------ */

export function useDeviceData(
  selectedModel: string | null,
  competitors: string[],
  dateRange?: DateRange,
  trafficType: "overall" | "organic" | "inorganic" = "overall"
) {

  const { start, end } = buildDateParams(dateRange)

  const models = selectedModel ?? ""

  const url =
    `/api/analytics/device-summary?models=${models}&start=${start}&end=${end}&traffic=${trafficType}`

  return useSWR<DeviceData[]>(
    selectedModel
      ? ["device", selectedModel, start, end, trafficType]
      : null,
    () => apiFetcher(url, deviceData),
    {
      revalidateOnFocus: false
    }
  )
}

/* ------------------------------------------------ */
/* ENGAGEMENT DATA */
/* ------------------------------------------------ */

export function useEngagementData(
  selectedModel: string | null,
  competitors: string[],
  dateRange?: DateRange,
  trafficType: "overall" | "organic" | "inorganic" = "overall"
) {

  const { start, end } = buildDateParams(dateRange)

  const modelList = buildModelList(selectedModel, competitors)

  const models = modelList.join(",")

  const url =
    `/api/analytics/engagement?models=${models}&start=${start}&end=${end}&traffic=${trafficType}`

  return useSWR<EngagementTrendPoint[]>(

    ["engagement", models, start, end, trafficType],

    async () => {

      const raw = await apiFetcher<any[]>(url, engagementTrendData)

      if (!Array.isArray(raw)) return []

      return raw.map((d) => ({
        date: d.date,
        pv_uu: Number(d.pv_uu ?? 0),
        avg_session_duration: Number(d.avg_session_duration ?? 0)
      }))

    },

    { revalidateOnFocus: false }

  )
}

/* ------------------------------------------------ */
/* GEOGRAPHIC DATA */
/* ------------------------------------------------ */

export function useGeographicData(
  selectedModel: string | null,
  competitors: string[],
  dateRange?: DateRange,
  trafficType: "overall" | "organic" | "inorganic" = "overall"
) {

  const { start, end } = buildDateParams(dateRange)

  const models = selectedModel ?? ""

  const url =
    `/api/analytics/country-summary?models=${models}&start=${start}&end=${end}&traffic=${trafficType}`

  return useSWR<GeographicData[]>(

    selectedModel
      ? ["geo", selectedModel, start, end, trafficType]
      : null,

    async () => {

      const raw = await apiFetcher<any[]>(url, geographicData)

      if (!Array.isArray(raw)) return []

      return raw.map((d) => ({
        state: d.state ?? "Unknown",
        city: d.city ?? "Unknown",
        visits: Number(d.visits ?? 0)
      }))

    },

    { revalidateOnFocus: false }

  )
}

/* ------------------------------------------------ */
/* HEATMAP DATA */
/* ------------------------------------------------ */

function buildHeatmapDateParams(dateRange?: DateRange) {

  const today = new Date()
  const todayStr = today.toISOString().split("T")[0]

  if (!dateRange?.from) {
    return { start: "6monthsAgo", end: "today" }
  }

  const fromDate = new Date(dateRange.from)
  fromDate.setDate(1)
  const start = fromDate.toISOString().split("T")[0]

  let toDate = dateRange.to ? new Date(dateRange.to) : new Date(dateRange.from)
  toDate = new Date(toDate.getFullYear(), toDate.getMonth() + 1, 0)
  let end = toDate.toISOString().split("T")[0]

  if (new Date(end) > today) end = todayStr

  return { start, end }
}

export function useHeatmapData(
  selectedModel: string | null,
  competitors: string[],
  dateRange?: DateRange,
  trafficType: "overall" | "organic" | "inorganic" = "overall"
) {

  const { start, end } = buildHeatmapDateParams(dateRange)

  const models =
    [selectedModel, ...competitors]
      .filter(Boolean)
      .join(",")

  const url =
    selectedModel
      ? `/api/analytics/heatmap?models=${models}&start=${start}&end=${end}&traffic=${trafficType}`
      : null

  return useSWR(
    url,
    (url) => apiFetcher(url,{
      traffic:{months:[],rows:[]},
      pageviews:{months:[],rows:[]},
      pvs:{months:[],rows:[]},
      mofu:{months:[],rows:[]}
    }),
    { revalidateOnFocus:false }
  )
}

/* ------------------------------------------------ */
/* AUDIENCE DATA (AGE + GENDER) */
/* ------------------------------------------------ */

export function useAudienceData(
  selectedModel: string | null,
  competitors: string[],
  dateRange?: DateRange
) {

  const { start, end } = buildDateParams(dateRange)

  const models = selectedModel ?? ""

  const url =
    `/api/analytics/audience?models=${models}&start=${start}&end=${end}`

  return useSWR(
    selectedModel
      ? ["audience", selectedModel, start, end]
      : null,
    () =>
      apiFetcher(url, {
        gender: [],
        age: []
      }),
    { revalidateOnFocus: false }
  )
}

