---
title: MinChunkSizePlugin
contributors:
sort: 1
---

通过合并小于 `minChunkSize` 大小的 chunk，将 chunk 体积保持在指定大小限制以上。

``` js
new webpack.optimize.MinChunkSizePlugin({
  minChunkSize: 10000 // Minimum number of characters
})
```

***

> 原文：https://webpack.js.org/plugins/min-chunk-size-plugin/
