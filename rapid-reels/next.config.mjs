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
        ],
        domains: [
            'avatar.iran.liara.run',
            'cdn.pixabay.com'
        ],
    },
};

export default nextConfig;
