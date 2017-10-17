---
title: json5-loader
source: https://raw.githubusercontent.com/webpack-contrib/json5-loader/master/README.md
edit: https://github.com/webpack-contrib/json5-loader/edit/master/README.md
repo: https://github.com/webpack-contrib/json5-loader
---
A webpack loader for parsing <a href="http://json5.org/"><code>json5</code></a> files into JavaScript objects.

## 安装

```sh
$ npm install --save-dev json5-loader
```

## 用法

你可以通过以下用法使用这个 loader
 * 在 webpack 配置里的 `module.loaders` 对象中配置 `json5-loader`；
 * 直接在 require 语句中使用 `json5-loader!` 前缀。

假设我们有下面这个 `json5` 文件
```js
// appData.json5
{
  env: 'production',
  passwordStregth: 'strong'
}
```

###

```js
// webpack.config.js
module.exports = {
  entry: './index.js',
  output: { /* ... */ },
  module: {
    loaders: [
      {
        // 使所有以 .json5 结尾的文件使用 `json5-loader`
        test: /\.json5$/,
        loader: 'json5-loader'
      }
    ]
  }
}
```

```js
// index.js
var appConfig = require('./appData.json5')
// 或者 ES6 语法
// import appConfig from './appData.json5'

console.log(appConfig.env) // 'production'
```
#### require 语句使用 loader 前缀的用法
```js
var appConfig = require("json5-loader!./appData.json5")
// 返回的是 json 解析过的对象

console.log(appConfig.env) // 'production'
```

如果需要在 Node.js 中使用，不要忘记兼容(polyfill) require。更多参考 webpack 文档。

## 维护人员

<table>
  <tbody>
    <tr>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars.githubusercontent.com/sokra?v=3">
        <br />
        <a href="https://github.com/sokra">Tobias Koppers</a>
      </td>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars.githubusercontent.com/gdi2290?v=3">
        <br />
        <a href="https://github.com/gdi2290">PatrickJS</a>
      </td>
      <td align="center">
        <img width="150" height="150" src="https://avatars.githubusercontent.com/Cellule?v=3">
        <br />
        <a href="https://github.com/Cellule">Michael Ferris</a>
      </td>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars.githubusercontent.com/kmck?v=3">
        <br />
        <a href="https://github.com/kmck">Keith McKnight</a>
      </td>
    </tr>
    <tr>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars.githubusercontent.com/radubrehar?v=3">
        <br />
        <a href="https://github.com/radubrehar">Radu Brehar</a>
      </td>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars.githubusercontent.com/kentcdodds?v=3">
        <br />
        <a href="https://github.com/kentcdodds">Kent C. Dodds</a>
      </td>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars.githubusercontent.com/stevelacy?v=3">
        <br />
        <a href="https://github.com/stevelacy">Steve Lacy</a>
      </td>
    </tr>
  </tbody>
</table>

## LICENSE

MIT

[npm]: https://img.shields.io/npm/v/json5-loader.svg
[npm-url]: https://npmjs.com/package/json5-loader

[deps]: https://david-dm.org/webpack-contrib/json5-loader.svg
[deps-url]: https://david-dm.org/webpack-contrib/json5-loader

[chat]: https://img.shields.io/badge/gitter-webpack%2Fwebpack-brightgreen.svg
[chat-url]: https://gitter.im/webpack/webpack

[test]: http://img.shields.io/travis/webpack-contrib/json5-loader.svg
[test-url]: https://travis-ci.org/webpack-contrib/json5-loader

[cover]: https://codecov.io/gh/webpack-contrib/json5-loader/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/json5-loader

***

> 原文：https://webpack.js.org/loaders/json5-loader/
