import modelMap from "@/lib/config/oem-model-map-real.json";

export default modelMap;

/* ----------------------------- */
/* NORMALIZE BASE MODEL */
/* ----------------------------- */

function normalizeParent(label: string) {
  return label
    .toLowerCase()
    .replace(/\bev\b/g, "")
    .replace(/\bracer\b/g, "")
    .replace(/\bsportback\b/g, "")
    .replace(/\bcoupe\b/g, "")
    .replace(/\bgt\b/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/* ----------------------------- */
/* GET ALL PARENT MODELS */
/* ----------------------------- */

export function getAllParentModels() {

  const platforms = modelMap.platforms.cardekho.oems;

  const parentMap: Record<string, { label: string; value: string }> = {};

  Object.values(platforms).forEach((oem: any) => {

    Object.values(oem.models).forEach((model: any) => {

      const base = normalizeParent(model.label);

      if (!parentMap[base]) {

        parentMap[base] = {

          label: model.label
            .replace(/\bEV\b/i, "")
            .replace(/\bRacer\b/i, "")
            .trim(),

          /* IMPORTANT FIX */
          value: base   // keep spaces instead of underscores

        };

      }

    });

  });

  return Object.values(parentMap).sort((a, b) =>
    a.label.localeCompare(b.label)
  );
}