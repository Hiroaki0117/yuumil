"use client"
import Link from "next/link";
import { motion } from 'framer-motion';
import Image from "next/image";
import { SignInButton } from "@clerk/nextjs";

export default function Hero() {
    return (
        <section suppressHydrationWarning className="relative py-24 lg:py-32 overflow-hidden bg-[#18192a] w-full">
            {/* 背景グラデーション＋赤系グロー */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#ff4dcc33] via-[#1a1b2b] to-[#0e0f1a] opacity-90 w-full" />
                {/* 赤いグロー */}
                <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[40vw] bg-[#ff4dcc33] rounded-full blur-3xl opacity-60 pointer-events-none" />
                {/* ノイズテクスチャ */}
                <div className="absolute inset-0 mix-blend-soft-light opacity-30 w-full" style={{backgroundImage:'url(/images/noise.png)'}} />
            </div>
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center w-full px-6 max-w-7xl mx-auto gap-12">
                <div className="space-y-8 w-full lg:w-1/2">
                    <h1 className="text-4xl lg:text-5xl font-extrabold text-white drop-shadow-[0_2px_16px_rgba(255,77,204,0.4)] [text-shadow:_0_0_20px_rgba(255,255,255,0.8)]">
                        見逃さない、<span className="text-cyan-300 font-extrabold">新着・急上昇動画</span>
                    </h1>
                    <p className="text-lg text-white/95 font-medium drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)]">
                        あなたの好みの
                        <strong className="text-cyan-300 font-bold">24時間以内の動画</strong>
                        と<strong className="text-[#ff4dcc] font-bold">トレンド</strong>
                        をキャッチ
                    </p>
                    <div className="flex gap-4">
                        <SignInButton mode="modal">
                            <button className="relative px-8 py-3 bg-gradient-to-r from-red-500 via-[#ff4dcc] to-cyan-500 text-white font-semibold rounded-lg shadow-lg transition-all
                                before:content-[''] before:absolute before:inset-0 before:rounded-lg before:bg-[radial-gradient(circle_at_60%_40%,rgba(255,77,204,0.4)_0%,transparent_70%)] before:opacity-60 before:pointer-events-none
                                hover:shadow-[0_0_32px_8px_rgba(255,77,204,0.4)]">
                                今すぐ始める
                            </button>
                        </SignInButton>
                        <button className="px-8 py-3 border border-cyan-400 text-cyan-300 font-semibold rounded-lg hover:bg-cyan-500/10 transition-all shadow-md">
                            詳細を見る
                        </button>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: .6 }}
                    className="relative h-64 lg:h-80 w-full lg:w-1/2 flex items-center justify-center group"
                >
                    {/* 近未来的な画像コンテナ */}
                    <div className="relative w-full h-full neon-border rounded-xl overflow-hidden">
                        {/* 背景グロー効果 */}
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-cyan-500/20 to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                        
                        {/* メイン画像 */}
                        <Image
                            src="/images/landing-hero-mosaic.jpg"
                            alt="Video mosaic"
                            fill
                            priority
                            className="object-cover rounded-xl shadow-2xl transition-transform duration-500 group-hover:scale-105"
                        />
                        
                        {/* ホログラフィック枠 */}
                        <div className="absolute inset-0 holographic-border rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                        
                        {/* シマー効果 */}
                        <div className="absolute inset-0 overflow-hidden rounded-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500">
                          <div className="shimmer absolute inset-0"></div>
                        </div>
                        
                        {/* パルスドット装飾 */}
                        <div className="absolute top-4 right-4 flex gap-2">
                          <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full pulse-neon"></div>
                          <div className="w-3 h-3 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full pulse-neon [animation-delay:0.5s]"></div>
                        </div>
                    </div>
                    
                    {/* 更新されたバッジ */}
                    <span className="absolute top-4 left-4 glass-morphism bg-gradient-to-r from-red-500 to-purple-500 text-white text-sm px-3 py-1 rounded-full font-medium neon-glow floating-animation">
                        #1 NEW
                    </span>
                </motion.div>
            </div>
        </section>
    );
}