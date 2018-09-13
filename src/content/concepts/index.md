---
title: 概念
sort: 1
contributors:
  - TheLarkInn
  - jhnns
  - grgur
  - johnstew
  - jimrfenner
  - TheDutchCoder
  - adambraimbridge
  - EugeneHlushko
---

本质上，*webpack* 是一个现代 JavaScript 应用程序的_静态模块打包器(module bundler)_。当 webpack 处理应用程序时，它会递归地构建一个_依赖关系图(dependency graph)_，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 _bundle_。

T> 可以从[这里](/concepts/modules)了解更多关于 JavaScript 模块和 webpack 模块的信息。

从 webpack v4.0.0 开始，可以不用引入一个配置文件。然而，webpack 仍然还是[高度可配置的](/configuration)。在开始前你需要先理解四个**核心概念**：

- 入口(entry)
- 输出(output)
- loader
- 插件(plugins)

本文档旨在给出这些概念的**高度**概述，同时提供具体概念的详尽相关用例。


## 入口(entry)

**入口起点(entry point)**指示 webpack 应该使用哪个模块，来作为构建其内部*依赖图*的开始。进入入口起点后，webpack 会找出有哪些模块和库是入口起点（直接和间接）依赖的。

每个依赖项随即被处理，最后输出到称之为 *bundles* 的文件中，我们将在下一章节详细讨论这个过程。

可以通过在 [webpack 配置](/configuration)中配置 `entry` 属性，来指定一个入口起点（或多个入口起点）。默认值为 `./src`。

接下来我们看一个 `entry` 配置的最简单例子：

__webpack.config.js__

``` js
module.exports = {
  entry: './path/to/my/entry/file.js'
};
```

T> 根据应用程序的特定需求，可以以多种方式配置 `entry` 属性。从[入口起点](/concepts/entry-points)章节可以了解更多信息。


## 出口(output)

**output** 属性告诉 webpack 在哪里输出它所创建的 *bundles*，以及如何命名这些文件，默认值为 `./dist`。基本上，整个应用程序结构，都会被编译到你指定的输出路径的文件夹中。你可以通过在配置中指定一个 `output` 字段，来配置这些处理过程：

__webpack.config.js__

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

在上面的示例中，我们通过 `output.filename` 和 `output.path` 属性，来告诉 webpack bundle 的名称，以及我们想要 bundle 生成(emit)到哪里。可能你想要了解在代码最上面导入的 path 模块是什么，它是一个 [Node.js 核心模块](https://nodejs.org/api/modules.html)，用于操作文件路径。

T> 你可能会发现术语**生成(emitted 或 emit)**贯穿了我们整个文档和[插件 API](/api/plugins)。它是“生产(produced)”或“释放(discharged)”的特殊术语。

T> `output` 属性还有[更多可配置的特性](/configuration/output)，如果你想要了解更多关于 `output` 属性的概念，你可以通过[阅读概念章节](/concepts/output)来了解更多。


## loader

*loader* 让 webpack 能够去处理那些非 JavaScript 文件（webpack 自身只理解 JavaScript）。loader 可以将所有类型的文件转换为 webpack 能够处理的有效[模块](/concepts/modules)，然后你就可以利用 webpack 的打包能力，对它们进行处理。

本质上，webpack loader 将所有类型的文件，转换为应用程序的依赖图（和最终的 bundle）可以直接引用的模块。

W> 注意，loader 能够 `import` 导入任何类型的模块（例如 `.css` 文件），这是 webpack 特有的功能，其他打包程序或任务执行器的可能并不支持。我们认为这种语言扩展是很有必要的，因为这可以使开发人员创建出更准确的依赖关系图。

在更高层面，在 webpack 的配置中 __loader__ 有两个目标：

1. `test` 属性，用于标识出应该被对应的 loader 进行转换的某个或某些文件。
2. `use` 属性，表示进行转换时，应该使用哪个 loader。

__webpack.config.js__

```javascript
const path = require('path');

const config = {
  output: {
    filename: 'my-first-webpack.bundle.js'
  },
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  }
};

module.exports = config;
```

以上配置中，对一个单独的 module 对象定义了 `rules` 属性，里面包含两个必须属性：`test` 和 `use`。这告诉 webpack 编译器(compiler) 如下信息：

> “嘿，webpack 编译器，当你碰到「在 `require()`/`import` 语句中被解析为 '.txt' 的路径」时，在你对它打包之前，先**使用** `raw-loader` 转换一下。”

W> 重要的是要记得，**在 webpack 配置中定义 loader 时，要定义在 `module.rules` 中，而不是 `rules`**。然而，在定义错误时 webpack 会给出严重的警告。为了使你受益于此，如果没有按照正确方式去做，webpack 会“给出严重的警告”

loader 还有更多我们尚未提到的具体配置属性。

[了解更多！](/concepts/loaders)


## 插件(plugins)

loader 被用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量。[插件接口](/api/plugins)功能极其强大，可以用来处理各种各样的任务。

想要使用一个插件，你只需要 `require()` 它，然后把它添加到 `plugins` 数组中。多数插件可以通过选项(option)自定义。你也可以在一个配置文件中因为不同目的而多次使用同一个插件，这时需要通过使用 `new` 操作符来创建它的一个实例。

**webpack.config.js**

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装
const webpack = require('webpack'); // 用于访问内置插件

const config = {
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
};

module.exports = config;
```

webpack 提供许多开箱可用的插件！查阅我们的[插件列表](/plugins)获取更多信息。

在 webpack 配置中使用插件是简单直接的，然而也有很多值得我们进一步探讨的用例。

[了解更多！](/concepts/plugins)


## 模式

通过选择 `development` 或 `production` 之中的一个，来设置 `mode` 参数，你可以启用相应模式下的 webpack 内置的优化

```javascript
module.exports = {
  mode: 'production'
};
```

[了解更多！](/concepts/mode)
