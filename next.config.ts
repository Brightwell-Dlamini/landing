/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/eswatini-events' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/eswatini-events' : '',
};
module.exports = nextConfig;
