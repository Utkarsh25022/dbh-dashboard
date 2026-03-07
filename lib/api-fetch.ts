export async function apiFetch(path: string, options?: RequestInit) {
  const base =
    typeof window !== "undefined"
      ? window.location.origin
      : process.env.NEXT_PUBLIC_SITE_URL || ""

  const res = await fetch(`${base}${path}`, options)

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`)
  }

  return res.json()
}