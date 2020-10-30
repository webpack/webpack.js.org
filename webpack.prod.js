// Import External Dependencies
const { merge } = require('webpack-merge');
const OptimizeCSSAssetsPlugin = require('css-minimizer-webpack-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');

// Load Common Configuration
const common = require('./webpack.common.js');

// find [css, ico, svg] versioned (hashed) files emitted by SSG run
const hashedAssetsBySSGRun = require('./src/utilities/find-files-in-dist')(['.css', '.ico', '.svg']);

module.exports = env => merge(common(env), {
  mode: 'production',
  target: 'web',
  cache: {
    buildDependencies: {
      config: [__filename],
    }
  },
  entry: {
    index: {
      import: './index.jsx',
      filename: 'index.bundle.js'
    }
  },
  output: {
    filename: '[name].[contenthash].js'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /node_modules/,
          chunks: 'initial',
          enforce: true,
          filename: 'vendor.bundle.js'
        }
      }
    },
    minimizer: [
      '...',
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  plugins: [
    new GenerateSW({
      skipWaiting: true,
      clientsClaim: true,
      swDest: 'sw.js',
      exclude: [/icon_.*\.png/, /printable/, '/robots.txt', ...hashedAssetsBySSGRun],
      additionalManifestEntries: [
        {
          url: '/app-shell/index.html',
          revision: new Date().getTime().toString() // dirty hack
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
      navigateFallbackDenylist: [/printable/],
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
