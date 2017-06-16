---
title: 集成(Integrations)
sort: 25
contributors:
  - pksjce
  - bebraw
  - tashian
---

webpack 是一个模块打包器(module bundler)，就像 Browserify 或 Brunch。它不是一个任务执行器(task runner)。Make, Grunt, 或者 Gulp 是任务运行器(task runner)。由于有人对这之间的差异感到困惑，所以我们会在此澄清。

任务执行器就是用来自动化处理常见的开发任务，例如项目的检查(lint)、构建(build)、测试(test)。相对于*打包器(bundler)*，任务执行器则聚焦在偏重上层的问题上面。

打包器(bundler)帮助您取得准备用于部署的 JavaScript 和样式表，将它们转换为适合浏览器的可用格式。例如，JavaScript 可以压缩、拆分 chunk 和按需加载(loaded on-demand)，以提高性能。打包是 web 开发中最重要的挑战之一，解决此问题可以消除开发过程中的大部分痛点。

webpack 能够协同任务执行器一起工作。你可以得益于，使用上层的工具，而将打包部分的问题留给 webpack。[grunt-webpack](https://www.npmjs.com/package/grunt-webpack) 和 [gulp-webpack](https://www.npmjs.com/package/gulp-webpack) 都是非常好的示例。

T> 通常 webpack 用户使用 npm `scripts` 作为它们的任务运行器启动入口，这是比较推荐的做法。跨平台支持可能会成为一个问题，但是这里有几个可行措施。

T> 尽管 webpack 核心聚焦于打包，你可以找到各种扩展(extension)，还是可以让你用任务管理器的方式去使用 webpack。

?> Grunt

?> Gulp

?> Mocha

?> Karma
