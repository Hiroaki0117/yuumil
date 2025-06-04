'use client'

import { useEffect, useState } from 'react'

interface SkipLink {
  href: string
  label: string
}

const SKIP_LINKS: SkipLink[] = [
  { href: '#main-content', label: 'メインコンテンツにスキップ' },
  { href: '#navigation', label: 'ナビゲーションにスキップ' },
  { href: '#genre-selector', label: 'ジャンル選択にスキップ' },
  { href: '#video-feed', label: '動画一覧にスキップ' },
]

export default function SkipLinks() {
  const [currentUrl, setCurrentUrl] = useState('')

  useEffect(() => {
    setCurrentUrl(window.location.pathname)
  }, [])

  // ページによってスキップリンクを調整
  const getRelevantLinks = () => {
    if (currentUrl === '/') {
      return [
        { href: '#main-content', label: 'メインコンテンツにスキップ' },
        { href: '#features', label: '機能紹介にスキップ' },
        { href: '#pricing', label: '料金プランにスキップ' },
        { href: '#faq', label: 'よくある質問にスキップ' },
      ]
    }
    
    if (currentUrl === '/dashboard') {
      return [
        { href: '#main-content', label: 'メインコンテンツにスキップ' },
        { href: '#stats-dashboard', label: '統計ダッシュボードにスキップ' },
        { href: '#genre-selector', label: 'ジャンル選択にスキップ' },
        { href: '#video-feed', label: '動画一覧にスキップ' },
      ]
    }
    
    if (currentUrl === '/onboarding') {
      return [
        { href: '#main-content', label: 'メインコンテンツにスキップ' },
        { href: '#genre-selection', label: 'ジャンル選択にスキップ' },
        { href: '#keyword-input', label: 'キーワード入力にスキップ' },
      ]
    }

    return SKIP_LINKS
  }

  return (
    <div className="skip-links">
      {getRelevantLinks().map((link, index) => (
        <a
          key={link.href}
          href={link.href}
          className="skip-link"
          style={{ '--index': index } as React.CSSProperties}
        >
          {link.label}
        </a>
      ))}
      
      <style jsx>{`
        .skip-links {
          position: fixed;
          top: -100px;
          left: 0;
          z-index: 9999;
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          padding: 0.5rem;
        }
        
        .skip-link {
          background: rgba(0, 0, 0, 0.95);
          color: white;
          padding: 0.75rem 1rem;
          text-decoration: none;
          border-radius: 0.5rem;
          font-weight: 600;
          border: 2px solid transparent;
          transition: all 0.2s ease;
          transform: translateY(-100px);
          opacity: 0;
          max-width: max-content;
        }
        
        .skip-link:focus {
          transform: translateY(calc(100px + var(--index) * 60px));
          opacity: 1;
          border-color: #3b82f6;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
          outline: none;
        }
        
        .skip-link:hover:focus {
          background: rgba(59, 130, 246, 0.9);
        }
        
        @media (prefers-reduced-motion: reduce) {
          .skip-link {
            transition: none;
          }
        }
        
        @media (prefers-contrast: high) {
          .skip-link {
            background: black;
            border: 2px solid white;
          }
          
          .skip-link:focus {
            background: white;
            color: black;
            border-color: black;
          }
        }
      `}</style>
    </div>
  )
}