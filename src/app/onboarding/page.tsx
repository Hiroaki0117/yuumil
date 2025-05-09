import { auth } from '@clerk/nextjs/server';
import { supabase } from '@/lib/supabaseClient';
import GenreSelector from './selector';

export default async function OnboardingPage() {
  const { userId } = await auth();
  if (!userId) return null;

  const { data: genres } = await supabase.from('genres')
                                         .select('*')
                                         .order('category');

  return (
    <GenreSelector userId={userId} genres={genres || []} />
  );
}