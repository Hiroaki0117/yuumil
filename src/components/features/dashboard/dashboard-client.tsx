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
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          設定からジャンルやキーワードを追加してください
        </p>
      </div>
    );
  }

  return (
    <>
      {/* ジャンル・キーワードのトグルボタン */}
      <ToggleGroup 
        type="single" 
        value={activePref} 
        onValueChange={setActivePref} 
        className="flex flex-wrap gap-3"
      >
        {initialPrefs.map((pref) => (
          <ToggleGroupItem 
            key={`${pref.type}:${pref.id}`} 
            value={`${pref.type}:${pref.id}`} 
            className="px-4 py-2 rounded-full border data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
            aria-label={`${pref.label}のフィードを表示`}
          >
            {pref.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      {/* 動画リスト */}
      <div className="space-y-4">
        {items.length === 0 && !isLoadingMore ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">動画が見つかりませんでした</p>
          </div>
        ) : (
          items.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))
        )}

        {/* ローディングスケルトン */}
        {isLoadingMore && (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-24 w-full" />
            ))}
          </div>
        )}

        {/* 無限スクロール用のセンチネル */}
        <div ref={sentinel} className="h-4" aria-hidden="true" />
      </div>
    </>
  );
} 