---
title: restyle-loader
source: https://raw.githubusercontent.com/webpack-contrib/restyle-loader/master/README.md
edit: https://github.com/webpack-contrib/restyle-loader/edit/master/README.md
---
## 安装

```bash
npm install --save-dev restyle-loader
```

## 用法

[文档：使用 loaders](https://webpack.js.org/loaders/)

## 示例

**webpack.config.js**

```js
{
  test: /\.css?$/,
  use: [
    {
      loader: "restyle-loader"
    },
    {
      loader: "file-loader",
      options: {
        name: "[name].css?[hash:8]"
      }
    }
  ]
}
```
需要 hash 来启用热模块替换(Hot Module Replacement)

**bundle.js**

```js
require("./index.css");

// 在这里打包代码...
```


**index.html**

```html
<!-- ... -->
<head>
  <link rel="stylesheet" type="text/css" href="css/index.css">
</head>
<!-- ... -->
```
Loader 运行后就变成
```html
<!-- ... -->
<head>
  <link rel="stylesheet" type="text/css" href="css/index.css?531fdfd0">
</head>
<!-- ... -->
```


## Maintainers

<table>
  <tbody>
    <tr>
      <td align="center">
        <a href="https://github.com/">
          <img width="150" height="150" src="https://avatars2.githubusercontent.com/u/7072732?v=3&s=150">
          <br />
          <a href="https://github.com/">Daniel Verejan</a>
        </a>
      </td>
      <!-- <td align="center">
        <a href="https://github.com/">
          <img width="150" height="150" src="https://avatars0.githubusercontent.com/u/166921?v=3&s=150">
          <br />
          <a href="https://github.com/">Juho Vepsäläinen</a>
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/">
          <img width="150" height="150" src="https://avatars0.githubusercontent.com/u/8420490?v=3&s=150">
          <br />
          <a href="https://github.com/">Joshua Wiens</a>
        </a>
      </td> -->
    </tr>
  <tbody>
</table>

[npm]: https://img.shields.io/npm/v/restyle-loader.svg
[npm-url]: https://npmjs.com/package/restyle-loader

[deps]: https://david-dm.org/webpack-contrib/restyle-loader.svg
[deps-url]: https://david-dm.org/webpack-contrib/restyle-loader

[chat]: https://img.shields.io/badge/gitter-webpack%2Fwebpack-brightgreen.svg
[chat-url]: https://gitter.im/webpack/webpack

[test]: http://img.shields.io/travis/webpack-contrib/restyle-loader.svg
[test-url]: https://travis-ci.org/webpack-contrib/restyle-loader

[cover]: https://codecov.io/gh/webpack-contrib/restyle-loader/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/restyle-loader

***

> 原文：https://webpack.js.org/loaders/restyle-loader/