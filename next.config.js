/** @type {import('next').NextConfig} */
const nextConfig = {

  async redirects() {
    return [
      {
        source: "/",
        destination: "/project_setting",
        permanent: true,
      },
    ];
  },

  reactStrictMode: false,

  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
