'use client'

import { useState, useCallback } from 'react'
import { DateRange } from 'react-day-picker'

import { DashboardHeader } from '@/components/dashboard-header'
import { TrendChart } from '@/components/trend-chart'
import { FunnelChart } from '@/components/funnel-chart'
import { TrafficShareChart } from '@/components/traffic-share-chart'
import { ComparisonTable } from '@/components/comparison-table'
import { DeviceChart } from '@/components/device-chart'
import EngagementChart from '@/components/engagement-chart'
import { GeographicInsights } from '@/components/geographic-insights'

import TrafficShareMovement from '@/components/dashboard/sections/TrafficShareMovement'
import PageViewShareMovement from '@/components/dashboard/sections/PageViewShareMovement'
import PVsPerVisitor from '@/components/dashboard/sections/PVsPerVisitor'
import MOFUShareMovement from '@/components/dashboard/sections/MOFUShareMovement'

import { generatePPT } from "@/lib/ppt/exportPPT"

import {
  useTrendData,
  useFunnelData,
  useTrafficShareData,
  useCompetitorData,
  useDeviceData,
  useEngagementData,
  useGeographicData,
  useHeatmapData
} from '@/lib/use-dashboard-data'

import { exportToCSV } from '@/lib/export-csv'
import { trafficShareData, competitorData } from '@/lib/mock-data'

/* ----------------------------- */
/* NORMALIZATION HELPERS */
/* ----------------------------- */

function normalizeModel(model: string | null) {
  if (!model) return null
  return model.toLowerCase().replace(/[_-]/g, " ").trim()
}

function normalizeModels(models: string[]) {
  return models.map(m =>
    m.toLowerCase().replace(/[_-]/g, " ").trim()
  )
}

export function Dashboard() {

  const [selectedModel, setSelectedModel] = useState<string | null>(null)
  const [analysisStarted, setAnalysisStarted] = useState(false)
  const [selectedCompetitors, setSelectedCompetitors] = useState<string[]>([])

  const [trafficType, setTrafficType] =
    useState<'overall' | 'organic' | 'inorganic'>('overall')

  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2025, 7, 1),
    to: new Date(),
  })

  /* ----------------------------- */
  /* NORMALIZED MODELS */
/* ----------------------------- */

  const focusModel = normalizeModel(selectedModel)
  const competitors = normalizeModels(selectedCompetitors)

  /* ----------------------------- */
  /* DATA HOOKS */
/* ----------------------------- */

  const { data: trendData, isLoading: trendLoading } =
    useTrendData(focusModel, competitors, dateRange, trafficType)

  const { data: funnelData, isLoading: funnelLoading } =
    useFunnelData(focusModel, competitors, dateRange, trafficType)

  const { data: trafficData, isLoading: trafficLoading } =
    useTrafficShareData(
      focusModel,
      competitors,
      dateRange,
      trafficType
    )

  /* 🔧 FIXED: pass focusModel not selectedModel */

  const { data: competitorTableData, isLoading: competitorLoading } =
    useCompetitorData(
      focusModel,
      competitors,
      dateRange,
    )

  const { data: deviceData, isLoading: deviceLoading } =
    useDeviceData(
      focusModel,
      competitors,
      dateRange,
      trafficType
    )

  const { data: engagementData, isLoading: engagementLoading } =
    useEngagementData(
      focusModel,
      competitors,
      dateRange,
      trafficType
    )

  const { data: geoData, isLoading: geoLoading } =
    useGeographicData(
      focusModel,
      competitors,
      dateRange,
      trafficType
    )

  const { data: trafficMovement } =
    useHeatmapData(
      "traffic",
      focusModel,
      competitors,
      dateRange,
      trafficType
    )

  const { data: pageviewMovement } =
    useHeatmapData(
      "pageviews",
      focusModel,
      competitors,
      dateRange,
      trafficType
    )

  const { data: pvsMovement } =
    useHeatmapData(
      "pvs",
      focusModel,
      competitors,
      dateRange,
      trafficType
    )

  const { data: mofuMovement } =
    useHeatmapData(
      "mofu",
      focusModel,
      competitors,
      dateRange,
      trafficType
    )

  /* ----------------------------- */
  /* EXPORT CSV */
/* ----------------------------- */

  const handleExport = useCallback(() => {

    const exportData = (trafficData || trafficShareData).map((item) => ({
      Model: item.model,
      'Search Share (%)': item.searchShare,
      'Traffic Share (%)': item.trafficShare,
      'Page Views Share (%)': item.pageViewsShare,
    }))

    exportToCSV(exportData, 'dbh-analytics-report')

    const competitorExport =
      (competitorTableData || competitorData).map((item) => ({
        Model: item.model,
        'Traffic Erosion Rank': item.trafficErosionRank,
        'Reverse Erosion Rank': item.reverseErosionRank,
        Performance: item.performance,
      }))

    exportToCSV(competitorExport, 'dbh-competitor-report')

  }, [trafficData, competitorTableData])

  /* ----------------------------- */
  /* PPT EXPORT */
/* ----------------------------- */

  const handleExportPPT = async () => {

    const charts:any[] = []

    if (trafficData?.length) {

      charts.push({
        title: "Traffic Share",
        labels: trafficData.map(d => d.model),
        values: trafficData.map(d => d.trafficShare)
      })

      charts.push({
        title: "Page Views Share",
        labels: trafficData.map(d => d.model),
        values: trafficData.map(d => d.pageViewsShare)
      })
    }

    if (deviceData?.length) {
      charts.push({
        title: "Device Distribution",
        labels: deviceData.map(d => d.device),
        values: deviceData.map(d => d.share ?? d.users)
      })
    }

    if (engagementData?.length) {
      charts.push({
        title: "Engagement",
        labels: engagementData.map(d => d.date),
        values: engagementData.map(d => d.pv_uu)
      })
    }

    const range =
      dateRange?.from && dateRange?.to
        ? `${dateRange.from.toLocaleDateString()} - ${dateRange.to.toLocaleDateString()}`
        : "Custom Range"

    await generatePPT({
      dateRange: range,
      models: [
        ...(selectedModel ? [selectedModel] : []),
        ...selectedCompetitors
      ],
      charts
    })
  }

  /* ----------------------------- */
  /* UI */
/* ----------------------------- */

  return (
    <div className="flex min-h-screen flex-col">

      <main className="flex-1 px-4 py-6 lg:px-8">

        <div className="mx-auto flex max-w-[1400px] flex-col gap-6">

          {!analysisStarted && (

            <div className="flex flex-col items-center justify-center text-center py-24">

              <img
                src="/cardekho_logo.avif"
                alt="Cardekho"
                className="h-12 mb-6"
              />

              <h1 className="text-3xl font-semibold">
                Digital Brand Health Report Tool
              </h1>

              <p className="text-gray-500 mt-3 max-w-xl">
                Analyze automotive demand signals across the purchase funnel
                using Cardekho user engagement, search and traffic insights.
              </p>

              <div className="mt-10">
                <button
                  onClick={() => setAnalysisStarted(true)}
                  className="rounded-lg bg-black px-6 py-3 text-white"
                >
                  Start Analysis
                </button>
              </div>

            </div>
          )}

          {analysisStarted && (

            <>

              <DashboardHeader
                selectedModel={selectedModel}
                onModelChange={setSelectedModel}
                selectedCompetitors={selectedCompetitors}
                onCompetitorsChange={setSelectedCompetitors}
                onExport={handleExport}
                onDownloadPPT={handleExportPPT}
                dateRange={dateRange}
                onDateRangeChange={setDateRange}
                trafficType={trafficType}
                onTrafficTypeChange={setTrafficType}
              />

              {selectedModel && (

                <>

                  <TrendChart data={trendData} isLoading={trendLoading} />

                  <div className="grid gap-6 lg:grid-cols-2">

                    <FunnelChart
                      data={funnelData}
                      isLoading={funnelLoading}
                    />

                    <TrafficShareChart
                      data={trafficData}
                      isLoading={trafficLoading}
                    />

                  </div>

                  <div className="grid gap-6 lg:grid-cols-2">

                    <EngagementChart
                      data={engagementData}
                      isLoading={engagementLoading}
                    />

                    <DeviceChart
                      data={deviceData}
                      isLoading={deviceLoading}
                    />

                  </div>

                  <div className="grid gap-6 lg:grid-cols-2">

                    <ComparisonTable
                      data={competitorTableData}
                      isLoading={competitorLoading}
                    />

                    <GeographicInsights
                      data={geoData}
                      isLoading={geoLoading}
                    />

                  </div>

                  <div className="grid gap-6 lg:grid-cols-2">

                    <TrafficShareMovement data={trafficMovement} />

                    <PageViewShareMovement data={pageviewMovement} />

                    <PVsPerVisitor data={pvsMovement} />

                    <MOFUShareMovement data={mofuMovement} />

                  </div>

                </>

              )}

            </>

          )}

        </div>

      </main>

    </div>
  )
}