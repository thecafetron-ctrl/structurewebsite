import type { Metadata } from 'next'
import HomePageClient from '@/app/(marketing)/home/HomePageClient'
import JsonLd from '@/components/seo/JsonLd'
import { faqSchema } from '@/lib/seo/schema'
import { pageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = pageMetadata({
  title: 'AI Logistics Platform',
  titleTemplate: 'keyword',
  description:
    'STRUCTURE is an AI logistics platform for freight forwarders and 3PLs. Automate dispatch, invoicing, and customs documentation to reduce manual work and speed up quote turnaround.',
  path: '/',
  keywords: [
    'AI logistics platform',
    'freight forwarding automation software',
    '3PL automation',
    'freight quote automation',
    'customs documentation automation',
    'logistics invoice automation',
    'dispatch automation',
  ],
})

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={faqSchema([
          {
            q: 'What does STRUCTURE automate for freight forwarders and 3PLs?',
            a: 'STRUCTURE automates dispatch workflows, invoice processing, and customs documentation using AI to reduce manual work and improve consistency.',
          },
          {
            q: 'How do I request a quote?',
            a: 'Use the “Get a Quote” CTA or visit the contact page to submit your requirements.',
          },
          {
            q: 'Does STRUCTURE support international logistics?',
            a: 'Yes. The platform is built for global freight operations and documentation-heavy workflows.',
          },
        ])}
      />
      <HomePageClient />
    </>
  )
}

