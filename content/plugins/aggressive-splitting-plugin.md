---
title: AggressiveSplittingPlugin
contributors:
  - pierreneter
---

The `AggressiveSplitting` is a plugin can split the bundle into multiple smaller chunks, split every chunk until it reaches the specified maxSize configured in `options`. It groups modules together by folder structure.

This plugin records it's splitting in the webpack records and try to restore splitting from records. This ensures that after changes to the application old splittings (and chunks) are reused. They are probably already in the clients cache. Therefore it's heavily recommended to use records.

Only chunks which are bigger than the specified minSize are stored into the records. This ensures that these chunks fill up as your application grows, instead of creating too many chunks for every change.

Chunks can get invalid if a module changes. Modules from invalid chunks go back into the module pool and new chunks are created from all modules in the pool.


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
