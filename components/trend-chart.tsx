// // // // 'use client'

// // // // import {
// // // // LineChart,
// // // // Line,
// // // // XAxis,
// // // // YAxis,
// // // // CartesianGrid,
// // // // Tooltip,
// // // // Legend,
// // // // ResponsiveContainer,
// // // // } from 'recharts'

// // // // import {
// // // // Card,
// // // // CardContent,
// // // // CardHeader,
// // // // CardTitle,
// // // // CardDescription,
// // // // } from '@/components/ui/card'

// // // // import { Skeleton } from '@/components/ui/skeleton'

// // // // const CHART_COLORS = [
// // // // '#2563eb',
// // // // '#dc2626',
// // // // '#16a34a',
// // // // '#d97706',
// // // // '#7c3aed',
// // // // '#0891b2',
// // // // '#db2777',
// // // // ]

// // // // function formatLabel(key: string): string {
// // // // return key
// // // // .replace(/_/g, ' ')
// // // // .replace(/\b\w/g, (c) => c.toUpperCase())
// // // // }

// // // // function formatDateTick(val: string): string {
// // // // const d = new Date(val + 'T00:00:00')
// // // // return d.toLocaleDateString('en-US', {
// // // // month: 'short',
// // // // day: 'numeric',
// // // // })
// // // // }

// // // // function formatDateTooltip(val: string): string {
// // // // const d = new Date(val + 'T00:00:00')
// // // // return d.toLocaleDateString('en-US', {
// // // // weekday: 'short',
// // // // month: 'short',
// // // // day: 'numeric',
// // // // })
// // // // }

// // // // interface TrendChartProps {
// // // // data: Record<string, string | number>[] | undefined
// // // // isLoading: boolean
// // // // }

// // // // export function TrendChart({ data, isLoading }: TrendChartProps) {

// // // // if (isLoading) {
// // // // return ( <Card> <CardHeader> <Skeleton className="h-5 w-48" /> <Skeleton className="h-4 w-64" /> </CardHeader> <CardContent> <Skeleton className="h-[350px] w-full" /> </CardContent> </Card>
// // // // )
// // // // }

// // // // if (!data || data.length === 0) {
// // // // return ( <Card> <CardHeader> <CardTitle>Model vs Competitor Performance</CardTitle> <CardDescription>
// // // // Daily traffic comparison across competing models </CardDescription> </CardHeader>

// // // // ```
// // // //     <CardContent>
// // // //       <div className="flex h-[350px] items-center justify-center text-muted-foreground">
// // // //         No trend data available
// // // //       </div>
// // // //     </CardContent>
// // // //   </Card>
// // // // )


// // // // }

// // // // const models = Object.keys(data[0]).filter((k) => k !== 'date')

// // // // return ( <Card>


// // // //   <CardHeader>
// // // //     <CardTitle>Model vs Competitor Performance</CardTitle>
// // // //     <CardDescription>
// // // //       Daily traffic comparison across competing models
// // // //     </CardDescription>
// // // //   </CardHeader>

// // // //   <CardContent>
// // // //     <ResponsiveContainer width="100%" height={350}>

// // // //       <LineChart
// // // //         data={data}
// // // //         margin={{ top: 10, right: 25, left: 10, bottom: 10 }}
// // // //       >

// // // //         {/* cleaner grid */}
// // // //         <CartesianGrid
// // // //           strokeDasharray="2 4"
// // // //           vertical={false}
// // // //           opacity={0.3}
// // // //         />

// // // //         <XAxis
// // // //           dataKey="date"
// // // //           tick={{ fontSize: 12 }}
// // // //           tickFormatter={formatDateTick}
// // // //           tickLine={false}
// // // //         />

// // // //         <YAxis
// // // //           tick={{ fontSize: 12 }}
// // // //           width={60}
// // // //           tickFormatter={(v) => Number(v).toLocaleString()}
// // // //           tickLine={false}
// // // //           axisLine={false}
// // // //         />

// // // //         <Tooltip
// // // //           formatter={(value, name) => [
// // // //             Number(value).toLocaleString(),
// // // //             formatLabel(String(name)),
// // // //           ]}
// // // //           labelFormatter={formatDateTooltip}
// // // //           contentStyle={{
// // // //             borderRadius: 8,
// // // //             border: '1px solid #e5e7eb',
// // // //           }}
// // // //         />

// // // //         <Legend
// // // //           formatter={(value) => formatLabel(String(value))}
// // // //         />

// // // //         {models.map((model, i) => (
// // // //           <Line
// // // //             key={model}
// // // //             type="monotone"
// // // //             dataKey={model}
// // // //             name={model}
// // // //             stroke={CHART_COLORS[i % CHART_COLORS.length]}
// // // //             strokeWidth={3}

// // // //             /* IMPORTANT FIXES */

// // // //             dot={false}
// // // //             activeDot={{ r: 5 }}
// // // //             connectNulls
// // // //             isAnimationActive={false}
// // // //           />
// // // //         ))}

// // // //       </LineChart>

// // // //     </ResponsiveContainer>
// // // //   </CardContent>

// // // // </Card>

// // // // )
// // // // }




// // // 'use client'

// // // import {
// // // LineChart,
// // // Line,
// // // XAxis,
// // // YAxis,
// // // CartesianGrid,
// // // Tooltip,
// // // Legend,
// // // ResponsiveContainer,
// // // } from 'recharts'

// // // import {
// // // Card,
// // // CardContent,
// // // CardHeader,
// // // CardTitle,
// // // CardDescription,
// // // } from '@/components/ui/card'

// // // import { Skeleton } from '@/components/ui/skeleton'

// // // const CHART_COLORS = [
// // // '#2563eb',
// // // '#dc2626',
// // // '#16a34a',
// // // '#d97706',
// // // '#7c3aed',
// // // '#0891b2',
// // // '#db2777',
// // // ]

// // // function formatLabel(key: string): string {
// // // return key
// // // .replace(/_/g, ' ')
// // // .replace(/\b\w/g, (c) => c.toUpperCase())
// // // }

// // // function formatDateTick(val: string): string {
// // // const d = new Date(val + 'T00:00:00')
// // // return d.toLocaleDateString('en-US', {
// // // month: 'short',
// // // day: 'numeric',
// // // })
// // // }

// // // function formatDateTooltip(val: string): string {
// // // const d = new Date(val + 'T00:00:00')
// // // return d.toLocaleDateString('en-US', {
// // // weekday: 'short',
// // // month: 'short',
// // // day: 'numeric',
// // // })
// // // }

// // // interface TrendChartProps {
// // // data: Record<string, string | number>[] | undefined
// // // isLoading: boolean
// // // }

// // // export function TrendChart({ data, isLoading }: TrendChartProps) {

// // // if (isLoading) {
// // // return ( <Card> <CardHeader> <Skeleton className="h-5 w-48" /> <Skeleton className="h-4 w-64" /> </CardHeader> <CardContent> <Skeleton className="h-[350px] w-full" /> </CardContent> </Card>
// // // )
// // // }

// // // if (!data || data.length === 0) {
// // // return ( <Card> <CardHeader> <CardTitle>Model vs Competitor Performance</CardTitle> <CardDescription>
// // // Daily traffic comparison across competing models </CardDescription> </CardHeader>

// // // <CardContent>
// // //   <div className="flex h-[350px] items-center justify-center text-muted-foreground">
// // //     No trend data available
// // //   </div>
// // // </CardContent>
// // // </Card> )

// // // }

// // // /* ----------------------------- /
// // // / FIX: COLLAPSE VARIANT MODELS /
// // // / ----------------------------- */

// // // const rawModels = Object.keys(data[0]).filter((k) => k !== 'date')

// // // const models = Array.from(
// // // new Set(
// // // rawModels.map((m) =>
// // // m
// // // .replace(/_ev$/i,'')
// // // .replace(/_roxx$/i,'')
// // // .replace(/_racer$/i,'')
// // // .replace(/_e$/i,'')
// // // )
// // // )
// // // )

// // // return ( <Card>

// // // <CardHeader> <CardTitle>Model vs Competitor Performance</CardTitle> <CardDescription> Daily traffic comparison across competing models </CardDescription> </CardHeader> <CardContent> <ResponsiveContainer width="100%" height={350}>
// // //   <LineChart
// // //     data={data}
// // //     margin={{ top: 10, right: 25, left: 10, bottom: 10 }}
// // //   >

// // //     {/* cleaner grid */}
// // //     <CartesianGrid
// // // //       strokeDasharray="2 4"
// // // //       vertical={false}
// // // //       opacity={0.3}
// // // //     />

// // // //     <XAxis
// // // //       dataKey="date"
// // // //       tick={{ fontSize: 12 }}
// // // //       tickFormatter={formatDateTick}
// // // //       tickLine={false}
// // // //     />

// // // //     <YAxis
// // // //       tick={{ fontSize: 12 }}
// // // //       width={60}
// // // //       tickFormatter={(v) => Number(v).toLocaleString()}
// // // //       tickLine={false}
// // // //       axisLine={false}
// // // //     />

// // // //     <Tooltip
// // // //       formatter={(value, name) => [
// // // //         Number(value).toLocaleString(),
// // // //         formatLabel(String(name)),
// // // //       ]}
// // // //       labelFormatter={formatDateTooltip}
// // // //       contentStyle={{
// // // //         borderRadius: 8,
// // // //         border: '1px solid #e5e7eb',
// // // //       }}
// // // //     />

// // // //     <Legend
// // // //       formatter={(value) => formatLabel(String(value))}
// // // //     />

// // // //     {models.map((model, i) => (
// // // //       <Line
// // // //         key={model}
// // // //         type="monotone"
// // // //         dataKey={model}
// // // //         name={model}
// // // //         stroke={CHART_COLORS[i % CHART_COLORS.length]}
// // // //         strokeWidth={3}

// // // //         /* IMPORTANT FIXES */

// // // //         dot={false}
// // // //         activeDot={{ r: 5 }}
// // // //         connectNulls
// // // //         isAnimationActive={false}
// // // //       />
// // // //     ))}

// // // //   </LineChart>

// // // // </ResponsiveContainer>
// // // // </CardContent> </Card>

// // // // )
// // // // }









// // // 'use client'

// // // import { useEffect } from 'react'

// // // import {
// // // LineChart,
// // // Line,
// // // XAxis,
// // // YAxis,
// // // CartesianGrid,
// // // Tooltip,
// // // Legend,
// // // ResponsiveContainer,
// // // } from 'recharts'

// // // import {
// // // Card,
// // // CardContent,
// // // CardHeader,
// // // CardTitle,
// // // CardDescription,
// // // } from '@/components/ui/card'

// // // import { Skeleton } from '@/components/ui/skeleton'

// // // import { registerTrendChart } from '@/lib/ppt/chartRegistry'

// // // const CHART_COLORS = [
// // // '#2563eb',
// // // '#dc2626',
// // // '#16a34a',
// // // '#d97706',
// // // '#7c3aed',
// // // '#0891b2',
// // // '#db2777',
// // // ]

// // // function formatLabel(key: string): string {
// // // return key
// // // .replace(/_/g, ' ')
// // // .replace(/\b\w/g, (c) => c.toUpperCase())
// // // }

// // // function formatDateTick(val: string): string {
// // // const d = new Date(val + 'T00:00:00')
// // // return d.toLocaleDateString('en-US', {
// // // month: 'short',
// // // day: 'numeric',
// // // })
// // // }

// // // function formatDateTooltip(val: string): string {
// // // const d = new Date(val + 'T00:00:00')
// // // return d.toLocaleDateString('en-US', {
// // // weekday: 'short',
// // // month: 'short',
// // // day: 'numeric',
// // // })
// // // }

// // // interface TrendChartProps {
// // // data: Record<string, string | number>[] | undefined
// // // isLoading: boolean
// // // }

// // // export function TrendChart({ data, isLoading }: TrendChartProps) {
    

// // // if (isLoading) {
// // // return (
// // // <Card>
// // // <CardHeader>
// // // <Skeleton className="h-5 w-48" />
// // // <Skeleton className="h-4 w-64" />
// // // </CardHeader>
// // // <CardContent>
// // // <Skeleton className="h-[350px] w-full" />
// // // </CardContent>
// // // </Card>
// // // )
// // // }

// // // if (!data || data.length === 0) {
// // // return (
// // // <Card>
// // // <CardHeader>
// // // <CardTitle>Model vs Competitor Performance</CardTitle>
// // // <CardDescription>
// // // Daily traffic comparison across competing models
// // // </CardDescription>
// // // </CardHeader>

// // // <CardContent>
// // // <div className="flex h-[350px] items-center justify-center text-muted-foreground">
// // // No trend data available
// // // </div>
// // // </CardContent>
// // // </Card>
// // // )
// // // }

// // // /* ----------------------------- */
// // // /* FIX: COLLAPSE VARIANT MODELS */
// // // /* ----------------------------- */

// // // const rawModels = Object.keys(data[0]).filter((k) => k !== 'date')

// // // const models = Array.from(
// // // new Set(
// // // rawModels.map((m) =>
// // // m
// // // .replace(/_ev$/i,'')
// // // .replace(/_roxx$/i,'')
// // // .replace(/_racer$/i,'')
// // // .replace(/_e$/i,'')
// // // )
// // // )
// // // )

// // // /* ----------------------------- */
// // // /* PPT EXPORT REGISTRATION */
// // // /* ----------------------------- */

// // // useEffect(() => {

// // // if (!data) return

// // // const step = Math.ceil(data.length / 12)

// // // const reduced = data.filter((_, i) => i % step === 0)

// // // const labels = reduced.map((d) => String(d.date))

// // // const series = models.map((model) => ({
// // // name: model,
// // // values: reduced.map((d) => Number(d[model] || 0))
// // // }))

// // // registerTrendChart({
// // // title: "Traffic Trend",
// // // labels,
// // // series
// // // })

// // // }, [data])

// // // return (
// // // <Card>

// // // <CardHeader>
// // // <CardTitle>Model vs Competitor Performance</CardTitle>
// // // <CardDescription>
// // // Daily traffic comparison across competing models
// // // </CardDescription>
// // // </CardHeader>

// // // <CardContent>
// // // <ResponsiveContainer width="100%" height={350}>

// // // <LineChart
// // // data={data}
// // // margin={{ top: 10, right: 25, left: 10, bottom: 10 }}
// // // >

// // // <CartesianGrid
// // // strokeDasharray="2 4"
// // // vertical={false}
// // // opacity={0.3}
// // // />

// // // <XAxis
// // // dataKey="date"
// // // tick={{ fontSize: 12 }}
// // // tickFormatter={formatDateTick}
// // // tickLine={false}
// // // />

// // // <YAxis
// // // tick={{ fontSize: 12 }}
// // // width={60}
// // // tickFormatter={(v) => Number(v).toLocaleString()}
// // // tickLine={false}
// // // axisLine={false}
// // // />

// // // <Tooltip
// // // formatter={(value, name) => [
// // // Number(value).toLocaleString(),
// // // formatLabel(String(name)),
// // // ]}
// // // labelFormatter={formatDateTooltip}
// // // contentStyle={{
// // // borderRadius: 8,
// // // border: '1px solid #e5e7eb',
// // // }}
// // // />

// // // <Legend
// // // formatter={(value) => formatLabel(String(value))}
// // // />

// // // {models.map((model, i) => (
// // // <Line
// // // key={model}
// // // type="monotone"
// // // dataKey={model}
// // // name={model}
// // // stroke={CHART_COLORS[i % CHART_COLORS.length]}
// // // strokeWidth={3}
// // // dot={false}
// // // activeDot={{ r: 5 }}
// // // connectNulls
// // // isAnimationActive={false}
// // // />
// // // ))}

// // // </LineChart>

// // // </ResponsiveContainer>
// // // </CardContent>

// // // </Card>
// // // )
// // // }



// // 'use client'

// // import { useEffect } from 'react'

// // import {
// // LineChart,
// // Line,
// // XAxis,
// // YAxis,
// // CartesianGrid,
// // Tooltip,
// // Legend,
// // ResponsiveContainer,
// // } from 'recharts'

// // import {
// // Card,
// // CardContent,
// // CardHeader,
// // CardTitle,
// // CardDescription,
// // } from '@/components/ui/card'

// // import { Skeleton } from '@/components/ui/skeleton'

// // import { registerTrendChart } from '@/lib/ppt/chartRegistry'

// // const CHART_COLORS = [
// // '#2563eb',
// // '#dc2626',
// // '#16a34a',
// // '#d97706',
// // '#7c3aed',
// // '#0891b2',
// // '#db2777',
// // ]

// // function formatLabel(key: string): string {
// // return key
// // .replace(/_/g, ' ')
// // .replace(/\b\w/g, (c) => c.toUpperCase())
// // }

// // function formatDateTick(val: string): string {
// // const d = new Date(val + 'T00:00:00')
// // return d.toLocaleDateString('en-US', {
// // month: 'short',
// // day: 'numeric',
// // })
// // }

// // function formatDateTooltip(val: string): string {
// // const d = new Date(val + 'T00:00:00')
// // return d.toLocaleDateString('en-US', {
// // weekday: 'short',
// // month: 'short',
// // day: 'numeric',
// // })
// // }

// // interface TrendChartProps {
// // data: Record<string, string | number>[] | undefined
// // isLoading: boolean
// // }

// // export function TrendChart({ data, isLoading }: TrendChartProps) {

// // if (isLoading) {
// // return (
// // <Card>
// // <CardHeader>
// // <Skeleton className="h-5 w-48" />
// // <Skeleton className="h-4 w-64" />
// // </CardHeader>
// // <CardContent>
// // <Skeleton className="h-[350px] w-full" />
// // </CardContent>
// // </Card>
// // )
// // }

// // if (!data || data.length === 0) {
// // return (
// // <Card>
// // <CardHeader>
// // <CardTitle>Model vs Competitor Performance</CardTitle>
// // <CardDescription>
// // Daily traffic comparison across competing models
// // </CardDescription>
// // </CardHeader>

// // <CardContent>
// // <div className="flex h-[350px] items-center justify-center text-muted-foreground">
// // No trend data available
// // </div>
// // </CardContent>
// // </Card>
// // )
// // }

// // /* ----------------------------- */
// // /* GET MODELS FROM DATA KEYS */
// // /* ----------------------------- */

// // const models = Object.keys(data[0]).filter((k) => k !== 'date')

// // /* ----------------------------- */
// // /* PPT EXPORT REGISTRATION */
// // /* ----------------------------- */

// // useEffect(() => {

// // if (!data) return

// // const step = Math.ceil(data.length / 12)

// // const reduced = data.filter((_, i) => i % step === 0)

// // const labels = reduced.map((d) => String(d.date))

// // const series = models.map((model) => ({
// // name: model,
// // values: reduced.map((d) => Number(d[model] || 0))
// // }))

// // registerTrendChart({
// // title: "Traffic Trend",
// // labels,
// // series
// // })

// // }, [data])

// // return (
// // <Card>

// // <CardHeader>
// // <CardTitle>Model vs Competitor Performance</CardTitle>
// // <CardDescription>
// // Daily traffic comparison across competing models
// // </CardDescription>
// // </CardHeader>

// // <CardContent>
// // <ResponsiveContainer width="100%" height={350}>

// // <LineChart
// // data={data}
// // margin={{ top: 10, right: 25, left: 10, bottom: 10 }}
// // >

// // <CartesianGrid
// // strokeDasharray="2 4"
// // vertical={false}
// // opacity={0.3}
// // />

// // <XAxis
// // dataKey="date"
// // tick={{ fontSize: 12 }}
// // tickFormatter={formatDateTick}
// // tickLine={false}
// // />

// // <YAxis
// // tick={{ fontSize: 12 }}
// // width={60}
// // tickFormatter={(v) => Number(v).toLocaleString()}
// // tickLine={false}
// // axisLine={false}
// // />

// // <Tooltip
// // formatter={(value, name) => [
// // Number(value).toLocaleString(),
// // formatLabel(String(name)),
// // ]}
// // labelFormatter={formatDateTooltip}
// // contentStyle={{
// // borderRadius: 8,
// // border: '1px solid #e5e7eb',
// // }}
// // />

// // <Legend
// // formatter={(value) => formatLabel(String(value))}
// // />

// // {models.map((model, i) => (
// // <Line
// // key={model}
// // type="monotone"
// // dataKey={model}
// // name={model}
// // stroke={CHART_COLORS[i % CHART_COLORS.length]}
// // strokeWidth={3}
// // dot={false}
// // activeDot={{ r: 5 }}
// // connectNulls
// // isAnimationActive={false}
// // />
// // ))}

// // </LineChart>

// // </ResponsiveContainer>
// // </CardContent>

// // </Card>
// // )
// // }

// 'use client'

// import { useEffect } from 'react'

// import {
// LineChart,
// Line,
// XAxis,
// YAxis,
// CartesianGrid,
// Tooltip,
// Legend,
// ResponsiveContainer,
// } from 'recharts'

// import {
// Card,
// CardContent,
// CardHeader,
// CardTitle,
// CardDescription,
// } from '@/components/ui/card'

// import { Skeleton } from '@/components/ui/skeleton'

// import { registerTrendChart } from '@/lib/ppt/chartRegistry'

// const CHART_COLORS = [
// '#2563eb',
// '#dc2626',
// '#16a34a',
// '#d97706',
// '#7c3aed',
// '#0891b2',
// '#db2777',
// ]

// function formatLabel(key: string): string {
// return key
// .replace(/_/g, ' ')
// .replace(/\b\w/g, (c) => c.toUpperCase())
// }

// function formatDateTick(val: string): string {
// const d = new Date(val + 'T00:00:00')
// return d.toLocaleDateString('en-US', {
// month: 'short',
// day: 'numeric',
// })
// }

// function formatDateTooltip(val: string): string {
// const d = new Date(val + 'T00:00:00')
// return d.toLocaleDateString('en-US', {
// weekday: 'short',
// month: 'short',
// day: 'numeric',
// })
// }

// interface TrendChartProps {
// data: Record<string, string | number>[] | undefined
// isLoading: boolean
// }

// export function TrendChart({ data, isLoading }: TrendChartProps) {

// if (isLoading) {
// return (
// <Card>
// <CardHeader>
// <Skeleton className="h-5 w-48" />
// <Skeleton className="h-4 w-64" />
// </CardHeader>
// <CardContent>
// <Skeleton className="h-[350px] w-full" />
// </CardContent>
// </Card>
// )
// }

// if (!data || data.length === 0) {
// return (
// <Card>
// <CardHeader>
// <CardTitle>Model vs Competitor Performance</CardTitle>
// <CardDescription>
// Daily traffic comparison across competing models
// </CardDescription>
// </CardHeader>

// <CardContent>
// <div className="flex h-[350px] items-center justify-center text-muted-foreground">
// No trend data available
// </div>
// </CardContent>
// </Card>
// )
// }

// /* ----------------------------- */
// /* GET MODEL KEYS FROM API DATA */
// /* ----------------------------- */

// const models = Object.keys(data[0]).filter(k => k !== 'date')

// /* ----------------------------- */
// /* PPT EXPORT REGISTRATION */
// /* ----------------------------- */

// useEffect(() => {

// if (!data) return

// const step = Math.ceil(data.length / 12)

// const reduced = data.filter((_, i) => i % step === 0)

// const labels = reduced.map(d => String(d.date))

// const series = models.map(model => ({
// name: model,
// values: reduced.map(d => Number(d[model] || 0))
// }))

// registerTrendChart({
// title: "Traffic Trend",
// labels,
// series
// })

// }, [data])

// return (
// <Card>

// <CardHeader>
// <CardTitle>Model vs Competitor Performance</CardTitle>
// <CardDescription>
// Daily traffic comparison across competing models
// </CardDescription>
// </CardHeader>

// <CardContent>
// <ResponsiveContainer width="100%" height={350}>

// <LineChart
// data={data}
// margin={{ top: 10, right: 25, left: 10, bottom: 10 }}
// >

// <CartesianGrid
// strokeDasharray="2 4"
// vertical={false}
// opacity={0.3}
// />

// <XAxis
// dataKey="date"
// tick={{ fontSize: 12 }}
// tickFormatter={formatDateTick}
// tickLine={false}
// />

// <YAxis
// tick={{ fontSize: 12 }}
// width={60}
// tickFormatter={(v) => Number(v).toLocaleString()}
// tickLine={false}
// axisLine={false}
// />

// <Tooltip
// formatter={(value, name) => [
// Number(value).toLocaleString(),
// formatLabel(String(name)),
// ]}
// labelFormatter={formatDateTooltip}
// contentStyle={{
// borderRadius: 8,
// border: '1px solid #e5e7eb',
// }}
// />

// <Legend
// formatter={(value) => formatLabel(String(value))}
// />

// {models.map((model, i) => (
// <Line
// key={model}
// type="monotone"
// dataKey={model}
// name={model}
// stroke={CHART_COLORS[i % CHART_COLORS.length]}
// strokeWidth={3}
// dot={false}
// activeDot={{ r: 5 }}
// connectNulls
// isAnimationActive={false}
// />
// ))}

// </LineChart>

// </ResponsiveContainer>
// </CardContent>

// </Card>
// )
// }











'use client'

import { useEffect } from 'react'

import {
LineChart,
Line,
XAxis,
YAxis,
CartesianGrid,
Tooltip,
Legend,
ResponsiveContainer,
} from 'recharts'

import {
Card,
CardContent,
CardHeader,
CardTitle,
CardDescription,
} from '@/components/ui/card'

import { Skeleton } from '@/components/ui/skeleton'

import { registerTrendChart } from '@/lib/ppt/chartRegistry'

const CHART_COLORS = [
'#2563eb',
'#dc2626',
'#16a34a',
'#d97706',
'#7c3aed',
'#0891b2',
'#db2777',
]

function formatLabel(key: string): string {
return key
.replace(/_/g, ' ')
.replace(/\b\w/g, (c) => c.toUpperCase())
}

function formatDateTick(val: string): string {
const d = new Date(val + 'T00:00:00')
return d.toLocaleDateString('en-US', {
month: 'short',
day: 'numeric',
})
}

function formatDateTooltip(val: string): string {
const d = new Date(val + 'T00:00:00')
return d.toLocaleDateString('en-US', {
weekday: 'short',
month: 'short',
day: 'numeric',
})
}

interface TrendChartProps {
data: Record<string, string | number>[] | undefined
isLoading: boolean
}

export function TrendChart({ data, isLoading }: TrendChartProps) {

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

if (!data || data.length === 0) {
return (
<Card>
<CardHeader>
<CardTitle>Model vs Competitor Performance</CardTitle>
<CardDescription>
Daily traffic comparison across competing models
</CardDescription>
</CardHeader>

<CardContent>
<div className="flex h-[350px] items-center justify-center text-muted-foreground">
No trend data available
</div>
</CardContent>
</Card>
)
}

/* ----------------------------- */
/* GET MODEL KEYS FROM API DATA */
/* ----------------------------- */

const models = Array.from(
new Set(
data.flatMap(row =>
Object.keys(row).filter(k => k !== 'date')
)
)
)

/* ----------------------------- */
/* PPT EXPORT REGISTRATION */
/* ----------------------------- */

useEffect(() => {

if (!data) return

const step = Math.ceil(data.length / 12)

const reduced = data.filter((_, i) => i % step === 0)

const labels = reduced.map(d => String(d.date))

const series = models.map(model => ({
name: model,
values: reduced.map(d => Number(d[model] || 0))
}))

registerTrendChart({
title: "Traffic Trend",
labels,
series
})

}, [data])

return (
<Card>

<CardHeader>
<CardTitle>Model vs Competitor Performance</CardTitle>
<CardDescription>
Daily traffic comparison across competing models
</CardDescription>
</CardHeader>

<CardContent>
<ResponsiveContainer width="100%" height={350}>

<LineChart
data={data}
margin={{ top: 10, right: 25, left: 10, bottom: 10 }}
>

<CartesianGrid
strokeDasharray="2 4"
vertical={false}
opacity={0.3}
/>

<XAxis
dataKey="date"
tick={{ fontSize: 12 }}
tickFormatter={formatDateTick}
tickLine={false}
/>

<YAxis
tick={{ fontSize: 12 }}
width={60}
tickFormatter={(v) => Number(v).toLocaleString()}
tickLine={false}
axisLine={false}
/>

<Tooltip
formatter={(value, name) => [
Number(value).toLocaleString(),
formatLabel(String(name)),
]}
labelFormatter={formatDateTooltip}
contentStyle={{
borderRadius: 8,
border: '1px solid #e5e7eb',
}}
/>

<Legend
formatter={(value) => formatLabel(String(value))}
/>

{models.map((model, i) => (
<Line
key={model}
type="monotone"
dataKey={model}
name={model}
stroke={CHART_COLORS[i % CHART_COLORS.length]}
strokeWidth={3}
dot={false}
activeDot={{ r: 5 }}
connectNulls
isAnimationActive={false}
/>
))}

</LineChart>

</ResponsiveContainer>
</CardContent>

</Card>
)
}