// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allow external avatars served from backend with port
    remotePatterns: [
      
      {
        protocol: 'http',
        hostname: '192.168.7.12',
        port: '4001',
        pathname: '/**',
      },
    ],
    domains: ['randomuser.me'],
  },
};

module.exports = nextConfig;
