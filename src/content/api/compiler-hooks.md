---
title: Compiler 钩子
group: Plugins
sort: 1
contributors:
  - rishantagarwal
---

`Compiler` 模块是 webpack 的支柱引擎，它通过 [CLI](/api/cli) 或 [Node API](/api/node) 传递的所有选项，创建出一个 compilation 实例。它扩展(extend)自 `Tapable` 类，以便注册和调用插件。大多数面向用户的插件首，会先在 `Compiler` 上注册。

T> 此模块会暴露在 `webpack.Compiler`，可以直接通过这种方式使用。关于更多信息，请查看[这个示例](https://github.com/pksjce/webpack-internal-examples/tree/master/compiler-example)。


## 监听(watching)

`Compiler` 支持可以监控文件系统的[监听(watching)](/api/node/#watching)机制，并且在文件修改时重新编译。当处于监听模式(watch mode)时，compiler 会触发诸如 `watchRun`, `watchClose` 和 `invalid` 等额外的事件。通常用于[开发环境](/guides/development)中使用，也常常会在 `webpack-dev-server` 这些工具的底层之下调用，由此开发人员无须每次都使用手动方式重新编译。还可以通过 [CLI](/api/cli/#watch-options) 进入监听模式。


## 相关钩子

以下生命周期钩子函数，是由 `compiler` 暴露，可以通过如下方式访问：

``` js
compiler.hooks.someHook.tap(...)
```

取决于不同的钩子类型，也可以在某些钩子上访问 `tapAsync` 和 `tapPromise`。


### `entryOption`

`SyncBailHook`

在 `entry` 配置项处理过之后，执行插件。


### `afterPlugins`

`SyncHook`

设置完初始插件之后，执行插件。

参数：`compiler`


### `afterResolvers`

`SyncHook`

resolver 安装完成之后，执行插件。

参数：`compiler`


### `environment`

`SyncHook`

environment 准备好之后，执行插件。


### `afterEnvironment`

`SyncHook`

environment 安装完成之后，执行插件。


### `beforeRun`

`AsyncSeriesHook`

`compiler.run()` 执行之前，添加一个钩子。

参数：`compiler`


### `run`

`AsyncSeriesHook`

开始读取 records 之前，钩入(hook into) compiler。

参数：`compiler`


### `watchRun`

`AsyncSeriesHook`

监听模式下，一个新的编译(compilation)触发之后，执行一个插件，但是是在实际编译开始之前。

参数：`compiler`


### `normalModuleFactory`

`SyncHook`

`NormalModuleFactory` 创建之后，执行插件。

参数：`normalModuleFactory`


### `contextModuleFactory`

`ContextModuleFactory` 创建之后，执行插件。

参数：`contextModuleFactory`


### `beforeCompile`

`AsyncSeriesHook`

编译(compilation)参数创建之后，执行插件。

参数：`compilationParams`


### `compile`

`SyncHook`

一个新的编译(compilation)创建之后，钩入(hook into) compiler。

参数：`compilationParams`


### `thisCompilation`

`SyncHook`

触发 `compilation` 事件之前执行（查看下面的 compilation）。

参数：`compilation`


### `compilation`

`SyncHook`

编译(compilation)创建之后，执行插件。

参数：`compilation`


### `make`

`AsyncParallelHook`

...

参数：`compilation`


### `afterCompile`

`AsyncSeriesHook`

...

参数：`compilation`


### `shouldEmit`

`SyncBailHook`

此时返回 true/false。

参数：`compilation`


### `needAdditionalPass`

`SyncBailHook`

...


### `emit`

`AsyncSeriesHook`

生成资源到 output 目录之前。

参数：`compilation`


### `afterEmit`

`AsyncSeriesHook`

生成资源到 output 目录之后。

参数：`compilation`


### `done`

`SyncHook`

编译(compilation)完成。


参数：`stats`


### `failed`

`SyncHook`

编译(compilation)失败。

参数：`error`


### `invalid`

`SyncHook`

监听模式下，编译无效时。

参数：`fileName`, `changeTime`


### `watchClose`

`SyncHook`

监听模式停止。
