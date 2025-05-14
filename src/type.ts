import { Database } from "../database.types";

export type GenreRow   = Database['public']['Views']['videos_recent_genres']['Row'];
export type KeywordRow = Database['public']['Views']['videos_recent_keywords']['Row'];
export type PrefDetailRow = Database['public']['Views']['user_preferences_detail_view']['Row'];

export type PerfType = "genre" | "keyword";
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

export interface ListParams {
    prefType: PerfType;
    prefId: number|string;
    limit?: number;
    cursor?: string|null;
}

export interface UserSyncPayload {
  clerkId: string;
  email: string;
  externalProvider?: string | null;
  externalId?: string | null;
}