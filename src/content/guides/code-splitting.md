---
title: 代码分离
sort: 9
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
---

T> 本指南扩展了[起步](/guides/getting-started)和[管理输出](/guides/output-management)中提供的示例。请确保您至少已熟悉其中提供的示例。

代码分离是 webpack 中最引人注目的特性之一。此特性能够把代码分离到不同的 bundle 中，然后可以按需加载或并行加载这些文件。代码分离可以用于获取更小的 bundle，以及控制资源加载优先级，如果使用合理，会极大影响加载时间。

有三种常用的代码分离方法：

- 入口起点：使用 [`entry`](/configuration/entry-context) 选项手动分离代码。
- 防止重复：使用 [`CommonsChunkPlugin`](/plugins/commons-chunk-plugin) 去重和分离 chunk。
- 动态导入：通过模块的内联函数调用来分离代码。


## Entry Points

这是迄今为止最简单、最直观的拆分代码的方式。不过，我们在学习更多文档内容时，会发现一些问题。让我们先一起来看看如何从主 bundle 中分隔出另外一个模块:

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

``` js
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.js',
    another: './src/another-module.js'
  },
  plugins: [
    new HTMLWebpackPlugin({
      title: 'Code Splitting'
    })
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

构建结果将如下所示:

``` bash
Hash: 309402710a14167f42a8
Version: webpack 2.6.1
Time: 570ms
            Asset    Size  Chunks                    Chunk Names
  index.bundle.js  544 kB       0  [emitted]  [big]  index
another.bundle.js  544 kB       1  [emitted]  [big]  another
   [0] ./~/lodash/lodash.js 540 kB {0} {1} [built]
   [1] (webpack)/buildin/global.js 509 bytes {0} {1} [built]
   [2] (webpack)/buildin/module.js 517 bytes {0} {1} [built]
   [3] ./src/another-module.js 87 bytes {1} [built]
   [4] ./src/index.js 216 bytes {0} [built]
```

正如前面提到的，这种方法存在一些问题:

- 如果入口 chunks 间包含重复的模块，重复模块都将被引入各个 bundle 中。
- 不能通过核心程序合理的动态拆分代码，它并不灵活。 

以上两点中，第一点对我们的例子来说无疑是个问题，例如 `lodash` 也被引入了 `./src/index.js`，因此，两个 bundle 包含了重复的模块。 接下来使用 `CommonsChunkPlugin` 移除重复的内容。


## 模块去重

插件 [`CommonsChunkPlugin`](/plugins/commons-chunk-plugin) 允许我们将公共的依赖项提取到已有的入口 chunk 中或者生成一个全新的 chunk 。让我们使用这个插件将之前的例子中重复的 `lodash` 模块去除:

__webpack.config.js__

``` diff
  const path = require('path');
+ const webpack = require('webpack');
  const HTMLWebpackPlugin = require('html-webpack-plugin');

  module.exports = {
    entry: {
      index: './src/index.js',
      another: './src/another-module.js'
    },
    plugins: [
      new HTMLWebpackPlugin({
        title: 'Code Splitting'
-     })
+     }),
+     new webpack.optimize.CommonsChunkPlugin({
+       name: 'common' // 指定公共 bundle 的名称。
+     })
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```

在这里使用 [`CommonsChunkPlugin`](/plugins/commons-chunk-plugin) , 我们可以看出重复的依赖从 `index.bundle.js` 中被移除了。需要注意的是，这个插件将 `lodash` 分离成单独的 chunk，并且从主 bundle 中移除减轻了大小。执行 `npm run build` 查看效果:

``` bash
Hash: 70a59f8d46ff12575481
Version: webpack 2.6.1
Time: 510ms
            Asset       Size  Chunks                    Chunk Names
  index.bundle.js  665 bytes       0  [emitted]         index
another.bundle.js  537 bytes       1  [emitted]         another
 common.bundle.js     547 kB       2  [emitted]  [big]  common
   [0] ./~/lodash/lodash.js 540 kB {2} [built]
   [1] (webpack)/buildin/global.js 509 bytes {2} [built]
   [2] (webpack)/buildin/module.js 517 bytes {2} [built]
   [3] ./src/another-module.js 87 bytes {1} [built]
   [4] ./src/index.js 216 bytes {0} [built]
```

下列几项是社区提供其它用于代码分离的插件或 loader :

- [`ExtractTextPlugin`](/plugins/extract-text-webpack-plugin): 用于将 CSS 从主应用程序中分离。
- [`bundle-loader`](/loaders/bundle-loader): 用于分离代码和延迟加载 bundle。
- [`promise-loader`](https://github.com/gaearon/promise-loader): 类似于 `bundle-loader` ，但使用 promises.

T> [`CommonsChunkPlugin`](/plugins/commons-chunk-plugin) 插件也可以使用 [明确第三方 chunks](/plugins/commons-chunk-plugin/#-chunk) 从应用程序代码中分离 vendor 模块。


## 动态引入

当涉及到动态代码拆分时，webpack提供了两个类似的技术。第一种也是优先选择的方式，使用符合动态导入的 [ECMAScript 提案](https://github.com/tc39/proposal-dynamic-import) 的 [`import()` 语法](/api/module-methods#import-)。第二种，则是使用 webpack 特殊的 [`require.ensure`](/api/module-methods#require-ensure)。让我们先尝试使用第一种...

W> `import()` 调用 [promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)。 如果你想让老的浏览器支持`Promise`(e.g. Internet Explorer)，你需要在你的私有 bundles 之前引入 `Promise` polyfill。

在我们开始以前，让我们先从配置中移除 [`entry`](/concepts/entry-points/) 和 [`CommonsChunkPlugin`](/plugins/commons-chunk-plugin)，因为后续演示中并不需要它们:

__webpack.config.js__

``` diff
  const path = require('path');
- const webpack = require('webpack');
  const HTMLWebpackPlugin = require('html-webpack-plugin');

  module.exports = {
    entry: {
+     index: './src/index.js'
-     index: './src/index.js',
-     another: './src/another-module.js'
    },
    plugins: [
      new HTMLWebpackPlugin({
        title: 'Code Splitting'
-     }),
+     })
-     new webpack.optimize.CommonsChunkPlugin({
-       name: 'common' // 指定公共 bundle 的名称。
-     })
    ],
    output: {
      filename: '[name].bundle.js',
+     chunkFilename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```

注意，这里使用了 `chunkFilename`，它决定非入口 chunk 的名称。想了解 `chunkFilename` 更多内容，请查看 [output相关文档](/configuration/output/#output-chunkfilename)。更新我们的项目，移除当前未使用的文件:

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

现在我们将使用动态导入来分离一个 chunk ，而不是静态导入 `lodash`:

__src/index.js__

``` diff
- import _ from 'lodash';
-
- function component() {
+ function getComponent() {
-   var element = document.createElement('div');
-
-   // Lodash, now imported by this script
-   element.innerHTML = _.join(['Hello', 'webpack'], ' ');
+   return import(/* webpackChunkName: "lodash" */ 'lodash').then(_ => {
+     var element = document.createElement('div');
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

注意，在注释中使用了 `webpackChunkName`。这样做会导致我们的 bundle 被命名为 `lodash.bundle.js` ，而不是 `[id].bundle.js` 。想了解更多关于 `webpackChunkName` 或 其他可用选项，请查看 [`import()` documentation](/api/module-methods#import-)。让我们执行 webpack，查看 `lodash` 是否会分离出一个单独的 bundle :

``` bash
Hash: a27e5bf1dd73c675d5c9
Version: webpack 2.6.1
Time: 544ms
           Asset     Size  Chunks                    Chunk Names
lodash.bundle.js   541 kB       0  [emitted]  [big]  lodash
 index.bundle.js  6.35 kB       1  [emitted]         index
   [0] ./~/lodash/lodash.js 540 kB {0} [built]
   [1] ./src/index.js 377 bytes {1} [built]
   [2] (webpack)/buildin/global.js 509 bytes {0} [built]
   [3] (webpack)/buildin/module.js 517 bytes {0} [built]
```

如果你已经通过预处理器启用 [`async` functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) (例如 babel)，请注意，你可以像下面那样简化代码，因为 `import()` 语句只是返回了 promises :

__src/index.js__

``` diff
- function getComponent() {
+ async function getComponent() {
-   return import(/* webpackChunkName: "lodash" */ 'lodash').then(module => {
-     var element = document.createElement('div');
-
-     element.innerHTML = _.join(['Hello', 'webpack'], ' ');
-
-     return element;
-
-   }).catch(error => 'An error occurred while loading the component');
+   var element = document.createElement('div');
+   const _ = await import(/* webpackChunkName: "lodash" */ 'lodash');
+
+   element.innerHTML = _.join(['Hello', 'webpack'], ' ');
+
+   return element;
  }

  getComponent().then(component => {
    document.body.appendChild(component);
  });
```


## Bundle 分析

一旦开始分隔代码，输出分析就可以检查模块的最终位置。[官方分析工具](https://github.com/webpack/analyse) 是一个好的选择。下面是一些社区提供的工具:

- [webpack-chart](https://alexkuz.github.io/webpack-chart/): webpack 数据交互饼图。
- [webpack-visualizer](https://chrisbateman.github.io/webpack-visualizer/): 可视化分析您的包，检查哪些模块占用空间，哪些可能是重复使用的。
- [webpack-bundle-analyzer](https://github.com/th0r/webpack-bundle-analyzer): 一款分析 bundle 内容的插件及CLI工具，以便捷的、交互式、可缩放的树状图形式展现给用户。


## 下一步

请参阅 [懒加载](/guides/lazy-loading) 一个更具体的例子，说明如何在实际应用中使用 `import()` 并学习如何使用 [Caching](/guides/caching) 更有效的分割代码。

***

> 原文：https://webpack.js.org/guides/code-splitting/
