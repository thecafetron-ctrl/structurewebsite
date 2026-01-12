import type { Metadata } from 'next'
import JsonLd from '@/components/seo/JsonLd'
import { breadcrumbListSchema, faqSchema } from '@/lib/seo/schema'
import { pageMetadata } from '@/lib/seo/metadata'
import PlatformPageClient from './PlatformPageClient'

export const metadata: Metadata = pageMetadata({
  title: 'AI Logistics Automation Platform',
  titleTemplate: 'keyword',
  description:
    'Explore the STRUCTURE platform for freight forwarders and 3PLs: AI-assisted dispatch workflows, invoice automation, and customs documentation support in one system.',
  path: '/platform',
  keywords: [
    'freight forwarding automation software',
    'AI logistics platform',
    '3PL automation software',
    'dispatch automation',
    'logistics invoice automation',
    'customs documentation automation',
  ],
})

export default function PlatformPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbListSchema([
          { name: 'Home', path: '/' },
          { name: 'Platform', path: '/platform' },
        ])}
      />
      <JsonLd
        data={faqSchema([
          {
            q: 'What workflows does the STRUCTURE platform cover?',
            a: 'STRUCTURE focuses on core operational workflows such as dispatch coordination, invoice processing, and documentation-heavy processes like customs support.',
          },
          {
            q: 'Can STRUCTURE integrate with existing systems?',
            a: 'STRUCTURE is designed to connect to common CRM, TMS, ERP, and email workflows so teams can automate without replacing everything at once.',
          },
        ])}
      />
      <PlatformPageClient />
    </>
  )
}

