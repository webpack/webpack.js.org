---
title: 加载器(Loaders)
sort: 4
contributors:
  - manekinekko
  - ev1stensberg
  - SpaceK33z
  - gangachris
---

loader 是对应用程序中资源文件进行转换。它们是（运行在 Node.js 中的）函数，可以将资源文件作为参数的来源，然后返回新的资源文件。

例如，你可以使用 loader 告诉 webpack 加载 CSS 文件，或者将 TypeScript 转为 JavaScript。

## Loader 特性

* loader 支持链式传递。能够对资源使用流水线( pipeline)。loader 链式按照时间先后顺序进行编译。loader 链中的第一个 loader 返回值给下一个 loader。在最后一个 loader，webpack 按照预期的 JavaScript 返回。
* loader 可以是同步或异步函数。
* loader 运行在 Node.js 中，并且能够执行任何可能的操作。
* loader 接受查询参数。用于 loader 间传递配置。
* loader 也能够使用 `options` 对象进行配置。
* 除了直接使用 `package.json` 的 `main` 属性，还可以将普通的 npm 模块导出为 loader，做法是在 `package.json` 里定义一个 loader 字段。
* 插件可以给 loader 带来更多功能。
* loader 能够产生额外的任意文件。

loader 通过(loader)预处理函数，为 JavaScript 生态系统提供了更多有力功能。用户现在可以更加灵活的引入细粒度逻辑，例如压缩、打包、语言翻译和[其他更多](/loaders)。

## 解析 Loader

loader [解析类似于模块](/concepts/module-resolution/)。loader 模块需要导出一个函数，并且使用兼容 Node.js 的 JavaScript 编写。在通常情况下，你可以使用 npm 管理 loader，但是你也可以在应用程序中将 loader 作为文件使用。

### 引用 Loader

按照约定，loader 通常被命名为 `XXX-loader`，`XXX` 是上下文的名称，例如 `json-loader`。

loader 的名称约定和优先搜索顺序，由 webpack 配置 API 中的  [`resolveLoader.moduleTemplates`](/configuration/resolve#resolveloader) 定义。

***

> 原文：https://webpack.js.org/concepts/loaders/