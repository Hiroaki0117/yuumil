"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Star, Quote, ChevronLeft, ChevronRight, Play, Heart, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
  videoCount: number;
  favoriteGenre: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "田中さくら",
    role: "コンテンツクリエイター",
    avatar: "👩‍🎨",
    content: "Yuumilのおかげで、世界中の素晴らしいクリエイターの作品に出会えました。AIのレコメンドが本当に的確で、毎日新しい発見があります。",
    rating: 5,
    videoCount: 1234,
    favoriteGenre: "アート・デザイン",
  },
  {
    id: 2,
    name: "山田太郎",
    role: "ビジネスオーナー",
    avatar: "👨‍💼",
    content: "ビジネストレンドを追うのに最適です。24時間ニュースフィードで、グローバルな動向を見逃すことがなくなりました。",
    rating: 5,
    videoCount: 856,
    favoriteGenre: "ビジネス・経済",
  },
  {
    id: 3,
    name: "佐藤みき",
    role: "大学生",
    avatar: "👩‍🎓",
    content: "勉強の合間に見る動画も、Yuumilなら時間の無駄になりません。興味のある分野の動画だけが表示されるので、効率的に情報収集できます。",
    rating: 5,
    videoCount: 2341,
    favoriteGenre: "教育・学習",
  },
  {
    id: 4,
    name: "鈴木健二",
    role: "フリーランサー",
    avatar: "👨‍💻",
    content: "プログラミングやテック系の最新動画を見逃さずチェックできます。トレンド分析機能で、次に学ぶべき技術も分かります。",
    rating: 5,
    videoCount: 1789,
    favoriteGenre: "テクノロジー",
  },
  {
    id: 5,
    name: "高橋ゆり",
    role: "主婦",
    avatar: "👩‍🍳",
    content: "料理動画から育児情報まで、私の生活に必要な動画が全て揃っています。パーソナライズ機能が素晴らしい！",
    rating: 5,
    videoCount: 945,
    favoriteGenre: "ライフスタイル",
  },
];

export function TestimonialsEnhanced() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section ref={containerRef} className="py-24 bg-slate-900 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-900/20 text-purple-400 border border-purple-800/50 rounded-full text-sm font-medium mb-4">
            <Heart className="w-4 h-4" />
            ユーザーの声
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              50,000人以上
            </span>
            が愛用中
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            世界中のユーザーから高い評価をいただいています
          </p>
        </motion.div>

        {/* Main testimonial carousel */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                className="bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-3xl shadow-xl p-8 md:p-12"
              >
                {/* Quote icon */}
                <Quote className="w-12 h-12 text-purple-400/30 mb-6" />
                
                {/* Content */}
                <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-8">
                  {testimonials[currentIndex].content}
                </p>

                {/* User info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{testimonials[currentIndex].avatar}</div>
                    <div>
                      <h4 className="font-semibold text-lg text-white">{testimonials[currentIndex].name}</h4>
                      <p className="text-gray-400">{testimonials[currentIndex].role}</p>
                    </div>
                  </div>
                  
                  {/* Stats */}
                  <div className="hidden md:flex items-center gap-6">
                    <div className="text-center">
                      <div className="flex items-center gap-1 text-yellow-500 mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                      <p className="text-sm text-gray-400">評価</p>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-lg text-white">{testimonials[currentIndex].videoCount}</p>
                      <p className="text-sm text-gray-400">視聴動画数</p>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-lg text-white">{testimonials[currentIndex].favoriteGenre}</p>
                      <p className="text-sm text-gray-400">お気に入り</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation buttons */}
            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 w-12 h-12 bg-slate-800 border border-slate-700 rounded-full shadow-md flex items-center justify-center hover:bg-slate-700 transition-all"
            >
              <ChevronLeft className="w-6 h-6 text-gray-400" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 w-12 h-12 bg-slate-800 border border-slate-700 rounded-full shadow-md flex items-center justify-center hover:bg-slate-700 transition-all"
            >
              <ChevronRight className="w-6 h-6 text-gray-400" />
            </button>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all",
                  currentIndex === index
                    ? "w-8 bg-purple-500"
                    : "bg-gray-600 hover:bg-gray-500"
                )}
              />
            ))}
          </div>
        </div>

        {/* Video testimonials grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {[...Array(3)].map((_, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className="relative group cursor-pointer"
            >
              <div className="aspect-video bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-800/30 rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-16 h-16 bg-slate-800/90 border border-slate-700 rounded-full flex items-center justify-center shadow-lg"
                  >
                    <Play className="w-6 h-6 text-purple-400 ml-1" />
                  </motion.div>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white font-semibold">ユーザーインタビュー #{index + 1}</p>
                  <p className="text-white/80 text-sm">2:45</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Social proof stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-20 bg-gradient-to-r from-purple-900/40 to-pink-900/40 border border-purple-800/50 backdrop-blur-sm rounded-3xl p-8 md:p-12"
        >
          <div className="grid md:grid-cols-4 gap-8 text-white text-center">
            {[
              { value: "4.9/5", label: "平均評価", icon: Star },
              { value: "50K+", label: "アクティブユーザー", icon: Heart },
              { value: "10M+", label: "月間視聴数", icon: Play },
              { value: "98%", label: "満足度", icon: MessageCircle },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ delay: 0.8 + index * 0.1, type: "spring" }}
              >
                <stat.icon className="w-8 h-8 mx-auto mb-3 opacity-80" />
                <div className="text-3xl md:text-4xl font-bold mb-1">{stat.value}</div>
                <div className="text-white/80">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}