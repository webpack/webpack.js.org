---
title: json-loader
source: https://raw.githubusercontent.com/webpack-contrib/json-loader/master/README.md
edit: https://github.com/webpack-contrib/json-loader/edit/master/README.md
---
## 安装

```bash
npm install --save-dev json-loader
```

## 用法


### 通过配置（推荐）

**webpack.config.js**
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.json$/,
        use: 'json-loader'
      }
    ]
  }
}
```

```js
import json from 'file.json';
```

### 通过命令行（CLI）

```bash
webpack --module-bind 'json=json-loader'
```

```js
import json from 'file.json';
```

### 内联使用

```js
import json from 'json-loader!file.json';
```

## 维护者

<table>
  <tbody>
    <tr>
      <td align="center">
        <img width="150" height="150" src="https://github.com/sokra.png?s=150">
        <br>
        <a href="https://github.com/sokra">Tobias Koppers</a>
      </td>
    </tr>
  </tbody>
</table>

[npm]: https://img.shields.io/npm/v/json-loader.svg
[npm-url]: https://npmjs.com/package/json-loader

[node]: https://img.shields.io/node/v/json-loader.svg
[node-url]: https://nodejs.org

[deps]: https://david-dm.org/webpack/json-loader.svg
[deps-url]: https://david-dm.org/webpack/json-loader

[tests]: http://img.shields.io/travis/webpack/json-loader.svg
[tests-url]: https://travis-ci.org/webpack/json-loader

[cover]: https://coveralls.io/repos/github/webpack/json-loader/badge.svg
[cover-url]: https://coveralls.io/github/webpack/json-loader

[chat]: https://badges.gitter.im/webpack/webpack.svg
[chat-url]: https://gitter.im/webpack/webpack

***

> 原文：https://webpack.js.org/loaders/json-loader/
