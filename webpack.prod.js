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
      swDest: 'sw.js'
    })
  ]
});
