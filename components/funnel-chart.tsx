// 'use client'

// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   Cell,
// } from 'recharts'
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
// import { Skeleton } from '@/components/ui/skeleton'
// import type { FunnelStage } from '@/lib/types'

// interface FunnelChartProps {
//   data: FunnelStage[] | undefined
//   isLoading: boolean
// }

// const FUNNEL_COLORS = ['#3b6cf5', '#10b981', '#f59e0b', '#ef4444']

// function formatValue(num: number): string {
//   if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`
//   if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`
//   return num.toLocaleString()
// }

// export function FunnelChart({ data, isLoading }: FunnelChartProps) {
//   if (isLoading) {
//     return (
//       <Card>
//         <CardHeader>
//           <Skeleton className="h-5 w-48" />
//           <Skeleton className="h-4 w-64" />
//         </CardHeader>
//         <CardContent>
//           <Skeleton className="h-[350px] w-full" />
//         </CardContent>
//       </Card>
//     )
//   }

//   if (!data?.length) {
//     return (
//       <Card>
//         <CardHeader>
//           <CardTitle>Marketing Funnel (DBH Model)</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="flex h-[350px] items-center justify-center text-muted-foreground">
//             No funnel data available
//           </div>
//         </CardContent>
//       </Card>
//     )
//   }

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Marketing Funnel (DBH Model)</CardTitle>
//         <CardDescription>
//           TOFU to BOFU conversion pipeline
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <div className="flex flex-col gap-6">
//           <ResponsiveContainer width="100%" height={280}>
//             <BarChart
//               data={data}
//               layout="vertical"
//               margin={{ top: 0, right: 20, left: 0, bottom: 0 }}
//             >
//               <XAxis
//                 type="number"
//                 tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }}
//                 tickFormatter={formatValue}
//               />
//               <YAxis
//                 type="category"
//                 dataKey="stage"
//                 width={160}
//                 tick={{ fill: 'var(--color-muted-foreground)', fontSize: 11 }}
//               />
//               <Tooltip
//                 contentStyle={{
//                   backgroundColor: 'var(--color-card)',
//                   border: '1px solid var(--color-border)',
//                   borderRadius: '8px',
//                   boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
//                   fontSize: '13px',
//                 }}
//                 formatter={(value: number) => [formatValue(value), 'Users']}
//               />
//               <Bar dataKey="value" radius={[0, 6, 6, 0]} animationDuration={800}>
//                 {data.map((_, index) => (
//                   <Cell
//                     key={`cell-${index}`}
//                     fill={FUNNEL_COLORS[index % FUNNEL_COLORS.length]}
//                   />
//                 ))}
//               </Bar>
//             </BarChart>
//           </ResponsiveContainer>
//           <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
//             <div className="flex items-center gap-4">
//               {data.map((stage, i) => (
//                 <div key={stage.stage} className="flex items-center gap-1.5">
//                   <div
//                     className="h-2.5 w-2.5 rounded-full"
//                     style={{ backgroundColor: FUNNEL_COLORS[i % FUNNEL_COLORS.length] }}
//                   />
//                   <span>{stage.stage.split(' (')[0]}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
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
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

import type { FunnelStage } from '@/lib/types'

import { registerChart } from '@/lib/ppt/chartRegistry'

interface FunnelChartProps {
  data: FunnelStage[] | undefined
  isLoading: boolean
}

const FUNNEL_COLORS = ['#3b6cf5', '#10b981', '#f59e0b', '#ef4444']

function formatValue(num: number): string {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`
  return num.toLocaleString()
}

export function FunnelChart({ data, isLoading }: FunnelChartProps) {

  /* ----------------------------- */
  /* PPT EXPORT REGISTRATION */
  /* ----------------------------- */

  useEffect(() => {

    if (!data || data.length === 0) return

    registerChart({
      title: 'Marketing Funnel',
      labels: data.map((d) => d.stage),
      values: data.map((d) => d.value)
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
          <Skeleton className="h-[350px] w-full" />
        </CardContent>
      </Card>
    )
  }

  if (!data?.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Marketing Funnel (DBH Model)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-[350px] items-center justify-center text-muted-foreground">
            No funnel data available
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>

      <CardHeader>
        <CardTitle>Marketing Funnel (DBH Model)</CardTitle>
        <CardDescription>
          TOFU to BOFU conversion pipeline
        </CardDescription>
      </CardHeader>

      <CardContent>

        <div className="flex flex-col gap-6">

          <ResponsiveContainer width="100%" height={280}>

            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 0, right: 20, left: 0, bottom: 0 }}
            >

              <XAxis
                type="number"
                tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }}
                tickFormatter={formatValue}
              />

              <YAxis
                type="category"
                dataKey="stage"
                width={160}
                tick={{ fill: 'var(--color-muted-foreground)', fontSize: 11 }}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--color-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                  fontSize: '13px',
                }}
                formatter={(value: number) => [formatValue(value), 'Users']}
              />

              <Bar dataKey="value" radius={[0, 6, 6, 0]} animationDuration={800}>

                {data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={FUNNEL_COLORS[index % FUNNEL_COLORS.length]}
                  />
                ))}

              </Bar>

            </BarChart>

          </ResponsiveContainer>

          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">

            <div className="flex items-center gap-4">

              {data.map((stage, i) => (
                <div key={stage.stage} className="flex items-center gap-1.5">

                  <div
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: FUNNEL_COLORS[i % FUNNEL_COLORS.length] }}
                  />

                  <span>{stage.stage.split(' (')[0]}</span>

                </div>
              ))}

            </div>

          </div>

        </div>

      </CardContent>

    </Card>
  )
}