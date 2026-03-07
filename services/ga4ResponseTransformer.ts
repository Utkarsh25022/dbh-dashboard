type GA4Row = {
dimensionValues?: { value: string }[]
metricValues?: { value: string }[]
}

/* ------------------------------------------------ */
/* MODEL NORMALIZER */
/* Converts variants → parent model */
/* ------------------------------------------------ */

function normalizeModel(name: string) {

if (!name) return ""

return name
.toLowerCase()


/* remove year patterns */
.replace(/\d{4}-\d{4}/g, "")

/* remove EV variants */
.replace(/\bev\b.*$/i, "")

/* remove variant words */
.replace(/\bracer\b/i, "")
.replace(/\bmax\b/i, "")
.replace(/\bprime\b/i, "")
.replace(/\bn line\b/i, "")
.replace(/\bturbo\b/i, "")

/* normalize spacing */
.replace(/\s+/g, " ")
.trim()

/* convert to key */
.replace(/\s/g, "_")


}

/* ------------------------------------------------ */
/* GENERIC ROW TRANSFORMER */
/* ------------------------------------------------ */

export function transformGA4Rows(
rows: GA4Row[] = [],
dimensionKeys: string[],
metricKeys: string[]
) {

return rows.map((row) => {


const result: Record<string, any> = {}

dimensionKeys.forEach((key, index) => {
  result[key] =
    row.dimensionValues?.[index]?.value ?? null
})

metricKeys.forEach((key, index) => {
  result[key] =
    Number(row.metricValues?.[index]?.value ?? 0)
})

return result


})
}

/* ------------------------------------------------ */
/* TOFU */
/* ------------------------------------------------ */

export function transformTOFU(rows: GA4Row[]) {

return transformGA4Rows(
rows,
["modelName"],
["users", "pageViews"]
)
}

/* ------------------------------------------------ */
/* MOFU */
/* ------------------------------------------------ */

export function transformMOFU(rows: GA4Row[]) {

return transformGA4Rows(
rows,
["modelName"],
["pageViews"]
)
}

/* ------------------------------------------------ */
/* TREND (MOST IMPORTANT FIX) */
/* ------------------------------------------------ */

export function transformTrend(rows: GA4Row[]) {

if (!rows || rows.length === 0) return []

const dateMap: Record<string, any> = {}

rows.forEach((row) => {


const rawDate =
  row.dimensionValues?.[0]?.value

const rawModel =
  row.dimensionValues?.[1]?.value

const users =
  Number(row.metricValues?.[0]?.value || 0)

if (!rawDate || !rawModel) return

const date =
  `${rawDate.slice(0,4)}-${rawDate.slice(4,6)}-${rawDate.slice(6,8)}`

const modelKey =
  normalizeModel(rawModel)

if (!dateMap[date]) {
  dateMap[date] = { date }
}

/* accumulate users instead of overwrite */

dateMap[date][modelKey] =
  (dateMap[date][modelKey] || 0) + users


})

return Object.values(dateMap).sort(
(a: any, b: any) =>
new Date(a.date).getTime() -
new Date(b.date).getTime()
)
}

/* ------------------------------------------------ */
/* TRAFFIC SHARE */
/* ------------------------------------------------ */

export function transformTrafficShare(rows: GA4Row[]) {

const data =
transformGA4Rows(
rows,
["modelName"],
["users"]
)

const totals: Record<string, number> = {}

data.forEach((row) => {


const model =
  normalizeModel(row.modelName)

totals[model] =
  (totals[model] || 0) + row.users


})

const total =
Object.values(totals)
.reduce((a, b) => a + b, 0) || 1

return Object.entries(totals)
.map(([model, users]) => {


  const share =
    (users / total) * 100

  return {

    model,

    searchShare:
      Number(share.toFixed(2)),

    trafficShare:
      Number(share.toFixed(2)),

    pageViewsShare:
      Number(share.toFixed(2))

  }
})


}

/* ------------------------------------------------ */
/* COMPETITOR TABLE */
/* ------------------------------------------------ */

export function transformCompetitors(rows: GA4Row[]) {

const data =
transformGA4Rows(
rows,
["modelName"],
["users"]
)

const totals: Record<string, number> = {}

data.forEach((row) => {


const model =
  normalizeModel(row.modelName)

totals[model] =
  (totals[model] || 0) + row.users


})

const sorted =
Object.entries(totals)
.sort((a, b) => b[1] - a[1])

return sorted.map(([model], i) => ({


model,

trafficErosionRank: i + 1,

reverseTrafficErosionRank:
  sorted.length - i,

performance:
  i < 3
    ? "high"
    : i < 6
    ? "medium"
    : "low"


}))
}
