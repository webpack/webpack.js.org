---
title: 编译器(Compiler)
sort: 2
contributors:
  - rishantagarwal
---

webpack 的 `Compiler` 模块是创建一个传入 webpack CLI、 `webpack` api 或 webpack 配置文件等选项的编译实例的主引擎。

它是由 `webpack` api 的 `webpack.Compiler` 下导出。

webpack 通过实例化 compiler，再调用它的 `run` 方法来使用它，下面是一个关于如何使用 `Compiler` 的简单例子。事实上， 这和 webpack 本身如何使用 compiler 已经很接近了。

[__compiler-example__](https://github.com/pksjce/webpack-internal-examples/tree/master/compiler-example)

```javascript
// 可以从webpack包中导入
import {Compiler} from 'webpack';

// 创建一个新的编译实例
const compiler = new Compiler();

// 添加所有需要的选项
compiler.options = {...};

// 创建一个插件
class LogPlugin {
  apply (compiler) {
    compiler.plugin('should-emit', compilation => {
      console.log('should i emit?');
      return true;
    })
  }
}

//将编译器应用于插件
new LogPlugin().apply(compiler);

/* 添加其他辅助的插件 */

// 结束run后，执行回调函数
const callback = (err, stats) => {
  console.log('Compiler has finished execution.');
  // 显示统计信息……
};

// 调用compiler的run方法，传入回调函数
compiler.run(callback);
```

这个 `Compiler` 就是我们所说的 `Tapable` 实例。这里，我们的意思是它混合了 `Tapable` 类以吸收其功能来注册和调用自身的插件。大多数面向用户的插件，都是首先在 `Compiler` 上注册的。Compiler 的作用可以浓缩为以下几个亮点：

- 通常有一个 Compiler 的主实例。可以创建子 compiler 来委派特定任务。
- 创建一个 compiler 的复杂性很大程度来自于为其填充各种相关的选项。
 - `webpack` 具有 [`WebpackOptionsDefaulter`](https://github.com/webpack/webpack/blob/master/lib/WebpackOptionsDefaulter.js) 和 [`WebpackOptionsApply`](https://github.com/webpack/webpack/blob/master/lib/WebpackOptionsApply.js) specifically designed to provide the `Compiler` with all the initial data it requires.
- `Compiler` 根本上是一个执行最基本的功能以保持生命周期运行的函数。它将所有加载/打包/写入(loading/bundling/writing)工作委派给各种插件。
- `new LogPlugin(args).apply(compiler)` 将插件注册到 `Compiler` 的生命周期中任何一个特定的挂钩事件。
- `Compiler` 暴露了一个 `run` 方法，它启动 `webpack` 的所有编译工作。当执行完时，它会执行传入的 `回调` 函数，日志记录、统计和错误处理等收尾工作都是在这个回调函数中完成。


## 监视(Watching)

`Compiler` 支持两种类型的执行风格， 一个是监视模式（watch mode）一个是普通的单次运行（normal single run）。虽然在监视的过程中，它本质上执行了相同的功能，但是它还对生命周期事件做了一些补充。这使得 `webpack` 能够具有监视模式的特殊插件。


## MultiCompiler

MultiCompiler 模块，允许webpack在单独的 compiler 中运行多个配置。如果 webpack 的 NodeJS api 的 `options` 参数是一个数组选项，webpack 将应用多个单独的 compiler，并且在每个 compiler 执行结束时调用 `回调` 函数。

```javascript
var webpack = require('webpack');

var config1 = {
  entry: './index1.js',
  output: {filename: 'bundle1.js'}
}
var config2 = {
  entry: './index2.js',
  output: {filename:'bundle2.js'}
}

webpack([config1, config2], (err, stats) => {
  process.stdout.write(stats.toString() + "\n");
})
```


## 事件钩子函数

这是 `Compiler` 暴露的所有事件钩子的参考指南

事件名称                    | 原因                                  | 参数                    | 类型
----------------------------- | --------------------------------------- | ------------------------- | ----------
__`entry-option`__            | -                                       | -                         | bailResult
__`after-plugins`__           | 设置插件的初始配置后 | `compiler`                | 同步
__`after-resolvers`__         | 设置解析器后          | `compiler`                | 同步
__`environment`__             | -                                       | -                         | 同步
__`after-environment`__       | 环境配置完成              | -                         | 同步
__`before-run`__              | `compiler.run()` 开始                 | `compiler`                | 异步
__`run`__                     | 读取记录之前                  | `compiler`                | 异步
__`watch-run`__               | 监视后开始编译之前 | `compiler`                | 异步
__`normal-module-factory`__   | 创建 `NormalModuleFactory` 后  | `normalModuleFactory`     | 同步
__`context-module-factory`__  | 创建 `ContextModuleFactory` 后 | `contextModuleFactory`    | 同步
__`before-compile`__          | 编译参数创建完成          | `compilationParams`       | 异步
__`compile`__                 | 创建新编译之前         | `compilationParams`       | 同步
__`this-compilation`__        | 发送 `compilation` 事件之前     | `compilation`             | 同步
__`compilation`__             | 编译创建完成          | `compilation`             | 同步
__`make`__                    | -                                       | `compilation`             | 并行
__`after-compile`__           | -                                       | `compilation`             | 异步
__`should-emit`__             | 此时可以返回 true/false     | `compilation`             | bailResult
__`need-additional-pass`__    | -                                       | -                         | bailResult
__`emit`__                    | 在发送资源到输出目录之前    | `compilation`             | 异步
__`after-emit`__              | 在发送资源到输出目录之后     | `compilation`             | 异步
__`done`__                    | 完成编译                   | `stats`                   | 同步
__`failed`__                  | 编译失败                      | `error`                   | 同步
__`invalid`__                 | 一个监控的编译变无效后      | `fileName`, `changeTime`  | 同步


## 用法

这是关于异步的 `emit` 事件处理函数的一个示例：

```javascript
compiler.plugin("emit", function(compilation, callback) {
  // 执行一些异步……
  setTimeout(function() {
    console.log("Done with async work...");
    callback();
  }, 1000);
});
```

***

> 原文：https://webpack.js.org/api/plugins/compiler/
