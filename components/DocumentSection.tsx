'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'

export default function DocumentSection() {
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
          {/* Massive Animated Graphic - LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
            className="relative h-[350px] sm:h-[500px] md:h-[600px] lg:h-[700px] order-2 lg:order-1"
          >
            <DocumentAnimation isInView={isInView} />
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
              From Paper to
              <br />
              <span className="text-gradient">Structure</span>
            </motion.h2>

            <motion.p
              className="text-lg sm:text-xl md:text-2xl text-gray-400 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
            >
              Transform documents into
              <br />
              intelligent data.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function DocumentAnimation({ isInView }: { isInView: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // FIT TO CONTAINER - prevent cut off
    const isMobile = window.innerWidth < 768
    const containerWidth = canvas.parentElement?.clientWidth || 600
    const containerHeight = canvas.parentElement?.clientHeight || 600
    
    canvas.width = containerWidth
    canvas.height = containerHeight
    canvas.style.width = '100%'
    canvas.style.height = '100%'

    // Scale factor to fit content within container
    const contentScale = Math.min(containerWidth / 700, containerHeight / 700) * 0.85

    let animationFrame: number
    let time = 0
    let lastFrameTime = Date.now()
    const targetFPS = isMobile ? 24 : 30 // FASTER FPS

    interface Document {
      x: number
      y: number
      z: number
      rotation: number
      rotationSpeed: number
      particles: Array<{ x: number; y: number; alpha: number; size: number }>
      dissolveProgress: number
    }

    // Centered coordinates
    const centerX = containerWidth / 2
    const centerY = containerHeight / 2

    // Create floating documents - SCALED and CENTERED
    const documents: Document[] = []
    for (let i = 0; i < 4; i++) {
      documents.push({
        x: centerX - 100 * contentScale + i * 80 * contentScale,
        y: centerY - 150 * contentScale + Math.sin(i) * 40 * contentScale,
        z: i * 20,
        rotation: (i * Math.PI) / 8,
        rotationSpeed: 0.003 + i * 0.001, // Slightly faster rotation
        particles: [],
        dissolveProgress: 0,
      })
    }

    // Grid cells for structured data - SCALED and CENTERED
    const gridCells: Array<{ x: number; y: number; opacity: number; delay: number }> = []
    const gridRows = 6 // Fewer rows to fit
    const gridCols = 8 // Fewer cols to fit
    const cellSize = 35 * contentScale
    const gridWidth = gridCols * cellSize
    const gridHeight = gridRows * cellSize
    const gridStartX = centerX - gridWidth / 2
    const gridStartY = centerY + 50 * contentScale

    for (let row = 0; row < gridRows; row++) {
      for (let col = 0; col < gridCols; col++) {
        gridCells.push({
          x: gridStartX + col * cellSize,
          y: gridStartY + row * cellSize,
          opacity: 0,
          delay: (row + col) * 0.02,
        })
      }
    }

    function drawDocument(doc: Document, alpha: number = 1) {
      if (!ctx) return

      ctx.save()

      // Apply 3D perspective
      const perspective = 1000
      const perspScale = perspective / (perspective + doc.z)
      
      ctx.translate(doc.x, doc.y)
      ctx.scale(perspScale * contentScale, perspScale * contentScale)
      ctx.rotate(doc.rotation)

      // Document shadow
      ctx.fillStyle = `rgba(0, 0, 0, ${0.3 * alpha})`
      ctx.fillRect(-45, -65, 90, 130)

      // Document body
      ctx.fillStyle = `rgba(255, 255, 255, ${0.9 * alpha})`
      ctx.strokeStyle = `rgba(200, 200, 200, ${alpha})`
      ctx.lineWidth = 2
      ctx.fillRect(-40, -60, 80, 120)
      ctx.strokeRect(-40, -60, 80, 120)

      // Document lines (text simulation)
      ctx.strokeStyle = `rgba(150, 150, 150, ${0.6 * alpha})`
      ctx.lineWidth = 1
      for (let i = 0; i < 6; i++) {
        const lineY = -40 + i * 15
        ctx.beginPath()
        ctx.moveTo(-30, lineY)
        ctx.lineTo(30, lineY)
        ctx.stroke()
      }

      ctx.restore()
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

      // Animation phases - FASTER cycle
      const cycleTime = 350
      const phase = (time % cycleTime) / cycleTime

      // Phase 1: Documents float (0 - 0.3)
      // Phase 2: Documents dissolve into particles (0.3 - 0.6)
      // Phase 3: Particles form grid (0.6 - 0.9)
      // Phase 4: Grid solidifies (0.9 - 1.0)

      // Update and draw documents
      documents.forEach((doc, i) => {
        // Floating animation
        doc.y = 150 + Math.sin(i) * 50 + Math.sin(time * 0.02 + i) * 20
        doc.rotation += doc.rotationSpeed

        if (phase < 0.3) {
          // Just floating
          drawDocument(doc, 1)
        } else if (phase < 0.6) {
          // Dissolving
          doc.dissolveProgress = (phase - 0.3) / 0.3
          const docAlpha = 1 - doc.dissolveProgress
          drawDocument(doc, docAlpha)

          // Create particles
          if (Math.random() < 0.3) {
            doc.particles.push({
              x: doc.x + (Math.random() - 0.5) * 100,
              y: doc.y + (Math.random() - 0.5) * 140,
              alpha: 1,
              size: Math.random() * 3 + 1,
            })
          }

          // Draw and update particles
          doc.particles.forEach((particle, j) => {
            // Move particle toward grid area
            const targetX = gridStartX + gridCols * cellSize * 0.5
            const targetY = gridStartY + gridRows * cellSize * 0.5

            particle.x += (targetX - particle.x) * 0.02
            particle.y += (targetY - particle.y) * 0.02
            particle.alpha = Math.max(0, particle.alpha - 0.01)

            ctx.fillStyle = `rgba(255, 255, 255, ${particle.alpha})`
            ctx.shadowBlur = 10
            ctx.shadowColor = `rgba(255, 255, 255, ${particle.alpha * 0.5})`
            ctx.beginPath()
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
            ctx.fill()
          })

          // Clean up old particles
          doc.particles = doc.particles.filter((p) => p.alpha > 0)
        }
      })

      // Draw structured grid
      if (phase > 0.5) {
        const gridProgress = Math.min((phase - 0.5) / 0.4, 1)

        gridCells.forEach((cell) => {
          const cellProgress = Math.max(0, Math.min(1, (gridProgress - cell.delay) / 0.1))
          
          if (cellProgress > 0) {
            cell.opacity = cellProgress

            // Cell glow
            const glowSize = 20 * (1 - cellProgress * 0.5)
            const gradient = ctx.createRadialGradient(
              cell.x + cellSize / 2,
              cell.y + cellSize / 2,
              0,
              cell.x + cellSize / 2,
              cell.y + cellSize / 2,
              glowSize
            )
            gradient.addColorStop(0, `rgba(100, 200, 255, ${0.3 * cellProgress})`)
            gradient.addColorStop(1, `rgba(100, 200, 255, 0)`)
            
            ctx.fillStyle = gradient
            ctx.beginPath()
            ctx.arc(cell.x + cellSize / 2, cell.y + cellSize / 2, glowSize, 0, Math.PI * 2)
            ctx.fill()

            // Cell
            ctx.fillStyle = `rgba(255, 255, 255, ${0.05 * cell.opacity})`
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.4 * cell.opacity})`
            ctx.lineWidth = 2
            ctx.shadowBlur = 10
            ctx.shadowColor = `rgba(100, 200, 255, ${0.5 * cell.opacity})`
            
            const size = cellSize - 5
            ctx.fillRect(cell.x + 2.5, cell.y + 2.5, size, size)
            ctx.strokeRect(cell.x + 2.5, cell.y + 2.5, size, size)

            // Cell content (simulated data)
            if (cellProgress > 0.5) {
              ctx.fillStyle = `rgba(255, 255, 255, ${0.6 * cell.opacity})`
              ctx.font = '10px Montserrat'
              ctx.textAlign = 'center'
              ctx.textBaseline = 'middle'
              ctx.shadowBlur = 0
              const value = Math.floor(Math.random() * 100)
              ctx.fillText(value.toString(), cell.x + cellSize / 2, cell.y + cellSize / 2)
            }
          }
        })

        // Draw grid connections
        if (gridProgress > 0.7) {
          ctx.strokeStyle = `rgba(100, 200, 255, ${(gridProgress - 0.7) * 0.3})`
          ctx.lineWidth = 1
          ctx.setLineDash([5, 5])
          
          // Horizontal connections
          for (let row = 0; row < gridRows; row++) {
            ctx.beginPath()
            ctx.moveTo(gridStartX, gridStartY + row * cellSize + cellSize / 2)
            ctx.lineTo(gridStartX + gridCols * cellSize, gridStartY + row * cellSize + cellSize / 2)
            ctx.stroke()
          }
          
          // Vertical connections
          for (let col = 0; col < gridCols; col++) {
            ctx.beginPath()
            ctx.moveTo(gridStartX + col * cellSize + cellSize / 2, gridStartY)
            ctx.lineTo(gridStartX + col * cellSize + cellSize / 2, gridStartY + gridRows * cellSize)
            ctx.stroke()
          }
          
          ctx.setLineDash([])
        }
      }

      // Ambient particles (REDUCED - skip on mobile)
      if (!isMobile) {
        const particleCount = 10 // Reduced from 20
        for (let i = 0; i < particleCount; i++) {
          const particleTime = (time * 0.01 + i * 0.15) % 1
          const x = 100 + Math.random() * 600
          const y = particleTime * 700
          const opacity = Math.sin(particleTime * Math.PI) * 0.3

          ctx.fillStyle = `rgba(100, 200, 255, ${opacity})`
          ctx.shadowBlur = 5
          ctx.shadowColor = `rgba(100, 200, 255, ${opacity * 0.5})`
          ctx.beginPath()
          ctx.arc(x, y, 1.5, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // Reset cycle
      if (phase < 0.1) {
        documents.forEach((doc) => {
          doc.dissolveProgress = 0
          doc.particles = []
        })
        gridCells.forEach((cell) => {
          cell.opacity = 0
        })
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
        style={{ filter: 'drop-shadow(0 0 50px rgba(100, 200, 255, 0.1))' }}
      />
    </div>
  )
}

