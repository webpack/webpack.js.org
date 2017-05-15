---
title: cache-loader
source: https://raw.githubusercontent.com/webpack-contrib/cache-loader/master/README.md
edit: https://github.com/webpack-contrib/cache-loader/edit/master/README.md
---
## 安装

```bash
npm install --save-dev cache-loader
```

## 用法

在一些开销较大的加载器之前添加此加载器，以将结果缓存到磁盘里。

请注意，保存和读取这些缓存文件会有一些时间开销，所以请只对开销较大的加载器使用此加载器。

## 示例

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve("src"),
        use: [
          "cache-loader",
          "babel-loader"
        ]
      }
    ]
  }
}
```

**使用配置选项**

```js
use: [
  {
    loader: "cache-loader",
    options: {
      // provide a cache directory where cache items should be stored
      cacheDirectory: path.resolve(".cache")
    }
  },
  "babel-loader"
]
```

## 维护者

<table>
  <tbody>
    <tr>
      <td align="center">
        <a href="https://github.com/sokra">
          <img width="150" height="150" src="https://github.com/sokra.png?size=150">
          </br>
          sokra
        </a>
      </td>
    </tr>
  <tbody>
</table>

[npm]: https://img.shields.io/npm/v/cache-loader.svg
[npm-url]: https://npmjs.com/package/cache-loader

[deps]: https://david-dm.org/webpack-contrib/cache-loader.svg
[deps-url]: https://david-dm.org/webpack-contrib/cache-loader

[chat]: https://img.shields.io/badge/gitter-webpack%2Fwebpack-brightgreen.svg
[chat-url]: https://gitter.im/webpack/webpack

[test]: http://img.shields.io/travis/webpack-contrib/cache-loader.svg
[test-url]: https://travis-ci.org/webpack-contrib/cache-loader

[cover]: https://codecov.io/gh/webpack-contrib/cache-loader/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/cache-loader

***

> 原文：https://webpack.js.org/loaders/cache-loader/