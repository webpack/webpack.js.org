---
title: json-loader
source: https://raw.githubusercontent.com/webpack-contrib/json-loader/master/README.md
edit: https://github.com/webpack-contrib/json-loader/edit/master/README.md
repo: https://github.com/webpack-contrib/json-loader
---


## 安装

```bash
npm install --save-dev json-loader
```

> ⚠️ **注意：由于 `webpack >= v2.0.0` 默认支持导入 JSON 文件。如果您使用自定义文件扩展名，您可能仍然需要使用此 loader。See the [v1.0.0 -> v2.0.0 Migration Guide](https://webpack.js.org/guides/migrating/#json-loader-is-not-required-anymore) for more information**

## 用法

##

```js
const json = require('json-loader!./file.json');
```

### `通过配置`（推荐）

```js
const json = require('./file.json');
```

**webpack.config.js**
```js
module.exports = {
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader'
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
        <img width="150" height="150" src="https://avatars.githubusercontent.com/sokra?v=3">
        </br>
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
