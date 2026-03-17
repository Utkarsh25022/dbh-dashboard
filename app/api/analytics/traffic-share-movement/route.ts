// // // // // import { NextResponse } from "next/server"
// // // // // import { fetchHeatmap } from "@/services/ga4Service"
// // // // // import { transformHeatmap } from "@/services/ga4ResponseTransformer"

// // // // // export async function GET(req: Request) {

// // // // //   const { searchParams } = new URL(req.url)

// // // // //   const models =
// // // // //     searchParams.get("models")?.split(",")
// // // // //       .map(m => m.toLowerCase().replace(/\s+/g, "_").trim())
// // // // //       .filter(Boolean) || []

// // // // //   const start =
// // // // //     searchParams.get("start") || "6monthsAgo"

// // // // //   const end =
// // // // //     searchParams.get("end") || "today"

// // // // //   const propertyId = process.env.GA_PROPERTY_ID!

// // // // //   /* ----------------------------- */
// // // // //   /* FETCH GA DATA */
// // // // //   /* ----------------------------- */

// // // // //   const rows = await fetchHeatmap(
// // // // //     propertyId,
// // // // //     start,
// // // // //     end,
// // // // //     models
// // // // //   )

// // // // //   /* ----------------------------- */
// // // // //   /* FILTER VALID MODELS */
// // // // //   /* ----------------------------- */

// // // // //   const filteredRows = rows.filter((row: any) => {

// // // // //     const model =
// // // // //       row.dimensionValues?.[1]?.value
// // // // //         ?.toLowerCase()
// // // // //         .replace(/\s+/g, "_")

// // // // //     if (!model) return false

// // // // //     if (model === "(not_set)") return false
// // // // //     if (!isNaN(Number(model))) return false

// // // // //     if (!models.length) return true

// // // // //     return models.includes(model)

// // // // //   })

// // // // //   /* ----------------------------- */
// // // // //   /* TRANSFORM HEATMAP */
// // // // //   /* ----------------------------- */

// // // // //   const data =
// // // // //     transformHeatmap(filteredRows, "traffic")

// // // // //   return NextResponse.json(data)

// // // // // }












// // // // import { NextResponse } from "next/server"
// // // // import { fetchHeatmap } from "@/services/ga4Service"
// // // // import { transformHeatmap } from "@/services/ga4ResponseTransformer"

// // // // export async function GET(req: Request) {

// // // //   const { searchParams } = new URL(req.url)

// // // //   const models =
// // // //     searchParams.get("models")?.split(",")
// // // //       .map(m => m.toLowerCase().replace(/\s+/g, "_").trim())
// // // //       .filter(Boolean) || []

// // // //   const start = searchParams.get("start") || "6monthsAgo"
// // // //   const end   = searchParams.get("end")   || "today"

// // // //   const propertyId = process.env.GA_PROPERTY_ID!

// // // //   // ✅ Pass models for server-side filtering; uses clampHeatmapDateRange internally
// // // //   const rows = await fetchHeatmap(propertyId, start, end, models)

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

// // // //   // ✅ "traffic" type: totalUsers share % per model per month
// // // //   const data = transformHeatmap(filteredRows, "traffic")

// // // //   return NextResponse.json(data)
// // // // }



// // // import { NextResponse } from "next/server"
// // // import { fetchHeatmap } from "@/services/ga4Service"
// // // import { transformHeatmap } from "@/services/ga4ResponseTransformer"

// // // export async function GET(req: Request) {

// // //   const { searchParams } = new URL(req.url)

// // //   const models =
// // //     searchParams.get("models")?.split(",")
// // //       .map(m => m.toLowerCase().replace(/\s+/g, "_").trim())
// // //       .filter(Boolean) || []

// // //   const start = searchParams.get("start") || "6monthsAgo"
// // //   const end   = searchParams.get("end")   || "today"

// // //   const propertyId = process.env.GA_PROPERTY_ID!

// // //   const rows = await fetchHeatmap(propertyId, start, end, models)

// // //   // Only remove truly invalid rows — let normalizeModel merge variants
// // //   const cleanRows = rows.filter((row: any) => {
// // //     const model = row.dimensionValues?.[1]?.value
// // //     if (!model) return false
// // //     if (model === "(not set)") return false
// // //     if (!isNaN(Number(model))) return false
// // //     return true
// // //   })

// // //   const data = transformHeatmap(cleanRows, "traffic")

// // //   return NextResponse.json(data)
// // // }









// // import { NextResponse } from "next/server"
// // import { fetchHeatmap } from "@/services/ga4Service"
// // import { transformHeatmap } from "@/services/ga4ResponseTransformer"

// // export async function GET(req: Request) {
// //   const { searchParams } = new URL(req.url)

// //   const models =
// //     searchParams.get("models")?.split(",")
// //       .map(m => m.toLowerCase().replace(/\s+/g, "_").trim())
// //       .filter(Boolean) || []

// //   const start = searchParams.get("start") || "180daysAgo"
// //   const end         = searchParams.get("end")     || "today"
// //   const trafficType = (searchParams.get("traffic") || "organic") as "overall" | "organic" | "inorganic"

// //   const propertyId = process.env.GA_PROPERTY_ID!

// //   const { rows } = await fetchHeatmap(
// //   propertyId,
// //   start,
// //   end,
// //   models,
// //   trafficType
// // )

// // const cleanRows = rows.filter((row:any)=>{

// //   const model = row.dimensionValues?.[1]?.value

// //   if(!model) return false
// //   if(model === "(not set)") return false
// //   if(!isNaN(Number(model))) return false

// //   return true
// // })

// // const result = transformHeatmap(cleanRows,"traffic")

// // return NextResponse.json(result)
// // }








// // import { NextResponse } from "next/server"
// // import { fetchHeatmap } from "@/services/ga4Service"
// // import { transformHeatmap } from "@/services/ga4ResponseTransformer"

// // export async function GET(req: Request) {

// //   const { searchParams } = new URL(req.url)

// //   const models =
// //     searchParams.get("models")?.split(",")
// //       .map(m => m.toLowerCase().replace(/\s+/g, "_").trim())
// //       .filter(Boolean) || []

// //   const start = searchParams.get("start") || "180daysAgo"

// //   const end = searchParams.get("end") || "today"

// //   const trafficType =
// //     (searchParams.get("traffic") || "organic") as
// //     | "overall"
// //     | "organic"
// //     | "inorganic"

// //   const metricType =
// //     (searchParams.get("metric") || "traffic") as
// //     | "traffic"
// //     | "pv"
// //     | "mofu"

// //   const propertyId = process.env.GA_PROPERTY_ID!

// //   /* ----------------------------- */
// //   /* FETCH HEATMAP DATA            */
// //   /* ----------------------------- */

// //   const rows = await fetchHeatmap(
// //     propertyId,
// //     start,
// //     end,
// //     models,
// //     trafficType
// //   )

// //   /* SAFETY: ensure rows is array */

// //   const safeRows = rows || []

// //   /* ----------------------------- */
// //   /* CLEAN ROWS                    */
// //   /* ----------------------------- */

// //   const cleanRows = safeRows.filter((row: any) => {

// //     const model = row.dimensionValues?.[1]?.value

// //     if (!model) return false
// //     if (model === "(not set)") return false
// //     if (/^\d+$/.test(model)) return false

// //     return true

// //   })

// //   /* ----------------------------- */
// //   /* TRANSFORM FOR HEATMAP         */
// //   /* ----------------------------- */

// //   const result = transformHeatmap(cleanRows, metricType, models)

// //   return NextResponse.json(result)

// // }



// import { NextResponse } from "next/server"
// import { fetchHeatmap } from "@/services/ga4Service"
// import { transformHeatmap } from "@/services/ga4ResponseTransformer"
// import { registerHeatmap } from "@/lib/ppt/heatmapRegistry"

// export async function GET(req: Request) {
// try {


// const { searchParams } = new URL(req.url)

// /* ----------------------------- */
// /* PARSE MODELS                  */
// /* ----------------------------- */

// const models =
//   searchParams.get("models")?.split(",")
//     .map(m => m.toLowerCase().replace(/[\s-]+/g, "_").trim())
//     .filter(Boolean) || []

// /* ----------------------------- */
// /* DATE RANGE                    */
// /* ----------------------------- */

// const start = searchParams.get("start") || "180daysAgo"
// const end = searchParams.get("end") || "today"

// /* ----------------------------- */
// /* TRAFFIC TYPE                  */
// /* ----------------------------- */

// const trafficType =
//   (searchParams.get("traffic") || "overall") as
//   | "overall"
//   | "organic"
//   | "inorganic"

// /* ----------------------------- */
// /* METRIC TYPE                   */
// /* ----------------------------- */

// const metricType =
//   (searchParams.get("metric") || "traffic") as
//   | "traffic"
//   | "pv"
//   | "mofu"

// const propertyId = process.env.GA_PROPERTY_ID!

// /* ----------------------------- */
// /* FETCH HEATMAP DATA            */
// /* ----------------------------- */

// const rows = await fetchHeatmap(
//   propertyId,
//   start,
//   end,
//   models,
//   trafficType
// )

// /* ----------------------------- */
// /* SAFETY CHECK                  */
// /* ----------------------------- */

// const safeRows = Array.isArray(rows) ? rows : []

// /* ----------------------------- */
// /* CLEAN INVALID MODELS          */
// /* ----------------------------- */

// const cleanRows = safeRows.filter((row: any) => {

//   const model = row.dimensionValues?.[1]?.value
//     ?.toLowerCase()
//     ?.replace(/[\s-]+/g, "_")

//   if (!model) return false
//   if (model === "(not_set)") return false
//   if (/^\d+$/.test(model)) return false

//   if (models.length > 0 && !models.includes(model)) return false

//   return true
// })

// /* ----------------------------- */
// /* TRANSFORM FOR HEATMAP         */
// /* ----------------------------- */

// const result = transformHeatmap(
//   cleanRows,
//   metricType,
//   models
// )

// registerHeatmap({
//   title: `${metricType.toUpperCase()} Heatmap`,
//   rows: result.rows,
//   columns: result.columns,
//   values: result.values
// })

// return NextResponse.json(result)


// } catch (error) {

// console.error("Heatmap API error:", error)

// return NextResponse.json(
//   { error: "Failed to load heatmap data" },
//   { status: 500 }
// )


// }
// }
