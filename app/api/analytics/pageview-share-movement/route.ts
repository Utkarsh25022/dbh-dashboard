import { NextRequest, NextResponse } from "next/server"
import { fetchHeatmap } from "@/services/ga4Service"
import { transformHeatmap } from "@/lib/transformHeatmap"

export async function GET(req: NextRequest) {

  const { searchParams } = new URL(req.url)

  const models =
    searchParams.get("models")?.split(",")
      .map(m => m.toLowerCase().replace(/\s+/g, "_").trim())
      .filter(Boolean) || []

  const start = searchParams.get("start") || "180daysAgo"
  const end = searchParams.get("end") || "today"

  const trafficType =
    (searchParams.get("traffic") || "overall") as
    | "overall"
    | "organic"
    | "inorganic"

  /* ----------------------------- */
  /* METRIC MAPPING FIX            */
  /* ----------------------------- */

  const metricParam = searchParams.get("metric") || "traffic"

  const metric: "traffic" | "pageviews" | "pvs" | "mofu" =
    metricParam === "pv"
      ? "pageviews"
      : metricParam === "mofu"
      ? "mofu"
      : metricParam === "pvs"
      ? "pvs"
      : "traffic"

  const propertyId = process.env.GA_PROPERTY_ID!

  /* ----------------------------- */
  /* FETCH HEATMAP DATA            */
  /* ----------------------------- */

  const rows = await fetchHeatmap(
    propertyId,
    start,
    end,
    models,
    trafficType,
    metric === "mofu" ? "mofu" : undefined
  )

  const safeRows = rows || []

  /* ----------------------------- */
  /* CLEAN INVALID MODELS          */
  /* ----------------------------- */

  const cleanRows = safeRows.filter((row: any) => {

    const model = row.dimensionValues?.[1]?.value

    if (!model) return false
    if (model === "(not set)") return false
    if (!isNaN(Number(model))) return false

    return true
  })

  /* ----------------------------- */
  /* TRANSFORM HEATMAP             */
  /* ----------------------------- */
  console.log("METRIC PARAM:", metricParam)
console.log("METRIC USED:", metric)

  const result = transformHeatmap(cleanRows, "pageviews")

  return NextResponse.json(result)

}