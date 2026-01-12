'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import MovingStars from '@/components/MovingStars'
import ContactForm from '@/components/ContactForm'

export default function ContactPageClient() {
  return (
    <>
      <MovingStars />
      <div className="relative">
        <Header />

        <div className="pt-32">
          <ContactForm headingAs="h1" title="Contact Us" />
        </div>

        <Footer />
      </div>
    </>
  )
}


