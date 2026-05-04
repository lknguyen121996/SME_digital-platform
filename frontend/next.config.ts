import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Suppress workspace root warning - we're in a monorepo with multiple lockfiles
  allowedDevOrigins: ['hardcover-parameter-decade.ngrok-free.dev'],
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'ngrok-skip-browser-warning',
            value: 'true',
          },
        ],
      },
    ];
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.figma.com',
      },
      {
        protocol: 'https',
        hostname: 'figma-codegen-asset-storage.storage.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: 'minimax-algeng-chat-tts-us.oss-us-east-1.aliyuncs.com',
      },
    ],
  },
};

export default nextConfig;
