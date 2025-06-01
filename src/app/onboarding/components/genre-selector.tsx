'use client'

import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Genre } from '@/types'
import { Music, Check, Search, Filter } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface GenreSelectorProps {
  genres: Genre[]
  selected: string[]
  onToggle: (genre: Genre) => void
  disabled?: boolean
}

export default function GenreSelector({ 
  genres, 
  selected, 
  onToggle, 
  disabled 
}: GenreSelectorProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // カテゴリの抽出
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(genres.map(g => g.category).filter(Boolean))]
    return uniqueCategories.sort()
  }, [genres])

  // フィルタリング
  const filteredGenres = useMemo(() => {
    let filtered = genres

    if (searchTerm) {
      filtered = filtered.filter(genre => 
        genre.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        genre.description?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedCategory) {
      filtered = filtered.filter(genre => genre.category === selectedCategory)
    }

    return filtered
  }, [genres, searchTerm, selectedCategory])

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-white flex items-center gap-2">
          <Music className="w-6 h-6 text-purple-400" />
          ジャンルから選択
        </h3>
        <span className="text-gray-400">
          {filteredGenres.length}個のジャンル
        </span>
      </div>

      {/* 検索とフィルター */}
      <div className="flex gap-4 flex-col sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="ジャンルを検索..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
          />
        </div>
        
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(null)}
            className="text-xs"
          >
            すべて
          </Button>
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="text-xs"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* ジャンルグリッド */}
      <motion.div 
        layout
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
      >
        <AnimatePresence mode="popLayout">
          {filteredGenres.map((genre, index) => {
            const isSelected = selected.includes(genre.id)
            const isDisabled = disabled && !isSelected

            return (
              <motion.button
                key={genre.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ 
                  delay: index * 0.02,
                  type: "spring",
                  stiffness: 300,
                  damping: 25
                }}
                whileHover={!isDisabled ? { scale: 1.05, y: -2 } : {}}
                whileTap={!isDisabled ? { scale: 0.95 } : {}}
                onClick={() => !isDisabled && onToggle(genre)}
                disabled={isDisabled}
                className={`
                  relative p-4 rounded-xl transition-all duration-300
                  ${isSelected 
                    ? 'bg-gradient-to-br from-purple-600 to-purple-700 text-white shadow-lg shadow-purple-500/30' 
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                  }
                  ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                  border ${isSelected ? 'border-purple-500' : 'border-gray-700/50'}
                `}
              >
                {/* 選択インジケーター */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                    >
                      <Check className="w-4 h-4 text-white" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* コンテンツ */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">{genre.name}</h4>
                  {genre.description && (
                    <p className="text-xs opacity-80 line-clamp-2">
                      {genre.description}
                    </p>
                  )}
                </div>

                {/* ホバーエフェクト */}
                {!isDisabled && (
                  <motion.div
                    className="absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition-opacity pointer-events-none"
                    style={{
                      background: 'radial-gradient(circle at center, rgba(147, 51, 234, 0.1), transparent)',
                    }}
                  />
                )}

                {/* パーティクルエフェクト（選択時） */}
                <AnimatePresence>
                  {isSelected && (
                    <>
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 bg-purple-400 rounded-full"
                          initial={{
                            x: 0,
                            y: 0,
                            opacity: 1,
                          }}
                          animate={{
                            x: (Math.random() - 0.5) * 100,
                            y: (Math.random() - 0.5) * 100,
                            opacity: 0,
                          }}
                          exit={{ opacity: 0 }}
                          transition={{
                            duration: 0.8,
                            ease: "easeOut",
                          }}
                          style={{
                            left: '50%',
                            top: '50%',
                          }}
                        />
                      ))}
                    </>
                  )}
                </AnimatePresence>
              </motion.button>
            )
          })}
        </AnimatePresence>
      </motion.div>

      {/* 結果なし */}
      {filteredGenres.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 text-gray-500"
        >
          <Filter className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>該当するジャンルが見つかりません</p>
        </motion.div>
      )}
    </div>
  )
}