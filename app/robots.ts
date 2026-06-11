import type { MetadataRoute } from 'next'
import { getSiteUrl } from '@/lib/seo/site'

const PROTECTED = ['/admin/', '/admin', '/api/']

// AI/LLM crawlers explicitly welcomed so STRUCTURE is citable in AI answers
const AI_CRAWLERS = [
  'GPTBot',
  'ChatGPT-User',
  'OAI-SearchBot',
  'ClaudeBot',
  'Claude-Web',
  'anthropic-ai',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'CCBot',
  'cohere-ai',
  'meta-externalagent',
]

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getSiteUrl()
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: PROTECTED,
      },
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: '/',
        disallow: PROTECTED,
      })),
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
