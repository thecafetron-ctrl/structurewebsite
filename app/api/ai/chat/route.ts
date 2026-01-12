import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const OPENAI_API_KEY = process.env.OPENAI_API_KEY
const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 60)
}

async function searchPixabayImage(query: string): Promise<string | null> {
  if (!PIXABAY_API_KEY) return null

  try {
    const searchTerms = query
      .replace(/[^a-zA-Z\s]/g, '')
      .split(' ')
      .slice(0, 3)
      .join('+')

    const response = await fetch(
      `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(searchTerms)}&image_type=photo&orientation=horizontal&min_width=1200&per_page=10&safesearch=true`
    )

    if (!response.ok) return null

    const data = await response.json()
    
    if (data.hits && data.hits.length > 0) {
      const randomIndex = Math.floor(Math.random() * Math.min(5, data.hits.length))
      return data.hits[randomIndex].largeImageURL
    }

    return null
  } catch {
    return null
  }
}

async function generateArticle(topic: string): Promise<{
  title: string
  slug: string
  excerpt: string
  content: string
  cover_image: string
}> {
  if (!OPENAI_API_KEY) {
    throw new Error('OpenAI API key not configured')
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are an expert content writer specializing in logistics, supply chain, and AI technology. Write engaging, informative articles. Always respond with valid JSON.'
        },
        {
          role: 'user',
          content: `Write a comprehensive 1200+ word blog article about: "${topic}"

Format as JSON:
{
  "title": "SEO-friendly title (max 70 chars)",
  "excerpt": "Compelling 2-3 sentence preview (max 200 chars)",
  "content": "Full article in markdown with H2/H3 headings"
}`
        }
      ],
      temperature: 0.7,
      max_tokens: 4000,
    }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error?.message || 'OpenAI API error')
  }

  const data = await response.json()
  const responseContent = data.choices[0].message.content

  let article
  try {
    const jsonMatch = responseContent.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      article = JSON.parse(jsonMatch[0])
    } else {
      throw new Error('No JSON found')
    }
  } catch {
    article = {
      title: topic,
      excerpt: topic.substring(0, 200),
      content: responseContent,
    }
  }

  const slug = generateSlug(article.title)
  const coverImage = await searchPixabayImage(article.title) || ''

  return {
    title: article.title,
    slug,
    excerpt: article.excerpt,
    content: article.content,
    cover_image: coverImage,
  }
}

async function publishArticle(article: {
  title: string
  slug: string
  excerpt: string
  content: string
  cover_image: string
}): Promise<string> {
  const supabase = createClient(supabaseUrl, supabaseServiceKey)

  const { data, error } = await supabase
    .from('posts')
    .insert({
      title: article.title,
      slug: article.slug,
      excerpt: article.excerpt,
      content: article.content,
      cover_image: article.cover_image,
      author: 'Structure AI',
      published: true,
    })
    .select('id')
    .single()

  if (error) throw error
  return data.id
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { messages } = body

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages array required' },
        { status: 400 }
      )
    }

    if (!OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      )
    }

    const lastMessage = messages[messages.length - 1]?.content?.toLowerCase() || ''

    // Check for publish intent
    const publishMatch = lastMessage.match(/publish.*(?:article|post|blog).*(?:about|on|regarding)\s+(.+)/i) ||
                         lastMessage.match(/write.*(?:article|post|blog).*(?:about|on|regarding)\s+(.+)/i) ||
                         lastMessage.match(/create.*(?:article|post|blog).*(?:about|on|regarding)\s+(.+)/i)

    if (publishMatch || lastMessage.includes('publish') || lastMessage.includes('create article')) {
      let topic = publishMatch?.[1] || lastMessage.replace(/publish|create|write|article|post|blog|about|an|a/gi, '').trim()
      
      if (!topic || topic.length < 5) {
        topic = 'AI-powered logistics optimization and supply chain automation'
      }

      try {
        const article = await generateArticle(topic)
        const postId = await publishArticle(article)

        return NextResponse.json({
          message: `✅ **Article Published Successfully!**

**Title:** ${article.title}

**Excerpt:** ${article.excerpt}

The article has been published to your blog and is now live.`,
          actionResult: {
            type: 'article_published',
            title: article.title,
            slug: article.slug,
            postId,
          }
        })
      } catch (error: any) {
        return NextResponse.json({
          message: `❌ **Failed to publish article**

Error: ${error.message}

Please try again or check your configuration.`,
        })
      }
    }

    // Check for search/topic recommendations
    if (lastMessage.includes('search') || lastMessage.includes('topic') || lastMessage.includes('recommend') || lastMessage.includes('trending')) {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: 'Generate 5 trending blog topic ideas for logistics and AI. Return as JSON array with: title, snippet, source ("AI Recommended").'
            },
            { role: 'user', content: lastMessage }
          ],
          temperature: 0.8,
          max_tokens: 1000,
        }),
      })

      const data = await response.json()
      const content = data.choices[0].message.content

      let topics: any[] = []
      try {
        const jsonMatch = content.match(/\[[\s\S]*\]/)
        if (jsonMatch) {
          topics = JSON.parse(jsonMatch[0])
        }
      } catch {
        topics = []
      }

      return NextResponse.json({
        message: `🔍 **Found ${topics.length} trending topics:**

${topics.map((t, i) => `${i + 1}. **${t.title}**\n   ${t.snippet || ''}`).join('\n\n')}

Say "publish article about [topic]" to create and publish.`,
        actionResult: {
          type: 'search_results',
          results: topics.map((t: any) => ({
            title: t.title,
            link: '#',
            snippet: t.snippet || '',
            source: 'AI Recommended',
          }))
        }
      })
    }

    // General chat response
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are an AI content assistant for Structure AI, a logistics technology company. Help users:
- Generate and publish blog articles (say "publish article about [topic]")
- Find trending topics (say "search" or "recommend topics")
- Answer questions about content strategy

Be concise and helpful. Use markdown formatting.`
          },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    })

    const data = await response.json()

    return NextResponse.json({
      message: data.choices[0].message.content,
    })
  } catch (error: any) {
    console.error('AI chat error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to process request' },
      { status: 500 }
    )
  }
}

