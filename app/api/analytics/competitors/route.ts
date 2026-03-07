import { NextRequest, NextResponse } from "next/server"
import { fetchTOFU } from "@/services/ga4Service"

function normalize(name: string) {
return name
.replace(/\d{4}-\d{4}/g, "")
.trim()
.toLowerCase()
}

export async function GET(req: NextRequest) {

try {

const propertyId = process.env.GA_PROPERTY_ID!

const { searchParams } = new URL(req.url)

const start = searchParams.get("start") || "30daysAgo"
const end = searchParams.get("end") || "today"
const models = searchParams.get("models") || ""

const modelList = models.split(",").filter(Boolean)

/* normalize selected models */

const selectedModels =
  modelList.map(m => normalize(m))

const rows = await fetchTOFU(
  propertyId,
  start,
  end,
  modelList,
  "TOFU"
)

const totals: Record<string, number> = {}

for (const row of rows) {

  const rawModel = row.dimensionValues?.[0]?.value
  const users = Number(row.metricValues?.[0]?.value || 0)

  if (!rawModel) continue

  const model = normalize(rawModel)

  /* ----------------------------- */
  /* FILTER ONLY SELECTED MODELS */
  /* ----------------------------- */

  if (!selectedModels.includes(model)) continue

  totals[model] = (totals[model] || 0) + users
}

/* ----------------------------- */
/* SORT BY TRAFFIC */
/* ----------------------------- */

const sorted =
  Object.entries(totals)
    .sort((a, b) => b[1] - a[1])

/* ----------------------------- */
/* DO NOT FORCE TOP 10 */
/* RETURN ONLY SELECTED MODELS */
/* ----------------------------- */

const data = sorted.map(([model, traffic], index) => ({

  model,

  trafficErosionRank: index + 1,

  reverseTrafficErosionRank:
    sorted.length - index,

  performance:
    index < 3
      ? "high"
      : index < 6
      ? "medium"
      : "low",

  traffic
}))

return NextResponse.json({
  success: true,
  data
})

} catch (error) {

console.error("Competitor API error", error)

return NextResponse.json({
  success: false,
  data: []
})

}

}