'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'

export default function CostSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.3 })

  return (
    <section
      ref={containerRef}
      className="relative min-h-[85vh] flex items-center py-16 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900 via-black to-charcoal-900" />

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
              Logistics Shouldn't
              <br />
              <span className="text-gradient">Cost This Much</span>
            </motion.h2>

            <motion.p
              className="text-lg sm:text-xl md:text-2xl text-gray-400 leading-relaxed mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
            >
              Manual processes are bleeding your business dry.
            </motion.p>

            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <span className="text-lg sm:text-xl text-gray-300">~19,000 hours/year wasted</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <span className="text-lg sm:text-xl text-gray-300">AED 9.2M–10.3M in inefficiency costs</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Massive Animated Graphic */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative h-[350px] sm:h-[450px] md:h-[550px] w-full max-w-[600px] mx-auto"
          >
            <CostAnimation isInView={isInView} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function CostAnimation({ isInView }: { isInView: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const isMobile = window.innerWidth < 768
    const width = canvas.parentElement?.clientWidth || 700
    const height = canvas.parentElement?.clientHeight || 700
    
    // FULL SIZE canvas - bigger on mobile
    canvas.width = width
    canvas.height = height
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    
    // USE THIS SCALE for drawing content - BIGGER on mobile now
    const contentScale = isMobile ? 0.9 : 0.85 // Content uses 90% on mobile
    const centerX = width / 2
    const centerY = height / 2

    let animationFrame: number
    let time = 0
    let lastFrameTime = Date.now()
    const targetFPS = isMobile ? 20 : 24

    // Fragmented nodes - KEEP IN SAFE ZONE (80% of canvas)
    const safeWidth = width * contentScale
    const safeHeight = height * contentScale
    const offsetX = (width - safeWidth) / 2
    const offsetY = (height - safeHeight) / 2
    
    const nodes: Array<{ x: number; y: number; size: number; opacity: number }> = []
    for (let i = 0; i < (isMobile ? 15 : 25); i++) {
      nodes.push({
        x: offsetX + Math.random() * safeWidth,
        y: offsetY + Math.random() * safeHeight,
        size: Math.random() * 20 + 10,
        opacity: Math.random() * 0.5 + 0.3,
      })
    }

    // Cost counter
    let costValue = 9200000 // Start at 9.2M

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
        costValue = Math.min(costValue + 5000, 10300000)
      }

      // Draw fragmented nodes (broken systems)
      nodes.forEach((node, i) => {
        const pulse = Math.sin(time * 0.05 + i) * 0.3 + 0.7
        
        // Node glow
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.size * 2)
        gradient.addColorStop(0, `rgba(239, 68, 68, ${node.opacity * 0.3})`)
        gradient.addColorStop(1, 'rgba(239, 68, 68, 0)')
        
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.size * 2, 0, Math.PI * 2)
        ctx.fill()

        // Node
        ctx.fillStyle = `rgba(239, 68, 68, ${node.opacity * pulse})`
        ctx.shadowBlur = 15
        ctx.shadowColor = 'rgba(239, 68, 68, 0.6)'
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2)
        ctx.fill()
      })

      // Draw broken connections
      if (!isMobile) {
        ctx.strokeStyle = 'rgba(239, 68, 68, 0.2)'
        ctx.lineWidth = 2
        ctx.setLineDash([10, 10])
        
        nodes.forEach((node1, i) => {
          nodes.forEach((node2, j) => {
            if (i >= j) return
            const dx = node2.x - node1.x
            const dy = node2.y - node1.y
            const distance = Math.sqrt(dx * dx + dy * dy)
            
            if (distance < 150) {
              ctx.beginPath()
              ctx.moveTo(node1.x, node1.y)
              ctx.lineTo(node2.x, node2.y)
              ctx.stroke()
            }
          })
        })
        ctx.setLineDash([])
      }

      // Chaotic particles
      const particleCount = isMobile ? 10 : 20
      for (let i = 0; i < particleCount; i++) {
        const particleTime = (time * 0.02 + i * 0.2) % 1
        const x = Math.random() * canvas.width
        const y = particleTime * canvas.height
        const opacity = Math.sin(particleTime * Math.PI) * 0.5

        ctx.fillStyle = `rgba(239, 68, 68, ${opacity})`
        ctx.beginPath()
        ctx.arc(x, y, 2, 0, Math.PI * 2)
        ctx.fill()
      }

      // Cost counter (center)
      ctx.fillStyle = 'rgba(239, 68, 68, 0.9)'
      ctx.font = `bold ${isMobile ? 32 : 40}px Montserrat`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.shadowBlur = 20
      ctx.shadowColor = 'rgba(239, 68, 68, 0.8)'
      ctx.fillText(`AED ${(costValue / 1000000).toFixed(1)}M`, centerX, centerY)

      ctx.shadowBlur = 0
      ctx.font = `${isMobile ? 12 : 16}px Montserrat`
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)'
      ctx.fillText('in inefficiency costs', centerX, centerY + (isMobile ? 35 : 40))

      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrame)
    }
  }, [isInView])

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-radial from-red-500/10 to-transparent blur-3xl" />
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ 
          filter: 'drop-shadow(0 0 50px rgba(239, 68, 68, 0.15))'
        }}
      />
    </div>
  )
}

