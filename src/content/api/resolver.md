---
title: Resolver
group: Plugins
sort: 5
---

有三种类型的 resolver，每种都用于不同类型的模块：

- `compiler.resolvers.normal`：解析一个普通模块(common module)。
- `compiler.resolvers.context`：解析一个上下文模块(context module)。
- `compiler.resolvers.loader`：解析一个 loader。

所有插件都应该使用 `this.fileSystem` 作为 fileSystem，因为它被缓存了。它只具有异步命名功能，但如果用户使用同步文件系统实现（即在增强需求中），则它可能表现为同步。

要加入 path 路径，所有插件都应该使用 `this.join`。它规范了路径。此外还有一个 `this.normalize`。

`this.forEachBail(array, iterator, callback)` 提供了一个 bailing async `forEach` 实现。

要将 request 传递给其他解析插件，请使用 `this.doResolve(types: String|String[], request: Request, message: String, callback)`方法。`types` 是可能是多种 request 类型，按照优先级顺序进行匹配(test)。

``` js
interface Request {
  path: String // 当前 request 目录
  request: String // 当前 request 字符串
  query: String // request 的 query string（如果有的话）
  module: boolean // request 以模块为开始
  directory: boolean // request 指向一个目录
  file: boolean // request 指向一个文件
  resolved: boolean // request 已被解析/已被完成
  // 未定义(undefined)表示 boolean 字段为 false
}

// 示例
// 在 /home/user/project/file.js 中 require("../test?charset=ascii")
{
  path: "/home/user/project",
  request: "../test",
  query: "?charset=ascii"
}
// 在 /home/user/project/file.js 中 require("test/test/")
{
  path: "/home/user/project",
  request: "test/test/",
  module: true,
  directory: true
}
```


## `resolve(context: String, request: String)`

解析过程开始之前。


## `resolve-step(types: String[], request: Request)`

解析过程中的一个步骤开始之前。


## `module(request: Request)` async waterfall

找到一个模块 request，应该进行解析。


## `directory(request: Request)` async waterfall

找到一个目录 request，应该进行解析。


## `file(request: Request)` async waterfall

找到一个文件 request，应该进行解析。


## 插件可能会提供更多的扩展要点

这里列出 webpack 提供的默认插件列表。他们都是 `(request: Request)` 异步的 waterfall。

普通模块和上下文模块的处理过程是 `module -> module-module -> directory -> file`。

loaders 处理过程是 `module -> module-loader-module -> module-module -> directory -> file`。


## `module-module`

应该在指定目录中查找模块。`path` 包含目录。


## `module-loader-module` (only for loaders)

在模块模板(module template)应用于模块名称(module name)之前使用。该过程继续使用 `module-module`。

***

> 原文：https://webpack.js.org/api/resolver/
