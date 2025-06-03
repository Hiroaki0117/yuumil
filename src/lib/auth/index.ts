import { UserSyncPayload } from '@/types';

// Clerkユーザー型の拡張
interface ClerkUserWithMetadata {
  id: string;
  primaryEmailAddress?: { emailAddress: string };
  emailAddresses?: Array<{ emailAddress: string }>;
  externalAccounts?: Array<{ provider: string; externalId: string }>;
  publicMetadata?: { role?: string };
}

// JWTペイロード型
interface JWTPayload {
  exp?: number;
  [key: string]: unknown;
}

// ユーザー情報の正規化
export const normalizeUserPayload = (clerkUser: ClerkUserWithMetadata): UserSyncPayload => {
  return {
    clerkId: clerkUser.id,
    email: clerkUser.primaryEmailAddress?.emailAddress || clerkUser.emailAddresses?.[0]?.emailAddress || '',
    externalProvider: clerkUser.externalAccounts?.[0]?.provider || null,
    externalId: clerkUser.externalAccounts?.[0]?.externalId || null,
  };
};

// ユーザーロールのチェック
export const hasRole = (user: ClerkUserWithMetadata, role: string): boolean => {
  return user?.publicMetadata?.role === role;
};

// 管理者権限のチェック
export const isAdmin = (user: ClerkUserWithMetadata): boolean => {
  return hasRole(user, 'admin');
};

// プレミアムユーザーのチェック
export const isPremiumUser = (user: ClerkUserWithMetadata): boolean => {
  return hasRole(user, 'premium') || isAdmin(user);
};

// アクセス権限のチェック
export const canAccessFeature = (user: ClerkUserWithMetadata, feature: string): boolean => {
  switch (feature) {
    case 'premium_videos':
      return isPremiumUser(user);
    case 'admin_panel':
      return isAdmin(user);
    default:
      return true; // デフォルトは全ユーザーアクセス可能
  }
};

// JWTトークンのデコード（簡易版）
export const decodeJWT = (token: string): JWTPayload | null => {
  try {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload)) as JWTPayload;
  } catch {
    return null;
  }
};

// セッション有効性チェック
export const isSessionValid = (token: string): boolean => {
  const decoded = decodeJWT(token);
  if (!decoded || !decoded.exp) return false;
  
  return decoded.exp * 1000 > Date.now();
}; 