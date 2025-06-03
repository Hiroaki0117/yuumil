"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star, TrendingUp, Users, Clock } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "10K+",
    label: "アクティブユーザー",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: TrendingUp,
    value: "500K+",
    label: "毎日分析される動画",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Star,
    value: "4.9/5",
    label: "ユーザー評価",
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    icon: Clock,
    value: "24/7",
    label: "リアルタイム更新",
    gradient: "from-green-500 to-emerald-500",
  },
];

const testimonials = [
  {
    content: "AIレコメンドが的確すぎる！普通なら見つけられなかった素晴らしいチャンネルをたくさん発見できました。",
    author: "佐藤 美咲",
    role: "コンテンツクリエイター",
    avatar: "佐藤",
  },
  {
    content: "やっと私の興味を理解してくれるプラットフォームに出会えました。パーソナライズされたフィードで検索時間が大幅に短縮されました。",
    author: "田中 健太",
    role: "ビデオエディター",
    avatar: "田中",
  },
  {
    content: "トレンド分析機能が素晴らしい！自分のニッチで何が人気なのかを先取りできるようになりました。",
    author: "山田 愛子",
    role: "マーケティングマネージャー",
    avatar: "山田",
  },
];

export default function SocialProof() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section className="py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-4"
          >
            <TrendingUp className="w-4 h-4" />
            <span>数千人に信頼される</span>
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              コミュニティに参加
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            なぜコンテンツクリエイターと視聴者がYuumilを愛するのか
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <motion.div
                whileHover={{ y: -5 }}
                className="relative p-6 rounded-3xl bg-gradient-to-br from-slate-50 to-white border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${stat.gradient} mb-4`}
                >
                  <stat.icon className="w-6 h-6 text-white" />
                </motion.div>
                
                {/* Value */}
                <motion.div
                  initial={{ scale: 0.5 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ delay: 0.4 + index * 0.1, type: "spring" }}
                  className="text-3xl font-bold text-slate-900 mb-1"
                >
                  {stat.value}
                </motion.div>
                
                {/* Label */}
                <div className="text-slate-600">
                  {stat.label}
                </div>
                
                {/* Decorative Element */}
                <div className={`absolute -top-10 -right-10 w-20 h-20 rounded-full bg-gradient-to-br ${stat.gradient} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity`} />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 + index * 0.1 }}
            >
              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                className="relative h-full p-8 rounded-3xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {/* Quote Mark */}
                <div className="absolute -top-4 -left-4 text-6xl text-purple-200 font-serif">
                  &ldquo;
                </div>
                
                {/* Content */}
                <p className="text-slate-700 mb-6 leading-relaxed relative z-10">
                  {testimonial.content}
                </p>
                
                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-slate-600">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
                
                {/* Star Rating */}
                <div className="absolute top-8 right-8 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1 }}
          className="mt-20 text-center"
        >
          <p className="text-sm text-slate-600 mb-6">大手コンテンツプラットフォームに信頼される</p>
          <div className="flex justify-center items-center gap-8 flex-wrap">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="relative w-32 h-12"
              >
                <div className="w-full h-full rounded-lg bg-gradient-to-r from-slate-100 to-slate-200 flex items-center justify-center">
                  <span className="text-slate-400 text-xs font-medium">Partner {i + 1}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}