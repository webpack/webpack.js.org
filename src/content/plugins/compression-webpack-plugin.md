---
title: CompressionWebpackPlugin
source: https://raw.githubusercontent.com/webpack-contrib/compression-webpack-plugin/master/README.md
edit: https://github.com/webpack-contrib/compression-webpack-plugin/edit/master/README.md
repo: https://github.com/webpack-contrib/compression-webpack-plugin
---
Prepare compressed versions of assets to serve them with Content-Encoding

## Install

```bash
npm i -D compression-webpack-plugin
```

## Usage

**webpack.config.js**
```js
const CompressionPlugin = require("compression-webpack-plugin")

module.exports = {
  plugins: [
    new CompressionPlugin(...options)
  ]
}
```

## Options

|Name|Type|Default|Description|
|:--:|:--:|:-----:|:----------|
|**[`test`](#test)**|`{RegExp\|Array<RegExp>}`|`.`|All assets matching this `{RegExp\|Array<RegExp>}` are processed|
|**[`include`](#include)**|`{RegExp\|Array<RegExp>}`|`undefined`|Files to `include`|
|**[`exclude`](#exclude)**|`{RegExp\|Array<RegExp>}`|`undefined`|Files to `exclude`|
|**[`cache`](#cache)**|`{Boolean\|String}`|`false`|Enable file caching|
|**[`asset`](#asset)**|`{String}`|`[path].gz[query]`|The target asset name. `[file]` is replaced with the original asset. `[path]` is replaced with the path of the original asset and `[query]` with the query|
|**[`filename`](#filename)**|`{Function}`|`false`|A `{Function}` `(asset) => asset` which receives the asset name (after processing `asset` option) and returns the new asset name|
|**[`algorithm`](#algorithm)**|`{String\|Function}`|`gzip`|Can be `(buffer, cb) => cb(buffer)` or if a `{String}` is used the algorithm is taken from `zlib`|
|**[`threshold`](#threshold)**|`{Number}`|`0`|Only assets bigger than this size are processed. In bytes.|
|**[`minRatio`](#minratio)**|`{Number}`|`0.8`|Only assets that compress better than this ratio are processed|
|**[`deleteOriginalAssets`](#deleteoriginalassets)**|`{Boolean}`|`false`|Whether to delete the original assets or not|

##

**webpack.config.js**
```js
[
  new CompressionPlugin({
    test: /\.js/
  })
]
```

### `include`

**webpack.config.js**
```js
[
  new CompressionPlugin({
    include: /\/includes/
  })
]
```

### `exclude`

**webpack.config.js**
```js
[
  new CompressionPlugin({
    exclude: /\/excludes/
  })
]
```

### `cache`

**webpack.config.js**
```js
[
  new CompressionPlugin({
    cache: true
  })
]
```

### `asset`

**webpack.config.js**
```js
[
  new CompressionPlugin({
    asset: '[path].gz[query]'
  })
]
```

### `filename`

**webpack.config.js**
```js
[
  new CompressionPlugin({
    filename (asset) {
      asset = 'rename'
      return asset
    }
  })
]
```

### `algorithm`

**webpack.config.js**
```js
[
  new CompressionPlugin({
    algorithm: 'gzip'
  })
]
```

### `threshold`

**webpack.config.js**
```js
[
  new CompressionPlugin({
    threshold: 0
  })
]
```

### `minRatio`

**webpack.config.js**
```js
[
  new CompressionPlugin({
    minRatio: 0.8
  })
]
```

### `deleteOriginalAssets`

**webpack.config.js**
```js
[
  new CompressionPlugin({
    deleteOriginalAssets: true
  })
]
```

## Maintainers

<table>
  <tbody>
  <tr>
    <td align="center">
      <a href="https://github.com/d3viant0ne">
        <img width="150" height="150" src="https://github.com/d3viant0ne.png?v=3&s=150">
        </br>
        Joshua Wiens
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/bebraw">
        <img width="150" height="150" src="https://github.com/bebraw.png?v=3&s=150">
        </br>
        Juho Vepsäläinen
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/michael-ciniawsky">
        <img width="150" height="150" src="https://github.com/michael-ciniawsky.png?v=3&s=150">
        </br>
        Michael Ciniawsky
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/evilebottnawi">
        <img width="150" height="150" src="https://github.com/evilebottnawi.png?v=3&s=150">
        </br>
        Alexander Krasnoyarov
      </a>
    </td>
  </tr>
  <tbody>
</table>


[npm]: https://img.shields.io/npm/v/compression-webpack-plugin.svg
[npm-url]: https://npmjs.com/package/compression-webpack-plugin

[node]: https://img.shields.io/node/v/compression-webpack-plugin.svg
[node-url]: https://nodejs.org

[deps]: https://david-dm.org/webpack-contrib/compression-webpack-plugin.svg
[deps-url]: https://david-dm.org/webpack-contrib/compression-webpack-plugin

[test]: https://secure.travis-ci.org/webpack-contrib/compression-webpack-plugin.svg
[test-url]: http://travis-ci.org/webpack-contrib/compression-webpack-plugin

[cover]: https://codecov.io/gh/webpack-contrib/compression-webpack-plugin/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/compression-webpack-plugin

[chat]: https://img.shields.io/badge/gitter-webpack%2Fwebpack-brightgreen.svg
[chat-url]: https://gitter.im/webpack/webpack
