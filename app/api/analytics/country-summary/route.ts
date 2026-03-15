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

    /* ----------------------------- */
/* FOCUS MODEL ONLY */
/* ----------------------------- */

  const focusModel =
  models.split(",")[0]
    ?.toLowerCase()
    .trim() || ""

  const modelRegex =
  focusModel.replace(/\s+/g, ".*")

    /* ----------------------------- */
    /* BUILD FILTERS (SOP LOGIC) */
    /* ----------------------------- */

    const filters: any[] = []

    /* HOSTNAME FILTER */

    filters.push({
      filter: {
        fieldName: "hostName",
        stringFilter: {
          matchType: "PARTIAL_REGEXP",
          value: "www.cardekho|hindi.cardekho|tamil.cardekho|telugu.cardekho|kannada.cardekho|malayalam.cardekho|ai.cardekho"
        }
      }
    })

    /* MODEL FILTER (GA DIMENSION) */

    if (modelRegex) {
      filters.push({
        filter: {
          fieldName: "customEvent:modelName",
          stringFilter: {
            matchType: "FULL_REGEXP",
            value: modelRegex
          }
        }
      })
    }

    /* REMOVE USED PAGES */

    filters.push({
      notExpression: {
        filter: {
          fieldName: "pagePathPlusQueryString",
          stringFilter: {
            matchType: "CONTAINS",
            value: "used"
          }
        }
      }
    })

    /* REMOVE VIRTUAL PAGES */

    filters.push({
      notExpression: {
        filter: {
          fieldName: "pagePathPlusQueryString",
          stringFilter: {
            matchType: "CONTAINS",
            value: "virtual"
          }
        }
      }
    })

    /* ----------------------------- */
    /* GA4 REPORT */
    /* ----------------------------- */

    const [response] = await client.runReport({

      property: `properties/${propertyId}`,

      dateRanges: [
        { startDate: start, endDate: end }
      ],

      dimensions: [
        { name: "region" },
        { name: "city" }
      ],

      metrics: [
        { name: "totalUsers" }
      ],

      dimensionFilter: {
        andGroup: {
          expressions: filters
        }
      },

      orderBys: [
        {
          metric: {
            metricName: "totalUsers"
          },
          desc: true
        }
      ],

      limit: 10000

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

      const city =
        row.dimensionValues?.[1]?.value || "Unknown"

      const visits =
        Number(row.metricValues?.[0]?.value || 0)

      return {
        state,
        city,
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