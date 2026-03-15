import { NextResponse } from "next/server"
import { fetchReverseErosion } from "@/services/ga4ReverseErosion"

export async function GET(req: Request) {

  const { searchParams } = new URL(req.url)

  const start = searchParams.get("start") || "2024-01-01"
  const end = searchParams.get("end") || "today"

  const focus =
    (searchParams.get("focus") || "").trim().toLowerCase()

  const competitors =
    searchParams
      .get("competitors")
      ?.split(",")
      .map(c => c.trim().toLowerCase())
      .filter(Boolean) || []

  if (!focus) {
    return NextResponse.json({
      success: false,
      error: "Focus model is required"
    })
  }

  try {

    const data = await fetchReverseErosion(
      process.env.GA_PROPERTY_ID!,
      start,
      end,
      focus,
      competitors
    )
    console.log("EROSION RESULT:", data)

    return NextResponse.json({
      success: true,
      data
    })

  } catch (error) {

    console.error("Reverse erosion API error:", error)

    return NextResponse.json({
      success: false,
      error: String(error)
    })

  }
}