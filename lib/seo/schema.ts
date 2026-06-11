import { getContactEmail, getContactPhone } from './contact'
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
    '@id': `${siteUrl}/#organization`,
    name: BRAND_NAME,
    alternateName: ['Structure', 'Structure Logistics', 'Structure AI'],
    description:
      'STRUCTURE builds AI for logistics: an automation platform for freight forwarders, freight brokerages, and 3PLs that handles quoting, dispatch, invoicing, customs documentation, and lead generation.',
    slogan: 'AI Infrastructure for Complex Logistics',
    knowsAbout: [
      'AI for logistics',
      'AI for freight brokerage',
      'freight forwarding automation',
      '3PL automation',
      'freight quoting automation',
      'customs documentation automation',
      'dispatch automation',
      'logistics invoice automation',
    ],
    url: siteUrl,
    logo,
    sameAs: args?.sameAs?.length ? args.sameAs : undefined,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: args?.contactEmail || getContactEmail(),
        telephone: args?.contactTelephone || getContactPhone(),
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
      'AI for logistics and freight brokerage. B2B software that automates freight quoting, dispatch workflows, invoice processing, customs documentation, and lead generation for freight forwarders, brokers, and 3PLs.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      description: 'Custom pricing — request a quote.',
    },
  }
}

export function websiteSchema() {
  const siteUrl = getSiteUrl()
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    name: BRAND_NAME,
    alternateName: ['Structure', 'Structure Logistics', 'Structure AI Logistics Platform'],
    url: siteUrl,
    publisher: { '@id': `${siteUrl}/#organization` },
  }
}

export function serviceSchema(args: {
  name: string
  description: string
  path: string
  serviceType: string
}) {
  const siteUrl = getSiteUrl()
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: args.name,
    description: args.description,
    url: absoluteUrl(args.path),
    serviceType: args.serviceType,
    areaServed: 'Worldwide',
    provider: { '@id': `${siteUrl}/#organization` },
    audience: {
      '@type': 'BusinessAudience',
      name: 'Freight forwarders, freight brokerages, and 3PLs',
    },
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


