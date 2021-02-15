module.exports = {
  images: {
    domains: [
      'pbs.twimg.com' // Twitter Profile Picture
    ]
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(gif|png|webp|jpe?g)$/i,
      use: [
        {
          loader: 'lqip-modern-loader'
        }
      ]
    })

    // Loading images outside of public-directory
    config.module.rules.push({
      test: /\.(svg|png|jpe?g|gif|webp|mp4)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            publicPath: '/_next',
            name: 'static/media/[name].[hash].[ext]'
          }
        }
      ]
    })

    // Added only to supress webpack warns about no loader for file type
    config.module.rules.push({
      test: /\.(mdx|mp3|ico)$/,
      use: {
        loader: 'file-loader',
        options: {emitFile: false}
      }
    })

    return config
  }
}
