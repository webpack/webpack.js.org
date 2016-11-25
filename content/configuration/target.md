---
title: 目标
sort: 11
contributors:
  - juangl
  - sokra
  - skipjack
  - SpaceK33z
  - viko16
---

webpack can compile to multiple environments. We call this _targets_. This page shows what targets are supported. [The concept page](/concepts/targets) explains in greater detail what a target is.

## `target`

`string`

告诉 webpack 这个程序的目标环境是什么。支持以下值：

* `"async-node"` 编译为类 Node.js 环境可用（使用 fs 和 vm 加载异步分块）
* `"electron"` 编译为 [Electron](http://electron.atom.io/) 渲染进程，使用 `JsonpTemplatePlugin`, `FunctionModulePlugin` 来为浏览器环境提供目标，使用 `NodeTargetPlugin` 和 `ExternalsPlugin` 为 CommonJs 和 Electron 内置模块提供目标。
* `"electron-renderer"` - 为 [Electron](http://electron.atom.io/) 的`渲染进程`编译。
* `"node"` 编译为类 Node.js 环境可用（使用 Node.js `require` 加载分块）
* `"node-webkit"` 编译为 Webkit 可用，并且使用 jsonp 去加载分块。支持 Node.js 内置模块和 [`nw.gui`](http://docs.nwjs.io/en/latest/) 导入（实验性质）
* `"web"` 编译为类浏览器环境里可用（默认）
* `"webworker"` 编译成一个 WebWorker

例如，当你的使用 _target_ 是 `"electron"`，*webpack* 包含多个 Electron 特定的变量。有关使用哪些模板和 _externals_ 的更多信息，您可以[直接参考 webpack 源码](https://github.com/webpack/webpack/blob/master/lib/WebpackOptionsApply.js#L70-L185)。

目标选项的默认值为：

```js
target: "web"
```

***

> 原文：https://webpack.js.org/configuration/target/