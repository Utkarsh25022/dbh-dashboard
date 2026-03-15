import { NextResponse } from "next/server"
import { getErosionByFocus } from "@/services/trafficErosionService"

export async function GET(req: Request) {

  const { searchParams } = new URL(req.url)

  const focus =
    (searchParams.get("focus") || "").toLowerCase()

  if (!focus) {
    return NextResponse.json({
      success: false,
      error: "Focus model required"
    })
  }

  const data = getErosionByFocus(focus)

  return NextResponse.json({
    success: true,
    data
  })
}