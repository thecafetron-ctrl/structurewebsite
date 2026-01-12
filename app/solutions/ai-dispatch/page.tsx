import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import MovingStars from '@/components/MovingStars'
import RouteSection from '@/components/RouteSection'
import LoadSection from '@/components/LoadSection'
import MetricsSection from '@/components/MetricsSection'
import JsonLd from '@/components/seo/JsonLd'
import { breadcrumbListSchema, faqSchema } from '@/lib/seo/schema'
import { pageMetadata } from '@/lib/seo/metadata'

const LAST_UPDATED = new Date().toISOString()

export const metadata: Metadata = pageMetadata({
  title: 'AI Dispatch Automation',
  titleTemplate: 'keyword',
  description:
    'AI dispatch for freight forwarders and 3PLs. Standardize dispatch workflows, reduce manual coordination, and keep operations moving with consistent execution.',
  path: '/solutions/ai-dispatch',
  ogModifiedTime: LAST_UPDATED,
  keywords: ['AI dispatch for 3PL', 'dispatch automation', 'logistics operations automation'],
})

export default function AIDispatchSolutionPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbListSchema([
          { name: 'Home', path: '/' },
          { name: 'Solutions', path: '/solutions/ai-dispatch' },
          { name: 'AI Dispatch', path: '/solutions/ai-dispatch' },
        ])}
      />
      <JsonLd
        data={faqSchema([
          {
            q: 'What is AI dispatch for freight forwarders and 3PLs?',
            a: 'AI dispatch uses automation to coordinate operational steps and reduce manual handoffs so teams can execute consistently across lanes and customers.',
          },
          {
            q: 'How do we start?',
            a: 'Request a quote to review your current workflows and the dispatch steps you want to automate.',
          },
        ])}
      />

      <MovingStars />
      <div className="relative">
        <Header />

        <section className="relative min-h-[60vh] flex items-center pt-32 pb-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-8 text-center">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6">
              <span className="text-gradient">AI Dispatch</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-8">
              Dispatch automation for freight forwarders and 3PLs—built to reduce manual coordination and keep execution consistent.
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

        <RouteSection />
        <LoadSection />
        <MetricsSection />

        <Footer />
      </div>
    </>
  )
}


