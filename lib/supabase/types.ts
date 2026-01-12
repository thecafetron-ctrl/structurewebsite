export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      ai_article_schedules: {
        Row: {
          created_at: string | null
          id: string
          post_id: string | null
          scheduled_time: string
          status: string
          topic_category: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          post_id?: string | null
          scheduled_time: string
          status?: string
          topic_category?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          post_id?: string | null
          scheduled_time?: string
          status?: string
          topic_category?: string
          updated_at?: string | null
        }
      }
      posts: {
        Row: {
          author: string
          content: string
          cover_image: string | null
          created_at: string
          excerpt: string
          external_url: string | null
          id: string
          published: boolean
          slug: string
          title: string
          updated_at: string | null
        }
        Insert: {
          author?: string
          content: string
          cover_image?: string | null
          created_at?: string
          excerpt: string
          external_url?: string | null
          id?: string
          published?: boolean
          slug: string
          title: string
          updated_at?: string | null
        }
        Update: {
          author?: string
          content?: string
          cover_image?: string | null
          created_at?: string
          excerpt?: string
          external_url?: string | null
          id?: string
          published?: boolean
          slug?: string
          title?: string
          updated_at?: string | null
        }
      }
      lead_forms: {
        Row: {
          ai_area: string
          company: string
          created_at: string
          email: string
          full_name: string
          id: string
          phone: string
          role: string
          scale: string
          source_url: string | null
          timeline: string
          utm_campaign: string | null
          utm_content: string | null
          utm_medium: string | null
          utm_source: string | null
          utm_term: string | null
        }
        Insert: {
          ai_area: string
          company: string
          created_at?: string
          email: string
          full_name: string
          id?: string
          phone: string
          role: string
          scale: string
          source_url?: string | null
          timeline: string
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Update: {
          ai_area?: string
          company?: string
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          phone?: string
          role?: string
          scale?: string
          source_url?: string | null
          timeline?: string
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

