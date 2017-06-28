const path = require('path');
const _ = require('lodash');
const combineContexts = require('./utilities/combine-contexts');

module.exports = {
  maximumWorkers: process.env.TRAVIS && 1, // Faster on Travis
  template: {
    file: path.join(__dirname, 'template.ejs')
  },
  output: 'build',
  title: 'webpack',
  keywords: ['webpack', 'javascript', 'web development', 'programming'],
  layout: () => require('./components/site/site.jsx').default,
  paths: {
    '/': {
      content: () => (
        require.context(
          './loaders/page-loader!./content',
          true,
          /^\.\/.*\.md$/
        )
      ),
      index: () => {
        const index = require('./components/splash/splash.jsx').default;

        index.title = 'webpack';
        index.description = 'webpack is a module bundler. Its main purpose is to bundle JavaScript files for usage in a browser, yet it is also capable of transforming, bundling, or packaging just about any resource or asset.';

        return index;
      },
      layout: () => require('./components/page/page.jsx').default,
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
      }
    },
    vote: () => {
      const page = require('./components/vote/list.jsx').default;

      page.title = 'Vote';

      return page;
    },
    organization: () => {
      const page = require('./components/organization/organization.jsx').default;

      page.title = 'Organization';

      return page;
    },
    'guides/starter-kits': () => {
      const page = require('./components/starter-kits/starter-kits.jsx').default;

      page.title = 'Starter kits';

      return page;
    }
  }
};
