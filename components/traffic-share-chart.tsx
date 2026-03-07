// 'use client'

// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from 'recharts'
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
// import { Skeleton } from '@/components/ui/skeleton'
// import type { TrafficShareItem } from '@/lib/types'

// interface TrafficShareChartProps {
//   data: TrafficShareItem[] | undefined
//   isLoading: boolean
// }

// export function TrafficShareChart({ data, isLoading }: TrafficShareChartProps) {
//   if (isLoading) {
//     return (
//       <Card>
//         <CardHeader>
//           <Skeleton className="h-5 w-48" />
//           <Skeleton className="h-4 w-64" />
//         </CardHeader>
//         <CardContent>
//           <Skeleton className="h-[320px] w-full" />
//         </CardContent>
//       </Card>
//     )
//   }

//   if (!data?.length) {
//     return (
//       <Card>
//         <CardHeader>
//           <CardTitle>Traffic Share Movement</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="flex h-[320px] items-center justify-center text-muted-foreground">
//             No traffic data available
//           </div>
//         </CardContent>
//       </Card>
//     )
//   }

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Traffic Share Movement</CardTitle>
//         <CardDescription>
//           Search share, traffic share, and page views share by model
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <ResponsiveContainer width="100%" height={320}>
//           <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
//             <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
//             <XAxis
//               dataKey="model"
//               tick={{ fill: 'var(--color-muted-foreground)', fontSize: 11 }}
//               angle={-20}
//               textAnchor="end"
//               height={60}
//             />
//             <YAxis
//               tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }}
//               tickFormatter={(v) => `${v}%`}
//             />
//             <Tooltip
//               contentStyle={{
//                 backgroundColor: 'var(--color-card)',
//                 border: '1px solid var(--color-border)',
//                 borderRadius: '8px',
//                 boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
//                 fontSize: '13px',
//               }}
//               formatter={(value: number) => [`${value}%`, undefined]}
//             />
//             <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
//             <Bar
//               dataKey="searchShare"
//               name="Search Share"
//               fill="#3b6cf5"
//               radius={[4, 4, 0, 0]}
//               animationDuration={800}
//             />
//             <Bar
//               dataKey="trafficShare"
//               name="Traffic Share"
//               fill="#10b981"
//               radius={[4, 4, 0, 0]}
//               animationDuration={800}
//             />
//             <Bar
//               dataKey="pageViewsShare"
//               name="Page Views Share"
//               fill="#f59e0b"
//               radius={[4, 4, 0, 0]}
//               animationDuration={800}
//             />
//           </BarChart>
//         </ResponsiveContainer>
//       </CardContent>
//     </Card>
//   )
// }











'use client'

import { useEffect } from 'react'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

import type { TrafficShareItem } from '@/lib/types'

import { registerChart } from '@/lib/ppt/chartRegistry'

interface TrafficShareChartProps {
  data: TrafficShareItem[] | undefined
  isLoading: boolean
}

export function TrafficShareChart({ data, isLoading }: TrafficShareChartProps) {

  /* ----------------------------- */
  /* PPT EXPORT REGISTRATION */
  /* ----------------------------- */

  useEffect(() => {

    if (!data || data.length === 0) return

    registerChart({
      title: 'Search Share (%)',
      labels: data.map((d) => d.model),
      values: data.map((d) => d.searchShare)
    })

    registerChart({
      title: 'Traffic Share (%)',
      labels: data.map((d) => d.model),
      values: data.map((d) => d.trafficShare)
    })

    registerChart({
      title: 'Page Views Share (%)',
      labels: data.map((d) => d.model),
      values: data.map((d) => d.pageViewsShare)
    })

  }, [data])

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-4 w-64" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[320px] w-full" />
        </CardContent>
      </Card>
    )
  }

  if (!data?.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Traffic Share Movement</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-[320px] items-center justify-center text-muted-foreground">
            No traffic data available
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>

      <CardHeader>
        <CardTitle>Traffic Share Movement</CardTitle>
        <CardDescription>
          Search share, traffic share, and page views share by model
        </CardDescription>
      </CardHeader>

      <CardContent>

        <ResponsiveContainer width="100%" height={320}>

          <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>

            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />

            <XAxis
              dataKey="model"
              tick={{ fill: 'var(--color-muted-foreground)', fontSize: 11 }}
              angle={-20}
              textAnchor="end"
              height={60}
            />

            <YAxis
              tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }}
              tickFormatter={(v) => `${v}%`}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--color-card)',
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                fontSize: '13px',
              }}
              formatter={(value: number) => [`${value}%`, undefined]}
            />

            <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />

            <Bar
              dataKey="searchShare"
              name="Search Share"
              fill="#3b6cf5"
              radius={[4, 4, 0, 0]}
              animationDuration={800}
            />

            <Bar
              dataKey="trafficShare"
              name="Traffic Share"
              fill="#10b981"
              radius={[4, 4, 0, 0]}
              animationDuration={800}
            />

            <Bar
              dataKey="pageViewsShare"
              name="Page Views Share"
              fill="#f59e0b"
              radius={[4, 4, 0, 0]}
              animationDuration={800}
            />

          </BarChart>

        </ResponsiveContainer>

      </CardContent>

    </Card>
  )
}