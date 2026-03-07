// // // // import { NextRequest, NextResponse } from "next/server"
// // // // import { fetchTOFU } from "@/services/ga4Service"

// // // // function normalizeKey(name: string) {
// // // //   return name
// // // //     .replace(/\d{4}-\d{4}/g, "")
// // // //     .trim()
// // // //     .toLowerCase()
// // // //     .replace(/\s+/g, "_")
// // // // }

// // // // export async function GET(req: NextRequest) {

// // // //   try {

// // // //     const propertyId = process.env.GA_PROPERTY_ID!
// // // //     const { searchParams } = new URL(req.url)

// // // //     const start = searchParams.get("start") || "7daysAgo"
// // // //     const end = searchParams.get("end") || "today"

// // // //     const models = searchParams.get("models") || ""
// // // //     const modelList = models.split(",").filter(Boolean)

// // // //     const rows = await fetchTOFU(
// // // //       propertyId,
// // // //       start,
// // // //       end,
// // // //       modelList,
// // // //       "TREND"
// // // //     )

// // // //     const result: any = {}

// // // //     for (const row of rows) {

// // // //       const dateRaw = row.dimensionValues?.[0]?.value
// // // //       const modelRaw = row.dimensionValues?.[1]?.value

// // // //       const users = Number(row.metricValues?.[0]?.value || 0)

// // // //       if (!dateRaw || !modelRaw) continue

// // // //       const date =
// // // //         dateRaw.slice(0,4)+"-"+dateRaw.slice(4,6)+"-"+dateRaw.slice(6,8)

// // // //       const model = normalizeKey(modelRaw)

// // // //       if (!result[date]) result[date] = { date }

// // // //       result[date][model] = (result[date][model] || 0) + users

// // // //     }

// // // //     return NextResponse.json({
// // // //       success:true,
// // // //       data:Object.values(result)
// // // //     })

// // // //   } catch (error) {

// // // //     console.error("Trend error",error)

// // // //     return NextResponse.json({
// // // //       success:false,
// // // //       data:[]
// // // //     })

// // // //   }

// // // // }




// // // import { NextRequest, NextResponse } from "next/server"
// // // import { fetchTOFU } from "@/services/ga4Service"
// // // import modelMap from "@/lib/config/oem-model-map-real.json"

// // // /* ----------------------------- */
// // // /* BUILD VARIANT → PARENT MAP */
// // // /* ----------------------------- */

// // // const variantToParent: Record<string, string> = {}

// // // const oems = modelMap.platforms.cardekho.oems

// // // for (const oemKey in oems) {

// // //   const models = oems[oemKey].models

// // //   for (const modelKey in models) {

// // //     const model = models[modelKey]

// // //     const parent = model.label

// // //     for (const variant of model.ga_model_names) {

// // //       const key = variant
// // //         .toLowerCase()
// // //         .trim()

// // //       variantToParent[key] = parent
// // //     }

// // //   }

// // // }

// // // /* ----------------------------- */
// // // /* NORMALIZE KEY */
// // // /* ----------------------------- */

// // // function normalizeKey(name: string) {

// // //   return name
// // //     .replace(/\d{4}-\d{4}/g, "")
// // //     .trim()
// // //     .toLowerCase()

// // // }

// // // /* ----------------------------- */
// // // /* RESOLVE PARENT MODEL */
// // // /* ----------------------------- */

// // // function resolveParentModel(raw: string) {

// // //   const normalized = normalizeKey(raw)

// // //   if (variantToParent[normalized]) {
// // //     return variantToParent[normalized]
// // //   }

// // //   return raw

// // // }

// // // /* ----------------------------- */
// // // /* API */
// // // /* ----------------------------- */

// // // export async function GET(req: NextRequest) {

// // //   try {

// // //     const propertyId = process.env.GA_PROPERTY_ID!

// // //     const { searchParams } = new URL(req.url)

// // //     const start = searchParams.get("start") || "7daysAgo"
// // //     const end = searchParams.get("end") || "today"

// // //     const models = searchParams.get("models") || ""
// // //     const modelList = models.split(",").filter(Boolean)

// // //     const rows = await fetchTOFU(
// // //       propertyId,
// // //       start,
// // //       end,
// // //       modelList,
// // //       "TREND"
// // //     )

// // //     const result: any = {}

// // //     for (const row of rows) {

// // //       const dateRaw = row.dimensionValues?.[0]?.value
// // //       const modelRaw = row.dimensionValues?.[1]?.value

// // //       const users = Number(row.metricValues?.[0]?.value || 0)

// // //       if (!dateRaw || !modelRaw) continue

// // //       const date =
// // //         dateRaw.slice(0,4)+"-"+dateRaw.slice(4,6)+"-"+dateRaw.slice(6,8)

// // //       /* ----------------------------- */
// // //       /* RESOLVE VARIANT → PARENT */
// // //       /* ----------------------------- */

// // //       const parentModel = resolveParentModel(modelRaw)

// // //       const modelKey = parentModel
// // //         .toLowerCase()
// // //         .replace(/\s+/g,"_")

// // //       if (!result[date]) result[date] = { date }

// // //       result[date][modelKey] =
// // //         (result[date][modelKey] || 0) + users

// // //     }

// // //     const data = Object.values(result).sort(
// // //       (a: any, b: any) =>
// // //         new Date(a.date).getTime() -
// // //         new Date(b.date).getTime()
// // //     )

// // //     return NextResponse.json({
// // //       success:true,
// // //       data
// // //     })

// // //   } catch (error) {

// // //     console.error("Trend error",error)

// // //     return NextResponse.json({
// // //       success:false,
// // //       data:[]
// // //     })

// // //   }

// // // }












// // import { NextRequest, NextResponse } from "next/server"
// // import { fetchTOFU } from "@/services/ga4Service"
// // import modelMap from "@/lib/config/oem-model-map-real.json"

// // /* ----------------------------- */
// // /* BUILD VARIANT → PARENT MAP */
// // /* ----------------------------- */

// // const variantToParent: Record<string, string> = {}

// // const oems = modelMap.platforms.cardekho.oems

// // for (const oemKey in oems) {

// //   const models = oems[oemKey].models

// //   for (const modelKey in models) {

// //     const model = models[modelKey]

// //     const parent = model.label.toLowerCase()

// //     for (const variant of model.ga_model_names) {

// //       const key = variant
// //         .toLowerCase()
// //         .replace(/\d{4}-\d{4}/g, "")
// //         .trim()

// //       variantToParent[key] = parent
// //     }

// //   }

// // }

// // /* ----------------------------- */
// // /* NORMALIZE KEY */
// // /* ----------------------------- */

// // function normalizeKey(name: string) {

// //   return name
// //     .replace(/\d{4}-\d{4}/g, "")
// //     .trim()
// //     .toLowerCase()

// // }

// // /* ----------------------------- */
// // /* RESOLVE PARENT MODEL */
// // /* ----------------------------- */

// // function resolveParentModel(raw: string) {

// //   const normalized = normalizeKey(raw)

// //   if (variantToParent[normalized]) {
// //     return variantToParent[normalized]
// //   }

// //   return normalized
// // }

// // /* ----------------------------- */
// // /* API */
// // /* ----------------------------- */

// // export async function GET(req: NextRequest) {

// //   try {

// //     const propertyId = process.env.GA_PROPERTY_ID!

// //     const { searchParams } = new URL(req.url)

// //     const start = searchParams.get("start") || "7daysAgo"
// //     const end = searchParams.get("end") || "today"

// //     const models = searchParams.get("models") || ""
// //     const modelList = models
// //       .split(",")
// //       .map(m => m.trim().toLowerCase())
// //       .filter(Boolean)

// //     const rows = await fetchTOFU(
// //       propertyId,
// //       start,
// //       end,
// //       modelList,
// //       "TREND"
// //     )

// //     const result: any = {}

// //     for (const row of rows) {

// //       const dateRaw = row.dimensionValues?.[0]?.value
// //       const modelRaw = row.dimensionValues?.[1]?.value

// //       const users = Number(row.metricValues?.[0]?.value || 0)

// //       if (!dateRaw || !modelRaw) continue

// //       const date =
// //         dateRaw.slice(0,4)+"-"+dateRaw.slice(4,6)+"-"+dateRaw.slice(6,8)

// //       /* ----------------------------- */
// //       /* RESOLVE VARIANT → PARENT */
// //       /* ----------------------------- */

// //       const parentModel = resolveParentModel(modelRaw)

// //       if (!result[date]) result[date] = { date }

// //       result[date][parentModel] =
// //         (result[date][parentModel] || 0) + users

// //     }

// //     const data = Object.values(result).sort(
// //       (a: any, b: any) =>
// //         new Date(a.date).getTime() -
// //         new Date(b.date).getTime()
// //     )

// //     return NextResponse.json({
// //       success:true,
// //       data
// //     })

// //   } catch (error) {

// //     console.error("Trend error",error)

// //     return NextResponse.json({
// //       success:false,
// //       data:[]
// //     })

// //   }

// // }









// import { NextRequest, NextResponse } from "next/server"
// import { fetchTOFU } from "@/services/ga4Service"
// import modelMap from "@/lib/config/oem-model-map-real.json"

// /* ----------------------------- */
// /* BUILD VARIANT → PARENT MAP */
// /* ----------------------------- */

// const variantToParent: Record<string, string> = {}

// const oems = modelMap.platforms.cardekho.oems

// for (const oemKey in oems) {

//   const models = oems[oemKey].models

//   for (const modelKey in models) {

//     const model = models[modelKey]

//     const parent = model.label.toLowerCase()

//     for (const variant of model.ga_model_names) {

//       const key = variant
//         .toLowerCase()
//         .replace(/\d{4}-\d{4}/g, "")
//         .trim()

//       variantToParent[key] = parent
//     }

//   }

// }

// /* ----------------------------- */
// /* NORMALIZE KEY */
// /* ----------------------------- */

// function normalizeKey(name: string) {

//   return name
//     .replace(/\d{4}-\d{4}/g, "")
//     .trim()
//     .toLowerCase()

// }

// /* ----------------------------- */
// /* RESOLVE PARENT MODEL */
// /* ----------------------------- */

// function resolveParentModel(raw: string) {

//   const normalized = normalizeKey(raw)

//   /* exact match from map */

//   if (variantToParent[normalized]) {
//     return variantToParent[normalized]
//   }

//   /* fallback: remove common variant suffixes */

//   const base = normalized
//     .replace(/\s+roxx$/,"")
//     .replace(/\s+ev$/,"")
//     .replace(/\s+racer$/,"")
//     .replace(/\s+e$/,"")
//     .trim()

//   if (variantToParent[base]) {
//     return variantToParent[base]
//   }

//   return base
// }

// /* ----------------------------- */
// /* API */
// /* ----------------------------- */

// export async function GET(req: NextRequest) {

//   try {

//     const propertyId = process.env.GA_PROPERTY_ID!

//     const { searchParams } = new URL(req.url)

//     const start = searchParams.get("start") || "7daysAgo"
//     const end = searchParams.get("end") || "today"

//     const models = searchParams.get("models") || ""
//     const modelList = models
//       .split(",")
//       .map(m => m.trim().toLowerCase())
//       .filter(Boolean)

//     const rows = await fetchTOFU(
//       propertyId,
//       start,
//       end,
//       modelList,
//       "TREND"
//     )

//     const result: any = {}

//     for (const row of rows) {

//       const dateRaw = row.dimensionValues?.[0]?.value
//       const modelRaw = row.dimensionValues?.[1]?.value

//       const users = Number(row.metricValues?.[0]?.value || 0)

//       if (!dateRaw || !modelRaw) continue

//       const date =
//         dateRaw.slice(0,4)+"-"+dateRaw.slice(4,6)+"-"+dateRaw.slice(6,8)

//       /* resolve variant → parent */

//       const parentModel = resolveParentModel(modelRaw)

//       if (!result[date]) result[date] = { date }

//       result[date][parentModel] =
//         (result[date][parentModel] || 0) + users

//     }

//     const data = Object.values(result).sort(
//       (a: any, b: any) =>
//         new Date(a.date).getTime() -
//         new Date(b.date).getTime()
//     )

//     return NextResponse.json({
//       success:true,
//       data
//     })

//   } catch (error) {

//     console.error("Trend error",error)

//     return NextResponse.json({
//       success:false,
//       data:[]
//     })

//   }

// }














import { NextRequest, NextResponse } from "next/server"
import { fetchTOFU } from "@/services/ga4Service"
import modelMap from "@/lib/config/oem-model-map-real.json"

/* ----------------------------- */
/* BUILD VARIANT → PARENT MAP */
/* ----------------------------- */

const variantToParent: Record<string, string> = {}

const oems = modelMap.platforms.cardekho.oems

for (const oemKey in oems) {

  const models = oems[oemKey].models

  for (const modelKey in models) {

    const model = models[modelKey]

    const parent = model.label
      .toLowerCase()
      .replace(/\s+/g, "_")

    for (const variant of model.ga_model_names) {

      const key = variant
        .toLowerCase()
        .replace(/\d{4}-\d{4}/g, "")
        .trim()

      variantToParent[key] = parent
    }

  }

}

/* ----------------------------- */
/* NORMALIZE KEY */
/* ----------------------------- */

function normalizeKey(name: string) {

  return name
    .replace(/\d{4}-\d{4}/g, "")
    .trim()
    .toLowerCase()

}

/* ----------------------------- */
/* RESOLVE VARIANT → PARENT */
/* ----------------------------- */

function resolveParentModel(raw: string) {

  const normalized = normalizeKey(raw)

  if (variantToParent[normalized]) {
    return variantToParent[normalized]
  }

  return normalized.replace(/\s+/g, "_")
}

/* ----------------------------- */
/* API */
/* ----------------------------- */

export async function GET(req: NextRequest) {

  try {

    const propertyId = process.env.GA_PROPERTY_ID!

    const { searchParams } = new URL(req.url)

    const start = searchParams.get("start") || "7daysAgo"
    const end = searchParams.get("end") || "today"

    const models = searchParams.get("models") || ""

    const modelList = models
      .split(",")
      .map(m =>
        m
          .toLowerCase()
          .replace(/\s+/g, "_")
          .trim()
      )
      .filter(Boolean)

    const rows = await fetchTOFU(
      propertyId,
      start,
      end,
      modelList,
      "TREND"
    )

    const result: any = {}

    for (const row of rows) {

      const dateRaw = row.dimensionValues?.[0]?.value
      const modelRaw = row.dimensionValues?.[1]?.value

      const users = Number(row.metricValues?.[0]?.value || 0)

      if (!dateRaw || !modelRaw) continue

      const date =
        dateRaw.slice(0,4)+"-"+dateRaw.slice(4,6)+"-"+dateRaw.slice(6,8)

      const parentModel = resolveParentModel(modelRaw)

      /* ----------------------------- */
      /* FILTER ONLY SELECTED MODELS */
      /* ----------------------------- */

      if (modelList.length && !modelList.includes(parentModel)) {
        continue
      }

      if (!result[date]) result[date] = { date }

      result[date][parentModel] =
        (result[date][parentModel] || 0) + users

    }

    const data = Object.values(result).sort(
      (a: any, b: any) =>
        new Date(a.date).getTime() -
        new Date(b.date).getTime()
    )

    return NextResponse.json({
      success: true,
      data
    })

  } catch (error) {

    console.error("Trend error", error)

    return NextResponse.json({
      success: false,
      data: []
    })

  }

}