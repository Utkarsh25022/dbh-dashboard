// // type GA4Row = {
// //   dimensionValues?: { value: string }[]
// //   metricValues?: { value: string }[]
// // }

// // export function transformHeatmap(rows: GA4Row[], metric: string) {

// //   const monthSet = new Set<string>()

// //   const modelUsers: Record<string, Record<string, number>> = {}
// //   const modelPV: Record<string, Record<string, number>> = {}

// //   const monthUserTotals: Record<string, number> = {}
// //   const monthPVTotals: Record<string, number> = {}

// //   rows.forEach(row => {

// //     const month = row.dimensionValues?.[0]?.value
// //     const model = row.dimensionValues?.[1]?.value

// //     if (!month || !model) return

// //     monthSet.add(month)

// //     const users = Number(row.metricValues?.[0]?.value || 0)
// //     const pv = Number(row.metricValues?.[1]?.value || 0)

// //     if (!modelUsers[model]) modelUsers[model] = {}
// //     if (!modelPV[model]) modelPV[model] = {}

// //     modelUsers[model][month] =
// //       (modelUsers[model][month] || 0) + users

// //     modelPV[model][month] =
// //       (modelPV[model][month] || 0) + pv

// //     monthUserTotals[month] =
// //       (monthUserTotals[month] || 0) + users

// //     monthPVTotals[month] =
// //       (monthPVTotals[month] || 0) + pv
// //   })

// //   const months = Array.from(monthSet).sort()

// //   const resultRows = Object.keys(modelUsers).map(model => ({

// //     model,

// //     values: months.map(month => {

// //       const users = modelUsers[model][month] || 0
// //       const pv = modelPV[model][month] || 0

// //       if (metric === "traffic") {
// //         const total = monthUserTotals[month] || 1
// //         return Number(((users / total) * 100).toFixed(1))
// //       }

// //       if (metric === "mofu") {
// //         const total = monthPVTotals[month] || 1
// //         return Number(((pv / total) * 100).toFixed(1))
// //       }

// //       if (metric === "pv") {
// //         return users ? Number((pv / users).toFixed(2)) : 0
// //       }

// //       return 0
// //     })

// //   }))

// //   return {
// //     months,
// //     rows: resultRows
// //   }
// // }




// type GA4Row = {
//   dimensionValues?: { value: string }[]
//   metricValues?: { value: string }[]
// }

// export function transformHeatmap(
//   rows: GA4Row[],
//   metric: string,
//   selectedModels: string[] = []
// ) {

//   /* ----------------------------- */
//   /* NORMALIZE SELECTED MODELS     */
//   /* ----------------------------- */

//   const normalizedModels = selectedModels.map(m =>
//     m.toLowerCase().replace(/[\s-]+/g, "_").trim()
//   )

//   const monthSet = new Set<string>()

//   const modelUsers: Record<string, Record<string, number>> = {}
//   const modelPV: Record<string, Record<string, number>> = {}

//   const monthUserTotals: Record<string, number> = {}
//   const monthPVTotals: Record<string, number> = {}

//   rows.forEach(row => {

//     const month = row.dimensionValues?.[0]?.value
//     let model: string | undefined = row.dimensionValues?.[1]?.value

//     if (!month || !model) return
    

//     /* ----------------------------- */
//     /* NORMALIZE MODEL NAME          */
//     /* ----------------------------- */

//     model = model
//       .toLowerCase()
//       .replace(/[\s-]+/g, "_")
//       .trim()
    

//     const parentMatch = normalizedModels.find(parent =>
//       model.startsWith(parent)
//     )

//     if (parentMatch) {
//     model = parentMatch
//     } 

//     /* REMOVE INVALID MODELS */

//     if (model === "(not_set)") return
//     if (/^\d+$/.test(model)) return

//     /* ----------------------------- */
//     /* FILTER SELECTED MODELS        */
//     /* ----------------------------- */

//     if (
//       normalizedModels.length > 0 &&
//       !normalizedModels.includes(model)
//     ) {
//       return
//     }

//     monthSet.add(month)

//     const users = Number(row.metricValues?.[0]?.value || 0)
//     const pv = Number(row.metricValues?.[1]?.value || 0)

//     if (!modelUsers[model]) modelUsers[model] = {}
//     if (!modelPV[model]) modelPV[model] = {}

//     modelUsers[model][month] =
//       (modelUsers[model][month] || 0) + users

//     modelPV[model][month] =
//       (modelPV[model][month] || 0) + pv

//     monthUserTotals[month] =
//       (monthUserTotals[month] || 0) + users

//     monthPVTotals[month] =
//       (monthPVTotals[month] || 0) + pv
//   })

//   const months = Array.from(monthSet).sort()

//   const resultRows = Object.keys(modelUsers).map(model => ({
//     model,
//     values: months.map(month => {

//       const users = modelUsers[model][month] || 0
//       const pv = modelPV[model][month] || 0

//       if (metric === "traffic") {
//         const total = monthUserTotals[month] || 1
//         return Number(((users / total) * 100).toFixed(1))
//       }

//       if (metric === "mofu") {
//         const total = monthPVTotals[month] || 1
//         return Number(((pv / total) * 100).toFixed(1))
//       }

//       if (metric === "pv") {
//         return users ? Number((pv / users).toFixed(2)) : 0
//       }

//       return 0
//     })
//   }))

//   return {
//     months,
//     rows: resultRows
//   }
// }









import { normalizeModel } from "@/lib/model-normalizer"



type GA4Row = {
  dimensionValues?: { value: string }[]
  metricValues?: { value: string }[]
}

export function transformHeatmap(
  rows: GA4Row[],
  metric: string,
  selectedModels: string[] = []
) {

  const normalizedModels = selectedModels.map(m =>
    m.toLowerCase().replace(/[\s-]+/g, "_").trim()
  )

  const monthSet = new Set<string>()

  const modelUsers: Record<string, Record<string, number>> = {}
  const modelPV: Record<string, Record<string, number>> = {}

  const monthUserTotals: Record<string, number> = {}
  const monthPVTotals: Record<string, number> = {}

  /* ----------------------------- */
  /* FIRST PASS → MONTH TOTALS     */
  /* ----------------------------- */

  rows.forEach(row => {

    const month = row.dimensionValues?.[0]?.value
    let model = row.dimensionValues?.[1]?.value

    if (!month || !model) return

    model = normalizeModel(model)

    if (model === "(not_set)") return
    if (/^\d+$/.test(model)) return

    const users = Number(row.metricValues?.[0]?.value || 0)
    const pv = Number(row.metricValues?.[1]?.value || 0)

    monthUserTotals[month] =
      (monthUserTotals[month] || 0) + users

    monthPVTotals[month] =
      (monthPVTotals[month] || 0) + pv
  })

  /* ----------------------------- */
  /* SECOND PASS → MODEL DATA      */
  /* ----------------------------- */

  rows.forEach(row => {

    const month = row.dimensionValues?.[0]?.value
    let model: string | undefined = row.dimensionValues?.[1]?.value

    if (!month || !model) return

    model = model
      .toLowerCase()
      .replace(/[\s-]+/g, "_")
      .trim()

    const parentMatch = normalizedModels.find(parent =>
      model.startsWith(parent)
    )

    if (parentMatch) {
      model = parentMatch
    }

    if (model === "(not_set)") return
    if (/^\d+$/.test(model)) return

    if (
      normalizedModels.length > 0 &&
      !normalizedModels.includes(model)
    ) {
      return
    }

    monthSet.add(month)

    const users = Number(row.metricValues?.[0]?.value || 0)
    const pv = Number(row.metricValues?.[1]?.value || 0)

    if (!modelUsers[model]) modelUsers[model] = {}
    if (!modelPV[model]) modelPV[model] = {}

    modelUsers[model][month] =
      (modelUsers[model][month] || 0) + users

    modelPV[model][month] =
      (modelPV[model][month] || 0) + pv
  })

  const months = Array.from(monthSet).sort((a,b)=>Number(a)-Number(b))

  const resultRows = Object.keys(modelUsers).map(model => ({
    model,
    values: months.map(month => {

      const users = modelUsers[model][month] || 0
      const pv = modelPV[model][month] || 0

      if (metric === "traffic") {
        const total = monthUserTotals[month] || 1
        return Number(((users / total) * 100).toFixed(1))
      }

      if (metric === "mofu") {
        const total = monthPVTotals[month] || 1
        return Number(((pv / total) * 100).toFixed(1))
      }

      if (metric === "pv") {
        return users ? Number((pv / users).toFixed(2)) : 0
      }

      return 0
    })
  }))

  return {
    months,
    rows: resultRows
  }
}