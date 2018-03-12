---
title: 插件(Plugins)
sort: 8
contributors:
  - sokra
  - skipjack
  - yatharthk
---

`plugins` 选项用于以各种方式自定义 webpack 构建过程。webpack 附带了各种内置插件，可以通过 `webpack.[plugin-name]` 访问这些插件。请查看[这个页面](/plugins)获取插件列表和对应文档，但请注意这只是其中一部分，社区中还有许多插件。

T> 注意：本页面仅讨论使用插件，如果你有兴趣编写自己的插件，请访问[编写一个插件](/development/how-to-write-a-plugin/)页面。


## `plugins`

`array`

webpack 插件列表。例如，当多个 bundle 共享一些相同的依赖，`CommonsChunkPlugin` 有助于提取这些依赖到共享的 bundle 中，来避免重复打包。可以像这样添加：

```js
plugins: [
  new webpack.optimize.CommonsChunkPlugin({
    ...
  })
]
```

一个复杂示例，使用多个插件，可能看起来就像这样：

```js
var webpack = require('webpack');
// 导入非 webpack 自带默认插件
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var DashboardPlugin = require('webpack-dashboard/plugin');

// 在配置中添加插件
plugins: [
  // 构建优化插件
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: 'vendor-[hash].min.js',
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      drop_console: false,
    }
  }),
  new ExtractTextPlugin({
    filename: 'build.min.css',
    allChunks: true,
  }),
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  // 编译时(compile time)插件
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': '"production"',
  }),
  // webpack-dev-server 强化插件
  new DashboardPlugin(),
  new webpack.HotModuleReplacementPlugin(),
]
```

***

> 原文：https://webpack.js.org/configuration/plugins/
