"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu, Sparkles, TrendingUp, Users, Star, ArrowRight } from "lucide-react";
import Link from "next/link";
import { SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

const navigationItems = [
  { name: "機能", href: "#features", icon: Sparkles },
  { name: "料金", href: "#pricing", icon: Star },
  { name: "よくある質問", href: "#faq", icon: Users },
  { name: "お問い合わせ", href: "#contact", icon: TrendingUp },
];

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // フォーカストラップとESCキー対応
  useEffect(() => {
    if (!isOpen || !menuRef.current) return;

    const menu = menuRef.current;
    const focusableElements = menu.querySelectorAll(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    // 初期フォーカス
    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        openButtonRef.current?.focus();
      }

      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    menu.addEventListener('keydown', handleKeyDown);
    return () => menu.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const menuVariants = {
    closed: {
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  };

  const itemVariants = {
    closed: {
      x: 50,
      opacity: 0,
    },
    open: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    }),
  };

  return (
    <>
      {/* Hamburger Button */}
      <button
        ref={openButtonRef}
        onClick={() => setIsOpen(true)}
        className="lg:hidden p-2 rounded-lg glass-morphism hover:bg-card/20 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
        aria-label="メニューを開く"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
      >
        <Menu className="w-6 h-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
            />

            {/* Menu Panel */}
            <motion.div
              ref={menuRef}
              id="mobile-menu"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-0 right-0 h-full w-full max-w-sm bg-background border-l border-border z-50 lg:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="モバイルナビゲーションメニュー"
            >
              <div className="relative h-full flex flex-col">
                {/* Background Effects */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute top-20 -right-20 w-96 h-96 bg-[hsl(var(--color-neon-purple)/0.1)] rounded-full blur-3xl" />
                  <div className="absolute bottom-20 -left-20 w-96 h-96 bg-[hsl(var(--color-neon-blue)/0.1)] rounded-full blur-3xl" />
                </div>

                {/* Header */}
                <div className="relative flex items-center justify-between p-6 border-b border-border">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-gradient-to-r from-neon-purple to-neon-pink rounded-full flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
                      Yuumil
                    </span>
                  </div>
                  <button
                    ref={closeButtonRef}
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-lg glass-morphism hover:bg-card/20 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
                    aria-label="メニューを閉じる"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Navigation Items */}
                <nav className="relative flex-1 overflow-y-auto p-6">
                  <ul className="space-y-4">
                    {navigationItems.map((item, i) => (
                      <motion.li
                        key={item.name}
                        custom={i}
                        variants={itemVariants}
                        initial="closed"
                        animate="open"
                      >
                        <Link
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center gap-4 p-4 rounded-xl glass-morphism hover:bg-card/20 transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-primary/50"
                        >
                          <div className="w-10 h-10 bg-gradient-to-r from-neon-purple/20 to-neon-blue/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                            <item.icon className="w-5 h-5 text-neon-purple" />
                          </div>
                          <span className="text-lg font-medium">{item.name}</span>
                          <ArrowRight className="w-5 h-5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </nav>

                {/* CTA Section */}
                <div className="relative p-6 border-t border-border space-y-4">
                  <SignInButton mode="modal">
                    <Button 
                      className="w-full py-6 text-lg bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90 transition-opacity"
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="flex items-center gap-2">
                        今すぐ始める
                        <ArrowRight className="w-5 h-5" />
                      </span>
                    </Button>
                  </SignInButton>
                  
                  <div className="text-center text-sm text-muted-foreground">
                    <p>すでにアカウントをお持ちですか？</p>
                    <SignInButton mode="modal">
                      <button 
                        className="text-neon-purple hover:text-neon-blue transition-colors font-medium"
                        onClick={() => setIsOpen(false)}
                      >
                        ログイン
                      </button>
                    </SignInButton>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}