import dynamic from 'next/dynamic';
import { auth } from '@clerk/nextjs/server';
import { supabase } from '@/lib/database/supabaseClient';
import { getUser } from '@/dal/users';
import { redirect } from 'next/navigation';
import { ErrorBoundary, OnboardingErrorFallback } from '@/components/common/error-boundary';
import { PageLoading } from '@/components/common/loading-states';

// オンボーディングコンポーネントの動的インポート
const OnboardingClient = dynamic(
  () => import('./onboarding-client'),
  {
    loading: () => <PageLoading />,
  }
);

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
    <ErrorBoundary fallback={OnboardingErrorFallback}>
      <OnboardingClient userId={id} genres={genres || []} />
    </ErrorBoundary>
  );
}