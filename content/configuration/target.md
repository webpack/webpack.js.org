---
title: 构建目标(Targets)
sort: 11
contributors:
  - juangl
  - sokra
  - skipjack
  - SpaceK33z
  - pastelsky
---

webpack can compile for multiple environments or _targets_. To understand what a target is in detail, read [the concepts](/concepts/targets).

## `target`

`string`

告诉 webpack 这个程序的目标环境是什么。支持以下值：

| `target`      | 描述            |
| ------------- |------------------------|
| `async-node`| 编译为类 Node.js 环境可用（使用 fs 和 vm 异步加载分块）    |
| `electron`      | 编译为 [Electron](http://electron.atom.io/) 渲染进程，使用 `JsonpTemplatePlugin`, `FunctionModulePlugin` 来为浏览器环境提供目标，使用 `NodeTargetPlugin` 和 `ExternalsPlugin` 为 CommonJS 和 Electron 内置模块提供目标。 |
| `electron-renderer` | 为 [Electron](http://electron.atom.io/) 的 `renderer-process` 编译。  |
| `"node"` | 编译为类 Node.js 环境可用（使用 Node.js `require` 加载分块） |
|`node-webkit`|  编译为 Webkit 可用，并且使用 jsonp 去加载分块。支持 Node.js 内置模块和 [`nw.gui`](http://docs.nwjs.io/en/latest/) 导入（实验性质） |
|`web`| 编译为类浏览器环境里可用**（默认）** |
|`webworker`| 编译成一个 WebWorker |

例如，当 _target_ 设置为 `"electron"`，*webpack* 引入多个 electron 特定的变量。有关使用哪些模板和 externals 的更多信息，你可以[直接参考 webpack 源码](https://github.com/webpack/webpack/blob/master/lib/WebpackOptionsApply.js#L70-L185)。

***

> 原文：https://webpack.js.org/configuration/target/