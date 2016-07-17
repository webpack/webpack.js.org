var path = require('path');
var prevnextPlugin = require('antwar-prevnext-plugin');
var markdown = require('./utilities/markdown');
var highlight = require('./utilities/highlight');

module.exports = {
  // TODO: push to antwar.webpack.js or so. easier to handle ExtractTextPlugin etc.
  webpack: {
    common: function(options) {
      var includes = options.includes;

      return {
        resolve: {
          extensions: ['', '.js', 'jsx', '.scss'],
          alias: {
            Components: path.resolve('./components'),
            Utilities: path.resolve('./utilities')
          }
        },
        module: {
          loaders: [
            {
              test: /\.jsx?$/,
              loader: 'babel',
              query: {
                cacheDirectory: true,
                compact: true,
                presets: [
                  require.resolve('babel-preset-es2015'),
                  require.resolve('babel-preset-react')
                ]
              },
              include: includes.concat([
                path.dirname(require.resolve('antwar-helpers/components')),
                path.dirname(require.resolve('antwar-helpers/layouts')),
                path.join(__dirname, 'components'),
                path.join(__dirname, 'layouts')
              ])
            },
            // This is a weird one. Acorn dep?
            {
              test: /\.json$/,
              loader: 'json',
              include: [
                require.resolve('globals/globals.json'),
                require.resolve('regexpu-core/data/iu-mappings.json')
              ]
            }
          ]
        }
      };
    },
    build: function(plugins) {
      var ExtractTextPlugin = plugins.ExtractTextPlugin;

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
              )
            },
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
            {
              test: /\.css$/,
              loaders: ['style', 'css'],
              include: [
                require.resolve('react-ghfork/gh-fork-ribbon.css'),
                path.join(__dirname, 'styles')
              ]
            },
            {
              test: /\.scss$/,
              loaders: ['style', 'css', 'sass'],
              include: [
                path.join(__dirname, 'styles')
              ]
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
    return require('./layouts/Body.jsx')
  },
  style: function() {
    require('./styles/custom.scss');
    require('./styles/min.css'); // http://mincss.com/
    require('./styles/prism.css');
    require('./styles/fontello.css');
    require('./styles/fontello-codes.css');
    require('./styles/fontello-embedded.css');
    require('react-ghfork/gh-fork-ribbon.css');
  },
  paths: {
    '/': root(
      function() {
        return require.context(
          'json!yaml-frontmatter!./content',
          false,
          /^\.\/.*\.md$/
        );
      }
    ),
    concepts: section(
      'Concepts',
      function() {
        return require.context(
          'json!yaml-frontmatter!./content/concepts',
          false,
          /^\.\/.*\.md$/
        );
      }
    ),
    'how-to': section(
      'How to',
      function() {
        return require.context(
          'json!yaml-frontmatter!./content/how-to',
          false,
          /^\.\/.*\.md$/
        );
      }
    ),
    'api': section(
      'API',
      function() {
        return require.context(
          'json!yaml-frontmatter!./content/api',
          false,
          /^\.\/.*\.md$/
        );
      }
    )
  }
}

function root(contentCb) {
  return {
    title: 'Webpack',
    path: function() {
      return contentCb();
    },
    processPage: {
      url: function(o) {
        return o.sectionName + '/' + o.fileName.split('.')[0]
      },
      content: function(o) {
        var content = o.file.__content.split('\n').slice(1).join('\n')

        return markdown().process(content, highlight)
      }
    },
    layouts: {
      page: function() {
        return require('./layouts/RootPage.jsx').default
      }
    },
    redirects: {} // <from>: <to>
  };
}

function section(title, contentCb) {
  return {
    title: title,
    path: function() {
      return contentCb();
    },
    processPage: {
      url: function(o) {
        return o.sectionName + '/' + o.fileName.split('.')[0]
      },
      content: function(o) {
        var content = o.file.__content.split('\n').slice(1).join('\n')

        return markdown().process(content, highlight)
      }
    },
    layouts: {
      index: function() {
        return require('./layouts/SectionIndex.jsx').default
      },
      page: function() {
        return require('./layouts/SectionPage.jsx').default
      }
    },
    redirects: {} // <from>: <to>
  };
}
