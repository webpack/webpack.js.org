---
title: 编写一个插件
sort: 3
---

插件向第三方开发者提供了 webpack 引擎中完整的能力。使用阶段式的构建回调，开发者可以引入它们自己的行为到 webpack 构建流程中。创建插件比创建 loader 更加高级，因为你将需要理解一些 webpack 底层的内部特性来做相应的勾子，所以做好阅读一些源码的准备！

## 创建插件

`webpack`插件的组成：

- 一个JavaScript命名函数。
- 在它的原型上定义一个`apply`方法。
- 指定挂载的webpack事件钩子。
- 处理webpack内部实例的特定数据。
- 功能完成后调用webpack提供的回调。

```javascript
// 命名函数
function MyExampleWebpackPlugin() {

};

// 在它的 prototype 上定义一个 `apply` 方法。
MyExampleWebpackPlugin.prototype.apply = function(compiler) {
  // 指定挂载的webpack事件钩子。
  compiler.plugin('webpacksEventHook', function(compilation /* 处理webpack内部实例的特定数据。*/, callback) {
    console.log("This is an example plugin!!!");

    // 功能完成后调用webpack提供的回调。
    callback();
  });
};
```

## 编译器(Compiler)和编译(Compilation)

在插件开发中最重要的两个资源就是 `compiler` 和 `compilation` 对象。理解它们的角色是扩展 webpack 引擎重要的第一步。

- `compiler` 对象代表了完整的 webpack 环境配置。这个对象在启动 webpack 时被一次性建立，并在所有可操作的设置中被配置，包括原始配置，loader 和插件。当在 webpack 环境中应用一个插件时，插件将收到一个编译器对象的引用。可以使用它来访问 webpack 的主环境。

- `compilation` 对象代表了一次单一的版本构建和生成资源。当运行 webpack 开发环境中间件时，每当检测到一个文件变化，一次新的编译将被创建，从而生成一组新的编译资源。一个编译对象表现了当前的模块资源、编译生成资源、变化的文件、以及被跟踪依赖的状态信息。编译对象也提供了很多关键点回调供插件做自定义处理时选择使用。

这两个成员是任何 webpack 插件不可或缺的部分（特别是 `compilation`），如果开发者阅读它们的源码并进行熟悉，将获益匪浅：

- [Compiler Source](https://github.com/webpack/webpack/blob/master/lib/Compiler.js)
- [Compilation Source](https://github.com/webpack/webpack/blob/master/lib/Compilation.js)

## 基本插件架构


插件都是被实例化的带有 `apply` 原型方法的对象。这个 `apply` 方法在安装插件时将被 webpack 编译器调用一次。`apply` 方法提供了一个对应的编译器对象的引用，从而可以访问到相关的编译器回调。一个简单的插件结构如下：

```javascript
function HelloWorldPlugin(options) {
  // 使用配置（options）设置插件实例
}

HelloWorldPlugin.prototype.apply = function(compiler) {
  compiler.plugin('done', function() {
    console.log('Hello World!');
  });
};

module.exports = HelloWorldPlugin;
```

然后要安装这个插件，只需要在你的 webpack 配置的 `plugin` 数组中加入一个实例：

```javascript
var HelloWorldPlugin = require('hello-world');

var webpackConfig = {
  // ... 这里是其他配置 ...
  plugins: [
    new HelloWorldPlugin({options: true})
  ]
};
```

## 访问编译

使用编译器对象时，你可以绑定提供了编译对象引用的回调拿到每次新的编译对象。这些编译对象提供了构建流程中很多步骤的回调来做勾子。

```javascript
function HelloCompilationPlugin(options) {}

HelloCompilationPlugin.prototype.apply = function(compiler) {

  // 设置回调来访问编译对象：
  compiler.plugin("compilation", function(compilation) {

    // 现在设置回调来访问编译中的步骤：
    compilation.plugin("optimize", function() {
      console.log("Assets are being optimized.");
    });
  });
};

module.exports = HelloCompilationPlugin;
```

关于 `compiler` 和 `compilation` 的更多可用的回调和信息，以及其它重要的对象，请参考 [插件](/api/plugins/) 文档。

## 异步编译插件

有一些编译插件中的步骤是异步的，这样要传递一个回调函数，并且在插件运行结束时回调_必须_被调用。

```javascript
function HelloAsyncPlugin(options) {}

HelloAsyncPlugin.prototype.apply = function(compiler) {
  compiler.plugin("emit", function(compilation, callback) {

    // 做一些异步处理……
    setTimeout(function() {
      console.log("Done with async work...");
      callback();
    }, 1000);

  });
};

module.exports = HelloAsyncPlugin;
```

## 示例

一旦能我们深入理解 webpack 编译器和每个独立的编译，我们依赖 webpack 引擎将有无限多的事可以做。我们可以重新格式化已有的文件，创建衍生的文件，或者制作全新的生成文件。

让我们来写一个简单的示例插件，生成一个叫做 `filelist.md` 的新文件；文件内容是所有构建生成的文件的列表。这个插件大概像下面这样：

```javascript
function FileListPlugin(options) {}

FileListPlugin.prototype.apply = function(compiler) {
  compiler.plugin('emit', function(compilation, callback) {
    // 创建一个头部字符串：
    var filelist = 'In this build:\n\n';

    // 检查所有编译好的资源文件：
    // 为每个文件名新增一行
    for (var filename in compilation.assets) {
      filelist += ('- '+ filename +'\n');
    }

    // 把它作为一个新的文件资源插入到 webpack 构建中：
    compilation.assets['filelist.md'] = {
      source: function() {
        return filelist;
      },
      size: function() {
        return filelist.length;
      }
    };

    callback();
  });
};

module.exports = FileListPlugin;
```

## 不同类型的插件

webpack插件可以按照它所注册的事件分成不同的类型。每一个事件钩子决定了如何使用注册的插件。

- __同步__ The Tapable instance applies plugins using

`applyPlugins(name: string, args: any...)`

`applyPluginsBailResult(name: string, args: any...)`

This means that each of the plugin callbacks will be invoked one after the other with the specific `args`.
This is the simplest format for a plugin. Many useful events like `"compile"`, `"this-compilation"` expect plugins to have synchronous execution.

- __waterfall__ Plugins applied using

`applyPluginsWaterfall(name: string, init: any, args: any...)`

Here each of the plugins are called one after the other with the args from the return value of the previous plugin. The plugin must take the order of its execution into account.
It must accept arguments from the previous plugin that was executed. The value for the first plugin is `init`. This pattern is used in the Tapable instances which are related to the `webpack` templates like `ModuleTemplate`, `ChunkTemplate` etc.

- __asynchronous__ When all the plugins are applied asynchronously using

`applyPluginsAsync(name: string, args: any..., callback: (err?: Error) -> void)`

The plugin handler functions are called with all args and a callback function with the signature `(err?: Error) -> void`. The handler functions are called in order of registration.`callback` is called after all the handlers are called.
This is also a commonly used pattern for events like `"emit"`, `"run"`.

- __async waterfall__ The plugins will be applied asynchronously in the waterfall manner.

`applyPluginsAsyncWaterfall(name: string, init: any, callback: (err: Error, result: any) -> void)`

The plugin handler functions are called with the current value and a callback function with the signature `(err: Error, nextValue: any) -> void.` When called `nextValue` is the current value for the next handler. The current value for the first handler is `init`. After all handlers are applied, callback is called with the last value. If any handler passes a value for `err`, the callback is called with this error and no more handlers are called.
This plugin pattern is expected for events like `"before-resolve"` and `"after-resolve"`.

- __async series__ It is the same as asynchronous but if any of the plugins registered fails, then no more plugins are called.

`applyPluginsAsyncSeries(name: string, args: any..., callback: (err: Error, result: any) -> void)`

-__parallel__ -

`applyPluginsParallel(name: string, args: any..., callback: (err?: Error) -> void)`

`applyPluginsParallelBailResult(name: string, args: any..., callback: (err: Error, result: any) -> void)`

***

> 原文：https://webpack.js.org/development/how-to-write-a-plugin/
