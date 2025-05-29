"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Check, X, Zap, Crown, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";
import { cn } from "@/lib/utils";

interface PricingTier {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  currency: string;
  period: string;
  features: { text: string; included: boolean }[];
  highlighted?: boolean;
  badge?: string;
  icon: React.ElementType;
  color: string;
}

const pricingTiers: PricingTier[] = [
  {
    id: "free",
    name: "無料プラン",
    description: "まずは無料で始めてみましょう",
    price: 0,
    currency: "¥",
    period: "月",
    icon: Star,
    color: "from-gray-400 to-gray-600",
    features: [
      { text: "基本的な動画レコメンド", included: true },
      { text: "1日50本まで視聴可能", included: true },
      { text: "標準画質での視聴", included: true },
      { text: "基本的なフィルター機能", included: true },
      { text: "24時間ニュースフィード", included: false },
      { text: "高度なAIレコメンド", included: false },
      { text: "広告なし視聴", included: false },
      { text: "優先サポート", included: false },
    ],
  },
  {
    id: "pro",
    name: "プロプラン",
    description: "すべての機能を無制限で利用",
    price: 980,
    originalPrice: 1480,
    currency: "¥",
    period: "月",
    icon: Zap,
    color: "from-blue-500 to-purple-600",
    highlighted: true,
    badge: "人気No.1",
    features: [
      { text: "高度なAIレコメンド", included: true },
      { text: "無制限視聴", included: true },
      { text: "4K高画質対応", included: true },
      { text: "すべてのフィルター機能", included: true },
      { text: "24時間ニュースフィード", included: true },
      { text: "トレンド分析ツール", included: true },
      { text: "広告なし視聴", included: true },
      { text: "優先サポート", included: true },
    ],
  },
  {
    id: "enterprise",
    name: "エンタープライズ",
    description: "チーム・企業向けの特別プラン",
    price: 4980,
    currency: "¥",
    period: "月",
    icon: Crown,
    color: "from-purple-600 to-pink-600",
    features: [
      { text: "プロプランの全機能", included: true },
      { text: "チーム共有機能", included: true },
      { text: "API アクセス", included: true },
      { text: "カスタムレポート", included: true },
      { text: "専任サポート", included: true },
      { text: "SLA 保証", included: true },
      { text: "カスタマイズ可能", included: true },
      { text: "セキュリティ強化", included: true },
    ],
  },
];

export function PricingSection() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const discount = billingPeriod === "yearly" ? 0.8 : 1; // 20% off for yearly

  return (
    <section ref={containerRef} className="py-24 bg-gradient-to-b from-slate-900 to-slate-900 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-400 rounded-full text-sm font-medium mb-4 border border-green-500/20">
            <Zap className="w-4 h-4" />
            料金プラン
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              あなたに最適な
            </span>
            プランを選択
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            すべてのプランで7日間の無料トライアルをご利用いただけます
          </p>

          {/* Billing toggle */}
          <div className="flex items-center justify-center gap-4">
            <span className={cn(
              "text-lg font-medium transition-colors",
              billingPeriod === "monthly" ? "text-white" : "text-gray-500"
            )}>
              月額
            </span>
            <button
              onClick={() => setBillingPeriod(billingPeriod === "monthly" ? "yearly" : "monthly")}
              className="relative w-16 h-8 bg-slate-700 rounded-full transition-colors border border-slate-600"
            >
              <motion.div
                animate={{ x: billingPeriod === "monthly" ? 0 : 32 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="absolute top-1 left-1 w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full shadow-md"
              />
            </button>
            <span className={cn(
              "text-lg font-medium transition-colors",
              billingPeriod === "yearly" ? "text-white" : "text-gray-500"
            )}>
              年額
              <span className="ml-2 text-sm text-green-400 font-semibold">20%オフ</span>
            </span>
          </div>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "relative rounded-3xl p-8 transition-all duration-300",
                tier.highlighted
                  ? "bg-gradient-to-br from-blue-600/20 to-purple-600/20 text-white shadow-2xl scale-105 border border-blue-500/40 backdrop-blur-xl"
                  : "bg-slate-800/50 border border-slate-700 hover:shadow-xl hover:shadow-purple-500/10 backdrop-blur-xl"
              )}
            >
              {/* Badge */}
              {tier.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-gradient-to-r from-orange-400 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                    {tier.badge}
                  </div>
                </div>
              )}

              {/* Icon */}
              <div className={cn(
                "w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center mb-6",
                tier.highlighted ? "from-white/20 to-white/10" : tier.color
              )}>
                <tier.icon className={cn(
                  "w-8 h-8",
                  tier.highlighted ? "text-white" : "text-white"
                )} />
              </div>

              {/* Tier info */}
              <h3 className="text-2xl font-bold mb-2 text-white">{tier.name}</h3>
              <p className={cn(
                "text-sm mb-6",
                tier.highlighted ? "text-gray-300" : "text-gray-400"
              )}>
                {tier.description}
              </p>

              {/* Price */}
              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-sm text-gray-400">{tier.currency}</span>
                  <span className="text-4xl font-bold text-white">
                    {Math.floor(tier.price * discount).toLocaleString()}
                  </span>
                  <span className={cn(
                    "text-sm",
                    tier.highlighted ? "text-gray-300" : "text-gray-400"
                  )}>
                    /{tier.period}
                  </span>
                </div>
                {tier.originalPrice && (
                  <div className="mt-1">
                    <span className={cn(
                      "text-sm line-through",
                      tier.highlighted ? "text-gray-500" : "text-gray-600"
                    )}>
                      {tier.currency}{tier.originalPrice.toLocaleString()}
                    </span>
                    <span className="ml-2 text-sm text-green-400 font-semibold">
                      {Math.round((1 - tier.price / tier.originalPrice) * 100)}%オフ
                    </span>
                  </div>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    {feature.included ? (
                      <Check className={cn(
                        "w-5 h-5 mt-0.5 flex-shrink-0",
                        tier.highlighted ? "text-green-400" : "text-green-400"
                      )} />
                    ) : (
                      <X className={cn(
                        "w-5 h-5 mt-0.5 flex-shrink-0",
                        tier.highlighted ? "text-gray-600" : "text-gray-600"
                      )} />
                    )}
                    <span className={cn(
                      "text-sm",
                      feature.included
                        ? tier.highlighted ? "text-gray-100" : "text-gray-300"
                        : tier.highlighted ? "text-gray-600" : "text-gray-500"
                    )}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <SignInButton mode="modal">
                <Button
                  size="lg"
                  className={cn(
                    "w-full group",
                    tier.highlighted
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 border-0"
                      : "bg-slate-700 text-white hover:bg-slate-600 border border-slate-600"
                  )}
                >
                  <span className="flex items-center justify-center gap-2">
                    今すぐ始める
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </SignInButton>
            </motion.div>
          ))}
        </div>

        {/* Additional info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400 mb-4">
            すべてのプランに含まれる機能：
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {["SSL暗号化", "99.9%稼働保証", "日本語サポート", "いつでも解約可能"].map((feature) => (
              <div key={feature} className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-400" />
                <span className="text-sm text-gray-300">{feature}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}