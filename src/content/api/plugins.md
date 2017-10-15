---
title: 插件 API(Plugin API)
group: Plugins
sort: 0
---

T> 关于编写插件的高度介绍，可以从阅读[编写一个插件](/contribute/writing-a-plugin)开始。

很多 webpack 中的对象都继承了 `Tapable` 类，暴露了一个 `plugin` 方法。插件可以使用 `plugin` 方法注入自定义的构建步骤。你可以看到 `compiler.plugin` 和 `compilation.plugin` 被频繁使用。基本上，每个插件的调用都在构建流程中绑定了回调来触发特定的步骤。

这里有两种类型的插件接口(plugin interfaces)……

__基于时间__

- 同步（默认）：该插件同步运行，并且返回其输出。
- 异步：该插件同步运行，并使用给定的 `callback` 返回其输出。
- 并行：处理函数(handlers)被并行地调用

  * 没有委托（bailing）（默认）：没有返回值。
  * 委托：
  *
  *

（译注：这里的*处理函数*指插件通过 `plugin` 方法注册的函数）

__返回值__

- 没有委托(not bailing)（默认）：没有返回值。
- 委托(bailing)：处理函数被按顺序地调用，直到某一个处理函数有返回任何值。
- 并行委托(parallel bailing)：处理函数被并行地调用（异步地）。产生的第一个返回值（按顺序地）最后会被使用。
- 瀑布流(waterfall)：每个处理函数取得并使用上一个处理函数的结果作为参数。

每个插件会在 webpack 启动时被安装一次，webpack 通过调用插件的 `apply` 方法来安装它们，并且传递一个 webpack `compiler` 对象的引用。然后你可以调用 `compiler.plugin` 来访问资源的编译和它们独立的构建步骤。下面就是一个示例：

__my-plugin.js__

``` js
function MyPlugin(options) {
  // Configure your plugin with options...
}

MyPlugin.prototype.apply = function(compiler) {
  compiler.plugin("compile", function(params) {
    console.log("The compiler is starting to compile...");
  });

  compiler.plugin("compilation", function(compilation) {
    console.log("The compiler is starting a new compilation...");

    compilation.plugin("optimize", function() {
      console.log("The compilation is starting to optimize files...");
    });
  });

  compiler.plugin("emit", function(compilation, callback) {
    console.log("The compilation is going to emit files...");
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


## Tapable & Tapable 实例

webpack 的插件架构主要依赖于内部库 `Tapable` 。
webpack 源代码中的一些 **Tapable 实例**都继承或混合了 `Tapable` 类。

对于插件作者来说,知道webpack源代码中有哪些 `Tapable` 实例是非常重要的。这些实例提供各种事件钩子,以便附加自定义插件。
因此,这章节会罗列除 webpack 中所有的 `Tapable` 实例（以及它们的事件钩子）,便于写插件的作者使用。

关于 `Tapable` 的更多内容可以访问 [完整概述](/api/tapable)，或访问 [tapable 仓库](https://github.com/webpack/tapable)

***

> 原文：https://webpack.js.org/api/plugins/
