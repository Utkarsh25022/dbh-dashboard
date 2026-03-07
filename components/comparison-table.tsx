'use client'

import { useState, useEffect } from 'react'
import { ArrowUpDown } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import type { CompetitorRow } from '@/lib/types'

interface ComparisonTableProps {
  data: CompetitorRow[] | undefined
  isLoading: boolean
}

type SortKey = 'model' | 'trafficErosionRank' | 'reverseTrafficErosionRank' | 'performance'

const performanceOrder: Record<string, number> = {
  high: 3,
  medium: 2,
  low: 1,
}

/* ----------------------------- */
/* SAFE FORMATTER */
/* ----------------------------- */

function formatPerformance(value?: string) {
  if (!value) return 'N/A'
  return value.charAt(0).toUpperCase() + value.slice(1)
}

export function ComparisonTable({ data, isLoading }: ComparisonTableProps) {

  const [sortKey, setSortKey] = useState<SortKey>('trafficErosionRank')
  const [sortAsc, setSortAsc] = useState(true)

  /* ----------------------------- */
  /* DEBUG: incoming data */
  /* ----------------------------- */

  useEffect(() => {
    console.log('🔎 Competitor Comparison DATA:', data)
  }, [data])

  if (isLoading) {
    console.log('⏳ Competitor table loading...')
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-4 w-64" />
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!data?.length) {
    console.warn('⚠️ Competitor table received EMPTY data:', data)
    return (
      <Card>
        <CardHeader>
          <CardTitle>Competitor Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-40 items-center justify-center text-muted-foreground">
            No competitor data available
          </div>
        </CardContent>
      </Card>
    )
  }

  const handleSort = (key: SortKey) => {
    console.log('🔁 Sorting by:', key)

    if (sortKey === key) {
      setSortAsc(!sortAsc)
    } else {
      setSortKey(key)
      setSortAsc(true)
    }
  }

  const sorted = [...data].sort((a, b) => {

    let cmp = 0

    if (sortKey === 'model') {
      cmp = a.model.localeCompare(b.model)
    }

    else if (sortKey === 'performance') {

      const perfA = performanceOrder[a.performance ?? ''] ?? 0
      const perfB = performanceOrder[b.performance ?? ''] ?? 0

      cmp = perfA - perfB
    }

    else {

      const valA = a[sortKey] ?? 0
      const valB = b[sortKey] ?? 0

      cmp = valA - valB
    }

    return sortAsc ? cmp : -cmp
  })

  /* ----------------------------- */
  /* DEBUG: sorted data */
  /* ----------------------------- */

  console.log('📊 Sorted competitor rows:', sorted)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Competitor Comparison</CardTitle>
        <CardDescription>
          Traffic erosion rankings and performance indicators
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Table>

          <TableHeader>
            <TableRow>

              {[
                { key: 'model' as const, label: 'Model Name' },
                { key: 'trafficErosionRank' as const, label: 'Traffic Erosion Rank' },
                { key: 'reverseTrafficErosionRank' as const, label: 'Reverse Erosion Rank' },
                { key: 'performance' as const, label: 'Performance' },
              ].map((col) => (
                <TableHead key={col.key}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="-ml-3 h-8 gap-1 text-xs font-medium"
                    onClick={() => handleSort(col.key)}
                  >
                    {col.label}
                    <ArrowUpDown className="h-3 w-3" />
                  </Button>
                </TableHead>
              ))}

            </TableRow>
          </TableHeader>

          <TableBody>

            {sorted.map((row) => {

              console.log('🧾 Rendering row:', row)

              return (
                <TableRow key={row.model} className="group">

                  <TableCell className="font-medium">
                    {row.model}
                  </TableCell>

                  <TableCell className="font-mono text-sm">
                    #{row.trafficErosionRank ?? '-'}
                  </TableCell>

                  <TableCell className="font-mono text-sm">
                    #{row.reverseTrafficErosionRank ?? '-'}
                  </TableCell>

                  <TableCell>

                    <Badge
                      variant={
                        row.performance === 'high'
                          ? 'default'
                          : row.performance === 'medium'
                            ? 'secondary'
                            : 'outline'
                      }

                      className={
                        row.performance === 'high'
                          ? 'bg-[#10b981] text-[#fff]'
                          : row.performance === 'medium'
                            ? 'bg-[#f59e0b] text-[#fff]'
                            : 'border-muted text-muted-foreground'
                      }
                    >

                      {formatPerformance(row.performance)}

                    </Badge>

                  </TableCell>

                </TableRow>
              )
            })}

          </TableBody>

        </Table>
      </CardContent>
    </Card>
  )
}