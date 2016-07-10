var path = require('path');
var prevnextPlugin = require('antwar-prevnext-plugin');
var markdown = require('./src/utils/markdown');
var highlight = require('./src/utils/highlight');

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
    concepts: section(
      'Concepts',
      require.context(
        'json!yaml-frontmatter!./src/content/concepts',
        false,
        /^\.\/.*\.md$/
      )
    ),
    'how-to': section(
      'How to',
      require.context(
        'json!yaml-frontmatter!./src/content/how-to',
        false,
        /^\.\/.*\.md$/
      )
    ),
    using: section(
      'Using',
      require.context(
        'json!yaml-frontmatter!./src/content/using',
        false,
        /^\.\/.*\.md$/
      )
    )
  }
}

function section(title, content) {
  return {
    title: title,
    path: function() {
      return content;
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
        return require('./src/layouts/SectionIndex.jsx').default
      },
      page: function() {
        return require('./src/layouts/SectionPage.jsx').default
      }
    },
    redirects: {} // <from>: <to>
  };
}
