import { BetaAnalyticsDataClient } from "@google-analytics/data"

let client: BetaAnalyticsDataClient | null = null

export function getGA4Client() {

  if (client) return client

  client = new BetaAnalyticsDataClient({
    credentials: {
      client_email: process.env.GA_CLIENT_EMAIL,
      private_key: process.env.GA_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }
  })

  return client
}