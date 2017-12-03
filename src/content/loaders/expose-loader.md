---
title: expose-loader
source: https://raw.githubusercontent.com/webpack-contrib/expose-loader/master/README.md
edit: https://github.com/webpack-contrib/expose-loader/edit/master/README.md
repo: https://github.com/webpack-contrib/expose-loader
---
The expose loader adds modules to the global object. This is useful for debugging, or <a href="https://webpack.js.org/guides/shimming/">supporting libraries that depend on libraries in globals</a>.

## 安装

```bash
npm i expose-loader --save
```

## <a href="https://webpack.js.org/concepts/loaders">用法</a>

**注意**: 模块必须在你的 bundle 中被 `require()` 过，否则他们将不会被暴露。

``` javascript
require("expose-loader?libraryName!./file.js");
// 通过属性名 "libraryName" 暴露 file.js 的 exports 到全局上下文。
// 在浏览器中，就将可以使用 window.libraryName 访问。
```

例如，假设你要将 jQuery 暴露至全局并称为 `$`：

```js
require("expose-loader?$!jquery");
```

然后，`window.$` 就可以在浏览器控制台中使用。

或者，你可以通过配置文件来设置：

webpack v1 用法
```js
module: {
  loaders: [
    { test: require.resolve("jquery"), loader: "expose-loader?$" }
  ]
}
```
webpack v2 用法
```js
module: {
  rules: [{
    test: require.resolve('jquery'),
    use: [{
      loader: 'expose-loader',
      options: '$'
    }]
  }]
}
```

除了暴露为 `window. $` 之外，假设你还想把它暴露为 `window.jQuery`。
对于多个暴露，您可以在 loader 字符串中使用 `!`：

webpack v1 用法
```js
module: {
  loaders: [
    { test: require.resolve("jquery"), loader: "expose-loader?$!expose-loader?jQuery" },
  ]
}
```
webpack v2 用法
```js
module: {
  rules: [{
          test: require.resolve('jquery'),
          use: [{
              loader: 'expose-loader',
              options: 'jQuery'
          },{
              loader: 'expose-loader',
              options: '$'
          }]
      }]
}
```

[`require.resolve`](https://nodejs.org/api/all.html#globals_require_resolve) 是一个 node.js 调用（与 webpack 处理流程中的 `require.resolve` 无关）。`require.resolve` 用来获取模块的绝对路径（`"/.../app/node_modules/react/react.js"`）。所以这里的暴露只会作用于 React 模块。并且只在 bundle 中使用到它时，才进行暴露。


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


[npm]: https://img.shields.io/npm/v/expose-loader.svg
[npm-url]: https://npmjs.com/package/expose-loader

[deps]: https://david-dm.org/webpack-contrib/expose-loader.svg
[deps-url]: https://david-dm.org/webpack-contrib/expose-loader

[chat]: https://img.shields.io/badge/gitter-webpack%2Fwebpack-brightgreen.svg
[chat-url]: https://gitter.im/webpack/webpack

***

> 原文：https://webpack.js.org/loaders/expose-loader/
