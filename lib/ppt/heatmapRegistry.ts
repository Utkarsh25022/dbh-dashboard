type HeatmapData = {
  title: string
  rows: string[]
  columns: string[]
  values: number[][]
}

let heatmaps: HeatmapData[] = []

/* ----------------------------- */
/* REGISTER HEATMAP */
/* ----------------------------- */

export function registerHeatmap(heatmap: HeatmapData) {

  const exists =
    heatmaps.some(h => h.title === heatmap.title)

  if (exists) return

  heatmaps.push(heatmap)

}
console.log("HEATMAPS:", heatmaps)

/* ----------------------------- */
/* GET HEATMAPS */
/* ----------------------------- */

export function getHeatmaps() {
  return heatmaps
}

/* ----------------------------- */
/* CLEAR AFTER EXPORT */
/* ----------------------------- */

export function clearHeatmaps() {
  heatmaps = []
}