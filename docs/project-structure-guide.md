# Next.js プロジェクト構造ガイド

このドキュメントは、Next.js + TypeScript プロジェクトで実装すべきベストプラクティスなプロジェクト構造について説明します。

## 目次

1. [全体構造](#全体構造)
2. [型定義の整理](#型定義の整理)
3. [コンポーネントの分類](#コンポーネントの分類)
4. [ユーティリティの整理](#ユーティリティの整理)
5. [API ルートの設計](#apiルートの設計)
6. [実装チェックリスト](#実装チェックリスト)
7. [ネーミング規約](#ネーミング規約)

## 全体構造

```
src/
├── types/                 # 型定義
│   ├── index.ts          # エクスポート用
│   ├── database.ts       # データベース型
│   ├── api.ts           # API関連型
│   └── ui.ts            # UI関連型
├── components/            # コンポーネント
│   ├── ui/              # 再利用可能なUIコンポーネント
│   ├── common/          # 共通コンポーネント
│   ├── forms/           # フォーム関連
│   ├── features/        # 機能固有コンポーネント
│   │   ├── {feature}/   # 機能名ディレクトリ
│   └── layout/          # レイアウト関連
├── lib/                   # ユーティリティ
│   ├── constants/       # 定数定義
│   ├── validations/     # バリデーション
│   ├── auth/           # 認証関連
│   ├── database/       # データベース関連
│   ├── hooks/          # カスタムフック
│   └── utils.ts        # 汎用ユーティリティ
├── app/                   # App Router
│   ├── api/            # APIルート
│   │   ├── auth/       # 認証API
│   │   ├── users/      # ユーザーAPI
│   │   ├── {resource}/ # リソース別API
│   │   └── health/     # ヘルスチェック
│   ├── (group)/        # ルートグループ
│   └── {pages}/        # ページコンポーネント
├── dal/                   # データアクセス層
│   ├── {resource}.ts   # リソース別DAL
└── middleware.ts          # ミドルウェア
```

## 型定義の整理

### 1. ディレクトリ構造

```
src/types/
├── index.ts        # 全型定義のエクスポート
├── database.ts     # データベース型（生成ファイル）
├── api.ts          # API関連型
└── ui.ts           # UI関連型
```

### 2. 型定義の分類ルール

- **database.ts**: ORM/DB クライアントが生成する型
- **api.ts**: API リクエスト・レスポンス、ビジネスロジック型
- **ui.ts**: UI コンポーネントの Props、状態管理型
- **index.ts**: 各ファイルからの再エクスポート

### 3. 実装例

```typescript
// src/types/api.ts
export interface GetItemsParams {
  limit?: number;
  cursor?: string | null;
}

export interface ItemResponse {
  id: string;
  name: string;
  createdAt: string;
}

// src/types/index.ts
export * from "./database";
export * from "./api";
export * from "./ui";
```

## コンポーネントの分類

### 1. ディレクトリ構造の詳細

```
src/components/
├── ui/                    # Shadcn/ui等のベースコンポーネント
│   ├── button.tsx
│   ├── input.tsx
│   └── card.tsx
├── common/                # プロジェクト全体で使用する共通コンポーネント
│   ├── theme-provider.tsx
│   ├── loading-spinner.tsx
│   └── error-boundary.tsx
├── forms/                 # フォーム関連コンポーネント
│   ├── login-form.tsx
│   ├── contact-form.tsx
│   └── validation-input.tsx
├── features/              # 機能固有のコンポーネント
│   ├── auth/
│   │   ├── login-modal.tsx
│   │   └── user-profile.tsx
│   ├── dashboard/
│   │   ├── stats-card.tsx
│   │   └── recent-items.tsx
│   └── settings/
│       ├── preferences.tsx
│       └── account-settings.tsx
└── layout/                # レイアウト関連
    ├── header.tsx
    ├── sidebar.tsx
    └── footer.tsx
```

### 2. 分類ルール

- **ui/**: 汎用的で再利用可能なプリミティブコンポーネント
- **common/**: プロジェクト横断で使用する共通機能
- **forms/**: フォーム処理に特化したコンポーネント
- **features/**: 特定の機能・画面に依存するコンポーネント
- **layout/**: ページレイアウトに関するコンポーネント

### 3. コンポーネント設計原則

- 単一責任の原則: 1 つのコンポーネントは 1 つの責任のみ
- Props インターフェースを明確に定義
- 可能な限り Pure Component として実装
- 状態管理は適切なレベルで行う

## ユーティリティの整理

### 1. ディレクトリ構造

```
src/lib/
├── constants/       # アプリケーション定数
│   └── index.ts
├── validations/     # バリデーション関数
│   └── index.ts
├── auth/           # 認証・認可ユーティリティ
│   └── index.ts
├── database/       # データベース関連
│   ├── client.ts
│   └── queries.ts
├── hooks/          # カスタムフック
│   ├── useApi.ts
│   └── useLocalStorage.ts
└── utils.ts        # 汎用ユーティリティ
```

### 2. 各ディレクトリの役割

- **constants/**: 定数、設定値、エラーメッセージ等
- **validations/**: フォームバリデーション、型ガード関数
- **auth/**: 認証状態管理、権限チェック
- **database/**: DB 接続、クエリビルダー
- **hooks/**: 再利用可能なロジック

### 3. 実装例

```typescript
// src/lib/constants/index.ts
export const APP_CONFIG = {
  MAX_ITEMS: 100,
  PAGE_SIZE: 20,
} as const;

export const ERROR_MESSAGES = {
  UNAUTHORIZED: "ログインが必要です",
  FETCH_ERROR: "データの取得に失敗しました",
} as const;

// src/lib/validations/index.ts
export const validateEmail = (email: string): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email)
    ? null
    : "有効なメールアドレスを入力してください";
};
```

## API ルートの設計

### 1. ディレクトリ構造

```
src/app/api/
├── auth/              # 認証関連API
│   ├── signin/route.ts
│   ├── signup/route.ts
│   └── sync/route.ts
├── users/             # ユーザー管理API
│   ├── route.ts       # GET /api/users, POST /api/users
│   ├── [id]/route.ts  # GET/PUT/DELETE /api/users/[id]
│   └── [id]/preferences/route.ts
├── items/             # リソース管理API
│   ├── route.ts
│   ├── [id]/route.ts
│   └── trending/route.ts
└── health/            # システム監視
    └── route.ts
```

### 2. API 設計原則

- RESTful な URL 設計
- 適切な HTTP メソッドの使用
- 統一されたレスポンス形式
- エラーハンドリングの統一
- バリデーションの実装

### 3. 実装例

```typescript
// src/app/api/items/route.ts
import { NextResponse } from "next/server";
import { validateRequired } from "@/lib/validations";
import { ERROR_MESSAGES } from "@/lib/constants";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit") || "20";

    // データ取得ロジック
    const items = await getItems({ limit: parseInt(limit) });

    return NextResponse.json({ data: items });
  } catch (error) {
    return NextResponse.json(
      { error: ERROR_MESSAGES.FETCH_ERROR },
      { status: 500 }
    );
  }
}
```

## 実装チェックリスト

### 高優先度

- [ ] 型定義の統合 (`src/types/`ディレクトリ作成)
- [ ] 環境変数ファイルの整備 (`.env.example`作成)

### 中優先度

- [ ] コンポーネントの細分化
  - [ ] `src/components/features/`ディレクトリ作成
  - [ ] 機能別コンポーネント分離
  - [ ] 共通コンポーネントの抽出
- [ ] ユーティリティの整理
  - [ ] `src/lib/constants/`作成
  - [ ] `src/lib/validations/`作成
  - [ ] `src/lib/auth/`作成
- [ ] API ルートの整理
  - [ ] 機能別ディレクトリ分割
  - [ ] ヘルスチェックエンドポイント追加

### 低優先度

- [ ] 静的アセットの整理
- [ ] テスト環境の構築
- [ ] ドキュメントの充実

## ネーミング規約

### ファイル・ディレクトリ名

- **ディレクトリ**: kebab-case (`user-settings/`)
- **コンポーネントファイル**: kebab-case (`user-profile.tsx`)
- **ユーティリティファイル**: camelCase (`userUtils.ts`)
- **型定義ファイル**: kebab-case (`api-types.ts`)

### TypeScript

- **インターフェース**: PascalCase (`UserProfile`)
- **型エイリアス**: PascalCase (`UserRole`)
- **列挙型**: PascalCase (`UserStatus`)
- **変数・関数**: camelCase (`getUserProfile`)
- **定数**: UPPER_SNAKE_CASE (`MAX_RETRY_COUNT`)

### React コンポーネント

- **コンポーネント名**: PascalCase (`UserProfile`)
- **Props インターフェース**: `{ComponentName}Props` (`UserProfileProps`)
- **カスタムフック**: `use{Name}` (`useUserProfile`)

## 移行手順

### 既存プロジェクトの改善

1. **型定義の統合**

   ```bash
   mkdir src/types
   # 既存の型定義ファイルを整理・移動
   ```

2. **コンポーネントの分類**

   ```bash
   mkdir -p src/components/{ui,common,forms,features,layout}
   # 既存コンポーネントを適切なディレクトリに移動
   ```

3. **ユーティリティの整理**
   ```bash
   mkdir -p src/lib/{constants,validations,auth,database}
   # 既存のユーティリティを分類・移動
   ```

### 新規プロジェクトの開始

1. このガイドに従ってディレクトリ構造を作成
2. 型定義から開始して段階的に実装
3. コンポーネントは小さく始めて必要に応じて分割
4. 定数・ユーティリティは早期に整備

---

このガイドは実際のプロジェクト経験に基づいて作成されており、プロジェクトの規模や要件に応じて適宜調整してください。
