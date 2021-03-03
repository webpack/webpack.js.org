// Import External Dependencies
const { merge } = require('webpack-merge');
const OptimizeCSSAssetsPlugin = require('css-minimizer-webpack-plugin');
const { InjectManifest } = require('workbox-webpack-plugin');
const path = require('path');
const AssetsManifest = require('./src/AssetsManifest');

// Load Common Configuration
const common = require('./webpack.common.js');

module.exports = (env) =>
  merge(common(env), {
    mode: 'production',
    cache: {
      buildDependencies: {
        config: [__filename],
      },
    },
    entry: {
      index: {
        import: './index.jsx',
        filename: 'index.[contenthash].js',
      },
    },
    output: {
      filename: '[name].[contenthash].js',
      clean: true,
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendors: {
            test: /node_modules/,
            chunks: 'initial',
            enforce: true,
            filename: 'vendor.[contenthash].js',
          },
        },
      },
      minimizer: ['...', new OptimizeCSSAssetsPlugin({})],
    },
    plugins: [
      new InjectManifest({
        swSrc: path.join(__dirname, 'src/sw.js'),
        swDest: 'sw.js',
        // exclude license
        exclude: [/license\.txt/i],
      }),
      new AssetsManifest(),
    ],
  });
