



import { NextRequest, NextResponse } from "next/server"
import { BetaAnalyticsDataClient } from "@google-analytics/data"
import modelMap from "@/lib/config/oem-model-map-real.json"

const client = new BetaAnalyticsDataClient({
  keyFilename: process.env.GA_KEY_FILE,
})

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

    /* ----------------------------- */
    /* GA4 TREND QUERY */
    /* ----------------------------- */

    const [response] = await client.runReport({

      property: `properties/${propertyId}`,

      dateRanges: [
        { startDate: start, endDate: end }
      ],

      dimensions: [
        { name: "date" },
        { name: "customEvent:modelName" }
      ],

      metrics: [
        { name: "totalUsers" }
      ],

      limit: 20000

    })

    if (!response.rows) {
      return NextResponse.json({
        success: true,
        data: []
      })
    }

    const result: any = {}

    for (const row of response.rows) {

    const dateRaw = row.dimensionValues?.[0]?.value
    const modelRaw = row.dimensionValues?.[1]?.value

    if (!dateRaw || !modelRaw) continue
    if (modelRaw === "(not set)") continue
    if (modelRaw === "(other)") continue

    const views = Number(row.metricValues?.[0]?.value || 0)

  

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
        (result[date][parentModel] || 0) + views

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





