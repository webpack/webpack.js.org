---
title: 插件 API(Plugin API)
sort: 1
---

T> 关于编写插件的高度介绍，可以从阅读[如何编写插件](/development/how-to-write-a-plugin)开始。

webpack 以插件的形式提供了灵活强大的自定义 api 功能。使用插件，我们可以为 webpack 添加功能。另外，webpack 提供生命周期钩子以便注册插件。在每个生命周期点，webpack 会运行所有注册的插件,并提供当前webpack编译状态信息。

很多 webpack 中的对象都继承了 `Tapable` 类，暴露了一个 `plugin` 方法。插件可以使用 `plugin` 方法注入自定义的构建步骤。你可以看到 `compiler.plugin` 和 `compilation.plugin` 被频繁使用。基本上，每个插件的调用都在构建流程中绑定了回调来触发特定的步骤。

每个插件会在 webpack 启动时被安装一次，webpack 通过调用插件的 `apply` 方法来安装它们，并且传递一个 webpack `compiler` 对象的引用。然后你可以调用 `compiler.plugin` 来访问资源的编译和它们独立的构建步骤。下面就是一个示例：

```javascript
// MyPlugin.js

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

Then in `webpack.config.js`

```javascript
    plugins: [
        new MyPlugin({options: 'nada'})
    ]
```

## 插件接口(Plugin Interfaces)

插件接口有下面两种不同区别。

* 基于时间：
  * 同步（默认）：就像上面看到的，使用 return 。
  * 异步：最后的参数是一个回调。规范为：function(err, result)
  * 并行：处理函数（handlers）被并行地调用（异步地）。

* 返回值:
  * 没有委托（bailing）（默认）：没有返回值。
  * 委托：处理函数被按顺序地调用，直到某一个处理函数有返回任何值。
  * 并行委托：处理函数被并行地调用（异步地）。产生的第一个返回值（按顺序地）最后会被使用。
  * 瀑布流：每个处理函数取得并使用上一个处理函数的结果作为参数。

（译注：这里的*处理函数*指插件通过 `plugin` 方法注册的函数）

## Tapable & Tapable 实例

webpack 的插件架构主要依赖于内部库 `Tapable` 。
webpack 源代码中的一些 **Tapable 实例**都继承或混合了 `Tapable` 类。

对于插件作者来说,知道webpack源代码中有哪些 `Tapable` 实例是非常重要的。这些实例提供各种事件钩子,以便附加自定义插件。
因此,这章节会罗列除 webpack 中所有的 `Tapable` 实例（以及它们的事件钩子）,便于写插件的作者使用。

关于 `Tapable` 的更多内容可以访问 [tapable repository](https://github.com/webpack/tapable)，或访问 [complete overview](./tapable)

***

> 原文：https://webpack.js.org/api/plugins/
