import { auth } from '@clerk/nextjs/server';
import { supabase } from '@/lib/supabaseClient';
import GenreSelector from './selector';
import { getUser } from '@/dal/users';

export default async function OnboardingPage() {
  const { userId } = await auth();
  if (!userId) return;
  const user = await getUser(userId);
  const id = user.id;
  if (!id) throw console.error("userIdがありません");

  const { data: genres } = await supabase.from('genres')
                                         .select('*')
                                         .order('category');

  return (
    <GenreSelector userId={id} genres={genres || []} />
  );
}