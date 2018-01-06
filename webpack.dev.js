const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

// TEMP
const HTMLPlugin = require('html-webpack-plugin');
const HTMLTemplate = require('html-webpack-template');

module.exports = env => merge(common(env), {
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // TODO: Remove once StaticSiteGeneratorPlugin is included
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
    historyApiFallback: true // TODO: Remove once StaticSiteGeneratorPlugin is included
  }
})
