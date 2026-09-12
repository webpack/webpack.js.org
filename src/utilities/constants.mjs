export const excludedLoaders = [
  // CSS is built in — see /guides/native-css/
  "webpack/css-loader",
  "webpack/style-loader",
  // HTML is built in — see /guides/native-html/
  "webpack/html-loader",
  // Deprecated: webpack shims these without a loader — see /guides/shimming/
  "webpack/expose-loader",
  "webpack/imports-loader",
  "webpack/exports-loader",
  // Deprecated in favour of webpack's own markdown example
  "webpack/remark-loader",
  "webpack-contrib/config-loader",
  "webpack-contrib/eslint-loader",
  "webpack-contrib/transform-loader",
  "webpack-contrib/json-loader",
  "webpack-contrib/script-loader",
  "webpack-contrib/bundle-loader",
  "webpack-contrib/svg-inline-loader",
  "webpack-contrib/i18n-loader",
  "webpack-contrib/jshint-loader",
  "webpack-contrib/coverjs-loader",
  "webpack-contrib/coffee-redux-loader",
  "webpack-contrib/react-proxy-loader",
  "webpack-contrib/multi-loader",
  "webpack-contrib/yaml-frontmatter-loader",
  "webpack-contrib/restyle-loader",
  "webpack-contrib/gzip-loader",
  "webpack-contrib/cache-loader",
  "webpack-contrib/json5-loader",
  "webpack-contrib/raw-loader",
  "webpack-contrib/url-loader",
  "webpack-contrib/file-loader",
  "webpack-contrib/null-loader",
  "webpack-contrib/mocha-loader",
  "webpack-contrib/istanbul-instrumenter-loader",
  "webpack-contrib/worker-loader",
];
export const excludedPlugins = [
  // CSS extraction is built in — see /guides/native-css/
  "webpack/mini-css-extract-plugin",
  // Copying is built in since 5.111.0 — see /plugins/copy-plugin/
  "webpack/copy-webpack-plugin",
  // Folded into minimizer-webpack-plugin, which minimizes every asset type
  "webpack/css-minimizer-webpack-plugin",
  "webpack/html-minimizer-webpack-plugin",
  "webpack/json-minimizer-webpack-plugin",
  "webpack/image-minimizer-webpack-plugin",
  // Folded into diagnostics-webpack-plugin, which runs every linter
  "webpack/stylelint-webpack-plugin",
  "webpack-contrib/component-webpack-plugin",
  "webpack-contrib/extract-text-webpack-plugin",
  "webpack-contrib/i18n-webpack-plugin",
  "webpack-contrib/babel-minify-webpack-plugin",
  "webpack-contrib/uglifyjs-webpack-plugin",
  "webpack-contrib/zopfli-webpack-plugin",
  "webpack-contrib/closure-webpack-plugin",
];
