const { spacing, borderRadius, fontSize, colors, typography, animation } = require('./src/lib/design-tokens');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // デザイントークンからスペーシングを統合
      spacing,
      
      // フォントサイズの統合
      fontSize: {
        ...fontSize,
        xs: [fontSize.xs, { lineHeight: '1.4' }],
        sm: [fontSize.sm, { lineHeight: '1.5' }],
        base: [fontSize.base, { lineHeight: '1.6' }],
        lg: [fontSize.lg, { lineHeight: '1.6' }],
        xl: [fontSize.xl, { lineHeight: '1.5' }],
        '2xl': [fontSize['2xl'], { lineHeight: '1.4' }],
        '3xl': [fontSize['3xl'], { lineHeight: '1.3' }],
        '4xl': [fontSize['4xl'], { lineHeight: '1.2' }],
        '5xl': [fontSize['5xl'], { lineHeight: '1.1' }],
        '6xl': [fontSize['6xl'], { lineHeight: '1.0' }],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // デザイントークンからネオンカラーを統合
        ...colors.neon,
        'neon-blue': colors.neon.blue[500],
        'neon-purple': colors.neon.purple[500],
        'neon-pink': colors.neon.pink[500],
        'cyber-green': colors.neon.green[500],
        'electric-yellow': colors.neon.yellow[400],
      },
      // デザイントークンからボーダー半径を統合
      borderRadius: {
        ...borderRadius,
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      // デザイントークンからフォントファミリーを統合
      fontFamily: {
        ...typography.fontFamily,
        sans: ["var(--font-inter)", ...typography.fontFamily.sans],
        orbitron: ["var(--font-orbitron)", "monospace"],
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-neon": {
          "0%": {
            boxShadow:
              "0 0 5px rgba(139, 92, 246, 0.4), 0 0 10px rgba(139, 92, 246, 0.3), 0 0 15px rgba(139, 92, 246, 0.2)",
          },
          "100%": {
            boxShadow:
              "0 0 10px rgba(139, 92, 246, 0.6), 0 0 20px rgba(139, 92, 246, 0.4), 0 0 30px rgba(139, 92, 246, 0.3)",
          },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        "star-twinkle": {
          "0%, 100%": { opacity: "0.2", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.2)" },
        },
        holographic: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      // デザイントークンからアニメーション設定を統合
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-neon": "pulse-neon 2s ease-in-out infinite alternate",
        shimmer: "shimmer 3s infinite",
        "star-twinkle": "star-twinkle 4s ease-in-out infinite",
        holographic: "holographic 4s ease infinite",
      },
      // アニメーション継続時間とイージング
      transitionDuration: animation.duration,
      transitionTimingFunction: animation.easing,
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
