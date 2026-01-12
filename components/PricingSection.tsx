'use client'

import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useInView } from 'framer-motion'

const PRICING_TIERS = [
  {
    name: 'AI Essentials',
    subtitle: 'Small to mid-sized teams',
    features: [
      'AI Quotations',
      'AI Customer Support',
      'AI TMS Entry',
      'CRM Integration',
    ],
  },
  {
    name: 'Full AI Automation',
    subtitle: 'Scaling brokerages & 3PLs',
    features: [
      'Everything in Essentials',
      'AI Lead Generation',
      'AI Route Planner',
      'AI Demand Forecasting',
      'AI Document Reader',
      'Performance Dashboard',
    ],
    highlighted: true,
  },
  {
    name: 'AI Command Center',
    subtitle: 'Enterprise custom',
    features: [
      'Everything in Full Automation',
      'Custom AI Models',
      'Private Cloud',
      'Multi-System APIs',
      'Dedicated Team',
    ],
  },
]

export default function PricingSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.3 })

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center py-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900 via-black to-charcoal-900" />

      <div className="relative z-10 max-w-7xl mx-auto px-8 w-full">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4">
            <span className="text-gradient">Built for Every Scale</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRICING_TIERS.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.1, ease: [0.4, 0, 0.2, 1] }}
              className={`relative p-8 rounded-3xl ${
                tier.highlighted
                  ? 'bg-white/10 border-2 border-white/20'
                  : 'bg-white/5 border border-white/10'
              }`}
            >
              {tier.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-1 rounded-full">
                  <span className="text-xs font-bold text-white">MOST POPULAR</span>
                </div>
              )}

              <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
              <p className="text-gray-400 mb-8">{tier.subtitle}</p>

              <div className="space-y-3">
                {tier.features.map((feature, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400" />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full mt-8 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  tier.highlighted
                    ? 'bg-white text-black hover:bg-gray-100'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                Contact Sales
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

