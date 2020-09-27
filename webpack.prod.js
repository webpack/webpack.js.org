// Import External Dependencies
const { merge } = require('webpack-merge');
const OptimizeCSSAssetsPlugin = require('css-minimizer-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');

// Load Common Configuration
const common = require('./webpack.common.js');

// find [css, ico, svg] versioned (hashed) files emitted by SSG run
const hashedAssetsBySSGRun = require('./src/utilities/find-files-in-dist')(['.css', '.ico', '.svg']);

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
      clientsClaim: true,
      swDest: 'sw.js',
      exclude: [/icon_.*\.png/, /printable/, '/robots.txt'],
      additionalManifestEntries: [
        {
          url: '/app-shell/index.html',
          revision: '1'
        },
        {
          url: '/manifest.json',
          revision: '1'
        },
        ...hashedAssetsBySSGRun.map(url => ({
          url: '/' + url, // prepend the publicPath
          revision: null
        }))
      ],
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
        }
      ],
    })
  ]
});
