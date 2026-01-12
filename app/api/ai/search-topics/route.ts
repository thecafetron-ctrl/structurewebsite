import { NextRequest, NextResponse } from 'next/server'

const OPENAI_API_KEY = process.env.OPENAI_API_KEY

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { query, category = 'both' } = body

    if (!OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      )
    }

    const categoryContext = {
      logistics: 'logistics, freight forwarding, supply chain, and shipping',
      ai: 'artificial intelligence, machine learning, and automation',
      both: 'AI in logistics, intelligent supply chain, and automated freight operations',
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
            content: `You are an SEO content strategist. Generate trending blog topic ideas related to ${categoryContext[category as keyof typeof categoryContext]}. Each topic should be specific, timely, and interesting to logistics professionals.`
          },
          {
            role: 'user',
            content: `Search query: "${query || 'trending topics'}". Generate 5 unique blog topic ideas. Return as JSON array with objects containing: title, snippet (brief description), source (always "AI Generated"), and relevance (1-10 score).`
          }
        ],
        temperature: 0.8,
        max_tokens: 1000,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error?.message || 'OpenAI API error')
    }

    const data = await response.json()
    const content = data.choices[0].message.content

    // Parse the response
    let topics = []
    try {
      const jsonMatch = content.match(/\[[\s\S]*\]/)
      if (jsonMatch) {
        topics = JSON.parse(jsonMatch[0])
      }
    } catch {
      // If parsing fails, create simple topics from the response
      topics = [
        {
          title: content.substring(0, 100),
          snippet: 'Generated topic suggestion',
          source: 'AI Generated',
          relevance: 8
        }
      ]
    }

    return NextResponse.json({
      success: true,
      results: topics.map((t: any) => ({
        title: t.title || 'Untitled Topic',
        link: '#',
        snippet: t.snippet || t.description || '',
        source: 'AI Recommended',
        date: new Date().toISOString(),
      }))
    })
  } catch (error: any) {
    console.error('Search topics error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to search topics' },
      { status: 500 }
    )
  }
}

