"use client"
import Link from "next/link";
import { motion } from 'framer-motion';
import Image from "next/image";
import { SignInButton } from "@clerk/nextjs";

export default function Hero() {
    return (
        <section className="py-24 lg:py-32 grid lg: grid-cols-2 gap-12 px-6">
            <div className="space-y-6">
                <h1 className="text-4xl g:text-5xl font-extrabold">
                    見逃さない、新着・急上昇動画
                </h1>
                <p className="text-muted-foreground">
                    あなたの好みの
                    <strong>24時間以内の動画</strong>
                    と<strong>トレンド</strong>
                    をキャッチ
                </p>
                <SignInButton mode="modal">
                    <button className="btn btn-primary w-fit">
                        今すぐ始める
                    </button>
                </SignInButton>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: .6 }}
                className="relative h-64 lg:h-80"
            >
                <Image
                src="/images/landing-hero-mosaic.jpg"
                alt="Video mosaic"
                fill
                priority
                className="object-cover rounded-xl"
                />
                <span className="absolute top-2 left-2 bg-primary text-white text-xs px-2 py-0.5 rounded">
                #1 NEW
                </span>
            </motion.div>
        </section>
    );
}