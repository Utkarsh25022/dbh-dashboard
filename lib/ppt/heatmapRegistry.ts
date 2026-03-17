type HeatmapData = {
  title: string
  rows: string[]
  columns: string[]
  values: number[][]
  createdAt: number
}

let heatmaps: HeatmapData[] = []

/* ----------------------------- */
/* REGISTER HEATMAP */
/* ----------------------------- */

export function registerHeatmap(
  heatmap: Omit<HeatmapData, "createdAt">
) {

  const newHeatmap: HeatmapData = {
    ...heatmap,
    createdAt: Date.now()
  }

  // remove existing heatmap with same title
  heatmaps = heatmaps.filter(h => h.title !== heatmap.title)

  // add new one
  heatmaps.push(newHeatmap)

  // keep only latest 4
  heatmaps = heatmaps
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, 4)

 

}

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