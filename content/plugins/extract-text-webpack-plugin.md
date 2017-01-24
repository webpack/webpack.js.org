---
title: extract-text-webpack-plugin
---

# extract text plugin for webpack 2

API 从版本1起已经改变。用于 webpack 1 的版本，请看[the README in the webpack-1 branch](https://github.com/webpack/extract-text-webpack-plugin/blob/webpack-1/README.md)。

## 安装

> 你可以用 [npm](https://nodejs.org/en/) 或者 [yarn](https://yarnpkg.com/)安装它。

```sh
npm install --save-dev extract-text-webpack-plugin
```
or
```sh
yarn add --dev extract-text-webpack-plugin
```

## css的使用例子

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

它会将所有的 入口chunk (entry chunks) 中的 `require("style.css")` 移动到分开的 css 文件。因此，你的样式不再内联到 javascript 里面，但会放到一个单独的 css 包文件 (`styles.css`)当中。 如果你的样式文件大小较大，这会更快，因为样式文件会跟 javascript 包并行加载。

优点:

* 更少 style 标签 (旧版本的 IE 浏览器有限制)
*  CSS SourceMap (使用 `devtool: "source-map"` 和 `css-loader?sourceMap` 配置)
* CSS 请求并行
* CSS 单独缓存
* 更快的浏览器运行时 (更少代码和 DOM 的运行)

警告:

* 额外的 HTTP 请求
* 更长的编译时间
* 更复杂的配置
* 没有运行时的公共路径修改
* 没有热替换

## API

``` javascript
new ExtractTextPlugin(options: filename | object)
```

* `options.filename: string` _(必填)_ 生成文件的文件名。会包含 `[name]`, `[id]` 和 `[contenthash]`
  * `[name]` chunk 的名称
  * `[id]` chunk 的数量 
  * `[contenthash]` 根据提取文件内容的哈希值
* `options.allChunks: boolean` 向所有额外的 chunk 提取（默认只提取初始加载模块）
* `options.disable: boolean` 禁用插件
* `options.id: string` 此插件实例的唯一id。 （仅限高级用途，默认情况下自动生成）

The `ExtractTextPlugin` 每个 入口chunk 都会生成一个文件，所以当你使用多个 入口chunk 的时候，你必须使用 `[name]`, `[id]` 或者 `[contenthash]`.

``` javascript
ExtractTextPlugin.extract(options: loader | object)
```

从已经有的加载器里创建一个提取的加载器，支持加载器类似，如 `{ loader: string; query: object }`。

* `options.loader: string | object | loader[]` _(必填)_ 加载器应用于将资源转换成 css 输出模块。
* `options.fallbackLoader: string | object | loader[]` 加载器应用于当 css 没有被提取(也就是一个额外的 chunk，当 `allChunks: false`)
* `options.publicPath: string` 对加载器的 `publicPath` 配置重写

这也是一个 提取函数的实例。如果你有多于一个 `ExtractTextPlugin` 插件 你应使用这种办法。

```javascript
let ExtractTextPlugin = require('extract-text-webpack-plugin');

// 多个提取实例
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
