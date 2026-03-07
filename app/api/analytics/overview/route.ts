// // // // import { NextRequest, NextResponse } from "next/server";
// // // // import { fetchTOFU } from "@/services/ga4Service";

// // // // export async function GET(req: NextRequest) {

// // // //   try {

// // // //     const propertyId = process.env.GA_PROPERTY_ID!

// // // //     const { searchParams } = new URL(req.url)

// // // //     const start = searchParams.get("start") || "7daysAgo"
// // // //     const end = searchParams.get("end") || "today"

// // // //     const models = searchParams.get("models")

// // // //     if (!models) {
// // // //       return NextResponse.json({
// // // //         success: false,
// // // //         error: "Model required"
// // // //       })
// // // //     }

// // // //     const rows = await fetchTOFU(
// // // //       propertyId,
// // // //       start,
// // // //       end,
// // // //       models
// // // //     )

// // // //     let totalUsers = 0
// // // //     let pageViews = 0

// // // //     for (const row of rows) {

// // // //       const users = Number(row.metricValues?.[0]?.value || 0)
// // // //       const views = Number(row.metricValues?.[1]?.value || 0)

// // // //       totalUsers += users
// // // //       pageViews += views

// // // //     }

// // // //     const engagement =
// // // //       totalUsers > 0
// // // //         ? pageViews / totalUsers
// // // //         : 0

// // // //     const data = {

// // // //       totalVisits: pageViews,
// // // //       activeUsers: totalUsers,

// // // //       leads: 0,

// // // //       engagement,

// // // //       consideration: 0,

// // // //       awareness: totalUsers,

// // // //       totalVisitsChange: 0,
// // // //       activeUsersChange: 0,
// // // //       leadsChange: 0,
// // // //       engagementChange: 0,
// // // //       considerationChange: 0,
// // // //       awarenessChange: 0

// // // //     }

// // // //     return NextResponse.json({
// // // //       success: true,
// // // //       data
// // // //     })

// // // //   } catch (err) {

// // // //     console.error("Overview API Error", err)

// // // //     return NextResponse.json({
// // // //       success: false,
// // // //       error: "API failure"
// // // //     })

// // // //   }

// // // // }





// // // import { NextRequest, NextResponse } from "next/server";
// // // import { fetchTOFU } from "@/services/ga4Service";

// // // export async function GET(req: NextRequest) {

// // //   try {

// // //     const propertyId = process.env.GA_PROPERTY_ID!

// // //     const { searchParams } = new URL(req.url)

// // //     const start = searchParams.get("start") || "7daysAgo"
// // //     const end = searchParams.get("end") || "today"

// // //     const modelsParam = searchParams.get("models")

// // //     /* ----------------------------- */
// // //     /* HANDLE EMPTY MODELS (OVERALL KPI) */
// // //     /* ----------------------------- */

// // //     const models =
// // //       modelsParam && modelsParam.trim().length > 0
// // //         ? modelsParam
// // //         : "all"

// // //     /* ----------------------------- */
// // //     /* FETCH DATA */
// // //     /* ----------------------------- */

// // //     const rows = await fetchTOFU(
// // //       propertyId,
// // //       start,
// // //       end,
// // //       models
// // //     )

// // //     let totalUsers = 0
// // //     let pageViews = 0

// // //     for (const row of rows) {

// // //       const users = Number(row.metricValues?.[0]?.value || 0)
// // //       const views = Number(row.metricValues?.[1]?.value || 0)

// // //       totalUsers += users
// // //       pageViews += views

// // //     }

// // //     const engagement =
// // //       totalUsers > 0
// // //         ? pageViews / totalUsers
// // //         : 0

// // //     const data = {

// // //       totalVisits: pageViews,
// // //       activeUsers: totalUsers,

// // //       leads: 0,

// // //       engagement,

// // //       consideration: 0,

// // //       awareness: totalUsers,

// // //       totalVisitsChange: 0,
// // //       activeUsersChange: 0,
// // //       leadsChange: 0,
// // //       engagementChange: 0,
// // //       considerationChange: 0,
// // //       awarenessChange: 0

// // //     }

// // //     return NextResponse.json({
// // //       success: true,
// // //       data
// // //     })

// // //   } catch (err) {

// // //     console.error("Overview API Error", err)

// // //     return NextResponse.json({
// // //       success: false,
// // //       error: "API failure"
// // //     })

// // //   }

// // // }









// // import { NextRequest, NextResponse } from "next/server";
// // import { fetchTOFU } from "@/services/ga4Service";
// // import { calculateKPI } from "@/services/metricCalculator";

// // export async function GET(req: NextRequest) {

// //   try {

// //     const propertyId = process.env.GA_PROPERTY_ID!

// //     const { searchParams } = new URL(req.url)

// //     const start = searchParams.get("start") || "7daysAgo"
// //     const end = searchParams.get("end") || "today"

// //     const modelsParam = searchParams.get("models")

// //     /* ----------------------------- */
// //     /* HANDLE MODEL LIST */
// //     /* ----------------------------- */

// //     const models =
// //       modelsParam && modelsParam.trim().length > 0
// //         ? modelsParam.split(",")
// //         : []

// //     /* ----------------------------- */
// //     /* FETCH GA DATA */
// //     /* ----------------------------- */

// //     const rows = await fetchTOFU(
// //       propertyId,
// //       start,
// //       end,
// //       models
// //     )

// //     /* ----------------------------- */
// //     /* FORMAT DATA */
// //     /* ----------------------------- */

// //     const formatted = rows.map((row: any) => ({
// //       users: Number(row.metricValues?.[0]?.value || 0),
// //       pageViews: Number(row.metricValues?.[1]?.value || 0),
// //     }))

// //     /* ----------------------------- */
// //     /* CALCULATE KPI */
// //     /* ----------------------------- */

// //     const {
// //       totalUsers,
// //       totalPageViews,
// //       engagementPVUU
// //     } = calculateKPI(formatted)

// //     const data = {

// //       totalVisits: totalPageViews,

// //       activeUsers: totalUsers,

// //       leads: 0,

// //       engagement: engagementPVUU,

// //       consideration: 0,

// //       awareness: totalUsers,

// //       totalVisitsChange: 0,
// //       activeUsersChange: 0,
// //       leadsChange: 0,
// //       engagementChange: 0,
// //       considerationChange: 0,
// //       awarenessChange: 0

// //     }

// //     return NextResponse.json({
// //       success: true,
// //       data
// //     })

// //   } catch (err) {

// //     console.error("Overview API Error", err)

// //     return NextResponse.json({
// //       success: false,
// //       error: "API failure"
// //     })

// //   }

// // }




// import { NextRequest, NextResponse } from "next/server"
// import { fetchTOFU, fetchMOFU } from "@/services/ga4Service"
// import { calculateKPI } from "@/services/metricCalculator"

// export async function GET(req: NextRequest) {

//   try {

//     const propertyId = process.env.GA_PROPERTY_ID!

//     const { searchParams } = new URL(req.url)

//     const start = searchParams.get("start") || "7daysAgo"
//     const end = searchParams.get("end") || "today"

//     const modelsParam = searchParams.get("models")

//     const models =
//       modelsParam && modelsParam.trim().length > 0
//         ? modelsParam.split(",")
//         : []

//     /* ----------------------------- */
//     /* FETCH TOFU + MOFU */
//     /* ----------------------------- */

//     const [tofuRows, mofuRows] = await Promise.all([

//       fetchTOFU(
//         propertyId,
//         start,
//         end,
//         models
//       ),

//       fetchMOFU(
//         propertyId,
//         start,
//         end,
//         models
//       )

//     ])

//     /* ----------------------------- */
//     /* FORMAT TOFU */
//     /* ----------------------------- */

//     const formatted = tofuRows.map((row: any) => ({
//       users: Number(row.metricValues?.[0]?.value || 0),
//       pageViews: Number(row.metricValues?.[1]?.value || 0),
//     }))

//     const {
//       totalUsers,
//       totalPageViews,
//       engagementPVUU
//     } = calculateKPI(formatted)

//     /* ----------------------------- */
//     /* CALCULATE MOFU USERS */
//     /* ----------------------------- */

//     let mofuUsers = 0

//     for (const row of mofuRows) {

//       const users =
//         Number(row.metricValues?.[0]?.value || 0)

//       mofuUsers += users

//     }

//     /* ----------------------------- */
//     /* FINAL KPI OBJECT */
//     /* ----------------------------- */

//     const data = {

//       totalVisits: totalPageViews,

//       activeUsers: totalUsers,

//       leads: 0,

//       engagement: engagementPVUU,

//       consideration: mofuUsers,

//       awareness: totalUsers,

//       totalVisitsChange: 0,
//       activeUsersChange: 0,
//       leadsChange: 0,
//       engagementChange: 0,
//       considerationChange: 0,
//       awarenessChange: 0

//     }

//     return NextResponse.json({
//       success: true,
//       data
//     })

//   } catch (err) {

//     console.error("Overview API Error", err)

//     return NextResponse.json({
//       success: false,
//       error: "API failure"
//     })

//   }

// }












import { NextRequest, NextResponse } from "next/server"
import { fetchTOFU, fetchMOFU } from "@/services/ga4Service"
import { calculateKPI } from "@/services/metricCalculator"

export async function GET(req: NextRequest) {

  try {

    const propertyId = process.env.GA_PROPERTY_ID!

    const { searchParams } = new URL(req.url)

    const start = searchParams.get("start") || "7daysAgo"
    const end = searchParams.get("end") || "today"

    const modelsParam = searchParams.get("models")

    const models =
      modelsParam && modelsParam.trim().length > 0
        ? modelsParam.split(",")
        : []

    const [tofuRows, mofuRows] = await Promise.all([

      fetchTOFU(
        propertyId,
        start,
        end,
        models
      ),

      fetchMOFU(
        propertyId,
        start,
        end,
        models
      )

    ])

    const formatted = tofuRows.map((row: any) => ({
      users: Number(row.metricValues?.[0]?.value || 0),
      pageViews: Number(row.metricValues?.[1]?.value || 0),
    }))

    const {
      totalUsers,
      totalPageViews,
      engagementPVUU
    } = calculateKPI(formatted)

    let mofuUsers = 0

    for (const row of mofuRows) {

      const users =
        Number(row.metricValues?.[0]?.value || 0)

      mofuUsers += users

    }

    const data = {

      totalVisits: totalPageViews,

      activeUsers: totalUsers,

      leads: 0,

      engagement: engagementPVUU,

      consideration: mofuUsers,

      awareness: totalUsers,

      totalVisitsChange: 0,
      activeUsersChange: 0,
      leadsChange: 0,
      engagementChange: 0,
      considerationChange: 0,
      awarenessChange: 0

    }

    return NextResponse.json({
      success: true,
      data
    })

  } catch (err) {

    console.error("Overview API Error", err)

    return NextResponse.json({
      success: false,
      error: "API failure"
    })

  }

}