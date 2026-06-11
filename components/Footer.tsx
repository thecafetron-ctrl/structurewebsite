'use client'

import Link from 'next/link'
import { getContactPhone } from '@/lib/seo/contact'

const solutionLinks = [
  { name: 'AI for Logistics', href: '/solutions/ai-for-logistics' },
  { name: 'AI for Freight Brokerage', href: '/solutions/ai-for-freight-brokerage' },
  { name: 'AI Dispatch', href: '/solutions/ai-dispatch' },
  { name: 'AI Invoices', href: '/solutions/ai-invoices' },
  { name: 'AI Customs', href: '/solutions/ai-customs' },
  { name: 'Freight Forwarders', href: '/solutions/freight-forwarders' },
  { name: '3PL Operations', href: '/solutions/3pl' },
]

const companyLinks = [
  { name: 'Platform', href: '/platform' },
  { name: 'LoadHawk', href: '/loadhawk' },
  { name: 'Use Cases', href: '/use-cases' },
  { name: 'Insights', href: '/blog' },
  { name: 'Contact', href: '/contact' },
  { name: 'Editorial Policy', href: '/editorial-policy' },
]

export default function Footer() {
  const contactPhone = getContactPhone()
  const contactPhoneTel = contactPhone.replace(/\s+/g, '')

  return (
    <footer className="relative bg-black py-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 to-black" />
      {/* Hairline top glow */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 relative flex items-center justify-center">
                <img
                  src="/logo-white.svg"
                  alt="STRUCTURE"
                  className="w-full h-full object-contain"
                  style={{ filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.3))' }}
                />
              </div>
              <span className="text-2xl font-bold">STRUCTURE</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm mb-4">
              AI for logistics and freight brokerage. STRUCTURE automates quoting, dispatch,
              invoicing, and customs documentation for freight forwarders, brokers, and 3PLs.
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Sales:{' '}
              <a href="mailto:sales@structurelogistics.com" className="hover:text-white transition-colors">
                sales@structurelogistics.com
              </a>
              <br />
              Support:{' '}
              <a href="mailto:support@structurelogistics.com" className="hover:text-white transition-colors">
                support@structurelogistics.com
              </a>
              <br />
              Phone:{' '}
              <a href={`tel:${contactPhoneTel}`} className="hover:text-white transition-colors">
                {contactPhone}
              </a>
            </p>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="text-white font-semibold mb-4">Solutions</h4>
            <ul className="space-y-2">
              {solutionLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {companyLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="text-gray-500 text-xs leading-relaxed mt-6">
              Inspired by John McCarthy
              <br />
              Intelligence through structure
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <p className="text-gray-500 text-sm text-center">
            © 2026 STRUCTURE. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
