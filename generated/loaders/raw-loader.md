---
title: raw-loader
source: https://raw.githubusercontent.com/webpack-contrib/raw-loader/master/README.md
edit: https://github.com/webpack-contrib/raw-loader/edit/master/README.md
---
## 安装

```bash
npm install --save-dev raw-loader
```

## 用法

通过 webpack 配置、命令行或者内联使用加载器。

### 通过 webpack 配置（推荐）

**webpack.config.js**
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.txt$/,
        use: 'raw-loader'
      }
    ]
  }
}
```

**在你的项目中**
```js
import txt from 'file.txt';
```

### 通过命令行（CLI）

```bash
webpack --module-bind 'txt=raw-loader'
```

**在你的项目中**
```js
import txt from 'file.txt';
```

### 内联使用

**在你的项目中**
```js
import txt from 'raw-loader!./file.txt';
```

## 维护者

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

[npm]: https://img.shields.io/npm/v/raw-loader.svg
[npm-url]: https://npmjs.com/package/raw-loader

[node]: https://img.shields.io/node/v/raw-loader.svg
[node-url]: https://nodejs.org

[deps]: https://david-dm.org/webpack/raw-loader.svg
[deps-url]: https://david-dm.org/webpack/raw-loader

[tests]: http://img.shields.io/travis/webpack/raw-loader.svg
[tests-url]: https://travis-ci.org/webpack/raw-loader

[cover]: https://coveralls.io/repos/github/webpack/raw-loader/badge.svg
[cover-url]: https://coveralls.io/github/webpack/raw-loader

[chat]: https://badges.gitter.im/webpack/webpack.svg
[chat-url]: https://gitter.im/webpack/webpack
