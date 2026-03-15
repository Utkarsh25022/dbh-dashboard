// // import { NextRequest, NextResponse } from "next/server"
// // import {
// //   fetchTraffic,
// //   fetchPageBehaviour
// // } from "@/services/ga4Service"

// // export async function GET(req: NextRequest) {

// //   try {

// //     const propertyId = process.env.GA_PROPERTY_ID!

// //     const { searchParams } = new URL(req.url)

// //     const start = searchParams.get("start") || "7daysAgo"
// //     const end = searchParams.get("end") || "today"

// //     const modelsParam = searchParams.get("models") || ""

// //     const modelList =
// //       modelsParam.split(",")
// //         .map(m => m.toLowerCase().trim())
// //         .filter(Boolean)

// //     if (!modelList.length) {

// //       return NextResponse.json({
// //         success: true,
// //         data: []
// //       })

// //     }

// //     const [trafficRows, pageRows] =
// //       await Promise.all([
// //         fetchTraffic(propertyId, start, end),
// //         fetchPageBehaviour(propertyId, start, end)
// //       ])

// //     /* ---------- TOFU ---------- */

// //     let tofu = 0

// //     for (const row of trafficRows) {

// //       const model =
// //         row.dimensionValues?.[1]?.value?.toLowerCase() || ""

// //       const matched = modelList.some(m => model.startsWith(m))

// //       if (!matched) continue

// //       const users =
// //         Number(row.metricValues?.[0]?.value || 0)

// //       tofu += users

// //     }

// //     /* ---------- MOFU ---------- */

// //     const mofuRegex =
// //       /(price|spec|offer|dealer|compar|disc)/i

// //     let mofu = 0

// //     /* ---------- BOFU ---------- */

// //     const bofuRegex =
// //       /(emi|brochure|loan|on-road)/i

// //     let bofu = 0

// //     for (const row of pageRows) {

// //       const model =
// //         row.dimensionValues?.[0]?.value?.toLowerCase() || ""

// //       const matched =
// //       modelList.some(m => model.startsWith(m))

// //       if (!matched) continue

// //       const page =
// //         row.dimensionValues?.[1]?.value || ""

// //       const users =
// //         Number(row.metricValues?.[0]?.value || 0)

// //       if (mofuRegex.test(page)) {

// //         mofu += users

// //       }

// //       if (bofuRegex.test(page)) {

// //         bofu += users

// //       }

// //     }

// //     return NextResponse.json({
// //       success: true,
// //       data: [

// //         {
// //           stage: "TOFU",
// //           value: tofu,
// //           fill: "#2563eb"
// //         },

// //         {
// //           stage: "MOFU",
// //           value: mofu,
// //           fill: "#16a34a"
// //         },

// //         {
// //           stage: "BOFU",
// //           value: bofu,
// //           fill: "#f59e0b"
// //         }

// //       ]
// //     })

// //   } catch (error) {

// //     console.error("Funnel error", error)

// //     return NextResponse.json({
// //       success: false,
// //       data: []
// //     })

// //   }

// // }









// // import { NextRequest, NextResponse } from "next/server"
// // import {
// //   fetchTraffic,
// //   fetchPageBehaviour
// // } from "@/services/ga4Service"

// // export async function GET(req: NextRequest) {

// //   try {

// //     const propertyId = process.env.GA_PROPERTY_ID!

// //     const { searchParams } = new URL(req.url)

// //     const start = searchParams.get("start") || "7daysAgo"
// //     const end = searchParams.get("end") || "today"

// //     const modelsParam = searchParams.get("models") || ""

// //     const modelList =
// //       modelsParam.split(",")
// //         .map(m => m.toLowerCase().trim())
// //         .filter(Boolean)

// //     if (!modelList.length) {

// //       return NextResponse.json({
// //         success: true,
// //         data: []
// //       })

// //     }

// //     const [trafficRows, pageRows] =
// //       await Promise.all([
// //         fetchTraffic(propertyId, start, end),
// //         fetchPageBehaviour(propertyId, start, end)
// //       ])

// //     /* ---------- TOFU ---------- */

// //     let tofu = 0

// //     for (const row of trafficRows) {

// //       const model =
// //         row.dimensionValues?.[1]?.value?.toLowerCase() || ""

// //       const matched =
// //         modelList.some(m => model.startsWith(m))

// //       if (!matched) continue

// //       const users =
// //         Number(row.metricValues?.[0]?.value || 0)

// //       tofu += users

// //     }

// //     /* ---------- MOFU ---------- */

// //     let mofu = 0

// //     for (const row of pageRows) {

// //       const model =
// //         row.dimensionValues?.[0]?.value?.toLowerCase() || ""

// //       const matched =
// //         modelList.some(m => model.startsWith(m))

// //       if (!matched) continue

// //       const users =
// //         Number(row.metricValues?.[0]?.value || 0)

// //       mofu += users

// //     }

// //     /* ---------- BOFU (optional future logic) ---------- */

// //     let bofu = Math.round(mofu * 0.3)

// //     return NextResponse.json({
// //       success: true,
// //       data: [

// //         {
// //           stage: "TOFU",
// //           value: tofu,
// //           fill: "#2563eb"
// //         },

// //         {
// //           stage: "MOFU",
// //           value: mofu,
// //           fill: "#16a34a"
// //         },

// //         {
// //           stage: "BOFU",
// //           value: bofu,
// //           fill: "#f59e0b"
// //         }

// //       ]
// //     })

// //   } catch (error) {

// //     console.error("Funnel error", error)

// //     return NextResponse.json({
// //       success: false,
// //       data: []
// //     })

// //   }

// // }











// import { NextRequest, NextResponse } from "next/server"
// import {
//   fetchTraffic,
//   fetchPageBehaviour
// } from "@/services/ga4Service"

// export async function GET(req: NextRequest) {

//   try {

//     const propertyId = process.env.GA_PROPERTY_ID!

//     const { searchParams } = new URL(req.url)

//     const start = searchParams.get("start") || "7daysAgo"
//     const end = searchParams.get("end") || "today"

//     const modelsParam = searchParams.get("models") || ""

//     const modelList =
//       modelsParam.split(",")
//         .map(m => m.toLowerCase().trim())
//         .filter(Boolean)

//     if (!modelList.length) {

//       return NextResponse.json({
//         success: true,
//         data: []
//       })

//     }

//     /* focus model only */
//     const focusModel = modelList[0]

//     const [trafficRows, pageRows] =
//       await Promise.all([
//         fetchTraffic(propertyId, start, end),
//         fetchPageBehaviour(propertyId, start, end)
//       ])

//     /* ---------- TOFU ---------- */

    // let tofu = 0

    // for (const row of trafficRows) {

    //   const model =
    //     row.dimensionValues?.[1]?.value?.toLowerCase() || ""

    //   if (!model.startsWith(focusModel)) continue

    //   const users =
    //     Number(row.metricValues?.[0]?.value || 0)

    //   tofu += users

    // }

//     /* ---------- MOFU ---------- */

//     let mofu = 0

//     for (const row of pageRows) {

//       const model =
//         row.dimensionValues?.[0]?.value?.toLowerCase() || ""

//       if (!model.startsWith(focusModel)) continue

//       const users =
//         Number(row.metricValues?.[0]?.value || 0)

//       mofu += users

//     }

//     /* ---------- BOFU ---------- */

//     let bofu = Math.round(mofu * 0.3)

//     return NextResponse.json({
//       success: true,
//       data: [

//         {
//           stage: "TOFU",
//           value: tofu,
//           fill: "#2563eb"
//         },

//         {
//           stage: "MOFU",
//           value: mofu,
//           fill: "#16a34a"
//         },

//         {
//           stage: "BOFU",
//           value: bofu,
//           fill: "#f59e0b"
//         }

//       ]
//     })

//   } catch (error) {

//     console.error("Funnel error", error)

//     return NextResponse.json({
//       success: false,
//       data: []
//     })

//   }

// }







import { NextRequest, NextResponse } from "next/server"
import {
  fetchTraffic,
  fetchPageBehaviour
} from "@/services/ga4Service"

function normalize(str: string) {
  return str
    .toLowerCase()
    .replace(/[_-]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

export async function GET(req: NextRequest) {

  try {

    const propertyId = process.env.GA_PROPERTY_ID!

    const { searchParams } = new URL(req.url)

    const start = searchParams.get("start") || "7daysAgo"
    const end = searchParams.get("end") || "today"

    const modelsParam = searchParams.get("models") || ""

    const modelList =
      modelsParam.split(",")
        .map(m => normalize(m))
        .filter(Boolean)

    if (!modelList.length) {

      return NextResponse.json({
        success: true,
        data: []
      })

    }

    const focusModel = modelList[0]

    const [trafficRows, pageRows] =
      await Promise.all([
        fetchTraffic(propertyId, start, end),
        fetchPageBehaviour(propertyId, start, end)
      ])

    /* ---------- TOFU ---------- */
    let tofu = 0

    for (const row of trafficRows) {

      const model =
        row.dimensionValues?.[1]?.value?.toLowerCase() || ""

      if (!model.startsWith(focusModel)) continue

      const users =
        Number(row.metricValues?.[0]?.value || 0)

      tofu += users

    }


    /* ---------- MOFU ---------- */

    let mofu = 0

    for (const row of pageRows) {

      const model =
        normalize(row.dimensionValues?.[0]?.value || "")

      if (model !== focusModel) continue

      const users =
        Number(row.metricValues?.[0]?.value || 0)

      mofu += users
    }

    /* ---------- BOFU ---------- */

    const bofu = Math.round(mofu * 0.3)

    return NextResponse.json({
      success: true,
      data: [

        {
          stage: "TOFU",
          value: tofu,
          fill: "#2563eb"
        },

        {
          stage: "MOFU",
          value: mofu,
          fill: "#16a34a"
        },

        {
          stage: "BOFU",
          value: bofu,
          fill: "#f59e0b"
        }

      ]
    })

  } catch (error) {

    console.error("Funnel error", error)

    return NextResponse.json({
      success: false,
      data: []
    })

  }

}