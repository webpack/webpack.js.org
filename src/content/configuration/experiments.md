---
title: 实验特性(experiments)
sort: 19
contributors:
  - EugeneHlushko
  - wizardofhogwarts
  - chenxsan
---

## `experiments` {#experiments}

`boolean: false`

`experiments` 配置是在 webpack 5 中推出，目的是为了给用户赋能去开启并试用一些实验的特性。

W> 由于实验特性具有相对 宽松的语义版本，可能会有重大的变更，所以主确定你将 webpack 的版本固定为小版本号，例如与其使用 `webpack: ~5.4.3` 不如使用 `webpack: ^5.4.3` 或者当使用 `experiments` 配置时使用版本锁定能力.

可用的配置项：

- `mjs`: 支持  `.mjs` 文件来定义 [EcmaScript 模块](https://nodejs.org/api/esm.html#esm_ecmascript_modules)
- `syncWebAssembly`: 支持旧版本  webpack 4 的  WebAssembly
- `asyncWebAssembly`: 支持新版本的 WebAssembly，该版本依据 [更新的规格书](https://github.com/WebAssembly/esm-integration), 它使 WebAssembly 模块作为一个异步的模块
- `topLevelAwait`: 支持 [顶层 Await 阶段3提议](https://github.com/tc39/proposal-top-level-await), 当 `await` 在顶层使用，它让模块成为一个异步模块。
- `importAsync`: 使用 `import` 导入异步模块
- `importAwait`: 使用 `import await` 导入异步模块
- `asset`: 一种允许使用资源文件  (如字体fonts, 图片images, 等)而不需要配置类似于 `file-loader` | `url-loader` | `raw-loader` 等loaders 来处理它们的导入的模块
- `outputModule`: 开启使用 [`output.module`](/configuration/output/#outputmodule) 配置同时将它设置成 `true`。 开启使用 `output.libraryTarget` 作为 `'module'` 且将它设置成 `'module'`。

__webpack.config.js__

```javascript
module.exports = {
  //...
  experiments: {
    mjs: true,
    outputModule: true,
    syncWebAssembly: true,
    topLevelAwait: true,
    asset: true,
    asyncWebAssembly: true,
    importAsync: true,
    importAwait: true,
  },
};
```
