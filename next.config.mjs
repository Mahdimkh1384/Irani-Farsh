/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'api-iranifarsh.gawyhub.online',
                pathname: '/uploads/**',
            },
            {
                protocol: 'https',
                hostname: 'api.iranifarsh.neofy.ir',
                pathname: '/uploads/**',
            },
        ],
    }
};

export default nextConfig;
