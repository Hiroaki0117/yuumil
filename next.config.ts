/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      // 環境変数からAPP_URLを取得し、適切なホストを設定
      allowedOrigins: process.env.NEXT_PUBLIC_APP_URL 
        ? [new URL(process.env.NEXT_PUBLIC_APP_URL).host]
        : ['localhost:3000'],
      allowedForwardedHosts: process.env.NEXT_PUBLIC_APP_URL
        ? [new URL(process.env.NEXT_PUBLIC_APP_URL).host]
        : ['localhost:3000'],
    },
    // Partial Prerendering を有効化（Next.js 15+）
    // 注意：pprはCanaryバージョンでのみ利用可能です
    // ppr: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',   // ← 追加
      },
    ],
    // 画像最適化設定
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30日
  },
  // gzip圧縮を有効化
  compress: true,
  // パワードバイヘッダーを削除（セキュリティ向上）
  poweredByHeader: false,
  // 静的ファイルのキャッシュ設定
  async headers() {
    return [
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
