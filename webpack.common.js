const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const h = require('hastscript');
const mdPlugins = [
  require('remark-gfm'),
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
      behavior: 'append',
      content() {
        return [
          h('span.header-link')
        ];
      }
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

module.exports = () => ({
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
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
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
        type: 'asset/resource',
        generator: {
          filename: 'font/[name].[hash][ext][query]'
        }
      },
      {
        test: /\.(jpg|jpeg|png|ico)$/i,
        type: 'asset/resource',
        generator: {
          filename: '[name].[hash][ext][query]'
        }
      },
      {
        test: /\.svg$/i,
        type: 'asset/resource',
        exclude: [path.resolve(__dirname, 'src/styles/icons')],
        generator: {
          filename: '[name].[hash][ext][query]'
        }
      },
      {
        test: /\.svg$/i,
        use: ['@svgr/webpack'],
        include: [path.resolve(__dirname, 'src/styles/icons')]
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
