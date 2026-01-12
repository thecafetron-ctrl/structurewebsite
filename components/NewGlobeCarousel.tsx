'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState, useCallback } from 'react'

const AI_SYSTEMS = [
  { 
    id: 1, 
    name: 'AI Lead Generation', 
    desc: 'AI-powered prospecting sources and qualifies 60-80 leads weekly with automated CRM integration.' 
  },
  { 
    id: 2, 
    name: 'AI Quotations', 
    desc: 'Generate accurate freight quotes in 10-30 seconds using historical data and live market inputs.' 
  },
  { 
    id: 3, 
    name: 'AI Customer Support', 
    desc: '24/7 intelligent virtual agent handles 80-90% of customer inquiries instantly.' 
  },
  { 
    id: 4, 
    name: 'AI Route Planning', 
    desc: 'Dynamic route optimization in 5-10 seconds cuts fuel costs and minimizes deadhead miles.' 
  },
  { 
    id: 5, 
    name: 'AI Load Matching', 
    desc: 'Perfect capacity matching using symbolic inference and predictive forecasting.' 
  },
  { 
    id: 6, 
    name: 'AI Demand Forecasting', 
    desc: '80-90% accuracy in demand prediction using real-time models trained on historical data.' 
  },
  { 
    id: 7, 
    name: 'AI Document Processing', 
    desc: 'Extract and validate shipping documents automatically in 1-10 minutes.' 
  },
  { 
    id: 8, 
    name: 'AI Invoices', 
    desc: 'Automated invoice generation from shipment data without manual accounting.' 
  },
  { 
    id: 9, 
    name: 'AI Dispatch', 
    desc: 'Intelligent dispatch automation optimizes driver assignments and load sequencing.' 
  },
  { 
    id: 10, 
    name: 'AI Customs', 
    desc: 'Automated customs documentation and compliance validation for cross-border shipments.' 
  },
  { 
    id: 11, 
    name: 'AI Accounting', 
    desc: 'Automated financial reconciliation and bookkeeping with real-time expense tracking.' 
  },
  { 
    id: 12, 
    name: 'AI Finance', 
    desc: 'Intelligent cash flow management, payment processing, and financial forecasting.' 
  },
]

export default function NewGlobeCarousel() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimatedIn, setHasAnimatedIn] = useState(false)
  const [direction, setDirection] = useState(1) // 1 = forward, -1 = backward

  // Simple visibility detection
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Trigger entrance animation
          if (!hasAnimatedIn) {
            setHasAnimatedIn(true)
          }
        } else {
          setIsVisible(false)
        }
      },
      { threshold: 0.2 }
    )
    if (containerRef.current) {
      observer.observe(containerRef.current)
    }
    return () => observer.disconnect()
  }, [hasAnimatedIn])

  // Get indices for visible items
  const getVisibleIndices = useCallback(() => {
    const total = AI_SYSTEMS.length
    const prev = (activeIndex - 1 + total) % total
    const next = (activeIndex + 1) % total
    return { prev, current: activeIndex, next }
  }, [activeIndex])

  // Auto-scroll
  useEffect(() => {
    if (!isVisible || isPaused) return
    
    const interval = setInterval(() => {
      setDirection(1)
      setActiveIndex((prev) => (prev + 1) % AI_SYSTEMS.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isVisible, isPaused])

  const { prev, current, next } = getVisibleIndices()

  const goToPrev = () => {
    setDirection(-1)
    setActiveIndex((p) => (p - 1 + AI_SYSTEMS.length) % AI_SYSTEMS.length)
    setIsPaused(true)
    setTimeout(() => setIsPaused(false), 3000)
  }

  const goToNext = () => {
    setDirection(1)
    setActiveIndex((p) => (p + 1) % AI_SYSTEMS.length)
    setIsPaused(true)
    setTimeout(() => setIsPaused(false), 3000)
  }

  // Entrance animation for the whole section
  const entranceVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 50 
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      }
    }
  }

  return (
    <section
      ref={containerRef}
      className="relative min-h-[80vh] flex items-center py-8"
      style={{ position: 'relative' }}
    >
      {/* Fully transparent - no background */}
      
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4">
        
        {/* Globe Container with Text INSIDE - Animated entrance together */}
        <motion.div 
          className="relative h-[450px] sm:h-[550px] md:h-[650px] w-full"
          variants={entranceVariants}
          initial="hidden"
          animate={hasAnimatedIn ? "visible" : "hidden"}
        >
          {/* Globe Canvas */}
          <div className="absolute inset-0">
            <GlobeCanvas isVisible={isVisible} activeIndex={activeIndex} />
          </div>
          
          {/* Text Carousel - Positioned in CENTER of globe - NO overflow hidden */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <div className="flex items-center justify-center gap-4 sm:gap-8 md:gap-12 w-full max-w-6xl px-4">
              
              {/* Left Item (Previous) */}
              <motion.div 
                className="flex-shrink-0 w-[100px] sm:w-[150px] md:w-[200px] cursor-pointer pointer-events-auto text-right"
                onClick={goToPrev}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                whileHover={{ scale: 1.05, opacity: 1 }}
              >
                <AnimatePresence mode="wait">
                  <motion.h3
                    key={`left-${prev}`}
                    initial={{ 
                      x: direction > 0 ? 100 : -50, 
                      opacity: 0,
                      scale: direction > 0 ? 1.3 : 0.8,
                    }}
                    animate={{ 
                      x: 0, 
                      opacity: 0.6,
                      scale: 1,
                    }}
                    exit={{ 
                      x: -50, 
                      opacity: 0,
                      scale: 0.8,
                    }}
                    transition={{ 
                      duration: 0.5, 
                      ease: [0.4, 0, 0.2, 1]
                    }}
                    className="text-sm sm:text-base md:text-lg font-semibold text-white/60 hover:text-white transition-colors text-right leading-tight"
                  >
                    {AI_SYSTEMS[prev].name}
                  </motion.h3>
                </AnimatePresence>
              </motion.div>

              {/* Center Item (Current) - Clean slide animation with glow transition */}
              <div className="flex-1 max-w-md text-center">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={`center-${current}`}
                    initial={{ 
                      x: direction > 0 ? 150 : -150, 
                      opacity: 0,
                      scale: 0.7,
                    }}
                    animate={{ 
                      x: 0, 
                      opacity: 1,
                      scale: 1,
                    }}
                    exit={{ 
                      x: direction > 0 ? -150 : 150, 
                      opacity: 0,
                      scale: 0.7,
                    }}
                    transition={{ 
                      duration: 0.5, 
                      ease: [0.4, 0, 0.2, 1],
                    }}
                    className="px-4"
                  >
                    <h3 
                      className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4"
                      style={{
                        textShadow: `
                          0 0 20px rgba(100, 200, 255, 0.9),
                          0 0 40px rgba(100, 200, 255, 0.6),
                          0 0 60px rgba(100, 200, 255, 0.4),
                          0 0 80px rgba(100, 200, 255, 0.2)
                        `,
                      }}
                    >
                      {AI_SYSTEMS[current].name}
                    </h3>
                    
                    <motion.p 
                      className="text-sm sm:text-base md:text-lg text-gray-200 leading-relaxed max-w-sm mx-auto"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ delay: 0.1, duration: 0.4 }}
                      style={{
                        textShadow: '0 2px 15px rgba(0, 0, 0, 0.9)',
                      }}
                    >
                      {AI_SYSTEMS[current].desc}
                    </motion.p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Right Item (Next) */}
              <motion.div 
                className="flex-shrink-0 w-[100px] sm:w-[150px] md:w-[200px] cursor-pointer pointer-events-auto text-left"
                onClick={goToNext}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                whileHover={{ scale: 1.05, opacity: 1 }}
              >
                <AnimatePresence mode="wait">
                  <motion.h3
                    key={`right-${next}`}
                    initial={{ 
                      x: direction > 0 ? 50 : -100, 
                      opacity: 0,
                      scale: direction > 0 ? 0.8 : 1.3,
                    }}
                    animate={{ 
                      x: 0, 
                      opacity: 0.6,
                      scale: 1,
                    }}
                    exit={{ 
                      x: 50, 
                      opacity: 0,
                      scale: 0.8,
                    }}
                    transition={{ 
                      duration: 0.5, 
                      ease: [0.4, 0, 0.2, 1]
                    }}
                    className="text-sm sm:text-base md:text-lg font-semibold text-white/60 hover:text-white transition-colors text-left leading-tight"
                  >
                    {AI_SYSTEMS[next].name}
                  </motion.h3>
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Progress indicators - also animated in */}
        <motion.div 
          className="flex justify-center gap-1.5 sm:gap-2 mt-4 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={hasAnimatedIn ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {AI_SYSTEMS.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > activeIndex ? 1 : -1)
                setActiveIndex(index)
                setIsPaused(true)
                setTimeout(() => setIsPaused(false), 3000)
              }}
              className="group p-1"
              aria-label={`Go to slide ${index + 1}`}
            >
              <div className={`h-1.5 rounded-full transition-all duration-500 ${
                index === activeIndex 
                  ? 'bg-cyan-400 w-5 sm:w-6 shadow-[0_0_10px_rgba(100,200,255,0.6)]' 
                  : 'bg-white/20 w-1.5 sm:w-2 group-hover:bg-white/40'
              }`} />
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function GlobeCanvas({ isVisible, activeIndex }: { isVisible: boolean; activeIndex: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resize = () => {
      const rect = container.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      canvas.style.width = rect.width + 'px'
      canvas.style.height = rect.height + 'px'
      ctx.scale(dpr, dpr)
    }
    resize()
    window.addEventListener('resize', resize)

    let animationFrame: number
    let rotation = 0

    function draw() {
      if (!ctx || !canvas || !container) return

      const rect = container.getBoundingClientRect()
      const width = rect.width
      const height = rect.height
      const centerX = width / 2
      const centerY = height / 2
      const radius = Math.min(width, height) * 0.42

      ctx.clearRect(0, 0, width, height)

      if (isVisible) {
        rotation += 0.002
      }

      // Draw globe wireframe
      ctx.globalAlpha = 0.8
      
      // Latitude lines
      for (let lat = -75; lat <= 75; lat += 15) {
        ctx.beginPath()
        const latRadius = radius * Math.cos((lat * Math.PI) / 180)
        const latY = centerY - radius * Math.sin((lat * Math.PI) / 180)
        
        ctx.strokeStyle = lat === 0 ? 'rgba(100, 200, 255, 0.5)' : 'rgba(255, 255, 255, 0.25)'
        ctx.lineWidth = lat === 0 ? 2 : 1
        
        for (let lon = 0; lon <= 360; lon += 3) {
          const angle = (lon * Math.PI) / 180 + rotation
          const x = centerX + latRadius * Math.cos(angle)
          
          if (lon === 0) {
            ctx.moveTo(x, latY)
          } else {
            ctx.lineTo(x, latY)
          }
        }
        ctx.stroke()
      }

      // Longitude lines
      for (let lon = 0; lon < 360; lon += 20) {
        ctx.beginPath()
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)'
        ctx.lineWidth = 1
        
        for (let lat = -90; lat <= 90; lat += 3) {
          const angle = (lon * Math.PI) / 180 + rotation
          const latRadius = radius * Math.cos((lat * Math.PI) / 180)
          const x = centerX + latRadius * Math.cos(angle)
          const y = centerY - radius * Math.sin((lat * Math.PI) / 180)
          
          if (lat === -90) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }
        ctx.stroke()
      }

      ctx.globalAlpha = 1

      // Draw hub points
      const hubs = [
        { lat: 40.7, lon: -74.0 },
        { lat: 51.5, lon: -0.1 },
        { lat: 25.2, lon: 55.3 },
        { lat: 31.2, lon: 121.5 },
        { lat: 35.7, lon: 139.7 },
        { lat: 1.3, lon: 103.8 },
        { lat: -33.9, lon: 151.2 },
        { lat: 52.5, lon: 13.4 },
        { lat: 34.1, lon: -118.2 },
        { lat: -23.5, lon: -46.6 },
        { lat: 48.8, lon: 2.3 },
        { lat: 55.7, lon: 37.6 },
      ]

      // Draw routes
      const routes = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [0, 8], [1, 7], [7, 10], [10, 11], [2, 11]]

      routes.forEach(([from, to]) => {
        const fromHub = hubs[from]
        const toHub = hubs[to]
        
        const fromAngle = (fromHub.lon * Math.PI) / 180 + rotation
        const fromLatRadius = radius * Math.cos((fromHub.lat * Math.PI) / 180)
        const fromX = centerX + fromLatRadius * Math.cos(fromAngle)
        const fromY = centerY - radius * Math.sin((fromHub.lat * Math.PI) / 180)
        const fromZ = fromLatRadius * Math.sin(fromAngle)
        
        const toAngle = (toHub.lon * Math.PI) / 180 + rotation
        const toLatRadius = radius * Math.cos((toHub.lat * Math.PI) / 180)
        const toX = centerX + toLatRadius * Math.cos(toAngle)
        const toY = centerY - radius * Math.sin((toHub.lat * Math.PI) / 180)
        const toZ = toLatRadius * Math.sin(toAngle)
        
        if (fromZ > -radius * 0.3 && toZ > -radius * 0.3) {
          ctx.strokeStyle = 'rgba(100, 200, 255, 0.4)'
          ctx.lineWidth = 1.5
          ctx.beginPath()
          
          const cpX = (fromX + toX) / 2 + (fromY - toY) * 0.15
          const cpY = (fromY + toY) / 2 - Math.abs(fromX - toX) * 0.15
          
          ctx.moveTo(fromX, fromY)
          ctx.quadraticCurveTo(cpX, cpY, toX, toY)
          ctx.stroke()
        }
      })

      // Draw hub points
      hubs.forEach((hub, i) => {
        const angle = (hub.lon * Math.PI) / 180 + rotation
        const latRadius = radius * Math.cos((hub.lat * Math.PI) / 180)
        const x = centerX + latRadius * Math.cos(angle)
        const y = centerY - radius * Math.sin((hub.lat * Math.PI) / 180)
        const z = latRadius * Math.sin(angle)
        
        if (z > -radius * 0.2) {
          const isActive = i === activeIndex % hubs.length
          const pulse = Math.sin(Date.now() * 0.003 + i) * 0.3 + 0.7
          const opacity = Math.max(0.4, (z + radius) / (radius * 2))
          
          // Glow
          const glowSize = isActive ? 20 * pulse : 10 * pulse
          const gradient = ctx.createRadialGradient(x, y, 0, x, y, glowSize)
          if (isActive) {
            gradient.addColorStop(0, `rgba(100, 200, 255, ${0.8 * opacity})`)
            gradient.addColorStop(1, 'rgba(100, 200, 255, 0)')
          } else {
            gradient.addColorStop(0, `rgba(255, 255, 255, ${0.5 * opacity})`)
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
          }
          
          ctx.fillStyle = gradient
          ctx.beginPath()
          ctx.arc(x, y, glowSize, 0, Math.PI * 2)
          ctx.fill()

          // Core point
          ctx.fillStyle = isActive 
            ? `rgba(100, 200, 255, ${opacity})` 
            : `rgba(255, 255, 255, ${0.6 * opacity})`
          ctx.beginPath()
          ctx.arc(x, y, isActive ? 5 : 3, 0, Math.PI * 2)
          ctx.fill()
        }
      })

      animationFrame = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', resize)
    }
  }, [isVisible, activeIndex])

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0"
      style={{ position: 'absolute', background: 'transparent' }}
    >
      <canvas
        ref={canvasRef}
        style={{ 
          filter: 'drop-shadow(0 0 60px rgba(100, 200, 255, 0.2))',
          background: 'transparent'
        }}
      />
    </div>
  )
}
