---
title: val-loader
source: https://raw.githubusercontent.com/webpack-contrib/val-loader/master/README.md
edit: https://github.com/webpack-contrib/val-loader/edit/master/README.md
repo: https://github.com/webpack-contrib/val-loader
---


[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![tests][tests]][tests-url]
[![chat][chat]][chat-url]



A webpack loader which executes a given module, and returns the result of the
execution at build-time, when the module is required in the bundle. In this way,
the loader changes a module from code to a result.

Another way to view `val-loader`, is that it allows a user a way to make their
own custom loader logic, without having to write a custom loader.

## Requirements

This module requires a minimum of Node v6.9.0 and Webpack v4.0.0.

## Getting Started

To begin, you'll need to install `val-loader`:

```console
$ npm install val-loader --save-dev
```

Then add the loader to your `webpack` config. For example:

```js
// target-file.js
module.exports = () => {
  return { code: 'module.exports = 42;' }
};
```

**webpack.config.js**
```js
module.exports = {
  module: {
    rules: [
      {
        test: /target-file.js$/,
        use: [
          {
            loader: `val-loader`
          }
        ]
      }
    ]
  }
}
```

```js
// src/entry.js
const answer = require('test-file');
```

And run `webpack` via your preferred method.

## Return Object Properties

Targeted modules of this loader must export either a `Function` or `Promise`
that returns an object containing a `code` property at a minimum, but can
contain any number of additional properties.

### `code`

Type: `String|Buffer`
Default: `undefined`
_Required_

Code passed along to webpack or the next loader that will replace the module.

### `sourceMap`

Type: `Object`
Default: `undefined`

A source map passed along to webpack or the next loader.

### `ast`

Type: `Array[Object]`
Default: `undefined`

An [Abstract Syntax Tree](https://en.wikipedia.org/wiki/Abstract_syntax_tree)
that will be passed to the next loader. Useful to speed up the build time if the
next loader uses the same AST.

### `dependencies`

Type: `Array[String]`
Default: `[]`

An array of absolute, native paths to file dependencies that should be watched
by webpack for changes.

### `contextDependencies`

Type: `Array[String]`
Default: `[]`

An array of absolute, native paths to directory dependencies that should be
watched by webpack for changes.

### `cacheable`

Type: `Boolean`
Default: `false`

If `true`, specifies that the code can be re-used in watch mode if none of the
`dependencies` have changed.

## Examples

In this example the loader is configured to operator on a file name of
`years-in-ms.js`, execute the code, and store the result in the bundle as the
result of the execution. This example passes `years` as an `option`, which
corresponds to the `years` parameter in the target module exported function:

```js
// years-in-ms.js
module.exports = function yearsInMs({ years }) {
  const value = years * 365 * 24 * 60 * 60 * 1000;
  // NOTE: this return value will replace the module in the bundle
  return { code: 'module.exports = ' + value };
}
```

```js
// webpack.config.js
module.exports = {
  ...
  module: {
    rules: [
      {
        test: require.resolve('src/years-in-ms.js'),
        use: [
          {
            loader: 'val-loader',
            options: {
              years: 10
            }
          }
        ]
      }
    ]
  }
};
```

In the bundle, requiring the module then returns:

```js
// ... bundle code ...

  const tenYearsMs = require('years-in-ms'); // 315360000000

// ... bundle code ...
```

require("val-loader!tenyearsinms") == 315360000000

## License

#### [MIT](https://raw.githubusercontent.com/webpack-contrib/val-loader/master/LICENSE)

[npm]: https://img.shields.io/npm/v/val-loader.svg
[npm-url]: https://npmjs.com/package/val-loader

[node]: https://img.shields.io/node/v/val-loader.svg
[node-url]: https://nodejs.org

[deps]: https://david-dm.org/webpack-contrib/val-loader.svg
[deps-url]: https://david-dm.org/webpack-contrib/val-loader

[tests]: 	https://img.shields.io/circleci/project/github/webpack-contrib/val-loader.svg
[tests-url]: https://circleci.com/gh/webpack-contrib/val-loader

[cover]: https://codecov.io/gh/webpack-contrib/val-loader/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/val-loader

[chat]: https://img.shields.io/badge/gitter-webpack%2Fwebpack-brightgreen.svg
[chat-url]: https://gitter.im/webpack/webpack