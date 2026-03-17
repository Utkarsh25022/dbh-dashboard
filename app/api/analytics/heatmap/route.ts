import { NextRequest, NextResponse } from "next/server"
import { fetchHeatmap } from "@/services/ga4Service"
import { transformHeatmap } from "@/lib/transformHeatmap"

export async function GET(req: NextRequest) {

  try {

    const { searchParams } = new URL(req.url)

    const models =
      searchParams.get("models")?.split(",")
        .map(m => m.toLowerCase().replace(/\s+/g,"_").trim())
        .filter(Boolean) || []

    const start = searchParams.get("start") || "180daysAgo"
    const end = searchParams.get("end") || "today"

    const trafficType =
      (searchParams.get("traffic") || "overall") as
      | "overall"
      | "organic"
      | "inorganic"

    const propertyId = process.env.GA_PROPERTY_ID!

    /* ----------------------------- */
    /* SINGLE GA4 FETCH              */
    /* ----------------------------- */

    const [rows, mofuRows] = await Promise.all([
  fetchHeatmap(
    propertyId,
    start,
    end,
    models,
    trafficType
  ),
  fetchHeatmap(
    propertyId,
    start,
    end,
    models,
    trafficType,
    "mofu" // important
  )
])

    const safeRows = rows || []

    /* ----------------------------- */
    /* CLEAN INVALID MODELS          */
    /* ----------------------------- */

    const cleanRows = safeRows.filter((row:any)=>{

      const model = row.dimensionValues?.[1]?.value

      if(!model) return false
      if(model === "(not set)") return false
      if(!isNaN(Number(model))) return false

      return true

    })

    /* ----------------------------- */
    /* TRANSFORM INTO 4 METRICS      */
    /* ----------------------------- */

const traffic = transformHeatmap(cleanRows,"traffic",models)

const pageviews = transformHeatmap(cleanRows,"pageviews",models)

const pvs = transformHeatmap(cleanRows,"pv",models)

const mofu = transformHeatmap(mofuRows,"mofu",models)

    /* ----------------------------- */
    /* RETURN ALL                    */
    /* ----------------------------- */

    return NextResponse.json({
      traffic,
      pageviews,
      pvs,
      mofu
    })

  } catch (error) {

    console.error("Heatmap API error:", error)

    return NextResponse.json({
      traffic: { months: [], rows: [] },
      pageviews: { months: [], rows: [] },
      pvs: { months: [], rows: [] },
      mofu: { months: [], rows: [] }
    })
  }
}