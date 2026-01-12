import { NextRequest, NextResponse } from 'next/server'

const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, excerpt } = body

    if (!PIXABAY_API_KEY) {
      return NextResponse.json(
        { error: 'Pixabay API key not configured' },
        { status: 500 }
      )
    }

    // Extract keywords from title and excerpt
    const text = `${title} ${excerpt || ''}`
    const keywords = text
      .replace(/[^a-zA-Z\s]/g, '')
      .toLowerCase()
      .split(' ')
      .filter((word: string) => word.length > 3)
      .slice(0, 3)
      .join('+')

    // Search Pixabay
    const searchUrl = `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(keywords)}&image_type=photo&orientation=horizontal&min_width=1200&per_page=20&safesearch=true`

    const response = await fetch(searchUrl)

    if (!response.ok) {
      throw new Error('Pixabay API error')
    }

    const data = await response.json()

    if (data.hits && data.hits.length > 0) {
      // Pick a random high-quality image
      const randomIndex = Math.floor(Math.random() * Math.min(10, data.hits.length))
      const image = data.hits[randomIndex]

      return NextResponse.json({
        success: true,
        imageUrl: image.largeImageURL,
        previewUrl: image.webformatURL,
        photographer: image.user,
        pixabayUrl: image.pageURL,
      })
    }

    // Fallback search with generic logistics keywords
    const fallbackUrl = `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=logistics+technology+business&image_type=photo&orientation=horizontal&min_width=1200&per_page=20&safesearch=true`
    
    const fallbackResponse = await fetch(fallbackUrl)
    const fallbackData = await fallbackResponse.json()

    if (fallbackData.hits && fallbackData.hits.length > 0) {
      const randomIndex = Math.floor(Math.random() * Math.min(10, fallbackData.hits.length))
      const image = fallbackData.hits[randomIndex]

      return NextResponse.json({
        success: true,
        imageUrl: image.largeImageURL,
        previewUrl: image.webformatURL,
        photographer: image.user,
        pixabayUrl: image.pageURL,
      })
    }

    return NextResponse.json({
      success: false,
      error: 'No suitable images found',
    })
  } catch (error: any) {
    console.error('Cover image error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch image' },
      { status: 500 }
    )
  }
}

