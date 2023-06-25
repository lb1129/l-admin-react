const path = require('path')

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  devServer: {
    client: {
      overlay: {
        errors: true,
        warnings: false,
        runtimeErrors: false
      }
    }
  }
}
