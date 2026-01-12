import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import MovingStars from '@/components/MovingStars'
import AIQuotationsSection from '@/components/AIQuotationsSection'
import CostSection from '@/components/CostSection'
import MetricsSection from '@/components/MetricsSection'
import JsonLd from '@/components/seo/JsonLd'
import { breadcrumbListSchema, faqSchema } from '@/lib/seo/schema'
import { pageMetadata } from '@/lib/seo/metadata'

const LAST_UPDATED = new Date().toISOString()

export const metadata: Metadata = pageMetadata({
  title: 'AI Invoice Automation',
  titleTemplate: 'keyword',
  description:
    'Logistics invoice automation for freight forwarders and 3PLs. Reduce manual invoice work, improve consistency, and keep billing workflows moving.',
  path: '/solutions/ai-invoices',
  ogModifiedTime: LAST_UPDATED,
  keywords: ['logistics invoice automation', 'AI invoices', 'freight billing automation'],
})

export default function AIInvoicesSolutionPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbListSchema([
          { name: 'Home', path: '/' },
          { name: 'Solutions', path: '/solutions/ai-invoices' },
          { name: 'AI Invoices', path: '/solutions/ai-invoices' },
        ])}
      />
      <JsonLd
        data={faqSchema([
          {
            q: 'What does AI invoice automation do?',
            a: 'It reduces manual steps in billing workflows by standardizing inputs, checking consistency, and improving handoffs between operations and finance.',
          },
          {
            q: 'Can we evaluate fit quickly?',
            a: 'Yes. Request a quote and share your current invoicing workflow and tools.',
          },
        ])}
      />

      <MovingStars />
      <div className="relative">
        <Header />

        <section className="relative min-h-[60vh] flex items-center pt-32 pb-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-8 text-center">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6">
              <span className="text-gradient">AI Invoices</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-8">
              Invoice automation for freight forwarders and 3PLs—built to reduce manual work and improve billing consistency.
              {' '}
              <Link href="/contact">Request a quote</Link>.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="px-10 py-4 rounded-xl bg-white text-black font-bold hover:bg-gray-100 transition-all"
              >
                Request a Quote
              </a>
              <a
                href="/platform"
                className="px-10 py-4 rounded-xl glass text-white font-semibold hover:bg-white/10 transition-all"
              >
                See the Platform
              </a>
            </div>
          </div>
        </section>

        <AIQuotationsSection />
        <CostSection />
        <MetricsSection />

        <Footer />
      </div>
    </>
  )
}


