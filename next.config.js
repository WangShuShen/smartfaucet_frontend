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
};

module.exports = nextConfig;
module.exports = {
  reactStrictMode: false, // 將這個設置為 false 可以臨時解決問題，但建議開發完畢後再開啟
};
