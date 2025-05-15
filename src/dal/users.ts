import { supabase } from '@/lib/supabaseClient';
import { Pref, PrefDetailRow, UserSyncPayload } from '@/type';

// Clerkユーザーをusersテーブルに同期するしUUIDを返す。
export async function ensureUserRecord({
    clerkId,
    email,
    externalProvider,
    externalId
}: UserSyncPayload): Promise<string | null> {
    const payload: Record<string, any> = {
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
export async function listUserPreferencesByClerkId(userId : string): Promise<Pref[] | null> {
    const { data, error } = await supabase
    .from("user_preferences_detail_view")
    .select<'*', PrefDetailRow>("*")
    .eq("clerk_id", userId);

    if (error) throw error;
  return (data ?? [])
    .filter((r): r is PrefDetailRow & { pref_id: string; label: string } =>
      r.pref_id !== null && r.label !== null)
    .map((r) => ({
      type: r.pref_type as Pref['type'],
      id:   r.pref_id,
      label: r.label,
    }));
};