'use client'

import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="relative bg-black py-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 to-black" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
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
            <p className="text-gray-400 text-sm leading-relaxed">
              Enterprise AI Logistics
              <br />
              Sales: <a href="mailto:sales@structurelogistics.com" className="hover:text-white transition-colors">
                sales@structurelogistics.com
              </a>
              <br />
              Support: <a href="mailto:support@structurelogistics.com" className="hover:text-white transition-colors">
                support@structurelogistics.com
              </a>
              <br />
              Phone: <a href="tel:+971553871664" className="hover:text-white transition-colors">
                +971 55 387 1664
              </a>
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2">
              {['Platform', 'Intelligence', 'Scale', 'Pricing'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Attribution */}
          <div>
            <h4 className="text-white font-semibold mb-4">Inspiration</h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              Inspired by John McCarthy
              <br />
              <span className="text-gray-500">Intelligence through structure</span>
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

