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

参数：

* `asset`： 目标资源名称。 `[file]` 会被替换成原始资源。`[path]` 会被替换成原始资源的路径， `[query]` 会被替换成查询字符串。默认值是 `"[path].gz[query]"`。
* `filename`: A `function(asset)` which receives the asset name (after processing `asset` option) and returns the new asset name. Defaults to `false`.
* `algorithm`： 可以是 `function(buf, callback)` 或者字符串。对于字符串来说依照 `zlib` 的算法(或者 `zopfli` 的算法)。默认值是 `"gzip"`。
* `test`： 所有匹配该正则的资源都会被处理。默认值是全部资源。
* `threshold`： 只有大小大于该值的资源会被处理。单位是 bytes。默认值是 `0`。
* `minRatio`： 只有压缩率小于这个值的资源才会被处理。默认值是 `0.8`。
* `deleteOriginalAssets`: Whether to delete the original assets or not. Defaults to `false`.

Zopfli 的参数选项 (详情请查看 [node-zopfli](https://github.com/pierreinglebert/node-zopfli#options) 文档)：
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


[npm]: https://img.shields.io/npm/v/compression-webpack-plugin.svg
[npm-url]: https://npmjs.com/package/compression-webpack-plugin

[deps]: https://david-dm.org/webpack-contrib/compression-webpack-plugin.svg
[deps-url]: https://david-dm.org/webpack-contrib/compression-webpack-plugin

[chat]: https://img.shields.io/badge/gitter-webpack%2Fwebpack-brightgreen.svg
[chat-url]: https://gitter.im/webpack/webpack

***

> 原文：https://webpack.js.org/plugins/compression-webpack-plugin/
