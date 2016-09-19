var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var Autoprefixer = require('autoprefixer');
var merge = require('webpack-merge');

module.exports = function(env) {
  var cwd = process.cwd();
  var stylePaths = [
    path.join(cwd, 'styles', 'reset.css'),
    path.join(cwd, 'styles', 'prism.css'),
    path.join(cwd, 'styles', 'icons.css'),
    path.join(cwd, 'styles', 'index.scss')
  ];

  switch(env) {
    case 'start':
      return merge(
        commonConfig(stylePaths),
        developmentConfig(stylePaths)
      );
    case 'build':
      return merge(
        commonConfig(stylePaths),
        buildConfig(stylePaths)
      );
  }
};

function commonConfig(stylePaths) {
  return {
    entry: {
      style: stylePaths
    },
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
          test: /\.woff$/,
          loaders: ['url?prefix=font/&limit=5000&mimetype=application/font-woff']
        },
        {
          test: /\.ttf$|\.eot$/,
          loaders: ['file?prefix=font/']
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
    }
  };
}

function developmentConfig(stylePaths) {
  return {
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
}

function buildConfig(stylePaths) {
  return {
    plugins: [
      new ExtractTextPlugin('[name].css', {
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
}
