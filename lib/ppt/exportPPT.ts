// // import PptxGenJS from "pptxgenjs"

// // export interface ChartData {
// //   title: string
// //   labels: string[]
// //   values: number[]
// // }

// // export interface LineChartData {
// //   title: string
// //   labels: string[]
// //   series: {
// //     name: string
// //     values: number[]
// //   }[]
// // }

// // export interface PPTPayload {
// //   dateRange: string
// //   models: string[]
// //   trendChart?: LineChartData
// //   charts: ChartData[]
// // }

// // export async function generatePPT(payload: PPTPayload) {

// //   const pptx = new PptxGenJS()
// //   pptx.layout = "LAYOUT_16x9"

// //   /* CHART COLOR PALETTE */

// //   const COLORS = [
// //     "2563EB", // blue
// //     "14B8A6", // teal
// //     "7C3AED", // purple
// //     "F59E0B", // amber
// //     "64748B"  // slate
// //   ]

// //   /* -------------------- */
// //   /* TEMPLATE */
// //   /* -------------------- */

// //   function applyTemplate(slide: PptxGenJS.Slide) {

// //     slide.addImage({
// //       path: "public/cardekho-ppt-logo.png",
// //       x: 0.8,
// //       y: 0.3,
// //       w: 1.8
// //     })

// //   }

// //   /* -------------------- */
// //   /* TITLE SLIDE */
// //   /* -------------------- */

// //   const cover = pptx.addSlide()

// //   applyTemplate(cover)

// //   cover.addText("Digital Brand Health Report", {
// //     x: 1,
// //     y: 2.5,
// //     fontSize: 36,
// //     bold: true
// //   })

// //   cover.addText(`Models: ${payload.models.join(", ")}`, {
// //     x: 1,
// //     y: 4,
// //     fontSize: 18
// //   })

// //   cover.addText(`Date Range: ${payload.dateRange}`, {
// //     x: 1,
// //     y: 4.6,
// //     fontSize: 18
// //   })

// //   /* -------------------- */
// //   /* TREND CHART */
// //   /* -------------------- */

// //   if (payload.trendChart) {

// //     const slide = pptx.addSlide()
// //     applyTemplate(slide)

// //     slide.addText(payload.trendChart.title, {
// //       x: 0.8,
// //       y: 0.9,
// //       fontSize: 24,
// //       bold: true
// //     })

// //     const reducedLabels =
// //       payload.trendChart.labels.filter((_, i) => i % 7 === 0)

// //     const reducedSeries =
// //       payload.trendChart.series.map(s => ({
// //         name: s.name,
// //         labels: reducedLabels,
// //         values: s.values.filter((_, i) => i % 7 === 0)
// //       }))

// //     slide.addChart(
// //       pptx.ChartType.line,
// //       reducedSeries,
// //       {
// //         x: 0.8,
// //         y: 1.6,
// //         w: 9,
// //         h: 4.2,

// //         showLegend: true,

// //         lineSize: 2,
// //         markerSize: 5,

// //         chartColors: COLORS,

// //         valAxisTitle: "Users",
// //         catAxisTitle: "Date",

// //         showDataLabels: false
// //       }
// //     )

// //   }

// //   /* -------------------- */
// //   /* OTHER CHARTS */
// //   /* -------------------- */

// //   payload.charts.forEach((chart, i) => {

// //     const slide = pptx.addSlide()

// //     applyTemplate(slide)

// //     slide.addText(chart.title, {
// //       x: 0.8,
// //       y: 0.9,
// //       fontSize: 24,
// //       bold: true
// //     })

// //     const chartType =
// //       i < 2
// //         ? pptx.ChartType.pie
// //         : pptx.ChartType.bar

// //     slide.addChart(
// //       chartType,
// //       [{
// //         name: chart.title,
// //         labels: chart.labels,
// //         values: chart.values
// //       }],
// //       {
// //         x: 0.8,
// //         y: 1.6,
// //         w: 9,
// //         h: 4.2,

// //         showLegend: true,

// //         chartColors: COLORS
// //       }
// //     )

// //   })

// //   await pptx.writeFile({
// //     fileName: "CarDekho_DBH_Report.pptx"
// //   })

// // }




// import PptxGenJS from "pptxgenjs"

// export interface ChartData {
//   title: string
//   labels: string[]
//   values: number[]
// }

// export interface LineChartData {
//   title: string
//   labels: string[]
//   series: {
//     name: string
//     values: number[]
//   }[]
// }

// export interface PPTPayload {
//   dateRange: string
//   models: string[]
//   trendChart?: LineChartData
//   charts: ChartData[]
// }

// export async function generatePPT(payload: PPTPayload) {

//   const pptx = new PptxGenJS()
//   pptx.layout = "LAYOUT_16x9"

//   const COLORS = [
//     "2563EB",
//     "14B8A6",
//     "7C3AED",
//     "F59E0B",
//     "64748B"
//   ]

//   function applyTemplate(slide: PptxGenJS.Slide) {

//     slide.addImage({
//       path: "/cardekho-ppt-logo.png",
//       x: 0.7,
//       y: 0.3,
//       w: 1.6
//     })

//   }

//   /* TITLE SLIDE */

//   const cover = pptx.addSlide()

//   applyTemplate(cover)

//   cover.addText("Digital Brand Health Report", {
//     x: 1,
//     y: 2.5,
//     fontSize: 34,
//     bold: true
//   })

//   cover.addText(`Models: ${payload.models.join(", ")}`, {
//     x: 1,
//     y: 4,
//     fontSize: 18
//   })

//   cover.addText(`Date Range: ${payload.dateRange}`, {
//     x: 1,
//     y: 4.6,
//     fontSize: 18
//   })

//   /* TREND CHART */

//   if (payload.trendChart) {

//     const slide = pptx.addSlide()

//     applyTemplate(slide)

//     slide.addText(payload.trendChart.title, {
//       x: 0.7,
//       y: 0.9,
//       fontSize: 24,
//       bold: true
//     })

//     const totalPoints = payload.trendChart.labels.length

//     const step = Math.ceil(totalPoints / 12)

//     const reducedLabels =
//       payload.trendChart.labels.filter((_, i) => i % step === 0)

//     const reducedSeries =
//       payload.trendChart.series.map(s => ({
//         name: s.name,
//         labels: reducedLabels,
//         values: s.values.filter((_, i) => i % step === 0)
//       }))

//     slide.addChart(
//       pptx.ChartType.line,
//       reducedSeries,
//       {
//         x: 0.7,
//         y: 1.6,
//         w: 8.3,
//         h: 3.8,

//         showLegend: true,

//         lineSize: 2.5,
//         markerSize: 6,

//         chartColors: COLORS,

//         valAxisTitle: "Users",
//         catAxisTitle: "Date"
//       }
//     )

//   }

//   /* OTHER CHARTS */

//   payload.charts.forEach((chart, i) => {

//     const slide = pptx.addSlide()

//     applyTemplate(slide)

//     slide.addText(chart.title, {
//       x: 0.7,
//       y: 0.9,
//       fontSize: 24,
//       bold: true
//     })

//     const chartType =
//       i < 2
//         ? pptx.ChartType.pie
//         : pptx.ChartType.bar

//     slide.addChart(
//       chartType,
//       [{
//         name: chart.title,
//         labels: chart.labels,
//         values: chart.values
//       }],
//       {
//         x: 0.7,
//         y: 1.6,
//         w: 8.3,
//         h: 3.8,

//         showLegend: true,

//         chartColors: COLORS
//       }
//     )

//   })

//   await pptx.writeFile({
//     fileName: "CarDekho_DBH_Report.pptx"
//   })

// }










import PptxGenJS from "pptxgenjs"

import {
  getCharts,
  getTrendChart,
  clearCharts
} from "@/lib/ppt/chartRegistry"

export interface PPTPayload {
  dateRange: string
  models: string[]
}

export async function generatePPT(payload: PPTPayload) {

  const pptx = new PptxGenJS()
  pptx.layout = "LAYOUT_16x9"

  const COLORS = [
    "2563EB",
    "14B8A6",
    "7C3AED",
    "F59E0B",
    "64748B"
  ]

  const charts = getCharts()
  const trendChart = getTrendChart()

  function applyTemplate(slide: PptxGenJS.Slide) {

    slide.addImage({
      path: "/cardekho-ppt-logo.png",
      x: 0.7,
      y: 0.3,
      w: 1.6
    })

  }

  /* ----------------------------- */
  /* TITLE SLIDE */
  /* ----------------------------- */

  const cover = pptx.addSlide()

  applyTemplate(cover)

  cover.addText("Digital Brand Health Report", {
    x: 1,
    y: 2.5,
    fontSize: 34,
    bold: true
  })

  cover.addText(`Models: ${payload.models.join(", ")}`, {
    x: 1,
    y: 4,
    fontSize: 18
  })

  cover.addText(`Date Range: ${payload.dateRange}`, {
    x: 1,
    y: 4.6,
    fontSize: 18
  })

  /* ----------------------------- */
  /* TREND CHART */
  /* ----------------------------- */

  if (trendChart) {

    const slide = pptx.addSlide()

    applyTemplate(slide)

    slide.addText(trendChart.title, {
      x: 0.7,
      y: 0.9,
      fontSize: 24,
      bold: true
    })

    slide.addChart(
      pptx.ChartType.line,
      trendChart.series.map((s) => ({
        name: s.name,
        labels: trendChart.labels,
        values: s.values
      })),
      {
        x: 0.7,
        y: 1.6,
        w: 8.3,
        h: 3.8,
        showLegend: true,
        lineSize: 2.5,
        markerSize: 6,
        chartColors: COLORS,
        valAxisTitle: "Users",
        catAxisTitle: "Date"
      }
    )

  }

  /* ----------------------------- */
  /* OTHER CHARTS */
  /* ----------------------------- */

  charts.forEach((chart, i) => {

    const slide = pptx.addSlide()

    applyTemplate(slide)

    slide.addText(chart.title, {
      x: 0.7,
      y: 0.9,
      fontSize: 24,
      bold: true
    })

    const chartType =
      chart.values.length <= 4
        ? pptx.ChartType.pie
        : pptx.ChartType.bar

    slide.addChart(
      chartType,
      [{
        name: chart.title,
        labels: chart.labels,
        values: chart.values
      }],
      {
        x: 0.7,
        y: 1.6,
        w: 8.3,
        h: 3.8,
        showLegend: true,
        chartColors: COLORS
      }
    )

  })

  await pptx.writeFile({
    fileName: "CarDekho_DBH_Report.pptx"
  })

  /* CLEAR REGISTRY AFTER EXPORT */

  clearCharts()
}