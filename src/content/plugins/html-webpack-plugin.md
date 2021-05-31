---
title: HtmlWebpackPlugin
contributors:
  - ampedandwired
  - simon04
  - Sibiraj-S
  - EugeneHlushko
translators:
  - jacob-lcs
  - QC-L
---

[`HtmlWebpackPlugin`](https://github.com/jantimon/html-webpack-plugin) 简化了 HTML 文件的创建，以便为你的 webpack 包提供服务。这对于那些文件名中包含哈希值，并且哈希值会随着每次编译而改变的 webpack 包特别有用。你可以让该插件为你生成一个 HTML 文件，使用 [lodash 模板](https://lodash.com/docs#template)提供模板，或者使用你自己的 [loader](/loaders)。

## 安装 {#installation}

```bash
npm install --save-dev html-webpack-plugin
```

## 基本用法 {#basic-usage}

<<<<<<< HEAD
该插件将为你生成一个 HTML5 文件，
在 body 中使用 `script` 标签引入你所有 webpack 生成的 bundle。
只需添加该插件到你的 webpack 配置中，如下所示：
=======
The plugin will generate an HTML5 file for you that includes all your webpack
bundles in the body using `script` tags. Add the plugin to your webpack
configuration as follows:
>>>>>>> b2b1b5d42c04cdccdc522c97cb2f4604e898a382

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: 'index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index_bundle.js',
  },
  plugins: [new HtmlWebpackPlugin()],
};
```

这将会生成一个包含以下内容的 `dist/index.html` 文件：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>webpack App</title>
  </head>
  <body>
    <script src="index_bundle.js"></script>
  </body>
</html>
```

如果你有多个 webpack 入口，他们都会在已生成 HTML 文件中的 `<script>` 标签内引入。

如果在 webpack 的输出中有任何 CSS 资源（例如，使用 [MiniCssExtractPlugin](/plugins/mini-css-extract-plugin/) 提取的 CSS），那么这些资源也会在 HTML 文件 `<head>` 元素中的 `<link>` 标签内引入。

## 配置 {#configuration}

获取所有的配置选项，请浏览[插件文档](https://github.com/jantimon/html-webpack-plugin#options)。

## 第三方插件 {#third-party-addons}

该插件支持第三方插件。详细列表参阅[文档](https://github.com/jantimon/html-webpack-plugin#plugins)。
