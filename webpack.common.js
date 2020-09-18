const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const isDev = process.env.NODE_ENV !== 'production';
const webpack = require('webpack');
const mdPlugins = [
  require('remark-slug'),
  [
    require('remark-custom-blockquotes'),
    {
      mapping: {
        'T>': 'tip',
        'W>': 'warning',
        '?>': 'todo'
      }
    }
  ],
  [
    require('remark-autolink-headings'),
    {
      behaviour: 'append'
    }
  ],
  [
    require('remark-responsive-tables'),
    {
      classnames: {
        title: 'title',
        description: 'description',
        content: 'content',
        mobile: 'mobile',
        desktop: 'desktop'
      }
    }
  ],
  require('remark-refractor')
];

module.exports = (env = {}) => ({
  context: path.resolve(__dirname, './src'),
  entry: {
    index: './index.jsx',
    vendor: [
      'react', // Replace with preact or inferno
      'react-dom', // Replace with preact or inferno
      'react-router-dom',
    ],
  },
  resolve: {
    symlinks: false,
    extensions: ['.js', '.jsx', '.scss'],
    alias: {
      path: 'path-browserify'
    }
  },
  module: {
    rules: [
      {
        test: /\.mdx$/,
        use: [
          'babel-loader',
          {
            loader: '@mdx-js/loader',
            options: {
              remarkPlugins: mdPlugins
            }
          }
        ]
      },
      {
        test: /\.md$/,
        use: [
          {
            loader: 'html-loader'
          },
          {
            loader: 'remark-loader',
            options: {
              remarkOptions: {
                plugins: [...mdPlugins, require('remark-html')]
              }
            }
          }
        ]
      },
      {
        test: /\.font.js$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'fontgen-loader',
            options: { embed: true }
          }
        ]
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          'babel-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: () => [
                  require('autoprefixer')
                ],
              }
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                includePaths: [ path.join('./src/styles/partials') ]
              }
            }
          }
        ]
      },
      {
        test: /\.woff2?$/,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: 'font',
            esModule: false
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
    new MiniCssExtractPlugin({
      filename: '[chunkhash].css'
    }),
    new ESLintPlugin({fix: true, extensions: ['js', 'jsx']}),
    new webpack.DefinePlugin({
      'process.env.RESET_APP_DATA_TIMER': JSON.stringify('') // fix for algoliasearch
    })
  ],
  stats: {
    children: false
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
    filename: '[name].bundle.js',
    chunkFilename: '[name].[chunkhash].chunk.js'
  }
});
