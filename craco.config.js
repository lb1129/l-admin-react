const path = require('path')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

let plugins = []
if (process.env.NODE_ENV === 'production') plugins.push(new BundleAnalyzerPlugin())

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
    plugins
  },
  devServer: {
    client: {
      overlay: {
        errors: true,
        warnings: false,
        runtimeErrors: false
      }
    }
  },
  plugins: [
    {
      plugin: {
        overrideWebpackConfig: ({ webpackConfig }) => {
          if (process.env.NODE_ENV === 'production')
            webpackConfig.optimization.splitChunks = {
              // all
              chunks: 'async',
              minSize: 20000,
              minRemainingSize: 0,
              minChunks: 1,
              maxAsyncRequests: 30,
              maxInitialRequests: 30,
              enforceSizeThreshold: 50000,
              cacheGroups: {
                defaultVendors: {
                  test: /[\\/]node_modules[\\/]/,
                  priority: -10,
                  reuseExistingChunk: true
                },
                default: {
                  minChunks: 2,
                  priority: -20,
                  reuseExistingChunk: true
                }
                // mockjs: {
                //   test: /[\\/]node_modules[\\/]mockjs[\\/]/
                // }
              }
            }
          return webpackConfig
        }
      }
    }
  ]
}
