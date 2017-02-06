---
title: expose-loader
source: https://raw.githubusercontent.com/webpack-contrib/expose-loader/master/README.md
edit: https://github.com/webpack-contrib/expose-loader/edit/master/README.md
---
# expose loader for webpack

expose loader 用来把模块暴露到全局变量。这个功对调试或者支持依赖其他全局库的库时很有用。

** 注意**: 模块必须在你的 bundle 中被 `require()` 过，否则他们将不会被暴露。

##  用法

``` javascript
require("expose-loader?libraryName!./file.js");
// 通过属性名 "libraryName" 暴露 file.js 的 exports 到全局上下文。
// 在浏览器中，就将可以使用 window.libraryName 。
```

下面这行代码暴露 React 到浏览器全局，用来开启 Chrome React devtools ：

```
require("expose-loader?React!react");
```

然后，`window.React` 就可以被 Chrome React devtools 扩展使用。

或者，你可以通过配置文件来设置：

```
module: {
  loaders: [
    { test: require.resolve("react"), loader: "expose-loader?React" }
  ]
}
```
如果要重复暴露到多个变量，可以在加载器字符串中使用 `!` ：
```
module: {
  loaders: [
    { test: require.resolve("jquery"), loader: "expose-loader?$!expose-loader?jQuery" },
  ]
}
```

`require.resolve` 是一个 node.js 调用（与 webpack 处理中的 `require.resolve` 无关 —— 可以阅读 node.js 文档）。`require.resolve` 用来得到模块对应的绝对路径（"/.../app/node_modules/react/react.js"），所以这里只会对 React 进行暴露。并且只在 bundle 中用到它时进行暴露。

[文档：使用加载器](http://webpack.github.io/docs/using-loaders.html)

## License

MIT (http://www.opensource.org/licenses/mit-license.php)

***

> 原文：https://webpack.js.org/loaders/expose-loader/
