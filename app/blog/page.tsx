import type { Metadata } from 'next'
import JsonLd from '@/components/seo/JsonLd'
import { breadcrumbListSchema } from '@/lib/seo/schema'
import { pageMetadata } from '@/lib/seo/metadata'
import { getSupabaseServerClient } from '@/lib/supabase/server'
import { calculateReadingTime } from '@/lib/readingTime'
import { format } from 'date-fns'
import BlogIndexClient, { type BlogIndexPost } from './BlogIndexClient'

export const metadata: Metadata = pageMetadata({
  title: 'AI Logistics Insights',
  titleTemplate: 'keyword',
  description:
    'Practical insights on AI logistics automation for freight forwarders and 3PLs: dispatch workflows, invoicing operations, customs documentation, and quote turnaround.',
  path: '/blog',
  keywords: [
    'AI logistics',
    'freight forwarding automation',
    '3PL operations automation',
    'customs documentation automation',
    'logistics invoice automation',
    'freight quote automation',
  ],
})

type PostRow = {
  slug: string
  title: string | null
  excerpt: string | null
  created_at: string
  content: string | null
}

export default async function BlogPage() {
  const supabase = getSupabaseServerClient()

  const fallback: BlogIndexPost[] = [
    {
      slug: 'ai-for-freight-forwarders-dispatch-invoicing-and-customs-automation',
      title: 'AI for Freight Forwarders: Dispatch, Invoicing, and Customs Automation',
      excerpt:
        'A practical overview of the workflows freight forwarders can automate with AI—without adding operational risk.',
      dateLabel: format(new Date(), 'MMMM d, yyyy'),
      categoryLabel: 'Pillar',
      readTimeLabel: '8 min read',
    },
    {
      slug: 'ai-for-3pl-operations-faster-quotes-fewer-errors-better-margins',
      title: 'AI for 3PL Operations: Faster Quotes, Fewer Errors, Better Margins',
      excerpt:
        'Where AI helps 3PL teams move faster: quoting, dispatch coordination, invoicing handoffs, and documentation consistency.',
      dateLabel: format(new Date(), 'MMMM d, yyyy'),
      categoryLabel: 'Pillar',
      readTimeLabel: '8 min read',
    },
  ]

  let posts: BlogIndexPost[] = fallback

  if (supabase) {
    const { data } = await supabase
      .from('posts')
      .select('slug,title,excerpt,created_at,content')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .limit(30)

    if (data?.length) {
      const rows = data as PostRow[]
      posts = rows
        .filter((p) => p.slug)
        .map((p) => {
          const title = p.title || 'Untitled'
          const excerpt = p.excerpt || ''
          const mins = calculateReadingTime(p.content || p.excerpt || '')
          return {
            slug: p.slug,
            title,
            excerpt,
            dateLabel: format(new Date(p.created_at), 'MMMM d, yyyy'),
            categoryLabel: 'Insights',
            readTimeLabel: `${mins} min read`,
          }
        })
    }
  }

  return (
    <>
      <JsonLd
        data={breadcrumbListSchema([
          { name: 'Home', path: '/' },
          { name: 'Insights', path: '/blog' },
        ])}
      />
      <BlogIndexClient posts={posts} />
    </>
  )
}
