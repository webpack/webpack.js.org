---
title: 依赖图(dependency graph)
sort: 9
contributors:
  - TheLarkInn
  - EugeneHlushko
translators:
  - QC-L
  - jacob-lcs
  - hanhan9449
related:
  - title: HTTP2 Aggressive Splitting Example
    url: https://github.com/webpack/webpack/tree/master/examples/http2-aggressive-splitting
  - title: webpack & HTTP/2
    url: https://medium.com/webpack/webpack-http-2-7083ec3f3ce6
---

每当一个文件依赖另一个文件时，webpack 都会将文件视为直接存在 _依赖关系_。这使得 webpack 可以获取非代码资源，如 images 或 web 字体等。并会把它们作为 _依赖_ 提供给应用程序。

<<<<<<< HEAD
当 webpack 处理应用程序时，它会根据命令行参数中或配置文件中定义的模块列表开始处理。
从 [_入口_](/concepts/entry-points/) 开始，webpack 会递归的构建一个 _依赖关系图_，这个依赖图包含着应用程序中所需的每个模块，然后将所有模块打包为少量的 _bundle_ —— 通常只有一个 —— 可由浏览器加载。
=======
When webpack processes your application, it starts from a list of modules defined on the command line or in its configuration file.
Starting from these [_entry points_](/concepts/entry-points/), webpack recursively builds a _dependency graph_ that includes every module your application needs, then bundles all of those modules into a small number of _bundles_ - often, only one - to be loaded by the browser.
>>>>>>> b2b1b5d42c04cdccdc522c97cb2f4604e898a382

T> 对于 _HTTP/1.1_ 的应用程序来说，由 webpack 构建的 bundle 非常强大。当浏览器发起请求时，它能最大程度的减少应用的等待时间。而对于 _HTTP/2_ 来说，你还可以使用[代码分割](/guides/code-splitting/)进行进一步优化。
