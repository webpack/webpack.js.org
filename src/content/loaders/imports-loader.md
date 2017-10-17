---
title: imports-loader
source: https://raw.githubusercontent.com/webpack-contrib/imports-loader/master/README.md
edit: https://github.com/webpack-contrib/imports-loader/edit/master/README.md
repo: https://github.com/webpack-contrib/imports-loader
---
The imports loader allows you to use modules that depend on specific global variables.

This is useful for third-party modules that rely on global variables like `$` or `this` being the `window` object. The imports loader can add the necessary `require('whatever')` calls, so those modules work with webpack.

## 安装

```bash
npm install imports-loader
```

## <a href="https://webpack.js.org/concepts/loaders">用法</a>

假设你有 `example.js` 这个文件

```javascript
$("img").doSomeAwesomeJqueryPluginStuff();
```

然后你可以像下面这样通过配置 imports-loader 插入 `$` 变量到模块中：

``` javascript
require("imports-loader?$=jquery!./example.js");
```

这将简单的把 `var $ = require("jquery");` 前置插入到 `example.js` 中。

##

loader 查询值 | 含义
------------|-------
`angular` | `var angular = require("angular");`
`$=jquery` | `var $ = require("jquery");`
`define=>false` | `var define = false;`
`config=>{size:50}` | `var config = {size:50};`
`this=>window` | `(function () { ... }).call(window);`

### 多个值

使用逗号 `,` 来分隔和使用多个值：

```javascript
require("imports-loader?$=jquery,angular,config=>{size:50}!./file.js");
```

### webpack.config.js

同样的，在你的 `webpack.config.js` 配置文件中进行配置会更好：

```javascript
// ./webpack.config.js

module.exports = {
    ...
    module: {
        rules: [
            {
                test: require.resolve("some-module"),
                use: "imports-loader?this=>window"
            }
        ]
    }
};
```

## 典型的使用场景

### jQuery 插件

`imports-loader?$=jquery`

### 自定义的 Angular 模块

`imports-loader?angular`

### 禁用 AMD

有很多模块在使用 CommonJS 前会进行 `define` 函数的检查。自从 webpack 两种格式都可以使用后，在这种场景下默认使用了 AMD 可能会造成某些问题（如果接口的实现比较古怪）。

你可以像下面这样轻松的禁用 AMD

```javascript
imports-loader?define=>false
```

关于兼容性问题的更多提示，可以参考官方的文档 [Shimming Modules](http://webpack.github.io/docs/shimming-modules.html)。

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


[npm]: https://img.shields.io/npm/v/imports-loader.svg
[npm-url]: https://npmjs.com/package/imports-loader

[deps]: https://david-dm.org/webpack-contrib/imports-loader.svg
[deps-url]: https://david-dm.org/webpack-contrib/imports-loader

[chat]: https://img.shields.io/badge/gitter-webpack%2Fwebpack-brightgreen.svg
[chat-url]: https://gitter.im/webpack/webpack

[test]: http://img.shields.io/travis/webpack-contrib/imports-loader.svg
[test-url]: https://travis-ci.org/webpack-contrib/imports-loader

***

> 原文：https://webpack.js.org/loaders/imports-loader/
