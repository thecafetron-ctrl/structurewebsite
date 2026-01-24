'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'

export default function LoadSection() {
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
            <LoadMatchingAnimation isInView={isInView} />
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
              <span className="text-gradient">Perfect Capacity</span>
              <br />
              Matching
            </motion.h2>

            <motion.p
              className="text-lg sm:text-xl md:text-2xl text-gray-400 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
            >
              Every load finds its optimal carrier.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function LoadMatchingAnimation({ isInView }: { isInView: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Get container size and use it for canvas - FIT TO CONTAINER
    const isMobile = window.innerWidth < 768
    const containerWidth = canvas.parentElement?.clientWidth || 600
    const containerHeight = canvas.parentElement?.clientHeight || 600
    
    // Use container size directly with safe margins
    canvas.width = containerWidth
    canvas.height = containerHeight
    canvas.style.width = '100%'
    canvas.style.height = '100%'

    let animationFrame: number
    let time = 0
    let lastFrameTime = Date.now()
    const targetFPS = isMobile ? 24 : 30 // FASTER FPS

    // Safe content area - 10% margin on all sides to prevent cut-off
    const margin = Math.min(containerWidth, containerHeight) * 0.1
    const contentWidth = containerWidth - margin * 2
    const contentHeight = containerHeight - margin * 2
    const scale = Math.min(contentWidth / 700, contentHeight / 700) // Scale to fit

    // Define geometric shapes (loads)
    interface Load {
      x: number
      y: number
      targetX: number
      targetY: number
      size: number
      rotation: number
      targetRotation: number
      matched: boolean
      matchProgress: number
      vx: number
      vy: number
      shape: 'cube' | 'pyramid' | 'cylinder'
      color: string
    }

    const loads: Load[] = []
    const shapes: Array<'cube' | 'pyramid' | 'cylinder'> = ['cube', 'pyramid', 'cylinder']
    const colors = [
      'rgba(255, 100, 100, 0.6)',
      'rgba(100, 255, 100, 0.6)',
      'rgba(100, 100, 255, 0.6)',
      'rgba(255, 255, 100, 0.6)',
      'rgba(255, 100, 255, 0.6)',
      'rgba(100, 255, 255, 0.6)',
    ]

    // Centered positions using scale
    const centerX = containerWidth / 2
    const centerY = containerHeight / 2

    // Create loads - positioned within safe area
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2
      const radius = 150 * scale
      loads.push({
        x: centerX + Math.cos(angle) * radius,
        y: centerY - 80 * scale + Math.sin(angle) * radius * 0.5,
        targetX: 0,
        targetY: 0,
        size: (35 + Math.random() * 20) * scale,
        rotation: Math.random() * Math.PI * 2,
        targetRotation: 0,
        matched: false,
        matchProgress: 0,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        color: colors[i % colors.length],
      })
    }

    // Define container positions (capacity slots) - in safe area
    const containers = [
      { x: centerX - 150 * scale, y: centerY + 80 * scale, size: 70 * scale },
      { x: centerX, y: centerY + 80 * scale, size: 70 * scale },
      { x: centerX + 150 * scale, y: centerY + 80 * scale, size: 70 * scale },
      { x: centerX - 75 * scale, y: centerY + 160 * scale, size: 70 * scale },
      { x: centerX + 75 * scale, y: centerY + 160 * scale, size: 70 * scale },
      { x: centerX, y: centerY - 10 * scale, size: 70 * scale },
    ]

    function drawCube(x: number, y: number, size: number, rotation: number, color: string, alpha: number = 1) {
      if (!ctx) return

      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)

      // Front face
      ctx.fillStyle = color.replace(/[\d.]+\)$/, `${alpha * 0.7})`)
      ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.5})`
      ctx.lineWidth = 2
      ctx.fillRect(-size / 2, -size / 2, size, size)
      ctx.strokeRect(-size / 2, -size / 2, size, size)

      // Top face (pseudo 3D)
      ctx.fillStyle = color.replace(/[\d.]+\)$/, `${alpha * 0.9})`)
      ctx.beginPath()
      ctx.moveTo(-size / 2, -size / 2)
      ctx.lineTo(0, -size / 2 - size / 4)
      ctx.lineTo(size / 2 + size / 4, -size / 2 - size / 4)
      ctx.lineTo(size / 2, -size / 2)
      ctx.closePath()
      ctx.fill()
      ctx.stroke()

      // Right face
      ctx.fillStyle = color.replace(/[\d.]+\)$/, `${alpha * 0.5})`)
      ctx.beginPath()
      ctx.moveTo(size / 2, -size / 2)
      ctx.lineTo(size / 2 + size / 4, -size / 2 - size / 4)
      ctx.lineTo(size / 2 + size / 4, size / 2 - size / 4)
      ctx.lineTo(size / 2, size / 2)
      ctx.closePath()
      ctx.fill()
      ctx.stroke()

      ctx.restore()
    }

    function drawPyramid(x: number, y: number, size: number, rotation: number, color: string, alpha: number = 1) {
      if (!ctx) return

      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)

      ctx.fillStyle = color.replace(/[\d.]+\)$/, `${alpha * 0.6})`)
      ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.5})`
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(0, -size / 2)
      ctx.lineTo(size / 2, size / 2)
      ctx.lineTo(-size / 2, size / 2)
      ctx.closePath()
      ctx.fill()
      ctx.stroke()

      ctx.fillStyle = color.replace(/[\d.]+\)$/, `${alpha * 0.8})`)
      ctx.beginPath()
      ctx.moveTo(0, -size / 2)
      ctx.lineTo(size / 2, size / 2)
      ctx.lineTo(size / 4, 0)
      ctx.closePath()
      ctx.fill()
      ctx.stroke()

      ctx.restore()
    }

    function drawCylinder(x: number, y: number, size: number, rotation: number, color: string, alpha: number = 1) {
      if (!ctx) return

      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)

      ctx.fillStyle = color.replace(/[\d.]+\)$/, `${alpha * 0.7})`)
      ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.5})`
      ctx.lineWidth = 2
      ctx.fillRect(-size / 3, -size / 2, size * 0.66, size)
      ctx.strokeRect(-size / 3, -size / 2, size * 0.66, size)

      ctx.fillStyle = color.replace(/[\d.]+\)$/, `${alpha * 0.9})`)
      ctx.beginPath()
      ctx.ellipse(0, -size / 2, size / 3, size / 6, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()

      ctx.restore()
    }

    function drawShape(load: Load, alpha: number = 1) {
      switch (load.shape) {
        case 'cube':
          drawCube(load.x, load.y, load.size, load.rotation, load.color, alpha)
          break
        case 'pyramid':
          drawPyramid(load.x, load.y, load.size, load.rotation, load.color, alpha)
          break
        case 'cylinder':
          drawCylinder(load.x, load.y, load.size, load.rotation, load.color, alpha)
          break
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
        time += 1.5 // FASTER animation
      }

      // Animation cycle - FASTER cycle
      const cycleTime = 250 // Faster cycle (was 400)
      const phase = (time % cycleTime) / cycleTime

      // Draw containers
      containers.forEach((container, i) => {
        const hasLoad = loads[i] && loads[i].matchProgress > 0.9
        const pulse = hasLoad ? Math.sin(time * 0.08) * 0.2 + 0.8 : 1

        // Container glow
        const gradient = ctx.createRadialGradient(
          container.x,
          container.y,
          0,
          container.x,
          container.y,
          container.size * pulse
        )
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.05)')
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
        
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(container.x, container.y, container.size * pulse, 0, Math.PI * 2)
        ctx.fill()

        // Container outline
        ctx.strokeStyle = hasLoad ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.2)'
        ctx.lineWidth = hasLoad ? 3 : 2
        ctx.setLineDash(hasLoad ? [] : [10, 5])
        ctx.beginPath()
        ctx.arc(container.x, container.y, container.size / 2, 0, Math.PI * 2)
        ctx.stroke()
        ctx.setLineDash([])
      })

      // Update and draw loads
      loads.forEach((load, i) => {
        if (phase > 0.15 && !load.matched) {
          load.matched = true
          load.targetX = containers[i].x
          load.targetY = containers[i].y
          load.targetRotation = 0
        }

        if (load.matched) {
          load.matchProgress = Math.min(load.matchProgress + 0.04, 1) // FASTER matching
          
          load.x = load.x + (load.targetX - load.x) * 0.15 // Faster movement
          load.y = load.y + (load.targetY - load.y) * 0.15
          load.rotation = load.rotation + (load.targetRotation - load.rotation) * 0.15
          
          if (load.matchProgress > 0.95) {
            load.x = load.targetX
            load.y = load.targetY
            load.rotation = load.targetRotation
            
            if (Math.abs(load.x - load.targetX) < 1 && Math.abs(load.y - load.targetY) < 1) {
              const rippleProgress = (time * 0.08) % 1
              ctx.strokeStyle = `rgba(255, 255, 255, ${(1 - rippleProgress) * 0.5})`
              ctx.lineWidth = 3
              ctx.beginPath()
              ctx.arc(load.x, load.y, rippleProgress * 80 * scale, 0, Math.PI * 2)
              ctx.stroke()
            }
          }
        } else {
          load.x += load.vx
          load.y += load.vy
          load.rotation += 0.015

          // Keep within safe bounds
          const minX = margin + load.size
          const maxX = containerWidth - margin - load.size
          const minY = margin + load.size
          const maxY = centerY - load.size

          if (load.x < minX || load.x > maxX) load.vx *= -1
          if (load.y < minY || load.y > maxY) load.vy *= -1
          load.x = Math.max(minX, Math.min(maxX, load.x))
          load.y = Math.max(minY, Math.min(maxY, load.y))
        }

        // Draw magnetic field lines when matching
        if (load.matched && load.matchProgress < 0.9) {
          const alpha = 1 - load.matchProgress
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.2})`
          ctx.lineWidth = 2
          ctx.setLineDash([5, 5])
          ctx.beginPath()
          ctx.moveTo(load.x, load.y)
          ctx.lineTo(load.targetX, load.targetY)
          ctx.stroke()
          ctx.setLineDash([])
        }

        // Draw glow effect
        if (load.matchProgress > 0) {
          const glowSize = load.size * (1 + load.matchProgress * 0.5)
          const gradient = ctx.createRadialGradient(load.x, load.y, 0, load.x, load.y, glowSize)
          gradient.addColorStop(0, load.color.replace(/[\d.]+\)$/, `${0.3 * load.matchProgress})`))
          gradient.addColorStop(1, load.color.replace(/[\d.]+\)$/, '0)'))
          
          ctx.fillStyle = gradient
          ctx.beginPath()
          ctx.arc(load.x, load.y, glowSize, 0, Math.PI * 2)
          ctx.fill()
        }

        drawShape(load)

        if (load.matchProgress > 0.95) {
          ctx.shadowBlur = 30
          ctx.shadowColor = 'rgba(255, 255, 255, 0.5)'
        } else {
          ctx.shadowBlur = 10
          ctx.shadowColor = 'rgba(255, 255, 255, 0.2)'
        }
      })

      // Reset matching animation after full cycle
      if (phase < 0.08) {
        loads.forEach((load, i) => {
          if (load.matchProgress > 0.9) {
            const angle = (i / 6) * Math.PI * 2
            const radius = 150 * scale
            load.x = centerX + Math.cos(angle) * radius
            load.y = centerY - 80 * scale + Math.sin(angle) * radius * 0.5
            load.rotation = Math.random() * Math.PI * 2
            load.matched = false
            load.matchProgress = 0
            load.vx = (Math.random() - 0.5) * 0.8
            load.vy = (Math.random() - 0.5) * 0.8
          }
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
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-purple-500/10 to-transparent blur-3xl" />
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ filter: 'drop-shadow(0 0 50px rgba(255, 255, 255, 0.1))' }}
      />
    </div>
  )
}
