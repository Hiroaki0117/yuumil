// アプリケーション設定
export const APP_CONFIG = {
  MAX_TAGS: 3,
  PAGE_SIZE: 20,
  VIDEO_FETCH_LIMIT: 20,
  REFRESH_INTERVAL: 12 * 60 * 60 * 1000, // 12時間
} as const;

// URL定数
export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  ONBOARDING: '/onboarding',
  PROFILE: '/profile',
  TRENDS: '/trends',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
} as const;

// API エンドポイント
export const API_ENDPOINTS = {
  VIDEOS: {
    NEWS: '/api/videos/news',
    TRENDS: '/api/videos/trends',
    SINGLE: '/api/videos/single',
  },
  TAGS: '/api/tags',
  USER_SYNC: '/api/auth/sync',
} as const;

// エラーメッセージ
export const ERROR_MESSAGES = {
  UNAUTHORIZED: 'ログインが必要です',
  FETCH_ERROR: 'データの取得に失敗しました',
  SAVE_ERROR: '保存に失敗しました',
  VALIDATION_ERROR: '入力内容に誤りがあります',
  NETWORK_ERROR: 'ネットワークエラーが発生しました',
} as const;

// 成功メッセージ
export const SUCCESS_MESSAGES = {
  SAVE_SUCCESS: '正常に保存されました',
  UPDATE_SUCCESS: '更新が完了しました',
  DELETE_SUCCESS: '削除が完了しました',
} as const; 