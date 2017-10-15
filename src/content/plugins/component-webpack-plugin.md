---
title: ComponentWebpackPlugin
source: https://raw.githubusercontent.com/webpack-contrib/component-webpack-plugin/master/README.md
edit: https://github.com/webpack-contrib/component-webpack-plugin/edit/master/README.md
repo: https://github.com/webpack-contrib/component-webpack-plugin
---


**尚未维护！**

## 用法

``` javascript
var ComponentPlugin = require("component-webpack-plugin");
module.exports = {
	plugins: [
		new ComponentPlugin();
	]
}
```

## 高级用法

``` javascript
var ComponentPlugin = require("component-webpack-plugin");
module.exports = {
	plugins: [
		new ComponentPlugin({
			// 从 component.json 中加载 xyz 字段 in component.json
			xyz: true,
			// 这等同于：xyz: "[file]"

			// 使用 xyz-loader 加载 xyz 字段
			xyz: "!xyz-loader![file]",

			// 默认为：
			// styles: "!style-loader!css-loader![file]"
		}, [
			// 查找路径
			"component"
		]);
	]
}
```


## License

MIT (http://www.opensource.org/licenses/mit-license.php)

***

> 原文：https://webpack.js.org/plugins/component-webpack-plugin/
