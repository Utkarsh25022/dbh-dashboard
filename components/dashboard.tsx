// // // // // // // // // 'use client'

// // // // // // // // // import { useState, useCallback } from 'react'
// // // // // // // // // import { DateRange } from 'react-day-picker'
// // // // // // // // // import useSWR from 'swr'

// // // // // // // // // import { DashboardHeader } from '@/components/dashboard-header'
// // // // // // // // // import { KPICards } from '@/components/kpi-cards'
// // // // // // // // // import { TrendChart } from '@/components/trend-chart'
// // // // // // // // // import { FunnelChart } from '@/components/funnel-chart'
// // // // // // // // // import { TrafficShareChart } from '@/components/traffic-share-chart'
// // // // // // // // // import { ComparisonTable } from '@/components/comparison-table'
// // // // // // // // // import { DeviceChart } from '@/components/device-chart'
// // // // // // // // // import EngagementChart from '@/components/engagement-chart'
// // // // // // // // // import { GeographicInsights } from '@/components/geographic-insights'
// // // // // // // // // import { TrafficErosionMatrix } from '@/components/traffic-erosion-matrix'

// // // // // // // // // import { generatePPT } from "@/lib/ppt/exportPPT"

// // // // // // // // // import {
// // // // // // // // // useKPIData,
// // // // // // // // // useTrendData,
// // // // // // // // // useFunnelData,
// // // // // // // // // useTrafficShareData,
// // // // // // // // // useCompetitorData,
// // // // // // // // // useDeviceData,
// // // // // // // // // useEngagementData,
// // // // // // // // // useGeographicData,
// // // // // // // // // } from '@/lib/use-dashboard-data'

// // // // // // // // // import { exportToCSV } from '@/lib/export-csv'
// // // // // // // // // import { trafficShareData, competitorData } from '@/lib/mock-data'

// // // // // // // // // export function Dashboard() {

// // // // // // // // // /* ----------------------------- */
// // // // // // // // // /* MODEL STATE */
// // // // // // // // // /* ----------------------------- */

// // // // // // // // // const [selectedModel, setSelectedModel] = useState('nexon')

// // // // // // // // // /* ----------------------------- */
// // // // // // // // // /* COMPETITOR STATE (FIXED) */
// // // // // // // // // /* ----------------------------- */

// // // // // // // // // const [selectedCompetitors, setSelectedCompetitors] = useState<string[]>([])

// // // // // // // // // /* ----------------------------- */
// // // // // // // // // /* TRAFFIC TYPE */
// // // // // // // // // /* ----------------------------- */

// // // // // // // // // const [trafficType, setTrafficType] =
// // // // // // // // // useState<'overall' | 'organic' | 'inorganic'>('overall')

// // // // // // // // // /* ----------------------------- */
// // // // // // // // // /* DATE RANGE */
// // // // // // // // // /* ----------------------------- */

// // // // // // // // // const [dateRange, setDateRange] = useState<DateRange | undefined>({
// // // // // // // // // from: new Date(2025, 7, 1),
// // // // // // // // // to: new Date(),
// // // // // // // // // })

// // // // // // // // // /* ----------------------------- */
// // // // // // // // // /* API HOOKS */
// // // // // // // // // /* ----------------------------- */

// // // // // // // // // const { data: kpiData, isLoading: kpiLoading } =
// // // // // // // // // useKPIData(selectedModel, selectedCompetitors, dateRange, trafficType)

// // // // // // // // // const { data: trendData, isLoading: trendLoading } =
// // // // // // // // // useTrendData(selectedModel, selectedCompetitors, dateRange, trafficType)

// // // // // // // // // const { data: funnelData, isLoading: funnelLoading } =
// // // // // // // // // useFunnelData(selectedModel, selectedCompetitors, dateRange, trafficType)

// // // // // // // // // const { data: trafficData, isLoading: trafficLoading } =
// // // // // // // // // useTrafficShareData()

// // // // // // // // // const { data: competitorTableData, isLoading: competitorLoading } =
// // // // // // // // // useCompetitorData()

// // // // // // // // // const { data: deviceData, isLoading: deviceLoading } =
// // // // // // // // // useDeviceData()

// // // // // // // // // const { data: engagementData, isLoading: engagementLoading } =
// // // // // // // // // useEngagementData()

// // // // // // // // // const { data: geoData, isLoading: geoLoading } =
// // // // // // // // // useGeographicData()

// // // // // // // // // /* ----------------------------- */
// // // // // // // // // /* TRAFFIC EROSION MATRIX */
// // // // // // // // // /* ----------------------------- */

// // // // // // // // // const { data: erosionData, isLoading: erosionLoading } =
// // // // // // // // // useSWR('/api/analytics/traffic-erosion',
// // // // // // // // // (url) => fetch(url)
// // // // // // // // // .then(res => res.json())
// // // // // // // // // .then(d => d.data || [])
// // // // // // // // // )

// // // // // // // // // /* ----------------------------- */
// // // // // // // // // /* EXPORT CSV */
// // // // // // // // // /* ----------------------------- */

// // // // // // // // // const handleExport = useCallback(() => {


// // // // // // // // // const exportData = (trafficData || trafficShareData).map((item) => ({
// // // // // // // // //   Model: item.model,
// // // // // // // // //   'Search Share (%)': item.searchShare,
// // // // // // // // //   'Traffic Share (%)': item.trafficShare,
// // // // // // // // //   'Page Views Share (%)': item.pageViewsShare,
// // // // // // // // // }))

// // // // // // // // // exportToCSV(exportData, 'dbh-analytics-report')

// // // // // // // // // const competitorExport =
// // // // // // // // //   (competitorTableData || competitorData).map((item) => ({
// // // // // // // // //     Model: item.model,
// // // // // // // // //     'Traffic Erosion Rank': item.trafficErosionRank,
// // // // // // // // //     'Reverse Erosion Rank': item.reverseTrafficErosionRank,
// // // // // // // // //     Performance: item.performance,
// // // // // // // // //   }))

// // // // // // // // // exportToCSV(competitorExport, 'dbh-competitor-report')


// // // // // // // // // }, [trafficData, competitorTableData])

// // // // // // // // // /* ----------------------------- */
// // // // // // // // // /* EXPORT PPT */
// // // // // // // // // /* ----------------------------- */

// // // // // // // // // const handleDownloadPPT = useCallback(async () => {


// // // // // // // // // const traffic = trafficData || trafficShareData
// // // // // // // // // const funnel = funnelData || []
// // // // // // // // // const competitors = competitorTableData || competitorData

// // // // // // // // // const charts = [
// // // // // // // // //   {
// // // // // // // // //     title: 'Traffic Share (%)',
// // // // // // // // //     labels: traffic.map((d) => d.model),
// // // // // // // // //     values: traffic.map((d) => d.trafficShare),
// // // // // // // // //   },
// // // // // // // // //   {
// // // // // // // // //     title: 'Search Share (%)',
// // // // // // // // //     labels: traffic.map((d) => d.model),
// // // // // // // // //     values: traffic.map((d) => d.searchShare),
// // // // // // // // //   },
// // // // // // // // //   {
// // // // // // // // //     title: 'Funnel Performance',
// // // // // // // // //     labels: funnel.map((d: any) => d.stage),
// // // // // // // // //     values: funnel.map((d: any) => d.value),
// // // // // // // // //   },
// // // // // // // // //   {
// // // // // // // // //     title: 'Competitor Performance',
// // // // // // // // //     labels: competitors.map((d) => d.model),
// // // // // // // // //     values: competitors.map((d) => d.performance),
// // // // // // // // //   },
// // // // // // // // // ]

// // // // // // // // // await generatePPT(charts)


// // // // // // // // // }, [trafficData, funnelData, competitorTableData])

// // // // // // // // // /* ----------------------------- */
// // // // // // // // // /* UI */
// // // // // // // // // /* ----------------------------- */

// // // // // // // // // return ( <div className="flex min-h-screen flex-col"> <main className="flex-1 px-4 py-6 lg:px-8">


// // // // // // // // //     <div className="mx-auto flex max-w-[1400px] flex-col gap-6">

// // // // // // // // //       <DashboardHeader
// // // // // // // // //         selectedModel={selectedModel}
// // // // // // // // //         onModelChange={setSelectedModel}

// // // // // // // // //         selectedCompetitors={selectedCompetitors}
// // // // // // // // //         onCompetitorsChange={setSelectedCompetitors}

// // // // // // // // //         onExport={handleExport}
// // // // // // // // //         onDownloadPPT={handleDownloadPPT}

// // // // // // // // //         dateRange={dateRange}
// // // // // // // // //         onDateRangeChange={setDateRange}

// // // // // // // // //         trafficType={trafficType}
// // // // // // // // //         onTrafficTypeChange={setTrafficType}
// // // // // // // // //       />

// // // // // // // // //       <KPICards data={kpiData} isLoading={kpiLoading} />

// // // // // // // // //       <TrendChart data={trendData} isLoading={trendLoading} />

// // // // // // // // //       <div className="grid gap-6 lg:grid-cols-2">

// // // // // // // // //         <FunnelChart
// // // // // // // // //           data={funnelData}
// // // // // // // // //           isLoading={funnelLoading}
// // // // // // // // //         />

// // // // // // // // //         <TrafficShareChart
// // // // // // // // //           data={trafficData}
// // // // // // // // //           isLoading={trafficLoading}
// // // // // // // // //         />

// // // // // // // // //       </div>

// // // // // // // // //       <div className="grid gap-6 lg:grid-cols-2">

// // // // // // // // //         <EngagementChart
// // // // // // // // //           data={engagementData}
// // // // // // // // //           isLoading={engagementLoading}
// // // // // // // // //         />

// // // // // // // // //         <DeviceChart
// // // // // // // // //           data={deviceData}
// // // // // // // // //           isLoading={deviceLoading}
// // // // // // // // //         />

// // // // // // // // //       </div>

// // // // // // // // //       <div className="grid gap-6 lg:grid-cols-2">

// // // // // // // // //         <ComparisonTable
// // // // // // // // //           data={competitorTableData}
// // // // // // // // //           isLoading={competitorLoading}
// // // // // // // // //         />

// // // // // // // // //         <GeographicInsights
// // // // // // // // //           data={geoData}
// // // // // // // // //           isLoading={geoLoading}
// // // // // // // // //         />

// // // // // // // // //       </div>

// // // // // // // // //       <TrafficErosionMatrix
// // // // // // // // //         data={erosionData || []}
// // // // // // // // //         isLoading={erosionLoading}
// // // // // // // // //       />

// // // // // // // // //     </div>

// // // // // // // // //   </main>
// // // // // // // // // </div>


// // // // // // // // // )
// // // // // // // // // }








// // // // // // // // 'use client'

// // // // // // // // import { useState, useCallback } from 'react'
// // // // // // // // import { DateRange } from 'react-day-picker'
// // // // // // // // import useSWR from 'swr'

// // // // // // // // import { DashboardHeader } from '@/components/dashboard-header'
// // // // // // // // import { KPICards } from '@/components/kpi-cards'
// // // // // // // // import { TrendChart } from '@/components/trend-chart'
// // // // // // // // import { FunnelChart } from '@/components/funnel-chart'
// // // // // // // // import { TrafficShareChart } from '@/components/traffic-share-chart'
// // // // // // // // import { ComparisonTable } from '@/components/comparison-table'
// // // // // // // // import { DeviceChart } from '@/components/device-chart'
// // // // // // // // import EngagementChart from '@/components/engagement-chart'
// // // // // // // // import { GeographicInsights } from '@/components/geographic-insights'
// // // // // // // // import { TrafficErosionMatrix } from '@/components/traffic-erosion-matrix'

// // // // // // // // import { generatePPT } from "@/lib/ppt/exportPPT"

// // // // // // // // import {
// // // // // // // //   useKPIData,
// // // // // // // //   useTrendData,
// // // // // // // //   useFunnelData,
// // // // // // // //   useTrafficShareData,
// // // // // // // //   useCompetitorData,
// // // // // // // //   useDeviceData,
// // // // // // // //   useEngagementData,
// // // // // // // //   useGeographicData,
// // // // // // // // } from '@/lib/use-dashboard-data'

// // // // // // // // import { exportToCSV } from '@/lib/export-csv'
// // // // // // // // import { trafficShareData, competitorData } from '@/lib/mock-data'

// // // // // // // // export function Dashboard() {

// // // // // // // //   /* ----------------------------- */
// // // // // // // //   /* MODEL STATE */
// // // // // // // //   /* ----------------------------- */

// // // // // // // //   const [selectedModel, setSelectedModel] = useState('nexon')

// // // // // // // //   /* ----------------------------- */
// // // // // // // //   /* COMPETITOR STATE (FIXED) */
// // // // // // // //   /* ----------------------------- */

// // // // // // // //   const [selectedCompetitors, setSelectedCompetitors] = useState<string[]>([])

// // // // // // // //   /* ----------------------------- */
// // // // // // // //   /* TRAFFIC TYPE */
// // // // // // // //   /* ----------------------------- */

// // // // // // // //   const [trafficType, setTrafficType] =
// // // // // // // //     useState<'overall' | 'organic' | 'inorganic'>('overall')

// // // // // // // //   /* ----------------------------- */
// // // // // // // //   /* DATE RANGE */
// // // // // // // //   /* ----------------------------- */

// // // // // // // //   const [dateRange, setDateRange] = useState<DateRange | undefined>({
// // // // // // // //     from: new Date(2025, 7, 1),
// // // // // // // //     to: new Date(),
// // // // // // // //   })

// // // // // // // //   /* ----------------------------- */
// // // // // // // //   /* API HOOKS */
// // // // // // // //   /* ----------------------------- */

// // // // // // // //   const { data: kpiData, isLoading: kpiLoading } =
// // // // // // // //     useKPIData(selectedModel, selectedCompetitors, dateRange, trafficType)

// // // // // // // //   const { data: trendData, isLoading: trendLoading } =
// // // // // // // //     useTrendData(selectedModel, selectedCompetitors, dateRange, trafficType)

// // // // // // // //   const { data: funnelData, isLoading: funnelLoading } =
// // // // // // // //     useFunnelData(selectedModel, selectedCompetitors, dateRange, trafficType)

// // // // // // // //   const { data: trafficData, isLoading: trafficLoading } =
// // // // // // // //     useTrafficShareData()

// // // // // // // //   const { data: competitorTableData, isLoading: competitorLoading } =
// // // // // // // //     useCompetitorData()

// // // // // // // //   const { data: deviceData, isLoading: deviceLoading } =
// // // // // // // //     useDeviceData()

// // // // // // // //   const { data: engagementData, isLoading: engagementLoading } =
// // // // // // // //     useEngagementData()

// // // // // // // //   const { data: geoData, isLoading: geoLoading } =
// // // // // // // //     useGeographicData()

// // // // // // // //   /* ----------------------------- */
// // // // // // // //   /* TRAFFIC EROSION MATRIX (FIXED)*/
// // // // // // // //   /* ----------------------------- */

// // // // // // // //   const { data: erosionData, isLoading: erosionLoading } =
// // // // // // // //     useSWR('/api/analytics/traffic-erosion',
// // // // // // // //       (url) => fetch(url)
// // // // // // // //         .then(res => res.json())
// // // // // // // //         .then(d => {
// // // // // // // //           console.log("Raw API Response for Erosion:", d); // Keeping this here so you can debug!
          
// // // // // // // //           // Check if the response is directly an array
// // // // // // // //           if (Array.isArray(d)) return d;
          
// // // // // // // //           // Check if the array is inside a 'data' property
// // // // // // // //           if (d && Array.isArray(d.data)) return d.data;
          
// // // // // // // //           // Fallback if the data shape is completely unrecognized
// // // // // // // //           return [];
// // // // // // // //         })
// // // // // // // //         .catch((err) => {
// // // // // // // //           console.error("Failed to fetch erosion data:", err);
// // // // // // // //           return [];
// // // // // // // //         })
// // // // // // // //     )

// // // // // // // //   /* ----------------------------- */
// // // // // // // //   /* EXPORT CSV */
// // // // // // // //   /* ----------------------------- */

// // // // // // // //   const handleExport = useCallback(() => {

// // // // // // // //     const exportData = (trafficData || trafficShareData).map((item) => ({
// // // // // // // //       Model: item.model,
// // // // // // // //       'Search Share (%)': item.searchShare,
// // // // // // // //       'Traffic Share (%)': item.trafficShare,
// // // // // // // //       'Page Views Share (%)': item.pageViewsShare,
// // // // // // // //     }))

// // // // // // // //     exportToCSV(exportData, 'dbh-analytics-report')

// // // // // // // //     const competitorExport =
// // // // // // // //       (competitorTableData || competitorData).map((item) => ({
// // // // // // // //         Model: item.model,
// // // // // // // //         'Traffic Erosion Rank': item.trafficErosionRank,
// // // // // // // //         'Reverse Erosion Rank': item.reverseTrafficErosionRank,
// // // // // // // //         Performance: item.performance,
// // // // // // // //       }))

// // // // // // // //     exportToCSV(competitorExport, 'dbh-competitor-report')

// // // // // // // //   }, [trafficData, competitorTableData])

// // // // // // // //   /* ----------------------------- */
// // // // // // // //   /* EXPORT PPT */
// // // // // // // //   /* ----------------------------- */

// // // // // // // //   const handleDownloadPPT = useCallback(async () => {

// // // // // // // //     const traffic = trafficData || trafficShareData
// // // // // // // //     const funnel = funnelData || []
// // // // // // // //     const competitors = competitorTableData || competitorData

// // // // // // // //     const charts = [
// // // // // // // //       {
// // // // // // // //         title: 'Traffic Share (%)',
// // // // // // // //         labels: traffic.map((d) => d.model),
// // // // // // // //         values: traffic.map((d) => d.trafficShare),
// // // // // // // //       },
// // // // // // // //       {
// // // // // // // //         title: 'Search Share (%)',
// // // // // // // //         labels: traffic.map((d) => d.model),
// // // // // // // //         values: traffic.map((d) => d.searchShare),
// // // // // // // //       },
// // // // // // // //       {
// // // // // // // //         title: 'Funnel Performance',
// // // // // // // //         labels: funnel.map((d: any) => d.stage),
// // // // // // // //         values: funnel.map((d: any) => d.value),
// // // // // // // //       },
// // // // // // // //       {
// // // // // // // //         title: 'Competitor Performance',
// // // // // // // //         labels: competitors.map((d) => d.model),
// // // // // // // //         values: competitors.map((d) => d.performance),
// // // // // // // //       },
// // // // // // // //     ]

// // // // // // // //     await generatePPT(charts)

// // // // // // // //   }, [trafficData, funnelData, competitorTableData])

// // // // // // // //   /* ----------------------------- */
// // // // // // // //   /* UI */
// // // // // // // //   /* ----------------------------- */

// // // // // // // //   return (
// // // // // // // //     <div className="flex min-h-screen flex-col">
// // // // // // // //       <main className="flex-1 px-4 py-6 lg:px-8">

// // // // // // // //         <div className="mx-auto flex max-w-[1400px] flex-col gap-6">

// // // // // // // //           <DashboardHeader
// // // // // // // //             selectedModel={selectedModel}
// // // // // // // //             onModelChange={setSelectedModel}

// // // // // // // //             selectedCompetitors={selectedCompetitors}
// // // // // // // //             onCompetitorsChange={setSelectedCompetitors}

// // // // // // // //             onExport={handleExport}
// // // // // // // //             onDownloadPPT={handleDownloadPPT}

// // // // // // // //             dateRange={dateRange}
// // // // // // // //             onDateRangeChange={setDateRange}

// // // // // // // //             trafficType={trafficType}
// // // // // // // //             onTrafficTypeChange={setTrafficType}
// // // // // // // //           />

// // // // // // // //           <KPICards data={kpiData} isLoading={kpiLoading} />

// // // // // // // //           <TrendChart data={trendData} isLoading={trendLoading} />

// // // // // // // //           <div className="grid gap-6 lg:grid-cols-2">

// // // // // // // //             <FunnelChart
// // // // // // // //               data={funnelData}
// // // // // // // //               isLoading={funnelLoading}
// // // // // // // //             />

// // // // // // // //             <TrafficShareChart
// // // // // // // //               data={trafficData}
// // // // // // // //               isLoading={trafficLoading}
// // // // // // // //             />

// // // // // // // //           </div>

// // // // // // // //           <div className="grid gap-6 lg:grid-cols-2">

// // // // // // // //             <EngagementChart
// // // // // // // //               data={engagementData}
// // // // // // // //               isLoading={engagementLoading}
// // // // // // // //             />

// // // // // // // //             <DeviceChart
// // // // // // // //               data={deviceData}
// // // // // // // //               isLoading={deviceLoading}
// // // // // // // //             />

// // // // // // // //           </div>

// // // // // // // //           <div className="grid gap-6 lg:grid-cols-2">

// // // // // // // //             <ComparisonTable
// // // // // // // //               data={competitorTableData}
// // // // // // // //               isLoading={competitorLoading}
// // // // // // // //             />

// // // // // // // //             <GeographicInsights
// // // // // // // //               data={geoData}
// // // // // // // //               isLoading={geoLoading}
// // // // // // // //             />

// // // // // // // //           </div>

// // // // // // // //           <TrafficErosionMatrix
// // // // // // // //             data={erosionData || []}
// // // // // // // //             isLoading={erosionLoading}
// // // // // // // //           />

// // // // // // // //         </div>

// // // // // // // //       </main>
// // // // // // // //     </div>
// // // // // // // //   )
// // // // // // // // }





// // // // // // // 'use client'

// // // // // // // import { useState, useCallback } from 'react'
// // // // // // // import { DateRange } from 'react-day-picker'
// // // // // // // import useSWR from 'swr'

// // // // // // // import { DashboardHeader } from '@/components/dashboard-header'
// // // // // // // import { KPICards } from '@/components/kpi-cards'
// // // // // // // import { TrendChart } from '@/components/trend-chart'
// // // // // // // import { FunnelChart } from '@/components/funnel-chart'
// // // // // // // import { TrafficShareChart } from '@/components/traffic-share-chart'
// // // // // // // import { ComparisonTable } from '@/components/comparison-table'
// // // // // // // import { DeviceChart } from '@/components/device-chart'
// // // // // // // import EngagementChart from '@/components/engagement-chart'
// // // // // // // import { GeographicInsights } from '@/components/geographic-insights'
// // // // // // // import { TrafficErosionMatrix } from '@/components/traffic-erosion-matrix'

// // // // // // // import { generatePPT } from "@/lib/ppt/exportPPT"

// // // // // // // import {
// // // // // // //   useKPIData,
// // // // // // //   useTrendData,
// // // // // // //   useFunnelData,
// // // // // // //   useTrafficShareData,
// // // // // // //   useCompetitorData,
// // // // // // //   useDeviceData,
// // // // // // //   useEngagementData,
// // // // // // //   useGeographicData,
// // // // // // // } from '@/lib/use-dashboard-data'

// // // // // // // import { exportToCSV } from '@/lib/export-csv'
// // // // // // // import { trafficShareData, competitorData } from '@/lib/mock-data'

// // // // // // // export function Dashboard() {

// // // // // // //   /* ----------------------------- */
// // // // // // //   /* MODEL STATE (NO DEFAULT) */
// // // // // // //   /* ----------------------------- */

// // // // // // //   const [selectedModel, setSelectedModel] = useState<string | null>(null)

// // // // // // //   /* ----------------------------- */
// // // // // // //   /* ANALYSIS STATE */
// // // // // // //   /* ----------------------------- */

// // // // // // //   const [analysisStarted, setAnalysisStarted] = useState(false)

// // // // // // //   /* ----------------------------- */
// // // // // // //   /* COMPETITOR STATE */
// // // // // // //   /* ----------------------------- */

// // // // // // //   const [selectedCompetitors, setSelectedCompetitors] = useState<string[]>([])

// // // // // // //   /* ----------------------------- */
// // // // // // //   /* TRAFFIC TYPE */
// // // // // // //   /* ----------------------------- */

// // // // // // //   const [trafficType, setTrafficType] =
// // // // // // //     useState<'overall' | 'organic' | 'inorganic'>('overall')

// // // // // // //   /* ----------------------------- */
// // // // // // //   /* DATE RANGE */
// // // // // // //   /* ----------------------------- */

// // // // // // //   const [dateRange, setDateRange] = useState<DateRange | undefined>({
// // // // // // //     from: new Date(2025, 7, 1),
// // // // // // //     to: new Date(),
// // // // // // //   })

// // // // // // //   /* ----------------------------- */
// // // // // // //   /* API HOOKS */
// // // // // // //   /* ----------------------------- */

// // // // // // //   const { data: kpiData, isLoading: kpiLoading } =
// // // // // // //     useKPIData(selectedModel, selectedCompetitors, dateRange, trafficType)

// // // // // // //   const { data: trendData, isLoading: trendLoading } =
// // // // // // //     useTrendData(selectedModel, selectedCompetitors, dateRange, trafficType)

// // // // // // //   const { data: funnelData, isLoading: funnelLoading } =
// // // // // // //     useFunnelData(selectedModel, selectedCompetitors, dateRange, trafficType)

// // // // // // //   const { data: trafficData, isLoading: trafficLoading } =
// // // // // // //     useTrafficShareData()

// // // // // // //   const { data: competitorTableData, isLoading: competitorLoading } =
// // // // // // //     useCompetitorData()

// // // // // // //   const { data: deviceData, isLoading: deviceLoading } =
// // // // // // //     useDeviceData()

// // // // // // //   const { data: engagementData, isLoading: engagementLoading } =
// // // // // // //     useEngagementData()

// // // // // // //   const { data: geoData, isLoading: geoLoading } =
// // // // // // //     useGeographicData()

// // // // // // //   /* ----------------------------- */
// // // // // // //   /* TRAFFIC EROSION MATRIX */
// // // // // // //   /* ----------------------------- */

// // // // // // //   const { data: erosionData, isLoading: erosionLoading } =
// // // // // // //     useSWR('/api/analytics/traffic-erosion',
// // // // // // //       (url) => fetch(url)
// // // // // // //         .then(res => res.json())
// // // // // // //         .then(d => {

// // // // // // //           console.log("Raw API Response for Erosion:", d)

// // // // // // //           if (Array.isArray(d)) return d

// // // // // // //           if (d && Array.isArray(d.data)) return d.data

// // // // // // //           return []
// // // // // // //         })
// // // // // // //         .catch((err) => {
// // // // // // //           console.error("Failed to fetch erosion data:", err)
// // // // // // //           return []
// // // // // // //         })
// // // // // // //     )

// // // // // // //   /* ----------------------------- */
// // // // // // //   /* EXPORT CSV */
// // // // // // //   /* ----------------------------- */

// // // // // // //   const handleExport = useCallback(() => {

// // // // // // //     const exportData = (trafficData || trafficShareData).map((item) => ({
// // // // // // //       Model: item.model,
// // // // // // //       'Search Share (%)': item.searchShare,
// // // // // // //       'Traffic Share (%)': item.trafficShare,
// // // // // // //       'Page Views Share (%)': item.pageViewsShare,
// // // // // // //     }))

// // // // // // //     exportToCSV(exportData, 'dbh-analytics-report')

// // // // // // //     const competitorExport =
// // // // // // //       (competitorTableData || competitorData).map((item) => ({
// // // // // // //         Model: item.model,
// // // // // // //         'Traffic Erosion Rank': item.trafficErosionRank,
// // // // // // //         'Reverse Erosion Rank': item.reverseTrafficErosionRank,
// // // // // // //         Performance: item.performance,
// // // // // // //       }))

// // // // // // //     exportToCSV(competitorExport, 'dbh-competitor-report')

// // // // // // //   }, [trafficData, competitorTableData])

// // // // // // //   /* ----------------------------- */
// // // // // // //   /* EXPORT PPT */
// // // // // // //   /* ----------------------------- */

// // // // // // //   const handleDownloadPPT = useCallback(async () => {

// // // // // // //     const traffic = trafficData || trafficShareData
// // // // // // //     const funnel = funnelData || []
// // // // // // //     const competitors = competitorTableData || competitorData

// // // // // // //     const charts = [
// // // // // // //       {
// // // // // // //         title: 'Traffic Share (%)',
// // // // // // //         labels: traffic.map((d) => d.model),
// // // // // // //         values: traffic.map((d) => d.trafficShare),
// // // // // // //       },
// // // // // // //       {
// // // // // // //         title: 'Search Share (%)',
// // // // // // //         labels: traffic.map((d) => d.model),
// // // // // // //         values: traffic.map((d) => d.searchShare),
// // // // // // //       },
// // // // // // //       {
// // // // // // //         title: 'Funnel Performance',
// // // // // // //         labels: funnel.map((d: any) => d.stage),
// // // // // // //         values: funnel.map((d: any) => d.value),
// // // // // // //       },
// // // // // // //       {
// // // // // // //         title: 'Competitor Performance',
// // // // // // //         labels: competitors.map((d) => d.model),
// // // // // // //         values: competitors.map((d) => d.performance),
// // // // // // //       },
// // // // // // //     ]

// // // // // // //     await generatePPT(charts)

// // // // // // //   }, [trafficData, funnelData, competitorTableData])

// // // // // // //   /* ----------------------------- */
// // // // // // //   /* UI */
// // // // // // //   /* ----------------------------- */

// // // // // // //   return (
// // // // // // //     <div className="flex min-h-screen flex-col">

// // // // // // //       <main className="flex-1 px-4 py-6 lg:px-8">

// // // // // // //         <div className="mx-auto flex max-w-[1400px] flex-col gap-6">

// // // // // // //           {/* ----------------------------- */}
// // // // // // //           {/* LANDING PAGE */}
// // // // // // //           {/* ----------------------------- */}

// // // // // // //           {!analysisStarted && (
// // // // // // //             <div className="flex flex-col items-center justify-center text-center py-24">

// // // // // // //               <img
// // // // // // //                 src="/cardekho-logo.svg"
// // // // // // //                 alt="Cardekho"
// // // // // // //                 className="h-12 mb-6"
// // // // // // //               />

// // // // // // //               <h1 className="text-3xl font-semibold">
// // // // // // //                 Demand Based Health Tool
// // // // // // //               </h1>

// // // // // // //               <p className="text-gray-500 mt-3 max-w-xl">
// // // // // // //                 Analyze automotive demand signals across the purchase funnel
// // // // // // //                 using Cardekho user engagement, search and traffic insights.
// // // // // // //               </p>

// // // // // // //               <div className="mt-10">

// // // // // // //                 <button
// // // // // // //                   onClick={() => setAnalysisStarted(true)}
// // // // // // //                   className="rounded-lg bg-black px-6 py-3 text-white"
// // // // // // //                 >
// // // // // // //                   Start Analysis
// // // // // // //                 </button>

// // // // // // //               </div>

// // // // // // //             </div>
// // // // // // //           )}

// // // // // // //           {/* ----------------------------- */}
// // // // // // //           {/* DASHBOARD */}
// // // // // // //           {/* ----------------------------- */}

// // // // // // //           {analysisStarted && (

// // // // // // //             <>

// // // // // // //               <DashboardHeader
// // // // // // //                 selectedModel={selectedModel}
// // // // // // //                 onModelChange={setSelectedModel}

// // // // // // //                 selectedCompetitors={selectedCompetitors}
// // // // // // //                 onCompetitorsChange={setSelectedCompetitors}

// // // // // // //                 onExport={handleExport}
// // // // // // //                 onDownloadPPT={handleDownloadPPT}

// // // // // // //                 dateRange={dateRange}
// // // // // // //                 onDateRangeChange={setDateRange}

// // // // // // //                 trafficType={trafficType}
// // // // // // //                 onTrafficTypeChange={setTrafficType}
// // // // // // //               />

// // // // // // //               <KPICards data={kpiData} isLoading={kpiLoading} />

// // // // // // //               <TrendChart data={trendData} isLoading={trendLoading} />

// // // // // // //               <div className="grid gap-6 lg:grid-cols-2">

// // // // // // //                 <FunnelChart
// // // // // // //                   data={funnelData}
// // // // // // //                   isLoading={funnelLoading}
// // // // // // //                 />

// // // // // // //                 <TrafficShareChart
// // // // // // //                   data={trafficData}
// // // // // // //                   isLoading={trafficLoading}
// // // // // // //                 />

// // // // // // //               </div>

// // // // // // //               <div className="grid gap-6 lg:grid-cols-2">

// // // // // // //                 <EngagementChart
// // // // // // //                   data={engagementData}
// // // // // // //                   isLoading={engagementLoading}
// // // // // // //                 />

// // // // // // //                 <DeviceChart
// // // // // // //                   data={deviceData}
// // // // // // //                   isLoading={deviceLoading}
// // // // // // //                 />

// // // // // // //               </div>

// // // // // // //               <div className="grid gap-6 lg:grid-cols-2">

// // // // // // //                 <ComparisonTable
// // // // // // //                   data={competitorTableData}
// // // // // // //                   isLoading={competitorLoading}
// // // // // // //                 />

// // // // // // //                 <GeographicInsights
// // // // // // //                   data={geoData}
// // // // // // //                   isLoading={geoLoading}
// // // // // // //                 />

// // // // // // //               </div>

// // // // // // //               <TrafficErosionMatrix
// // // // // // //                 data={erosionData || []}
// // // // // // //                 isLoading={erosionLoading}
// // // // // // //               />

// // // // // // //             </>

// // // // // // //           )}

// // // // // // //         </div>

// // // // // // //       </main>

// // // // // // //     </div>
// // // // // // //   )
// // // // // // // }







// // // // // // 'use client'

// // // // // // import { useState, useCallback } from 'react'
// // // // // // import { DateRange } from 'react-day-picker'
// // // // // // import useSWR from 'swr'

// // // // // // import { DashboardHeader } from '@/components/dashboard-header'
// // // // // // import { KPICards } from '@/components/kpi-cards'
// // // // // // import { TrendChart } from '@/components/trend-chart'
// // // // // // import { FunnelChart } from '@/components/funnel-chart'
// // // // // // import { TrafficShareChart } from '@/components/traffic-share-chart'
// // // // // // import { ComparisonTable } from '@/components/comparison-table'
// // // // // // import { DeviceChart } from '@/components/device-chart'
// // // // // // import EngagementChart from '@/components/engagement-chart'
// // // // // // import { GeographicInsights } from '@/components/geographic-insights'
// // // // // // import { TrafficErosionMatrix } from '@/components/traffic-erosion-matrix'

// // // // // // import { generatePPT } from "@/lib/ppt/exportPPT"

// // // // // // import {
// // // // // //   useKPIData,
// // // // // //   useTrendData,
// // // // // //   useFunnelData,
// // // // // //   useTrafficShareData,
// // // // // //   useCompetitorData,
// // // // // //   useDeviceData,
// // // // // //   useEngagementData,
// // // // // //   useGeographicData,
// // // // // // } from '@/lib/use-dashboard-data'

// // // // // // import { exportToCSV } from '@/lib/export-csv'
// // // // // // import { trafficShareData, competitorData } from '@/lib/mock-data'

// // // // // // export function Dashboard() {

// // // // // //   /* ----------------------------- */
// // // // // //   /* MODEL STATE */
// // // // // //   /* ----------------------------- */

// // // // // //   const [selectedModel, setSelectedModel] = useState<string | null>(null)

// // // // // //   /* ----------------------------- */
// // // // // //   /* ANALYSIS STATE */
// // // // // //   /* ----------------------------- */

// // // // // //   const [analysisStarted, setAnalysisStarted] = useState(false)

// // // // // //   /* ----------------------------- */
// // // // // //   /* COMPETITOR STATE */
// // // // // //   /* ----------------------------- */

// // // // // //   const [selectedCompetitors, setSelectedCompetitors] = useState<string[]>([])

// // // // // //   /* ----------------------------- */
// // // // // //   /* TRAFFIC TYPE */
// // // // // //   /* ----------------------------- */

// // // // // //   const [trafficType, setTrafficType] =
// // // // // //     useState<'overall' | 'organic' | 'inorganic'>('overall')

// // // // // //   /* ----------------------------- */
// // // // // //   /* DATE RANGE */
// // // // // //   /* ----------------------------- */

// // // // // //   const [dateRange, setDateRange] = useState<DateRange | undefined>({
// // // // // //     from: new Date(2025, 7, 1),
// // // // // //     to: new Date(),
// // // // // //   })

// // // // // //   /* ----------------------------- */
// // // // // //   /* API HOOKS */
// // // // // //   /* ----------------------------- */

// // // // // //   const { data: kpiData, isLoading: kpiLoading } =
// // // // // //     useKPIData(selectedModel, selectedCompetitors, dateRange, trafficType)

// // // // // //   const { data: trendData, isLoading: trendLoading } =
// // // // // //     useTrendData(selectedModel, selectedCompetitors, dateRange, trafficType)

// // // // // //   const { data: funnelData, isLoading: funnelLoading } =
// // // // // //     useFunnelData(selectedModel, selectedCompetitors, dateRange, trafficType)

// // // // // //   const { data: trafficData, isLoading: trafficLoading } =
// // // // // //     useTrafficShareData()

// // // // // //   const { data: competitorTableData, isLoading: competitorLoading } =
// // // // // //     useCompetitorData()

// // // // // //   const { data: deviceData, isLoading: deviceLoading } =
// // // // // //     useDeviceData()

// // // // // //   const { data: engagementData, isLoading: engagementLoading } =
// // // // // //     useEngagementData()

// // // // // //   const { data: geoData, isLoading: geoLoading } =
// // // // // //     useGeographicData()

// // // // // //   /* ----------------------------- */
// // // // // //   /* TRAFFIC EROSION MATRIX */
// // // // // //   /* ----------------------------- */

// // // // // //   const { data: erosionData, isLoading: erosionLoading } =
// // // // // //     useSWR('/api/analytics/traffic-erosion',
// // // // // //       (url) => fetch(url)
// // // // // //         .then(res => res.json())
// // // // // //         .then(d => {

// // // // // //           console.log("Raw API Response for Erosion:", d)

// // // // // //           if (Array.isArray(d)) return d
// // // // // //           if (d && Array.isArray(d.data)) return d.data

// // // // // //           return []
// // // // // //         })
// // // // // //         .catch((err) => {
// // // // // //           console.error("Failed to fetch erosion data:", err)
// // // // // //           return []
// // // // // //         })
// // // // // //     )

// // // // // //   /* ----------------------------- */
// // // // // //   /* EXPORT CSV */
// // // // // //   /* ----------------------------- */

// // // // // //   const handleExport = useCallback(() => {

// // // // // //     const exportData = (trafficData || trafficShareData).map((item) => ({
// // // // // //       Model: item.model,
// // // // // //       'Search Share (%)': item.searchShare,
// // // // // //       'Traffic Share (%)': item.trafficShare,
// // // // // //       'Page Views Share (%)': item.pageViewsShare,
// // // // // //     }))

// // // // // //     exportToCSV(exportData, 'dbh-analytics-report')

// // // // // //     const competitorExport =
// // // // // //       (competitorTableData || competitorData).map((item) => ({
// // // // // //         Model: item.model,
// // // // // //         'Traffic Erosion Rank': item.trafficErosionRank,
// // // // // //         'Reverse Erosion Rank': item.reverseTrafficErosionRank,
// // // // // //         Performance: item.performance,
// // // // // //       }))

// // // // // //     exportToCSV(competitorExport, 'dbh-competitor-report')

// // // // // //   }, [trafficData, competitorTableData])

// // // // // //   /* ----------------------------- */
// // // // // //   /* EXPORT PPT */
// // // // // //   /* ----------------------------- */

// // // // // //   const handleDownloadPPT = useCallback(async () => {

// // // // // //     const traffic = trafficData || trafficShareData
// // // // // //     const funnel = funnelData || []
// // // // // //     const competitors = competitorTableData || competitorData

// // // // // //     const charts = [
// // // // // //       {
// // // // // //         title: 'Traffic Share (%)',
// // // // // //         labels: traffic.map((d) => d.model),
// // // // // //         values: traffic.map((d) => d.trafficShare),
// // // // // //       },
// // // // // //       {
// // // // // //         title: 'Search Share (%)',
// // // // // //         labels: traffic.map((d) => d.model),
// // // // // //         values: traffic.map((d) => d.searchShare),
// // // // // //       },
// // // // // //       {
// // // // // //         title: 'Funnel Performance',
// // // // // //         labels: funnel.map((d: any) => d.stage),
// // // // // //         values: funnel.map((d: any) => d.value),
// // // // // //       },
// // // // // //       {
// // // // // //         title: 'Competitor Performance',
// // // // // //         labels: competitors.map((d) => d.model),
// // // // // //         values: competitors.map((d) => d.performance),
// // // // // //       },
// // // // // //     ]

// // // // // //     await generatePPT(charts)

// // // // // //   }, [trafficData, funnelData, competitorTableData])

// // // // // //   /* ----------------------------- */
// // // // // //   /* UI */
// // // // // //   /* ----------------------------- */

// // // // // //   return (
// // // // // //     <div className="flex min-h-screen flex-col">

// // // // // //       <main className="flex-1 px-4 py-6 lg:px-8">

// // // // // //         <div className="mx-auto flex max-w-[1400px] flex-col gap-6">

// // // // // //           {/* LANDING PAGE */}

// // // // // //           {!analysisStarted && (
// // // // // //             <div className="flex flex-col items-center justify-center text-center py-24">

// // // // // //               <img
// // // // // //                 src="/cardekho_logo.avif"
// // // // // //                 alt="Cardekho"
// // // // // //                 className="h-12 mb-6"
// // // // // //               />

// // // // // //               <h1 className="text-3xl font-semibold">
// // // // // //                 Demand Based Health Tool
// // // // // //               </h1>

// // // // // //               <p className="text-gray-500 mt-3 max-w-xl">
// // // // // //                 Analyze automotive demand signals across the purchase funnel
// // // // // //                 using Cardekho user engagement, search and traffic insights.
// // // // // //               </p>

// // // // // //               <div className="mt-10">

// // // // // //                 <button
// // // // // //                   onClick={() => setAnalysisStarted(true)}
// // // // // //                   className="rounded-lg bg-black px-6 py-3 text-white"
// // // // // //                 >
// // // // // //                   Start Analysis
// // // // // //                 </button>

// // // // // //               </div>

// // // // // //             </div>
// // // // // //           )}

// // // // // //           {/* DASHBOARD */}

// // // // // //           {analysisStarted && (

// // // // // //             <>

// // // // // //               <DashboardHeader
// // // // // //                 selectedModel={selectedModel}
// // // // // //                 onModelChange={setSelectedModel}

// // // // // //                 selectedCompetitors={selectedCompetitors}
// // // // // //                 onCompetitorsChange={setSelectedCompetitors}

// // // // // //                 onExport={handleExport}
// // // // // //                 onDownloadPPT={handleDownloadPPT}

// // // // // //                 dateRange={dateRange}
// // // // // //                 onDateRangeChange={setDateRange}

// // // // // //                 trafficType={trafficType}
// // // // // //                 onTrafficTypeChange={setTrafficType}
// // // // // //               />

// // // // // //               {/* KPI ALWAYS VISIBLE */}
// // // // // //               <KPICards data={kpiData} isLoading={kpiLoading} />

// // // // // //               {/* MESSAGE BEFORE MODEL SELECTION */}

// // // // // //               {!selectedModel && (

// // // // // //                 <div className="flex items-center justify-center py-24">

// // // // // //                   <div className="text-center max-w-md">

// // // // // //                     <h2 className="text-lg font-semibold">
// // // // // //                       Select a Focus Model
// // // // // //                     </h2>

// // // // // //                     <p className="text-sm text-muted-foreground mt-2">
// // // // // //                       Choose a focus model from the selector above to analyze
// // // // // //                       demand trends, funnel performance and competitor dynamics.
// // // // // //                     </p>

// // // // // //                   </div>

// // // // // //                 </div>

// // // // // //               )}

// // // // // //               {/* CHARTS AFTER MODEL SELECTED */}

// // // // // //               {selectedModel && (

// // // // // //                 <>

// // // // // //                   <TrendChart data={trendData} isLoading={trendLoading} />

// // // // // //                   <div className="grid gap-6 lg:grid-cols-2">

// // // // // //                     <FunnelChart
// // // // // //                       data={funnelData}
// // // // // //                       isLoading={funnelLoading}
// // // // // //                     />

// // // // // //                     <TrafficShareChart
// // // // // //                       data={trafficData}
// // // // // //                       isLoading={trafficLoading}
// // // // // //                     />

// // // // // //                   </div>

// // // // // //                   <div className="grid gap-6 lg:grid-cols-2">

// // // // // //                     <EngagementChart
// // // // // //                       data={engagementData}
// // // // // //                       isLoading={engagementLoading}
// // // // // //                     />

// // // // // //                     <DeviceChart
// // // // // //                       data={deviceData}
// // // // // //                       isLoading={deviceLoading}
// // // // // //                     />

// // // // // //                   </div>

// // // // // //                   <div className="grid gap-6 lg:grid-cols-2">

// // // // // //                     <ComparisonTable
// // // // // //                       data={competitorTableData}
// // // // // //                       isLoading={competitorLoading}
// // // // // //                     />

// // // // // //                     <GeographicInsights
// // // // // //                       data={geoData}
// // // // // //                       isLoading={geoLoading}
// // // // // //                     />

// // // // // //                   </div>

// // // // // //                   <TrafficErosionMatrix
// // // // // //                     data={erosionData || []}
// // // // // //                     isLoading={erosionLoading}
// // // // // //                   />

// // // // // //                 </>

// // // // // //               )}

// // // // // //             </>

// // // // // //           )}

// // // // // //         </div>

// // // // // //       </main>

// // // // // //     </div>
// // // // // //   )
// // // // // // }












// // // // // 'use client'

// // // // // import { useState, useCallback } from 'react'
// // // // // import { DateRange } from 'react-day-picker'
// // // // // import useSWR from 'swr'

// // // // // import { DashboardHeader } from '@/components/dashboard-header'
// // // // // import { KPICards } from '@/components/kpi-cards'
// // // // // import { TrendChart } from '@/components/trend-chart'
// // // // // import { FunnelChart } from '@/components/funnel-chart'
// // // // // import { TrafficShareChart } from '@/components/traffic-share-chart'
// // // // // import { ComparisonTable } from '@/components/comparison-table'
// // // // // import { DeviceChart } from '@/components/device-chart'
// // // // // import EngagementChart from '@/components/engagement-chart'
// // // // // import { GeographicInsights } from '@/components/geographic-insights'
// // // // // import { TrafficErosionMatrix } from '@/components/traffic-erosion-matrix'

// // // // // import { generatePPT } from "@/lib/ppt/exportPPT"

// // // // // import {
// // // // //   useKPIData,
// // // // //   useTrendData,
// // // // //   useFunnelData,
// // // // //   useTrafficShareData,
// // // // //   useCompetitorData,
// // // // //   useDeviceData,
// // // // //   useEngagementData,
// // // // //   useGeographicData,
// // // // // } from '@/lib/use-dashboard-data'

// // // // // import { exportToCSV } from '@/lib/export-csv'
// // // // // import { trafficShareData, competitorData } from '@/lib/mock-data'

// // // // // export function Dashboard() {

// // // // //   const [selectedModel, setSelectedModel] = useState<string | null>(null)
// // // // //   const [analysisStarted, setAnalysisStarted] = useState(false)
// // // // //   const [selectedCompetitors, setSelectedCompetitors] = useState<string[]>([])

// // // // //   const [trafficType, setTrafficType] =
// // // // //     useState<'overall' | 'organic' | 'inorganic'>('overall')

// // // // //   const [dateRange, setDateRange] = useState<DateRange | undefined>({
// // // // //     from: new Date(2025, 7, 1),
// // // // //     to: new Date(),
// // // // //   })

// // // // //   const { data: kpiData, isLoading: kpiLoading } =
// // // // //     useKPIData(selectedModel, selectedCompetitors, dateRange, trafficType)

// // // // //   const { data: trendData, isLoading: trendLoading } =
// // // // //     useTrendData(selectedModel, selectedCompetitors, dateRange, trafficType)

// // // // //   const { data: funnelData, isLoading: funnelLoading } =
// // // // //     useFunnelData(selectedModel, selectedCompetitors, dateRange, trafficType)

// // // // //   const { data: trafficData, isLoading: trafficLoading } =
// // // // //     useTrafficShareData()

// // // // //   const { data: competitorTableData, isLoading: competitorLoading } =
// // // // //     useCompetitorData()

// // // // //   const { data: deviceData, isLoading: deviceLoading } =
// // // // //     useDeviceData()

// // // // //   const { data: engagementData, isLoading: engagementLoading } =
// // // // //     useEngagementData()

// // // // //   const { data: geoData, isLoading: geoLoading } =
// // // // //     useGeographicData()

// // // // //   const { data: erosionData, isLoading: erosionLoading } =
// // // // //     useSWR('/api/analytics/traffic-erosion',
// // // // //       (url) => fetch(url)
// // // // //         .then(res => res.json())
// // // // //         .then(d => {
// // // // //           if (Array.isArray(d)) return d
// // // // //           if (d && Array.isArray(d.data)) return d.data
// // // // //           return []
// // // // //         })
// // // // //         .catch(() => [])
// // // // //     )

// // // // //   const handleExport = useCallback(() => {

// // // // //     const exportData = (trafficData || trafficShareData).map((item) => ({
// // // // //       Model: item.model,
// // // // //       'Search Share (%)': item.searchShare,
// // // // //       'Traffic Share (%)': item.trafficShare,
// // // // //       'Page Views Share (%)': item.pageViewsShare,
// // // // //     }))

// // // // //     exportToCSV(exportData, 'dbh-analytics-report')

// // // // //     const competitorExport =
// // // // //       (competitorTableData || competitorData).map((item) => ({
// // // // //         Model: item.model,
// // // // //         'Traffic Erosion Rank': item.trafficErosionRank,
// // // // //         'Reverse Erosion Rank': item.reverseTrafficErosionRank,
// // // // //         Performance: item.performance,
// // // // //       }))

// // // // //     exportToCSV(competitorExport, 'dbh-competitor-report')

// // // // //   }, [trafficData, competitorTableData])

// // // // //   const handleDownloadPPT = useCallback(async () => {

// // // // //     const traffic = trafficData || trafficShareData
// // // // //     const funnel = funnelData || []
// // // // //     const competitors = competitorTableData || competitorData

// // // // //     const charts = [
// // // // //       {
// // // // //         title: 'Traffic Share (%)',
// // // // //         labels: traffic.map((d) => d.model),
// // // // //         values: traffic.map((d) => d.trafficShare),
// // // // //       },
// // // // //       {
// // // // //         title: 'Search Share (%)',
// // // // //         labels: traffic.map((d) => d.model),
// // // // //         values: traffic.map((d) => d.searchShare),
// // // // //       },
// // // // //       {
// // // // //         title: 'Funnel Performance',
// // // // //         labels: funnel.map((d: any) => d.stage),
// // // // //         values: funnel.map((d: any) => d.value),
// // // // //       },
// // // // //       {
// // // // //         title: 'Competitor Performance',
// // // // //         labels: competitors.map((d) => d.model),
// // // // //         values: competitors.map((d) => d.performance),
// // // // //       },
// // // // //     ]

// // // // //     await generatePPT(charts)

// // // // //   }, [trafficData, funnelData, competitorTableData])

// // // // //   return (
// // // // //     <div className="flex min-h-screen flex-col">

// // // // //       <main className="flex-1 px-4 py-6 lg:px-8">

// // // // //         <div className="mx-auto flex max-w-[1400px] flex-col gap-6">

// // // // //           {/* LANDING PAGE */}

// // // // //           {!analysisStarted && (
// // // // //             <div className="flex flex-col items-center justify-center text-center py-24">

// // // // //               <img
// // // // //                 src="/cardekho_logo.avif"
// // // // //                 alt="Cardekho"
// // // // //                 className="h-12 mb-6"
// // // // //               />

// // // // //               <h1 className="text-3xl font-semibold">
// // // // //                 Demand Based Health Tool
// // // // //               </h1>

// // // // //               <p className="text-gray-500 mt-3 max-w-xl">
// // // // //                 Analyze automotive demand signals across the purchase funnel
// // // // //                 using Cardekho user engagement, search and traffic insights.
// // // // //               </p>

// // // // //               <div className="mt-10">
// // // // //                 <button
// // // // //                   onClick={() => setAnalysisStarted(true)}
// // // // //                   className="rounded-lg bg-black px-6 py-3 text-white"
// // // // //                 >
// // // // //                   Start Analysis
// // // // //                 </button>
// // // // //               </div>

// // // // //             </div>
// // // // //           )}

// // // // //           {/* DASHBOARD */}

// // // // //           {analysisStarted && (

// // // // //             <>

// // // // //               <DashboardHeader
// // // // //                 selectedModel={selectedModel}
// // // // //                 onModelChange={setSelectedModel}
// // // // //                 selectedCompetitors={selectedCompetitors}
// // // // //                 onCompetitorsChange={setSelectedCompetitors}
// // // // //                 onExport={handleExport}
// // // // //                 onDownloadPPT={handleDownloadPPT}
// // // // //                 dateRange={dateRange}
// // // // //                 onDateRangeChange={setDateRange}
// // // // //                 trafficType={trafficType}
// // // // //                 onTrafficTypeChange={setTrafficType}
// // // // //               />

// // // // //               <KPICards data={kpiData} isLoading={kpiLoading} />

// // // // //               {/* DBH INSTRUCTIONS */}

// // // // //               {!selectedModel && (

// // // // //                 <div className="flex justify-center py-20">

// // // // //                   <div className="max-w-3xl text-center space-y-10">

// // // // //                     <div>
// // // // //                       <h2 className="text-xl font-semibold">
// // // // //                         Demand Based Health (DBH)
// // // // //                       </h2>

// // // // //                       <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
// // // // //                         Measure how automotive models perform across the digital
// // // // //                         purchase funnel using real user behaviour signals from
// // // // //                         the CarDekho platform.
// // // // //                       </p>
// // // // //                     </div>

// // // // //                     <div>

// // // // //                       <p className="font-medium mb-3">
// // // // //                         Signals Used
// // // // //                       </p>

// // // // //                       <div className="flex flex-wrap justify-center gap-3 text-sm">

// // // // //                         <span className="px-3 py-1 rounded-md bg-muted">
// // // // //                           Search Demand
// // // // //                         </span>

// // // // //                         <span className="px-3 py-1 rounded-md bg-muted">
// // // // //                           Page Traffic
// // // // //                         </span>

// // // // //                         <span className="px-3 py-1 rounded-md bg-muted">
// // // // //                           User Engagement
// // // // //                         </span>

// // // // //                         <span className="px-3 py-1 rounded-md bg-muted">
// // // // //                           Funnel Progression
// // // // //                         </span>

// // // // //                       </div>

// // // // //                     </div>

// // // // //                     <div>

// // // // //                       <p className="font-medium mb-3">
// // // // //                         How It Works
// // // // //                       </p>

// // // // //                       <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">

// // // // //                         <div>1️⃣ Select Focus Model</div>
// // // // //                         <div>2️⃣ Add Competitors</div>
// // // // //                         <div>3️⃣ Analyze Demand Signals</div>
// // // // //                         <div>4️⃣ Export Insights</div>

// // // // //                       </div>

// // // // //                     </div>

// // // // //                     <div className="border-t pt-6 text-sm text-muted-foreground">
// // // // //                       Select a focus model above to begin analysis.
// // // // //                     </div>

// // // // //                   </div>

// // // // //                 </div>

// // // // //               )}

// // // // //               {selectedModel && (

// // // // //                 <>

// // // // //                   <TrendChart data={trendData} isLoading={trendLoading} />

// // // // //                   <div className="grid gap-6 lg:grid-cols-2">

// // // // //                     <FunnelChart
// // // // //                       data={funnelData}
// // // // //                       isLoading={funnelLoading}
// // // // //                     />

// // // // //                     <TrafficShareChart
// // // // //                       data={trafficData}
// // // // //                       isLoading={trafficLoading}
// // // // //                     />

// // // // //                   </div>

// // // // //                   <div className="grid gap-6 lg:grid-cols-2">

// // // // //                     <EngagementChart
// // // // //                       data={engagementData}
// // // // //                       isLoading={engagementLoading}
// // // // //                     />

// // // // //                     <DeviceChart
// // // // //                       data={deviceData}
// // // // //                       isLoading={deviceLoading}
// // // // //                     />

// // // // //                   </div>

// // // // //                   <div className="grid gap-6 lg:grid-cols-2">

// // // // //                     <ComparisonTable
// // // // //                       data={competitorTableData}
// // // // //                       isLoading={competitorLoading}
// // // // //                     />

// // // // //                     <GeographicInsights
// // // // //                       data={geoData}
// // // // //                       isLoading={geoLoading}
// // // // //                     />

// // // // //                   </div>

// // // // //                   <TrafficErosionMatrix
// // // // //                     data={erosionData || []}
// // // // //                     isLoading={erosionLoading}
// // // // //                   />

// // // // //                 </>

// // // // //               )}

// // // // //             </>

// // // // //           )}

// // // // //         </div>

// // // // //       </main>

// // // // //     </div>
// // // // //   )
// // // // // }















// // // // 'use client'

// // // // import { useState, useCallback } from 'react'
// // // // import { DateRange } from 'react-day-picker'
// // // // import useSWR from 'swr'

// // // // import { DashboardHeader } from '@/components/dashboard-header'
// // // // import { KPICards } from '@/components/kpi-cards'
// // // // import { TrendChart } from '@/components/trend-chart'
// // // // import { FunnelChart } from '@/components/funnel-chart'
// // // // import { TrafficShareChart } from '@/components/traffic-share-chart'
// // // // import { ComparisonTable } from '@/components/comparison-table'
// // // // import { DeviceChart } from '@/components/device-chart'
// // // // import EngagementChart from '@/components/engagement-chart'
// // // // import { GeographicInsights } from '@/components/geographic-insights'
// // // // import { TrafficErosionMatrix } from '@/components/traffic-erosion-matrix'

// // // // import { generatePPT } from "@/lib/ppt/exportPPT"

// // // // import {
// // // //   useKPIData,
// // // //   useTrendData,
// // // //   useFunnelData,
// // // //   useTrafficShareData,
// // // //   useCompetitorData,
// // // //   useDeviceData,
// // // //   useEngagementData,
// // // //   useGeographicData,
// // // // } from '@/lib/use-dashboard-data'

// // // // import { exportToCSV } from '@/lib/export-csv'
// // // // import { trafficShareData, competitorData } from '@/lib/mock-data'

// // // // /* ----------------------------- */
// // // // /* MODEL NORMALIZER */
// // // // /* ----------------------------- */

// // // // function normalizeModel(model: string | null) {
// // // //   if (!model) return null
// // // //   return model.toLowerCase().replace(/[_-]/g, " ").trim()
// // // // }

// // // // function normalizeModels(models: string[]) {
// // // //   return models.map(m =>
// // // //     m.toLowerCase().replace(/[_-]/g, " ").trim()
// // // //   )
// // // // }

// // // // export function Dashboard() {

// // // //   const [selectedModel, setSelectedModel] = useState<string | null>(null)
// // // //   const [analysisStarted, setAnalysisStarted] = useState(false)
// // // //   const [selectedCompetitors, setSelectedCompetitors] = useState<string[]>([])

// // // //   const [trafficType, setTrafficType] =
// // // //     useState<'overall' | 'organic' | 'inorganic'>('overall')

// // // //   const [dateRange, setDateRange] = useState<DateRange | undefined>({
// // // //     from: new Date(2025, 7, 1),
// // // //     to: new Date(),
// // // //   })

// // // //   /* ----------------------------- */
// // // //   /* NORMALIZED MODELS */
// // // //   /* ----------------------------- */

// // // //   const focusModel = normalizeModel(selectedModel)
// // // //   const competitors = normalizeModels(selectedCompetitors)

// // // //   const { data: kpiData, isLoading: kpiLoading } =
// // // //     useKPIData(focusModel, competitors, dateRange, trafficType)

// // // //   const { data: trendData, isLoading: trendLoading } =
// // // //     useTrendData(focusModel, competitors, dateRange, trafficType)

// // // //   const { data: funnelData, isLoading: funnelLoading } =
// // // //     useFunnelData(focusModel, competitors, dateRange, trafficType)

// // // //   const { data: trafficData, isLoading: trafficLoading } =
// // // //     useTrafficShareData(
// // // //       focusModel,
// // // //       competitors,
// // // //       dateRange,
// // // //       trafficType
// // // //     )

// // // //   const { data: competitorTableData, isLoading: competitorLoading } =
// // // //     useCompetitorData()

// // // //   const { data: deviceData, isLoading: deviceLoading } =
// // // //     useDeviceData(
// // // //       focusModel,
// // // //       competitors,
// // // //       dateRange,
// // // //       trafficType
// // // //     )

// // // //   const { data: engagementData, isLoading: engagementLoading } =
// // // //     useEngagementData(
// // // //       focusModel,
// // // //       competitors,
// // // //       dateRange,
// // // //       trafficType
// // // //     )

// // // //   const { data: geoData, isLoading: geoLoading } =
// // // //     useGeographicData(
// // // //       focusModel,
// // // //       competitors,
// // // //       dateRange,
// // // //       trafficType
// // // //     )

// // // //   const { data: erosionData, isLoading: erosionLoading } =
// // // //     useSWR('/api/analytics/traffic-erosion',
// // // //       (url) => fetch(url)
// // // //         .then(res => res.json())
// // // //         .then(d => {
// // // //           if (Array.isArray(d)) return d
// // // //           if (d && Array.isArray(d.data)) return d.data
// // // //           return []
// // // //         })
// // // //         .catch(() => [])
// // // //     )

// // // //   const handleExport = useCallback(() => {

// // // //     const exportData = (trafficData || trafficShareData).map((item) => ({
// // // //       Model: item.model,
// // // //       'Search Share (%)': item.searchShare,
// // // //       'Traffic Share (%)': item.trafficShare,
// // // //       'Page Views Share (%)': item.pageViewsShare,
// // // //     }))

// // // //     exportToCSV(exportData, 'dbh-analytics-report')

// // // //     const competitorExport =
// // // //       (competitorTableData || competitorData).map((item) => ({
// // // //         Model: item.model,
// // // //         'Traffic Erosion Rank': item.trafficErosionRank,
// // // //         'Reverse Erosion Rank': item.reverseTrafficErosionRank,
// // // //         Performance: item.performance,
// // // //       }))

// // // //     exportToCSV(competitorExport, 'dbh-competitor-report')

// // // //   }, [trafficData, competitorTableData])

// // // //   const handleDownloadPPT = useCallback(async () => {

// // // //     const traffic = trafficData || trafficShareData
// // // //     const funnel = funnelData || []
// // // //     const competitors = competitorTableData || competitorData

// // // //     const charts = [
// // // //       {
// // // //         title: 'Traffic Share (%)',
// // // //         labels: traffic.map((d) => d.model),
// // // //         values: traffic.map((d) => d.trafficShare),
// // // //       },
// // // //       {
// // // //         title: 'Search Share (%)',
// // // //         labels: traffic.map((d) => d.model),
// // // //         values: traffic.map((d) => d.searchShare),
// // // //       },
// // // //       {
// // // //         title: 'Funnel Performance',
// // // //         labels: funnel.map((d: any) => d.stage),
// // // //         values: funnel.map((d: any) => d.value),
// // // //       },
// // // //       {
// // // //         title: 'Competitor Performance',
// // // //         labels: competitors.map((d) => d.model),
// // // //         values: competitors.map((d) => d.performance),
// // // //       },
// // // //     ]

// // // //     await generatePPT(charts)

// // // //   }, [trafficData, funnelData, competitorTableData])

// // // //   return (
// // // //     <div className="flex min-h-screen flex-col">

// // // //       <main className="flex-1 px-4 py-6 lg:px-8">

// // // //         <div className="mx-auto flex max-w-[1400px] flex-col gap-6">

// // // //           {!analysisStarted && (
// // // //             <div className="flex flex-col items-center justify-center text-center py-24">

// // // //               <img
// // // //                 src="/cardekho_logo.avif"
// // // //                 alt="Cardekho"
// // // //                 className="h-12 mb-6"
// // // //               />

// // // //               <h1 className="text-3xl font-semibold">
// // // //                 Demand Based Health Tool
// // // //               </h1>

// // // //               <p className="text-gray-500 mt-3 max-w-xl">
// // // //                 Analyze automotive demand signals across the purchase funnel
// // // //                 using Cardekho user engagement, search and traffic insights.
// // // //               </p>

// // // //               <div className="mt-10">
// // // //                 <button
// // // //                   onClick={() => setAnalysisStarted(true)}
// // // //                   className="rounded-lg bg-black px-6 py-3 text-white"
// // // //                 >
// // // //                   Start Analysis
// // // //                 </button>
// // // //               </div>

// // // //             </div>
// // // //           )}

// // // //           {analysisStarted && (

// // // //             <>

// // // //               <DashboardHeader
// // // //                 selectedModel={selectedModel}
// // // //                 onModelChange={setSelectedModel}
// // // //                 selectedCompetitors={selectedCompetitors}
// // // //                 onCompetitorsChange={setSelectedCompetitors}
// // // //                 onExport={handleExport}
// // // //                 onDownloadPPT={handleDownloadPPT}
// // // //                 dateRange={dateRange}
// // // //                 onDateRangeChange={setDateRange}
// // // //                 trafficType={trafficType}
// // // //                 onTrafficTypeChange={setTrafficType}
// // // //               />

// // // //               <KPICards data={kpiData} isLoading={kpiLoading} />

// // // //               {selectedModel && (

// // // //                 <>

// // // //                   <TrendChart data={trendData} isLoading={trendLoading} />

// // // //                   <div className="grid gap-6 lg:grid-cols-2">

// // // //                     <FunnelChart
// // // //                       data={funnelData}
// // // //                       isLoading={funnelLoading}
// // // //                     />

// // // //                     <TrafficShareChart
// // // //                       data={trafficData}
// // // //                       isLoading={trafficLoading}
// // // //                     />

// // // //                   </div>

// // // //                   <div className="grid gap-6 lg:grid-cols-2">

// // // //                     <EngagementChart
// // // //                       data={engagementData}
// // // //                       isLoading={engagementLoading}
// // // //                     />

// // // //                     <DeviceChart
// // // //                       data={deviceData}
// // // //                       isLoading={deviceLoading}
// // // //                     />

// // // //                   </div>

// // // //                   <div className="grid gap-6 lg:grid-cols-2">

// // // //                     <ComparisonTable
// // // //                       data={competitorTableData}
// // // //                       isLoading={competitorLoading}
// // // //                     />

// // // //                     <GeographicInsights
// // // //                       data={geoData}
// // // //                       isLoading={geoLoading}
// // // //                     />

// // // //                   </div>

// // // //                   <TrafficErosionMatrix
// // // //                     data={erosionData || []}
// // // //                     isLoading={erosionLoading}
// // // //                   />

// // // //                 </>

// // // //               )}

// // // //             </>

// // // //           )}

// // // //         </div>

// // // //       </main>

// // // //     </div>
// // // //   )
// // // // }














// // // 'use client'

// // // import { useState, useCallback } from 'react'
// // // import { DateRange } from 'react-day-picker'
// // // import useSWR from 'swr'

// // // import { DashboardHeader } from '@/components/dashboard-header'
// // // import { KPICards } from '@/components/kpi-cards'
// // // import { TrendChart } from '@/components/trend-chart'
// // // import { FunnelChart } from '@/components/funnel-chart'
// // // import { TrafficShareChart } from '@/components/traffic-share-chart'
// // // import { ComparisonTable } from '@/components/comparison-table'
// // // import { DeviceChart } from '@/components/device-chart'
// // // import EngagementChart from '@/components/engagement-chart'
// // // import { GeographicInsights } from '@/components/geographic-insights'
// // // import { TrafficErosionMatrix } from '@/components/traffic-erosion-matrix'

// // // import { generatePPT } from "@/lib/ppt/exportPPT"

// // // import {
// // //   useKPIData,
// // //   useTrendData,
// // //   useFunnelData,
// // //   useTrafficShareData,
// // //   useCompetitorData,
// // //   useDeviceData,
// // //   useEngagementData,
// // //   useGeographicData,
// // // } from '@/lib/use-dashboard-data'

// // // import { exportToCSV } from '@/lib/export-csv'
// // // import { trafficShareData, competitorData } from '@/lib/mock-data'


// // // /* ----------------------------- */
// // // /* MODEL NORMALIZER */
// // // /* ----------------------------- */

// // // function normalizeModel(model: string | null) {
// // //   if (!model) return null
// // //   return model.toLowerCase().replace(/[_-]/g, " ").trim()
// // // }

// // // function normalizeModels(models: string[]) {
// // //   return models.map(m =>
// // //     m.toLowerCase().replace(/[_-]/g, " ").trim()
// // //   )
// // // }

// // // export function Dashboard() {

// // //   const [selectedModel, setSelectedModel] = useState<string | null>(null)
// // //   const [analysisStarted, setAnalysisStarted] = useState(false)
// // //   const [selectedCompetitors, setSelectedCompetitors] = useState<string[]>([])

// // //   const [trafficType, setTrafficType] =
// // //     useState<'overall' | 'organic' | 'inorganic'>('overall')

// // //   const [dateRange, setDateRange] = useState<DateRange | undefined>({
// // //     from: new Date(2025, 7, 1),
// // //     to: new Date(),
// // //   })

// // //   /* ----------------------------- */
// // //   /* NORMALIZED MODELS */
// // //   /* ----------------------------- */

// // //   const focusModel = normalizeModel(selectedModel)
// // //   const competitors = normalizeModels(selectedCompetitors)

// // //   const { data: kpiData, isLoading: kpiLoading } =
// // //     useKPIData(focusModel, competitors, dateRange, trafficType)

// // //   const { data: trendData, isLoading: trendLoading } =
// // //     useTrendData(focusModel, competitors, dateRange, trafficType)

// // //   const { data: funnelData, isLoading: funnelLoading } =
// // //     useFunnelData(focusModel, competitors, dateRange, trafficType)

// // //   const { data: trafficData, isLoading: trafficLoading } =
// // //     useTrafficShareData(
// // //       focusModel,
// // //       competitors,
// // //       dateRange,
// // //       trafficType
// // //     )

// // //   const { data: competitorTableData, isLoading: competitorLoading } =
// // //     useCompetitorData()

// // //   const { data: deviceData, isLoading: deviceLoading } =
// // //     useDeviceData(
// // //       focusModel,
// // //       competitors,
// // //       dateRange,
// // //       trafficType
// // //     )

// // //   const { data: engagementData, isLoading: engagementLoading } =
// // //     useEngagementData(
// // //       focusModel,
// // //       competitors,
// // //       dateRange,
// // //       trafficType
// // //     )

// // //   const { data: geoData, isLoading: geoLoading } =
// // //     useGeographicData(
// // //       focusModel,
// // //       competitors,
// // //       dateRange,
// // //       trafficType
// // //     )

// // //   const { data: erosionData, isLoading: erosionLoading } =
// // //     useSWR('/api/analytics/traffic-erosion',
// // //       (url) => fetch(url)
// // //         .then(res => res.json())
// // //         .then(d => {
// // //           if (Array.isArray(d)) return d
// // //           if (d && Array.isArray(d.data)) return d.data
// // //           return []
// // //         })
// // //         .catch(() => [])
// // //     )

// // //   /* ----------------------------- */
// // //   /* CSV EXPORT */
// // //   /* ----------------------------- */

// // //   const handleExport = useCallback(() => {

// // //     const exportData = (trafficData || trafficShareData).map((item) => ({
// // //       Model: item.model,
// // //       'Search Share (%)': item.searchShare,
// // //       'Traffic Share (%)': item.trafficShare,
// // //       'Page Views Share (%)': item.pageViewsShare,
// // //     }))

// // //     exportToCSV(exportData, 'dbh-analytics-report')

// // //     const competitorExport =
// // //       (competitorTableData || competitorData).map((item) => ({
// // //         Model: item.model,
// // //         'Traffic Erosion Rank': item.trafficErosionRank,
// // //         'Reverse Erosion Rank': item.reverseTrafficErosionRank,
// // //         Performance: item.performance,
// // //       }))

// // //     exportToCSV(competitorExport, 'dbh-competitor-report')

// // //   }, [trafficData, competitorTableData])


// // //   /* ----------------------------- */
// // //   /* PPT EXPORT */
// // //   /* ----------------------------- */

// // //   const handleDownloadPPT = useCallback(async () => {

// // //     const traffic = trafficData || trafficShareData
// // //     const funnel = funnelData || []
// // //     const competitors = competitorTableData || competitorData
// // //     const devices = deviceData || []
// // //     const engagement = engagementData || []
// // //     const geo = geoData || []
// // //     const erosion = erosionData || []

// // //     const charts = [

// // //       {
// // //         title: 'Traffic Share (%)',
// // //         labels: traffic.map((d) => d.model),
// // //         values: traffic.map((d) => d.trafficShare),
// // //       },

// // //       {
// // //         title: 'Search Share (%)',
// // //         labels: traffic.map((d) => d.model),
// // //         values: traffic.map((d) => d.searchShare),
// // //       },

// // //       {
// // //         title: 'Funnel Performance',
// // //         labels: funnel.map((d: any) => d.stage),
// // //         values: funnel.map((d: any) => d.value),
// // //       },

// // //       {
// // //         title: 'Device Distribution',
// // //         labels: devices.map((d: any) => d.device),
// // //         values: devices.map((d: any) => d.value),
// // //       },

// // //       {
// // //         title: 'Engagement',
// // //         labels: engagement.map((d: any) => d.metric),
// // //         values: engagement.map((d: any) => d.value),
// // //       },

// // //       {
// // //         title: 'Geographic Distribution',
// // //         labels: geo.map((d: any) => d.region),
// // //         values: geo.map((d: any) => d.value),
// // //       },

// // //       {
// // //         title: 'Traffic Erosion',
// // //         labels: erosion.map((d: any) => d.model),
// // //         values: erosion.map((d: any) => d.loss),
// // //       },

// // //       {
// // //         title: 'Competitor Performance',
// // //         labels: competitors.map((d) => d.model),
// // //         values: competitors.map((d) => d.performance),
// // //       }

// // //     ]

// // //     const trendChart = trendData ? {

// // //       title: "Traffic Trend",

// // //       labels: trendData.map((d: any) => d.date),

// // //       series: [
// // //         {
// // //           name: "Users",
// // //           values: trendData.map((d: any) => d.users)
// // //         }
// // //       ]

// // //     } : undefined

// // //     const range = dateRange?.from && dateRange?.to
// // //       ? `${dateRange.from.toLocaleDateString()} - ${dateRange.to.toLocaleDateString()}`
// // //       : "Custom Range"

// // //     await generatePPT({

// // //       dateRange: range,

// // //       models: [
// // //         ...(selectedModel ? [selectedModel] : []),
// // //         ...selectedCompetitors
// // //       ],

// // //       trendChart,

// // //       charts

// // //     })

// // //   }, [
// // //     trafficData,
// // //     funnelData,
// // //     competitorTableData,
// // //     deviceData,
// // //     engagementData,
// // //     geoData,
// // //     erosionData,
// // //     trendData,
// // //     selectedModel,
// // //     selectedCompetitors,
// // //     dateRange
// // //   ])


// // //   return (
// // //     <div className="flex min-h-screen flex-col">

// // //       <main className="flex-1 px-4 py-6 lg:px-8">

// // //         <div className="mx-auto flex max-w-[1400px] flex-col gap-6">

// // //           {!analysisStarted && (

// // //             <div className="flex flex-col items-center justify-center text-center py-24">

// // //               <img
// // //                 src="/cardekho_logo.avif"
// // //                 alt="Cardekho"
// // //                 className="h-12 mb-6"
// // //               />

// // //               <h1 className="text-3xl font-semibold">
// // //                 Demand Based Health Tool
// // //               </h1>

// // //               <p className="text-gray-500 mt-3 max-w-xl">
// // //                 Analyze automotive demand signals across the purchase funnel
// // //                 using Cardekho user engagement, search and traffic insights.
// // //               </p>

// // //               <div className="mt-10">
// // //                 <button
// // //                   onClick={() => setAnalysisStarted(true)}
// // //                   className="rounded-lg bg-black px-6 py-3 text-white"
// // //                 >
// // //                   Start Analysis
// // //                 </button>
// // //               </div>

// // //             </div>

// // //           )}

// // //           {analysisStarted && (

// // //             <>

// // //               <DashboardHeader
// // //                 selectedModel={selectedModel}
// // //                 onModelChange={setSelectedModel}
// // //                 selectedCompetitors={selectedCompetitors}
// // //                 onCompetitorsChange={setSelectedCompetitors}
// // //                 onExport={handleExport}
// // //                 onDownloadPPT={handleDownloadPPT}
// // //                 dateRange={dateRange}
// // //                 onDateRangeChange={setDateRange}
// // //                 trafficType={trafficType}
// // //                 onTrafficTypeChange={setTrafficType}
// // //               />

// // //               <KPICards data={kpiData} isLoading={kpiLoading} />

// // //               {selectedModel && (

// // //                 <>

// // //                   <TrendChart data={trendData} isLoading={trendLoading} />

// // //                   <div className="grid gap-6 lg:grid-cols-2">

// // //                     <FunnelChart
// // //                       data={funnelData}
// // //                       isLoading={funnelLoading}
// // //                     />

// // //                     <TrafficShareChart
// // //                       data={trafficData}
// // //                       isLoading={trafficLoading}
// // //                     />

// // //                   </div>

// // //                   <div className="grid gap-6 lg:grid-cols-2">

// // //                     <EngagementChart
// // //                       data={engagementData}
// // //                       isLoading={engagementLoading}
// // //                     />

// // //                     <DeviceChart
// // //                       data={deviceData}
// // //                       isLoading={deviceLoading}
// // //                     />

// // //                   </div>

// // //                   <div className="grid gap-6 lg:grid-cols-2">

// // //                     <ComparisonTable
// // //                       data={competitorTableData}
// // //                       isLoading={competitorLoading}
// // //                     />

// // //                     <GeographicInsights
// // //                       data={geoData}
// // //                       isLoading={geoLoading}
// // //                     />

// // //                   </div>

// // //                   <TrafficErosionMatrix
// // //                     data={erosionData || []}
// // //                     isLoading={erosionLoading}
// // //                   />

// // //                 </>

// // //               )}

// // //             </>

// // //           )}

// // //         </div>

// // //       </main>

// // //     </div>
// // //   )
// // // }




































// // 'use client'

// // import { useState, useCallback } from 'react'
// // import { DateRange } from 'react-day-picker'
// // import useSWR from 'swr'

// // import { DashboardHeader } from '@/components/dashboard-header'
// // import { KPICards } from '@/components/kpi-cards'
// // import { TrendChart } from '@/components/trend-chart'
// // import { FunnelChart } from '@/components/funnel-chart'
// // import { TrafficShareChart } from '@/components/traffic-share-chart'
// // import { ComparisonTable } from '@/components/comparison-table'
// // import { DeviceChart } from '@/components/device-chart'
// // import EngagementChart from '@/components/engagement-chart'
// // import { GeographicInsights } from '@/components/geographic-insights'
// // import { TrafficErosionMatrix } from '@/components/traffic-erosion-matrix'

// // import { generatePPT } from "@/lib/ppt/exportPPT"

// // import {
// //   useKPIData,
// //   useTrendData,
// //   useFunnelData,
// //   useTrafficShareData,
// //   useCompetitorData,
// //   useDeviceData,
// //   useEngagementData,
// //   useGeographicData,
// // } from '@/lib/use-dashboard-data'

// // import { exportToCSV } from '@/lib/export-csv'
// // import { trafficShareData, competitorData } from '@/lib/mock-data'


// // /* ----------------------------- */
// // /* MODEL NORMALIZER */
// // /* ----------------------------- */

// // function normalizeModel(model: string | null) {
// //   if (!model) return null
// //   return model.toLowerCase().replace(/[_-]/g, " ").trim()
// // }

// // function normalizeModels(models: string[]) {
// //   return models.map(m =>
// //     m.toLowerCase().replace(/[_-]/g, " ").trim()
// //   )
// // }

// // export function Dashboard() {

// //   const [selectedModel, setSelectedModel] = useState<string | null>(null)
// //   const [analysisStarted, setAnalysisStarted] = useState(false)
// //   const [selectedCompetitors, setSelectedCompetitors] = useState<string[]>([])

// //   const [trafficType, setTrafficType] =
// //     useState<'overall' | 'organic' | 'inorganic'>('overall')

// //   const [dateRange, setDateRange] = useState<DateRange | undefined>({
// //     from: new Date(2025, 7, 1),
// //     to: new Date(),
// //   })

// //   /* ----------------------------- */
// //   /* NORMALIZED MODELS */
// //   /* ----------------------------- */

// //   const focusModel = normalizeModel(selectedModel)
// //   const competitors = normalizeModels(selectedCompetitors)

// //   const { data: kpiData, isLoading: kpiLoading } =
// //     useKPIData(focusModel, competitors, dateRange, trafficType)

// //   const { data: trendData, isLoading: trendLoading } =
// //     useTrendData(focusModel, competitors, dateRange, trafficType)

// //   const { data: funnelData, isLoading: funnelLoading } =
// //     useFunnelData(focusModel, competitors, dateRange, trafficType)

// //   const { data: trafficData, isLoading: trafficLoading } =
// //     useTrafficShareData(
// //       focusModel,
// //       competitors,
// //       dateRange,
// //       trafficType
// //     )

// //   const { data: competitorTableData, isLoading: competitorLoading } =
// //     useCompetitorData()

// //   const { data: deviceData, isLoading: deviceLoading } =
// //     useDeviceData(
// //       focusModel,
// //       competitors,
// //       dateRange,
// //       trafficType
// //     )

// //   const { data: engagementData, isLoading: engagementLoading } =
// //     useEngagementData(
// //       focusModel,
// //       competitors,
// //       dateRange,
// //       trafficType
// //     )

// //   const { data: geoData, isLoading: geoLoading } =
// //     useGeographicData(
// //       focusModel,
// //       competitors,
// //       dateRange,
// //       trafficType
// //     )

// //   const { data: erosionData, isLoading: erosionLoading } =
// //     useSWR('/api/analytics/traffic-erosion',
// //       (url) => fetch(url)
// //         .then(res => res.json())
// //         .then(d => {
// //           if (Array.isArray(d)) return d
// //           if (d && Array.isArray(d.data)) return d.data
// //           return []
// //         })
// //         .catch(() => [])
// //     )

// //   /* ----------------------------- */
// //   /* CSV EXPORT */
// //   /* ----------------------------- */

// //   const handleExport = useCallback(() => {

// //     const exportData = (trafficData || trafficShareData).map((item) => ({
// //       Model: item.model,
// //       'Search Share (%)': item.searchShare,
// //       'Traffic Share (%)': item.trafficShare,
// //       'Page Views Share (%)': item.pageViewsShare,
// //     }))

// //     exportToCSV(exportData, 'dbh-analytics-report')

// //     const competitorExport =
// //       (competitorTableData || competitorData).map((item) => ({
// //         Model: item.model,
// //         'Traffic Erosion Rank': item.trafficErosionRank,
// //         'Reverse Erosion Rank': item.reverseTrafficErosionRank,
// //         Performance: item.performance,
// //       }))

// //     exportToCSV(competitorExport, 'dbh-competitor-report')

// //   }, [trafficData, competitorTableData])


// //   /* ----------------------------- */
// //   /* PPT EXPORT */
// //   /* ----------------------------- */

// //   const handleDownloadPPT = useCallback(async () => {

// //     const traffic = trafficData || trafficShareData
// //     const funnel = funnelData || []
// //     const competitors = competitorTableData || competitorData
// //     const devices = deviceData || []
// //     const engagement = engagementData || []
// //     const geo = geoData || []
// //     const erosion = erosionData || []

// //     const charts = [

// //       {
// //         title: 'Traffic Share (%)',
// //         labels: traffic.map((d) => d.model),
// //         values: traffic.map((d) => d.trafficShare),
// //       },

// //       {
// //         title: 'Search Share (%)',
// //         labels: traffic.map((d) => d.model),
// //         values: traffic.map((d) => d.searchShare),
// //       },

// //       {
// //         title: 'Funnel Performance',
// //         labels: funnel.map((d: any) => d.stage),
// //         values: funnel.map((d: any) => d.value),
// //       },

// //       {
// //         title: 'Device Distribution',
// //         labels: devices.map((d: any) => d.device),
// //         values: devices.map((d: any) => d.users),
// //       },

// //       {
// //         title: 'Engagement',
// //         labels: engagement.map((d: any) => d.name || d.metric),
// //         values: engagement.map((d: any) => d.value),
// //       },

// //       {
// //         title: 'Geographic Distribution',
// //         labels: geo.map((d: any) => d.region),
// //         values: geo.map((d: any) => d.value),
// //       },

// //       {
// //         title: 'Traffic Erosion',
// //         labels: erosion.map((d: any) => d.model),
// //         values: erosion.map((d: any) => d.loss),
// //       },

// //       {
// //         title: 'Competitor Performance',
// //         labels: competitors.map((d) => d.model),
// //         values: competitors.map((d) => d.performance),
// //       }

// //     ]

// //     /* -------- TREND CHART FIX -------- */

// //     const trendChart = trendData
// //       ? (() => {

// //           const step = Math.ceil(trendData.length / 12)

// //           const reduced = trendData.filter((_: any, i: number) => i % step === 0)

// //           return {
// //             title: "Traffic Trend",
// //             labels: reduced.map((d: any) => d.date),
// //             series: [
// //               {
// //                 name: "Users",
// //                 values: reduced.map((d: any) => d.users)
// //               }
// //             ]
// //           }

// //         })()
// //       : undefined


// //     const range = dateRange?.from && dateRange?.to
// //       ? `${dateRange.from.toLocaleDateString()} - ${dateRange.to.toLocaleDateString()}`
// //       : "Custom Range"

// //     await generatePPT({

// //       dateRange: range,

// //       models: [
// //         ...(selectedModel ? [selectedModel] : []),
// //         ...selectedCompetitors
// //       ],

// //       trendChart,

// //       charts

// //     })

// //   }, [
// //     trafficData,
// //     funnelData,
// //     competitorTableData,
// //     deviceData,
// //     engagementData,
// //     geoData,
// //     erosionData,
// //     trendData,
// //     selectedModel,
// //     selectedCompetitors,
// //     dateRange
// //   ])


// //   return (
// //     <div className="flex min-h-screen flex-col">

// //       <main className="flex-1 px-4 py-6 lg:px-8">

// //         <div className="mx-auto flex max-w-[1400px] flex-col gap-6">

// //           {!analysisStarted && (

// //             <div className="flex flex-col items-center justify-center text-center py-24">

// //               <img
// //                 src="/cardekho_logo.avif"
// //                 alt="Cardekho"
// //                 className="h-12 mb-6"
// //               />

// //               <h1 className="text-3xl font-semibold">
// //                 Demand Based Health Tool
// //               </h1>

// //               <p className="text-gray-500 mt-3 max-w-xl">
// //                 Analyze automotive demand signals across the purchase funnel
// //                 using Cardekho user engagement, search and traffic insights.
// //               </p>

// //               <div className="mt-10">
// //                 <button
// //                   onClick={() => setAnalysisStarted(true)}
// //                   className="rounded-lg bg-black px-6 py-3 text-white"
// //                 >
// //                   Start Analysis
// //                 </button>
// //               </div>

// //             </div>

// //           )}

// //           {analysisStarted && (

// //             <>

// //               <DashboardHeader
// //                 selectedModel={selectedModel}
// //                 onModelChange={setSelectedModel}
// //                 selectedCompetitors={selectedCompetitors}
// //                 onCompetitorsChange={setSelectedCompetitors}
// //                 onExport={handleExport}
// //                 onDownloadPPT={handleDownloadPPT}
// //                 dateRange={dateRange}
// //                 onDateRangeChange={setDateRange}
// //                 trafficType={trafficType}
// //                 onTrafficTypeChange={setTrafficType}
// //               />

// //               <KPICards data={kpiData} isLoading={kpiLoading} />

// //               {selectedModel && (

// //                 <>

// //                   <TrendChart data={trendData} isLoading={trendLoading} />

// //                   <div className="grid gap-6 lg:grid-cols-2">

// //                     <FunnelChart
// //                       data={funnelData}
// //                       isLoading={funnelLoading}
// //                     />

// //                     <TrafficShareChart
// //                       data={trafficData}
// //                       isLoading={trafficLoading}
// //                     />

// //                   </div>

// //                   <div className="grid gap-6 lg:grid-cols-2">

// //                     <EngagementChart
// //                       data={engagementData}
// //                       isLoading={engagementLoading}
// //                     />

// //                     <DeviceChart
// //                       data={deviceData}
// //                       isLoading={deviceLoading}
// //                     />

// //                   </div>

// //                   <div className="grid gap-6 lg:grid-cols-2">

// //                     <ComparisonTable
// //                       data={competitorTableData}
// //                       isLoading={competitorLoading}
// //                     />

// //                     <GeographicInsights
// //                       data={geoData}
// //                       isLoading={geoLoading}
// //                     />

// //                   </div>

// //                   <TrafficErosionMatrix
// //                     data={erosionData || []}
// //                     isLoading={erosionLoading}
// //                   />

// //                 </>

// //               )}

// //             </>

// //           )}

// //         </div>

// //       </main>

// //     </div>
// //   )
// // }









// 'use client'

// import { useState, useCallback } from 'react'
// import { DateRange } from 'react-day-picker'
// import useSWR from 'swr'

// import { DashboardHeader } from '@/components/dashboard-header'
// import { KPICards } from '@/components/kpi-cards'
// import { TrendChart } from '@/components/trend-chart'
// import { FunnelChart } from '@/components/funnel-chart'
// import { TrafficShareChart } from '@/components/traffic-share-chart'
// import { ComparisonTable } from '@/components/comparison-table'
// import { DeviceChart } from '@/components/device-chart'
// import EngagementChart from '@/components/engagement-chart'
// import { GeographicInsights } from '@/components/geographic-insights'
// import { TrafficErosionMatrix } from '@/components/traffic-erosion-matrix'

// import { generatePPT } from "@/lib/ppt/exportPPT"

// import {
//   useKPIData,
//   useTrendData,
//   useFunnelData,
//   useTrafficShareData,
//   useCompetitorData,
//   useDeviceData,
//   useEngagementData,
//   useGeographicData,
// } from '@/lib/use-dashboard-data'

// import { exportToCSV } from '@/lib/export-csv'
// import { trafficShareData, competitorData } from '@/lib/mock-data'


// /* ----------------------------- */
// /* MODEL NORMALIZER */
// /* ----------------------------- */

// function normalizeModel(model: string | null) {
//   if (!model) return null
//   return model.toLowerCase().replace(/[_-]/g, " ").trim()
// }

// function normalizeModels(models: string[]) {
//   return models.map(m =>
//     m.toLowerCase().replace(/[_-]/g, " ").trim()
//   )
// }

// export function Dashboard() {

//   const [selectedModel, setSelectedModel] = useState<string | null>(null)
//   const [analysisStarted, setAnalysisStarted] = useState(false)
//   const [selectedCompetitors, setSelectedCompetitors] = useState<string[]>([])

//   const [trafficType, setTrafficType] =
//     useState<'overall' | 'organic' | 'inorganic'>('overall')

//   const [dateRange, setDateRange] = useState<DateRange | undefined>({
//     from: new Date(2025, 7, 1),
//     to: new Date(),
//   })

//   /* ----------------------------- */
//   /* NORMALIZED MODELS */
//   /* ----------------------------- */

//   const focusModel = normalizeModel(selectedModel)
//   const competitors = normalizeModels(selectedCompetitors)

//   const { data: kpiData, isLoading: kpiLoading } =
//     useKPIData(focusModel, competitors, dateRange, trafficType)

//   const { data: trendData, isLoading: trendLoading } =
//     useTrendData(focusModel, competitors, dateRange, trafficType)

//   const { data: funnelData, isLoading: funnelLoading } =
//     useFunnelData(focusModel, competitors, dateRange, trafficType)

//   const { data: trafficData, isLoading: trafficLoading } =
//     useTrafficShareData(
//       focusModel,
//       competitors,
//       dateRange,
//       trafficType
//     )

//   const { data: competitorTableData, isLoading: competitorLoading } =
//     useCompetitorData()

//   const { data: deviceData, isLoading: deviceLoading } =
//     useDeviceData(
//       focusModel,
//       competitors,
//       dateRange,
//       trafficType
//     )

//   const { data: engagementData, isLoading: engagementLoading } =
//     useEngagementData(
//       focusModel,
//       competitors,
//       dateRange,
//       trafficType
//     )

//   const { data: geoData, isLoading: geoLoading } =
//     useGeographicData(
//       focusModel,
//       competitors,
//       dateRange,
//       trafficType
//     )

//   const { data: erosionData, isLoading: erosionLoading } =
//     useSWR('/api/analytics/traffic-erosion',
//       (url) => fetch(url)
//         .then(res => res.json())
//         .then(d => {
//           if (Array.isArray(d)) return d
//           if (d && Array.isArray(d.data)) return d.data
//           return []
//         })
//         .catch(() => [])
//     )

//   /* ----------------------------- */
//   /* CSV EXPORT */
//   /* ----------------------------- */

//   const handleExport = useCallback(() => {

//     const exportData = (trafficData || trafficShareData).map((item) => ({
//       Model: item.model,
//       'Search Share (%)': item.searchShare,
//       'Traffic Share (%)': item.trafficShare,
//       'Page Views Share (%)': item.pageViewsShare,
//     }))

//     exportToCSV(exportData, 'dbh-analytics-report')

//     const competitorExport =
//       (competitorTableData || competitorData).map((item) => ({
//         Model: item.model,
//         'Traffic Erosion Rank': item.trafficErosionRank,
//         'Reverse Erosion Rank': item.reverseTrafficErosionRank,
//         Performance: item.performance,
//       }))

//     exportToCSV(competitorExport, 'dbh-competitor-report')

//   }, [trafficData, competitorTableData])


//   /* ----------------------------- */
//   /* PPT EXPORT (Registry Based) */
//   /* ----------------------------- */

//   const handleDownloadPPT = useCallback(async () => {

//     const range = dateRange?.from && dateRange?.to
//       ? `${dateRange.from.toLocaleDateString()} - ${dateRange.to.toLocaleDateString()}`
//       : "Custom Range"

//     await generatePPT({

//       dateRange: range,

//       models: [
//         ...(selectedModel ? [selectedModel] : []),
//         ...selectedCompetitors
//       ]

//     })

//   }, [
//     selectedModel,
//     selectedCompetitors,
//     dateRange
//   ])


//   return (
//     <div className="flex min-h-screen flex-col">

//       <main className="flex-1 px-4 py-6 lg:px-8">

//         <div className="mx-auto flex max-w-[1400px] flex-col gap-6">

//           {!analysisStarted && (

//             <div className="flex flex-col items-center justify-center text-center py-24">

//               <img
//                 src="/cardekho_logo.avif"
//                 alt="Cardekho"
//                 className="h-12 mb-6"
//               />

//               <h1 className="text-3xl font-semibold">
//                 Demand Based Health Tool
//               </h1>

//               <p className="text-gray-500 mt-3 max-w-xl">
//                 Analyze automotive demand signals across the purchase funnel
//                 using Cardekho user engagement, search and traffic insights.
//               </p>

//               <div className="mt-10">
//                 <button
//                   onClick={() => setAnalysisStarted(true)}
//                   className="rounded-lg bg-black px-6 py-3 text-white"
//                 >
//                   Start Analysis
//                 </button>
//               </div>

//             </div>

//           )}

//           {analysisStarted && (

//             <>

//               <DashboardHeader
//                 selectedModel={selectedModel}
//                 onModelChange={setSelectedModel}
//                 selectedCompetitors={selectedCompetitors}
//                 onCompetitorsChange={setSelectedCompetitors}
//                 onExport={handleExport}
//                 onDownloadPPT={handleDownloadPPT}
//                 dateRange={dateRange}
//                 onDateRangeChange={setDateRange}
//                 trafficType={trafficType}
//                 onTrafficTypeChange={setTrafficType}
//               />

//               <KPICards data={kpiData} isLoading={kpiLoading} />

//               {selectedModel && (

//                 <>

//                   <TrendChart data={trendData} isLoading={trendLoading} />

//                   <div className="grid gap-6 lg:grid-cols-2">

//                     <FunnelChart
//                       data={funnelData}
//                       isLoading={funnelLoading}
//                     />

//                     <TrafficShareChart
//                       data={trafficData}
//                       isLoading={trafficLoading}
//                     />

//                   </div>

//                   <div className="grid gap-6 lg:grid-cols-2">

//                     <EngagementChart
//                       data={engagementData}
//                       isLoading={engagementLoading}
//                     />

//                     <DeviceChart
//                       data={deviceData}
//                       isLoading={deviceLoading}
//                     />

//                   </div>

//                   <div className="grid gap-6 lg:grid-cols-2">

//                     <ComparisonTable
//                       data={competitorTableData}
//                       isLoading={competitorLoading}
//                     />

//                     <GeographicInsights
//                       data={geoData}
//                       isLoading={geoLoading}
//                     />

//                   </div>

//                   <TrafficErosionMatrix
//                     data={erosionData || []}
//                     isLoading={erosionLoading}
//                   />

//                 </>

//               )}

//             </>

//           )}

//         </div>

//       </main>

//     </div>
//   )
// }














'use client'

import { useState, useCallback } from 'react'
import { DateRange } from 'react-day-picker'
import useSWR from 'swr'

import { DashboardHeader } from '@/components/dashboard-header'
import { KPICards } from '@/components/kpi-cards'
import { TrendChart } from '@/components/trend-chart'
import { FunnelChart } from '@/components/funnel-chart'
import { TrafficShareChart } from '@/components/traffic-share-chart'
import { ComparisonTable } from '@/components/comparison-table'
import { DeviceChart } from '@/components/device-chart'
import EngagementChart from '@/components/engagement-chart'
import { GeographicInsights } from '@/components/geographic-insights'
import { TrafficErosionMatrix } from '@/components/traffic-erosion-matrix'

import { generatePPT } from "@/lib/ppt/exportPPT"

import {
  useKPIData,
  useTrendData,
  useFunnelData,
  useTrafficShareData,
  useCompetitorData,
  useDeviceData,
  useEngagementData,
  useGeographicData,
} from '@/lib/use-dashboard-data'

import { exportToCSV } from '@/lib/export-csv'
import { trafficShareData, competitorData } from '@/lib/mock-data'
import { da } from 'date-fns/locale'


/* ----------------------------- */
/* MODEL NORMALIZER */
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

  const { data: kpiData, isLoading: kpiLoading } =
    useKPIData(focusModel, competitors, dateRange, trafficType)

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

  const { data: competitorTableData, isLoading: competitorLoading } =
    useCompetitorData(
      selectedModel,
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

  const { data: erosionData, isLoading: erosionLoading } =
    useSWR(
      focusModel
      ? `/api/analytics/traffic-erosion?models=${encodeURIComponent(focusModel)}`
      : null,
      (url) => fetch(url)
        .then(res => res.json())
        .then(d => {
          if (Array.isArray(d)) return d
          if (d && Array.isArray(d.data)) return d.data
          return []
        })
        .catch(() => [])
    )


  /* ----------------------------- */
  /* CSV EXPORT */
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
        'Reverse Erosion Rank': item.reverseTrafficErosionRank,
        Performance: item.performance,
      }))

    exportToCSV(competitorExport, 'dbh-competitor-report')

  }, [trafficData, competitorTableData])


  /* ----------------------------- */
  /* PPT EXPORT */
  /* ----------------------------- */

  const handleDownloadPPT = useCallback(async () => {

    const traffic = trafficData || trafficShareData
    const funnel = funnelData || []
    const competitors = competitorTableData || competitorData
    const devices = deviceData || []
    const engagement = engagementData || []
    const geo = geoData || []
    const erosion = erosionData || []

    const charts: any[] = []

    /* ----------------------------- */
    /* SHARE CHARTS ONLY IF MULTIPLE MODELS */
    /* ----------------------------- */

    if (traffic.length > 1) {

      charts.push(
        {
          title: 'Search Share (%)',
          labels: traffic.map((d) => d.model),
          values: traffic.map((d) => d.searchShare),
        },
        {
          title: 'Traffic Share (%)',
          labels: traffic.map((d) => d.model),
          values: traffic.map((d) => d.trafficShare),
        },
        {
          title: 'Page Views Share (%)',
          labels: traffic.map((d) => d.model),
          values: traffic.map((d) => d.pageViewsShare),
        }
      )

    }

    /* ----------------------------- */
    /* FUNNEL */
    /* ----------------------------- */

    if (funnel.length) {
      charts.push({
        title: 'Funnel Performance',
        labels: funnel.map((d: any) => d.stage),
        values: funnel.map((d: any) => d.value),
      })
    }

    /* ----------------------------- */
    /* DEVICE */
    /* ----------------------------- */

    if (devices.length) {
      charts.push({
        title: 'Device Distribution',
        labels: devices.map((d: any) => d.device),
        values: devices.map((d: any) => d.share ?? d.users),
      })
    }

    /* ----------------------------- */
    /* ENGAGEMENT */
    /* ----------------------------- */

    if (engagement.length) {
      charts.push({
        title: 'Engagement',
        labels: engagement.map((d: any) => d.metric || d.name),
        values: engagement.map((d: any) => d.value),
      })
    }

    /* ----------------------------- */
    /* GEOGRAPHY */
    /* ----------------------------- */

    if (geo.length) {
      charts.push({
        title: 'Geographic Distribution',
        labels: geo.map((d: any) => d.state || d.region),
        values: geo.map((d: any) => d.visits || d.value),
      })
    }

    /* ----------------------------- */
    /* TRAFFIC EROSION */
    /* ----------------------------- */

    if (erosion.length) {
      charts.push({
        title: 'Traffic Erosion',
        labels: erosion.map((d: any) => d.model),
        values: erosion.map((d: any) => d.loss),
      })
    }

    /* ----------------------------- */
    /* TREND CHART (REDUCE DATES) */
    /* ----------------------------- */

    const trendChart = trendData
      ? (() => {

          const step = Math.ceil(trendData.length / 12)

          const reduced =
            trendData.filter((_: any, i: number) => i % step === 0)

          return {
            title: "Traffic Trend",
            labels: reduced.map((d: any) => d.date),
            series: [
              {
                name: "Users",
                values: reduced.map((d: any) => d.users)
              }
            ]
          }

        })()
      : undefined


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

      trendChart,

      charts

    })

  }, [
    trafficData,
    funnelData,
    competitorTableData,
    deviceData,
    engagementData,
    geoData,
    erosionData,
    trendData,
    selectedModel,
    selectedCompetitors,
    dateRange
  ])


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
                Demand Based Health Tool
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
                onDownloadPPT={handleDownloadPPT}
                dateRange={dateRange}
                onDateRangeChange={setDateRange}
                trafficType={trafficType}
                onTrafficTypeChange={setTrafficType}
              />

              <KPICards data={kpiData} isLoading={kpiLoading} />

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

                  <TrafficErosionMatrix
                    data={erosionData || []}
                    isLoading={erosionLoading}
                  />

                </>

              )}

            </>

          )}

        </div>

      </main>

    </div>
  )
}