---
title: LimitChunkCountPlugin
contributors:
  - rouzbeh84
  - skipjack
---

While writing your code, you may have already added many code split points to load stuff on demand. After compiling you might notice that some chunks are too small - creating larger HTTP overhead. Luckily, this plugin can post-process your chunks by merging them.

``` js
new webpack.optimize.LimitChunkCountPlugin({
  // Options...
})
```


## Options

The following options are supported:

- `maxChunks`: Limit the maximum number of chunks
- `minChunkSize`: Set a minimum chunk size

While merging chunks, webpack will try to identify those that have duplicate modules and merge them first. Nothing will be merged into the entry chunk, so as not to impact initial page loading time.


## CLI

This plugin and it's options can also be invoked via the CLI:

``` bash
--optimize-max-chunks 15
```

or

``` bash
--optimize-min-chunk-size 10000
```
