// import { NextRequest, NextResponse } from "next/server"
// import { fetchTOFU } from "@/services/ga4Service"

// export async function GET(req: NextRequest) {

//   try {

//     const propertyId = process.env.GA_PROPERTY_ID!

//     const { searchParams } = new URL(req.url)

//     const start = searchParams.get("start") || "7daysAgo"
//     const end = searchParams.get("end") || "today"

//     const models = searchParams.get("models") || ""
//     const modelList = models.split(",").filter(Boolean)

//     /* ---------------- TOFU ---------------- */

//     const tofuRows = await fetchTOFU(
//       propertyId,
//       start,
//       end,
//       modelList,
//       "TOFU"
//     )

//     /* ---------------- MOFU ---------------- */

//     const mofuRows = await fetchTOFU(
//       propertyId,
//       start,
//       end,
//       modelList,
//       "MOFU"
//     )

//     const tofu =
//       tofuRows.reduce(
//         (sum, r) =>
//           sum + Number(r.metricValues?.[0]?.value || 0),
//         0
//       )

//     const mofu =
//       mofuRows.reduce(
//         (sum, r) =>
//           sum + Number(r.metricValues?.[0]?.value || 0),
//         0
//       )

//     const data = [

//       {
//         stage: "TOFU",
//         value: tofu,
//         fill: "#2563eb"
//       },

//       {
//         stage: "MOFU",
//         value: mofu,
//         fill: "#16a34a"
//       },

//       {
//         stage: "BOFU",
//         value: Math.round(mofu * 0.12),
//         fill: "#f59e0b"
//       }

//     ]

//     return NextResponse.json({ success: true, data })

//   } catch (error) {

//     console.error("Funnel error", error)

//     return NextResponse.json({
//       success: false,
//       data: []
//     })

//   }
// }














import { NextRequest, NextResponse } from "next/server"
import { fetchTOFU } from "@/services/ga4Service"

export async function GET(req: NextRequest) {

  try {

    const propertyId = process.env.GA_PROPERTY_ID!

    const { searchParams } = new URL(req.url)

    const start = searchParams.get("start") || "7daysAgo"
    const end = searchParams.get("end") || "today"

    const models = searchParams.get("models") || ""
    const modelList = models.split(",").filter(Boolean)

    /* ---------------- NO MODEL SELECTED ---------------- */

    if (!modelList.length) {

      return NextResponse.json({
        success: true,
        data: []
      })

    }

    /* ---------------- TOFU ---------------- */

    const tofuRows = await fetchTOFU(
      propertyId,
      start,
      end,
      modelList,
      "TOFU"
    )

    /* ---------------- MOFU ---------------- */

    const mofuRows = await fetchTOFU(
      propertyId,
      start,
      end,
      modelList,
      "MOFU"
    )

    const tofu =
      tofuRows.reduce(
        (sum, r) =>
          sum + Number(r.metricValues?.[0]?.value || 0),
        0
      )

    const mofu =
      mofuRows.reduce(
        (sum, r) =>
          sum + Number(r.metricValues?.[0]?.value || 0),
        0
      )

    const data = [

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
        value: Math.round(mofu * 0.12),
        fill: "#f59e0b"
      }

    ]

    return NextResponse.json({
      success: true,
      data
    })

  } catch (error) {

    console.error("Funnel error", error)

    return NextResponse.json({
      success: false,
      data: []
    })

  }
}