// // import { NextRequest, NextResponse } from "next/server"
// // import { fetchTOFU } from "@/services/ga4Service"

// // /* -------------------------------- */
// // /* MODEL NORMALIZER */
// // /* -------------------------------- */

// // function normalizeModel(name: string) {

// //   if (!name) return ""

// //   return name
// //     .toLowerCase()

// //     /* remove year patterns */
// //     .replace(/\d{4}-\d{4}/g, "")

// //     /* remove variant words */
// //     .replace(/\bev\b.*$/i, "")
// //     .replace(/\bracer\b/i, "")
// //     .replace(/\bmax\b/i, "")
// //     .replace(/\bprime\b/i, "")
// //     .replace(/\bn line\b/i, "")
// //     .replace(/\bturbo\b/i, "")

// //     /* normalize spaces */
// //     .replace(/\s+/g, " ")
// //     .trim()

// //     /* convert to key */
// //     .replace(/\s/g, "_")
// // }

// // /* -------------------------------- */
// // /* API */
// // /* -------------------------------- */

// // export async function GET(req: NextRequest) {

// //   try {

// //     const propertyId = process.env.GA_PROPERTY_ID!

// //     const { searchParams } = new URL(req.url)

// //     const start = searchParams.get("start") || "7daysAgo"
// //     const end = searchParams.get("end") || "today"

// //     const models = searchParams.get("models") || ""

// //     const modelList =
// //       models.split(",")
// //       .map(m => m.trim())
// //       .filter(Boolean)

// //     const rows = await fetchTOFU(
// //       propertyId,
// //       start,
// //       end,
// //       modelList,
// //       "TREND"
// //     )

// //     if (!rows.length) {

// //       return NextResponse.json({
// //         success: true,
// //         data: []
// //       })

// //     }

// //     const result: Record<string, any> = {}

// //     for (const row of rows) {

// //       const rawDate =
// //         row.dimensionValues?.[0]?.value

// //       const rawModel =
// //         row.dimensionValues?.[1]?.value

// //       const users =
// //         Number(row.metricValues?.[0]?.value || 0)

// //       if (!rawDate || !rawModel) continue

// //       const date =
// //         rawDate.slice(0,4) + "-" +
// //         rawDate.slice(4,6) + "-" +
// //         rawDate.slice(6,8)

// //       const model =
// //         normalizeModel(rawModel)

// //       if (!result[date]) {
// //         result[date] = { date }
// //       }

// //       /* accumulate users */

// //       result[date][model] =
// //         (result[date][model] || 0) + users
// //     }

// //     const data =
// //       Object.values(result).sort(
// //         (a: any, b: any) =>
// //           new Date(a.date).getTime() -
// //           new Date(b.date).getTime()
// //       )

// //     return NextResponse.json({
// //       success: true,
// //       data
// //     })

// //   } catch (error) {

// //     console.error("Trend API error:", error)

// //     return NextResponse.json({
// //       success: false,
// //       data: []
// //     })

// //   }

// // }















import { NextRequest, NextResponse } from "next/server"
import { fetchTraffic} from "@/services/ga4Service"

/* -------------------------------- */
/* MODEL NORMALIZER */
/* -------------------------------- */

function normalizeModel(name: string) {

  if (!name) return ""

  return name
    .toLowerCase()

    /* remove year patterns */
    .replace(/\d{4}-\d{4}/g, "")

    /* remove variant words */
    .replace(/\bev\b.*$/i, "")
    .replace(/\bracer\b/i, "")
    .replace(/\bmax\b/i, "")
    .replace(/\bprime\b/i, "")
    .replace(/\bn line\b/i, "")
    .replace(/\bturbo\b/i, "")

    /* normalize spaces */
    .replace(/\s+/g, " ")
    .trim()

    /* convert to key */
    .replace(/\s/g, "_")
}

/* -------------------------------- */
/* API */
/* -------------------------------- */

export async function GET(req: NextRequest) {

  try {

    const propertyId = process.env.GA_PROPERTY_ID!

    const { searchParams } = new URL(req.url)

    const start = searchParams.get("start") || "7daysAgo"
    const end = searchParams.get("end") || "today"

    const modelsParam = searchParams.get("models") || ""

    /* -------------------------------- */
    /* PARSE MODEL LIST */
    /* -------------------------------- */

    const modelList =
      modelsParam
        .split(",")
        .map(m => m.trim())
        .filter(Boolean)

    /* -------------------------------- */
    /* IF NO MODEL SELECTED → RETURN EMPTY */
    /* -------------------------------- */

    if (!modelList.length) {

      return NextResponse.json({
        success: true,
        data: []
      })

    }

    /* -------------------------------- */
    /* FETCH GA DATA */
    /* -------------------------------- */

    const rows = await fetchTraffic(
      propertyId,
      start,
      end
    )

    if (!rows.length) {

      return NextResponse.json({
        success: true,
        data: []
      })

    }

    const result: Record<string, any> = {}

    for (const row of rows) {

      const rawDate =
        row.dimensionValues?.[0]?.value

      const rawModel =
        row.dimensionValues?.[1]?.value

      const users =
        Number(row.metricValues?.[0]?.value || 0)

      if (!rawDate || !rawModel) continue

      const date =
        rawDate.slice(0,4) + "-" +
        rawDate.slice(4,6) + "-" +
        rawDate.slice(6,8)

      const model =
        normalizeModel(rawModel)

      if (!result[date]) {
        result[date] = { date }
      }

      /* accumulate users */

      result[date][model] =
        (result[date][model] || 0) + users
    }

    const data =
      Object.values(result).sort(
        (a: any, b: any) =>
          new Date(a.date).getTime() -
          new Date(b.date).getTime()
      )

    return NextResponse.json({
      success: true,
      data
    })

  } catch (error) {

    console.error("Trend API error:", error)

    return NextResponse.json({
      success: false,
      data: []
    })

  }

}





// import { NextResponse } from "next/server"
// import { fetchDashboardData } from "@/services/ga4DashboardService"

// export async function GET(req: Request) {

//   const { searchParams } = new URL(req.url)

//   const models = searchParams.get("models")?.split(",") || []
//   const start = searchParams.get("start") || "7daysAgo"
//   const end = searchParams.get("end") || "today"

//   const propertyId = process.env.GA_PROPERTY_ID!

//   const rows = await fetchDashboardData(
//     propertyId,
//     start,
//     end,
//     models
//   )

//   return NextResponse.json({
//     success: true,
//     data: rows
//   })

// }


