/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'api.iranifarsh.neofy.ir',
            port: '',
            pathname: '/uploads/**',
            search: '',
          }
        ],
      }
    };

export default nextConfig;
