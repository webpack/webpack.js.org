const excludedLoaders = [
  'webpack-contrib/config-loader',
  'webpack-contrib/eslint-loader',
  'webpack-contrib/transform-loader',
  'webpack-contrib/json-loader',
  'webpack-contrib/script-loader',
  'webpack-contrib/bundle-loader',
  'webpack-contrib/svg-inline-loader',
  'webpack-contrib/i18n-loader',
  'webpack-contrib/jshint-loader',
  'webpack-contrib/coverjs-loader',
  'webpack-contrib/coffee-redux-loader',
  'webpack-contrib/react-proxy-loader',
  'webpack-contrib/multi-loader',
  'webpack-contrib/yaml-frontmatter-loader',
  'webpack-contrib/restyle-loader',
  'webpack-contrib/gzip-loader',
  'webpack-contrib/cache-loader',
  'webpack-contrib/json5-loader',
];
const excludedPlugins = [
  'webpack-contrib/component-webpack-plugin',
  'webpack-contrib/extract-text-webpack-plugin',
  'webpack-contrib/i18n-webpack-plugin',
  'webpack-contrib/babel-minify-webpack-plugin',
  'webpack-contrib/uglifyjs-webpack-plugin',
  'webpack-contrib/zopfli-webpack-plugin',
];

module.exports = {
  excludedLoaders,
  excludedPlugins,
};
