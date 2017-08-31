---
title: AggressiveSplittingPlugin
contributors:
  - pierreneter
---

The `AggressiveSplittingPlugin` can split bundles into smaller chunks, splitting every chunk until it reaches the specified `maxSize` configured in `options`. It groups modules together by folder structure.

It records the split points in webpack records and tries to restore splitting in the same manner it started. This ensures that after changes to the application, the previous split points (and chunks) are reused as they are probably already in the client's cache. Therefore it's heavily recommended to use records.

Only chunks bigger than the specified `minSize` are stored in records. This ensures the chunks fill up as your application grows, instead of creating too many chunks for every change.

Chunks can be invalidated if a module changes. Modules from invalid chunks will go back into the module pool from which new chunks are created.

```js
new webpack.optimize.AggressiveSplittingPlugin(options)
```


## Options

```js
{
  minSize: 30000, //Byte, split point. Default: 30720
  maxSize: 50000, //Byte, maxsize of per file. Default: 51200
  chunkOverhead: 0, //Default: 0
  entryChunkMultiplicator: 1, //Default: 1
}
```


## Examples

[http2-aggressive-splitting](https://github.com/webpack/webpack/tree/master/examples/http2-aggressive-splitting)
