---
title: 引导
sort: 1
contributors:
  - tbroadley
---

可以使用各种接口来定制化编译过程。
一些特性会在几个接口之间重叠，例如，其中一些配置选项可能会从 CLI 标记(flag)中获取，
而另一些配置选项，则只能从单个接口获取。
以下高级信息可以帮助你起步。


## CLI

命令行接口(Command Line Interface - CLI)，
用来对构建(build)进行配置和交互。
这在早期的原型设计和概要分析时特别有用。
在大多数情况下，CLI 仅用于使用配置文件和几个标记(flag)（例如 `--env`）启动该进程。

[了解更多关于 CLI 的信息！](/api/cli)


## 模块

当使用 webpack 处理模块时，理解不同的模块语法
（特别是[模块方法](/api/module-methods)和[模块变量](/api/module-variables)）是很重要的。 -
这些模块语法 webpack 都可以支持。

[了解更多关于模块的信息！](/api/module-methods)


## Node

虽然大多数用户只要用到配置文件足矣，
然而对编译的更细粒度控制，
则需要通过 Node 接口实现。
包括传递多个配置文件、可编程方式的编译执行或观察文件，以及收集概要信息。

[了解更多关于 Node API 的信息！](/api/node)


## Loaders

loader 是转译模块源代码的转换规则。
loader 被编写为，接受源代码作为参数的函数，
并返回这些转换过的新版本代码。

[了解更多关于 loader 的信息！](/api/loaders)


## plugin

插件接口可以帮助用户直接触及到编译过程(compilation process)。
插件可以将处理函数(handler)注册到编译过程中的不同事件点上运行的生命周期钩子函数上。
当执行每个钩子时，
插件能够完全访问到编译(compilation)的当前状态。

[了解更多关于插件的信息！](/api/plugins)

***

> 原文：https://webpack.js.org/api/
