import Link from 'next/link';
import { auth } from '@clerk/nextjs/server';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Suspense } from 'react';

export default async function MarketingHeader() {
  const { userId } = await auth();

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-16 bg-white/90 backdrop-blur-xl border-b border-gray-200">
      <div className="flex h-full items-center justify-between px-4 md:px-8 max-w-7xl mx-auto">
        <Link 
          href="/" 
          className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors duration-300"
        >
          ユーミル
        </Link>

        <nav className="hidden md:flex gap-8 text-sm font-medium">
          <Link 
            href="/dashboard" 
            className="relative px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors duration-300"
          >
            フィード
          </Link>
          <Link 
            href="/trends" 
            className="relative px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors duration-300"
          >
            トレンド
          </Link>
          <Link 
            href="/profile" 
            className="relative px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors duration-300"
          >
            プロフィール
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200">
                ログイン
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </header>
  );
}

function HeaderSkeleton() {
  return (
    <div className="flex items-center gap-4">
      <div className="h-8 w-8 bg-gray-200 animate-pulse rounded-full" />
      <div className="h-8 w-16 bg-gray-200 animate-pulse rounded-lg" />
    </div>
  );
} 