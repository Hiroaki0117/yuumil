# Coding Standards

## TypeScript Guidelines

### 基本設定
- Strict modeを有効化
- 明示的な型定義を推奨
- `any`型の使用は原則禁止

### 型定義のベストプラクティス
```typescript
// Good: 明示的な型定義
interface VideoProps {
  id: string;
  title: string;
  thumbnailUrl: string;
  viewCount: number;
}

// Bad: 暗黙的なany
function processVideo(video) { // ❌
  return video.title;
}

// Good: 適切な型付け
function processVideo(video: VideoProps): string { // ✅
  return video.title;
}
```

### 型の配置
- コンポーネント固有の型: 同じファイル内で定義
- 共有される型: `/src/types/`に配置
- APIレスポンス型: `/src/types/api.ts`
- データベース型: Prismaが自動生成

## React/Next.js Patterns

### Server Components vs Client Components

#### Server Components (デフォルト)
```typescript
// src/app/dashboard/page.tsx
import { getVideos } from '@/dal/videos';

export default async function DashboardPage() {
  const videos = await getVideos(); // サーバーサイドでデータ取得
  
  return (
    <div>
      <h1>Dashboard</h1>
      <VideoList videos={videos} />
    </div>
  );
}
```

#### Client Components
```typescript
// src/components/features/videos/video-card.tsx
"use client"; // 必須: クライアントコンポーネントの宣言

import { useState } from 'react';

export function VideoCard({ video }: { video: Video }) {
  const [isLiked, setIsLiked] = useState(false);
  
  // インタラクティブな要素を含む
  return (
    <div onClick={() => setIsLiked(!isLiked)}>
      {/* ... */}
    </div>
  );
}
```

### コンポーネントの構造化
```typescript
// 1. Imports
import { FC } from 'react';
import { VideoProps } from '@/types';

// 2. Type definitions (ローカル型のみ)
interface LocalProps extends VideoProps {
  onSelect?: (id: string) => void;
}

// 3. Component definition
export const VideoCard: FC<LocalProps> = ({ 
  title, 
  thumbnailUrl,
  onSelect 
}) => {
  // 4. Hooks
  const [state, setState] = useState();
  
  // 5. Event handlers
  const handleClick = () => {
    onSelect?.(id);
  };
  
  // 6. Render
  return (
    <div onClick={handleClick}>
      {/* ... */}
    </div>
  );
};
```

## Data Access Layer (DAL)

### DALパターンの実装
```typescript
// src/dal/videos.ts
import { prisma } from '@/lib/database';
import { Video } from '@prisma/client';

// データ取得関数
export async function getVideosByGenre(
  genreIds: string[]
): Promise<Video[]> {
  return prisma.video.findMany({
    where: {
      genreId: { in: genreIds }
    },
    orderBy: { createdAt: 'desc' }
  });
}

// データ更新関数
export async function updateVideoViews(
  videoId: string,
  userId: string
): Promise<void> {
  await prisma.videoView.create({
    data: { videoId, userId }
  });
}
```

### DAL使用ルール
- ビジネスロジックとデータアクセスを分離
- Prismaクライアントの直接使用は禁止
- エラーハンドリングはDAL層で実装

## Import Order

インポートは以下の順序で整理：

```typescript
// 1. React/Next.js
import { FC, useState } from 'react';
import { notFound } from 'next/navigation';

// 2. External libraries
import { format } from 'date-fns';
import { motion } from 'framer-motion';

// 3. Internal - absolute imports
import { Button } from '@/components/ui/button';
import { getVideos } from '@/dal/videos';

// 4. Internal - relative imports
import { VideoCard } from './video-card';

// 5. Types
import type { Video } from '@/types';

// 6. Styles (if any)
import styles from './styles.module.css';
```

## ファイル・ディレクトリ命名規則

### ファイル名
- コンポーネント: `kebab-case.tsx` (例: `video-card.tsx`)
- ユーティリティ: `camelCase.ts` (例: `formatDate.ts`)
- 型定義: `camelCase.ts` (例: `videoTypes.ts`)

### エクスポート
- コンポーネント: PascalCase
- 関数: camelCase
- 定数: UPPER_SNAKE_CASE

```typescript
// video-card.tsx
export const VideoCard = () => { };

// utils.ts
export const formatViewCount = (count: number) => { };

// constants.ts
export const MAX_VIDEO_LENGTH = 3600;
```

## スタイリング

### Tailwind CSS使用規則
```tsx
// Good: Tailwindクラスの整理された使用
<div className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-sm">
  <h2 className="text-2xl font-bold text-gray-900">Title</h2>
  <p className="text-base text-gray-600">Description</p>
</div>

// Bad: インラインスタイル
<div style={{ display: 'flex', padding: '24px' }}>
```

### レスポンシブデザイン
```tsx
// モバイルファーストアプローチ
<div className="p-4 md:p-6 lg:p-8">
  <h1 className="text-xl md:text-2xl lg:text-3xl">
    Responsive Title
  </h1>
</div>
```

## エラーハンドリング

### Server Components
```typescript
// src/app/videos/[id]/page.tsx
export default async function VideoPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const video = await getVideo(params.id);
  
  if (!video) {
    notFound(); // 404ページへ
  }
  
  return <VideoDetail video={video} />;
}
```

### Client Components
```typescript
"use client";

export function VideoPlayer({ videoId }: { videoId: string }) {
  const [error, setError] = useState<Error | null>(null);
  
  if (error) {
    return <ErrorBoundary error={error} />;
  }
  
  // ...
}
```

## パフォーマンス最適化

### 画像の最適化
```tsx
import Image from 'next/image';

// Next.js Image componentを使用
<Image
  src={thumbnailUrl}
  alt={title}
  width={320}
  height={180}
  className="rounded-lg"
  loading="lazy"
/>
```

### データフェッチングの最適化
```typescript
// 並列フェッチング
export default async function DashboardPage() {
  // Promise.allで並列実行
  const [user, videos, trends] = await Promise.all([
    getCurrentUser(),
    getRecommendedVideos(),
    getTrendingVideos()
  ]);
  
  return <Dashboard user={user} videos={videos} trends={trends} />;
}
```

## セキュリティ

### 環境変数の取り扱い
```typescript
// Good: サーバーサイドのみで使用
const apiKey = process.env.YOUTUBE_API_KEY; // サーバーコンポーネント内

// Bad: クライアントに露出
const apiKey = process.env.NEXT_PUBLIC_API_KEY; // 注意が必要
```

### ユーザー入力の検証
```typescript
// Zodを使用した検証例
import { z } from 'zod';

const videoSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().max(500),
  genreId: z.string().uuid()
});

export async function createVideo(input: unknown) {
  const validated = videoSchema.parse(input);
  // ...
}
```