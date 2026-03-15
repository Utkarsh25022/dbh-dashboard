import type {
  KPIData,
  TrendPoint,
  FunnelStage,
  TrafficShareItem,
  CompetitorRow,
  DeviceData,
  EngagementTrendPoint,
  GeographicData,
  ModelOption,
} from './types'

export const modelOptions: ModelOption[] = [
  { value: 'nexon',   label: 'Tata Nexon',      brand: 'tata'       },
  { value: 'punch',   label: 'Tata Punch',       brand: 'tata'       },
  { value: 'harrier', label: 'Tata Harrier',     brand: 'tata'       },
  { value: 'safari',  label: 'Tata Safari',      brand: 'tata'       },
  { value: 'curvv',   label: 'Tata Curvv',       brand: 'tata'       },
  { value: 'brezza',  label: 'Maruti Brezza',    brand: 'competitor' },
  { value: 'creta',   label: 'Hyundai Creta',    brand: 'competitor' },
  { value: 'seltos',  label: 'Kia Seltos',       brand: 'competitor' },
  { value: 'xuv700',  label: 'Mahindra XUV700',  brand: 'competitor' },
  { value: 'sonet',   label: 'Kia Sonet',        brand: 'competitor' },
]

export const kpiData: KPIData = {
  totalVisits:            2847592,
  activeUsers:            1423780,
  leads:                  34521,
  engagement:             4.7,
  consideration:          892340,
  awareness:              1856200,
  totalVisitsChange:      12.4,
  activeUsersChange:      8.2,
  leadsChange:            -3.1,
  engagementChange:       5.6,
  considerationChange:    15.2,
  awarenessChange:        9.8,
}

// ✅ trendData removed — TrendChart now only uses live GA4 data
// If GA4 fails, chart shows empty state (no hardcoded fallback)
export const trendData: TrendPoint[] = []

export const funnelData: FunnelStage[] = [
  { stage: 'Awareness (TOFU)',        value: 1856200, fill: 'var(--color-chart-1)' },
  { stage: 'Interest',                value: 1234500, fill: 'var(--color-chart-2)' },
  { stage: 'Consideration (MOFU)',    value: 892340,  fill: 'var(--color-chart-5)' },
  { stage: 'Purchase Intent (BOFU)',  value: 34521,   fill: 'var(--color-chart-3)' },
]

export const trafficShareData: TrafficShareItem[] = [
  { model: 'Tata Nexon',       searchShare: 27.8, trafficShare: 24.5, pageViewsShare: 22.1 },
  { model: 'Hyundai Creta',    searchShare: 20.4, trafficShare: 21.2, pageViewsShare: 19.8 },
  { model: 'Maruti Brezza',    searchShare: 15.2, trafficShare: 16.8, pageViewsShare: 17.4 },
  { model: 'Kia Seltos',       searchShare: 14.1, trafficShare: 13.9, pageViewsShare: 15.2 },
  { model: 'Mahindra XUV700',  searchShare: 15.2, trafficShare: 14.2, pageViewsShare: 13.8 },
  { model: 'Kia Sonet',        searchShare: 7.3,  trafficShare: 9.4,  pageViewsShare: 11.7 },
]

export const competitorData: CompetitorRow[] = [
  { model: 'Tata Nexon',      trafficErosionRank: 1, reverseErosionRank: 5, performance: 'high'   },
  { model: 'Hyundai Creta',   trafficErosionRank: 2, reverseErosionRank: 3, performance: 'high'   },
  { model: 'Maruti Brezza',   trafficErosionRank: 3, reverseErosionRank: 4, performance: 'medium' },
  { model: 'Kia Seltos',      trafficErosionRank: 4, reverseErosionRank: 2, performance: 'medium' },
  { model: 'Mahindra XUV700', trafficErosionRank: 5, reverseErosionRank: 1, performance: 'high'   },
  { model: 'Tata Punch',      trafficErosionRank: 6, reverseErosionRank: 6, performance: 'low'    },
  { model: 'Kia Sonet',       trafficErosionRank: 7, reverseErosionRank: 7, performance: 'medium' },
]

export const deviceData: DeviceData[] = [
  { device: 'Mobile',  share: 68.4, fill: 'var(--color-chart-1)' },
  { device: 'Desktop', share: 24.2, fill: 'var(--color-chart-2)' },
  { device: 'Tablet',  share: 7.4,  fill: 'var(--color-chart-5)' },
]

export const engagementTrendData: EngagementTrendPoint[] = [
  { month: 'Aug', pvPerUu: 3.8, avgSessionDuration: 4.2 },
  { month: 'Sep', pvPerUu: 4.1, avgSessionDuration: 4.5 },
  { month: 'Oct', pvPerUu: 4.3, avgSessionDuration: 4.1 },
  { month: 'Nov', pvPerUu: 4.6, avgSessionDuration: 4.8 },
  { month: 'Dec', pvPerUu: 4.9, avgSessionDuration: 5.1 },
  { month: 'Jan', pvPerUu: 4.7, avgSessionDuration: 4.9 },
]

export const geographicData: GeographicData[] = [
  { state: 'Maharashtra',   visits: 485200, share: 17.0 },
  { state: 'Delhi NCR',     visits: 412800, share: 14.5 },
  { state: 'Karnataka',     visits: 342100, share: 12.0 },
  { state: 'Tamil Nadu',    visits: 298700, share: 10.5 },
  { state: 'Gujarat',       visits: 256400, share: 9.0  },
  { state: 'Uttar Pradesh', visits: 228100, share: 8.0  },
  { state: 'Rajasthan',     visits: 185600, share: 6.5  },
  { state: 'West Bengal',   visits: 171000, share: 6.0  },
  { state: 'Telangana',     visits: 142500, share: 5.0  },
  { state: 'Kerala',        visits: 128400, share: 4.5  },
]

// ✅ CHART_COLORS for positional use (no model name dependency)
export const CHART_COLORS = [
  '#2563eb',
  '#dc2626',
  '#16a34a',
  '#d97706',
  '#7c3aed',
  '#0891b2',
  '#db2777',
]

// ✅ LINE_COLORS kept for other charts that still use named keys
export const LINE_COLORS: Record<string, string> = {
  'Tata Nexon':      '#3b6cf5',
  'Hyundai Creta':   '#10b981',
  'Maruti Brezza':   '#f59e0b',
  'Kia Seltos':      '#8b5cf6',
  'Mahindra XUV700': '#ef4444',
}