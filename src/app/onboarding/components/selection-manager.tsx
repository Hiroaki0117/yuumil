'use client'

import React from 'react'
import { motion, AnimatePresence, Reorder } from 'framer-motion'
import { X, Hash, Music } from 'lucide-react'
import { SelectedItem } from '@/types'

interface SelectionManagerProps {
  selected: SelectedItem[]
  onRemove: (item: SelectedItem) => void
  max: number
  showError?: boolean
}

export default function SelectionManager({ 
  selected, 
  onRemove, 
  max,
  showError 
}: SelectionManagerProps) {
  return (
    <div 
      id="selection-container"
      className={`
        relative p-6 rounded-2xl 
        bg-gradient-to-br from-gray-800/50 to-gray-900/50 
        backdrop-blur-lg border border-gray-700/50
        ${showError ? 'border-red-500/50' : ''}
      `}
    >
      {/* タイトル */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-200">
          選択中のタグ
        </h2>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span>選択可能:</span>
          <span className={`font-bold ${selected.length >= max ? 'text-red-400' : 'text-purple-400'}`}>
            {max - selected.length}個
          </span>
        </div>
      </div>

      {/* 選択済みアイテム */}
      <AnimatePresence mode="popLayout">
        {selected.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`
              text-center py-8 text-gray-500
              ${showError ? 'text-red-400' : ''}
            `}
          >
            {showError ? (
              <span className="flex items-center justify-center gap-2">
                <X className="w-5 h-5" />
                最低1つ以上選択してください
              </span>
            ) : (
              'ジャンルまたはキーワードを選択してください'
            )}
          </motion.div>
        ) : (
          <Reorder.Group 
            axis="x" 
            values={selected} 
            onReorder={() => {}}
            className="flex flex-wrap gap-3"
          >
            {selected.map((item, index) => (
              <Reorder.Item
                key={`${item.type}-${item.type === 'genre' ? item.id : item.value}`}
                value={item}
                dragListener={false}
              >
                <motion.div
                  layout
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                    delay: index * 0.05
                  }}
                  whileHover={{ scale: 1.05 }}
                  className={`
                    relative group px-4 py-2 rounded-full
                    flex items-center gap-2
                    transition-all duration-300
                    ${item.type === 'genre' 
                      ? 'bg-gradient-to-r from-purple-600/80 to-purple-700/80 text-white' 
                      : 'bg-gradient-to-r from-cyan-600/80 to-cyan-700/80 text-white'
                    }
                  `}
                >
                  {/* アイコン */}
                  <span className="text-white/80">
                    {item.type === 'genre' ? <Music className="w-4 h-4" /> : <Hash className="w-4 h-4" />}
                  </span>
                  
                  {/* テキスト */}
                  <span className="font-medium">{item.value}</span>
                  
                  {/* 削除ボタン */}
                  <motion.button
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onRemove(item)}
                    className="ml-1 p-1 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3 h-3" />
                  </motion.button>

                  {/* グロー効果 */}
                  <motion.div
                    className="absolute inset-0 rounded-full blur-md opacity-50 -z-10"
                    style={{
                      background: item.type === 'genre' 
                        ? 'linear-gradient(to right, #9333ea, #7c3aed)' 
                        : 'linear-gradient(to right, #06b6d4, #0891b2)',
                    }}
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
              </Reorder.Item>
            ))}
          </Reorder.Group>
        )}
      </AnimatePresence>

      {/* プログレスバー（下部） */}
      <div className="mt-4 h-1 bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${
            selected.length >= max 
              ? 'bg-gradient-to-r from-red-500 to-orange-500' 
              : 'bg-gradient-to-r from-purple-500 to-cyan-500'
          }`}
          initial={{ width: 0 }}
          animate={{ width: `${(selected.length / max) * 100}%` }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      </div>
    </div>
  )
}