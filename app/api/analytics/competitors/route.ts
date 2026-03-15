import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

/* ----------------------------- */
/* NORMALIZE MODEL NAMES         */
/* ----------------------------- */

function normalize(str: string) {
  return str
    .toLowerCase()
    .replace(/[_-]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

export async function GET(req: Request) {

  const { searchParams } = new URL(req.url)
  const focus = searchParams.get("focus")

  if (!focus) {
    return NextResponse.json({ data: [] })
  }

  const focusNormalized = normalize(focus)

  /* ----------------------------- */
  /* LOAD JSON DATASETS            */
  /* ----------------------------- */

  const erosionPath = path.join(process.cwd(), "data/traffic_erosion.json")
  const reversePath = path.join(process.cwd(), "data/reverse_traffic_erosion.json")

  const erosion = JSON.parse(fs.readFileSync(erosionPath, "utf-8"))
  const reverse = JSON.parse(fs.readFileSync(reversePath, "utf-8"))

  /* ----------------------------- */
  /* BUILD REVERSE LOOKUP MAP      */
  /* key = focus|competitor        */
  /* ----------------------------- */

  const reverseMap = new Map<string, number>()

  reverse.forEach((r: any) => {

    const focusModel = normalize(r.focus)
    const competitorModel = normalize(r.competitor)

    const key = focusModel + "|" + competitorModel

    reverseMap.set(key, r.rank)
  })

  console.log(
    "Reverse map sample:",
    Array.from(reverseMap.entries()).slice(0, 5)
  )

  /* ----------------------------- */
  /* FILTER EROSION DATA           */
  /* ----------------------------- */

  let erosionRows = erosion.filter(
  (row: any) => normalize(row.focus) === focusNormalized
)

// if no rows found, flip direction
if (erosionRows.length === 0) {
  erosionRows = erosion
    .filter((row: any) => normalize(row.competitor) === focusNormalized)
    .map((row: any) => ({
      focus: row.competitor,
      competitor: row.focus,
      rank: row.rank
    }))
}
  /* ----------------------------- */
  /* BUILD FINAL RESULT            */
  /* ----------------------------- */

  const result = erosionRows.map((row: any) => {

    const competitor = normalize(row.competitor)

    // IMPORTANT: same order as map
    const reverseKey = focusNormalized + "|" + competitor

    const reverseRank = reverseMap.get(reverseKey) ?? null

    return {
      model: competitor,
      trafficErosionRank: row.rank,
      reverseErosionRank: reverseRank,
      performance: null
    }
  })

  /* ----------------------------- */
  /* DEBUG                         */
  /* ----------------------------- */

  console.log("Focus model:", focusNormalized)

  console.log(
    "Erosion rows sample:",
    erosionRows.slice(0, 5)
  )

  console.log(
    "Final result sample:",
    result.slice(0, 5)
  )

  /* ----------------------------- */
  /* RESPONSE                      */
  /* ----------------------------- */

  return NextResponse.json({
    focus: focusNormalized,
    data: result
  })
}