import { UserSyncPayload } from '@/types';

// ユーザー情報の正規化
export const normalizeUserPayload = (clerkUser: any): UserSyncPayload => {
  return {
    clerkId: clerkUser.id,
    email: clerkUser.primaryEmailAddress?.emailAddress || clerkUser.emailAddresses?.[0]?.emailAddress,
    externalProvider: clerkUser.externalAccounts?.[0]?.provider || null,
    externalId: clerkUser.externalAccounts?.[0]?.externalId || null,
  };
};

// ユーザーロールのチェック
export const hasRole = (user: any, role: string): boolean => {
  return user?.publicMetadata?.role === role;
};

// 管理者権限のチェック
export const isAdmin = (user: any): boolean => {
  return hasRole(user, 'admin');
};

// プレミアムユーザーのチェック
export const isPremiumUser = (user: any): boolean => {
  return hasRole(user, 'premium') || isAdmin(user);
};

// アクセス権限のチェック
export const canAccessFeature = (user: any, feature: string): boolean => {
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
export const decodeJWT = (token: string) => {
  try {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
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