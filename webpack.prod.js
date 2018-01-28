// Import External Dependencies
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const SSGPlugin = require('static-site-generator-webpack-plugin');

// Load Common Configuration
const common = require('./webpack.common.js');

// Export a production configuration
module.exports = env => merge(common(env), {
  plugins: [
    new CleanPlugin('dist'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new UglifyJSPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      chunks: ['vendor'],
      minChunks: (module) => {
        return module.context && module.context.includes('node_modules');
      }
    }),
    new SSGPlugin({
      crawl: true,
      globals: {
        window: {}
      }
    })
  ]
})
