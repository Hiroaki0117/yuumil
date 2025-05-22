import { PerfType, PeriodType } from '@/types';

// 文字列バリデーション
export const validateRequired = (value: string, fieldName: string): string | null => {
  if (!value || value.trim().length === 0) {
    return `${fieldName}は必須です`;
  }
  return null;
};

export const validateMinLength = (value: string, minLength: number, fieldName: string): string | null => {
  if (value.length < minLength) {
    return `${fieldName}は${minLength}文字以上で入力してください`;
  }
  return null;
};

export const validateMaxLength = (value: string, maxLength: number, fieldName: string): string | null => {
  if (value.length > maxLength) {
    return `${fieldName}は${maxLength}文字以内で入力してください`;
  }
  return null;
};

// Email バリデーション
export const validateEmail = (email: string): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return '有効なメールアドレスを入力してください';
  }
  return null;
};

// URL バリデーション
export const validateUrl = (url: string): string | null => {
  try {
    new URL(url);
    return null;
  } catch {
    return '有効なURLを入力してください';
  }
};

// 型ガード
export const isPerfType = (value: string): value is PerfType => {
  return value === 'genre' || value === 'keyword';
};

export const isPeriodType = (value: string): value is PeriodType => {
  return value === 'daily' || value === 'weekly';
};

// 数値バリデーション
export const validatePositiveNumber = (value: number, fieldName: string): string | null => {
  if (value <= 0) {
    return `${fieldName}は正の数値である必要があります`;
  }
  return null;
};

export const validateRange = (value: number, min: number, max: number, fieldName: string): string | null => {
  if (value < min || value > max) {
    return `${fieldName}は${min}から${max}の間で入力してください`;
  }
  return null;
};

// 配列バリデーション
export const validateArrayLength = <T>(array: T[], min: number, max: number, fieldName: string): string | null => {
  if (array.length < min) {
    return `${fieldName}は最低${min}個選択してください`;
  }
  if (array.length > max) {
    return `${fieldName}は最大${max}個まで選択できます`;
  }
  return null;
}; 