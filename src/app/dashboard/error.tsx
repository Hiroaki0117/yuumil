'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // エラーログを記録
    console.error('Dashboard error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-6 p-4">
      <div className="flex items-center space-x-2 text-destructive">
        <AlertCircle className="h-8 w-8" />
        <h2 className="text-xl font-semibold">問題が発生しました</h2>
      </div>
      
      <div className="text-center space-y-2">
        <p className="text-muted-foreground">
          ダッシュボードの読み込み中にエラーが発生しました
        </p>
        <p className="text-sm text-muted-foreground">
          しばらく待ってから再試行してください
        </p>
      </div>

      <div className="flex gap-4">
        <Button 
          onClick={reset}
          className="flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          再試行
        </Button>
        
        <Button 
          variant="outline"
          onClick={() => window.location.href = '/'}
        >
          ホームに戻る
        </Button>
      </div>

      {/* 開発環境でのみエラー詳細を表示 */}
      {process.env.NODE_ENV === 'development' && (
        <details className="mt-8 p-4 bg-muted rounded-lg max-w-2xl w-full">
          <summary className="cursor-pointer text-sm font-medium mb-2">
            エラー詳細 (開発環境のみ)
          </summary>
          <pre className="text-xs overflow-auto whitespace-pre-wrap break-words">
            {error.message}
            {error.stack && '\n\n' + error.stack}
          </pre>
        </details>
      )}
    </div>
  );
} 