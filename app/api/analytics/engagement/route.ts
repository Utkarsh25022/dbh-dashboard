// import { NextRequest, NextResponse } from "next/server"
// import { fetchEngagement } from "@/services/ga4Service"

// export async function GET(req: NextRequest) {

//   try {

//     const propertyId = process.env.GA_PROPERTY_ID!

//     const { searchParams } = new URL(req.url)

//     const models =
//       searchParams.get("models")?.split(",").filter(Boolean) || []

//     const start = searchParams.get("start") || "30daysAgo"
//     const end = searchParams.get("end") || "today"

//     const trafficType =
//       searchParams.get("traffic") || "overall"

//     /* ----------------------------- */
//     /* FETCH GA4 DATA */
//     /* ----------------------------- */

//     const rows = await fetchEngagement(
//       propertyId,
//       start,
//       end,
//       models,
//       trafficType
//     )

//     if (!rows?.length) {

//       return NextResponse.json({
//         success: true,
//         data: []
//       })

//     }

//     /* ----------------------------- */
//     /* NORMALIZE RESPONSE */
//     /* ----------------------------- */

//     const data = rows.map((row: any) => {

//       const date =
//         row.date ||
//         row.dimensionValues?.[0]?.value ||
//         ""

//       const pageViews =
//         Number(
//           row.pageViews ??
//           row.metricValues?.[0]?.value ??
//           0
//         )

//       const users =
//         Number(
//           row.users ??
//           row.metricValues?.[1]?.value ??
//           0
//         )

//       const sessionDuration =
//         Number(
//           row.avgSessionDuration ??
//           row.metricValues?.[2]?.value ??
//           0
//         )

//       return {

//         date,

//         pv_uu: users ? pageViews / users : 0,

//         avgSessionDuration: sessionDuration

//       }

//     })

//     return NextResponse.json({
//       success: true,
//       data
//     })

//   } catch (error) {

//     console.error("Engagement API error:", error)

//     return NextResponse.json({
//       success: false,
//       data: []
//     })

//   }
// }




import { NextRequest, NextResponse } from "next/server"
import { fetchEngagement } from "@/services/ga4Service"

export async function GET(req: NextRequest) {

  try {

    const propertyId = process.env.GA_PROPERTY_ID!

    const data = await fetchEngagement(
      propertyId,
      "30daysAgo",
      "today"
    )

    return NextResponse.json({
      success: true,
      data
    })

  } catch (error) {

    console.error("Engagement API error:", error)

    return NextResponse.json({
      success: false,
      data: []
    })

  }

}