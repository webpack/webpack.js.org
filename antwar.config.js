var path = require('path');
var prevnextPlugin = require('antwar-prevnext-plugin');
var markdown = require('./utilities/markdown');
var highlight = require('./utilities/highlight');

module.exports = {
  webpack: {
    common: {
      // XXX: needed?
      /*sassLoader: {
        includePaths: [
          path.resolve('./src')
        ]
      },*/
      resolve: {
        extensions: ['', '.js', 'jsx', '.scss'],
        alias: {
          Components: path.resolve('./components'),
          Utilities: path.resolve('./utilities')
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
    return require('./layouts/Body.jsx')
  },
  style: function() {
    require('react-ghfork/gh-fork-ribbon.css');
    require('utilities/scss/reset.scss');
  },
  paths: {
    '/': {
      path: function() {
        return require.context('./content', false, /^\.\/.*\.jsx$/);
      }
    },
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
    )
  }
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
