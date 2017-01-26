---
title: extract-text-webpack-plugin
---

# extract text plugin for webpack 2

和 webpack 1 版本相比 API 已经发生改变。对于 webpack 1 版本，请看 [webpack-1 分支的 README 文档](https://github.com/webpack/extract-text-webpack-plugin/blob/webpack-1/README.md)。

## 安装

> 可以使用 [npm](https://nodejs.org/en/) 或者 [yarn](https://yarnpkg.com/) 来安装。

```sh
npm install --save-dev extract-text-webpack-plugin
```
or
```sh
yarn add --dev extract-text-webpack-plugin
```

## CSS 的用法示例

``` javascript
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
	module: {
		loaders: [
			{ test: /\.css$/, loader: ExtractTextPlugin.extract({
				fallbackLoader: "style-loader",
				loader: "css-loader"
			}) }
		]
	},
	plugins: [
		new ExtractTextPlugin("styles.css")
	]
}
```

它会将每个「入口 chunk(entry chunks)」中的 `require("style.css")` 移动到分离的 css 输出文件中。所以，你的样式不再内联到 javascript 里面，而是分离到 css bundle(`styles.css`) 文件中。如果样式总量很大，加载就会变得很快，因为样式 bundle 会并行加载到 javascript bundle 中。

优势：

* 更少的 style 标签（旧版本的 IE 浏览器对 style 标签数量有限制）
* CSS SourceMap（使用 `devtool: "source-map"` 和 `css-loader?sourceMap` 配置）
* CSS 请求并行
* CSS 单独缓存
* 更快的浏览器运行时(runtime)（减少代码和减少 DOM 操作）

警告：

* 额外的 HTTP 请求
* 更长的编译时间
* 更复杂的配置
* 没有运行时(runtime)的公共路径修改
* 没有模块热替换

## API

``` javascript
new ExtractTextPlugin(options: filename | object)
```

* `options.filename: string` _（必选）_ 生成文件的文件名。可能包含 `[name]`, `[id]` 和 `[contenthash]`
  * `[name]` chunk 的名称
  * `[id]` chunk 的数量 
  * `[contenthash]` 提取文件内容的哈希值
* `options.allChunks: boolean` 向所有额外的 chunk 中提取（默认情况下，只从初始chunk 提取）
* `options.disable: boolean` 禁用插件
* `options.id: string` 此插件实例的唯一 id。（仅限于高级用法，默认情况下自动生成）

`ExtractTextPlugin` 为每个入口 chunk 生成一个输出文件，所以在使用多个入口时，你必须使用 `[name]`, `[id]` 或者 `[contenthash]`。

``` javascript
ExtractTextPlugin.extract(options: loader | object)
```

从已有的 loader 中创建一个用于提取的 loader，支持的 loader 如 `{ loader: string; query: object }` 这种类型。

* `options.loader: string | object | loader[]` _(必选)_loader 用于将资源转换为 css 导出模块
* `options.fallbackLoader: string | object | loader[]` loader 用于在 css 没有被提取时(例如，在 `allChunks: false` 时的额外的 chunk)
* `options.publicPath: string` 重写 loader 的 `publicPath` 设置

在 extract 实例还有一个 extract 函数。如果有多个 `ExtractTextPlugin` 实例，你应该使用此方法。

```javascript
let ExtractTextPlugin = require('extract-text-webpack-plugin');

// 多个 extract 实例
let extractCSS = new ExtractTextPlugin('stylesheets/[name].css');
let extractLESS = new ExtractTextPlugin('stylesheets/[name].less');

module.exports = {
  ...
  module: {
    loaders: [
      { test: /\.scss$/i, loader: extractCSS.extract(['css-loader','sass-loader']) },
      { test: /\.less$/i, loader: extractLESS.extract(['css-loader','less-loader']) },
      ...
    ]
  },
  plugins: [
    extractCSS,
    extractLESS
  ]
};
```

## License

MIT (http://www.opensource.org/licenses/mit-license.php)
