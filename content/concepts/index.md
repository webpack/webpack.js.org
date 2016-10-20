---
title: 介绍
contributors:
  - TheLarkInn
  - dear-lizhihua
---

*webpack* 是一个现代的 JavaScript 应用_模块打包器(module bundler)_。它有着[难以置信的配置](/configuration)，然而，我们认为你必须在开始前先了解 **4 个核心概念**！

作为您的 webpack 学习旅程的一部分，我们写这篇文档目的在于向你传递这些概念的**高度**概述，同时仍然提供特定概念的相关用例。

## 入口(Entry)

webpack 将创建所有应用程序 依赖关系(dependency) 的 图表(graph)。图表的起点被称之为 _入口(entry point)_。_入口_告诉 webpack _从哪里开始_，并遵循着图表的依赖关系知道打包什么。可以将您的应用_入口_认为是 **根上下文(contextual root)** 或 **app第一个启动文件**。

在 webpack 我们在[webpack 配置对象](/configuration)中使用 `entry` 属性来定义 _入口_。

接下来我们看一个最简单的例子：

**webpack.config.js**

```javascript
const config = {
  entry: './path/to/my/entry/file.js'
};

module.exports = config;
```

这里有多种方式声明应用程序所需的那些特定 `entry` 属性。

[**了解更多！**](/concepts/entry-points)

## 出口(Output)

一旦你已经将所有 资源(assets) 打包在一起，我们仍然需要告诉 webpack 在 **哪里** 打包我们的应用。wepback 的 `output` 属性描述了**如何处理打包代码**。

**webpack.config.js**

```javascript
const config = {
  entry: './path/to/my/entry/file.js',
  output: {
    filename: 'my-first-webpack.bundle.js',
    path: './dist'
  }
};
```

在上面例子中，我们正在通过 `output.filename` 和 `output.path` 属性来描述 webpack 包的名称，以及我们想要 生成(emit) 在哪里。

T> 你可能看到项目 **生成(emitted 或 emit)** 贯穿我们整个文档和[插件 API](/api/plugins)。它是“生产(produced) 或 排放(discharged)”的特殊术语。

 `output` 属性有[很多可配置的特性](/configuration)，让我们花费一些时间理解 `output` 属性中一些最常见的用例。

[**了解更多！**](/concepts/output)


## 加载器(Loaders)

让您项目中的所有资源都成为 **webpack** 的关注点，而浏览器不需要考虑这些（这并不意味着资源都必须打包在一起）是 webpack 的目标。 webpack 把 [每个文件(.css, .html, .scss, .jpg, etc.) 都作为模块](/concepts/modules) 处理。然而 webpack **只了解 JavaScript**。

**因为资源已被添加到了依赖图表，所以加载器会告诉 webpack _如何把这些文件当作模块处理_。**

webpack 配置在更高层面有两个目标。

1. 识别出(identify)应该被特定的加载器转换(transform)的文件
2. 转换能够被添加到依赖图表的文件（并且最终打包）(`loader` 属性)

**webpack.config.js**

```javascript
const config = {
  entry: './path/to/my/entry/file.js',
  output: {
    filename: 'my-first-webpack.bundle.js',
    path: './dist'
  },
  module: {
    loaders: [
      {test: /\.(js|jsx)$/, loader: 'babel-loader'}
    ]
  }
};
```

以上配置中，我们定义了 loader 的两个必选属性：`test` 和 `loader`。它告诉 webpack 编译器(compiler) 如下：

> “嘿，webpack 编译器，当你碰到「在 require() 语句中被解析为 '.js' 或 '.jsx' 的路径」时，在你把它们打包在一起之前，要先使用 babel-loader 去转换”。

W> 重要的是要记得，在 webpack 配置中定义 loader 时，要定义在 `module.loaders` 中，而不是 `loaders`。

我们还有尚未提到的 loader，可以设定更多特定属性。

[**了解更多！**](/concepts/loaders)

## 插件(Plugins)

由于加载器仅基于单个文件执行转换，插件最常用于（但不限于）在打包模块的“编译(compilation)”和“组块(chunk)”时执行操作和自定义功能[（查看更多）](/concepts/plugins)。webpack 的插件系统[极其强大和可定制](/api/plugins)。

为了使用插件，你只需要 `require()` 它们，并且在 `plugins` 数组中添加。由于多数插件可以通过传入选项(option)自定义，因此你要使用 `new` 创建它的实例来调用插件。

**webpack.config.js**

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const webpack = require('webpack'); //to access built-in plugins

const config = {
  entry: './path/to/my/entry/file.js',
  output: {
    filename: 'my-first-webpack.bundle.js',
    path: './dist'
  },
  module: {
    loaders: [
      {test: /\.(js|jsx)$/, loader: 'babel-loader'}
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
};

module.exports = config;
```

webpack 提供许多开箱可用的插件，查阅我们的[插件列表](https://webpack.github.io/docs/list-of-plugins.html)展示更多信息。

在 webpack 配置中使用插件是直接的，然而有很多用例值得我们深入讨论。

[**了解更多！**](/concepts/plugins)
