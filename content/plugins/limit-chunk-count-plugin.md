---
title: LimitChunkCountPlugin
contributors:
  - rouzbeh84
---

While writing your code, you may have already added many code split points to load stuff on demand. After compiling you might notice that there are too many chunks that are too small - creating larger HTTP overhead. Luckily, webpack can post-process your chunks by merging them. You can provide two options as _objects_:

- Limit the maximum chunk count inline with `--optimize-max-chunks 15` or in your config as `new webpack.optimize.LimitChunkCountPlugin({maxChunks: 15})`
- Limit the minimum chunk size inline with `--optimize-min-chunk-size 10000` or in your config as `new webpack.optimize.MinChunkSizePlugin({minChunkSize: 10000})`

webpack will take care of it by merging chunks (it will prefer merging chunk that have duplicate modules). Nothing will be merged into the entry chunk, so as not to impact initial page loading time.
