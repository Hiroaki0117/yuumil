'use client';

import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes';

/**
 * アプリ共通のダークモード用 ThemeProvider
 * - ThemeProviderProps をそのまま継承することで
 *   attribute / defaultTheme / enableSystem など自由に渡せる
 */
export function ThemeProvider(props: ThemeProviderProps) {
  return <NextThemesProvider {...props} />;
}
