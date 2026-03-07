'use client'

import {
  Users,
  Eye,
  Target,
  Activity,
  TrendingUp,
  Megaphone,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import type { KPIData } from '@/lib/types'

interface KPICardsProps {
  data: KPIData | undefined
  isLoading: boolean
}

function formatNumber(num: number | undefined): string {
  if (num === undefined || num === null) return '0'
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`
  return num.toLocaleString()
}

const kpiConfig = [
  { key: 'totalVisits' as const, changeKey: 'totalVisitsChange' as const, label: 'Total Visits', icon: Eye, color: 'text-chart-1' },
  { key: 'activeUsers' as const, changeKey: 'activeUsersChange' as const, label: 'Active Users', icon: Users, color: 'text-chart-2' },
  { key: 'leads' as const, changeKey: 'leadsChange' as const, label: 'Leads (Purchase Intent)', icon: Target, color: 'text-chart-3' },
  { key: 'engagement' as const, changeKey: 'engagementChange' as const, label: 'Engagement (PV/UU)', icon: Activity, color: 'text-chart-4' },
  { key: 'consideration' as const, changeKey: 'considerationChange' as const, label: 'Consideration (MOFU)', icon: TrendingUp, color: 'text-chart-5' },
  { key: 'awareness' as const, changeKey: 'awarenessChange' as const, label: 'Awareness (TOFU)', icon: Megaphone, color: 'text-chart-1' },
]

export function KPICards({ data, isLoading }: KPICardsProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="py-4">
            <CardContent className="flex flex-col gap-3">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-3 w-16" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (!data) return null

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
      {kpiConfig.map((kpi) => {
        const Icon = kpi.icon
        const value = data[kpi.key] ?? 0
        const change = data[kpi.changeKey] ?? 0
        const isPositive = change >= 0

        return (
          <Card
            key={kpi.key}
            className="group py-4 transition-shadow duration-200 hover:shadow-md"
          >
            <CardContent className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">
                  {kpi.label}
                </span>
                <Icon className={`h-4 w-4 ${kpi.color} opacity-70`} />
              </div>
              <div className="text-2xl font-semibold tracking-tight text-foreground">
                {kpi.key === 'engagement'
                  ? Number(value).toFixed(1)
                  : formatNumber(value)}
              </div>
              <div
                className={`flex items-center gap-1 text-xs font-medium ${
                  isPositive ? 'text-chart-2' : 'text-destructive'
                }`}
              >
                {isPositive ? (
                  <ArrowUpRight className="h-3 w-3" />
                ) : (
                  <ArrowDownRight className="h-3 w-3" />
                )}
                <span>
                  {isPositive ? '+' : ''}
                  {Number(change).toFixed(1)}%
                </span>
                <span className="text-muted-foreground font-normal">vs prev</span>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}