import { supabase } from '@/lib/supabaseClient'
import { SelectedGenre, SelectedKeyword } from '@/types'

// キーワード登録
export async function upsertKeywords(keywordItems: SelectedKeyword[]): Promise<{id: string}[] | null> {
    const {data} =  await supabase.from("keywords").upsert(keywordItems.map(k => ({name: k.value, slug: k.value}))).select("id");
    return data;
};

// ユーザージャンル登録
export async function insertUserGenres(userId: string, genreItems: SelectedGenre[]) {
    return await supabase.from("user_genres").insert(genreItems.map(g => ({user_id: userId, genre_id: g.id})));
};

// ユーザーキーワード登録
export async function insertUserKeywords(userId: string, keywordItems: {id: string}[]) {
    console.log(userId);
    console.log(keywordItems[0].id);
    return await supabase.from("user_keywords").insert(keywordItems.map(k => ({user_id: userId, keyword_id: k.id})))
};