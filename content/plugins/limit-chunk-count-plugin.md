---
title: LimitChunkCountPlugin
contributors:
  - rouzbeh84
---

当你在编写代码时，你可能已经添加了许多代码块分离点(code split points)来实现按需加载(load stuff on demand)。在编译完之后，你可能会注意到现在有许多很小的 chunk - 这产生了大量 HTTP 请求开销。幸运的是，webpack 可以后处理你的 chunk，并通过合并的方式减少请求。webpack 提供了两个_对象_选项：

- 通过 `--optimize-max-chunks 15` 这种内联方式(inline)，来限制最大 chunk 数量，或者在配置文件中添加 `new webpack.optimize.LimitChunkCountPlugin({maxChunks: 15})`
- 通过 `--optimize-min-chunk-size 10000` 这种内联方式(inline)，来限制最小 chunk 数量，或者在配置文件中添加 `new webpack.optimize.MinChunkSizePlugin({minChunkSize: 10000})`

webpack 接受这两个参数来合并 chunk（优先合并含有重复的模块的 chunk）。由于不会合并到入口 chunk(entry chunk)，所以不会影响页面初始化加载时间。
