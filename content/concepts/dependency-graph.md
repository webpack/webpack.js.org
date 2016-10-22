---
title: 依赖关系
contributors:
  - TheLarkInn
  - dear-lizhihua
---

任何时候一个文件依赖于另一个文件，webpack 把这个文件当作_依赖_处理。这使得 webpack 可以接收非代码资源(non-code asset)（例如图像或 web 字体），并且也能把它们作为_依赖_提供给你的应用。

webpack 从命令行或配置文件定义的一个模块列表，开始处理你的应用。
从这些_入口点_开始，webpack 递归地构建一个_依赖图表_，这个依赖图表包括你应用所需的每个模块，然后将所有模块打包为少量的_包(bundle)_ - 通常只有一个包 - 可由浏览器加载。

T> 对于 *HTTP/1.1* 客户端，打包你的应用会尤其强大，因为当浏览器发起一个新请求时，它能够最大限度地减少你应用的等待次数。对于 *HTTP/2*，你还可以通过 webpack 使用代码拆分(Code Splitting)和打包实现[最佳优化](https://medium.com/webpack/webpack-http-2-7083ec3f3ce6#.7y5d3hz59)。
