// // // // import { NextRequest, NextResponse } from "next/server"
// // // // import { fetchTOFU } from "@/services/ga4Service"

// // // // function normalize(name: string) {
// // // //   return name
// // // //     .replace(/\d{4}-\d{4}/g, "")
// // // //     .trim()
// // // //     .toLowerCase()
// // // // }

// // // // export async function GET(req: NextRequest) {

// // // //   try {

// // // //     const propertyId = process.env.GA_PROPERTY_ID!

// // // //     const { searchParams } = new URL(req.url)

// // // //     const start = searchParams.get("start") || "30daysAgo"
// // // //     const end = searchParams.get("end") || "today"

// // // //     const models =
// // // //       searchParams.get("models")?.split(",").map(m => m.toLowerCase()) || []

// // // //     /* ---------------------------------- */
// // // //     /* IMPORTANT: Fetch ALL TOFU traffic  */
// // // //     /* Do NOT filter by model in GA4      */
// // // //     /* ---------------------------------- */

// // // //     const rows = await fetchTOFU(
// // // //       propertyId,
// // // //       start,
// // // //       end,
// // // //       [],
// // // //       "TRAFFIC_EROSION"
// // // //     )

// // // //     const matrix: Record<string, Record<string, number>> = {}

// // // //     rows.forEach((row: any) => {

// // // //       const queryModel = normalize(
// // // //         row.dimensionValues?.[0]?.value || ""
// // // //       )

// // // //       const landingModel = normalize(
// // // //         row.dimensionValues?.[1]?.value || ""
// // // //       )

// // // //       const users = Number(
// // // //         row.metricValues?.[0]?.value || 0
// // // //       )

// // // //       if (!queryModel || !landingModel) return

// // // //       /* ---------------------------------- */
// // // //       /* Filter only selected models        */
// // // //       /* ---------------------------------- */

// // // //       if (models.length) {

// // // //         const isQueryModel = models.some(m =>
// // // //           queryModel.includes(m)
// // // //         )

// // // //         const isLandingModel = models.some(m =>
// // // //           landingModel.includes(m)
// // // //         )

// // // //         if (!isQueryModel && !isLandingModel) return
// // // //       }

// // // //       if (!matrix[queryModel]) {
// // // //         matrix[queryModel] = {}
// // // //       }

// // // //       matrix[queryModel][landingModel] =
// // // //         (matrix[queryModel][landingModel] || 0) + users

// // // //     })

// // // //     const erosion: any[] = []

// // // //     Object.keys(matrix).forEach((from) => {

// // // //       Object.keys(matrix[from]).forEach((to) => {

// // // //         if (from === to) return

// // // //         erosion.push({
// // // //           from,
// // // //           to,
// // // //           erosion: matrix[from][to]
// // // //         })

// // // //       })

// // // //     })

// // // //     return NextResponse.json({
// // // //       success: true,
// // // //       data: erosion
// // // //     })

// // // //   } catch (error) {

// // // //     console.error("Traffic erosion error", error)

// // // //     return NextResponse.json({
// // // //       success: false,
// // // //       data: []
// // // //     })

// // // //   }

// // // // }






// // // import { NextRequest, NextResponse } from "next/server"
// // // import { fetchTOFU } from "@/services/ga4Service"

// // // /* -------------------------------- */
// // // /* NORMALIZE MODEL NAME */
// // // /* -------------------------------- */

// // // function normalize(name: string) {

// // // if (!name) return ""

// // // const invalid = [
// // // "(not set)",
// // // "(not provided)",
// // // "/",
// // // "other"
// // // ]

// // // if (invalid.includes(name.toLowerCase())) return ""

// // // const parts = name.split("/").filter(Boolean)

// // // const last = parts[parts.length - 1] || ""

// // // return last
// // // .replace(/\d{4}-\d{4}/g, "")
// // // .replace(/[-_]/g, " ")
// // // .trim()
// // // .toLowerCase()
// // // }

// // // /* -------------------------------- */
// // // /* API ROUTE */
// // // /* -------------------------------- */

// // // export async function GET(req: NextRequest) {

// // // try {

// // // const propertyId = process.env.GA_PROPERTY_ID!

// // // const { searchParams } = new URL(req.url)

// // // const start = searchParams.get("start") || "30daysAgo"
// // // const end = searchParams.get("end") || "today"

// // // const models =
// // //   searchParams.get("models")
// // //     ?.split(",")
// // //     .map(m => m.toLowerCase()) || []


// // // /* ---------------------------------- */
// // // /* Fetch GA4 traffic (no model filter) */
// // // /* ---------------------------------- */

// // // const rows = await fetchTOFU(
// // //   propertyId,
// // //   start,
// // //   end,
// // //   undefined,
// // //   "TRAFFIC_EROSION"
// // // )


// // // const matrix: Record<string, Record<string, number>> = {}


// // // rows.forEach((row: any) => {

// // //   const queryModel = normalize(
// // //     row.dimensionValues?.[0]?.value || ""
// // //   )

// // //   const landingModel = normalize(
// // //     row.dimensionValues?.[1]?.value || ""
// // //   )

// // //   const users = Number(
// // //     row.metricValues?.[0]?.value || 0
// // //   )


// // //   /* Skip invalid values */

// // //   if (!queryModel || !landingModel) return

// // //   if (queryModel === landingModel) return


// // //   /* ---------------------------------- */
// // //   /* Filter only selected models        */
// // //   /* ---------------------------------- */

// // //   if (models.length) {

// // //     const isQueryModel = models.some(m =>
// // //       queryModel.includes(m)
// // //     )

// // //     const isLandingModel = models.some(m =>
// // //       landingModel.includes(m)
// // //     )

// // //     if (!isQueryModel && !isLandingModel) return
// // //   }


// // //   if (!matrix[queryModel]) {
// // //     matrix[queryModel] = {}
// // //   }


// // //   matrix[queryModel][landingModel] =
// // //     (matrix[queryModel][landingModel] || 0) + users

// // // })


// // // /* ---------------------------------- */
// // // /* Convert matrix → erosion list      */
// // // /* ---------------------------------- */

// // // const erosion: any[] = []


// // // Object.keys(matrix).forEach((from) => {

// // //   Object.keys(matrix[from]).forEach((to) => {

// // //     erosion.push({
// // //       from,
// // //       to,
// // //       erosion: matrix[from][to]
// // //     })

// // //   })

// // // })


// // // /* ---------------------------------- */
// // // /* Sort by largest erosion            */
// // // /* ---------------------------------- */

// // // erosion.sort((a, b) => b.erosion - a.erosion)


// // // return NextResponse.json({
// // //   success: true,
// // //   data: erosion.slice(0, 150)
// // // })


// // // } catch (error) {

// // // console.error("Traffic erosion error", error)

// // // return NextResponse.json({
// // //   success: false,
// // //   data: []
// // // })


// // // }

// // // }








// // import { NextRequest, NextResponse } from "next/server"
// // import { fetchTOFU } from "@/services/ga4Service"

// // /* -------------------------------- */
// // /* EXTRACT MODEL FROM GA URL */
// // /* Example:
// // /cars/hyundai-creta → creta
// // /cars/tata/punch → punch
// // ---------------------------------- */

// // function extractModel(path: string) {

// //   if (!path) return ""

// //   const invalid = [
// //     "(not set)",
// //     "(not provided)",
// //     "/",
// //     "other"
// //   ]

// //   if (invalid.includes(path.toLowerCase())) return ""

// //   const parts = path
// //     .toLowerCase()
// //     .split("/")
// //     .filter(Boolean)

// //   if (!parts.length) return ""

// //   /* pick last meaningful segment */

// //   let model = parts[parts.length - 1]

// //   /* remove file extensions */

// //   model = model.replace(".htm", "")
// //   model = model.replace(".html", "")

// //   /* remove non-model pages */

// //   const badPages = [
// //     "pictures",
// //     "price-in-new-delhi",
// //     "car-loan-emi-calculator",
// //     "upcomingcars",
// //     "newcars"
// //   ]

// //   if (badPages.some(b => model.includes(b))) return ""

// //   return model.replace(/[-_]/g, " ").trim()
// // }

// // /* -------------------------------- */
// // /* API ROUTE */
// // /* -------------------------------- */

// // export async function GET(req: NextRequest) {

// // try {

// // const propertyId = process.env.GA_PROPERTY_ID!

// // const { searchParams } = new URL(req.url)

// // const start = searchParams.get("start") || "30daysAgo"
// // const end = searchParams.get("end") || "today"

// // const models =
// //   searchParams.get("models")
// //     ?.split(",")
// //     .map(m => m.toLowerCase()) || []

// // /* ---------------------------------- */
// // /* Fetch GA4 rows                     */
// // /* ---------------------------------- */

// // const rows = await fetchTOFU(
// //   propertyId,
// //   start,
// //   end,
// //   undefined,
// //   "TRAFFIC_EROSION"
// // )

// // console.log("GA4 ROW COUNT:", rows?.length)

// // const matrix: Record<string, Record<string, number>> = {}

// // rows.forEach((row: any) => {

// //   const rawQueryPath = row.dimensionValues?.[0]?.value || ""
// //   const rawLandingPath = row.dimensionValues?.[1]?.value || ""

// //   const queryModel = extractModel(rawQueryPath)
// //   const landingModel = extractModel(rawLandingPath)

// //   const users = Number(
// //     row.metricValues?.[0]?.value || 0
// //   )

// //   /* ---------------------------------- */
// //   /* DEBUG: Print GA rows               */
// //   /* ---------------------------------- */

// //   console.log("RAW PATHS:", rawQueryPath, "→", rawLandingPath)
// //   console.log("EXTRACTED:", queryModel, "→", landingModel)

// //   /* Skip non-model traffic */

// //   if (!queryModel || !landingModel) return

// //   if (queryModel === landingModel) return

// //   /* ---------------------------------- */
// //   /* Filter by selected models          */
// //   /* ---------------------------------- */

// //   if (models.length) {

// //     const isQueryModel = models.some(m =>
// //       queryModel.includes(m)
// //     )

// //     const isLandingModel = models.some(m =>
// //       landingModel.includes(m)
// //     )

// //     if (!isQueryModel && !isLandingModel) return
// //   }

// //   if (!matrix[queryModel]) {
// //     matrix[queryModel] = {}
// //   }

// //   matrix[queryModel][landingModel] =
// //     (matrix[queryModel][landingModel] || 0) + users

// // })

// // /* ---------------------------------- */
// // /* Convert matrix → erosion list      */
// // /* ---------------------------------- */

// // const erosion: any[] = []

// // Object.keys(matrix).forEach((from) => {

// //   Object.keys(matrix[from]).forEach((to) => {

// //     erosion.push({
// //       from,
// //       to,
// //       erosion: matrix[from][to]
// //     })

// //   })

// // })

// // erosion.sort((a, b) => b.erosion - a.erosion)

// // console.log("EROSION PAIRS:", erosion.slice(0,10))

// // return NextResponse.json({
// //   success: true,
// //   data: erosion
// // })


// // } catch (error) {


// // console.error("Traffic erosion error", error)

// // return NextResponse.json({
// //   success: false,
// //   data: []
// // })


// // }

// // }










// // import { NextRequest, NextResponse } from "next/server"
// // import { fetchTOFU } from "@/services/ga4Service"

// // /* -------------------------------- */
// // /* EXTRACT MODEL FROM GA URL        */
// // /* -------------------------------- */

// // function extractModel(path: string) {

// // if (!path) return ""

// // const invalid = [
// // "(not set)",
// // "(not provided)",
// // "/",
// // "other"
// // ]

// // if (invalid.includes(path.toLowerCase())) return ""

// // const parts = path
// // .toLowerCase()
// // .split("/")
// // .filter(Boolean)

// // if (!parts.length) return ""

// // let model = parts[parts.length - 1]

// // model = model.replace(".htm", "")
// // model = model.replace(".html", "")

// // const badPages = [
// // "pictures",
// // "price-in-new-delhi",
// // "car-loan-emi-calculator",
// // "upcomingcars",
// // "newcars"
// // ]

// // if (badPages.some(b => model.includes(b))) return ""

// // return model.replace(/[-_]/g, " ").trim()
// // }

// // /* -------------------------------- */
// // /* API ROUTE                        */
// // /* -------------------------------- */

// // export async function GET(req: NextRequest) {

// // try {

// // const propertyId = process.env.GA_PROPERTY_ID!

// // const { searchParams } = new URL(req.url)

// // const start = searchParams.get("start") || "30daysAgo"
// // const end = searchParams.get("end") || "today"

// // const models =
// //   searchParams.get("models")
// //     ?.split(",")
// //     .map(m => m.toLowerCase()) || []


// // /* ---------------------------------- */
// // /* Fetch GA4 rows                     */
// // /* ---------------------------------- */

// // const rows = await fetchTOFU(
// //   propertyId,
// //   start,
// //   end,
// //   undefined,
// //   "TRAFFIC_EROSION"
// // )

// // console.log("GA4 ROW COUNT:", rows?.length)

// // const matrix: Record<string, Record<string, number>> = {}

// // rows.forEach((row: any) => {

// //   const rawQueryPath = row.dimensionValues?.[0]?.value || ""
// //   const rawLandingPath = row.dimensionValues?.[1]?.value || ""

// //   const queryModel = extractModel(rawQueryPath)
// //   const landingModel = extractModel(rawLandingPath)

// //   const users = Number(
// //     row.metricValues?.[0]?.value || 0
// //   )

// //   console.log("RAW PATHS:", rawQueryPath, "→", rawLandingPath)
// //   console.log("EXTRACTED:", queryModel, "→", landingModel)

// //   /* Landing page must exist */
// //   if (!landingModel) return

// //   /* allow entry pages */
// //   const from = queryModel || "entry"
// //   const to = landingModel

// //   if (from === to) return

// //   /* ---------------------------------- */
// //   /* Filter by selected models          */
// //   /* ---------------------------------- */

// //   if (models.length) {

// //     const isQueryModel = models.some(m =>
// //       from.includes(m)
// //     )

// //     const isLandingModel = models.some(m =>
// //       to.includes(m)
// //     )

// //     if (!isQueryModel && !isLandingModel) return
// //   }

// //   if (!matrix[from]) {
// //     matrix[from] = {}
// //   }

// //   matrix[from][to] =
// //     (matrix[from][to] || 0) + users

// // })


// // /* ---------------------------------- */
// // /* Convert matrix → erosion list      */
// // /* ---------------------------------- */

// // const erosion: any[] = []

// // Object.keys(matrix).forEach((from) => {

// //   Object.keys(matrix[from]).forEach((to) => {

// //     erosion.push({
// //       from,
// //       to,
// //       erosion: matrix[from][to]
// //     })

// //   })

// // })

// // erosion.sort((a, b) => b.erosion - a.erosion)

// // console.log("EROSION PAIRS:", erosion.slice(0, 10))

// // return NextResponse.json({
// //   success: true,
// //   data: erosion
// // })

// // } catch (error) {

// // console.error("Traffic erosion error", error)

// // return NextResponse.json({
// //   success: false,
// //   data: []
// // })

// // }

// // }







// // import { NextRequest, NextResponse } from "next/server"
// // import { fetchTOFU } from "@/services/ga4Service"

// // /* -------------------------------- */
// // /* EXTRACT MODEL FROM GA URL        */
// // /* -------------------------------- */

// // function extractModel(path: string) {

// // if (!path) return ""

// // const invalid = [
// // "(not set)",
// // "(not provided)",
// // "/",
// // "other"
// // ]

// // if (invalid.includes(path.toLowerCase())) return ""

// // const parts = path
// // .toLowerCase()
// // .split("/")
// // .filter(Boolean)

// // if (!parts.length) return ""

// // let model = parts[parts.length - 1]

// // model = model.replace(".htm", "")
// // model = model.replace(".html", "")

// // const badPages = [
// // "pictures",
// // "price-in-new-delhi",
// // "car-loan-emi-calculator",
// // "upcomingcars",
// // "newcars"
// // ]

// // if (badPages.some(b => model.includes(b))) return ""

// // return model.replace(/[-_]/g, " ").trim()
// // }

// // /* -------------------------------- */
// // /* API ROUTE                        */
// // /* -------------------------------- */

// // export async function GET(req: NextRequest) {

// // try {


// // const propertyId = process.env.GA_PROPERTY_ID!

// // const { searchParams } = new URL(req.url)

// // const start = searchParams.get("start") || "30daysAgo"
// // const end = searchParams.get("end") || "today"

// // const models =
// //   searchParams.get("models")
// //     ?.split(",")
// //     .map(m => m.toLowerCase()) || []

// // /* ---------------------------------- */
// // /* Fetch GA4 rows                     */
// // /* ---------------------------------- */

// // const rows = await fetchTOFU(
// //   propertyId,
// //   start,
// //   end,
// //   undefined,
// //   "TRAFFIC_EROSION"
// // )

// // console.log("GA4 ROW COUNT:", rows?.length)

// // const matrix: Record<string, Record<string, number>> = {}

// // rows.forEach((row: any) => {

// //   const rawQueryPath = row.dimensionValues?.[0]?.value || ""
// //   const rawLandingPath = row.dimensionValues?.[1]?.value || ""

// //   const queryModel = extractModel(rawQueryPath)
// //   const landingModel = extractModel(rawLandingPath)

// //   const users = Number(
// //     row.metricValues?.[0]?.value || 0
// //   )

// //   console.log("RAW PATHS:", rawQueryPath, "→", rawLandingPath)
// //   console.log("EXTRACTED:", queryModel, "→", landingModel)

// //   if (!landingModel) return

// //   const from = queryModel || "entry"
// //   const to = landingModel

// //   if (from === to) return

// //   /* ---------------------------------- */
// //   /* Filter by selected models          */
// //   /* ---------------------------------- */

// //   if (models.length) {

// //     const isQueryModel = models.some(m =>
// //       from.includes(m)
// //     )

// //     const isLandingModel = models.some(m =>
// //       to.includes(m)
// //     )

// //     if (!isQueryModel && !isLandingModel) return
// //   }

// //   if (!matrix[from]) {
// //     matrix[from] = {}
// //   }

// //   matrix[from][to] =
// //     (matrix[from][to] || 0) + users

// // })

// // /* ---------------------------------- */
// // /* Convert matrix → erosion list      */
// // /* ---------------------------------- */

// // const erosion: any[] = []

// // Object.keys(matrix).forEach((from) => {

// //   /* remove entry traffic from erosion chart */

// //   if (from === "entry") return

// //   Object.keys(matrix[from]).forEach((to) => {

// //     erosion.push({
// //       from,
// //       to,
// //       erosion: matrix[from][to]
// //     })

// //   })

// // })

// // erosion.sort((a, b) => b.erosion - a.erosion)

// // console.log("EROSION PAIRS:", erosion.slice(0, 10))

// // return NextResponse.json({
// //   success: true,
// //   data: erosion
// // })

// // } catch (error) {


// // console.error("Traffic erosion error", error)

// // return NextResponse.json({
// //   success: false,
// //   data: []
// // })


// // }

// // }









// import { NextRequest, NextResponse } from "next/server"
// import { fetchTOFU } from "@/services/ga4Service"

// /* -------------------------------- */
// /* Extract model name from GA path  */
// /* -------------------------------- */

// function extractModel(path: string) {

// if (!path) return ""

// const invalid = [
// "(not set)",
// "(not provided)",
// "/",
// "other"
// ]

// if (invalid.includes(path.toLowerCase())) return ""

// const parts = path
// .toLowerCase()
// .split("/")
// .filter(Boolean)

// if (!parts.length) return ""

// let model = parts[parts.length - 1]

// model = model.replace(".htm", "")
// model = model.replace(".html", "")

// const badPages = [
// "pictures",
// "price-in-new-delhi",
// "car-loan-emi-calculator",
// "upcomingcars",
// "newcars"
// ]

// if (badPages.some(b => model.includes(b))) return ""

// return model.replace(/[-_]/g, " ").trim()
// }

// /* -------------------------------- */
// /* API ROUTE                        */
// /* -------------------------------- */

// export async function GET(req: NextRequest) {

// try {


// const propertyId = process.env.GA_PROPERTY_ID!

// const { searchParams } = new URL(req.url)

// const start = searchParams.get("start") || "30daysAgo"
// const end = searchParams.get("end") || "today"

// const models =
//   searchParams.get("models")
//     ?.split(",")
//     .map(m => m.toLowerCase()) || []

// /* ---------------------------------- */
// /* Fetch GA4 data                     */
// /* ---------------------------------- */

// const rows = await fetchTOFU(
//   propertyId,
//   start,
//   end,
//   undefined,
//   "TRAFFIC_EROSION"
// )

// console.log("GA4 ROW COUNT:", rows?.length)

// const matrix: Record<string, Record<string, number>> = {}

// rows.forEach((row: any) => {

//   const rawQueryPath = row.dimensionValues?.[0]?.value || ""
//   const rawLandingPath = row.dimensionValues?.[1]?.value || ""

//   const queryModel = extractModel(rawQueryPath)
//   const landingModel = extractModel(rawLandingPath)

//   const users = Number(
//     row.metricValues?.[0]?.value || 0
//   )

//   console.log("RAW PATHS:", rawQueryPath, "→", rawLandingPath)
//   console.log("EXTRACTED:", queryModel, "→", landingModel)

//   if (!landingModel) return

//   const from = queryModel || "entry"
//   const to = landingModel

//   if (from === to) return

//   if (!matrix[from]) {
//     matrix[from] = {}
//   }

//   matrix[from][to] =
//     (matrix[from][to] || 0) + users

// })


// /* ---------------------------------- */
// /* Convert matrix → erosion list      */
// /* ---------------------------------- */

// const erosion: any[] = []

// Object.keys(matrix).forEach((from) => {

//   Object.keys(matrix[from]).forEach((to) => {

//     const value = matrix[from][to]

//     /* If no focus model, remove entry noise */

//     if (!models.length && from === "entry") return

//     /* If focus model selected */

//     if (models.length) {

//       const isFrom = models.some(m => from.includes(m))
//       const isTo = models.some(m => to.includes(m))

//       if (!isFrom && !isTo) return
//     }

//     erosion.push({
//       from,
//       to,
//       erosion: value
//     })

//   })

// })


// /* ---------------------------------- */
// /* Sort + limit dataset               */
// /* ---------------------------------- */

// erosion.sort((a, b) => b.erosion - a.erosion)

// const result = erosion.slice(0, 120)

// console.log("EROSION PAIRS:", result.slice(0,10))


// return NextResponse.json({
//   success: true,
//   data: result
// })


// } catch (error) {


// console.error("Traffic erosion error", error)

// return NextResponse.json({
//   success: false,
//   data: []
// })


// }

// }




import { NextRequest, NextResponse } from "next/server"
import { fetchTOFU } from "@/services/ga4Service"

/* -------------------------------- */
/* Extract model name from GA path  */
/* -------------------------------- */

function extractModel(path: string) {

if (!path) return ""

const invalid = [
"(not set)",
"(not provided)",
"/",
"other"
]

if (invalid.includes(path.toLowerCase())) return ""

const parts = path
.toLowerCase()
.split("/")
.filter(Boolean)

if (!parts.length) return ""

let model = parts[parts.length - 1]

model = model.replace(".htm", "")
model = model.replace(".html", "")

const badPages = [
"pictures",
"price-in-new-delhi",
"car-loan-emi-calculator",
"upcomingcars",
"newcars"
]

if (badPages.some(b => model.includes(b))) return ""

return model.replace(/[-_]/g, " ").trim()
}

/* -------------------------------- */
/* API ROUTE                        */
/* -------------------------------- */

export async function GET(req: NextRequest) {

try {

const propertyId = process.env.GA_PROPERTY_ID!

const { searchParams } = new URL(req.url)

const start = searchParams.get("start") || "30daysAgo"
const end = searchParams.get("end") || "today"

const models =
  searchParams.get("models")
    ?.split(",")
    .map(m => m.toLowerCase())
    .filter(Boolean) || []

/* -------------------------------- */
/* IMPORTANT: Only run when model   */
/* -------------------------------- */

if (!models.length) {

  // console.log("Traffic erosion skipped: no focus model selected")

  return NextResponse.json({
    success: true,
    data: []
  })

}

/* ---------------------------------- */
/* Fetch GA4 data                     */
/* ---------------------------------- */

const rows = await fetchTOFU(
  propertyId,
  start,
  end,
  undefined,
  "TRAFFIC_EROSION"
)

const matrix: Record<string, Record<string, number>> = {}

rows.forEach((row: any) => {

  const rawQueryPath = row.dimensionValues?.[0]?.value || ""
  const rawLandingPath = row.dimensionValues?.[1]?.value || ""

  const queryModel = extractModel(rawQueryPath)
  const landingModel = extractModel(rawLandingPath)

  const users = Number(
    row.metricValues?.[0]?.value || 0
  )

  if (!landingModel) return

  const from = queryModel || "entry"
  const to = landingModel

  if (from === to) return

  if (!matrix[from]) {
    matrix[from] = {}
  }

  matrix[from][to] =
    (matrix[from][to] || 0) + users

})


/* ---------------------------------- */
/* Convert matrix → erosion list      */
/* ---------------------------------- */

const erosion: any[] = []

Object.keys(matrix).forEach((from) => {

  Object.keys(matrix[from]).forEach((to) => {

    const value = matrix[from][to]

    const isFrom = models.some(m => from.includes(m))
    const isTo = models.some(m => to.includes(m))

    if (!isFrom && !isTo) return

    erosion.push({
      from,
      to,
      erosion: value
    })

  })

})


/* ---------------------------------- */
/* Sort + limit dataset               */
/* ---------------------------------- */

erosion.sort((a, b) => b.erosion - a.erosion)

const result = erosion.slice(0, 120)

// console.log("EROSION PAIRS:", result.slice(0, 10))

return NextResponse.json({
  success: true,
  data: result
})

} catch (error) {

console.error("Traffic erosion error", error)

return NextResponse.json({
  success: false,
  data: []
})

}

}
