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
  - chenxsan
---

<<<<<<< HEAD
这些选项可以配置是否 polyfill 或 mock 某些 [Node.js 全局变量](https://nodejs.org/docs/latest/api/globals.html)和模块。这可以使最初为 Node.js 环境编写的代码，在其他环境（如浏览器）中运行。

此功能由 webpack 内部的 [`NodeStuffPlugin`](https://github.com/webpack/webpack/blob/master/lib/NodeStuffPlugin.js) 插件提供。如果 target 是 "web"（默认）或 "webworker"，那么 [`NodeSourcePlugin`](https://github.com/webpack/webpack/blob/master/lib/node/NodeSourcePlugin.js) 插件也会被激活。
=======
The following Node.js options configure whether to polyfill or mock certain [Node.js globals](https://nodejs.org/docs/latest/api/globals.html).

This feature is provided by webpack's internal [`NodeStuffPlugin`](https://github.com/webpack/webpack/blob/master/lib/NodeStuffPlugin.js) plugin.
>>>>>>> 3ade0b38baba75fdd46e283eafd478842267ef35

W> As of webpack 5, You can configure only `global`, `__filename` or `__dirname` under `node` option. If you're looking for how to polyfill `fs` alike in Node.js under webpack 5, please check [resolve.fallback](/configuration/resolve/#resolvefallback) for help.

## `node` {#node}

<<<<<<< HEAD
`boolean = false` `object`

是一个对象，其中每个属性都是 Node.js 全局变量或模块的名称，每个 value 是以下其中之一……

- `true`：提供 polyfill。
- `"mock"`：提供 mock 实现预期接口，但功能很少或没有。
- `"empty"`：提供空对象。
- `false`: 什么都不提供。预期获取此对象的代码，可能会因为获取不到此对象，触发 `ReferenceError` 而崩溃。尝试使用 `require('modulename')` 导入模块的代码，可能会触发 `Cannot find module "modulename"` 错误。

W> 注意，不是每个 Node 全局变量都支持所有选项。对于不支持的键值组合(property-value combination)，compiler 会抛出错误。更多细节请查看接下来的章节。

T> 如果你正在使用一个需要全局变量的模块，请使用 `ProvidePlugin` 而非 `global`。

这里是默认值：
=======
`boolean: false` `object`
>>>>>>> 3ade0b38baba75fdd46e283eafd478842267ef35

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

<<<<<<< HEAD
从 webpack 3.0.0 开始，`node` 选项可能被设置为 `false`，以完全关闭 `NodeStuffPlugin` 和 `NodeSourcePlugin` 插件。
=======
Since webpack 3.0.0, the `node` option may be set to `false` to completely turn off the `NodeStuffPlugin` plugin.
>>>>>>> 3ade0b38baba75fdd46e283eafd478842267ef35

## `node.global` {#nodeglobal}

`boolean`

T> If you are using a module which needs global variables in it, use `ProvidePlugin` instead of `global`.

<<<<<<< HEAD
关于此对象的准确行为，请查看[源码](https://github.com/webpack/webpack/blob/master/buildin/global.js)。
=======
See [the Node.js documentation](https://nodejs.org/api/globals.html#globals_global) for the exact behavior of this object.
>>>>>>> 3ade0b38baba75fdd46e283eafd478842267ef35

Options:

<<<<<<< HEAD
## `node.__filename` {#node__filename}
=======
- `true`: Provide a polyfill.
- `false`: Provide nothing. Code that expects this object may crash with a `ReferenceError`.
>>>>>>> 3ade0b38baba75fdd46e283eafd478842267ef35

## `node.__filename`

`boolean` `string: 'mock' | 'eval-only'`

选项：

<<<<<<< HEAD
- `true`: __输入__ 文件的文件名，是相对于 [`context` 选项](/configuration/entry-context/#context)。
- `false`: 常规的 Node.js `__filename` 行为。在 Node.js 环境中运行时，__输出__ 文件的文件名。
- `'mock'`: value 填充为 `'index.js'`.
=======
- `true`: The filename of the __input__ file relative to the [`context` option](/configuration/entry-context/#context).
- `false`: Webpack won't touch your `__filename` code, which means you have the regular Node.js `__filename` behavior. The filename of the __output__ file when run in a Node.js environment.
- `'mock'`: The fixed value `'/index.js'`.
- `'eval-only'`
>>>>>>> 3ade0b38baba75fdd46e283eafd478842267ef35


## `node.__dirname` {#node__dirname}

`boolean` `string: 'mock' | 'eval-only'`

选项：

<<<<<<< HEAD
- `true`: __输入__ 文件的目录名，是相对于 [`context` 选项](/configuration/entry-context/#context)。
- `false`: 常规的 Node.js `__dirname` 行为。在 Node.js 环境中运行时，__输出__ 文件的目录名。
- `'mock'`: value 填充为 `'/'`。
=======
- `true`: The dirname of the __input__ file relative to the [`context` option](/configuration/entry-context/#context).
- `false`:  Webpack won't touch your `__dirname` code, which means you have the regular Node.js `__dirname` behavior. The dirname of the __output__ file when run in a Node.js environment.
- `'mock'`: The fixed value `'/'`.
- `'eval-only'`
>>>>>>> 3ade0b38baba75fdd46e283eafd478842267ef35
