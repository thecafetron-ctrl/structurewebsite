'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { WordReveal } from '@/components/fx/Reveal'
import MagneticButton from '@/components/fx/MagneticButton'
import Aurora from '@/components/fx/Aurora'
import { smoothScrollTo } from '@/components/fx/SmoothScroll'

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '45%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 sm:py-0"
    >
      {/* Layered background: base, aurora, grid floor, particle network */}
      <div className="absolute inset-0 bg-charcoal-900" />
      <motion.div style={{ scale: bgScale, opacity }} className="absolute inset-0">
        <Aurora intensity={1.2} />
        <GridFloor />
        <NetworkScene />
        {/* Vignette to keep focus center-stage */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% 45%, transparent 40%, rgba(10,10,10,0.85) 100%)',
          }}
        />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-8 text-center"
      >
        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: -12, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="inline-flex items-center gap-2.5 glass-strong rounded-full px-5 py-2 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-teal-300 pulse-dot" />
          <span className="text-xs sm:text-sm font-medium tracking-widest uppercase text-gray-300">
            The AI Operating System for Freight
          </span>
        </motion.div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight px-2 sm:px-4">
          <WordReveal text="AI Infrastructure" shimmer className="block" delay={0.15} />
          <WordReveal text="for Complex Logistics" className="block mt-1 sm:mt-2" delay={0.4} />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-lg sm:text-xl md:text-2xl text-gray-400 mb-10 max-w-3xl mx-auto leading-relaxed px-4"
        >
          We make logistics smarter. Our AI-powered platform automates end-to-end freight
          operations — from lead generation to final delivery documentation. One intelligent
          system replacing fragmented manual processes, saving thousands of hours and millions
          in costs.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.95, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-6"
        >
          <MagneticButton>
            <motion.button
              whileTap={{ scale: 0.97 }}
              type="button"
              aria-label="Request a quote"
              onClick={() => smoothScrollTo('contact')}
              className="relative px-10 py-4 rounded-2xl overflow-hidden group"
            >
              <div className="absolute inset-0 bg-white" />
              <div className="absolute inset-0 bg-gradient-to-r from-white to-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute -inset-1 bg-white/25 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="shine-bar" />
              <span className="relative text-black font-bold text-lg">Get a Quote</span>
            </motion.button>
          </MagneticButton>

          <MagneticButton>
            <motion.a
              whileTap={{ scale: 0.97 }}
              href="https://structureai.site"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View the demo"
              className="relative inline-flex px-10 py-4 rounded-2xl overflow-hidden group glow-border"
            >
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative text-white font-semibold text-lg">See Demo</span>
            </motion.a>
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.4 }}
        style={{ opacity }}
        aria-label="Scroll to next section"
        onClick={() => {
          const sections = document.querySelectorAll('[id^="section-"]')
          const scrollY = window.scrollY
          const viewportHeight = window.innerHeight
          for (let i = 0; i < sections.length; i++) {
            const section = sections[i] as HTMLElement
            if (section.offsetTop > scrollY + viewportHeight * 0.3) {
              smoothScrollTo(section.id, 0)
              break
            }
          }
        }}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 cursor-pointer group z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
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

/** Perspective grid floor receding to the horizon. */
function GridFloor() {
  return (
    <div
      aria-hidden
      className="absolute inset-x-0 bottom-0 h-[45%] pointer-events-none"
      style={{ perspective: '600px' }}
    >
      <div
        className="absolute inset-x-[-40%] -bottom-1/4 top-0"
        style={{
          transform: 'rotateX(62deg)',
          transformOrigin: 'top center',
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          animation: 'grid-scroll 3.5s linear infinite',
          maskImage: 'linear-gradient(to bottom, transparent, black 30%, black 75%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to bottom, transparent, black 30%, black 75%, transparent)',
        }}
      />
    </div>
  )
}

/** Depth-projected particle network with mouse parallax. */
function NetworkScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const isMobile = window.innerWidth < 768
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    let width = window.innerWidth
    let height = window.innerHeight

    const setSize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = '100%'
      canvas.style.height = '100%'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    setSize()

    // Nodes with a depth coordinate for parallax + size falloff
    const nodeCount = isMobile ? 26 : 60
    const nodes = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      z: Math.random(), // 0 = far, 1 = near
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      twinkle: Math.random() * Math.PI * 2,
    }))

    const mouse = { x: width / 2, y: height / 2, tx: width / 2, ty: height / 2 }
    const onMouseMove = (e: MouseEvent) => {
      mouse.tx = e.clientX
      mouse.ty = e.clientY
    }
    window.addEventListener('mousemove', onMouseMove)

    let animationFrame = 0
    let time = 0
    let lastFrameTime = performance.now()
    const targetFPS = isMobile ? 28 : 45
    const linkDist = isMobile ? 130 : 170

    function animate(now: number) {
      animationFrame = requestAnimationFrame(animate)
      if (now - lastFrameTime < 1000 / targetFPS) return
      lastFrameTime = now
      if (!ctx) return

      time += 0.012
      mouse.x += (mouse.tx - mouse.x) * 0.06
      mouse.y += (mouse.ty - mouse.y) * 0.06

      ctx.clearRect(0, 0, width, height)

      const parallaxX = (mouse.x - width / 2) / width
      const parallaxY = (mouse.y - height / 2) / height

      // Project node positions with depth-based parallax
      const projected = nodes.map((n) => {
        n.x += n.vx
        n.y += n.vy
        if (n.x < -20) n.x = width + 20
        if (n.x > width + 20) n.x = -20
        if (n.y < -20) n.y = height + 20
        if (n.y > height + 20) n.y = -20
        return {
          px: n.x - parallaxX * 40 * n.z,
          py: n.y - parallaxY * 40 * n.z,
          z: n.z,
          twinkle: n.twinkle,
        }
      })

      // Links
      ctx.lineWidth = 1
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const a = projected[i]
          const b = projected[j]
          const dx = b.px - a.px
          const dy = b.py - a.py
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < linkDist) {
            const depth = (a.z + b.z) / 2
            const alpha = (1 - dist / linkDist) * 0.14 * (0.4 + depth * 0.6)
            ctx.strokeStyle = `rgba(180, 220, 255, ${alpha})`
            ctx.beginPath()
            ctx.moveTo(a.px, a.py)
            ctx.lineTo(b.px, b.py)
            ctx.stroke()
          }
        }
      }

      // Nodes with twinkle + glow
      projected.forEach((p) => {
        const pulse = Math.sin(time * 2 + p.twinkle) * 0.35 + 0.65
        const size = (0.8 + p.z * 2.2) * pulse

        const glow = ctx.createRadialGradient(p.px, p.py, 0, p.px, p.py, size * 7)
        glow.addColorStop(0, `rgba(255, 255, 255, ${0.16 * pulse * p.z})`)
        glow.addColorStop(1, 'rgba(255, 255, 255, 0)')
        ctx.fillStyle = glow
        ctx.beginPath()
        ctx.arc(p.px, p.py, size * 7, 0, Math.PI * 2)
        ctx.fill()

        ctx.fillStyle = `rgba(255, 255, 255, ${(0.35 + p.z * 0.55) * pulse})`
        ctx.beginPath()
        ctx.arc(p.px, p.py, size, 0, Math.PI * 2)
        ctx.fill()
      })

      // Wireframe plane drifting across the network
      const planeX = width * 0.5 + Math.sin(time * 0.4) * width * 0.18
      const planeY = height * 0.38 + Math.cos(time * 0.25) * height * 0.07
      const heading = Math.cos(time * 0.4) > 0 ? 0.08 : Math.PI - 0.08

      ctx.save()
      ctx.translate(planeX, planeY)
      ctx.rotate(heading + Math.sin(time * 0.8) * 0.05)

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)'
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.moveTo(-40, 0)
      ctx.lineTo(40, 0)
      ctx.lineTo(32, -7)
      ctx.lineTo(32, 7)
      ctx.lineTo(40, 0)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(-14, 0)
      ctx.lineTo(-21, -26)
      ctx.lineTo(7, -26)
      ctx.lineTo(0, 0)
      ctx.moveTo(-14, 0)
      ctx.lineTo(-21, 26)
      ctx.lineTo(7, 26)
      ctx.lineTo(0, 0)
      ctx.stroke()

      // Trailing glow line
      const trail = ctx.createLinearGradient(-40, 0, -160, 0)
      trail.addColorStop(0, 'rgba(140, 200, 255, 0.35)')
      trail.addColorStop(1, 'rgba(140, 200, 255, 0)')
      ctx.strokeStyle = trail
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(-40, 0)
      ctx.lineTo(-160, 0)
      ctx.stroke()

      ctx.restore()
    }

    animationFrame = requestAnimationFrame(animate)

    window.addEventListener('resize', setSize)
    return () => {
      cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', setSize)
      window.removeEventListener('mousemove', onMouseMove)
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
