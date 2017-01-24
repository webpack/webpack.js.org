---
title: coffee-loader
source: https://raw.githubusercontent.com/webpack/coffee-loader/master/README.md
edit: https://github.com/webpack/coffee-loader/edit/master/README.md
---
# webpack 中 coffee-script 的加载器(loader)
## 用法

``` javascript
var exportsOfFile = require("coffee-loader!./file.coffee");
// => 返回执行和编译 file.coffee 后的导出对象

var exportsOfFile2 = require("coffee-loader?literate!./file.litcoffee");
// 也可以编译 literate 文件
```

[文档：使用 loader](http://webpack.github.io/docs/using-loaders.html)

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

## License

MIT (http://www.opensource.org/licenses/mit-license.php)

***

> 原文：https://webpack.js.org/loaders/coffee-loader/
