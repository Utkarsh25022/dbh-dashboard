// 'use client'

// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

// type HeatmapRow = {
//   model: string
//   values: number[]
// }

// type Props = {
//   title: string
//   subtitle: string
//   months: string[]
//   data: HeatmapRow[]
// }



// /* ----------------------------- */
// /* COLOR SCALE */
// /* ----------------------------- */

// function getColor(value: number, max: number) {

//   if (!max || max === 0) return "bg-gray-100"

//   const ratio = value / max

//   if (ratio >= 0.75) return "bg-green-400 text-black"
//   if (ratio >= 0.5) return "bg-yellow-300 text-black"
//   if (ratio >= 0.25) return "bg-orange-300 text-black"

//   return "bg-red-400 text-white"
// }

// export default function HeatmapCard({
//   title,
//   subtitle,
//   months,
//   data
// }: Props) {

//   if (!data || data.length === 0) {
//     return null
//   }

//   const maxValue =
//     Math.max(...data.flatMap(r => r.values || [0])) || 1

//   return (
//     <Card className="w-full">

//       <CardHeader>
//         <CardTitle className="text-xl font-bold">
//           {title}
//         </CardTitle>

//         <p className="text-sm text-muted-foreground">
//           {subtitle}
//         </p>
//       </CardHeader>

//       <CardContent>

//         <div className="overflow-x-auto">

//           <table className="w-full text-sm text-center border border-gray-200">

//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="p-2 text-left border">
//                   Model
//                 </th>

//                 {months.map((m) => (
//                   <th key={m} className="p-2 border">
//                     {m}
//                   </th>
//                 ))}
//               </tr>
//             </thead>

//             <tbody>

//               {data.map((row) => (

//                 <tr key={row.model}>

//                   <td className="text-left font-medium p-2 border">
//                     {row.model}
//                   </td>

//                   {row.values.map((v, i) => (

//                     <td
//                       key={i}
//                       className={`p-2 border ${getColor(v, maxValue)}`}
//                     >
//                       {typeof v === "number" ? v.toLocaleString() : v}
//                     </td>

//                   ))}

//                 </tr>

//               ))}

//             </tbody>

//           </table>

//         </div>

//       </CardContent>

//     </Card>
//   )
// }





'use client'

import { useEffect } from "react"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

import { registerHeatmap } from "@/lib/ppt/heatmapRegistry"

type HeatmapRow = {
  model: string
  values: number[]
}

type Props = {
  title: string
  subtitle: string
  months: string[]
  data: HeatmapRow[]
}

/* ----------------------------- */
/* COLOR SCALE */
/* ----------------------------- */

function getColor(value: number, max: number) {

  if (!max || max === 0) return "bg-gray-100"

  const ratio = value / max

  if (ratio >= 0.75) return "bg-green-400 text-black"
  if (ratio >= 0.5) return "bg-yellow-300 text-black"
  if (ratio >= 0.25) return "bg-orange-300 text-black"

  return "bg-red-400 text-white"
}

export default function HeatmapCard({
  title,
  subtitle,
  months,
  data
}: Props) {

  /* ----------------------------- */
  /* REGISTER HEATMAP FOR PPT */
  /* ----------------------------- */

  useEffect(() => {

    if (!data || data.length === 0) return

    registerHeatmap({
      title,
      rows: data.map(d => d.model),
      columns: months,
      values: data.map(d => d.values)
    })

  }, [title, months, data])

  if (!data || data.length === 0) {
    return null
  }

  const maxValue =
    Math.max(...data.flatMap(r => r.values || [0])) || 1

  return (
    <Card className="w-full">

      <CardHeader>
        <CardTitle className="text-xl font-bold">
          {title}
        </CardTitle>

        <p className="text-sm text-muted-foreground">
          {subtitle}
        </p>
      </CardHeader>

      <CardContent>

        <div className="overflow-x-auto">

          <table className="w-full text-sm text-center border border-gray-200">

            <thead className="bg-gray-50">
              <tr>
                <th className="p-2 text-left border">
                  Model
                </th>

                {months.map((m) => (
                  <th key={m} className="p-2 border">
                    {m}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>

              {data.map((row) => (

                <tr key={row.model}>

                  <td className="text-left font-medium p-2 border">
                    {row.model}
                  </td>

                  {row.values.map((v, i) => (

                    <td
                      key={i}
                      className={`p-2 border ${getColor(v, maxValue)}`}
                    >
                      {typeof v === "number"
                        ? v.toLocaleString()
                        : v}
                    </td>

                  ))}

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </CardContent>

    </Card>
  )
}