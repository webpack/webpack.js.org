var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var autoprefixer = require('autoprefixer');
var merge = require('webpack-merge');
var webpack = require('webpack');

var cwd = process.cwd();
var stylePaths = [
  path.join(cwd, 'styles'),
  path.join(cwd, 'components')
];

const commonConfig = env => ({
  resolve: {
    extensions: ['.js', '.jsx', '.scss']
  },

  resolveLoader: {
    alias: {
      'page-loader': path.resolve(cwd, 'loaders/page-loader')
    }
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [
          'babel-loader',
          {
            loader: 'eslint-loader',
            options: { fix: true }
          }
        ],
        include: [
          path.join(__dirname, 'components')
        ]
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
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        }),
        include: stylePaths
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'postcss-loader',
            {
              loader: 'sass-loader',
              options: {
                includePaths: [ path.join('./styles/partials') ]
              }
            }
          ]
        }),
        include: stylePaths
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
        test: /\.(jpg|png|svg)$/,
        use: 'file-loader'
      },
      {
        test: /\.html$/,
        use: 'raw-loader'
      }
    ]
  },

  plugins: [
    new CopyWebpackPlugin([{
      from: './assets',
      to: './assets'
    }]),

    new ExtractTextPlugin({
      filename: '[chunkhash].css',
      allChunks: true,
      disable: env === 'develop'
    })
  ]
});

const interactiveConfig = {
  resolve: {
    alias: {
      react: 'preact-compat/dist/preact-compat.min.js',
      'react-dom': 'preact-compat/dist/preact-compat.min.js'
    }
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
};

module.exports = function(env) {
  switch(env) {
    case 'develop':
    case 'build':
      return commonConfig(env);

    case 'interactive':
      return merge(
        commonConfig(env),
        interactiveConfig
      );
  }
};
