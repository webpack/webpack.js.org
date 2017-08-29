---
title: NoEmitOnErrorsPlugin
contributors:
  - simon04
---

在编译出现错误时，使用 `NoEmitOnErrorsPlugin` 来跳过输出阶段。这样可以确保输出资源不会包含错误。对于所有资源，统计资料(stat)的 `emitted` 标识都是 `false`。

``` js
new webpack.NoEmitOnErrorsPlugin()
```

T> 此插件用于取代（现已弃用）webpack 1 的 `NoErrorsPlugin` 插件。

如果你在使用 [CLI](/api/cli/)，启用此插件后，webpack 进程遇到错误代码将不会退出。如果你希望 webpack 在使用 CLI 时出现 "fail" 提示，请查看 [`bail` 选项](/api/cli/#advanced-options)。

***

> 原文：https://webpack.js.org/plugins/no-emit-on-errors-plugin/