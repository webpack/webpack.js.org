---
title: 实验特性(experiments)
sort: 19
contributors:
  - EugeneHlushko
  - wizardofhogwarts
  - chenxsan
  - anshumanv
---

## `experiments` {#experiments}

`boolean: false`

`experiments` 配置是在 webpack 5 中推出，目的是为了给用户赋能去开启并试用一些实验的特性。

W> 由于实验特性具有相对 宽松的语义版本，可能会有重大的变更，所以主确定你将 webpack 的版本固定为小版本号，例如与其使用 `webpack: ~5.4.3` 不如使用 `webpack: ^5.4.3` 或者当使用 `experiments` 配置时使用版本锁定能力.

可用的配置项：

<<<<<<< HEAD
- `syncWebAssembly`: 支持旧版本  webpack 4 的  WebAssembly
- `asyncWebAssembly`: 支持新版本的 WebAssembly，该版本依据 [更新的规格书](https://github.com/WebAssembly/esm-integration), 它使 WebAssembly 模块作为一个异步的模块
- `topLevelAwait`: 支持 [顶层 Await 阶段3提议](https://github.com/tc39/proposal-top-level-await), 当 `await` 在顶层使用，它让模块成为一个异步模块。
- `outputModule`: 开启使用 [`output.module`](/configuration/output/#outputmodule) 配置同时将它设置成 `true`。 开启使用 `output.libraryTarget` 作为 `'module'` 且将它设置成 `'module'`。
=======
- `syncWebAssembly`: Support the old WebAssembly like in webpack 4
- `asyncWebAssembly`: Support the new WebAssembly according to the [updated specification](https://github.com/WebAssembly/esm-integration), it makes a WebAssembly module an async module
- `topLevelAwait`: Support the [Top Level Await Stage 3 proposal](https://github.com/tc39/proposal-top-level-await), it makes the module an async module when `await` is used on the top-level
- `outputModule`: enables the use of [`output.module`](/configuration/output/#outputmodule) configuration option and sets it to `true`. Enables the use of `output.libraryTarget` as `'module'` and sets it to `'module'`.
- `layers`: Enable module and chunk layers.
>>>>>>> 5df85270694c1e52eefcf3f23b8924d5ef4e12f5

__webpack.config.js__

```javascript
module.exports = {
  //...
  experiments: {
    outputModule: true,
    syncWebAssembly: true,
    topLevelAwait: true,
    asyncWebAssembly: true,
    layers: true,
  },
};
```
