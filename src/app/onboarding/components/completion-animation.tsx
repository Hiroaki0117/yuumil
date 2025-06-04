'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Sparkles } from 'lucide-react'

interface Particle {
  id: number;
  color: string;
  x: number;
  y: number;
  duration: number;
  delay: number;
}

export default function CompletionAnimation() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // クライアントサイドでのみパーティクルを生成
    const generatedParticles = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      color: `hsl(${Math.random() * 60 + 260}, 100%, 70%)`,
      x: (Math.random() - 0.5) * (typeof window !== 'undefined' ? window.innerWidth : 1920),
      y: (Math.random() - 0.5) * (typeof window !== 'undefined' ? window.innerHeight : 1080),
      duration: Math.random() * 2 + 1,
      delay: Math.random() * 0.5,
    }));
    
    setParticles(generatedParticles);
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900/30 to-gray-900 z-50"
    >
      {/* 背景のパーティクル爆発 */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: particle.color,
              left: '50%',
              top: '50%',
            }}
            initial={{ x: 0, y: 0, opacity: 1 }}
            animate={{
              x: particle.x,
              y: particle.y,
              opacity: 0,
            }}
            transition={{
              duration: particle.duration,
              ease: "easeOut",
              delay: particle.delay,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center space-y-8">
        {/* 成功アイコン */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.2,
          }}
          className="relative inline-block"
        >
          <CheckCircle className="w-24 h-24 text-green-500" />
          
          {/* グロー効果 */}
          <motion.div
            className="absolute inset-0 bg-green-500 blur-2xl opacity-30"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* 回転する星 */}
          {[0, 72, 144, 216, 288].map((rotation, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2"
              style={{
                transform: `translate(-50%, -50%) rotate(${rotation}deg) translateY(-60px)`,
              }}
              animate={{ rotate: rotation + 360 }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.2,
              }}
            >
              <Sparkles className="w-4 h-4 text-yellow-400" />
            </motion.div>
          ))}
        </motion.div>

        {/* メッセージ */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="space-y-4"
        >
          <h2 className="text-4xl font-bold text-white">
            設定完了！
          </h2>
          <p className="text-xl text-gray-300">
            あなただけの動画体験を準備しています...
          </p>
        </motion.div>

        {/* プログレスバー */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
          className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden mx-auto"
        >
          <motion.div
            className="h-full bg-gradient-to-r from-green-500 to-cyan-500"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.8 }}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}