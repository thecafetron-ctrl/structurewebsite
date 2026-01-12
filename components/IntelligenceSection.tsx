'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'

export default function IntelligenceSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.3 })

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900 via-black to-charcoal-900" />

      <div className="relative z-10 max-w-7xl mx-auto px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Massive Animated Graphic - LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
            className="relative h-[700px] order-2 lg:order-1"
          >
            <IntelligentCoreAnimation isInView={isInView} />
          </motion.div>

          {/* Text Content - RIGHT SIDE */}
          <motion.div
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
          >
            <motion.h2
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            >
              <span className="text-gradient">One Intelligent</span>
              <br />
              Core
            </motion.h2>

            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
            >
              {[
                'Lead',
                'Quote',
                'Route',
                'Load',
                'Document',
                'Data',
              ].map((step, i) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                  transition={{ duration: 0.6, delay: 0.5 + i * 0.1, ease: [0.4, 0, 0.2, 1] }}
                  className="flex items-center space-x-4 group"
                >
                  <div className="w-2 h-2 rounded-full bg-white/50 group-hover:bg-white transition-colors" />
                  <span className="text-xl sm:text-2xl font-medium text-gray-300 group-hover:text-white transition-colors">
                    {step}
                  </span>
                  <div className="flex-1 h-px bg-gradient-to-r from-white/20 to-transparent" />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function IntelligentCoreAnimation({ isInView }: { isInView: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Performance optimization
    const isMobile = window.innerWidth < 768
    const scale = isMobile ? 0.5 : 0.75
    
    canvas.width = 700 * scale
    canvas.height = 700 * scale
    canvas.style.width = '700px'
    canvas.style.height = '700px'

    let animationFrame: number
    let time = 0
    let lastFrameTime = Date.now()
    const targetFPS = isMobile ? 20 : 24

    const centerX = 350
    const centerY = 350
    const steps = ['Lead', 'Quote', 'Route', 'Load', 'Document', 'Data']
    
    // Orbital rings
    const rings = steps.map((step, i) => ({
      label: step,
      radius: 100 + i * 40,
      angle: (i / steps.length) * Math.PI * 2,
      speed: 0.0003 + i * 0.0001,
      particles: [] as Array<{ angle: number; distance: number }>,
    }))

    // Initialize particles for each ring (REDUCED)
    const particlesPerRing = isMobile ? 5 : 10 // Reduced from 20
    rings.forEach((ring) => {
      for (let i = 0; i < particlesPerRing; i++) {
        ring.particles.push({
          angle: Math.random() * Math.PI * 2,
          distance: ring.radius,
        })
      }
    })

    function animate() {
      if (!ctx || !canvas) return

      // FPS throttling
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

      // Draw central core with pulsing effect
      const corePulse = Math.sin(time * 0.02) * 0.2 + 0.8
      const coreSize = 40 * corePulse

      // Core glow layers
      for (let i = 5; i > 0; i--) {
        const glowSize = coreSize + i * 15
        const opacity = (0.1 * corePulse) / i
        
        const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, glowSize)
        gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity})`)
        gradient.addColorStop(1, `rgba(255, 255, 255, 0)`)
        
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(centerX, centerY, glowSize, 0, Math.PI * 2)
        ctx.fill()
      }

      // Core itself
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
      ctx.shadowBlur = 30
      ctx.shadowColor = 'rgba(255, 255, 255, 0.8)'
      ctx.beginPath()
      ctx.arc(centerX, centerY, coreSize, 0, Math.PI * 2)
      ctx.fill()

      // Inner core detail
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)'
      ctx.shadowBlur = 0
      ctx.beginPath()
      ctx.arc(centerX, centerY, coreSize * 0.6, 0, Math.PI * 2)
      ctx.fill()

      // Draw orbital rings and their elements
      rings.forEach((ring, ringIndex) => {
        ring.angle += ring.speed

        // Draw orbital path
        ctx.strokeStyle = `rgba(255, 255, 255, 0.08)`
        ctx.lineWidth = 1
        ctx.setLineDash([5, 10])
        ctx.beginPath()
        ctx.arc(centerX, centerY, ring.radius, 0, Math.PI * 2)
        ctx.stroke()
        ctx.setLineDash([])

        // Calculate node position on orbit
        const nodeX = centerX + Math.cos(ring.angle) * ring.radius
        const nodeY = centerY + Math.sin(ring.angle) * ring.radius

        // Draw line from core to node
        const gradient = ctx.createLinearGradient(centerX, centerY, nodeX, nodeY)
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)')
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0.1)')
        
        ctx.strokeStyle = gradient
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.lineTo(nodeX, nodeY)
        ctx.stroke()

        // Draw orbital node
        const nodeSize = 12
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
        ctx.shadowBlur = 20
        ctx.shadowColor = 'rgba(255, 255, 255, 0.6)'
        ctx.beginPath()
        ctx.arc(nodeX, nodeY, nodeSize, 0, Math.PI * 2)
        ctx.fill()

        // Inner node
        ctx.fillStyle = 'rgba(0, 0, 0, 0.4)'
        ctx.shadowBlur = 0
        ctx.beginPath()
        ctx.arc(nodeX, nodeY, nodeSize * 0.5, 0, Math.PI * 2)
        ctx.fill()

        // Draw label
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
        ctx.font = 'bold 16px Montserrat'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        const labelDistance = ring.radius + 30
        const labelX = centerX + Math.cos(ring.angle) * labelDistance
        const labelY = centerY + Math.sin(ring.angle) * labelDistance
        ctx.fillText(ring.label, labelX, labelY)

        // Animate and draw data particles flowing
        ring.particles.forEach((particle, i) => {
          particle.angle += 0.02
          
          const particleX = centerX + Math.cos(particle.angle) * ring.radius
          const particleY = centerY + Math.sin(particle.angle) * ring.radius
          
          // Calculate distance to main node for fading effect
          const dx = particleX - nodeX
          const dy = particleY - nodeY
          const distToNode = Math.sqrt(dx * dx + dy * dy)
          const opacity = Math.max(0, 1 - distToNode / 200)
          
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.6})`
          ctx.shadowBlur = 10
          ctx.shadowColor = `rgba(255, 255, 255, ${opacity * 0.4})`
          ctx.beginPath()
          ctx.arc(particleX, particleY, 2, 0, Math.PI * 2)
          ctx.fill()
        })

        // Energy pulse from core to node
        const pulseProgress = ((time * 0.02 + ringIndex * 0.5) % 1)
        const pulseX = centerX + Math.cos(ring.angle) * ring.radius * pulseProgress
        const pulseY = centerY + Math.sin(ring.angle) * ring.radius * pulseProgress
        const pulseOpacity = Math.sin(pulseProgress * Math.PI) * 0.8

        ctx.fillStyle = `rgba(255, 255, 255, ${pulseOpacity})`
        ctx.shadowBlur = 20
        ctx.shadowColor = `rgba(255, 255, 255, ${pulseOpacity})`
        ctx.beginPath()
        ctx.arc(pulseX, pulseY, 4, 0, Math.PI * 2)
        ctx.fill()
      })

      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrame)
    }
  }, [isInView])

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-radial from-blue-500/10 via-purple-500/5 to-transparent blur-3xl" />
      <canvas
        ref={canvasRef}
        className="relative w-full h-full"
        style={{ filter: 'drop-shadow(0 0 60px rgba(255, 255, 255, 0.15))' }}
      />
    </div>
  )
}

