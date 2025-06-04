'use client';

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
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
  Heart,
  RefreshCw,
  Settings,
  ChevronLeft,
  ChevronRight,
  Zap
} from "lucide-react";

interface BackgroundParticle {
  id: number;
  x: number;
  y: number;
  duration: number;
  delay: number;
}

interface DashboardClientEnhancedProps {
  initialPrefs: Pref[];
}

// 3Dカルーセル設定
const CAROUSEL_ROTATION = 360;

export default function DashboardClientEnhanced({ initialPrefs }: DashboardClientEnhancedProps) {
  const [activePref, setActivePref] = useState("");
  const [period, setPeriod] = useState("trend24h");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [carouselRotation, setCarouselRotation] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [backgroundParticles, setBackgroundParticles] = useState<BackgroundParticle[]>([]);
  
  // アニメーション用のモーション値
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);

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

  // 背景パーティクルの生成
  useEffect(() => {
    const generatedParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
      y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
    }));
    
    setBackgroundParticles(generatedParticles);
  }, []);

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

  // カルーセルコントロール
  const handleCarouselRotate = useCallback((direction: 'left' | 'right') => {
    const increment = direction === 'left' ? -1 : 1;
    const newIndex = (selectedIndex + increment + filteredPrefs.length) % filteredPrefs.length;
    setSelectedIndex(newIndex);
    setCarouselRotation(prev => prev + (increment * (CAROUSEL_ROTATION / filteredPrefs.length)));
    
    const pref = filteredPrefs[newIndex];
    setActivePref(`${pref.type}:${pref.id}`);
  }, [selectedIndex, filteredPrefs]);

  // マウス位置トラッキング
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

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

  if (!initialPrefs.length) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16"
      >
        <div className="relative inline-block">
          <div className="glass-morphism rounded-3xl p-12 neon-border backdrop-blur-xl">
            <motion.div 
              className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center"
              animate={{ 
                rotate: 360,
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity }
              }}
            >
              <Settings className="w-12 h-12 text-white" />
            </motion.div>
            <h3 className="text-2xl font-bold mb-4 holographic">設定が必要です</h3>
            <p className="text-muted-foreground text-lg">
              設定からジャンルやキーワードを追加してください
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-12 relative" onMouseMove={handleMouseMove}>
      {/* 背景パーティクル効果 */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-cyan-500/5"></div>
        {backgroundParticles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            initial={{ 
              x: particle.x,
              y: particle.y
            }}
            animate={{ 
              y: [null, -20, 20],
              opacity: [0.2, 0.8, 0.2]
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay
            }}
          />
        ))}
      </div>

      {/* ヘッダーセクション */}
      <motion.div 
        className="text-center py-12"
        style={{ rotateX, rotateY, transformPerspective: 1200 }}
      >
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-bold mb-6">
            <motion.span 
              className="holographic inline-block"
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              あなた専用の
            </motion.span>
            <br />
            <span className="text-3xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
              トレンドフィード
            </span>
          </h1>
          <motion.div 
            className="w-32 h-1 bg-gradient-to-r from-purple-500 via-cyan-500 to-emerald-500 mx-auto rounded-full"
            animate={{ 
              scaleX: [1, 1.5, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>

      {/* 統計ダッシュボード */}
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {[
          { label: "総動画数", value: stats.totalVideos, icon: Play, color: "from-purple-500 to-pink-500" },
          { label: "総視聴回数", value: stats.totalViews, icon: Eye, color: "from-cyan-500 to-blue-500" },
          { label: "平均視聴回数", value: stats.avgViews, icon: BarChart3, color: "from-emerald-500 to-green-500" },
          { label: "トレンド動画", value: stats.trending, icon: TrendingUp, color: "from-orange-500 to-red-500" }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            className="glass-morphism rounded-2xl p-6 relative overflow-hidden group"
            whileHover={{ scale: 1.05, rotateY: 5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-10 group-hover:opacity-20 transition-opacity`}></div>
            <stat.icon className="w-8 h-8 mb-3 text-white/80" />
            <motion.p 
              className="text-3xl font-bold mb-1"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.3 + index * 0.1 }}
            >
              {stat.value.toLocaleString('ja-JP')}
            </motion.p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <motion.div 
              className="absolute -bottom-2 -right-2 w-16 h-16 rounded-full bg-gradient-to-br from-white/10 to-transparent"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* 3Dジャンルセレクター */}
      <div className="relative h-64 mb-12 perspective-1000">
        <motion.div className="absolute inset-0 flex items-center justify-center">
          {/* カルーセルコントロール */}
          <motion.button
            onClick={() => handleCarouselRotate('left')}
            className="absolute left-4 z-20 p-3 glass-morphism rounded-full hover:scale-110 transition-transform"
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>
          
          <motion.button
            onClick={() => handleCarouselRotate('right')}
            className="absolute right-4 z-20 p-3 glass-morphism rounded-full hover:scale-110 transition-transform"
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>

          {/* 3Dカルーセル */}
          <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
            <motion.div
              className="relative w-full h-full"
              animate={{ rotateY: carouselRotation }}
              transition={{ type: "spring", damping: 20 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {filteredPrefs.map((pref, index) => {
                const angle = (index / filteredPrefs.length) * 360;
                const isActive = `${pref.type}:${pref.id}` === activePref;
                
                return (
                  <motion.div
                    key={`${pref.type}:${pref.id}`}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    style={{
                      transform: `rotateY(${angle}deg) translateZ(200px)`,
                      transformStyle: 'preserve-3d'
                    }}
                  >
                    <motion.button
                      onClick={() => {
                        setActivePref(`${pref.type}:${pref.id}`);
                        setSelectedIndex(index);
                      }}
                      className={`
                        px-8 py-4 rounded-2xl transition-all duration-300
                        ${isActive 
                          ? 'glass-morphism neon-border scale-110' 
                          : 'glass-morphism hover:scale-105'
                        }
                      `}
                      whileHover={{ 
                        scale: isActive ? 1.1 : 1.15,
                        rotateX: 5,
                        rotateY: 5
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="relative">
                        {isActive && (
                          <motion.div 
                            className="absolute -inset-2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-2xl opacity-50 blur-lg"
                            animate={{ 
                              opacity: [0.3, 0.6, 0.3],
                              scale: [1, 1.1, 1]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        )}
                        <span className={`
                          relative z-10 font-bold text-lg
                          ${isActive 
                            ? 'text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text' 
                            : ''
                          }
                        `}>
                          {pref.label}
                        </span>
                        {isActive && (
                          <motion.div 
                            className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full"
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                          />
                        )}
                      </div>
                    </motion.button>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </motion.div>

        {/* 検索バー */}
        <motion.div 
          className="absolute top-0 right-0"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
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
        </motion.div>
      </div>

      {/* 期間選択セクション */}
      <motion.div 
        className="space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center justify-center gap-4">
          <Sparkles className="w-6 h-6 text-purple-400" />
          <h2 className="text-2xl font-bold">トレンド期間</h2>
          <Sparkles className="w-6 h-6 text-cyan-400" />
        </div>
        
        <ToggleGroup 
          type="single" 
          value={period} 
          onValueChange={setPeriod} 
          className="flex justify-center gap-4"
        >
          {[
            { value: "trend24h", label: "24時間", icon: Clock, gradient: "from-orange-500 to-red-500" },
            { value: "trend7d", label: "7日間", icon: Calendar, gradient: "from-blue-500 to-purple-500" },
            { value: "trend30d", label: "30日間", icon: TrendingUp, gradient: "from-green-500 to-emerald-500" }
          ].map((option, index) => (
            <ToggleGroupItem
              key={option.value}
              value={option.value}
              asChild
            >
              <motion.button
                className={`
                  relative px-8 py-4 rounded-2xl glass-morphism transition-all duration-300
                  data-[state=on]:neon-border data-[state=on]:scale-105
                  hover:scale-105 group
                `}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <div className={`
                  absolute inset-0 bg-gradient-to-r ${option.gradient} rounded-2xl opacity-0 
                  group-hover:opacity-20 group-data-[state=on]:opacity-30 transition-opacity
                `} />
                <div className="relative z-10 flex items-center gap-3">
                  <option.icon className="w-5 h-5" />
                  <span className="font-bold text-lg group-data-[state=on]:text-transparent group-data-[state=on]:bg-gradient-to-r group-data-[state=on]:from-purple-400 group-data-[state=on]:to-cyan-400 group-data-[state=on]:bg-clip-text">
                    {option.label}
                  </span>
                </div>
                {period === option.value && (
                  <motion.div 
                    className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full"
                    layoutId="period-indicator"
                    transition={{ type: "spring", damping: 20 }}
                  />
                )}
              </motion.button>
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </motion.div>

      {/* フローティングアクションボタン */}
      <motion.div 
        className="fixed bottom-8 right-8 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 0.5 }}
      >
        <motion.div className="relative">
          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute bottom-20 right-0 space-y-3"
              >
                <motion.button
                  onClick={handleRefresh}
                  className="flex items-center gap-3 px-6 py-3 glass-morphism rounded-full hover:scale-105 transition-transform"
                  whileHover={{ x: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <RefreshCw className="w-5 h-5" />
                  <span>更新</span>
                </motion.button>
                
                <motion.button
                  className="flex items-center gap-3 px-6 py-3 glass-morphism rounded-full hover:scale-105 transition-transform"
                  whileHover={{ x: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Heart className="w-5 h-5" />
                  <span>お気に入り</span>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
          
          <motion.button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="w-16 h-16 glass-morphism rounded-full flex items-center justify-center hover:scale-110 transition-transform neon-glow"
            animate={{ rotate: isFilterOpen ? 45 : 0 }}
            whileHover={{ rotate: isFilterOpen ? 45 : 180 }}
            whileTap={{ scale: 0.9 }}
          >
            <Zap className="w-8 h-8" />
          </motion.button>
        </motion.div>
      </motion.div>

      {/* ビデオグリッド */}
      <motion.div 
        className="space-y-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {items.length === 0 && !isLoadingMore ? (
          <motion.div 
            className="text-center py-20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="glass-morphism rounded-3xl p-12 max-w-md mx-auto backdrop-blur-xl">
              <motion.div 
                className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full flex items-center justify-center"
                animate={{ 
                  rotate: [0, 180, 360],
                  scale: [1, 1.2, 1]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Search className="w-12 h-12 text-white" />
              </motion.div>
              <p className="text-xl text-muted-foreground mb-2">動画が見つかりませんでした</p>
              <p className="text-muted-foreground">他のフィルターを試してみてください</p>
            </div>
          </motion.div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {items.map((video, index) => (
                <motion.div
                  key={video.id}
                  layout
                  initial={{ opacity: 0, y: 50, rotateX: -10 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ 
                    delay: index * 0.05,
                    type: "spring",
                    damping: 20
                  }}
                  whileHover={{ 
                    y: -10,
                    rotateY: 5,
                    z: 50
                  }}
                  style={{ transformPerspective: 1000 }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 rounded-2xl blur-xl opacity-0 hover:opacity-100 transition-opacity duration-500" />
                  <VideoCard video={video} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* ローディング */}
        {isLoadingMore && (
          <div className="space-y-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <motion.div 
                key={i} 
                className="glass-morphism rounded-2xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex gap-6">
                  <Skeleton className="h-32 w-48 rounded-xl bg-gradient-to-r from-purple-500/20 to-cyan-500/20" />
                  <div className="space-y-3 flex-1">
                    <Skeleton className="h-5 w-3/4 bg-gradient-to-r from-cyan-500/20 to-emerald-500/20" />
                    <Skeleton className="h-5 w-1/2 bg-gradient-to-r from-emerald-500/20 to-purple-500/20" />
                    <Skeleton className="h-4 w-1/4 bg-gradient-to-r from-purple-500/20 to-cyan-500/20" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* センチネル */}
        <div ref={sentinel} className="h-4" aria-hidden="true" />
      </motion.div>
    </div>
  );
}