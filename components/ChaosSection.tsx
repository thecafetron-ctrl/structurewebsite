'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'

export default function ChaosSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.3 })
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['20%', '-20%'])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center py-32 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900 via-charcoal-800 to-charcoal-900" />

      <div className="relative z-10 max-w-7xl mx-auto px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
          >
            <motion.h2
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            >
              Logistics Shouldn't
              <br />
              <span className="text-gradient">Be Chaos</span>
            </motion.h2>

            <motion.p
              className="text-lg sm:text-xl md:text-2xl text-gray-400 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
            >
              Manual processes. Fragmented systems.
              <br />
              Lost time.
            </motion.p>
          </motion.div>

          {/* Massive Animated Graphic */}
          <motion.div
            style={{ y }}
            className="relative h-[600px]"
          >
            <ChaosToOrderAnimation isInView={isInView} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function ChaosToOrderAnimation({ isInView }: { isInView: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Performance optimization
    const isMobile = window.innerWidth < 768
    const scale = isMobile ? 0.5 : 0.75
    
    canvas.width = 600 * scale
    canvas.height = 600 * scale
    canvas.style.width = '600px'
    canvas.style.height = '600px'

    let animationFrame: number
    let progress = 0
    let lastFrameTime = Date.now()
    const targetFPS = isMobile ? 20 : 24

    // Create chaotic lines (REDUCED)
    const lineCount = isMobile ? 10 : 15 // Reduced from 20
    const lines: Array<{
      points: Array<{ x: number; y: number }>
      targetPoints: Array<{ x: number; y: number }>
      color: string
    }> = []

    // Generate chaotic starting positions and ordered ending positions
    for (let i = 0; i < lineCount; i++) {
      const chaoticPoints: Array<{ x: number; y: number }> = []
      const orderedPoints: Array<{ x: number; y: number }> = []
      
      const segments = isMobile ? 15 : 20 // Reduced from 30
      for (let j = 0; j < segments; j++) {
        // Chaotic start
        chaoticPoints.push({
          x: Math.random() * 600,
          y: Math.random() * 600,
        })

        // Ordered end - flowing curves
        const t = j / segments
        const baseY = 100 + i * 25
        orderedPoints.push({
          x: 50 + t * 500,
          y: baseY + Math.sin(t * Math.PI * 2) * 20,
        })
      }

      lines.push({
        points: chaoticPoints,
        targetPoints: orderedPoints,
        color: `rgba(255, 255, 255, ${0.3 + Math.random() * 0.4})`,
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

      // Animate progress when in view
      if (isInView) {
        progress = Math.min(progress + 0.005, 1)
      } else {
        progress = Math.max(progress - 0.01, 0)
      }

      // Easing function for smooth transition
      const eased = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2

      // Draw lines transitioning from chaos to order
      lines.forEach((line, lineIndex) => {
        ctx.strokeStyle = line.color
        ctx.lineWidth = 2
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'

        // Add glow effect
        ctx.shadowBlur = 10
        ctx.shadowColor = 'rgba(255, 255, 255, 0.5)'

        ctx.beginPath()
        line.points.forEach((point, i) => {
          // Interpolate between chaotic and ordered positions
          const target = line.targetPoints[i]
          const x = point.x + (target.x - point.x) * eased
          const y = point.y + (target.y - point.y) * eased

          // Add some noise that decreases over time
          const noise = (1 - eased) * 20
          const noiseX = (Math.random() - 0.5) * noise
          const noiseY = (Math.random() - 0.5) * noise

          if (i === 0) {
            ctx.moveTo(x + noiseX, y + noiseY)
          } else {
            ctx.lineTo(x + noiseX, y + noiseY)
          }
        })
        ctx.stroke()

        // Draw nodes at ordered positions (appear as we organize)
        if (eased > 0.5) {
          line.targetPoints.forEach((point, i) => {
            if (i % 5 === 0) {
              const nodeProgress = Math.min((eased - 0.5) * 2, 1)
              const size = 4 * nodeProgress
              
              ctx.fillStyle = `rgba(255, 255, 255, ${0.8 * nodeProgress})`
              ctx.shadowBlur = 15
              ctx.beginPath()
              ctx.arc(point.x, point.y, size, 0, Math.PI * 2)
              ctx.fill()
            }
          })
        }
      })

      // Add particles in chaotic phase (REDUCED - skip on mobile)
      if (eased < 0.5 && !isMobile) {
        const particleCount = 25 // Reduced from 50
        for (let i = 0; i < particleCount; i++) {
          const particleProgress = (Date.now() / 1000 + i) % 1
          const x = Math.random() * 600
          const y = particleProgress * 600
          const opacity = (1 - eased * 2) * (1 - particleProgress) * 0.5

          ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`
          ctx.shadowBlur = 5
          ctx.beginPath()
          ctx.arc(x, y, 2, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrame)
    }
  }, [isInView])

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-radial from-white/5 to-transparent blur-3xl" />
      <canvas
        ref={canvasRef}
        className="relative w-full h-full"
        style={{ filter: 'drop-shadow(0 0 40px rgba(255, 255, 255, 0.1))' }}
      />
    </div>
  )
}

