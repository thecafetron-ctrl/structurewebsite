export const BRAND_NAME = 'STRUCTURE'

/**
 * IMPORTANT: Set NEXT_PUBLIC_SITE_URL in production to your canonical origin,
 * e.g. https://structurelogistics.com (no trailing slash).
 */
export function getSiteUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.VERCEL_URL

  if (!raw) return 'https://structurelogistics.com'
  if (raw.startsWith('http://') || raw.startsWith('https://')) return raw.replace(/\/+$/, '')
  return `https://${raw}`.replace(/\/+$/, '')
}

export function absoluteUrl(pathname: string): string {
  const base = getSiteUrl()
  const path = pathname.startsWith('/') ? pathname : `/${pathname}`
  return `${base}${path}`
}


