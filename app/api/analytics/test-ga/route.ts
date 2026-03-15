import { NextResponse } from "next/server"
import { BetaAnalyticsDataClient } from "@google-analytics/data"

const client = new BetaAnalyticsDataClient({
  keyFilename: process.env.GA_KEY_FILE
})

export async function GET() {

  const propertyId = process.env.GA_PROPERTY_ID!

  const request = {

    property: `properties/${propertyId}`,

    dateRanges: [
      {
        startDate: "2026-02-09",
        endDate: "2026-03-08"
      }
    ],

    metrics: [
      { name: "screenPageViews" },
      { name: "totalUsers" }
    ]

  }

  const [response]: any = await client.runReport(request)

  return NextResponse.json(response)

}