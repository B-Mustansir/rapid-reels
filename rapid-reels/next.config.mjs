/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'picsum.photos',
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
            },
            {
                protocol: 'https',
                hostname: 'avatar.iran.liara.run',
            },
            {
                protocol: 'https',
                hostname: 'cdn.pixabay.com',
            }
        ],
        domains: [
            'avatar.iran.liara.run',
            'cdn.pixabay.com'
        ],
    },
};

export default nextConfig;
