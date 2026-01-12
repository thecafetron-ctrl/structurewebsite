import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import MovingStars from '@/components/MovingStars'
import AIQuotationsSection from '@/components/AIQuotationsSection'
import DocumentSection from '@/components/DocumentSection'
import RouteSection from '@/components/RouteSection'
import JsonLd from '@/components/seo/JsonLd'
import { breadcrumbListSchema, faqSchema } from '@/lib/seo/schema'
import { pageMetadata } from '@/lib/seo/metadata'

const LAST_UPDATED = new Date().toISOString()

export const metadata: Metadata = pageMetadata({
  title: 'AI Automation for Freight Forwarders',
  titleTemplate: 'keyword',
  description:
    'AI logistics automation for freight forwarders. Improve quote turnaround and reduce manual work across dispatch coordination, invoicing workflows, and customs documentation.',
  path: '/solutions/freight-forwarders',
  ogModifiedTime: LAST_UPDATED,
  keywords: ['AI logistics platform for freight forwarders', 'freight forwarding automation software', 'freight quote automation'],
})

export default function FreightForwardersSolutionPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbListSchema([
          { name: 'Home', path: '/' },
          { name: 'Solutions', path: '/solutions/freight-forwarders' },
          { name: 'Freight Forwarders', path: '/solutions/freight-forwarders' },
        ])}
      />
      <JsonLd
        data={faqSchema([
          {
            q: 'What can freight forwarders automate with STRUCTURE?',
            a: 'STRUCTURE focuses on operational workflows that slow teams down: dispatch coordination, invoice handoffs, and documentation-heavy processes like customs support.',
          },
          {
            q: 'How do we get started?',
            a: 'Request a quote to review your lanes, volumes, and priority workflows.',
          },
        ])}
      />

      <MovingStars />
      <div className="relative">
        <Header />

        <section className="relative min-h-[60vh] flex items-center pt-32 pb-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-8 text-center">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6">
              <span className="text-gradient">Freight Forwarders</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-8">
              Automation for global freight forwarding teams—built to support faster quotes and more consistent execution.
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
        <RouteSection />
        <DocumentSection />

        <Footer />
      </div>
    </>
  )
}


