---
title: react-proxy-loader
source: https://raw.githubusercontent.com/webpack/react-proxy-loader/master/README.md
edit: https://github.com/webpack/react-proxy-loader/edit/master/README.md
---
# react-proxy-loader

在代理组件中封装react组件以启用代码拆分（加载一个react组件及其依赖需求）

## 安装

`npm install react-proxy-loader`

## 使用

[文档：使用loaders](http://webpack.github.io/docs/using-loaders.html)

``` js
var Component = require("react-proxy-loader!./Component");
// => 返回代理组件（它按需加载。）
// （webpack为此组件及其依赖项创建一个附加块）

var ComponentProxyMixin = require("react-proxy-loader!./Component").Mixin;
// => 返回代理组件的mixin
// （这允许您为prox的加载状态设置渲染）
var ComponentProxy = React.createClass({
	mixins: [ComponentProxyMixin],
	renderUnavailable: function() {
		return <p>Loading...</p>;
	}
});
```

代理是一个react组件。所有属性都将传输到包装组件。

### Configuration
### 配置

代替（或除了）内联加载器调用之外，还可以在配置中指定代理组件：

``` js
module.exports = {
	module: {
		loaders: [
			/* ... */
			{
				test: [
					/component\.jsx$/, // select component by RegExp
					/\.async\.jsx$/, // select component by extension
					"/abs/path/to/component.jsx" // absolute path to component
				],
				loader: "react-proxy-loader"
			}
		]
	}
};
```

### 块名称

您可以使用 `name` 查询参数为该块提供名称：

``` js
var Component = require("react-proxy-loader?name=chunkName!./Component");
```

# License

MIT (http://www.opensource.org/licenses/mit-license.php)

***

> 原文：https://webpack.js.org/loaders/react-proxy-loader/
