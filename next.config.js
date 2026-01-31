/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com', 'avatars.githubusercontent.com'],
  },
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig
