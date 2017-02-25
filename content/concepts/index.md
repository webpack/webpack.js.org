---
title: 概念
sort: 1
contributors:
  - TheLarkInn
  - jhnns
  - grgur
  - johnstew
---

*webpack* 是一个现代的 JavaScript 应用程序的_模块打包器(module bundler)_。它是[高度可配置的](/configuration)，然而，我们认为你必须在开始前先了解**四个核心概念**！

作为您的 webpack 学习旅程的一部分，我们写这篇文档目的在于向你传递这些概念的**高度**概述，同时仍然提供特定概念的相关用例。

## 入口(Entry)

webpack 将创建所有应用程序的依赖关系图表(dependency graph)。图表的起点被称之为_入口起点(entry point)_。_入口起点_告诉 webpack _从哪里开始_，并遵循着依赖关系图表知道_要打包什么_。可以将您应用程序的_入口起点_认为是**根上下文(contextual root)**或 **app 第一个启动文件**。

在 webpack 中，我们使用 [webpack 配置对象(webpack configuration object)](/configuration) 中的 `entry` 属性来定义_入口_。

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

将所有的资源(assets)归拢在一起后，我们还需要告诉 webpack **在哪里**打包我们的应用程序。webpack 的 `output` 属性描述了**如何处理归拢在一起的代码**(bundled code)。

**webpack.config.js**

```javascript
const path = require('path');

module.exports = {
  entry: './path/to/my/entry/file.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js'
  }
};
```

在上面例子中，我们正在通过 `output.filename` 和 `output.path` 属性来描述 webpack bundle 的名称，以及我们想要生成(emit)在哪里。

T> 你可能看到项目**生成(emitted 或 emit)**贯穿我们整个文档和[插件 API](/api/plugins)。它是“生产(produced) 或 排放(discharged)”的特殊术语。

 `output` 属性还有[更多可配置的特性](/configuration/output)，但让我们花一些时间先了解一些 `output` 属性的最常见的用例。

[了解更多！](/concepts/output)


## 加载器(Loaders)

webpack 的目标是，让 **webpack** 聚焦于项目中的所有资源(asset)，而浏览器不需要关注考虑这些（这并不意味着资源(asset)都必须打包在一起）。webpack 把[每个文件(.css, .html, .scss, .jpg, etc.) 都作为模块](/concepts/modules)处理。然而 webpack **只理解 JavaScript**。

**webpack loader 会_将这些文件转换为模块_，而转换后的文件会被添加到依赖图表中。**

在更高层面，webpack 的配置有两个目标。

1. 识别出(identify)应该被对应的 loader 进行转换(transform)的那些文件
2. 由于进行过文件转换，所以能够将被转换的文件添加到依赖图表（并且最终添加到 bundle 中）(`use` 属性)

**webpack.config.js**

```javascript
const path = require('path');

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

module.exports = config;
```

以上配置中，我们对一个单独的 module 对象定义了 `rules` 属性，里面包含两个必须属性：`test` 和 `use`。这可以告诉 webpack compiler 如下：

> “嘿，webpack compiler，当你碰到「在 `require()`/`import` 语句中被解析为 '.js' 或 '.jsx' 的路径」时，在你把它们添加并打包之前，要先**使用** `babel-loader` 去转换”。

W> 重要的是要记得，在 webpack 配置中定义 loader 时，要定义在 `module.rules` 中，而不是 `rules`。在定义错时 webpack 会给出严重的警告。

我们还有尚未提到的 loader，可以设定更多特定属性。

[了解更多！](/concepts/loaders)

## 插件(Plugins)

由于 loader 仅在每个文件的基础上执行转换，而 `插件(plugins)` 最常用于（但不限于）在打包模块的“compilation”和“chunk”生命周期执行操作和自定义功能[（查看更多）](/concepts/plugins)。webpack 的插件系统[极其强大和可定制化](/api/plugins)。

想要使用一个插件，你只需要 `require()` 它，然后把它添加到 `plugins` 数组中。多数插件可以通过选项(option)自定义。你也可以在一个配置文件中因为不同目的而多次使用同一个插件，你需要使用 `new` 创建实例来调用它。

**webpack.config.js**

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const webpack = require('webpack'); //to access built-in plugins
const path = require('path');

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
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
};

module.exports = config;
```

webpack 提供许多开箱可用的插件！查阅我们的[插件列表](/plugins)展示更多信息。

在 webpack 配置中使用插件是简单直接的，然而也有很多值得我们进一步讨论的用例。

[了解更多！](/concepts/plugins)

***

> 原文：https://webpack.js.org/concepts/