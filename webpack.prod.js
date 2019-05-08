// Import External Dependencies
const merge = require('webpack-merge');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OfflinePlugin = require('offline-plugin');

// Load Common Configuration
const common = require('./webpack.common.js');

// find css files for sw
const cssFiles = require('./src/utilities/find-files-in-dist')('.css');

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
      externals: ['/', ...cssFiles],
      AppCache: {
        FALLBACK: { '/': '/index.html' }
      }
    })
  ]
});
