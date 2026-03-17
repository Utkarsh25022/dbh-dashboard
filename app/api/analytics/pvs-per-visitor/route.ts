// import { NextRequest, NextResponse } from "next/server"
// import { fetchHeatmap } from "@/services/ga4Service"
// import { transformHeatmap } from "@/lib/transformHeatmap"

// export async function GET(req: NextRequest) {

//   const { searchParams } = new URL(req.url)

//   const models =
//     searchParams.get("models")?.split(",")
//       .map(m => m.toLowerCase().replace(/\s+/g,"_").trim())
//       .filter(Boolean) || []

//   const start = searchParams.get("start") || "180daysAgo"

//   const end = searchParams.get("end") || "today"

//   const trafficType =
//     (searchParams.get("traffic") || "overall") as
//     | "overall"
//     | "organic"
//     | "inorganic"

//   const propertyId = process.env.GA_PROPERTY_ID!

//   /* ----------------------------- */
//   /* FETCH HEATMAP ROWS            */
//   /* ----------------------------- */

//   const rows = await fetchHeatmap(
//     propertyId,
//     start,
//     end,
//     models,
//     trafficType,
//     "pv"
//   )

//   const safeRows = rows || []

//   /* ----------------------------- */
//   /* CLEAN INVALID MODELS          */
//   /* ----------------------------- */

//   const cleanRows = safeRows.filter((row:any)=>{

//     const model = row.dimensionValues?.[1]?.value

//     if(!model) return false
//     if(model === "(not set)") return false
//     if(!isNaN(Number(model))) return false

//     return true
//   })

//   /* ----------------------------- */
//   /* TRANSFORM HEATMAP             */
//   /* ----------------------------- */

//   const result = transformHeatmap(cleanRows,"pv",models)

//   return NextResponse.json(result)

// }