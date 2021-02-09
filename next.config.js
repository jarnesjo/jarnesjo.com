module.exports = {
  images: {
    domains: [
      'pbs.twimg.com' // Twitter Profile Picture
    ]
  },
  webpack: (config, options) => {
    config.module.rules.push(
      {
        test: /\.(png|jpe?g)$/i,
        use: [
          {
            loader: 'lqip-loader',
            options: {
              base64: true,
              palette: false,
              publicPath: '/_next',
              name: 'static/media/[name].[hash].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(svg|png|jpe?g|gif|mp4)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: '/_next',
              name: 'static/media/[name].[hash].[ext]'
            }
          }
        ]
      }
    )
    return config
  }
}
