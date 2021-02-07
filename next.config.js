// const withPlugins = require('next-compose-plugins')
// const optimizedImages = require('next-optimized-images')

// const nextConfig = {
//   images: {
//     domains: [
//       'pbs.twimg.com' // Twitter Profile Picture
//     ]
//   }
// }

module.exports = {
  images: {
    domains: [
      'pbs.twimg.com' // Twitter Profile Picture
    ]
  },
  webpack: (config, options) => {
    config.module.rules.push({
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
    })
    return config
  }
}
