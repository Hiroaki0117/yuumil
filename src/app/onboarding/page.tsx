import { auth } from '@clerk/nextjs/server';
import { supabase } from '@/lib/database/supabaseClient';
import GenreSelector from './selector';
import { getUser } from '@/dal/users';
import { redirect } from 'next/navigation';

export default async function OnboardingPage() {
  const { userId } = await auth();
  if (!userId)  redirect('/dashboard'); ;
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