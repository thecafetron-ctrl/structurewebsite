'use client'

import { motion } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import MovingStars from '@/components/MovingStars'
import Link from 'next/link'

const USE_CASES = [
  {
    title: 'Freight Brokers & 3PLs',
    challenge: 'Manual quoting, lead management, and customer service consuming 60+ hours weekly',
    solution: 'Complete AI automation of lead generation, quotations, and customer support',
    results: ['60-80 qualified leads/week', '10-30 second quotes', '24/7 automated support'],
    impact: '70% cost reduction, 3x revenue growth',
  },
  {
    title: 'Carriers & Fleet Operators',
    challenge: 'Dispatchers spending hours on route planning and load matching',
    solution: 'AI-powered route optimization and intelligent dispatch automation',
    results: ['5-10 second route optimization', '95%+ truck utilization', '25% fuel savings'],
    impact: '30% efficiency improvement',
  },
  {
    title: 'Warehousing & Distribution',
    challenge: 'Manual demand forecasting leading to overstocking or stockouts',
    solution: 'Predictive AI forecasting with 80-90% accuracy',
    results: ['80-90% forecast accuracy', 'Real-time predictions', 'Optimal inventory'],
    impact: '40% reduction in carrying costs',
  },
  {
    title: 'Import/Export Operations',
    challenge: '6-8 hours daily on document processing and customs paperwork',
    solution: 'Automated document extraction and customs form generation',
    results: ['1-10 minute processing', '99%+ accuracy', 'Zero manual entry'],
    impact: '90% time savings on documentation',
  },
]

const USE_CASE_LINKS: Record<string, string> = {
  'Freight Brokers & 3PLs': '/solutions/3pl',
  'Import/Export Operations': '/solutions/ai-customs',
}

export default function UseCasesPageClient() {
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
              <span className="text-gradient">Use Cases</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              className="text-xl md:text-2xl text-gray-400"
            >
              See how STRUCTURE transforms operations across logistics sectors
            </motion.p>
          </div>
        </section>

        {/* Use Cases */}
        <section className="relative py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-8">
            <div className="space-y-12">
              {USE_CASES.map((useCase, i) => (
                <motion.div
                  key={useCase.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.2, delay: i * 0.05 }}
                  className="glass rounded-2xl p-8 md:p-12"
                >
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">
                    {USE_CASE_LINKS[useCase.title] ? (
                      <Link href={USE_CASE_LINKS[useCase.title]}>{useCase.title}</Link>
                    ) : (
                      useCase.title
                    )}
                  </h2>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-300 mb-3">THE CHALLENGE</h3>
                      <p className="text-gray-400 leading-relaxed mb-6">{useCase.challenge}</p>

                      <h3 className="text-sm font-semibold text-gray-300 mb-3">THE SOLUTION</h3>
                      <p className="text-gray-400 leading-relaxed">{useCase.solution}</p>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-gray-300 mb-3">RESULTS</h3>
                      <ul className="space-y-2 mb-6">
                        {useCase.results.map((result, j) => (
                          <li key={j} className="flex items-start gap-2">
                            <span className="text-cyan-400 mt-1">✓</span>
                            <span className="text-gray-300">{result}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="glass rounded-xl p-4">
                        <div className="text-sm font-semibold text-gray-300 mb-1">BUSINESS IMPACT</div>
                        <div className="text-xl font-bold text-white">{useCase.impact}</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Transform Your Operations</h2>
            <a
              href="/#contact"
              className="inline-block px-12 py-4 rounded-xl bg-white text-black font-bold text-lg hover:bg-gray-100 transition-all"
            >
              Get a Quote
            </a>
          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}


