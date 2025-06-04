"use client";

import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { 
  TrendingUp, Users, Globe, PlayCircle, 
  Clock, Award, Shield, Zap,
  BarChart3, Activity
} from "lucide-react";

interface Stat {
  value: number;
  suffix: string;
  label: string;
  icon: React.ElementType;
  color: string;
  description: string;
}

const stats: Stat[] = [
  {
    value: 50000,
    suffix: "+",
    label: "アクティブユーザー",
    icon: Users,
    color: "from-blue-500 to-cyan-500",
    description: "世界中で利用されています",
  },
  {
    value: 10,
    suffix: "M+",
    label: "月間視聴数",
    icon: PlayCircle,
    color: "from-purple-500 to-pink-500",
    description: "毎月の動画視聴回数",
  },
  {
    value: 98,
    suffix: "%",
    label: "ユーザー満足度",
    icon: Award,
    color: "from-green-500 to-emerald-500",
    description: "高い評価をいただいています",
  },
  {
    value: 150,
    suffix: "+",
    label: "対応国・地域",
    icon: Globe,
    color: "from-orange-500 to-red-500",
    description: "グローバルに展開中",
  },
];

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const springValue = useSpring(0, {
    damping: 30,
    stiffness: 100,
  });

  const displayValue = useTransform(springValue, (latest) =>
    Math.floor(latest).toLocaleString()
  );

  useEffect(() => {
    if (isInView && !hasAnimated) {
      springValue.set(value);
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated, springValue, value]);

  return (
    <span ref={ref}>
      <motion.span>{displayValue}</motion.span>
      {suffix}
    </span>
  );
}

export function StatsShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section ref={containerRef} className="py-24 bg-gradient-to-b from-slate-900 to-slate-900 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-full text-sm font-medium mb-4">
            <BarChart3 className="w-4 h-4" />
            実績
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white font-extrabold">
              数字で見る
            </span>
            Yuumil
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            私たちのプラットフォームが達成してきた成果をご覧ください
          </p>
        </motion.div>

        {/* Main stats grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="relative group"
            >
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all">
                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                
                {/* Value */}
                <div className="text-3xl md:text-4xl font-bold mb-2 text-white">
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                </div>
                
                {/* Label */}
                <h3 className="text-lg font-semibold text-white mb-1">{stat.label}</h3>
                
                {/* Description */}
                <p className="text-sm text-gray-400">{stat.description}</p>
                
                {/* Decorative element */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  className={`absolute -top-2 -right-2 w-24 h-24 bg-gradient-to-br ${stat.color} rounded-full opacity-10 blur-2xl`}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Growth chart visualization */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 backdrop-blur-sm border border-indigo-500/30 rounded-3xl p-8 md:p-12 text-white"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                急成長を続けるプラットフォーム
              </h3>
              <p className="text-lg text-white/80 mb-6">
                2023年のサービス開始以来、ユーザー数は毎月平均30%の成長を続けています。
                AIテクノロジーの進化と共に、より良いサービスを提供し続けています。
              </p>
              
              <div className="space-y-4">
                {[
                  { label: "前年比ユーザー増加率", value: "+280%" },
                  { label: "AIレコメンド精度", value: "95.8%" },
                  { label: "平均セッション時間", value: "45分" },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ x: -20, opacity: 0 }}
                    animate={isInView ? { x: 0, opacity: 1 } : {}}
                    transition={{ delay: 0.7 + idx * 0.1 }}
                    className="flex items-center justify-between bg-white/10 backdrop-blur-sm rounded-xl p-4"
                  >
                    <span className="text-white/80">{item.label}</span>
                    <span className="font-semibold text-xl">{item.value}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Chart visualization */}
            <div className="relative h-80">
              <svg className="w-full h-full" viewBox="0 0 400 300">
                {/* Grid lines */}
                {[...Array(5)].map((_, i) => (
                  <line
                    key={i}
                    x1="0"
                    y1={60 + i * 60}
                    x2="400"
                    y2={60 + i * 60}
                    stroke="rgba(255,255,255,0.1)"
                    strokeDasharray="5,5"
                  />
                ))}
                
                {/* Growth curve */}
                <motion.path
                  d="M 20 280 Q 100 250 200 180 T 380 50"
                  stroke="rgba(255,255,255,0.8)"
                  strokeWidth="3"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : {}}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
                
                {/* Data points */}
                {[
                  { x: 20, y: 280 },
                  { x: 100, y: 250 },
                  { x: 200, y: 180 },
                  { x: 300, y: 120 },
                  { x: 380, y: 50 },
                ].map((point, idx) => (
                  <motion.circle
                    key={idx}
                    cx={point.x}
                    cy={point.y}
                    r="8"
                    fill="white"
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ delay: 0.5 + idx * 0.2, type: "spring" }}
                  />
                ))}
              </svg>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 1.5 }}
                className="absolute top-4 right-4 bg-slate-800/90 backdrop-blur-sm border border-slate-700/50 rounded-xl p-3 text-white"
              >
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-green-500" />
                  <span className="text-sm font-semibold">成長率 +30%/月</span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-20 text-center"
        >
          <h3 className="text-2xl font-bold mb-8 text-white">信頼される理由</h3>
          <div className="flex flex-wrap justify-center gap-8">
            {[
              { icon: Shield, label: "エンタープライズグレードセキュリティ" },
              { icon: Clock, label: "99.9%稼働率保証" },
              { icon: Zap, label: "50ms以下のレスポンスタイム" },
              { icon: TrendingUp, label: "継続的な機能アップデート" },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-full px-6 py-3"
              >
                <item.icon className="w-5 h-5 text-indigo-400" />
                <span className="text-sm font-medium text-gray-300">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}