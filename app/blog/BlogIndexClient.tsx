'use client'

import { motion } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import MovingStars from '@/components/MovingStars'
import Link from 'next/link'

export type BlogIndexPost = {
  slug: string
  title: string
  excerpt: string
  dateLabel: string
  categoryLabel: string
  readTimeLabel: string
}

export default function BlogIndexClient({ posts }: { posts: BlogIndexPost[] }) {
  return (
    <>
      <MovingStars />
      <div className="relative">
        <Header />

        {/* Hero */}
        <section className="relative min-h-[50vh] flex items-center pt-32 pb-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-8 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6"
            >
              <span className="text-gradient">Insights</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              className="text-xl md:text-2xl text-gray-400"
            >
              The latest on AI logistics automation
            </motion.p>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="relative py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-8">
            <div className="space-y-8">
              {posts.map((post, i) => (
                <Link key={post.slug} href={`/blog/${post.slug}`}>
                  <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.2, delay: i * 0.05 }}
                    className="glass rounded-2xl p-8 hover:bg-white/10 transition-all cursor-pointer group"
                  >
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <span className="px-3 py-1 bg-white/10 rounded-lg text-sm font-semibold text-cyan-400">
                        {post.categoryLabel}
                      </span>
                      <span className="text-sm text-gray-500">{post.dateLabel}</span>
                      <span className="text-sm text-gray-500">·</span>
                      <span className="text-sm text-gray-500">{post.readTimeLabel}</span>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-gradient transition-all">
                      {post.title}
                    </h2>

                    <p className="text-lg text-gray-400 leading-relaxed mb-4">{post.excerpt}</p>

                    <div className="text-white font-semibold flex items-center gap-2">
                      Read More
                      <svg
                        className="w-5 h-5 group-hover:translate-x-2 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </motion.article>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}


