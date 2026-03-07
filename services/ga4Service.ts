// // // // // import { BetaAnalyticsDataClient } from "@google-analytics/data";
// // // // // import { buildGA4Query } from "./ga4QueryBuilder";

// // // // // const client = new BetaAnalyticsDataClient({
// // // // // keyFilename: process.env.GA_KEY_FILE,
// // // // // });

// // // // // /* ----------------------------- */
// // // // // /* DATE CLAMP (max 30 days) */
// // // // // /* ----------------------------- */

// // // // // function clampDateRange(startDate: string, endDate: string) {

// // // // // if (
// // // // // startDate?.includes("daysAgo") ||
// // // // // endDate === "today"
// // // // // ) {
// // // // // return { startDate, endDate };
// // // // // }

// // // // // const end = new Date(endDate);
// // // // // const start = new Date(startDate);

// // // // // if (isNaN(end.getTime()) || isNaN(start.getTime())) {
// // // // // return {
// // // // // startDate: "7daysAgo",
// // // // // endDate: "today",
// // // // // };
// // // // // }

// // // // // const diffDays =
// // // // // (end.getTime() - start.getTime()) /
// // // // // (1000 * 60 * 60 * 24);

// // // // // if (diffDays > 30) {
// // // // // start.setDate(end.getDate() - 30);
// // // // // }

// // // // // return {
// // // // // startDate: start.toISOString().split("T")[0],
// // // // // endDate: end.toISOString().split("T")[0],
// // // // // };
// // // // // }

// // // // // /* ----------------------------- */
// // // // // /* SAFE GA4 EXECUTION */
// // // // // /* ----------------------------- */

// // // // // async function runGA4Report(request: any) {

// // // // // const timeout = new Promise((_, reject) =>
// // // // // setTimeout(() => reject(new Error("GA4 timeout")), 20000)
// // // // // );

// // // // // const report = client.runReport(request);

// // // // // return Promise.race([report, timeout]);
// // // // // }

// // // // // /* ----------------------------- */
// // // // // /* UNIVERSAL GA FETCH */
// // // // // /* ----------------------------- */

// // // // // export async function fetchTOFU(
// // // // // propertyId: string,
// // // // // startDate: string,
// // // // // endDate: string,
// // // // // models: string[] | string,
// // // // // report: "TOFU" | "MOFU" | "TREND" = "TOFU"
// // // // // ) {

// // // // // try {


// // // // // const range = clampDateRange(startDate, endDate);

// // // // // const requestBody = buildGA4Query({
// // // // //   report,
// // // // //   startDate: range.startDate,
// // // // //   endDate: range.endDate,
// // // // //   models,
// // // // // });

// // // // // const [response]: any = await runGA4Report({
// // // // //   property: `properties/${propertyId}`,
// // // // //   ...requestBody,
// // // // // });

// // // // // if (!response?.rows) return [];

// // // // // return response.rows;


// // // // // } catch (error) {


// // // // // console.error(`GA4 ${report} Fetch Error:`, error);
// // // // // return [];


// // // // // }
// // // // // }

// // // // // /* ----------------------------- */
// // // // // /* AUDIENCE ENGAGEMENT REPORT */
// // // // // /* PV/UU + Avg Session Duration */
// // // // // /* ----------------------------- */

// // // // // export async function fetchEngagement(
// // // // // propertyId: string,
// // // // // startDate: string,
// // // // // endDate: string
// // // // // ) {

// // // // // try {


// // // // // const range = clampDateRange(startDate, endDate);

// // // // // const [response]: any = await runGA4Report({
// // // // //   property: `properties/${propertyId}`,

// // // // //   dateRanges: [
// // // // //     {
// // // // //       startDate: range.startDate,
// // // // //       endDate: range.endDate,
// // // // //     },
// // // // //   ],

// // // // //   dimensions: [
// // // // //     { name: "date" },
// // // // //   ],

// // // // //   metrics: [
// // // // //     { name: "screenPageViews" },
// // // // //     { name: "totalUsers" },
// // // // //     { name: "averageSessionDuration" },
// // // // //   ],
// // // // // });

// // // // // if (!response?.rows) return [];

// // // // // return response.rows.map((row: any) => {

// // // // //   const date = row.dimensionValues?.[0]?.value;

// // // // //   const pv = Number(row.metricValues?.[0]?.value || 0);
// // // // //   const users = Number(row.metricValues?.[1]?.value || 0);
// // // // //   const duration = Number(row.metricValues?.[2]?.value || 0);

// // // // //   return {
// // // // //     date,
// // // // //     pv_uu: users ? pv / users : 0,
// // // // //     avg_session_duration: duration / 60,
// // // // //   };

// // // // // });

// // // // // } catch (error) {


// // // // // console.error("GA4 Engagement Fetch Error:", error);
// // // // // return [];

// // // // // }
// // // // // }

// // // // // /* ----------------------------- */
// // // // // /* TRAFFIC EROSION FETCH */
// // // // // /* Used by erosion matrix */
// // // // // /* ----------------------------- */

// // // // // export async function fetchTrafficErosion(
// // // // // propertyId: string,
// // // // // startDate: string,
// // // // // endDate: string
// // // // // ) {

// // // // // try {


// // // // // const range = clampDateRange(startDate, endDate);

// // // // // const [response]: any = await runGA4Report({
// // // // //   property: `properties/${propertyId}`,

// // // // //   dateRanges: [
// // // // //     {
// // // // //       startDate: range.startDate,
// // // // //       endDate: range.endDate,
// // // // //     },
// // // // //   ],

// // // // //   dimensions: [
// // // // //     { name: "pagePath" },
// // // // //     { name: "pageReferrer" },
// // // // //   ],

// // // // //   metrics: [
// // // // //     { name: "totalUsers" },
// // // // //   ],
// // // // // });

// // // // // if (!response?.rows) return [];

// // // // // return response.rows.map((row: any) => ({

// // // // //   from: row.dimensionValues?.[1]?.value || "",
// // // // //   to: row.dimensionValues?.[0]?.value || "",
// // // // //   erosion: Number(row.metricValues?.[0]?.value || 0),

// // // // // }));

// // // // // } catch (error) {

// // // // // console.error("GA4 Traffic Erosion Fetch Error:", error);
// // // // // return [];


// // // // // }
// // // // // }













// // // // // import { BetaAnalyticsDataClient } from "@google-analytics/data";
// // // // // import { buildGA4Query } from "./ga4QueryBuilder";

// // // // // /* ----------------------------- */
// // // // // /* SINGLETON CLIENT (FASTER) */
// // // // // /* ----------------------------- */

// // // // // let client: BetaAnalyticsDataClient | null = null;

// // // // // function getClient() {
// // // // //   if (!client) {
// // // // //     client = new BetaAnalyticsDataClient({
// // // // //       keyFilename: process.env.GA_KEY_FILE,
// // // // //     });
// // // // //   }
// // // // //   return client;
// // // // // }

// // // // // /* ----------------------------- */
// // // // // /* DATE CLAMP (max 30 days) */
// // // // // /* ----------------------------- */

// // // // // function clampDateRange(startDate: string, endDate: string) {

// // // // //   if (
// // // // //     startDate?.includes("daysAgo") ||
// // // // //     endDate === "today"
// // // // //   ) {
// // // // //     return { startDate, endDate };
// // // // //   }

// // // // //   const end = new Date(endDate);
// // // // //   const start = new Date(startDate);

// // // // //   if (isNaN(end.getTime()) || isNaN(start.getTime())) {
// // // // //     return {
// // // // //       startDate: "7daysAgo",
// // // // //       endDate: "today",
// // // // //     };
// // // // //   }

// // // // //   const diffDays =
// // // // //     (end.getTime() - start.getTime()) /
// // // // //     (1000 * 60 * 60 * 24);

// // // // //   if (diffDays > 30) {
// // // // //     start.setDate(end.getDate() - 30);
// // // // //   }

// // // // //   return {
// // // // //     startDate: start.toISOString().split("T")[0],
// // // // //     endDate: end.toISOString().split("T")[0],
// // // // //   };
// // // // // }

// // // // // /* ----------------------------- */
// // // // // /* SAFE GA4 EXECUTION */
// // // // // /* ----------------------------- */

// // // // // async function runGA4Report(request: any) {

// // // // //   const client = getClient();

// // // // //   const timeout = new Promise((_, reject) =>
// // // // //     setTimeout(() => reject(new Error("GA4 timeout")), 30000)
// // // // //   );

// // // // //   const report = client.runReport(request);

// // // // //   return Promise.race([report, timeout]);
// // // // // }

// // // // // /* ----------------------------- */
// // // // // /* UNIVERSAL GA FETCH */
// // // // // /* ----------------------------- */

// // // // // export async function fetchTOFU(
// // // // //   propertyId: string,
// // // // //   startDate: string,
// // // // //   endDate: string,
// // // // //   models: string[] | string,
// // // // //   report: "TOFU" | "MOFU" | "TREND" = "TOFU"
// // // // // ) {

// // // // //   try {

// // // // //     const range = clampDateRange(startDate, endDate);

// // // // //     const requestBody = buildGA4Query({
// // // // //       report,
// // // // //       startDate: range.startDate,
// // // // //       endDate: range.endDate,
// // // // //       models,
// // // // //     });

// // // // //     const [response]: any = await runGA4Report({
// // // // //       property: `properties/${propertyId}`,
// // // // //       ...requestBody,
// // // // //     });

// // // // //     if (!response?.rows) return [];

// // // // //     return response.rows;

// // // // //   } catch (error) {

// // // // //     console.error(`GA4 ${report} Fetch Error:`, error);

// // // // //     /* -------- RETRY ONCE -------- */

// // // // //     try {

// // // // //       console.log(`Retrying GA4 ${report} query...`);

// // // // //       const range = clampDateRange(startDate, endDate);

// // // // //       const requestBody = buildGA4Query({
// // // // //         report,
// // // // //         startDate: range.startDate,
// // // // //         endDate: range.endDate,
// // // // //         models,
// // // // //       });

// // // // //       const [retryResponse]: any = await runGA4Report({
// // // // //         property: `properties/${propertyId}`,
// // // // //         ...requestBody,
// // // // //       });

// // // // //       if (!retryResponse?.rows) return [];

// // // // //       return retryResponse.rows;

// // // // //     } catch (retryError) {

// // // // //       console.error(`GA4 ${report} Retry Failed:`, retryError);
// // // // //       return [];

// // // // //     }

// // // // //   }
// // // // // }

// // // // // /* ----------------------------- */
// // // // // /* AUDIENCE ENGAGEMENT REPORT */
// // // // // /* PV/UU + Avg Session Duration */
// // // // // /* ----------------------------- */

// // // // // export async function fetchEngagement(
// // // // //   propertyId: string,
// // // // //   startDate: string,
// // // // //   endDate: string
// // // // // ) {

// // // // //   try {

// // // // //     const range = clampDateRange(startDate, endDate);

// // // // //     const client = getClient();

// // // // //     const [response]: any = await runGA4Report({
// // // // //       property: `properties/${propertyId}`,

// // // // //       dateRanges: [
// // // // //         {
// // // // //           startDate: range.startDate,
// // // // //           endDate: range.endDate,
// // // // //         },
// // // // //       ],

// // // // //       dimensions: [
// // // // //         { name: "date" },
// // // // //       ],

// // // // //       metrics: [
// // // // //         { name: "screenPageViews" },
// // // // //         { name: "totalUsers" },
// // // // //         { name: "averageSessionDuration" },
// // // // //       ],
// // // // //     });

// // // // //     if (!response?.rows) return [];

// // // // //     return response.rows.map((row: any) => {

// // // // //       const date = row.dimensionValues?.[0]?.value;

// // // // //       const pv = Number(row.metricValues?.[0]?.value || 0);
// // // // //       const users = Number(row.metricValues?.[1]?.value || 0);
// // // // //       const duration = Number(row.metricValues?.[2]?.value || 0);

// // // // //       return {
// // // // //         date,
// // // // //         pv_uu: users ? pv / users : 0,
// // // // //         avg_session_duration: duration / 60,
// // // // //       };

// // // // //     });

// // // // //   } catch (error) {

// // // // //     console.error("GA4 Engagement Fetch Error:", error);
// // // // //     return [];

// // // // //   }
// // // // // }

// // // // // /* ----------------------------- */
// // // // // /* TRAFFIC EROSION FETCH */
// // // // // /* Used by erosion matrix */
// // // // // /* ----------------------------- */

// // // // // export async function fetchTrafficErosion(
// // // // //   propertyId: string,
// // // // //   startDate: string,
// // // // //   endDate: string
// // // // // ) {

// // // // //   try {

// // // // //     const range = clampDateRange(startDate, endDate);

// // // // //     const [response]: any = await runGA4Report({
// // // // //       property: `properties/${propertyId}`,

// // // // //       dateRanges: [
// // // // //         {
// // // // //           startDate: range.startDate,
// // // // //           endDate: range.endDate,
// // // // //         },
// // // // //       ],

// // // // //       dimensions: [
// // // // //         { name: "pagePath" },
// // // // //         { name: "pageReferrer" },
// // // // //       ],

// // // // //       metrics: [
// // // // //         { name: "totalUsers" },
// // // // //       ],
// // // // //     });

// // // // //     if (!response?.rows) return [];

// // // // //     return response.rows.map((row: any) => ({

// // // // //       from: row.dimensionValues?.[1]?.value || "",
// // // // //       to: row.dimensionValues?.[0]?.value || "",
// // // // //       erosion: Number(row.metricValues?.[0]?.value || 0),

// // // // //     }));

// // // // //   } catch (error) {

// // // // //     console.error("GA4 Traffic Erosion Fetch Error:", error);
// // // // //     return [];

// // // // //   }
// // // // // }





// // // // import { BetaAnalyticsDataClient } from "@google-analytics/data"
// // // // import { buildGA4Query } from "./ga4QueryBuilder"

// // // // /* ----------------------------- */
// // // // /* SINGLETON CLIENT */
// // // // /* ----------------------------- */

// // // // let client: BetaAnalyticsDataClient | null = null

// // // // function getClient() {
// // // //   if (!client) {
// // // //     client = new BetaAnalyticsDataClient({
// // // //       keyFilename: process.env.GA_KEY_FILE,
// // // //     })
// // // //   }
// // // //   return client
// // // // }

// // // // /* ----------------------------- */
// // // // /* DATE CLAMP */
// // // // /* ----------------------------- */

// // // // function clampDateRange(startDate: string, endDate: string) {

// // // //   if (
// // // //     startDate?.includes("daysAgo") ||
// // // //     endDate === "today"
// // // //   ) {
// // // //     return { startDate, endDate }
// // // //   }

// // // //   const end = new Date(endDate)
// // // //   const start = new Date(startDate)

// // // //   if (isNaN(end.getTime()) || isNaN(start.getTime())) {
// // // //     return {
// // // //       startDate: "7daysAgo",
// // // //       endDate: "today",
// // // //     }
// // // //   }

// // // //   const diffDays =
// // // //     (end.getTime() - start.getTime()) /
// // // //     (1000 * 60 * 60 * 24)

// // // //   if (diffDays > 30) {
// // // //     start.setDate(end.getDate() - 30)
// // // //   }

// // // //   return {
// // // //     startDate: start.toISOString().split("T")[0],
// // // //     endDate: end.toISOString().split("T")[0],
// // // //   }
// // // // }

// // // // /* ----------------------------- */
// // // // /* SAFE GA EXECUTION */
// // // // /* ----------------------------- */

// // // // async function runGA4Report(request: any) {

// // // //   const client = getClient()

// // // //   const timeout = new Promise((_, reject) =>
// // // //     setTimeout(() => reject(new Error("GA4 timeout")), 30000)
// // // //   )

// // // //   const report = client.runReport(request)

// // // //   return Promise.race([report, timeout])
// // // // }

// // // // /* ----------------------------- */
// // // // /* UNIVERSAL GA FETCH */
// // // // /* ----------------------------- */

// // // // export async function fetchTOFU(
// // // //   propertyId: string,
// // // //   startDate: string,
// // // //   endDate: string,
// // // //   models: string[] | string,
// // // //   report: "TOFU" | "MOFU" | "TREND" = "TOFU"
// // // // ) {

// // // //   try {

// // // //     const range = clampDateRange(startDate, endDate)

// // // //     const requestBody = buildGA4Query({
// // // //       report,
// // // //       startDate: range.startDate,
// // // //       endDate: range.endDate,
// // // //       models,
// // // //     })

// // // //     const [response]: any = await runGA4Report({
// // // //       property: `properties/${propertyId}`,
// // // //       ...requestBody,
// // // //     })

// // // //     if (!response?.rows) return []

// // // //     return response.rows

// // // //   } catch (error) {

// // // //     console.error(`GA4 ${report} Fetch Error:`, error)
// // // //     return []

// // // //   }

// // // // }

// // // // /* ----------------------------- */
// // // // /* MOFU FETCH */
// // // // /* ----------------------------- */

// // // // export async function fetchMOFU(
// // // //   propertyId: string,
// // // //   startDate: string,
// // // //   endDate: string,
// // // //   models: string[] | string
// // // // ) {

// // // //   return fetchTOFU(
// // // //     propertyId,
// // // //     startDate,
// // // //     endDate,
// // // //     models,
// // // //     "MOFU"
// // // //   )

// // // // }





// // // import { BetaAnalyticsDataClient } from "@google-analytics/data"
// // // import { buildGA4Query } from "./ga4QueryBuilder"

// // // /* ----------------------------- */
// // // /* SINGLETON CLIENT */
// // // /* ----------------------------- */

// // // let client: BetaAnalyticsDataClient | null = null

// // // function getClient() {
// // //   if (!client) {
// // //     client = new BetaAnalyticsDataClient({
// // //       keyFilename: process.env.GA_KEY_FILE,
// // //     })
// // //   }
// // //   return client
// // // }

// // // /* ----------------------------- */
// // // /* DATE CLAMP */
// // // /* ----------------------------- */

// // // function clampDateRange(startDate: string, endDate: string) {

// // //   if (
// // //     startDate?.includes("daysAgo") ||
// // //     endDate === "today"
// // //   ) {
// // //     return { startDate, endDate }
// // //   }

// // //   const end = new Date(endDate)
// // //   const start = new Date(startDate)

// // //   if (isNaN(end.getTime()) || isNaN(start.getTime())) {
// // //     return {
// // //       startDate: "7daysAgo",
// // //       endDate: "today",
// // //     }
// // //   }

// // //   const diffDays =
// // //     (end.getTime() - start.getTime()) /
// // //     (1000 * 60 * 60 * 24)

// // //   if (diffDays > 30) {
// // //     start.setDate(end.getDate() - 30)
// // //   }

// // //   return {
// // //     startDate: start.toISOString().split("T")[0],
// // //     endDate: end.toISOString().split("T")[0],
// // //   }
// // // }

// // // /* ----------------------------- */
// // // /* SAFE GA EXECUTION */
// // // /* ----------------------------- */

// // // async function runGA4Report(request: any) {

// // //   const client = getClient()

// // //   const timeout = new Promise((_, reject) =>
// // //     setTimeout(() => reject(new Error("GA4 timeout")), 30000)
// // //   )

// // //   const report = client.runReport(request)

// // //   return Promise.race([report, timeout])
// // // }

// // // /* ----------------------------- */
// // // /* UNIVERSAL FETCH */
// // // /* ----------------------------- */

// // // export async function fetchTOFU(
// // //   propertyId: string,
// // //   startDate: string,
// // //   endDate: string,
// // //   models: string[] | string,
// // //   report: "TOFU" | "MOFU" | "TREND" = "TOFU"
// // // ) {

// // //   try {

// // //     const range = clampDateRange(startDate, endDate)

// // //     const requestBody = buildGA4Query({
// // //       report,
// // //       startDate: range.startDate,
// // //       endDate: range.endDate,
// // //       models,
// // //     })

// // //     const [response]: any = await runGA4Report({
// // //       property: `properties/${propertyId}`,
// // //       ...requestBody,
// // //     })

// // //     if (!response?.rows) return []

// // //     return response.rows

// // //   } catch (error) {

// // //     console.error(`GA4 ${report} Fetch Error:`, error)

// // //     return []

// // //   }

// // // }

// // // /* ----------------------------- */
// // // /* MOFU FETCH */
// // // /* ----------------------------- */

// // // export async function fetchMOFU(
// // //   propertyId: string,
// // //   startDate: string,
// // //   endDate: string,
// // //   models: string[] | string
// // // ) {

// // //   return fetchTOFU(
// // //     propertyId,
// // //     startDate,
// // //     endDate,
// // //     models,
// // //     "MOFU"
// // //   )

// // // }

// // // /* ----------------------------- */
// // // /* ENGAGEMENT REPORT */
// // // /* ----------------------------- */

// // // export async function fetchEngagement(
// // //   propertyId: string,
// // //   startDate: string,
// // //   endDate: string
// // // ) {

// // //   try {

// // //     const range = clampDateRange(startDate, endDate)

// // //     const [response]: any = await runGA4Report({
// // //       property: `properties/${propertyId}`,

// // //       dateRanges: [
// // //         {
// // //           startDate: range.startDate,
// // //           endDate: range.endDate,
// // //         },
// // //       ],

// // //       dimensions: [
// // //         { name: "date" },
// // //       ],

// // //       metrics: [
// // //         { name: "screenPageViews" },
// // //         { name: "totalUsers" },
// // //         { name: "averageSessionDuration" },
// // //       ],
// // //     })

// // //     if (!response?.rows) return []

// // //     return response.rows.map((row: any) => {

// // //       const date = row.dimensionValues?.[0]?.value

// // //       const pv = Number(row.metricValues?.[0]?.value || 0)
// // //       const users = Number(row.metricValues?.[1]?.value || 0)
// // //       const duration = Number(row.metricValues?.[2]?.value || 0)

// // //       return {
// // //         date,
// // //         pv_uu: users ? pv / users : 0,
// // //         avg_session_duration: duration / 60,
// // //       }

// // //     })

// // //   } catch (error) {

// // //     console.error("GA4 Engagement Fetch Error:", error)

// // //     return []

// // //   }

// // // }











// // import { BetaAnalyticsDataClient } from "@google-analytics/data"
// // import { buildGA4Query } from "./ga4QueryBuilder"

// // /* ----------------------------- */
// // /* SINGLETON CLIENT */
// // /* ----------------------------- */

// // let client: BetaAnalyticsDataClient | null = null

// // function getClient() {

// //   if (!client) {

// //     client = new BetaAnalyticsDataClient({
// //       keyFilename: process.env.GA_KEY_FILE,
// //     })

// //   }

// //   return client
// // }

// // /* ----------------------------- */
// // /* DATE CLAMP */
// // /* ----------------------------- */

// // function clampDateRange(startDate: string, endDate: string) {

// //   if (
// //     startDate?.includes("daysAgo") ||
// //     endDate === "today"
// //   ) {
// //     return { startDate, endDate }
// //   }

// //   const end = new Date(endDate)
// //   const start = new Date(startDate)

// //   if (isNaN(end.getTime()) || isNaN(start.getTime())) {

// //     return {
// //       startDate: "7daysAgo",
// //       endDate: "today",
// //     }

// //   }

// //   const diffDays =
// //     (end.getTime() - start.getTime()) /
// //     (1000 * 60 * 60 * 24)

// //   if (diffDays > 30) {
// //     start.setDate(end.getDate() - 30)
// //   }

// //   return {
// //     startDate: start.toISOString().split("T")[0],
// //     endDate: end.toISOString().split("T")[0],
// //   }
// // }

// // /* ----------------------------- */
// // /* SAFE GA EXECUTION */
// // /* ----------------------------- */

// // async function runGA4Report(request: any) {

// //   const client = getClient()

// //   const timeout = new Promise((_, reject) =>
// //     setTimeout(() => reject(new Error("GA4 timeout")), 30000)
// //   )

// //   const report = client.runReport(request)

// //   return Promise.race([report, timeout])
// // }

// // /* ----------------------------- */
// // /* UNIVERSAL FETCH */
// // /* ----------------------------- */

// // export async function fetchTOFU(
// //   propertyId: string,
// //   startDate: string,
// //   endDate: string,
// //   models: string[] | string,
// //   report: "TOFU" | "MOFU" | "TREND" = "TOFU"
// // ) {

// //   try {

// //     const range = clampDateRange(startDate, endDate)

// //     const requestBody = buildGA4Query({
// //       report,
// //       startDate: range.startDate,
// //       endDate: range.endDate,
// //       models,
// //     })

// //     const [response]: any = await runGA4Report({
// //       property: `properties/${propertyId}`,
// //       ...requestBody,
// //     })

// //     if (!response?.rows) return []

// //     return response.rows

// //   } catch (error) {

// //     console.error(`GA4 ${report} Fetch Error:`, error)

// //     return []

// //   }

// // }

// // /* ----------------------------- */
// // /* MOFU FETCH */
// // /* ----------------------------- */

// // export async function fetchMOFU(
// //   propertyId: string,
// //   startDate: string,
// //   endDate: string,
// //   models: string[] | string
// // ) {

// //   return fetchTOFU(
// //     propertyId,
// //     startDate,
// //     endDate,
// //     models,
// //     "MOFU"
// //   )

// // }

// // /* ----------------------------- */
// // /* ENGAGEMENT REPORT */
// // /* ----------------------------- */

// // export async function fetchEngagement(
// //   propertyId: string,
// //   startDate: string,
// //   endDate: string,
// //   models: string[] = [],
// //   trafficType: string = "overall"
// // ) {

// //   try {

// //     const range = clampDateRange(startDate, endDate)

// //     const request: any = {

// //       property: `properties/${propertyId}`,

// //       dateRanges: [
// //         {
// //           startDate: range.startDate,
// //           endDate: range.endDate,
// //         },
// //       ],

// //       dimensions: [
// //         { name: "date" },
// //       ],

// //       metrics: [
// //         { name: "screenPageViews" },
// //         { name: "totalUsers" },
// //         { name: "averageSessionDuration" },
// //       ],

// //     }

// //     /* ----------------------------- */
// //     /* MODEL FILTER */
// // /* ----------------------------- */

// //     if (models?.length) {

// //       request.dimensionFilter = {

// //         filter: {

// //           fieldName: "pagePath",

// //           stringFilter: {

// //             matchType: "PARTIAL_REGEXP",

// //             value: models.join("|")

// //           }

// //         }

// //       }

// //     }

// //     const [response]: any = await runGA4Report(request)

// //     if (!response?.rows) return []

// //     return response.rows.map((row: any) => {

// //       const date =
// //         row.dimensionValues?.[0]?.value || ""

// //       const pv =
// //         Number(row.metricValues?.[0]?.value || 0)

// //       const users =
// //         Number(row.metricValues?.[1]?.value || 0)

// //       const duration =
// //         Number(row.metricValues?.[2]?.value || 0)

// //       return {

// //         date,

// //         pv_uu: users ? pv / users : 0,

// //         avg_session_duration: duration / 60,

// //       }

// //     })

// //   } catch (error) {

// //     console.error("GA4 Engagement Fetch Error:", error)

// //     return []

// //   }

// // }











// import { BetaAnalyticsDataClient } from "@google-analytics/data"
// import { buildGA4Query } from "./ga4QueryBuilder"

// /* ----------------------------- */
// /* SINGLETON CLIENT */
// /* ----------------------------- */

// let client: BetaAnalyticsDataClient | null = null

// function getClient() {

//   if (!client) {
//     client = new BetaAnalyticsDataClient({
//       keyFilename: process.env.GA_KEY_FILE,
//     })
//   }

//   return client
// }

// /* ----------------------------- */
// /* DATE CLAMP */
// /* ----------------------------- */

// function clampDateRange(startDate: string, endDate: string) {

//   if (
//     startDate?.includes("daysAgo") ||
//     endDate === "today"
//   ) {
//     return { startDate, endDate }
//   }

//   const end = new Date(endDate)
//   const start = new Date(startDate)

//   if (isNaN(end.getTime()) || isNaN(start.getTime())) {
//     return {
//       startDate: "7daysAgo",
//       endDate: "today",
//     }
//   }

//   const diffDays =
//     (end.getTime() - start.getTime()) /
//     (1000 * 60 * 60 * 24)

//   if (diffDays > 30) {
//     start.setDate(end.getDate() - 30)
//   }

//   return {
//     startDate: start.toISOString().split("T")[0],
//     endDate: end.toISOString().split("T")[0],
//   }
// }

// /* ----------------------------- */
// /* SAFE GA EXECUTION */
// /* ----------------------------- */

// async function runGA4Report(request: any) {

//   const client = getClient()

//   const timeout = new Promise((_, reject) =>
//     setTimeout(() => reject(new Error("GA4 timeout")), 30000)
//   )

//   const report = client.runReport(request)

//   return Promise.race([report, timeout])
// }

// /* ----------------------------- */
// /* UNIVERSAL FETCH */
// /* ----------------------------- */

// export async function fetchTOFU(
//   propertyId: string,
//   startDate: string,
//   endDate: string,
//   models: string[] | string,
//   report: "TOFU" | "MOFU" | "TREND" = "TOFU"
// ) {

//   try {

//     const range = clampDateRange(startDate, endDate)

//     const requestBody = buildGA4Query({
//       report,
//       startDate: range.startDate,
//       endDate: range.endDate,
//       models,
//     })

//     const [response]: any = await runGA4Report({
//       property: `properties/${propertyId}`,
//       ...requestBody,
//     })

//     if (!response?.rows) return []

//     return response.rows

//   } catch (error) {

//     console.error(`GA4 ${report} Fetch Error:`, error)

//     return []

//   }

// }

// /* ----------------------------- */
// /* MOFU FETCH */
// /* ----------------------------- */

// export async function fetchMOFU(
//   propertyId: string,
//   startDate: string,
//   endDate: string,
//   models: string[] | string
// ) {

//   return fetchTOFU(
//     propertyId,
//     startDate,
//     endDate,
//     models,
//     "MOFU"
//   )

// }

// /* ----------------------------- */
// /* ENGAGEMENT REPORT */
// /* ----------------------------- */

// export async function fetchEngagement(
//   propertyId: string,
//   startDate: string,
//   endDate: string
// ) {

//   try {

//     const range = clampDateRange(startDate, endDate)

//     const [response]: any = await runGA4Report({

//       property: `properties/${propertyId}`,

//       dateRanges: [
//         {
//           startDate: range.startDate,
//           endDate: range.endDate,
//         },
//       ],

//       dimensions: [
//         { name: "date" }
//       ],

//       metrics: [
//         { name: "screenPageViews" },
//         { name: "totalUsers" },
//         { name: "averageSessionDuration" }
//       ]

//     })

//     if (!response?.rows) return []

//     return response.rows.map((row: any) => {

//       const date =
//         row.dimensionValues?.[0]?.value || ""

//       const pageViews =
//         Number(row.metricValues?.[0]?.value ?? 0)

//       const users =
//         Number(row.metricValues?.[1]?.value ?? 1)

//       const sessionDuration =
//         Number(row.metricValues?.[2]?.value ?? 0)

//       return {

//         date,

//         pv_uu: users ? pageViews / users : 0,

//         avg_session_duration: sessionDuration / 60

//       }

//     })

//   } catch (error) {

//     console.error("GA4 Engagement Fetch Error:", error)

//     return []

//   }

// }









import { BetaAnalyticsDataClient } from "@google-analytics/data"
import { buildGA4Query } from "./ga4QueryBuilder"

/* ----------------------------- */
/* SINGLETON CLIENT */
/* ----------------------------- */

let client: BetaAnalyticsDataClient | null = null

function getClient() {

  if (!client) {
    client = new BetaAnalyticsDataClient({
      keyFilename: process.env.GA_KEY_FILE,
    })
  }

  return client
}

/* ----------------------------- */
/* SIMPLE IN-MEMORY CACHE */
/* ----------------------------- */

const gaCache = new Map<string, any>()
const CACHE_TTL = 60 * 1000 // 1 minute

function getCacheKey(request: any) {
  return JSON.stringify(request)
}

function setCache(key: string, value: any) {
  gaCache.set(key, {
    value,
    timestamp: Date.now()
  })
}

function getCache(key: string) {

  const cached = gaCache.get(key)

  if (!cached) return null

  const isExpired =
    Date.now() - cached.timestamp > CACHE_TTL

  if (isExpired) {
    gaCache.delete(key)
    return null
  }

  return cached.value
}

/* ----------------------------- */
/* DATE CLAMP */
/* ----------------------------- */

function clampDateRange(startDate: string, endDate: string) {

  if (
    startDate?.includes("daysAgo") ||
    endDate === "today"
  ) {
    return { startDate, endDate }
  }

  const end = new Date(endDate)
  const start = new Date(startDate)

  if (isNaN(end.getTime()) || isNaN(start.getTime())) {
    return {
      startDate: "7daysAgo",
      endDate: "today",
    }
  }

  const diffDays =
    (end.getTime() - start.getTime()) /
    (1000 * 60 * 60 * 24)

  if (diffDays > 30) {
    start.setDate(end.getDate() - 30)
  }

  return {
    startDate: start.toISOString().split("T")[0],
    endDate: end.toISOString().split("T")[0],
  }
}

/* ----------------------------- */
/* SAFE GA EXECUTION + CACHE */
/* ----------------------------- */

async function runGA4Report(request: any) {

  const key = getCacheKey(request)

  const cached = getCache(key)
  if (cached) return cached

  const client = getClient()

  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error("GA4 timeout")), 35000)
  )

  const report = client.runReport(request)

  const result = await Promise.race([report, timeout])

  setCache(key, result)

  return result
}

/* ----------------------------- */
/* UNIVERSAL FETCH */
/* ----------------------------- */

export async function fetchTOFU(
  propertyId: string,
  startDate: string,
  endDate: string,
  models: string[] | string,
  report: "TOFU" | "MOFU" | "TREND" | "TRAFFIC_EROSION" = "TOFU"
) {

  try {

    const range = clampDateRange(startDate, endDate)

    const requestBody = buildGA4Query({
      report,
      startDate: range.startDate,
      endDate: range.endDate,
      models,
    })

    const [response]: any = await runGA4Report({
      property: `properties/${propertyId}`,
      ...requestBody,
    })

    if (!response?.rows) return []

    return response.rows

  } catch (error) {

    console.error(`GA4 ${report} Fetch Error:`, error)

    return []

  }

}

/* ----------------------------- */
/* MOFU FETCH */
/* ----------------------------- */

export async function fetchMOFU(
  propertyId: string,
  startDate: string,
  endDate: string,
  models: string[] | string
) {

  return fetchTOFU(
    propertyId,
    startDate,
    endDate,
    models,
    "MOFU"
  )

}

/* ----------------------------- */
/* ENGAGEMENT REPORT */
/* ----------------------------- */

export async function fetchEngagement(
  propertyId: string,
  startDate: string,
  endDate: string
) {

  try {

    const range = clampDateRange(startDate, endDate)

    const request = {

      property: `properties/${propertyId}`,

      dateRanges: [
        {
          startDate: range.startDate,
          endDate: range.endDate,
        },
      ],

      dimensions: [
        { name: "date" }
      ],

      metrics: [
        { name: "screenPageViews" },
        { name: "totalUsers" },
        { name: "averageSessionDuration" }
      ]

    }

    const [response]: any = await runGA4Report(request)

    if (!response?.rows) return []

    return response.rows.map((row: any) => {

      const date =
        row.dimensionValues?.[0]?.value || ""

      const pageViews =
        Number(row.metricValues?.[0]?.value ?? 0)

      const users =
        Number(row.metricValues?.[1]?.value ?? 1)

      const sessionDuration =
        Number(row.metricValues?.[2]?.value ?? 0)

      return {

        date,

        pv_uu: users ? pageViews / users : 0,

        avg_session_duration: sessionDuration / 60

      }

    })

  } catch (error) {

    console.error("GA4 Engagement Fetch Error:", error)

    return []

  }

}









