# Project Overview

## Yuumil - Video Discovery Platform

Yuumilは、パーソナライズされた動画フィードとトレンドコンテンツを提供する動画発見・推薦プラットフォームです。

## Technology Stack

### Core Technologies
- **Framework**: Next.js 15.3.2 (App Router)
- **Language**: TypeScript (Strict Mode)
- **Runtime**: Node.js with Turbopack

### Frontend
- **UI Library**: React 19
- **Component Library**: Radix UI primitives
- **Styling**: Tailwind CSS with Typography plugin
- **Animations**: Framer Motion
- **Icons**: Lucide React

### Backend & Data
- **Authentication**: Clerk
- **Database**: Supabase (PostgreSQL)
- **ORM**: Prisma
- **API**: YouTube Data API v3
- **Data Fetching**: SWR

## Architecture

### Directory Structure
```
src/
├── app/                    # Next.js App Router
│   ├── (marketing)/       # Marketing pages group
│   ├── api/               # API routes
│   ├── dashboard/         # Protected dashboard
│   ├── onboarding/        # User onboarding flow
│   ├── profile/           # User profile
│   └── trends/            # Trending content
├── components/            # React components
│   ├── common/           # Shared components
│   ├── features/         # Feature-specific components
│   ├── forms/            # Form components
│   ├── layout/           # Layout components
│   ├── marketing/        # Marketing components
│   └── ui/               # Base UI primitives
├── dal/                   # Data Access Layer
├── lib/                   # Utilities and configurations
└── types/                 # TypeScript definitions
```

### Key Design Patterns

#### 1. Server Components by Default
Next.js 15のServer Componentsを活用し、サーバーサイドでのデータフェッチを基本とします。

```typescript
// Example: src/app/dashboard/page.tsx
export default async function DashboardPage() {
  const user = await currentUser();
  const videos = await getVideosByGenres(user.preferences);
  return <DashboardClient videos={videos} />;
}
```

#### 2. Data Access Layer (DAL)
すべてのデータベース操作は`/src/dal/`を通じて行い、ビジネスロジックとデータ層を分離します。

```typescript
// Good: DAL経由でのデータアクセス
import { getVideosByGenres } from '@/dal/videos';

// Bad: 直接Prismaを使用
import { prisma } from '@/lib/db';
```

#### 3. Client/Server Component Split
インタラクティブな要素はClient Componentとして分離し、`"use client"`ディレクティブを使用します。

```typescript
// Server Component (default)
export default async function VideoList() {
  const videos = await fetchVideos();
  return <VideoGrid videos={videos} />;
}

// Client Component
"use client"
export function VideoCard({ video }: { video: Video }) {
  const [liked, setLiked] = useState(false);
  // Interactive logic
}
```

## Database Schema

### Main Tables
- `users` - ユーザー情報（Clerkと同期）
- `user_preferences` - ユーザーの好みとジャンル設定
- `videos` - 動画メタデータ
- `video_views` - 視聴履歴
- `genres` - ジャンルマスタ

## API Structure

### Public APIs
- `/api/health` - ヘルスチェック
- `/api/auth/sync` - Clerkとのユーザー同期

### Protected APIs
- `/api/videos/trends` - トレンド動画の取得
- `/api/videos/news` - ニュース動画の取得
- `/api/tags` - タグ情報の取得

## Environment Configuration

詳細な環境変数設定については`env.example`を参照してください：
- Supabase接続情報
- Clerk認証キー
- YouTube API設定
- アプリケーション設定