'use client'

import { Skeleton } from "@/components/ui/skeleton";
import VideoCard from "@/components/features/videos/video-card";
import { useVideoFeed } from "@/lib/hooks/useVideoFeed";
import { Pref } from "@/types";
import { ToggleGroup, ToggleGroupItem } from "@radix-ui/react-toggle-group";
import { useEffect, useRef, useState } from "react";
import useSWR from "swr";

export default function Page() {
  // ユーザーのジャンル・キーワードのリストを取得
  const fetcher = (url: string): Promise<Pref[]> => fetch(url).then(res => res.json());
  const { data: prefs } = useSWR<Pref[]>('api/tags', fetcher);
  const [activePref, setActivePref] = useState("");

  // 動画リスト取得
  const { items, setSize, isLoadingMore } = useVideoFeed(activePref);
  const sentinel = useRef<HTMLDivElement>(null);

  // sentinelの監視 
  useEffect(() => {
    if (!sentinel.current) return;
    const io = new IntersectionObserver(e => {
      if (e[0].isIntersecting) setSize(prev => prev + 1);
    });
    io.observe(sentinel.current);
    return () => io.disconnect();
  }, [setSize]);

  // 初回のジャンル・キーワードを自動選択
  useEffect(() => {
    if (prefs && prefs.length && !activePref) {
      const p = prefs[0];
      setActivePref(`${p.type}:${p.id}`);
    }
  }, [prefs, activePref])
  return (
    <div className="p-4 space-y-6">
      {/* ジャンル・キーワードのトグルボタン */}
      {(prefs && prefs.length) && (
        <ToggleGroup type="single" value={activePref} onValueChange={setActivePref} className="flex gap-3">
          {prefs.map((pref) => (
            <ToggleGroupItem key={`${pref.type}:${pref.id}`} value={`${pref.type}:${pref.id}`} className="px-4 py-1 rounded-full">
              {pref.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      )}

      {items.map((v) => (
        
        <VideoCard key={v.id} video={v} data-video-card />
      ))}

      {/* Skeleton */}
      {isLoadingMore && Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-40 w-full" />)}

      <div ref={sentinel} className="h-4" />
    </div>
  );
}