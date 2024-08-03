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
  modularizeImports: {
    'react-icons/?(((\\w*)?/?)*)': {
      transform: '@react-icons/all-files/{{ matches.[1] }}/{{ member }}',
      skipDefaultConversion: true,
    },
  },
  async headers() {
    const folderNames = ['assets', 'img', 'p', '_vercel', '_next'];
    return folderNames.map((folderName) => ({
      source: `/${folderName}/(.*)`,
      headers: [
        {
          key: 'Cache-Control',
          value: 'max-age=0, s-maxage=186400',
        },
      ],
    }));
  },
};

export default nextConfig;
