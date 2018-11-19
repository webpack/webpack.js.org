---
title: LimitChunkCountPlugin
contributors:
  - rouzbeh84
  - skipjack
  - tbroadley
  - byzyk
  - EugeneHlushko
---

While writing your code, you may have already added many code split points to load stuff on demand. After compiling you might notice that some chunks are too small - creating larger HTTP overhead. `LimitChunkCountPlugin` can post-process your chunks by merging them.

``` js
new webpack.optimize.LimitChunkCountPlugin({
  // Options...
});
```


## Options

The following options are supported:

### `maxChunks`

`number`

Limit the maximum number of chunks using a value greater than or equal to `1`. Using `1` will prevent any additional chunks from being added as the entry/main chunk is also included in the count.

__webpack.config.js__

```javascript
const webpack = require('webpack');
module.exports = {
  // ...
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 5
    })
  ]
};
```

### `minChunkSize`

`number`

Set a minimum chunk size in bytes.

__webpack.config.js__

```javascript
const webpack = require('webpack');
module.exports = {
  // ...
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      minChunkSize: 1000
    })
  ]
};
```


## Usage via CLI

This plugin and it's options can also be invoked via the [CLI](/api/cli/):

```bash
webpack --optimize-max-chunks 15
```

or

```bash
webpack --optimize-min-chunk-size 10000
```
