import Link from 'next/link';
import { auth } from '@clerk/nextjs/server';
import HeaderClient from './header-client';
import { Suspense } from 'react';

export default async function HeaderSimple() {
  const { userId } = await auth();

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: '64px',
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      zIndex: 999999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 1rem'
    }}>
      <Link 
        href="/" 
        style={{
          color: 'white',
          textDecoration: 'none',
          fontSize: '1.5rem',
          fontWeight: 'bold',
          zIndex: 999999,
          position: 'relative'
        }}
      >
        ユーミル
      </Link>

      <nav style={{ display: 'flex', gap: '1rem', zIndex: 999999 }}>
        <Link 
          href="/dashboard" 
          style={{
            color: 'white',
            textDecoration: 'none',
            padding: '0.5rem 1rem',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '8px',
            zIndex: 999999
          }}
        >
          フィード
        </Link>
        <Link 
          href="/trends"
          style={{
            color: 'white',
            textDecoration: 'none',
            padding: '0.5rem 1rem',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '8px',
            zIndex: 999999
          }}
        >
          トレンド
        </Link>
        <Link 
          href="/profile"
          style={{
            color: 'white',
            textDecoration: 'none',
            padding: '0.5rem 1rem',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '8px',
            zIndex: 999999
          }}
        >
          プロフィール
        </Link>
      </nav>

      <div style={{ zIndex: 999999 }}>
        <Suspense fallback={<HeaderSkeleton />}>
          <HeaderClient isAuthenticated={!!userId} />
        </Suspense>
      </div>
    </header>
  );
}

function HeaderSkeleton() {
  return (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <div style={{ width: '32px', height: '32px', backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: '50%' }} />
      <div style={{ width: '64px', height: '32px', backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: '4px' }} />
    </div>
  );
}