const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const HTMLPlugin = require('html-webpack-plugin');
const DirectoryTreePlugin = require('directory-tree-webpack-plugin');
const common = require('./webpack.common.js');
const {
  enhance,
  filter,
  sort,
} = require('./src/utilities/content-tree-enhancers.js');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = (env) =>
  merge(common(env), {
    experiments: {
      lazyCompilation: true,
    },
    mode: 'development',
    devtool: 'source-map',
    entry: {
      index: './index.jsx',
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new ReactRefreshWebpackPlugin(),
      new HTMLPlugin({
        template: 'index.html',
        favicon: 'favicon.ico',
      }),
      new DirectoryTreePlugin({
        dir: 'src/content',
        path: 'src/_content.json',
        extensions: /\.mdx?/,
        enhance,
        filter,
        sort,
      }),
    ],
    devServer: {
      static: path.resolve(__dirname, './dist'),
      port: 3000,
      hot: true,
      compress: true,
      historyApiFallback: true,
    },
  });
