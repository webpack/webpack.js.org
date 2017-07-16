---
title: AggressiveSplittingPlugin
contributors:
  - 
---


```
new webpack.optimize.AggressiveSplittingPlugin(options),
```

## Options
```
{
  minSize: 30000, //Byte, split point. Default: 30720
  maxSize: 50000, //Byte, maxsize of per file. Default: 51200
  chunkOverhead: 0, //Default: 0
  entryChunkMultiplicator: 1, //Default: 1
}
```

## Examples
[http2-aggressive-splitting](https://github.com/webpack/webpack/tree/master/examples/http2-aggressive-splitting)
