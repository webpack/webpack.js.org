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
        loader: 'babel!eslint',
        include: [
          path.join(__dirname, 'components')
        ]
      },
      {
        test: /\.woff2?$/,
        loaders: ['url?prefix=font/&limit=50000&mimetype=application/font-woff']
      },
      {
        test: /\.jpg$/,
        loaders: ['file']
      },
      {
        test: /\.png$/,
        loaders: ['file']
      },
      {
        test: /\.svg$/,
        loaders: ['raw']
      },
      {
        test: /\.html$/,
        loaders: ['raw']
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
        test: /\.css$/,
        loaders: ['style', 'css'],
        include: stylePaths
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'postcss', 'sass'],
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
          'style',
          'css'
        ),
        include: stylePaths
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
          'style',
          'css!postcss!sass'
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
