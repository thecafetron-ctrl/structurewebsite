import { absoluteUrl, BRAND_NAME, getSiteUrl } from './site'

export function organizationSchema(args?: {
  logoPath?: string
  contactEmail?: string
  contactTelephone?: string
  sameAs?: string[]
}) {
  const siteUrl = getSiteUrl()
  const logo = absoluteUrl(args?.logoPath || '/logo-black.svg')

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: BRAND_NAME,
    url: siteUrl,
    logo,
    sameAs: args?.sameAs?.length ? args.sameAs : undefined,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: args?.contactEmail || 'sales@structurelogistics.com',
        telephone: args?.contactTelephone || '+971 55 387 1664',
        url: absoluteUrl('/contact'),
      },
    ],
  }
}

export function softwareApplicationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: `${BRAND_NAME} Platform`,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url: getSiteUrl(),
    description:
      'B2B AI logistics software for freight forwarders and 3PLs. Automates dispatch workflows, invoice processing, and customs documentation.',
  }
}

export function breadcrumbListSchema(items: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function faqSchema(questions: Array<{ q: string; a: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((qa) => ({
      '@type': 'Question',
      name: qa.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: qa.a,
      },
    })),
  }
}

export function articleSchema(args: {
  path: string
  headline: string
  description?: string
  datePublished?: string
  dateModified?: string
  authorName?: string
  imageUrl?: string | null
}) {
  const url = absoluteUrl(args.path)
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: args.headline,
    description: args.description,
    author: {
      '@type': 'Organization',
      name: args.authorName || `${BRAND_NAME} Editorial Team`,
    },
    publisher: {
      '@type': 'Organization',
      name: BRAND_NAME,
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl('/logo-black.svg'),
      },
    },
    datePublished: args.datePublished,
    dateModified: args.dateModified || args.datePublished,
    image: args.imageUrl ? [args.imageUrl] : undefined,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  }
}


