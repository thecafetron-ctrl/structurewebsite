'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'

export default function AICoreSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.3 })

  const systems = [
    'Lead Generation',
    'Quotations',
    'Customer Support',
    'Route Planning',
    'Load Matching',
    'Demand Forecasting',
    'Document Processing',
    'Invoices',
    'Dispatch',
    'Customs',
  ]

  return (
    <section
      ref={containerRef}
      className="relative min-h-[85vh] flex items-center py-16 overflow-visible"
    >
      {/* Background - full width */}
      <div className="absolute inset-0 -left-[50vw] -right-[50vw] ml-[50%] mr-[50%] w-screen bg-charcoal-900" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 w-full">
        <div className="text-center mb-8 md:mb-16">
          <motion.h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          >
            <span className="text-gradient">One Intelligent Core.</span>
            <br />
            Complete Automation.
          </motion.h2>
        </div>

        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          {/* Massive AI Core Graphic */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative h-[350px] sm:h-[450px] md:h-[550px] w-full max-w-[600px] mx-auto order-2 lg:order-1"
          >
            <AICoreAnimation isInView={isInView} systems={systems} />
          </motion.div>

          {/* System List */}
          <motion.div
            className="space-y-4 md:space-y-6 order-1 lg:order-2 w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {systems.map((system, i) => (
              <motion.div
                key={system}
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                transition={{ duration: 0.6, delay: 0.5 + i * 0.1, ease: [0.4, 0, 0.2, 1] }}
                className="flex items-center space-x-4 group cursor-pointer"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                  <span className="text-white font-bold text-lg">{i + 1}</span>
                </div>
                <div className="flex-1">
                  <span className="text-2xl sm:text-3xl font-semibold text-gray-300 group-hover:text-white transition-colors">
                    {system}
                  </span>
                </div>
                <div className="w-2 h-2 rounded-full bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function AICoreAnimation({ isInView, systems }: { isInView: boolean; systems: string[] }) {
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

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2

    // Seven orbital rings
    const rings = systems.map((system, i) => ({
      label: system,
      radius: 80 + i * 35,
      angle: (i / systems.length) * Math.PI * 2,
      speed: 0.0003 + i * 0.0001,
      particles: [] as Array<{ angle: number }>,
    }))

    // Initialize particles
    const particlesPerRing = isMobile ? 3 : 5
    rings.forEach((ring) => {
      for (let i = 0; i < particlesPerRing; i++) {
        ring.particles.push({
          angle: Math.random() * Math.PI * 2,
        })
      }
    })

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
      }

      // Draw central AI core
      const corePulse = Math.sin(time * 0.02) * 0.2 + 0.8
      const coreSize = 50 * corePulse

      // Core glow layers
      for (let i = 5; i > 0; i--) {
        const glowSize = coreSize + i * 15
        const opacity = (0.15 * corePulse) / i
        
        const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, glowSize)
        gradient.addColorStop(0, `rgba(100, 200, 255, ${opacity})`)
        gradient.addColorStop(1, `rgba(100, 200, 255, 0)`)
        
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(centerX, centerY, glowSize, 0, Math.PI * 2)
        ctx.fill()
      }

      // Core itself
      ctx.fillStyle = 'rgba(100, 200, 255, 0.9)'
      ctx.shadowBlur = 30
      ctx.shadowColor = 'rgba(100, 200, 255, 0.8)'
      ctx.beginPath()
      ctx.arc(centerX, centerY, coreSize, 0, Math.PI * 2)
      ctx.fill()

      // Inner core detail
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)'
      ctx.shadowBlur = 0
      ctx.beginPath()
      ctx.arc(centerX, centerY, coreSize * 0.6, 0, Math.PI * 2)
      ctx.fill()

      // Draw orbital rings
      rings.forEach((ring, ringIndex) => {
        ring.angle += ring.speed

        // Draw orbital path
        if (!isMobile) {
          ctx.strokeStyle = `rgba(100, 200, 255, 0.1)`
          ctx.lineWidth = 1
          ctx.setLineDash([5, 10])
          ctx.beginPath()
          ctx.arc(centerX, centerY, ring.radius, 0, Math.PI * 2)
          ctx.stroke()
          ctx.setLineDash([])
        }

        // Node position
        const nodeX = centerX + Math.cos(ring.angle) * ring.radius
        const nodeY = centerY + Math.sin(ring.angle) * ring.radius

        // Line from core to node
        const gradient = ctx.createLinearGradient(centerX, centerY, nodeX, nodeY)
        gradient.addColorStop(0, 'rgba(100, 200, 255, 0.4)')
        gradient.addColorStop(1, 'rgba(100, 200, 255, 0.1)')
        
        ctx.strokeStyle = gradient
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.lineTo(nodeX, nodeY)
        ctx.stroke()

        // Orbital node
        const nodeSize = 10
        ctx.fillStyle = 'rgba(100, 200, 255, 0.9)'
        ctx.shadowBlur = 20
        ctx.shadowColor = 'rgba(100, 200, 255, 0.6)'
        ctx.beginPath()
        ctx.arc(nodeX, nodeY, nodeSize, 0, Math.PI * 2)
        ctx.fill()

        // Energy pulse from core to node
        const pulseProgress = ((time * 0.02 + ringIndex * 0.5) % 1)
        const pulseX = centerX + Math.cos(ring.angle) * ring.radius * pulseProgress
        const pulseY = centerY + Math.sin(ring.angle) * ring.radius * pulseProgress
        const pulseOpacity = Math.sin(pulseProgress * Math.PI) * 0.8

        ctx.fillStyle = `rgba(255, 255, 255, ${pulseOpacity})`
        ctx.shadowBlur = 20
        ctx.beginPath()
        ctx.arc(pulseX, pulseY, 4, 0, Math.PI * 2)
        ctx.fill()

        // Flowing particles
        ring.particles.forEach((particle) => {
          particle.angle += 0.02
          
          const particleX = centerX + Math.cos(particle.angle) * ring.radius
          const particleY = centerY + Math.sin(particle.angle) * ring.radius
          
          ctx.fillStyle = `rgba(100, 200, 255, 0.6)`
          ctx.shadowBlur = 10
          ctx.beginPath()
          ctx.arc(particleX, particleY, 2, 0, Math.PI * 2)
          ctx.fill()
        })
      })

      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrame)
    }
  }, [isInView, systems])

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-radial from-cyan-500/10 to-transparent blur-3xl" />
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ filter: 'drop-shadow(0 0 60px rgba(100, 200, 255, 0.2))' }}
      />
    </div>
  )
}

