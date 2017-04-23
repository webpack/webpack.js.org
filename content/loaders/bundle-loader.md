---
title: bundle-loader
source: https://raw.githubusercontent.com/webpack-contrib/bundle-loader/master/README.md
edit: https://github.com/webpack-contrib/bundle-loader/edit/master/README.md
---
## 安装

```bash
npm i bundle-loader --save
```

## <a href="https://webpack.js.org/concepts/loaders">用法</a>

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

// Multiple callbacks can be added. They will be executed in the order of addition.
waitForChunk(callbackTwo);
waitForChunk(callbackThree);
// If a callback is added after dependencies were loaded, it will be called immediately.
```

当你引用 bundle 的时候，chunk 会被浏览器加载。如果你想它懒加载，请用：

``` javascript
var load = require("bundle-loader?lazy!./file.js");

// bundle 不会被加载，除非你调用了 call 函数
load(function(file) {

});
```
### `name` query parameter

你可能会使用 `name` 查询参数给 bundle 设置名称。
请查看[文档](https://github.com/webpack/loader-utils#interpolatename).

**Note** chunks created by the loader will be named according to the
[`output.chunkFilename`](https://webpack.js.org/configuration/output/#output-chunkfilename) rule, which defaults to `[id].[name]`.
Here `[name]` corresponds to the chunk name set in the `name` query parameter.

#### Example:

``` js
require("bundle-loader?lazy&name=my-chunk!./file.js");
require("bundle-loader?lazy&name=[name]!./file.js");
```
And the webpack configuration:
``` js
module.exports = {
   entry: { ... },
   output : {
      path : ...,
      filename : '[name].js',
      chunkFilename : '[name]-[id].js', // or whatever other format you want.
   },
}
```

Normal chunks will show up using the `filename` rule above, and be named according to their chunkname.
Chunks from `bundle-loader`, however will load using the `chunkFilename` rule, so the example files will produce `my-chunk-1.js` and `file-2.js` respectively.

You can also use `chunkFilename` to add hash values to the filename, since putting `[hash]` in the bundle query parameter does not work correctly.

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