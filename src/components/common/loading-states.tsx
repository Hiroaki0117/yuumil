'use client'

import { Loader2, Music, Video, Search } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface LoadingStateProps {
  variant?: 'spinner' | 'skeleton' | 'dots' | 'wave' | 'pulse'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  message?: string
  fullScreen?: boolean
  className?: string
  showIcon?: boolean
  iconType?: 'default' | 'music' | 'video' | 'search'
}

const sizeMap = {
  sm: {
    spinner: 'w-4 h-4',
    container: 'p-2',
    text: 'text-xs',
    icon: 'w-4 h-4'
  },
  md: {
    spinner: 'w-6 h-6',
    container: 'p-4',
    text: 'text-sm',
    icon: 'w-6 h-6'
  },
  lg: {
    spinner: 'w-8 h-8',
    container: 'p-6',
    text: 'text-base',
    icon: 'w-8 h-8'
  },
  xl: {
    spinner: 'w-12 h-12',
    container: 'p-8',
    text: 'text-lg',
    icon: 'w-12 h-12'
  }
}

const iconMap = {
  default: Loader2,
  music: Music,
  video: Video,
  search: Search
}

export function LoadingSpinner({ 
  size = 'md', 
  message, 
  fullScreen = false, 
  className,
  showIcon = true,
  iconType = 'default'
}: LoadingStateProps) {
  const IconComponent = iconMap[iconType]
  const sizes = sizeMap[size]
  
  const content = (
    <div className={cn(
      "flex flex-col items-center justify-center gap-4",
      sizes.container,
      className
    )}>
      {showIcon && (
        <div className="relative">
          <IconComponent 
            className={cn(
              sizes.spinner,
              "animate-spin text-primary"
            )}
          />
          {/* グラデーション背景 */}
          <div className={cn(
            sizes.spinner,
            "absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-full blur-sm animate-pulse"
          )} />
        </div>
      )}
      
      {message && (
        <p className={cn(
          sizes.text,
          "text-muted-foreground animate-pulse text-center"
        )}>
          {message}
        </p>
      )}
    </div>
  )
  
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="glass-morphism rounded-2xl">
          {content}
        </div>
      </div>
    )
  }
  
  return content
}

export function LoadingDots({ 
  size = 'md',
  className 
}: Pick<LoadingStateProps, 'size' | 'className'>) {
  const dotSize = size === 'sm' ? 'w-2 h-2' : 
                  size === 'md' ? 'w-3 h-3' :
                  size === 'lg' ? 'w-4 h-4' : 'w-5 h-5'

  return (
    <div className={cn("flex items-center justify-center gap-1", className)}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={cn(
            dotSize,
            "bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full animate-bounce"
          )}
          style={{
            animationDelay: `${i * 0.15}s`,
            animationDuration: '0.6s'
          }}
        />
      ))}
    </div>
  )
}

export function LoadingWave({ 
  size = 'md',
  className 
}: Pick<LoadingStateProps, 'size' | 'className'>) {
  const barHeight = size === 'sm' ? 'h-4' : 
                   size === 'md' ? 'h-6' :
                   size === 'lg' ? 'h-8' : 'h-10'
  
  const barWidth = size === 'sm' ? 'w-1' : 
                  size === 'md' ? 'w-1.5' :
                  size === 'lg' ? 'w-2' : 'w-2.5'

  return (
    <div className={cn("flex items-end justify-center gap-1", className)}>
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className={cn(
            barWidth,
            barHeight,
            "bg-gradient-to-t from-purple-500 to-cyan-500 rounded-sm animate-pulse"
          )}
          style={{
            animationDelay: `${i * 0.1}s`,
            animationDuration: '1s'
          }}
        />
      ))}
    </div>
  )
}

export function LoadingPulse({ 
  size = 'md',
  className 
}: Pick<LoadingStateProps, 'size' | 'className'>) {
  const pulseSize = size === 'sm' ? 'w-8 h-8' : 
                   size === 'md' ? 'w-12 h-12' :
                   size === 'lg' ? 'w-16 h-16' : 'w-20 h-20'

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div className="relative">
        <div className={cn(
          pulseSize,
          "bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full animate-ping"
        )} />
        <div className={cn(
          pulseSize,
          "absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full animate-pulse"
        )} />
      </div>
    </div>
  )
}

export function LoadingSkeleton({ 
  lines = 3,
  className 
}: { 
  lines?: number
  className?: string 
}) {
  return (
    <div className={cn("space-y-3", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "h-4 bg-gradient-to-r from-gray-700/50 to-gray-600/50 rounded animate-pulse",
            i === 0 && "w-3/4",
            i === 1 && "w-1/2", 
            i === 2 && "w-2/3"
          )}
        />
      ))}
    </div>
  )
}

// メインのローディングコンポーネント
export function LoadingState(props: LoadingStateProps) {
  const { variant = 'spinner' } = props
  
  switch (variant) {
    case 'dots':
      return <LoadingDots {...props} />
    case 'wave':
      return <LoadingWave {...props} />
    case 'pulse':
      return <LoadingPulse {...props} />
    case 'skeleton':
      return <LoadingSkeleton className={props.className} />
    default:
      return <LoadingSpinner {...props} />
  }
}

// 特定用途のローディングコンポーネント
export function VideoLoadingState({ message }: { message?: string }) {
  return (
    <LoadingState
      variant="spinner"
      size="lg"
      message={message || "動画を読み込み中..."}
      iconType="video"
      className="py-12"
    />
  )
}

export function SearchLoadingState({ message }: { message?: string }) {
  return (
    <LoadingState
      variant="wave"
      size="md"
      message={message || "検索中..."}
      className="py-8"
    />
  )
}

export function DataLoadingState({ message }: { message?: string }) {
  return (
    <LoadingState
      variant="dots"
      size="md"
      message={message || "データを取得中..."}
      className="py-6"
    />
  )
}

// フルスクリーンローディング
export function FullScreenLoading({ 
  message = "読み込み中...",
  variant = 'spinner'
}: {
  message?: string
  variant?: LoadingStateProps['variant']
}) {
  return (
    <LoadingState
      variant={variant}
      size="xl"
      message={message}
      fullScreen
      showIcon
    />
  )
}

// ページローディング（Suspense用）
export function PageLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="glass-morphism rounded-3xl p-12 max-w-md mx-auto text-center">
        <LoadingState
          variant="spinner"
          size="xl"
          message="ページを読み込み中..."
          showIcon
          className="mb-4"
        />
        <div className="w-32 h-1 bg-gradient-to-r from-purple-500 via-cyan-500 to-emerald-500 mx-auto rounded-full animate-enhanced-pulse" />
      </div>
    </div>
  )
}