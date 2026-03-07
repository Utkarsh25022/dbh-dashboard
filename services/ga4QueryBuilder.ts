// // // // // // // export type GAReportType =
// // // // // // //   | "TOFU"
// // // // // // //   | "MOFU"
// // // // // // //   | "TREND"
// // // // // // //   | "TRAFFIC_EROSION"

// // // // // // // interface BuildQueryParams {
// // // // // // //   report: GAReportType
// // // // // // //   models?: string[] | string
// // // // // // //   startDate: string
// // // // // // //   endDate: string
// // // // // // // }

// // // // // // // export function buildGA4Query({
// // // // // // //   report,
// // // // // // //   models = [],
// // // // // // //   startDate,
// // // // // // //   endDate,
// // // // // // // }: BuildQueryParams) {

// // // // // // //   const baseFilters = [
// // // // // // //     hostnameFilter(),
// // // // // // //     organicExcludeFilter(),
// // // // // // //   ]

// // // // // // //   /* ----------------------------- */
// // // // // // //   /* SANITIZE MODEL LIST */
// // // // // // //   /* ----------------------------- */

// // // // // // //   const modelArray = (Array.isArray(models)
// // // // // // //     ? models
// // // // // // //     : models.split(","))
// // // // // // //     .map((m) => m.trim().toLowerCase())
// // // // // // //     .filter(Boolean)

// // // // // // //   switch (report) {

// // // // // // //     case "TOFU":
// // // // // // //       return {
// // // // // // //         dateRanges: [{ startDate, endDate }],
// // // // // // //         dimensions: [{ name: "customEvent:modelName" }],
// // // // // // //         metrics: [
// // // // // // //           { name: "totalUsers" },
// // // // // // //           { name: "screenPageViews" }
// // // // // // //         ],
// // // // // // //         limit: 2000,
// // // // // // //         dimensionFilter: andGroup([
// // // // // // //           ...baseFilters,
// // // // // // //           modelFilter(modelArray),
// // // // // // //         ]),
// // // // // // //       }

// // // // // // //     case "MOFU":
// // // // // // //       return {
// // // // // // //         dateRanges: [{ startDate, endDate }],
// // // // // // //         dimensions: [{ name: "customEvent:modelName" }],
// // // // // // //         metrics: [{ name: "screenPageViews" }],
// // // // // // //         limit: 2000,
// // // // // // //         dimensionFilter: andGroup([
// // // // // // //           ...baseFilters,
// // // // // // //           modelFilter(modelArray),
// // // // // // //           mofuFilter(),
// // // // // // //         ]),
// // // // // // //       }

// // // // // // //     case "TREND":
// // // // // // //       return {
// // // // // // //         dateRanges: [{ startDate, endDate }],
// // // // // // //         dimensions: [
// // // // // // //           { name: "date" },
// // // // // // //           { name: "customEvent:modelName" },
// // // // // // //         ],
// // // // // // //         metrics: [{ name: "totalUsers" }],
// // // // // // //         limit: 2000,
// // // // // // //         dimensionFilter: andGroup([
// // // // // // //           ...baseFilters,
// // // // // // //           modelFilter(modelArray),
// // // // // // //         ]),
// // // // // // //       }

// // // // // // //     default:
// // // // // // //       throw new Error("Unknown report type")
// // // // // // //   }
// // // // // // // }

// // // // // // // /* ----------------------------- */
// // // // // // // /* FILTERS */
// // // // // // // /* ----------------------------- */

// // // // // // // function hostnameFilter() {
// // // // // // //   return {
// // // // // // //     filter: {
// // // // // // //       fieldName: "hostName",
// // // // // // //       stringFilter: {
// // // // // // //         matchType: "CONTAINS",
// // // // // // //         value: "cardekho",
// // // // // // //         caseSensitive: false,
// // // // // // //       },
// // // // // // //     },
// // // // // // //   }
// // // // // // // }

// // // // // // // function organicExcludeFilter() {
// // // // // // //   return {
// // // // // // //     notExpression: {
// // // // // // //       filter: {
// // // // // // //         fieldName: "sessionSourceMedium",
// // // // // // //         stringFilter: {
// // // // // // //           matchType: "CONTAINS",
// // // // // // //           value: "cpc",
// // // // // // //           caseSensitive: false,
// // // // // // //         },
// // // // // // //       },
// // // // // // //     },
// // // // // // //   }
// // // // // // // }

// // // // // // // function mofuFilter() {
// // // // // // //   return {
// // // // // // //     filter: {
// // // // // // //       fieldName: "pagePath",
// // // // // // //       stringFilter: {
// // // // // // //         matchType: "CONTAINS",
// // // // // // //         value: "price",
// // // // // // //         caseSensitive: false,
// // // // // // //       },
// // // // // // //     },
// // // // // // //   }
// // // // // // // }

// // // // // // // /* ----------------------------- */
// // // // // // // /* MULTI MODEL FILTER */
// // // // // // // /* ----------------------------- */

// // // // // // // function modelFilter(models: string[]) {

// // // // // // //   if (!models || models.length === 0) return null

// // // // // // //   return {
// // // // // // //     orGroup: {
// // // // // // //       expressions: models.map((model) => {

// // // // // // //         const regex = model
// // // // // // //           .toLowerCase()
// // // // // // //           .replace(/\s+/g, ".*")

// // // // // // //         return {
// // // // // // //           filter: {
// // // // // // //             fieldName: "customEvent:modelName",

// // // // // // //             stringFilter: {
// // // // // // //               matchType: "FULL_REGEXP",
// // // // // // //               value: `.*${regex}.*`,
// // // // // // //               caseSensitive: false
// // // // // // //             }
// // // // // // //           }
// // // // // // //         }

// // // // // // //       })
// // // // // // //     }
// // // // // // //   }

// // // // // // // }

// // // // // // // function andGroup(expressions: any[]) {
// // // // // // //   return {
// // // // // // //     andGroup: {
// // // // // // //       expressions: expressions.filter(Boolean),
// // // // // // //     },
// // // // // // //   }
// // // // // // // }






// // // // // // import { HOSTNAME_REGEX, ORGANIC_EXCLUDE, MOFU_REGEX } from "./sopFilters"

// // // // // // export type GAReportType =
// // // // // //   | "TOFU"
// // // // // //   | "MOFU"
// // // // // //   | "TREND"
// // // // // //   | "TRAFFIC_EROSION"

// // // // // // interface BuildQueryParams {
// // // // // //   report: GAReportType
// // // // // //   models?: string[] | string
// // // // // //   startDate: string
// // // // // //   endDate: string
// // // // // // }

// // // // // // export function buildGA4Query({
// // // // // //   report,
// // // // // //   models = [],
// // // // // //   startDate,
// // // // // //   endDate,
// // // // // // }: BuildQueryParams) {

// // // // // //   const baseFilters = [
// // // // // //     hostnameFilter(),
// // // // // //     organicExcludeFilter(),
// // // // // //   ]

// // // // // //   const modelArray = (Array.isArray(models)
// // // // // //     ? models
// // // // // //     : models.split(","))
// // // // // //     .map((m) => m.trim().toLowerCase())
// // // // // //     .filter(Boolean)

// // // // // //   switch (report) {

// // // // // //     case "TOFU":
// // // // // //       return {
// // // // // //         dateRanges: [{ startDate, endDate }],
// // // // // //         dimensions: [{ name: "customEvent:modelName" }],
// // // // // //         metrics: [
// // // // // //           { name: "totalUsers" },
// // // // // //           { name: "screenPageViews" }
// // // // // //         ],
// // // // // //         limit: 2000,
// // // // // //         dimensionFilter: andGroup([
// // // // // //           ...baseFilters,
// // // // // //           modelFilter(modelArray),
// // // // // //         ]),
// // // // // //       }

// // // // // //     case "MOFU":
// // // // // //       return {
// // // // // //         dateRanges: [{ startDate, endDate }],
// // // // // //         dimensions: [{ name: "customEvent:modelName" }],
// // // // // //         metrics: [{ name: "screenPageViews" }],
// // // // // //         limit: 2000,
// // // // // //         dimensionFilter: andGroup([
// // // // // //           ...baseFilters,
// // // // // //           modelFilter(modelArray),
// // // // // //           mofuFilter(),
// // // // // //         ]),
// // // // // //       }

// // // // // //     case "TREND":
// // // // // //       return {
// // // // // //         dateRanges: [{ startDate, endDate }],
// // // // // //         dimensions: [
// // // // // //           { name: "date" },
// // // // // //           { name: "customEvent:modelName" },
// // // // // //         ],
// // // // // //         metrics: [{ name: "totalUsers" }],
// // // // // //         limit: 2000,
// // // // // //         dimensionFilter: andGroup([
// // // // // //           ...baseFilters,
// // // // // //           modelFilter(modelArray),
// // // // // //         ]),
// // // // // //       }

// // // // // //     default:
// // // // // //       throw new Error("Unknown report type")
// // // // // //   }
// // // // // // }

// // // // // // /* ----------------------------- */
// // // // // // /* FILTERS */
// // // // // // /* ----------------------------- */

// // // // // // function hostnameFilter() {
// // // // // //   return {
// // // // // //     filter: {
// // // // // //       fieldName: "hostName",
// // // // // //       stringFilter: {
// // // // // //         matchType: "FULL_REGEXP",
// // // // // //         value: HOSTNAME_REGEX,
// // // // // //         caseSensitive: false,
// // // // // //       },
// // // // // //     },
// // // // // //   }
// // // // // // }

// // // // // // function organicExcludeFilter() {
// // // // // //   return {
// // // // // //     notExpression: {
// // // // // //       filter: {
// // // // // //         fieldName: "sessionSourceMedium",
// // // // // //         stringFilter: {
// // // // // //           matchType: "FULL_REGEXP",
// // // // // //           value: ORGANIC_EXCLUDE,
// // // // // //           caseSensitive: false,
// // // // // //         },
// // // // // //       },
// // // // // //     },
// // // // // //   }
// // // // // // }

// // // // // // function mofuFilter() {
// // // // // //   return {
// // // // // //     filter: {
// // // // // //       fieldName: "pagePath",
// // // // // //       stringFilter: {
// // // // // //         matchType: "FULL_REGEXP",
// // // // // //         value: MOFU_REGEX,
// // // // // //         caseSensitive: false,
// // // // // //       },
// // // // // //     },
// // // // // //   }
// // // // // // }

// // // // // // /* ----------------------------- */
// // // // // // /* MODEL FILTER */
// // // // // // /* ----------------------------- */

// // // // // // function modelFilter(models: string[]) {

// // // // // //   if (!models || models.length === 0) return null

// // // // // //   return {
// // // // // //     orGroup: {
// // // // // //       expressions: models.map((model) => {

// // // // // //         const regex = model
// // // // // //           .toLowerCase()
// // // // // //           .replace(/\s+/g, ".*")

// // // // // //         return {
// // // // // //           filter: {
// // // // // //             fieldName: "customEvent:modelName",
// // // // // //             stringFilter: {
// // // // // //               matchType: "FULL_REGEXP",
// // // // // //               value: `.*${regex}.*`,
// // // // // //               caseSensitive: false
// // // // // //             }
// // // // // //           }
// // // // // //         }

// // // // // //       })
// // // // // //     }
// // // // // //   }

// // // // // // }

// // // // // // function andGroup(expressions: any[]) {
// // // // // //   return {
// // // // // //     andGroup: {
// // // // // //       expressions: expressions.filter(Boolean),
// // // // // //     },
// // // // // //   }
// // // // // // }




















// // // // // import { HOSTNAME_REGEX, ORGANIC_EXCLUDE, MOFU_REGEX } from "./sopFilters"

// // // // // export type GAReportType =
// // // // //   | "TOFU"
// // // // //   | "MOFU"
// // // // //   | "TREND"
// // // // //   | "TRAFFIC_EROSION"

// // // // // interface BuildQueryParams {
// // // // //   report: GAReportType
// // // // //   models?: string[] | string
// // // // //   startDate: string
// // // // //   endDate: string
// // // // // }

// // // // // export function buildGA4Query({
// // // // //   report,
// // // // //   models = [],
// // // // //   startDate,
// // // // //   endDate,
// // // // // }: BuildQueryParams) {

// // // // //   const baseFilters = [
// // // // //     hostnameFilter(),
// // // // //     organicExcludeFilter(),
// // // // //   ]

// // // // //   const modelArray = (Array.isArray(models)
// // // // //     ? models
// // // // //     : models.split(","))
// // // // //     .map((m) => m.trim().toLowerCase())
// // // // //     .filter(Boolean)

// // // // //   switch (report) {

// // // // //     case "TOFU":
// // // // //       return {
// // // // //         dateRanges: [{ startDate, endDate }],
// // // // //         dimensions: [{ name: "customEvent:modelName" }],
// // // // //         metrics: [
// // // // //           { name: "totalUsers" },
// // // // //           { name: "screenPageViews" }
// // // // //         ],
// // // // //         limit: 2000,
// // // // //         dimensionFilter: andGroup([
// // // // //           ...baseFilters,
// // // // //           modelFilter(modelArray),
// // // // //         ]),
// // // // //       }

// // // // //     case "MOFU":
// // // // //       return {
// // // // //         dateRanges: [{ startDate, endDate }],
// // // // //         dimensions: [{ name: "customEvent:modelName" }],
// // // // //         metrics: [{ name: "screenPageViews" }],
// // // // //         limit: 2000,
// // // // //         dimensionFilter: andGroup([
// // // // //           ...baseFilters,
// // // // //           modelFilter(modelArray),
// // // // //           mofuFilter(),
// // // // //         ]),
// // // // //       }

// // // // //     case "TREND":
// // // // //       return {
// // // // //         dateRanges: [{ startDate, endDate }],
// // // // //         dimensions: [
// // // // //           { name: "date" },
// // // // //           { name: "customEvent:modelName" },
// // // // //         ],
// // // // //         metrics: [{ name: "totalUsers" }],
// // // // //         limit: 2000,
// // // // //         dimensionFilter: andGroup([
// // // // //           ...baseFilters,
// // // // //           modelFilter(modelArray),
// // // // //         ]),
// // // // //       }

// // // // //     default:
// // // // //       throw new Error("Unknown report type")
// // // // //   }
// // // // // }

// // // // // /* ----------------------------- */
// // // // // /* FILTERS */
// // // // // /* ----------------------------- */

// // // // // function hostnameFilter() {
// // // // //   return {
// // // // //     filter: {
// // // // //       fieldName: "hostName",
// // // // //       stringFilter: {
// // // // //         matchType: "FULL_REGEXP",
// // // // //         value: HOSTNAME_REGEX,
// // // // //         caseSensitive: false,
// // // // //       },
// // // // //     },
// // // // //   }
// // // // // }

// // // // // function organicExcludeFilter() {
// // // // //   return {
// // // // //     notExpression: {
// // // // //       filter: {
// // // // //         fieldName: "sessionSourceMedium",
// // // // //         stringFilter: {
// // // // //           matchType: "FULL_REGEXP",
// // // // //           value: ORGANIC_EXCLUDE,
// // // // //           caseSensitive: false,
// // // // //         },
// // // // //       },
// // // // //     },
// // // // //   }
// // // // // }

// // // // // function mofuFilter() {
// // // // //   return {
// // // // //     filter: {
// // // // //       fieldName: "pagePath",
// // // // //       stringFilter: {
// // // // //         matchType: "FULL_REGEXP",
// // // // //         value: MOFU_REGEX,
// // // // //         caseSensitive: false,
// // // // //       },
// // // // //     },
// // // // //   }
// // // // // }

// // // // // /* ----------------------------- */
// // // // // /* MODEL FILTER */
// // // // // /* ----------------------------- */

// // // // // function modelFilter(models: string[]) {

// // // // //   if (!models || models.length === 0) return null

// // // // //   return {
// // // // //     orGroup: {
// // // // //       expressions: models.map((model) => {

// // // // //         const regex = model
// // // // //           .toLowerCase()
// // // // //           .replace(/\s+/g, ".*")

// // // // //         return {
// // // // //           filter: {
// // // // //             fieldName: "customEvent:modelName",
// // // // //             stringFilter: {
// // // // //               matchType: "FULL_REGEXP",
// // // // //               value: `.*${regex}.*`,
// // // // //               caseSensitive: false
// // // // //             }
// // // // //           }
// // // // //         }

// // // // //       })
// // // // //     }
// // // // //   }

// // // // // }

// // // // // function andGroup(expressions: any[]) {
// // // // //   return {
// // // // //     andGroup: {
// // // // //       expressions: expressions.filter(Boolean),
// // // // //     },
// // // // //   }
// // // // // }


// // // // import { HOSTNAME_REGEX, ORGANIC_EXCLUDE, MOFU_REGEX } from "./sopFilters"

// // // // export type GAReportType =
// // // //   | "TOFU"
// // // //   | "MOFU"
// // // //   | "TREND"
// // // //   | "TRAFFIC_EROSION"

// // // // interface BuildQueryParams {
// // // //   report: GAReportType
// // // //   models?: string[] | string
// // // //   startDate: string
// // // //   endDate: string
// // // // }

// // // // export function buildGA4Query({
// // // //   report,
// // // //   models = [],
// // // //   startDate,
// // // //   endDate,
// // // // }: BuildQueryParams) {

// // // //   const baseFilters = [
// // // //     hostnameFilter(),
// // // //     organicExcludeFilter(),
// // // //   ]

// // // //   const modelArray = (Array.isArray(models)
// // // //     ? models
// // // //     : models.split(","))
// // // //     .map((m) => m.trim().toLowerCase())
// // // //     .filter(Boolean)

// // // //   switch (report) {

// // // //     case "TOFU":
// // // //       return {
// // // //         dateRanges: [{ startDate, endDate }],
// // // //         dimensions: [{ name: "customEvent:modelName" }],
// // // //         metrics: [
// // // //           { name: "totalUsers" },
// // // //           { name: "screenPageViews" }
// // // //         ],
// // // //         limit: 2000,
// // // //         dimensionFilter: andGroup([
// // // //           ...baseFilters,
// // // //           modelFilter(modelArray),
// // // //         ]),
// // // //       }

// // // //     case "MOFU":
// // // //       return {
// // // //         dateRanges: [{ startDate, endDate }],
// // // //         dimensions: [{ name: "customEvent:modelName" }],
// // // //         metrics: [{ name: "screenPageViews" }],
// // // //         limit: 2000,
// // // //         dimensionFilter: andGroup([
// // // //           ...baseFilters,
// // // //           modelFilter(modelArray),
// // // //           mofuFilter(),
// // // //         ]),
// // // //       }

// // // //     case "TREND":
// // // //       return {
// // // //         dateRanges: [{ startDate, endDate }],
// // // //         dimensions: [
// // // //           { name: "date" },
// // // //           { name: "customEvent:modelName" },
// // // //         ],
// // // //         metrics: [{ name: "totalUsers" }],
// // // //         limit: 2000,
// // // //         dimensionFilter: andGroup([
// // // //           ...baseFilters,
// // // //           modelFilter(modelArray),
// // // //         ]),
// // // //       }

// // // //     default:
// // // //       throw new Error("Unknown report type")
// // // //   }
// // // // }

// // // // /* ----------------------------- */
// // // // /* FILTERS */
// // // // /* ----------------------------- */

// // // // function hostnameFilter() {
// // // //   return {
// // // //     filter: {
// // // //       fieldName: "hostName",
// // // //       stringFilter: {
// // // //         matchType: "FULL_REGEXP",
// // // //         value: HOSTNAME_REGEX,
// // // //         caseSensitive: false,
// // // //       },
// // // //     },
// // // //   }
// // // // }

// // // // function organicExcludeFilter() {
// // // //   return {
// // // //     notExpression: {
// // // //       filter: {
// // // //         fieldName: "sessionSourceMedium",
// // // //         stringFilter: {
// // // //           matchType: "FULL_REGEXP",
// // // //           value: ORGANIC_EXCLUDE,
// // // //           caseSensitive: false,
// // // //         },
// // // //       },
// // // //     },
// // // //   }
// // // // }

// // // // function mofuFilter() {
// // // //   return {
// // // //     filter: {
// // // //       fieldName: "pagePath",
// // // //       stringFilter: {
// // // //         matchType: "FULL_REGEXP",
// // // //         value: MOFU_REGEX,
// // // //         caseSensitive: false,
// // // //       },
// // // //     },
// // // //   }
// // // // }

// // // // /* ----------------------------- */
// // // // /* MODEL FILTER */
// // // // /* ----------------------------- */

// // // // function modelFilter(models: string[]) {

// // // //   if (!models || models.length === 0) return null

// // // //   return {
// // // //     orGroup: {
// // // //       expressions: models.map((model) => {

// // // //         /* normalize separators */
// // // //         const normalized = model
// // // //           .toLowerCase()
// // // //           .replace(/[_-]/g, " ")
// // // //           .trim()

// // // //         /* create flexible regex */
// // // //         const regex = normalized
// // // //           .split(" ")
// // // //           .filter(Boolean)
// // // //           .join(".*")

// // // //         return {
// // // //           filter: {
// // // //             fieldName: "customEvent:modelName",
// // // //             stringFilter: {
// // // //               matchType: "FULL_REGEXP",
// // // //               value: `.*${regex}.*`,
// // // //               caseSensitive: false
// // // //             }
// // // //           }
// // // //         }

// // // //       })
// // // //     }
// // // //   }

// // // // }

// // // // function andGroup(expressions: any[]) {
// // // //   return {
// // // //     andGroup: {
// // // //       expressions: expressions.filter(Boolean),
// // // //     },
// // // //   }
// // // // }

















// // // import { HOSTNAME_REGEX, ORGANIC_EXCLUDE, MOFU_REGEX } from "./sopFilters"

// // // export type GAReportType =
// // //   | "TOFU"
// // //   | "MOFU"
// // //   | "TREND"
// // //   | "TRAFFIC_EROSION"

// // // interface BuildQueryParams {
// // //   report: GAReportType
// // //   models?: string[] | string
// // //   startDate: string
// // //   endDate: string
// // // }

// // // export function buildGA4Query({
// // //   report,
// // //   models = [],
// // //   startDate,
// // //   endDate,
// // // }: BuildQueryParams) {

// // //   const baseFilters = [
// // //     hostnameFilter(),
// // //     organicExcludeFilter(),
// // //   ]

// // //   const modelArray = (Array.isArray(models)
// // //     ? models
// // //     : models.split(","))
// // //     .map((m) => m.trim().toLowerCase())
// // //     .filter(Boolean)

// // //   switch (report) {

// // //     case "TOFU":
// // //       return {
// // //         dateRanges: [{ startDate, endDate }],
// // //         dimensions: [{ name: "customEvent:modelName" }],
// // //         metrics: [
// // //           { name: "totalUsers" },
// // //           { name: "screenPageViews" }
// // //         ],
// // //         limit: 2000,
// // //         dimensionFilter: andGroup([
// // //           ...baseFilters,
// // //           modelFilter(modelArray),
// // //         ]),
// // //       }

// // //     case "MOFU":
// // //       return {
// // //         dateRanges: [{ startDate, endDate }],
// // //         dimensions: [{ name: "customEvent:modelName" }],
// // //         metrics: [{ name: "screenPageViews" }],
// // //         limit: 2000,
// // //         dimensionFilter: andGroup([
// // //           ...baseFilters,
// // //           modelFilter(modelArray),
// // //           mofuFilter(),
// // //         ]),
// // //       }

// // //     case "TREND":
// // //       return {
// // //         dateRanges: [{ startDate, endDate }],
// // //         dimensions: [
// // //           { name: "date" },
// // //           { name: "customEvent:modelName" },
// // //         ],
// // //         metrics: [{ name: "totalUsers" }],
// // //         limit: 2000,
// // //         dimensionFilter: andGroup([
// // //           ...baseFilters,
// // //           modelFilter(modelArray),
// // //         ]),
// // //       }

// // //     default:
// // //       throw new Error("Unknown report type")
// // //   }
// // // }

// // // /* ----------------------------- */
// // // /* FILTERS */
// // // /* ----------------------------- */

// // // function hostnameFilter() {
// // //   return {
// // //     filter: {
// // //       fieldName: "hostName",
// // //       stringFilter: {
// // //         matchType: "FULL_REGEXP",
// // //         value: HOSTNAME_REGEX,
// // //         caseSensitive: false,
// // //       },
// // //     },
// // //   }
// // // }

// // // function organicExcludeFilter() {
// // //   return {
// // //     notExpression: {
// // //       filter: {
// // //         fieldName: "sessionSourceMedium",
// // //         stringFilter: {
// // //           matchType: "FULL_REGEXP",
// // //           value: ORGANIC_EXCLUDE,
// // //           caseSensitive: false,
// // //         },
// // //       },
// // //     },
// // //   }
// // // }

// // // function mofuFilter() {
// // //   return {
// // //     filter: {
// // //       fieldName: "pagePath",
// // //       stringFilter: {
// // //         matchType: "FULL_REGEXP",
// // //         value: MOFU_REGEX,
// // //         caseSensitive: false,
// // //       },
// // //     },
// // //   }
// // // }

// // // /* ----------------------------- */
// // // /* MODEL FILTER */
// // // /* ----------------------------- */

// // // function escapeRegex(str: string) {
// // //   return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
// // // }

// // // function modelFilter(models: string[]) {

// // //   if (!models || models.length === 0) return null

// // //   return {
// // //     orGroup: {
// // //       expressions: models.map((model) => {

// // //         const normalized = model
// // //           .toLowerCase()
// // //           .replace(/[_-]/g, " ")
// // //           .trim()

// // //         const regex = normalized
// // //           .split(" ")
// // //           .filter(Boolean)
// // //           .join(".*")

// // //         return {
// // //           filter: {
// // //             fieldName: "customEvent:modelName",
// // //             stringFilter: {
// // //               matchType: "FULL_REGEXP",
// // //               value: `.*${regex}.*`,
// // //               caseSensitive: false
// // //             }
// // //           }
// // //         }

// // //       })
// // //     }
// // //   }

// // // }

// // // function andGroup(expressions: any[]) {
// // //   return {
// // //     andGroup: {
// // //       expressions: expressions.filter(Boolean),
// // //     },
// // //   }
// // // }

















// // import { HOSTNAME_REGEX, ORGANIC_EXCLUDE, MOFU_REGEX } from "./sopFilters"

// // export type GAReportType =
// //   | "TOFU"
// //   | "MOFU"
// //   | "TREND"
// //   | "TRAFFIC_EROSION"

// // interface BuildQueryParams {
// //   report: GAReportType
// //   models?: string[] | string
// //   startDate: string
// //   endDate: string
// // }

// // export function buildGA4Query({
// //   report,
// //   models = [],
// //   startDate,
// //   endDate,
// // }: BuildQueryParams) {

// //   const baseFilters = [
// //     hostnameFilter(),
// //     organicExcludeFilter(),
// //   ]

// //   const modelArray = (Array.isArray(models)
// //     ? models
// //     : models.split(","))
// //     .map((m) => m.trim().toLowerCase())
// //     .filter(Boolean)

// //   switch (report) {

// //     case "TOFU":
// //       return {
// //         dateRanges: [{ startDate, endDate }],
// //         dimensions: [
// //           { name: "customEvent:modelName" },
// //           { name: "pagePath" }   // ⭐ REQUIRED FOR TRAFFIC EROSION
// //         ],
// //         metrics: [
// //           { name: "totalUsers" },
// //           { name: "screenPageViews" }
// //         ],
// //         limit: 2000,
// //         dimensionFilter: andGroup([
// //           ...baseFilters,
// //           modelFilter(modelArray),
// //         ]),
// //       }

// //     case "MOFU":
// //       return {
// //         dateRanges: [{ startDate, endDate }],
// //         dimensions: [{ name: "customEvent:modelName" }],
// //         metrics: [{ name: "screenPageViews" }],
// //         limit: 2000,
// //         dimensionFilter: andGroup([
// //           ...baseFilters,
// //           modelFilter(modelArray),
// //           mofuFilter(),
// //         ]),
// //       }

// //     case "TREND":
// //       return {
// //         dateRanges: [{ startDate, endDate }],
// //         dimensions: [
// //           { name: "date" },
// //           { name: "customEvent:modelName" },
// //         ],
// //         metrics: [{ name: "totalUsers" }],
// //         limit: 2000,
// //         dimensionFilter: andGroup([
// //           ...baseFilters,
// //           modelFilter(modelArray),
// //         ]),
// //       }

// //     default:
// //       throw new Error("Unknown report type")
// //   }
// // }

// // /* ----------------------------- */
// // /* FILTERS */
// // /* ----------------------------- */

// // function hostnameFilter() {
// //   return {
// //     filter: {
// //       fieldName: "hostName",
// //       stringFilter: {
// //         matchType: "FULL_REGEXP",
// //         value: HOSTNAME_REGEX,
// //         caseSensitive: false,
// //       },
// //     },
// //   }
// // }

// // function organicExcludeFilter() {
// //   return {
// //     notExpression: {
// //       filter: {
// //         fieldName: "sessionSourceMedium",
// //         stringFilter: {
// //           matchType: "FULL_REGEXP",
// //           value: ORGANIC_EXCLUDE,
// //           caseSensitive: false,
// //         },
// //       },
// //     },
// //   }
// // }

// // function mofuFilter() {
// //   return {
// //     filter: {
// //       fieldName: "pagePath",
// //       stringFilter: {
// //         matchType: "FULL_REGEXP",
// //         value: MOFU_REGEX,
// //         caseSensitive: false,
// //       },
// //     },
// //   }
// // }

// // /* ----------------------------- */
// // /* MODEL FILTER */
// // /* ----------------------------- */

// // function escapeRegex(str: string) {
// //   return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
// // }

// // function modelFilter(models: string[]) {

// //   if (!models || models.length === 0) return null

// //   return {
// //     orGroup: {
// //       expressions: models.map((model) => {

// //         const normalized = model
// //           .toLowerCase()
// //           .replace(/[_-]/g, " ")
// //           .trim()

// //         const regex = normalized
// //           .split(" ")
// //           .filter(Boolean)
// //           .join(".*")

// //         return {
// //           filter: {
// //             fieldName: "customEvent:modelName",
// //             stringFilter: {
// //               matchType: "FULL_REGEXP",
// //               value: `.*${regex}.*`,
// //               caseSensitive: false
// //             }
// //           }
// //         }

// //       })
// //     }
// //   }

// // }

// // function andGroup(expressions: any[]) {
// //   return {
// //     andGroup: {
// //       expressions: expressions.filter(Boolean),
// //     },
// //   }
// // }









// import { HOSTNAME_REGEX, ORGANIC_EXCLUDE, MOFU_REGEX } from "./sopFilters"

// export type GAReportType =
//   | "TOFU"
//   | "MOFU"
//   | "TREND"
//   | "TRAFFIC_EROSION"

// interface BuildQueryParams {
//   report: GAReportType
//   models?: string[] | string
//   startDate: string
//   endDate: string
// }

// export function buildGA4Query({
//   report,
//   models = [],
//   startDate,
//   endDate,
// }: BuildQueryParams) {

//   const baseFilters = [
//     hostnameFilter(),
//     organicExcludeFilter(),
//   ]

//   const modelArray = (Array.isArray(models)
//     ? models
//     : models.split(","))
//     .map((m) => m.trim().toLowerCase())
//     .filter(Boolean)

//   switch (report) {

//     /* ----------------------------- */
//     /* TOFU (FAST) */
//     /* ----------------------------- */

//     case "TOFU":
//       return {
//         dateRanges: [{ startDate, endDate }],
//         dimensions: [
//           { name: "customEvent:modelName" }
//         ],
//         metrics: [
//           { name: "totalUsers" },
//           { name: "screenPageViews" }
//         ],
//         limit: 300, // reduced from 2000
//         dimensionFilter: andGroup([
//           ...baseFilters,
//           modelFilter(modelArray),
//         ]),
//       }

//     /* ----------------------------- */
//     /* MOFU */
//     /* ----------------------------- */

//     case "MOFU":
//       return {
//         dateRanges: [{ startDate, endDate }],
//         dimensions: [{ name: "customEvent:modelName" }],
//         metrics: [{ name: "screenPageViews" }],
//         limit: 300,
//         dimensionFilter: andGroup([
//           ...baseFilters,
//           modelFilter(modelArray),
//           mofuFilter(),
//         ]),
//       }

//     /* ----------------------------- */
//     /* TREND */
//     /* ----------------------------- */

//     case "TREND":
//       return {
//         dateRanges: [{ startDate, endDate }],
//         dimensions: [
//           { name: "date" },
//           { name: "customEvent:modelName" },
//         ],
//         metrics: [{ name: "totalUsers" }],
//         limit: 300,
//         dimensionFilter: andGroup([
//           ...baseFilters,
//           modelFilter(modelArray),
//         ]),
//       }

//     /* ----------------------------- */
//     /* TRAFFIC EROSION (SEPARATE QUERY) */
//     /* ----------------------------- */

//     case "TRAFFIC_EROSION":
//       return {
//         dateRanges: [{ startDate, endDate }],
//         dimensions: [
//           { name: "sessionManualTerm" },
//           { name: "pagePath" }
//         ],
//         metrics: [
//           { name: "totalUsers" }
//         ],
//         limit: 10000, // small to prevent dashboard freeze
//         dimensionFilter: andGroup([
//           ...baseFilters
//         ])
//       }

//     default:
//       throw new Error("Unknown report type")
//   }
// }

// /* ----------------------------- */
// /* FILTERS */
// /* ----------------------------- */

// function hostnameFilter() {
//   return {
//     filter: {
//       fieldName: "hostName",
//       stringFilter: {
//         matchType: "FULL_REGEXP",
//         value: HOSTNAME_REGEX,
//         caseSensitive: false,
//       },
//     },
//   }
// }

// function organicExcludeFilter() {
//   return {
//     notExpression: {
//       filter: {
//         fieldName: "sessionSourceMedium",
//         stringFilter: {
//           matchType: "FULL_REGEXP",
//           value: ORGANIC_EXCLUDE,
//           caseSensitive: false,
//         },
//       },
//     },
//   }
// }

// function mofuFilter() {
//   return {
//     filter: {
//       fieldName: "pagePath",
//       stringFilter: {
//         matchType: "FULL_REGEXP",
//         value: MOFU_REGEX,
//         caseSensitive: false,
//       },
//     },
//   }
// }

// /* ----------------------------- */
// /* MODEL FILTER */
// /* ----------------------------- */

// function escapeRegex(str: string) {
//   return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
// }

// function modelFilter(models: string[]) {

//   if (!models || models.length === 0) return null

//   return {
//     orGroup: {
//       expressions: models.map((model) => {

//         const normalized = model
//           .toLowerCase()
//           .replace(/[_-]/g, " ")
//           .trim()

//         const regex = normalized
//           .split(" ")
//           .filter(Boolean)
//           .join(".*")

//         return {
//           filter: {
//             fieldName: "customEvent:modelName",
//             stringFilter: {
//               matchType: "FULL_REGEXP",
//               value: `.*${regex}.*`,
//               caseSensitive: false
//             }
//           }
//         }

//       })
//     }
//   }

// }

// function andGroup(expressions: any[]) {
//   return {
//     andGroup: {
//       expressions: expressions.filter(Boolean),
//     },
//   }
// }
















// import { HOSTNAME_REGEX, ORGANIC_EXCLUDE, MOFU_REGEX } from "./sopFilters"

// export type GAReportType =
//   | "TOFU"
//   | "MOFU"
//   | "TREND"
//   | "TRAFFIC_EROSION"

// interface BuildQueryParams {
//   report: GAReportType
//   models?: string[] | string
//   startDate: string
//   endDate: string
//   trafficType?: "ORGANIC" | "INORGANIC" | "ALL"
// }

// export function buildGA4Query({
//   report,
//   models = [],
//   startDate,
//   endDate,
//   trafficType = "ORGANIC",
// }: BuildQueryParams) {

//   const baseFilters = [
//     hostnameFilter(),
//     trafficFilter(trafficType),
//   ]

//   const modelArray = (Array.isArray(models)
//     ? models
//     : models.split(","))
//     .map((m) => m.trim().toLowerCase())
//     .filter(Boolean)

//   switch (report) {

//     /* ----------------------------- */
//     /* TOFU */
//     /* ----------------------------- */

//     case "TOFU":
//       return {
//         dateRanges: [{ startDate, endDate }],
//         dimensions: [
//           { name: "customEvent:modelName" }
//         ],
//         metrics: [
//           { name: "totalUsers" },
//           { name: "screenPageViews" }
//         ],
//         limit: 300,
//         dimensionFilter: andGroup([
//           ...baseFilters,
//           modelFilter(modelArray),
//         ]),
//       }

//     /* ----------------------------- */
//     /* MOFU */
//     /* ----------------------------- */

//     case "MOFU":
//       return {
//         dateRanges: [{ startDate, endDate }],
//         dimensions: [{ name: "customEvent:modelName" }],
//         metrics: [{ name: "screenPageViews" }],
//         limit: 300,
//         dimensionFilter: andGroup([
//           ...baseFilters,
//           modelFilter(modelArray),
//           mofuFilter(),
//         ]),
//       }

//     /* ----------------------------- */
//     /* TREND */
//     /* ----------------------------- */

//     case "TREND":
//       return {
//         dateRanges: [{ startDate, endDate }],
//         dimensions: [
//           { name: "date" },
//           { name: "customEvent:modelName" },
//         ],
//         metrics: [{ name: "totalUsers" }],
//         limit: 300,
//         dimensionFilter: andGroup([
//           ...baseFilters,
//           modelFilter(modelArray),
//         ]),
//       }

//     /* ----------------------------- */
//     /* TRAFFIC EROSION */
//     /* ----------------------------- */

//     case "TRAFFIC_EROSION":
//       return {
//         dateRanges: [{ startDate, endDate }],
//         dimensions: [
//           { name: "sessionManualTerm" },
//           { name: "pagePath" }
//         ],
//         metrics: [
//           { name: "totalUsers" }
//         ],
//         limit: 10000,
//         dimensionFilter: andGroup(baseFilters)
//       }

//     default:
//       throw new Error("Unknown report type")
//   }
// }

// /* ----------------------------- */
// /* FILTERS */
// /* ----------------------------- */

// function hostnameFilter() {
//   return {
//     filter: {
//       fieldName: "hostName",
//       stringFilter: {
//         matchType: "FULL_REGEXP",
//         value: HOSTNAME_REGEX,
//         caseSensitive: false,
//       },
//     },
//   }
// }

// /* ----------------------------- */
// /* TRAFFIC FILTER */
// /* ----------------------------- */

// function trafficFilter(type?: "ORGANIC" | "INORGANIC" | "ALL") {

//   if (type === "ORGANIC") {
//     return {
//       notExpression: {
//         filter: {
//           fieldName: "sessionSourceMedium",
//           stringFilter: {
//             matchType: "FULL_REGEXP",
//             value: ORGANIC_EXCLUDE,
//             caseSensitive: false,
//           },
//         },
//       },
//     }
//   }

//   if (type === "INORGANIC") {
//     return {
//       filter: {
//         fieldName: "sessionSourceMedium",
//         stringFilter: {
//           matchType: "FULL_REGEXP",
//           value: ORGANIC_EXCLUDE,
//           caseSensitive: false,
//         },
//       },
//     }
//   }

//   return null
// }

// function mofuFilter() {
//   return {
//     filter: {
//       fieldName: "pagePath",
//       stringFilter: {
//         matchType: "FULL_REGEXP",
//         value: MOFU_REGEX,
//         caseSensitive: false,
//       },
//     },
//   }
// }

// /* ----------------------------- */
// /* MODEL FILTER */
// /* ----------------------------- */

// function modelFilter(models: string[]) {

//   if (!models || models.length === 0) return null

//   return {
//     orGroup: {
//       expressions: models.map((model) => {

//         const normalized = model
//           .toLowerCase()
//           .replace(/[_-]/g, " ")
//           .trim()

//         const regex = normalized
//           .split(" ")
//           .filter(Boolean)
//           .join(".*")

//         return {
//           filter: {
//             fieldName: "customEvent:modelName",
//             stringFilter: {
//               matchType: "FULL_REGEXP",
//               value: `.*${regex}.*`,
//               caseSensitive: false
//             }
//           }
//         }

//       })
//     }
//   }

// }

// /* ----------------------------- */
// /* AND GROUP */
// /* ----------------------------- */

// function andGroup(expressions: any[]) {
//   return {
//     andGroup: {
//       expressions: expressions.filter(Boolean),
//     },
//   }
// }







































import { HOSTNAME_REGEX, ORGANIC_EXCLUDE, MOFU_REGEX } from "./sopFilters"

export type GAReportType =
  | "TOFU"
  | "MOFU"
  | "TREND"
  | "TRAFFIC_EROSION"

interface BuildQueryParams {
  report: GAReportType
  models?: string[] | string
  startDate: string
  endDate: string
  trafficType?: string
}

export function buildGA4Query({
  report,
  models = [],
  startDate,
  endDate,
  trafficType = "organic",
}: BuildQueryParams) {

  const baseFilters = [
    hostnameFilter(),
    trafficFilter(trafficType),
  ]

  const modelArray = (Array.isArray(models)
    ? models
    : models.split(","))
    .map((m) => m.trim().toLowerCase())
    .filter(Boolean)

  switch (report) {

    /* ----------------------------- */
    /* TOFU */
    /* ----------------------------- */

    case "TOFU":
      return {
        dateRanges: [{ startDate, endDate }],
        dimensions: [
          { name: "customEvent:modelName" }
        ],
        metrics: [
          { name: "totalUsers" },
          { name: "screenPageViews" }
        ],
        limit: 300,
        dimensionFilter: andGroup([
          ...baseFilters,
          modelFilter(modelArray),
        ]),
      }

    /* ----------------------------- */
    /* MOFU */

    case "MOFU":
      return {
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: "customEvent:modelName" }],
        metrics: [{ name: "screenPageViews" }],
        limit: 300,
        dimensionFilter: andGroup([
          ...baseFilters,
          modelFilter(modelArray),
          mofuFilter(),
        ]),
      }

    /* ----------------------------- */
    /* TREND */

    case "TREND":
      return {
        dateRanges: [{ startDate, endDate }],
        dimensions: [
          { name: "date" },
          { name: "customEvent:modelName" },
        ],
        metrics: [{ name: "totalUsers" }],
        limit: 300,
        dimensionFilter: andGroup([
          ...baseFilters,
          modelFilter(modelArray),
        ]),
      }

    /* ----------------------------- */
    /* TRAFFIC EROSION */

    case "TRAFFIC_EROSION":
      return {
        dateRanges: [{ startDate, endDate }],
        dimensions: [
          { name: "sessionManualTerm" },
          { name: "pagePath" }
        ],
        metrics: [
          { name: "totalUsers" }
        ],
        limit: 10000,
        dimensionFilter: andGroup(baseFilters)
      }

    default:
      throw new Error("Unknown report type")
  }
}

/* ----------------------------- */
/* FILTERS */
/* ----------------------------- */

function hostnameFilter() {
  return {
    filter: {
      fieldName: "hostName",
      stringFilter: {
        matchType: "FULL_REGEXP",
        value: HOSTNAME_REGEX,
        caseSensitive: false,
      },
    },
  }
}

/* ----------------------------- */
/* TRAFFIC FILTER */
/* ----------------------------- */

function trafficFilter(type?: string) {

  if (!type) return null

  const traffic = type.toLowerCase()

  if (traffic === "organic") {
    return {
      notExpression: {
        filter: {
          fieldName: "sessionSourceMedium",
          stringFilter: {
            matchType: "FULL_REGEXP",
            value: ORGANIC_EXCLUDE,
            caseSensitive: false,
          },
        },
      },
    }
  }

  if (traffic === "inorganic") {
    return {
      filter: {
        fieldName: "sessionSourceMedium",
        stringFilter: {
          matchType: "FULL_REGEXP",
          value: ORGANIC_EXCLUDE,
          caseSensitive: false,
        },
      },
    }
  }

  if (traffic === "overall") {
    return null
  }

  return null
}

function mofuFilter() {
  return {
    filter: {
      fieldName: "pagePath",
      stringFilter: {
        matchType: "FULL_REGEXP",
        value: MOFU_REGEX,
        caseSensitive: false,
      },
    },
  }
}

/* ----------------------------- */
/* MODEL FILTER */
/* ----------------------------- */

function modelFilter(models: string[]) {

  if (!models || models.length === 0) return null

  return {
    orGroup: {
      expressions: models.map((model) => {

        const normalized = model
          .toLowerCase()
          .replace(/[_-]/g, " ")
          .trim()

        const regex = normalized
          .split(" ")
          .filter(Boolean)
          .join(".*")

        return {
          filter: {
            fieldName: "customEvent:modelName",
            stringFilter: {
              matchType: "FULL_REGEXP",
              value: `.*${regex}.*`,
              caseSensitive: false
            }
          }
        }

      })
    }
  }

}

/* ----------------------------- */
/* AND GROUP */
/* ----------------------------- */

function andGroup(expressions: any[]) {
  return {
    andGroup: {
      expressions: expressions.filter(Boolean),
    },
  }
}