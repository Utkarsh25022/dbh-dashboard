'use client'

import { useEffect } from 'react'

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
  /* PPT EXPORT REGISTRATION */
  /* ----------------------------- */

  useEffect(() => {

    if (!data || data.length === 0) return

    const topStates =
      [...data]
        .sort((a, b) => b.visits - a.visits)
        .slice(0, 10)

    registerChart({
      title: "Top States by Visits",
      labels: topStates.map(d => d.state),
      values: topStates.map(d => d.visits)
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
          State-wise distribution of visits and traffic share
        </CardDescription>
      </CardHeader>

      <CardContent>

        <ResponsiveContainer width="100%" height={300}>

          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 0, right: 20, left: 10, bottom: 0 }}
          >

            <CartesianGrid strokeDasharray="3 3" className="stroke-border" horizontal={false} />

            <XAxis
              type="number"
              tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }}
              tickFormatter={formatVisits}
            />

            <YAxis
              type="category"
              dataKey="state"
              width={110}
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
              formatter={(value: number, name: string) => {
                if (name === 'visits') return [formatVisits(value), 'Visits']
                return [`${value}%`, 'Share']
              }}
            />

            <Bar
              dataKey="visits"
              fill="#3b6cf5"
              radius={[0, 4, 4, 0]}
              animationDuration={800}
            />

          </BarChart>

        </ResponsiveContainer>

      </CardContent>

    </Card>
  )
}