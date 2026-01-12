import { NextRequest, NextResponse } from 'next/server'

const OPENAI_API_KEY = process.env.OPENAI_API_KEY
const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY

interface GenerateArticleRequest {
  topic?: string
  category?: 'logistics' | 'ai' | 'both'
}

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

    if (!response.ok) throw new Error('Pixabay API error')

    const data = await response.json()
    
    if (data.hits && data.hits.length > 0) {
      // Pick a random image from top results for variety
      const randomIndex = Math.floor(Math.random() * Math.min(5, data.hits.length))
      return data.hits[randomIndex].largeImageURL
    }

    // Fallback search with simpler terms
    const fallbackResponse = await fetch(
      `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=logistics+technology&image_type=photo&orientation=horizontal&min_width=1200&per_page=10&safesearch=true`
    )
    const fallbackData = await fallbackResponse.json()
    
    if (fallbackData.hits && fallbackData.hits.length > 0) {
      const randomIndex = Math.floor(Math.random() * Math.min(5, fallbackData.hits.length))
      return fallbackData.hits[randomIndex].largeImageURL
    }

    return null
  } catch (error) {
    console.error('Pixabay error:', error)
    return null
  }
}

async function generateWithOpenAI(prompt: string, systemPrompt: string): Promise<string> {
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
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt }
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
  return data.choices[0].message.content
}

export async function POST(request: NextRequest) {
  try {
    const body: GenerateArticleRequest = await request.json()
    const { topic, category = 'both' } = body

    // Generate topic if not provided
    let articleTopic = topic
    if (!articleTopic) {
      const topicCategories = {
        logistics: 'freight forwarding, supply chain management, 3PL operations, customs documentation, or warehouse management',
        ai: 'artificial intelligence, machine learning, automation, or digital transformation',
        both: 'AI-powered logistics, intelligent supply chain, automated freight operations, or AI in warehousing',
      }

      const topicPrompt = `Generate a single unique, trending blog topic about ${topicCategories[category]} that would interest logistics professionals and freight forwarders. The topic should be specific and SEO-friendly. Return ONLY the topic title, nothing else.`

      articleTopic = await generateWithOpenAI(
        topicPrompt,
        'You are an SEO content strategist specializing in logistics and AI. Generate engaging, search-optimized blog topics.'
      )
    }

    // Generate the full article
    const articlePrompt = `Write a comprehensive, SEO-optimized blog article about: "${articleTopic}"

Requirements:
- Title: Create an engaging, SEO-friendly title (max 70 characters)
- Length: 1200-1500 words
- Structure: Use clear headings (H2, H3) for sections
- Include: Introduction, main body with 3-5 sections, practical tips, conclusion
- Tone: Professional but approachable, suitable for logistics professionals
- Focus: Practical insights and actionable advice
- SEO: Naturally incorporate relevant keywords

Format your response as JSON with this exact structure:
{
  "title": "The article title",
  "excerpt": "A compelling 2-3 sentence excerpt/summary for preview (max 200 characters)",
  "content": "The full article content in markdown format with proper headings"
}`

    const articleResponse = await generateWithOpenAI(
      articlePrompt,
      'You are an expert content writer specializing in logistics, supply chain, and AI technology. Write engaging, informative articles that provide real value to logistics professionals. Always respond with valid JSON.'
    )

    // Parse the JSON response
    let article
    try {
      // Try to extract JSON from the response
      const jsonMatch = articleResponse.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        article = JSON.parse(jsonMatch[0])
      } else {
        throw new Error('No JSON found in response')
      }
    } catch (parseError) {
      // If JSON parsing fails, create a structured response
      article = {
        title: articleTopic,
        excerpt: articleTopic.substring(0, 200),
        content: articleResponse,
      }
    }

    // Generate slug
    const slug = generateSlug(article.title)

    // Get cover image from Pixabay
    const coverImage = await searchPixabayImage(article.title)

    return NextResponse.json({
      success: true,
      article: {
        title: article.title,
        slug,
        excerpt: article.excerpt,
        content: article.content,
        cover_image: coverImage || '',
      }
    })
  } catch (error: any) {
    console.error('Article generation error:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to generate article' },
      { status: 500 }
    )
  }
}

