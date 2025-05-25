import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="relative">
      {/* 背景の装飾グラデーション */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-cyan-500/5 pointer-events-none"></div>
      
      {/* メインコンテンツ */}
      <div className="relative z-10 space-y-8">
        {/* ヘッダースケルトン */}
        <div className="text-center py-8">
          <div className="space-y-4">
            <Skeleton className="h-8 w-64 mx-auto bg-gradient-to-r from-purple-500/20 to-cyan-500/20 shimmer" />
            <Skeleton className="h-6 w-48 mx-auto bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 shimmer" />
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto rounded-full pulse-neon"></div>
          </div>
        </div>

        {/* フィルタースケルトン */}
        <div className="space-y-4">
          <Skeleton className="h-6 w-20 mx-auto bg-gradient-to-r from-emerald-500/20 to-purple-500/20 shimmer" />
          <div className="flex justify-center gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton 
                key={i} 
                className="h-12 w-24 rounded-full glass-morphism bg-gradient-to-r from-purple-500/20 to-cyan-500/20 shimmer floating-animation" 
                style={{ animationDelay: `${i * 200}ms` }}
              />
            ))}
          </div>
        </div>
        
        {/* 動画カードスケルトン */}
        <div className="space-y-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div 
              key={i} 
              className="glass-morphism rounded-xl p-4 floating-animation"
              style={{ animationDelay: `${i * 150}ms` }}
            >
              <div className="flex gap-4">
                <Skeleton className="h-24 w-42 rounded-lg bg-gradient-to-r from-purple-500/20 to-cyan-500/20 shimmer" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-3/4 bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 shimmer" />
                  <Skeleton className="h-4 w-1/2 bg-gradient-to-r from-emerald-500/20 to-purple-500/20 shimmer" />
                  <Skeleton className="h-3 w-1/4 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 shimmer" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 