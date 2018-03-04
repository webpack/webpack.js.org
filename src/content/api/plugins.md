---
title: Plugin API
group: Plugins
sort: 0
---

T> 对于编写插件的高度概括，请先阅读[编写一个插件](/contribute/writing-a-plugin).

webpack 中的很多对象继承了 `Tapable` 类，暴露出一个 `plugin` 方法。通过 `plugin` 方法，插件可以注入自定义的构建步骤。你会看到 `compiler.plugin` 和 `compilation.plugin` 被大量使用。本质上，每一个 plugin 方法调用时的回调函数的触发时机，都会被绑定到整个构建过程中特定步骤。

有两种类型的 plugin 接口……

__基于时间的(Timing Based)__

- sync（默认）：plugin 同步执行，返回它的输出
- async：plugin 异步执行，使用给定的 `callback` 来返回它的输出
- parallel：处理函数被并行地调用

__返回值的(Return Value)__

- not bailing（默认）：没有返回值
- bailing：处理函数被顺序调用，直到一个处理函数有返回值
- parallel bailing：处理函数被并行（异步）地调用。（按顺序）第一个被返回的值会被使用。
- waterfall：每个处理函数，将上一个处理函数的结果作为参数。

plugin 会在 webpack 启动时被安装。webpack 通过调用 plugin 的 `apply` 方法来安装它，传入一个指向 webpack `compiler` 对象的引用。你可以调用 `compiler.plugin` 来访问 asset 的编译(compilation)和它们各自的构建步骤。例如：

__my-plugin.js__

``` js
function MyPlugin(options) {
  // 使用 options 配置你的 plugin
}

MyPlugin.prototype.apply = function(compiler) {
  compiler.plugin("compile", function(params) {
    console.log("编译器开始编译(compile)……");
  });

  compiler.plugin("compilation", function(compilation) {
    console.log("编译器开始一个新的编译过程(compilation)……");

    compilation.plugin("optimize", function() {
      console.log("编译过程(compilation)开始优化文件...");
    });
  });

  compiler.plugin("emit", function(compilation, callback) {
    console.log("编译过程(compilation)准备开始输出文件……");
    callback();
  });
};

module.exports = MyPlugin;
```

__webpack.config.js__

``` js
plugins: [
  new MyPlugin({
    options: 'nada'
  })
]
```


## Tapable 和 Tapable 实例

plugin 架构之所以在多数情况下适用于 webpack 是由于一个名为 Tapable 的内部库。
在 webpack 源代码中，**Tapable 实例**是一些由 `Tapable` 类继承或混入而来的类。

对于 plugin 作者来说，知道 webpack 源码中哪些是 `Tapable` 实例是很重要的。这些实例提供了各种可以附加自定义插件的事件挂钩。
因此，贯穿本章的是，一个列出了 webpack 中所有 `Tapable` 实例（和它们的事件钩子）的列表，plugin 的作者可以使用它们。

获取更多 `Tapable` 的信息，可以访问 [完整概述](/api/tapable) 或 [tapable 仓库](https://github.com/webpack/tapable)。

***

> 原文：https://webpack.js.org/api/plugins/
