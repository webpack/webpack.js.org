// Import External Dependencies
const { merge } = require('webpack-merge');
const OptimizeCSSAssetsPlugin = require('css-minimizer-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');

// Load Common Configuration
const common = require('./webpack.common.js');

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
    new GenerateSW({
      swDest: 'sw.js',
      exclude: [/icon_.*\.png/, /printable/, '/robots.txt'],
      runtimeCaching: [
        {
          urlPattern: /https:\/\/fonts\.gstatic\.com/, // cache google fonts for one year
          handler: 'CacheFirst',
          options: {
            cacheName: 'google-fonts',
            expiration: {
              maxAgeSeconds: 60 * 60 * 24 * 365,
              maxEntries: 30
            }
          }
        },
        {
          urlPattern: /images\.opencollective\.com\/.*avatar\.png/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'avatar',
            expiration: {
              maxAgeSeconds: 60 * 60 * 24 * 30,
              maxEntries: 100
            }
          }
        },
        {
          urlPattern: /\/$/, // cache html at runtime
          handler: 'NetworkFirst',
        },
      ],
    })
  ]
});
