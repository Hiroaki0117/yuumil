"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Twitter, 
  Instagram, 
  Youtube, 
  Github, 
  Mail, 
  MapPin, 
  Phone,
  Sparkles,
  Heart,
  Zap
} from "lucide-react";

const footerLinks = {
  product: {
    title: "プロダクト",
    links: [
      { name: "機能", href: "#features" },
      { name: "料金プラン", href: "#pricing" },
      { name: "よくある質問", href: "#faq" },
      { name: "ロードマップ", href: "#" },
    ],
  },
  company: {
    title: "会社情報",
    links: [
      { name: "私たちについて", href: "#" },
      { name: "ブログ", href: "#" },
      { name: "採用情報", href: "#" },
      { name: "お問い合わせ", href: "#" },
    ],
  },
  resources: {
    title: "リソース",
    links: [
      { name: "ドキュメント", href: "#" },
      { name: "APIリファレンス", href: "#" },
      { name: "コミュニティ", href: "#" },
      { name: "サポート", href: "#" },
    ],
  },
  legal: {
    title: "法的情報",
    links: [
      { name: "利用規約", href: "#" },
      { name: "プライバシーポリシー", href: "#" },
      { name: "特定商取引法", href: "#" },
      { name: "Cookie設定", href: "#" },
    ],
  },
};

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "YouTube" },
  { icon: Github, href: "#", label: "GitHub" },
];

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-slate-900 to-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-pink-900/20" />
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, -40, -20],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="relative container mx-auto px-4 pt-20 pb-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-lg opacity-50" />
                  <div className="relative w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                </motion.div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Yuumil
                </h3>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                AIが導く、新しい動画発見の形。
                あなたの興味を深く理解し、世界中から最高のコンテンツをお届けします。
              </p>
              
              {/* Newsletter */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold mb-3 text-gray-300">
                  最新情報を受け取る
                </h4>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="メールアドレス"
                    className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-medium hover:shadow-lg transition-shadow"
                  >
                    登録
                  </motion.button>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Links Sections */}
          <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-8">
            {Object.entries(footerLinks).map(([key, section], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <h4 className="font-semibold mb-4 text-gray-200">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors text-sm"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 border-t border-white/10 mb-8"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-600/20 rounded-full flex items-center justify-center">
              <Mail className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">メール</p>
              <p className="text-gray-200">support@yuumil.app</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-pink-600/20 rounded-full flex items-center justify-center">
              <Phone className="w-5 h-5 text-pink-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">電話</p>
              <p className="text-gray-200">03-1234-5678</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600/20 rounded-full flex items-center justify-center">
              <MapPin className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">住所</p>
              <p className="text-gray-200">東京都渋谷区</p>
            </div>
          </div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10"
        >
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <span className="text-gray-400 text-sm">
              © 2024 Yuumil. All rights reserved.
            </span>
            <span className="text-gray-600">•</span>
            <span className="text-gray-400 text-sm flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> in Tokyo
            </span>
          </div>
          
          <motion.div
            className="flex items-center gap-2 text-sm text-gray-400"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Zap className="w-4 h-4 text-yellow-400" />
            <span>サーバー稼働中</span>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}