// // // // import { NextResponse } from "next/server"
// // // // import { fetchHeatmap } from "@/services/ga4Service"
// // // // import { transformHeatmap } from "@/services/ga4ResponseTransformer"

// // // // export async function GET(req: Request) {

// // // //   const { searchParams } = new URL(req.url)

// // // //   const models =
// // // //     searchParams.get("models")?.split(",")
// // // //       .map(m => m.toLowerCase().replace(/\s+/g, "_").trim())
// // // //       .filter(Boolean) || []

// // // //   const start =
// // // //     searchParams.get("start") || "6monthsAgo"

// // // //   const end =
// // // //     searchParams.get("end") || "today"

// // // //   const propertyId = process.env.GA_PROPERTY_ID!

// // // //   /* FETCH GA DATA */

// // // //   const rows = await fetchHeatmap(
// // // //     propertyId,
// // // //     start,
// // // //     end
// // // //   )

// // // //   /* FILTER VALID MODELS */

// // // //   const filteredRows = rows.filter((row: any) => {

// // // //     const model =
// // // //       row.dimensionValues?.[1]?.value
// // // //         ?.toLowerCase()
// // // //         .replace(/\s+/g, "_")

// // // //     if (!model) return false
// // // //     if (model === "(not_set)") return false
// // // //     if (!isNaN(Number(model))) return false

// // // //     if (!models.length) return true

// // // //     return models.includes(model)

// // // //   })

// // // //   /* TRANSFORM */

// // // //   const result =
// // // //     transformHeatmap(filteredRows, "pvs")

// // // //   return NextResponse.json(result)

// // // // }







// // // import { NextResponse } from "next/server"
// // // import { fetchHeatmap } from "@/services/ga4Service"
// // // import { transformHeatmap } from "@/services/ga4ResponseTransformer"

// // // export async function GET(req: Request) {

// // //   const { searchParams } = new URL(req.url)

// // //   // Models from query string, normalized to underscore format
// // //   const models =
// // //     searchParams.get("models")?.split(",")
// // //       .map(m => m.toLowerCase().replace(/\s+/g, "_").trim())
// // //       .filter(Boolean) || []

// // //   // ✅ Use full date range — clampHeatmapDateRange inside fetchHeatmap
// // //   //    allows up to 12 months, so user's date picker selection is preserved
// // //   const start = searchParams.get("start") || "6monthsAgo"
// // //   const end   = searchParams.get("end")   || "today"

// // //   const propertyId = process.env.GA_PROPERTY_ID!

// // //   // ✅ Pass models into fetchHeatmap for server-side GA4 filtering
// // //   //    This reduces data returned and avoids client-side over-fetching
// // //   const rows = await fetchHeatmap(propertyId, start, end, models)

// // //   // Secondary client-side filter to catch any edge cases
// // //   const filteredRows = rows.filter((row: any) => {

// // //     const model =
// // //       row.dimensionValues?.[1]?.value
// // //         ?.toLowerCase()
// // //         .replace(/\s+/g, "_")

// // //     if (!model) return false
// // //     if (model === "(not_set)") return false
// // //     if (!isNaN(Number(model))) return false
// // //     if (!models.length) return true

// // //     return models.includes(model)
// // //   })

// // //   // ✅ "pvs" type: computes screenPageViews / totalUsers per model per month
// // //   const result = transformHeatmap(filteredRows, "pvs")

// // //   return NextResponse.json(result)
// // // }








// // import { NextResponse } from "next/server"
// // import { fetchHeatmap } from "@/services/ga4Service"
// // import { transformHeatmap } from "@/services/ga4ResponseTransformer"

// // export async function GET(req: Request) {

// //   const { searchParams } = new URL(req.url)

// //   // Models from query string, normalized to underscore format
// //   const models =
// //     searchParams.get("models")?.split(",")
// //       .map(m => m.toLowerCase().replace(/\s+/g, "_").trim())
// //       .filter(Boolean) || []

// //   const start = searchParams.get("start") || "6monthsAgo"
// //   const end   = searchParams.get("end")   || "today"

// //   const propertyId = process.env.GA_PROPERTY_ID!

// //   // Pass models for server-side GA4 regex filtering
// //   // The regex (e.g. .*tata.*punch.*) intentionally matches ALL variants:
// //   // "tata punch", "tata punch ev", "tata punch cng" etc.
// //   const rows = await fetchHeatmap(propertyId, start, end, models)

// //   // ✅ NO client-side model filter here — it was blocking variant names like
// //   // "tata punch ev" (normalized to tata_punch_ev ≠ tata_punch) even though
// //   // normalizeModel() in transformHeatmap correctly merges them to tata_punch.
// //   // Filtering here caused partial data → inflated PV/UU ratios.

// //   // Only filter out truly invalid rows (empty, not_set, numeric)
// //   const cleanRows = rows.filter((row: any) => {
// //     const model = row.dimensionValues?.[1]?.value
// //     if (!model) return false
// //     if (model === "(not set)") return false
// //     if (!isNaN(Number(model))) return false
// //     return true
// //   })

// //   // transformHeatmap normalizeModel() merges all variants:
// //   // "tata punch ev" → "tata_punch", "tata punch cng" → "tata_punch_cng"
// //   const result = transformHeatmap(cleanRows, "pvs")

// //   return NextResponse.json(result)
// // }









// import { NextResponse } from "next/server"
// import { fetchHeatmap } from "@/services/ga4Service"
// import { transformHeatmap } from "@/services/ga4ResponseTransformer"

// export async function GET(req: Request) {
//   const { searchParams } = new URL(req.url)

//   const models =
//     searchParams.get("models")?.split(",")
//       .map(m => m.toLowerCase().replace(/\s+/g, "_").trim())
//       .filter(Boolean) || []

//   const start = searchParams.get("start") || "180daysAgo"
//   const end         = searchParams.get("end")     || "today"
//   const trafficType = (searchParams.get("traffic") || "organic") as "overall" | "organic" | "inorganic"

//   const propertyId = process.env.GA_PROPERTY_ID!

//   const { rows } = await fetchHeatmap(
//   propertyId,
//   start,
//   end,
//   models,
//   trafficType
// )

// const cleanRows = rows.filter((row:any)=>{

//   const model = row.dimensionValues?.[1]?.value

//   if(!model) return false
//   if(model === "(not set)") return false
//   if(!isNaN(Number(model))) return false

//   return true
// })

// const result = transformHeatmap(cleanRows,"pv")

// return NextResponse.json(result)
// }
import { NextRequest, NextResponse } from "next/server"
import { fetchHeatmap } from "@/services/ga4Service"
import { transformHeatmap } from "@/lib/transformHeatmap"

export async function GET(req: NextRequest) {

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
  /* FETCH HEATMAP ROWS            */
  /* ----------------------------- */

  const rows = await fetchHeatmap(
    propertyId,
    start,
    end,
    models,
    trafficType,
    "pv"
  )

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
  /* TRANSFORM HEATMAP             */
  /* ----------------------------- */

  const result = transformHeatmap(cleanRows,"pv",models)

  return NextResponse.json(result)

}