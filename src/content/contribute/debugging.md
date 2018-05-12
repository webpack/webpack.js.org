---
title: 调试
sort: 7
contributors:
  - skipjack
  - tbroadley
related:
  - title: Learn and Debug webpack with Chrome DevTools!
    url: https://medium.com/webpack/webpack-bits-learn-and-debug-webpack-with-chrome-dev-tools-da1c5b19554
  - title: Debugging Guide | Node
    url: https://nodejs.org/en/docs/guides/debugging-getting-started/
  - title: Debugging Node.js with Chrome DevTools
    url: https://medium.com/@paul_irish/debugging-node-js-nightlies-with-chrome-devtools-7c4a1b95ae27
---

在为核心仓库贡献代码（例如，编写 loader/plugin，又或是在处理复杂的项目）时，调试工具将会成为工作流程的重心。无论问题是大型项目的性能下降还是无用追溯，以下工具都可以使这些问题变得不那么痛苦。

- 通过 [Node](/api/node#stats-object) 和 [CLI](/api/cli#common-options) 提供的 [`stats` 数据](/api/stats) 。
- 通过 `node-nightly` 和 Node.js 最新版本提供的 Chrome __DevTools__。


## stats

无论你是想手动还是使用工具来筛选[这些数据](/api/stats)，`stats` 数据在调试构建的问题时都非常有用。这里我们不会深入，因为有这[整个页面](/api/stats)专门介绍这些内容，但你应该知道，可以使用它来查找以下信息：

- 每个模块的内容。
- 每个 chunk　中包含的模块。
- 每个模块编译和解析的　stats。
- 构建的错误和警告。
- 模块之间的关系。
- 其他更多……

最重要的是，[官方分析工具](https://github.com/webpack/analyse)和[各种其他分析工具](/guides/code-splitting#bundle-analysis)会将这些数据，展示为多种形式的可视化图表。


## DevTools

虽然在简单场景中，可能 [`console`](https://nodejs.org/api/console.html) 语句会表现良好，然而有时还需要更加强大的解决方案。正如大多数前端开发人员已经知道的，将 Chrome DevTools 用在调试 web 应用程序，是一个能够解救我们的实用工具，_但它并没有局限于调试 web 应用程序_。从 Node v6.3.0+ 开始，开发人员可以使用内置的 `--inspect` 标记，来通过 DevTools 调试 Node.js 应用程序。

这可以帮助你轻松创建断点、调试内存使用情况、在控制台中暴露和检查对象等。在这个简短的演示中，我们将利用 [`node-nightly`](https://github.com/hemanth/node-nightly) package，它提供最新和强大的检测能力。

W> 从 v6.3.0 开始，`--inspect` 接口就一直可用，因此你可以尝试使用本地版本的 npm 包，但要注意某些功能和标记，可能与这里演示中的全局版本有所不同。

我们先在全局安装：

``` bash
npm install --global node-nightly
```

现在，我们需要运行一次，以结束安装：

``` bash
node-nightly
```

现在，我们可以直接使用带有 `--inspect` 标记的 `node-nightly`，在任何基于 webpack 的项目中开始构建。注意，我们不应该运行 NPM `scripts`，例如 `npm run build`，所以我们需要指定完整的 `node_modules` 路径：

``` bash
node-nightly --inspect ./node_modules/webpack/bin/webpack.js
```

应该输出如下内容：

``` bash
Debugger listening on ws://127.0.0.1:9229/c624201a-250f-416e-a018-300bbec7be2c
For help see https://nodejs.org/en/docs/inspector
```

现在，在浏览器中访问 `chrome://inspect`，你会看到在 _Remote Target_ 标题下可以进行 inspect(审查) 的活动脚本。单击每个脚本下自动连接会话的 "inspect" 链接，打开一个专门 debugger 或 _Open dedicated DevTools for Node_ 链接。你还可以看到 [NiM 扩展程序](https://chrome.google.com/webstore/detail/nodejs-v8-inspector-manag/gnhhdgbaldcilmgcpfddgdbkhjohddkj)，这是一个方便的 Chrome 插件，在每次你通过 `--inspect` 调试某个脚本时，都会自动打开 DevTools 标签页。

我们推荐使用 `--inspect-brk` 标记，此标记将在脚本的第一条语句处断开，以便你可以在源代码中设置断点，并根据需要启动/停止构建。此外，不要忘记，你仍然可以向脚本传递参数。例如，如果你有多个配置文件，你可以通过 `--config webpack.prod.js` 指定你想要调试的配置。
