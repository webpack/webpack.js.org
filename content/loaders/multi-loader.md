---
title: multi-loader
source: https://raw.githubusercontent.com/webpack/multi-loader/master/README.md
edit: https://github.com/webpack/multi-loader/edit/master/README.md
---
# multi-loader

这个loader多次需要一个模块，每次被加载一个不同的loader。像在多入口点中，导出最后一个loader的导出。

普通用户可能不需要这个loader，但它与其它loader结合使用还是很有用的。

例：

``` javascript
var multi = require("multi-loader");
{
	module: {
		loaders: [
			{
				test: /\.css$/,
				// Add CSS to the DOM
				// and
				// Return the raw content
				loader: multi(
					"style-loader!css-loader!autoprefixer-loader",
					"raw-loader"
				)
			}
		]
	}
}
```

## License

MIT (http://www.opensource.org/licenses/mit-license.php)

***

> 原文：https://webpack.js.org/loaders/multi-loader/
