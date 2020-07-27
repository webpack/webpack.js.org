---
title: Node
sort: 17
contributors:
  - sokra
  - skipjack
  - oneforwonder
  - Rob--W
  - byzyk
  - EugeneHlushko
  - anikethsaha
---

这些选项可以配置是否 polyfill 或 mock 某些 [Node.js 全局变量](https://nodejs.org/docs/latest/api/globals.html)和模块。这可以使最初为 Node.js 环境编写的代码，在其他环境（如浏览器）中运行。

此功能由 webpack 内部的 [`NodeStuffPlugin`](https://github.com/webpack/webpack/blob/master/lib/NodeStuffPlugin.js) 插件提供。如果 target 是 "web"（默认）或 "webworker"，那么 [`NodeSourcePlugin`](https://github.com/webpack/webpack/blob/master/lib/node/NodeSourcePlugin.js) 插件也会被激活。


## `node` {#node}

`boolean = false` `object`

是一个对象，其中每个属性都是 Node.js 全局变量或模块的名称，每个 value 是以下其中之一……

- `true`：提供 polyfill。
- `"mock"`：提供 mock 实现预期接口，但功能很少或没有。
- `"empty"`：提供空对象。
- `false`: 什么都不提供。预期获取此对象的代码，可能会因为获取不到此对象，触发 `ReferenceError` 而崩溃。尝试使用 `require('modulename')` 导入模块的代码，可能会触发 `Cannot find module "modulename"` 错误。

W> 注意，不是每个 Node 全局变量都支持所有选项。对于不支持的键值组合(property-value combination)，compiler 会抛出错误。更多细节请查看接下来的章节。

T> 如果你正在使用一个需要全局变量的模块，请使用 `ProvidePlugin` 而非 `global`。

这里是默认值：

__webpack.config.js__

```javascript
module.exports = {
  //...
  node: {
    global: false,
    __filename: false,
    __dirname: false,
  }
};
```

从 webpack 3.0.0 开始，`node` 选项可能被设置为 `false`，以完全关闭 `NodeStuffPlugin` 和 `NodeSourcePlugin` 插件。

## `node.global` {#nodeglobal}

`boolean = true`

Defaults to `false` for [targets](/configuration/target/) `node`, `async-node` and `electron-main`.

关于此对象的准确行为，请查看[源码](https://github.com/webpack/webpack/blob/master/buildin/global.js)。


## `node.__filename` {#node__filename}

`boolean` `string = mock`

Defaults to `false` for [targets](/configuration/target/) `node`, `async-node` and `electron-main`.

选项：

- `true`: __输入__ 文件的文件名，是相对于 [`context` 选项](/configuration/entry-context/#context)。
- `false`: 常规的 Node.js `__filename` 行为。在 Node.js 环境中运行时，__输出__ 文件的文件名。
- `'mock'`: value 填充为 `'index.js'`.


## `node.__dirname` {#node__dirname}

`boolean` `string = mock`

Defaults to `false` for [targets](/configuration/target/) `node`, `async-node` and `electron-main`.

选项：

- `true`: __输入__ 文件的目录名，是相对于 [`context` 选项](/configuration/entry-context/#context)。
- `false`: 常规的 Node.js `__dirname` 行为。在 Node.js 环境中运行时，__输出__ 文件的目录名。
- `'mock'`: value 填充为 `'/'`。
