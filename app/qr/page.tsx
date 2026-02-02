'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ArrowUpRight, Calendar, MessageCircle, BookOpen, MonitorPlay, Sparkles } from 'lucide-react'
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
      className="group relative w-full rounded-2xl bg-white/[0.035] border border-white/10 hover:border-cyan-500/40 transition-all active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 overflow-hidden"
    >
      {/* Shimmer */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        aria-hidden="true"
      >
        <div
          className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent"
          style={{ animation: 'qrShimmer 1.4s ease-in-out' }}
        />
      </div>

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

      {/* Local animations (lightweight, mobile-safe) */}
      <style jsx global>{`
        @keyframes qrFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes qrPulse {
          0%, 100% { opacity: 0.55; }
          50% { opacity: 0.95; }
        }
        @keyframes qrShimmer {
          0% { transform: translateX(-120%) skewX(-15deg); opacity: 0; }
          30% { opacity: 0.35; }
          70% { opacity: 0.35; }
          100% { transform: translateX(120%) skewX(-15deg); opacity: 0; }
        }
        .qr-float { animation: qrFloat 6s ease-in-out infinite; }
        .qr-pulse { animation: qrPulse 5.5s ease-in-out infinite; }
      `}</style>

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
          {/* Hero */}
          <div className="text-center mb-7">
            <div className="mx-auto w-16 h-16 rounded-3xl bg-gradient-to-br from-cyan-500/18 to-blue-500/10 border border-cyan-500/20 flex items-center justify-center shadow-xl shadow-cyan-500/10 qr-float">
              <Sparkles className="w-7 h-7 text-cyan-300" />
            </div>
            <h1 className="mt-4 text-2xl font-bold leading-tight">STRUCTURE</h1>
            <p className="mt-2 text-gray-400 text-sm leading-relaxed">
              Choose where you want to go.
            </p>
          </div>

          {/* Card stack */}
          <div className="relative">
            {/* Ambient glow */}
            <div className="absolute -inset-6 bg-gradient-to-b from-cyan-500/10 via-blue-500/5 to-transparent blur-3xl rounded-[32px] qr-pulse pointer-events-none" />

            <div className="relative space-y-3">
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
          </div>

          <div className="mt-8 text-center text-xs text-gray-500">
            Tap any button to open.
          </div>
        </div>
      </main>
    </div>
  )
}

