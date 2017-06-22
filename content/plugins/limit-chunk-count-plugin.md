---
title: LimitChunkCountPlugin
contributors:
  - rouzbeh84
  - skipjack
---

当你在编写代码时，可能已经添加了许多代码分离点(code split point)来实现按需加载(load stuff on demand)。在编译完之后，你可能会注意到有一些很小的 chunk - 这产生了大量 HTTP 请求开销。幸运的是，此插件可以通过合并的方式，后处理你的 chunk，以减少请求数。

``` js
new webpack.optimize.LimitChunkCountPlugin({
  // 选项……
})
```


## 选项

选项可以支持以下：

- `maxChunks`：使用大于或等于 `1` 的值，来限制 chunk 的最大数量。使用 `1` 防止添加任何其他额外的 chunk，这是因为 entry/main chunk 也会包含在计数之中。
- `minChunkSize`: 设置 chunk 的最小大小。

在合并 chunk 时，webpack 会尝试识别出具有重复模块的 chunk，并优先进行合并。任何模块都不会被合并到 entry chunk 中，以免影响初始页面加载时间。这里有一个小例子：

``` js
new webpack.optimize.LimitChunkCountPlugin({
  maxChunks: 5, // 必须大于或等于 1
  minChunkSize: 1000
})
```


## 命令行接口(CLI)

此插件和其选项还可以通过命令行接口(CLI)执行：

``` bash
--optimize-max-chunks 15
```

或

``` bash
--optimize-min-chunk-size 10000
```

***

> 原文：https://webpack.js.org/plugins/limit-chunk-count-plugin/
