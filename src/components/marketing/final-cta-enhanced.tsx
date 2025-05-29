"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Sparkles, Star, Zap, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";

export function FinalCTAEnhanced() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Animated shapes */}
        <motion.div
          style={{ y }}
          className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: useTransform(y, (value) => -value) }}
          className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"
        />
        
        {/* Floating particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/50 rounded-full"
            initial={{
              x: `${(i * 3.33) % 100}%`,
              y: `${(i * 3.33 + 20) % 100}%`,
            }}
            animate={{
              x: `${((i * 3.33) + 50) % 100}%`,
              y: `${((i * 3.33 + 20) + 50) % 100}%`,
            }}
            transition={{
              duration: 15 + (i % 3) * 5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      <motion.div style={{ opacity }} className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          {/* Limited time offer badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full font-semibold mb-8 border border-white/30"
          >
            <Gift className="w-5 h-5" />
            期間限定！今なら初月50%オフ
            <Sparkles className="w-5 h-5" />
          </motion.div>

          {/* Main heading */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            今すぐ始めよう
          </motion.h2>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-white/80 mb-12 leading-relaxed"
          >
            あなたの動画体験を次のレベルへ。
            <br />
            7日間の無料トライアルで、すべての機能をお試しください。
          </motion.p>

          {/* Feature pills */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {[
              "クレジットカード不要",
              "いつでも解約可能",
              "全機能利用可能",
              "24時間サポート",
            ].map((feature) => (
              <div
                key={feature}
                className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full"
              >
                <Star className="w-4 h-4" />
                <span>{feature}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <SignInButton mode="modal">
              <Button
                size="lg"
                className="group relative overflow-hidden bg-white text-gray-900 hover:bg-gray-100 px-8 py-6 text-lg shadow-2xl"
              >
                <span className="relative z-10 flex items-center gap-2 font-semibold">
                  無料で始める
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Button>
            </SignInButton>

            <Button
              variant="ghost"
              size="lg"
              className="text-white border-2 border-white/30 hover:bg-white/10 hover:border-white/50 px-8 py-6 text-lg backdrop-blur-sm"
            >
              プランを比較する
            </Button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-16 pt-16 border-t border-white/20"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: "50K+", label: "アクティブユーザー" },
                { value: "4.9★", label: "平均評価" },
                { value: "150+", label: "対応国" },
                { value: "24/7", label: "サポート" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1, type: "spring" }}
                >
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-white/60 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Urgency message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-12 inline-flex items-center gap-2 text-white/90 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20"
          >
            <Zap className="w-5 h-5 text-yellow-300" />
            <span className="text-sm font-medium">
              このオファーは残り72時間で終了します
            </span>
            <Zap className="w-5 h-5 text-yellow-300" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}