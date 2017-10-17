---
title: null-loader
source: https://raw.githubusercontent.com/webpack-contrib/null-loader/master/README.md
edit: https://github.com/webpack-contrib/null-loader/edit/master/README.md
repo: https://github.com/webpack-contrib/null-loader
---
A loader that returns an empty module.

## 安装

```bash
npm i null-loader --save
```

## 示例

One use for this loader is to silence modules imported by a dependency. Say, for example, your project relies on an ES6 library that imports a polyfill you don't need, so removing it will cause no loss in functionality. Test for the path to the polyfill and it won't be included in your bundle:

```js
const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: path.resolve(__dirname, 'node_modules/library/polyfill.js'),
        use: 'null-loader'
      }
    ]
  }
}
```

## 维护人员

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


[npm]: https://img.shields.io/npm/v/null-loader.svg
[npm-url]: https://npmjs.com/package/null-loader

[deps]: https://david-dm.org/webpack-contrib/null-loader.svg
[deps-url]: https://david-dm.org/webpack-contrib/null-loader

[chat]: https://img.shields.io/badge/gitter-webpack%2Fwebpack-brightgreen.svg
[chat-url]: https://gitter.im/webpack/webpack

***

> 原文：https://webpack.js.org/loaders/null-loader/
