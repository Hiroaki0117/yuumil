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
    <div className="space-y-8">
      {/* ヘッダースケルトン */}
      <div className="text-center py-8">
        <div className="space-y-4">
          <Skeleton className="h-8 w-64 mx-auto bg-gradient-to-r from-purple-500/20 to-cyan-500/20" />
          <Skeleton className="h-6 w-48 mx-auto bg-gradient-to-r from-cyan-500/20 to-emerald-500/20" />
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto rounded-full"></div>
        </div>
      </div>

      {/* フィルタースケルトン */}
      <div className="space-y-4">
        <Skeleton className="h-6 w-20 mx-auto bg-gradient-to-r from-emerald-500/20 to-purple-500/20" />
        <div className="flex justify-center gap-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton 
              key={i} 
              className="h-12 w-24 rounded-full glass-morphism bg-gradient-to-r from-purple-500/20 to-cyan-500/20 shimmer" 
            />
          ))}
        </div>
      </div>
      
      {/* 動画カードスケルトン */}
      <div className="space-y-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="glass-morphism rounded-xl p-4">
            <div className="flex gap-4">
              <Skeleton className="h-24 w-42 rounded-lg bg-gradient-to-r from-purple-500/20 to-cyan-500/20" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-3/4 bg-gradient-to-r from-cyan-500/20 to-emerald-500/20" />
                <Skeleton className="h-4 w-1/2 bg-gradient-to-r from-emerald-500/20 to-purple-500/20" />
                <Skeleton className="h-3 w-1/4 bg-gradient-to-r from-purple-500/20 to-cyan-500/20" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default async function DashboardPage() {
  const { userId: clerkId } = await auth();
  
  if (!clerkId) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="glass-morphism rounded-2xl p-12 neon-border text-center max-w-md">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center floating-animation">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-4 holographic">認証が必要です</h1>
          <p className="text-muted-foreground mb-6">
            ダッシュボードにアクセスするにはログインしてください
          </p>
          <div className="w-full h-1 bg-gradient-to-r from-purple-500 via-cyan-500 to-emerald-500 rounded-full"></div>
        </div>
      </div>
    );
  }

  // サーバーサイドでユーザーの設定を取得
  const prefsResult = await listUserPreferencesByClerkId(clerkId);
  const prefs = prefsResult || [];

  return (
    <div className="relative">
      {/* 背景の装飾グラデーション */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-cyan-500/5 pointer-events-none"></div>
      
      {/* メインコンテンツ */}
      <div className="relative z-10">
        <Suspense fallback={<DashboardSkeleton />}>
          <DashboardClient initialPrefs={prefs} />
        </Suspense>
      </div>
    </div>
  );
}