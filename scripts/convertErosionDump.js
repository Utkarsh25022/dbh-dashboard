// const XLSX = require("xlsx")
// const fs = require("fs")

// console.log("Reading Excel file...")

// const workbook = XLSX.readFile("./TE Calculation.xlsm", { dense: true })

// const sheet = workbook.Sheets[workbook.SheetNames[0]]

// const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 })

// console.log("Rows loaded:", rows.length)

// const result = []

// // Each model block = 2 columns
// for (let col = 0; col < rows[0].length; col += 2) {

//   const focusRaw = rows[0][col]

//   if (!focusRaw) continue

//   const focus = String(focusRaw).trim().toLowerCase()

//   let rank = 0

//   // start from row 2 (skip duplicate model row)
//   for (let r = 2; r < rows.length; r++) {

//     const competitorRaw = rows[r][col]
//     const usersRaw = rows[r][col + 1]

//     if (!competitorRaw || !usersRaw) continue

//     const competitor = String(competitorRaw).trim().toLowerCase()
// const users = Number(usersRaw)

// if (!users) continue

// // skip same model
// if (competitor === focus) continue

// rank++

//     result.push({
//       focus: focus,
//       competitor: competitor,
//       users: users,
//       rank: rank
//     })
//   }

//   console.log("Processed focus model:", focus)
// }

// console.log("Writing JSON...")

// if (!fs.existsSync("./data")) {
//   fs.mkdirSync("./data")
// }

// fs.writeFileSync(
//   "./data/traffic_erosion.json",
//   JSON.stringify(result, null, 2)
// )

// console.log("✅ Done")
// console.log("Total rows:", result.length)




// const XLSX = require("xlsx")
// const fs = require("fs")

// console.log("Reading Excel file...")

// const workbook = XLSX.readFile("./TE Calculation.xlsm", { dense: true })
// const sheet = workbook.Sheets[workbook.SheetNames[0]]

// const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 })

// console.log("Rows loaded:", rows.length)

// const erosion = []
// const reverseMap = {}

// // Each model block = 2 columns
// for (let col = 0; col < rows[0].length; col += 2) {

//   const focusRaw = rows[0][col]
//   if (!focusRaw) continue

//   const focus = String(focusRaw).trim().toLowerCase()
//   let rank = 0

//   for (let r = 2; r < rows.length; r++) {

//     const competitorRaw = rows[r][col]
//     const usersRaw = rows[r][col + 1]

//     if (!competitorRaw || !usersRaw) continue

//     const competitor = String(competitorRaw).trim().toLowerCase()
//     const users = Number(usersRaw)

//     if (!users) continue
//     if (competitor === focus) continue

//     rank++

//     // TRAFFIC EROSION
//     erosion.push({
//       focus,
//       competitor,
//       users,
//       rank
//     })

//     // REVERSE TRAFFIC EROSION
//     const key = competitor + "||" + focus

//     if (!reverseMap[key]) {
//       reverseMap[key] = {
//         focus: competitor,
//         competitor: focus,
//         users: 0
//       }
//     }

//     reverseMap[key].users += users
//   }

//   console.log("Processed focus model:", focus)
// }

// console.log("Calculating reverse ranks...")

// const reverse = Object.values(reverseMap)

// // group by focus
// const grouped = {}

// reverse.forEach(row => {
//   if (!grouped[row.focus]) grouped[row.focus] = []
//   grouped[row.focus].push(row)
// })

// // rank competitors
// Object.values(grouped).forEach(list => {

//   list.sort((a,b)=> b.users - a.users)

//   list.forEach((row,i)=>{
//     row.rank = i + 1
//   })

// })

// const reverseResult = Object.values(grouped).flat()

// console.log("Writing JSON files...")

// if (!fs.existsSync("./data")) {
//   fs.mkdirSync("./data")
// }

// fs.writeFileSync(
//   "./data/traffic_erosion.json",
//   JSON.stringify(erosion, null, 2)
// )

// fs.writeFileSync(
//   "./data/reverse_traffic_erosion.json",
//   JSON.stringify(reverseResult, null, 2)
// )

// console.log("✅ Done")
// console.log("Traffic erosion rows:", erosion.length)
// console.log("Reverse erosion rows:", reverseResult.length)











const XLSX = require("xlsx")
const fs = require("fs")

function normalize(str) {
  return String(str)
    .toLowerCase()
    .replace(/[_-]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

console.log("Reading Excel file...")

const workbook = XLSX.readFile("./TE Calculation.xlsm", { dense: true })
const sheet = workbook.Sheets[workbook.SheetNames[0]]

const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 })

console.log("Rows loaded:", rows.length)

const erosion = []
const reverseMap = {}

/* -------------------------------- */
/* PARSE TRAFFIC EROSION FROM SHEET */
/* -------------------------------- */

for (let col = 0; col < rows[0].length; col += 2) {

  const focusRaw = rows[0][col]
  if (!focusRaw) continue

  const focus = normalize(focusRaw)

  let rank = 0

  for (let r = 2; r < rows.length; r++) {

    const competitorRaw = rows[r][col]
    const usersRaw = rows[r][col + 1]

    if (!competitorRaw || !usersRaw) continue

    const competitor = normalize(competitorRaw)
    const users = Number(usersRaw)

    if (!users) continue
    if (competitor === focus) continue

    rank++

    /* --------------------------- */
    /* TRAFFIC EROSION DATASET     */
    /* --------------------------- */

    erosion.push({
      focus,
      competitor,
      users,
      rank
    })

    /* --------------------------- */
    /* BUILD REVERSE RELATIONSHIP  */
    /* competitor -> focus         */
    /* --------------------------- */

    const key = competitor + "|" + focus

    if (!reverseMap[key]) {
      reverseMap[key] = {
        focus: competitor,
        competitor: focus,
        users: 0
      }
    }

    reverseMap[key].users += users
  }

  console.log("Processed focus model:", focus)
}

/* -------------------------------- */
/* CALCULATE REVERSE RANKS          */
/* -------------------------------- */

console.log("Calculating reverse ranks...")

const reverseRows = Object.values(reverseMap)

const grouped = {}

reverseRows.forEach(row => {

  if (!grouped[row.focus]) {
    grouped[row.focus] = []
  }

  grouped[row.focus].push(row)

})

Object.values(grouped).forEach(list => {

  list.sort((a, b) => b.users - a.users)

  list.forEach((row, i) => {
    row.rank = i + 1
  })

})

const reverseResult = Object.values(grouped).flat()

/* -------------------------------- */
/* WRITE JSON FILES                 */
/* -------------------------------- */

console.log("Writing JSON files...")

if (!fs.existsSync("./data")) {
  fs.mkdirSync("./data")
}

fs.writeFileSync(
  "./data/traffic_erosion.json",
  JSON.stringify(erosion, null, 2)
)

fs.writeFileSync(
  "./data/reverse_traffic_erosion.json",
  JSON.stringify(reverseResult, null, 2)
)

console.log("✅ Done")
console.log("Traffic erosion rows:", erosion.length)
console.log("Reverse erosion rows:", reverseResult.length)