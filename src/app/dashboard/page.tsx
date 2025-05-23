import { Suspense } from 'react';
import { auth } from '@clerk/nextjs/server';
import { listUserPreferencesByClerkId } from '@/dal/users';
import DashboardClient from '@/components/features/dashboard/dashboard-client';
import { Skeleton } from "@/components/ui/skeleton";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ダッシュボード | ユーミル',
  description: 'あなたの興味に基づいたYouTube動画フィードを表示',
  openGraph: {
    title: 'ダッシュボード | ユーミル',
    description: 'あなたの興味に基づいたYouTube動画フィードを表示',
    type: 'website',
  },
};

function DashboardSkeleton() {
  return (
    <div className="p-4 space-y-6">
      {/* トグルボタンのスケルトン */}
      <div className="flex gap-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-20" />
        ))}
      </div>
      
      {/* 動画カードのスケルトン */}
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-24 w-full" />
        ))}
      </div>
    </div>
  );
}

export default async function DashboardPage() {
  const { userId: clerkId } = await auth();
  
  if (!clerkId) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">認証が必要です</h1>
          <p className="text-muted-foreground">
            ダッシュボードにアクセスするにはログインしてください
          </p>
        </div>
      </div>
    );
  }

  // サーバーサイドでユーザーの設定を取得
  const prefsResult = await listUserPreferencesByClerkId(clerkId);
  const prefs = prefsResult || [];

  return (
    <div className="p-4 space-y-6">
      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardClient initialPrefs={prefs} />
      </Suspense>
    </div>
  );
}