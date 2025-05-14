'use client'

import { Skeleton } from "@/components/ui/skeleton";
import { useVideoFeed } from "@/lib/hooks/useVideoFeed";
import { ToggleGroup, ToggleGroupItem } from "@radix-ui/react-toggle-group";
import { useEffect, useRef, useState } from "react";
import useSWR from "swr";

export default function Page() {
  // ユーザーのジャンル・キーワードのリストを取得
  const { data: prefs } = useSWR('', url => fetch(url).then(r => r.json()));
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
    <div>
      {/* ジャンル・キーワードのトグルボタン */}
      {(prefs && prefs.length) && (
        <ToggleGroup type="single" value={activePref} onValueChange={setActivePref} className="flex gap-2">
          {prefs.map((pref:any) => (
            <ToggleGroupItem key={`${pref.type}:${pref.id}`} value={`${pref.type}:${pref.id}`}>
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