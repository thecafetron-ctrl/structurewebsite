'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'

export default function RouteSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.3 })
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['10%', '-10%'])

  return (
    <section
      ref={containerRef}
      className="relative min-h-[85vh] flex items-center py-16 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900 via-charcoal-800 to-charcoal-900" />

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
              Routes That
              <br />
              <span className="text-gradient">Learn</span>
            </motion.h2>

            <motion.p
              className="text-lg sm:text-xl md:text-2xl text-gray-400 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
            >
              Real-time optimization across
              <br />
              global networks.
            </motion.p>
          </motion.div>

          {/* Massive Animated Graphic */}
          <motion.div
            style={{ y }}
            className="relative h-[350px] sm:h-[500px] md:h-[600px] lg:h-[700px]"
          >
            <RouteOptimizationAnimation isInView={isInView} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function RouteOptimizationAnimation({ isInView }: { isInView: boolean }) {
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

    // Define waypoints in 3D space
    const waypoints = [
      { x: 100, y: 150, z: 0, label: 'A' },
      { x: 250, y: 100, z: 50, label: 'B' },
      { x: 450, y: 200, z: 100, label: 'C' },
      { x: 550, y: 350, z: 80, label: 'D' },
      { x: 400, y: 500, z: 40, label: 'E' },
      { x: 200, y: 450, z: 20, label: 'F' },
    ]

    // Generate multiple route options
    const routes = [
      { path: [0, 1, 2, 3, 4, 5], optimal: false, color: 'rgba(255, 100, 100, 0.3)' },
      { path: [0, 2, 1, 3, 5, 4], optimal: false, color: 'rgba(100, 255, 100, 0.3)' },
      { path: [0, 1, 3, 2, 4, 5], optimal: true, color: 'rgba(255, 255, 255, 0.8)' },
      { path: [0, 5, 4, 3, 2, 1], optimal: false, color: 'rgba(100, 100, 255, 0.3)' },
    ]

    function drawRoute(
      route: typeof routes[0],
      progress: number,
      fadeOut: boolean = false
    ) {
      if (!ctx) return

      const opacity = fadeOut ? Math.max(0, 1 - progress) : 1
      
      for (let i = 0; i < route.path.length - 1; i++) {
        const startWaypoint = waypoints[route.path[i]]
        const endWaypoint = waypoints[route.path[i + 1]]

        // Apply 3D perspective
        const perspective = 1000
        const startScale = perspective / (perspective + startWaypoint.z)
        const endScale = perspective / (perspective + endWaypoint.z)

        const startX = 350 + (startWaypoint.x - 350) * startScale
        const startY = 350 + (startWaypoint.y - 350) * startScale
        const endX = 350 + (endWaypoint.x - 350) * endScale
        const endY = 350 + (endWaypoint.y - 350) * endScale

        // Draw line
        const baseColor = route.color.replace(/[\d.]+\)$/, `${opacity * parseFloat(route.color.match(/[\d.]+\)$/)?.[0] || '0.3')})`)
        ctx.strokeStyle = baseColor
        ctx.lineWidth = route.optimal ? 4 : 2
        ctx.lineCap = 'round'

        if (route.optimal) {
          ctx.shadowBlur = 20
          ctx.shadowColor = `rgba(255, 255, 255, ${0.5 * opacity})`
        } else {
          ctx.shadowBlur = 0
        }

        ctx.beginPath()
        ctx.moveTo(startX, startY)
        ctx.lineTo(endX, endY)
        ctx.stroke()

        // Draw animated particle on optimal route
        if (route.optimal && !fadeOut) {
          const particleProgress = ((time * 0.01 + i * 0.3) % 1)
          const particleX = startX + (endX - startX) * particleProgress
          const particleY = startY + (endY - startY) * particleProgress

          ctx.fillStyle = `rgba(255, 255, 255, ${Math.sin(particleProgress * Math.PI)})`
          ctx.shadowBlur = 25
          ctx.shadowColor = 'rgba(255, 255, 255, 0.8)'
          ctx.beginPath()
          ctx.arc(particleX, particleY, 6, 0, Math.PI * 2)
          ctx.fill()
        }
      }
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

      // Animation phases
      const cycleTime = 300
      const phase = (time % cycleTime) / cycleTime

      // Phase 1: Show all routes (0 - 0.3)
      // Phase 2: Fade out non-optimal routes (0.3 - 0.5)
      // Phase 3: Optimal route glows (0.5 - 1.0)

      if (phase < 0.5) {
        // Draw all routes
        routes.forEach((route) => {
          const shouldFade = !route.optimal && phase > 0.3
          const fadeProgress = shouldFade ? (phase - 0.3) / 0.2 : 0
          drawRoute(route, fadeProgress, shouldFade)
        })
      } else {
        // Only show optimal route with extra glow
        const optimalRoute = routes.find((r) => r.optimal)
        if (optimalRoute) {
          drawRoute(optimalRoute, 0, false)
        }
      }

      // Draw waypoints
      waypoints.forEach((waypoint, i) => {
        const perspective = 1000
        const scale = perspective / (perspective + waypoint.z)
        const x = 350 + (waypoint.x - 350) * scale
        const y = 350 + (waypoint.y - 350) * scale
        const size = 15 * scale

        // Glow
        const pulse = Math.sin(time * 0.03 + i) * 0.3 + 0.7
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, size * 2)
        gradient.addColorStop(0, `rgba(255, 255, 255, ${0.3 * pulse})`)
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
        
        ctx.fillStyle = gradient
        ctx.shadowBlur = 0
        ctx.beginPath()
        ctx.arc(x, y, size * 2, 0, Math.PI * 2)
        ctx.fill()

        // Waypoint
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
        ctx.shadowBlur = 15
        ctx.shadowColor = 'rgba(255, 255, 255, 0.6)'
        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fill()

        // Inner circle
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
        ctx.shadowBlur = 0
        ctx.beginPath()
        ctx.arc(x, y, size * 0.6, 0, Math.PI * 2)
        ctx.fill()

        // Label
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)'
        ctx.font = `${12 * scale}px Montserrat`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(waypoint.label, x, y + size + 20)
      })

      // Rotating globe effect in background
      const globeRotation = time * 0.005
      for (let lat = -60; lat <= 60; lat += 20) {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)'
        ctx.lineWidth = 1
        ctx.beginPath()
        
        for (let lon = 0; lon <= 360; lon += 5) {
          const angle = (lon * Math.PI) / 180 + globeRotation
          const x = 350 + Math.cos(angle) * (200 + lat * 2)
          const y = 350 + (lat * 4)
          
          if (lon === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }
        ctx.stroke()
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
        style={{ filter: 'drop-shadow(0 0 50px rgba(255, 255, 255, 0.1))' }}
      />
    </div>
  )
}

