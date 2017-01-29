---
title: 加载器(Loaders)
sort: 4
contributors:
  - manekinekko
  - ev1stensberg
  - SpaceK33z
  - gangachris
  - simon04
---

loader 是对应用程序中资源文件进行转换。它们是（运行在 Node.js 中的）函数，可以将资源文件作为参数的来源，然后返回新的资源文件。

## 示例

例如，你可以使用 loader 告诉 webpack 加载 CSS 文件，或者将 TypeScript 转为 JavaScript。首先，安装相对应的 loader：

```
npm install --save-dev css-loader
npm install --save-dev ts-loader
```

其次，配置 `webpack.config.js`，对每个 `.css` 文件使用 `css-loader`，然后类似地，对每个 `.ts` 文件使用 `ts-loader`：

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

## Loader 特性

* loader 支持链式传递。能够对资源使用流水线( pipeline)。loader 链式按照时间先后顺序进行编译。loader 链中的第一个 loader 返回值给下一个 loader。在最后一个 loader，webpack 按照预期的 JavaScript 返回。
* loader 可以是同步或异步函数。
* loader 运行在 Node.js 中，并且能够执行任何可能的操作。
* loader 接收查询参数。用于 loader 间传递配置。
* loader 也能够使用 `options` 对象进行配置。
* 除了直接使用 `package.json` 的 `main` 属性，还可以将普通的 npm 模块导出为 loader，做法是在 `package.json` 里定义一个 loader 字段。
* 插件可以给 loader 带来更多功能。
* loader 能够产生额外的任意文件。

loader 通过(loader)预处理函数，为 JavaScript 生态系统提供了更多有力功能。用户现在可以更加灵活的引入细粒度逻辑，例如压缩、打包、语言翻译和[其他更多](/loaders)。

## 解析 Loader

Loaders follow the standard [module resolution](/concepts/module-resolution/). In most cases you will be loaders from the [module path](/concepts/module-resolution/#module-paths) (think `npm install`, `node_modules`).

[How to write a loader?](/development/how-to-write-a-loader) A loader module is expected to export a function and to be written in Node.js compatible JavaScript. In the common case you manage loaders with npm, but you can also have loaders as files in your app.

按照约定，loader 通常被命名为 `XXX-loader`，`XXX` 是上下文的名称，例如 `json-loader`。

loader 的名称约定和优先搜索顺序，由 webpack 配置 API 中的  [`resolveLoader.moduleTemplates`](/configuration/resolve#resolveloader) 定义。

***

> 原文：https://webpack.js.org/concepts/loaders/