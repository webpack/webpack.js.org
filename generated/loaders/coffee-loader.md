---
title: coffee-loader
source: https://raw.githubusercontent.com/webpack/coffee-loader/master/README.md
edit: https://github.com/webpack/coffee-loader/edit/master/README.md
---
# 对于webpack的coffee-script的载入器

## 使用

``` javascript
var exportsOfFile = require("coffee-loader!./file.coffee");
// => 返回file.coffeee执行和编译结果的导出

var exportsOfFile2 = require("coffee-loader?literate!./file.litcoffee");
// 也可以编译字面上的文件
```

[文档：使用载入器](http://webpack.github.io/docs/using-loaders.html)

### 推荐配置

``` javascript
{
	module: {
		loaders: [
			{ test: /\.coffee$/, loader: "coffee-loader" },
			{ test: /\.(coffee\.md|litcoffee)$/, loader: "coffee-loader?literate" }
		]
	}
}
```

## 证书

MIT (http://www.opensource.org/licenses/mit-license.php)

***

> 原文：https://webpack.js.org/loaders/coffee-loader/