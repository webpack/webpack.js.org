---
title: bundle-loader
source: https://raw.githubusercontent.com/webpack/bundle-loader/master/README.md
edit: https://github.com/webpack/bundle-loader/edit/master/README.md
---
## 安装

```bash
npm i bundle-loader --save
```

## Usage

[文档: 使用加载器](http://webpack.github.io/docs/using-loaders.html)

``` javascript
// 当你引用 bundle 的时候，chunk 会被浏览器加载。
var waitForChunk = require("bundle-loader!./file.js");

// 为了等待 chunk 的加载完成 (而且为了拿到 exports 输出)
// 你需要异步去等待它
waitForChunk(function(file) {
	// 这里可以使用file，就像是用下面的代码require进来一样
	// var file = require("./file.js");
});
// 将 require 包裹在 require.ensure 的代码块中
```

当你引用 bundle 的时候，chunk 会被浏览器加载。如果你想它懒加载，请用：

``` javascript
var load = require("bundle-loader?lazy!./file.js");

// bundle 不会被加载，除非你调用了 call 函数
load(function(file) {

});
```

你可能会给 bundle 设名称(`name` 查询参数)。请查看[documentation](https://github.com/webpack/loader-utils#interpolatename).

``` javascript
require("bundle-loader?lazy&name=my-chunk!./file.js");
```

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


[npm]: https://img.shields.io/npm/v/bundle-loader.svg
[npm-url]: https://npmjs.com/package/bundle-loader

[deps]: https://david-dm.org/webpack-contrib/bundle-loader.svg
[deps-url]: https://david-dm.org/webpack-contrib/bundle-loader

[chat]: https://img.shields.io/badge/gitter-webpack%2Fwebpack-brightgreen.svg
[chat-url]: https://gitter.im/webpack/webpack

***

> 原文：https://webpack.js.org/loaders/bundle-loader/