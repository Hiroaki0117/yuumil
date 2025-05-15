import { supabase } from "@/lib/supabaseClient";
import { GetNewVideosParams, UnifiedRow, GetTrendVideosParams, RankRow } from "@/type";

export async function listNewsByPreference({ prefType, prefId, limit = 20, cursor}: GetNewVideosParams) {
    const isGenre = prefType === "genre";
    const table = isGenre ? "videos_recent_genres" : "videos_recent_keywords";
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
        console.log(tail);
        nextCursor = `${tail.published_at}__${tail.id}`;
    }

    return { data, nextCursor};
};

export async function listRankingsByPreference({ periodType, calcDate, limit = 20, prefType, prefId}: GetTrendVideosParams) {
    const selectPref = prefType === "genre" ? "genre_id" : "keyword_id";
    if (!calcDate) {
        const { data: lastDate, error } = await supabase
            .from("pre_calculated_rankings")
            .select<"calculation_date", { calculation_date: string}>("calculation_date")
            .eq("period_type", periodType)
            .eq(selectPref, prefId)
            .order("calculation_date", { ascending: false})
            .limit(1);
        
        if (error) throw error;
        calcDate = lastDate?.[0]?.calculation_date
    }

    const query = supabase
            .from("pre_calculated_rankings")
            .select<"*", RankRow>("*")
            .eq('period_type', periodType)
            .eq('calculation_date', calcDate)
            .order('rank')
            .limit(limit);

    const { data, error } = await query;
    if (error) throw error;
    return data ?? [];
};