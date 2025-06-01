'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

export default function WelcomeAnimation() {
  const words = ['動画', '発見', '体験']
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900/30 to-gray-900"
    >
      {/* パーティクル背景 */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-400 rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
              y: (typeof window !== 'undefined' ? window.innerHeight : 1080) + 20,
            }}
            animate={{
              y: -20,
              transition: {
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 5,
              },
            }}
            style={{
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.5,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center space-y-8">
        {/* ロゴアニメーション */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            duration: 1,
          }}
          className="relative inline-block"
        >
          <Sparkles className="w-20 h-20 text-purple-500 mx-auto mb-4" />
          <motion.div
            className="absolute inset-0 bg-purple-500 blur-xl opacity-50"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* タイトル */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-6xl font-bold"
        >
          <span className="holographic">Yuumil</span>へようこそ
        </motion.h1>

        {/* サブタイトル with rotating words */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-2xl text-gray-300"
        >
          あなたの
          <motion.span
            className="inline-block mx-2 text-purple-400 font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            {words.map((word, index) => (
              <motion.span
                key={word}
                className="absolute"
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: index === 0 ? [0, 1, 1, 0] : 0,
                  y: index === 0 ? [20, 0, 0, -20] : 20,
                }}
                transition={{
                  duration: 3,
                  delay: index * 1,
                  repeat: Infinity,
                  repeatDelay: (words.length - 1) * 1,
                }}
              >
                {word}
              </motion.span>
            ))}
          </motion.span>
          を最高に
        </motion.div>

        {/* ローディングインジケーター */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex justify-center space-x-2"
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-purple-500 rounded-full"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}