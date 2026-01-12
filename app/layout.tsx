import './globals.css'
import type { Metadata } from 'next'
import JsonLd from '@/components/seo/JsonLd'
import { baseMetadata } from '@/lib/seo/metadata'
import { organizationSchema, softwareApplicationSchema } from '@/lib/seo/schema'

export const metadata: Metadata = {
  ...baseMetadata(),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {/* Global structured data (no visual impact) */}
        <JsonLd data={organizationSchema()} />
        <JsonLd data={softwareApplicationSchema()} />
        {children}
      </body>
    </html>
  )
}

