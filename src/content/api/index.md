---
title: 引导
sort: 1
---

可以使用各种接口来定制化编译过程(compilation process)。一些特性会在几个接口之间重叠，例如，配置选项可能会从 CLI 标记(flag)中获取参数，而其他已存在特性，则只能通过某个接口去获取。以下高级信息可以帮助你起步。


## CLI

命令行接口（Command Line Interface - CLI），用来配置和交互你的构建(build)。这在早期的原型和分析时特别有用。在大多数情况下，CLI 仅用于使用配置文件和传入几个标记(flag)（例如 `--env`）启动该进程。

[了解更多！](/api/cli)


## 模块

当使用 webpack 处理模块时，理解不同的模块语法（特别是[模块方法](/api/module-methods)和[模块变量](/api/module-variables)）是很重要的。 - 这些模块语法 webpack 都可以支持。

[了解更多！](/api/module-methods)


## Node

虽然大多数用户只要用到 CLI 和配置文件足矣，但是更细粒度的编译控制，需要通过 Node 接口实现。这包括传递多个配置文件、自动执行或观察程序，以及收集统计信息。

[了解更多！](/api/node)


## loader

loader 是用于将模块的源代码进行转换。loader 被编写为，接受源代码作为参数的函数，并对源码应用转换返回该代码的新版本。

[了解更多！](/api/loaders)


## plugin

由 webpack 提供的插件接口，允许用户直接触及到编译过程(compilation process)。插件可以将处理函数(handler)，注册到编译过程中的不同事件点上运行的生命周期钩子函数上。当执行每个钩子时，插件能够完全访问到编译(compilation)的当前状态。

[了解更多！](/api/plugins)

***

> 原文：https://webpack.js.org/api/
