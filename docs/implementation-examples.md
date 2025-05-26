# 実装例とテンプレートコード

このドキュメントでは、プロジェクト構造ガイドに基づいた具体的な実装例とテンプレートコードを提供します。

## 目次

1. [初期セットアップ](#初期セットアップ)
2. [型定義テンプレート](#型定義テンプレート)
3. [コンポーネントテンプレート](#コンポーネントテンプレート)
4. [ユーティリティテンプレート](#ユーティリティテンプレート)
5. [API ルートテンプレート](#apiルートテンプレート)
6. [設定ファイル](#設定ファイル)

## 初期セットアップ

### ディレクトリ作成スクリプト

```bash
#!/bin/bash
# create-structure.sh

# メインディレクトリ
mkdir -p src/{types,components,lib,app,dal}

# 型定義
mkdir -p src/types

# コンポーネント
mkdir -p src/components/{ui,common,forms,features,layout}

# ユーティリティ
mkdir -p src/lib/{constants,validations,auth,database,hooks}

# APIルート
mkdir -p src/app/api/{auth,users,health}

echo "プロジェクト構造を作成しました"
```

### package.json のスクリプト追加

```json
{
  "scripts": {
    "setup": "chmod +x scripts/create-structure.sh && ./scripts/create-structure.sh",
    "type-check": "tsc --noEmit",
    "lint:fix": "next lint --fix"
  }
}
```

## 型定義テンプレート

### src/types/database.ts

```typescript
// データベース型定義（Supabase等で自動生成される場合のテンプレート）
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];
```

### src/types/api.ts

```typescript
import { Database } from "./database";

// データベース型の再エクスポート
export type User = Tables<"users">;

// API パラメータ型
export interface PaginationParams {
  limit?: number;
  offset?: number;
  cursor?: string | null;
}

export interface SearchParams extends PaginationParams {
  query?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

// API レスポンス型
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    total: number;
    page: number;
    limit: number;
    hasNext: boolean;
  };
}

// エラーレスポンス型
export interface ApiError {
  error: string;
  code?: string;
  details?: Record<string, any>;
}

// フォーム型
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm extends LoginForm {
  confirmPassword: string;
  name: string;
}
```

### src/types/ui.ts

```typescript
// UIコンポーネント共通型
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// ボタンコンポーネント型
export interface ButtonProps extends BaseComponentProps {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
}

// フォームコンポーネント型
export interface FormFieldProps extends BaseComponentProps {
  label?: string;
  error?: string;
  required?: boolean;
  helpText?: string;
}

export interface InputProps extends FormFieldProps {
  type?: "text" | "email" | "password" | "number";
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

// モーダル型
export interface ModalProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

// テーブル型
export interface TableColumn<T> {
  key: keyof T;
  title: string;
  width?: string;
  sortable?: boolean;
  render?: (value: any, record: T) => React.ReactNode;
}

export interface TableProps<T> extends BaseComponentProps {
  data: T[];
  columns: TableColumn<T>[];
  loading?: boolean;
  onRowClick?: (record: T) => void;
}
```

## コンポーネントテンプレート

### UI コンポーネント

```typescript
// src/components/ui/button.tsx
import React from "react";
import { cn } from "@/lib/utils";
import { ButtonProps } from "@/types/ui";

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  className,
  onClick,
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary:
      "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    ghost: "text-gray-700 hover:bg-gray-100 focus:ring-gray-500",
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && <span className="mr-2">Loading...</span>}
      {children}
    </button>
  );
};

export default Button;
```

### フォームコンポーネント

```typescript
// src/components/forms/input.tsx
import React from "react";
import { cn } from "@/lib/utils";
import { InputProps } from "@/types/ui";

const Input: React.FC<InputProps> = ({
  label,
  error,
  required = false,
  helpText,
  className,
  ...inputProps
}) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <input
        className={cn(
          "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm",
          "focus:outline-none focus:ring-blue-500 focus:border-blue-500",
          error && "border-red-500 focus:ring-red-500 focus:border-red-500",
          className
        )}
        {...inputProps}
      />

      {error && <p className="text-sm text-red-600">{error}</p>}

      {helpText && !error && (
        <p className="text-sm text-gray-500">{helpText}</p>
      )}
    </div>
  );
};

export default Input;
```

### 機能固有コンポーネント

```typescript
// src/components/features/auth/login-form.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/button";
import Input from "@/components/forms/input";
import { LoginForm } from "@/types/api";
import { validateEmail, validateRequired } from "@/lib/validations";

interface LoginFormProps {
  onSuccess?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginForm>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<LoginForm>>({});
  const [loading, setLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<LoginForm> = {};

    const emailError = validateEmail(formData.email);
    if (emailError) newErrors.email = emailError;

    const passwordError = validateRequired(formData.password, "パスワード");
    if (passwordError) newErrors.password = passwordError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        onSuccess?.();
        router.push("/dashboard");
      } else {
        const error = await response.json();
        setErrors({ email: error.message });
      }
    } catch (error) {
      setErrors({ email: "ログインに失敗しました" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="email"
        label="メールアドレス"
        value={formData.email}
        onChange={(value) => setFormData((prev) => ({ ...prev, email: value }))}
        error={errors.email}
        required
      />

      <Input
        type="password"
        label="パスワード"
        value={formData.password}
        onChange={(value) =>
          setFormData((prev) => ({ ...prev, password: value }))
        }
        error={errors.password}
        required
      />

      <Button type="submit" loading={loading} className="w-full">
        ログイン
      </Button>
    </form>
  );
};

export default LoginForm;
```

## ユーティリティテンプレート

### src/lib/constants/index.ts

```typescript
// アプリケーション設定
export const APP_CONFIG = {
  APP_NAME: "MyApp",
  VERSION: "1.0.0",
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ITEMS_PER_PAGE: 20,
  MAX_ITEMS_PER_REQUEST: 100,
  SESSION_TIMEOUT: 24 * 60 * 60 * 1000, // 24時間
} as const;

// URL設定
export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/dashboard",
  PROFILE: "/profile",
  SETTINGS: "/settings",
} as const;

// API エンドポイント
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/api/auth/login",
    LOGOUT: "/api/auth/logout",
    REGISTER: "/api/auth/register",
    REFRESH: "/api/auth/refresh",
  },
  USERS: {
    LIST: "/api/users",
    PROFILE: "/api/users/profile",
    UPDATE: "/api/users/update",
  },
  HEALTH: "/api/health",
} as const;

// HTTP ステータスコード
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;

// エラーメッセージ
export const ERROR_MESSAGES = {
  // 認証エラー
  UNAUTHORIZED: "ログインが必要です",
  INVALID_CREDENTIALS: "メールアドレスまたはパスワードが正しくありません",
  TOKEN_EXPIRED: "セッションが期限切れです。再度ログインしてください",

  // バリデーションエラー
  REQUIRED_FIELD: (field: string) => `${field}は必須です`,
  INVALID_EMAIL: "有効なメールアドレスを入力してください",
  PASSWORD_TOO_SHORT: "パスワードは8文字以上である必要があります",

  // API エラー
  FETCH_ERROR: "データの取得に失敗しました",
  SAVE_ERROR: "保存に失敗しました",
  DELETE_ERROR: "削除に失敗しました",
  NETWORK_ERROR: "ネットワークエラーが発生しました",

  // 一般的なエラー
  UNEXPECTED_ERROR: "予期しないエラーが発生しました",
  FILE_TOO_LARGE: "ファイルサイズが大きすぎます",
} as const;

// 成功メッセージ
export const SUCCESS_MESSAGES = {
  SAVE_SUCCESS: "正常に保存されました",
  UPDATE_SUCCESS: "更新が完了しました",
  DELETE_SUCCESS: "削除が完了しました",
  LOGIN_SUCCESS: "ログインしました",
  LOGOUT_SUCCESS: "ログアウトしました",
} as const;
```

### src/lib/validations/index.ts

```typescript
// 基本バリデーション
export const validateRequired = (
  value: any,
  fieldName: string
): string | null => {
  if (value === null || value === undefined || value === "") {
    return ERROR_MESSAGES.REQUIRED_FIELD(fieldName);
  }
  return null;
};

export const validateMinLength = (
  value: string,
  minLength: number,
  fieldName: string
): string | null => {
  if (value.length < minLength) {
    return `${fieldName}は${minLength}文字以上で入力してください`;
  }
  return null;
};

export const validateMaxLength = (
  value: string,
  maxLength: number,
  fieldName: string
): string | null => {
  if (value.length > maxLength) {
    return `${fieldName}は${maxLength}文字以内で入力してください`;
  }
  return null;
};

// 文字列バリデーション
export const validateEmail = (email: string): string | null => {
  if (!email) return ERROR_MESSAGES.REQUIRED_FIELD("メールアドレス");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return ERROR_MESSAGES.INVALID_EMAIL;
  }
  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password) return ERROR_MESSAGES.REQUIRED_FIELD("パスワード");

  if (password.length < 8) {
    return ERROR_MESSAGES.PASSWORD_TOO_SHORT;
  }
  return null;
};

export const validateUrl = (url: string): string | null => {
  try {
    new URL(url);
    return null;
  } catch {
    return "有効なURLを入力してください";
  }
};

// 数値バリデーション
export const validatePositiveNumber = (
  value: number,
  fieldName: string
): string | null => {
  if (value <= 0) {
    return `${fieldName}は正の数値である必要があります`;
  }
  return null;
};

export const validateRange = (
  value: number,
  min: number,
  max: number,
  fieldName: string
): string | null => {
  if (value < min || value > max) {
    return `${fieldName}は${min}から${max}の間で入力してください`;
  }
  return null;
};

// 配列バリデーション
export const validateArrayLength = <T>(
  array: T[],
  min: number,
  max: number,
  fieldName: string
): string | null => {
  if (array.length < min) {
    return `${fieldName}は最低${min}個選択してください`;
  }
  if (array.length > max) {
    return `${fieldName}は最大${max}個まで選択できます`;
  }
  return null;
};

// 複合バリデーション
export const validateForm = <T extends Record<string, any>>(
  data: T,
  rules: Record<keyof T, Array<(value: any) => string | null>>
): Record<keyof T, string> | null => {
  const errors: Partial<Record<keyof T, string>> = {};

  for (const [field, validators] of Object.entries(rules) as [
    keyof T,
    Array<(value: any) => string | null>
  ][]) {
    for (const validator of validators) {
      const error = validator(data[field]);
      if (error) {
        errors[field] = error;
        break; // 最初のエラーで停止
      }
    }
  }

  return Object.keys(errors).length > 0
    ? (errors as Record<keyof T, string>)
    : null;
};

// 型ガード
export const isString = (value: any): value is string =>
  typeof value === "string";
export const isNumber = (value: any): value is number =>
  typeof value === "number";
export const isBoolean = (value: any): value is boolean =>
  typeof value === "boolean";
export const isArray = (value: any): value is any[] => Array.isArray(value);
export const isObject = (value: any): value is object =>
  value !== null && typeof value === "object" && !Array.isArray(value);
```

## API ルートテンプレート

### GET API

```typescript
// src/app/api/users/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { ERROR_MESSAGES, HTTP_STATUS } from "@/lib/constants";
import { validateRange } from "@/lib/validations";

export async function GET(request: NextRequest) {
  try {
    // 認証チェック
    const user = await auth(request);
    if (!user) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.UNAUTHORIZED },
        { status: HTTP_STATUS.UNAUTHORIZED }
      );
    }

    // クエリパラメータの取得
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const search = searchParams.get("search") || "";

    // バリデーション
    const limitError = validateRange(limit, 1, 100, "limit");
    if (limitError) {
      return NextResponse.json(
        { error: limitError },
        { status: HTTP_STATUS.BAD_REQUEST }
      );
    }

    // データ取得
    const offset = (page - 1) * limit;
    const users = await getUserList({ limit, offset, search });
    const total = await getUserCount({ search });

    return NextResponse.json({
      data: users,
      pagination: {
        total,
        page,
        limit,
        hasNext: offset + limit < total,
      },
    });
  } catch (error) {
    console.error("GET /api/users error:", error);
    return NextResponse.json(
      { error: ERROR_MESSAGES.FETCH_ERROR },
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR }
    );
  }
}
```

### POST API

```typescript
// src/app/api/users/route.ts
export async function POST(request: NextRequest) {
  try {
    // 認証チェック
    const user = await auth(request);
    if (!user) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.UNAUTHORIZED },
        { status: HTTP_STATUS.UNAUTHORIZED }
      );
    }

    // リクエストボディの取得
    const body = await request.json();

    // バリデーション
    const errors = validateForm(body, {
      email: [
        (value) => validateRequired(value, "メールアドレス"),
        (value) => validateEmail(value),
      ],
      name: [
        (value) => validateRequired(value, "名前"),
        (value) => validateMaxLength(value, 100, "名前"),
      ],
    });

    if (errors) {
      return NextResponse.json(
        { error: "バリデーションエラー", details: errors },
        { status: HTTP_STATUS.BAD_REQUEST }
      );
    }

    // データ作成
    const newUser = await createUser(body);

    return NextResponse.json(
      { data: newUser },
      { status: HTTP_STATUS.CREATED }
    );
  } catch (error) {
    console.error("POST /api/users error:", error);
    return NextResponse.json(
      { error: ERROR_MESSAGES.SAVE_ERROR },
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR }
    );
  }
}
```

## 設定ファイル

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/lib/*": ["./src/lib/*"],
      "@/types/*": ["./src/types/*"],
      "@/app/*": ["./src/app/*"],
      "@/dal/*": ["./src/dal/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules", "docs"]
}
```

### .env.example

```env
# データベース設定
DATABASE_URL=postgresql://username:password@localhost:5432/dbname
DIRECT_URL=postgresql://username:password@localhost:5432/dbname

# 認証設定
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000

# 外部API
EXTERNAL_API_KEY=your-api-key
EXTERNAL_API_URL=https://api.example.com

# アプリケーション設定
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development

# その他
LOG_LEVEL=info
ENABLE_ANALYTICS=false
```

---

これらのテンプレートは実際のプロジェクトに応じてカスタマイズしてください。
