---
title: mocha-loader
source: https://raw.githubusercontent.com/webpack-contrib/mocha-loader/master/README.md
edit: https://github.com/webpack-contrib/mocha-loader/edit/master/README.md
repo: https://github.com/webpack-contrib/mocha-loader
---
Allows <a href="http://mochajs.org/">Mocha</a> tests to be loaded and run via webpack

## 安装

```bash
npm install --save-dev mocha-loader
```

## 用法

##

**webpack.config.js**
```js

module.exports = {
  entry: './entry.js',
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      test: /test\.js$/,
      use: 'mocha-loader',
      exclude: /node_modules/,
    }]
  }
}
```

```js
import test from './test'
```

### 命令行接口(CLI)

```bash
webpack --module-bind 'mocha-loader!./test'
```

```js
import test from './test'
```

### Require

```js
import test from 'mocha-loader!./test'
```

## 选项

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


[npm]: https://img.shields.io/npm/v/mocha-loader.svg
[npm-url]: https://npmjs.com/package/mocha-loader

[deps]: https://david-dm.org/webpack/mocha-loader.svg
[deps-url]: https://david-dm.org/webpack/mocha-loader

[chat]: https://badges.gitter.im/webpack/webpack.svg
[chat-url]: https://gitter.im/webpack/webpack

***

> 原文：https://webpack.js.org/loaders/mocha-loader/
