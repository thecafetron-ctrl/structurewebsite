import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import MovingStars from '@/components/MovingStars'
import RouteSection from '@/components/RouteSection'
import LoadSection from '@/components/LoadSection'
import AIQuotationsSection from '@/components/AIQuotationsSection'
import JsonLd from '@/components/seo/JsonLd'
import { breadcrumbListSchema, faqSchema } from '@/lib/seo/schema'
import { pageMetadata } from '@/lib/seo/metadata'

const LAST_UPDATED = new Date().toISOString()

export const metadata: Metadata = pageMetadata({
  title: 'AI Automation for 3PL Operations',
  titleTemplate: 'keyword',
  description:
    'AI automation for 3PL operations. Improve quote turnaround, reduce manual dispatch coordination, and keep workflows consistent across customers and lanes.',
  path: '/solutions/3pl',
  ogModifiedTime: LAST_UPDATED,
  keywords: ['AI dispatch for 3PL', 'operations automation for 3PLs', 'freight quote automation'],
})

export default function ThreePLSolutionPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbListSchema([
          { name: 'Home', path: '/' },
          { name: 'Solutions', path: '/solutions/3pl' },
          { name: '3PL', path: '/solutions/3pl' },
        ])}
      />
      <JsonLd
        data={faqSchema([
          {
            q: 'How does STRUCTURE help 3PL operations teams?',
            a: 'STRUCTURE reduces manual work in core workflows like quoting and dispatch coordination, helping teams stay consistent as volume grows.',
          },
          {
            q: 'Can we start with one workflow?',
            a: 'Yes. Request a quote and we can scope a focused workflow first, then expand.',
          },
        ])}
      />

      <MovingStars />
      <div className="relative">
        <Header />

        <section className="relative min-h-[60vh] flex items-center pt-32 pb-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-8 text-center">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6">
              <span className="text-gradient">3PL Operations</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-8">
              Automation for 3PL teams—built to move faster on quoting and execution without adding operational chaos.
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
        <LoadSection />

        <Footer />
      </div>
    </>
  )
}


