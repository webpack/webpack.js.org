---
title: 简介
sort: -1
contributors:
  - tbroadley
---

Webpack 提供了多种接口来自定义编译过程。
接口间存在一些重叠功能，例如配置选项可能通过 CLI 标志启用，
而其他仅存在于单个接口。
以下概念可以帮助你快速入门。


## CLI {#cli}

命令行界面（CLI），
用于配置构建并与之交互。它在早期原型制作和性能分析的情况下特别有用。
大多数情况下，
CLI 只是用于通过配置文件和一些标志（例如`--env`）来启动进程。

[了解更多关于 CLI 的知识！](/api/cli)


## 模块 {#module}

<<<<<<< HEAD
使用 webpack 处理模块时，
最重要的是理解不同的模块语法 --
特别是受支持的[方法](/api/module-methods)和[变量](/api/module-variables)。
=======
When processing modules with webpack, it is important to understand the
different module syntaxes – specifically the [methods](/api/module-methods)
and [variables](/api/module-variables) – that are supported.
>>>>>>> 5c00973b146f353548380643e6555bfb847079bd

[了解更多关于模块的知识！](/api/module-methods)


## Node {#node}

尽管大多数用户可以借助 CLI 和配置文件控制编译，
通过 Node 接口可以实现更细粒度的控制。
这包括传递多个配置、
以程序的方式运行、查阅并收集统计信息。

[了解更多关于 Node API 的知识！](/api/node)


## Loaders {#loaders}

Loaders 用于对模块的源代码进行转换。
它们被编写成一类将源代码作为参数传入，
并将编译转换后的新版本代码传出的函数体。

[了解更多关于 loaders 的知识！](/api/loaders)


## 插件 {#plugins}

插件接口允许用户直接介入编译过程。
插件可以在不同时期运行的生命周期挂钩上注册回调函数。
在单个编译流程中，当每个钩子都被执行后，插件将拥有
当前编译流程的完整访问权限。

[了解更多关于插件的知识！](/api/plugins)
