// API client for AI features
// Uses Next.js API routes instead of local server

const API_BASE = '/api/ai';

export const localApi = {
  async searchTopics(query: string, category: string) {
    const response = await fetch(`${API_BASE}/search-topics`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, category }),
    });
    return response.json();
  },

  async generateArticle(sources: any[], customPrompt: string, category: string) {
    const response = await fetch(`${API_BASE}/generate-article`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sources, customPrompt, category }),
    });
    return response.json();
  },

  async generateCoverImage(title: string, excerpt: string) {
    const response = await fetch(`${API_BASE}/cover-image`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, excerpt }),
    });
    return response.json();
  },

  async chat(messages: { role: string; content: string }[]) {
    const response = await fetch(`${API_BASE}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages }),
    });
    return response.json();
  },

  async fetchArticleMeta(url: string) {
    // This can be implemented if needed for URL embedding
    return { title: '', excerpt: '', content: '' };
  },

  async getProgress() {
    // Progress tracking - can be implemented with server state if needed
    return { log: [] };
  },

  async getAutoPostStatus() {
    // Auto-post status - stored in localStorage for now
    if (typeof window !== 'undefined') {
      const status = localStorage.getItem('autoPostStatus');
      return status ? JSON.parse(status) : { enabled: false, articlesPerDay: 1, intervalHours: 24, category: 'both' };
    }
    return { enabled: false, articlesPerDay: 1, intervalHours: 24, category: 'both' };
  },

  async configureAutoPost(config: {
    enabled: boolean;
    articlesPerDay: number;
    intervalHours: number;
    category: string;
    postImmediately?: boolean;
    mode?: 'generate' | 'embed';
    embedUrl?: string;
  }) {
    // Store config in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('autoPostStatus', JSON.stringify(config));
    }
    return config;
  },

  async triggerAutoPost(category: string, count: number, customTopic?: string) {
    const response = await fetch(`${API_BASE}/generate-article`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic: customTopic, category }),
    });
    return response.json();
  },

  async quickEmbed(url: string) {
    // URL embedding functionality
    return { success: false, error: 'URL embedding not implemented' };
  },

  async findAndEmbed(category: string) {
    // Find and embed functionality
    return { success: false, error: 'Find and embed not implemented' };
  },

  async publishArticle(article: {
    title: string;
    excerpt: string;
    content: string;
    coverImageUrl?: string;
    sources?: any[];
  }) {
    // Publishing is handled through the chat API
    const response = await fetch(`${API_BASE}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [
          { role: 'user', content: `Publish article about: ${article.title}` }
        ]
      }),
    });
    return response.json();
  },

  async generateCompleteArticle(topic?: string, category?: string) {
    const response = await fetch(`${API_BASE}/generate-article`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic, category }),
    });
    return response.json();
  },
};
