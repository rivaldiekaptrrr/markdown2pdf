import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Allow external images (e.g. remote URLs in markdown)
  images: {
    remotePatterns: [{ protocol: 'https', hostname: '**' }],
  },
  // In Next.js 16+, turbopack config is at the root level
  turbopack: {},
  // Puppeteer runs only server-side; exclude from client bundle
  serverExternalPackages: ['puppeteer', 'puppeteer-core'],
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve = {
        ...config.resolve,
        fallback: {
          ...config.resolve?.fallback,
          fs: false,
          path: false,
          child_process: false,
        },
      };
    }
    return config;
  },
};

export default nextConfig;
