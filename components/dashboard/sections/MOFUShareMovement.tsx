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

export default function MOFUShareMovement({ data }: Props) {

  if (!data) return null

  return (
    <HeatmapCard
      title="Consideration - share of visitors actively exploring each model"
      subtitle="MOFU share movement"
      months={data.months}
      data={data.rows}
    />
  )
}