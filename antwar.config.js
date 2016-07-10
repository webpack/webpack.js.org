var path = require('path');
var prevnextPlugin = require('antwar-prevnext-plugin');

module.exports = {
  webpack: {
    common: {
      sassLoader: {
        includePaths: [
          path.resolve('./src')
        ]
      },
      resolve: {
        extensions: ['', '.js', 'jsx', '.scss'],
        alias: {
            Components: path.resolve('./src/components'),
            Utilities: path.resolve('./src/utilities')
        }
      },
      resolveLoader: {
        alias: {
          markdown: path.join(__dirname, 'src', 'loaders', 'markdown')
        }
      }
    },
    build: function(plugins) {
      var ExtractTextPlugin = plugins.ExtractTextPlugin;

      return {
        module: {
          loaders: [
            {
              test: /\.scss$/,
              loader: ExtractTextPlugin.extract(
                'style',
                'css!sass'
              )
            }
          ]
        }
      };
    },
    development: function() {
      return {
        module: {
          loaders: [
            //{ test: /\.js$/, exclude: /node_modules/, loaders: ['babel', 'eslint'] },
            {
              test: /\.scss$/,
              loaders: ['style', 'css', 'sass']
            }
          ]
        }
      };
    }
  },
  //assets: [] // custom assets to copy into the build
  output: 'build',
  title: 'webpack',
  keywords: ['webpack', 'javascript', 'web development', 'programming'],
  deploy: {
    branch: 'gh-pages'
  },
  pageTitle: function(config, pageTitle) {
    var siteName = config.name;

    if(pageTitle === 'index') {
      return siteName;
    }

    return siteName + ' - ' + pageTitle;
  },
  plugins: [
    prevnextPlugin()
  ],
  layout: function() {
    return require('./src/layouts/Body.jsx')
  },
  style: function() {
    // load custom style files global to the site here
    require('react-ghfork/gh-fork-ribbon.css');
  },
  paths: {
    '/': {
      path: function() {
        // This is a good place for individual pages you want to access
        // through the root of the site.
        return require.context('./src/content', false, /^\.\/.*\.jsx$/);
      }
    },
    guides: require('./src/content/guides')
  }
}
