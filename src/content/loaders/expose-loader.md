---
title: expose-loader
source: https://raw.githubusercontent.com/webpack-contrib/expose-loader/master/README.md
edit: https://github.com/webpack-contrib/expose-loader/edit/master/README.md
repo: https://github.com/webpack-contrib/expose-loader
---


[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![tests][tests]][tests-url]
[![chat][chat]][chat-url]



expose loader module for webpack

## Requirements

This module requires a minimum of Node v6.9.0 and Webpack v4.0.0.

## Getting Started

To begin, you'll need to install `expose-loader`:

```console
$ npm install expose-loader --save-dev
```

Then add the loader to your `webpack` config. For example:

```js
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /.js/,
        use: [
          {
            loader: `expose-loader`,
            options: {...options}
          }
        ]
      }
    ]
  }
}
```

And then require the target file in your bundle's code:

```js
// src/entry.js
require("expose-loader?libraryName!./thing.js");
```

And run `webpack` via your preferred method.

## Examples

For example, let's say you want to expose jQuery as a global called `$`:

```js
require("expose-loader?$!jquery");
```

Thus, `window.$` is then available in the browser console.

Alternately, you can set this in your config file:

```js
// webpack.config.js
module: {
  rules: [{
    test: require.resolve('jquery'),
    use: [{
      loader: 'expose-loader',
      options: '$'
    }]
  }]
}
```

Let's say you also want to expose it as `window.jQuery` in addition to `window.$`.
For multiple expose you can use `!` in loader string:

```js
// webpack.config.js
module: {
  rules: [{
    test: require.resolve('jquery'),
    use: [{
      loader: 'expose-loader',
      options: 'jQuery'
    },{
      loader: 'expose-loader',
      options: '$'
    }]
  }]
}
```

The [`require.resolve`](https://nodejs.org/api/modules.html#modules_require_resolve_request_options)
call is a Node.js function (unrelated to `require.resolve` in webpack
processing). `require.resolve` gives you the
absolute path to the module (`"/.../app/node_modules/react/react.js"`). So the
expose only applies to the react module. And it's only exposed when used in the
bundle.

## Contributing

Please take a moment to read our contributing guidelines if you haven't yet done so.

#### [CONTRIBUTING](https://raw.githubusercontent.com/webpack-contrib/expose-loader/master/.github/CONTRIBUTING.md)

## License

#### [MIT](https://raw.githubusercontent.com/webpack-contrib/expose-loader/master/LICENSE)

[npm]: https://img.shields.io/npm/v/expose-loader.svg
[npm-url]: https://npmjs.com/package/expose-loader

[node]: https://img.shields.io/node/v/expose-loader.svg
[node-url]: https://nodejs.org

[deps]: https://david-dm.org/webpack-contrib/expose-loader.svg
[deps-url]: https://david-dm.org/webpack-contrib/expose-loader

[tests]: 	https://img.shields.io/circleci/project/github/webpack-contrib/expose-loader.svg
[tests-url]: https://circleci.com/gh/webpack-contrib/expose-loader

[cover]: https://codecov.io/gh/webpack-contrib/expose-loader/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/expose-loader

[chat]: https://img.shields.io/badge/gitter-webpack%2Fwebpack-brightgreen.svg
[chat-url]: https://gitter.im/webpack/webpack
