import type { Metadata } from 'next'
import { absoluteUrl, BRAND_NAME, getSiteUrl } from './site'

export const DEFAULT_OG_IMAGE_PATH = '/logo-structure.svg'

type RobotsDirectives = NonNullable<Metadata['robots']>
type OpenGraphType = 'website' | 'article'

export function buildTitle(primary: string, opts?: { template?: 'default' | 'keyword' }): string {
  if (opts?.template === 'keyword') {
    return `${primary} for Freight Forwarders & 3PLs | ${BRAND_NAME}`
  }
  return `${primary} | ${BRAND_NAME}`
}

export function baseMetadata(): Metadata {
  const siteUrl = getSiteUrl()
  return {
    metadataBase: new URL(siteUrl),
    applicationName: BRAND_NAME,
    title: {
      default: `${BRAND_NAME} — AI Logistics Automation`,
      template: `%s | ${BRAND_NAME}`,
    },
    description:
      'AI logistics platform for freight forwarders and 3PLs. Automate dispatch, invoicing, and customs workflows to reduce manual work and improve quote turnaround.',
    alternates: {
      canonical: '/',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    openGraph: {
      type: 'website',
      siteName: BRAND_NAME,
      url: siteUrl,
      images: [{ url: DEFAULT_OG_IMAGE_PATH }],
    },
    twitter: {
      card: 'summary_large_image',
      images: [DEFAULT_OG_IMAGE_PATH],
    },
    icons: {
      icon: '/logo-black.svg',
      apple: '/logo-black.svg',
    },
  }
}

export function pageMetadata(args: {
  title: string
  description: string
  path: string
  titleTemplate?: 'default' | 'keyword'
  robots?: RobotsDirectives
  ogType?: OpenGraphType
  ogImagePath?: string
  keywords?: string[]
  canonicalUrl?: string
  ogModifiedTime?: string
}): Metadata {
  const canonical = args.canonicalUrl || absoluteUrl(args.path)
  const ogImagePath = args.ogImagePath || DEFAULT_OG_IMAGE_PATH

  return {
    title: buildTitle(args.title, { template: args.titleTemplate ?? 'default' }),
    description: args.description,
    keywords: args.keywords,
    alternates: {
      canonical,
    },
    robots: args.robots,
    openGraph: {
      type: args.ogType ?? 'website',
      title: buildTitle(args.title, { template: args.titleTemplate ?? 'default' }),
      description: args.description,
      url: canonical,
      modifiedTime: args.ogModifiedTime,
      images: [{ url: ogImagePath }],
    },
    twitter: {
      card: 'summary_large_image',
      title: buildTitle(args.title, { template: args.titleTemplate ?? 'default' }),
      description: args.description,
      images: [ogImagePath],
    },
  }
}


