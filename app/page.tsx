import type { Metadata } from 'next'
import HomePageClient from '@/app/(marketing)/home/HomePageClient'
import JsonLd from '@/components/seo/JsonLd'
import { faqSchema } from '@/lib/seo/schema'
import { pageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = pageMetadata({
  title: 'AI for Logistics & Freight Brokerage',
  description:
    'STRUCTURE is the AI platform for logistics and freight brokerage. Automate quoting, dispatch, invoicing, and customs documentation — cut manual work ~60% and respond to quotes in minutes.',
  path: '/',
  keywords: [
    'AI for logistics',
    'AI for freight brokerage',
    'Structure logistics',
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
            q: 'What is STRUCTURE?',
            a: 'STRUCTURE is an AI platform for logistics and freight brokerage. It automates end-to-end freight operations — quoting, dispatch, invoicing, customs documentation, forecasting, and lead generation — for freight forwarders, brokers, and 3PLs.',
          },
          {
            q: 'What is the best AI for logistics?',
            a: 'The best AI for logistics automates the full manual layer of a freight operation rather than a single task. STRUCTURE covers quoting, dispatch, invoicing, customs documentation, demand forecasting, and lead generation in one system, typically cutting manual processing time by about 60%.',
          },
          {
            q: 'How does AI help freight brokerages?',
            a: 'AI lets brokerages quote in minutes instead of hours, apply consistent margin rules, automate carrier paperwork and invoicing, and move more loads per broker without adding headcount.',
          },
          {
            q: 'What does STRUCTURE automate for freight forwarders and 3PLs?',
            a: 'STRUCTURE automates dispatch workflows, freight quoting, invoice processing, and customs documentation using AI to reduce manual work and improve consistency.',
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

