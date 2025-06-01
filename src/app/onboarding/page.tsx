import { auth } from '@clerk/nextjs/server';
import { supabase } from '@/lib/database/supabaseClient';
import OnboardingClient from './onboarding-client';
import { getUser } from '@/dal/users';
import { redirect } from 'next/navigation';

export default async function OnboardingPage() {
  const { userId } = await auth();
  if (!userId) redirect('/dashboard');
  
  const user = await getUser(userId);
  const id = user.id;
  if (!id) throw new Error("userIdがありません");

  const { data: genres } = await supabase.from('genres')
                                         .select('*')
                                         .order('category');

  return (
    <OnboardingClient userId={id} genres={genres || []} />
  );
}