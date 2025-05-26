import { supabase } from '@/lib/database/supabaseClient';
import { Tag, TagDetailRow, UserSyncPayload } from '@/types';

// Clerkユーザーをusersテーブルに同期するしUUIDを返す。
export async function ensureUserRecord({
    clerkId,
    email,
    externalProvider,
    externalId
}: UserSyncPayload): Promise<string | null> {
    const payload: Record<string, string> = {
        clerk_id: clerkId,
        email,
    };

    if (externalProvider) payload.external_provider = externalProvider;
    if (externalId) payload.external_id = externalId;

    const { data, error} =  await supabase.from("users")
    .upsert(payload, {onConflict: "clerk_id"})
    .select("id")
    .single();

    if (error) throw error;
    return data.id;
};

// ユーザー取得
export async function getUser(id: string) {
    const { data } = await supabase
        .from('users')
        .select('*')
        .eq('clerk_id', id)
        .maybeSingle();
    return data;
};

// 指定ユーザーが登録しているジャンル・キーワード一覧を取得
export async function listUserTagsByClerkId(userId : string): Promise<Tag[] | null> {
    const { data, error } = await supabase
    .from("user_tags_detail_view")
    .select<'*', TagDetailRow>("*")
    .eq("clerk_id", userId);

    if (error) throw error;
  return (data ?? [])
    .filter((r): r is TagDetailRow & { tag_id: string; label: string } =>
      r.tag_id !== null && r.label !== null)
    .map((r) => ({
      type: r.tag_type as Tag['type'],
      id:   r.tag_id,
      label: r.label,
    }));
};