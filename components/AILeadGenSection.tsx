'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'

export default function AILeadGenSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.3 })

  return (
    <section
      ref={containerRef}
      className="relative min-h-[85vh] flex items-center py-16 overflow-visible"
    >
      {/* Background - full width */}
      <div className="absolute inset-0 -left-[50vw] -right-[50vw] ml-[50%] mr-[50%] w-screen bg-charcoal-900" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 w-full">
        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
          >
            <motion.h2
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8 leading-tight"
            >
              <span className="text-gradient">AI Lead Generation</span>
            </motion.h2>

            <motion.p className="text-2xl sm:text-3xl text-white mb-6">
              From 5-10 leads per week to{' '}
              <span className="text-gradient font-bold">60-80 qualified leads</span> automatically.
            </motion.p>

            <motion.p className="text-lg text-gray-400 leading-relaxed">
              AI-powered prospecting sources and qualifies leads, integrates with CRM, and handles intelligent follow-ups —all automatically.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative h-[350px] sm:h-[450px] md:h-[550px] w-full max-w-[600px] mx-auto"
          >
            <LeadFunnelAnimation isInView={isInView} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function LeadFunnelAnimation({ isInView }: { isInView: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const isMobile = window.innerWidth < 768
    const width = canvas.parentElement?.clientWidth || 700
    const height = canvas.parentElement?.clientHeight || 700
    const scale = isMobile ? 0.85 : 0.7  // Bigger scale on mobile
    
    canvas.width = width * scale
    canvas.height = height * scale
    canvas.style.width = '100%'
    canvas.style.height = '100%'

    let animationFrame: number
    let time = 0
    let lastFrameTime = Date.now()
    const targetFPS = isMobile ? 20 : 24

    const particles: Array<{
      x: number
      y: number
      vy: number
      size: number
      qualified: boolean
      opacity: number
    }> = []

    function animate() {
      if (!ctx || !canvas) return

      const now = Date.now()
      const elapsed = now - lastFrameTime
      if (elapsed < 1000 / targetFPS) {
        animationFrame = requestAnimationFrame(animate)
        return
      }
      lastFrameTime = now

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (isInView) {
        time += 1

        // Create new particles (leads entering funnel)
        if (time % 10 === 0 && particles.length < (isMobile ? 30 : 50)) {
          particles.push({
            x: canvas.width / 2 + (Math.random() - 0.5) * 200,
            y: -10,
            vy: 2 + Math.random(),
            size: 6 + Math.random() * 4,
            qualified: Math.random() > 0.3, // 70% qualify
            opacity: 0.8,
          })
        }
      }

      // Draw funnel
      const funnelTop = 100
      const funnelMid = 350
      const funnelBottom = 600
      const funnelWidthTop = 300
      const funnelWidthBottom = 100

      // Funnel gradient
      const gradient = ctx.createLinearGradient(canvas.width / 2, funnelTop, canvas.width / 2, funnelBottom)
      gradient.addColorStop(0, 'rgba(100, 200, 255, 0.1)')
      gradient.addColorStop(0.5, 'rgba(100, 200, 255, 0.2)')
      gradient.addColorStop(1, 'rgba(100, 200, 255, 0.3)')

      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.moveTo(canvas.width / 2 - funnelWidthTop / 2, funnelTop)
      ctx.lineTo(canvas.width / 2 + funnelWidthTop / 2, funnelTop)
      ctx.lineTo(canvas.width / 2 + funnelWidthBottom / 2, funnelBottom)
      ctx.lineTo(canvas.width / 2 - funnelWidthBottom / 2, funnelBottom)
      ctx.closePath()
      ctx.fill()

      // Funnel outline
      ctx.strokeStyle = 'rgba(100, 200, 255, 0.5)'
      ctx.lineWidth = 3
      ctx.stroke()

      // AI layer (middle)
      ctx.fillStyle = 'rgba(100, 200, 255, 0.2)'
      ctx.fillRect(canvas.width / 2 - 150, funnelMid - 30, 300, 60)
      
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
      ctx.font = `bold ${16 * scale}px Montserrat`
      ctx.textAlign = 'center'
      ctx.fillText('AI FILTERING', canvas.width / 2, funnelMid)

      // Update and draw particles
      particles.forEach((particle, i) => {
        particle.y += particle.vy
        
        // Funnel narrowing effect
        const funnelProgress = (particle.y - funnelTop) / (funnelBottom - funnelTop)
        const funnelWidth = funnelWidthTop - (funnelWidthTop - funnelWidthBottom) * funnelProgress
        const maxX = canvas.width / 2 + funnelWidth / 2
        const minX = canvas.width / 2 - funnelWidth / 2

        // Keep particles within funnel
        if (particle.x > maxX) particle.x = maxX
        if (particle.x < minX) particle.x = minX

        // Filter non-qualified at AI layer
        if (particle.y > funnelMid - 30 && particle.y < funnelMid + 30) {
          if (!particle.qualified) {
            particle.opacity -= 0.05
          }
        }

        // Draw particle
        if (particle.opacity > 0) {
          const color = particle.qualified ? 'rgba(100, 255, 100, ' : 'rgba(255, 100, 100, '
          
          ctx.fillStyle = color + particle.opacity + ')'
          ctx.shadowBlur = 10
          ctx.shadowColor = color + (particle.opacity * 0.5) + ')'
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
          ctx.fill()
          ctx.shadowBlur = 0
        }

        // Remove particles that left canvas or faded
        if (particle.y > canvas.height + 50 || particle.opacity <= 0) {
          particles.splice(i, 1)
        }
      })

      // CRM integration node at bottom
      ctx.fillStyle = 'rgba(100, 255, 100, 0.3)'
      ctx.beginPath()
      ctx.arc(canvas.width / 2, funnelBottom + 50, 40, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
      ctx.font = `bold ${14 * scale}px Montserrat`
      ctx.fillText('CRM', canvas.width / 2, funnelBottom + 55)

      // Count qualified leads
      const qualifiedCount = particles.filter(p => p.qualified && p.y > funnelBottom).length

      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrame)
    }
  }, [isInView])

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-radial from-cyan-500/10 to-transparent blur-3xl" />
      <canvas 
        ref={canvasRef}
        className="w-full h-full"
      />
    </div>
  )
}

