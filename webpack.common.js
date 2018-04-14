const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const FrontMatter = require('front-matter');
const CleanPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const DirectoryTreePlugin = require('directory-tree-webpack-plugin');
const RedirectWebpackPlugin = require('redirect-webpack-plugin');

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
              require('remark-autolink-headings'),
              require('remark-mermaid')
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
    }),
    new RedirectWebpackPlugin({
      redirects: {
        'support': '/contribute/',
        'writers-guide': '/contribute/writers-guide/',
        'get-started': '/guides/getting-started/',
        'get-started/install-webpack': '/guides/installation/',
        'get-started/why-webpack': '/guides/why-webpack/',
        'pluginsapi': '/api/plugins/',
        'pluginsapi/compiler': '/api/compiler-hooks/',
        'pluginsapi/template': '/api/template/',
        'api/passing-a-config': '/configuration/configuration-types/',
        'api/plugins/compiler': '/api/compiler-hooks/',
        'api/plugins/compilation': '/api/compilation/',
        'api/plugins/module-factories': '/api/module-methods/',
        'api/plugins/parser': '/api/parser/',
        'api/plugins/tapable': '/api/tapable/',
        'api/plugins/template': '/api/template/',
        'api/plugins/resolver': '/api/resolver/',
        'development': '/contribute/',
        'development/plugin-patterns': '/contribute/plugin-patterns/',
        'development/release-process': '/contribute/release-process/',
        'development/how-to-write-a-loader': '/contribute/writing-a-loader/',
        'development/how-to-write-a-plugin': '/contribute/writing-a-plugin/',
        'guides/code-splitting-import': '/guides/code-splitting/',
        'guides/code-splitting-require': '/guides/code-splitting/',
        'guides/code-splitting-async': '/guides/code-splitting/',
        'guides/code-splitting-css': '/guides/code-splitting/',
        'guides/code-splitting-libraries': '/guides/code-splitting/',
        'guides/why-webpack': '/comparison/',
        'guides/production-build': '/guides/production/',
        'migrating': '/migrate/3/'
      },
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
})
