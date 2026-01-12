import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import JsonLd from '@/components/seo/JsonLd'
import { articleSchema, breadcrumbListSchema } from '@/lib/seo/schema'
import { pageMetadata } from '@/lib/seo/metadata'
import { absoluteUrl } from '@/lib/seo/site'
import { getSupabaseServerClient } from '@/lib/supabase/server'
import BlogPostClient, { type BlogPost } from './BlogPostClient'

function isProbablyThin(post: Pick<BlogPost, 'content' | 'excerpt'>): boolean {
  const contentLen = (post.content || '').replace(/<[^>]*>/g, '').trim().length
  const excerptLen = (post.excerpt || '').trim().length
  return contentLen + excerptLen < 900
}

function choosePillarCanonical(post: Pick<BlogPost, 'title' | 'excerpt' | 'content'>): string {
  const text = `${post.title} ${post.excerpt} ${(post.content || '').replace(/<[^>]*>/g, ' ')}`.toLowerCase()
  const for3pl = /\b3pl\b|\bthird[-\s]?party logistics\b/.test(text)
  if (for3pl) return '/blog/ai-for-3pl-operations-faster-quotes-fewer-errors-better-margins'
  return '/blog/ai-for-freight-forwarders-dispatch-invoicing-and-customs-automation'
}

async function getPostBySlugOrId(slugOrId: string): Promise<BlogPost | null> {
  const supabase = getSupabaseServerClient()
  if (!supabase) return null

  // Try slug first
  let { data } = await supabase
    .from('posts')
    .select('id,title,slug,content,excerpt,created_at,updated_at,author,cover_image,external_url')
    .eq('slug', slugOrId)
    .eq('published', true)
    .maybeSingle()

  if (!data) {
    const byId = await supabase
      .from('posts')
      .select('id,title,slug,content,excerpt,created_at,updated_at,author,cover_image,external_url')
      .eq('id', slugOrId)
      .eq('published', true)
      .maybeSingle()
    data = byId.data
  }

  if (!data) return null

  const post = data as BlogPost
  return {
    ...post,
    title: post.title || 'Untitled',
    excerpt: post.excerpt || '',
    content: post.content || '',
  }
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const post = await getPostBySlugOrId(params.id)
  if (!post) return pageMetadata({ title: 'Article not found', description: 'This article does not exist.', path: `/blog/${params.id}` })

  const canonicalSelf = `/blog/${post.slug || params.id}`
  const syndicated = Boolean(post.external_url)
  const thin = isProbablyThin(post)
  const canonical = syndicated ? post.external_url! : thin ? choosePillarCanonical(post) : canonicalSelf
  const canonicalUrl = canonical.startsWith('/') ? absoluteUrl(canonical) : canonical

  return pageMetadata({
    title: post.title,
    description: post.excerpt || 'STRUCTURE insights on AI logistics automation for freight forwarders and 3PLs.',
    path: canonicalSelf,
    ogType: 'article',
    robots: syndicated || thin ? { index: false, follow: true } : { index: true, follow: true },
    canonicalUrl,
  })
}

export default async function BlogPostPage({ params }: { params: { id: string } }) {
  const post = await getPostBySlugOrId(params.id)
  if (!post) notFound()

  const syndicated = Boolean(post.external_url)
  const thin = isProbablyThin(post)
  const canonicalSelf = `/blog/${post.slug || params.id}`
  const canonical = syndicated ? post.external_url! : thin ? choosePillarCanonical(post) : canonicalSelf

  return (
    <>
      <JsonLd
        data={breadcrumbListSchema([
          { name: 'Home', path: '/' },
          { name: 'Insights', path: '/blog' },
          { name: post.title, path: canonicalSelf },
        ])}
      />
      <JsonLd
        data={articleSchema({
          path: canonicalSelf,
          headline: post.title,
          description: post.excerpt || undefined,
          datePublished: post.created_at,
          dateModified: post.updated_at || post.created_at,
          authorName: post.author || 'STRUCTURE Editorial Team',
          imageUrl: post.cover_image,
        })}
      />
      <BlogPostClient post={post} />
      {/* Canonicalization for syndicated/thin posts is handled via metadata; this comment ensures no UI impact. */}
      {syndicated || thin ? null : null}
    </>
  )
}
