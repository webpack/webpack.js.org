---
title: 插件(Plugins)
sort: 8
contributors:
  - sokra
  - skipjack
  - yatharthk
---

The `plugins` option is used to customize the webpack build process in a variety of ways. webpack comes with a variety built-in plugins available under `webpack.[plugin-name]`. See [this page](/plugins) for a list of plugins and documentation but note that there are a lot more out in the community.

T> Note: This page only discusses using plugins, however if you are interested in writing your own please visit [Writing a Plugin](/development/how-to-write-a-plugin/).


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
// 导入非 webpack 默认自带插件
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
