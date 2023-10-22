/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: ['images.microcms-assets.io'], // 使用するホストを指定
  },
}

module.exports = nextConfig
