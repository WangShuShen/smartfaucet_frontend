/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/login",
        permanent: true,
      },
    ];
  },

  reactStrictMode: false,
  env: {
    PROTOCAL: process.env.PROTOCAL,
    HOST: process.env.HOST,
    API_PORT: process.env.API_PORT,
    API_ROOT: process.env.API_ROOT,
    API_VERSION: process.env.API_VERSION,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
