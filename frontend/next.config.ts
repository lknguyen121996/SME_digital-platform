import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
