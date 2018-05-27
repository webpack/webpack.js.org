const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HTMLPlugin = require('html-webpack-plugin');
const HTMLTemplate = require('html-webpack-template');
const common = require('./webpack.common.js');

module.exports = env => merge(common(env), {
  devtool: 'source-map',
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
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      chunks: ['index']
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
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
});
