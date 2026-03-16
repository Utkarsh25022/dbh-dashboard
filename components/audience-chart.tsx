'use client'

import { useEffect } from "react"

import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts"

import { registerChart } from "@/lib/ppt/chartRegistry"

type AudienceData = {
  gender: { gender: string; users: number }[]
  age: { age: string; users: number }[]
}

export function AudienceChart({
  data,
  isLoading
}: {
  data?: AudienceData
  isLoading?: boolean
}) {

  /* ----------------------------- */
  /* REGISTER CHARTS FOR PPT */
  /* ----------------------------- */

  useEffect(() => {

    if (!data) return

    /* Gender chart */

    registerChart({
      title: "Audience Gender",
      labels: data.gender.map(g => g.gender),
      values: data.gender.map(g => g.users)
    })

    /* Age chart */

    registerChart({
      title: "Audience Age Distribution",
      labels: data.age.map(a => a.age),
      values: data.age.map(a => a.users)
    })

  }, [data])

  if (isLoading || !data) {
    return (
      <div className="rounded-xl border p-6">
        Loading audience insights...
      </div>
    )
  }

  const COLORS = ["#2563eb", "#ec4899"]

  return (
    <div className="rounded-xl border p-6">

      <h3 className="text-lg font-semibold mb-4">
        Audience Insights
      </h3>

      <div className="grid grid-cols-2 gap-6">

        {/* Gender Donut */}

        <div className="h-[250px]">

          <h4 className="text-sm text-gray-500 mb-2">
            Gender
          </h4>

          <ResponsiveContainer width="100%" height="100%">

            <PieChart>

              <Pie
                data={data.gender}
                dataKey="users"
                nameKey="gender"
                innerRadius={60}
                outerRadius={90}
              >

                {data.gender.map((_, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

        {/* Age Distribution */}

        <div className="h-[250px]">

          <h4 className="text-sm text-gray-500 mb-2">
            Age Distribution
          </h4>

          <ResponsiveContainer width="100%" height="100%">

            <BarChart data={data.age}>

              <XAxis dataKey="age" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="users"
                radius={[6, 6, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>
  )
}