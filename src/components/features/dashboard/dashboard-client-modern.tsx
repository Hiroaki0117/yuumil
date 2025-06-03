'use client';

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import VideoCard from "@/components/features/videos/video-card";
import { useVideoFeed } from "@/lib/hooks/useVideoFeed";
import { Pref } from "@/types";
import { ToggleGroup, ToggleGroupItem } from "@radix-ui/react-toggle-group";
import { 
  Sparkles, 
  TrendingUp, 
  Search, 
  Clock, 
  Calendar, 
  BarChart3,
  Play,
  Eye,
  RefreshCw,
  Settings,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

interface DashboardClientModernProps {
  initialPrefs: Pref[];
}

export default function DashboardClientModern({ initialPrefs }: DashboardClientModernProps) {
  const [activePref, setActivePref] = useState("");
  const [period, setPeriod] = useState("trend24h");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  // 動画リスト取得
  const { items, setSize, isLoadingMore, mutate } = useVideoFeed(activePref, period);
  const sentinel = useRef<HTMLDivElement>(null);

  // 統計情報の計算
  const stats = useMemo(() => {
    const totalViews = items.reduce((sum, video) => sum + (video.total_views || 0), 0);
    const avgViews = items.length > 0 ? Math.floor(totalViews / items.length) : 0;
    const trending = items.filter(video => (video.total_views || 0) > avgViews).length;
    
    return {
      totalVideos: items.length,
      totalViews,
      avgViews,
      trending
    };
  }, [items]);

  // フィルタリングされたprefs
  const filteredPrefs = useMemo(() => {
    if (!searchQuery) return initialPrefs;
    return initialPrefs.filter(pref => 
      pref.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [initialPrefs, searchQuery]);

  // 初回自動選択とlocalStorageからの復元
  useEffect(() => {
    if (initialPrefs && initialPrefs.length) {
      const savedPref = localStorage.getItem('lastSelectedPref');
      const savedIndex = localStorage.getItem('lastSelectedIndex');
      
      if (savedPref && initialPrefs.some(p => `${p.type}:${p.id}` === savedPref)) {
        setActivePref(savedPref);
        setSelectedIndex(Number(savedIndex) || 0);
      } else {
        const firstPref = initialPrefs[0];
        setActivePref(`${firstPref.type}:${firstPref.id}`);
        setSelectedIndex(0);
      }
    }
  }, [initialPrefs]);

  // 選択状態の保存
  useEffect(() => {
    if (activePref) {
      localStorage.setItem('lastSelectedPref', activePref);
      localStorage.setItem('lastSelectedIndex', String(selectedIndex));
    }
  }, [activePref, selectedIndex]);

  // 期間が変更された際にデータをリセット
  useEffect(() => {
    if (activePref) {
      mutate();
    }
  }, [period, mutate, activePref]);

  // 無限スクロール
  useEffect(() => {
    if (!sentinel.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoadingMore) {
          setSize(prev => prev + 1);
        }
      },
      { threshold: 0.1 }
    );
    io.observe(sentinel.current);
    return () => io.disconnect();
  }, [setSize, isLoadingMore]);

  // データリフレッシュ
  const handleRefresh = useCallback(() => {
    mutate();
  }, [mutate]);

  // カルーセル風の選択
  const handlePrevious = () => {
    const newIndex = (selectedIndex - 1 + filteredPrefs.length) % filteredPrefs.length;
    setSelectedIndex(newIndex);
    const pref = filteredPrefs[newIndex];
    setActivePref(`${pref.type}:${pref.id}`);
  };

  const handleNext = () => {
    const newIndex = (selectedIndex + 1) % filteredPrefs.length;
    setSelectedIndex(newIndex);
    const pref = filteredPrefs[newIndex];
    setActivePref(`${pref.type}:${pref.id}`);
  };

  if (!initialPrefs.length) {
    return (
      <div className="text-center py-16 animate-fade-in-up">
        <div className="relative inline-block">
          <div className="glass-morphism rounded-3xl p-12 neon-border backdrop-blur-xl">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-neon-purple to-neon-blue rounded-full flex items-center justify-center animate-enhanced-pulse">
              <Settings className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4 holographic">設定が必要です</h3>
            <p className="text-muted-foreground text-lg">
              設定からジャンルやキーワードを追加してください
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12 relative">
      {/* 背景エフェクト */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--color-neon-purple)/0.05)] via-transparent to-[hsl(var(--color-neon-blue)/0.05)]"></div>
        <div className="absolute top-20 left-20 w-96 h-96 bg-[hsl(var(--color-neon-purple)/0.1)] rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-[hsl(var(--color-neon-blue)/0.1)] rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* ヘッダーセクション */}
      <div className="text-center py-12 animate-fade-in-up">
        <h1 className="text-5xl font-bold mb-6">
          <span className="holographic inline-block">
            あなた専用の
          </span>
          <br />
          <span className="text-3xl text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-cyber-green">
            トレンドフィード
          </span>
        </h1>
        <div className="w-32 h-1 bg-gradient-to-r from-neon-purple via-neon-blue to-cyber-green mx-auto rounded-full animate-enhanced-pulse"></div>
      </div>

      {/* 統計ダッシュボード */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: "総動画数", value: stats.totalVideos, icon: Play, color: "from-neon-purple to-neon-pink" },
          { label: "総視聴回数", value: stats.totalViews, icon: Eye, color: "from-neon-blue to-[hsl(var(--color-neon-blue))]" },
          { label: "平均視聴回数", value: stats.avgViews, icon: BarChart3, color: "from-cyber-green to-[hsl(var(--color-cyber-green))]" },
          { label: "トレンド動画", value: stats.trending, icon: TrendingUp, color: "from-[hsl(var(--color-electric-yellow))] to-[hsl(var(--color-neon-pink))]" }
        ].map((stat, index) => (
          <div
            key={stat.label}
            className="glass-morphism rounded-2xl p-6 relative overflow-hidden group hover:scale-105 transition-transform duration-300 animate-fade-in-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-10 group-hover:opacity-20 transition-opacity`}></div>
            <stat.icon className="w-8 h-8 mb-3 text-foreground/80" />
            <p className="text-3xl font-bold mb-1">
              {stat.value.toLocaleString('ja-JP')}
            </p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <div className="absolute -bottom-2 -right-2 w-16 h-16 rounded-full bg-gradient-to-br from-card/10 to-transparent animate-enhanced-pulse"></div>
          </div>
        ))}
      </div>

      {/* ジャンルセレクター */}
      <div className="space-y-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <button
              onClick={handlePrevious}
              className="p-3 glass-morphism rounded-full hover:scale-110 transition-transform hover:neon-glow"
              aria-label="前のジャンル"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <div className="flex items-center gap-4">
              <Sparkles className="w-6 h-6 text-neon-purple" />
              <h2 className="text-2xl font-bold">ジャンル・キーワード</h2>
              <Sparkles className="w-6 h-6 text-neon-blue" />
            </div>
            
            <button
              onClick={handleNext}
              className="p-3 glass-morphism rounded-full hover:scale-110 transition-transform hover:neon-glow"
              aria-label="次のジャンル"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* 検索バー */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="フィルターを検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 glass-morphism rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 w-64"
            />
          </div>
        </div>

        {/* ジャンル・キーワードグリッド */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredPrefs.map((pref, index) => {
            const isActive = `${pref.type}:${pref.id}` === activePref;
            return (
              <button
                key={`${pref.type}:${pref.id}`}
                onClick={() => {
                  setActivePref(`${pref.type}:${pref.id}`);
                  setSelectedIndex(index);
                }}
                className={`
                  relative px-6 py-4 rounded-2xl transition-all duration-300
                  ${isActive 
                    ? 'glass-morphism neon-border scale-105 cyber-glow' 
                    : 'glass-morphism hover:scale-105 hover:neon-glow'
                  }
                  animate-fade-in-up
                `}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="relative">
                  {isActive && (
                    <div className="absolute -inset-2 bg-gradient-to-r from-neon-purple to-neon-blue rounded-2xl opacity-30 blur-lg animate-enhanced-pulse"></div>
                  )}
                  <span className={`
                    relative z-10 font-bold text-base
                    ${isActive 
                      ? 'text-transparent bg-gradient-to-r from-neon-purple to-neon-blue bg-clip-text' 
                      : ''
                    }
                  `}>
                    {pref.label}
                  </span>
                  {isActive && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-neon-blue to-cyber-green rounded-full pulse-neon"></div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 期間選択セクション */}
      <div className="space-y-6">
        <div className="flex items-center justify-center gap-4">
          <Sparkles className="w-6 h-6 text-neon-purple" />
          <h2 className="text-2xl font-bold">トレンド期間</h2>
          <Sparkles className="w-6 h-6 text-neon-blue" />
        </div>
        
        <ToggleGroup 
          type="single" 
          value={period} 
          onValueChange={setPeriod} 
          className="flex justify-center gap-4"
        >
          {[
            { value: "trend24h", label: "24時間", icon: Clock, gradient: "from-[hsl(var(--color-electric-yellow))] to-[hsl(var(--color-neon-pink))]" },
            { value: "trend7d", label: "7日間", icon: Calendar, gradient: "from-neon-blue to-neon-purple" },
            { value: "trend30d", label: "30日間", icon: TrendingUp, gradient: "from-cyber-green to-[hsl(var(--color-cyber-green))]" }
          ].map((option, index) => (
            <ToggleGroupItem
              key={option.value}
              value={option.value}
              className={`
                relative px-8 py-4 rounded-2xl glass-morphism transition-all duration-300
                data-[state=on]:neon-border data-[state=on]:scale-105 data-[state=on]:cyber-glow
                hover:scale-105 hover:neon-glow group
                animate-fade-in-up
              `}
              style={{ animationDelay: `${index * 100}ms` }}
              aria-label={`${option.label}のトレンドを表示`}
            >
              <div className={`
                absolute inset-0 bg-gradient-to-r ${option.gradient} rounded-2xl opacity-0 
                group-hover:opacity-20 group-data-[state=on]:opacity-30 transition-opacity
              `} />
              <div className="relative z-10 flex items-center gap-3">
                <option.icon className="w-5 h-5" />
                <span className="font-bold text-lg group-data-[state=on]:text-transparent group-data-[state=on]:bg-gradient-to-r group-data-[state=on]:from-neon-purple group-data-[state=on]:to-neon-blue group-data-[state=on]:bg-clip-text">
                  {option.label}
                </span>
              </div>
              {period === option.value && (
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-neon-blue to-cyber-green rounded-full pulse-neon"></div>
              )}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      {/* リフレッシュボタン */}
      <div className="fixed bottom-8 right-8 z-50">
        <button
          onClick={handleRefresh}
          className="w-16 h-16 glass-morphism rounded-full flex items-center justify-center hover:scale-110 transition-transform neon-glow group"
          aria-label="データを更新"
        >
          <RefreshCw className="w-8 h-8 group-hover:rotate-180 transition-transform duration-500" />
        </button>
      </div>

      {/* ビデオグリッド */}
      <div className="space-y-8">
        {items.length === 0 && !isLoadingMore ? (
          <div className="text-center py-20 animate-fade-in-up">
            <div className="glass-morphism rounded-3xl p-12 max-w-md mx-auto backdrop-blur-xl">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-neon-blue to-cyber-green rounded-full flex items-center justify-center animate-float">
                <Search className="w-12 h-12 text-white" />
              </div>
              <p className="text-xl text-muted-foreground mb-2">動画が見つかりませんでした</p>
              <p className="text-muted-foreground">他のフィルターを試してみてください</p>
            </div>
          </div>
        ) : (
          <div className="grid gap-8">
            {items.map((video, index) => (
              <div
                key={video.id}
                className="animate-fade-in-up hover:scale-[1.02] transition-transform duration-300"
                style={{ animationDelay: `${Math.min(index * 50, 500)}ms` }}
              >
                <VideoCard video={video} />
              </div>
            ))}
          </div>
        )}

        {/* ローディング */}
        {isLoadingMore && (
          <div className="space-y-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div 
                key={i} 
                className="glass-morphism rounded-2xl p-6 animate-fade-in-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="flex gap-6">
                  <Skeleton className="h-32 w-48 rounded-xl bg-gradient-to-r from-[hsl(var(--color-neon-purple)/0.2)] to-[hsl(var(--color-neon-blue)/0.2)]" />
                  <div className="space-y-3 flex-1">
                    <Skeleton className="h-5 w-3/4 bg-gradient-to-r from-[hsl(var(--color-neon-blue)/0.2)] to-[hsl(var(--color-cyber-green)/0.2)]" />
                    <Skeleton className="h-5 w-1/2 bg-gradient-to-r from-[hsl(var(--color-cyber-green)/0.2)] to-[hsl(var(--color-neon-purple)/0.2)]" />
                    <Skeleton className="h-4 w-1/4 bg-gradient-to-r from-[hsl(var(--color-neon-purple)/0.2)] to-[hsl(var(--color-neon-blue)/0.2)]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* センチネル */}
        <div ref={sentinel} className="h-4" aria-hidden="true" />
      </div>
    </div>
  );
}