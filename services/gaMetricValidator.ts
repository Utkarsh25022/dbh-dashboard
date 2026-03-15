const VALID_METRICS = [
  "totalUsers",
  "screenPageViews",
  "sessions",
  "engagementRate",
  "averageSessionDuration",
  "views"
]

export function validateMetrics(metrics: { name: string }[]) {

  for (const metric of metrics) {

    if (!VALID_METRICS.includes(metric.name)) {

      throw new Error(
        `Invalid GA metric used: ${metric.name}`
      )

    }

  }

}