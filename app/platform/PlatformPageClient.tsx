'use client'

import { motion } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import MovingStars from '@/components/MovingStars'
import Link from 'next/link'

const AI_SYSTEMS = [
  {
    name: 'AI Lead Generation',
    description: 'Automated prospecting and qualification that sources 60-80 qualified leads per week.',
    features: [
      'Multi-channel lead sourcing',
      'Intelligent lead scoring and ranking',
      'Automated CRM integration',
      'Smart follow-up sequences',
      'Pipeline nurturing automation',
    ],
    results: '5-10 manual leads/week → 60-80 automated leads/week',
  },
  {
    name: 'AI Quotations',
    description: 'Generate accurate freight quotes in 10-30 seconds using historical data and live market inputs.',
    features: [
      'Historical rate analysis',
      'Real-time market pricing',
      'Lane-based algorithms',
      'Multi-modal quote generation',
      'Instant email delivery',
    ],
    results: '2-3 hours per quote → 10-30 seconds',
  },
  {
    name: 'AI Customer Support',
    description: '24/7 intelligent virtual agent handling 80-90% of customer inquiries automatically.',
    features: [
      'Natural language processing',
      'Shipment status updates',
      'Context-aware responses',
      'Multi-channel support',
      'Escalation to human agents',
    ],
    results: '24/7 coverage → 80-90% automated',
  },
  {
    name: 'AI Route Planning',
    description: 'Dynamic route optimization in 5-10 seconds using predictive algorithms.',
    features: [
      'Real-time constraint analysis',
      'Multi-stop optimization',
      'Fuel cost minimization',
      'Deadhead mile reduction',
      'Traffic and weather integration',
    ],
    results: '1-2 hours → 5-10 seconds automated',
  },
  {
    name: 'AI Load Matching',
    description: 'Perfect capacity matching using symbolic inference and predictive forecasting.',
    features: [
      'Capacity vs demand balancing',
      'Equipment constraint matching',
      'Timing optimization',
      'Driver preference integration',
      'Utilization maximization',
    ],
    results: '95%+ truck utilization',
  },
  {
    name: 'AI Demand Forecasting',
    description: '80-90% accurate demand prediction using real-time models trained on historical data.',
    features: [
      'Short and long-term forecasting',
      'Lane-specific predictions',
      'Seasonal trend analysis',
      'Rate trend forecasting',
      'Capacity planning insights',
    ],
    results: '60% manual → 80-90% AI accuracy',
  },
  {
    name: 'AI Document Processing',
    description: 'Extract and validate shipping documents, auto-input to TMS/ERP in 1-10 minutes.',
    features: [
      'Intelligent data extraction',
      'Document validation',
      'Automatic TMS entry',
      'Error detection and correction',
      'Multi-format support',
    ],
    results: '6-8 hours daily → 1-10 minutes',
  },
]

const SYSTEM_LINKS: Record<string, string> = {
  'AI Route Planning': '/solutions/ai-dispatch',
  'AI Quotations': '/solutions/ai-invoices',
  'AI Document Processing': '/solutions/ai-customs',
}

export default function PlatformPageClient() {
  return (
    <>
      <MovingStars />
      <div className="relative">
        <Header />

        {/* Hero */}
        <section className="relative min-h-[60vh] flex items-center pt-32 pb-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-8 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6"
            >
              <span className="text-gradient">The STRUCTURE Platform</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              className="text-xl md:text-2xl text-gray-400 mb-8"
            >
              One AI core. Complete automation.
              <br />
              Logistics intelligence from lead to delivery.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a
                href="/#contact"
                className="px-10 py-4 rounded-xl bg-white text-black font-bold hover:bg-gray-100 transition-all"
              >
                Get a Quote
              </a>
              <a
                href="mailto:structureailogistics@gmail.com"
                className="px-10 py-4 rounded-xl glass text-white font-semibold hover:bg-white/10 transition-all"
              >
                Schedule Demo
              </a>
            </motion.div>
          </div>
        </section>

        {/* Platform Overview */}
        <section className="relative py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Complete End-to-End Automation</h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                The STRUCTURE platform replaces fragmented manual processes with one intelligent system that connects your entire operation.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-16">
              {['CRM', 'TMS', 'ERP', 'Email'].map((system, i) => (
                <motion.div
                  key={system}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.2, delay: i * 0.05 }}
                  className="glass rounded-xl p-6 text-center"
                >
                  <div className="text-2xl font-bold text-white">{system}</div>
                  <div className="text-sm text-gray-400 mt-1">Integrated</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* AI Systems Detailed */}
        <section className="relative py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="text-gradient">AI Systems</span>
              </h2>
            </div>

            <div className="space-y-8">
              {AI_SYSTEMS.map((system, i) => (
                <motion.div
                  key={system.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.2, delay: i * 0.05 }}
                  className="glass rounded-2xl p-8"
                >
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    {SYSTEM_LINKS[system.name] ? (
                      <Link href={SYSTEM_LINKS[system.name]}>{system.name}</Link>
                    ) : (
                      system.name
                    )}
                  </h3>

                  <p className="text-lg text-gray-400 mb-6 leading-relaxed">{system.description}</p>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-300 mb-3">KEY FEATURES</h4>
                      <ul className="space-y-2">
                        {system.features.map((feature, j) => (
                          <li key={j} className="flex items-start gap-2">
                            <span className="text-cyan-400 mt-1">→</span>
                            <span className="text-gray-400">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center">
                      <div className="glass rounded-xl p-6 w-full">
                        <div className="text-sm font-semibold text-gray-300 mb-2">IMPACT</div>
                        <div className="text-lg font-bold text-white">{system.results}</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Integration Architecture */}
        <section className="relative py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Seamless Integration</h2>
              <p className="text-xl text-gray-400">Connects directly to your existing infrastructure</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: 'CRM Integration',
                  items: ['Salesforce', 'HubSpot', 'Zoho'],
                  feature: 'Bi-directional data sync',
                },
                {
                  title: 'TMS Integration',
                  items: ['McLeod', 'TMW', 'MercuryGate'],
                  feature: 'Real-time shipment data',
                },
                {
                  title: 'ERP Integration',
                  items: ['SAP', 'Oracle', 'NetSuite'],
                  feature: 'Financial data sync',
                },
                {
                  title: 'Email Integration',
                  items: ['Gmail', 'Outlook', 'Exchange'],
                  feature: 'Automated communication',
                },
              ].map((integration, i) => (
                <motion.div
                  key={integration.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.2, delay: i * 0.05 }}
                  className="glass rounded-xl p-6"
                >
                  <h3 className="text-xl font-bold mb-3">{integration.title}</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {integration.items.map((item) => (
                      <span key={item} className="px-3 py-1 bg-white/5 rounded-lg text-sm text-gray-300">
                        {item}
                      </span>
                    ))}
                  </div>
                  <div className="text-sm text-gray-400">{integration.feature}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Security */}
        <section className="relative py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Enterprise-Grade Security</h2>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                'End-to-end encryption',
                'SOC 2 Type II compliance',
                'Configurable data residency',
                'Role-based access control',
                'Audit logging',
                'GDPR compliant',
                '99.9% uptime SLA',
                'Regular security audits',
                'Data backup & recovery',
              ].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.2, delay: i * 0.03 }}
                  className="flex items-center gap-3 glass rounded-lg p-4"
                >
                  <div className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span className="text-gray-300">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Automate Your Logistics?</h2>
            <a
              href="/#contact"
              className="inline-block px-12 py-4 rounded-xl bg-white text-black font-bold text-lg hover:bg-gray-100 transition-all"
            >
              Get Started
            </a>
          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}


