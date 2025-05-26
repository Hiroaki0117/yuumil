# Next.js ベストプラクティスガイド

このドキュメントは、Next.js 15 App Router を使用したモダンな Web アプリケーション開発のベストプラクティスをまとめています。

## 🎯 目次

1. [Server Components の活用](#server-components-の活用)
2. [Client Components の最適化](#client-components-の最適化)
3. [パフォーマンス最適化](#パフォーマンス最適化)
4. [SEO とメタデータ](#seo-とメタデータ)
5. [エラーハンドリング](#エラーハンドリング)
6. [アクセシビリティ](#アクセシビリティ)
7. [開発者体験の向上](#開発者体験の向上)

## 📋 Server Components の活用

### 基本原則

- **デフォルトで Server Components**を使用し、必要な場合のみ Client Components に変換
- データフェッチングはサーバー側で実行
- SEO とパフォーマンスを重視

### 実装例

```tsx
// ✅ 良い例: Server Component
import { auth } from "@clerk/nextjs/server";
import { getUserPreferences } from "@/lib/data/users";

export default async function DashboardPage() {
  const { userId } = await auth();
  const prefs = await getUserPreferences(userId);

  return (
    <div>
      <DashboardClient initialData={prefs} />
    </div>
  );
}
```

```tsx
// ❌ 避けるべき例: 不要なClient Component
"use client";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/data")
      .then((res) => res.json())
      .then(setData);
  }, []);

  // ...
}
```

### Server/Client コンポーネントの分離戦略

```
src/
├── app/
│   ├── dashboard/
│   │   ├── page.tsx           # Server Component (データフェッチ)
│   │   ├── loading.tsx        # Loading UI
│   │   └── error.tsx          # Error Boundary
├── components/
│   ├── features/
│   │   └── dashboard/
│   │       └── dashboard-client.tsx  # Client Component (インタラクション)
```

## 🎛️ Client Components の最適化

### 使用する場面

- ユーザーインタラクション (onClick, onChange など)
- ブラウザ API 使用 (useState, useEffect など)
- Third-party ライブラリで'use client'が必要

### パフォーマンス最適化

```tsx
// ✅ Suspenseを使用した段階的読み込み
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <HeavyComponent />
    </Suspense>
  );
}
```

```tsx
// ✅ Dynamic Imports for Code Splitting
import dynamic from "next/dynamic";

const VideoPlayer = dynamic(() => import("@/components/VideoPlayer"), {
  loading: () => <Skeleton className="h-48" />,
  ssr: false,
});
```

## ⚡ パフォーマンス最適化

### Next.js 設定最適化

```typescript
// next.config.ts
const nextConfig = {
  experimental: {
    ppr: true, // Partial Prerendering
  },
  images: {
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  compress: true,
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};
```

### 画像最適化

```tsx
// ✅ 最適化された画像コンポーネント
import Image from "next/image";

<Image
  src={thumbnailUrl}
  alt=""
  width={168}
  height={94}
  priority={false}
  loading="lazy"
  sizes="(max-width: 768px) 100vw, 168px"
  className="rounded-lg"
/>;
```

### フォント最適化

```typescript
// layout.tsx
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});
```

## 🔍 SEO とメタデータ

### 構造化メタデータ

```typescript
// app/layout.tsx
export const metadata: Metadata = {
  title: {
    default: "アプリ名",
    template: "%s | アプリ名",
  },
  description: "詳細な説明文",
  keywords: ["キーワード1", "キーワード2"],
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "https://example.com",
    siteName: "サイト名",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
```

### ページ固有のメタデータ

```typescript
// app/dashboard/page.tsx
export const metadata: Metadata = {
  title: "ダッシュボード",
  description: "ユーザー専用ダッシュボード",
};
```

## 🚨 エラーハンドリング

### ページレベルエラーハンドリング

```tsx
// app/dashboard/error.tsx
"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="error-container">
      <h2>問題が発生しました</h2>
      <button onClick={reset}>再試行</button>
    </div>
  );
}
```

### グローバルエラーハンドリング

```tsx
// app/global-error.tsx
"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <button onClick={reset}>Try again</button>
      </body>
    </html>
  );
}
```

### Loading UI

```tsx
// app/dashboard/loading.tsx
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="h-24 w-full" />
      ))}
    </div>
  );
}
```

## ♿ アクセシビリティ

### セマンティック HTML

```tsx
// ✅ 適切なセマンティック要素
<main>
  <section aria-labelledby="dashboard-title">
    <h1 id="dashboard-title">ダッシュボード</h1>
    <article>
      <h2>動画フィード</h2>
      {/* コンテンツ */}
    </article>
  </section>
</main>
```

### ARIA 属性

```tsx
// ✅ 適切なARIA属性
<button
  aria-label="動画を再生"
  aria-expanded={isExpanded}
  aria-controls="video-content"
>
  再生
</button>

<div
  id="video-content"
  role="region"
  aria-live="polite"
>
  {/* 動的コンテンツ */}
</div>
```

### キーボードナビゲーション

```tsx
// ✅ フォーカス管理
<Link
  href="/dashboard"
  className="focus:outline-none focus:ring-2 focus:ring-primary"
>
  ダッシュボード
</Link>
```

## 🛠️ 開発者体験の向上

### TypeScript 設定

```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true
  }
}
```

### ESLint 設定

```javascript
// eslint.config.mjs
export default [
  {
    rules: {
      "@next/next/no-img-element": "error",
      "react-hooks/exhaustive-deps": "error",
    },
  },
];
```

### 開発ツール

```json
// package.json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "analyze": "ANALYZE=true next build",
    "lint": "next lint",
    "type-check": "tsc --noEmit"
  }
}
```

## 📊 パフォーマンス測定

### Core Web Vitals 監視

```typescript
// app/layout.tsx
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
```

### Bundle 分析

```bash
# Bundle size analysis
npm run build
npx @next/bundle-analyzer
```

## 🎨 UI/UX ベストプラクティス

### ローディング状態

```tsx
// ✅ 段階的読み込みとスケルトン
{
  isLoading ? (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <Skeleton key={i} className="h-24 w-full" />
      ))}
    </div>
  ) : (
    <VideoList videos={videos} />
  );
}
```

### インタラクションフィードバック

```tsx
// ✅ ホバー・フォーカス効果
<button
  className="
  px-4 py-2 
  bg-primary text-primary-foreground
  hover:bg-primary/90 
  focus:ring-2 focus:ring-primary
  transition-colors
  disabled:opacity-50 disabled:cursor-not-allowed
"
>
  送信
</button>
```

## 🔒 セキュリティ

### CSP 設定

```typescript
// next.config.ts
const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; script-src 'self' 'unsafe-inline';",
          },
        ],
      },
    ];
  },
};
```

### 環境変数管理

```typescript
// lib/env.ts
import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string(),
  NEXT_PUBLIC_APP_URL: z.string().url(),
});

export const env = envSchema.parse(process.env);
```

## 📝 チェックリスト

### 🎯 開発前

- [ ] App Router を使用
- [ ] TypeScript を有効化
- [ ] ESLint と Prettier を設定
- [ ] tailwindcss を設定

### 🚀 開発中

- [ ] Server Components を優先
- [ ] 適切な loading.tsx と error.tsx を作成
- [ ] メタデータを設定
- [ ] アクセシビリティを考慮
- [ ] パフォーマンスを最適化

### ✅ デプロイ前

- [ ] Lighthouse スコア 90+
- [ ] TypeScript エラーなし
- [ ] ESLint エラーなし
- [ ] Bundle size を確認
- [ ] Core Web Vitals を測定

## 🔗 参考リンク

- [Next.js 公式ドキュメント](https://nextjs.org/docs)
- [Next.js App Router](https://nextjs.org/docs/app)
- [React Server Components](https://react.dev/reference/react/use-server)
- [Web Vitals](https://web.dev/vitals/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

このガイドは継続的に更新され、最新のベストプラクティスを反映していきます。
