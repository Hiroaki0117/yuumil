"use client";

import { useState, useEffect } from "react";
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

interface Particle {
  id: number;
  left: number;
  top: number;
  duration: number;
  delay: number;
}

export default function Footer() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // クライアントサイドでのみパーティクルを生成
    const generatedParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 5,
    }));
    
    setParticles(generatedParticles);
  }, []);
  return (
    <footer className="relative bg-gradient-to-b from-background to-background text-foreground overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--color-neon-purple)/0.2)] via-transparent to-[hsl(var(--color-neon-pink)/0.2)]" />
        
        {/* Floating particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-[hsl(var(--color-neon-purple)/0.3)] rounded-full"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
            animate={{
              y: [-20, -40, -20],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
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
                  <div className="absolute inset-0 bg-gradient-to-r from-neon-purple to-neon-pink rounded-full blur-lg opacity-50" />
                  <div className="relative w-12 h-12 bg-gradient-to-r from-neon-purple to-neon-pink rounded-full flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                </motion.div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
                  Yuumil
                </h3>
              </div>
              <p className="text-muted-foreground mb-6 max-w-md">
                AIが導く、新しい動画発見の形。
                あなたの興味を深く理解し、世界中から最高のコンテンツをお届けします。
              </p>
              
              {/* Newsletter */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold mb-3 text-foreground/80">
                  最新情報を受け取る
                </h4>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="メールアドレス"
                    className="flex-1 px-4 py-3 rounded-xl bg-card/10 border border-border/20 text-foreground placeholder-muted-foreground focus:outline-none focus:border-neon-purple transition-colors"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-gradient-to-r from-neon-purple to-neon-pink rounded-xl font-medium hover:shadow-lg transition-shadow"
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
                    className="w-10 h-10 bg-card/10 rounded-full flex items-center justify-center hover:bg-card/20 transition-colors"
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
                <h4 className="font-semibold mb-4 text-foreground/90">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-muted-foreground hover:text-foreground transition-colors text-sm"
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
          className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 border-t border-border/10 mb-8"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[hsl(var(--color-neon-purple)/0.2)] rounded-full flex items-center justify-center">
              <Mail className="w-5 h-5 text-neon-purple" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">メール</p>
              <p className="text-foreground/90">support@yuumil.app</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[hsl(var(--color-neon-pink)/0.2)] rounded-full flex items-center justify-center">
              <Phone className="w-5 h-5 text-neon-pink" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">電話</p>
              <p className="text-foreground/90">03-1234-5678</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[hsl(var(--color-neon-blue)/0.2)] rounded-full flex items-center justify-center">
              <MapPin className="w-5 h-5 text-neon-blue" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">住所</p>
              <p className="text-foreground/90">東京都渋谷区</p>
            </div>
          </div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border/10"
        >
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <span className="text-muted-foreground text-sm">
              © 2024 Yuumil. All rights reserved.
            </span>
            <span className="text-muted-foreground/60">•</span>
            <span className="text-muted-foreground text-sm flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-[hsl(var(--destructive))] fill-[hsl(var(--destructive))]" /> in Tokyo
            </span>
          </div>
          
          <motion.div
            className="flex items-center gap-2 text-sm text-muted-foreground"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Zap className="w-4 h-4 text-electric-yellow" />
            <span>サーバー稼働中</span>
            <div className="w-2 h-2 bg-cyber-green rounded-full animate-pulse" />
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}