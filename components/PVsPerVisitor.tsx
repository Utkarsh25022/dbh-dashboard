'use client'

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

type HeatmapData = {
  months: string[]
  rows: {
    model: string
    values: number[]
  }[]
}

export default function PVsPerVisitor({
  data
}: {
  data?: HeatmapData
}) {

  if (!data || !data.rows?.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>PVs / UUs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[220px] flex items-center justify-center text-muted-foreground">
            No engagement data available
          </div>
        </CardContent>
      </Card>
    )
  }

  // ✅ Color logic: green = higher engagement (>= 2.0), yellow = lower
  function getCellColor(value: number) {
    if (!value || value === 0) return "bg-gray-100 text-gray-400"
    // For PV/UU, higher is better (more pages per visitor = more engaged)
    return value >= 2.0 ? "bg-green-500 text-white" : "bg-yellow-400 text-black"
  }

  return (

    <Card>

      <CardHeader>

        <CardTitle>
          Audience Engagement - average pages viewed by each visitor
        </CardTitle>

        <p className="text-xs text-muted-foreground">
          PVs / UUs
        </p>

      </CardHeader>

      <CardContent>

        <div className="overflow-x-auto">

          <table className="w-full text-sm">

            <thead>

              <tr className="border-b">

                <th className="text-left py-2 font-medium">Model</th>

                {data.months.map((month) => (
                  <th
                    key={month}
                    className="text-right py-2 font-medium"
                  >
                    {month}
                  </th>
                ))}

              </tr>

            </thead>

            <tbody>

              {data.rows.map((row) => (

                <tr key={row.model} className="border-b">

                  <td className="py-2 capitalize">
                    {row.model.replace(/_/g, " ")}
                  </td>

                  {row.values.map((value, i) => (

                    <td key={i} className="text-right py-1">

                      <span className={`inline-block px-3 py-1 rounded font-medium ${getCellColor(value)}`}>
                        {/* ✅ SHOW RAW RATIO — never multiply by 100 or append % */}
                        {Number(value).toFixed(1)}
                      </span>

                    </td>

                  ))}

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </CardContent>

    </Card>

  )
}