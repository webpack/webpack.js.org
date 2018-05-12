const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const CleanPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const DirectoryTreePlugin = require('directory-tree-webpack-plugin');
const TreeEnhancer = require('./src/utilities/tree-plugin-enhancer.js');

module.exports = (env = {}) => ({
  devtool: 'source-map',
  context: path.resolve(__dirname, './src'),
  entry: {
    index: './index.jsx',
    vendor: [
      'react', // Replace with preact or inferno
      'react-dom', // Replace with preact or inferno
      'react-router-dom'
    ]
  },
  resolve: {
    symlinks: false,
    extensions: [
      '.js',
      '.jsx',
      '.scss'
    ]
  },
  module: {
    rules: [
      {
        test: /\.md$/,
        use: {
          loader: 'remark-loader',
          options: {
            plugins: [
              require('remark-slug'),
              require('remark-mermaid'),
              [require('@rigor789/remark-autolink-headings'), {
                behaviour: 'append'
              }]
            ]
          }
        }
      },
      {
        test: /\.font.js$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            {
              loader: 'fontgen-loader',
              options: { embed: true }
            }
          ]
        })
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          {
            loader: 'eslint-loader',
            options: { fix: true }
          }
        ]
      },
      {
        test: /\.s?css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'postcss-loader',
            {
              loader: 'sass-loader',
              options: {
                includePaths: [
                  path.resolve(__dirname, './src/styles/partials')
                ]
              }
            }
          ]
        })
      },
      {
        test: /\.woff2?$/,
        use: {
          loader: 'file-loader',
          options: {
            prefix: 'font/'
          }
        }
      },
      {
        test: /\.(jpg|png|svg|ico)$/,
        use: 'file-loader'
      }
    ]
  },
  plugins: [
    new CleanPlugin('dist'),
    new ExtractTextPlugin({
      filename: '[chunkhash].css',
      allChunks: true,
      disable: env.dev
    }),
    new DirectoryTreePlugin({
      dir: 'src/content',
      path: 'src/_content.json',
      extensions: /\.md/,
      enhance: TreeEnhancer,
      filter: item => item.name !== 'images',
      sort: (a, b) => {
        let group1 = (a.group || '').toLowerCase();
        let group2 = (b.group || '').toLowerCase();

        if (group1 < group2) return -1;
        if (group1 > group2) return 1;
        if (a.sort && b.sort) return a.sort - b.sort;
        else return 0;
      }
    })
  ],
  stats: {
    children: false
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
    filename: '[name].bundle.js'
  }
});
