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

- `syncWebAssembly`: Support the old WebAssembly like in webpack 4
- `asyncWebAssembly`: Support the new WebAssembly according to the [updated specification](https://github.com/WebAssembly/esm-integration), it makes a WebAssembly module an async module
- `topLevelAwait`: Support the [Top Level Await Stage 3 proposal](https://github.com/tc39/proposal-top-level-await), it makes the module an async module when `await` is used on the top-level
- `outputModule`: enables the use of [`output.module`](/configuration/output/#outputmodule) configuration option and sets it to `true`. Enables the use of `output.libraryTarget` as `'module'` and sets it to `'module'`.
- `layers`: Enable module and chunk layers.

**webpack.config.js**

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
