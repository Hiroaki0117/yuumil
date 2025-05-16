'use client'

import { motion } from "framer-motion";

const quotes = [
  { name: 'Kyoko', text: '朝の通勤中に、トレンドだけさっと見れて便利！' },
  { name: 'Daichi', text: '案件リサーチが半分の時間で終わるようになった。' },
  { name: 'Mina', text: '好きなジャンルの新着を逃さないのが最高。' },
];

export default function SocialProof() {
    return (
        <section className="container py-20 px-6 bg-muted/40">
            <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">Beta ユーザーの声</h2>
            <div className="container flex flex-col lg:flex-row gap-8 justify-center px-6">
                {quotes.map((q, i) => (
                    <motion.blockquote
                        key={i}
                        initial={{opacity: 0, y:10}}
                        whileInView={{opacity: 1, y:0}}
                        transition={{delay: i*0.1}}
                        viewport={{once: true}}
                        className="bg-background border rounded-xl p-6 w-full lg:w-1/3">
                            
                        <p>“{q.text}”</p>
                        <footer className="mt-4 text-sm text-muted-foreground">— {q.name}</footer>
                    </motion.blockquote>
                ))}
            </div>
        </section>
    )
}