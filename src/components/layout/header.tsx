import Link from 'next/link';
import { auth } from '@clerk/nextjs/server';
import HeaderClient from './header-client';
import { Suspense } from 'react';

export default async function Header() {
  const { userId } = await auth();

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-16 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-full items-center justify-between px-4 md:px-8">
        <Link 
          href="/" 
          className="text-xl font-bold hover:opacity-80 transition-opacity"
        >
          ユーミル
        </Link>

        <nav className="hidden md:flex gap-6 text-sm font-medium">
          <Link 
            href="/dashboard" 
            className="hover:text-primary transition-colors"
          >
            フィード
          </Link>
          <Link 
            href="/trends" 
            className="hover:text-primary transition-colors"
          >
            トレンド
          </Link>
          <Link 
            href="/profile" 
            className="hover:text-primary transition-colors"
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
      <div className="h-8 w-8 bg-muted animate-pulse rounded" />
      <div className="h-8 w-16 bg-muted animate-pulse rounded" />
    </div>
  );
}
