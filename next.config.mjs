/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'api.iranifarsh.neofy.ir',
                pathname: '/uploads/product/**',
            },
            {
                protocol: 'https',
                hostname: 'api.iranifarsh.neofy.ir',
                pathname: '/uploads/category/**',
            },
            {
                protocol: 'https',
                hostname: 'api.iranifarsh.neofy.ir',
                pathname: '/uploads/user/**',
            },

        ],
    }
};

export default nextConfig;
