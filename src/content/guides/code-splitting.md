---
title: 代码分离
sort: 5
contributors:
  - pksjce
  - pastelsky
  - simon04
  - jonwheeler
  - johnstew
  - shinxi
  - tomtasche
  - levy9527
  - rahulcs
  - chrisVillanueva
  - rafde
  - bartushek
  - shaunwallace
  - skipjack
  - jakearchibald
  - TheDutchCoder
  - rouzbeh84
  - shaodahong
  - sudarsangp
  - kcolton
  - efreitasn
  - EugeneHlushko
  - Tiendo1011
  - byzyk
  - AnayaDesign
  - wizardofhogwarts
  - maximilianschmelzer
  - smelukov
  - chenxsan
related:
  - title: webpack 中的 <link rel=”prefetch/preload”>
    url: https://medium.com/webpack/link-rel-prefetch-preload-in-webpack-51a52358f84c
  - title: Chrome 中的预加载、预获取和优先级(Preload, Prefetch And Priorities)
    url: https://medium.com/reloading/preload-prefetch-and-priorities-in-chrome-776165961bbf
  - title: 用 rel="preload" 预加载内容
    url: https://developer.mozilla.org/en-US/docs/Web/HTML/Preloading_content
---

T> 本指南继续沿用 [起步](/guides/getting-started) 和 [管理输出](/guides/output-management) 中的示例代码。请确保你已熟悉这些指南中提供的示例。

代码分离是 webpack 中最引人注目的特性之一。此特性能够把代码分离到不同的 bundle 中，然后可以按需加载或并行加载这些文件。代码分离可以用于获取更小的 bundle，以及控制资源加载优先级，如果使用合理，会极大影响加载时间。

常用的代码分离方法有三种：

- 入口起点：使用 [`entry`](/configuration/entry-context) 配置手动地分离代码。
- 防止重复：使用 [`SplitChunksPlugin`](/plugins/split-chunks-plugin) 去重和分离 chunk。
- 动态导入：通过模块的内联函数调用来分离代码。


## 入口起点(entry point) {#entry-points}

这是迄今为止最简单直观的分离代码的方式。不过，这种方式手动配置较多，并有一些隐患，我们将会解决这些问题。先来看看如何从 main bundle 中分离 another module(另一个模块)：

__project__

``` diff
webpack-demo
|- package.json
|- webpack.config.js
|- /dist
|- /src
  |- index.js
+ |- another-module.js
|- /node_modules
```

__another-module.js__

``` js
import _ from 'lodash';

console.log(
  _.join(['Another', 'module', 'loaded!'], ' ')
);
```

__webpack.config.js__

``` diff
const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
+   another: './src/another-module.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
```

这将生成如下构建结果：

``` bash
...
            Asset     Size   Chunks             Chunk Names
another.bundle.js  550 KiB  another  [emitted]  another
  index.bundle.js  550 KiB    index  [emitted]  index
Entrypoint index = index.bundle.js
Entrypoint another = another.bundle.js
...
```

正如前面提到的，这种方式存在一些隐患：

- 如果入口 chunk 之间包含一些重复的模块，那些重复模块都会被引入到各个 bundle 中。
- 这种方法不够灵活，并且不能动态地将核心应用程序逻辑中的代码拆分出来。

以上两点中，第一点对我们的示例来说无疑是个问题，因为之前我们在 `./src/index.js` 中也引入过 `lodash`，这样就在两个 bundle 中造成重复引用。接着，我们通过使用 [`SplitChunksPlugin`](/plugins/split-chunks-plugin) 来移除重复的模块。


## 防止重复(prevent duplication) {#prevent-duplication}

### 入口依赖 {#entry-dependencies}

配置 [`dependOn` option](/configuration/entry-context/#dependencies) 选项，这样可以在多个 chunk 之间共享模块。

``` diff
  const path = require('path');

  module.exports = {
    mode: 'development',
    entry: {
-     index: './src/index.js',
-     another: './src/another-module.js',
+     index: { import: './src/index.js', dependOn: 'shared' },
+     another: { import: './src/another-module.js', dependOn: 'shared' },
+     shared: 'lodash',
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
  };
```

#### `optimization.runtimeChunk` {#optimizationruntimechunk}

在单个 HTML 页面上使用多个入口时，需设置 `optimization.runtimeChunk: 'single'`。

应避免使用每页多个入口，而应使用多个引入的入口：`entry: { page: ['./analytics', './app'] }`。当在 script 标签中使用 `async` 时，会有更易于优化，且执行顺序一致。

T> 在使用脚本动态生成  HTML 的场景中，可以使用每页多个入口，例如：当页面上的组件编译时间未知，且 HTML 的页面数据动态获取时。

### `SplitChunksPlugin` {#splitchunksplugin}

[`SplitChunksPlugin`](/plugins/split-chunks-plugin) 插件可以将公共的依赖模块提取到已有的入口 chunk 中，或者提取到一个新生成的 chunk。让我们使用这个插件，将之前的示例中重复的 `lodash` 模块去除：

W> CommonsChunkPlugin 已经从 webpack v4 legato 中移除。想要了解在最新版本中如何处理 chunks，请查看 [`SplitChunksPlugin`](/plugins/split-chunks-plugin) 。

__webpack.config.js__

``` diff
  const path = require('path');

  module.exports = {
    mode: 'development',
    entry: {
      index: './src/index.js',
      another: './src/another-module.js',
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
+   optimization: {
+     splitChunks: {
+       chunks: 'all',
+     },
+   },
  };
```

使用 [`optimization.splitChunks`](/plugins/split-chunks-plugin/#optimization-splitchunks) 配置选项之后，现在应该可以看出，`index.bundle.js` 和 `another.bundle.js` 中已经移除了重复的依赖模块。需要注意的是，插件将 `lodash` 分离到单独的 chunk，并且将其从 main bundle 中移除，减轻了大小。执行 `npm run build` 查看效果：

``` bash
...
                          Asset      Size                 Chunks             Chunk Names
              another.bundle.js  5.95 KiB                another  [emitted]  another
                index.bundle.js  5.89 KiB                  index  [emitted]  index
vendors~another~index.bundle.js   547 KiB  vendors~another~index  [emitted]  vendors~another~index
Entrypoint index = vendors~another~index.bundle.js index.bundle.js
Entrypoint another = vendors~another~index.bundle.js another.bundle.js
...
```

以下是由社区提供，一些对于代码分离很有帮助的 plugin 和 loader：

- [`mini-css-extract-plugin`](plugins/mini-css-extract-plugin): 用于将 CSS 从主应用程序中分离。


## 动态导入(dynamic import) {#dynamic-imports}

当涉及到动态代码拆分时，webpack 提供了两个类似的技术。第一种，也是推荐选择的方式是，使用符合 [ECMAScript 提案](https://github.com/tc39/proposal-dynamic-import) 的 [`import()` 语法](/api/module-methods/#import-1) 来实现动态导入。第二种，则是 webpack 的遗留功能，使用 webpack 特定的 [`require.ensure`](/api/module-methods/#requireensure)。让我们先尝试使用第一种……

W> `import()` 调用会在内部用到 [promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)。如果在旧版本浏览器中使用 `import()`，记得使用一个 polyfill 库（例如 [es6-promise](https://github.com/stefanpenner/es6-promise) 或 [promise-polyfill](https://github.com/taylorhakes/promise-polyfill)），来 shim `Promise`。

在我们开始之前，先从配置中移除掉多余的 [`entry`](/concepts/entry-points/) 和 [`optimization.splitChunks`](/plugins/split-chunks-plugin/#optimization-splitchunks)，因为接下来的演示中并不需要它们：

__webpack.config.js__

``` diff
  const path = require('path');

  module.exports = {
    mode: 'development',
    entry: {
      index: './src/index.js',
-     another: './src/another-module.js',
    },
    output: {
      filename: '[name].bundle.js',
+     chunkFilename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
-   optimization: {
-     splitChunks: {
-       chunks: 'all',
-     },
-   },
  };
```

注意，这里使用了 `chunkFilename`，它决定 non-entry chunk(非入口 chunk) 的名称。关于 `chunkFilename` 更多信息，请查看 [输出](/configuration/output/#outputchunkfilename) 文档。更新我们的项目，移除现在不会用到的文件：

__project__

``` diff
webpack-demo
|- package.json
|- webpack.config.js
|- /dist
|- /src
  |- index.js
- |- another-module.js
|- /node_modules
```

现在，我们不再使用 statically import(静态导入) `lodash`，而是通过 dynamic import(动态导入) 来分离出一个 chunk：

__src/index.js__

``` diff
- import _ from 'lodash';
-
- function component() {
+ function getComponent() {
-   const element = document.createElement('div');
-
-   // Lodash, now imported by this script
-   element.innerHTML = _.join(['Hello', 'webpack'], ' ');
+   return import(/* webpackChunkName: "lodash" */ 'lodash').then(({ default: _ }) => {
+     const element = document.createElement('div');
+
+     element.innerHTML = _.join(['Hello', 'webpack'], ' ');
+
+     return element;
+
+   }).catch(error => 'An error occurred while loading the component');
  }

- document.body.appendChild(component());
+ getComponent().then(component => {
+   document.body.appendChild(component);
+ })
```

我们之所以需要 `default`，是因为 webpack 4 在导入 CommonJS 模块时，将不再解析为 `module.exports` 的值，而是为 CommonJS 模块创建一个 artificial namespace 对象，更多有关背后原因的信息，请阅读 [webpack 4: import() and CommonJs](https://medium.com/webpack/webpack-4-import-and-commonjs-d619d626b655)

注意，在注释中使用了 `webpackChunkName`。这样做会导致我们的 bundle 被命名为 `lodash.bundle.js` ，而不是 `[id].bundle.js` 。想了解更多关于 `webpackChunkName` 和其他可用选项，请查看 [`import()` 相关文档](/api/module-methods/#import-1)。让我们执行 webpack，查看 `lodash` 是否会分离到一个单独的 bundle：

``` bash
...
                   Asset      Size          Chunks             Chunk Names
         index.bundle.js  7.88 KiB           index  [emitted]  index
vendors~lodash.bundle.js   547 KiB  vendors~lodash  [emitted]  vendors~lodash
Entrypoint index = index.bundle.js
...
```

由于 `import()` 会返回一个 promise，因此它可以和 [`async` 函数](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)一起使用。但是，需要使用像 Babel 这样的预处理器和 [Syntax Dynamic Import Babel Plugin](https://babel.docschina.org/docs/plugins/syntax-dynamic-import/#installation)。下面是如何通过 async 函数简化代码：

__src/index.js__

``` diff
- function getComponent() {
+ async function getComponent() {
-   return import(/* webpackChunkName: "lodash" */ 'lodash').then(({ default: _ }) => {
-     const element = document.createElement('div');
-
-     element.innerHTML = _.join(['Hello', 'webpack'], ' ');
-
-     return element;
-
-   }).catch(error => 'An error occurred while loading the component');
+   const element = document.createElement('div');
+   const { default: _ } = await import(/* webpackChunkName: "lodash" */ 'lodash');
+
+   element.innerHTML = _.join(['Hello', 'webpack'], ' ');
+
+   return element;
  }

  getComponent().then(component => {
    document.body.appendChild(component);
  });
```

T> 在稍后示例中，可能会根据计算后的变量(computed variable)导入特定模块时，可以通过向 `import()` 传入一个 [动态表达式](/api/module-methods/#dynamic-expressions-in-import)。


## 预获取/预加载模块(prefetch/preload module) {#prefetchingpreloading-modules}

webpack v4.6.0+ 增加了对预获取和预加载的支持。

在声明 import 时，使用下面这些内置指令，可以让 webpack 输出 "resource hint(资源提示)"，来告知浏览器：

- prefetch(预获取)：将来某些导航下可能需要的资源
- preload(预加载)：当前导航下可能需要资源

下面这个 prefetch 的简单示例中，有一个 `HomePage` 组件，其内部渲染一个 `LoginButton` 组件，然后在点击后按需加载 `LoginModal` 组件。

__LoginButton.js__

```js
//...
import(/* webpackPrefetch: true */ 'LoginModal');
```

这会生成 `<link rel="prefetch" href="login-modal-chunk.js">` 并追加到页面头部，指示着浏览器在闲置时间预取 `login-modal-chunk.js` 文件。

T> 只要父 chunk 完成加载，webpack 就会添加 prefetch hint(预取提示)。

与 prefetch 指令相比，preload 指令有许多不同之处：

- preload chunk 会在父 chunk 加载时，以并行方式开始加载。prefetch chunk 会在父 chunk 加载结束后开始加载。
- preload chunk 具有中等优先级，并立即下载。prefetch chunk 在浏览器闲置时下载。
- preload chunk 会在父 chunk 中立即请求，用于当下时刻。prefetch chunk 会用于未来的某个时刻。
- 浏览器支持程度不同。

下面这个简单的 preload 示例中，有一个 `Component`，依赖于一个较大的 library，所以应该将其分离到一个独立的 chunk 中。

我们假想这里的图表组件 `ChartComponent` 组件需要依赖体积巨大的 `ChartingLibrary` 库。它会在渲染时显示一个 `LoadingIndicator(加载进度条)` 组件，然后立即按需导入 `ChartingLibrary`：

__ChartComponent.js__

```js
//...
import(/* webpackPreload: true */ 'ChartingLibrary');
```

在页面中使用 `ChartComponent` 时，在请求 ChartComponent.js 的同时，还会通过 `<link rel="preload">` 请求 charting-library-chunk。假定 page-chunk 体积很小，很快就被加载好，页面此时就会显示 `LoadingIndicator(加载进度条)` ，等到 `charting-library-chunk` 请求完成，LoadingIndicator 组件才消失。启动仅需要很少的加载时间，因为只进行单次往返，而不是两次往返。尤其是在高延迟环境下。

T> 不正确地使用 webpackPreload 会有损性能，请谨慎使用。


## bundle 分析(bundle analysis) {#bundle-analysis}

一旦开始分离代码，一件很有帮助的事情是，分析输出结果来检查模块在何处结束。 [官方分析工具](https://github.com/webpack/analyse) 是一个不错的开始。还有一些其他社区支持的可选项：

- [webpack-chart](https://alexkuz.github.io/webpack-chart/): webpack stats 可交互饼图。
- [webpack-visualizer](https://chrisbateman.github.io/webpack-visualizer/): 可视化并分析你的 bundle，检查哪些模块占用空间，哪些可能是重复使用的。
- [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)：一个 plugin 和 CLI 工具，它将 bundle 内容展示为一个便捷的、交互式、可缩放的树状图形式。
- [webpack bundle optimize helper](https://webpack.jakoblind.no/optimize)：这个工具会分析你的 bundle，并提供可操作的改进措施，以减少 bundle 的大小。
- [bundle-stats](https://github.com/bundle-stats/bundle-stats)：生成一个 bundle 报告（bundle 大小、资源、模块），并比较不同构建之间的结果。

## 下一步 {#next-steps}

接下来，查看 [延迟加载](/guides/lazy-loading/) 来学习如何在实际一个真实应用程序中使用 `import()` 的具体示例，以及查看 [缓存](/guides/caching/) 来学习如何有效地分离代码。
