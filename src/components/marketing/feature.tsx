"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Sparkles, TrendingUp, Clock, Target, Shield, Zap, Globe, Heart } from "lucide-react";
import Image from "next/image";

const features = [
  {
    icon: Sparkles,
    title: "AI駆動の発見体験",
    description: "最先端の機械学習があなたの好みを深く理解します",
    gradient: "from-purple-500 to-pink-500",
    size: "large",
    image: "/images/feature-ai.svg",
  },
  {
    icon: TrendingUp,
    title: "リアルタイムトレンド",
    description: "瞬時のトレンド分析で一歩先を行く",
    gradient: "from-blue-500 to-cyan-500",
    size: "small",
    image: "/images/feature-trends.svg",
  },
  {
    icon: Clock,
    title: "24時間365日更新",
    description: "毎時間フレッシュなコンテンツをお届け",
    gradient: "from-green-500 to-emerald-500",
    size: "small",
  },
  {
    icon: Target,
    title: "精密マッチング",
    description: "あなたの興味にぴったり合うコンテンツを提供",
    gradient: "from-orange-500 to-red-500",
    size: "medium",
  },
  {
    icon: Shield,
    title: "プライバシー優先",
    description: "あなたのデータは安全かつプライベートに保護",
    gradient: "from-slate-500 to-slate-700",
    size: "small",
    image: "/images/feature-privacy.svg",
  },
  {
    icon: Globe,
    title: "グローバルコンテンツ",
    description: "世界中から厳選された動画を発見",
    gradient: "from-indigo-500 to-purple-500",
    size: "medium",
  },
];

export default function Feature() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section className="py-32 bg-gradient-to-b from-white to-slate-50 overflow-hidden">
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-4"
          >
            <Zap className="w-4 h-4" />
            <span>重要な機能</span>
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              必要なものすべて
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            動画発見体験を向上させる強力な機能群
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {features.map((feature, index) => {
            const colSpan = feature.size === "large" ? "md:col-span-2" : 
                           feature.size === "medium" ? "md:col-span-1 lg:col-span-2" : 
                           "md:col-span-1";
            const rowSpan = feature.size === "large" ? "md:row-span-2" : "md:row-span-1";
            
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                className={`${colSpan} ${rowSpan}`}
              >
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative h-full p-8 rounded-3xl bg-white border border-slate-200 shadow-lg hover:shadow-2xl transition-shadow group overflow-hidden"
                >
                  {/* Background Gradient */}
                  <div 
                    className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity bg-gradient-to-br ${feature.gradient}`}
                  />
                  
                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${feature.gradient} mb-6`}
                  >
                    <feature.icon className="w-6 h-6 text-white" />
                  </motion.div>
                  
                  {/* Content */}
                  <h3 className="text-2xl font-bold mb-3 text-slate-900">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    {feature.description}
                  </p>
                  
                  {/* Feature Image */}
                  {feature.image && feature.size === "large" && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 }}
                      className="relative mt-6 rounded-xl overflow-hidden"
                    >
                      <Image
                        src={feature.image}
                        alt={feature.title}
                        width={400}
                        height={200}
                        className="w-full h-auto"
                      />
                    </motion.div>
                  )}
                  
                  {/* Decorative Element */}
                  <motion.div
                    className={`absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br ${feature.gradient} opacity-10 blur-3xl`}
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Interactive Demo */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-20 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white font-semibold rounded-2xl shadow-xl hover:bg-purple-700 transition-colors cursor-pointer group">
            <Heart className="w-5 h-5 group-hover:animate-pulse" />
            <span>実際に体験する</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}