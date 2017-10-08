---
title: ModuleConcatenationPlugin
contributors:
  - skipjack
  - TheLarkInn
related:
  - webpack 3: Official Release!!
---

过去 webpack 打包时的一个取舍是将 bundle 中各个模块单独打包成闭包。这些打包函数使你的 JavaScript 在浏览器中处理的更慢。相比之下，一些工具像 Closure Compiler 和 RollupJS 可以提升(hoist)或者预编译所有模块到一个闭包中，提升你的代码在浏览器中的执行速度。

这个插件会在 webpack 中实现以上的预编译功能。

``` js
new webpack.optimize.ModuleConcatenationPlugin()
```

> 由于实现 ECMAScript 模块语法，作用域提升(Scope Hoisting)这个特定于此语法的功能才成为可能。`webpack` 可能会根据你正在使用的模块类型和[其他的情况](https://medium.com/webpack/webpack-freelancing-log-book-week-5-7-4764be3266f5)，回退到普通打包。
