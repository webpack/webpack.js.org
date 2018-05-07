---
title: yaml-frontmatter-loader
source: https://raw.githubusercontent.com/webpack-contrib/yaml-frontmatter-loader/master/README.md
edit: https://github.com/webpack-contrib/yaml-frontmatter-loader/edit/master/README.md
repo: https://github.com/webpack-contrib/yaml-frontmatter-loader
---


[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![tests][tests]][tests-url]
[![chat][chat]][chat-url]



YAML frontmatter loader for webpack. Converts YAML in files to JSON.

## Requirements

This module requires a minimum of Node v6.9.0 and Webpack v4.0.0.

## Getting Started

To begin, you'll need to install `yaml-frontmatter-loader`:

```console
$ npm install yaml-frontmatter-loader --save-dev
```

Then add the loader to your `webpack` config. For example:

```js
const json = require('yaml-frontmatter-loader!./file.md');
// => returns file.md as javascript object
```

```js
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
         test: /\.md$/,
         use: [ 'json-loader', 'yaml-frontmatter-loader' ]
      }
    ]
  }
}
```

And run `webpack` via your preferred method.

## License

#### [MIT](https://raw.githubusercontent.com/webpack-contrib/yaml-frontmatter-loader/master/LICENSE)

[npm]: https://img.shields.io/npm/v/yaml-frontmatter-loader.svg
[npm-url]: https://npmjs.com/package/yaml-frontmatter-loader

[node]: https://img.shields.io/node/v/yaml-frontmatter-loader.svg
[node-url]: https://nodejs.org

[deps]: https://david-dm.org/webpack-contrib/yaml-frontmatter-loader.svg
[deps-url]: https://david-dm.org/webpack-contrib/yaml-frontmatter-loader

[tests]: https://circleci.com/gh/webpack-contrib/yaml-frontmatter-loader.svg?style=svg
[tests-url]: https://circleci.com/gh/webpack-contrib/yaml-frontmatter-loader

[cover]: https://codecov.io/gh/webpack-contrib/yaml-frontmatter-loader/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/yaml-frontmatter-loader

[chat]: https://img.shields.io/badge/gitter-webpack%2Fwebpack-brightgreen.svg
[chat-url]: https://gitter.im/webpack/webpack