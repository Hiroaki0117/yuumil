"use client";

import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, Play, Sparkles, Zap, Globe, TrendingUp, Users, Star, Rocket, Activity } from "lucide-react";
import { useRef, useState, useEffect } from "react";

export function HeroEnhanced() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentWord, setCurrentWord] = useState(0);
  const words = ["発見", "体験", "楽しむ", "つながる"];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <section ref={containerRef} className="relative min-h-screen overflow-hidden">
      {/* Dynamic gradient background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.3), transparent 50%)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900" />
        
        {/* Animated particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-purple-400/40 rounded-full blur-sm"
            initial={{ x: `${(i * 5) % 100}%`, y: -10 }}
            animate={{
              y: "110vh",
              x: `${((i * 7) + 10) % 100}%`,
            }}
            transition={{
              duration: 10 + (i % 5) * 2,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 container mx-auto px-4 pt-32 pb-20"
      >
        {/* Top badges */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap gap-3 justify-center mb-8"
        >
          <div className="flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 text-purple-300 rounded-full text-sm font-medium backdrop-blur-sm">
            <Sparkles className="w-4 h-4" />
            AI駆動のレコメンド
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 text-blue-300 rounded-full text-sm font-medium backdrop-blur-sm">
            <Zap className="w-4 h-4" />
            リアルタイム更新
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 rounded-full text-sm font-medium backdrop-blur-sm">
            <Globe className="w-4 h-4" />
            グローバルトレンド
          </div>
        </motion.div>

        {/* Main heading with dynamic word change */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-6xl md:text-8xl font-bold text-center mb-6"
        >
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            動画を
          </span>
          <motion.span
            key={currentWord}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="inline-block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
          >
            {words[currentWord]}
          </motion.span>
        </motion.h1>

        {/* Subheading */}
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-xl md:text-2xl text-gray-300 text-center max-w-3xl mx-auto mb-12"
        >
          AIが、あなたの興味に基づいて世界中から最適な動画をキュレート。
          <br />
          毎日新しい発見があなたを待っています。
        </motion.p>

        {/* CTA buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <SignInButton mode="modal">
            <Button size="lg" className="group relative overflow-hidden px-8 py-6 text-lg bg-gradient-to-r from-purple-600 to-blue-600 border-0 text-white hover:from-purple-700 hover:to-blue-700">
              <span className="relative z-10 flex items-center gap-2">
                今すぐ始める
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-700"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </Button>
          </SignInButton>
          
          <Button 
            variant="outline" 
            size="lg" 
            className="group px-8 py-6 text-lg border-2 border-gray-600 text-gray-300 hover:border-purple-500 hover:text-white bg-white/5 backdrop-blur-sm"
          >
            <Play className="w-5 h-5 mr-2" />
            デモを見る
            <div className="ml-2 flex gap-0.5">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 h-1 bg-purple-400 rounded-full"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ delay: i * 0.2, repeat: Infinity, duration: 1.5 }}
                />
              ))}
            </div>
          </Button>
        </motion.div>

        {/* Stats row */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
        >
          {[
            { icon: Users, value: "50K+", label: "アクティブユーザー" },
            { icon: Play, value: "10M+", label: "視聴された動画" },
            { icon: TrendingUp, value: "98%", label: "満足度" },
            { icon: Star, value: "4.9", label: "平均評価" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1, type: "spring" }}
                className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-purple-600/20 to-blue-600/20 border border-purple-500/20 rounded-2xl flex items-center justify-center backdrop-blur-sm"
              >
                <stat.icon className="w-8 h-8 text-purple-400" />
              </motion.div>
              <div className="text-3xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Interactive video preview */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-6xl px-4"
      >
        <div className="relative rounded-t-3xl bg-gradient-to-br from-purple-900/50 to-blue-900/50 p-1 shadow-2xl backdrop-blur-sm">
          <div className="relative rounded-t-3xl bg-slate-900/80 overflow-hidden backdrop-blur-sm">
            <div className="aspect-video bg-gradient-to-br from-slate-900 to-purple-900/30 relative">
              {/* Placeholder for video preview */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center shadow-2xl cursor-pointer group"
                >
                  <Play className="w-8 h-8 text-white ml-1 group-hover:scale-110 transition-transform" />
                </motion.div>
              </div>
              
              {/* Floating UI elements */}
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1 }}
                className="absolute top-4 left-4 bg-slate-900/80 border border-purple-500/20 rounded-xl shadow-lg p-3 backdrop-blur-sm"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full" />
                  <div>
                    <div className="text-sm font-semibold text-white">トレンド動画</div>
                    <div className="text-xs text-gray-400">視聴中...</div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="absolute bottom-4 right-4 bg-slate-900/80 border border-purple-500/20 rounded-xl shadow-lg p-3 backdrop-blur-sm"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-400" />
                  <span className="text-sm font-semibold text-white">あなたへのおすすめ</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}