import { NextResponse } from "next/server"
import { BetaAnalyticsDataClient } from "@google-analytics/data"

const client = new BetaAnalyticsDataClient({
keyFilename: process.env.GA_KEY_FILE,
})

export async function GET() {

try {


const propertyId = process.env.GA_PROPERTY_ID!

const [response] = await client.runReport({
  property: `properties/${propertyId}`,

  dateRanges: [
    { startDate: "30daysAgo", endDate: "today" }
  ],

  dimensions: [
    { name: "deviceCategory" }
  ],

  metrics: [
    { name: "totalUsers" }
  ]
})

if (!response.rows) {
  return NextResponse.json({ success: true, data: [] })
}

const rows = response.rows.map((row: any) => ({
  device: row.dimensionValues?.[0]?.value,
  users: Number(row.metricValues?.[0]?.value)
}))

const total = rows.reduce((sum, r) => sum + r.users, 0)

const data = rows.map((r) => ({
  device: r.device,
  share: total ? Math.round((r.users / total) * 100) : 0
}))

return NextResponse.json({
  success: true,
  data
})

} catch (error) {

console.error("Device API error", error)

return NextResponse.json({
  success: false,
  data: []
})


}

}
