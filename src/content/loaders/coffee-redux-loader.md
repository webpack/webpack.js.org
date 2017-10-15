---
title: coffee-redux-loader
source: https://raw.githubusercontent.com/webpack-contrib/coffee-redux-loader/master/README.md
edit: https://github.com/webpack-contrib/coffee-redux-loader/edit/master/README.md
repo: https://github.com/webpack-contrib/coffee-redux-loader
---
Coffee Script Redux loader for Webpack.

## Install

```bash
npm i -D coffee-redux-loader
```

## Usage

``` javascript
var exportsOfFile = require("coffee-redux-loader!./file.coffee");
// => return exports of executed and compiled file.coffee
```

Don't forget to polyfill `require` if you want to use it in node.
See `webpack` documentation.

## Maintainers

<table>
  <tbody>
    <tr>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars3.githubusercontent.com/u/166921?v=3&s=150">
        </br>
        <a href="https://github.com/bebraw">Juho Vepsäläinen</a>
      </td>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars2.githubusercontent.com/u/8420490?v=3&s=150">
        </br>
        <a href="https://github.com/d3viant0ne">Joshua Wiens</a>
      </td>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars3.githubusercontent.com/u/533616?v=3&s=150">
        </br>
        <a href="https://github.com/SpaceK33z">Kees Kluskens</a>
      </td>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars3.githubusercontent.com/u/3408176?v=3&s=150">
        </br>
        <a href="https://github.com/TheLarkInn">Sean Larkin</a>
      </td>
    </tr>
  <tbody>
</table>


[npm]: https://img.shields.io/npm/v/coffee-redux-loader.svg
[npm-url]: https://npmjs.com/package/coffee-redux-loader

[deps]: https://david-dm.org/webpack-contrib/coffee-redux-loader.svg
[deps-url]: https://david-dm.org/webpack-contrib/coffee-redux-loader

[chat]: https://img.shields.io/badge/gitter-webpack%2Fwebpack-brightgreen.svg
[chat-url]: https://gitter.im/webpack/webpack
