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

const commonConfig = {
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
        use: 'babel-loader',
        include: [
          path.join(__dirname, 'components')
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
    new webpack.LoaderOptionsPlugin({
      eslint: {
        configFile: require.resolve('./.eslintrc')
      }
    })
  ]
};

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

const developmentConfig = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'eslint-loader',
        include: [
          path.join(__dirname, 'components')
        ]
      },
      {
        test: /\.font.js$/,
        use: ['style-loader', 'css-loader', 'fontgen-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        include: stylePaths
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          postcssLoader(),
          sassLoader()
        ],
        include: stylePaths
      }
    ]
  }
};

const buildConfig = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'eslint-loader',
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
              options: {
                embed: true
              }
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
            postcssLoader(),
            sassLoader()
          ]
        }),
        include: stylePaths
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[chunkhash].css',
      allChunks: true
    })
  ]
};

function postcssLoader() {
  return {
    loader: 'postcss-loader',
    options: {
      plugins: () => ([
        require('autoprefixer'),
      ]),
    }
  };
}

function sassLoader() {
  return {
    loader: 'sass-loader',
    options: {
      includePaths: [ path.join('./styles/partials') ]
    }
  };
}

module.exports = function(env) {
  switch(env) {
    case 'develop':
      return merge(
        commonConfig,
        developmentConfig
      );
    case 'interactive':
      return merge(
        commonConfig,
        interactiveConfig
      );
    case 'build':
    case 'lint:links':
      return merge(
        commonConfig,
        buildConfig
      );
  }
};
