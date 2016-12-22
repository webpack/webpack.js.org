---
title: 概念
sort: 1
contributors:
  - TheLarkInn
  - jhnns
  - grgur
  - dear-lizhihua
---

*webpack* 是一个现代的 JavaScript 应用_模块打包器(module bundler)_。它有着[难以置信的配置](/configuration)，然而，我们认为你必须在开始前先了解 **四个核心概念**！

作为您的 webpack 学习旅程的一部分，我们写这篇文档目的在于向你传递这些概念的**高度**概述，同时仍然提供特定概念的相关用例。

## 入口(Entry)

webpack 将创建所有应用程序依赖关系图表(dependency graph)。图表的起点被称之为_入口起点(entry point)_。_入口起点_告诉 webpack _从哪里开始_，并遵循着依赖关系图表知道_打包什么_。可以将您的应用_入口起点_认为是 **根上下文(contextual root)** 或 **app 第一个启动文件**。

在 webpack 我们在 [webpack 配置对象](/configuration)中使用 `entry` 属性来定义 _入口_。

接下来我们看一个最简单的例子：

**webpack.config.js**

```javascript
module.exports = {
  entry: './path/to/my/entry/file.js'
};
```

这里有多种方式声明应用程序所需的特定 `entry` 属性。

[了解更多！](/concepts/entry-points)

## 出口(Output)

一旦你已经将所有 资源(assets) 打包在一起，我们仍然需要告诉 webpack 在**哪里**打包我们的应用。wepback 的 `output` 属性描述了**如何处理打包代码**。

**webpack.config.js**

```javascript
var path = require('path');

module.exports = {
  entry: './path/to/my/entry/file.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js'
  }
};
```

在上面例子中，我们正在通过 `output.filename` 和 `output.path` 属性来描述 webpack 包的名称，以及我们想要 生成(emit) 在哪里。

T> 你可能看到项目**生成(emitted 或 emit)**贯穿我们整个文档和[插件 API](/api/plugins)。它是“生产(produced) 或 排放(discharged)”的特殊术语。

 `output` 属性具有[更多可配置的特性](/configuration/output)，但让我们花一些时间了解 `output` 属性的一些最常见的用例。

[了解更多！](/concepts/output)


## 加载器(Loader)

webpack 的目标是，让项目中的所有资源都成为 **webpack** 的关注点，而浏览器不需要考虑这些（这并不意味着资源都必须打包在一起）。 webpack 把 [每个文件(.css, .html, .scss, .jpg, etc.) 都作为模块](/concepts/modules) 处理。然而 webpack **只了解 JavaScript**。

**因为文件已被添加到了依赖图表，所以 webpack 加载器会_将这些文件转换为模块_。**

webpack 配置在更高层面有两个目标。

1. 识别出(identify)应该被特定的加载器转换(transform)的文件
2. 转换能够被添加到依赖图表的文件（并且最终打包）(`use` 属性)

**webpack.config.js**

```javascript
var path = require('path');

const config = {
  entry: './path/to/my/entry/file.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js'
  },
  module: {
    rules: [
      {test: /\.(js|jsx)$/, use: 'babel-loader'}
    ]
  }
};
```

以上配置中，我们定义了为一个独立的 module 定义了 `rules` 属性，里面包含两个必须属性：`test` 和 `use`。这可以告诉 webpack 编译器(compiler) 如下：

> “嘿，webpack 编译器，当你碰到「在 `require()`/`import` 语句中被解析为 '.js' 或 '.jsx' 的路径」时，在你把它们添加并打包之前，要先**使用** `babel-loader` 去转换”。

W> 重要的是要记得，在 webpack 配置中定义 loader 时，要定义在 `module.rules` 中，而不是 `rules`。在定义错时 webpack 会提出严重的警告。

我们还有尚未提到的 loader，可以设定更多特定属性。

[了解更多！](/concepts/loaders)

## 插件(Plugins)

由于加载器仅基于单个文件执行转换，`插件`最常用于（但不限于）在打包模块的“编译(compilation)”和“分块(chunk)”时执行操作和自定义功能[（查看更多）](/concepts/plugins)。webpack 的插件系统[极其强大和可定制](/api/plugins)。

为了使用插件，你只需要 `require()` 它们，并且把它们添加到 `plugins` 数组。多数插件可以通过选项(option)自定义。由于你可以在一个配置多次使用插件用于不同的目的，因此你需要使用 `new` 来创建插件的实例，并且调用插件。

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
    rules: [
      {test: /\.(js|jsx)$/, use: 'babel-loader'}
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
};

module.exports = config;
```

webpack 提供许多开箱可用的插件！查阅我们的[插件列表](/plugins)展示更多信息。

在 webpack 配置中使用插件是直接的，然而有很多用例值得我们深入讨论。

[了解更多！](/concepts/plugins)

***

> 原文：https://webpack.js.org/concepts/