import { useState, useEffect } from 'react'

export function usePerformance() {
  const [isMobile, setIsMobile] = useState(false)
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false)

  useEffect(() => {
    // Detect mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Detect user preference for reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setShouldReduceMotion(mediaQuery.matches)

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return {
    isMobile,
    shouldReduceMotion,
    // Performance settings
    particleCount: isMobile ? 0.3 : 1, // 30% particles on mobile
    canvasScale: isMobile ? 0.5 : 0.75, // Lower resolution on mobile
    targetFPS: isMobile ? 24 : 30, // Lower FPS on mobile
    enableComplexEffects: !isMobile && !shouldReduceMotion,
  }
}

