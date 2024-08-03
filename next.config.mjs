/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
        port: '',
        pathname: '/image/**',
      },
    ],
  },
  async headers() {
    const folderNames = ["assets", "img", "p"];
    return folderNames.map(folderName => (
      {
        source: `/${folderName}/(.*)`, 
        headers: [
          {
            key: 'Cache-Control',
            value: 'max-age=0, s-maxage=86400',
          },
        ],
      })
    )
  },
};

export default nextConfig;
