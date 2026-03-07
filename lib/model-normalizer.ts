import modelMap from "@/lib/config/oem-model-map-real.json"

type ModelMap = {
platforms: {
cardekho: {
oems: Record<string, any>
}
}
}

const map = modelMap as ModelMap

/* ------------------------------------------------ */
/* BUILD VARIANT → PARENT LOOKUP */
/* ------------------------------------------------ */

const variantToParent: Record<string, string> = {}

Object.values(map.platforms.cardekho.oems).forEach((oem: any) => {

Object.entries(oem.models).forEach(([parent, variants]: any) => {


const parentKey = parent.toLowerCase()

/* parent itself */
variantToParent[parentKey] = parentKey

variants.forEach((variant: string) => {

  const key = variant.toLowerCase()

  variantToParent[key] = parentKey

})

})

})

/* ------------------------------------------------ */
/* NORMALIZER */
/* ------------------------------------------------ */

export function normalizeModel(name: string) {

if (!name) return ""

const key = name
.toLowerCase()
.replace(/\d{4}-\d{4}/g, "")
.trim()

/* exact match */
if (variantToParent[key]) {
return variantToParent[key]
}

/* fallback partial match */

for (const variant in variantToParent) {

if (key.includes(variant)) {
  return variantToParent[variant]
}

}

return key
}
