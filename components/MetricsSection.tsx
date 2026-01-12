'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

export default function MetricsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.3 })

  return (
    <section
      ref={containerRef}
      className="relative min-h-[85vh] flex items-center py-16 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900 via-black to-charcoal-900" />

      <div className="relative z-10 max-w-7xl mx-auto px-8 w-full">
        <motion.h2
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-12 md:mb-20 text-center px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
        >
          <span className="text-gradient">Measurable Impact</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <MetricCard
            value={30}
            suffix="%"
            label="Cost Reduction"
            delay={0}
            isInView={isInView}
            color="rgba(100, 200, 255, 0.8)"
          />
          <MetricCard
            value={92}
            suffix="%"
            label="Forecast Accuracy"
            delay={0.2}
            isInView={isInView}
            color="rgba(150, 100, 255, 0.8)"
          />
          <MetricCard
            value={60}
            suffix="%"
            label="Time Saved"
            delay={0.4}
            isInView={isInView}
            color="rgba(100, 255, 200, 0.8)"
          />
          <MetricCard
            value={99.7}
            suffix="%"
            label="Uptime"
            delay={0.6}
            isInView={isInView}
            color="rgba(255, 150, 100, 0.8)"
          />
        </div>
      </div>
    </section>
  )
}

interface MetricCardProps {
  value: number
  suffix: string
  label: string
  delay: number
  isInView: boolean
  color: string
}

function MetricCard({ value, suffix, label, delay, isInView, color }: MetricCardProps) {
  const [displayValue, setDisplayValue] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!isInView) {
      setDisplayValue(0)
      return
    }

    const duration = 2000
    const steps = 60
    const increment = value / steps
    let currentStep = 0

    const timer = setInterval(() => {
      currentStep++
      if (currentStep <= steps) {
        setDisplayValue(Math.min(increment * currentStep, value))
      } else {
        clearInterval(timer)
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [isInView, value])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Performance optimization
    const isMobile = window.innerWidth < 768
    const scale = isMobile ? 0.5 : 0.75
    
    canvas.width = 300 * scale
    canvas.height = 300 * scale
    canvas.style.width = '300px'
    canvas.style.height = '300px'

    let animationFrame: number
    let time = 0
    let lastFrameTime = Date.now()
    const targetFPS = isMobile ? 20 : 24

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

      const centerX = 150
      const centerY = 150

      // Rotating circles
      for (let i = 0; i < 3; i++) {
        const radius = 60 + i * 25
        const rotation = time * 0.01 * (i % 2 === 0 ? 1 : -1)
        const segments = 12

        for (let j = 0; j < segments; j++) {
          const angle = (j / segments) * Math.PI * 2 + rotation
          const x = centerX + Math.cos(angle) * radius
          const y = centerY + Math.sin(angle) * radius
          
          const opacity = (Math.sin(angle + time * 0.05) * 0.5 + 0.5) * 0.4
          
          ctx.fillStyle = color.replace('0.8)', `${opacity})`)
          ctx.shadowBlur = 10
          ctx.shadowColor = color
          ctx.beginPath()
          ctx.arc(x, y, 3, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // Center pulse
      const pulse = Math.sin(time * 0.05) * 0.5 + 0.5
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 50 * pulse)
      gradient.addColorStop(0, color.replace('0.8)', '0.3)'))
      gradient.addColorStop(1, color.replace('0.8)', '0)'))
      
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(centerX, centerY, 50 * pulse, 0, Math.PI * 2)
      ctx.fill()

      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrame)
    }
  }, [isInView, color])

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.9 }}
      transition={{ duration: 1, delay, ease: [0.4, 0, 0.2, 1] }}
      className="relative"
    >
      <div className="glass rounded-3xl p-8 relative overflow-hidden group hover:bg-white/5 transition-all duration-500">
        {/* Background animation */}
        <div className="absolute inset-0 opacity-30">
          <canvas ref={canvasRef} className="w-full h-full" />
        </div>

        {/* Content */}
        <div className="relative z-10">
          <motion.div
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4"
            initial={{ scale: 0.5 }}
            animate={isInView ? { scale: 1 } : { scale: 0.5 }}
            transition={{ duration: 0.8, delay: delay + 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            <span className="text-gradient">
              {displayValue.toFixed(value % 1 !== 0 ? 1 : 0)}
              {suffix}
            </span>
          </motion.div>

          <motion.p
            className="text-base sm:text-lg md:text-xl text-gray-400 font-medium"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: delay + 0.5 }}
          >
            {label}
          </motion.p>
        </div>

        {/* Hover glow effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div
            className="absolute inset-0 blur-2xl"
            style={{ background: `radial-gradient(circle at center, ${color.replace('0.8', '0.1')}, transparent)` }}
          />
        </div>
      </div>
    </motion.div>
  )
}

