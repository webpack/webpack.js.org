import _ from 'lodash'
import path from 'path'
// Have to make requires explicit so use same copy of plugin as Gatsby itself...
var ExtractTextPlugin = require('gatsby/node_modules/extract-text-webpack-plugin');

exports.createPages = ({ graphql }) => (
  new Promise((resolve, reject) => {
    const paths = []
    graphql(`
      {
        allMarkdown(first: 1000) {
          edges {
            node {
              path
            }
          }
        }
      }
    `)
    .then((result) => {
      if (result.errors) {
        console.log(result.errors)
        reject(result.errors)
      }

      const articleComponent = path.resolve('./page-templates/markdown-template.js')
      // Create article routes.
      _.each(result.data.allMarkdown.edges, (edge) => {
        paths.push({
          path: edge.node.path, // required
          component: articleComponent,
        })
      })

      resolve(paths)
    })
  })
)

exports.modifyWebpackConfig = function(config, env) {
  console.log(env)
  // Use style-loader for dev.
  if (env === 'develop') {
    config.loader('sass', {
      test: /\.(sass|scss)/,
      loaders: ['style', 'css', 'sass'],
    })
  // Add ExtractTextPlugin loader when building css.
  } else if (env === 'build-css') {
    config.loader('sass', {
      test: /\.(sass|scss)$/,
      loader: ExtractTextPlugin.extract(['css?minimize', 'postcss', 'sass']),
    })
  // Otherwise use a null-loader.
  } else {
    config.loader('sass', {
      test: /\.(sass|scss)/,
      loader: 'null',
    })
  }

  return config
}
