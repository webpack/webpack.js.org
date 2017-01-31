---
title: node-loader
source: https://raw.githubusercontent.com/webpack-contrib/node-loader/master/README.md
edit: https://github.com/webpack-contrib/node-loader/edit/master/README.md
---
## 安装

```bash
npm install --save-dev node-loader
```

## 用法

在 [enhanced-require](https://github.com/webpack/enhanced-require) 中执行 [node add-ons](https://nodejs.org/dist/latest/docs/api/addons.html) 

通过 webpack 配置、命令行或者内联使用加载器。

### 通过 webpack 配置（推荐）

**webpack.config.js**
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.node$/,
        use: 'node-loader'
      }
    ]
  }
}
```

**在你的项目中**
```js
import node from 'file.node';
```

### 通过命令行（CLI）

```bash
webpack --module-bind 'node=node-loader'
```

**在你的项目中**
```js
import node from 'file.node';
```

### 内联使用

**在你的项目中**
```js
import node from 'node-loader!./file.node';
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


[npm]: https://img.shields.io/npm/v/node-loader.svg
[npm-url]: https://npmjs.com/package/node-loader

[node]: https://img.shields.io/node/v/node-loader.svg
[node-url]: https://nodejs.org

[deps]: https://david-dm.org/webpack/node-loader.svg
[deps-url]: https://david-dm.org/webpack/node-loader

[tests]: http://img.shields.io/travis/webpack/node-loader.svg
[tests-url]: https://travis-ci.org/webpack/node-loader

[cover]: https://coveralls.io/repos/github/webpack/node-loader/badge.svg
[cover-url]: https://coveralls.io/github/webpack/node-loader

[chat]: https://badges.gitter.im/webpack/webpack.svg
[chat-url]: https://gitter.im/webpack/webpack

***

> 原文：https://webpack.js.org/loaders/node-loader/
