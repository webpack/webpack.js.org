---
title: 构建性能
sort: 9
contributors:
  - sokra
  - tbroadley
  - byzyk
  - madhavarshney
  - wizardofhogwarts
  - anikethsaha
translators:
  - QC-L
  - jacob-lcs
---

本指南包含一些改进构建/编译性能的实用技巧。

---

## 通用环境 {#general}

无论你是在 [开发环境](/guides/development) 还是在 [生产环境](/guides/production) 下运行构建脚本，以下最佳实践都会有所帮助。

### 更新到最新版本 {#stay-up-to-date}

使用最新的 webpack 版本。我们会经常进行性能优化。webpack 的最新稳定版本是：

[![latest webpack version](https://img.shields.io/github/package-json/v/webpack/webpack.svg?label=webpack&style=flat-square&maxAge=3600)](https://github.com/webpack/webpack/releases)

将 **Node.js** 更新到最新版本，也有助于提高性能。除此之外，将你的 package 管理工具（例如 `npm` 或者 `yarn`）更新到最新版本，也有助于提高性能。较新的版本能够建立更高效的模块树以及提高解析速度。

### loader {#loaders}

将 loader 应用于最少数量的必要模块。而非如下:

```js
module.exports = {
  //...
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
    ],
  },
};
```

通过使用 `include` 字段，仅将 loader 应用在实际需要将其转换的模块：

```js
const path = require('path');

module.exports = {
  //...
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'babel-loader',
      },
    ],
  },
};
```

### 引导(bootstrap) {#bootstrap}

每个额外的 loader/plugin 都有其启动时间。尽量少地使用工具。

### 解析 {#resolving}

以下步骤可以提高解析速度：

- 减少 `resolve.modules`, `resolve.extensions`, `resolve.mainFiles`, `resolve.descriptionFiles` 中条目数量，因为他们会增加文件系统调用的次数。
- 如果你不使用 symlinks（例如 `npm link` 或者 `yarn link`），可以设置 `resolve.symlinks: false`。
- 如果你使用自定义 resolve plugin 规则，并且没有指定 context 上下文，可以设置 `resolve.cacheWithContext: false`。

### dll {#dlls}

使用 `DllPlugin` 为更改不频繁的代码生成单独的编译结果。这可以提高应用程序的编译速度，尽管它增加了构建过程的复杂度。

### 小即是快(smaller = faster) {#smaller--faster}

减少编译结果的整体大小，以提高构建性能。尽量保持 chunk 体积小。

- 使用数量更少/体积更小的 library。
- 在多页面应用程序中使用 `SplitChunksPlugin`。
- 在多页面应用程序中使用 `SplitChunksPlugin `，并开启 `async` 模式。
- 移除未引用代码。
- 只编译你当前正在开发的那些代码。

### worker 池(worker pool) {#worker-pool}

`thread-loader` 可以将非常消耗资源的 loader 分流给一个 worker pool。

W> 不要使用太多的 worker，因为 Node.js 的 runtime 和 loader 都有启动开销。最小化 worker 和 main process(主进程) 之间的模块传输。进程间通讯(IPC, inter process communication)是非常消耗资源的。

### 持久化缓存 {#persistent-cache}

在 webpack 配置中使用 [`cache`](/configuration/cache) 选项。使用 `package.json` 中的 `"postinstall"` 清除缓存目录。

T> 我们支持 yarn PnP v3 [`yarn 2 berry`](https://yarnpkg.com/features/pnp)，来进行持久缓存。

### 自定义 plugin/loader {#custom-pluginsloaders}

对它们进行概要分析，以免在此处引入性能问题。

### Progress plugin {#progress-plugin}

将 `ProgressPlugin` 从 webpack 中删除，可以缩短构建时间。请注意，`ProgressPlugin` 可能不会为快速构建提供太多价值，因此，请权衡利弊再使用。

---

## 开发环境 {#development}

以下步骤对于 _开发环境_ 特别有帮助。

### 增量编译 {#incremental-builds}

使用 webpack 的 watch mode(监听模式)。而不使用其他工具来 watch 文件和调用 webpack 。内置的 watch mode 会记录时间戳并将此信息传递给 compilation 以使缓存失效。

在某些配置环境中，watch mode 会回退到 poll mode(轮询模式)。监听许多文件会导致 CPU 大量负载。在这些情况下，可以使用 `watchOptions.poll` 来增加轮询的间隔时间。

### 在内存中编译 {#compile-in-memory}

下面几个工具通过在内存中（而不是写入磁盘）编译和 serve 资源来提高性能：

- `webpack-dev-server`
- `webpack-hot-middleware`
- `webpack-dev-middleware`

### stats.toJson 加速 {#statstojson-speed}

webpack 4 默认使用 `stats.toJson()` 输出大量数据。除非在增量步骤中做必要的统计，否则请避免获取 `stats` 对象的部分内容。`webpack-dev-server` 在 v3.1.3 以后的版本，包含一个重要的性能修复，即最小化每个增量构建步骤中，从 `stats` 对象获取的数据量。

### Devtool {#devtool}

需要注意的是不同的 `devtool` 设置，会导致性能差异。

- `"eval"` 具有最好的性能，但并不能帮助你转译代码。
- 如果你能接受稍差一些的 map 质量，可以使用 `cheap-source-map` 变体配置来提高性能
- 使用 `eval-source-map` 变体配置进行增量编译。

T> 在大多数情况下，最佳选择是 `eval-cheap-module-source-map`。

### 避免在生产环境下才会用到的工具 {#avoid-production-specific-tooling}

某些 utility, plugin 和 loader 都只用于生产环境。例如，在开发环境下使用 `TerserPlugin` 来 minify(压缩) 和 mangle(混淆破坏) 代码是没有意义的。通常在开发环境下，应该排除以下这些工具：

- `TerserPlugin`
- `[fullhash]`/`[chunkhash]`/`[contenthash]`
- `AggressiveSplittingPlugin`
- `AggressiveMergingPlugin`
- `ModuleConcatenationPlugin`

### 最小化 entry chunk {#minimal-entry-chunk}

webpack 只会在文件系统中输出已经更新的 chunk。某些配置选项（HMR, `output.chunkFilename` 的 `[name]`/`[chunkhash]/[contenthash]`，`[fullhash]`）来说，除了对已经更新的 chunk 无效之外，对于 entry chunk 也不会生效。

确保在生成 entry chunk 时，尽量减少其体积以提高性能。下面的配置为运行时代码创建了一个额外的 chunk，所以它的生成代价较低：

```js
module.exports = {
  // ...
  optimization: {
    runtimeChunk: true,
  },
};
```

### 避免额外的优化步骤 {#avoid-extra-optimization-steps}

webpack 通过执行额外的算法任务，来优化输出结果的体积和加载性能。这些优化适用于小型代码库，但是在大型代码库中却非常耗费性能：

```js
module.exports = {
  // ...
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
  },
};
```

### 输出结果不携带路径信息 {#output-without-path-info}

webpack 会在输出的 bundle 中生成路径信息。然而，在打包数千个模块的项目中，这会导致造成垃圾回收性能压力。在 `options.output.pathinfo` 设置中关闭：

```js
module.exports = {
  // ...
  output: {
    pathinfo: false,
  },
};
```

### Node.js 版本 8.9.10-9.11.1 {#nodejs-versions-8910-9111}

Node.js v8.9.10 - v9.11.1 中的 ES2015 `Map` 和 `Set` 实现，存在 [性能回退](https://github.com/nodejs/node/issues/19769)。webpack 大量地使用这些数据结构，因此这次回退也会影响编译时间。

之前和之后的 Node.js 版本不受影响。

### TypeScript loader {#typescript-loader}

你可以为 loader 传入 `transpileOnly` 选项，以缩短使用 `ts-loader` 时的构建时间。使用此选项，会关闭类型检查。如果要再次开启类型检查，请使用 [`ForkTsCheckerWebpackPlugin`](https://www.npmjs.com/package/fork-ts-checker-webpack-plugin)。使用此插件会将检查过程移至单独的进程，可以加快 TypeScript 的类型检查和 ESLint 插入的速度。

```js
module.exports = {
  // ...
  test: /\.tsx?$/,
  use: [
    {
      loader: 'ts-loader',
      options: {
        transpileOnly: true,
      },
    },
  ],
};
```

T> 这是一个关于 `ts-loader` [完整示例](https://github.com/TypeStrong/ts-loader/tree/master/examples/fork-ts-checker-webpack-plugin)的 Github 仓库。

---

## 生产环境 {#production}

以下步骤对于 _生产环境_ 特别有帮助。

W> **不要为了很小的性能收益，牺牲应用程序的质量！**注意，在大多数情况下，优化代码质量比构建性能更重要。

### 多个 compilation 对象 {#multiple-compilations}

在创建多个 compilation 时，以下工具可以帮助到你：

- [`parallel-webpack`](https://github.com/trivago/parallel-webpack)：它允许在一个 worker 池中运行 compilation。
- `cache-loader`：可以在多个 compilation 之间共享缓存。

### Source Maps {#source-maps}

source map 相当消耗资源。你真的需要它们？

---

## 工具相关问题 {#specific-tooling-issues}

下列工具存在某些可能会降低构建性能的问题：

### Babel {#babel}

- 最小化项目中的 preset/plugin 数量。

### TypeScript {#typescript}

- 在单独的进程中使用 `fork-ts-checker-webpack-plugin` 进行类型检查。
- 配置 loader 跳过类型检查。
- 使用 `ts-loader` 时，设置 `happyPackMode: true` / `transpileOnly: true`。

### Sass {#sass}

- `node-sass` 中有个来自 Node.js 线程池的阻塞线程的 bug。 当使用 `thread-loader` 时，需要设置 `workerParallelJobs: 2`。
