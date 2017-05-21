---
title: 代码分离
sort: 30
contributors:
  - pksjce
  - pastelsky
  - simon04
---

代码分离是 webpack 中最引人注目的特性之一。你可以把你的代码分离到不同的 bundle 中，然后你就可以去按需加载这些文件 - 例如，当用户导航到匹配的路由，或用户触发了事件时，加载对应文件。如果使用了正确的使用方式，这可以使我们有更小的 bundle，同时可以控制资源加载优先级，从而对你的应用程序加载时间产生重要影响。

总的来说，使用 `webpack` 可以完成两类代码分离工作：

## 用于实现缓存和并行加载资源的资源分离

### 分离第三方库(vendor)

一个典型的应用程序，由于框架/功能性需求，会依赖于许多第三方库的代码。不同于应用程序代码，这些第三方库代码不会频繁修改。

如果我们将这些库(library)中的代码，保留在与应用程序代码相独立的 bundle 中，我们就可以利用浏览器缓存机制，把这些文件长时间地缓存在用户机器上。

为了完成这个目标，不管应用程序代码如何变化，vendor 文件名中的 `hash` 部分必须保持不变。学习如何使用 `CommonsChunkPlugin` [分离 vendor/library](/guides/code-splitting-libraries) 代码。

### 分离 CSS

你可能也想将你的样式代码分离到单独的 bundle 中，以此使其独立于应用程序逻辑。这加强了样式的可缓存性，并且使得浏览器能够并行加载应用程序代码中的样式文件，避免 FOUC 问题 ([无样式内容造成的闪烁](https://en.wikipedia.org/wiki/Flash_of_unstyled_content))。

学习如何使用 `ExtractTextWebpackPlugin` [分离 CSS](/guides/code-splitting-css)。

## 按需分离

虽然前面几类资源分离，需要用户预先在配置中指定分离模块，但也可以在应用程序代码中创建动态分离模块。

这可以用于更细粒度的代码块，例如，根据我们的应用程序路由，或根据用户行为预测。这可以使用户按照实际需要加载非必要资源。

学习如何使用 `import()` 或者 `require.ensure()` [实现按需分离](/guides/code-splitting-async)。

***

> 原文：https://webpack.js.org/guides/code-splitting/
