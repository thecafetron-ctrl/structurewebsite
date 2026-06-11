'use client'

import Header from '@/components/Header'
import Hero from '@/components/Hero'
import StatMarquee from '@/components/v2/StatMarquee'
import ProblemSection from '@/components/v2/ProblemSection'
import PlatformBento from '@/components/v2/PlatformBento'
import LoadHawkShowcase from '@/components/v2/LoadHawkShowcase'
import HowItWorks from '@/components/v2/HowItWorks'
import MetricsSection from '@/components/MetricsSection'
import FinalCTA from '@/components/FinalCTA'
import Footer from '@/components/Footer'
import MovingStars from '@/components/MovingStars'
import ContactForm from '@/components/ContactForm'

export default function HomePageClient() {
  return (
    <>
      <MovingStars />
      <main className="relative">
        <Header />
        <section id="section-0"><Hero /></section>
        <StatMarquee />
        <section id="section-1"><ProblemSection /></section>
        <section id="section-2"><PlatformBento /></section>
        <section id="section-3"><LoadHawkShowcase /></section>
        <section id="section-4"><HowItWorks /></section>
        <section id="section-5"><MetricsSection /></section>
        <section id="section-6"><ContactForm /></section>
        <section id="section-7"><FinalCTA /></section>
        <Footer />
      </main>
    </>
  )
}
