'use client';

import { Skeleton } from "@/components/ui/skeleton";
import VideoCard from "@/components/features/videos/video-card";
import { useVideoFeed } from "@/lib/hooks/useVideoFeed";
import { Pref } from "@/types";
import { ToggleGroup, ToggleGroupItem } from "@radix-ui/react-toggle-group";
import { useEffect, useRef, useState } from "react";

interface DashboardClientProps {
  initialPrefs: Pref[];
}

export default function DashboardClient({ initialPrefs }: DashboardClientProps) {
  const [activePref, setActivePref] = useState("");

  // 動画リスト取得
  const { items, setSize, isLoadingMore } = useVideoFeed(activePref);
  const sentinel = useRef<HTMLDivElement>(null);

  // sentinelの監視（無限スクロール）
  useEffect(() => {
    if (!sentinel.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setSize(prev => prev + 1);
        }
      },
      { threshold: 0.1 }
    );
    io.observe(sentinel.current);
    return () => io.disconnect();
  }, [setSize]);

  // 初回のジャンル・キーワードを自動選択
  useEffect(() => {
    if (initialPrefs && initialPrefs.length && !activePref) {
      const firstPref = initialPrefs[0];
      setActivePref(`${firstPref.type}:${firstPref.id}`);
    }
  }, [initialPrefs, activePref]);

  if (!initialPrefs.length) {
    return (
      <div className="text-center py-16">
        <div className="relative inline-block">
          <div className="glass-morphism rounded-2xl p-8 neon-border">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2 holographic">設定が必要です</h3>
            <p className="text-muted-foreground">
              設定からジャンルやキーワードを追加してください
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* ヘッダーセクション */}
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold mb-4">
          <span className="holographic">あなた専用の</span>
          <br />
          <span className="text-2xl text-muted-foreground">トレンドフィード</span>
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto rounded-full"></div>
      </div>

      {/* ジャンル・キーワードのトグルボタン */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-center">フィルター</h2>
        <ToggleGroup 
          type="single" 
          value={activePref} 
          onValueChange={setActivePref} 
          className="flex flex-wrap justify-center gap-3"
        >
          {initialPrefs.map((pref, index) => (
            <ToggleGroupItem 
              key={`${pref.type}:${pref.id}`} 
              value={`${pref.type}:${pref.id}`} 
              className="group relative px-6 py-3 rounded-full glass-morphism transition-all duration-300 hover:scale-105 hover:neon-glow data-[state=on]:neon-border data-[state=on]:cyber-glow focus:outline-none focus:ring-2 focus:ring-primary/50"
              aria-label={`${pref.label}のフィードを表示`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* 背景グラデーション */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-cyan-500/10 to-emerald-500/10 rounded-full opacity-0 group-hover:opacity-100 data-[state=on]:opacity-100 transition-opacity duration-300"></div>
              
              {/* ラベル */}
              <span className="relative z-10 font-medium group-data-[state=on]:text-transparent group-data-[state=on]:bg-gradient-to-r group-data-[state=on]:from-purple-400 group-data-[state=on]:to-cyan-400 group-data-[state=on]:bg-clip-text transition-all duration-300">
                {pref.label}
              </span>
              
              {/* インジケーター */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full opacity-0 group-data-[state=on]:opacity-100 pulse-neon transition-opacity duration-300"></div>
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      {/* 動画リスト */}
      <div className="space-y-6">
        {items.length === 0 && !isLoadingMore ? (
          <div className="text-center py-16">
            <div className="glass-morphism rounded-2xl p-8 max-w-md mx-auto">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full flex items-center justify-center floating-animation">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <p className="text-muted-foreground">動画が見つかりませんでした</p>
              <p className="text-sm text-muted-foreground mt-2">他のフィルターを試してみてください</p>
            </div>
          </div>
        ) : (
          <div className="grid gap-6">
            {items.map((video, index) => (
              <div 
                key={video.id} 
                className="floating-animation"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <VideoCard video={video} />
              </div>
            ))}
          </div>
        )}

        {/* ローディングスケルトン */}
        {isLoadingMore && (
          <div className="space-y-6">
            {Array.from({ length: 3 }).map((_, i) => (
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
        )}

        {/* 無限スクロール用のセンチネル */}
        <div ref={sentinel} className="h-4" aria-hidden="true" />
      </div>
    </div>
  );
} 