'use client'

import { motion } from "framer-motion";

const quotes = [
  { name: 'Kyoko', text: '朝の通勤中に、トレンドだけさっと見れて便利！' },
  { name: 'Daichi', text: '案件リサーチが半分の時間で終わるようになった。' },
  { name: 'Mina', text: '好きなジャンルの新着を逃さないのが最高。' },
];

export default function SocialProof() {
    return (
        <section className="relative py-24 overflow-hidden bg-[#18192a] w-full">
            {/* より暗いグラデーション */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#2a1a2b] via-[#1a1b2b] to-[#0e0f1a] opacity-90 w-full" />
                <div className="absolute inset-0 mix-blend-soft-light opacity-30 w-full" style={{backgroundImage:'url(/images/noise.png)'}} />
            </div>
            <div className="relative z-10 w-full max-w-6xl mx-auto">
                <h2 className="text-3xl lg:text-4xl font-bold text-center mb-16 text-white/90">
                    Beta ユーザーの声
                </h2>
                
                <div className="grid lg:grid-cols-3 gap-8 px-6">
                    {quotes.map((q, i) => (
                        <motion.blockquote
                            key={i}
                            initial={{opacity: 0, y:10}}
                            whileInView={{opacity: 1, y:0}}
                            transition={{delay: i*0.1}}
                            viewport={{once: true}}
                            className="relative bg-[#23243a] border border-white/10 rounded-xl p-8 hover:border-cyan-500/50 transition-all shadow-lg">
                            <div className="absolute -top-4 left-8 bg-cyan-500 text-white text-sm px-4 py-1 rounded-full">
                                {q.name}
                            </div>
                            <p className="text-white/80 text-lg">"{q.text}"</p>
                        </motion.blockquote>
                    ))}
                </div>
            </div>
        </section>
    )
}