import { Database } from "../database.types";

// Supabaseのテーブルの型を取得
export type GenreRow   = Database['public']['Views']['videos_recent_genres']['Row'];
export type KeywordRow = Database['public']['Views']['videos_recent_keywords']['Row'];
export type PrefDetailRow = Database['public']['Views']['user_preferences_detail_view']['Row'];
export type RankRow = Database['public']['Tables']['pre_calculated_rankings']['Row'];

// CONST値の型定義
export type PerfType = "genre" | "keyword";
export type PeriodType = 'daily' | 'weekly';

export type SelectedItem = SelectedGenre | SelectedKeyword;
export type UnifiedRow = (GenreRow | KeywordRow) & {
    published_at: string;
    id: string
}

export interface Genre {
  id: string;
  name: string;
  description: string;
  category: string;
}

export interface Keyword {
  id: string;
  name: string;
  description: string;
}

export interface SelectedGenre extends Genre {
  type: 'genre';
}

export interface SelectedKeyword {
  type: 'keyword';
  value: string;
}

export interface GenreSelectorProps {
  userId: string;
  genres: Genre[];
}

// 新着動画取得時のパラメータ
export interface GetNewVideosParams {
  prefType: PerfType;
  prefId: number|string;
  limit?: number;
  cursor?: string|null;
}

// トレンド動画取得時のパラメータ
export interface GetTrendVideosParams {
  periodType: PeriodType;
  calcDate?: string;              
  limit?: number;
  prefType: PerfType;
  prefId: number|string;
}

export interface UserSyncPayload {
  clerkId: string;
  email: string;
  externalProvider?: string | null;
  externalId?: string | null;
}

export type Pref = {
  type: 'genre' | 'keyword';
  id: string;
  label: string;
};