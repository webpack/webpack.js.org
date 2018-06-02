// Import External Dependencies
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const SSGPlugin = require('static-site-generator-webpack-plugin');
const RedirectWebpackPlugin = require('redirect-webpack-plugin');
const flattenContentTree = require('./src/utilities/flatten-content-tree');
const contentTree = require('./src/_content.json');

// Load Common Configuration
const common = require('./webpack.common.js');

// content tree to path array
const paths = flattenContentTree(contentTree);

console.log(JSON.stringify(paths))
// Prod only config
const prod = {
  plugins: [
    new UglifyJSPlugin({
      parallel: true,
      exclude: /^(server)/
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
};

// Export both SSG and SPA configurations
module.exports = env => [
  merge(common(env), prod, {
    target: 'node',
    entry: {
      index: './server.jsx'
    },
    plugins: [
      new SSGPlugin({
        globals: {
          window: {}
        },
        paths,
        locals: {
          content: contentTree
        }
      }),
      new RedirectWebpackPlugin({
        redirects: {
          'support': '/contribute/',
          'writers-guide': '/contribute/writers-guide/',
          'get-started': '/guides/getting-started/',
          'get-started/install-webpack': '/guides/installation/',
          'get-started/why-webpack': '/guides/why-webpack/',
          'pluginsapi': '/api/plugins/',
          'pluginsapi/compiler': '/api/compiler-hooks/',
          'pluginsapi/template': '/api/template/',
          'api/passing-a-config': '/configuration/configuration-types/',
          'api/plugins/compiler': '/api/compiler-hooks/',
          'api/plugins/compilation': '/api/compilation/',
          'api/plugins/module-factories': '/api/module-methods/',
          'api/plugins/parser': '/api/parser/',
          'api/plugins/tapable': '/api/tapable/',
          'api/plugins/template': '/api/template/',
          'api/plugins/resolver': '/api/resolver/',
          'development': '/contribute/',
          'development/plugin-patterns': '/contribute/plugin-patterns/',
          'development/release-process': '/contribute/release-process/',
          'development/how-to-write-a-loader': '/contribute/writing-a-loader/',
          'development/how-to-write-a-plugin': '/contribute/writing-a-plugin/',
          'guides/code-splitting-import': '/guides/code-splitting/',
          'guides/code-splitting-require': '/guides/code-splitting/',
          'guides/code-splitting-async': '/guides/code-splitting/',
          'guides/code-splitting-css': '/guides/code-splitting/',
          'guides/code-splitting-libraries': '/guides/code-splitting/',
          'guides/why-webpack': '/comparison/',
          'guides/production-build': '/guides/production/',
          'migrating': '/migrate/3/'
        }
      })
    ],
    output: {
      filename: 'server.[name].js',
      libraryTarget: 'umd'
    }
  }),
  merge(common(env), prod, {
    target: 'web',
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        chunks: ['index']
      })
    ]
  })
];
