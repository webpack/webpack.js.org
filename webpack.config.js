var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var merge = require('webpack-merge');

module.exports = function(env, options) {
  var stylePaths = [
    require.resolve('normalize.css/normalize.css'),
    require.resolve('react-ghfork/gh-fork-ribbon.css'),
    path.join(process.cwd(), 'styles')
  ];

  switch(env) {
    case 'start':
      return merge(
        commonConfig(options.paths),
        developmentConfig(stylePaths)
      );
    case 'build':
      return merge(
        commonConfig(options.paths),
        buildConfig(stylePaths)
      );
  }
};

function commonConfig(includes) {
  return {
    resolve: {
      extensions: ['', '.js', '.jsx', '.scss']
    },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          loader: 'babel!eslint',
          include: includes.concat([
            path.dirname(require.resolve('antwar-helpers/components')),
            path.dirname(require.resolve('antwar-helpers/layouts')),
            path.join(__dirname, 'components'),
            path.join(__dirname, 'layouts')
          ])
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
          loaders: ['style', 'css', 'sass'],
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
            'css!sass'
          ),
          include: stylePaths
        }
      ]
    }
  };
}
