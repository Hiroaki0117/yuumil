import { supabase } from "@/lib/supabaseClient";
import { Database } from "../../database.types";



type GenreRow   = Database['public']['Views']['videos_recent_genres']['Row'];
type KeywordRow = Database['public']['Views']['videos_recent_keywords']['Row'];

type UnifiedRow = (GenreRow | KeywordRow) & {
    published_at: string;
    id: string
}

type PerfType = "genre" | "keyword";

interface ListParams {
    prefType: PerfType;
    prefId: number|string;
    limit?: number;
    cursor?: string|null;
}

export async function listByPreference({ prefType, prefId, limit = 20, cursor}: ListParams) {
    const isGenre = prefType === "genre";
    const table = isGenre ? "video_recent_genres" : "videos_recent_keywords";
    const idCol = isGenre ? "genre_id" : "keyword_id";

    const query = supabase
        .from(table)
        .select<'*', UnifiedRow>('*')
        .eq(idCol, prefId)
        .order("published_at", { ascending: false })
        .order('id', { ascending: false })
        .limit(limit+1);

    if (cursor) {
        const [published_at, id] = cursor.split('__');
        query.lt("published_at", published_at).or(`and(published_at.eq.${published_at}), id.lt.${id}`);
    }

    const {data, error} = await query;
    if (error) throw error;

    let nextCursor: string | null = null;
    if (data.length > limit) {
        const tail = data.pop()!;
        nextCursor = `${tail.published_at}__${tail.id}`;
    }

    return { data, nextCursor};
};