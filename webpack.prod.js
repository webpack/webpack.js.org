// Import External Dependencies
const merge = require('webpack-merge');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OfflinePlugin = require('offline-plugin');

// Load Common Configuration
const common = require('./webpack.common.js');

// find css files for sw
const cssFiles = require('./src/utilities/find-files-in-dist')('.css');
// find favicons
const favicons = require('./src/utilities/find-files-in-dist')('.ico');

// fall back all urls to app shell

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
      // make sure to cache homepage and app shell as app shell for the rest of the pages.
      externals: ['/app-shell/', '/', '/manifest.json', ...cssFiles, ...favicons],
      excludes: [],
      AppCache: {
        publicPath: '/'
      }
    })
  ]
});
