# Git Workflow

## Branch Strategy

### Branch Types
- **main** - プロダクションブランチ
  - 常にデプロイ可能な状態を維持
  - 直接のコミットは禁止
  
- **feature/<task-id>** - 機能開発
  - 新機能や改善の実装
  - mainブランチから作成
  - 例: `feature/add-video-filter`, `feature/123-user-profile`
  
- **hotfix/<issue-id>** - 緊急修正
  - プロダクションの重大なバグ修正
  - mainブランチから作成
  - 例: `hotfix/fix-auth-error`, `hotfix/456-payment-bug`

## Commit Guidelines

### Conventional Commits Format
すべてのコミットメッセージはConventional Commits仕様に従います。

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Commit Types
- **feat**: 新機能の追加
- **fix**: バグ修正
- **docs**: ドキュメントのみの変更
- **style**: コードの意味に影響しない変更（空白、フォーマット等）
- **refactor**: バグ修正や機能追加を伴わないコード変更
- **perf**: パフォーマンス改善
- **test**: テストの追加や修正
- **chore**: ビルドプロセスやツールの変更

### Examples
```bash
feat: add video filtering by genre
fix: resolve authentication error on dashboard
docs: update API documentation
refactor: simplify video card component
chore: update dependencies
```

### 日本語でのコミットメッセージ
本文は日本語で記述可能です：

```bash
feat: ジャンル別の動画フィルタリング機能を追加

ユーザーが好みのジャンルで動画を絞り込めるように
フィルタリング機能を実装しました。
```

## Pull Request Process

### 1. ブランチの作成とプッシュ
```bash
# featureブランチの作成
git checkout -b feature/your-feature-name

# 作業後、コミット
git add .
git commit -m "feat: add new feature"

# リモートへプッシュ
git push -u origin feature/your-feature-name
```

### 2. Pull Requestの作成
**重要**: Claude Codeでは、コミット後に自動的にPRを作成します。

```bash
gh pr create --title "feat: タイトル" --body "詳細な説明"
```

### 3. PR Template
```markdown
## Summary
- 変更の概要を箇条書きで記載

## Changes
- 具体的な変更内容
- 影響範囲
- 技術的な詳細

## Test plan
- [ ] 単体テストの実行
- [ ] 統合テストの実行
- [ ] 手動での動作確認
- [ ] リグレッションテスト

## Screenshots (if applicable)
UIの変更がある場合はスクリーンショットを添付
```

### 4. マージ戦略
- **Squash merge**を使用
- マージ後は自動的にブランチを削除

## Best Practices

### 1. コミットの粒度
- 1つのコミットは1つの論理的な変更に対応
- コミットは独立してrevertできる単位に

### 2. ブランチの管理
- 長期間のブランチは避ける（最大1週間）
- 定期的にmainブランチの変更を取り込む

```bash
# mainの最新を取り込む
git checkout main
git pull origin main
git checkout feature/your-feature
git merge main
```

### 3. コードレビュー
- セルフレビューを実施
- PR作成前にlintとtestを実行
- レビュアーへのコンテキスト提供

### 4. 自動化
Claude Codeを使用する場合、以下が自動化されます：
- ブランチ作成
- コミットメッセージの生成
- PR作成
- リンクの提供

## Troubleshooting

### コンフリクトの解決
```bash
# mainの最新を取得
git fetch origin main

# マージ実行
git merge origin/main

# コンフリクトを解決後
git add .
git commit -m "fix: resolve merge conflicts"
```

### 誤ったコミットの修正
```bash
# 直前のコミットメッセージを修正
git commit --amend -m "新しいメッセージ"

# 直前のコミットに変更を追加
git add .
git commit --amend --no-edit
```