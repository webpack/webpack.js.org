// Import External Dependencies
const merge = require('webpack-merge');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OfflinePlugin = require('offline-plugin');

// Load Common Configuration
const common = require('./webpack.common.js');

// find [css, ico, svg] versioned (hashed) files emitted by SSG run
const hashedAssetsBySSGRun = require('./src/utilities/find-files-in-dist')(['.css', '.ico', '.svg']);

module.exports = env => merge(common(env), {
  mode: 'production',
  target: 'web',
  optimization: {
    minimizer: [
      new TerserJSPlugin({}),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  plugins: [
    new OfflinePlugin({
      autoUpdate: true,
      publicPath: '/',
      appShell: '/app-shell/',
      responseStrategy: 'network-first',
      // make sure to cache homepage and app shell as app shell for the rest of the pages.
      // externals also re-validate on sw update (releases)
      externals: ['/app-shell/', '/', '/manifest.json', ...hashedAssetsBySSGRun],
      excludes: ['/icon_*.png', '/**/printable/', '/robots.txt'],
      AppCache: {
        publicPath: '/'
      }
    })
  ]
});
