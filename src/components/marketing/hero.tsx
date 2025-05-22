"use client"
import Link from "next/link";
import { motion } from 'framer-motion';
import Image from "next/image";
import { SignInButton } from "@clerk/nextjs";

export default function Hero() {
    return (
        <section className="relative py-24 lg:py-32 overflow-hidden bg-[#18192a] w-full">
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
                    <h1 className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-white via-[#ff4dcc] to-cyan-300 bg-clip-text text-transparent drop-shadow-[0_2px_16px_rgba(255,77,204,0.15)]">
                        見逃さない、新着・急上昇動画
                    </h1>
                    <p className="text-lg bg-gradient-to-r from-white/80 via-[#ff4dcc99] to-cyan-200/80 bg-clip-text text-transparent">
                        あなたの好みの
                        <strong className="text-cyan-300/90">24時間以内の動画</strong>
                        と<strong className="text-mag-400">トレンド</strong>
                        をキャッチ
                    </p>
                    <div className="flex gap-4">
                        <SignInButton mode="modal">
                            <button className="relative px-8 py-3 bg-gradient-to-r from-red-500 via-mag-500 to-cyan-500 text-white font-semibold rounded-lg shadow-lg transition-all
                                before:content-[''] before:absolute before:inset-0 before:rounded-lg before:bg-[radial-gradient(circle_at_60%_40%,rgba(255,77,204,0.4)_0%,transparent_70%)] before:opacity-60 before:pointer-events-none
                                hover:shadow-[0_0_32px_8px_rgba(255,77,204,0.4)]">
                                今すぐ始める
                            </button>
                        </SignInButton>
                        <button className="px-8 py-3 border border-cyan-500 text-cyan-300 font-semibold rounded-lg hover:bg-cyan-500/10 transition-all shadow-md">
                            詳細を見る
                        </button>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: .6 }}
                    className="relative h-64 lg:h-80 w-full lg:w-1/2 flex items-center justify-center"
                >
                    <Image
                        src="/images/landing-hero-mosaic.jpg"
                        alt="Video mosaic"
                        fill
                        priority
                        className="object-cover rounded-xl shadow-2xl"
                    />
                    <span className="absolute top-4 left-4 bg-red-500 text-white text-sm px-3 py-1 rounded-full font-medium shadow-lg">
                        #1 NEW
                    </span>
                </motion.div>
            </div>
        </section>
    );
}