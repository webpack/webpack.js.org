---
title: Node
sort: 14
contributors:
  - sokra
  - skipjack
  - oneforwonder
  - Rob--W
---

这些选项可以配置是否 polyfill 或 mock 某些 [Node.js 全局变量](https://nodejs.org/docs/latest/api/globals.html)和模块。这可以使最初为 Node.js 环境编写的代码，在其他环境（如浏览器）中运行。

此功能由 webpack 内部的 [`NodeStuffPlugin`](https://github.com/webpack/webpack/blob/master/lib/NodeStuffPlugin.js) 插件提供。如果 target 是 "web"（默认）或 "webworker"，那么 [`NodeSourcePlugin`](https://github.com/webpack/webpack/blob/master/lib/node/NodeSourcePlugin.js) 插件也会被激活。


## `node`

`object`

是一个对象，其中每个属性都是 Node.js 全局变量或模块的名称，每个 value 是以下其中之一……

- `true`：提供 polyfill。
- `"mock"`：提供 mock 实现预期接口，但功能很少或没有。
- `"empty"`：提供空对象。
- `false`: 什么都不提供。预期获取此对象的代码，可能会因为获取不到此对象，触发 `ReferenceError` 而崩溃。尝试使用 `require('modulename')` 导入模块的代码，可能会触发 `Cannot find module "modulename"` 错误。

W> 注意，不是每个 Node 全局变量都支持所有选项。对于不支持的键值组合(property-value combination)，compiler 会抛出错误。更多细节请查看接下来的章节。

这里是默认值：

```js
node: {
  console: false,
  global: true,
  process: true,
  __filename: "mock",
  __dirname: "mock",
  Buffer: true,
  setImmediate: true

  // 更多选项，请查看“其他 Node.js 核心库”
}
```

从 webpack 3.0.0 开始，`node` 选项可能被设置为 `false`，以完全关闭 `NodeStuffPlugin` 和 `NodeSourcePlugin` 插件。


## `node.console`

`boolean | "mock"`

默认值：`false`

浏览器提供一个 `console` 对象，具有非常类似 Node.js `console` 的接口，所以通常不需要 polyfill。


## `node.process`

`boolean | "mock"`

默认值：`true`


## `node.global`

`boolean`

默认值：`true`

关于此对象的准确行为，请查看[源码](https://github.com/webpack/webpack/blob/master/buildin/global.js)。


## `node.__filename`

`boolean | "mock"`

默认值：`"mock"`

选项：

- `true`: **输入**文件的文件名，是相对于 [`context` 选项](https://webpack.js.org/configuration/entry-context/#context)。
- `false`: 常规的 Node.js `__filename` 行为。在 Node.js 环境中运行时，**输出**文件的文件名。
- `"mock"`: value 填充为 `"index.js"`.


## `node.__dirname`

`boolean | "mock"`

默认值：`"mock"`

选项：

- `true`: **输入**文件的目录名，是相对于 [`context` 选项](https://webpack.js.org/configuration/entry-context/#context)。
- `false`: 常规的 Node.js `__dirname` 行为。在 Node.js 环境中运行时，**输出**文件的目录名。
- `"mock"`: value 填充为 `"/"`。


## `node.Buffer`

`boolean | "mock"`

默认值：`true`


## `node.setImmediate`

`boolean | "mock" | "empty"`

默认值：`true`


## 其他 Node.js 核心库(Node.js core libraries)

`boolean | "mock" | "empty"`

W> 只有当 target 是未指定、"web" 或 "webworker" 这三种情况时，此选项才会被激活（通过 `NodeSourcePlugin`）。

当 `NodeSourcePlugin` 插件启用时，则会使用 [`node-libs-browser`](https://github.com/webpack/node-libs-browser) 来对 Node.js 核心库 polyfill。请查看 [Node.js 核心库及其 polyfills](https://github.com/webpack/node-libs-browser#readme) 列表。

默认情况下，如果有一个已知的 polyfill，webpack 会对每个 library 进行 polyfill，如果没有，则 webpack 不会执行任何操作。在后一种情况下，如果模块名称配置为 `false` 值，webpack 表现为不会执行任何操作。

T> 为了导入内置的模块，使用 [`__non_webpack_require__`](/api/module-variables/#__non_webpack_require__-webpack-specific-)，例如，使用 `__non_webpack_require__('modulename')` 而不是 `require('modulename')`。

示例：

```js
node: {
  dns: "mock",
  fs: "empty",
  path: true,
  url: false
}
```

***

> 原文：https://webpack.js.org/configuration/node/
