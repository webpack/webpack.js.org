---
title: AutomaticPrefetchPlugin
contributors:
  - sokra
  - EugeneHlushko
---

The `AutomaticPrefetchPlugin` discovers __all modules__ from the previous compilation upfront while watching for changes, trying to improve the incremental build times. Compared to [`PrefetchPlugin`](/plugins/prefetch-plugin/) which discovers a __single module__ upfront.

W> May or may not have a performance benefit since the incremental build times are pretty fast.

__webpack.config.js__

``` javascript
module.exports = {
  // ...
  plugins: [
    new webpack.AutomaticPrefetchPlugin()
  ]
};
```
