---
title: Experiments
sort: 19
contributors:
  - EugeneHlushko
  - chenxsan
---

## `experiments`

`boolean: false`

`experiments` option was introduced in webpack 5 in order to empower users with an ability of activating and trying out experimental features.

W> Because experimental features have relaxed semantic versioning and might contain breaking changes, make sure to fix webpack's version to minor e.g. `webpack: ~5.4.3` instead of `webpack: ^5.4.3` or use a lockfile when using `experiments`.

Available options:

- `mjs`: Support `.mjs` files as a way to define [EcmaScript modules](https://nodejs.org/api/esm.html#esm_ecmascript_modules)
- `syncWebAssembly`: Support the old WebAssembly like in webpack 4
- `asyncWebAssembly`: Support new WebAssembly according to the [updated spec](https://github.com/WebAssembly/esm-integration), makes a WebAssembly module an async module
- `topLevelAwait`: Support [Top Level Await Stage 3 proposal](https://github.com/tc39/proposal-top-level-await), makes the module an async module when `await` is used on top-level
- `importAsync`: import async modules with `import`
- `importAwait`: import async modules with `import await`
- `asset`: a type of module that allows to use asset files (fonts, icons, etc) without configuring additional loaders, similar to `file-loader`|`url-loader`|`raw-loader`
- `outputModule`: enables the use of [`output.module`](/configuration/output/#outputmodule) configuration option and sets it to `true`. Enables the use of `output.libraryTarget` as `'module'` and sets it to `'module'`.

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
