---
title: compression-webpack-plugin
source: https://raw.githubusercontent.com/webpack/compression-webpack-plugin/master/README.md
edit: https://github.com/webpack/compression-webpack-plugin/edit/master/README.md
---
# compression plugin for webpack

## Usage

``` javascript
var CompressionPlugin = require("compression-webpack-plugin");
module.exports = {
	plugins: [
		new CompressionPlugin({
			asset: "[path].gz[query]",
			algorithm: "gzip",
			test: /\.js$|\.html$/,
			threshold: 10240,
			minRatio: 0.8
		})
	]
}
```

参数：

* `asset`： 目标资源名称。 `[file]` 会被替换成原始资源。`[path]` 会被替换成原始资源的路径， `[query]` 会被替换成查询字符串。默认值是 `"[path].gz[query]"`。
* `algorithm`： 可以是 `function(buf, callback)` 或者字符串。对于字符串来说依照 `zlib` 的算法(或者 `zopfli` 的算法)。默认值是 `"gzip"`。
* `test`： 所有匹配该正则的资源都会被处理。默认值是全部资源。
* `threshold`： 只有大小大于该值的资源会被处理。单位是 bytes。默认值是 `0`。
* `minRatio`： 只有压缩率小于这个值的资源才会被处理。默认值是 `0.8`。

Zopfli 的参数选项 (详情请查看 [node-zopfli](https://github.com/pierreinglebert/node-zopfli#options) 文档)：
* verbose: Default: false,
* verbose_more: Default: false,
* numiterations: Default: 15,
* blocksplitting: Default: true,
* blocksplittinglast: Default: false,
* blocksplittingmax: Default: 15

## License

MIT (http://www.opensource.org/licenses/mit-license.php)

***

> 原文：https://webpack.js.org/plugins/compression-webpack-plugin/