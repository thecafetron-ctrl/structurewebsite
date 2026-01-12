'use client'

import { motion } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import MovingStars from '@/components/MovingStars'
import Link from 'next/link'
import { calculateReadingTime } from '@/lib/readingTime'
import { format } from 'date-fns'

export type BlogPost = {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  created_at: string
  updated_at: string | null
  author: string | null
  cover_image: string | null
  external_url: string | null
}

export default function BlogPostClient({ post }: { post: BlogPost }) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          url: window.location.href,
        })
      } catch (err) {
        // User cancelled
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  return (
    <>
      <MovingStars />
      <div className="relative">
        <Header />

        <article className="pt-32 pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-8">
            {/* Back Link */}
            <Link href="/blog" className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-8">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Insights
            </Link>

            {/* Header */}
            <motion.header
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-12"
            >
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className="px-3 py-1 bg-white/10 rounded-lg text-sm font-semibold text-cyan-400">
                  {post.author || 'STRUCTURE Editorial Team'}
                </span>
                <span className="text-sm text-gray-500">{format(new Date(post.created_at), 'MMMM d, yyyy')}</span>
                <span className="text-sm text-gray-500">·</span>
                <span className="text-sm text-gray-500">{calculateReadingTime(post.content)} min read</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">{post.title}</h1>

              {post.excerpt && <p className="text-xl text-gray-400 leading-relaxed">{post.excerpt}</p>}
            </motion.header>

            {/* Cover Image */}
            {post.cover_image && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="mb-12 rounded-2xl overflow-hidden"
              >
                <img src={post.cover_image} alt={post.title} className="w-full h-auto" />
              </motion.div>
            )}

            {/* External URL */}
            {post.external_url && (
              <div className="mb-8 p-6 glass rounded-xl">
                <p className="text-gray-400 text-sm mb-3">This article was originally published on another platform.</p>
                <a
                  href={post.external_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-cyan-400 hover:text-cyan-300 font-medium"
                >
                  Read Original Article
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            )}

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="prose prose-invert prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Share Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="mt-16 pt-8 border-t border-gray-800"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div>
                  <p className="text-gray-400 text-sm mb-3">Share this article</p>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        const url = window.location.href
                        const text = post.title
                        window.open(
                          `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
                          '_blank'
                        )
                      }}
                      className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
                      aria-label="Share on X"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const url = window.location.href
                        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank')
                      }}
                      className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
                      aria-label="Share on LinkedIn"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={handleShare}
                      className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
                      aria-label="Copy link"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <Link href="/blog" className="inline-flex items-center text-white font-medium hover:text-cyan-400 transition-colors">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to all articles
                </Link>
              </div>
            </motion.div>
          </div>
        </article>

        <Footer />
      </div>

      <style jsx global>{`
        .prose {
          color: #e5e7eb;
        }
        .prose h1,
        .prose h2,
        .prose h3,
        .prose h4 {
          color: #fff;
        }
        .prose a {
          color: #22d3ee;
        }
        .prose strong {
          color: #fff;
        }
        .prose blockquote {
          border-left-color: #22d3ee;
          color: #9ca3af;
        }
        .prose code {
          background: #1f2937;
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
        }
        .prose pre {
          background: #1f2937;
        }
        .prose img {
          border-radius: 1rem;
        }
      `}</style>
    </>
  )
}


