/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      // 本番環境なら your-domain.com などを追加
      allowedOrigins:       ['localhost:3000'],
      allowedForwardedHosts: ['localhost:3000'],
    }
  }
};

export default nextConfig;
