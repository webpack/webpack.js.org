var _ = require('lodash');
var path = require('path');
var prevnextPlugin = require('antwar-prevnext-plugin');
var markdown = require('./utilities/markdown');
var highlight = require('./utilities/highlight');

module.exports = {
  template: {
    title: 'webpack',
    file: path.join(__dirname, 'template.ejs')
  },
  output: 'build',
  title: 'webpack',
  keywords: ['webpack', 'javascript', 'web development', 'programming'],
  pageTitle: function(config, pageTitle) {
    var siteName = config.name;

    if (pageTitle === 'index') {
      return siteName;
    }

    return siteName + ' - ' + pageTitle;
  },
  plugins: [
    prevnextPlugin()
  ],
  layout: function() {
    return require('./components/site/site.jsx').default
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
      '概念',
      function() {
        return require.context(
          'json!yaml-frontmatter!./content/concepts',
          false,
          /^\.\/.*\.md$/
        );
      }
    ),
    configuration: section(
      '配置',
      function() {
        return require.context(
          'json!yaml-frontmatter!./content/configuration',
          false,
          /^\.\/.*\.md$/
        );
      }
    ),
    'how-to': section(
      '怎么做',
      function() {
        return require.context(
          'json!yaml-frontmatter!./content/how-to',
          true,
          /^\.\/.*\.md$/
        );
      }
    ),
    api: section(
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
};

function root(contentCb) {
  return {
    title: 'Webpack',
    path: function() { // Load path content
      return contentCb();
    },
    processPage: processPage(), // Process individual page (url, content)
    layouts: { // Layouts (page/section)
      index: function() {
        return require('./components/splash/splash.jsx').default
      },
      page: function() {
        return require('./components/page/page.jsx').default
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
    sort(pages) {
      return _.sortBy(pages, (page) => page.file.sort)
    },
    processPage: processPage(),
    layouts: {
      index: function() {
        return require('./components/page/page.jsx').default
      },
      page: function() {
        return require('./components/page/page.jsx').default
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
      return markdown().process(o.file.__content, highlight);
    },
    anchors: function(o) {
      return markdown().getAnchors(o.file.__content);
    },
    contributors: function(o) {
      return Array.isArray(o.file.contributors) && o.file.contributors.length && o.file.contributors.slice().sort();
    }
  };
}
