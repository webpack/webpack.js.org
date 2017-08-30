---
title: AggressiveSplittingPlugin
contributors:
  - pierreneter
---

`AggressiveSplittingPlugin` 可以将bundles分割到更小的chunks，直到各个chunks的大小达到 `option` 设置的 `maxSize` 。 它通过文件结构将模块组织在一起。

它记录了分离点在webpack记录里，并尝试按照它开始的方式还原分割。这确保了在更改应用程序后，旧的分割点(和chunks)是可再使用的，因为它们可能早已在客户端的缓存中。因此强烈推荐使用记录。

仅有在chunks比规定的 `minSize` 大时才会保存在记录里。这保证chunks随着应用程序的增加而增加，而不是每次改变的时候创建很多的chunks。

如果模块更改，Chunks可能会无效。无效Chunks中的模块会回到模块池(module pool)中，会同时创建一个新的模块。

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
