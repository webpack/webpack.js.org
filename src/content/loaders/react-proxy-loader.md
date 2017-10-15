---
title: react-proxy-loader
source: https://raw.githubusercontent.com/webpack-contrib/react-proxy-loader/master/README.md
edit: https://github.com/webpack-contrib/react-proxy-loader/edit/master/README.md
repo: https://github.com/webpack-contrib/react-proxy-loader
---
Wraps a react component in a proxy component to enable Code Splitting (loads a react component and its dependencies on demand).

## 安装

```bash
npm install react-proxy-loader
```

## <a href="https://webpack.js.org/concepts/loaders">用法</a>

``` js
var Component = require("react-proxy-loader!./Component");
// => 返回代理组件（它按需加载。）
// （webpack 为此组件及其依赖项创建一个额外的 chunk）

var ComponentProxyMixin = require("react-proxy-loader!./Component").Mixin;
// => 返回代理组件的 mixin
// （这允许您为 proxy 的加载状态设置渲染）
var ComponentProxy = React.createClass({
	mixins: [ComponentProxyMixin],
	renderUnavailable: function() {
		return <p>Loading...</p>;
	}
});
```

代理是一个react组件。所有属性都将传输到包装组件。

## 配置

代替（或除了）内联 loader 调用之外，还可以在配置中指定代理组件：

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

##

您可以使用 `name` 查询参数为该 chunk 提供名称：

``` js
var Component = require("react-proxy-loader?name=chunkName!./Component");
```

## 维护人员

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


[npm]: https://img.shields.io/npm/v/react-proxy-loader.svg
[npm-url]: https://npmjs.com/package/react-proxy-loader

[deps]: https://david-dm.org/webpack-contrib/react-proxy-loader.svg
[deps-url]: https://david-dm.org/webpack-contrib/react-proxy-loader

[chat]: https://img.shields.io/badge/gitter-webpack%2Fwebpack-brightgreen.svg
[chat-url]: https://gitter.im/webpack/webpack

***

> 原文：https://webpack.js.org/loaders/react-proxy-loader/
