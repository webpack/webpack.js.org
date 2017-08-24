---
title: AggressiveSplittingPlugin
contributors:
  - pierreneter
---

The `AggressiveSplittingPlugin` can split bundles into smaller chunks, splitting every chunk until it reaches the specified `maxSize` configured in `options`. It groups modules together by folder structure.

`AggressiveSplittingPlugin` 可以将bundles分割到更小的chunks，直到各个chunks的大小为 `option` 设置的 `maxSize` 。 它通过文件结构将模块组织在一起。

It records the split points in webpack records and tries to restore splitting in the same manner it started. This ensures that after changes to the application, the previous split points (and chunks) are reused as they are probably already in the client's cache. Therefore it's heavily recommended to use records.

它记录了分割点在webpack记录里，并尝试按照它开始的方式还原分割。这确保了在更改应用后，旧的分割点(和chunks)是可再使用的，因为它们可能早已在客户端的缓存中。因此强烈推荐使用记录。

Only chunks bigger than the specified `minSize` are stored in records. This ensures the chunks fill up as your application grows, instead of creating too many chunks for every change.

仅有在chunks比规定的 `minSize` 大时才会保存在记录里。这保证chunks随着应用的增加而增加，而不是每次改变的时候创建很多的chunks。

Chunks can be invalidated if a module changes. Modules from invalid chunks will go back into the module pool from which new chunks are created.

如果模块更改，Chunks可能会无效。无效的Chunks模块会回到模块池中，会同时创建一个新的模块。

```js
new webpack.optimize.AggressiveSplittingPlugin(options)
```


## 选项

```js
{
  minSize: 30000, //字节, 分割点. 默认: 30720
  maxSize: 50000, //字节, 每个文件最大字节. 默认: 51200
  chunkOverhead: 0, //默认: 0
  entryChunkMultiplicator: 1, //默认: 1
}
```


## 示例

[http2-aggressive-splitting](https://github.com/webpack/webpack/tree/master/examples/http2-aggressive-splitting)
