import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import MovingStars from '@/components/MovingStars'

export default function NotFound() {
  return (
    <>
      <MovingStars />
      <div className="relative min-h-screen">
        <Header />
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 pt-32">
          <h1 className="text-2xl font-bold text-white mb-4">Page not found</h1>
          <p className="text-gray-400 mb-8">The page you’re looking for doesn’t exist.</p>
          <Link
            href="/"
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-white font-medium"
          >
            Back to home
          </Link>
        </div>
        <Footer />
      </div>
    </>
  )
}


