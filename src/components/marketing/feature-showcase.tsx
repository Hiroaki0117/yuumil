"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { 
  Newspaper, TrendingUp, Heart, Filter, Clock, Globe, 
  Sparkles, Shield, Zap, ChevronRight, Settings
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  preview: React.ReactNode;
}

const features: Feature[] = [
  {
    id: "news",
    title: "24時間ニュースフィード",
    description: "世界中から集められた最新のニュース動画を、AIがリアルタイムでキュレート",
    icon: Newspaper,
    color: "from-blue-500 to-cyan-500",
    preview: (
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-slate-800/80 backdrop-blur-sm rounded-lg p-3 shadow-sm border border-purple-500/20 flex gap-3"
          >
            <div className="w-20 h-14 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-md animate-pulse" />
            <div className="flex-1">
              <div className="h-3 bg-slate-700 rounded w-3/4 mb-2" />
              <div className="h-2 bg-slate-600 rounded w-1/2" />
            </div>
          </motion.div>
        ))}
      </div>
    ),
  },
  {
    id: "trends",
    title: "トレンド分析",
    description: "視聴傾向とグローバルトレンドを基に、次に流行るコンテンツを予測",
    icon: TrendingUp,
    color: "from-purple-500 to-pink-500",
    preview: (
      <div className="relative h-full">
        <svg className="w-full h-full" viewBox="0 0 200 100">
          <motion.path
            d="M 0 80 Q 50 60 100 40 T 200 20"
            stroke="url(#gradient)"
            strokeWidth="3"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
        </svg>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute top-4 right-4 bg-slate-800/90 backdrop-blur-sm rounded-lg shadow-md p-2 border border-purple-500/20"
        >
          <div className="flex items-center gap-1 text-green-600">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-semibold">+45%</span>
          </div>
        </motion.div>
      </div>
    ),
  },
  {
    id: "personalized",
    title: "パーソナライズドフィード",
    description: "あなたの興味と視聴履歴から、完璧にカスタマイズされた動画体験を提供",
    icon: Heart,
    color: "from-rose-500 to-orange-500",
    preview: (
      <div className="grid grid-cols-2 gap-2">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: i * 0.1, type: "spring" }}
            className="aspect-video bg-gradient-to-br from-rose-100 to-orange-100 rounded-lg flex items-center justify-center"
          >
            <Heart className="w-6 h-6 text-rose-500" />
          </motion.div>
        ))}
      </div>
    ),
  },
  {
    id: "smart-filter",
    title: "スマートフィルター",
    description: "高度なAIフィルターで、見たいコンテンツだけを瞬時に発見",
    icon: Filter,
    color: "from-green-500 to-teal-500",
    preview: (
      <div className="space-y-2">
        {["ジャンル", "長さ", "人気度"].map((label, i) => (
          <motion.div
            key={label}
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: i * 0.2 }}
            className="bg-slate-800/80 backdrop-blur-sm rounded-full p-2 px-4 shadow-sm border border-purple-500/20 flex items-center gap-2"
          >
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span className="text-sm text-gray-300">{label}</span>
          </motion.div>
        ))}
      </div>
    ),
  },
  {
    id: "real-time",
    title: "リアルタイム更新",
    description: "新しいコンテンツが投稿されたら即座に通知、見逃しゼロ",
    icon: Clock,
    color: "from-amber-500 to-yellow-500",
    preview: (
      <div className="relative">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="w-24 h-24 mx-auto"
        >
          <Clock className="w-full h-full text-amber-500" />
        </motion.div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full"
        />
      </div>
    ),
  },
  {
    id: "global",
    title: "グローバルコンテンツ",
    description: "言語の壁を越えて、世界中の優れたコンテンツにアクセス",
    icon: Globe,
    color: "from-indigo-500 to-blue-500",
    preview: (
      <motion.div
        animate={{ rotateY: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="w-24 h-24 mx-auto relative"
        style={{ transformStyle: "preserve-3d" }}
      >
        <Globe className="w-full h-full text-indigo-500" />
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-indigo-400 rounded-full"
            style={{
              top: `${50 + Math.sin(i * 2.094) * 40}%`,
              left: `${50 + Math.cos(i * 2.094) * 40}%`,
            }}
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ delay: i * 0.3, repeat: Infinity, duration: 1.5 }}
          />
        ))}
      </motion.div>
    ),
  },
];

export function FeatureShowcase() {
  const [selectedFeature, setSelectedFeature] = useState<string>("news");
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const selectedFeatureData = features.find(f => f.id === selectedFeature)!;

  return (
    <section ref={containerRef} className="py-24 bg-gradient-to-b from-slate-900 via-slate-900 to-purple-950/20 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            機能紹介
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              最先端の機能で
            </span>
            <br />
            動画体験を革新
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            AIと最新技術を組み合わせて、あなただけの完璧な動画体験を創造します
          </p>
        </motion.div>

        {/* Feature grid and preview */}
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Feature list */}
          <div className="space-y-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedFeature(feature.id)}
                className={cn(
                  "relative group cursor-pointer rounded-2xl p-6 transition-all duration-300",
                  selectedFeature === feature.id
                    ? "bg-slate-800/90 backdrop-blur-sm shadow-xl scale-105 border border-purple-500/30"
                    : "bg-slate-800/50 hover:bg-slate-800/70 hover:shadow-md hover:border-purple-500/20 border border-transparent"
                )}
              >
                <div className="flex items-start gap-4">
                  <div className={cn(
                    "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center transition-transform group-hover:scale-110",
                    selectedFeature === feature.id ? feature.color : "from-gray-200 to-gray-300"
                  )}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1 text-gray-100">{feature.title}</h3>
                    <p className="text-gray-400 text-sm">{feature.description}</p>
                  </div>
                  <ChevronRight className={cn(
                    "w-5 h-5 transition-all",
                    selectedFeature === feature.id
                      ? "text-purple-400 translate-x-1"
                      : "text-gray-500"
                  )} />
                </div>
                
                {selectedFeature === feature.id && (
                  <motion.div
                    layoutId="feature-indicator"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-400 to-blue-400 rounded-full"
                  />
                )}
              </motion.div>
            ))}
          </div>

          {/* Feature preview */}
          <motion.div
            key={selectedFeature}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className={cn(
              "relative rounded-3xl bg-gradient-to-br p-8 h-96 overflow-hidden",
              selectedFeatureData.color
            )}>
              <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm rounded-3xl" />
              <div className="relative z-10 h-full flex items-center justify-center">
                {selectedFeatureData.preview}
              </div>
              
              {/* Decorative elements */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="absolute -top-4 -right-4 w-24 h-24 bg-purple-500/20 rounded-full blur-2xl"
              />
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 }}
                className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl"
              />
            </div>

            {/* Feature badges */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-2 mt-4 justify-center"
            >
              {["高速", "安全", "使いやすい"].map((badge) => (
                <span
                  key={badge}
                  className="px-3 py-1 bg-slate-800/80 backdrop-blur-sm shadow-sm rounded-full text-sm font-medium text-gray-300 border border-purple-500/20"
                >
                  {badge}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Additional features grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-20 grid md:grid-cols-3 gap-6"
        >
          {[
            { icon: Shield, title: "プライバシー保護", desc: "データは完全に暗号化" },
            { icon: Zap, title: "超高速", desc: "瞬時にコンテンツを配信" },
            { icon: Settings, title: "カスタマイズ可能", desc: "細かい設定で最適化" },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-sm hover:shadow-md transition-all border border-purple-500/10 hover:border-purple-500/30"
            >
              <item.icon className="w-10 h-10 text-purple-400 mb-4" />
              <h4 className="font-semibold mb-2 text-gray-100">{item.title}</h4>
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}