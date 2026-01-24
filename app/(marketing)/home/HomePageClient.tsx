'use client'

import { useEffect } from 'react'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import CostSection from '@/components/CostSection'
import AICoreSection from '@/components/AICoreSection'
import NewGlobeCarousel from '@/components/NewGlobeCarousel'
import AILeadGenSection from '@/components/AILeadGenSection'
import AIQuotationsSection from '@/components/AIQuotationsSection'
import RouteSection from '@/components/RouteSection'
import LoadSection from '@/components/LoadSection'
import ForecastSection from '@/components/ForecastSection'
import DocumentSection from '@/components/DocumentSection'
import ScaleSection from '@/components/ScaleSection'
import MetricsSection from '@/components/MetricsSection'
import FinalCTA from '@/components/FinalCTA'
import Footer from '@/components/Footer'
import MovingStars from '@/components/MovingStars'
import ContactForm from '@/components/ContactForm'

export default function HomePageClient() {
  useEffect(() => {
    // Native smooth scroll - FAST
    document.documentElement.style.scrollBehavior = 'smooth'
  }, [])

  return (
    <>
      <MovingStars />
      <main className="relative">
        <Header />
        <section id="section-0"><Hero /></section>
        <section id="section-1"><CostSection /></section>
        <section id="section-2"><AICoreSection /></section>
        <section id="section-3"><NewGlobeCarousel /></section>
        <section id="section-4"><AILeadGenSection /></section>
        <section id="section-5"><AIQuotationsSection /></section>
        <section id="section-6"><RouteSection /></section>
        <section id="section-7"><LoadSection /></section>
        <section id="section-8"><ForecastSection /></section>
        <section id="section-9"><DocumentSection /></section>
        <section id="section-10"><ScaleSection /></section>
        <section id="section-11"><MetricsSection /></section>
        <section id="section-12"><ContactForm /></section>
        <section id="section-13"><FinalCTA /></section>
        <Footer />
      </main>
    </>
  )
}


