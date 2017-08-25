// <<<<<<< HEAD
const path = require('path');
const _ = require('lodash');
const combineContexts = require('./src/utilities/combine-contexts');
// =======
// var _ = require('lodash');
// var path = require('path');
// var prevnextPlugin = require('antwar-prevnext-plugin');
// var markdown = require('./src/utilities/markdown');
// var highlight = require('./src/utilities/highlight');
// >>>>>>> upstream/master

module.exports = {
  maximumWorkers: process.env.TRAVIS && 1, // Faster on Travis
  template: {
    file: path.join(__dirname, 'template.ejs')
  },
  output: 'build',
  title: 'webpack',
  keywords: ['webpack', 'javascript', 'web development', 'programming'],
// <<<<<<< HEAD
  layout: () => require('./src/components/Site/Site.jsx').default,
  paths: {
    '/': {
      content: () => (
        require.context(
          './loaders/page-loader!./content',
// =======
//   pageTitle: function(config, pageTitle) {
//     var siteName = config.name;

//     if (pageTitle === 'index') {
//       return siteName;
//     }

//     return siteName + ' - ' + pageTitle;
//   },
//   plugins: [
//     prevnextPlugin()
//   ],
//   layout: function() {
//     return require('./src/components/Site/Site.jsx').default
//   },
//   paths: {
//     '/': root(
//       function() {
//         return require.context(
//           'json-loader!yaml-frontmatter-loader!./src/content',
//           false,
//           /^\.\/.*\.md$/
//         );
//       }
//     ),

//     'get-started': {
//       redirects: {
//         '': '/guides/getting-started',
//         'install-webpack': '/guides/installation',
//         'why-webpack': '/guides/why-webpack',
//       }
//     },

//     concepts: section(
//       'Concepts',
//       function() {
//         return require.context(
//           'json-loader!yaml-frontmatter-loader!./src/content/concepts',
//           false,
//           /^\.\/.*\.md$/
//         );
//       }
//     ),

//     guides: section(
//       'Guides',
//       function() {
//         return require.context(
//           'json-loader!yaml-frontmatter-loader!./src/content/guides',
//           true,
//           /^\.\/.*\.md$/
//         );
//       }, {
//         'code-splitting-import': '/guides/code-splitting',
//         'code-splitting-require': '/guides/code-splitting',
//         'code-splitting-async': '/guides/code-splitting',
//         'code-splitting-css': '/guides/code-splitting',
//         'code-splitting-libraries': '/guides/code-splitting',
//         'why-webpack': '/guides/comparison',
//         'production-build': '/guides/production'
//       }
//     ),

//     'guides/starter-kits': {
//       title: 'Starter Kits',
//       path() {
//         return require('./src/components/StarterKits/StarterKits.jsx').default;
//       }
//     },

//     development: section(
//       'Development',
//       function() {
//         return require.context(
//           'json-loader!yaml-frontmatter-loader!./src/content/development',
// >>>>>>> upstream/master
          true,
          /^\.\/.*\.md$/
        )
      ),
      index: () => {
        const index = require('./src/components/Splash/Splash.jsx').default;

// <<<<<<< HEAD
        index.title = 'webpack';
        index.description = 'webpack is a module bundler. Its main purpose is to bundle JavaScript files for usage in a browser, yet it is also capable of transforming, bundling, or packaging just about any resource or asset.';

        return index;
      },
      layout: () => require('./src/components/Page/Page.jsx').default,
      paths: {
        'get-started': {
          redirects: {
            '': '/guides/getting-started',
            'install-webpack': '/guides/installation',
            'why-webpack': '/guides/why-webpack',
          }
        },
        guides: {
          redirects: {
            'code-splitting-import': '/guides/code-splitting-async',
            'code-splitting-require': '/guides/code-splitting-async/#require-ensure-',
            'why-webpack': '/guides/comparison',
            'production-build': '/guides/production'
          }
        },
        configuration: {
          redirects: {
            'external-configs': 'javascript-alternatives'
          }
        },
        api: {
          redirects: {
            'passing-a-config': 'configuration-types'
          }
        },
        pluginsapi: {
          redirects: {
            '': '/api/plugins',
            'compiler': '/api/plugins/compiler',
            'template': '/api/plugins/template'
          }
        },
        loaders: {
          content: () => {
            const content = require.context(
              './loaders/page-loader!./content/loaders',
              false,
              /^\.\/.*\.md$/
            );
            const generated = require.context(
              './loaders/page-loader!./generated/loaders',
              false,
              /^\.\/.*\.md$/
            );

            return combineContexts(content, generated);
          }
        },
        loaders: {
          content: () => {
            const content = require.context(
              './loaders/page-loader!./content/plugins',
              false,
              /^\.\/.*\.md$/
            );
            const generated = require.context(
              './loaders/page-loader!./generated/plugins',
              false,
              /^\.\/.*\.md$/
            );

            return combineContexts(content, generated);
          }
        }
// =======
//     configuration: section(
//       'Configuration',
//       function() {
//         return require.context(
//           'json-loader!yaml-frontmatter-loader!./src/content/configuration',
//           false,
//           /^\.\/.*\.md$/
//         );
//       }, {
//         'external-configs': 'javascript-alternatives'
//       }
//     ),

//     api: section(
//       'API',
//       function() {
//         return require.context(
//           'json-loader!yaml-frontmatter-loader!./src/content/api',
//           false,
//           /^\.\/.*\.md$/
//         );
//       }, {
//         'passing-a-config': 'configuration-types'
//       }
//     ),

//     'api/plugins': section(
//       'API',
//       function() {
//         return require.context(
//           'json-loader!yaml-frontmatter-loader!./src/content/api/plugins',
//           false,
//           /^\.\/.*\.md$/
//         );
//       }
//     ),

//     pluginsapi: {
//       redirects: {
//         '': '/api/plugins',
//         'compiler': '/api/plugins/compiler',
//         'template': '/api/plugins/template'
//       }
//     },

//     loaders: section(
//       'Loaders',
//       function() {
//         const content = require.context(
//           'json-loader!yaml-frontmatter-loader!./src/content/loaders',
//           false,
//           /^\.\/.*\.md$/
//         );
//         const generated = require.context(
//           'json-loader!yaml-frontmatter-loader!./generated/loaders',
//           false,
//           /^\.\/.*\.md$/
//         );
//         return combineContexts(content, generated);
//       }
//     ),

//     plugins: section(
//       'Plugins',
//       function() {
//         const content = require.context(
//           'json-loader!yaml-frontmatter-loader!./src/content/plugins',
//           false,
//           /^\.\/.*\.md$/
//         );
//         const generated = require.context(
//           'json-loader!yaml-frontmatter-loader!./generated/plugins',
//           false,
//           /^\.\/.*\.md$/
//         );
//         return combineContexts(content, generated);
//       }
//     ),

//     support: section(
//       'Support',
//       function() {
//         return require.context(
//           'json-loader!yaml-frontmatter-loader!./src/content/support',
//           false,
//           /^\.\/.*\.md$/
//         );
//       }
//     ),

//     vote: {
//       path() {
//         return require('./src/components/Vote/List.jsx').default
// >>>>>>> upstream/master
      }
    },
    vote: () => {
      const page = require('./src/components/Vote/List.jsx').default;

// <<<<<<< HEAD
      page.title = 'Vote';

      return page;
// =======
//     'vote/feedback': {
//       path() {
//         return require('./src/components/Vote/List.jsx').default
//       }
//     },

//     'vote/moneyDistribution': {
//       path() {
//         return require('./src/components/Vote/List.jsx').default
//       }
// >>>>>>> upstream/master
    },
    organization: () => {
      const page = require('./src/components/Organization/Organization.jsx').default;

// <<<<<<< HEAD
      page.title = 'Organization';

      return page;
// =======
//     organization: {
//       path() {
//         return require('./src/components/Organization/Organization.jsx').default
//       }
//     }
//   }
// };

// function root(contentCb) {
//   return {
//     title: 'webpack',
//     path: function() { // Load path content
//       return contentCb();
//     },
//     processPage: processPage(), // Process individual page (url, content)
//     layouts: { // Layouts (page/section)
//       index: function() {
//         return require('./src/components/Splash/Splash.jsx').default
//       },
//       page: function() {
//         return require('./src/components/Page/Page.jsx').default
//       }
//     },
//     redirects: {} // Redirects <from>: <to>
//   };
// }

// function section(title, contentCb, redirects = {}) {
//   return {
//     title: title,
//     path: function() {
//       return contentCb();
//     },
//     sort(pages) {
//       return _.sortBy(pages, (page) => page.file.sort)
//     },
//     processPage: processPage(),
//     layouts: {
//       index: function() {
//         return require('./src/components/Page/Page.jsx').default
//       },
//       page: function() {
//         return require('./src/components/Page/Page.jsx').default
//       }
// >>>>>>> upstream/master
    },
    'guides/starter-kits': () => {
      const page = require('./src/components/StarterKits/StarterKits.jsx').default;

      page.title = 'Starter kits';

      return page;
    }
  }
};
