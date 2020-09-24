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
  entry: {
    index: './index.jsx',
    vendor: [
      'react', // Replace with preact or inferno
      'react-dom', // Replace with preact or inferno
      'react-router-dom',
    ],
  },
  optimization: {
    minimizer: [
      new TerserJSPlugin({}),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  cache: true,
  plugins: [
    new GenerateSW({
      skipWaiting: true,
      swDest: 'sw.js',
      exclude: [/icon_.*\.png/, /printable/, '/robots.txt'],
      additionalManifestEntries: ['/app-shell/index.html', '/manifest.json'],
      navigateFallback: '/app-shell/index.html',
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
          urlPattern: /\/$/, // cache html at runtime
          handler: 'NetworkFirst',
        },
        {
          urlPattern: /\.css$/,
          handler: 'NetworkFirst'
        }
      ],
    })
  ]
});
