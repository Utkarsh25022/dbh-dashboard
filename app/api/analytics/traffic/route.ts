// // // // import { NextRequest, NextResponse } from "next/server"
// // // // import { fetchTOFU } from "@/services/ga4Service"

// // // // function normalize(name: string) {
// // // // return name
// // // // .replace(/\d{4}-\d{4}/g, "")
// // // // .trim()
// // // // .toLowerCase()
// // // // }

// // // // export async function GET(req: NextRequest) {

// // // // try {


// // // // const propertyId = process.env.GA_PROPERTY_ID!

// // // // const { searchParams } = new URL(req.url)

// // // // const start = searchParams.get("start") || "30daysAgo"
// // // // const end = searchParams.get("end") || "today"
// // // // const models = searchParams.get("models") || ""

// // // // const modelList = models.split(",").filter(Boolean)

// // // // const rows = await fetchTOFU(
// // // //   propertyId,
// // // //   start,
// // // //   end,
// // // //   modelList,
// // // //   "TOFU"
// // // // )

// // // // const totals: Record<string, number> = {}

// // // // for (const row of rows) {

// // // //   const rawModel =
// // // //     row.dimensionValues?.[0]?.value

// // // //   const users =
// // // //     Number(row.metricValues?.[0]?.value || 0)

// // // //   if (!rawModel) continue

// // // //   const model = normalize(rawModel)

// // // //   totals[model] =
// // // //     (totals[model] || 0) + users
// // // // }

// // // // const grandTotal =
// // // //   Object.values(totals)
// // // //     .reduce((a, b) => a + b, 0) || 1

// // // // let data =
// // // //   Object.entries(totals).map(
// // // //     ([model, users]) => {

// // // //       const share =
// // // //         (users / grandTotal) * 100

// // // //       return {
// // // //         model,
// // // //         searchShare:
// // // //           Number(share.toFixed(2)),
// // // //         trafficShare:
// // // //           Number(share.toFixed(2)),
// // // //         pageViewsShare:
// // // //           Number(share.toFixed(2))
// // // //       }
// // // //     }
// // // //   )

// // // // /* ----------------------------- */
// // // // /* SORT MODELS BY SHARE */
// // // // /* ----------------------------- */

// // // // data = data.sort(
// // // //   (a, b) =>
// // // //     b.trafficShare - a.trafficShare
// // // // )

// // // // /* ----------------------------- */
// // // // /* LIMIT TO TOP 20 + OTHERS */
// // // // /* ----------------------------- */

// // // // const TOP_LIMIT = 20

// // // // const topModels =
// // // //   data.slice(0, TOP_LIMIT)

// // // // const remaining =
// // // //   data.slice(TOP_LIMIT)

// // // // if (remaining.length) {

// // // //   const others = {

// // // //     model: "others",

// // // //     searchShare:
// // // //       Number(
// // // //         remaining
// // // //           .reduce(
// // // //             (sum, m) =>
// // // //               sum + m.searchShare,
// // // //             0
// // // //           )
// // // //           .toFixed(2)
// // // //       ),

// // // //     trafficShare:
// // // //       Number(
// // // //         remaining
// // // //           .reduce(
// // // //             (sum, m) =>
// // // //               sum + m.trafficShare,
// // // //             0
// // // //           )
// // // //           .toFixed(2)
// // // //       ),

// // // //     pageViewsShare:
// // // //       Number(
// // // //         remaining
// // // //           .reduce(
// // // //             (sum, m) =>
// // // //               sum + m.pageViewsShare,
// // // //             0
// // // //           )
// // // //           .toFixed(2)
// // // //       )

// // // //   }

// // // //   topModels.push(others)
// // // // }

// // // // return NextResponse.json({
// // // //   success: true,
// // // //   data: topModels
// // // // })


// // // // } catch (error) {


// // // // console.error(
// // // //   "Traffic share error",
// // // //   error
// // // // )

// // // // return NextResponse.json({
// // // //   success: false,
// // // //   data: []
// // // // })

// // // // }

// // // // }












// // // import { NextRequest, NextResponse } from "next/server"
// // // import { fetchTOFU } from "@/services/ga4Service"

// // // function normalize(name: string) {
// // //   return name
// // //     .replace(/\d{4}-\d{4}/g, "")
// // //     .trim()
// // //     .toLowerCase()
// // // }

// // // export async function GET(req: NextRequest) {

// // //   try {

// // //     const propertyId = process.env.GA_PROPERTY_ID!

// // //     const { searchParams } = new URL(req.url)

// // //     const start = searchParams.get("start") || "30daysAgo"
// // //     const end = searchParams.get("end") || "today"
// // //     const models = searchParams.get("models") || ""

// // //     const modelList = models.split(",").filter(Boolean)

// // //     /* ---------------- NO MODEL SELECTED ---------------- */

// // //     if (!modelList.length) {
// // //       return NextResponse.json({
// // //         success: true,
// // //         data: []
// // //       })
// // //     }

// // //     /* ---------------- FETCH GA DATA ---------------- */

// // //     const rows = await fetchTOFU(
// // //       propertyId,
// // //       start,
// // //       end,
// // //       modelList,
// // //       "TOFU"
// // //     )

// // //     const totals: Record<string, number> = {}

// // //     for (const row of rows) {

// // //       const rawModel =
// // //         row.dimensionValues?.[0]?.value

// // //       const users =
// // //         Number(row.metricValues?.[0]?.value || 0)

// // //       if (!rawModel) continue

// // //       const model = normalize(rawModel)

// // //       totals[model] =
// // //         (totals[model] || 0) + users
// // //     }

// // //     const grandTotal =
// // //       Object.values(totals)
// // //         .reduce((a, b) => a + b, 0) || 1

// // //     let data =
// // //       Object.entries(totals).map(
// // //         ([model, users]) => {

// // //           const share =
// // //             (users / grandTotal) * 100

// // //           return {
// // //             model,
// // //             searchShare:
// // //               Number(share.toFixed(2)),
// // //             trafficShare:
// // //               Number(share.toFixed(2)),
// // //             pageViewsShare:
// // //               Number(share.toFixed(2))
// // //           }
// // //         }
// // //       )

// // //     /* ---------------- SORT MODELS BY SHARE ---------------- */

// // //     data = data.sort(
// // //       (a, b) =>
// // //         b.trafficShare - a.trafficShare
// // //     )

// // //     /* ---------------- LIMIT TO TOP 20 + OTHERS ---------------- */

// // //     const TOP_LIMIT = 20

// // //     const topModels =
// // //       data.slice(0, TOP_LIMIT)

// // //     const remaining =
// // //       data.slice(TOP_LIMIT)

// // //     if (remaining.length) {

// // //       const others = {

// // //         model: "others",

// // //         searchShare:
// // //           Number(
// // //             remaining
// // //               .reduce(
// // //                 (sum, m) =>
// // //                   sum + m.searchShare,
// // //                 0
// // //               )
// // //               .toFixed(2)
// // //           ),

// // //         trafficShare:
// // //           Number(
// // //             remaining
// // //               .reduce(
// // //                 (sum, m) =>
// // //                   sum + m.trafficShare,
// // //                 0
// // //               )
// // //               .toFixed(2)
// // //           ),

// // //         pageViewsShare:
// // //           Number(
// // //             remaining
// // //               .reduce(
// // //                 (sum, m) =>
// // //                   sum + m.pageViewsShare,
// // //                 0
// // //               )
// // //               .toFixed(2)
// // //           )

// // //       }

// // //       topModels.push(others)
// // //     }

// // //     return NextResponse.json({
// // //       success: true,
// // //       data: topModels
// // //     })

// // //   } catch (error) {

// // //     console.error(
// // //       "Traffic share error",
// // //       error
// // //     )

// // //     return NextResponse.json({
// // //       success: false,
// // //       data: []
// // //     })

// // //   }

// // // }


// // import { NextRequest, NextResponse } from "next/server"
// // import { fetchTOFU } from "@/services/ga4Service"

// // function normalize(name: string) {
// //   return name
// //     .replace(/\d{4}-\d{4}/g, "")
// //     .trim()
// //     .toLowerCase()
// // }

// // export async function GET(req: NextRequest) {

// //   try {

// //     const propertyId = process.env.GA_PROPERTY_ID!

// //     const { searchParams } = new URL(req.url)

// //     const start = searchParams.get("start") || "30daysAgo"
// //     const end = searchParams.get("end") || "today"
// //     const models = searchParams.get("models") || ""

// //     let modelList = models.split(",").filter(Boolean)

// //     /* ---------------- FIX: HANDLE EMPTY MODEL SELECTION ---------------- */

// //     // If no models selected, send wildcard so GA query still runs
// //     if (!modelList.length) {
// //       modelList = ["all"]
// //     }

// //     /* ---------------- FETCH GA DATA ---------------- */

// //     const rows = await fetchTOFU(
// //       propertyId,
// //       start,
// //       end,
// //       modelList,
// //       "TOFU"
// //     )

// //     const totals: Record<string, number> = {}

// //     for (const row of rows) {

// //       const rawModel =
// //         row.dimensionValues?.[0]?.value

// //       const users =
// //         Number(row.metricValues?.[0]?.value || 0)

// //       if (!rawModel) continue

// //       const model = normalize(rawModel)

// //       totals[model] =
// //         (totals[model] || 0) + users
// //     }

// //     const grandTotal =
// //       Object.values(totals)
// //         .reduce((a, b) => a + b, 0) || 1

// //     let data =
// //       Object.entries(totals).map(
// //         ([model, users]) => {

// //           const share =
// //             (users / grandTotal) * 100

// //           return {
// //             model,
// //             searchShare:
// //               Number(share.toFixed(2)),
// //             trafficShare:
// //               Number(share.toFixed(2)),
// //             pageViewsShare:
// //               Number(share.toFixed(2))
// //           }
// //         }
// //       )

// //     /* ---------------- SORT MODELS BY SHARE ---------------- */

// //     data = data.sort(
// //       (a, b) =>
// //         b.trafficShare - a.trafficShare
// //     )

// //     /* ---------------- LIMIT TO TOP 20 + OTHERS ---------------- */

// //     const TOP_LIMIT = 20

// //     const topModels =
// //       data.slice(0, TOP_LIMIT)

// //     const remaining =
// //       data.slice(TOP_LIMIT)

// //     if (remaining.length) {

// //       const others = {

// //         model: "others",

// //         searchShare:
// //           Number(
// //             remaining
// //               .reduce(
// //                 (sum, m) =>
// //                   sum + m.searchShare,
// //                 0
// //               )
// //               .toFixed(2)
// //           ),

// //         trafficShare:
// //           Number(
// //             remaining
// //               .reduce(
// //                 (sum, m) =>
// //                   sum + m.trafficShare,
// //                 0
// //               )
// //               .toFixed(2)
// //           ),

// //         pageViewsShare:
// //           Number(
// //             remaining
// //               .reduce(
// //                 (sum, m) =>
// //                   sum + m.pageViewsShare,
// //                 0
// //               )
// //               .toFixed(2)
// //           )

// //       }

// //       topModels.push(others)
// //     }

// //     return NextResponse.json({
// //       success: true,
// //       data: topModels
// //     })

// //   } catch (error) {

// //     console.error(
// //       "Traffic share error",
// //       error
// //     )

// //     return NextResponse.json({
// //       success: false,
// //       data: []
// //     })

// //   }

// // }




// import { NextRequest, NextResponse } from "next/server"
// import { fetchTOFU } from "@/services/ga4Service"

// function normalize(name: string) {
//   return name
//     .replace(/\d{4}-\d{4}/g, "")
//     .trim()
//     .toLowerCase()
// }

// export async function GET(req: NextRequest) {

//   try {

//     const propertyId = process.env.GA_PROPERTY_ID!

//     const { searchParams } = new URL(req.url)

//     const start = searchParams.get("start") || "30daysAgo"
//     const end = searchParams.get("end") || "today"
//     const models = searchParams.get("models") || ""

//     let modelList = models.split(",").filter(Boolean)

//     /* ---------------- HANDLE EMPTY MODEL SELECTION ---------------- */

//     if (!modelList.length) {
//       modelList = ["all"]
//     }

//     const allowedModels = modelList.map(m => normalize(m))

//     /* ---------------- FETCH CURRENT PERIOD ---------------- */

//     const rows = await fetchTOFU(
//       propertyId,
//       start,
//       end,
//       modelList,
//       "TOFU"
//     )

//     /* ---------------- FETCH PREVIOUS PERIOD ---------------- */

//     const prevStart = "60daysAgo"
//     const prevEnd = "31daysAgo"

//     const prevRows = await fetchTOFU(
//       propertyId,
//       prevStart,
//       prevEnd,
//       modelList,
//       "TOFU"
//     )

//     const totals: Record<string, number> = {}
//     const prevTotals: Record<string, number> = {}

//     /* ---------------- CURRENT PERIOD AGGREGATION ---------------- */

//     for (const row of rows) {

//       const rawModel =
//         row.dimensionValues?.[0]?.value

//       const users =
//         Number(row.metricValues?.[0]?.value || 0)

//       if (!rawModel) continue

//       const model = normalize(rawModel)

//       if (
//         allowedModels[0] !== "all" &&
//         !allowedModels.includes(model)
//       ) continue

//       totals[model] =
//         (totals[model] || 0) + users
//     }

//     /* ---------------- PREVIOUS PERIOD AGGREGATION ---------------- */

//     for (const row of prevRows) {

//       const rawModel =
//         row.dimensionValues?.[0]?.value

//       const users =
//         Number(row.metricValues?.[0]?.value || 0)

//       if (!rawModel) continue

//       const model = normalize(rawModel)

//       if (
//         allowedModels[0] !== "all" &&
//         !allowedModels.includes(model)
//       ) continue

//       prevTotals[model] =
//         (prevTotals[model] || 0) + users
//     }

//     const grandTotal =
//       Object.values(totals)
//         .reduce((a, b) => a + b, 0) || 1

//     const prevGrandTotal =
//       Object.values(prevTotals)
//         .reduce((a, b) => a + b, 0) || 1

//     /* ---------------- BUILD SHARE DATA ---------------- */

//     let data =
//       Object.entries(totals).map(
//         ([model, users]) => {

//           const share =
//             (users / grandTotal) * 100

//           const prevUsers =
//             prevTotals[model] || 0

//           const prevShare =
//             (prevUsers / prevGrandTotal) * 100

//           const change =
//             share - prevShare

//           let trend: "up" | "down" | "flat" = "flat"

//           if (change > 0.5) trend = "up"
//           else if (change < -0.5) trend = "down"

//           return {
//             model,

//             searchShare:
//               Number(share.toFixed(2)),

//             trafficShare:
//               Number(share.toFixed(2)),

//             pageViewsShare:
//               Number(share.toFixed(2)),

//             shareChange:
//               Number(change.toFixed(2)),

//             trend
//           }
//         }
//       )

//     /* ---------------- SORT MODELS ---------------- */

//     data = data.sort(
//       (a, b) =>
//         b.trafficShare - a.trafficShare
//     )

//     /* ---------------- LIMIT TO TOP 20 ---------------- */

//     const TOP_LIMIT = 20

//     const topModels =
//       data.slice(0, TOP_LIMIT)

//     const remaining =
//       data.slice(TOP_LIMIT)

//     if (remaining.length) {

//       const others = {

//         model: "others",

//         searchShare:
//           Number(
//             remaining
//               .reduce(
//                 (sum, m) =>
//                   sum + m.searchShare,
//                 0
//               )
//               .toFixed(2)
//           ),

//         trafficShare:
//           Number(
//             remaining
//               .reduce(
//                 (sum, m) =>
//                   sum + m.trafficShare,
//                 0
//               )
//               .toFixed(2)
//           ),

//         pageViewsShare:
//           Number(
//             remaining
//               .reduce(
//                 (sum, m) =>
//                   sum + m.pageViewsShare,
//                 0
//               )
//               .toFixed(2)
//           ),

//         shareChange:
//           Number(
//             remaining
//               .reduce(
//                 (sum, m) =>
//                   sum + m.shareChange,
//                 0
//               )
//               .toFixed(2)
//           ),

//         trend: "flat"
//       }

//       topModels.push(others)
//     }

//     return NextResponse.json({
//       success: true,
//       data: topModels
//     })

//   } catch (error) {

//     console.error(
//       "Traffic share error",
//       error
//     )

//     return NextResponse.json({
//       success: false,
//       data: []
//     })

//   }

// }










import { NextRequest, NextResponse } from "next/server"
import { fetchTOFU } from "@/services/ga4Service"

function normalize(name: string) {
  return name
    .replace(/\d{4}-\d{4}/g, "")
    .trim()
    .toLowerCase()
}

export async function GET(req: NextRequest) {

  try {

    const propertyId = process.env.GA_PROPERTY_ID!

    const { searchParams } = new URL(req.url)

    const start = searchParams.get("start") || "30daysAgo"
    const end = searchParams.get("end") || "today"
    const models = searchParams.get("models") || ""

    let modelList = models.split(",").filter(Boolean)

    /* ---------- HANDLE EMPTY MODEL SELECTION ---------- */

    if (!modelList.length) {
      modelList = ["all"]
    }

    const allowedModels =
      modelList.map(m => normalize(m))

    /* ---------- FETCH GA DATA ---------- */

    const rows = await fetchTOFU(
      propertyId,
      start,
      end,
      modelList,
      "TOFU"
    )

    const totals: Record<string, number> = {}

    /* ---------- STRICT FILTERING ---------- */

    for (const row of rows) {

      const rawModel =
        row.dimensionValues?.[0]?.value

      const users =
        Number(row.metricValues?.[0]?.value || 0)

      if (!rawModel) continue

      const model =
        normalize(rawModel)

      /* IMPORTANT FIX */

      if (
        allowedModels[0] !== "all" &&
        !allowedModels.includes(model)
      ) {
        continue
      }

      totals[model] =
        (totals[model] || 0) + users
    }

    const grandTotal =
      Object.values(totals)
        .reduce((a, b) => a + b, 0) || 1

    let data =
      Object.entries(totals).map(
        ([model, users]) => {

          const share =
            (users / grandTotal) * 100

          return {
            model,
            searchShare:
              Number(share.toFixed(2)),
            trafficShare:
              Number(share.toFixed(2)),
            pageViewsShare:
              Number(share.toFixed(2))
          }
        }
      )

    /* ---------- SORT ---------- */

    data = data.sort(
      (a, b) =>
        b.trafficShare - a.trafficShare
    )

    /* ---------- LIMIT TOP 20 ---------- */

    const TOP_LIMIT = 20

    const topModels =
      data.slice(0, TOP_LIMIT)

    const remaining =
      data.slice(TOP_LIMIT)

    if (remaining.length) {

      const others = {

        model: "others",

        searchShare:
          Number(
            remaining.reduce(
              (sum, m) =>
                sum + m.searchShare,
              0
            ).toFixed(2)
          ),

        trafficShare:
          Number(
            remaining.reduce(
              (sum, m) =>
                sum + m.trafficShare,
              0
            ).toFixed(2)
          ),

        pageViewsShare:
          Number(
            remaining.reduce(
              (sum, m) =>
                sum + m.pageViewsShare,
              0
            ).toFixed(2)
          )
      }

      topModels.push(others)
    }

    return NextResponse.json({
      success: true,
      data: topModels
    })

  } catch (error) {

    console.error(
      "Traffic share error",
      error
    )

    return NextResponse.json({
      success: false,
      data: []
    })

  }

}