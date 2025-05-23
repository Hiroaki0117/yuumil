import './globals.css';
import { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { ThemeProvider } from '@/components/common/theme-provider';
import Header from '@/components/layout/header';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

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
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="ja" suppressHydrationWarning className={inter.variable}>
        <body className={`${inter.className} antialiased`}>
          <ThemeProvider 
            attribute="class" 
            defaultTheme="system" 
            enableSystem 
            disableTransitionOnChange
          >
            <Header />
            <main className="min-h-screen pt-16 container mx-auto px-4">
              {children}
            </main>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
