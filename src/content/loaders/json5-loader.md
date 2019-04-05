---
title: json5-loader
source: https://raw.githubusercontent.com/webpack-contrib/json5-loader/master/README.md
edit: https://github.com/webpack-contrib/json5-loader/edit/master/README.md
repo: https://github.com/webpack-contrib/json5-loader
---


[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![tests][tests]][tests-url]
[![cover][cover]][cover-url]
[![chat][chat]][chat-url]
[![size][size]][size-url]



A webpack loader for parsing [json5](https://json5.org/) files into JavaScript objects.

## Getting Started

To begin, you'll need to install `json5-loader`:

```sh
$ npm install json5-loader --save-dev
```

You can use the loader either:

- by configuring the `json5-loader` in the `module.loaders` object of the webpack configuration, or
- by directly using the `json5-loader!` prefix to the require statement.

Suppose we have the following `json5` file:

**file.json5**

```json5
// file.json5
{
  env: 'production',
  passwordStrength: 'strong',
}
```

### Usage with preconfigured loader

**webpack.config.js**

```js
// webpack.config.js
module.exports = {
  entry: './index.js',
  output: {
    /* ... */
  },
  module: {
    loaders: [
      {
        // make all files ending in .json5 use the `json5-loader`
        test: /\.json5$/,
        loader: 'json5-loader',
      },
    ],
  },
};
```

```js
// index.js
var appConfig = require('./appData.json5');
// or, in ES6
// import appConfig from './appData.json5'

console.log(appConfig.env); // 'production'
```

### Usage with require statement loader prefix

```js
var appConfig = require('json5-loader!./appData.json5');
// returns the content as json parsed object

console.log(appConfig.env); // 'production'
```

Don't forget to polyfill require if you want to use it in Node.js. See the webpack documentation.

## Contributing

Please take a moment to read our contributing guidelines if you haven't yet done so.

[CONTRIBUTING](https://raw.githubusercontent.com/webpack-contrib/json5-loader/master/.github/CONTRIBUTING.md)

## License

[MIT](https://raw.githubusercontent.com/webpack-contrib/json5-loader/master/LICENSE)

[npm]: https://img.shields.io/npm/v/json5-loader.svg
[npm-url]: https://npmjs.com/package/json5-loader
[node]: https://img.shields.io/node/v/json5-loader.svg
[node-url]: https://nodejs.org
[deps]: https://david-dm.org/webpack-contrib/json5-loader.svg
[deps-url]: https://david-dm.org/webpack-contrib/json5-loader
[tests]: http://img.shields.io/travis/webpack-contrib/json5-loader.svg
[tests-url]: https://travis-ci.org/webpack-contrib/json5-loader
[cover]: https://codecov.io/gh/webpack-contrib/json5-loader/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/json5-loader
[chat]: https://img.shields.io/badge/gitter-webpack%2Fwebpack-brightgreen.svg
[chat-url]: https://gitter.im/webpack/webpack
[size]: https://packagephobia.now.sh/badge?p=json5-loader
[size-url]: https://packagephobia.now.sh/result?p=json5-loader
