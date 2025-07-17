/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.NODE_ENV === 'production' ? '/eswatinievents' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/eswatinievents' : '',
  images: {
    unoptimized: true,
  },
};
module.exports = nextConfig;
