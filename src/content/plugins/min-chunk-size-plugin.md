---
title: MinChunkSizePlugin
contributors:
  - byzyk
sort: 1
---

Keep chunk size above the specified limit by merging chunks that are smaller than the `minChunkSize`.

``` js
new webpack.optimize.MinChunkSizePlugin({
  minChunkSize: 10000 // Minimum number of characters
});
```
