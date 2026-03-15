// // 'use client'

// // import { useEffect } from 'react'

// // import {
// // Card,
// // CardContent,
// // CardHeader,
// // CardTitle,
// // CardDescription
// // } from '@/components/ui/card'

// // import { ResponsiveHeatMap } from '@nivo/heatmap'

// // import { registerChart } from '@/lib/ppt/chartRegistry'

// // type ErosionItem = {
// // from: string
// // to: string
// // erosion: number
// // }

// // interface Props {
// // data?: ErosionItem[]
// // isLoading?: boolean
// // focusModel?: string
// // }

// // export function TrafficErosionMatrix({
// // data,
// // isLoading,
// // focusModel
// // }: Props) {

// // const safeData: ErosionItem[] = Array.isArray(data) ? data : []

// // /* ----------------------------- */
// // /* REMOVE INVALID GA VALUES */
// // /* ----------------------------- */

// // const invalid = ['(not set)','(not provided)','/','']

// // const cleanedData = safeData.filter(
// // d =>
// // !invalid.includes(d.from) &&
// // !invalid.includes(d.to)
// // )

// // /* ----------------------------- */
// // /* FOCUS MODEL FILTER (URL SAFE) */
// // /* ----------------------------- */

// // const filteredData = focusModel
// // ? cleanedData.filter(d => {

// // const f = d.from.toLowerCase()
// // const t = d.to.toLowerCase()
// // const m = focusModel.toLowerCase()

// // return f.includes(m) || t.includes(m)

// // })
// // : cleanedData

// // /* ----------------------------- */
// // /* FALLBACK IF FILTER EMPTY */
// // /* ----------------------------- */

// // const dataset =
// // filteredData.length > 0 ? filteredData : cleanedData

// // /* ----------------------------- */
// // /* PPT EXPORT REGISTRATION */
// // /* ----------------------------- */

// // useEffect(() => {

// // if (!dataset.length) return

// // const lossMap: Record<string, number> = {}
// // const gainMap: Record<string, number> = {}

// // dataset.forEach(row => {

// // if (!row.from || !row.to) return

// // lossMap[row.from] = (lossMap[row.from] || 0) + row.erosion
// // gainMap[row.to] = (gainMap[row.to] || 0) + row.erosion

// // })

// // const lossEntries =
// // Object.entries(lossMap)
// // .sort((a,b) => b[1]-a[1])
// // .slice(0,8)

// // const gainEntries =
// // Object.entries(gainMap)
// // .sort((a,b) => b[1]-a[1])
// // .slice(0,8)

// // registerChart({
// // title: "Traffic Loss to Competitors",
// // labels: lossEntries.map(d=>d[0]),
// // values: lossEntries.map(d=>d[1])
// // })

// // registerChart({
// // title: "Traffic Gained from Competitors",
// // labels: gainEntries.map(d=>d[0]),
// // values: gainEntries.map(d=>d[1])
// // })

// // }, [dataset])

// // /* ----------------------------- */
// // /* LOADING */
// // /* ----------------------------- */

// // if (isLoading) {
// // return ( <Card> <CardHeader> <CardTitle>Traffic Erosion Matrix</CardTitle> <CardDescription>
// // Competitive traffic loss between models </CardDescription> </CardHeader>

// // <CardContent>
// // <div className="flex h-[400px] items-center justify-center text-muted-foreground">
// // Loading erosion data...
// // </div>
// // </CardContent>
// // </Card>
// // )
// // }

// // /* ----------------------------- */
// // /* EMPTY */
// // /* ----------------------------- */

// // if (!dataset.length) {
// // return ( <Card> <CardHeader> <CardTitle>Traffic Erosion Matrix</CardTitle> </CardHeader>

// // <CardContent>
// // <div className="flex h-[400px] items-center justify-center text-muted-foreground">
// // No erosion data available
// // </div>
// // </CardContent>
// // </Card>
// // )
// // }

// // /* ----------------------------- */
// // /* LIMIT MODELS (TOP 12) */
// // /* ----------------------------- */

// // const scoreMap: Record<string, number> = {}

// // dataset.forEach(row => {

// // scoreMap[row.from] = (scoreMap[row.from] || 0) + row.erosion
// // scoreMap[row.to] = (scoreMap[row.to] || 0) + row.erosion

// // })

// // const models = Object.entries(scoreMap)
// // .sort((a,b)=>b[1]-a[1])
// // .slice(0,12)
// // .map(d=>d[0])

// // /* ----------------------------- */
// // /* FAST LOOKUP MAP */
// // /* ----------------------------- */

// // const erosionLookup = new Map<string, number>()

// // dataset.forEach(row => {
// // erosionLookup.set(`${row.from}|${row.to}`, row.erosion)
// // })

// // /* ----------------------------- */
// // /* HEATMAP DATA */
// // /* ----------------------------- */

// // const heatmapData = models.map(model => ({

// // id: model,

// // data: models.map(target => ({

// // x: target,

// // y: erosionLookup.get(`${model}|${target}`) ?? 0

// // }))

// // }))

// // /* ----------------------------- */
// // /* RENDER */
// // /* ----------------------------- */

// // return (

// // <Card>

// // <CardHeader>
// // <CardTitle>Traffic Erosion Matrix</CardTitle>
// // <CardDescription>
// // Which models steal traffic from others
// // </CardDescription>
// // </CardHeader>

// // <CardContent>

// // <div className="h-[450px]">

// // <ResponsiveHeatMap

// // data={heatmapData}

// // margin={{ top: 60, right: 80, bottom: 60, left: 80 }}

// // colors={{
// // type: 'quantize',
// // scheme: 'reds'
// // }}

// // inactiveOpacity={1}
// // activeOpacity={1}

// // enableLabels={false}

// // axisTop={{
// // tickRotation: -45,
// // tickSize: 5,
// // tickPadding: 5
// // }}

// // axisLeft={{
// // tickSize: 5,
// // tickPadding: 5
// // }}

// // cellBorderWidth={1}
// // cellBorderColor="#ffffff"

// // hoverTarget="cell"

// // tooltip={({ cell }) => (

// // <div className="bg-white border rounded px-2 py-1 text-sm shadow">
// // <b>{cell.serieId}</b> → <b>{cell.data.x}</b><br/>
// // Traffic shift: <b>{cell.data.y}</b>
// // </div>
// // )}

// // animate={false}

// // />

// // </div>

// // </CardContent>

// // </Card>

// // )

// // }






// 'use client'

// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   CardDescription,
// } from '@/components/ui/card'

// import { ResponsiveHeatMap } from '@nivo/heatmap'

// type ErosionItem = {
//   from: string
//   to: string
//   erosion: number
// }

// interface Props {
//   data?: ErosionItem[]
//   isLoading?: boolean
// }

// export function TrafficErosionMatrix({ data = [], isLoading }: Props) {

//   const safeData = Array.isArray(data) ? data : []

//   if (isLoading) {
//     return (
//       <Card>
//         <CardHeader>
//           <CardTitle>Traffic Erosion Matrix</CardTitle>
//         </CardHeader>
//         <CardContent className="h-[400px] flex items-center justify-center text-gray-500">
//           Loading erosion data...
//         </CardContent>
//       </Card>
//     )
//   }

//   if (!safeData.length) {
//     return (
//       <Card>
//         <CardHeader>
//           <CardTitle>Traffic Erosion Matrix</CardTitle>
//           <CardDescription>
//             Which models steal traffic from others
//           </CardDescription>
//         </CardHeader>

//         <CardContent className="h-[400px] flex items-center justify-center text-gray-500">
//           No erosion data available
//         </CardContent>
//       </Card>
//     )
//   }

//   /* ----------------------------- */
//   /* BUILD MODEL LIST */
//   /* ----------------------------- */

//   const models = Array.from(
//     new Set([
//       ...safeData.map((d) => d.from),
//       ...safeData.map((d) => d.to),
//     ])
//   )

//   /* ----------------------------- */
//   /* BUILD HEATMAP DATA */
//   /* ----------------------------- */

//   const heatmapData = models
//     .map((model) => {

//       const row: any = { id: model }

//       let hasValue = false

//       models.forEach((target) => {

//         const match = safeData.find(
//           (d) => d.from === model && d.to === target
//         )

//         const value = match ? match.erosion : 0

//         if (value > 0) hasValue = true

//         row[target] = value

//       })

//       /* remove empty rows */
//       return hasValue ? row : null

//     })
//     .filter(Boolean)

//   return (
//     <Card>

//       <CardHeader>
//         <CardTitle>Traffic Erosion Matrix</CardTitle>
//         <CardDescription>
//           Which models steal traffic from others
//         </CardDescription>
//       </CardHeader>

//       <CardContent style={{ height: 450 }}>

//         <ResponsiveHeatMap
//           data={heatmapData}

//           margin={{ top: 80, right: 60, bottom: 60, left: 120 }}

//           valueFormat=">-.0f"

//           colors={{
//             type: 'sequential',
//             scheme: 'oranges',
//           }}

//           emptyColor="#f5f5f5"

//           axisTop={{
//             tickRotation: -45,
//             tickSize: 5,
//             tickPadding: 5,
//           }}

//           axisLeft={{
//             tickSize: 5,
//             tickPadding: 5,
//           }}

//           cellBorderWidth={1}
//           cellBorderColor="#ffffff"

//           hoverTarget="cell"
//           inactiveOpacity={1}
//           activeOpacity={1}

//           tooltip={({ xKey, yKey, value }) => (
//             <div className="bg-white shadow-md p-2 rounded text-xs">
//               <strong>{yKey}</strong> → <strong>{xKey}</strong>
//               <br />
//               Traffic shift: {Number(value).toLocaleString()}
//             </div>
//           )}

//           animate={true}
//         />

//       </CardContent>

//     </Card>
//   )
// }








// 'use client'

// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   CardDescription,
// } from '@/components/ui/card'

// import { ResponsiveHeatMap } from '@nivo/heatmap'

// type ErosionItem = {
//   from: string
//   to: string
//   erosion: number
// }

// interface Props {
//   data?: ErosionItem[]
//   isLoading?: boolean
// }

// export function TrafficErosionMatrix({ data = [], isLoading }: Props) {

//   const safeData = Array.isArray(data) ? data : []

//   if (isLoading) {
//     return (
//       <Card>
//         <CardHeader>
//           <CardTitle>Traffic Erosion Matrix</CardTitle>
//         </CardHeader>
//         <CardContent className="h-[400px] flex items-center justify-center text-gray-500">
//           Loading erosion data...
//         </CardContent>
//       </Card>
//     )
//   }

//   if (!safeData.length) {
//     return (
//       <Card>
//         <CardHeader>
//           <CardTitle>Traffic Erosion Matrix</CardTitle>
//           <CardDescription>
//             Which models steal traffic from others
//           </CardDescription>
//         </CardHeader>

//         <CardContent className="h-[400px] flex items-center justify-center text-gray-500">
//           No erosion data available
//         </CardContent>
//       </Card>
//     )
//   }

//   /* ----------------------------- */
//   /* BUILD MODEL LIST */
//   /* ----------------------------- */

//   const models = Array.from(
//     new Set([
//       ...safeData.map((d) => d.from),
//       ...safeData.map((d) => d.to),
//     ])
//   )

//   /* ----------------------------- */
//   /* BUILD HEATMAP DATA             */
//   /* Nivo expects:                  */
//   /* { id: string,                  */
//   /*   data: { x: string,           */
//   /*           y: number }[] }[]    */
//   /* ----------------------------- */

//   const heatmapData = models
//     .map((model) => {

//       const rowData = models.map((target) => {
//         const match = safeData.find(
//           (d) => d.from === model && d.to === target
//         )
//         return {
//           x: target,
//           y: match ? match.erosion : 0,
//         }
//       })

//       const hasValue = rowData.some((cell) => cell.y > 0)

//       /* remove empty rows */
//       return hasValue ? { id: model, data: rowData } : null

//     })
//     .filter(Boolean) as { id: string; data: { x: string; y: number }[] }[]

//   return (
//     <Card>

//       <CardHeader>
//         <CardTitle>Traffic Erosion Matrix</CardTitle>
//         <CardDescription>
//           Which models steal traffic from others
//         </CardDescription>
//       </CardHeader>

//       <CardContent style={{ height: 450 }}>

//         <ResponsiveHeatMap
//           data={heatmapData}

//           margin={{ top: 80, right: 60, bottom: 60, left: 120 }}

//           valueFormat=">-.0f"

//           colors={{
//             type: 'sequential',
//             scheme: 'oranges',
//           }}

//           emptyColor="#f5f5f5"

//           axisTop={{
//             tickRotation: -45,
//             tickSize: 5,
//             tickPadding: 5,
//           }}

//           axisLeft={{
//             tickSize: 5,
//             tickPadding: 5,
//           }}

//           cellBorderWidth={1}
//           cellBorderColor="#ffffff"

//           hoverTarget="cell"
//           inactiveOpacity={1}
//           activeOpacity={1}

//           tooltip={({ cell }) => (
//             <div className="bg-white shadow-md p-2 rounded text-xs">
//               <strong>{cell.serieId}</strong> → <strong>{cell.data.x}</strong>
//               <br />
//               Traffic shift: {Number(cell.value).toLocaleString()}
//             </div>
//           )}

//           animate={true}
//         />

//       </CardContent>

//     </Card>
//   )
// }




















'use client'

import { useEffect } from 'react'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'

import { ResponsiveHeatMap } from '@nivo/heatmap'

import { registerChart } from '@/lib/ppt/chartRegistry'

type ErosionItem = {
  from: string
  to: string
  erosion: number
}

interface Props {
  data?: ErosionItem[]
  isLoading?: boolean
}

export function TrafficErosionMatrix({ data = [], isLoading }: Props) {

  const safeData = Array.isArray(data) ? data : []

  /* ----------------------------- */
  /* PPT EXPORT REGISTRATION */
  /* ----------------------------- */

  useEffect(() => {

    if (!safeData.length) return

    const labels = safeData.map(d => `${d.from} → ${d.to}`)
    const values = safeData.map(d => Number(d.erosion))

    registerChart({
      title: "Traffic Erosion Matrix",
      labels,
      values
    })

  }, [safeData])

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Traffic Erosion Matrix</CardTitle>
        </CardHeader>
        <CardContent className="h-[400px] flex items-center justify-center text-gray-500">
          Loading erosion data...
        </CardContent>
      </Card>
    )
  }

  if (!safeData.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Traffic Erosion Matrix</CardTitle>
          <CardDescription>
            Which models steal traffic from others
          </CardDescription>
        </CardHeader>

        <CardContent className="h-[400px] flex items-center justify-center text-gray-500">
          No erosion data available
        </CardContent>
      </Card>
    )
  }

  /* ----------------------------- */
  /* BUILD MODEL LIST */
  /* ----------------------------- */

  const models = Array.from(
    new Set([
      ...safeData.map((d) => d.from),
      ...safeData.map((d) => d.to),
    ])
  )

  /* ----------------------------- */
  /* BUILD HEATMAP DATA */
  /* ----------------------------- */

  const heatmapData = models
    .map((model) => {

      const rowData = models.map((target) => {
        const match = safeData.find(
          (d) => d.from === model && d.to === target
        )
        return {
          x: target,
          y: match ? match.erosion : 0,
        }
      })

      const hasValue = rowData.some((cell) => cell.y > 0)

      return hasValue ? { id: model, data: rowData } : null

    })
    .filter(Boolean) as { id: string; data: { x: string; y: number }[] }[]

  return (
    <Card>

      <CardHeader>
        <CardTitle>Traffic Erosion Matrix</CardTitle>
        <CardDescription>
          Which models steal traffic from others
        </CardDescription>
      </CardHeader>

      <CardContent style={{ height: 450 }}>

        <ResponsiveHeatMap
          data={heatmapData}

          margin={{ top: 80, right: 60, bottom: 60, left: 120 }}

          valueFormat=">-.0f"

          colors={{
            type: 'sequential',
            scheme: 'oranges',
          }}

          emptyColor="#f5f5f5"

          axisTop={{
            tickRotation: -45,
            tickSize: 5,
            tickPadding: 5,
          }}

          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
          }}

          cellBorderWidth={1}
          cellBorderColor="#ffffff"

          hoverTarget="cell"
          inactiveOpacity={1}
          activeOpacity={1}

          tooltip={({ cell }) => (
            <div className="bg-white shadow-md p-2 rounded text-xs">
              <strong>{cell.serieId}</strong> → <strong>{cell.data.x}</strong>
              <br />
              Traffic shift: {Number(cell.value).toLocaleString()}
            </div>
          )}

          animate={true}
        />

      </CardContent>

    </Card>
  )
}