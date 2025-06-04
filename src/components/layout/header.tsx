import Link from 'next/link';
import { auth } from '@clerk/nextjs/server';
import HeaderClient from './header-client';
import { Suspense } from 'react';

export default async function Header() {
  const { userId } = await auth();

  return (
    <header className="fixed inset-x-0 top-0 z-[9999] h-16 bg-black/80 backdrop-blur-xl border-b border-white/10">
      <div className="flex h-full items-center justify-between px-4 md:px-8">
        <Link 
          href="/" 
          className="relative text-xl font-bold text-white hover:opacity-80 transition-all duration-300 z-[10000]"
        >
          <span className="text-white font-extrabold">
            ユーミル
          </span>
        </Link>

        <nav className="hidden md:flex gap-8 text-sm font-medium">
          <Link 
            href="/dashboard" 
            className="relative px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 z-[10000] text-white"
          >
            フィード
          </Link>
          <Link 
            href="/trends" 
            className="relative px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 z-[10000] text-white"
          >
            トレンド
          </Link>
          <Link 
            href="/profile" 
            className="relative px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 z-[10000] text-white"
          >
            プロフィール
          </Link>
        </nav>

        <Suspense fallback={<HeaderSkeleton />}>
          <HeaderClient isAuthenticated={!!userId} />
        </Suspense>
      </div>
    </header>
  );
}

function HeaderSkeleton() {
  return (
    <div className="flex items-center gap-4">
      <div className="h-8 w-8 bg-gradient-to-r from-purple-500/30 to-cyan-500/30 animate-pulse rounded-full shimmer" />
      <div className="h-8 w-16 bg-gradient-to-r from-cyan-500/30 to-emerald-500/30 animate-pulse rounded-full shimmer" />
    </div>
  );
}
