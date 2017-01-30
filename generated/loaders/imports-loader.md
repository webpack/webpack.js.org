---
title: imports-loader
source: https://raw.githubusercontent.com/webpack-contrib/imports-loader/master/README.md
edit: https://github.com/webpack-contrib/imports-loader/edit/master/README.md
---
# imports loader for webpack

imports loader 允许你依赖特定的全局变量来使用模块。

这对一些依赖全局变量的第三方模块（例如 `window` 下的 `$` 或者 `this`）很有用。imports loader 会添加必要的 `require('whatever')` 调用，让这些模块可以在 webpack 中使用。

##  安装

```
npm install imports-loader
```

## 用法

假设你有 `example.js` 这个文件

```javascript
$("img").doSomeAwesomeJqueryPluginStuff();
```

然后你可以像下面这样通过配置 imports-loader 插入 `$` 变量到模块中：

``` javascript
require("imports-loader?$=jquery!./example.js");
```

这将简单的把 `var $ = require("jquery");` 前置插入到 `example.js` 中。

### 语法

加载器查询值 | 含义
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
        loaders: [
            {
                test: require.resolve("some-module"),
                loader: "imports-loader?this=>window"
            }
        ]
    }
};
```

[文档：使用加载器](http://webpack.github.io/docs/using-loaders.html)

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

## License

MIT (http://www.opensource.org/licenses/mit-license.php)
