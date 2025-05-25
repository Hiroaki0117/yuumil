'use client';

import { useEffect } from 'react';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // エラーをログに記録
    console.error('Dashboard error:', error);
  }, [error]);

  return (
    <div className="relative flex items-center justify-center min-h-[60vh]">
      {/* 背景の装飾グラデーション */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-purple-500/5 pointer-events-none"></div>
      
      {/* エラーカード */}
      <div className="relative z-10 glass-morphism rounded-2xl p-12 neon-border text-center max-w-md">
        {/* エラーアイコン */}
        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-red-500 to-purple-500 rounded-full flex items-center justify-center floating-animation">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" 
            />
          </svg>
        </div>

        {/* エラーメッセージ */}
        <h1 className="text-2xl font-bold mb-4 holographic">
          問題が発生しました
        </h1>
        
        <p className="text-muted-foreground mb-6">
          ダッシュボードの読み込み中にエラーが発生しました。
          もう一度お試しください。
        </p>

        {/* エラー詳細（開発環境でのみ表示） */}
        {process.env.NODE_ENV === 'development' && (
          <details className="mb-6 text-left">
            <summary className="text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
              エラー詳細を表示
            </summary>
            <pre className="mt-2 text-xs bg-muted/50 p-2 rounded overflow-auto max-h-32">
              {error.message}
            </pre>
          </details>
        )}

        {/* アクションボタン */}
        <div className="space-y-4">
          <button
            onClick={reset}
            className="btn-primary w-full"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            再試行
          </button>
          
          <button
            onClick={() => window.location.href = '/'}
            className="btn-secondary w-full"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            ホームに戻る
          </button>
        </div>

        {/* 装飾ライン */}
        <div className="w-full h-1 bg-gradient-to-r from-red-500 via-purple-500 to-cyan-500 rounded-full mt-6"></div>
      </div>
    </div>
  );
} 