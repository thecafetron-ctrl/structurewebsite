'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

const AI_SYSTEMS = [
  { id: 1, name: 'Lead Generation', icon: '→', desc: 'Sources 60-80 qualified leads weekly' },
  { id: 2, name: 'Quotations', icon: '⚡', desc: 'Accurate quotes in 10-30 seconds' },
  { id: 3, name: 'Customer Support', icon: '○', desc: '24/7 intelligent agent handles 80-90% inquiries' },
  { id: 4, name: 'Route Planning', icon: '⟿', desc: 'Optimal routes in 5-10 seconds' },
  { id: 5, name: 'Load Matching', icon: '□', desc: 'Perfect capacity matching instantly' },
  { id: 6, name: 'Demand Forecasting', icon: '△', desc: '80-90% accuracy in predictions' },
  { id: 7, name: 'Documents', icon: '≡', desc: 'Auto-process in 1-10 minutes' },
  { id: 8, name: 'Invoices', icon: '₪', desc: 'Automated invoice generation' },
  { id: 9, name: 'Dispatch', icon: '⊙', desc: 'Intelligent dispatch automation' },
  { id: 10, name: 'Customs', icon: '⊕', desc: 'Automated customs documentation' },
]

export default function GlobeCarouselSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.3 })
  const [activeSystem, setActiveSystem] = useState<number | null>(null)

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900 via-black to-charcoal-900" />

      <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-8 w-full">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4">
            <span className="text-gradient">AI Automation.</span>
            <br />
            Global Network.
          </h2>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-12">
          {/* Globe (Full Width) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative h-[400px] sm:h-[500px] md:h-[600px] w-full max-w-[800px] mx-auto"
          >
            <Globe3D isInView={isInView} activeSystem={activeSystem} />
          </motion.div>

          {/* AI Systems - Floating, No Boxes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6 max-w-6xl mx-auto px-4"
          >
            {AI_SYSTEMS.map((system, index) => (
              <motion.div
                key={system.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: 0.05 + index * 0.03 }}
                onMouseEnter={() => setActiveSystem(system.id)}
                onMouseLeave={() => setActiveSystem(null)}
                onClick={() => setActiveSystem(activeSystem === system.id ? null : system.id)}
                className="flex flex-col items-center gap-2 cursor-pointer group relative"
                style={{ minHeight: '44px', minWidth: '44px' }}
              >
                {/* Icon - Simple symbol */}
                <div
                  className={`text-3xl sm:text-4xl font-light transition-all duration-150 ${
                    activeSystem === system.id ? 'opacity-100 scale-110' : 'opacity-60 group-hover:opacity-100'
                  }`}
                  style={{
                    filter: activeSystem === system.id 
                      ? 'drop-shadow(0 0 15px rgba(255, 255, 255, 0.6))' 
                      : 'none',
                  }}
                >
                  {system.icon}
                </div>

                {/* Service Name */}
                <div
                  className={`text-xs sm:text-sm font-semibold text-center transition-all duration-150 ${
                    activeSystem === system.id 
                      ? 'text-white' 
                      : 'text-gray-400 group-hover:text-gray-200'
                  }`}
                >
                  {system.name}
                </div>

                {/* Description - appears on hover/tap */}
                {activeSystem === system.id && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full mt-2 text-xs text-center text-gray-400 max-w-[200px] z-50 bg-black/80 backdrop-blur-sm px-3 py-2 rounded-lg"
                  >
                    {system.desc}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function Globe3D({ isInView, activeSystem }: { isInView: boolean; activeSystem: number | null }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const isMobile = window.innerWidth < 768
    const width = canvas.parentElement?.clientWidth || 800
    const height = canvas.parentElement?.clientHeight || 800
    const scale = isMobile ? 0.5 : 0.7
    
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
    const globeRadius = Math.min(canvas.width, canvas.height) * 0.35

    // Connection points on globe (major logistics hubs)
    const connectionPoints = [
      { lat: 40.7, lon: -74.0, label: 'New York' }, // NYC
      { lat: 51.5, lon: -0.1, label: 'London' },
      { lat: 25.2, lon: 55.3, label: 'Dubai' },
      { lat: 31.2, lon: 121.5, label: 'Shanghai' },
      { lat: 35.7, lon: 139.7, label: 'Tokyo' },
      { lat: 1.3, lon: 103.8, label: 'Singapore' },
      { lat: -33.9, lon: 151.2, label: 'Sydney' },
      { lat: 52.5, lon: 13.4, label: 'Berlin' },
      { lat: 34.1, lon: -118.2, label: 'Los Angeles' },
    ]

    // Convert lat/lon to 3D coordinates
    function latLonToXYZ(lat: number, lon: number, rotation: number) {
      const phi = (90 - lat) * (Math.PI / 180)
      const theta = (lon + rotation) * (Math.PI / 180)
      
      const x = globeRadius * Math.sin(phi) * Math.cos(theta)
      const y = globeRadius * Math.cos(phi)
      const z = globeRadius * Math.sin(phi) * Math.sin(theta)
      
      return { x, y, z }
    }

    // Route connections
    const routes: Array<{ from: number; to: number }> = [
      { from: 0, to: 1 }, // NYC - London
      { from: 1, to: 2 }, // London - Dubai
      { from: 2, to: 3 }, // Dubai - Shanghai
      { from: 3, to: 4 }, // Shanghai - Tokyo
      { from: 4, to: 5 }, // Tokyo - Singapore
      { from: 0, to: 8 }, // NYC - LA
      { from: 2, to: 7 }, // Dubai - Berlin
      { from: 5, to: 6 }, // Singapore - Sydney
    ]

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
        time += 0.2
      }

      const rotation = time * 0.1

      // Draw globe wireframe (latitude lines)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)'
      ctx.lineWidth = 1

      for (let lat = -60; lat <= 60; lat += 20) {
        ctx.beginPath()
        for (let lon = -180; lon <= 180; lon += 5) {
          const pos = latLonToXYZ(lat, lon, rotation)
          if (pos.z > 0) {
            const screenX = centerX + pos.x
            const screenY = centerY - pos.y
            if (lon === -180) {
              ctx.moveTo(screenX, screenY)
            } else {
              ctx.lineTo(screenX, screenY)
            }
          }
        }
        ctx.stroke()
      }

      // Draw longitude lines
      for (let lon = -180; lon <= 180; lon += 30) {
        ctx.beginPath()
        for (let lat = -90; lat <= 90; lat += 5) {
          const pos = latLonToXYZ(lat, lon, rotation)
          if (pos.z > 0) {
            const screenX = centerX + pos.x
            const screenY = centerY - pos.y
            if (lat === -90) {
              ctx.moveTo(screenX, screenY)
            } else {
              ctx.lineTo(screenX, screenY)
            }
          }
        }
        ctx.stroke()
      }

      // Draw routes between cities
      const activeIntensity = activeSystem ? 1 : 0.5
      routes.forEach((route, i) => {
        const from = connectionPoints[route.from]
        const to = connectionPoints[route.to]
        
        const fromPos = latLonToXYZ(from.lat, from.lon, rotation)
        const toPos = latLonToXYZ(to.lat, to.lon, rotation)
        
        if (fromPos.z > 0 && toPos.z > 0) {
          const fromX = centerX + fromPos.x
          const fromY = centerY - fromPos.y
          const toX = centerX + toPos.x
          const toY = centerY - toPos.y
          
          // Arc style route
          const cpX = (fromX + toX) / 2 + (fromY - toY) * 0.2
          const cpY = (fromY + toY) / 2 - (fromX - toX) * 0.2
          
          const opacity = activeSystem ? 0.6 * activeIntensity : 0.3
          
          ctx.strokeStyle = `rgba(100, 200, 255, ${opacity})`
          ctx.lineWidth = activeSystem ? 3 : 2
          ctx.beginPath()
          ctx.moveTo(fromX, fromY)
          ctx.quadraticCurveTo(cpX, cpY, toX, toY)
          ctx.stroke()
          
          // Animated particle along route
          if (activeSystem) {
            const particleProgress = ((time * 0.02 + i * 0.3) % 1)
            const t = particleProgress
            const particleX = (1 - t) * (1 - t) * fromX + 2 * (1 - t) * t * cpX + t * t * toX
            const particleY = (1 - t) * (1 - t) * fromY + 2 * (1 - t) * t * cpY + t * t * toY
            
            ctx.fillStyle = `rgba(100, 200, 255, ${Math.sin(particleProgress * Math.PI)})`
            ctx.shadowBlur = 15
            ctx.shadowColor = 'rgba(100, 200, 255, 0.8)'
            ctx.beginPath()
            ctx.arc(particleX, particleY, 4, 0, Math.PI * 2)
            ctx.fill()
            ctx.shadowBlur = 0
          }
        }
      })

      // Draw connection points (cities)
      connectionPoints.forEach((point, i) => {
        const pos = latLonToXYZ(point.lat, point.lon, rotation)
        
        if (pos.z > 0) {
          const screenX = centerX + pos.x
          const screenY = centerY - pos.y
          
          const pulse = Math.sin(time * 0.03 + i) * 0.3 + 0.7
          const size = activeSystem ? 8 * pulse : 6 * pulse
          
          // Glow
          const gradient = ctx.createRadialGradient(screenX, screenY, 0, screenX, screenY, size * 3)
          gradient.addColorStop(0, `rgba(100, 200, 255, ${activeSystem ? 0.4 : 0.2})`)
          gradient.addColorStop(1, 'rgba(100, 200, 255, 0)')
          
          ctx.fillStyle = gradient
          ctx.beginPath()
          ctx.arc(screenX, screenY, size * 3, 0, Math.PI * 2)
          ctx.fill()
          
          // Point
          ctx.fillStyle = 'rgba(100, 200, 255, 0.9)'
          ctx.shadowBlur = 15
          ctx.shadowColor = 'rgba(100, 200, 255, 0.6)'
          ctx.beginPath()
          ctx.arc(screenX, screenY, size, 0, Math.PI * 2)
          ctx.fill()
          ctx.shadowBlur = 0
        }
      })

      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrame)
    }
  }, [isInView, activeSystem])

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-radial from-cyan-500/10 via-blue-500/5 to-transparent blur-3xl" />
      <canvas
        ref={canvasRef}
        className="relative w-full h-full"
        style={{ filter: 'drop-shadow(0 0 60px rgba(100, 200, 255, 0.2))' }}
      />
    </div>
  )
}

