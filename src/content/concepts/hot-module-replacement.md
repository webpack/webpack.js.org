---
title: 模块热替换(Hot Module Replacement)
sort: 11
contributors:
  - SpaceK33z
  - sokra
  - GRardB
  - rouzbeh84
  - skipjack
---

模块热替换(HMR - Hot Module Replacement)功能会在应用程序运行过程中替换、添加或删除[模块](/concepts/modules/)，而无需重新加载整个页面。主要是通过以下几种方式，来显著加快开发速度：

- 保留在完全重新加载页面时丢失的应用程序状态。
- 只更新变更内容，以节省宝贵的开发时间。
- 调整样式更加快速 - 几乎相当于在浏览器调试器中更改样式。


## 这一切是如何运行的？

让我们从一些不同的角度观察，以了解 HMR 的工作原理……

### 在应用程序中

通过以下步骤，可以做到在应用程序中置换(swap in and out)模块：

1. 应用程序代码要求 HMR runtime 检查更新。
2. HMR runtime（异步）下载更新，然后通知应用程序代码。
3. 应用程序代码要求 HMR runtime 应用更新。
4. HMR runtime（异步）应用更新。

你可以设置 HMR，以使此进程自动触发更新，或者你可以选择要求在用户交互时进行更新。


### 在编译器中

除了普通资源，编译器(compiler)需要发出 "update"，以允许更新之前的版本到新的版本。"update" 由两部分组成：

1. 更新后的 [manifest](/concepts/manifest)(JSON)
2. 一个或多个更新后的 chunk (JavaScript)

manifest 包括新的编译 hash 和所有的待更新 chunk 目录。每个更新 chunk 都含有对应于此 chunk 的全部更新模块（或一个 flag 用于表明此模块要被移除）的代码。

编译器确保模块 ID 和 chunk ID 在这些构建之间保持一致。通常将这些 ID 存储在内存中（例如，使用 [webpack-dev-server](/configuration/dev-server/) 时），但是也可能将它们存储在一个 JSON 文件中。

### 在模块中

HMR 是可选功能，只会影响包含 HMR 代码的模块。举个例子，通过 [`style-loader`](https://github.com/webpack/style-loader) 为 style 样式追加补丁。
为了运行追加补丁，`style-loader` 实现了 HMR 接口；当它通过 HMR 接收到更新，它会使用新的样式替换旧的样式。

类似的，当在一个模块中实现了 HMR 接口，你可以描述出当模块被更新后发生了什么。然而在多数情况下，不需要强制在每个模块中写入 HMR 代码。如果一个模块没有 HMR 处理函数，更新就会冒泡。这意味着一个简单的处理函数能够对整个模块树(complete module tree)进行更新。如果在这个模块树中，一个单独的模块被更新，那么整组依赖模块都会被重新加载。

有关 `module.hot` 接口的详细信息，请查看 [HMR API 页面](/api/hot-module-replacement)。


### 在 HMR Runtime 中

这些事情比较有技术性……如果你对其内部不感兴趣，可以随时跳到 [HMR API 页面](/api/hot-module-replacement)或 [HMR 指南](/guides/hot-module-replacement)。

对于模块系统的 runtime，附加的代码被发送到 `parents` 和 `children` 跟踪模块。在管理方面，runtime 支持两个方法 `check` 和 `apply`。

`check` 发送 HTTP 请求来更新 manifest。如果请求失败，说明没有可用更新。如果请求成功，待更新 chunk 会和当前加载过的 chunk 进行比较。对每个加载过的 chunk，会下载相对应的待更新 chunk。当所有待更新 chunk 完成下载，就会准备切换到 `ready` 状态。

`apply` 方法将所有被更新模块标记为无效。对于每个无效模块，都需要在模块中有一个更新处理函数，或者在它的父级模块们中有更新处理函数。否则，无效标记冒泡，并也使父级无效。每个冒泡继续直到到达应用程序入口起点，或者到达带有更新处理函数的模块（以最先到达为准）。如果它从入口起点开始冒泡，则此过程失败。

之后，所有无效模块都被（通过 dispose 处理函数）处理和解除加载。然后更新当前 hash，并且调用所有 "accept" 处理函数。runtime 切换回`闲置`状态，一切照常继续。


## 入门

在开发过程中，可以将 HMR 作为 LiveReload 的替代。[webpack-dev-server](/configuration/dev-server/) 支持 `hot` 模式，在试图重新加载整个页面之前，热模式会尝试使用 HMR 来更新。更多细节请查看[模块热更新指南](/guides/hot-module-replacement)。

与许多其他功能一样，webpack 的强大之处在于它的可定制化。取决于特定项目需求，会有*许多种*配置 HMR 的方式。然而，对于多数实现来说，`webpack-dev-server` 能够配合良好，可以让你快速入门 HMR。

***

> 原文：https://webpack.js.org/concepts/hot-module-replacement/
