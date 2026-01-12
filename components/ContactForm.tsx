'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { getContactEmail, getContactPhone } from '@/lib/seo/contact'

type HeadingLevel = 'h1' | 'h2'

function Heading({
  as,
  children,
  className,
}: {
  as: HeadingLevel
  children: React.ReactNode
  className?: string
}) {
  if (as === 'h1') return <h1 className={className}>{children}</h1>
  return <h2 className={className}>{children}</h2>
}

export default function ContactForm({ 
  headingAs = 'h2',
  title = 'Get a Quote'
}: { 
  headingAs?: HeadingLevel
  title?: string
}) {
  const contactEmail = getContactEmail()
  const contactPhone = getContactPhone()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Submit to API route (handles Supabase + email notification)
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          message: formData.message,
        }),
      })

      const result = await response.json()

      if (!response.ok) throw new Error(result.error || 'Submission failed')

      // Success
      setSubmitStatus('success')
      setFormData({ name: '', email: '', phone: '', company: '', message: '' })
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="relative min-h-screen flex items-center py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900 via-black to-charcoal-900" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.2 }}
          className="text-center mb-12"
        >
          <Heading as={headingAs} className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            <span className="text-gradient">{title}</span>
          </Heading>
          <p className="text-lg text-gray-400">
            Transform your logistics operations with AI
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.2, delay: 0.1 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Your Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors"
                placeholder="john@company.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors"
                placeholder="+971 XX XXX XXXX"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Company Name *
              </label>
              <input
                type="text"
                required
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors"
                placeholder="Your Company"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Message (Optional)
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors resize-none"
              placeholder="Tell us about your logistics needs..."
            />
          </div>

          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
            className="w-full px-10 py-4 rounded-xl bg-white text-black font-bold text-lg hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </motion.button>

          {submitStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-green-400 font-semibold"
            >
              ✓ Request submitted successfully! We'll contact you soon.
            </motion.div>
          )}

          {submitStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-red-400 font-semibold"
            >
              Error submitting form. Please email us directly.
            </motion.div>
          )}

          <p className="text-center text-sm text-gray-500">
            Or contact us directly at{' '}
            <a href={`mailto:${contactEmail}`} className="text-white hover:underline">
              {contactEmail}
            </a>
            {' '}or{' '}
            <a href={`tel:${contactPhone.replace(/\s+/g, '')}`} className="text-white hover:underline">
              {contactPhone}
            </a>
          </p>
        </motion.form>
      </div>
    </section>
  )
}

