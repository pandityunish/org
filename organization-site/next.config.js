/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ['api.epass.com.np'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.epass.com.np',
        port: ''
      }
    ]
  }
}

module.exports = nextConfig
