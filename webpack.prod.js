// Import External Dependencies
const { merge } = require('webpack-merge');
const OptimizeCSSAssetsPlugin = require('css-minimizer-webpack-plugin');
const { InjectManifest } = require('workbox-webpack-plugin');
const path = require('path');

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
    new InjectManifest({
      swSrc: path.join(__dirname, 'src/sw.js'),
      swDest: 'sw.js',
      // match [name].[contenthash].[ext]
      dontCacheBustURLsMatching: /\.[0-9a-f]{20}\./,
      // exclude license
      exclude: [
        /license\.txt/i
      ]
    })
  ]
});
