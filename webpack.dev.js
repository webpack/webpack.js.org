const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HTMLPlugin = require('html-webpack-plugin');
const HTMLTemplate = require('html-webpack-template');
const common = require('./webpack.common.js');

module.exports = env => merge(common(env), {
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HTMLPlugin({
      inject: false,
      template: HTMLTemplate,
      title: 'webpack',
      appMountId: 'root',
      mobile: true,
      favicon: './favicon.ico',
      meta: {
        description: '...'
      }
    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
    port: 3000,
    hot: true,
    inline: true,
    compress: true,
    historyApiFallback: true
  }
})
