---
title: gzip-loader
source: https://raw.githubusercontent.com/webpack-contrib/gzip-loader/master/README.md
edit: https://github.com/webpack-contrib/gzip-loader/edit/master/README.md
repo: https://github.com/webpack-contrib/gzip-loader
---
gzip loader module for webpack

Enables loading gzipped resources.

## Install

```bash
npm install --save-dev gzip-loader
```

## Usage

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.gz$/,
        enforce: 'pre',
        use: 'gzip-loader'
      }
    ]
  }
}
```

**bundle.js**

```js
require("gzip-loader!./file.js.gz");
```

## Maintainers

<table>
  <tbody>
    <tr>
      <td align="center">
        <a href="https://github.com/jdalton">
          <img width="150" height="150" src="https://avatars.githubusercontent.com/u/4303?v=3&s=150">
          </br>
          John-David Dalton
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/bebraw">
          <img width="150" height="150" src="https://github.com/bebraw.png?v=3&s=150">
          </br>
          Juho Vepsäläinen
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/d3viant0ne">
          <img width="150" height="150" src="https://github.com/d3viant0ne.png?v=3&s=150">
          </br>
          Joshua Wiens
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/michael-ciniawsky">
          <img width="150" height="150" src="https://github.com/michael-ciniawsky.png?v=3&s=150">
          </br>
          Michael Ciniawsky
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/evilebottnawi">
          <img width="150" height="150" src="https://github.com/evilebottnawi.png?v=3&s=150">
          </br>
          Alexander Krasnoyarov
        </a>
      </td>
    </tr>
  <tbody>
</table>

[npm]: https://img.shields.io/npm/v/gzip-loader.svg
[npm-url]: https://npmjs.com/package/gzip-loader

[deps]: https://david-dm.org/webpack-contrib/gzip-loader.svg
[deps-url]: https://david-dm.org/webpack-contrib/gzip-loader

[chat]: https://img.shields.io/badge/gitter-webpack%2Fwebpack-brightgreen.svg
[chat-url]: https://gitter.im/webpack/webpack

[test]: http://img.shields.io/travis/webpack-contrib/gzip-loader.svg
[test-url]: https://travis-ci.org/webpack-contrib/gzip-loader

[cover]: https://codecov.io/gh/webpack-contrib/gzip-loader/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/gzip-loader
