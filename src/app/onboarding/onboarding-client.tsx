'use client'

import React, { useState, useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Genre, SelectedItem, SelectedGenre, SelectedKeyword } from '@/types'
import { insertUserGenres, insertUserKeywords, upsertKeywords } from '@/dal/genre'
import { APP_CONFIG } from '@/lib/constants'
import WelcomeAnimation from './components/welcome-animation'
import ProgressIndicator from './components/progress-indicator'
import SelectionManager from './components/selection-manager'
import GenreSelector from './components/genre-selector'
import KeywordInputEnhanced from './components/keyword-input-enhanced'
import CompletionAnimation from './components/completion-animation'
import { Sparkles, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface OnboardingClientProps {
  userId: string
  genres: Genre[]
}

export default function OnboardingClient({ userId, genres }: OnboardingClientProps) {
  const MAX_TAGS = APP_CONFIG.MAX_TAGS || 3
  const router = useRouter()
  
  const [selected, setSelected] = useState<SelectedItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showCompletion, setShowCompletion] = useState(false)
  const [currentStep, setCurrentStep] = useState<'welcome' | 'selection' | 'complete'>('welcome')
  const [showError, setShowError] = useState(false)

  // アニメーション用の初期表示
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentStep('selection')
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  const handleGenreToggle = useCallback((genre: Genre) => {
    setShowError(false)
    setSelected(prev => {
      const isSelected = prev.some(item => item.type === 'genre' && item.id === genre.id)
      
      if (isSelected) {
        return prev.filter(item => !(item.type === 'genre' && item.id === genre.id))
      } else if (prev.length < MAX_TAGS) {
        return [...prev, { 
          type: 'genre', 
          id: genre.id, 
          name: genre.name,
          description: genre.description,
          category: genre.category
        }]
      }
      
      // 上限に達した場合の振動エフェクト
      const element = document.getElementById('selection-container')
      if (element) {
        element.classList.add('animate-shake')
        setTimeout(() => element.classList.remove('animate-shake'), 500)
      }
      
      return prev
    })
  }, [MAX_TAGS])

  const handleKeywordAdd = useCallback((keyword: string) => {
    setShowError(false)
    if (!keyword.trim() || selected.length >= MAX_TAGS) return
    
    const exists = selected.some(item => item.type === 'keyword' && (item as SelectedKeyword).value === keyword)
    if (!exists) {
      setSelected(prev => [...prev, { type: 'keyword', value: keyword }])
    }
  }, [selected, MAX_TAGS])

  const handleRemoveItem = useCallback((item: SelectedItem) => {
    setSelected(prev => 
      prev.filter(s => !(s.type === item.type && 
        (s.type === 'genre' ? (s as SelectedGenre).id === (item as SelectedGenre).id : (s as SelectedKeyword).value === (item as SelectedKeyword).value)))
    )
  }, [])

  const handleSave = async () => {
    if (selected.length === 0) {
      setShowError(true)
      // エラー時の振動エフェクト
      const element = document.getElementById('save-button')
      if (element) {
        element.classList.add('animate-shake')
        setTimeout(() => element.classList.remove('animate-shake'), 500)
      }
      return
    }
    
    setIsLoading(true)
    
    try {
      const selectedGenres = selected.filter(s => s.type === 'genre') as SelectedGenre[]
      const selectedKeywords = selected.filter(s => s.type === 'keyword') as SelectedKeyword[]

      if (selectedGenres.length > 0) {
        await insertUserGenres(userId, selectedGenres)
      }

      if (selectedKeywords.length > 0) {
        const keywordResult = await upsertKeywords(selectedKeywords)
        if (keywordResult) {
          await insertUserKeywords(userId, keywordResult)
        }
      }

      setShowCompletion(true)
      setCurrentStep('complete')
      
      // 成功アニメーション後にダッシュボードへ遷移
      setTimeout(() => {
        router.push('/dashboard')
      }, 2000)
      
    } catch (error) {
      console.error('保存エラー:', error)
      setIsLoading(false)
      // エラー表示
      setShowError(true)
    }
  }

  const handleSkip = () => {
    router.push('/dashboard')
  }

  const selectedGenreIds = selected
    .filter(item => item.type === 'genre')
    .map(item => (item as SelectedGenre).id)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 overflow-hidden">
      {/* 背景エフェクト */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float animation-delay-2000" />
      </div>

      <AnimatePresence mode="wait">
        {currentStep === 'welcome' && (
          <WelcomeAnimation key="welcome" />
        )}

        {currentStep === 'selection' && (
          <motion.div
            key="selection"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 container mx-auto px-4 py-8 max-w-6xl"
          >
            {/* ヘッダー */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-between mb-8"
            >
              <h1 className="text-3xl font-bold">
                <span className="holographic">Yuumil</span>
              </h1>
              <ProgressIndicator current={selected.length} max={MAX_TAGS} />
            </motion.div>

            {/* メインコンテンツ */}
            <div className="space-y-8">
              {/* 選択済みアイテム表示 */}
              <SelectionManager
                selected={selected}
                onRemove={handleRemoveItem}
                max={MAX_TAGS}
                showError={showError}
              />

              {/* ジャンル選択 */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <GenreSelector
                  genres={genres}
                  selected={selectedGenreIds}
                  onToggle={handleGenreToggle}
                  disabled={selected.length >= MAX_TAGS}
                />
              </motion.div>

              {/* キーワード入力 */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <KeywordInputEnhanced
                  onAdd={handleKeywordAdd}
                  disabled={selected.length >= MAX_TAGS}
                  existingKeywords={selected.filter(s => s.type === 'keyword').map(s => (s as SelectedKeyword).value)}
                />
              </motion.div>

              {/* アクションボタン */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex items-center justify-between pt-8"
              >
                <Button
                  variant="ghost"
                  onClick={handleSkip}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  スキップ
                </Button>

                <Button
                  id="save-button"
                  onClick={handleSave}
                  disabled={isLoading}
                  className={`
                    relative px-8 py-4 text-lg font-semibold
                    bg-gradient-to-r from-purple-600 to-cyan-600
                    hover:from-purple-700 hover:to-cyan-700
                    transform transition-all duration-300
                    hover:scale-105 active:scale-95
                    disabled:opacity-50 disabled:cursor-not-allowed
                    disabled:transform-none
                    ${showError ? 'animate-shake' : ''}
                  `}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Sparkles className="w-5 h-5" />
                      </motion.div>
                      保存中...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      完了して始める
                      <ArrowRight className="w-5 h-5" />
                    </span>
                  )}
                </Button>
              </motion.div>

              {/* エラーメッセージ */}
              <AnimatePresence>
                {showError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-center text-red-400 text-sm"
                  >
                    最低1つ以上選択してください
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {currentStep === 'complete' && showCompletion && (
          <CompletionAnimation key="complete" />
        )}
      </AnimatePresence>
    </div>
  )
}