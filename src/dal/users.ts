import { supabase } from '@/lib/supabaseClient';
interface UserSyncPayload {
  clerkId: string;
  email: string;
  externalProvider?: string | null;
  externalId?: string | null;
}

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
}