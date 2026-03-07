// 'use client'

// import {
// PieChart,
// Pie,
// Cell,
// Tooltip,
// ResponsiveContainer,
// } from 'recharts'
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
// import { Skeleton } from '@/components/ui/skeleton'
// import type { DeviceData } from '@/lib/types'

// interface DeviceChartProps {
// data: DeviceData[] | undefined
// isLoading: boolean
// }

// const DEVICE_COLORS = ['#3b6cf5', '#10b981', '#f59e0b']

// export function DeviceChart({ data, isLoading }: DeviceChartProps) {

// if (isLoading) {
// return ( <Card> <CardHeader> <Skeleton className="h-5 w-40" /> <Skeleton className="h-4 w-56" /> </CardHeader> <CardContent> <Skeleton className="h-[250px] w-full" /> </CardContent> </Card>
// )
// }

// if (!data?.length) {
// return ( <Card> <CardHeader> <CardTitle>Device Distribution</CardTitle> </CardHeader> <CardContent> <div className="flex h-[250px] items-center justify-center text-muted-foreground">
// No device data available </div> </CardContent> </Card>
// )
// }

// return ( <Card> <CardHeader> <CardTitle>Device Distribution</CardTitle> <CardDescription>
// Audience breakdown by device type </CardDescription> </CardHeader>

// ```
//   <CardContent>

//     <div className="flex items-center justify-center gap-8">

//       {/* Pie Chart */}
//       <div className="w-[240px] h-[220px]">
//         <ResponsiveContainer width="100%" height="100%">
//           <PieChart>
//             <Pie
//               data={data}
//               cx="50%"
//               cy="50%"
//               innerRadius={55}
//               outerRadius={90}
//               paddingAngle={4}
//               dataKey="share"
//               nameKey="device"
//               animationDuration={800}
//             >
//               {data.map((_, index) => (
//                 <Cell
//                   key={`cell-${index}`}
//                   fill={DEVICE_COLORS[index % DEVICE_COLORS.length]}
//                   stroke="none"
//                 />
//               ))}
//             </Pie>

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
//           </PieChart>
//         </ResponsiveContainer>
//       </div>

//       {/* Legend */}
//       <div className="flex flex-col gap-3">
//         {data.map((item, index) => (
//           <div key={item.device} className="flex items-center gap-2">
//             <div
//               className="h-3 w-3 rounded-full"
//               style={{ backgroundColor: DEVICE_COLORS[index % DEVICE_COLORS.length] }}
//             />
//             <div className="flex flex-col">
//               <span className="text-sm font-medium text-foreground">
//                 {item.device}
//               </span>
//               <span className="text-xs text-muted-foreground">
//                 {item.share}%
//               </span>
//             </div>
//           </div>
//         ))}
//       </div>

//     </div>

//   </CardContent>
// </Card>


// )
// }







'use client'

import { useEffect } from 'react'

import {
PieChart,
Pie,
Cell,
Tooltip,
ResponsiveContainer,
} from 'recharts'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

import type { DeviceData } from '@/lib/types'

import { registerChart } from '@/lib/ppt/chartRegistry'

interface DeviceChartProps {
data: DeviceData[] | undefined
isLoading: boolean
}

const DEVICE_COLORS = ['#3b6cf5', '#10b981', '#f59e0b']

export function DeviceChart({ data, isLoading }: DeviceChartProps) {

  /* ----------------------------- */
  /* PPT EXPORT REGISTRATION */
  /* ----------------------------- */

  useEffect(() => {

    if (!data || data.length === 0) return

    registerChart({
      title: 'Device Distribution',
      labels: data.map((d) => d.device),
      values: data.map((d) => d.share)
    })

  }, [data])


  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-4 w-56" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[250px] w-full" />
        </CardContent>
      </Card>
    )
  }

  if (!data?.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Device Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-[250px] items-center justify-center text-muted-foreground">
            No device data available
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>

      <CardHeader>
        <CardTitle>Device Distribution</CardTitle>
        <CardDescription>
          Audience breakdown by device type
        </CardDescription>
      </CardHeader>

      <CardContent>

        <div className="flex items-center justify-center gap-8">

          <div className="w-[240px] h-[220px]">

            <ResponsiveContainer width="100%" height="100%">

              <PieChart>

                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="share"
                  nameKey="device"
                  animationDuration={800}
                >

                  {data.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={DEVICE_COLORS[index % DEVICE_COLORS.length]}
                      stroke="none"
                    />
                  ))}

                </Pie>

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

              </PieChart>

            </ResponsiveContainer>

          </div>

          <div className="flex flex-col gap-3">

            {data.map((item, index) => (

              <div key={item.device} className="flex items-center gap-2">

                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: DEVICE_COLORS[index % DEVICE_COLORS.length] }}
                />

                <div className="flex flex-col">

                  <span className="text-sm font-medium text-foreground">
                    {item.device}
                  </span>

                  <span className="text-xs text-muted-foreground">
                    {item.share}%
                  </span>

                </div>

              </div>

            ))}

          </div>

        </div>

      </CardContent>

    </Card>
  )
}