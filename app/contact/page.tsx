import type { Metadata } from 'next'
import JsonLd from '@/components/seo/JsonLd'
import { breadcrumbListSchema, faqSchema } from '@/lib/seo/schema'
import { pageMetadata } from '@/lib/seo/metadata'
import ContactPageClient from './ContactPageClient'

export const metadata: Metadata = pageMetadata({
  title: 'Request a Quote',
  titleTemplate: 'keyword',
  description:
    'Request a quote from STRUCTURE. Tell us about your lanes, volumes, and workflows to evaluate AI dispatch, invoicing, and customs automation for your team.',
  path: '/contact',
  keywords: ['request a freight quote', 'logistics quote automation', 'freight forwarder software demo'],
})

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbListSchema([
          { name: 'Home', path: '/' },
          { name: 'Request a Quote', path: '/contact' },
        ])}
      />
      <JsonLd
        data={faqSchema([
          {
            q: 'What information should I include in a quote request?',
            a: 'Share your current tools, typical lanes and volumes, and the workflows you want to automate (dispatch, invoices, customs).',
          },
          {
            q: 'Is STRUCTURE built for international operations?',
            a: 'Yes. STRUCTURE targets global freight workflows and documentation-heavy processes.',
          },
        ])}
      />
      <ContactPageClient />
    </>
  )
}

