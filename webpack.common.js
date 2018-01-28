const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const FrontMatter = require('front-matter');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const DirectoryTreePlugin = require('directory-tree-webpack-plugin');

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
              // TODO: Add necessary remark plugins
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
    new ExtractTextPlugin({
      filename: '[chunkhash].css',
      allChunks: true,
      disable: env.dev
    }),
    new DirectoryTreePlugin({
      dir: 'src/content',
      path: 'src/_content.json',
      extensions: /\.md/,
      enhance: (item, options) => {
        item.url = item.path
            .replace(item.extension, '')
            .replace(options.dir, '')
            .replace(/\/index$/, '')
            .replace(/^$/, '/')

        // TODO: Strip `_` prefix from filenames in `url`
        if (item.type === 'file') {
          let content = fs.readFileSync(item.path, 'utf8')
          let { attributes } = FrontMatter(content)
          Object.assign(item, attributes)
          item.anchors = [] // TODO: Add actual anchors

        } else {
          // TODO: Add directory (section) attributes and index url (if necessary)
        }
      }
    })
  ],
  stats: {
    children: false
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
    filename: '[name].[hash].js',
    libraryTarget: 'umd'
  }
})
