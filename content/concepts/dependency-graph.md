---
title: 依赖图(Dependency Graph)
sort: 9
contributors:
  - TheLarkInn
---

任何时候，一个文件依赖于另一个文件，webpack 就把此视为文件之间有_依赖关系_。这使得 webpack 可以接收非代码资源(non-code asset)（例如图像或 web 字体），并且可以把它们作为_依赖_提供给你的应用程序。

webpack 从命令行或配置文件中定义的一个模块列表开始，处理你的应用程序。
从这些_入口起点_开始，webpack 递归地构建一个_依赖图_，这个依赖图包含着应用程序所需的每个模块，然后将所有这些模块打包为少量的 _bundle_ - 通常只有一个 - 可由浏览器加载。

T> 对于 *HTTP/1.1* 客户端，由 webpack 打包你的应用程序会尤其强大，因为在浏览器发起一个新请求时，它能够减少应用程序必须等待的时间。对于 *HTTP/2*，你还可以使用代码拆分(Code Splitting)以及通过 webpack 打包来实现[最佳优化](https://medium.com/webpack/webpack-http-2-7083ec3f3ce6#.7y5d3hz59)。

***

> 原文：https://webpack.js.org/concepts/dependency-graph/
