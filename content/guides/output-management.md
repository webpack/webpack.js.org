---
title: 管理输出
sort: 4
contributors:
  - skipjack
---

最初，管理 webpack 的[输出](/configuration/output)并在 HTML 文件中引入这些输出文件，可能看起来并不困难，然而一旦开始对[文件名使用哈希(hash)](/guides/caching)]并输出[多个 bundle](/guides/code-splitting)，一切就开始变得毫无头绪。然而，没有必要担心，因为通过一些插件，会使这个过程更容易操控。

首先，让我们来看没有使用这些插件时的初始情况：

__index.html__

``` html
<!doctype html>

<html>
  <head>
    <title>Output Management</title>
    <link rel="shortcut icon" href="/favicon.ico" />
    <link rel="stylesheet" href="/styles.min.css" />
    <script src="/vendor.bundle.js"></script>
  </head>
  <body>
    <script src="/app.bundle.js"></script>
  </body>
</html>
```

在这里，我们加载了一个 favicon，以及我们的样式表（通过使用 [`ExtractTextWebpackPlugin`](/plugins/extract-text-webpack-plugin)提取），以及任何 library（分离到[一个单独的 bundle](/guides/code-splitting)），最后，还有我们的主要 bundle(main bundle)（即 `app.bundle.js`）。一切都是可以正常运行的，但是如果我们修改入口起点的名称，会发生​​什么？如果我们决定充分利用[更优的缓存实践](/guides/caching)，会发生​​什么？


## 自动生成 HTML(Auto-Generated HTML)

随着 [`HtmlWebpackPlugin`](/plugins/html-webpack-plugin) 的到来挽救了我们麻烦的局面。通过这个插件，你可以停止手动在输出文件中使用硬编码(hard-coding)的方式，来管理输出文件名，而是可以休息下，因为 webpack 会自动生成一个 `index.html` 文件。我们来看看你需要添加到配置中的内容：

__webpack.config.js__

``` js
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.js',
    vendor: [ 'react', 'react-dom' ]
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Output Management',
      favicon: './favicon.ico'
    })
  ]
};
```

这些设置会生成和之前示例相同的 HTML，除了提取的 CSS。插件允许多种设置，包括扩展模板、压缩输出和修改脚本注入站点。更多详细信息，请查看[对应文档](/plugins/html-webpack-plugin)。

T> 查看 [`HTMLWebpackTemplate`](https://github.com/jaketrent/html-webpack-template) 扩展，以获得更多选项，包括直接插入 `appMountId`, `meta` 标签和 `baseHref` 等选项。


## 多个 HTML 文件

对于一个多页面 web 应用程序，你可以使用 [`MultipageWebpackPlugin`](https://github.com/mutualofomaha/multipage-webpack-plugin) 来生成多个 HTML 文件。此插件功能类似于 `html-webpack-plugin`，事实上在其内部也同样用到 HtmlWebpackPlugin，然而，MultipageWebpackPlugin 可以为每个入口起点生成一个 HTML 文件。


## Manifest

现在我们回顾之前，问一个更高级的问题 - 这些插件是如何知道应当吐露出对应的文件？答案是，通过 manifest，webpack 能够对「你的模块映射到输出 bundle 的过程」保持追踪。如果你对通过其他方式来管理 webpack 的[输出](/configuration/output)更感兴趣，那么首先了解 manifest 是个好的开始。

通过使用 [`WebpackManifestPlugin`](https://github.com/danethurber/webpack-manifest-plugin) 或 [`ChunkManifestPlugin`](https://github.com/soundcloud/chunk-manifest-webpack-plugin)，可以直接将数据提取到一个 json 文件，以供使用。使用 `ChunkManifestPlugin`，你可以指定 manifest 的文件名称，指定暴露于哪个变量，以及是否通过 `html-webpack-plugin` 内联 manifest：

``` js
new ChunkManifestPlugin({
  filename: 'manifest.json',
  manifestVariable: 'webpackManifest',
  inlineManifest: false
})
```

查看 [manifest 的概念页面](/concepts/manifest)，以了解更多背景知识，以及在[缓存指南](/guides/caching)中，了解如何与长效缓存(long term caching)结合在一起。

***

> 原文：https://webpack.js.org/guides/output-management/
