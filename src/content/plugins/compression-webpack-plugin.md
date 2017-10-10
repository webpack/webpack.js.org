---
title: CompressionWebpackPlugin
source: https://raw.githubusercontent.com/webpack-contrib/compression-webpack-plugin/master/README.md
edit: https://github.com/webpack-contrib/compression-webpack-plugin/edit/master/README.md
repo: https://github.com/webpack-contrib/compression-webpack-plugin
---

  <p>Prepare compressed versions of assets to serve them with Content-Encoding<p>
</div>

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
|**`test`**|`{RegExp}`|`.`|All assets matching this `{RegExp}` are processed|
|**`asset`**|`{String}`|`[path].gz[query]`|The target asset name. `[file]` is replaced with the original asset. `[path]` is replaced with the path of the original asset and `[query]` with the query|
|**`filename`**|`{Function}`|`false`|A `{Function}` `(asset) => asset` which receives the asset name (after processing `asset` option) and returns the new asset name|
|**`algorithm`**|`{String\|Function}`|`gzip`|Can be `(buffer, cb) => cb(buffer)` or if a {String}` is used the algorithm is taken from `zlib`|
|**`threshold`**|`{Number}`|`0`|Only assets bigger than this size are processed. In bytes.|
|**`minRatio`**|`{Number}`|`0.8`|Only assets that compress better that this ratio are processed|
|**`deleteOriginalAssets`**|`{Boolean}`|`false`|Whether to delete the original assets or not|


### `test`

**webpack.config.js**
```js
[
  new CompressionPlugin({
    test: /\.js/
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
