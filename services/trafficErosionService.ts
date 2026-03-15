import fs from "fs"
import path from "path"

const filePath = path.join(process.cwd(), "data/traffic_erosion.json")

let erosionData: any[] = []

export function loadTrafficErosion() {

  if (erosionData.length === 0) {

    const raw = fs.readFileSync(filePath, "utf-8")

    erosionData = JSON.parse(raw)

    console.log("Traffic erosion dataset loaded:", erosionData.length)
  }

  return erosionData
}

export function getErosionByFocus(focus: string) {

  const data = loadTrafficErosion()

  return data
    .filter(d => d.focus === focus.toLowerCase())
    .sort((a, b) => a.rank - b.rank)
}