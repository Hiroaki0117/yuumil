# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Quick Start

Yuumilは動画発見・推薦プラットフォームです。Next.js 15 (App Router)、TypeScript、Supabase、Clerkを使用しています。

## Essential Commands

```bash
# Development
npm run dev        # 開発サーバー起動 (Turbopack)
npm run build      # プロダクションビルド
npm run lint       # ESLint実行

# Database
npx prisma generate    # Prismaクライアント生成
npx prisma db push     # スキーマ変更をDBに反映
```

## Git Workflow

### 重要: 自動PR作成
**すべてのコミット後、必ず`gh pr create`でPRを自動作成してください。**

### Branch Strategy
- `main` - プロダクション
- `feature/<task-id>` - 機能開発
- `hotfix/<issue-id>` - 緊急修正

### Commit Format
Conventional Commits形式を使用:
```
feat: 新機能追加
fix: バグ修正
docs: ドキュメント更新
chore: その他の変更
```

## Key Architecture Patterns

1. **Server Components優先** - データフェッチはサーバーサイドで
2. **DALパターン** - DB操作は`/src/dal/`経由
3. **Strict TypeScript** - `any`型は禁止
4. **Client Directiveは最小限** - インタラクティブな要素のみ

## Documentation Structure

詳細なドキュメントは`/docs/`ディレクトリを参照:

- 📁 **docs/**
  - 📄 [project-overview.md](./docs/project-overview.md) - プロジェクト概要とアーキテクチャ
  - 📄 [coding-standards.md](./docs/coding-standards.md) - コーディング規約とベストプラクティス
  - 📁 **workflows/**
    - 📄 [git-workflow.md](./docs/workflows/git-workflow.md) - 詳細なGitワークフロー

## Environment Setup

必須の環境変数（`env.example`参照）:
- Supabase (URL, Anon Key, Service Role Key)
- Clerk (Publishable Key, Secret Key)
- YouTube API Key

## Quick Tips

- コンポーネントは機能別に整理: `/components/features/`
- APIルートは`/src/app/api/`に配置
- 型定義は`/src/types/`で管理
- インポートパスは`@/`を使用