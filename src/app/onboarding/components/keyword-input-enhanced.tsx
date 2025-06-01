'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Hash, Plus, Search, Sparkles } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface KeywordInputEnhancedProps {
  onAdd: (keyword: string) => void
  disabled?: boolean
  existingKeywords?: string[]
}

const SUGGESTIONS = [
  'インディーズ', 'アニソン', '洋楽', 'K-POP', 'ボカロ',
  'チル', 'エモ', 'アコースティック', 'リミックス', 'ライブ',
  'カバー', 'オリジナル', 'BGM', 'ゲーム音楽', 'サントラ'
]

export default function KeywordInputEnhanced({ 
  onAdd, 
  disabled,
  existingKeywords = []
}: KeywordInputEnhancedProps) {
  const [keyword, setKeyword] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)

  // フィルタリングされたサジェスト
  const filteredSuggestions = SUGGESTIONS.filter(
    suggestion => 
      suggestion.toLowerCase().includes(keyword.toLowerCase()) &&
      !existingKeywords.includes(suggestion)
  )

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault()
    const trimmedKeyword = keyword.trim()
    
    if (!trimmedKeyword || disabled) return
    
    onAdd(trimmedKeyword)
    setKeyword('')
    setShowSuggestions(false)
    setSelectedSuggestionIndex(-1)
    
    // 成功アニメーション
    if (inputRef.current) {
      inputRef.current.classList.add('animate-pulse-success')
      setTimeout(() => {
        inputRef.current?.classList.remove('animate-pulse-success')
      }, 500)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedSuggestionIndex(prev => 
        prev < filteredSuggestions.length - 1 ? prev + 1 : prev
      )
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedSuggestionIndex(prev => prev > 0 ? prev - 1 : -1)
    } else if (e.key === 'Enter' && selectedSuggestionIndex >= 0) {
      e.preventDefault()
      const selectedSuggestion = filteredSuggestions[selectedSuggestionIndex]
      setKeyword(selectedSuggestion)
      setShowSuggestions(false)
      setSelectedSuggestionIndex(-1)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setKeyword(suggestion)
    setShowSuggestions(false)
    inputRef.current?.focus()
  }

  useEffect(() => {
    setShowSuggestions(keyword.length > 0 && filteredSuggestions.length > 0)
  }, [keyword, filteredSuggestions.length])

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-white flex items-center gap-2">
          <Hash className="w-6 h-6 text-cyan-400" />
          キーワードで追加
        </h3>
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className="w-5 h-5 text-cyan-400" />
        </motion.div>
      </div>

      {/* 入力フォーム */}
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            ref={inputRef}
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="好きなアーティストやジャンルを入力..."
            disabled={disabled}
            className={`
              pl-10 pr-24 py-6 text-lg
              bg-gray-800/50 border-gray-700 text-white 
              placeholder:text-gray-500
              focus:border-cyan-500 focus:ring-cyan-500/20
              transition-all duration-300
              ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          />
          
          <Button
            type="submit"
            disabled={!keyword.trim() || disabled}
            className={`
              absolute right-2 top-1/2 -translate-y-1/2
              bg-gradient-to-r from-cyan-600 to-cyan-700
              hover:from-cyan-700 hover:to-cyan-800
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-300
            `}
          >
            <Plus className="w-4 h-4 mr-1" />
            追加
          </Button>
        </div>

        {/* サジェスト */}
        <AnimatePresence>
          {showSuggestions && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute z-10 w-full mt-2 p-2 bg-gray-800 border border-gray-700 rounded-lg shadow-xl"
            >
              <div className="text-xs text-gray-400 mb-2 px-2">おすすめ</div>
              {filteredSuggestions.map((suggestion, index) => (
                <motion.button
                  key={suggestion}
                  type="button"
                  onClick={() => handleSuggestionClick(suggestion)}
                  onMouseEnter={() => setSelectedSuggestionIndex(index)}
                  className={`
                    w-full text-left px-3 py-2 rounded-md
                    transition-all duration-200
                    ${selectedSuggestionIndex === index
                      ? 'bg-cyan-600/20 text-cyan-400'
                      : 'text-gray-300 hover:bg-gray-700/50'
                    }
                  `}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <span className="flex items-center gap-2">
                    <Hash className="w-3 h-3" />
                    {suggestion}
                  </span>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </form>

      {/* ヒント */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex items-start gap-2 text-sm text-gray-400"
      >
        <div className="w-1 h-1 bg-cyan-400 rounded-full mt-2 animate-pulse" />
        <p>
          好きなアーティスト名、音楽ジャンル、気分などを自由に入力できます。
          例：「作業用BGM」「90年代」「雨の日」
        </p>
      </motion.div>
    </div>
  )
}