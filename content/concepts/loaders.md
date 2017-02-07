---
title: 加载器(Loaders)
sort: 4
contributors:
  - manekinekko
  - ev1stensberg
  - SpaceK33z
  - gangachris
  - TheLarkInn
  - simon04
---

loader 是对应用程序中资源文件进行转换。它们是（运行在 Node.js 中的）函数，可以将资源文件作为参数的来源，然后返回新的资源文件。

## 示例

例如，你可以使用 loader 告诉 webpack 加载 CSS 文件，或者将 TypeScript 转为 JavaScript。首先，安装相对应的 loader：

```
npm install --save-dev css-loader
npm install --save-dev ts-loader
```

其次，配置 `webpack.config.js`，对每个 `.css` 文件使用 [`css-loader`](/loaders/css-loader)，然后类似地，对每个 `.ts` 文件使用 `ts-loader`：

**webpack.config.js**

```js-with-links-with-details
module.exports = {
  module: {
    rules: [
      {test: /\.css$/, use: ['css-loader'](/loaders/css-loader)},
      {test: /\.ts$/, use: ['ts-loader'](https://github.com/TypeStrong/ts-loader)}
    ]
  }
};
```

注意，根据[配置选项](/configuration#options)，下面的规范定义了同等的 loader 用法：

```js-with-links-with-details
{test: /\.css$/, [loader](/configuration/module#rule-loader): 'css-loader'}
// or equivalently
{test: /\.css$/, [use](/configuration/module#rule-use): 'css-loader'}
// or equivalently
{test: /\.css$/, [use](/configuration/module#rule-use): {
  loader: 'css-loader',
  options: {}
}}
```

## 配置

在你的应用程序中，有三种方式使用 loader：

* 通过配置
* 在 `require` 语句中显示使用
* 通过 CLI

### 通过 `webpack.config.js`

[`module.rules`](https://webpack.js.org/configuration/module/#module-rules) 允许你在 webpack 配置中指定几个 loader。

这是展示 loader 的一种简明的方式，并且有助于简洁代码，以及对每个相应的 loader 有一个完整的概述。

```js
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader'},
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
        ]
      }
    ]
  }
```

### 通过 `require`

可以在 `require` 语句（或 `define`, `require.ensure`, 等语句）中指定 loader。使用 `!` 将资源中的 loader 分开。分开的每个部分都相对于当前目录解析。

```js
require('style-loader!css-loader?modules!./styles.css');
```

通过前置所有规则及使用 `!`，可以对应覆盖到配置中的任意 loader。

选项可以传递查询参数，就像在 web 中那样（`?key=value&foo=bar`）。也可以使用 JSON 对象（`?{"key":"value","foo":"bar"}`）。

T> 尽可能使用 `module.rules`，因为这样可以在源码中减少引用，并且可以更快调试和定位 loader，避免代码越来越糟。

### 通过 CLI

可选项，你也可以通过 CLI 使用 loader：

```sh
webpack --module-bind jade --module-bind 'css=style!css'
```

这会对 `.jade` 文件使用 `jade-loader`，对 `.css` 文件使用 [`style-loader`](/loaders/style-loader) 和 [`css-loader`](/loaders/css-loader)。

## Loader 特性

* loader 支持链式传递。能够对资源使用流水线(pipeline)。loader 链式地按照先后顺序进行编译。loader 链中的第一个 loader 返回值给下一个 loader。在最后一个 loader，返回 webpack 所预期的 JavaScript。
* loader 可以是同步或异步函数。
* loader 运行在 Node.js 中，并且能够执行任何可能的操作。
* loader 接收查询参数。用于 loader 间传递配置。
* loader 也能够使用 `options` 对象进行配置。
* 除了使用 `package.json` 常见的 `main` 属性，还可以将普通的 npm 模块导出为 loader，做法是在 `package.json` 里定义一个 loader 字段。
* 插件(plugin)可以为 loader 带来更多特性。
* loader 能够产生额外的任意文件。

loader 通过（loader）预处理函数，为 JavaScript 生态系统提供了更多有力功能。用户现在可以更加灵活的引入细粒度逻辑，例如压缩(compression)、打包(package)、语言翻译(language translation)和[其他更多](/loaders)。

## 解析 Loader

loader 遵循标准的[模块解析](/concepts/module-resolution/)。多数情况下，loader 将从[模块路径](/concepts/module-resolution/#module-paths)（通常将模块路径认为是 `npm install`, `node_modules`）解析。

[如何编写模块？](/development/how-to-write-a-loader)loader 模块需要导出为一个函数，并且使用 Node.js 兼容的 JavaScript 编写。在通常情况下，你会使用 npm 来管理 loader，但是你也可以将 loader 模块作为应用程序中的文件。

按照约定，loader 通常被命名为 `XXX-loader`，其中 `XXX` 是上下文的名称，例如 `json-loader`。

loader 的名称约定和优先搜索顺序，由 webpack 配置 API 中的  [`resolveLoader.moduleTemplates`](/configuration/resolve#resolveloader) 定义。

***

> 原文：https://webpack.js.org/concepts/loaders/