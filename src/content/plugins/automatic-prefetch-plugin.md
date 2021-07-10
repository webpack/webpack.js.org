---
title: AutomaticPrefetchPlugin
group: webpack
contributors:
  - sokra
  - EugeneHlushko
---

The `AutomaticPrefetchPlugin` discovers **all modules** from the previous compilation upfront while watching for changes, trying to improve the incremental build times. Compared to [`PrefetchPlugin`](/plugins/prefetch-plugin/) which discovers a **single module** upfront.

W> May or may not have a performance benefit since the incremental build times are pretty fast.

**webpack.config.js**

```javascript
module.exports = {
  // ...
  plugins: [new webpack.AutomaticPrefetchPlugin()],
};
```
