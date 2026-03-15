'use client'

import HeatmapCard from "../HeatmapCard"

type Props = {
  data?: {
    months: string[]
    rows: {
      model: string
      values: number[]
    }[]
  }
}

export default function PVsPerVisitor({ data }: Props) {

  if (!data) return null

  return (
    <HeatmapCard
      title="Audience Engagement - average pages viewed by each visitor"
      subtitle="PVs / UUs"
      months={data.months}
      data={data.rows}
    />
  )
}