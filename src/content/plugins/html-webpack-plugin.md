---
title: HtmlWebpackPlugin
contributors:
  - ampedandwired
  - simon04
---

[`HtmlWebpackPlugin`](https://github.com/jantimon/html-webpack-plugin)简化了HTML文件的创建，以便为你的webpack包提供服务。这对于在文件名中包含每次会随着编译而发生变化哈希的 webpack bundle 尤其有用。 你可以让插件为你生成一个HTML文件，使用[lodash模板](https://lodash.com/docs#template)提供你自己的模板，或使用你自己的[loader](/loaders)。


## 安装

``` bash
npm install --save-dev html-webpack-plugin
```


## 基本用法

该插件将为你生成一个 HTML5 文件，
其中包括使用 `script` 标签的 body 中的所有 webpack 包。
只需添加插件到你的 webpack 配置如下：

```javascript
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

var webpackConfig = {
  entry: 'index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index_bundle.js'
  },
  plugins: [new HtmlWebpackPlugin()]
};
```

这将会产生一个包含以下内容的文件 `dist/index.html`：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>webpack App</title>
  </head>
  <body>
    <script src="index_bundle.js"></script>
  </body>
</html>
```

如果你有多个 webpack 入口点，
他们都会在生成的HTML文件中的 `script` 标签内。

如果你有任何CSS assets 在webpack的输出中（例如，
利用[ExtractTextPlugin](/plugins/extract-text-webpack-plugin)提取CSS），
那么这些将被包含在HTML head中的`<link>`标签内。


## 配置

获取所有的配置选项，请浏览[插件文档](https://github.com/jantimon/html-webpack-plugin#configuration)。


## 第三方插件

这个插件支持第三方插件。详细列表参阅[文档](https://github.com/jantimon/html-webpack-plugin#third-party-addons)。

***

> 原文：https://webpack.js.org/plugins/html-webpack-plugin/
