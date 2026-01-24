'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'

export default function AIQuotationsSection() {
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
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative h-[350px] sm:h-[450px] md:h-[550px] w-full max-w-[600px] mx-auto order-2 lg:order-1"
          >
            <QuoteSpeedAnimation isInView={isInView} />
          </motion.div>

          <motion.div
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
          >
            <motion.h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8 leading-tight">
              <span className="text-gradient">AI Quotations</span>
            </motion.h2>

            <motion.p className="text-2xl sm:text-3xl text-white mb-6">
              From 2-3 hours per quote to{' '}
              <span className="text-gradient font-bold">10-30 seconds</span>.
            </motion.p>

            <motion.p className="text-lg text-gray-400 leading-relaxed">
              Generate accurate freight quotes using historical data, live market inputs, and lane-based algorithms. Instant, precise, automated.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function QuoteSpeedAnimation({ isInView }: { isInView: boolean }) {
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
        time += 2 // FASTER animation
      }

      const cycleTime = 200 // FASTER cycle
      const phase = (time % cycleTime) / cycleTime

      // Old process (slow, multi-step)
      if (phase < 0.4) {
        const oldProgress = (phase / 0.4)
        
        // Draw slow multi-step process
        const steps = 8
        const stepHeight = canvas.height / (steps + 2)
        
        for (let i = 0; i < steps; i++) {
          const y = stepHeight * (i + 1)
          const stepProgress = Math.max(0, Math.min(1, (oldProgress * steps) - i))
          
          ctx.fillStyle = `rgba(239, 68, 68, ${0.3 * stepProgress})`
          ctx.fillRect(50, y - 15, canvas.width - 100, 30)
          
          if (stepProgress > 0) {
            ctx.fillStyle = `rgba(255, 255, 255, ${0.6 * stepProgress})`
            ctx.font = `${12 * scale}px Montserrat`
            ctx.textAlign = 'center'
            ctx.fillText(`Step ${i + 1}`, canvas.width / 2, y)
          }
        }

        // Time counter
        const timeSpent = oldProgress * 180 // 3 hours in minutes
        ctx.fillStyle = 'rgba(239, 68, 68, 0.9)'
        ctx.font = `bold ${24 * scale}px Montserrat`
        ctx.textAlign = 'center'
        ctx.fillText(`${Math.floor(timeSpent)} minutes`, canvas.width / 2, canvas.height - 50)
      }
      // Transition
      else if (phase < 0.5) {
        const transProgress = (phase - 0.4) / 0.1
        
        // Compression effect
        ctx.save()
        ctx.translate(canvas.width / 2, canvas.height / 2)
        ctx.scale(1 - transProgress * 0.5, 1)
        ctx.translate(-canvas.width / 2, -canvas.height / 2)
        
        ctx.fillStyle = `rgba(100, 200, 255, ${transProgress})`
        ctx.fillRect(canvas.width / 4, canvas.height / 2 - 20, canvas.width / 2, 40)
        
        ctx.restore()
      }
      // New process (instant lightning)
      else {
        const newProgress = (phase - 0.5) / 0.5
        
        // Lightning bolt effect
        const lightningOpacity = Math.sin(newProgress * Math.PI * 4) * 0.5 + 0.5
        
        ctx.strokeStyle = `rgba(100, 200, 255, ${lightningOpacity})`
        ctx.lineWidth = 4
        ctx.shadowBlur = 20
        ctx.shadowColor = 'rgba(100, 200, 255, 0.8)'
        
        ctx.beginPath()
        ctx.moveTo(canvas.width / 2, 100)
        ctx.lineTo(canvas.width / 2 - 30, canvas.height / 2)
        ctx.lineTo(canvas.width / 2 + 20, canvas.height / 2)
        ctx.lineTo(canvas.width / 2, canvas.height - 100)
        ctx.stroke()
        
        ctx.shadowBlur = 0
        
        // Instant completion indicator
        ctx.fillStyle = 'rgba(100, 255, 100, 0.9)'
        ctx.font = `bold ${24 * scale}px Montserrat`
        ctx.textAlign = 'center'
        ctx.fillText('10-30 seconds', canvas.width / 2, canvas.height - 50)
        
        // Success glow
        const glowSize = 100 * (1 + Math.sin(time * 0.05) * 0.2)
        const gradient = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, glowSize)
        gradient.addColorStop(0, 'rgba(100, 200, 255, 0.3)')
        gradient.addColorStop(1, 'rgba(100, 200, 255, 0)')
        
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(canvas.width / 2, canvas.height / 2, glowSize, 0, Math.PI * 2)
        ctx.fill()
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
      <div className="absolute inset-0 bg-gradient-radial from-cyan-500/10 to-transparent blur-3xl" />
      <canvas 
        ref={canvasRef}
        className="w-full h-full"
      />
    </div>
  )
}

