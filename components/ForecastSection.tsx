'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'

export default function ForecastSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.3 })
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['15%', '-15%'])

  return (
    <section
      ref={containerRef}
      className="relative min-h-[85vh] flex items-center py-16 overflow-visible"
    >
      {/* Background - full width */}
      <div className="absolute inset-0 -left-[50vw] -right-[50vw] ml-[50%] mr-[50%] w-screen bg-charcoal-900" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 w-full">
        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-2 lg:gap-16 items-center">
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
              <span className="text-gradient">Predictive</span>
              <br />
              Intelligence
            </motion.h2>

            <motion.p
              className="text-lg sm:text-xl md:text-2xl text-gray-400 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
            >
              Forecast demand before
              <br />
              it becomes critical.
            </motion.p>
          </motion.div>

          {/* Massive Animated Graphic */}
          <motion.div
            style={{ y }}
            className="relative h-[350px] sm:h-[500px] md:h-[600px] lg:h-[700px]"
          >
            <ForecastAnimation isInView={isInView} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function ForecastAnimation({ isInView }: { isInView: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Performance optimization - BIGGER on mobile
    const isMobile = window.innerWidth < 768
    const scale = isMobile ? 0.85 : 0.75
    
    canvas.width = 700 * scale
    canvas.height = 700 * scale
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    canvas.style.maxWidth = '700px'
    canvas.style.maxHeight = '700px'

    let animationFrame: number
    let time = 0
    let lastFrameTime = Date.now()
    const targetFPS = isMobile ? 20 : 24

    // Historical data points
    const historicalData: Array<{ x: number; y: number }> = []
    const predictiveData: Array<{ x: number; y: number }> = []

    // Generate data
    const dataPoints = 40
    for (let i = 0; i < dataPoints; i++) {
      const x = (i / dataPoints) * 500 + 100
      const baseY = 400
      const noise = Math.sin(i * 0.3) * 60 + Math.sin(i * 0.7) * 30
      const trend = i * 2
      
      historicalData.push({
        x,
        y: baseY - noise - trend,
      })
    }

    // Generate predictive data (continuation)
    for (let i = 0; i < 20; i++) {
      const x = ((dataPoints + i) / dataPoints) * 500 + 100
      const baseY = 400
      const trend = (dataPoints + i) * 2
      const prediction = Math.sin((dataPoints + i) * 0.3) * 40
      
      predictiveData.push({
        x,
        y: baseY - prediction - trend,
      })
    }

    // Data waves
    const waves: Array<{ y: number; speed: number; amplitude: number; opacity: number }> = []
    for (let i = 0; i < 5; i++) {
      waves.push({
        y: 200 + i * 100,
        speed: 0.5 + i * 0.2,
        amplitude: 30 + i * 10,
        opacity: 0.3 - i * 0.05,
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
        time += 2 // FASTER animation
      }

      const animProgress = Math.min(time * 0.02, 1) // FASTER progress

      // Draw grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)'
      ctx.lineWidth = 1

      // Vertical grid lines
      for (let x = 100; x <= 700; x += 50) {
        ctx.beginPath()
        ctx.moveTo(x, 100)
        ctx.lineTo(x, 650)
        ctx.stroke()
      }

      // Horizontal grid lines
      for (let y = 100; y <= 650; y += 50) {
        ctx.beginPath()
        ctx.moveTo(100, y)
        ctx.lineTo(700, y)
        ctx.stroke()
      }

      // Draw flowing data waves in background
      waves.forEach((wave, i) => {
        ctx.strokeStyle = `rgba(100, 150, 255, ${wave.opacity})`
        ctx.lineWidth = 2
        ctx.beginPath()

        for (let x = 0; x <= 700; x += 5) {
          const waveY = wave.y + Math.sin((x * 0.01) + (time * 0.02 * wave.speed)) * wave.amplitude
          if (x === 0) {
            ctx.moveTo(x, waveY)
          } else {
            ctx.lineTo(x, waveY)
          }
        }
        ctx.stroke()
      })

      // Draw historical data line
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)'
      ctx.lineWidth = 3
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.shadowBlur = 10
      ctx.shadowColor = 'rgba(255, 255, 255, 0.5)'

      ctx.beginPath()
      historicalData.forEach((point, i) => {
        if (i / historicalData.length <= animProgress) {
          if (i === 0) {
            ctx.moveTo(point.x, point.y)
          } else {
            ctx.lineTo(point.x, point.y)
          }
        }
      })
      ctx.stroke()

      // Draw historical data area fill
      const gradient = ctx.createLinearGradient(0, 200, 0, 650)
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)')
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')

      ctx.fillStyle = gradient
      ctx.beginPath()
      historicalData.forEach((point, i) => {
        if (i / historicalData.length <= animProgress) {
          if (i === 0) {
            ctx.moveTo(point.x, point.y)
          } else {
            ctx.lineTo(point.x, point.y)
          }
        }
      })
      const lastHistoricalIndex = Math.floor(historicalData.length * animProgress)
      if (lastHistoricalIndex > 0) {
        ctx.lineTo(historicalData[lastHistoricalIndex - 1].x, 650)
        ctx.lineTo(historicalData[0].x, 650)
      }
      ctx.closePath()
      ctx.fill()

      // Draw historical data points
      historicalData.forEach((point, i) => {
        if (i / historicalData.length <= animProgress && i % 3 === 0) {
          const pulse = Math.sin(time * 0.05 + i * 0.2) * 0.3 + 0.7
          
          ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
          ctx.shadowBlur = 15
          ctx.shadowColor = 'rgba(255, 255, 255, 0.6)'
          ctx.beginPath()
          ctx.arc(point.x, point.y, 4 * pulse, 0, Math.PI * 2)
          ctx.fill()
        }
      })

      // Draw predictive data (appears after historical is complete)
      const predProgress = Math.max(0, (animProgress - 0.6) / 0.4)
      
      if (predProgress > 0) {
        // Predictive line with different style
        ctx.strokeStyle = 'rgba(100, 200, 255, 0.8)'
        ctx.lineWidth = 3
        ctx.setLineDash([10, 5])
        ctx.shadowBlur = 15
        ctx.shadowColor = 'rgba(100, 200, 255, 0.6)'

        ctx.beginPath()
        predictiveData.forEach((point, i) => {
          if (i / predictiveData.length <= predProgress) {
            if (i === 0) {
              // Connect from last historical point
              const lastHistorical = historicalData[historicalData.length - 1]
              ctx.moveTo(lastHistorical.x, lastHistorical.y)
              ctx.lineTo(point.x, point.y)
            } else {
              ctx.lineTo(point.x, point.y)
            }
          }
        })
        ctx.stroke()
        ctx.setLineDash([])

        // Predictive area fill
        const predGradient = ctx.createLinearGradient(0, 200, 0, 650)
        predGradient.addColorStop(0, 'rgba(100, 200, 255, 0.15)')
        predGradient.addColorStop(1, 'rgba(100, 200, 255, 0)')

        ctx.fillStyle = predGradient
        ctx.beginPath()
        const lastHistorical = historicalData[historicalData.length - 1]
        ctx.moveTo(lastHistorical.x, lastHistorical.y)
        predictiveData.forEach((point, i) => {
          if (i / predictiveData.length <= predProgress) {
            ctx.lineTo(point.x, point.y)
          }
        })
        const lastPredIndex = Math.floor(predictiveData.length * predProgress)
        if (lastPredIndex > 0) {
          ctx.lineTo(predictiveData[lastPredIndex - 1].x, 650)
          ctx.lineTo(lastHistorical.x, 650)
        }
        ctx.closePath()
        ctx.fill()

        // Glowing end point of prediction
        if (predProgress > 0) {
          const endIndex = Math.min(
            Math.floor(predictiveData.length * predProgress),
            predictiveData.length - 1
          )
          const endPoint = predictiveData[endIndex]
          
          const glowPulse = Math.sin(time * 0.1) * 0.5 + 0.5
          
          // Outer glow
          const glowGradient = ctx.createRadialGradient(
            endPoint.x,
            endPoint.y,
            0,
            endPoint.x,
            endPoint.y,
            30 * glowPulse
          )
          glowGradient.addColorStop(0, 'rgba(100, 200, 255, 0.4)')
          glowGradient.addColorStop(1, 'rgba(100, 200, 255, 0)')
          
          ctx.fillStyle = glowGradient
          ctx.beginPath()
          ctx.arc(endPoint.x, endPoint.y, 30 * glowPulse, 0, Math.PI * 2)
          ctx.fill()

          // Core point
          ctx.fillStyle = 'rgba(100, 200, 255, 1)'
          ctx.shadowBlur = 20
          ctx.shadowColor = 'rgba(100, 200, 255, 0.8)'
          ctx.beginPath()
          ctx.arc(endPoint.x, endPoint.y, 6, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // Draw axis labels
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'
      ctx.font = '14px Montserrat'
      ctx.textAlign = 'center'
      ctx.shadowBlur = 0
      
      // X-axis label
      ctx.fillText('Time', 400, 680)
      
      // Y-axis label
      ctx.save()
      ctx.translate(60, 400)
      ctx.rotate(-Math.PI / 2)
      ctx.fillText('Demand', 0, 0)
      ctx.restore()

      // Draw vertical line separating historical from predictive
      if (predProgress > 0) {
        const separatorX = historicalData[historicalData.length - 1].x
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)'
        ctx.lineWidth = 2
        ctx.setLineDash([5, 5])
        ctx.beginPath()
        ctx.moveTo(separatorX, 100)
        ctx.lineTo(separatorX, 650)
        ctx.stroke()
        ctx.setLineDash([])

        // Label
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)'
        ctx.font = 'bold 12px Montserrat'
        ctx.fillText('NOW', separatorX, 90)
      }

      // Particles flowing upward (REDUCED - skip on mobile)
      if (!isMobile) {
        const particleCount = 15 // Reduced from 30
        for (let i = 0; i < particleCount; i++) {
          const particleTime = (time * 0.02 + i * 0.1) % 1
          const x = 100 + Math.random() * 600
          const y = 650 - particleTime * 550
          const opacity = Math.sin(particleTime * Math.PI) * 0.5

          ctx.fillStyle = `rgba(100, 200, 255, ${opacity})`
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
      <div className="absolute inset-0 bg-gradient-radial from-blue-500/10 to-transparent blur-3xl" />
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ filter: 'drop-shadow(0 0 50px rgba(100, 200, 255, 0.15))' }}
      />
    </div>
  )
}

