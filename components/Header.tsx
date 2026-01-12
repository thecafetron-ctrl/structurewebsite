'use client'

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 100], [0.6, 0.95])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const navItems = [
    { name: 'Platform', href: '/platform' },
    { name: 'Use Cases', href: '/use-cases' },
    { name: 'Contact', href: '/contact' },
    { name: 'Insights', href: '/blog' },
  ]

  return (
    <>
      <motion.header
        style={{ opacity }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          isScrolled ? 'py-2 sm:py-4' : 'py-3 sm:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="glass rounded-xl sm:rounded-2xl px-4 sm:px-8 py-3 sm:py-4 flex items-center justify-between">
            {/* Logo - Clickable to home */}
            <Link href="/">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                className="flex items-center space-x-2 sm:space-x-3 cursor-pointer"
              >
                <div className="w-8 h-8 sm:w-12 sm:h-12 relative flex items-center justify-center">
                  <img 
                    src="/logo-white.svg" 
                    alt="STRUCTURE" 
                    className="w-full h-full object-contain"
                    style={{ filter: 'drop-shadow(0 0 15px rgba(255, 255, 255, 0.4))' }}
                  />
                </div>
                <span className="text-base sm:text-xl font-bold tracking-tight">STRUCTURE</span>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              className="hidden lg:flex items-center space-x-6"
            >
              {navItems.map((item, i) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-gray-300 hover:text-white transition-colors relative group"
                  whileHover={{ scale: 1.05 }}
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-white to-gray-400 group-hover:w-full transition-all duration-300" />
                </motion.a>
              ))}
            </motion.nav>

            {/* Right side: CTA Button + Hamburger */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* CTA Button - Adjusted for mobile */}
              <motion.a
                href="/#contact"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="relative px-3 py-2 sm:px-6 sm:py-2.5 rounded-lg sm:rounded-xl overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 group-hover:from-white/20 group-hover:to-white/10 transition-all duration-500" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-white/5 blur-xl" />
                </div>
                <span className="relative text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap">Get a Quote</span>
              </motion.a>

              {/* Hamburger Menu Button - Mobile only */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                aria-label="Toggle menu"
              >
                <div className="w-5 h-4 relative flex flex-col justify-between">
                  <motion.span
                    animate={isMobileMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-0.5 bg-white rounded-full origin-center"
                  />
                  <motion.span
                    animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="w-full h-0.5 bg-white rounded-full"
                  />
                  <motion.span
                    animate={isMobileMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-0.5 bg-white rounded-full origin-center"
                  />
                </div>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Menu Panel */}
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-72 bg-charcoal-900/95 backdrop-blur-xl border-l border-white/10 pt-24 px-6"
            >
              <div className="flex flex-col space-y-2">
                {navItems.map((item, i) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="py-4 px-4 text-lg font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                  >
                    {item.name}
                  </motion.a>
                ))}
                
                {/* Mobile CTA in menu */}
                <motion.a
                  href="/#contact"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navItems.length * 0.1 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mt-4 py-4 px-4 text-lg font-semibold text-center bg-white text-black rounded-xl hover:bg-gray-100 transition-colors"
                >
                  Get a Quote
                </motion.a>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
