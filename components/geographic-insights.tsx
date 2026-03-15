// // // 'use client'

// // // import { useEffect } from 'react'

// // // import {
// // //   BarChart,
// // //   Bar,
// // //   XAxis,
// // //   YAxis,
// // //   CartesianGrid,
// // //   Tooltip,
// // //   ResponsiveContainer,
// // // } from 'recharts'

// // // import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
// // // import { Skeleton } from '@/components/ui/skeleton'

// // // import type { GeographicData } from '@/lib/types'

// // // import { registerChart } from '@/lib/ppt/chartRegistry'

// // // interface GeographicInsightsProps {
// // //   data: GeographicData[] | undefined
// // //   isLoading: boolean
// // // }

// // // function formatVisits(num: number): string {
// // //   if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`
// // //   if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`
// // //   return num.toLocaleString()
// // // }

// // // export function GeographicInsights({ data, isLoading }: GeographicInsightsProps) {

// // //   /* ----------------------------- */
// // //   /* PPT EXPORT REGISTRATION */
// // //   /* ----------------------------- */

// // //   useEffect(() => {

// // //     if (!data || data.length === 0) return

// // //     const topStates =
// // //       [...data]
// // //         .sort((a, b) => b.visits - a.visits)
// // //         .slice(0, 10)

// // //     registerChart({
// // //       title: "Top States by Visits",
// // //       labels: topStates.map(d => d.state),
// // //       values: topStates.map(d => d.visits)
// // //     })

// // //   }, [data])


// // //   if (isLoading) {
// // //     return (
// // //       <Card>
// // //         <CardHeader>
// // //           <Skeleton className="h-5 w-40" />
// // //           <Skeleton className="h-4 w-56" />
// // //         </CardHeader>
// // //         <CardContent>
// // //           <Skeleton className="h-[300px] w-full" />
// // //         </CardContent>
// // //       </Card>
// // //     )
// // //   }

// // //   if (!data?.length) {
// // //     return (
// // //       <Card>
// // //         <CardHeader>
// // //           <CardTitle>Geographic Insights</CardTitle>
// // //         </CardHeader>
// // //         <CardContent>
// // //           <div className="flex h-[300px] items-center justify-center text-muted-foreground">
// // //             Geographic data will be available when the map API is connected
// // //           </div>
// // //         </CardContent>
// // //       </Card>
// // //     )
// // //   }

// // //   return (
// // //     <Card>

// // //       <CardHeader>
// // //         <CardTitle>Geographic Insights</CardTitle>
// // //         <CardDescription>
// // //           State-wise distribution of visits and traffic share
// // //         </CardDescription>
// // //       </CardHeader>

// // //       <CardContent>

// // //         <ResponsiveContainer width="100%" height={300}>

// // //           <BarChart
// // //             data={data}
// // //             layout="vertical"
// // //             margin={{ top: 0, right: 20, left: 10, bottom: 0 }}
// // //           >

// // //             <CartesianGrid strokeDasharray="3 3" className="stroke-border" horizontal={false} />

// // //             <XAxis
// // //               type="number"
// // //               tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }}
// // //               tickFormatter={formatVisits}
// // //             />

// // //             <YAxis
// // //               type="category"
// // //               dataKey="state"
// // //               width={110}
// // //               tick={{ fill: 'var(--color-muted-foreground)', fontSize: 11 }}
// // //             />

// // //             <Tooltip
// // //               contentStyle={{
// // //                 backgroundColor: 'var(--color-card)',
// // //                 border: '1px solid var(--color-border)',
// // //                 borderRadius: '8px',
// // //                 boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
// // //                 fontSize: '13px',
// // //               }}
// // //               formatter={(value: number, name: string) => {
// // //                 if (name === 'visits') return [formatVisits(value), 'Visits']
// // //                 return [`${value}%`, 'Share']
// // //               }}
// // //             />

// // //             <Bar
// // //               dataKey="visits"
// // //               fill="#3b6cf5"
// // //               radius={[0, 4, 4, 0]}
// // //               animationDuration={800}
// // //             />

// // //           </BarChart>

// // //         </ResponsiveContainer>

// // //       </CardContent>

// // //     </Card>
// // //   )
// // // }




// // // use above code if any issue occurs





// // 'use client'

// // import { useEffect } from 'react'

// // import {
// //   BarChart,
// //   Bar,
// //   XAxis,
// //   YAxis,
// //   CartesianGrid,
// //   Tooltip,
// //   ResponsiveContainer,
// // } from 'recharts'

// // import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
// // import { Skeleton } from '@/components/ui/skeleton'

// // import type { GeographicData } from '@/lib/types'

// // import { registerChart } from '@/lib/ppt/chartRegistry'

// // interface GeographicInsightsProps {
// //   data: GeographicData[] | undefined
// //   isLoading: boolean
// // }

// // function formatVisits(num: number): string {
// //   if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`
// //   if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`
// //   return num.toLocaleString()
// // }

// // export function GeographicInsights({ data, isLoading }: GeographicInsightsProps) {

// //   useEffect(() => {

// //     if (!data || data.length === 0) return

// //     const topStates =
// //       [...data]
// //         .sort((a, b) => b.visits - a.visits)
// //         .slice(0, 10)

// //     registerChart({
// //       title: "Top States by Visits",
// //       labels: topStates.map(d => d.state),
// //       values: topStates.map(d => d.visits)
// //     })

// //   }, [data])


// //   const cityData =
// //     data
// //       ? Object.entries(
// //           data.reduce((acc:any,row:any)=>{
// //             if(!row.city || row.city==="(not set)") return acc
// //             acc[row.city]=(acc[row.city]||0)+row.visits
// //             return acc
// //           },{})
// //         )
// //         .map(([city,visits])=>({city,visits}))
// //         .sort((a:any,b:any)=>b.visits-a.visits)
// //         .slice(0,10)
// //       : []

// //   if (isLoading) {
// //     return (
// //       <Card>
// //         <CardHeader>
// //           <Skeleton className="h-5 w-40" />
// //           <Skeleton className="h-4 w-56" />
// //         </CardHeader>
// //         <CardContent>
// //           <Skeleton className="h-[300px] w-full" />
// //         </CardContent>
// //       </Card>
// //     )
// //   }

// //   if (!data?.length) {
// //     return (
// //       <Card>
// //         <CardHeader>
// //           <CardTitle>Geographic Insights</CardTitle>
// //         </CardHeader>
// //         <CardContent>
// //           <div className="flex h-[300px] items-center justify-center text-muted-foreground">
// //             Geographic data will be available when the map API is connected
// //           </div>
// //         </CardContent>
// //       </Card>
// //     )
// //   }

// //   return (
// //     <Card>

// //       <CardHeader>
// //         <CardTitle>Geographic Insights</CardTitle>
// //         <CardDescription>
// //           State-wise distribution of visits and traffic share
// //         </CardDescription>
// //       </CardHeader>

// //       <CardContent className="space-y-10">

// //         {/* EXISTING STATE CHART */}

// //         <ResponsiveContainer width="100%" height={300}>

// //           <BarChart
// //             data={data}
// //             layout="vertical"
// //             margin={{ top: 0, right: 20, left: 10, bottom: 0 }}
// //           >

// //             <CartesianGrid strokeDasharray="3 3" className="stroke-border" horizontal={false} />

// //             <XAxis
// //               type="number"
// //               tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }}
// //               tickFormatter={formatVisits}
// //             />

// //             <YAxis
// //               type="category"
// //               dataKey="state"
// //               width={110}
// //               tick={{ fill: 'var(--color-muted-foreground)', fontSize: 11 }}
// //             />

// //             <Tooltip
// //               formatter={(value:number)=>formatVisits(value)}
// //             />

// //             <Bar
// //               dataKey="visits"
// //               fill="#3b6cf5"
// //               radius={[0, 4, 4, 0]}
// //               animationDuration={800}
// //             />

// //           </BarChart>

// //         </ResponsiveContainer>

// //         {/* NEW TOP CITIES */}

// //         <ResponsiveContainer width="100%" height={300}>

// //           <BarChart
// //             data={cityData}
// //             layout="vertical"
// //             margin={{ top: 0, right: 20, left: 10, bottom: 0 }}
// //           >

// //             <CartesianGrid strokeDasharray="3 3" className="stroke-border" horizontal={false} />

// //             <XAxis
// //               type="number"
// //               tickFormatter={formatVisits}
// //             />

// //             <YAxis
// //               type="category"
// //               dataKey="city"
// //               width={110}
// //             />

// //             <Tooltip
// //               formatter={(value:number)=>formatVisits(value)}
// //             />

// //             <Bar
// //               dataKey="visits"
// //               fill="#22c55e"
// //               radius={[0,4,4,0]}
// //             />

// //           </BarChart>

// //         </ResponsiveContainer>

// //       </CardContent>

// //     </Card>
// //   )
// // }
























// // 'use client'

// // import { useEffect } from 'react'

// // import {
// //   BarChart,
// //   Bar,
// //   XAxis,
// //   YAxis,
// //   CartesianGrid,
// //   Tooltip,
// //   ResponsiveContainer,
// // } from 'recharts'

// // import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
// // import { Skeleton } from '@/components/ui/skeleton'

// // import type { GeographicData } from '@/lib/types'

// // import { registerChart } from '@/lib/ppt/chartRegistry'

// // interface GeographicInsightsProps {
// //   data: GeographicData[] | undefined
// //   isLoading: boolean
// // }

// // function formatVisits(num: number): string {
// //   if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`
// //   if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`
// //   return num.toLocaleString()
// // }

// // export function GeographicInsights({ data, isLoading }: GeographicInsightsProps) {

// //   /* ----------------------------- */
// //   /* AGGREGATE STATE DATA */
// //   /* ----------------------------- */

// //   const stateData =
// //     data
// //       ? Object.entries(
// //           data.reduce((acc:any,row:any)=>{
// //             acc[row.state]=(acc[row.state]||0)+row.visits
// //             return acc
// //           },{})
// //         )
// //         .map(([state,visits])=>({state,visits}))
// //         .sort((a:any,b:any)=>b.visits-a.visits)
// //         .slice(0,10)
// //       : []

// //   /* ----------------------------- */
// //   /* AGGREGATE CITY DATA */
// //   /* ----------------------------- */

// //   const cityData =
// //     data
// //       ? Object.entries(
// //           data.reduce((acc:any,row:any)=>{
// //             if(!row.city || row.city==="(not set)") return acc
// //             acc[row.city]=(acc[row.city]||0)+row.visits
// //             return acc
// //           },{})
// //         )
// //         .map(([city,visits])=>({city,visits}))
// //         .sort((a:any,b:any)=>b.visits-a.visits)
// //         .slice(0,10)
// //       : []

// //   /* ----------------------------- */
// //   /* PPT EXPORT REGISTRATION */
// //   /* ----------------------------- */

// //   useEffect(() => {

// //     if (!stateData.length) return

// //     registerChart({
// //       title: "Top States by Visits",
// //       labels: stateData.map(d => d.state),
// //       values: stateData.map(d => d.visits)
// //     })

// //   }, [stateData])


// //   if (isLoading) {
// //     return (
// //       <Card>
// //         <CardHeader>
// //           <Skeleton className="h-5 w-40" />
// //           <Skeleton className="h-4 w-56" />
// //         </CardHeader>
// //         <CardContent>
// //           <Skeleton className="h-[300px] w-full" />
// //         </CardContent>
// //       </Card>
// //     )
// //   }

// //   if (!data?.length) {
// //     return (
// //       <Card>
// //         <CardHeader>
// //           <CardTitle>Geographic Insights</CardTitle>
// //         </CardHeader>
// //         <CardContent>
// //           <div className="flex h-[300px] items-center justify-center text-muted-foreground">
// //             Geographic data will be available when the map API is connected
// //           </div>
// //         </CardContent>
// //       </Card>
// //     )
// //   }

// //   return (
// //     <Card>

// //       <CardHeader>
// //         <CardTitle>Geographic Insights</CardTitle>
// //         <CardDescription>
// //           State-wise distribution of visits and traffic share
// //         </CardDescription>
// //       </CardHeader>

// //       <CardContent className="space-y-10">

// //         {/* ----------------------------- */}
// //         {/* TOP STATES CHART */}
// //         {/* ----------------------------- */}

// //         <ResponsiveContainer width="100%" height={300}>

// //           <BarChart
// //             data={stateData}
// //             layout="vertical"
// //             margin={{ top: 0, right: 20, left: 10, bottom: 0 }}
// //           >

// //             <CartesianGrid strokeDasharray="3 3" className="stroke-border" horizontal={false} />

// //             <XAxis
// //               type="number"
// //               tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }}
// //               tickFormatter={formatVisits}
// //             />

// //             <YAxis
// //               type="category"
// //               dataKey="state"
// //               width={140}
// //               tick={{ fill: 'var(--color-muted-foreground)', fontSize: 11 }}
// //             />

// //             <Tooltip
// //               contentStyle={{
// //                 backgroundColor: 'var(--color-card)',
// //                 border: '1px solid var(--color-border)',
// //                 borderRadius: '8px',
// //                 boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
// //                 fontSize: '13px',
// //               }}
// //               formatter={(value: number) => [formatVisits(value), 'Visits']}
// //             />

// //             <Bar
// //               dataKey="visits"
// //               fill="#3b6cf5"
// //               radius={[0, 4, 4, 0]}
// //               animationDuration={800}
// //             />

// //           </BarChart>

// //         </ResponsiveContainer>


// //         {/* ----------------------------- */}
// //         {/* TOP CITIES CHART */}
// //         {/* ----------------------------- */}

// //         <ResponsiveContainer width="100%" height={300}>

// //           <BarChart
// //             data={cityData}
// //             layout="vertical"
// //             margin={{ top: 0, right: 20, left: 10, bottom: 0 }}
// //           >

// //             <CartesianGrid strokeDasharray="3 3" className="stroke-border" horizontal={false} />

// //             <XAxis
// //               type="number"
// //               tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }}
// //               tickFormatter={formatVisits}
// //             />

// //             <YAxis
// //               type="category"
// //               dataKey="city"
// //               width={160}
// //               tick={{ fill: 'var(--color-muted-foreground)', fontSize: 11 }}
// //             />

// //             <Tooltip
// //               contentStyle={{
// //                 backgroundColor: 'var(--color-card)',
// //                 border: '1px solid var(--color-border)',
// //                 borderRadius: '8px',
// //                 boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
// //                 fontSize: '13px',
// //               }}
// //               formatter={(value: number) => [formatVisits(value), 'Visits']}
// //             />

// //             <Bar
// //               dataKey="visits"
// //               fill="#22c55e"
// //               radius={[0, 4, 4, 0]}
// //               animationDuration={800}
// //             />

// //           </BarChart>

// //         </ResponsiveContainer>

// //       </CardContent>

// //     </Card>
// //   )
// // }














// 'use client'

// import { useEffect } from 'react'

// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from 'recharts'

// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
// import { Skeleton } from '@/components/ui/skeleton'

// import type { GeographicData } from '@/lib/types'

// import { registerChart } from '@/lib/ppt/chartRegistry'

// interface GeographicInsightsProps {
//   data: GeographicData[] | undefined
//   isLoading: boolean
// }

// function formatVisits(num: number): string {
//   if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`
//   if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`
//   return num.toLocaleString()
// }

// export function GeographicInsights({ data, isLoading }: GeographicInsightsProps) {

//   /* ----------------------------- */
//   /* AGGREGATE STATE DATA */
//   /* ----------------------------- */

//   const stateData =
//     data
//       ? Object.entries(
//           data.reduce((acc:any,row:any)=>{
//             acc[row.state]=(acc[row.state]||0)+row.visits
//             return acc
//           },{})
//         )
//         .map(([state,visits])=>({state,visits}))
//         .sort((a:any,b:any)=>b.visits-a.visits)
//         .slice(0,10)
//       : []

//   /* ----------------------------- */
//   /* AGGREGATE CITY DATA */
//   /* ----------------------------- */

//   const cityData =
//     data
//       ? Object.entries(
//           data.reduce((acc:any,row:any)=>{
//             if(!row.city || row.city==="(not set)") return acc
//             acc[row.city]=(acc[row.city]||0)+row.visits
//             return acc
//           },{})
//         )
//         .map(([city,visits])=>({city,visits}))
//         .sort((a:any,b:any)=>b.visits-a.visits)
//         .slice(0,10)
//       : []

//   /* ----------------------------- */
//   /* PPT EXPORT REGISTRATION */
//   /* ----------------------------- */

//   useEffect(() => {

//     if (!stateData.length) return

//     registerChart({
//       title: "Top States by Visits",
//       labels: stateData.map(d => d.state),
//       values: stateData.map(d => d.visits)
//     })

//     /* REGISTER TOP CITIES */

//     if (cityData.length) {

//       registerChart({
//         title: "Top Cities by Visits",
//         labels: cityData.map(d => d.city),
//         values: cityData.map(d => d.visits)
//       })

//     }

//   }, [stateData, cityData])


//   if (isLoading) {
//     return (
//       <Card>
//         <CardHeader>
//           <Skeleton className="h-5 w-40" />
//           <Skeleton className="h-4 w-56" />
//         </CardHeader>
//         <CardContent>
//           <Skeleton className="h-[300px] w-full" />
//         </CardContent>
//       </Card>
//     )
//   }

//   if (!data?.length) {
//     return (
//       <Card>
//         <CardHeader>
//           <CardTitle>Geographic Insights</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="flex h-[300px] items-center justify-center text-muted-foreground">
//             Geographic data will be available when the map API is connected
//           </div>
//         </CardContent>
//       </Card>
//     )
//   }

//   return (
//     <Card>

//       <CardHeader>
//         <CardTitle>Geographic Insights</CardTitle>
//         <CardDescription>
//           State-wise distribution of visits and traffic share
//         </CardDescription>
//       </CardHeader>

//       <CardContent className="space-y-10">

//         {/* ----------------------------- */}
//         {/* TOP STATES CHART */}
//         {/* ----------------------------- */}

//         <ResponsiveContainer width="100%" height={300}>

//           <BarChart
//             data={stateData}
//             layout="vertical"
//             margin={{ top: 0, right: 20, left: 10, bottom: 0 }}
//           >

//             <CartesianGrid strokeDasharray="3 3" className="stroke-border" horizontal={false} />

//             <XAxis
//               type="number"
//               tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }}
//               tickFormatter={formatVisits}
//             />

//             <YAxis
//               type="category"
//               dataKey="state"
//               width={140}
//               tick={{ fill: 'var(--color-muted-foreground)', fontSize: 11 }}
//             />

//             <Tooltip
//               contentStyle={{
//                 backgroundColor: 'var(--color-card)',
//                 border: '1px solid var(--color-border)',
//                 borderRadius: '8px',
//                 boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
//                 fontSize: '13px',
//               }}
//               formatter={(value: number) => [formatVisits(value), 'Visits']}
//             />

//             <Bar
//               dataKey="visits"
//               fill="#3b6cf5"
//               radius={[0, 4, 4, 0]}
//               animationDuration={800}
//             />

//           </BarChart>

//         </ResponsiveContainer>


//         {/* ----------------------------- */}
//         {/* TOP CITIES CHART */}
//         {/* ----------------------------- */}

//         <ResponsiveContainer width="100%" height={300}>

//           <BarChart
//             data={cityData}
//             layout="vertical"
//             margin={{ top: 0, right: 20, left: 10, bottom: 0 }}
//           >

//             <CartesianGrid strokeDasharray="3 3" className="stroke-border" horizontal={false} />

//             <XAxis
//               type="number"
//               tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }}
//               tickFormatter={formatVisits}
//             />

//             <YAxis
//               type="category"
//               dataKey="city"
//               width={160}
//               tick={{ fill: 'var(--color-muted-foreground)', fontSize: 11 }}
//             />

//             <Tooltip
//               contentStyle={{
//                 backgroundColor: 'var(--color-card)',
//                 border: '1px solid var(--color-border)',
//                 borderRadius: '8px',
//                 boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
//                 fontSize: '13px',
//               }}
//               formatter={(value: number) => [formatVisits(value), 'Visits']}
//             />

//             <Bar
//               dataKey="visits"
//               fill="#22c55e"
//               radius={[0, 4, 4, 0]}
//               animationDuration={800}
//             />

//           </BarChart>

//         </ResponsiveContainer>

//       </CardContent>

//     </Card>
//   )
// }















'use client'

import { useEffect, useMemo } from 'react'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

import type { GeographicData } from '@/lib/types'
import { registerChart } from '@/lib/ppt/chartRegistry'

interface GeographicInsightsProps {
  data: GeographicData[] | undefined
  isLoading: boolean
}

function formatVisits(num: number): string {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`
  return num.toLocaleString()
}

export function GeographicInsights({ data, isLoading }: GeographicInsightsProps) {

  /* ----------------------------- */
  /* STATE DATA (SOP SAFE) */
  /* ----------------------------- */

  const stateData = useMemo(() => {

    if (!data?.length) return []

    const map: Record<string, number> = {}

    data.forEach(row => {

      const state = row.state || "Unknown"

      if (state === "(not set)") return

      map[state] = (map[state] || 0) + (row.visits || 0)

    })

    return Object.entries(map)
      .map(([state, visits]) => ({ state, visits }))
      .sort((a, b) => b.visits - a.visits)
      .slice(0, 10)

  }, [data])


  /* ----------------------------- */
  /* CITY DATA (SOP SAFE) */
  /* ----------------------------- */

  const cityData = useMemo(() => {

    if (!data?.length) return []

    const map: Record<string, number> = {}

    data.forEach(row => {

      const city = row.city || "Unknown"

      if (city === "(not set)") return

      map[city] = (map[city] || 0) + (row.visits || 0)

    })

    return Object.entries(map)
      .map(([city, visits]) => ({ city, visits }))
      .sort((a, b) => b.visits - a.visits)
      .slice(0, 10)

  }, [data])


  /* ----------------------------- */
  /* PPT EXPORT REGISTRATION */
  /* ----------------------------- */

  useEffect(() => {

    if (!stateData.length) return

    registerChart({
      title: "Top States by Visits",
      labels: stateData.map(d => d.state),
      values: stateData.map(d => d.visits)
    })

    if (cityData.length) {

      registerChart({
        title: "Top Cities by Visits",
        labels: cityData.map(d => d.city),
        values: cityData.map(d => d.visits)
      })

    }

  }, [stateData, cityData])


  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-4 w-56" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[300px] w-full" />
        </CardContent>
      </Card>
    )
  }

  if (!data?.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Geographic Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-[300px] items-center justify-center text-muted-foreground">
            Geographic data will be available when the map API is connected
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>

      <CardHeader>
        <CardTitle>Geographic Insights</CardTitle>
        <CardDescription>
          State-wise and city-wise distribution of visits
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-10">

        {/* STATES */}

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={stateData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            <XAxis type="number" tickFormatter={formatVisits} />
            <YAxis type="category" dataKey="state" width={140} />
            <Tooltip formatter={(value: number) => [formatVisits(value), 'Visits']} />
            <Bar dataKey="visits" fill="#3b6cf5" radius={[0,4,4,0]} />
          </BarChart>
        </ResponsiveContainer>

        {/* CITIES */}

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={cityData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            <XAxis type="number" tickFormatter={formatVisits} />
            <YAxis type="category" dataKey="city" width={160} />
            <Tooltip formatter={(value: number) => [formatVisits(value), 'Visits']} />
            <Bar dataKey="visits" fill="#22c55e" radius={[0,4,4,0]} />
          </BarChart>
        </ResponsiveContainer>

      </CardContent>

    </Card>
  )
}