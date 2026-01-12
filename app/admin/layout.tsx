import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo/metadata'
import AdminLayoutClient from './AdminLayoutClient'

export const metadata: Metadata = pageMetadata({
  title: 'Admin',
  description: 'Admin area.',
  path: '/admin',
  robots: { index: false, follow: false },
})

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>
}

