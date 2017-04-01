---
title: CompressionWebpackPlugin
source: https://raw.githubusercontent.com/webpack-contrib/compression-webpack-plugin/master/README.md
edit: https://github.com/webpack-contrib/compression-webpack-plugin/edit/master/README.md
---
## Install

```bash
npm i -D compression-webpack-plugin
```

## Usage

``` javascript
var CompressionPlugin = require("compression-webpack-plugin");
module.exports = {
	plugins: [
		new CompressionPlugin({
			asset: "[path].gz[query]",
			algorithm: "gzip",
			test: /\.(js|html)$/,
			threshold: 10240,
			minRatio: 0.8
		})
	]
}
```

Arguments:

* `asset`: The target asset name. `[file]` is replaced with the original asset. `[path]` is replaced with the path of the original asset and `[query]` with the query. Defaults to `"[path].gz[query]"`.
* `algorithm`: Can be a `function(buf, callback)` or a string. For a string the algorithm is taken from `zlib` (or zopfli for `zopfli`). Defaults to `"gzip"`.
* `test`: All assets matching this RegExp are processed. Defaults to every asset.
* `threshold`: Only assets bigger than this size are processed. In bytes. Defaults to `0`.
* `minRatio`: Only assets that compress better that this ratio are processed. Defaults to `0.8`.
* `deleteOriginalAssets`: Whether to delete the original assets or not. Defaults to `false`.

Option Arguments for Zopfli (see [node-zopfli](https://github.com/pierreinglebert/node-zopfli#options) doc for details):
* verbose: Default: false,
* verbose_more: Default: false,
* numiterations: Default: 15,
* blocksplitting: Default: true,
* blocksplittinglast: Default: false,
* blocksplittingmax: Default: 15

## Maintainers

<table>
  <tbody>
    <tr>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars3.githubusercontent.com/u/166921?v=3&s=150">
        </br>
        <a href="https://github.com/bebraw">Juho Vepsäläinen</a>
      </td>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars2.githubusercontent.com/u/8420490?v=3&s=150">
        </br>
        <a href="https://github.com/d3viant0ne">Joshua Wiens</a>
      </td>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars3.githubusercontent.com/u/533616?v=3&s=150">
        </br>
        <a href="https://github.com/SpaceK33z">Kees Kluskens</a>
      </td>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars3.githubusercontent.com/u/3408176?v=3&s=150">
        </br>
        <a href="https://github.com/TheLarkInn">Sean Larkin</a>
      </td>
    </tr>
  <tbody>
</table>


[npm]: https://img.shields.io/npm/v/webpack-loader-seed.svg
[npm-url]: https://npmjs.com/package/webpack-loader-seed

[deps]: https://david-dm.org/webpack-contrib/webpack-loader-seed.svg
[deps-url]: https://david-dm.org/webpack-contrib/webpack-loader-seed

[chat]: https://img.shields.io/badge/gitter-webpack%2Fwebpack-brightgreen.svg
[chat-url]: https://gitter.im/webpack/webpack