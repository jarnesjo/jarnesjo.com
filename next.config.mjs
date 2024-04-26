import {hostname} from 'os'

const nextConfig = {
  output: 'standalone',
  poweredByHeader: false,
  images: {
    remotePatterns: [
      // Twitter Profile Picture
      {
        protocol: 'https',
        hostname: 'pbs.twimg.com',
        port: ''
      }
      // 'pbs.twimg.com'
    ]
  },
  async redirects() {
    return [
      {
        source: '/rss',
        destination: '/feed.xml',
        permanent: true
      },
      {
        source: '/feed',
        destination: '/feed.xml',
        permanent: true
      }
    ]
  }
}

export default nextConfig
