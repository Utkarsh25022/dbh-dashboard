type ChartData = {
  title: string
  labels: string[]
  values: number[]
}

type TrendChartData = {
  title: string
  labels: string[]
  series: {
    name: string
    values: number[]
  }[]
}

let charts: ChartData[] = []
let trendChart: TrendChartData | undefined

/* ----------------------------- */
/* REGISTER NORMAL CHART */
/* ----------------------------- */

export function registerChart(chart: ChartData) {
  charts.push(chart)
}

/* ----------------------------- */
/* REGISTER TREND CHART */
/* ----------------------------- */

export function registerTrendChart(chart: TrendChartData) {
  trendChart = chart
}

/* ----------------------------- */
/* GET ALL CHARTS */
/* ----------------------------- */

export function getCharts() {
  return charts
}

/* ----------------------------- */
/* GET TREND */
/* ----------------------------- */

export function getTrendChart() {
  return trendChart
}

/* ----------------------------- */
/* CLEAR AFTER EXPORT */
/* ----------------------------- */

export function clearCharts() {
  charts = []
  trendChart = undefined
}