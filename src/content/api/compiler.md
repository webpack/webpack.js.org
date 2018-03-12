---
title: Compiler
group: Plugins
sort: 2
contributors:
  - rishantagarwal
---

webpack 的 `Compiler` 模块是主引擎，它通过 webpack CLI 或 `webpack` API 或 webpack 配置文件传递的所有选项，创建出一个 compilation 实例。

它通过 `webpack` API 下 `webpack.Compiler` 的导出。

webpack 使用它来实例化 compiler，然后调用 `run` 方法。下面是一个可以使用 `Compiler` 简单示例。事实上，这与 webpack 自身是如何调用它非常接近。

[__compiler-example__](https://github.com/pksjce/webpack-internal-examples/tree/master/compiler-example)

```javascript
// 可以从 webpack package 中 import 导入
import {Compiler} from 'webpack';

// 创建一个新的 compiler 实例
const compiler = new Compiler();

// 填充所有必备的 options 选项
compiler.options = {...};

// 创建一个插件
class LogPlugin {
  apply (compiler) {
    compiler.plugin('should-emit', compilation => {
      console.log('should I emit?');
      return true;
    })
  }
}

// 将 compiler 应用到插件中
new LogPlugin().apply(compiler);

/* 添加其他支持插件 */

// 运行结束后执行回调
const callback = (err, stats) => {
  console.log('Compiler 已经完成执行。');
  // 显示 stats……
};

// compiler 的 run 调用，并传入 callback
compiler.run(callback);
```

`Compiler` 也是我们所说的 `Tapable` 实例。通过这种实现机制，我们可以理解为，它混合(mix)了 `Tapable` 类，来使实例也具备注册和调用插件功能。大多数面向用户的插件，要首先在 `Compiler` 上注册。Compiler 运行机制可以被提取为以下要点

- 通常有一个 Compiler 的主实例。可以创建子 compilers 来委托特定任务。
- 创建 compiler 的多数复杂度，在于为它填充所有相关的 options 选项。
- `webpack` 通过 [`WebpackOptionsDefaulter`](https://github.com/webpack/webpack/blob/master/lib/WebpackOptionsDefaulter.js) 和 [`WebpackOptionsApply`](https://github.com/webpack/webpack/blob/master/lib/WebpackOptionsApply.js)，来专门为 `Compiler` 提供所需的所有初始数据。
- `Compiler` 是一个执行最简功能，来保证生命周期运行的函数。它把所有的加载(loading)/打包(bundling)/写入(writing)工作委托给各种插件。
- `new LogPlugin(args).apply(compiler)` 将插件注册到 `Compiler` 生命周期中的任何特定钩子事件。
- `Compiler` 暴露 `run` 方法，它启动了 `webpack` 所有编译工作。在执行完成后，会调用传递给它的 `callback` 函数。记录 stats 和 errors 的所有末端工作，都在此回调函数中完成。


## 监听文件变化并重新编译(watching)

`Compiler` 支持“观察模式(watch mode)”，可以监控文件系统并在文件更改时重新编译。在观察模式下，compiler 将触发额外的 ["watch-run", "watch-close" 和 "invalid"](#事件钩子) 事件。这通常用于[开发环境](/guides/development)中，并且一般在 `webpack-dev-server` 等工具的底层触发，以使开发人员无须每次手动重新编译。

关于观察模式的更多细节，请查看 [Node.js API 文档](/api/node/#watching) 或 [CLI 的 watch 选项](/api/cli/#watch-options)。


## MultiCompiler

MultiCompiler 模块允许 webpack 在单个 compiler 中运行多个配置。
如果 webpack 的 NodeJS API 中的 `options` 参数，是一个由 options 构成的数组，则 webpack 会对其应用单个 compiler，并在所有 compiler 执行结束时，调用 `callback` 方法。

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


## 事件钩子

一个参考指南，列出 `Compiler` 暴露的所有事件钩子。

事件名称                    | 内容说明                                  | 参数                    | 类型
----------------------------- | --------------------------------------- | ------------------------- | ----------
__`entry-option`__            | -                                       | -                         | bailResult
__`after-plugins`__           | 设置完一组初始化插件之后 | `compiler`                | sync
__`after-resolvers`__         | 设置完 resolvers 之后          | `compiler`                | sync
__`environment`__             | -                                       | -                         | sync
__`after-environment`__       | 环境设置完成              | -                         | sync
__`before-run`__              | `compiler.run()` 开始                 | `compiler`                | async
__`run`__                     | 在读取记录之前                  | `compiler`                | async
__`watch-run`__               | 在开始编译之前，watch 之后 | `compiler`                | async
__`normal-module-factory`__   | 创建出一个 `NormalModuleFactory` 之后  | `normalModuleFactory`     | sync
__`context-module-factory`__  | 创建出一个 `ContextModuleFactory` 之后 | `contextModuleFactory`    | sync
__`before-compile`__          | compilation 的参数已创建          | `compilationParams`       | async
__`compile`__                 | 在创建新 compilation 之前         | `compilationParams`       | sync
__`this-compilation`__        | 在触发 `compilation` 事件之前     | `compilation`             | sync
__`compilation`__             | compilation 创建完成          | `compilation`             | sync
__`make`__                    | -                                       | `compilation`             | parallel
__`after-compile`__           | -                                       | `compilation`             | async
__`should-emit`__             | 此时可以返回 true/false     | `compilation`             | bailResult
__`need-additional-pass`__    | -                                       | -                         | bailResult
__`emit`__                    | 在生成资源并输出到目录之前    | `compilation`             | async
__`after-emit`__              | 在生成资源并输出到目录之后    | `compilation`             | async
__`done`__                    | 完成编译                   | `stats`                   | sync
__`failed`__                  | Failure of compile                      | `error`                   | sync
__`invalid`__                 | 在无效的 watch 编译之后      | `fileName`, `changeTime`  | sync
__`watch-close`__             | 在停止 watch 编译之后          | -                         | sync


## 用法

下面是一个异步的 `emit` 事件处理函数的示例：

```javascript
compiler.plugin("emit", function(compilation, callback) {
  // 执行一些异步……
  setTimeout(function() {
    console.log("异步运行完成……");
    callback();
  }, 1000);
});
```

***

> 原文：https://webpack.js.org/api/compiler/
