// // // // services/metricCalculator.ts

// // // /* =====================================================
// // //    GENERIC HELPERS
// // // ===================================================== */

// // // export function safeDivide(a: number, b: number) {
// // //   if (!b) return 0;
// // //   return Number((a / b).toFixed(2));
// // // }

// // // export function percentage(value: number, total: number) {
// // //   if (!total) return 0;
// // //   return Number(((value / total) * 100).toFixed(2));
// // // }

// // // /* =====================================================
// // //    KPI CALCULATIONS
// // // ===================================================== */

// // // export function calculateKPI(data: any[]) {
// // //   const totalUsers = data.reduce((sum, d) => sum + d.users, 0);
// // //   const totalPV = data.reduce((sum, d) => sum + d.pageViews, 0);

// // //   return {
// // //     totalUsers,
// // //     totalPageViews: totalPV,
// // //     engagementPVUU: safeDivide(totalPV, totalUsers),
// // //   };
// // // }

// // // /* =====================================================
// // //    TRAFFIC SHARE
// // // ===================================================== */

// // // export function calculateTrafficShare(data: any[]) {
// // //   const totalUsers = data.reduce((sum, d) => sum + d.users, 0);

// // //   return data.map((d) => ({
// // //     model: d.model,
// // //     users: d.users,
// // //     trafficShare: percentage(d.users, totalUsers),
// // //   }));
// // // }

// // // /* =====================================================
// // //    FUNNEL CALCULATIONS (TOFU → MOFU)
// // // ===================================================== */

// // // export function calculateFunnel({
// // //   tofu,
// // //   mofu,
// // // }: {
// // //   tofu: number;
// // //   mofu: number;
// // // }) {
// // //   return {
// // //     tofu,
// // //     mofu,
// // //     conversionRate: percentage(mofu, tofu),
// // //   };
// // // }

// // // /* =====================================================
// // //    TREND GROUPING (DATE WISE)
// // // ===================================================== */

// // // export function calculateTrend(data: any[]) {
// // //   const grouped: Record<string, any> = {};

// // //   data.forEach((row) => {
// // //     const { date, model, users } = row;

// // //     if (!grouped[date]) grouped[date] = { date };

// // //     grouped[date][model] = users;
// // //   });

// // //   return Object.values(grouped);
// // // }

// // // /* =====================================================
// // //    COMPETITOR PERFORMANCE SCORE
// // // ===================================================== */

// // // export function calculateCompetitorPerformance(data: any[]) {
// // //   const maxUsers = Math.max(...data.map((d) => d.users));

// // //   return data.map((d) => ({
// // //     model: d.model,
// // //     users: d.users,
// // //     performance: percentage(d.users, maxUsers),
// // //   }));
// // // }




// // /* =====================================================
// //    GENERIC HELPERS
// // ===================================================== */

// // // export function safeDivide(a: number, b: number) {
// // //   if (!b) return 0;
// // //   return Number((a / b).toFixed(2));
// // // }

// // // export function percentage(value: number, total: number) {
// // //   if (!total) return 0;
// // //   return Number(((value / total) * 100).toFixed(2));
// // // }

// // // /* =====================================================
// // //    KPI CALCULATIONS
// // // ===================================================== */

// // // export function calculateKPI(data: any[]) {

// // //   if (!data || data.length === 0) {
// // //     return {
// // //       totalUsers: 0,
// // //       totalPageViews: 0,
// // //       engagementPVUU: 0
// // //     }
// // //   }

// // //   const totalUsers =
// // //     data.reduce((sum, d) => sum + (d.users || 0), 0);

// // //   const totalPV =
// // //     data.reduce((sum, d) => sum + (d.pageViews || 0), 0);

// // //   return {
// // //     totalUsers,
// // //     totalPageViews: totalPV,
// // //     engagementPVUU: safeDivide(totalPV, totalUsers),
// // //   };
// // // }

// // // /* =====================================================
// // //    TRAFFIC SHARE
// // // ===================================================== */

// // // export function calculateTrafficShare(data: any[]) {

// // //   const totalUsers =
// // //     data.reduce((sum, d) => sum + d.users, 0);

// // //   return data.map((d) => ({
// // //     model: d.model,
// // //     users: d.users,
// // //     trafficShare: percentage(d.users, totalUsers),
// // //   }));

// // // }

// // // /* =====================================================
// // //    FUNNEL CALCULATIONS
// // // ===================================================== */

// // // export function calculateFunnel({
// // //   tofu,
// // //   mofu,
// // // }: {
// // //   tofu: number;
// // //   mofu: number;
// // // }) {

// // //   return {
// // //     tofu,
// // //     mofu,
// // //     conversionRate: percentage(mofu, tofu),
// // //   }

// // // }

// // // /* =====================================================
// // //    TREND GROUPING
// // // ===================================================== */

// // // export function calculateTrend(data: any[]) {

// // //   const grouped: Record<string, any> = {}

// // //   data.forEach((row) => {

// // //     const { date, model, users } = row

// // //     if (!grouped[date])
// // //       grouped[date] = { date }

// // //     grouped[date][model] = users

// // //   })

// // //   return Object.values(grouped)

// // // }

// // // /* =====================================================
// // //    COMPETITOR PERFORMANCE
// // // ===================================================== */

// // // export function calculateCompetitorPerformance(data: any[]) {

// // //   if (!data.length) return []

// // //   const maxUsers =
// // //     Math.max(...data.map((d) => d.users))

// // //   return data.map((d) => ({
// // //     model: d.model,
// // //     users: d.users,
// // //     performance: percentage(d.users, maxUsers),
// // //   }))

// // // }










// // export function safeDivide(a: number, b: number) {
// //   if (!b || isNaN(a) || isNaN(b)) return 0;
// //   return Number((a / b).toFixed(2));
// // }

// // export function percentage(value: number, total: number) {
// //   if (!total || isNaN(value) || isNaN(total)) return 0;
// //   return Number(((value / total) * 100).toFixed(2));
// // }

// // /* =====================================================
// //    KPI CALCULATIONS
// // ===================================================== */

// // export function calculateKPI(data: any[]) {

// //   if (!Array.isArray(data) || data.length === 0) {
// //     return {
// //       totalUsers: 0,
// //       totalPageViews: 0,
// //       engagementPVUU: 0
// //     }
// //   }

// //   const totalUsers =
// //     data.reduce((sum, d) => {
// //       const users = Number(d.users) || 0
// //       return sum + users
// //     }, 0)

// //   const totalPV =
// //     data.reduce((sum, d) => {
// //       const pv = Number(d.pageViews) || 0
// //       return sum + pv
// //     }, 0)

// //   return {
// //     totalUsers,
// //     totalPageViews: totalPV,
// //     engagementPVUU: safeDivide(totalPV, totalUsers),
// //   }
// // }

// // /* =====================================================
// //    TRAFFIC SHARE
// // ===================================================== */

// // export function calculateTrafficShare(data: any[]) {

// //   if (!Array.isArray(data) || data.length === 0) return []

// //   const totalUsers =
// //     data.reduce((sum, d) => sum + (Number(d.users) || 0), 0)

// //   return data.map((d) => ({

// //     model: d.model,
// //     users: Number(d.users) || 0,

// //     trafficShare: percentage(
// //       Number(d.users) || 0,
// //       totalUsers
// //     ),

// //   }))
// // }

// // /* =====================================================
// //    FUNNEL CALCULATIONS
// // ===================================================== */

// // export function calculateFunnel({
// //   tofu,
// //   mofu,
// // }: {
// //   tofu: number
// //   mofu: number
// // }) {

// //   const tofuVal = Number(tofu) || 0
// //   const mofuVal = Number(mofu) || 0

// //   return {
// //     tofu: tofuVal,
// //     mofu: mofuVal,
// //     conversionRate: percentage(mofuVal, tofuVal),
// //   }

// // }

// // /* =====================================================
// //    TREND GROUPING
// // ===================================================== */

// // export function calculateTrend(data: any[]) {

// //   if (!Array.isArray(data)) return []

// //   const grouped: Record<string, any> = {}

// //   data.forEach((row) => {

// //     const date = row.date
// //     const model = row.model
// //     const users = Number(row.users) || 0

// //     if (!date || !model) return

// //     if (!grouped[date])
// //       grouped[date] = { date }

// //     grouped[date][model] = users

// //   })

// //   return Object.values(grouped)

// // }

// // /* =====================================================
// //    COMPETITOR PERFORMANCE
// // ===================================================== */

// // export function calculateCompetitorPerformance(data: any[]) {

// //   if (!Array.isArray(data) || !data.length) return []

// //   const maxUsers =
// //     Math.max(...data.map((d) => Number(d.users) || 0))

// //   return data.map((d) => ({

// //     model: d.model,

// //     users: Number(d.users) || 0,

// //     performance: percentage(
// //       Number(d.users) || 0,
// //       maxUsers
// //     ),

// //   }))

// // }














// /* =====================================================
//    SAFE MATH HELPERS
// ===================================================== */

// export function safeDivide(a: number, b: number) {
//   if (!b || isNaN(a) || isNaN(b)) return 0
//   return Number((a / b).toFixed(2))
// }

// export function percentage(value: number, total: number) {
//   if (!total || isNaN(value) || isNaN(total)) return 0
//   return Number(((value / total) * 100).toFixed(2))
// }

// /* =====================================================
//    KPI CALCULATIONS
//    (NOW ONLY USED FOR SIMPLE AGGREGATED DATA)
// ===================================================== */

// export function calculateKPI({
//   users,
//   pageViews
// }: {
//   users: number
//   pageViews: number
// }) {

//   const totalUsers = Number(users) || 0
//   const totalPageViews = Number(pageViews) || 0

//   return {
//     totalUsers,
//     totalPageViews,
//     engagementPVUU: safeDivide(totalPageViews, totalUsers)
//   }
// }

// /* =====================================================
//    TRAFFIC SHARE
// ===================================================== */

// export function calculateTrafficShare(data: any[]) {

//   if (!Array.isArray(data) || data.length === 0) return []

//   const totalUsers =
//     data.reduce((sum, d) => sum + (Number(d.users) || 0), 0)

//   return data.map((d) => ({

//     model: d.model,

//     users: Number(d.users) || 0,

//     trafficShare: percentage(
//       Number(d.users) || 0,
//       totalUsers
//     ),

//   }))
// }

// /* =====================================================
//    FUNNEL CALCULATIONS
// ===================================================== */

// export function calculateFunnel({
//   tofu,
//   mofu,
// }: {
//   tofu: number
//   mofu: number
// }) {

//   const tofuVal = Number(tofu) || 0
//   const mofuVal = Number(mofu) || 0

//   return {

//     tofu: tofuVal,

//     mofu: mofuVal,

//     conversionRate: percentage(mofuVal, tofuVal),

//   }

// }

// /* =====================================================
//    TREND GROUPING
// ===================================================== */

// export function calculateTrend(data: any[]) {

//   if (!Array.isArray(data)) return []

//   const grouped: Record<string, any> = {}

//   data.forEach((row) => {

//     const date = row.date
//     const model = row.model
//     const users = Number(row.users) || 0

//     if (!date || !model) return

//     if (!grouped[date])
//       grouped[date] = { date }

//     grouped[date][model] = users

//   })

//   return Object.values(grouped)

// }

// /* =====================================================
//    COMPETITOR PERFORMANCE
// ===================================================== */

// export function calculateCompetitorPerformance(data: any[]) {

//   if (!Array.isArray(data) || !data.length) return []

//   const maxUsers =
//     Math.max(...data.map((d) => Number(d.users) || 0))

//   return data.map((d) => ({

//     model: d.model,

//     users: Number(d.users) || 0,

//     performance: percentage(
//       Number(d.users) || 0,
//       maxUsers
//     ),

//   }))

// }








/* =====================================================
   SAFE MATH HELPERS
===================================================== */

export function safeDivide(a: number, b: number) {
  if (!b || isNaN(a) || isNaN(b)) return 0
  return Number((a / b).toFixed(2))
}

/* PERCENTAGE CALCULATOR (ONLY FOR SHARE METRICS) */

export function percentage(value: number, total: number) {
  if (!total || isNaN(value) || isNaN(total)) return 0
  return Number(((value / total) * 100).toFixed(2))
}

/* PV/UU FORMATTER (NEVER CONVERT TO %) */

export function formatPVUU(value: number) {
  if (!value || isNaN(value)) return 0
  return Number(value.toFixed(2))
}

/* =====================================================
   KPI CALCULATIONS
===================================================== */

export function calculateKPI({
  users,
  pageViews
}: {
  users: number
  pageViews: number
}) {

  const totalUsers = Number(users) || 0
  const totalPageViews = Number(pageViews) || 0

  const pvuu =
    safeDivide(totalPageViews, totalUsers)

  return {

    totalUsers,

    totalPageViews,

    /* PV/UU SHOULD ALWAYS BE NUMBER (NOT %) */

    engagementPVUU: formatPVUU(pvuu)

  }

}

/* =====================================================
   TRAFFIC SHARE
===================================================== */

export function calculateTrafficShare(data: any[]) {

  if (!Array.isArray(data) || data.length === 0) return []

  const totalUsers =
    data.reduce((sum, d) => sum + (Number(d.users) || 0), 0)

  return data.map((d) => ({

    model: d.model,

    users: Number(d.users) || 0,

    trafficShare: percentage(
      Number(d.users) || 0,
      totalUsers
    ),

  }))

}

/* =====================================================
   FUNNEL CALCULATIONS
===================================================== */

export function calculateFunnel({
  tofu,
  mofu,
}: {
  tofu: number
  mofu: number
}) {

  const tofuVal = Number(tofu) || 0
  const mofuVal = Number(mofu) || 0

  return {

    tofu: tofuVal,

    mofu: mofuVal,

    conversionRate: percentage(mofuVal, tofuVal),

  }

}

/* =====================================================
   TREND GROUPING
===================================================== */

export function calculateTrend(data: any[]) {

  if (!Array.isArray(data)) return []

  const grouped: Record<string, any> = {}

  data.forEach((row) => {

    const date = row.date
    const model = row.model
    const users = Number(row.users) || 0

    if (!date || !model) return

    if (!grouped[date])
      grouped[date] = { date }

    grouped[date][model] = users

  })

  return Object.values(grouped)

}

/* =====================================================
   COMPETITOR PERFORMANCE
===================================================== */

export function calculateCompetitorPerformance(data: any[]) {

  if (!Array.isArray(data) || !data.length) return []

  const maxUsers =
    Math.max(...data.map((d) => Number(d.users) || 0))

  return data.map((d) => ({

    model: d.model,

    users: Number(d.users) || 0,

    performance: percentage(
      Number(d.users) || 0,
      maxUsers
    ),

  }))

}