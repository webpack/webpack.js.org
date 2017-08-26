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
      title: "Home",
      content: () => require.context('./src/loaders/page-loader!./src/content', false, /^\.\/.*\.md$/),
      index: () => {
        const index = require('./src/components/Splash/Splash.jsx').default;
        index.title = 'webpack';
        index.description = 'webpack is a module bundler. Its main purpose is to bundle JavaScript files for usage in a browser, yet it is also capable of transforming, bundling, or packaging just about any resource or asset.';

        return index;
      },
      layout: () => require('./src/components/Page/Page.jsx').default,
    },
    'get-started': {
    	title: 'Get Gtarted',
		redirects: {
			'': '/guides/getting-started',
			'install-webpack': '/guides/installation',
			'why-webpack': '/guides/why-webpack',
		}
	},
    api: {
    	title: "API",
		content: () => require.context('./src/loaders/page-loader!./src/content/api', false, /^\.\/.*\.md$/),
		redirects: {
			'passing-a-config': 'configuration-types'
		},
		url: ({ sectionName, fileName }) => `/${sectionName}/${fileName}/`,
		transform: (pages) => {
			return _.sortBy(pages, (page) => page.file.sort)
		},
		layout: () => require('./src/components/Page/Page.jsx').default
	},
	pluginsapi: {
		title: 'API Plugin',
		redirects: {
			'': '/api/plugins',
			'compiler': '/api/plugins/compiler',
			'template': '/api/plugins/template'
		},
		hideInSidebar: true
	},
	concepts: {
		title: "Comcepts",
		content: () => require.context('./src/loaders/page-loader!./src/content/concepts', false, /^\.\/.*\.md$/),
		url: ({ sectionName, fileName }) => `/${sectionName}/${fileName}/`,
		transform: (pages) => {
			return _.sortBy(pages, (page) => page.file.sort)
		},
		layout: () => require('./src/components/Page/Page.jsx').default
	},
	development: {
		title: "Development",
		content: () => require.context('./src/loaders/page-loader!./src/content/development', false, /^\.\/.*\.md$/),
		url: ({ sectionName, fileName }) => `/${sectionName}/${fileName}/`,
		transform: (pages) => {
			return _.sortBy(pages, (page) => page.file.sort)
		},
		layout: () => require('./src/components/Page/Page.jsx').default
	},
	plugins: {
		title: "Plugin",
		content: () => require.context('./src/loaders/page-loader!./src/content/plugins', false, /^\.\/.*\.md$/),
		url: ({ sectionName, fileName }) => `/${sectionName}/${fileName}/`,
		transform: (pages) => {
			return _.sortBy(pages, (page) => page.file.sort)
		},
		layout: () => require('./src/components/Page/Page.jsx').default
	},
    loaders: {
    	title: "Loaders",
		content: () => {
			const content = require.context(
				'./src/loaders/page-loader!./src/content/loaders',
				false,
				/^\.\/.*\.md$/
			);
			const generated = require.context(
				'./src/loaders/page-loader!./generated/loaders',
				false,
				/^\.\/.*\.md$/
			);

			return combineContexts(content, generated);
		},
		url: ({ sectionName, fileName }) => `/${sectionName}/${fileName}/`,
		layout: () => require('./src/components/Page/Page.jsx').default
    },
	guides: {
		title: "Guides",
		content: () => require.context('./src/loaders/page-loader!./src/content/guides', false, /^\.\/.*\.md$/),
		redirects: {
			'code-splitting-import': '/guides/code-splitting',
	        'code-splitting-require': '/guides/code-splitting',
	        'code-splitting-async': '/guides/code-splitting',
	        'code-splitting-css': '/guides/code-splitting',
	        'code-splitting-libraries': '/guides/code-splitting',
	        'why-webpack': '/guides/comparison',
	        'production-build': '/guides/production'
		},
		transform: (pages) => {
			return _.sortBy(pages, (page) => page.file.sort)
		},
		url: ({ sectionName, fileName }) => `/${sectionName}/${fileName}/`,
		layout: () => require('./src/components/Page/Page.jsx').default
	},
    configuration: {
    	title: "Configuration",
		content: () => require.context('./src/loaders/page-loader!./src/content/configuration', false, /^\.\/.*\.md$/),
		transform: (pages) => {
			return _.sortBy(pages, (page) => page.file.sort)
		},
		transform: (pages) => {
			return _.sortBy(pages, (page) => page.file.sort)
		},
		url: ({ sectionName, fileName }) => `/${sectionName}/${fileName}/`,
		layout: () => require('./src/components/Page/Page.jsx').default
	},
	support: {
		title: "Support",
		content: () => require.context('./src/loaders/page-loader!./src/content/support', false, /^\.\/.*\.md$/),
		transform: (pages) => {
			return _.sortBy(pages, (page) => page.file.sort)
		},
		transform: (pages) => {
			return _.sortBy(pages, (page) => page.file.sort)
		},
		url: ({ sectionName, fileName }) => `/${sectionName}/${fileName}/`,
		layout: () => require('./src/components/Page/Page.jsx').default
	},
    vote: () => {
      const page = require('./src/components/Vote/List.jsx').default;
      page.title = 'Vote';

      return page;
  	},
  	'vote/feedback': () => {
      const page = require('./src/components/Vote/List.jsx').default;
      page.title = 'Vote';

      return page;
  	},
  	'vote/moneyDistribution': () => {
      const page = require('./src/components/Vote/List.jsx').default;
      page.title = 'Vote';

      return page;
  	},
    organization: () => {
      const page = require('./src/components/Organization/Organization.jsx').default;

      page.title = 'Organization';

      return page;
    },
    'guides/starter-kits': () => {
      const page = require('./src/components/StarterKits/StarterKits.jsx').default;

      page.title = 'Starter kits';

      return page;
    }
  }
};
