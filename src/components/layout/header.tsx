import Link from 'next/link';
import { auth } from '@clerk/nextjs/server';
import HeaderClient from './header-client';
import { Suspense } from 'react';

export default async function Header() {
  const { userId } = await auth();

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-16 glass-morphism border-b border-white/10 backdrop-blur-xl">
      <div className="flex h-full items-center justify-between px-4 md:px-8">
        <Link 
          href="/" 
          className="text-xl font-bold hover:opacity-80 transition-all duration-300 floating-animation group"
        >
          <span className="holographic group-hover:scale-110 transition-transform duration-300">
            ユーミル
          </span>
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
        </Link>

        <nav className="hidden md:flex gap-8 text-sm font-medium">
          <Link 
            href="/dashboard" 
            className="relative px-4 py-2 rounded-full glass-morphism hover:neon-glow transition-all duration-300 group"
          >
            <span className="relative z-10">フィード</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
          <Link 
            href="/trends" 
            className="relative px-4 py-2 rounded-full glass-morphism hover:neon-glow transition-all duration-300 group"
          >
            <span className="relative z-10">トレンド</span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
          <Link 
            href="/profile" 
            className="relative px-4 py-2 rounded-full glass-morphism hover:neon-glow transition-all duration-300 group"
          >
            <span className="relative z-10">プロフィール</span>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-purple-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
