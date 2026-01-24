'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-visible py-20 sm:py-0"
    >
      {/* Animated Background - full width */}
      <div className="absolute inset-0 overflow-visible">
        <div className="absolute inset-0 -left-[50vw] -right-[50vw] ml-[50%] mr-[50%] w-screen bg-charcoal-900" />
        <motion.div
          style={{ opacity }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="w-full h-full max-w-[100vw] max-h-[100vh] flex items-center justify-center">
            <WireframeScene />
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-8 text-center"
      >
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight px-2 sm:px-4"
        >
          {/* Mobile: Wider horizontal layout */}
          <span className="block sm:hidden">
            <span className="text-gradient inline">AI</span>{' '}
            <span className="text-gradient inline">Infrastructure</span>
          </span>
          <span className="block sm:hidden mt-1">
            <span className="inline">for</span>{' '}
            <span className="inline">Complex</span>
          </span>
          <span className="block sm:hidden mt-1">Logistics</span>
          
          {/* Desktop: Original stacked layout */}
          <span className="hidden sm:block text-gradient">AI Infrastructure</span>
          <span className="hidden sm:block mt-2">for Complex Logistics</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-lg sm:text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed px-4"
        >
          We make logistics smarter. Our AI-powered platform automates end-to-end freight operations — from lead generation to final delivery documentation. One intelligent system replacing fragmented manual processes, saving thousands of hours and millions in costs.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9, ease: [0.4, 0, 0.2, 1] }}
          className="flex items-center justify-center gap-6"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            aria-label="Request a quote"
            onClick={() => {
              const el = document.getElementById('contact')
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }}
            className="relative px-10 py-4 rounded-2xl overflow-hidden group"
          >
            <div className="absolute inset-0 bg-white" />
            <div className="absolute inset-0 bg-gradient-to-r from-white to-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute -inset-1 bg-white/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="relative text-black font-bold text-lg">Get a Quote</span>
          </motion.button>

          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            href="https://structureai.site"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View the demo"
            className="relative px-10 py-4 rounded-2xl overflow-hidden group"
          >
            <div className="absolute inset-0 glass" />
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="relative text-white font-semibold text-lg">See Demo</span>
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Arrow Down Navigation */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, delay: 0.4 }}
        style={{ opacity }}
        onClick={() => {
          // Find current section and scroll to next
          const sections = document.querySelectorAll('[id^="section-"]')
          const scrollY = window.scrollY
          const viewportHeight = window.innerHeight
          
          for (let i = 0; i < sections.length; i++) {
            const section = sections[i] as HTMLElement
            const sectionTop = section.offsetTop
            
            // If current scroll is above this section's bottom, scroll to it
            if (sectionTop > scrollY + viewportHeight * 0.3) {
              section.scrollIntoView({ behavior: 'smooth' })
              break
            }
          }
        }}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 cursor-pointer group z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center group-hover:border-white/60 transition-colors backdrop-blur-sm bg-white/5"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.button>
    </section>
  )
}

// Massive Wireframe Scene Component (OPTIMIZED)
function WireframeScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Mobile-safe sizing - BIGGER on mobile
    const isMobile = window.innerWidth < 768
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight
    const scale = isMobile ? 0.85 : 0.7  // Bigger scale on mobile
    
    canvas.width = viewportWidth * scale
    canvas.height = viewportHeight * scale
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    canvas.style.maxWidth = '100vw'
    canvas.style.maxHeight = '100vh'

    let animationFrame: number
    let time = 0
    let lastFrameTime = Date.now()
    const targetFPS = 30 // Cap at 30fps for better performance

    // Particle system for route lines (REDUCED)
    const particleCount = isMobile ? 20 : 40 // Much fewer particles
    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
    }> = []

    // Create particles - KEEP IN SAFE ZONE
    const margin = canvas.width * 0.1
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: margin + Math.random() * (canvas.width - margin * 2),
        y: margin + Math.random() * (canvas.height - margin * 2),
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.3,
      })
    }

    // Create nodes for network - KEEP IN SAFE ZONE
    const nodeCount = isMobile ? 6 : 10
    const safeMargin = canvas.width * 0.1 // 10% margin
    const nodes: Array<{ x: number; y: number; radius: number }> = []
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: safeMargin + Math.random() * (canvas.width - safeMargin * 2),
        y: safeMargin + Math.random() * (canvas.height - safeMargin * 2),
        radius: Math.random() * 20 + 15,
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
      time += 0.005

      // Draw connecting lines between nodes (OPTIMIZED - fewer checks)
      if (!isMobile) {
        ctx.strokeStyle = `rgba(255, 255, 255, 0.05)`
        ctx.lineWidth = 1
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[j].x - nodes[i].x
            const dy = nodes[j].y - nodes[i].y
            const distance = Math.sqrt(dx * dx + dy * dy)
            
            if (distance < 300) {
              const opacity = 0.1 * (1 - distance / 300)
              ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`
              ctx.beginPath()
              ctx.moveTo(nodes[i].x, nodes[i].y)
              ctx.lineTo(nodes[j].x, nodes[j].y)
              ctx.stroke()
            }
          }
        }
      }

      // Draw and animate nodes
      nodes.forEach((node, i) => {
        const pulse = Math.sin(time * 2 + i) * 0.3 + 0.7
        
        // Outer glow
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius * pulse)
        gradient.addColorStop(0, `rgba(255, 255, 255, 0.2)`)
        gradient.addColorStop(0.5, `rgba(255, 255, 255, 0.05)`)
        gradient.addColorStop(1, `rgba(255, 255, 255, 0)`)
        
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius * pulse, 0, Math.PI * 2)
        ctx.fill()

        // Core
        ctx.fillStyle = `rgba(255, 255, 255, ${0.8 * pulse})`
        ctx.beginPath()
        ctx.arc(node.x, node.y, 3, 0, Math.PI * 2)
        ctx.fill()
      })

      // Draw and animate particles - KEEP IN SAFE ZONE
      const safeMargin = canvas.width * 0.1
      particles.forEach((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy

        // Bounce off edges (keep within safe zone)
        if (particle.x < safeMargin) particle.x = safeMargin
        if (particle.x > canvas.width - safeMargin) particle.x = canvas.width - safeMargin
        if (particle.y < safeMargin) particle.y = safeMargin
        if (particle.y > canvas.height - safeMargin) particle.y = canvas.height - safeMargin

        // Draw particle
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()

        // Draw trail (ONLY on desktop)
        if (!isMobile) {
          const gradient = ctx.createLinearGradient(
            particle.x,
            particle.y,
            particle.x - particle.vx * 20,
            particle.y - particle.vy * 20
          )
          gradient.addColorStop(0, `rgba(255, 255, 255, ${particle.opacity * 0.5})`)
          gradient.addColorStop(1, `rgba(255, 255, 255, 0)`)
          
          ctx.strokeStyle = gradient
          ctx.lineWidth = particle.size
          ctx.beginPath()
          ctx.moveTo(particle.x, particle.y)
          ctx.lineTo(particle.x - particle.vx * 20, particle.y - particle.vy * 20)
          ctx.stroke()
        }
      })

      // Draw wireframe plane (KEEP WITHIN BOUNDS)
      const planeX = canvas.width * 0.5 + Math.sin(time * 0.5) * (canvas.width * 0.15) // Keep centered
      const planeY = canvas.height * 0.4 + Math.cos(time * 0.3) * (canvas.height * 0.08)
      const planeRotation = time * 0.2

      ctx.save()
      ctx.translate(planeX, planeY)
      ctx.rotate(planeRotation)
      
      // Plane body
      ctx.strokeStyle = `rgba(255, 255, 255, 0.4)`
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(-60, 0)
      ctx.lineTo(60, 0)
      ctx.lineTo(50, -10)
      ctx.lineTo(50, 10)
      ctx.lineTo(60, 0)
      ctx.stroke()

      // Wings
      ctx.beginPath()
      ctx.moveTo(-20, 0)
      ctx.lineTo(-30, -40)
      ctx.lineTo(10, -40)
      ctx.lineTo(0, 0)
      ctx.moveTo(-20, 0)
      ctx.lineTo(-30, 40)
      ctx.lineTo(10, 40)
      ctx.lineTo(0, 0)
      ctx.stroke()

      // Glow effect
      ctx.shadowBlur = 20
      ctx.shadowColor = 'rgba(255, 255, 255, 0.5)'
      ctx.strokeStyle = `rgba(255, 255, 255, 0.8)`
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(-60, 0)
      ctx.lineTo(60, 0)
      ctx.stroke()
      
      ctx.restore()

      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}

