---
title: Experiments
sort: 19
contributors:
  - EugeneHlushko
---


## `experiments`

`boolean: false`

`experiments` option was introduced in webpack 5 in order to empower users with an ability of activating and trying out experimental features.

W> Because experimental features have relaxed semantic versioning and might contain breaking changes, make sure to fix webpack's version to minor e.g. `webpack: ~5.4.3` instead of `webpack: ^5.4.3` or use a lockfile when using `experiments`.

Available options:

- `mjs`: Support `.mjs` files as a way to define [EcmaScript modules](https://nodejs.org/api/esm.html#esm_ecmascript_modules)

__webpack.config.js__

```javascript
module.exports = {
  //...
  experiments: {
    mjs: true
  }
};
```