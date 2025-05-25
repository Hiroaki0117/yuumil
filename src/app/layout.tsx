import './globals.css';
import { Metadata, Viewport } from 'next';
import { Inter, Orbitron } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { ThemeProvider } from '@/components/common/theme-provider';
import Header from '@/components/layout/header';
import { StagewiseToolbar } from '@stagewise/toolbar-next';
import StarField from '@/components/common/star-field';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const orbitron = Orbitron({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-orbitron',
});

// Stagewise設定
const stagewiseConfig = {
  plugins: []
};

export const metadata: Metadata = {
  title: {
    default: 'ユーミル | YouTube動画のトレンドを発見',
    template: '%s | ユーミル',
  },
  description: 'ジャンル・キーワード別にYouTube動画の新着・トレンドランキングを表示。あなたの興味に合わせたパーソナライズされた動画フィードを楽しもう。',
  keywords: ['YouTube', 'トレンド', '動画', 'ランキング', 'フィード'],
  authors: [{ name: 'ユーミル チーム' }],
  creator: 'ユーミル',
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: 'https://yuumil.com',
    title: 'ユーミル | YouTube動画のトレンドを発見',
    description: 'ジャンル・キーワード別にYouTube動画の新着・トレンドランキングを表示',
    siteName: 'ユーミル',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ユーミル | YouTube動画のトレンドを発見',
    description: 'ジャンル・キーワード別にYouTube動画の新着・トレンドランキングを表示',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0a0a0f' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0f' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="ja" suppressHydrationWarning className={`${inter.variable} ${orbitron.variable}`}>
        <body className={`${inter.className} antialiased`}>
          <ThemeProvider 
            attribute="class" 
            defaultTheme="dark" 
            enableSystem={false}
            disableTransitionOnChange
          >
            {/* 背景のパーティクル効果 */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-cyan-900/20"></div>
              <StarField />
            </div>
            
            <Header />
            <main className="relative min-h-screen pt-20 container mx-auto px-4 pb-8">
              {children}
            </main>

            {/* Stagewise Toolbar - 開発環境のみ */}
            {process.env.NODE_ENV === 'development' && (
              <StagewiseToolbar config={stagewiseConfig} />
            )}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
