var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var Autoprefixer = require('autoprefixer');
var merge = require('webpack-merge');
var webpack = require('webpack');

var cwd = process.cwd();
var stylePaths = [
  path.join(cwd, 'styles'),
  path.join(cwd, 'components')
];

const commonConfig = {
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel-loader', 'eslint-loader'],
        include: [
          path.join(__dirname, 'components')
        ]
      },
      {
        test: /\.woff2?$/,
        loaders: ['url-loader?prefix=font/&limit=50000&mimetype=application/font-woff']
      },
      {
        test: /\.jpg$/,
        loaders: ['file-loader']
      },
      {
        test: /\.png$/,
        loaders: ['file-loader']
      },
      {
        test: /\.svg$/,
        loaders: ['file-loader']
      },
      {
        test: /\.html$/,
        loaders: ['raw-loader']
      }
    ]
  },
  eslint: {
    fix: true,
    configFile: require.resolve('./.eslintrc')
  },
  postcss: function() {
    return [ Autoprefixer ];
  },
  sassLoader: {
    includePaths: [ path.join('./styles/partials') ]
  }
};

const interactiveConfig = {
  resolve: {
    alias: {
      react: 'preact-compat',
      'react-dom': 'preact-compat'
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
    loaders: [
      {
        test: /\.font.js$/,
        loaders: ['style-loader', 'css-loader', 'fontgen-loader']
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
        include: stylePaths
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
        include: stylePaths
      }
    ]
  }
};

const buildConfig = {
  output: {
    publicPath: '/'
  },
  plugins: [
    new ExtractTextPlugin('[chunkhash].css', {
      allChunks: true
    })
  ],
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader'
        ),
        include: stylePaths
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader!postcss-loader!sass-loader'
        ),
        include: stylePaths
      }
    ]
  }
};

module.exports = function(env) {
  switch(env) {
    case 'start':
      return merge(
        commonConfig,
        developmentConfig
      );
    case 'interactive':
      return merge(
        commonConfig,
        buildConfig,
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
