import { NextRequest, NextResponse } from "next/server"
import { BetaAnalyticsDataClient } from "@google-analytics/data"

const client = new BetaAnalyticsDataClient({
  keyFilename: process.env.GA_KEY_FILE,
})

export async function GET(req: NextRequest) {

  try {

    const propertyId = process.env.GA_PROPERTY_ID!

    const { searchParams } = new URL(req.url)

    const start = searchParams.get("start") || "30daysAgo"
    const end = searchParams.get("end") || "today"
    const models = searchParams.get("models") || ""

    /* ----------------------------- */
    /* BUILD MODEL REGEX */
    /* ----------------------------- */

    const modelRegex = models
      .split(",")
      .map(m =>
        `.*${m
          .toLowerCase()
          .trim()
          .replace(/\s+/g, "[-/]*")}.*`
      )
      .join("|")

    /* ----------------------------- */
    /* GA4 REPORT */
    /* ----------------------------- */

    const [response] = await client.runReport({

      property: `properties/${propertyId}`,

      dateRanges: [
        { startDate: start, endDate: end }
      ],

      dimensions: [
        { name: "region" }
      ],

      metrics: [
        { name: "totalUsers" }
      ],

      dimensionFilter: modelRegex
        ? {
            filter: {
              fieldName: "pagePath",
              stringFilter: {
                matchType: "FULL_REGEXP",
                value: modelRegex
              }
            }
          }
        : undefined,

      orderBys: [
        {
          metric: { metricName: "totalUsers" },
          desc: true
        }
      ],

      limit: 10

    })

    if (!response.rows) {
      return NextResponse.json({
        success: true,
        data: []
      })
    }

    /* ----------------------------- */
    /* FORMAT RESPONSE */
    /* ----------------------------- */

    const data = response.rows.map((row: any) => {

      const state =
        row.dimensionValues?.[0]?.value || "Unknown"

      const visits =
        Number(row.metricValues?.[0]?.value || 0)

      return {
        state,
        visits
      }

    })

    return NextResponse.json({
      success: true,
      data
    })

  } catch (error) {

    console.error("Geo API error:", error)

    return NextResponse.json({
      success: false,
      data: []
    })

  }

}