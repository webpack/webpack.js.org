const path = require('path');
const _ = require('lodash');
const combineContexts = require('./src/utilities/combine-contexts');

module.exports = {
  maximumWorkers: process.env.TRAVIS && 1,
  template: {
    file: path.join(__dirname, 'template.ejs')
  },
  output: 'build',
  title: 'webpack',
  keywords: ['webpack', 'javascript', 'web development', 'programming'],
  layout: () => require('./src/components/Site/Site.jsx').default,
  paths: {
    '/': {
      title: 'Home',
      layout: () => require('./src/components/Page/Page.jsx').default,
      content: () => require.context('./loaders/page-loader!./src/content', false, /^\.\/.*\.md$/),
      index: () => require('./src/components/Splash/Splash.jsx').default,
      redirects: {
        'support': '/contribute',
        'writers-guide': '/contribute/writers-guide'
      }
    },
    concepts: {
      title: 'Concepts',
      url: ({ sectionName, fileName }) => `/${sectionName}/${fileName}/`,
      layout: () => require('./src/components/Page/Page.jsx').default,
      content: () => require.context('./loaders/page-loader!./src/content/concepts', false, /^\.\/.*\.md$/)
    },
    configuration: {
      title: 'Configuration',
      url: ({ sectionName, fileName }) => `/${sectionName}/${fileName}/`,
      layout: () => require('./src/components/Page/Page.jsx').default,
      content: () => require.context('./loaders/page-loader!./src/content/configuration', false, /^\.\/.*\.md$/)
    },
    api: {
      title: 'API',
      url: ({ sectionName, fileName }) => `/${sectionName}/${fileName}/`,
      layout: () => require('./src/components/Page/Page.jsx').default,
      content: () => require.context('./loaders/page-loader!./src/content/api', false, /^\.\/.*\.md$/),
      redirects: {
        'passing-a-config': 'configuration-types'
      }
    },
    guides: {
      title: 'Guides',
      url: ({ sectionName, fileName }) => `/${sectionName}/${fileName}/`,
      layout: () => require('./src/components/Page/Page.jsx').default,
      content: () => require.context('./loaders/page-loader!./src/content/guides', false, /^\.\/.*\.md$/),
      redirects: {
        'code-splitting-import': '/guides/code-splitting',
        'code-splitting-require': '/guides/code-splitting',
        'code-splitting-async': '/guides/code-splitting',
        'code-splitting-css': '/guides/code-splitting',
        'code-splitting-libraries': '/guides/code-splitting',
        'why-webpack': '/comparison',
        'production-build': '/guides/production'
      }
    },
    plugins: {
      title: 'Plugins',
      url: ({ sectionName, fileName }) => `/${sectionName}/${fileName}/`,
      layout: () => require('./src/components/Page/Page.jsx').default,
      content: () => {
        return combineContexts(
          require.context('./loaders/page-loader!./src/content/plugins', false, /^\.\/.*\.md$/),
          require.context('./loaders/page-loader!./generated/plugins', false, /^\.\/.*\.md$/)
        );
      }
    },
    loaders: {
      title: 'Loaders',
      url: ({ sectionName, fileName }) => `/${sectionName}/${fileName}/`,
      layout: () => require('./src/components/Page/Page.jsx').default,
      content: () => {
        return combineContexts(
          require.context('./loaders/page-loader!./src/content/loaders', false, /^\.\/.*\.md$/),
          require.context('./loaders/page-loader!./generated/loaders', false, /^\.\/.*\.md$/)
        );
      }
    },
    contribute: {
      title: 'Contribute',
      url: ({ sectionName, fileName }) => `/${sectionName}/${fileName}/`,
      layout: () => require('./src/components/Page/Page.jsx').default,
      content: () => require.context('./loaders/page-loader!./src/content/contribute', false, /^\.\/.*\.md$/),
    },
    vote: () => require('./src/components/Vote/Vote.jsx').default,
    organization: () => require('./src/components/Organization/Organization.jsx').default,
    'starter-kits': () => require('./src/components/StarterKits/StarterKits.jsx').default,

    /*************************
     Redirects for Old Content
     *************************/
    'get-started': {
      hidden: true,
      redirects: {
        '': '/guides/getting-started',
        'install-webpack': '/guides/installation',
        'why-webpack': '/guides/why-webpack',
      }
    },
    pluginsapi: {
      hidden: true,
      redirects: {
        '': '/api/plugins',
        'compiler': '/api/compiler',
        'template': '/api/template'
      }
    },
    'api/plugins': {
      redirects: {
        'compiler': '/api/compiler',
        'compilation': '/api/compilation',
        'module-factories': '/api/module-factories',
        'parser': '/api/parser',
        'tapable': '/api/tapable',
        'template': '/api/template',
        'resolver': '/api/resolver'
      }
    },
    development: {
      redirects: {
        '': '/contribute',
        'plugin-patterns': '/contribute/plugin-patterns',
        'release-process': '/contribute/release-process',
        'how-to-write-a-loader': '/contribute/writing-a-loader',
        'how-to-write-a-plugin': '/contribute/writing-a-plugin'
      }
    }
  }
};
