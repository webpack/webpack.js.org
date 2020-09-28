const excludedLoaders = [
  'webpack-contrib/config-loader',
  'webpack-contrib/eslint-loader'
];
const excludedPlugins = [
  'webpack-contrib/component-webpack-plugin',
  'webpack-contrib/extract-text-webpack-plugin',
  'webpack-contrib/i18n-webpack-plugin',
  'webpack-contrib/babel-minify-webpack-plugin',
  'webpack-contrib/uglifyjs-webpack-plugin',
  'webpack-contrib/zopfli-webpack-plugin'
];

module.exports = {
  excludedLoaders,
  excludedPlugins
};
