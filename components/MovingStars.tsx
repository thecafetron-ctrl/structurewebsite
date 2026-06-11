'use client'

import { useEffect, useRef } from 'react'

type Star = {
  x: number
  y: number
  size: number
  speed: number
  opacity: number
  layer: number // 0 far, 1 mid, 2 near
  twinkle: number
}

type ShootingStar = {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
}

/** Three-layer parallax starfield with twinkle and occasional shooting stars. */
export default function MovingStars() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const isMobile = window.innerWidth < 768
    let width = window.innerWidth
    let height = window.innerHeight

    const setSize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }
    setSize()

    const starCount = isMobile ? 70 : 160
    const stars: Star[] = []
    for (let i = 0; i < starCount; i++) {
      const layer = Math.floor(Math.random() * 3)
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 0.4 + layer * 0.6 + Math.random() * 0.7,
        speed: (0.04 + layer * 0.09) * (Math.random() * 0.6 + 0.7),
        opacity: Math.random() * 0.45 + 0.15 + layer * 0.1,
        layer,
        twinkle: Math.random() * Math.PI * 2,
      })
    }

    const shootingStars: ShootingStar[] = []
    let nextShootAt = 4000 + Math.random() * 6000

    let animationFrame = 0
    let time = 0
    let lastFrameTime = performance.now()
    let elapsedTotal = 0
    const targetFPS = isMobile ? 24 : 40

    function spawnShootingStar() {
      const fromLeft = Math.random() > 0.5
      const angle = (fromLeft ? 1 : -1) * (Math.PI / 5 + Math.random() * 0.3)
      const speed = 9 + Math.random() * 5
      shootingStars.push({
        x: fromLeft ? Math.random() * width * 0.4 : width * 0.6 + Math.random() * width * 0.4,
        y: Math.random() * height * 0.4,
        vx: Math.cos(angle) * speed,
        vy: Math.abs(Math.sin(angle)) * speed * 0.55,
        life: 0,
        maxLife: 40 + Math.random() * 25,
      })
    }

    function animate(now: number) {
      animationFrame = requestAnimationFrame(animate)
      const elapsed = now - lastFrameTime
      if (elapsed < 1000 / targetFPS) return
      lastFrameTime = now
      elapsedTotal += elapsed
      if (!ctx) return

      time += 0.016
      ctx.clearRect(0, 0, width, height)

      // Scroll-linked parallax per depth layer
      const scrollOffset = window.scrollY

      stars.forEach((star) => {
        star.y += star.speed
        if (star.y > height) {
          star.y = -2
          star.x = Math.random() * width
        }

        const drawY = (star.y - scrollOffset * 0.03 * (star.layer + 1)) % height
        const y = drawY < 0 ? drawY + height : drawY
        const tw = Math.sin(time * (1 + star.layer) + star.twinkle) * 0.3 + 0.7

        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * tw})`
        ctx.beginPath()
        ctx.arc(star.x, y, star.size * tw, 0, Math.PI * 2)
        ctx.fill()
      })

      // Shooting stars
      if (elapsedTotal > nextShootAt && !isMobile) {
        spawnShootingStar()
        nextShootAt = elapsedTotal + 6000 + Math.random() * 9000
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i]
        s.x += s.vx
        s.y += s.vy
        s.life++

        const fade = 1 - s.life / s.maxLife
        if (fade <= 0 || s.x < -100 || s.x > width + 100 || s.y > height + 100) {
          shootingStars.splice(i, 1)
          continue
        }

        const tailX = s.x - s.vx * 9
        const tailY = s.y - s.vy * 9
        const grad = ctx.createLinearGradient(s.x, s.y, tailX, tailY)
        grad.addColorStop(0, `rgba(255, 255, 255, ${0.85 * fade})`)
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)')
        ctx.strokeStyle = grad
        ctx.lineWidth = 1.6
        ctx.beginPath()
        ctx.moveTo(s.x, s.y)
        ctx.lineTo(tailX, tailY)
        ctx.stroke()

        ctx.fillStyle = `rgba(255, 255, 255, ${fade})`
        ctx.beginPath()
        ctx.arc(s.x, s.y, 1.6, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    animationFrame = requestAnimationFrame(animate)
    window.addEventListener('resize', setSize)

    return () => {
      cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', setSize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.5, mixBlendMode: 'screen' }}
    />
  )
}
