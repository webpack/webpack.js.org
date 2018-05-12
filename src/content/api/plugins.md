---
title: Plugin API
group: Plugins
sort: 0
contributors:
  - thelarkinn
  - pksjce
  - e-cloud
---

插件是 webpack 生态系统的重要组成部分，为社区用户提供了一种强大方式来直接触及 webpack 的编译过程(compilation process)。插件能够 [钩入(hook)](/api/compiler-hooks/#hooks) 到在每个编译(compilation)中触发的所有关键事件。在编译的每一步，插件都具备完全访问 `compiler` 对象的能力，如果情况合适，还可以访问当前 `compilation` 对象。

T> 对于编写插件的高度概括，请从[编写一个插件](/contribute/writing-a-plugin)开始。

我们首先回顾 `tapable` 工具，它提供了 webpack 插件接口的支柱。


## Tapable

tapable 这个小型 library 是 webpack 的一个核心工具，但也可用于其他地方，以提供类似的插件接口。webpack 中许多对象扩展自 `Tapable` 类。这个类暴露 `tap`, `tapAsync` 和 `tapPromise` 方法，可以使用这些方法，注入自定义的构建步骤，这些步骤将在整个编译过程中不同时机触发。

请查看 [文档](https://github.com/webpack/tapable) 了解更多信息。理解三种 `tap` 方法以及提供这些方法的钩子至关重要。要注意到，扩展自 `Tapable` 的对象（例如 compiler 对象）、它们提供的钩子和每个钩子的类型（例如 `SyncHook`）。


## 插件类型(plugin types)

根据所使用的 钩子(hook) 和 `tap` 方法，插件可以以多种不同的方式运行。这个工作方式与 `Tapable` 提供的 [hooks](https://github.com/webpack/tapable#tapable) 密切相关。[compiler hooks](/api/compiler-hooks/#hooks) 分别记录了 `Tapable` 内在的钩子，指出哪些 `tap` 方法可用。

因此，根据你触发到 `tap` 事件，插件可能会以不同的方式运行。例如，当钩入 `compile` 阶段时，只能使用同步的 `tap` 方法：

``` js
compiler.hooks.compile.tap('MyPlugin', params => {
  console.log('以同步方式触及 compile 钩子。')
})
```

然而，对于能够使用了 `AsyncHook(异步钩子)` 的 `run`，我们可以使用 `tapAsync` 或 `tapPromise`（以及 `tap`）：

``` js
compiler.hooks.run.tapAsync('MyPlugin', (compiler, callback) => {
  console.log('以异步方式触及 run 钩子。')
  callback()
})

compiler.hooks.run.tapPromise('MyPlugin', compiler => {
  return new Promise(resolve => setTimeout(resolve, 1000)).then(() => {
    console.log('以具有延迟的异步方式触及 run 钩子')
  })
})
```

这些需求(story)的含义在于，可以有多种方式将 `hook` 钩入到 `compiler` 中，可以让各种插件都以合适的方式去运行。


## 自定义的钩子函数(custom hooks)

为了给其他插件的编译添加一个新的钩子，来 `tap(触及)` 到这些插件的内部，直接从 `tapable` 中 `require` 所需的钩子类(hook class)，然后创建：

``` js
const SyncHook = require('tapable').SyncHook;

// 具有 `apply` 方法……
if (compiler.hooks.myCustomHook) throw new Error('Already in use');
compiler.hooks.myCustomHook = new SyncHook(['a', 'b', 'c'])

// 在你想要触发钩子的位置/时机下调用……
compiler.hooks.myCustomHook.call(a, b, c);
```

再次声明，查看 `tapable` [文档](/api/tapable/) 来，了解更多不同的钩子类(hook class)，以及它们是如何工作的。


## 下一步

查看 [compiler hooks](/api/compiler-hooks/) 部分，了解所有可用的 `compiler` 钩子和其所需的参数的详细列表。
