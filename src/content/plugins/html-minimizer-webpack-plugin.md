---
title: HtmlMinimizerWebpackPlugin
group: webpack contrib
source: https://raw.githubusercontent.com/webpack-contrib/html-minimizer-webpack-plugin/master/README.md
edit: https://github.com/webpack-contrib/html-minimizer-webpack-plugin/edit/master/README.md
repo: https://github.com/webpack-contrib/html-minimizer-webpack-plugin
---


[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![tests][tests]][tests-url]
[![cover][cover]][cover-url]
[![chat][chat]][chat-url]
[![size][size]][size-url]



This plugin uses [html-minifier-terser](https://github.com/terser/html-minifier-terser) to optimize and minify your HTML.

## Getting Started

To begin, you'll need to install `html-minimizer-webpack-plugin`:

```console
$ npm install html-minimizer-webpack-plugin --save-dev
```

Then add the plugin to your `webpack` configuration. For example:

**webpack.config.js**

```js
const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  module: {
    loaders: [
      {
        test: /\.html$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          context: path.resolve(__dirname, "dist"),
          from: "./src/*.html",
        },
      ],
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
      // `...`
      new HtmlMinimizerPlugin(),
    ],
  },
};
```

This will enable HTML optimization only in production mode.
If you want to run it also in development set the `optimization.minimize` option to `true`.

And run `webpack` via your preferred method.

## Options

### `test`

Type: `String|RegExp|Array<String|RegExp>` - default: `/\.html(\?.*)?$/i`

Test to match files against.

```js
module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new HtmlMinimizerPlugin({
        test: /\.foo\.html/i,
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
      new HtmlMinimizerPlugin({
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
      new HtmlMinimizerPlugin({
        exclude: /\/excludes/,
      }),
    ],
  },
};
```

### `parallel`

Type: `Boolean|Number`
Default: `true`

Use multi-process parallel running to improve the build speed.
Default number of concurrent runs: `os.cpus().length - 1`.

> ℹ️ Parallelization can speedup your build significantly and is therefore **highly recommended**.

#### `Boolean`

Enable/disable multi-process parallel running.

**webpack.config.js**

```js
module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new HtmlMinimizerPlugin({
        parallel: true,
      }),
    ],
  },
};
```

#### `Number`

Enable multi-process parallel running and set number of concurrent runs.

**webpack.config.js**

```js
module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new HtmlMinimizerPlugin({
        parallel: 4,
      }),
    ],
  },
};
```

### `minify`

Type: `Function|Array<Function>`
Default: `HtmlMinimizerPlugin.htmlMinifierTerser`

Allows you to override default minify function.
By default plugin uses [html-minifier-terser](https://github.com/terser/html-minifier-terser) package.
Useful for using and testing unpublished versions or forks.

> ⚠️ **Always use `require` inside `minify` function when `parallel` option enabled**.

#### `Function`

**webpack.config.js**

```js
module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new HtmlMinimizerPlugin({
        minimizerOptions: {
          collapseWhitespace: true,
        },
        minify: (data, minimizerOptions) => {
          const htmlMinifier = require("html-minifier-terser");
          const [[filename, input]] = Object.entries(data);

          return {
            code: htmlMinifier.minify(input, minimizerOptions),
            warnings: [],
            errors: [],
          };
        },
      }),
    ],
  },
};
```

#### `Array`

If an array of functions is passed to the `minify` option, the `minimizerOptions` can be an array or an object.
If `minimizerOptions` is array, the function index in the `minify` array corresponds to the options object with the same index in the `minimizerOptions` array.
If you use `minimizerOptions` like object, all `minify` function accept it.

**webpack.config.js**

```js
module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new HtmlMinimizerPlugin({
        minimizerOptions: [
          // Options for the first function (HtmlMinimizerPlugin.htmlMinifierTerser)
          {
            collapseWhitespace: true,
          },
          // Options for the second function
          {},
        ],
        minify: [
          HtmlMinimizerPlugin.htmlMinifierTerser,
          (data, minimizerOptions) => {
            const [[filename, input]] = Object.entries(data);
            // To do something
            return {
              code: `optimised code`,
              warnings: [],
              errors: [],
            };
          },
        ],
      }),
    ],
  },
};
```

### `minimizerOptions`

Type: `Object|Array<Object>`
Default: `{ caseSensitive: true, collapseWhitespace: true, conservativeCollapse: true, keepClosingSlash: true, minifyCSS: true, minifyJS: true, removeComments: true, removeScriptTypeAttributes: true, removeStyleLinkTypeAttributes: true, }`

`Html-minifier-terser` optimisations [options](https://github.com/terser/html-minifier-terser#options-quick-reference).

#### `Object`

```js
module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new HtmlMinimizerPlugin({
        minimizerOptions: {
          collapseWhitespace: false,
        },
      }),
    ],
  },
};
```

#### `Array`

The function index in the `minify` array corresponds to the options object with the same index in the `minimizerOptions` array.
If you use `minimizerOptions` like object, all `minify` function accept it.

**webpack.config.js**

```js
module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new HtmlMinimizerPlugin({
        minimizerOptions: [
          // Options for the first function (HtmlMinimizerPlugin.htmlMinifierTerser)
          {
            collapseWhitespace: true,
          },
          // Options for the second function
          {},
        ],
        minify: [
          HtmlMinimizerPlugin.htmlMinifierTerser,
          (data, minimizerOptions) => {
            const [[filename, input]] = Object.entries(data);
            // To do something
            return {
              code: `optimised code`,
              warnings: [],
              errors: [],
            };
          },
        ],
      }),
    ],
  },
};
```

## Contributing

Please take a moment to read our contributing guidelines if you haven't yet done so.

[CONTRIBUTING](https://github.com/webpack-contrib/html-minimizer-webpack-plugin/blob/master/.github/CONTRIBUTING.md)

## License

[MIT](https://github.com/webpack-contrib/html-minimizer-webpack-plugin/blob/master/LICENSE)

[npm]: https://img.shields.io/npm/v/html-minimizer-webpack-plugin.svg
[npm-url]: https://npmjs.com/package/html-minimizer-webpack-plugin
[node]: https://img.shields.io/node/v/html-minimizer-webpack-plugin.svg
[node-url]: https://nodejs.org
[deps]: https://david-dm.org/webpack-contrib/html-minimizer-webpack-plugin.svg
[deps-url]: https://david-dm.org/webpack-contrib/html-minimizer-webpack-plugin
[tests]: https://github.com/webpack-contrib/html-minimizer-webpack-plugin/workflows/html-minimizer-webpack-plugin/badge.svg
[tests-url]: https://github.com/webpack-contrib/html-minimizer-webpack-plugin/actions
[cover]: https://codecov.io/gh/webpack-contrib/html-minimizer-webpack-plugin/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/html-minimizer-webpack-plugin
[chat]: https://img.shields.io/badge/gitter-webpack%2Fwebpack-brightgreen.svg
[chat-url]: https://gitter.im/webpack/webpack
[size]: https://packagephobia.now.sh/badge?p=html-minimizer-webpack-plugin
[size-url]: https://packagephobia.now.sh/result?p=html-minimizer-webpack-plugin
