// // // // // import { NextResponse } from "next/server"
// // // // // import { fetchHeatmap } from "@/services/ga4Service"
// // // // // import { transformHeatmap } from "@/services/ga4ResponseTransformer"

// // // // // export async function GET(req: Request) {

// // // // //   const { searchParams } = new URL(req.url)

// // // // //   /* ----------------------------- */
// // // // //   /* MODELS (FOCUS + COMPETITORS) */
// // // // //   /* ----------------------------- */

// // // // //   const models =
// // // // //     searchParams.get("models")?.split(",")
// // // // //       .map(m => m.toLowerCase().replace(/\s+/g, "_").trim())
// // // // //       .filter(Boolean) || []

// // // // //   const start =
// // // // //     searchParams.get("start") || "180daysAgo"

// // // // //   const end =
// // // // //     searchParams.get("end") || "today"

// // // // //   const propertyId =
// // // // //     process.env.GA_PROPERTY_ID!

// // // // //   const rows =
// // // // //     await fetchHeatmap(
// // // // //       propertyId,
// // // // //       start,
// // // // //       end,
// // // // //       models
// // // // //     )

// // // // //   /* ----------------------------- */
// // // // //   /* FILTER VALID MODELS */
// // // // //   /* ----------------------------- */

// // // // //   const filteredRows = rows.filter((row:any) => {

// // // // //     const model =
// // // // //       row.dimensionValues?.[1]?.value
// // // // //         ?.toLowerCase()
// // // // //         .replace(/\s+/g,"_")

// // // // //     if (!model) return false

// // // // //     /* REMOVE GA GARBAGE */
// // // // //     if (model === "(not_set)") return false
// // // // //     if (!isNaN(Number(model))) return false

// // // // //     if (!models.length) return true

// // // // //     return models.includes(model)

// // // // //   })

// // // // //   const data =
// // // // //     transformHeatmap(filteredRows, "mofu")

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

// // // //   const rows = await fetchHeatmap(propertyId, start, end, models)

// // // //   const cleanRows = rows.filter((row: any) => {
// // // //     const model = row.dimensionValues?.[1]?.value
// // // //     if (!model) return false
// // // //     if (model === "(not set)") return false
// // // //     if (!isNaN(Number(model))) return false
// // // //     return true
// // // //   })

// // // //   const data = transformHeatmap(cleanRows, "mofu")

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

// // //   const start       = searchParams.get("start")   || "6monthsAgo"
// // //   const end         = searchParams.get("end")     || "today"
// // //   const trafficType = (searchParams.get("traffic") || "organic") as "overall" | "organic" | "inorganic"

// // //   const propertyId = process.env.GA_PROPERTY_ID!

// // //   const { rows } = await fetchHeatmap(propertyId, start, end, models, trafficType)

// // //   const cleanRows = rows.filter((row: any) => {
// // //     const model = row.dimensionValues?.[1]?.value
// // //     if (!model) return false
// // //     if (model === "(not set)") return false
// // //     if (!isNaN(Number(model))) return false
// // //     return true
// // //   })

// // //   const result = transformHeatmap(cleanRows, "mofu")
// // //   return NextResponse.json(result)
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
// //   const end   = searchParams.get("end")   || "today"

// //   const trafficType =
// //     (searchParams.get("traffic") || "organic") as
// //       "overall" | "organic" | "inorganic"

// //   const propertyId = process.env.GA_PROPERTY_ID!

// //   const { rows } = await fetchHeatmap(
// //     propertyId,
// //     start,
// //     end,
// //     models,
// //     trafficType,
// //     "mofu"
// //   )


// // const cleanRows = rows.filter((row:any)=>{

// //   const model = row.dimensionValues?.[1]?.value

// //   if(!model) return false
// //   if(model === "(not set)") return false
// //   if(!isNaN(Number(model))) return false

// //   return true
// // })

// // const result = transformHeatmap(cleanRows,"mofu")

// // return NextResponse.json(result)
// // }








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
//     (searchParams.get("traffic") || "organic") as "overall" | "organic" | "inorganic"

//   const propertyId = process.env.GA_PROPERTY_ID!

//   const  rows = await fetchHeatmap(
//     propertyId,
//     start,
//     end,
//     models,
//     trafficType,
//     "mofu"
//   )

//   const cleanRows = rows.filter((row:any)=>{

//     const model = row.dimensionValues?.[1]?.value

//     if(!model) return false
//     if(model === "(not set)") return false
//     if(!isNaN(Number(model))) return false

//     return true
//   })

//   const result = transformHeatmap(cleanRows,"mofu")

//   return NextResponse.json(result)
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
  /* FETCH HEATMAP DATA            */
  /* ----------------------------- */

  const rows = await fetchHeatmap(
    propertyId,
    start,
    end,
    models,
    trafficType,
    "mofu"     // ✅ THIS WAS MISSING
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

  const result = transformHeatmap(cleanRows,"mofu",models)

  return NextResponse.json(result)

}