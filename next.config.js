/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["https://newsapi.org", "assets.coingecko.com"]
  }
}

module.exports = nextConfig
