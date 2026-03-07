// // // // // // // import useSWR from "swr"
// // // // // // // import { DateRange } from "react-day-picker"

// // // // // // // import {
// // // // // // //   kpiData,
// // // // // // //   trendData,
// // // // // // //   funnelData,
// // // // // // //   trafficShareData,
// // // // // // //   competitorData,
// // // // // // //   deviceData,
// // // // // // //   engagementTrendData,
// // // // // // //   geographicData,
// // // // // // // } from "./mock-data"

// // // // // // // import type {
// // // // // // //   KPIData,
// // // // // // //   TrendPoint,
// // // // // // //   FunnelStage,
// // // // // // //   TrafficShareItem,
// // // // // // //   CompetitorRow,
// // // // // // //   DeviceData,
// // // // // // //   EngagementTrendPoint,
// // // // // // //   GeographicData,
// // // // // // // } from "./types"

// // // // // // // const API_BASE =
// // // // // // //   process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000"

// // // // // // // //
// // // // // // // // DATE HELPER
// // // // // // // //
// // // // // // // function buildDateParams(dateRange?: DateRange) {
// // // // // // //   const today = new Date()
// // // // // // //   const todayStr = today.toISOString().split("T")[0]

// // // // // // //   if (!dateRange?.from) {
// // // // // // //     return { start: "7daysAgo", end: "today" }
// // // // // // //   }

// // // // // // //   const start = dateRange.from.toISOString().split("T")[0]

// // // // // // //   let end = dateRange.to
// // // // // // //     ? dateRange.to.toISOString().split("T")[0]
// // // // // // //     : start

// // // // // // //   if (new Date(end) > today) end = todayStr

// // // // // // //   return { start, end }
// // // // // // // }

// // // // // // // //
// // // // // // // // MODEL NORMALIZER
// // // // // // // //
// // // // // // // function buildModelList(selectedModel: string, competitors: string[]) {
// // // // // // //   return [...new Set([selectedModel, ...competitors])]
// // // // // // //     .map((m) => m?.toLowerCase().trim())
// // // // // // //     .filter(Boolean)
// // // // // // // }

// // // // // // // //
// // // // // // // // UNIVERSAL FETCHER
// // // // // // // //
// // // // // // // async function apiFetcher<T>(url: string, fallback: T): Promise<T> {
// // // // // // //   try {
// // // // // // //     const res = await fetch(`${API_BASE}${url}`)
// // // // // // //     if (!res.ok) throw new Error(`API error: ${res.status}`)
// // // // // // //     const json = await res.json()

// // // // // // //     if (json?.success && json?.data !== undefined) {
// // // // // // //       return json.data
// // // // // // //     }

// // // // // // //     return json
// // // // // // //   } catch (err) {
// // // // // // //     console.error("API fallback triggered:", url, err)
// // // // // // //     return fallback
// // // // // // //   }
// // // // // // // }

// // // // // // // //
// // // // // // // // TREND FETCHER
// // // // // // // //
// // // // // // // async function trendFetcher(url: string): Promise<TrendPoint[]> {
// // // // // // //   try {
// // // // // // //     const res = await fetch(`${API_BASE}${url}`)
// // // // // // //     if (!res.ok) throw new Error(`Trend API error: ${res.status}`)

// // // // // // //     const json = await res.json()

// // // // // // //     if (json?.success && Array.isArray(json?.data)) {
// // // // // // //       return json.data
// // // // // // //     }

// // // // // // //     return []
// // // // // // //   } catch (err) {
// // // // // // //     console.error("Trend API failed:", err)
// // // // // // //     return []
// // // // // // //   }
// // // // // // // }

// // // // // // // //
// // // // // // // // KPI DATA
// // // // // // // //
// // // // // // // export function useKPIData(
// // // // // // //   selectedModel: string,
// // // // // // //   competitors: string[],
// // // // // // //   dateRange?: DateRange,
// // // // // // //   trafficType: "overall" | "organic" | "inorganic" = "overall"
// // // // // // // ) {
// // // // // // //   const { start, end } = buildDateParams(dateRange)

// // // // // // //   const modelList = buildModelList(selectedModel, competitors)
// // // // // // //   const models = modelList.join(",")

// // // // // // //   const url = `/api/analytics/overview?models=${models}&start=${start}&end=${end}&traffic=${trafficType}`

// // // // // // //   return useSWR<KPIData>(
// // // // // // //     ["kpi", models, start, end, trafficType],
// // // // // // //     () => apiFetcher(url, kpiData),
// // // // // // //     {
// // // // // // //       revalidateOnFocus: false,
// // // // // // //       dedupingInterval: 0,
// // // // // // //     }
// // // // // // //   )
// // // // // // // }

// // // // // // // //
// // // // // // // // TREND DATA
// // // // // // // //
// // // // // // // export function useTrendData(
// // // // // // //   selectedModel: string,
// // // // // // //   competitors: string[],
// // // // // // //   dateRange?: DateRange,
// // // // // // //   trafficType: "overall" | "organic" | "inorganic" = "overall"
// // // // // // // ) {
// // // // // // //   const { start, end } = buildDateParams(dateRange)

// // // // // // //   const modelList = buildModelList(selectedModel, competitors)
// // // // // // //   const models = modelList.join(",")

// // // // // // //   const url = `/api/analytics/trend?models=${models}&start=${start}&end=${end}&traffic=${trafficType}`

// // // // // // //   return useSWR<TrendPoint[]>(
// // // // // // //     ["trend", models, start, end, trafficType],
// // // // // // //     () => trendFetcher(url),
// // // // // // //     {
// // // // // // //       revalidateOnFocus: false,
// // // // // // //       dedupingInterval: 0,
// // // // // // //       fallbackData: [],
// // // // // // //     }
// // // // // // //   )
// // // // // // // }

// // // // // // // //
// // // // // // // // FUNNEL DATA
// // // // // // // //
// // // // // // // export function useFunnelData(
// // // // // // //   selectedModel: string,
// // // // // // //   competitors: string[],
// // // // // // //   dateRange?: DateRange,
// // // // // // //   trafficType: "overall" | "organic" | "inorganic" = "overall"
// // // // // // // ) {
// // // // // // //   const { start, end } = buildDateParams(dateRange)

// // // // // // //   const modelList = buildModelList(selectedModel, competitors)
// // // // // // //   const models = modelList.join(",")

// // // // // // //   const url = `/api/analytics/funnel?models=${models}&start=${start}&end=${end}&traffic=${trafficType}`

// // // // // // //   return useSWR<FunnelStage[]>(
// // // // // // //     ["funnel", models, start, end, trafficType],
// // // // // // //     () => apiFetcher(url, funnelData),
// // // // // // //     {
// // // // // // //       revalidateOnFocus: false,
// // // // // // //       dedupingInterval: 0,
// // // // // // //     }
// // // // // // //   )
// // // // // // // }

// // // // // // // //
// // // // // // // // TRAFFIC SHARE
// // // // // // // //
// // // // // // // export const useTrafficShareData = () =>
// // // // // // //   useSWR<TrafficShareItem[]>(
// // // // // // //     ["traffic-share"],
// // // // // // //     () => apiFetcher("/api/analytics/traffic", trafficShareData),
// // // // // // //     { revalidateOnFocus: false }
// // // // // // //   )

// // // // // // // //
// // // // // // // // COMPETITOR DATA
// // // // // // // //
// // // // // // // export const useCompetitorData = () =>
// // // // // // //   useSWR<CompetitorRow[]>(
// // // // // // //     ["competitors"],
// // // // // // //     () => apiFetcher("/api/analytics/competitors", competitorData),
// // // // // // //     { revalidateOnFocus: false }
// // // // // // //   )

// // // // // // // //
// // // // // // // // DEVICE DATA
// // // // // // // //
// // // // // // // export const useDeviceData = () =>
// // // // // // //   useSWR<DeviceData[]>(
// // // // // // //     ["device"],
// // // // // // //     () => apiFetcher("/api/analytics/device-summary", deviceData),
// // // // // // //     { revalidateOnFocus: false }
// // // // // // //   )

// // // // // // // //
// // // // // // // // ENGAGEMENT DATA
// // // // // // // //
// // // // // // // export const useEngagementData = () =>
// // // // // // //   useSWR<EngagementTrendPoint[]>(
// // // // // // //     ["engagement"],
// // // // // // //     () => apiFetcher("/api/analytics/engagement", engagementTrendData),
// // // // // // //     { revalidateOnFocus: false }
// // // // // // //   )

// // // // // // // //
// // // // // // // // GEOGRAPHIC DATA
// // // // // // // //
// // // // // // // export const useGeographicData = () =>
// // // // // // //   useSWR<GeographicData[]>(
// // // // // // //     ["geo"],
// // // // // // //     () => apiFetcher("/api/analytics/country-summary", geographicData),
// // // // // // //     { revalidateOnFocus: false }
// // // // // // //   )





// // // // // // import useSWR from "swr"
// // // // // // import { DateRange } from "react-day-picker"

// // // // // // import {
// // // // // //   kpiData,
// // // // // //   trendData,
// // // // // //   funnelData,
// // // // // //   trafficShareData,
// // // // // //   competitorData,
// // // // // //   deviceData,
// // // // // //   engagementTrendData,
// // // // // //   geographicData,
// // // // // // } from "./mock-data"

// // // // // // import type {
// // // // // //   KPIData,
// // // // // //   TrendPoint,
// // // // // //   FunnelStage,
// // // // // //   TrafficShareItem,
// // // // // //   CompetitorRow,
// // // // // //   DeviceData,
// // // // // //   EngagementTrendPoint,
// // // // // //   GeographicData,
// // // // // // } from "./types"

// // // // // // const API_BASE =
// // // // // //   process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000"

// // // // // // //
// // // // // // // DATE HELPER
// // // // // // //
// // // // // // function buildDateParams(dateRange?: DateRange) {
// // // // // //   const today = new Date()
// // // // // //   const todayStr = today.toISOString().split("T")[0]

// // // // // //   if (!dateRange?.from) {
// // // // // //     return { start: "7daysAgo", end: "today" }
// // // // // //   }

// // // // // //   const start = dateRange.from.toISOString().split("T")[0]

// // // // // //   let end = dateRange.to
// // // // // //     ? dateRange.to.toISOString().split("T")[0]
// // // // // //     : start

// // // // // //   if (new Date(end) > today) end = todayStr

// // // // // //   return { start, end }
// // // // // // }

// // // // // // //
// // // // // // // MODEL NORMALIZER
// // // // // // //
// // // // // // function buildModelList(selectedModel: string | null, competitors: string[]) {

// // // // // //   if (!selectedModel) return []

// // // // // //   return [...new Set([selectedModel, ...competitors])]
// // // // // //     .map((m) => m?.toLowerCase().trim())
// // // // // //     .filter(Boolean)
// // // // // // }

// // // // // // //
// // // // // // // UNIVERSAL FETCHER
// // // // // // //
// // // // // // async function apiFetcher<T>(url: string, fallback: T): Promise<T> {
// // // // // //   try {

// // // // // //     const res = await fetch(`${API_BASE}${url}`)

// // // // // //     if (!res.ok) throw new Error(`API error: ${res.status}`)

// // // // // //     const json = await res.json()

// // // // // //     if (json?.success && json?.data !== undefined) {
// // // // // //       return json.data
// // // // // //     }

// // // // // //     return json

// // // // // //   } catch (err) {

// // // // // //     console.error("API fallback triggered:", url, err)

// // // // // //     return fallback
// // // // // //   }
// // // // // // }

// // // // // // //
// // // // // // // TREND FETCHER
// // // // // // //
// // // // // // async function trendFetcher(url: string): Promise<TrendPoint[]> {

// // // // // //   try {

// // // // // //     const res = await fetch(`${API_BASE}${url}`)

// // // // // //     if (!res.ok) throw new Error(`Trend API error: ${res.status}`)

// // // // // //     const json = await res.json()

// // // // // //     if (json?.success && Array.isArray(json?.data)) {
// // // // // //       return json.data
// // // // // //     }

// // // // // //     return []

// // // // // //   } catch (err) {

// // // // // //     console.error("Trend API failed:", err)

// // // // // //     return []
// // // // // //   }
// // // // // // }

// // // // // // //
// // // // // // // KPI DATA
// // // // // // //
// // // // // // export function useKPIData(
// // // // // //   selectedModel: string | null,
// // // // // //   competitors: string[],
// // // // // //   dateRange?: DateRange,
// // // // // //   trafficType: "overall" | "organic" | "inorganic" = "overall"
// // // // // // ) {

// // // // // //   const { start, end } = buildDateParams(dateRange)

// // // // // //   const modelList = buildModelList(selectedModel, competitors)

// // // // // //   const models = modelList.length ? modelList.join(",") : ""

// // // // // //   const url =
// // // // // //     `/api/analytics/overview?models=${models}&start=${start}&end=${end}&traffic=${trafficType}`

// // // // // //   return useSWR<KPIData>(
// // // // // //     ["kpi", models, start, end, trafficType],
// // // // // //     () => apiFetcher(url, kpiData),
// // // // // //     {
// // // // // //       revalidateOnFocus: false,
// // // // // //       dedupingInterval: 60000,
// // // // // //     }
// // // // // //   )
// // // // // // }

// // // // // // //
// // // // // // // TREND DATA
// // // // // // //
// // // // // // export function useTrendData(
// // // // // //   selectedModel: string | null,
// // // // // //   competitors: string[],
// // // // // //   dateRange?: DateRange,
// // // // // //   trafficType: "overall" | "organic" | "inorganic" = "overall"
// // // // // // ) {

// // // // // //   const { start, end } = buildDateParams(dateRange)

// // // // // //   const modelList = buildModelList(selectedModel, competitors)

// // // // // //   const models = modelList.length ? modelList.join(",") : ""

// // // // // //   const url =
// // // // // //     `/api/analytics/trend?models=${models}&start=${start}&end=${end}&traffic=${trafficType}`

// // // // // //   return useSWR<TrendPoint[]>(
// // // // // //     ["trend", models, start, end, trafficType],
// // // // // //     () => trendFetcher(url),
// // // // // //     {
// // // // // //       revalidateOnFocus: false,
// // // // // //       dedupingInterval: 60000,
// // // // // //       fallbackData: [],
// // // // // //     }
// // // // // //   )
// // // // // // }

// // // // // // //
// // // // // // // FUNNEL DATA
// // // // // // //
// // // // // // export function useFunnelData(
// // // // // //   selectedModel: string | null,
// // // // // //   competitors: string[],
// // // // // //   dateRange?: DateRange,
// // // // // //   trafficType: "overall" | "organic" | "inorganic" = "overall"
// // // // // // ) {

// // // // // //   const { start, end } = buildDateParams(dateRange)

// // // // // //   const modelList = buildModelList(selectedModel, competitors)

// // // // // //   const models = modelList.length ? modelList.join(",") : ""

// // // // // //   const url =
// // // // // //     `/api/analytics/funnel?models=${models}&start=${start}&end=${end}&traffic=${trafficType}`

// // // // // //   return useSWR<FunnelStage[]>(
// // // // // //     ["funnel", models, start, end, trafficType],
// // // // // //     () => apiFetcher(url, funnelData),
// // // // // //     {
// // // // // //       revalidateOnFocus: false,
// // // // // //       dedupingInterval: 60000,
// // // // // //     }
// // // // // //   )
// // // // // // }

// // // // // // //
// // // // // // // TRAFFIC SHARE
// // // // // // //
// // // // // // export const useTrafficShareData = () =>
// // // // // //   useSWR<TrafficShareItem[]>(
// // // // // //     ["traffic-share"],
// // // // // //     () => apiFetcher("/api/analytics/traffic", trafficShareData),
// // // // // //     { revalidateOnFocus: false }
// // // // // //   )

// // // // // // //
// // // // // // // COMPETITOR DATA
// // // // // // //
// // // // // // export const useCompetitorData = () =>
// // // // // //   useSWR<CompetitorRow[]>(
// // // // // //     ["competitors"],
// // // // // //     () => apiFetcher("/api/analytics/competitors", competitorData),
// // // // // //     { revalidateOnFocus: false }
// // // // // //   )

// // // // // // //
// // // // // // // DEVICE DATA
// // // // // // //
// // // // // // export const useDeviceData = () =>
// // // // // //   useSWR<DeviceData[]>(
// // // // // //     ["device"],
// // // // // //     () => apiFetcher("/api/analytics/device-summary", deviceData),
// // // // // //     { revalidateOnFocus: false }
// // // // // //   )

// // // // // // //
// // // // // // // ENGAGEMENT DATA
// // // // // // //
// // // // // // export const useEngagementData = () =>
// // // // // //   useSWR<EngagementTrendPoint[]>(
// // // // // //     ["engagement"],
// // // // // //     () => apiFetcher("/api/analytics/engagement", engagementTrendData),
// // // // // //     { revalidateOnFocus: false }
// // // // // //   )

// // // // // // //
// // // // // // // GEOGRAPHIC DATA
// // // // // // //
// // // // // // export const useGeographicData = () =>
// // // // // //   useSWR<GeographicData[]>(
// // // // // //     ["geo"],
// // // // // //     () => apiFetcher("/api/analytics/country-summary", geographicData),
// // // // // //     { revalidateOnFocus: false }
// // // // // //   )






















// // // // // import useSWR from "swr"
// // // // // import { DateRange } from "react-day-picker"

// // // // // import {
// // // // //   kpiData,
// // // // //   trendData,
// // // // //   funnelData,
// // // // //   trafficShareData,
// // // // //   competitorData,
// // // // //   deviceData,
// // // // //   engagementTrendData,
// // // // //   geographicData,
// // // // // } from "./mock-data"

// // // // // import type {
// // // // //   KPIData,
// // // // //   TrendPoint,
// // // // //   FunnelStage,
// // // // //   TrafficShareItem,
// // // // //   CompetitorRow,
// // // // //   DeviceData,
// // // // //   EngagementTrendPoint,
// // // // //   GeographicData,
// // // // // } from "./types"

// // // // // const API_BASE =
// // // // //   process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000"

// // // // // //
// // // // // // DATE HELPER
// // // // // //
// // // // // function buildDateParams(dateRange?: DateRange) {
// // // // //   const today = new Date()
// // // // //   const todayStr = today.toISOString().split("T")[0]

// // // // //   if (!dateRange?.from) {
// // // // //     return { start: "7daysAgo", end: "today" }
// // // // //   }

// // // // //   const start = dateRange.from.toISOString().split("T")[0]

// // // // //   let end = dateRange.to
// // // // //     ? dateRange.to.toISOString().split("T")[0]
// // // // //     : start

// // // // //   if (new Date(end) > today) end = todayStr

// // // // //   return { start, end }
// // // // // }

// // // // // //
// // // // // // MODEL NORMALIZER
// // // // // //
// // // // // function buildModelList(selectedModel: string | null, competitors: string[]) {

// // // // //   if (!selectedModel) return []

// // // // //   return [...new Set([selectedModel, ...competitors])]
// // // // //     .map((m) => m?.toLowerCase().trim())
// // // // //     .filter(Boolean)
// // // // // }

// // // // // //
// // // // // // UNIVERSAL FETCHER
// // // // // //
// // // // // async function apiFetcher<T>(url: string, fallback: T): Promise<T> {
// // // // //   try {

// // // // //     const res = await fetch(`${API_BASE}${url}`)

// // // // //     if (!res.ok) throw new Error(`API error: ${res.status}`)

// // // // //     const json = await res.json()

// // // // //     if (json?.success && json?.data !== undefined) {
// // // // //       return json.data
// // // // //     }

// // // // //     return json

// // // // //   } catch (err) {

// // // // //     console.error("API fallback triggered:", url, err)

// // // // //     return fallback
// // // // //   }
// // // // // }

// // // // // //
// // // // // // TREND FETCHER
// // // // // //
// // // // // async function trendFetcher(url: string): Promise<TrendPoint[]> {

// // // // //   try {

// // // // //     const res = await fetch(`${API_BASE}${url}`)

// // // // //     if (!res.ok) throw new Error(`Trend API error: ${res.status}`)

// // // // //     const json = await res.json()

// // // // //     if (json?.success && Array.isArray(json?.data)) {
// // // // //       return json.data
// // // // //     }

// // // // //     return []

// // // // //   } catch (err) {

// // // // //     console.error("Trend API failed:", err)

// // // // //     return []
// // // // //   }
// // // // // }

// // // // // //
// // // // // // KPI DATA
// // // // // //
// // // // // export function useKPIData(
// // // // //   selectedModel: string | null,
// // // // //   competitors: string[],
// // // // //   dateRange?: DateRange,
// // // // //   trafficType: "overall" | "organic" | "inorganic" = "overall"
// // // // // ) {

// // // // //   const { start, end } = buildDateParams(dateRange)

// // // // //   const modelList = buildModelList(selectedModel, competitors)

// // // // //   const models = modelList.length ? modelList.join(",") : ""

// // // // //   const url =
// // // // //     `/api/analytics/overview?models=${models}&start=${start}&end=${end}&traffic=${trafficType}`

// // // // //   return useSWR<KPIData>(
// // // // //     ["kpi", models, start, end, trafficType],
// // // // //     () => apiFetcher(url, kpiData),
// // // // //     {
// // // // //       revalidateOnFocus: false,
// // // // //       dedupingInterval: 60000,
// // // // //     }
// // // // //   )
// // // // // }

// // // // // //
// // // // // // TREND DATA
// // // // // //
// // // // // export function useTrendData(
// // // // //   selectedModel: string | null,
// // // // //   competitors: string[],
// // // // //   dateRange?: DateRange,
// // // // //   trafficType: "overall" | "organic" | "inorganic" = "overall"
// // // // // ) {

// // // // //   const { start, end } = buildDateParams(dateRange)

// // // // //   const modelList = buildModelList(selectedModel, competitors)

// // // // //   const models = modelList.length ? modelList.join(",") : ""

// // // // //   const url =
// // // // //     `/api/analytics/trend?models=${models}&start=${start}&end=${end}&traffic=${trafficType}`

// // // // //   return useSWR<TrendPoint[]>(
// // // // //     ["trend", models, start, end, trafficType],
// // // // //     () => trendFetcher(url),
// // // // //     {
// // // // //       revalidateOnFocus: false,
// // // // //       dedupingInterval: 60000,
// // // // //       fallbackData: [],
// // // // //     }
// // // // //   )
// // // // // }

// // // // // //
// // // // // // FUNNEL DATA
// // // // // //
// // // // // export function useFunnelData(
// // // // //   selectedModel: string | null,
// // // // //   competitors: string[],
// // // // //   dateRange?: DateRange,
// // // // //   trafficType: "overall" | "organic" | "inorganic" = "overall"
// // // // // ) {

// // // // //   const { start, end } = buildDateParams(dateRange)

// // // // //   const modelList = buildModelList(selectedModel, competitors)

// // // // //   const models = modelList.length ? modelList.join(",") : ""

// // // // //   const url =
// // // // //     `/api/analytics/funnel?models=${models}&start=${start}&end=${end}&traffic=${trafficType}`

// // // // //   return useSWR<FunnelStage[]>(
// // // // //     ["funnel", models, start, end, trafficType],
// // // // //     () => apiFetcher(url, funnelData),
// // // // //     {
// // // // //       revalidateOnFocus: false,
// // // // //       dedupingInterval: 60000,
// // // // //     }
// // // // //   )
// // // // // }

// // // // // //
// // // // // // TRAFFIC SHARE (FIXED)
// // // // // //
// // // // // export function useTrafficShareData(
// // // // //   selectedModel: string | null,
// // // // //   competitors: string[],
// // // // //   dateRange?: DateRange,
// // // // //   trafficType: "overall" | "organic" | "inorganic" = "overall"
// // // // // ) {

// // // // //   const { start, end } = buildDateParams(dateRange)

// // // // //   const modelList = buildModelList(selectedModel, competitors)

// // // // //   const models = modelList.length ? modelList.join(",") : ""

// // // // //   const url =
// // // // //     `/api/analytics/traffic?models=${models}&start=${start}&end=${end}&traffic=${trafficType}`

// // // // //   return useSWR<TrafficShareItem[]>(
// // // // //     ["traffic-share", models, start, end, trafficType],
// // // // //     () => apiFetcher(url, trafficShareData),
// // // // //     {
// // // // //       revalidateOnFocus: false,
// // // // //       dedupingInterval: 60000,
// // // // //     }
// // // // //   )
// // // // // }

// // // // // //
// // // // // // COMPETITOR DATA
// // // // // //
// // // // // export const useCompetitorData = () =>
// // // // //   useSWR<CompetitorRow[]>(
// // // // //     ["competitors"],
// // // // //     () => apiFetcher("/api/analytics/competitors", competitorData),
// // // // //     { revalidateOnFocus: false }
// // // // //   )

// // // // // //
// // // // // // DEVICE DATA
// // // // // //
// // // // // export const useDeviceData = () =>
// // // // //   useSWR<DeviceData[]>(
// // // // //     ["device"],
// // // // //     () => apiFetcher("/api/analytics/device-summary", deviceData),
// // // // //     { revalidateOnFocus: false }
// // // // //   )

// // // // // //
// // // // // // ENGAGEMENT DATA
// // // // // //
// // // // // export const useEngagementData = () =>
// // // // //   useSWR<EngagementTrendPoint[]>(
// // // // //     ["engagement"],
// // // // //     () => apiFetcher("/api/analytics/engagement", engagementTrendData),
// // // // //     { revalidateOnFocus: false }
// // // // //   )

// // // // // //
// // // // // // GEOGRAPHIC DATA
// // // // // //
// // // // // export const useGeographicData = () =>
// // // // //   useSWR<GeographicData[]>(
// // // // //     ["geo"],
// // // // //     () => apiFetcher("/api/analytics/country-summary", geographicData),
// // // // //     { revalidateOnFocus: false }
// // // // //   )














// // // // import useSWR from "swr"
// // // // import { DateRange } from "react-day-picker"

// // // // import {
// // // //   kpiData,
// // // //   trendData,
// // // //   funnelData,
// // // //   trafficShareData,
// // // //   competitorData,
// // // //   deviceData,
// // // //   engagementTrendData,
// // // //   geographicData,
// // // // } from "./mock-data"

// // // // import type {
// // // //   KPIData,
// // // //   TrendPoint,
// // // //   FunnelStage,
// // // //   TrafficShareItem,
// // // //   CompetitorRow,
// // // //   DeviceData,
// // // //   EngagementTrendPoint,
// // // //   GeographicData,
// // // // } from "./types"

// // // // const API_BASE =
// // // //   process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000"

// // // // //
// // // // // DATE HELPER
// // // // //
// // // // function buildDateParams(dateRange?: DateRange) {
// // // //   const today = new Date()
// // // //   const todayStr = today.toISOString().split("T")[0]

// // // //   if (!dateRange?.from) {
// // // //     return { start: "7daysAgo", end: "today" }
// // // //   }

// // // //   const start = dateRange.from.toISOString().split("T")[0]

// // // //   let end = dateRange.to
// // // //     ? dateRange.to.toISOString().split("T")[0]
// // // //     : start

// // // //   if (new Date(end) > today) end = todayStr

// // // //   return { start, end }
// // // // }

// // // // //
// // // // // MODEL NORMALIZER
// // // // //
// // // // function buildModelList(selectedModel: string | null, competitors: string[]) {

// // // //   if (!selectedModel) return []

// // // //   return [...new Set([selectedModel, ...competitors])]
// // // //     .map((m) => m?.toLowerCase().trim())
// // // //     .filter(Boolean)
// // // // }

// // // // //
// // // // // UNIVERSAL FETCHER
// // // // //
// // // // async function apiFetcher<T>(url: string, fallback: T): Promise<T> {
// // // //   try {

// // // //     const res = await fetch(`${API_BASE}${url}`)

// // // //     if (!res.ok) throw new Error(`API error: ${res.status}`)

// // // //     const json = await res.json()

// // // //     if (json?.success && json?.data !== undefined) {
// // // //       return json.data
// // // //     }

// // // //     return json

// // // //   } catch (err) {

// // // //     console.error("API fallback triggered:", url, err)

// // // //     return fallback
// // // //   }
// // // // }

// // // // //
// // // // // TREND FETCHER
// // // // //
// // // // async function trendFetcher(url: string): Promise<TrendPoint[]> {

// // // //   try {

// // // //     const res = await fetch(`${API_BASE}${url}`)

// // // //     if (!res.ok) throw new Error(`Trend API error: ${res.status}`)

// // // //     const json = await res.json()

// // // //     if (json?.success && Array.isArray(json?.data)) {
// // // //       return json.data
// // // //     }

// // // //     return []

// // // //   } catch (err) {

// // // //     console.error("Trend API failed:", err)

// // // //     return []
// // // //   }
// // // // }

// // // // //
// // // // // KPI DATA
// // // // //
// // // // export function useKPIData(
// // // //   selectedModel: string | null,
// // // //   competitors: string[],
// // // //   dateRange?: DateRange,
// // // //   trafficType: "overall" | "organic" | "inorganic" = "overall"
// // // // ) {

// // // //   const { start, end } = buildDateParams(dateRange)

// // // //   const modelList = buildModelList(selectedModel, competitors)

// // // //   const models = modelList.length ? modelList.join(",") : ""

// // // //   const url =
// // // //     `/api/analytics/overview?models=${models}&start=${start}&end=${end}&traffic=${trafficType}`

// // // //   return useSWR<KPIData>(
// // // //     ["kpi", models, start, end, trafficType],
// // // //     () => apiFetcher(url, kpiData),
// // // //     {
// // // //       revalidateOnFocus: false,
// // // //       dedupingInterval: 60000,
// // // //     }
// // // //   )
// // // // }

// // // // //
// // // // // TREND DATA
// // // // //
// // // // export function useTrendData(
// // // //   selectedModel: string | null,
// // // //   competitors: string[],
// // // //   dateRange?: DateRange,
// // // //   trafficType: "overall" | "organic" | "inorganic" = "overall"
// // // // ) {

// // // //   const { start, end } = buildDateParams(dateRange)

// // // //   const modelList = buildModelList(selectedModel, competitors)

// // // //   const models = modelList.length ? modelList.join(",") : ""

// // // //   const url =
// // // //     `/api/analytics/trend?models=${models}&start=${start}&end=${end}&traffic=${trafficType}`

// // // //   return useSWR<TrendPoint[]>(
// // // //     ["trend", models, start, end, trafficType],
// // // //     () => trendFetcher(url),
// // // //     {
// // // //       revalidateOnFocus: false,
// // // //       dedupingInterval: 60000,
// // // //       fallbackData: [],
// // // //     }
// // // //   )
// // // // }

// // // // //
// // // // // FUNNEL DATA
// // // // //
// // // // export function useFunnelData(
// // // //   selectedModel: string | null,
// // // //   competitors: string[],
// // // //   dateRange?: DateRange,
// // // //   trafficType: "overall" | "organic" | "inorganic" = "overall"
// // // // ) {

// // // //   const { start, end } = buildDateParams(dateRange)

// // // //   const modelList = buildModelList(selectedModel, competitors)

// // // //   const models = modelList.length ? modelList.join(",") : ""

// // // //   const url =
// // // //     `/api/analytics/funnel?models=${models}&start=${start}&end=${end}&traffic=${trafficType}`

// // // //   return useSWR<FunnelStage[]>(
// // // //     ["funnel", models, start, end, trafficType],
// // // //     () => apiFetcher(url, funnelData),
// // // //     {
// // // //       revalidateOnFocus: false,
// // // //       dedupingInterval: 60000,
// // // //     }
// // // //   )
// // // // }

// // // // //
// // // // // TRAFFIC SHARE
// // // // //
// // // // export function useTrafficShareData(
// // // //   selectedModel: string | null,
// // // //   competitors: string[],
// // // //   dateRange?: DateRange,
// // // //   trafficType: "overall" | "organic" | "inorganic" = "overall"
// // // // ) {

// // // //   const { start, end } = buildDateParams(dateRange)

// // // //   const modelList = buildModelList(selectedModel, competitors)

// // // //   const models = modelList.length ? modelList.join(",") : ""

// // // //   const url =
// // // //     `/api/analytics/traffic?models=${models}&start=${start}&end=${end}&traffic=${trafficType}`

// // // //   return useSWR<TrafficShareItem[]>(
// // // //     ["traffic-share", models, start, end, trafficType],
// // // //     () => apiFetcher(url, trafficShareData),
// // // //     {
// // // //       revalidateOnFocus: false,
// // // //       dedupingInterval: 60000,
// // // //     }
// // // //   )
// // // // }

// // // // //
// // // // // COMPETITOR DATA
// // // // //
// // // // export const useCompetitorData = () =>
// // // //   useSWR<CompetitorRow[]>(
// // // //     ["competitors"],
// // // //     () => apiFetcher("/api/analytics/competitors", competitorData),
// // // //     { revalidateOnFocus: false }
// // // //   )

// // // // //
// // // // // DEVICE DATA (FIXED)
// // // // //
// // // // export function useDeviceData(
// // // //   selectedModel: string | null,
// // // //   competitors: string[],
// // // //   dateRange?: DateRange,
// // // //   trafficType: "overall" | "organic" | "inorganic" = "overall"
// // // // ) {

// // // //   const { start, end } = buildDateParams(dateRange)

// // // //   const modelList = buildModelList(selectedModel, competitors)

// // // //   const models = modelList.length ? modelList.join(",") : ""

// // // //   const url =
// // // //     `/api/analytics/device-summary?models=${models}&start=${start}&end=${end}&traffic=${trafficType}`

// // // //   return useSWR<DeviceData[]>(
// // // //     ["device", models, start, end, trafficType],
// // // //     () => apiFetcher(url, deviceData),
// // // //     { revalidateOnFocus: false }
// // // //   )
// // // // }

// // // // //
// // // // // ENGAGEMENT DATA (FIXED)
// // // // //
// // // // export function useEngagementData(
// // // //   selectedModel: string | null,
// // // //   competitors: string[],
// // // //   dateRange?: DateRange,
// // // //   trafficType: "overall" | "organic" | "inorganic" = "overall"
// // // // ) {

// // // //   const { start, end } = buildDateParams(dateRange)

// // // //   const modelList = buildModelList(selectedModel, competitors)

// // // //   const models = modelList.length ? modelList.join(",") : ""

// // // //   const url =
// // // //     `/api/analytics/engagement?models=${models}&start=${start}&end=${end}&traffic=${trafficType}`

// // // //   return useSWR<EngagementTrendPoint[]>(
// // // //     ["engagement", models, start, end, trafficType],
// // // //     () => apiFetcher(url, engagementTrendData),
// // // //     { revalidateOnFocus: false }
// // // //   )
// // // // }

// // // // //
// // // // // GEOGRAPHIC DATA (FIXED)
// // // // //
// // // // export function useGeographicData(
// // // //   selectedModel: string | null,
// // // //   competitors: string[],
// // // //   dateRange?: DateRange,
// // // //   trafficType: "overall" | "organic" | "inorganic" = "overall"
// // // // ) {

// // // //   const { start, end } = buildDateParams(dateRange)

// // // //   const modelList = buildModelList(selectedModel, competitors)

// // // //   const models = modelList.length ? modelList.join(",") : ""

// // // //   const url =
// // // //     `/api/analytics/country-summary?models=${models}&start=${start}&end=${end}&traffic=${trafficType}`

// // // //   return useSWR<GeographicData[]>(
// // // //     ["geo", models, start, end, trafficType],
// // // //     () => apiFetcher(url, geographicData),
// // // //     { revalidateOnFocus: false }
// // // //   )
// // // // }










// // // import useSWR from "swr"
// // // import { DateRange } from "react-day-picker"

// // // import {
// // //   kpiData,
// // //   trendData,
// // //   funnelData,
// // //   trafficShareData,
// // //   competitorData,
// // //   deviceData,
// // //   engagementTrendData,
// // //   geographicData,
// // // } from "./mock-data"

// // // import type {
// // //   KPIData,
// // //   TrendPoint,
// // //   FunnelStage,
// // //   TrafficShareItem,
// // //   CompetitorRow,
// // //   DeviceData,
// // //   EngagementTrendPoint,
// // //   GeographicData,
// // // } from "./types"

// // // const API_BASE =
// // //   process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000"

// // // /* ------------------------------------------------ */
// // // /* DATE HELPER */
// // // /* ------------------------------------------------ */

// // // function buildDateParams(dateRange?: DateRange) {

// // //   const today = new Date()
// // //   const todayStr = today.toISOString().split("T")[0]

// // //   if (!dateRange?.from) {
// // //     return { start: "7daysAgo", end: "today" }
// // //   }

// // //   const start = dateRange.from.toISOString().split("T")[0]

// // //   let end = dateRange.to
// // //     ? dateRange.to.toISOString().split("T")[0]
// // //     : start

// // //   if (new Date(end) > today) end = todayStr

// // //   return { start, end }
// // // }

// // // /* ------------------------------------------------ */
// // // /* MODEL NORMALIZER */
// // // /* ------------------------------------------------ */

// // // function buildModelList(selectedModel: string | null, competitors: string[]) {

// // //   if (!selectedModel) return []

// // //   return [...new Set([selectedModel, ...competitors])]
// // //     .map((m) => m?.toLowerCase().trim())
// // //     .filter(Boolean)
// // // }

// // // /* ------------------------------------------------ */
// // // /* UNIVERSAL FETCHER */
// // // /* ------------------------------------------------ */

// // // async function apiFetcher<T>(url: string, fallback: T): Promise<T> {

// // //   try {

// // //     const res = await fetch(`${API_BASE}${url}`)

// // //     if (!res.ok) throw new Error(`API error: ${res.status}`)

// // //     const json = await res.json()

// // //     if (json?.success && json?.data !== undefined) {
// // //       return json.data
// // //     }

// // //     return json

// // //   } catch (err) {

// // //     console.error("API fallback triggered:", url, err)

// // //     return fallback
// // //   }
// // // }

// // // /* ------------------------------------------------ */
// // // /* TREND FETCHER */
// // // /* ------------------------------------------------ */

// // // async function trendFetcher(url: string): Promise<TrendPoint[]> {

// // //   try {

// // //     const res = await fetch(`${API_BASE}${url}`)

// // //     if (!res.ok) throw new Error(`Trend API error: ${res.status}`)

// // //     const json = await res.json()

// // //     if (json?.success && Array.isArray(json?.data)) {
// // //       return json.data
// // //     }

// // //     return []

// // //   } catch (err) {

// // //     console.error("Trend API failed:", err)

// // //     return []
// // //   }
// // // }

// // // /* ------------------------------------------------ */
// // // /* KPI DATA */
// // // /* ------------------------------------------------ */

// // // export function useKPIData(
// // //   selectedModel: string | null,
// // //   competitors: string[],
// // //   dateRange?: DateRange,
// // //   trafficType: "overall" | "organic" | "inorganic" = "overall"
// // // ) {

// // //   const { start, end } = buildDateParams(dateRange)

// // //   const modelList = buildModelList(selectedModel, competitors)

// // //   const models = modelList.length ? modelList.join(",") : ""

// // //   const url =
// // //     `/api/analytics/overview?models=${models}&start=${start}&end=${end}&traffic=${trafficType}`

// // //   return useSWR<KPIData>(
// // //     ["kpi", models, start, end, trafficType],
// // //     () => apiFetcher(url, kpiData),
// // //     {
// // //       revalidateOnFocus: false,
// // //       dedupingInterval: 60000,
// // //     }
// // //   )
// // // }

// // // /* ------------------------------------------------ */
// // // /* TREND DATA */
// // // /* ------------------------------------------------ */

// // // export function useTrendData(
// // //   selectedModel: string | null,
// // //   competitors: string[],
// // //   dateRange?: DateRange,
// // //   trafficType: "overall" | "organic" | "inorganic" = "overall"
// // // ) {

// // //   const { start, end } = buildDateParams(dateRange)

// // //   const modelList = buildModelList(selectedModel, competitors)

// // //   const models = modelList.length ? modelList.join(",") : ""

// // //   const url =
// // //     `/api/analytics/trend?models=${models}&start=${start}&end=${end}&traffic=${trafficType}`

// // //   return useSWR<TrendPoint[]>(
// // //     ["trend", models, start, end, trafficType],
// // //     () => trendFetcher(url),
// // //     {
// // //       revalidateOnFocus: false,
// // //       dedupingInterval: 60000,
// // //       fallbackData: [],
// // //     }
// // //   )
// // // }

// // // /* ------------------------------------------------ */
// // // /* FUNNEL DATA */
// // // /* ------------------------------------------------ */

// // // export function useFunnelData(
// // //   selectedModel: string | null,
// // //   competitors: string[],
// // //   dateRange?: DateRange,
// // //   trafficType: "overall" | "organic" | "inorganic" = "overall"
// // // ) {

// // //   const { start, end } = buildDateParams(dateRange)

// // //   const modelList = buildModelList(selectedModel, competitors)

// // //   const models = modelList.length ? modelList.join(",") : ""

// // //   const url =
// // //     `/api/analytics/funnel?models=${models}&start=${start}&end=${end}&traffic=${trafficType}`

// // //   return useSWR<FunnelStage[]>(
// // //     ["funnel", models, start, end, trafficType],
// // //     () => apiFetcher(url, funnelData),
// // //     {
// // //       revalidateOnFocus: false,
// // //       dedupingInterval: 60000,
// // //     }
// // //   )
// // // }

// // // /* ------------------------------------------------ */
// // // /* TRAFFIC SHARE */
// // // /* ------------------------------------------------ */

// // // export function useTrafficShareData(
// // //   selectedModel: string | null,
// // //   competitors: string[],
// // //   dateRange?: DateRange,
// // //   trafficType: "overall" | "organic" | "inorganic" = "overall"
// // // ) {

// // //   const { start, end } = buildDateParams(dateRange)

// // //   const modelList = buildModelList(selectedModel, competitors)

// // //   const models = modelList.length ? modelList.join(",") : ""

// // //   const url =
// // //     `/api/analytics/traffic?models=${models}&start=${start}&end=${end}&traffic=${trafficType}`

// // //   return useSWR<TrafficShareItem[]>(
// // //     ["traffic-share", models, start, end, trafficType],
// // //     () => apiFetcher(url, trafficShareData),
// // //     {
// // //       revalidateOnFocus: false,
// // //       dedupingInterval: 60000,
// // //     }
// // //   )
// // // }

// // // /* ------------------------------------------------ */
// // // /* COMPETITOR DATA */
// // // /* ------------------------------------------------ */

// // // export const useCompetitorData = () =>
// // //   useSWR<CompetitorRow[]>(
// // //     ["competitors"],
// // //     () => apiFetcher("/api/analytics/competitors", competitorData),
// // //     { revalidateOnFocus: false }
// // //   )

// // // /* ------------------------------------------------ */
// // // /* DEVICE DATA */
// // // /* ------------------------------------------------ */

// // // export function useDeviceData(
// // //   selectedModel: string | null,
// // //   competitors: string[],
// // //   dateRange?: DateRange,
// // //   trafficType: "overall" | "organic" | "inorganic" = "overall"
// // // ) {

// // //   const { start, end } = buildDateParams(dateRange)

// // //   const modelList = buildModelList(selectedModel, competitors)

// // //   const models = modelList.length ? modelList.join(",") : ""

// // //   const url =
// // //     `/api/analytics/device-summary?models=${models}&start=${start}&end=${end}&traffic=${trafficType}`

// // //   return useSWR<DeviceData[]>(
// // //     ["device", models, start, end, trafficType],
// // //     () => apiFetcher(url, deviceData),
// // //     { revalidateOnFocus: false }
// // //   )
// // // }

// // // /* ------------------------------------------------ */
// // // /* ENGAGEMENT DATA (FULLY FIXED) */
// // // /* ------------------------------------------------ */

// // // export function useEngagementData(
// // //   selectedModel: string | null,
// // //   competitors: string[],
// // //   dateRange?: DateRange,
// // //   trafficType: "overall" | "organic" | "inorganic" = "overall"
// // // ) {

// // //   const { start, end } = buildDateParams(dateRange)

// // //   const modelList = buildModelList(selectedModel, competitors)

// // //   const models = modelList.length ? modelList.join(",") : ""

// // //   const url =
// // //     `/api/analytics/engagement?models=${models}&start=${start}&end=${end}&traffic=${trafficType}`

// // //   return useSWR<EngagementTrendPoint[]>(

// // //     ["engagement", models, start, end, trafficType],
// // //     () => apiFetcher(url, engagementTrendData),
// // //     { revalidateOnFocus: false }  
// // //   )

// // //     async () => {

// // //       const raw = await apiFetcher<any[]>(url, engagementTrendData)

// // //       if (!Array.isArray(raw)) return []

// // //       return raw.map((d) => {

// // //         const pageViews =
// // //           Number(d.pageViews ?? d.page_views ?? d.pv ?? 0)

// // //         const users =
// // //           Number(d.users ?? d.totalUsers ?? d.uu ?? 0)

// // //         const sessionDuration =
// // //           Number(
// // //             d.avgSessionDuration ??
// // //             d.avg_session_duration ??
// // //             d.sessionDuration ??
// // //             0
// // //           )

// // //         return {

// // //           date: d.date,

// // //           pv_uu: users ? pageViews / users : 0,

// // //           avg_session_duration: sessionDuration / 60

// // //         }

// // //       })

// // //     },

// // //     { revalidateOnFocus: false }

// // //   )
// // // }

// // // /* ------------------------------------------------ */
// // // /* GEOGRAPHIC DATA */
// // // /* ------------------------------------------------ */

// // // export function useGeographicData(
// // //   selectedModel: string | null,
// // //   competitors: string[],
// // //   dateRange?: DateRange,
// // //   trafficType: "overall" | "organic" | "inorganic" = "overall"
// // // ) {

// // //   const { start, end } = buildDateParams(dateRange)

// // //   const modelList = buildModelList(selectedModel, competitors)

// // //   const models = modelList.length ? modelList.join(",") : ""

// // //   const url =
// // //     `/api/analytics/country-summary?models=${models}&start=${start}&end=${end}&traffic=${trafficType}`

// // //   return useSWR<GeographicData[]>((
// // //     ["geo", models, start, end, trafficType],
// // //     () => apiFetcher(url, geographicData),
// // //     { revalidateOnFocus: false }
// // //   ))
// // // }















// // import useSWR from "swr"
// // import { DateRange } from "react-day-picker"

// // import {
// //   kpiData,
// //   trendData,
// //   funnelData,
// //   trafficShareData,
// //   competitorData,
// //   deviceData,
// //   engagementTrendData,
// //   geographicData,
// // } from "./mock-data"

// // import type {
// //   KPIData,
// //   TrendPoint,
// //   FunnelStage,
// //   TrafficShareItem,
// //   CompetitorRow,
// //   DeviceData,
// //   EngagementTrendPoint,
// //   GeographicData,
// // } from "./types"

// // const API_BASE =
// //   process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000"

// // /* ------------------------------------------------ */
// // /* DATE HELPER */
// // /* ------------------------------------------------ */

// // function buildDateParams(dateRange?: DateRange) {

// //   const today = new Date()
// //   const todayStr = today.toISOString().split("T")[0]

// //   if (!dateRange?.from) {
// //     return { start: "7daysAgo", end: "today" }
// //   }

// //   const start = dateRange.from.toISOString().split("T")[0]

// //   let end = dateRange.to
// //     ? dateRange.to.toISOString().split("T")[0]
// //     : start

// //   if (new Date(end) > today) end = todayStr

// //   return { start, end }
// // }

// // /* ------------------------------------------------ */
// // /* MODEL NORMALIZER */
// // /* ------------------------------------------------ */

// // function buildModelList(selectedModel: string | null, competitors: string[]) {

// //   if (!selectedModel) return []

// //   return [...new Set([selectedModel, ...competitors])]
// //     .map((m) => m?.toLowerCase().trim())
// //     .filter(Boolean)
// // }

// // /* ------------------------------------------------ */
// // /* UNIVERSAL FETCHER */
// // /* ------------------------------------------------ */

// // async function apiFetcher<T>(url: string, fallback: T): Promise<T> {

// //   try {

// //     const res = await fetch(`${API_BASE}${url}`)

// //     if (!res.ok) throw new Error(`API error: ${res.status}`)

// //     const json = await res.json()

// //     if (json?.success && json?.data !== undefined) {
// //       return json.data
// //     }

// //     return json

// //   } catch (err) {

// //     console.error("API fallback triggered:", url, err)

// //     return fallback
// //   }
// // }

// // /* ------------------------------------------------ */
// // /* TREND FETCHER */
// // /* ------------------------------------------------ */

// // async function trendFetcher(url: string): Promise<TrendPoint[]> {

// //   try {

// //     const res = await fetch(`${API_BASE}${url}`)

// //     if (!res.ok) throw new Error(`Trend API error: ${res.status}`)

// //     const json = await res.json()

// //     if (json?.success && Array.isArray(json?.data)) {
// //       return json.data
// //     }

// //     return []

// //   } catch (err) {

// //     console.error("Trend API failed:", err)

// //     return []
// //   }
// // }

// // /* ------------------------------------------------ */
// // /* KPI DATA */
// // /* ------------------------------------------------ */

// // export function useKPIData(
// //   selectedModel: string | null,
// //   competitors: string[],
// //   dateRange?: DateRange,
// //   trafficType: "overall" | "organic" | "inorganic" = "overall"
// // ) {

// //   const { start, end } = buildDateParams(dateRange)

// //   const modelList = buildModelList(selectedModel, competitors)

// //   const models = modelList.length ? modelList.join(",") : ""

// //   const url =
// //     `/api/analytics/overview?models=${models}&start=${start}&end=${end}&traffic=${trafficType}`

// //   return useSWR<KPIData>(
// //     ["kpi", models, start, end, trafficType],
// //     () => apiFetcher(url, kpiData),
// //     {
// //       revalidateOnFocus: false,
// //       dedupingInterval: 60000,
// //     }
// //   )
// // }

// // /* ------------------------------------------------ */
// // /* TREND DATA */
// // /* ------------------------------------------------ */

// // export function useTrendData(
// //   selectedModel: string | null,
// //   competitors: string[],
// //   dateRange?: DateRange,
// //   trafficType: "overall" | "organic" | "inorganic" = "overall"
// // ) {

// //   const { start, end } = buildDateParams(dateRange)

// //   const modelList = buildModelList(selectedModel, competitors)

// //   const models = modelList.length ? modelList.join(",") : ""

// //   const url =
// //     `/api/analytics/trend?models=${models}&start=${start}&end=${end}&traffic=${trafficType}`

// //   return useSWR<TrendPoint[]>(
// //     ["trend", models, start, end, trafficType],
// //     () => trendFetcher(url),
// //     {
// //       revalidateOnFocus: false,
// //       dedupingInterval: 60000,
// //       fallbackData: [],
// //     }
// //   )
// // }

// // /* ------------------------------------------------ */
// // /* FUNNEL DATA */
// // /* ------------------------------------------------ */

// // export function useFunnelData(
// //   selectedModel: string | null,
// //   competitors: string[],
// //   dateRange?: DateRange,
// //   trafficType: "overall" | "organic" | "inorganic" = "overall"
// // ) {

// //   const { start, end } = buildDateParams(dateRange)

// //   const modelList = buildModelList(selectedModel, competitors)

// //   const models = modelList.length ? modelList.join(",") : ""

// //   const url =
// //     `/api/analytics/funnel?models=${models}&start=${start}&end=${end}&traffic=${trafficType}`

// //   return useSWR<FunnelStage[]>(
// //     ["funnel", models, start, end, trafficType],
// //     () => apiFetcher(url, funnelData),
// //     {
// //       revalidateOnFocus: false,
// //       dedupingInterval: 60000,
// //     }
// //   )
// // }

// // /* ------------------------------------------------ */
// // /* TRAFFIC SHARE */
// // /* ------------------------------------------------ */

// // export function useTrafficShareData(
// //   selectedModel: string | null,
// //   competitors: string[],
// //   dateRange?: DateRange,
// //   trafficType: "overall" | "organic" | "inorganic" = "overall"
// // ) {

// //   const { start, end } = buildDateParams(dateRange)

// //   const modelList = buildModelList(selectedModel, competitors)

// //   const models = modelList.length ? modelList.join(",") : ""

// //   const url =
// //     `/api/analytics/traffic?models=${models}&start=${start}&end=${end}&traffic=${trafficType}`

// //   return useSWR<TrafficShareItem[]>(
// //     ["traffic-share", models, start, end, trafficType],
// //     () => apiFetcher(url, trafficShareData),
// //     {
// //       revalidateOnFocus: false,
// //       dedupingInterval: 60000,
// //     }
// //   )
// // }

// // /* ------------------------------------------------ */
// // /* COMPETITOR DATA */
// // /* ------------------------------------------------ */

// // /* -------------------------------------------------- */
// // /* COMPETITOR DATA */
// // /* -------------------------------------------------- */

// // export const useCompetitorData = (
// //   selectedModel: string | null,
// //   competitors: string[],
// //   dateRange: DateRange
// // ) =>
// //   useSWR<CompetitorRow[]>(
// //     ["competitors", selectedModel, competitors, dateRange],
// //     async () => {

// //       /* ----------------------------- */
// //       /* GUARD */
// //       /* ----------------------------- */

// //       if (!selectedModel) {
// //         console.warn("Competitor hook: no selected model")
// //         return []
// //       }

// //       /* ----------------------------- */
// //       /* BUILD MODEL LIST */
// //       /* ----------------------------- */

// //       const models =
// //         [selectedModel, ...competitors]
// //           .filter(Boolean)
// //           .join(",")

// //       /* ----------------------------- */
// //       /* FORMAT DATES */
// //       /* ----------------------------- */

// //       const start =
// //         dateRange?.from
// //           ? dateRange.from.toISOString().slice(0,10)
// //           : ""

// //       const end =
// //         dateRange?.to
// //           ? dateRange.to.toISOString().slice(0,10)
// //           : ""

// //       /* ----------------------------- */
// //       /* BUILD URL */
// //       /* ----------------------------- */

// //       const url =
// //         `/api/analytics/competitors?models=${encodeURIComponent(models)}&start=${start}&end=${end}`

// //       console.log("Competitor API URL:", url)

// //       /* ----------------------------- */
// //       /* FETCH */
// //       /* ----------------------------- */

// //       const res =
// //         await apiFetcher(url, competitorData)

// //       console.log("Competitor API response:", res)

// //       /* ----------------------------- */
// //       /* RETURN DATA ARRAY */
// //       /* ----------------------------- */

// //       return res || []

// //     },
// //     {
// //       revalidateOnFocus: false
// //     }
// //   )

// // /* ------------------------------------------------ */
// // /* DEVICE DATA */
// // /* ------------------------------------------------ */

// // export function useDeviceData(
// //   selectedModel: string | null,
// //   competitors: string[],
// //   dateRange?: DateRange,
// //   trafficType: "overall" | "organic" | "inorganic" = "overall"
// // ) {

// //   const { start, end } = buildDateParams(dateRange)

// //   const modelList = buildModelList(selectedModel, competitors)

// //   const models = modelList.length ? modelList.join(",") : ""

// //   const url =
// //     `/api/analytics/device-summary?models=${models}&start=${start}&end=${end}&traffic=${trafficType}`

// //   return useSWR<DeviceData[]>(
// //     ["device", models, start, end, trafficType],
// //     () => apiFetcher(url, deviceData),
// //     { revalidateOnFocus: false }
// //   )
// // }

// // /* ------------------------------------------------ */
// // /* ENGAGEMENT DATA (FIXED) */
// // /* ------------------------------------------------ */

// // export function useEngagementData(
// //   selectedModel: string | null,
// //   competitors: string[],
// //   dateRange?: DateRange,
// //   trafficType: "overall" | "organic" | "inorganic" = "overall"
// // ) {

// //   const { start, end } = buildDateParams(dateRange)

// //   const modelList = buildModelList(selectedModel, competitors)

// //   const models = modelList.length ? modelList.join(",") : ""

// //   const url =
// //     `/api/analytics/engagement?models=${models}&start=${start}&end=${end}&traffic=${trafficType}`

// //   return useSWR<EngagementTrendPoint[]>(

// //     ["engagement", models, start, end, trafficType],

// //     async () => {

// //       const raw = await apiFetcher<any[]>(url, engagementTrendData)

// //       if (!Array.isArray(raw)) return []

// //       return raw.map((d) => ({
// //         date: d.date,
// //         pv_uu: Number(d.pv_uu ?? 0),
// //         avg_session_duration: Number(d.avg_session_duration ?? 0)
// //       }))

// //     },

// //     { revalidateOnFocus: false }

// //   )
// // }

// // /* ------------------------------------------------ */
// // /* ENGAGEMENT DATA (FULLY FIXED) */
// // /* ------------------------------------------------ */
// // /* ------------------------------------------------ */
// // /* GEOGRAPHIC DATA */
// // /* ------------------------------------------------ */

// // export function useGeographicData(
// //   selectedModel: string | null,
// //   competitors: string[],
// //   dateRange?: DateRange,
// //   trafficType: "overall" | "organic" | "inorganic" = "overall"
// // ) {

// //   const { start, end } = buildDateParams(dateRange)

// //   const modelList = buildModelList(selectedModel, competitors)

// //   const models = modelList.length ? modelList.join(",") : ""

// //   const url =
// //     `/api/analytics/country-summary?models=${models}&start=${start}&end=${end}&traffic=${trafficType}`

// //   return useSWR<GeographicData[]>(

// //     ["geo", models, start, end, trafficType],

// //     async () => {

// //       const raw = await apiFetcher<any[]>(url, geographicData)

// //       if (!Array.isArray(raw)) return []

// //       return raw.map((d) => ({
// //         state: d.state ?? "Unknown",
// //         visits: Number(d.visits ?? 0)
// //       }))

// //     },

// //     { revalidateOnFocus: false }

// //   )

// // }















// import useSWR from "swr"
// import { DateRange } from "react-day-picker"

// import {
//   kpiData,
//   trendData,
//   funnelData,
//   trafficShareData,
//   competitorData,
//   deviceData,
//   engagementTrendData,
//   geographicData,
// } from "./mock-data"

// import type {
//   KPIData,
//   TrendPoint,
//   FunnelStage,
//   TrafficShareItem,
//   CompetitorRow,
//   DeviceData,
//   EngagementTrendPoint,
//   GeographicData,
// } from "./types"

// const API_BASE =
//   process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000"

// /* ------------------------------------------------ */
// /* DATE HELPER */
// /* ------------------------------------------------ */

// function buildDateParams(dateRange?: DateRange) {

//   const today = new Date()
//   const todayStr = today.toISOString().split("T")[0]

//   if (!dateRange?.from) {
//     return { start: "7daysAgo", end: "today" }
//   }

//   const start = dateRange.from.toISOString().split("T")[0]

//   let end = dateRange.to
//     ? dateRange.to.toISOString().split("T")[0]
//     : start

//   if (new Date(end) > today) end = todayStr

//   return { start, end }
// }

// /* ------------------------------------------------ */
// /* MODEL NORMALIZER */
// /* ------------------------------------------------ */

// function buildModelList(selectedModel: string | null, competitors: string[]) {

//   if (!selectedModel) return []

//   const list =
//     [...new Set([selectedModel, ...competitors])]
//       .map((m) => m?.toLowerCase().trim())
//       .filter(Boolean)

//   console.log("MODEL LIST:", list)

//   return list
// }

// /* ------------------------------------------------ */
// /* UNIVERSAL FETCHER */
// /* ------------------------------------------------ */

// async function apiFetcher<T>(url: string, fallback: T): Promise<T> {

//   try {

//     const res = await fetch(`${API_BASE}${url}`)

//     if (!res.ok) throw new Error(`API error: ${res.status}`)

//     const json = await res.json()

//     if (json?.success && json?.data !== undefined) {
//       return json.data
//     }

//     return json

//   } catch (err) {

//     console.error("API fallback triggered:", url, err)

//     return fallback
//   }
// }

// /* ------------------------------------------------ */
// /* TREND FETCHER */
// /* ------------------------------------------------ */

// async function trendFetcher(url: string): Promise<TrendPoint[]> {

//   try {

//     const res = await fetch(`${API_BASE}${url}`)

//     if (!res.ok) throw new Error(`Trend API error: ${res.status}`)

//     const json = await res.json()

//     if (json?.success && Array.isArray(json?.data)) {
//       return json.data
//     }

//     return []

//   } catch (err) {

//     console.error("Trend API failed:", err)

//     return []
//   }
// }

// /* ------------------------------------------------ */
// /* KPI DATA */
// /* ------------------------------------------------ */

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

// /* ------------------------------------------------ */
// /* TREND DATA */
// /* ------------------------------------------------ */

// export function useTrendData(
//   selectedModel: string | null,
//   competitors: string[],
//   dateRange?: DateRange,
//   trafficType: "overall" | "organic" | "inorganic" = "overall"
// ) {

//   const { start, end } = buildDateParams(dateRange)

//   const modelList = buildModelList(selectedModel, competitors)

//   const models = modelList.join(",")

//   const url =
//     `/api/analytics/trend?models=${models}&start=${start}&end=${end}&traffic=${trafficType}`

//   return useSWR<TrendPoint[]>(
//     ["trend", models, start, end, trafficType],
//     () => trendFetcher(url),
//     {
//       revalidateOnFocus: false,
//       dedupingInterval: 60000,
//       fallbackData: [],
//     }
//   )
// }

// /* ------------------------------------------------ */
// /* FUNNEL DATA */
// /* ------------------------------------------------ */

// export function useFunnelData(
//   selectedModel: string | null,
//   competitors: string[],
//   dateRange?: DateRange,
//   trafficType: "overall" | "organic" | "inorganic" = "overall"
// ) {

//   const { start, end } = buildDateParams(dateRange)

//   const modelList = buildModelList(selectedModel, competitors)

//   const models = modelList.join(",")

//   const url =
//     `/api/analytics/funnel?models=${models}&start=${start}&end=${end}&traffic=${trafficType}`

//   return useSWR<FunnelStage[]>(
//     ["funnel", models, start, end, trafficType],
//     () => apiFetcher(url, funnelData),
//     {
//       revalidateOnFocus: false,
//       dedupingInterval: 60000,
//     }
//   )
// }

// /* ------------------------------------------------ */
// /* TRAFFIC SHARE */
// /* ------------------------------------------------ */

// export function useTrafficShareData(
//   selectedModel: string | null,
//   competitors: string[],
//   dateRange?: DateRange,
//   trafficType: "overall" | "organic" | "inorganic" = "overall"
// ) {

//   const { start, end } = buildDateParams(dateRange)

//   const modelList = buildModelList(selectedModel, competitors)

//   const models = modelList.join(",")

//   const url =
//     `/api/analytics/traffic?models=${models}&start=${start}&end=${end}&traffic=${trafficType}`

//   return useSWR<TrafficShareItem[]>(
//     ["traffic-share", models, start, end, trafficType],
//     () => apiFetcher(url, trafficShareData),
//     {
//       revalidateOnFocus: false,
//       dedupingInterval: 60000,
//     }
//   )
// }

// /* ------------------------------------------------ */
// /* COMPETITOR DATA */
// /* ------------------------------------------------ */

// export const useCompetitorData = (
//   selectedModel: string | null,
//   competitors: string[],
//   dateRange: DateRange
// ) =>
//   useSWR<CompetitorRow[]>(

//     ["competitors", selectedModel, competitors, dateRange],

//     async () => {

//       if (!selectedModel) {
//         console.warn("Competitor hook: no selected model")
//         return []
//       }

//       const models =
//         [selectedModel, ...competitors]
//           .filter(Boolean)
//           .join(",")

//       const start =
//         dateRange?.from
//           ? dateRange.from.toISOString().slice(0,10)
//           : ""

//       const end =
//         dateRange?.to
//           ? dateRange.to.toISOString().slice(0,10)
//           : ""

//       const url =
//         `/api/analytics/competitors?models=${encodeURIComponent(models)}&start=${start}&end=${end}`

//       console.log("Competitor API URL:", url)

//       const res =
//         await apiFetcher(url, competitorData)

//       console.log("Competitor API response:", res)

//       return res || []

//     },

//     { revalidateOnFocus: false }
//   )

// /* ------------------------------------------------ */
// /* DEVICE DATA */
// /* ------------------------------------------------ */

// export function useDeviceData(
//   selectedModel: string | null,
//   competitors: string[],
//   dateRange?: DateRange,
//   trafficType: "overall" | "organic" | "inorganic" = "overall"
// ) {

//   const { start, end } = buildDateParams(dateRange)

//   const modelList = buildModelList(selectedModel, competitors)

//   const models = modelList.join(",")

//   const url =
//     `/api/analytics/device-summary?models=${models}&start=${start}&end=${end}&traffic=${trafficType}`

//   return useSWR<DeviceData[]>(
//     ["device", models, start, end, trafficType],
//     () => apiFetcher(url, deviceData),
//     { revalidateOnFocus: false }
//   )
// }

// /* ------------------------------------------------ */
// /* ENGAGEMENT DATA */
// /* ------------------------------------------------ */

// export function useEngagementData(
//   selectedModel: string | null,
//   competitors: string[],
//   dateRange?: DateRange,
//   trafficType: "overall" | "organic" | "inorganic" = "overall"
// ) {

//   const { start, end } = buildDateParams(dateRange)

//   const modelList = buildModelList(selectedModel, competitors)

//   const models = modelList.join(",")

//   const url =
//     `/api/analytics/engagement?models=${models}&start=${start}&end=${end}&traffic=${trafficType}`

//   return useSWR<EngagementTrendPoint[]>(

//     ["engagement", models, start, end, trafficType],

//     async () => {

//       const raw = await apiFetcher<any[]>(url, engagementTrendData)

//       if (!Array.isArray(raw)) return []

//       return raw.map((d) => ({
//         date: d.date,
//         pv_uu: Number(d.pv_uu ?? 0),
//         avg_session_duration: Number(d.avg_session_duration ?? 0)
//       }))

//     },

//     { revalidateOnFocus: false }

//   )
// }

// /* ------------------------------------------------ */
// /* GEOGRAPHIC DATA */
// /* ------------------------------------------------ */

// export function useGeographicData(
//   selectedModel: string | null,
//   competitors: string[],
//   dateRange?: DateRange,
//   trafficType: "overall" | "organic" | "inorganic" = "overall"
// ) {

//   const { start, end } = buildDateParams(dateRange)

//   const modelList = buildModelList(selectedModel, competitors)

//   const models = modelList.join(",")

//   const url =
//     `/api/analytics/country-summary?models=${models}&start=${start}&end=${end}&traffic=${trafficType}`

//   return useSWR<GeographicData[]>(

//     ["geo", models, start, end, trafficType],

//     async () => {

//       const raw = await apiFetcher<any[]>(url, geographicData)

//       if (!Array.isArray(raw)) return []

//       return raw.map((d) => ({
//         state: d.state ?? "Unknown",
//         visits: Number(d.visits ?? 0)
//       }))

//     },

//     { revalidateOnFocus: false }

//   )

// }


// use upper code for normal implementation, this is just a placeholder to avoid errors during development.









import useSWR from "swr"
import { DateRange } from "react-day-picker"

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

export function useKPIData(
  selectedModel: string | null,
  competitors: string[],
  dateRange?: DateRange,
  trafficType: "overall" | "organic" | "inorganic" = "overall"
) {

  const { start, end } = buildDateParams(dateRange)

  const modelList = buildModelList(selectedModel, competitors)

  const models = modelList.join(",")

  const url =
    `/api/analytics/overview?models=${models}&start=${start}&end=${end}&traffic=${trafficType}`

  return useSWR<KPIData>(
    ["kpi", models, start, end, trafficType],
    () => apiFetcher(url, kpiData),
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  )
}

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
    ["trend", models, start, end, trafficType],
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

  const modelList = buildModelList(selectedModel, competitors)

  const models = modelList.join(",")

  const url =
    `/api/analytics/funnel?models=${models}&start=${start}&end=${end}&traffic=${trafficType}`

  return useSWR<FunnelStage[]>(
    ["funnel", models, start, end, trafficType],
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
    ["traffic-share", models, start, end, trafficType],
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

export const useCompetitorData = (
  selectedModel: string | null,
  competitors: string[],
  dateRange: DateRange
) =>
  useSWR<CompetitorRow[]>(

    ["competitors", selectedModel, competitors, dateRange],

    async () => {

      if (!selectedModel) {
        console.warn("Competitor hook: no selected model")
        return []
      }

      const models =
        [selectedModel, ...competitors]
          .filter(Boolean)
          .join(",")

      const start =
        dateRange?.from
          ? dateRange.from.toISOString().slice(0,10)
          : ""

      const end =
        dateRange?.to
          ? dateRange.to.toISOString().slice(0,10)
          : ""

      const url =
        `/api/analytics/competitors?models=${encodeURIComponent(models)}&start=${start}&end=${end}`

      console.log("Competitor API URL:", url)

      const res =
        await apiFetcher(url, competitorData)

      console.log("Competitor API response:", res)

      return res || []

    },

    { revalidateOnFocus: false }
  )

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

  const modelList = buildModelList(selectedModel, competitors)

  const models = modelList.join(",")

  const url =
    `/api/analytics/device-summary?models=${models}&start=${start}&end=${end}&traffic=${trafficType}`

  return useSWR<DeviceData[]>(
    ["device", models, start, end, trafficType],
    () => apiFetcher(url, deviceData),
    { revalidateOnFocus: false }
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

  const modelList = buildModelList(selectedModel, competitors)

  const models = modelList.join(",")

  const url =
    `/api/analytics/country-summary?models=${models}&start=${start}&end=${end}&traffic=${trafficType}`

  return useSWR<GeographicData[]>(

    ["geo", models, start, end, trafficType],

    async () => {

      const raw = await apiFetcher<any[]>(url, geographicData)

      if (!Array.isArray(raw)) return []

      return raw.map((d) => ({
        state: d.state ?? "Unknown",
        visits: Number(d.visits ?? 0)
      }))

    },

    { revalidateOnFocus: false }

  )

}