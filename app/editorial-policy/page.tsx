import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import MovingStars from '@/components/MovingStars'
import JsonLd from '@/components/seo/JsonLd'
import { breadcrumbListSchema } from '@/lib/seo/schema'
import { pageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = pageMetadata({
  title: 'Editorial Policy',
  description:
    'STRUCTURE editorial policy for product and industry content, including how we publish, update, and handle syndicated or AI-assisted articles.',
  path: '/editorial-policy',
  robots: { index: true, follow: true },
})

export default function EditorialPolicyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbListSchema([
          { name: 'Home', path: '/' },
          { name: 'Editorial Policy', path: '/editorial-policy' },
        ])}
      />

      <MovingStars />
      <div className="relative">
        <Header />

        <article className="pt-32 pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-8">
            <header className="mb-10">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                <span className="text-gradient">Editorial Policy</span>
              </h1>
              <p className="text-xl text-gray-400 leading-relaxed">
                STRUCTURE publishes practical content for freight forwarders and 3PLs focused on operations workflows: quoting, dispatch coordination,
                invoicing, and documentation-heavy processes.
              </p>
            </header>

            <div className="prose prose-invert prose-lg max-w-none">
              <h2>Publishing standards</h2>
              <ul>
                <li>We avoid unverifiable performance claims.</li>
                <li>We focus on workflow clarity, operational constraints, and implementation considerations.</li>
                <li>We update content when product capabilities change or when guidance is no longer accurate.</li>
              </ul>

              <h2>AI-assisted content</h2>
              <p>
                Some articles may be drafted with AI assistance. All content is reviewed for clarity, technical accuracy, and usefulness to logistics
                operations teams before publication.
              </p>

              <h2>Syndicated or externally published articles</h2>
              <p>
                If an article is syndicated from another platform, we link to the original source and apply canonical/noindex guidance to avoid duplicate
                indexing.
              </p>

              <h2>Corrections and updates</h2>
              <p>
                If you find an issue, contact us via the <Link href="/contact">quote request form</Link> and include the page URL and the correction.
              </p>
            </div>
          </div>
        </article>

        <Footer />
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .prose { color: #e5e7eb; }
        .prose h1, .prose h2, .prose h3, .prose h4 { color: #fff; }
        .prose a { color: #22d3ee; }
      `,
        }}
      />
    </>
  )
}


