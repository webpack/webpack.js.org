---
title: 解析器（Resolvers）
group: Plugins
sort: 15
contributors:
  - EugeneHlushko
  - chenxsan
---

解析器是使用 `enhanced-resolve` 库创建的。`Resolver` 类
拓展了 `tapable` 类，并使用 `tapable` 来提供了一些钩子。
`enhanced-resolve` 可以直接用于创建新的解析器，
但是，任何 [`compiler` 实例](/api/node/#compiler-instance) 都有一些解析器实例，可以
被 `tap` 进去。

在继续阅读之前，请确保你已经读过
 [`enhanced-resolve`](https://github.com/webpack/enhanced-resolve) 和 [`tapable`](/api/plugins/#tapable) 文档。


## 类型 {#types}

在 `compiler` 类中，提供了三种类型的内置解析器：

- `normal`: 通过绝对或相对路径解析模块。
- `context`: 在给定的上下文中解析模块。
- `loader`: 解析 webpack [loader](/loaders)。

根据需要，任一个被使用在 `compiler` 中的内置解析器，
可以通过插件进行定制：

``` js
compiler.resolverFactory.hooks.resolver.for('[type]').tap('name', resolver => {
  // you can tap into resolver.hooks now
  resolver.hooks.result.tap('MyPlugin', result => {
    return result;
  });
});
```

其中，`[type]` 是上述三个解析器之一。

请参阅 [`enhanced-resolve` documentation](https://github.com/webpack/enhanced-resolve) 以获得钩子的完整列表以及它们的介绍。


## 配置选项 {#configuration-options}

上述解析器也可以
利用 [`resolve`](/configuration/resolve/) or [`resolveLoader`](/configuration/resolve/#resolveloader) 选项，通过配置文件进行定制。这些选项允许
用户可以通过多种选项来更改解析行为，包括
通过解析 `plugins`。

解析器插件，例如：[`DirectoryNamedPlugin`](https://github.com/shaketbaby/directory-named-webpack-plugin)，可以直接引入
在 `resolve.plugins`，而不是直接在 [`plugins` configuration option](/configuration/plugins/#plugins) 中使用。

T> 请注意，`resolve` 配置会影响 `normal` 解析器和 `context` 解析器，而“ `resolveLoader` 用于修改 `loader` 解析器。
