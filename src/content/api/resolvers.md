---
title: resolver
group: Plugins
sort: 3
---

resolver 是由 `enhanced-resolve` package 创建出来的。`Resolver` 类继承了 `tapable` 类，并且使用 `tapable` 提供的一些钩子。可以直接使用 `enhanced-resolve` package 创建一些新的 resolver，然而，所有的 [`compiler` 实例](/api/node/#compiler-instance) 都有一些可以接触(tap into)到的 resolver 实例。

在继续阅读之前，请确保至少了解过 [`enhanced-resolve`](https://github.com/webpack/enhanced-resolve) 和 [`tapable`](/api/tapable/) 文档。


## 类型

`compiler` 类有三种类型的内置 resolver：

- Normal：通过绝对路径或相对路径，解析一个模块。
- Context：通过给定的 context 解析一个模块。
- Loader：解析一个 webpack [loader](/loaders)。

根据需要，所有这些 `compiler` 用到的内置 resolver，都可以通过插件进行自定义：

``` js
compiler.resolverFactory.plugin('resolver [type]', resolver => {
  resolver.hooks.resolve.tapAsync('MyPlugin', params => {
    // ...
  })
})
```

其中 `[type]` 是上面提到的三个 resolver 之一，指定为：

- `normal`
- `context`
- `loader`

完整的钩子和描述列表，请查看 `enhanced-resolve` [文档](https://github.com/webpack/enhanced-resolve)。


## 配置选项

上面提到的 resolver，也可以通过在配置文件使用 [`resolve`](/configuration/resolve/) 或 [`resolveLoader`](/configuration/resolve/#resolveloader) 选项来自定义。这些选项允许用户通过各种选项（包括解析 `plugins`），来改变解析行为。

resolver 插件（例如 [`DirectoryNamedPlugin`] (https://github.com/shaketbaby/directory-named-webpack-plugin)）可以直接包含在 `resolve.plugins` 中，而不是使用标准插件用法。注意，`resolve` 配置会影响 `normal` 和 `context` 这两个 resolver，而 `resolveLoader` 则用于修改 `loader` resolver。
