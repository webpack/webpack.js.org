---
title: 插件 API
sort: 1
---

webpack以插件的形式提供了灵活强大的自定义api功能。使用插件,我们可以为webpack添加功能。另外,webpack提供生命周期钩子以便插件注册。在每个生命周期点,webpack会运行所有注册的插件,并提供当前webpack编译状态信息。

## Tapable & Tapable 示例

webpack的插件架构主要依赖于内部库 `Tapable` 。
webpack源代码中的一些 **Tapable Instances** 类都继承或混合了 `Tapable` 类。

对于插件作者来说,知道webpack源代码中有哪些 `Tapable` 实例是非常重要的。这些实例提供各种事件钩子,以便附加自定义插件。
因此,这章节会罗列除webpack中所有的 `Tapable` 实例(以及它们的事件钩子),便于写插件的作者使用。
关于 `Tapable` 的更多内容可以访问[tapable repository](https://github.com/webpack/tapable),或访问[complete overview](./tapable)

## 创建一个插件
一个 `webpack` 插件包含以下内容

  - 一个命名的JavaScript函数
  - 在其原型上定义`apply`方法
  - 为它添加webpack的特定事件钩子
  - 处理webpack内部特定数据实例
  - 完成功能后调用webpack提供的回调函数

```javascript
// 一个命名的JavaScript函数。
function MyExampleWebpackPlugin() {

};

// 在其原型上定义`apply`方法
MyExampleWebpackPlugin.prototype.apply = function(compiler) {
  // 为它添加webpack的事件钩子
  compiler.plugin('webpacksEventHook', function(compilation /* 处理webpack内部特定数据实例。 */, callback) {
    console.log("This is an example plugin!!!");

    // 完成功能后调用webpack提供的回调函数
    callback();
  });
};
```

### 不同的插件类型
插件可以按照注册事件不同进行分类。每个事件钩子决定它是如何应用插件注册表。

- __同步__ Tapable实例应用插件使用

`applyPlugins(name: string, args: any...)`

`applyPluginsBailResult(name: string, args: any...)`

这意味着每个插件的回调函数将会被一个接一个的执行,伴随特定的 `args` 参数。
这是最简单的插件格式。很多有用的事件,比如 `"compile"`, `"this-compilation"` 都希望插件按同步方式执行

- __瀑布__ 应用插件的方法

`applyPluginsWaterfall(name: string, init: any, args: any...)`

这里的每一个插件都会被一个接一个按顺序的调用,其参数是上一个插件返回的值。因此这些插件必须要考虑执行顺序。
它必须接受上一个插件执行后返回的参数。第一个插件接受的参数是 `init` 。这种模式通常用于和 `webpack` 模板相关的Tapable实例,比如 `ModuleTemplate`, `ChunkTemplate` 等。

- __异步__ 当所有插件都使用异步的方法

`applyPluginsAsync(name: string, args: any..., callback: (err?: Error) -> void)`

插件的处理函数调用时伴随所有args参数和一个包含 `(err?: Error) -> void` 签名的回调函数。这些处理函数按照注册顺序被调用。当所有处理函数都执行后 `callback` 会被调用。
这种模式通常用于像 `"emit"`, `"run"` 这样的事件。

- __异步 瀑布__ 这些插件将以瀑布形式被异步使用

`applyPluginsAsyncWaterfall(name: string, init: any, callback: (err: Error, result: any) -> void)`

这个插件的处理函数被调用时伴随一个当前值和一个包含 `(err: Error, nextValue: any) -> void.` 的函数。其中 `nextValue` 指定是下一个处理函数的当前值。第一个处理函数的当前值是 `init` 。当所有处理函数都应用后会调用callback方法,伴随最后的得到的值。如果有一个处理函数返回 `err` 值,会直接调用callback方法,伴随这个err值,并且其它处理函数不会再被调用。
这种插件模式通常用于像 `"before-resolve"` 和 `"after-resolve"` 这样的事件。

- __异步 连续__ 这个和异步方式类似,但如果某个插件注册失败,其它插件不会再被调用。

`applyPluginsAsyncSeries(name: string, args: any..., callback: (err: Error, result: any) -> void)`

-__并行__ -

`applyPluginsParallel(name: string, args: any..., callback: (err?: Error) -> void)`

`applyPluginsParallelBailResult(name: string, args: any..., callback: (err: Error, result: any) -> void)`

***

> 原文：https://webpack.js.org/pluginsapi/