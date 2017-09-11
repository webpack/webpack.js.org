const path = require('path');
const _ = require('lodash');
const combineContexts = require('./src/utilities/combine-contexts');

module.exports = {
  maximumWorkers: process.env.TRAVIS && 1,
  template: {
    file: path.join(__dirname, 'template.ejs')
  },
  output: 'build',
  title: 'webpack 中文文档',
  keywords: ['webpack', 'javascript', 'web development', 'programming'],
  layout: () => require('./src/components/Site/Site.jsx').default,
  paths: {
    '/': {
      title: "Home",
      content: () => require.context('./loaders/page-loader!./src/content', false, /^\.\/.*\.md$/),
      index: () => {
        const index = require('./src/components/Splash/Splash.jsx').default;
        index.title = 'webpack 中文文档';
        index.description = 'webpack 是一个模块打包器。它的主要目标是将 JavaScript 文件打包在一起，打包后的文件用于在浏览器中使用，但它也能够胜任转换(transform)、打包(bundle)或包裹(package)任何资源(resource or asset)。';

        return index;
      },
      layout: () => require('./src/components/Page/Page.jsx').default,
    },
    'get-started': {
      redirects: {
        '': '/guides/getting-started',
        'install-webpack': '/guides/installation',
        'why-webpack': '/guides/why-webpack',
      }
    },
    api: {
      title: "API",
      layout: () => require('./src/components/Page/Page.jsx').default,
      url: ({ sectionName, fileName }) => `/${sectionName}/${fileName}/`,
      content: () => require.context('./loaders/page-loader!./src/content/api', false, /^\.\/.*\.md$/),
      transform: (pages) => {
        return _.sortBy(pages, (page) => page.file.sort)
      },
      redirects: {
        'passing-a-config': 'configuration-types'
      }
    },
    'api/plugins': {
      title: "API 插件",
      layout: () => require('./src/components/Page/Page.jsx').default,
      url: ({ sectionName, fileName }) => `/${sectionName}/${fileName}/`,
      content: () => require.context('./loaders/page-loader!./src/content/api/plugins', false, /^\.\/.*\.md$/),
      transform: (pages) => {
        return _.sortBy(pages, (page) => page.file.sort)
      },
      redirects: {
        'passing-a-config': 'configuration-types'
      }
    },
    pluginsapi: {
      title: 'API 插件',
      redirects: {
        '': '/api/plugins',
        'compiler': '/api/plugins/compiler',
        'template': '/api/plugins/template'
      },
      hideInSidebar: true
    },
    concepts: {
      title: "概念",
      layout: () => require('./src/components/Page/Page.jsx').default,
      content: () => require.context('./loaders/page-loader!./src/content/concepts', false, /^\.\/.*\.md$/),
      url: ({ sectionName, fileName }) => `/${sectionName}/${fileName}/`,
      transform: (pages) => {
        return _.sortBy(pages, (page) => page.file.sort)
      }
    },
    development: {
      title: "开发",
      layout: () => require('./src/components/Page/Page.jsx').default,
      content: () => require.context('./loaders/page-loader!./src/content/development', false, /^\.\/.*\.md$/),
      url: ({ sectionName, fileName }) => `/${sectionName}/${fileName}/`,
      transform: (pages) => {
        return _.sortBy(pages, (page) => page.file.sort)
      }
    },
    plugins: {
      title: "插件",
      content: () => {
        return combineContexts(
          require.context('./loaders/page-loader!./src/content/plugins', false, /^\.\/.*\.md$/),
          require.context('./loaders/page-loader!./generated/plugins', false, /^\.\/.*\.md$/)
        );
      },
      url: ({ sectionName, fileName }) => `/${sectionName}/${fileName}/`,
      transform: (pages) => {
        return _.sortBy(pages, (page) => page.file.sort)
      },
      layout: () => require('./src/components/Page/Page.jsx').default
    },
    loaders: {
      title: "loaders",
      url: ({ sectionName, fileName }) => `/${sectionName}/${fileName}/`,
      layout: () => require('./src/components/Page/Page.jsx').default,
      content: () => {
        return combineContexts(
          require.context('./loaders/page-loader!./src/content/loaders', false, /^\.\/.*\.md$/),
          require.context('./loaders/page-loader!./generated/loaders', false, /^\.\/.*\.md$/)
        );
      },
    },
    guides: {
      title: "指南",
      layout: () => require('./src/components/Page/Page.jsx').default,
      url: ({ sectionName, fileName }) => `/${sectionName}/${fileName}/`,
      content: () => require.context('./loaders/page-loader!./src/content/guides', false, /^\.\/.*\.md$/),
      transform: (pages) => {
        return _.sortBy(pages, (page) => page.file.sort)
      },
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
    configuration: {
      title: "配置",
      layout: () => require('./src/components/Page/Page.jsx').default,
      url: ({ sectionName, fileName }) => `/${sectionName}/${fileName}/`,
      content: () => require.context('./loaders/page-loader!./src/content/configuration', false, /^\.\/.*\.md$/),
      transform: (pages) => {
        return _.sortBy(pages, (page) => page.file.sort)
      }
    },
    support: {
      title: "支持",
      layout: () => require('./src/components/Page/Page.jsx').default,
      url: ({ sectionName, fileName }) => `/${sectionName}/${fileName}/`,
      content: () => require.context('./loaders/page-loader!./src/content/support', false, /^\.\/.*\.md$/),
      transform: (pages) => {
        return _.sortBy(pages, (page) => page.file.sort)
      }
    },
    vote: () => {
      const page = require('./src/components/Vote/List.jsx').default;
      page.title = '投票';

      return page;
    },
    organization: () => {
      const page = require('./src/components/Organization/Organization.jsx').default;

      page.title = '组织';

      return page;
    },
    'guides/starter-kits': () => {
      const page = require('./src/components/StarterKits/StarterKits.jsx').default;

      page.title = '配套工具';

      return page;
    }
  }
};
