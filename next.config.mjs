const nextConfig = {
  output: 'standalone',
  poweredByHeader: false,
  images: {
    domains: [
      'pbs.twimg.com' // Twitter Profile Picture
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
