---
title: node-loader
source: https://raw.githubusercontent.com/webpack-contrib/node-loader/master/README.md
edit: https://github.com/webpack-contrib/node-loader/edit/master/README.md
repo: https://github.com/webpack-contrib/node-loader
---


[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![tests][tests]][tests-url]
[![chat][chat]][chat-url]



A [Node.js add-ons](https://nodejs.org/dist/latest/docs/api/addons.html) loader
module for enhanced-require. Executes add-ons in
[enhanced-require](https://github.com/webpack/enhanced-require).

## Requirements

This module requires a minimum of Node v6.9.0 and Webpack v4.0.0.

## Getting Started

To begin, you'll need to install `node-loader`:

```console
$ npm install node-loader --save-dev
```

Then add the loader to your `webpack` config. For example:

```js
import node from 'file.node';
```

```js
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.node$/,
        use: 'node-loader'
      }
    ]
  }
}
```

Or on the command-line:

```console
$ webpack --module-bind 'node=node-loader'
```

### Inline

**In your application**
```js
import node from 'node-loader!./file.node';
```

And run `webpack` via your preferred method.

## License

#### [MIT](https://raw.githubusercontent.com/webpack-contrib/node-loader/master/LICENSE)

[npm]: https://img.shields.io/npm/v/node-loader.svg
[npm-url]: https://npmjs.com/package/node-loader

[node]: https://img.shields.io/node/v/node-loader.svg
[node-url]: https://nodejs.org

[deps]: https://david-dm.org/webpack-contrib/node-loader.svg
[deps-url]: https://david-dm.org/webpack-contrib/node-loader

[tests]: https://circleci.com/gh/webpack-contrib/node-loader.svg?style=svg
[tests-url]: https://circleci.com/gh/webpack-contrib/node-loader

[cover]: https://codecov.io/gh/webpack-contrib/node-loader/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/node-loader

[chat]: https://img.shields.io/badge/gitter-webpack%2Fwebpack-brightgreen.svg
[chat-url]: https://gitter.im/webpack/webpack