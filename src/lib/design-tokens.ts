// デザイントークン定義
// スペーシング、ボーダー半径、その他の一貫したデザイン値を管理

export const spacing = {
  xs: '0.25rem',   // 4px
  sm: '0.5rem',    // 8px
  md: '1rem',      // 16px
  lg: '1.5rem',    // 24px
  xl: '2rem',      // 32px
  '2xl': '3rem',   // 48px
  '3xl': '4rem',   // 64px
  '4xl': '6rem',   // 96px
  '5xl': '8rem',   // 128px
} as const;

export const borderRadius = {
  none: '0',
  xs: '0.25rem',   // 4px
  sm: '0.375rem',  // 6px
  md: '0.5rem',    // 8px
  lg: '0.75rem',   // 12px
  xl: '1rem',      // 16px
  '2xl': '1.5rem', // 24px
  '3xl': '2rem',   // 32px
  full: '9999px',
} as const;

export const fontSize = {
  xs: '0.75rem',    // 12px
  sm: '0.875rem',   // 14px
  base: '1rem',     // 16px
  lg: '1.125rem',   // 18px
  xl: '1.25rem',    // 20px
  '2xl': '1.5rem',  // 24px
  '3xl': '1.875rem', // 30px
  '4xl': '2.25rem', // 36px
  '5xl': '3rem',    // 48px
  '6xl': '3.75rem', // 60px
} as const;

export const lineHeight = {
  tight: '1.25',
  snug: '1.375',
  normal: '1.5',
  relaxed: '1.625',
  loose: '2',
} as const;

export const fontWeight = {
  light: '300',
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
} as const;

export const boxShadow = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  none: '0 0 #0000',
} as const;

export const zIndex = {
  auto: 'auto',
  base: '0',
  overlay: '10',
  dropdown: '20',
  sticky: '30',
  fixed: '40',
  modal: '50',
  popover: '60',
  tooltip: '70',
  toast: '80',
  maximum: '9999',
} as const;

export const animation = {
  duration: {
    instant: '0ms',
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
    slower: '1000ms',
  },
  easing: {
    linear: 'linear',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  },
} as const;

// ネオンカラーパレット（コントラスト改善版）
export const colors = {
  neon: {
    blue: {
      50: '#E6F9FF',
      100: '#CCEFFF',
      200: '#99DDFF',
      300: '#66CCFF',
      400: '#33BBFF',
      500: '#00BFFF', // メインカラー（コントラスト改善）
      600: '#0099CC',
      700: '#007399',
      800: '#004D66',
      900: '#002633',
    },
    purple: {
      50: '#F3E8FF',
      100: '#E9D5FF',
      200: '#D8B4FE',
      300: '#C084FC',
      400: '#A855F7',
      500: '#9333EA', // メインカラー（コントラスト改善）
      600: '#7C3AED',
      700: '#6D28D9',
      800: '#5B21B6',
      900: '#4C1D95',
    },
    pink: {
      50: '#FDF2F8',
      100: '#FCE7F3',
      200: '#FBCFE8',
      300: '#F9A8D4',
      400: '#F472B6',
      500: '#EC4899', // メインカラー（コントラスト改善）
      600: '#DB2777',
      700: '#BE185D',
      800: '#9D174D',
      900: '#831843',
    },
    green: {
      50: '#ECFDF5',
      100: '#D1FAE5',
      200: '#A7F3D0',
      300: '#6EE7B7',
      400: '#34D399',
      500: '#059669', // メインカラー（コントラスト改善）
      600: '#047857',
      700: '#065F46',
      800: '#064E3B',
      900: '#022C22',
    },
    yellow: {
      50: '#FEFCE8',
      100: '#FEF9C3',
      200: '#FEF08A',
      300: '#FDE047',
      400: '#FACC15', // メインカラー（コントラスト改善）
      500: '#EAB308',
      600: '#CA8A04',
      700: '#A16207',
      800: '#854D0E',
      900: '#713F12',
    },
  },
} as const;

// ブレークポイント
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// タイポグラフィ設定
export const typography = {
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    mono: ['Fira Code', 'monospace'],
    heading: ['Orbitron', 'sans-serif'],
  },
  heading: {
    h1: {
      fontSize: fontSize['5xl'],
      lineHeight: lineHeight.tight,
      fontWeight: fontWeight.bold,
    },
    h2: {
      fontSize: fontSize['4xl'],
      lineHeight: lineHeight.tight,
      fontWeight: fontWeight.bold,
    },
    h3: {
      fontSize: fontSize['3xl'],
      lineHeight: lineHeight.snug,
      fontWeight: fontWeight.semibold,
    },
    h4: {
      fontSize: fontSize['2xl'],
      lineHeight: lineHeight.snug,
      fontWeight: fontWeight.semibold,
    },
    h5: {
      fontSize: fontSize.xl,
      lineHeight: lineHeight.normal,
      fontWeight: fontWeight.medium,
    },
    h6: {
      fontSize: fontSize.lg,
      lineHeight: lineHeight.normal,
      fontWeight: fontWeight.medium,
    },
  },
  body: {
    small: {
      fontSize: fontSize.sm,
      lineHeight: lineHeight.normal,
    },
    base: {
      fontSize: fontSize.base,
      lineHeight: lineHeight.relaxed,
    },
    large: {
      fontSize: fontSize.lg,
      lineHeight: lineHeight.relaxed,
    },
  },
} as const;

// コンポーネント固有のトークン
export const components = {
  button: {
    padding: {
      sm: `${spacing.sm} ${spacing.md}`,
      md: `${spacing.md} ${spacing.lg}`,
      lg: `${spacing.lg} ${spacing.xl}`,
    },
    borderRadius: {
      sm: borderRadius.md,
      md: borderRadius.lg,
      lg: borderRadius.xl,
    },
    fontSize: {
      sm: fontSize.sm,
      md: fontSize.base,
      lg: fontSize.lg,
    },
  },
  card: {
    padding: {
      sm: spacing.lg,
      md: spacing.xl,
      lg: spacing['2xl'],
    },
    borderRadius: {
      sm: borderRadius.lg,
      md: borderRadius.xl,
      lg: borderRadius['2xl'],
    },
  },
  input: {
    padding: {
      sm: `${spacing.sm} ${spacing.md}`,
      md: `${spacing.md} ${spacing.lg}`,
      lg: `${spacing.lg} ${spacing.xl}`,
    },
    borderRadius: borderRadius.lg,
    fontSize: fontSize.base,
  },
} as const;

// ユーティリティ関数
export const getSpacing = (size: keyof typeof spacing) => spacing[size];
export const getBorderRadius = (size: keyof typeof borderRadius) => borderRadius[size];
export const getFontSize = (size: keyof typeof fontSize) => fontSize[size];
export const getBoxShadow = (size: keyof typeof boxShadow) => boxShadow[size];

// CSS変数として出力する関数
export const generateCSSVariables = () => {
  const vars: Record<string, string> = {};
  
  // スペーシング
  Object.entries(spacing).forEach(([key, value]) => {
    vars[`--spacing-${key}`] = value;
  });
  
  // ボーダー半径
  Object.entries(borderRadius).forEach(([key, value]) => {
    vars[`--border-radius-${key}`] = value;
  });
  
  // フォントサイズ
  Object.entries(fontSize).forEach(([key, value]) => {
    vars[`--font-size-${key}`] = value;
  });
  
  return vars;
};

export type SpacingToken = keyof typeof spacing;
export type BorderRadiusToken = keyof typeof borderRadius;
export type FontSizeToken = keyof typeof fontSize;
export type ColorToken = keyof typeof colors.neon;