// import { BetaAnalyticsDataClient } from "@google-analytics/data"

// const analyticsDataClient = new BetaAnalyticsDataClient({
//   keyFilename: process.env.GA_KEY_FILE
// })

// export async function fetchReverseErosion(
//   propertyId: string,
//   startDate: string,
//   endDate: string,
//   focusModel: string,
//   competitors: string[]
// ) {

//   try {

//     /* ------------------------------- */
//     /* STEP 1 — GET FOCUS USERS        */
//     /* ------------------------------- */

//     const [focusReport]: any = await analyticsDataClient.runReport({
//       property: `properties/${propertyId}`,
//       dateRanges: [{ startDate, endDate }],
//       dimensions: [{ name: "customEvent:modelName" }],
//       metrics: [{ name: "totalUsers" }],
//       dimensionFilter: {
//         filter: {
//           fieldName: "customEvent:modelName",
//           stringFilter: {
//             matchType: "FULL_REGEXP",
//             value: `(?i).*${focusModel}.*`,
//             caseSensitive: false
//           }
//         }
//       }
//     } as any)

//     const focusUsers =
//       Number(focusReport?.rows?.[0]?.metricValues?.[0]?.value || 0)

//     console.log("FOCUS USERS:", focusUsers)

//     if (!focusUsers) {
//       console.log("No focus users found")
//       return competitors.map(c => ({
//         competitor: c,
//         erosion: 0
//       }))
//     }

//     /* ------------------------------- */
//     /* STEP 2 — SEGMENT QUERY          */
//     /* ------------------------------- */

//     const [segmentReport]: any = await analyticsDataClient.runReport({

//       property: `properties/${propertyId}`,

//       dateRanges: [{ startDate, endDate }],

//       dimensions: [
//         { name: "customEvent:modelName" }
//       ],

//       metrics: [
//         { name: "totalUsers" }
//       ],

//       segments: [
//         {
//           userSegment: {
//             segmentFilters: [
//               {
//                 simpleSegment: {
//                   orFiltersForSegment: [
//                     {
//                       segmentFilterClauses: [
//                         {
//                           dimensionFilter: {
//                             filter: {
//                               fieldName: "customEvent:modelName",
//                               stringFilter: {
//                                 matchType: "FULL_REGEXP",
//                                 value: `(?i).*${focusModel}.*`,
//                                 caseSensitive: false
//                               }
//                             }
//                           }
//                         }
//                       ]
//                     }
//                   ]
//                 }
//               }
//             ]
//           }
//         }
//       ],

//       /* competitor filter */

//       dimensionFilter: {
//         filter: {
//           fieldName: "customEvent:modelName",
//           stringFilter: {
//             matchType: "FULL_REGEXP",
//             value: competitors.map(c => `(?i).*${c}.*`).join("|"),
//             caseSensitive: false
//           }
//         }
//       },

//       limit: 20000

//     } as any)

//     /* DEBUG: show raw GA rows */

//     console.log(
//       "SEGMENT ROWS SAMPLE:",
//       segmentReport?.rows?.slice(0,10)
//     )

//     /* ------------------------------- */
//     /* STEP 3 — BUILD MAP              */
//     /* ------------------------------- */

//     const competitorMap: Record<string, number> = {}

//     segmentReport?.rows?.forEach((row: any) => {

//       const rawModel =
//         row.dimensionValues?.[0]?.value?.toLowerCase() || ""

//       const users =
//         Number(row.metricValues?.[0]?.value || 0)

//       competitors.forEach(comp => {

//         if (rawModel.includes(comp.toLowerCase())) {
//           competitorMap[comp] = users
//         }

//       })

//     })

//     console.log("COMPETITOR MAP:", competitorMap)

//     /* ------------------------------- */
//     /* STEP 4 — CALCULATE EROSION      */
//     /* ------------------------------- */

//     const result = competitors.map(comp => {

//       const overlapUsers = competitorMap[comp] || 0

//       return {
//         competitor: comp,
//         erosion: Number(((overlapUsers / focusUsers) * 100).toFixed(2))
//       }

//     })

//     console.log("EROSION RESULT:", result)

//     return result

//   } catch (error) {

//     console.error("GA Reverse Erosion Error:", error)

//     return []

//   }

// }


import { BetaAnalyticsDataClient } from "@google-analytics/data"

const analyticsDataClient = new BetaAnalyticsDataClient({
  keyFilename: process.env.GA_KEY_FILE
})

export async function fetchReverseErosion(
  propertyId: string,
  startDate: string,
  endDate: string,
  focusModel: string,
  competitors: string[]
) {

  try {

    /* ------------------------------- */
    /* STEP 1 — GET FOCUS USERS        */
    /* ------------------------------- */

    const [focusReport]: any = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate, endDate }],
      dimensions: [{ name: "customEvent:modelName" }],
      metrics: [{ name: "totalUsers" }],
      dimensionFilter: {
        filter: {
          fieldName: "customEvent:modelName",
          stringFilter: {
            matchType: "FULL_REGEXP",
            value: `(?i).*${focusModel}.*`,
            caseSensitive: false
          }
        }
      }
    } as any)

    const focusUsers =
      Number(focusReport?.rows?.[0]?.metricValues?.[0]?.value || 0)



    if (!focusUsers) {
      console.log("No focus users found")
      return competitors.map(c => ({
        competitor: c,
        erosion: 0
      }))
    }

    /* ------------------------------- */
    /* STEP 2 — SEGMENT QUERY          */
    /* ------------------------------- */

    const [segmentReport]: any = await analyticsDataClient.runReport({

      property: `properties/${propertyId}`,

      dateRanges: [{ startDate, endDate }],

      dimensions: [
        { name: "customEvent:modelName" }
      ],

      metrics: [
        { name: "totalUsers" }
      ],

      segments: [
        {
          userSegment: {
            segmentFilters: [
              {
                simpleSegment: {
                  orFiltersForSegment: [
                    {
                      segmentFilterClauses: [
                        {
                          dimensionFilter: {
                            filter: {
                              fieldName: "customEvent:modelName",
                              stringFilter: {
                                matchType: "FULL_REGEXP",
                                value: `(?i).*${focusModel}.*`,
                                caseSensitive: false
                              }
                            }
                          }
                        }
                      ]
                    }
                  ]
                }
              }
            ]
          }
        }
      ],

      /* competitor filter */

      dimensionFilter: {
        filter: {
          fieldName: "customEvent:modelName",
          stringFilter: {
            matchType: "FULL_REGEXP",
            value: competitors.map(c => `(?i).*${c}.*`).join("|"),
            caseSensitive: false
          }
        }
      },

      limit: 2000

    } as any)

    /* DEBUG: show raw GA rows */

    console.log(
  "SEGMENT ROWS SAMPLE:",
  segmentReport?.rows?.slice(0,10).map((r:any)=>({
    model: r.dimensionValues?.[0]?.value,
    users: r.metricValues?.[0]?.value
  }))
)

    /* ------------------------------- */
    /* EXTRA DEBUG QUERY               */
    /* ------------------------------- */

    const [allModelReport]: any = await analyticsDataClient.runReport({

      property: `properties/${propertyId}`,

      dateRanges: [{ startDate, endDate }],

      dimensions: [
        { name: "customEvent:modelName" }
      ],

      metrics: [
        { name: "totalUsers" }
      ],

      limit: 2000

    } as any)

    console.log(
  "ALL MODEL SAMPLE:",
  allModelReport?.rows?.slice(0,10).map((r:any)=>({
    model: r.dimensionValues?.[0]?.value,
    users: r.metricValues?.[0]?.value
  }))
)

    /* ------------------------------- */
    /* STEP 3 — BUILD MAP              */
    /* ------------------------------- */

    const competitorMap: Record<string, number> = {}

    segmentReport?.rows?.forEach((row: any) => {

      const rawModel =
        row.dimensionValues?.[0]?.value?.toLowerCase() || ""

      const users =
        Number(row.metricValues?.[0]?.value || 0)

      competitors.forEach(comp => {

        if (rawModel.includes(comp.toLowerCase())) {

  competitorMap[comp] =
    (competitorMap[comp] || 0) + users

}

      })

    })

    

    /* ------------------------------- */
    /* STEP 4 — CALCULATE EROSION      */
    /* ------------------------------- */

    const result = competitors.map(comp => {

      const overlapUsers = competitorMap[comp] || 0

      return {
        competitor: comp,
        erosion: Number(((overlapUsers / focusUsers) * 100).toFixed(2))
      }

    })

    

    return result

  } catch (error) {

    console.error("GA Reverse Erosion Error:", error)

    return []

  }

}