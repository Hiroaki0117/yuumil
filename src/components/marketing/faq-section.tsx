"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { HelpCircle, ChevronDown, MessageCircle, Mail, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const faqItems: FAQItem[] = [
  {
    id: "1",
    question: "Yuumilは他の動画プラットフォームとどう違いますか？",
    answer: "Yuumilは単なる動画視聴プラットフォームではありません。最先端のAI技術を使用して、あなたの興味や視聴履歴を分析し、世界中から最適なコンテンツをキュレートします。24時間更新されるニュースフィード、トレンド分析、そして完全にパーソナライズされた体験を提供します。",
    category: "一般",
  },
  {
    id: "2",
    question: "無料プランでも十分使えますか？",
    answer: "はい、無料プランでも基本的な機能は全てご利用いただけます。1日50本までの視聴制限がありますが、多くのユーザーにとって十分な量です。より高度なAIレコメンドや無制限視聴、広告なしの体験をご希望の場合は、プロプランへのアップグレードをおすすめします。",
    category: "料金",
  },
  {
    id: "3",
    question: "プライバシーはどのように保護されていますか？",
    answer: "ユーザーのプライバシー保護は最優先事項です。すべてのデータは最新の暗号化技術で保護され、第三者への販売や共有は一切行いません。視聴履歴や個人情報は厳重に管理され、いつでも削除リクエストが可能です。",
    category: "セキュリティ",
  },
  {
    id: "4",
    question: "どのようなデバイスで利用できますか？",
    answer: "Yuumilはマルチプラットフォーム対応です。PC（Windows/Mac）、スマートフォン（iOS/Android）、タブレット、スマートTVなど、あらゆるデバイスからアクセス可能です。アカウント一つで全てのデバイスで同期されます。",
    category: "技術",
  },
  {
    id: "5",
    question: "解約はいつでもできますか？",
    answer: "はい、いつでも解約可能です。解約手続きは設定画面から簡単に行えます。解約後も、その月の残り期間は引き続きサービスをご利用いただけます。再度登録される際は、以前の設定やお気に入りが保存されています。",
    category: "料金",
  },
  {
    id: "6",
    question: "AIレコメンドはどのように機能しますか？",
    answer: "私たちのAIは、視聴履歴、いいね、視聴時間、スキップパターンなど、様々な要素を分析します。機械学習アルゴリズムが継続的に学習し、あなたの好みをより深く理解していきます。使えば使うほど、レコメンドの精度が向上します。",
    category: "技術",
  },
  {
    id: "7",
    question: "コンテンツはどこから提供されていますか？",
    answer: "Yuumilは世界中の主要な動画プラットフォームと提携し、幅広いコンテンツを提供しています。ニュース、エンターテインメント、教育、ビジネスなど、あらゆるジャンルの高品質なコンテンツにアクセスできます。",
    category: "一般",
  },
  {
    id: "8",
    question: "サポートはどのように受けられますか？",
    answer: "24時間365日のカスタマーサポートを提供しています。アプリ内チャット、メール、電話でのサポートが利用可能です。プロプラン以上のユーザーには優先サポートが提供され、より迅速な対応を保証します。",
    category: "サポート",
  },
];

const categories = ["すべて", "一般", "料金", "技術", "セキュリティ", "サポート"];

export function FAQSection() {
  const [openItems, setOpenItems] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("すべて");
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const filteredItems = selectedCategory === "すべて"
    ? faqItems
    : faqItems.filter((item) => item.category === selectedCategory);

  return (
    <section ref={containerRef} className="py-24 bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 text-orange-400 rounded-full text-sm font-medium mb-4">
            <HelpCircle className="w-4 h-4" />
            よくある質問
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              疑問を解決
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Yuumilについてよくいただく質問をまとめました
          </p>
        </motion.div>

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all",
                selectedCategory === category
                  ? "bg-orange-600 text-white shadow-md"
                  : "bg-slate-800/50 text-gray-300 hover:bg-slate-700/50 border border-slate-700"
              )}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* FAQ items */}
        <div className="max-w-3xl mx-auto space-y-4">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + index * 0.05 }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 hover:border-slate-600 transition-all"
            >
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full px-6 py-4 flex items-center justify-between text-left"
              >
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white pr-4">
                    {item.question}
                  </h3>
                  <span className="text-sm text-gray-400 mt-1">{item.category}</span>
                </div>
                <motion.div
                  animate={{ rotate: openItems.includes(item.id) ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openItems.includes(item.id) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4">
                      <p className="text-gray-300 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Contact section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-20 bg-gradient-to-r from-orange-600/20 to-red-600/20 backdrop-blur-sm border border-orange-500/20 rounded-3xl p-8 md:p-12 text-white text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            まだ質問がありますか？
          </h3>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            私たちのサポートチームが、あなたの疑問にお答えします。
            お気軽にお問い合わせください。
          </p>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <a
              href="#"
              className="flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-xl px-6 py-3 hover:bg-white/30 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              <span>ライブチャット</span>
            </a>
            <a
              href="mailto:support@yuumil.com"
              className="flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-xl px-6 py-3 hover:bg-white/30 transition-colors"
            >
              <Mail className="w-5 h-5" />
              <span>support@yuumil.com</span>
            </a>
            <a
              href="tel:0120-123-456"
              className="flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-xl px-6 py-3 hover:bg-white/30 transition-colors"
            >
              <Phone className="w-5 h-5" />
              <span>0120-123-456</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}