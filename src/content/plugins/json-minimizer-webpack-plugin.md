---
title: JsonMinimizerWebpackPlugin
group: webpack contrib
source: https://raw.githubusercontent.com/webpack-contrib/json-minimizer-webpack-plugin/master/README.md
edit: https://github.com/webpack-contrib/json-minimizer-webpack-plugin/edit/master/README.md
repo: https://github.com/webpack-contrib/json-minimizer-webpack-plugin
---


[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![tests][tests]][tests-url]
[![cover][cover]][cover-url]
[![chat][chat]][chat-url]
[![size][size]][size-url]



This plugin uses [JSON.stringify()](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) to minify your JSON.

## Getting Started

To begin, you'll need to install `json-minimizer-webpack-plugin`:

```console
$ npm install json-minimizer-webpack-plugin --save-dev
```

Then add the plugin to your `webpack` configuration. For example:

**webpack.config.js**

```js
const JsonMinimizerPlugin = require("json-minimizer-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.json$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          context: path.resolve(__dirname, "dist"),
          from: "./src/*.json",
        },
      ],
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
      // `...`
      new JsonMinimizerPlugin(),
    ],
  },
};
```

And run `webpack` via your preferred method.

## Options

### `test`

Type: `String|RegExp|Array<String|RegExp>` - default: `/\.json(\?.*)?$/i`

Test to match files against.

```js
module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new JsonMinimizerPlugin({
        test: /\.foo\.json/i,
      }),
    ],
  },
};
```

### `include`

Type: `String|RegExp|Array<String|RegExp>`
Default: `undefined`

Files to include.

**webpack.config.js**

```js
module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new JsonMinimizerPlugin({
        include: /\/includes/,
      }),
    ],
  },
};
```

### `exclude`

Type: `String|RegExp|Array<String|RegExp>`
Default: `undefined`

Files to exclude.

**webpack.config.js**

```js
module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new JsonMinimizerPlugin({
        exclude: /\/excludes/,
      }),
    ],
  },
};
```

### `minimizerOptions`

Type: `Object`
Default: `{ replacer: null, space: null }`

`JSON.stringify()` [options](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify).

```js
module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new JsonMinimizerPlugin({
        minimizerOptions: {
          space: "\t",
        },
      }),
    ],
  },
};
```

## Contributing

Please take a moment to read our contributing guidelines if you haven't yet done so.

[CONTRIBUTING](https://github.com/webpack-contrib/json-minimizer-webpack-plugin/blob/master/.github/CONTRIBUTING.md)

## License

[MIT](https://github.com/webpack-contrib/json-minimizer-webpack-plugin/blob/master/LICENSE)

[npm]: https://img.shields.io/npm/v/json-minimizer-webpack-plugin.svg
[npm-url]: https://npmjs.com/package/json-minimizer-webpack-plugin
[node]: https://img.shields.io/node/v/json-minimizer-webpack-plugin.svg
[node-url]: https://nodejs.org
[deps]: https://david-dm.org/webpack-contrib/json-minimizer-webpack-plugin.svg
[deps-url]: https://david-dm.org/webpack-contrib/json-minimizer-webpack-plugin
[tests]: https://github.com/webpack-contrib/json-minimizer-webpack-plugin/workflows/json-minimizer-webpack-plugin/badge.svg
[tests-url]: https://github.com/webpack-contrib/json-minimizer-webpack-plugin/actions
[cover]: https://codecov.io/gh/webpack-contrib/json-minimizer-webpack-plugin/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/json-minimizer-webpack-plugin
[chat]: https://img.shields.io/badge/gitter-webpack%2Fwebpack-brightgreen.svg
[chat-url]: https://gitter.im/webpack/webpack
[size]: https://packagephobia.now.sh/badge?p=json-minimizer-webpack-plugin
[size-url]: https://packagephobia.now.sh/result?p=json-minimizer-webpack-plugin
