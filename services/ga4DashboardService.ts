import { getGA4Client } from "@/lib/ga4Client"

export async function fetchDashboardData(
  propertyId: string,
  startDate: string,
  endDate: string,
  models: string[]
) {

  const client = getGA4Client()

  const [response] = await client.runReport({

    property: `properties/${propertyId}`,

    dateRanges: [{ startDate, endDate }],

    dimensions: [
      { name: "date" },
      { name: "customEvent:modelName" },
      { name: "deviceCategory" },
      { name: "country" }
    ],

    metrics: [
      { name: "totalUsers" },
      { name: "screenPageViews" },
      { name: "averageSessionDuration" }
    ]

  })

  return response.rows || []

}