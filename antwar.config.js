var path = require('path');
var prevnextPlugin = require('antwar-prevnext-plugin');
var markdown = require('./utilities/markdown');
var highlight = require('./utilities/highlight');

module.exports = {
  //assets: [] // custom assets to copy into the build
  siteBase: '//webpack.github.io/webpack.io',
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
    require('./node_modules/normalize.css/normalize.css');
    require('./styles/custom.scss');
    require('./styles/min.css'); // http://mincss.com/. @Greg, drop this?
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
    path: function() { // Load path content
      return contentCb();
    },
    processPage: processPage(), // Process individual page (url, content)
    layouts: { // Layouts (page/sectino)
      page: function() {
        return require('./layouts/RootPage.jsx').default
      }
    },
    redirects: {} // Redirects <from>: <to>
  };
}

function section(title, contentCb) {
  return {
    title: title,
    path: function() {
      return contentCb();
    },
    processPage: processPage(),
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

function processPage() {
  return {
    url: function(o) {
      return o.sectionName + '/' + o.fileName.split('.')[0]
    },
    content: function(o) {
      return markdown().process(o.file.__content, highlight)
    }
  };
}
