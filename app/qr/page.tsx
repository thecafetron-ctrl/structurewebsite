'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ArrowUpRight, Calendar, MessageCircle, BookOpen, MonitorPlay } from 'lucide-react'
import MovingStars from '@/components/MovingStars'

const LINKS = {
  demo: 'https://structureai.site',
  meeting: 'https://cal.com/structure-1rtlm8/30min',
  whatsapp: 'https://wa.me/971553871664',
  ebook: '/ebook',
}

function ActionButton({
  href,
  label,
  sublabel,
  icon,
}: {
  href: string
  label: string
  sublabel?: string
  icon: React.ReactNode
}) {
  const isExternal = /^https?:\/\//.test(href)
  const Comp: any = isExternal ? 'a' : Link
  const compProps = isExternal
    ? { href, target: '_blank', rel: 'noopener noreferrer' }
    : { href }

  return (
    <Comp
      {...compProps}
      className="group w-full rounded-2xl bg-white/[0.04] border border-white/10 hover:border-cyan-500/40 hover:bg-cyan-500/10 transition-all active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60"
    >
      <div className="flex items-center justify-between gap-4 px-5 py-5">
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500/15 to-blue-500/10 flex items-center justify-center flex-shrink-0">
            <div className="text-cyan-300">{icon}</div>
          </div>
          <div className="min-w-0">
            <div className="text-white font-semibold text-lg leading-tight truncate">{label}</div>
            {sublabel ? (
              <div className="text-gray-400 text-sm leading-tight truncate">{sublabel}</div>
            ) : null}
          </div>
        </div>
        <ArrowUpRight className="w-5 h-5 text-gray-500 group-hover:text-cyan-300 transition-colors flex-shrink-0" />
      </div>
    </Comp>
  )
}

export default function QRPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white relative overflow-x-hidden">
      <MovingStars />

      {/* Top bar */}
      <div className="relative z-10 px-4 pt-5">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            aria-label="Back to home"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Home</span>
          </Link>

          <Link href="/" className="inline-flex items-center gap-2" aria-label="Structure home">
            <Image
              src="/logo-white.svg"
              alt="STRUCTURE"
              width={28}
              height={28}
              className="opacity-90"
              priority
            />
            <span className="text-sm font-bold tracking-tight">STRUCTURE</span>
          </Link>
        </div>
      </div>

      {/* Content */}
      <main className="relative z-10 px-4 pb-10 pt-6">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-medium">
              Quick Links
            </div>
            <h1 className="mt-4 text-2xl font-bold leading-tight">STRUCTURE</h1>
            <p className="mt-2 text-gray-400 text-sm leading-relaxed">
              Demo, meetings, and direct contact — optimized for mobile.
            </p>
          </div>

          <div className="space-y-3">
            <ActionButton
              href={LINKS.demo}
              label="View Demo"
              sublabel="structureai.site"
              icon={<MonitorPlay className="w-6 h-6" />}
            />
            <ActionButton
              href={LINKS.meeting}
              label="Book a Meeting"
              sublabel="30 min on Cal.com"
              icon={<Calendar className="w-6 h-6" />}
            />
            <ActionButton
              href={LINKS.whatsapp}
              label="Contact Executive Haarith Imran"
              sublabel="+971 55 387 1664 (WhatsApp)"
              icon={<MessageCircle className="w-6 h-6" />}
            />
            <ActionButton
              href={LINKS.ebook}
              label="View Free Ebook"
              sublabel="The 90-Day Freight Scaling Playbook"
              icon={<BookOpen className="w-6 h-6" />}
            />
          </div>

          <div className="mt-8 text-center text-xs text-gray-500">
            Tap any button to open instantly.
          </div>
        </div>
      </main>
    </div>
  )
}

