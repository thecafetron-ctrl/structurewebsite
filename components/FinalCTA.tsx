'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'

export default function FinalCTA() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.5 })

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center py-32 overflow-visible"
    >
      {/* Background - full width */}
      <div className="absolute inset-0 -left-[50vw] -right-[50vw] ml-[50%] mr-[50%] w-screen bg-charcoal-900" />

      {/* Ambient Animation */}
      <div className="absolute inset-0">
        <AmbientAnimation isInView={isInView} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-8 text-center">
        <motion.h2
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight px-4"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
        >
          <span className="block">Structure Your</span>
          <span className="block text-gradient">Logistics Intelligence</span>
        </motion.h2>

        <motion.p
          className="text-xl text-gray-400 mb-12 px-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Join 3PLs, carriers, and freight brokers
          <br className="hidden sm:block" />
          transforming operations with AI.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            aria-label="Request a demo"
            onClick={() => {
              window.location.href = '/contact'
            }}
            className="relative px-12 py-5 rounded-2xl overflow-hidden group"
          >
            {/* Background layers */}
            <div className="absolute inset-0 bg-white" />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-gray-100 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            {/* Animated glow */}
            <motion.div
              className="absolute -inset-2 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              animate={{
                background: [
                  'radial-gradient(circle at 0% 50%, rgba(255, 255, 255, 0.3), transparent)',
                  'radial-gradient(circle at 100% 50%, rgba(255, 255, 255, 0.3), transparent)',
                  'radial-gradient(circle at 0% 50%, rgba(255, 255, 255, 0.3), transparent)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />

            {/* Text */}
            <span className="relative text-black font-bold text-xl sm:text-2xl tracking-wide">
              Schedule Demo
            </span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            aria-label="Contact sales"
            onClick={() => {
              window.location.href = 'mailto:sales@structurelogistics.com?subject=STRUCTURE%20Sales%20Inquiry'
            }}
            className="relative px-12 py-5 rounded-2xl overflow-hidden group"
          >
            <div className="absolute inset-0 glass" />
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="relative text-white font-semibold text-xl sm:text-2xl tracking-wide">
              Contact Sales
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

function AmbientAnimation({ isInView }: { isInView: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Performance optimization
    const isMobile = window.innerWidth < 768
    const scale = isMobile ? 0.5 : 0.75
    
    canvas.width = window.innerWidth * scale
    canvas.height = window.innerHeight * scale
    canvas.style.width = '100%'
    canvas.style.height = '100%'

    let animationFrame: number
    let time = 0
    let lastFrameTime = Date.now()
    const targetFPS = isMobile ? 20 : 24

    // Slow, elegant particles (REDUCED)
    const particleCount = isMobile ? 20 : 40 // Reduced from 60
    const particles: Array<{
      x: number
      y: number
      size: number
      vx: number
      vy: number
      opacity: number
    }> = []

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.4 + 0.1,
      })
    }

    // Slow wave forms
    const waves: Array<{ y: number; amplitude: number; frequency: number; speed: number }> = []
    for (let i = 0; i < 4; i++) {
      waves.push({
        y: (canvas.height / 5) * (i + 1),
        amplitude: 40 + i * 10,
        frequency: 0.002 + i * 0.0005,
        speed: 0.01 + i * 0.005,
      })
    }

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

      // Draw slow waves
      waves.forEach((wave, i) => {
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.03 - i * 0.005})`
        ctx.lineWidth = 2
        ctx.beginPath()

        for (let x = 0; x <= canvas.width; x += 10) {
          const y = wave.y + Math.sin(x * wave.frequency + time * wave.speed) * wave.amplitude
          if (x === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }
        ctx.stroke()
      })

      // Draw and update particles
      particles.forEach((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy

        // Wrap around
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Slow pulsing
        const pulse = Math.sin(time * 0.02 + particle.x * 0.001) * 0.3 + 0.7

        // Draw particle
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity * pulse})`
        ctx.shadowBlur = 10
        ctx.shadowColor = `rgba(255, 255, 255, ${particle.opacity * 0.5})`
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
      })

      // Draw connecting lines between nearby particles
      particles.forEach((p1, i) => {
        particles.forEach((p2, j) => {
          if (i >= j) return

          const dx = p2.x - p1.x
          const dy = p2.y - p1.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            const opacity = (1 - distance / 150) * 0.1
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        })
      })

      // Central glow
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const glowPulse = Math.sin(time * 0.02) * 0.3 + 0.7
      const glowSize = 400 * glowPulse

      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, glowSize)
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.03)')
      gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.01)')
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')

      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(centerX, centerY, glowSize, 0, Math.PI * 2)
      ctx.fill()

      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', handleResize)
    }
  }, [isInView])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}

