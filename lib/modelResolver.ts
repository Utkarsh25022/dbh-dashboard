export interface ModelOption {
label: string
value: string
parent: string
brand: string
}

/**
 * Normalize model key
 * "Tata Nexon EV Max" → "tata nexon ev max"
 */
function normalizeModelKey(str: string) {
return str
.toLowerCase()
.replace(/[^\w\s]/g, "")
.replace(/\s+/g, " ")
.trim()
}

/**
 * Returns unique parent models for dropdown
 */
export function getParentModels(models: ModelOption[]) {

const parentMap = new Map<string, ModelOption>()

models.forEach((model) => {

const parentKey = normalizeModelKey(model.parent)

if (!parentMap.has(parentKey)) {

  parentMap.set(parentKey, {
    label: model.parent,
    value: parentKey,
    parent: model.parent,
    brand: model.brand
  })

}

})

return Array.from(parentMap.values())

}

/**
 * Get all variants belonging to parent
 */
export function getVariantsForParent(
parent: string,
models: ModelOption[]
) {

const parentKey = normalizeModelKey(parent)

return models.filter(
(m) =>
normalizeModelKey(m.parent) === parentKey
)

}