import type { MetadataRoute } from 'next'
import { absoluteUrl } from '@/lib/seo/site'
import { getSupabaseServerClient } from '@/lib/supabase/server'

type PostRow = {
  slug: string
  updated_at: string | null
  created_at: string
  published: boolean
  external_url: string | null
  title: string | null
  excerpt: string | null
  content: string | null
}

function toISODate(d: string | null | undefined): string {
  if (!d) return new Date().toISOString()
  const dt = new Date(d)
  return Number.isNaN(dt.getTime()) ? new Date().toISOString() : dt.toISOString()
}

function isProbablyThin(post: Pick<PostRow, 'content' | 'excerpt'>): boolean {
  const contentLen = (post.content || '').replace(/<[^>]*>/g, '').trim().length
  const excerptLen = (post.excerpt || '').trim().length
  // Conservative: only exclude from sitemap when clearly too short.
  return contentLen + excerptLen < 900
}

function isSyndicated(post: Pick<PostRow, 'external_url'>): boolean {
  return Boolean(post.external_url)
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl('/'), changeFrequency: 'weekly', priority: 1 },
    { url: absoluteUrl('/platform'), changeFrequency: 'monthly', priority: 0.8 },
    { url: absoluteUrl('/use-cases'), changeFrequency: 'monthly', priority: 0.8 },
    { url: absoluteUrl('/contact'), changeFrequency: 'monthly', priority: 0.9 },
    { url: absoluteUrl('/blog'), changeFrequency: 'weekly', priority: 0.7 },

    // Solutions (indexable)
    { url: absoluteUrl('/solutions/ai-dispatch'), changeFrequency: 'monthly', priority: 0.9 },
    { url: absoluteUrl('/solutions/ai-invoices'), changeFrequency: 'monthly', priority: 0.9 },
    { url: absoluteUrl('/solutions/ai-customs'), changeFrequency: 'monthly', priority: 0.9 },
    { url: absoluteUrl('/solutions/freight-forwarders'), changeFrequency: 'monthly', priority: 0.9 },
    { url: absoluteUrl('/solutions/3pl'), changeFrequency: 'monthly', priority: 0.9 },

    // Pillars (indexable)
    {
      url: absoluteUrl('/blog/ai-for-freight-forwarders-dispatch-invoicing-and-customs-automation'),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: absoluteUrl('/blog/ai-for-3pl-operations-faster-quotes-fewer-errors-better-margins'),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    { url: absoluteUrl('/editorial-policy'), changeFrequency: 'yearly', priority: 0.3 },
  ]

  const supabase = getSupabaseServerClient()
  if (!supabase) return staticRoutes

  const { data } = await supabase
    .from('posts')
    .select('slug,updated_at,created_at,published,external_url,title,excerpt,content')
    .eq('published', true)

  const posts = (data || []) as PostRow[]

  const blogRoutes: MetadataRoute.Sitemap = posts
    .filter((p) => p.slug)
    // Only include canonical, indexable post URLs in sitemap
    .filter((p) => !isSyndicated(p))
    .filter((p) => !isProbablyThin(p))
    .map((p) => ({
      url: absoluteUrl(`/blog/${p.slug}`),
      lastModified: toISODate(p.updated_at || p.created_at),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }))

  return [...staticRoutes, ...blogRoutes]
}


