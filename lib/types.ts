export interface KPIData {
  totalVisits: number
  activeUsers: number
  leads: number
  engagement: number
  consideration: number
  awareness: number
  totalVisitsChange: number
  activeUsersChange: number
  leadsChange: number
  engagementChange: number
  considerationChange: number
  awarenessChange: number
}

// ✅ FIXED: "month" → "date", keys are normalized "tata_nexon" style
export interface TrendPoint {
  date: string
  [modelKey: string]: number | string
}

export interface FunnelStage {
  stage: string
  value: number
  fill: string
}

export interface TrafficShareItem {
  model: string
  searchShare: number
  trafficShare: number
  pageViewsShare: number
}

export interface CompetitorRow {
  model: string
  trafficErosionRank: number
  reverseTrafficErosionRank: number
  performance: 'high' | 'medium' | 'low'
}

export interface DeviceData {
  device: string
  share: number
  fill: string
}

export interface EngagementTrendPoint {
  month: string
  pvPerUu: number
  avgSessionDuration: number
}

export interface GeographicData {
  state: string
  visits: number
  share: number
}

export type ModelOption = {
  value: string
  label: string
  brand: 'tata' | 'competitor'
}