// // // // 'use client'

// // // // import { useEffect } from "react"

// // // // import {
// // // //   LineChart,
// // // //   Line,
// // // //   XAxis,
// // // //   YAxis,
// // // //   CartesianGrid,
// // // //   Tooltip,
// // // //   Legend,
// // // //   ResponsiveContainer,
// // // // } from "recharts"

// // // // import { registerChart } from "@/lib/ppt/chartRegistry"

// // // // interface EngagementData {
// // // //   date: string
// // // //   pv_uu: number
// // // //   avg_session_duration: number
// // // // }

// // // // export default function AudienceEngagementChart({
// // // //   data
// // // // }: {
// // // //   data: EngagementData[]
// // // // }) {

// // // //   /* ----------------------------- */
// // // //   /* PPT EXPORT REGISTRATION */
// // // //   /* ----------------------------- */

// // // //   useEffect(() => {

// // // //     if (!data || data.length === 0) return

// // // //     registerChart({
// // // //       title: "PV / UU Trend",
// // // //       labels: data.map(d => d.date),
// // // //       values: data.map(d => d.pv_uu)
// // // //     })

// // // //     registerChart({
// // // //       title: "Avg Session Duration",
// // // //       labels: data.map(d => d.date),
// // // //       values: data.map(d => d.avg_session_duration)
// // // //     })

// // // //   }, [data])

// // // //   return (
// // // //     <ResponsiveContainer width="100%" height={300}>

// // // //       <LineChart data={data}>

// // // //         <CartesianGrid strokeDasharray="3 3" />

// // // //         <XAxis dataKey="date" />

// // // //         <YAxis />

// // // //         <Tooltip />

// // // //         <Legend />

// // // //         <Line
// // // //           type="monotone"
// // // //           dataKey="pv_uu"
// // // //           stroke="#2563eb"
// // // //           name="PV/UU"
// // // //         />

// // // //         <Line
// // // //           type="monotone"
// // // //           dataKey="avg_session_duration"
// // // //           stroke="#16a34a"
// // // //           name="Avg Session Duration (min)"
// // // //         />

// // // //       </LineChart>

// // // //     </ResponsiveContainer>
// // // //   )
// // // // }













// // // 'use client'

// // // import { useEffect } from "react"

// // // import {
// // //   LineChart,
// // //   Line,
// // //   XAxis,
// // //   YAxis,
// // //   CartesianGrid,
// // //   Tooltip,
// // //   Legend,
// // //   ResponsiveContainer,
// // // } from "recharts"

// // // import { registerChart } from "@/lib/ppt/chartRegistry"

// // // interface EngagementData {
// // //   date: string
// // //   pv_uu: number
// // //   avg_session_duration: number
// // // }

// // // export default function AudienceEngagementChart({
// // //   data = []
// // // }: {
// // //   data: EngagementData[]
// // // }) {

// // //   /* ----------------------------- */
// // //   /* PPT EXPORT REGISTRATION */
// // //   /* ----------------------------- */

// // //   useEffect(() => {

// // //     if (!data || data.length === 0) return

// // //     registerChart({
// // //       title: "PV / UU Trend",
// // //       labels: data.map(d => d.date),
// // //       values: data.map(d => d.pv_uu)
// // //     })

// // //     registerChart({
// // //       title: "Avg Session Duration",
// // //       labels: data.map(d => d.date),
// // //       values: data.map(d => d.avg_session_duration)
// // //     })

// // //   }, [data])

// // //   /* ----------------------------- */
// // //   /* EMPTY STATE */
// // //   /* ----------------------------- */

// // //   if (!data || data.length === 0) {
// // //     return (
// // //       <div className="flex items-center justify-center h-[300px] text-gray-400 text-sm">
// // //         No engagement data available
// // //       </div>
// // //     )
// // //   }

// // //   return (

// // //     <ResponsiveContainer width="100%" height={300}>

// // //       <LineChart data={data}>

// // //         <CartesianGrid strokeDasharray="3 3" />

// // //         <XAxis dataKey="date" />

// // //         <YAxis />

// // //         <Tooltip />

// // //         <Legend />

// // //         <Line
// // //           type="monotone"
// // //           dataKey="pv_uu"
// // //           stroke="#2563eb"
// // //           name="PV / UU"
// // //           strokeWidth={2}
// // //           dot={false}
// // //         />

// // //         <Line
// // //           type="monotone"
// // //           dataKey="avg_session_duration"
// // //           stroke="#16a34a"
// // //           name="Avg Session Duration (min)"
// // //           strokeWidth={2}
// // //           dot={false}
// // //         />

// // //       </LineChart>

// // //     </ResponsiveContainer>
// // //   )
// // // }











// // 'use client'

// // import { useEffect } from "react"

// // import {
// //   LineChart,
// //   Line,
// //   XAxis,
// //   YAxis,
// //   CartesianGrid,
// //   Tooltip,
// //   Legend,
// //   ResponsiveContainer,
// // } from "recharts"

// // import { registerChart } from "@/lib/ppt/chartRegistry"

// // interface EngagementData {
// //   date: string
// //   pv_uu: number
// //   avg_session_duration: number
// // }

// // export default function AudienceEngagementChart({
// //   data = [],
// //   isLoading = false
// // }: {
// //   data?: EngagementData[]
// //   isLoading?: boolean
// // }) {

// //   if (isLoading) {
// //     return (
// //       <div className="flex items-center justify-center h-[300px] text-sm text-gray-400">
// //         Loading engagement data...
// //       </div>
// //     )
// //   }

// //   const formattedData = data.map(d => ({
// //     date: d.date,
// //     pv_uu: Number(d.pv_uu ?? 0),
// //     avg_session_duration: Number(
// //       (d as any).avg_session_duration ??
// //       (d as any).avgSessionDuration ??
// //       0
// //     )
// //   }))

// //   useEffect(() => {

// //     if (!formattedData.length) return

// //     registerChart({
// //       title: "PV / UU Trend",
// //       labels: formattedData.map(d => d.date),
// //       values: formattedData.map(d => d.pv_uu)
// //     })

// //     registerChart({
// //       title: "Avg Session Duration",
// //       labels: formattedData.map(d => d.date),
// //       values: formattedData.map(d => d.avg_session_duration)
// //     })

// //   }, [formattedData])

// //   return (
// //     <ResponsiveContainer width="100%" height={300}>

// //       <LineChart data={formattedData}>

// //         <CartesianGrid strokeDasharray="3 3" />

// //         <XAxis dataKey="date" />

// //         <YAxis />

// //         <Tooltip />

// //         <Legend />

// //         <Line
// //           type="monotone"
// //           dataKey="pv_uu"
// //           stroke="#2563eb"
// //           name="PV/UU"
// //           strokeWidth={2}
// //         />

// //         <Line
// //           type="monotone"
// //           dataKey="avg_session_duration"
// //           stroke="#16a34a"
// //           name="Avg Session Duration (min)"
// //           strokeWidth={2}
// //         />

// //       </LineChart>

// //     </ResponsiveContainer>
// //   )
// // }








// 'use client'

// import { useEffect } from "react"

// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer
// } from "recharts"

// import { registerChart } from "@/lib/ppt/chartRegistry"

// export default function EngagementChart({
//   data = [],
//   isLoading = false
// }: {
//   data?: any[]
//   isLoading?: boolean
// }) {

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-[300px] text-gray-400">
//         Loading engagement data...
//       </div>
//     )
//   }

//   const formatted = data.map((d: any) => ({
//     ...d,
//     date: `${d.date.slice(0,4)}-${d.date.slice(4,6)}-${d.date.slice(6,8)}`
//   }))

//   useEffect(() => {

//     if (!formatted.length) return

//     registerChart({
//       title: "PV / UU",
//       labels: formatted.map(d => d.date),
//       values: formatted.map(d => d.pv_uu)
//     })

//     registerChart({
//       title: "Avg Session Duration",
//       labels: formatted.map(d => d.date),
//       values: formatted.map(d => d.avg_session_duration)
//     })

//   }, [formatted])

//   return (

//     <ResponsiveContainer width="100%" height={320}>

//       <LineChart data={formatted}>

//         <CartesianGrid strokeDasharray="3 3" />

//         <XAxis
//           dataKey="date"
//           tick={{ fontSize: 12 }}
//         />

//         {/* PV/UU axis */}
//         <YAxis
//           yAxisId="left"
//           label={{
//             value: "PV / UU",
//             angle: -90,
//             position: "insideLeft"
//           }}
//         />

//         {/* Session duration axis */}
//         <YAxis
//           yAxisId="right"
//           orientation="right"
//           label={{
//             value: "Session (min)",
//             angle: 90,
//             position: "insideRight"
//           }}
//         />

//         <Tooltip />

//         <Legend />

//         <Line
//           yAxisId="left"
//           type="monotone"
//           dataKey="pv_uu"
//           stroke="#2563eb"
//           strokeWidth={2}
//           dot={false}
//           name="PV/UU"
//         />

//         <Line
//           yAxisId="right"
//           type="monotone"
//           dataKey="avg_session_duration"
//           stroke="#16a34a"
//           strokeWidth={2}
//           dot={false}
//           name="Avg Session Duration"
//         />

//       </LineChart>

//     </ResponsiveContainer>

//   )

// }






// 'use client'

// import { useEffect, useMemo } from "react"

// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer
// } from "recharts"

// import { registerChart } from "@/lib/ppt/chartRegistry"

// export default function EngagementChart({
//   data = [],
//   isLoading = false
// }: { 
//   data?: any[]
//   isLoading?: boolean
// }) {

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-[300px] text-gray-400">
//         Loading engagement data...
//       </div>
//     )
//   }

//   /* ----------------------------- */
//   /* FORMAT DATE ONLY ONCE */
//   /* ----------------------------- */

//   const formatted = useMemo(() => {

//     if (!data?.length) return []

//     return data.map((d: any) => {

//       if (!d.date) return d

//       const date = d.date.toString()

//       return {
//         ...d,
//         date: `${date.slice(0,4)}-${date.slice(4,6)}-${date.slice(6,8)}`
//       }

//     })

//   }, [data])

//   /* ----------------------------- */
//   /* PPT EXPORT REGISTRATION */
//   /* ----------------------------- */

//   useEffect(() => {

//     if (!formatted.length) return

//     registerChart({
//       title: "PV / UU",
//       labels: formatted.map(d => d.date),
//       values: formatted.map(d => d.pv_uu)
//     })

//     registerChart({
//       title: "Avg Session Duration",
//       labels: formatted.map(d => d.date),
//       values: formatted.map(d => d.avg_session_duration)
//     })

//   }, [formatted])

//   return (

//     <ResponsiveContainer width="100%" height={320}>

//       <LineChart data={formatted}>

//         <CartesianGrid strokeDasharray="3 3" />

//         <XAxis
//           dataKey="date"
//           tick={{ fontSize: 12 }}
//         />

//         {/* PV/UU axis */}
//         <YAxis
//           yAxisId="left"
//           label={{
//             value: "PV / UU",
//             angle: -90,
//             position: "insideLeft"
//           }}
//         />

//         {/* Session duration axis */}
//         <YAxis
//           yAxisId="right"
//           orientation="right"
//           label={{
//             value: "Session (min)",
//             angle: 90,
//             position: "insideRight"
//           }}
//         />

//         <Tooltip />

//         <Legend />

//         <Line
//           yAxisId="left"
//           type="monotone"
//           dataKey="pv_uu"
//           stroke="#2563eb"
//           strokeWidth={2}
//           dot={false}
//           name="PV/UU"
//         />

//         <Line
//           yAxisId="right"
//           type="monotone"
//           dataKey="avg_session_duration"
//           stroke="#16a34a"
//           strokeWidth={2}
//           dot={false}
//           name="Avg Session Duration"
//         />

//       </LineChart>

//     </ResponsiveContainer>

//   )

// }




'use client'

import { useEffect, useMemo } from "react"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts"

import { registerChart } from "@/lib/ppt/chartRegistry"

export default function EngagementChart({
  data = [],
  isLoading = false
}: { 
  data?: any[]
  isLoading?: boolean
}) {

  /* ----------------------------- */
  /* FORMAT DATE ONLY ONCE */
  /* ----------------------------- */

  const formatted = useMemo(() => {

    if (!data?.length) return []

    return data.map((d: any) => {

      if (!d.date) return d

      const date = d.date.toString()

      return {
        ...d,
        date: `${date.slice(0,4)}-${date.slice(4,6)}-${date.slice(6,8)}`
      }

    })

  }, [data])

  /* ----------------------------- */
  /* PPT EXPORT REGISTRATION */
  /* ----------------------------- */

  useEffect(() => {

    if (!formatted.length) return

    registerChart({
      title: "PV / UU",
      labels: formatted.map(d => d.date),
      values: formatted.map(d => d.pv_uu)
    })

    registerChart({
      title: "Avg Session Duration",
      labels: formatted.map(d => d.date),
      values: formatted.map(d => d.avg_session_duration)
    })

  }, [formatted])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[300px] text-gray-400">
        Loading engagement data...
      </div>
    )
  }

  return (

    <ResponsiveContainer width="100%" height={320}>

      <LineChart data={formatted}>

        <CartesianGrid strokeDasharray="3 3" />

        <XAxis
          dataKey="date"
          tick={{ fontSize: 12 }}
        />

        {/* PV/UU axis */}
        <YAxis
          yAxisId="left"
          label={{
            value: "PV / UU",
            angle: -90,
            position: "insideLeft"
          }}
        />

        {/* Session duration axis */}
        <YAxis
          yAxisId="right"
          orientation="right"
          label={{
            value: "Session (min)",
            angle: 90,
            position: "insideRight"
          }}
        />

        <Tooltip />

        <Legend />

        <Line
          yAxisId="left"
          type="monotone"
          dataKey="pv_uu"
          stroke="#2563eb"
          strokeWidth={2}
          dot={false}
          name="PV/UU"
        />

        <Line
          yAxisId="right"
          type="monotone"
          dataKey="avg_session_duration"
          stroke="#16a34a"
          strokeWidth={2}
          dot={false}
          name="Avg Session Duration"
        />

      </LineChart>

    </ResponsiveContainer>

  )

}