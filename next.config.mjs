import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';

if (process.env.NODE_ENV === 'development') {
  await setupDevPlatform();
}

export default {
  experimental: {
    serverActions: {
      allowedOrigins: ['app.github.dev', '*.app.github.dev'],
    },
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'drive.longern.com'
        // hostname: 'cdn.shopify.com',
        // pathname: '/s/files/**'
      },
      {
        protocol: 'https',
        hostname: 'r2.findata-be.uk'
      }
    ]
  }
};
