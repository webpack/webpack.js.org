---
title: 插件(Plugins)
sort: 10
contributors:
  - sokra
  - skipjack
  - yatharthk
  - byzyk
  - EugeneHlushko
  - snitin315
---

`plugins` 选项用于以各种方式自定义 webpack 构建过程。webpack 附带了各种内置插件，可以通过 `webpack.[plugin-name]` 访问这些插件。请查看 [插件页面](/plugins) 获取插件列表和对应文档，
但请注意这只是其中一部分，社区中还有许多插件。

T> 注意：本页面仅讨论使用插件，如果你有兴趣编写自己的插件，
请访问 [编写一个插件](/contribute/writing-a-plugin/) 页面。

## `plugins` {#plugins}

[`[Plugin]`](/plugins/)

一组 webpack 插件。例如，[`DefinePlugin`](/plugins/define-plugin/) 允许你创建可在编译时配置的全局常量。这对需要再开发环境构建和生产环境构建之间产生不同行为来说非常有用。
An array of webpack plugins. For example, [`DefinePlugin`](/plugins/define-plugin/) allows you to create global constants which can be configured at compile time. This can be useful for allowing different behavior between development builds and release builds.

**webpack.config.js**

```js
module.exports = {
  //...
  plugins: [
    new webpack.DefinePlugin({
      // Definitions...
    }),
  ],
};
```

一个复杂示例，使用多个插件，可能看起来就像这样：

**webpack.config.js**

```js
var webpack = require('webpack');
// 导入非 webpack 自带默认插件
var DashboardPlugin = require('webpack-dashboard/plugin');

// 在配置中添加插件
module.exports = {
  //...
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
   // 编译时(compile time)插件
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
    }),
   // webpack-dev-server 强化插件
    new DashboardPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
```
