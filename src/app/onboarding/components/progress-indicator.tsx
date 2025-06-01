'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface ProgressIndicatorProps {
  current: number
  max: number
}

export default function ProgressIndicator({ current, max }: ProgressIndicatorProps) {
  const percentage = (current / max) * 100
  const isComplete = current >= max

  return (
    <div className="flex items-center gap-4">
      {/* カウンター */}
      <motion.div
        key={current}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={`text-2xl font-bold ${
          isComplete ? 'text-cyan-400' : 'text-purple-400'
        }`}
      >
        {current}
        <span className="text-gray-500 text-lg">/{max}</span>
      </motion.div>

      {/* プログレスバー */}
      <div className="relative w-32 h-2 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          className={`absolute inset-y-0 left-0 rounded-full ${
            isComplete 
              ? 'bg-gradient-to-r from-cyan-500 to-green-500' 
              : 'bg-gradient-to-r from-purple-500 to-cyan-500'
          }`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
        
        {/* グロー効果 */}
        <motion.div
          className="absolute inset-0 bg-white opacity-20"
          animate={{
            x: ['-100%', '200%'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
          }}
        />
      </div>

      {/* ステータステキスト */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`text-sm ${
          isComplete ? 'text-green-400' : 'text-gray-400'
        }`}
      >
        {isComplete ? '完成!' : `あと${max - current}個`}
      </motion.span>
    </div>
  )
}