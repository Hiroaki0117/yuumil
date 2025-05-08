'use client';

import Link from 'next/link';
import {
  UserButton,
  SignedIn,
  SignedOut,
  SignInButton,
} from '@clerk/nextjs';
import { ModeToggle } from '@/components/layout/mode-toggle';

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 h-16 border-b bg-background/80 backdrop-blur">
      <div className="flex h-full items-center justify-between px-4 md:px-8">
        <Link href="/" className="text-xl font-bold">ユーミル</Link>

        <nav className="hidden md:flex gap-6 text-sm font-medium">
          <Link href="/dashboard">フィード</Link>
          <Link href="/trends">トレンド</Link>
          <Link href="/profile">プロフィール</Link>
        </nav>

        <div className="flex items-center gap-4">
          <ModeToggle />

          {/* 未ログイン時はサインインボタンを表示 */}
          <SignedOut>
            <SignInButton>
              <button className="px-3 py-1 rounded bg-primary text-white">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>

          {/* ログイン済み時はユーザーアイコンを表示 */}
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </div>
    </header>
  );
}
