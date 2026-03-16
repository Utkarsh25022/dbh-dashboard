// // type GA4Row = {
// //   dimensionValues?: { value: string }[]
// //   metricValues?: { value: string }[]
// // }

// // /* ------------------------------------------------ */
// // /* MODEL NORMALIZER */
// // /* ------------------------------------------------ */

// // function normalizeModel(name: string) {

// //   if (!name) return ""

// //   return name
// //     .toLowerCase()

// //     /* remove year patterns */
// //     .replace(/\d{4}-\d{4}/g, "")

// //     /* remove EV variants */
// //     .replace(/\bev\b.*$/i, "")

// //     /* remove variant words */
// //     .replace(/\bracer\b/i, "")
// //     .replace(/\bmax\b/i, "")
// //     .replace(/\bprime\b/i, "")
// //     .replace(/\bn line\b/i, "")
// //     .replace(/\bturbo\b/i, "")

// //     /* normalize spacing */
// //     .replace(/\s+/g, " ")
// //     .trim()

// //     /* convert to key */
// //     .replace(/\s/g, "_")

// // }

// // /* ------------------------------------------------ */
// // /* GENERIC ROW TRANSFORMER */
// // /* ------------------------------------------------ */

// // export function transformGA4Rows(
// //   rows: GA4Row[] = [],
// //   dimensionKeys: string[],
// //   metricKeys: string[]
// // ) {

// //   return rows.map((row) => {

// //     const result: Record<string, any> = {}

// //     dimensionKeys.forEach((key, index) => {
// //       result[key] =
// //         row.dimensionValues?.[index]?.value ?? null
// //     })

// //     metricKeys.forEach((key, index) => {
// //       result[key] =
// //         Number(row.metricValues?.[index]?.value ?? 0)
// //     })

// //     return result

// //   })
// // }

// // /* ------------------------------------------------ */
// // /* TOFU */
// // /* ------------------------------------------------ */

// // export function transformTOFU(rows: GA4Row[]) {

// //   return transformGA4Rows(
// //     rows,
// //     ["modelName"],
// //     ["users", "pageViews"]
// //   )
// // }

// // /* ------------------------------------------------ */
// // /* MOFU */
// // /* ------------------------------------------------ */

// // export function transformMOFU(rows: GA4Row[]) {

// //   return transformGA4Rows(
// //     rows,
// //     ["modelName"],
// //     ["pageViews"]
// //   )
// // }

// // /* ------------------------------------------------ */
// // /* TREND */
// // /* ------------------------------------------------ */

// // export function transformTrend(rows: GA4Row[]) {

// //   if (!rows || rows.length === 0) return []

// //   const dateMap: Record<string, any> = {}

// //   rows.forEach((row) => {

// //     const rawDate =
// //       row.dimensionValues?.[0]?.value

// //     const rawModel =
// //       row.dimensionValues?.[1]?.value

// //     const pageViews =
// //       Number(row.metricValues?.[0]?.value || 0)

// //     if (!rawDate || !rawModel) return

// //     const date =
// //       `${rawDate.slice(0,4)}-${rawDate.slice(4,6)}-${rawDate.slice(6,8)}`

// //     const modelKey =
// //       normalizeModel(rawModel)

// //     if (!dateMap[date]) {
// //       dateMap[date] = { date }
// //     }

// //     dateMap[date][modelKey] =
// //       (dateMap[date][modelKey] || 0) + pageViews

// //   })

// //   return Object.values(dateMap).sort(
// //     (a: any, b: any) =>
// //       new Date(a.date).getTime() -
// //       new Date(b.date).getTime()
// //   )
// // }

// // /* ------------------------------------------------ */
// // /* TRAFFIC SHARE */
// // /* ------------------------------------------------ */

// // export function transformTrafficShare(rows: GA4Row[]) {

// //   const data =
// //     transformGA4Rows(
// //       rows,
// //       ["modelName"],
// //       ["users", "pageViews"]
// //     )

// //   const totals: Record<string, any> = {}

// //   data.forEach((row) => {

// //     const model =
// //       normalizeModel(row.modelName)

// //     if (!totals[model]) {
// //       totals[model] = { users: 0, pageViews: 0 }
// //     }

// //     totals[model].users += row.users
// //     totals[model].pageViews += row.pageViews

// //   })

// //   const totalUsers =
// //     Object.values(totals)
// //       .reduce((a: any, b: any) => a + b.users, 0) || 1

// //   const totalPageViews =
// //     Object.values(totals)
// //       .reduce((a: any, b: any) => a + b.pageViews, 0) || 1

// //   return Object.entries(totals).map(([model, data]: any) => {

// //     const trafficShare =
// //       (data.users / totalUsers) * 100

// //     const pageViewsShare =
// //       (data.pageViews / totalPageViews) * 100

// //     return {

// //       model,

// //       searchShare:
// //         Number(trafficShare.toFixed(2)),

// //       trafficShare:
// //         Number(trafficShare.toFixed(2)),

// //       pageViewsShare:
// //         Number(pageViewsShare.toFixed(2))

// //     }

// //   })

// // }

// // /* ------------------------------------------------ */
// // /* COMPETITOR TABLE */
// // /* ------------------------------------------------ */

// // export function transformCompetitors(rows: GA4Row[]) {

// //   const data =
// //     transformGA4Rows(
// //       rows,
// //       ["modelName"],
// //       ["users"]
// //     )

// //   const totals: Record<string, number> = {}

// //   data.forEach((row) => {

// //     const model =
// //       normalizeModel(row.modelName)

// //     totals[model] =
// //       (totals[model] || 0) + row.users

// //   })

// //   const sorted =
// //     Object.entries(totals)
// //       .sort((a, b) => b[1] - a[1])

// //   return sorted.map(([model], i) => ({

// //     model,

// //     trafficErosionRank: i + 1,

// //     reverseErosionRank:
// //       sorted.length - i,

// //     performance:
// //       i < 3
// //         ? "high"
// //         : i < 6
// //         ? "medium"
// //         : "low"

// //   }))

// // }

// // /* ------------------------------------------------ */
// // /* HEATMAP (MONTHLY MODEL SHARE) */
// // /* ------------------------------------------------ */

// // export function transformHeatmap(
// //   rows: GA4Row[],
// //   type: "traffic" | "pageviews" | "pvs" | "mofu"
// // ) {

// //   if (!rows || rows.length === 0) {
// //     return { months: [], rows: [] }
// //   }

// //   const monthSet = new Set<string>()
// //   const map: Record<string, any> = {}

// //   rows.forEach(row => {

// //     const rawMonth =
// //       row.dimensionValues?.[0]?.value

// //     const rawModel =
// //       row.dimensionValues?.[1]?.value

// //     const users =
// //       Number(row.metricValues?.[0]?.value || 0)

// //     const pageviews =
// //       Number(row.metricValues?.[1]?.value || 0)

// //     if (!rawMonth || !rawModel) return

// //     const month =
// //       `${rawMonth.slice(0,4)}-${rawMonth.slice(4,6)}`

// //     const model =
// //       normalizeModel(rawModel)

// //     monthSet.add(month)

// //     if (!map[model]) map[model] = {}

// //     if (!map[model][month]) {
// //       map[model][month] = {
// //         users: 0,
// //         pageviews: 0
// //       }
// //     }

// //     map[model][month].users += users
// //     map[model][month].pageviews += pageviews

// //   })

// //   const months =
// //     Array.from(monthSet).sort()

// //   /* TOTALS PER MONTH */

// //   const totals: Record<string, any> = {}

// //   months.forEach(month => {

// //     totals[month] = {
// //       users: 0,
// //       pageviews: 0
// //     }

// //     Object.values(map).forEach((m: any) => {

// //       totals[month].users +=
// //         m?.[month]?.users || 0

// //       totals[month].pageviews +=
// //         m?.[month]?.pageviews || 0

// //     })

// //   })

// //   const rowsOutput =
// //     Object.keys(map).map(model => ({

// //       model,

// //       values: months.map(month => {

// //         const users =
// //           map[model]?.[month]?.users || 0

// //         const pageviews =
// //           map[model]?.[month]?.pageviews || 0

// //         const totalUsers =
// //           totals[month].users || 1

// //         const totalPageviews =
// //           totals[month].pageviews || 1

// //         if (type === "traffic")
// //           return Number(
// //             ((users / totalUsers) * 100).toFixed(1)
// //           )

// //         if (type === "pageviews")
// //           return Number(
// //             ((pageviews / totalPageviews) * 100).toFixed(1)
// //           )

// //         if (type === "pvs") {

// //           if (!users) return 0

// //           const pvuu =
// //             pageviews / users

// //           return Number(pvuu.toFixed(2))
// //         }

// //         if (type === "mofu")
// //           return Number(
// //             ((users / totalUsers) * 100).toFixed(1)
// //           )

// //         return 0

// //       })

// //     }))

// //   return {
// //     months,
// //     rows: rowsOutput
// //   }

// // }







// type GA4Row = {
//   dimensionValues?: { value: string }[]
//   metricValues?: { value: string }[]
// }

// /* ------------------------------------------------ */
// /* MODEL NORMALIZER */
// /* ------------------------------------------------ */

// function normalizeModel(name: string) {

//   if (!name) return ""

//   return name
//     .toLowerCase()

//     /* remove year patterns */
//     .replace(/\d{4}-\d{4}/g, "")

//     /* remove EV variants */
//     .replace(/\bev\b.*$/i, "")

//     /* remove variant words */
//     .replace(/\bracer\b/i, "")
//     .replace(/\bmax\b/i, "")
//     .replace(/\bprime\b/i, "")
//     .replace(/\bn line\b/i, "")
//     .replace(/\bturbo\b/i, "")

//     /* normalize spacing */
//     .replace(/\s+/g, " ")
//     .trim()

//     /* convert to key */
//     .replace(/\s/g, "_")

// }

// /* ------------------------------------------------ */
// /* GENERIC ROW TRANSFORMER */
// /* ------------------------------------------------ */

// export function transformGA4Rows(
//   rows: GA4Row[] = [],
//   dimensionKeys: string[],
//   metricKeys: string[]
// ) {

//   return rows.map((row) => {

//     const result: Record<string, any> = {}

//     dimensionKeys.forEach((key, index) => {
//       result[key] =
//         row.dimensionValues?.[index]?.value ?? null
//     })

//     metricKeys.forEach((key, index) => {
//       result[key] =
//         Number(row.metricValues?.[index]?.value ?? 0)
//     })

//     return result

//   })
// }

// /* ------------------------------------------------ */
// /* TOFU */
// /* ------------------------------------------------ */

// export function transformTOFU(rows: GA4Row[]) {

//   return transformGA4Rows(
//     rows,
//     ["modelName"],
//     ["users", "pageViews"]
//   )
// }

// /* ------------------------------------------------ */
// /* MOFU */
// /* ------------------------------------------------ */

// export function transformMOFU(rows: GA4Row[]) {

//   return transformGA4Rows(
//     rows,
//     ["modelName"],
//     ["pageViews"]
//   )
// }

// /* ------------------------------------------------ */
// /* TREND */
// /* ------------------------------------------------ */

// export function transformTrend(rows: GA4Row[]) {

//   if (!rows || rows.length === 0) return []

//   const dateMap: Record<string, any> = {}

//   rows.forEach((row) => {

//     const rawDate =
//       row.dimensionValues?.[0]?.value

//     const rawModel =
//       row.dimensionValues?.[1]?.value

//     const pageViews =
//       Number(row.metricValues?.[0]?.value || 0)

//     if (!rawDate || !rawModel) return

//     const date =
//       `${rawDate.slice(0,4)}-${rawDate.slice(4,6)}-${rawDate.slice(6,8)}`

//     const modelKey =
//       normalizeModel(rawModel)

//     if (!dateMap[date]) {
//       dateMap[date] = { date }
//     }

//     dateMap[date][modelKey] =
//       (dateMap[date][modelKey] || 0) + pageViews

//   })

//   return Object.values(dateMap).sort(
//     (a: any, b: any) =>
//       new Date(a.date).getTime() -
//       new Date(b.date).getTime()
//   )
// }

// /* ------------------------------------------------ */
// /* TRAFFIC SHARE */
// /* ------------------------------------------------ */

// export function transformTrafficShare(rows: GA4Row[]) {

//   const data =
//     transformGA4Rows(
//       rows,
//       ["modelName"],
//       ["users", "pageViews"]
//     )

//   const totals: Record<string, any> = {}

//   data.forEach((row) => {

//     const model =
//       normalizeModel(row.modelName)

//     if (!totals[model]) {
//       totals[model] = { users: 0, pageViews: 0 }
//     }

//     totals[model].users += row.users
//     totals[model].pageViews += row.pageViews

//   })

//   const totalUsers =
//     Object.values(totals)
//       .reduce((a: any, b: any) => a + b.users, 0) || 1

//   const totalPageViews =
//     Object.values(totals)
//       .reduce((a: any, b: any) => a + b.pageViews, 0) || 1

//   return Object.entries(totals).map(([model, data]: any) => {

//     const trafficShare =
//       (data.users / totalUsers) * 100

//     const pageViewsShare =
//       (data.pageViews / totalPageViews) * 100

//     return {

//       model,

//       searchShare:
//         Number(trafficShare.toFixed(2)),

//       trafficShare:
//         Number(trafficShare.toFixed(2)),

//       pageViewsShare:
//         Number(pageViewsShare.toFixed(2))

//     }

//   })

// }

// /* ------------------------------------------------ */
// /* COMPETITOR TABLE */
// /* ------------------------------------------------ */

// export function transformCompetitors(rows: GA4Row[]) {

//   const data =
//     transformGA4Rows(
//       rows,
//       ["modelName"],
//       ["users"]
//     )

//   const totals: Record<string, number> = {}

//   data.forEach((row) => {

//     const model =
//       normalizeModel(row.modelName)

//     totals[model] =
//       (totals[model] || 0) + row.users

//   })

//   const sorted =
//     Object.entries(totals)
//       .sort((a, b) => b[1] - a[1])

//   return sorted.map(([model], i) => ({

//     model,

//     trafficErosionRank: i + 1,

//     reverseErosionRank:
//       sorted.length - i,

//     performance:
//       i < 3
//         ? "high"
//         : i < 6
//         ? "medium"
//         : "low"

//   }))

// }

// /* ------------------------------------------------ */
// /* HEATMAP (MONTHLY MODEL SHARE / PV/UU)           */
// /*                                                  */
// /* FIX: pvs type now computes totalUsers and        */
// /* totalPageViews PER MODEL per month (not grand    */
// /* total). PV/UU is an absolute ratio, never a      */
// /* share — do NOT divide by grand total.            */
// /* ------------------------------------------------ */

// export function transformHeatmap(
//   rows: GA4Row[],
//   type: "traffic" | "pageviews" | "pvs" | "mofu"
// ) {

//   if (!rows || rows.length === 0) {
//     return { months: [], rows: [] }
//   }

//   const monthSet = new Set<string>()

//   // map[model][month] = { users, pageviews }
//   const map: Record<string, Record<string, { users: number; pageviews: number }>> = {}

//   rows.forEach(row => {

//     const rawMonth =
//       row.dimensionValues?.[0]?.value

//     const rawModel =
//       row.dimensionValues?.[1]?.value

//     const users =
//       Number(row.metricValues?.[0]?.value || 0)

//     const pageviews =
//       Number(row.metricValues?.[1]?.value || 0)

//     if (!rawMonth || !rawModel) return

//     const month =
//       `${rawMonth.slice(0,4)}-${rawMonth.slice(4,6)}`

//     const model =
//       normalizeModel(rawModel)

//     monthSet.add(month)

//     if (!map[model]) map[model] = {}

//     if (!map[model][month]) {
//       map[model][month] = { users: 0, pageviews: 0 }
//     }

//     // ✅ Always accumulate raw totals
//     map[model][month].users    += users
//     map[model][month].pageviews += pageviews

//   })

//   const months = Array.from(monthSet).sort()

//   /* -------------------------------------------- */
//   /* GRAND TOTALS PER MONTH (for share types only) */
//   /* -------------------------------------------- */

//   const grandTotals: Record<string, { users: number; pageviews: number }> = {}

//   months.forEach(month => {
//     grandTotals[month] = { users: 0, pageviews: 0 }
//     Object.values(map).forEach((modelData) => {
//       grandTotals[month].users     += modelData?.[month]?.users    || 0
//       grandTotals[month].pageviews += modelData?.[month]?.pageviews || 0
//     })
//   })

//   /* -------------------------------------------- */
//   /* BUILD OUTPUT ROWS */
//   /* -------------------------------------------- */

//   const rowsOutput = Object.keys(map).map(model => ({

//     model,

//     values: months.map(month => {

//       const users     = map[model]?.[month]?.users    || 0
//       const pageviews = map[model]?.[month]?.pageviews || 0

//       const totalUsers     = grandTotals[month].users    || 1
//       const totalPageviews = grandTotals[month].pageviews || 1

//       if (type === "traffic")
//         return Number(((users / totalUsers) * 100).toFixed(1))

//       if (type === "pageviews")
//         return Number(((pageviews / totalPageviews) * 100).toFixed(1))

//       if (type === "pvs") {
//         // ✅ FIX: PV/UU is absolute per model — never divide by grand total
//         // pageviews here = eventCount filtered to page_view events
//         // users    here = totalUsers who triggered page_view for this model
//         if (!users) return 0
//         return Number((pageviews / users).toFixed(2))
//       }

//       if (type === "mofu")
//         return Number(((users / totalUsers) * 100).toFixed(1))

//       return 0

//     })

//   }))

//   return {
//     months,
//     rows: rowsOutput
//   }

// }








type GA4Row = {
  dimensionValues?: { value: string }[]
  metricValues?: { value: string }[]
}

/* ------------------------------------------------ */
/* MODEL NORMALIZER */
/* ------------------------------------------------ */

function normalizeModel(name: string) {

  if (!name) return ""

  return name
    .toLowerCase()

    /* remove year patterns */
    .replace(/\d{4}-\d{4}/g, "")

    /* remove EV variants */
    .replace(/\bev\b.*$/i, "")

    /* remove variant words */
    .replace(/\bracer\b/i, "")
    .replace(/\bmax\b/i, "")
    .replace(/\bprime\b/i, "")
    .replace(/\bn line\b/i, "")
    .replace(/\bturbo\b/i, "")

    /* normalize spacing */
    .replace(/\s+/g, " ")
    .trim()

    /* convert to key */
    .replace(/\s/g, "_")

}

/* ------------------------------------------------ */
/* GENERIC ROW TRANSFORMER */
/* ------------------------------------------------ */

export function transformGA4Rows(
  rows: GA4Row[] = [],
  dimensionKeys: string[],
  metricKeys: string[]
) {

  return rows.map((row) => {

    const result: Record<string, any> = {}

    dimensionKeys.forEach((key, index) => {
      result[key] =
        row.dimensionValues?.[index]?.value ?? null
    })

    metricKeys.forEach((key, index) => {
      result[key] =
        Number(row.metricValues?.[index]?.value ?? 0)
    })

    return result

  })
}

/* ------------------------------------------------ */
/* TOFU */
/* ------------------------------------------------ */

export function transformTOFU(rows: GA4Row[]) {

  return transformGA4Rows(
    rows,
    ["date", "modelName"],
    ["users", "pageViews"]
  )

}

/* ------------------------------------------------ */
/* MOFU */
/* ------------------------------------------------ */

export function transformMOFU(rows: GA4Row[]) {

  return transformGA4Rows(
    rows,
    ["modelName"],
    ["users","pageViews"]
  )

}

/* ------------------------------------------------ */
/* TREND */
/* ------------------------------------------------ */

export function transformTrend(rows: GA4Row[]) {

  if (!rows || rows.length === 0) return []

  const dateMap: Record<string, any> = {}

  rows.forEach((row) => {

    const rawDate =
      row.dimensionValues?.[0]?.value

    const rawModel =
      row.dimensionValues?.[1]?.value

    const pageViews =
      Number(row.metricValues?.[0]?.value || 0)

    if (!rawDate || !rawModel) return

    const date =
      `${rawDate.slice(0,4)}-${rawDate.slice(4,6)}-${rawDate.slice(6,8)}`

    const modelKey =
      normalizeModel(rawModel)

    if (!dateMap[date]) {
      dateMap[date] = { date }
    }

    dateMap[date][modelKey] =
      (dateMap[date][modelKey] || 0) + pageViews

  })

  return Object.values(dateMap).sort(
    (a: any, b: any) =>
      new Date(a.date).getTime() -
      new Date(b.date).getTime()
  )
}

/* ------------------------------------------------ */
/* TRAFFIC SHARE */
/* ------------------------------------------------ */

export function transformTrafficShare(rows: GA4Row[]) {

  const data =
    transformGA4Rows(
      rows,
      ["modelName"],
      ["users", "pageViews"]
    )

  const totals: Record<string, any> = {}

  data.forEach((row) => {

    const model =
      normalizeModel(row.modelName)

    if (!totals[model]) {
      totals[model] = { users: 0, pageViews: 0 }
    }

    totals[model].users += row.users
    totals[model].pageViews += row.pageViews

  })

  const totalUsers =
    Object.values(totals)
      .reduce((a: any, b: any) => a + b.users, 0) || 1

  const totalPageViews =
    Object.values(totals)
      .reduce((a: any, b: any) => a + b.pageViews, 0) || 1

  return Object.entries(totals).map(([model, data]: any) => {

    const trafficShare =
      (data.users / totalUsers) * 100

    const pageViewsShare =
      (data.pageViews / totalPageViews) * 100

    return {

      model,

      searchShare:
        Number(trafficShare.toFixed(2)),

      trafficShare:
        Number(trafficShare.toFixed(2)),

      pageViewsShare:
        Number(pageViewsShare.toFixed(2))

    }

  })

}

/* ------------------------------------------------ */
/* COMPETITOR TABLE */
/* ------------------------------------------------ */

export function transformCompetitors(rows: GA4Row[]) {

  const data =
    transformGA4Rows(
      rows,
      ["modelName"],
      ["users"]
    )

  const totals: Record<string, number> = {}

  data.forEach((row) => {

    const model =
      normalizeModel(row.modelName)

    totals[model] =
      (totals[model] || 0) + row.users

  })

  const sorted =
    Object.entries(totals)
      .sort((a, b) => b[1] - a[1])

  return sorted.map(([model], i) => ({

    model,

    trafficErosionRank: i + 1,

    reverseErosionRank:
      sorted.length - i,

    performance:
      i < 3
        ? "high"
        : i < 6
        ? "medium"
        : "low"

  }))

}

/* ------------------------------------------------ */
/* HEATMAP (MONTHLY MODEL SHARE / PV/UU)           */
/*                                                  */
/* FIX: pvs type now computes totalUsers and        */
/* totalPageViews PER MODEL per month (not grand    */
/* total). PV/UU is an absolute ratio, never a      */
/* share — do NOT divide by grand total.            */
/* ------------------------------------------------ */

export function transformHeatmap(
  rows: GA4Row[],
  type: "traffic" | "pageviews" | "pvs" | "mofu"
) {

  if (!rows || rows.length === 0) {
    return { months: [], rows: [] }
  }

  const monthSet = new Set<string>()

  // map[model][month] = { users, pageviews }
  const map: Record<string, Record<string, { users: number; pageviews: number }>> = {}

  rows.forEach(row => {

    const rawMonth =
      row.dimensionValues?.[0]?.value

    const rawModel =
      row.dimensionValues?.[1]?.value

    const users =
      Number(row.metricValues?.[0]?.value || 0)

    const pageviews =
      Number(row.metricValues?.[1]?.value || 0)

    if (!rawMonth || !rawModel) return

    const month =
      `${rawMonth.slice(0,4)}-${rawMonth.slice(4,6)}`

    const model =
      normalizeModel(rawModel)

    monthSet.add(month)

    if (!map[model]) map[model] = {}

    if (!map[model][month]) {
      map[model][month] = { users: 0, pageviews: 0 }
    }

    // ✅ Always accumulate raw totals
    map[model][month].users    += users
    map[model][month].pageviews += pageviews

  })

  const months = Array.from(monthSet).sort()

  /* -------------------------------------------- */
  /* GRAND TOTALS PER MONTH (for share types only) */
  /* -------------------------------------------- */

  const grandTotals: Record<string, { users: number; pageviews: number }> = {}

  months.forEach(month => {
    grandTotals[month] = { users: 0, pageviews: 0 }
    Object.values(map).forEach((modelData) => {
      grandTotals[month].users     += modelData?.[month]?.users    || 0
      grandTotals[month].pageviews += modelData?.[month]?.pageviews || 0
    })
  })

  /* -------------------------------------------- */
  /* BUILD OUTPUT ROWS */
  /* -------------------------------------------- */

  const rowsOutput = Object.keys(map).map(model => ({

    model,

    values: months.map(month => {

      const users     = map[model]?.[month]?.users    || 0
      const pv = map[model]?.[month]?.pageviews || 0

      const totalUsers     = grandTotals[month].users    || 1
      const totalPageviews = grandTotals[month].pageviews || 1

 if (type === "traffic")
  return users

if (type === "pageviews")
  return pv

      if (type === "pvs") {
        // ✅ FIX: PV/UU is absolute per model — never divide by grand total
        // pageviews here = eventCount filtered to page_view events
        // users    here = totalUsers who triggered page_view for this model
        if (!users) return 0
        return Number((pageviews / users).toFixed(2))
      }

      if (type === "mofu")
        return users

      return 0

    })

  }))

  return {
    months,
    rows: rowsOutput
  }

}