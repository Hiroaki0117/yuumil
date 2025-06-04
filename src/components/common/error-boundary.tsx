'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'
import { AlertTriangle, RefreshCw, Bug, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Props {
  children: ReactNode
  fallback?: React.ComponentType<{ error: Error; reset: () => void }>
  onError?: (error: Error, errorInfo: ErrorInfo) => void
}

interface State {
  hasError: boolean
  error?: Error
  errorInfo?: ErrorInfo
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    this.setState({ errorInfo })
    this.props.onError?.(error, errorInfo)
  }

  reset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined })
  }

  render() {
    if (this.state.hasError) {
      const { fallback: FallbackComponent } = this.props
      
      if (FallbackComponent && this.state.error) {
        return <FallbackComponent error={this.state.error} reset={this.reset} />
      }

      return <DefaultErrorFallback error={this.state.error} reset={this.reset} />
    }

    return this.props.children
  }
}

interface ErrorFallbackProps {
  error?: Error
  reset: () => void
}

function DefaultErrorFallback({ error, reset }: ErrorFallbackProps) {
  const isDevelopment = process.env.NODE_ENV === 'development'

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6">
        {/* エラーアイコンとアニメーション */}
        <div className="text-center">
          <div className="relative inline-block">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center animate-bounce">
              <AlertTriangle className="w-12 h-12 text-white" />
            </div>
            <div className="absolute inset-0 w-24 h-24 mx-auto bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-full animate-ping"></div>
          </div>
          
          <h1 className="text-2xl font-bold text-foreground mb-2">
            予期しないエラーが発生しました
          </h1>
          <p className="text-muted-foreground">
            申し訳ございません。アプリケーションにエラーが発生しました。
          </p>
        </div>

        {/* エラー詳細（開発環境のみ） */}
        {isDevelopment && error && (
          <div className="glass-morphism rounded-lg p-4 space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-orange-400">
              <Bug className="w-4 h-4" />
              開発情報
            </div>
            <div className="text-xs font-mono text-muted-foreground bg-gray-900/50 rounded p-2 overflow-auto max-h-32">
              <div className="font-semibold text-red-400 mb-1">
                {error.name}: {error.message}
              </div>
              {error.stack && (
                <pre className="whitespace-pre-wrap text-xs opacity-75">
                  {error.stack.split('\n').slice(0, 5).join('\n')}
                </pre>
              )}
            </div>
          </div>
        )}

        {/* アクションボタン */}
        <div className="space-y-3">
          <Button
            onClick={reset}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
            size="lg"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            再試行
          </Button>
          
          <Button
            onClick={() => window.location.href = '/'}
            variant="outline"
            className="w-full"
            size="lg"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            ホームに戻る
          </Button>
        </div>

        {/* サポート情報 */}
        <div className="text-center text-sm text-muted-foreground">
          <p>
            問題が解決しない場合は、ページを再読み込みするか、
            <br />
            しばらく時間をおいてから再度お試しください。
          </p>
        </div>
      </div>
    </div>
  )
}

// HOC版のエラーバウンダリ
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: React.ComponentType<{ error: Error; reset: () => void }>,
  onError?: (error: Error, errorInfo: ErrorInfo) => void
) {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary fallback={fallback} onError={onError}>
      <Component {...props} />
    </ErrorBoundary>
  )
  
  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`
  
  return WrappedComponent
}

// カスタムエラーフォールバック
export function VideoFeedErrorFallback({ reset }: ErrorFallbackProps) {
  return (
    <div className="text-center py-20 animate-fade-in-up">
      <div className="glass-morphism rounded-3xl p-12 max-w-md mx-auto">
        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center">
          <AlertTriangle className="w-12 h-12 text-white" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          動画の読み込みに失敗しました
        </h3>
        <p className="text-muted-foreground mb-6">
          ネットワーク接続を確認して、再度お試しください。
        </p>
        <Button
          onClick={reset}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          再読み込み
        </Button>
      </div>
    </div>
  )
}

export function OnboardingErrorFallback({ reset }: ErrorFallbackProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center animate-pulse">
          <Bug className="w-12 h-12 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">
          セットアップでエラーが発生しました
        </h2>
        <p className="text-muted-foreground">
          初期設定中に問題が発生しました。もう一度お試しください。
        </p>
        <div className="space-y-3">
          <Button
            onClick={reset}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            size="lg"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            セットアップを再開
          </Button>
          <Button
            onClick={() => window.location.href = '/'}
            variant="outline"
            className="w-full"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            ホームに戻る
          </Button>
        </div>
      </div>
    </div>
  )
}