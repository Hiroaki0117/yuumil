/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      // 本番環境なら your-domain.com などを追加
      allowedOrigins:       ['localhost:3000'],
      allowedForwardedHosts: ['localhost:3000'],
    }
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',   // ← 追加
      },
    ],
  },
};

export default nextConfig;
