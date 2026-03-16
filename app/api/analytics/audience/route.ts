import { NextRequest, NextResponse } from "next/server"
import { fetchAudience } from "@/services/ga4Service"

export async function GET(req: NextRequest) {

  const { searchParams } = new URL(req.url)

 const modelsParam =
  searchParams.get("models") || ""

const focusModel =
  modelsParam.split(",")[0]   // only first model

const models = focusModel
  ? [focusModel.toLowerCase().replace(/\s+/g,"_").trim()]
  : []

  const start = searchParams.get("start") || "28daysAgo"
  const end = searchParams.get("end") || "today"

  const propertyId = process.env.GA_PROPERTY_ID!

  /* ----------------------------- */
  /* FETCH DATA                    */
  /* ----------------------------- */

  const rows = await fetchAudience(
    propertyId,
    start,
    end,
    models
  )

  const genderMap: Record<string, number> = {}
  const ageMap: Record<string, number> = {}

  rows.forEach((row:any)=>{

    const gender = row.dimensionValues?.[0]?.value
    const age = row.dimensionValues?.[1]?.value
    const users = Number(row.metricValues?.[0]?.value || 0)

    const invalidValues = ["(not set)", "(other)", "unknown"]

if (
  gender &&
  !invalidValues.includes(gender.toLowerCase())
) {
  genderMap[gender] = (genderMap[gender] || 0) + users
}

if (
  age &&
  !invalidValues.includes(age.toLowerCase())
) {
  ageMap[age] = (ageMap[age] || 0) + users
}

  })

  const gender = Object.entries(genderMap).map(
    ([gender, users]) => ({
      gender,
      users
    })
  )

  const age = Object.entries(ageMap).map(
    ([age, users]) => ({
      age,
      users
    })
  )

  return NextResponse.json({
    gender,
    age
  })
}