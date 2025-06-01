# Onboarding実装詳細

## 概要
このドキュメントでは、Yuumilのオンボーディング機能の実装詳細について説明します。

## アーキテクチャ

### ファイル構成
```
src/app/onboarding/
├── page.tsx                    # サーバーコンポーネント（データフェッチ）
├── onboarding-client.tsx       # メインクライアントコンポーネント
├── components/
│   ├── welcome-animation.tsx   # ウェルカムアニメーション
│   ├── progress-indicator.tsx  # 進行状況インジケーター
│   ├── selection-manager.tsx   # 選択管理UI
│   ├── genre-selector.tsx      # ジャンル選択グリッド
│   ├── keyword-input-enhanced.tsx # キーワード入力
│   └── completion-animation.tsx # 完了アニメーション
└── __tests__/
    └── onboarding.test.tsx     # ユニットテスト
```

## コンポーネント詳細

### 1. OnboardingClient
メインのオーケストレーションコンポーネント。

**主な機能:**
- ステップ管理（welcome → selection → complete）
- 選択状態の管理
- バリデーション
- API呼び出しとエラーハンドリング

**状態管理:**
```typescript
const [selected, setSelected] = useState<SelectedItem[]>([])
const [isLoading, setIsLoading] = useState(false)
const [showCompletion, setShowCompletion] = useState(false)
const [currentStep, setCurrentStep] = useState<'welcome' | 'selection' | 'complete'>('welcome')
const [showError, setShowError] = useState(false)
```

### 2. WelcomeAnimation
初回表示時のウェルカムアニメーション。

**特徴:**
- パーティクル背景アニメーション
- ロゴのスプリングアニメーション
- ローテーションする単語表示
- 自動的に3秒後に次のステップへ

### 3. ProgressIndicator
選択数と進行状況を視覚的に表示。

**機能:**
- リアルタイムカウンター
- プログレスバー
- 完了時の色変更
- シマーエフェクト

### 4. SelectionManager
選択されたアイテムの表示と管理。

**機能:**
- ドラッグ&ドロップ対応（Framer Motion Reorder）
- アイテムタイプ別の色分け（ジャンル：紫、キーワード：シアン）
- ホバーで削除ボタン表示
- グロー効果アニメーション
- エラー状態の表示

### 5. GenreSelector
ジャンル選択のグリッド表示。

**機能:**
- 検索フィルター
- カテゴリフィルター
- 選択状態の視覚的フィードバック
- パーティクルエフェクト（選択時）
- レスポンシブグリッドレイアウト

### 6. KeywordInputEnhanced
キーワード入力の強化版。

**機能:**
- オートコンプリート
- サジェスト表示
- キーボードナビゲーション
- 成功アニメーション
- リアルタイムバリデーション

### 7. CompletionAnimation
保存完了時の祝福アニメーション。

**機能:**
- パーティクル爆発エフェクト
- 成功アイコンアニメーション
- 回転する星
- プログレスバー

## アニメーション戦略

### 使用技術
- **Framer Motion**: 複雑なアニメーションとジェスチャー
- **CSS Animations**: 軽量なアニメーション
- **GPU最適化**: transform と opacity のみ使用

### パフォーマンス最適化
1. **遅延ローディング**: コンポーネントの段階的表示
2. **メモ化**: useMemo/useCallbackの活用
3. **条件付きレンダリング**: AnimatePresenceで不要な要素を削除

## バリデーションロジック

### 選択ルール
- 最小: 1個
- 最大: 3個（APP_CONFIG.MAX_TAGSで設定可能）
- ジャンルとキーワードの合計で計算

### エラーハンドリング
1. **選択なしエラー**: 振動アニメーションで視覚的フィードバック
2. **上限到達**: 選択不可状態とdisabledスタイル
3. **保存エラー**: エラーメッセージ表示

## データフロー

```
1. page.tsx (Server Component)
   ↓ ジャンルデータフェッチ
2. OnboardingClient
   ↓ 状態管理
3. 各コンポーネント
   ↓ ユーザーインタラクション
4. DAL関数呼び出し
   - insertUserGenres()
   - upsertKeywords()
   - insertUserKeywords()
```

## アクセシビリティ

1. **キーボード操作**
   - Tab: フォーカス移動
   - Enter: 選択/決定
   - Arrow keys: サジェストナビゲーション

2. **ARIA属性**
   - role属性の適切な使用
   - aria-label for アイコンボタン

3. **視覚的フィードバック**
   - フォーカスリング
   - ホバー状態
   - 選択状態

## セキュリティ考慮

1. **入力サニタイゼーション**
   - XSS防止のためのエスケープ処理
   - 文字数制限

2. **APIレート制限**
   - 保存処理のデバウンス
   - 重複送信防止

## 今後の改善案

1. **パフォーマンス**
   - 仮想スクロールの実装（大量ジャンル対応）
   - Service Workerでのキャッシュ

2. **機能拡張**
   - ジャンル推奨AI
   - ソーシャル連携
   - アナリティクス統合

3. **UX改善**
   - オンボーディングのA/Bテスト
   - プログレッシブディスクロージャー
   - マイクロインタラクションの追加