// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '192.168.7.12',
        port: '4001',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'backend.energytransportx.com',
        pathname: '/**',
      },
    ],
    domains: ['randomuser.me'],
  },
};

module.exports = nextConfig;
