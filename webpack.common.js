const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
      'react-router-dom'
    ]
  },
  resolve: {
    symlinks: false,
    extensions: ['.js', '.jsx', '.scss']
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
              mdPlugins
            }
          }
        ]
      },
      {
        test: /\.md$/,
        use: {
          loader: 'remark-loader',
          options: {
            plugins: mdPlugins
          }
        }
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
          'babel-loader',
          {
            loader: 'eslint-loader',
            options: { fix: true }
          }
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
          {
            loader: 'postcss-loader',
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
    new MiniCssExtractPlugin({
      filename: '[chunkhash].css'
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
