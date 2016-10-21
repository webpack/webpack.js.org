---
title: 目标
contributors:
  - sokra
  - skipjack
  - viko16
---

?> Compare with [the concept page](/concepts/targets) and determine what goes where.

## `target`

`string`

告诉 webpack 这个程序的目标环境是什么。支持以下选项：

`target: "node"` - 编译给 [NodeJS](https://nodejs.org/en/)， 使用 `require` 去加载模块

`target: "node-webkit"` - 编译给 [Webkit](https://webkit.org/)， 使用 [JSONP](https://sacha.me/articles/jsonp-demystified/) 去加载模块

`target: "web"` - 编译到能在浏览器里使用

`target: "webworker"` - 编译成一个 [WebWorker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)


T> 允许引入 node 内置模块和 [`nw.gui`](http://docs.nwjs.io/en/latest/) （实验性的）

`target: "async-node"` - 使用 `fs` and `vm` 异步加载包

`target: "electron"` - 编译给 [Electron](http://electron.atom.io/)

T> 允许引入 Electron 特有的模块

默认值：

```js
target: "web"
```
