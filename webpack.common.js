const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const mdPlugins = [
  require('docschina-remark-slugger'),
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
      behavior: 'append'
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
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename],
    },
    cacheDirectory: path.resolve(__dirname, '.cache/webpack')
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    fallback: {
      path: require.resolve('path-browserify')
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
          MiniCssExtractPlugin.loader,
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
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
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
          // TODO use type: asset/resource when mini-css bug regarding asset modules is fixed
          loader: 'file-loader',
          options: {
            outputPath: 'font',
            esModule: false
          }
        }
      },
      {
        test: /\.(jpg|jpeg|png|svg|ico)$/i,
        type: 'asset/resource'
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
    new webpack.DefinePlugin({
      // https://github.com/algolia/algoliasearch-client-javascript/issues/764
      'process.env.RESET_APP_DATA_TIMER': JSON.stringify('') // fix for algoliasearch
    })
  ],
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
    filename: '[name].bundle.js'
  }
});
