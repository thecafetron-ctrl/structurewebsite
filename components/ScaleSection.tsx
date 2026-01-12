'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'

export default function ScaleSection() {
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
              Built for
              <br />
              <span className="text-gradient">Global Scale</span>
            </motion.h2>

            <motion.p
              className="text-lg sm:text-xl md:text-2xl text-gray-400 leading-relaxed mb-6 md:mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
            >
              Thousands of operations.
              <br />
              One intelligent system.
            </motion.p>
          </motion.div>

          {/* Massive Animated Graphic */}
          <motion.div
            style={{ y }}
            className="relative h-[350px] sm:h-[500px] md:h-[600px] lg:h-[700px]"
          >
            <ScaleAnimation isInView={isInView} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function ScaleAnimation({ isInView }: { isInView: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // BIGGER - fit to container
    const isMobile = window.innerWidth < 768
    const containerWidth = canvas.parentElement?.clientWidth || 700
    const containerHeight = canvas.parentElement?.clientHeight || 700
    
    canvas.width = containerWidth
    canvas.height = containerHeight
    canvas.style.width = '100%'
    canvas.style.height = '100%'

    // Scale factor to fit content
    const contentScale = Math.min(containerWidth / 700, containerHeight / 700)

    let animationFrame: number
    let time = 0
    let lastFrameTime = Date.now()
    const targetFPS = isMobile ? 28 : 36 // FASTER FPS

    interface Node {
      x: number
      y: number
      z: number
      connections: number[]
      size: number
      pulse: number
      active: boolean
      activationTime: number
    }

    const nodes: Node[] = []
    const maxNodes = isMobile ? 40 : 60 // More nodes for bigger effect
    const centerX = containerWidth / 2
    const centerY = containerHeight / 2

    // Create network nodes in expanding layers - BIGGER radius
    function createNode(layer: number, index: number, total: number): Node {
      const angle = (index / total) * Math.PI * 2
      const radius = (layer * 70 + 60) * contentScale // Bigger radius
      const x = centerX + Math.cos(angle) * radius
      const y = centerY + Math.sin(angle) * radius
      const z = Math.random() * 100

      return {
        x,
        y,
        z,
        connections: [],
        size: 3 + Math.random() * 3,
        pulse: Math.random() * Math.PI * 2,
        active: layer === 0, // Start with center node active
        activationTime: 0,
      }
    }

    // Initialize network
    function initNetwork() {
      nodes.length = 0
      
      // Center node
      nodes.push({
        x: centerX,
        y: centerY,
        z: 0,
        connections: [],
        size: 8,
        pulse: 0,
        active: true,
        activationTime: 0,
      })

      // Create expanding layers
      let nodeCount = 1
      for (let layer = 1; layer <= 4 && nodeCount < maxNodes; layer++) {
        const nodesInLayer = Math.min(layer * 8, maxNodes - nodeCount)
        for (let i = 0; i < nodesInLayer; i++) {
          nodes.push(createNode(layer, i, nodesInLayer))
          nodeCount++
        }
      }

      // Create connections between nearby nodes
      nodes.forEach((node, i) => {
        nodes.forEach((otherNode, j) => {
          if (i !== j) {
            const dx = node.x - otherNode.x
            const dy = node.y - otherNode.y
            const distance = Math.sqrt(dx * dx + dy * dy)
            
            if (distance < 120 * contentScale && Math.random() < 0.35) {
              node.connections.push(j)
            }
          }
        })
      })
    }

    initNetwork()

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

      const growthProgress = Math.min(time * 0.006, 1) // FASTER growth

      // Expand network over time
      const activeNodeCount = Math.floor(nodes.length * growthProgress)

      // Activate nodes progressively
      for (let i = 0; i < activeNodeCount; i++) {
        if (!nodes[i].active) {
          nodes[i].active = true
          nodes[i].activationTime = time
        }
      }

      // Draw connections first (behind nodes)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)'
      ctx.lineWidth = 1

      nodes.forEach((node, i) => {
        if (!node.active) return

        node.connections.forEach((targetIndex) => {
          if (!nodes[targetIndex].active) return

          const target = nodes[targetIndex]
          
          // Apply 3D perspective
          const perspective = 1000
          const scale1 = perspective / (perspective + node.z)
          const scale2 = perspective / (perspective + target.z)
          
          const x1 = centerX + (node.x - centerX) * scale1
          const y1 = centerY + (node.y - centerY) * scale1
          const x2 = centerX + (target.x - centerX) * scale2
          const y2 = centerY + (target.y - centerY) * scale2

          // Connection opacity based on z-depth
          const avgZ = (node.z + target.z) / 2
          const depthOpacity = 1 - avgZ / 200

          ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * depthOpacity})`
          ctx.beginPath()
          ctx.moveTo(x1, y1)
          ctx.lineTo(x2, y2)
          ctx.stroke()

          // Animated pulses along connections
          const pulseProgress = ((time * 0.02 + i * 0.1) % 1)
          const pulseX = x1 + (x2 - x1) * pulseProgress
          const pulseY = y1 + (y2 - y1) * pulseProgress
          const pulseOpacity = Math.sin(pulseProgress * Math.PI) * 0.6 * depthOpacity

          if (pulseOpacity > 0) {
            ctx.fillStyle = `rgba(100, 200, 255, ${pulseOpacity})`
            ctx.shadowBlur = 10
            ctx.shadowColor = `rgba(100, 200, 255, ${pulseOpacity})`
            ctx.beginPath()
            ctx.arc(pulseX, pulseY, 2, 0, Math.PI * 2)
            ctx.fill()
          }
        })
      })

      // Draw nodes
      nodes.forEach((node, i) => {
        if (!node.active) return

        node.pulse += 0.05

        // Apply 3D perspective
        const perspective = 1000
        const scale = perspective / (perspective + node.z)
        const x = centerX + (node.x - centerX) * scale
        const y = centerY + (node.y - centerY) * scale
        const size = node.size * scale

        // Depth-based opacity
        const depthOpacity = 1 - node.z / 200

        // Activation animation
        const timeSinceActivation = time - node.activationTime
        const activationProgress = Math.min(timeSinceActivation / 30, 1)
        const activationScale = 0.5 + activationProgress * 0.5

        // Pulsing effect
        const pulseIntensity = Math.sin(node.pulse) * 0.3 + 0.7

        // Outer glow
        const glowSize = size * 4 * pulseIntensity * activationProgress
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, glowSize)
        gradient.addColorStop(0, `rgba(100, 200, 255, ${0.4 * depthOpacity * activationProgress})`)
        gradient.addColorStop(0.5, `rgba(100, 200, 255, ${0.2 * depthOpacity * activationProgress})`)
        gradient.addColorStop(1, 'rgba(100, 200, 255, 0)')
        
        ctx.fillStyle = gradient
        ctx.shadowBlur = 0
        ctx.beginPath()
        ctx.arc(x, y, glowSize, 0, Math.PI * 2)
        ctx.fill()

        // Node
        ctx.fillStyle = `rgba(255, 255, 255, ${0.9 * depthOpacity * activationProgress})`
        ctx.shadowBlur = 15 * activationProgress
        ctx.shadowColor = `rgba(100, 200, 255, ${0.8 * depthOpacity * activationProgress})`
        ctx.beginPath()
        ctx.arc(x, y, size * activationScale * pulseIntensity, 0, Math.PI * 2)
        ctx.fill()

        // Inner core
        ctx.fillStyle = `rgba(100, 200, 255, ${0.6 * depthOpacity * activationProgress})`
        ctx.shadowBlur = 0
        ctx.beginPath()
        ctx.arc(x, y, size * 0.5 * activationScale, 0, Math.PI * 2)
        ctx.fill()
      })

      // Center node special treatment
      if (nodes[0].active) {
        const centerPulse = Math.sin(time * 0.03) * 0.4 + 0.6
        const centerSize = nodes[0].size * centerPulse

        // Extra bright glow for center
        const centerGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, centerSize * 8)
        centerGradient.addColorStop(0, 'rgba(100, 200, 255, 0.6)')
        centerGradient.addColorStop(0.3, 'rgba(100, 200, 255, 0.3)')
        centerGradient.addColorStop(1, 'rgba(100, 200, 255, 0)')
        
        ctx.fillStyle = centerGradient
        ctx.beginPath()
        ctx.arc(centerX, centerY, centerSize * 8, 0, Math.PI * 2)
        ctx.fill()

        // Center core
        ctx.fillStyle = 'rgba(255, 255, 255, 1)'
        ctx.shadowBlur = 30
        ctx.shadowColor = 'rgba(100, 200, 255, 1)'
        ctx.beginPath()
        ctx.arc(centerX, centerY, centerSize, 0, Math.PI * 2)
        ctx.fill()
      }

      // Breathing effect - entire network
      const breathe = Math.sin(time * 0.02) * 0.05 + 0.95
      ctx.globalAlpha = breathe

      // Ambient particles (REDUCED - skip on mobile)
      if (!isMobile) {
        const particleCount = 20 // Reduced from 40
        for (let i = 0; i < particleCount; i++) {
          const particleTime = (time * 0.01 + i * 0.1) % 1
          const angle = (i / particleCount) * Math.PI * 2
          const radius = particleTime * 400
          const x = centerX + Math.cos(angle + time * 0.01) * radius
          const y = centerY + Math.sin(angle + time * 0.01) * radius
          const opacity = Math.sin(particleTime * Math.PI) * 0.4

          ctx.fillStyle = `rgba(100, 200, 255, ${opacity})`
          ctx.shadowBlur = 5
          ctx.shadowColor = `rgba(100, 200, 255, ${opacity * 0.5})`
          ctx.beginPath()
          ctx.arc(x, y, 2, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      ctx.globalAlpha = 1

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
        style={{ filter: 'drop-shadow(0 0 60px rgba(100, 200, 255, 0.2))' }}
      />
    </div>
  )
}

