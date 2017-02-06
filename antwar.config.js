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
          'json-loader!yaml-frontmatter-loader!./content',
          false,
          /^\.\/.*\.md$/
        );
      }
    ),

    'get-started': {
      redirects: {
        '': '/guides/get-started',
        'install-webpack': '/guides/installation',
        'why-webpack': '/guides/why-webpack',
      }
    },

    concepts: section(
      'Concepts',
      function() {
        return require.context(
          'json-loader!yaml-frontmatter-loader!./content/concepts',
          false,
          /^\.\/.*\.md$/
        );
      }
    ),

    guides: section(
      'Guides',
      function() {
        return require.context(
          'json-loader!yaml-frontmatter-loader!./content/guides',
          true,
          /^\.\/.*\.md$/
        );
      }, {
        'why-webpack': '/guides/comparison'
      }
    ),

    development: section(
      'Development',
      function() {
        return require.context(
          'json-loader!yaml-frontmatter-loader!./content/development',
          true,
          /^\.\/.*\.md$/
        );
      }
    ),

    configuration: section(
      'Configuration',
      function() {
        return require.context(
          'json-loader!yaml-frontmatter-loader!./content/configuration',
          false,
          /^\.\/.*\.md$/
        );
      }
    ),

    api: section(
      'API',
      function() {
        return require.context(
          'json-loader!yaml-frontmatter-loader!./content/api',
          false,
          /^\.\/.*\.md$/
        );
      }
    ),

    pluginsapi: section(
      'Plugins API',
      function() {
        return require.context(
          'json-loader!yaml-frontmatter-loader!./content/pluginsapi',
          false,
          /^\.\/.*\.md$/
        );
      }
    ),

    loaders: section(
      'Loaders',
      function() {
        const content = require.context(
          'json-loader!yaml-frontmatter-loader!./content/loaders',
          false,
          /^\.\/.*\.md$/
        );
        const generated = require.context(
          'json-loader!yaml-frontmatter-loader!./generated/loaders',
          false,
          /^\.\/.*\.md$/
        );
        return combineContexts(content, generated);
      }
    ),

    plugins: section(
      'Plugins',
      function() {
        const content = require.context(
          'json-loader!yaml-frontmatter-loader!./content/plugins',
          false,
          /^\.\/.*\.md$/
        );
        const generated = require.context(
          'json-loader!yaml-frontmatter-loader!./generated/plugins',
          false,
          /^\.\/.*\.md$/
        );
        return combineContexts(content, generated);
      }
    ),

    vote: {
      path() {
        return require('./components/vote/list.jsx').default
      }
    },

    'vote/feedback': {
      path() {
        return require('./components/vote/list.jsx').default
      }
    },

    'vote/moneyDistribution': {
      path() {
        return require('./components/vote/list.jsx').default
      }
    },

    organization: {
      path() {
        return require('./components/organization/organization.jsx').default
      }
    }
  }
};

function root(contentCb) {
  return {
    title: 'webpack',
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

function section(title, contentCb, redirects = {}) {
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
    redirects: redirects // <from>: <to>
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

function combineContexts(context1, context2) {
  function webpackContext(req) {
    try {
      return context1(req);
    } catch (e) {
      return context2(req);
    }
  }
  webpackContext.keys = () => {
    let keys1 = context1.keys();
    let keys2 = context2.keys();
    return _.chain(keys1).concat(keys2).sortBy().uniq().value();
  };
  return webpackContext;
}
