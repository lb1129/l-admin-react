const CracoLessPlugin = require('craco-less')

module.exports = {
  webpack: {},
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {}
        }
      }
    }
  ]
}
