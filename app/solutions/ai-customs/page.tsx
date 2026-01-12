import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import MovingStars from '@/components/MovingStars'
import DocumentSection from '@/components/DocumentSection'
import ForecastSection from '@/components/ForecastSection'
import MetricsSection from '@/components/MetricsSection'
import JsonLd from '@/components/seo/JsonLd'
import { breadcrumbListSchema, faqSchema } from '@/lib/seo/schema'
import { pageMetadata } from '@/lib/seo/metadata'

const LAST_UPDATED = new Date().toISOString()

export const metadata: Metadata = pageMetadata({
  title: 'AI Customs Documentation Automation',
  titleTemplate: 'keyword',
  description:
    'Customs documentation automation for freight forwarders and 3PLs. Reduce manual document handling and improve consistency across international shipments.',
  path: '/solutions/ai-customs',
  ogModifiedTime: LAST_UPDATED,
  keywords: ['customs documentation automation AI', 'shipping document automation', 'trade documentation automation'],
})

export default function AICustomsSolutionPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbListSchema([
          { name: 'Home', path: '/' },
          { name: 'Solutions', path: '/solutions/ai-customs' },
          { name: 'AI Customs', path: '/solutions/ai-customs' },
        ])}
      />
      <JsonLd
        data={faqSchema([
          {
            q: 'What is AI customs automation?',
            a: 'AI customs automation reduces manual steps in document-heavy workflows by extracting, validating, and structuring information consistently for downstream systems.',
          },
          {
            q: 'Does this support global operations?',
            a: 'STRUCTURE is built for international logistics workflows and documentation processes.',
          },
        ])}
      />

      <MovingStars />
      <div className="relative">
        <Header />

        <section className="relative min-h-[60vh] flex items-center pt-32 pb-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-8 text-center">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6">
              <span className="text-gradient">AI Customs</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-8">
              Documentation automation for international freight—built to reduce manual handling and improve consistency.
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

        <DocumentSection />
        <ForecastSection />
        <MetricsSection />

        <Footer />
      </div>
    </>
  )
}


