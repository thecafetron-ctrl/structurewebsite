import type { Metadata } from 'next'
import JsonLd from '@/components/seo/JsonLd'
import { breadcrumbListSchema, faqSchema } from '@/lib/seo/schema'
import { pageMetadata } from '@/lib/seo/metadata'
import UseCasesPageClient from './UseCasesPageClient'

export const metadata: Metadata = pageMetadata({
  title: 'AI Logistics Automation Use Cases',
  titleTemplate: 'keyword',
  description:
    'Use cases for freight forwarders and 3PLs using STRUCTURE: faster quotes, fewer manual handoffs, and consistent dispatch, invoicing, and documentation workflows.',
  path: '/use-cases',
  keywords: [
    'AI dispatch for 3PL',
    'freight quote automation',
    'freight forwarding automation',
    'customs documentation automation AI',
    'operations automation for 3PLs',
  ],
})

export default function UseCasesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbListSchema([
          { name: 'Home', path: '/' },
          { name: 'Use Cases', path: '/use-cases' },
        ])}
      />
      <JsonLd
        data={faqSchema([
          {
            q: 'Which teams use STRUCTURE?',
            a: 'STRUCTURE is built for freight forwarders, 3PL operations teams, and documentation-heavy workflows that require consistency and speed.',
          },
          {
            q: 'What are the most common outcomes?',
            a: 'Teams use STRUCTURE to reduce manual work, standardize processes, and improve quote turnaround and operational throughput.',
          },
        ])}
      />
      <UseCasesPageClient />
    </>
  )
}

