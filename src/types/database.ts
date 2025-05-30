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
      api_usage: {
        Row: {
          created_at: string | null
          date: string
          endpoint: string
          id: string
          quota_limit: number | null
          request_type: string
          updated_at: string | null
          usage_count: number | null
        }
        Insert: {
          created_at?: string | null
          date?: string
          endpoint?: string
          id?: string
          quota_limit?: number | null
          request_type: string
          updated_at?: string | null
          usage_count?: number | null
        }
        Update: {
          created_at?: string | null
          date?: string
          endpoint?: string
          id?: string
          quota_limit?: number | null
          request_type?: string
          updated_at?: string | null
          usage_count?: number | null
        }
        Relationships: []
      }
      favorites: {
        Row: {
          created_at: string
          user_id: string
          video_id: string
        }
        Insert: {
          created_at?: string
          user_id: string
          video_id: string
        }
        Update: {
          created_at?: string
          user_id?: string
          video_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "favorites_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "favorites_video_id_fkey"
            columns: ["video_id"]
            isOneToOne: false
            referencedRelation: "videos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "favorites_video_id_fkey"
            columns: ["video_id"]
            isOneToOne: false
            referencedRelation: "videos_recent_genres"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "favorites_video_id_fkey"
            columns: ["video_id"]
            isOneToOne: false
            referencedRelation: "videos_recent_keywords"
            referencedColumns: ["id"]
          },
        ]
      }
      genres: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          id: string
          name: string
          slug: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name: string
          slug: string
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      keywords: {
        Row: {
          created_at: string
          id: string
          name: string
          slug: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          slug: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      pre_calculated_rankings: {
        Row: {
          calculation_date: string
          genre_id: string | null
          id: string
          keyword_id: string | null
          metrics: Json | null
          period_type: Database["public"]["Enums"]["period_type_enum"]
          rank: number
          video_id: string | null
        }
        Insert: {
          calculation_date: string
          genre_id?: string | null
          id?: string
          keyword_id?: string | null
          metrics?: Json | null
          period_type: Database["public"]["Enums"]["period_type_enum"]
          rank: number
          video_id?: string | null
        }
        Update: {
          calculation_date?: string
          genre_id?: string | null
          id?: string
          keyword_id?: string | null
          metrics?: Json | null
          period_type?: Database["public"]["Enums"]["period_type_enum"]
          rank?: number
          video_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pre_calculated_rankings_genre_id_fkey"
            columns: ["genre_id"]
            isOneToOne: false
            referencedRelation: "genres"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pre_calculated_rankings_keyword_id_fkey"
            columns: ["keyword_id"]
            isOneToOne: false
            referencedRelation: "keywords"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pre_calculated_rankings_video_id_fkey"
            columns: ["video_id"]
            isOneToOne: false
            referencedRelation: "videos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pre_calculated_rankings_video_id_fkey"
            columns: ["video_id"]
            isOneToOne: false
            referencedRelation: "videos_recent_genres"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pre_calculated_rankings_video_id_fkey"
            columns: ["video_id"]
            isOneToOne: false
            referencedRelation: "videos_recent_keywords"
            referencedColumns: ["id"]
          },
        ]
      }
      tag_popularity: {
        Row: {
          access_count: number | null
          cache_hit_count: number | null
          cache_miss_count: number | null
          created_at: string | null
          genre_id: string | null
          id: string
          keyword_id: string | null
          last_accessed_at: string | null
          updated_at: string | null
        }
        Insert: {
          access_count?: number | null
          cache_hit_count?: number | null
          cache_miss_count?: number | null
          created_at?: string | null
          genre_id?: string | null
          id?: string
          keyword_id?: string | null
          last_accessed_at?: string | null
          updated_at?: string | null
        }
        Update: {
          access_count?: number | null
          cache_hit_count?: number | null
          cache_miss_count?: number | null
          created_at?: string | null
          genre_id?: string | null
          id?: string
          keyword_id?: string | null
          last_accessed_at?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tag_popularity_genre_id_fkey"
            columns: ["genre_id"]
            isOneToOne: true
            referencedRelation: "genres"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tag_popularity_keyword_id_fkey"
            columns: ["keyword_id"]
            isOneToOne: true
            referencedRelation: "keywords"
            referencedColumns: ["id"]
          },
        ]
      }
      trending_cache: {
        Row: {
          access_count: number | null
          created_at: string | null
          expires_at: string
          genre_id: string | null
          id: string
          keyword_id: string | null
          last_accessed_at: string | null
          period: string
          updated_at: string | null
          video_count: number | null
          video_ids: string[]
        }
        Insert: {
          access_count?: number | null
          created_at?: string | null
          expires_at: string
          genre_id?: string | null
          id?: string
          keyword_id?: string | null
          last_accessed_at?: string | null
          period: string
          updated_at?: string | null
          video_count?: number | null
          video_ids: string[]
        }
        Update: {
          access_count?: number | null
          created_at?: string | null
          expires_at?: string
          genre_id?: string | null
          id?: string
          keyword_id?: string | null
          last_accessed_at?: string | null
          period?: string
          updated_at?: string | null
          video_count?: number | null
          video_ids?: string[]
        }
        Relationships: [
          {
            foreignKeyName: "trending_cache_genre_id_fkey"
            columns: ["genre_id"]
            isOneToOne: false
            referencedRelation: "genres"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "trending_cache_keyword_id_fkey"
            columns: ["keyword_id"]
            isOneToOne: false
            referencedRelation: "keywords"
            referencedColumns: ["id"]
          },
        ]
      }
      user_genres: {
        Row: {
          created_at: string
          genre_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          genre_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          genre_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_genres_genre_id_fkey"
            columns: ["genre_id"]
            isOneToOne: false
            referencedRelation: "genres"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_genres_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_interactions: {
        Row: {
          created_at: string
          id: string
          interaction_type: Database["public"]["Enums"]["interaction_type_enum"]
          user_id: string | null
          video_id: string | null
          watch_duration: number | null
          watch_percentage: number | null
        }
        Insert: {
          created_at?: string
          id?: string
          interaction_type: Database["public"]["Enums"]["interaction_type_enum"]
          user_id?: string | null
          video_id?: string | null
          watch_duration?: number | null
          watch_percentage?: number | null
        }
        Update: {
          created_at?: string
          id?: string
          interaction_type?: Database["public"]["Enums"]["interaction_type_enum"]
          user_id?: string | null
          video_id?: string | null
          watch_duration?: number | null
          watch_percentage?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "user_interactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_interactions_video_id_fkey"
            columns: ["video_id"]
            isOneToOne: false
            referencedRelation: "videos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_interactions_video_id_fkey"
            columns: ["video_id"]
            isOneToOne: false
            referencedRelation: "videos_recent_genres"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_interactions_video_id_fkey"
            columns: ["video_id"]
            isOneToOne: false
            referencedRelation: "videos_recent_keywords"
            referencedColumns: ["id"]
          },
        ]
      }
      user_keywords: {
        Row: {
          created_at: string
          keyword_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          keyword_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          keyword_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_keywords_keyword_id_fkey"
            columns: ["keyword_id"]
            isOneToOne: false
            referencedRelation: "keywords"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_keywords_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          clerk_id: string
          created_at: string
          email: string
          external_id: string | null
          external_provider: string | null
          id: string
          subscription_end_date: string | null
          subscription_start_date: string | null
          subscription_tier: Database["public"]["Enums"]["subscription_tier_enum"]
          updated_at: string
          username: string | null
        }
        Insert: {
          clerk_id: string
          created_at?: string
          email: string
          external_id?: string | null
          external_provider?: string | null
          id?: string
          subscription_end_date?: string | null
          subscription_start_date?: string | null
          subscription_tier?: Database["public"]["Enums"]["subscription_tier_enum"]
          updated_at?: string
          username?: string | null
        }
        Update: {
          clerk_id?: string
          created_at?: string
          email?: string
          external_id?: string | null
          external_provider?: string | null
          id?: string
          subscription_end_date?: string | null
          subscription_start_date?: string | null
          subscription_tier?: Database["public"]["Enums"]["subscription_tier_enum"]
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
      v_cache_record: {
        Row: {
          access_count: number | null
          created_at: string | null
          expires_at: string | null
          genre_id: string | null
          id: string | null
          keyword_id: string | null
          last_accessed_at: string | null
          period: string | null
          updated_at: string | null
          video_count: number | null
          video_ids: string[] | null
        }
        Insert: {
          access_count?: number | null
          created_at?: string | null
          expires_at?: string | null
          genre_id?: string | null
          id?: string | null
          keyword_id?: string | null
          last_accessed_at?: string | null
          period?: string | null
          updated_at?: string | null
          video_count?: number | null
          video_ids?: string[] | null
        }
        Update: {
          access_count?: number | null
          created_at?: string | null
          expires_at?: string | null
          genre_id?: string | null
          id?: string | null
          keyword_id?: string | null
          last_accessed_at?: string | null
          period?: string | null
          updated_at?: string | null
          video_count?: number | null
          video_ids?: string[] | null
        }
        Relationships: []
      }
      video_details: {
        Row: {
          description: string | null
          updated_at: string
          video_id: string
        }
        Insert: {
          description?: string | null
          updated_at?: string
          video_id: string
        }
        Update: {
          description?: string | null
          updated_at?: string
          video_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "video_details_video_id_fkey"
            columns: ["video_id"]
            isOneToOne: true
            referencedRelation: "videos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "video_details_video_id_fkey"
            columns: ["video_id"]
            isOneToOne: true
            referencedRelation: "videos_recent_genres"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "video_details_video_id_fkey"
            columns: ["video_id"]
            isOneToOne: true
            referencedRelation: "videos_recent_keywords"
            referencedColumns: ["id"]
          },
        ]
      }
      video_genres: {
        Row: {
          genre_id: string
          video_id: string
        }
        Insert: {
          genre_id: string
          video_id: string
        }
        Update: {
          genre_id?: string
          video_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "video_genres_genre_id_fkey"
            columns: ["genre_id"]
            isOneToOne: false
            referencedRelation: "genres"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "video_genres_video_id_fkey"
            columns: ["video_id"]
            isOneToOne: false
            referencedRelation: "videos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "video_genres_video_id_fkey"
            columns: ["video_id"]
            isOneToOne: false
            referencedRelation: "videos_recent_genres"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "video_genres_video_id_fkey"
            columns: ["video_id"]
            isOneToOne: false
            referencedRelation: "videos_recent_keywords"
            referencedColumns: ["id"]
          },
        ]
      }
      video_keywords: {
        Row: {
          keyword_id: string
          video_id: string
        }
        Insert: {
          keyword_id: string
          video_id: string
        }
        Update: {
          keyword_id?: string
          video_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "video_keywords_keyword_id_fkey"
            columns: ["keyword_id"]
            isOneToOne: false
            referencedRelation: "keywords"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "video_keywords_video_id_fkey"
            columns: ["video_id"]
            isOneToOne: false
            referencedRelation: "videos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "video_keywords_video_id_fkey"
            columns: ["video_id"]
            isOneToOne: false
            referencedRelation: "videos_recent_genres"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "video_keywords_video_id_fkey"
            columns: ["video_id"]
            isOneToOne: false
            referencedRelation: "videos_recent_keywords"
            referencedColumns: ["id"]
          },
        ]
      }
      video_stats: {
        Row: {
          created_at: string
          like_count: number | null
          period_date: string
          period_type: Database["public"]["Enums"]["period_type_enum"]
          video_id: string
          view_count: number
        }
        Insert: {
          created_at?: string
          like_count?: number | null
          period_date: string
          period_type: Database["public"]["Enums"]["period_type_enum"]
          video_id: string
          view_count: number
        }
        Update: {
          created_at?: string
          like_count?: number | null
          period_date?: string
          period_type?: Database["public"]["Enums"]["period_type_enum"]
          video_id?: string
          view_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "video_stats_video_id_fkey"
            columns: ["video_id"]
            isOneToOne: false
            referencedRelation: "videos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "video_stats_video_id_fkey"
            columns: ["video_id"]
            isOneToOne: false
            referencedRelation: "videos_recent_genres"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "video_stats_video_id_fkey"
            columns: ["video_id"]
            isOneToOne: false
            referencedRelation: "videos_recent_keywords"
            referencedColumns: ["id"]
          },
        ]
      }
      videos: {
        Row: {
          channel_id: string | null
          channel_title: string | null
          created_at: string
          duration: number | null
          fetch_count: number | null
          id: string
          last_fetched_at: string | null
          like_count: number | null
          published_at: string | null
          thumbnail_url: string | null
          title: string
          total_views: number
          video_type: Database["public"]["Enums"]["video_type_enum"]
          youtube_id: string
        }
        Insert: {
          channel_id?: string | null
          channel_title?: string | null
          created_at?: string
          duration?: number | null
          fetch_count?: number | null
          id?: string
          last_fetched_at?: string | null
          like_count?: number | null
          published_at?: string | null
          thumbnail_url?: string | null
          title: string
          total_views?: number
          video_type?: Database["public"]["Enums"]["video_type_enum"]
          youtube_id: string
        }
        Update: {
          channel_id?: string | null
          channel_title?: string | null
          created_at?: string
          duration?: number | null
          fetch_count?: number | null
          id?: string
          last_fetched_at?: string | null
          like_count?: number | null
          published_at?: string | null
          thumbnail_url?: string | null
          title?: string
          total_views?: number
          video_type?: Database["public"]["Enums"]["video_type_enum"]
          youtube_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      api_usage_summary: {
        Row: {
          daily_limit: number | null
          date: string | null
          on_demand_calls: number | null
          scheduled_calls: number | null
          total_calls: number | null
          usage_percentage: number | null
        }
        Relationships: []
      }
      cache_status_view: {
        Row: {
          access_count: number | null
          created_at: string | null
          expires_at: string | null
          hours_until_expiry: number | null
          is_valid: boolean | null
          period: string | null
          tag_name: string | null
          tag_slug: string | null
          tag_type: string | null
          updated_at: string | null
          video_count: number | null
        }
        Relationships: []
      }
      popular_tags_view: {
        Row: {
          access_count: number | null
          cache_hit_count: number | null
          cache_hit_rate: number | null
          cache_miss_count: number | null
          last_accessed_at: string | null
          tag_name: string | null
          tag_slug: string | null
          tag_type: string | null
        }
        Relationships: []
      }
      trending_videos_view: {
        Row: {
          cache_id: string | null
          channel_title: string | null
          expires_at: string | null
          period: string | null
          published_at: string | null
          tag_name: string | null
          tag_slug: string | null
          tag_type: string | null
          thumbnail_url: string | null
          title: string | null
          total_views: number | null
          video_id: string | null
          youtube_id: string | null
        }
        Relationships: []
      }
      user_tags_detail_view: {
        Row: {
          clerk_id: string | null
          label: string | null
          tag_id: string | null
          tag_type: string | null
        }
        Relationships: []
      }
      user_tags_view: {
        Row: {
          user_id: string | null
        }
        Relationships: []
      }
      videos_recent_genres: {
        Row: {
          channel_id: string | null
          channel_title: string | null
          created_at: string | null
          duration: number | null
          genre_id: string | null
          id: string | null
          published_at: string | null
          thumbnail_url: string | null
          title: string | null
          total_views: number | null
          video_type: Database["public"]["Enums"]["video_type_enum"] | null
          youtube_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "video_genres_genre_id_fkey"
            columns: ["genre_id"]
            isOneToOne: false
            referencedRelation: "genres"
            referencedColumns: ["id"]
          },
        ]
      }
      videos_recent_keywords: {
        Row: {
          channel_id: string | null
          channel_title: string | null
          created_at: string | null
          duration: number | null
          id: string | null
          keyword_id: string | null
          published_at: string | null
          thumbnail_url: string | null
          title: string | null
          total_views: number | null
          video_type: Database["public"]["Enums"]["video_type_enum"] | null
          youtube_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "video_keywords_keyword_id_fkey"
            columns: ["keyword_id"]
            isOneToOne: false
            referencedRelation: "keywords"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      advanced_cache_cleanup: {
        Args: Record<PropertyKey, never>
        Returns: {
          expired_deleted: number
          old_unused_deleted: number
          total_remaining: number
        }[]
      }
      calculate_daily_trends: {
        Args: { as_of: string }
        Returns: undefined
      }
      check_api_quota: {
        Args: { p_request_type?: string }
        Returns: boolean
      }
      cleanup_expired_cache: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      cleanup_old_videos: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      cleanup_tag_links: {
        Args: { tbl_name: string; keep_rows: number }
        Returns: undefined
      }
      debug_trending_videos: {
        Args: {
          p_tag_slug: string
          p_tag_type: string
          p_period: string
          p_job_type: string
        }
        Returns: Json
      }
      get_trending_videos: {
        Args: {
          p_tag_slug: string
          p_tag_type: string
          p_period: string
          p_job_type: string
        }
        Returns: {
          video_id: string
          youtube_id: string
          title: string
          thumbnail_url: string
          channel_title: string
          published_at: string
          total_views: number
          cache_updated_at: string
          cache_expires_at: string
        }[]
      }
      get_trending_videos_fixed: {
        Args: {
          p_tag_slug: string
          p_tag_type: string
          p_period: string
          p_job_type: string
        }
        Returns: {
          video_id: string
          youtube_id: string
          title: string
          thumbnail_url: string
          channel_title: string
          published_at: string
          total_views: number
          cache_updated_at: string
          cache_expires_at: string
        }[]
      }
      get_trending_videos_simple: {
        Args: {
          p_tag_slug: string
          p_tag_type: string
          p_period: string
          p_job_type: string
        }
        Returns: {
          video_id: string
          youtube_id: string
          title: string
          thumbnail_url: string
          channel_title: string
          published_at: string
          total_views: number
          cache_updated_at: string
          cache_expires_at: string
        }[]
      }
      get_trending_videos_with_debug: {
        Args: {
          p_tag_slug: string
          p_tag_type: string
          p_period: string
          p_job_type: string
        }
        Returns: Json
      }
      increment_api_usage: {
        Args: { p_count?: number; p_request_type?: string }
        Returns: undefined
      }
      sync_cache_to_rankings: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      test_debug: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      upsert_video_genres: {
        Args: { rows: Json }
        Returns: undefined
      }
      upsert_video_keywords: {
        Args: { rows: Json }
        Returns: undefined
      }
      upsert_video_stats: {
        Args: { rows: Json }
        Returns: undefined
      }
    }
    Enums: {
      interaction_type_enum:
        | "like"
        | "dislike"
        | "watch_start"
        | "watch_complete"
      period_type_enum: "daily" | "weekly" | "monthly" | "all_time"
      subscription_tier_enum: "free" | "pro"
      video_type_enum: "standard" | "short" | "live"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      interaction_type_enum: [
        "like",
        "dislike",
        "watch_start",
        "watch_complete",
      ],
      period_type_enum: ["daily", "weekly", "monthly", "all_time"],
      subscription_tier_enum: ["free", "pro"],
      video_type_enum: ["standard", "short", "live"],
    },
  },
} as const

// 便利な型エイリアス
export type User = Tables<'users'>
export type Video = Tables<'videos'>
export type Genre = Tables<'genres'>
export type Keyword = Tables<'keywords'>
export type TrendingCache = Tables<'trending_cache'>
export type ApiUsage = Tables<'api_usage'>
export type TagPopularity = Tables<'tag_popularity'>
export type PreCalculatedRanking = Tables<'pre_calculated_rankings'>
export type Favorite = Tables<'favorites'>
export type UserInteraction = Tables<'user_interactions'>
export type VideoStats = Tables<'video_stats'>

// Enum型のエクスポート
export type InteractionType = Database['public']['Enums']['interaction_type_enum']
export type PeriodType = Database['public']['Enums']['period_type_enum']
export type SubscriptionTier = Database['public']['Enums']['subscription_tier_enum']
export type VideoType = Database['public']['Enums']['video_type_enum']

// Insert/Update 型のエクスポート
export type UserInsert = TablesInsert<'users'>
export type VideoInsert = TablesInsert<'videos'>
export type GenreInsert = TablesInsert<'genres'>
export type KeywordInsert = TablesInsert<'keywords'>
export type TrendingCacheInsert = TablesInsert<'trending_cache'>

export type UserUpdate = TablesUpdate<'users'>
export type VideoUpdate = TablesUpdate<'videos'>
export type GenreUpdate = TablesUpdate<'genres'>
export type KeywordUpdate = TablesUpdate<'keywords'>
export type TrendingCacheUpdate = TablesUpdate<'trending_cache'>
