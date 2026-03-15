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

export default function TrafficShareMovement({ data }: Props) {

  if (!data) return null

  return (
    <HeatmapCard
      title="Interest - movement in model wise share of traffic"
      subtitle="Traffic share movement"
      months={data.months}
      data={data.rows}
    />
  )
}