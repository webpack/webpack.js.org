---
title: exports-loader
source: https://raw.githubusercontent.com/webpack-contrib/exports-loader/master/README.md
edit: https://github.com/webpack-contrib/exports-loader/edit/master/README.md
repo: https://github.com/webpack-contrib/exports-loader
---


[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![tests][tests]][tests-url]
[![chat][chat]][chat-url]



exports loader module for webpack

## Requirements

This module requires a minimum of Node v6.9.0 and Webpack v4.0.0.

## Getting Started

To begin, you'll need to install `exports-loader`:

```console
$ npm install exports-loader --save-dev
```

Then add the loader to the desired `require` calls. For example:

```js
require('exports-loader?file,parse=helpers.parse!./file.js');
// adds the following code to the file's source:
//  exports['file'] = file;
//  exports['parse'] = helpers.parse;

require('exports-loader?file!./file.js');
// adds the following code to the file's source:
//  module.exports = file;

require('exports-loader?[name]!./file.js');
// adds the following code to the file's source:
//  module.exports = file;
```

And run `webpack` via your preferred method.

## Contributing

Please take a moment to read our contributing guidelines if you haven't yet done so.

#### [CONTRIBUTING](https://raw.githubusercontent.com/webpack-contrib/exports-loader/master/.github/CONTRIBUTING.md)

## License

#### [MIT](https://raw.githubusercontent.com/webpack-contrib/exports-loader/master/LICENSE)

[npm]: https://img.shields.io/npm/v/exports-loader.svg
[npm-url]: https://npmjs.com/package/exports-loader

[node]: https://img.shields.io/node/v/exports-loader.svg
[node-url]: https://nodejs.org

[deps]: https://david-dm.org/webpack-contrib/exports-loader.svg
[deps-url]: https://david-dm.org/webpack-contrib/exports-loader

[tests]: 	https://img.shields.io/circleci/project/github/webpack-contrib/exports-loader.svg
[tests-url]: https://circleci.com/gh/webpack-contrib/exports-loader

[cover]: https://codecov.io/gh/webpack-contrib/exports-loader/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/exports-loader

[chat]: https://img.shields.io/badge/gitter-webpack%2Fwebpack-brightgreen.svg
[chat-url]: https://gitter.im/webpack/webpack
