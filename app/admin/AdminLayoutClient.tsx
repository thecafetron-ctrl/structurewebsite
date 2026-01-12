'use client'

import { AuthProvider } from '@/hooks/useAuth'
import 'react-quill/dist/quill.snow.css'

export default function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>
}


