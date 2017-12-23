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

- 入口起点：使用 [`entry`](/configuration/entry-context) 配置手动地分离代码。
- 防止重复：使用 [`CommonsChunkPlugin`](/plugins/commons-chunk-plugin) 去重和分离 chunk。
- 动态导入：通过模块的内联函数调用来分离代码。


## 入口起点(entry points)

这是迄今为止最简单、最直观的分离代码的方式。不过，这种方式手动配置较多，并有一些陷阱，我们将会解决这些问题。先来看看如何从 main bundle 中分离另一个模块：

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

这将生成如下构建结果：

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

- 如果入口 chunks 之间包含重复的模块，那些重复模块都会被引入到各个 bundle 中。
- 这种方法不够灵活，并且不能将核心应用程序逻辑进行动态拆分代码。

以上两点中，第一点对我们的示例来说无疑是个问题，因为之前我们在 `./src/index.js` 中也引入过 `lodash`，这样就在两个 bundle 中造成重复引用。接着，我们通过使用 `CommonsChunkPlugin` 来移除重复的模块。


## 防止重复(prevent duplication)

[`CommonsChunkPlugin`](/plugins/commons-chunk-plugin) 插件可以将公共的依赖模块提取到已有的入口 chunk 中，或者提取到一个新生成的 chunk。让我们使用这个插件，将之前的示例中重复的 `lodash` 模块去除：

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

这里我们使用 [`CommonsChunkPlugin`](/plugins/commons-chunk-plugin) 之后，现在应该可以看出，`index.bundle.js` 中已经移除了重复的依赖模块。需要注意的是，CommonsChunkPlugin 插件将 `lodash` 分离到单独的 chunk，并且将其从 main bundle 中移除，减轻了大小。执行 `npm run build` 查看效果：

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

以下是由社区提供的，一些对于代码分离很有帮助的插件和 loaders：

- [`ExtractTextPlugin`](/plugins/extract-text-webpack-plugin): 用于将 CSS 从主应用程序中分离。
- [`bundle-loader`](/loaders/bundle-loader): 用于分离代码和延迟加载生成的 bundle。
- [`promise-loader`](https://github.com/gaearon/promise-loader): 类似于 `bundle-loader` ，但是使用的是 promises。

[`CommonsChunkPlugin`](/plugins/commons-chunk-plugin) 插件还可以通过使用[显式的 vendor chunks](/plugins/commons-chunk-plugin/#explicit-vendor-chunk) 功能，从应用程序代码中分离 vendor 模块。


## 动态导入(dynamic imports)

当涉及到动态代码拆分时，webpack 提供了两个类似的技术。对于动态导入，第一种，也是优先选择的方式是，使用符合 [ECMAScript 提案](https://github.com/tc39/proposal-dynamic-import) 的 [`import()` 语法](/api/module-methods#import-)。第二种，则是使用 webpack 特定的 [`require.ensure`](/api/module-methods#require-ensure)。让我们先尝试使用第一种……

W> `import()` 调用会在内部用到 [promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)。如果在旧有版本浏览器中使用 `import()`，记得使用 一个 polyfill 库（例如 [es6-promise](https://github.com/stefanpenner/es6-promise) 或 [promise-polyfill](https://github.com/taylorhakes/promise-polyfill)），来 shim `Promise`。

在我们开始本节之前，先从配置中移除掉多余的 [`entry`](/concepts/entry-points/) 和 [`CommonsChunkPlugin`](/plugins/commons-chunk-plugin)，因为接下来的演示中并不需要它们：

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

注意，这里使用了 `chunkFilename`，它决定非入口 chunk 的名称。想了解 `chunkFilename` 更多信息，请查看 [output 相关文档](/configuration/output/#output-chunkfilename)。接着，更新我们的项目，移除掉那些现在不会用到的文件:

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

现在，我们不再使用静态导入 `lodash`，而是通过使用动态导入来分离一个 chunk：

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

注意，在注释中使用了 `webpackChunkName`。这样做会导致我们的 bundle 被命名为 `lodash.bundle.js` ，而不是 `[id].bundle.js` 。想了解更多关于 `webpackChunkName` 和其他可用选项，请查看 [`import()` 相关文档](/api/module-methods#import-)。让我们执行 webpack，查看 `lodash` 是否会分离到一个单独的 bundle：

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

如果你已经通过类似 babel 的预处理器(pre-processor)启用 [`async` 函数](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)，请注意，你可以像下面那样简化代码，因为 `import()` 语句恰好会返回 promises：

__src/index.js__

``` diff
- function getComponent() {
+ async function getComponent() {
-   return import(/* webpackChunkName: "lodash" */ 'lodash').then(_ => {
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


## bundle 分析(bundle analysis)

如果我们以分离代码作为开始，那么就以检查模块作为结束，分析输出结果是很有用处的。[官方分析工具](https://github.com/webpack/analyse) 是一个好的初始选择。下面是一些社区支持(community-supported)的可选工具：

- [webpack-chart](https://alexkuz.github.io/webpack-chart/): webpack 数据交互饼图。
- [webpack-visualizer](https://chrisbateman.github.io/webpack-visualizer/): 可视化并分析你的 bundle，检查哪些模块占用空间，哪些可能是重复使用的。
- [webpack-bundle-analyzer](https://github.com/th0r/webpack-bundle-analyzer): 一款分析 bundle 内容的插件及 CLI 工具，以便捷的、交互式、可缩放的树状图形式展现给用户。


## 下一步

关于「如何在真正的应用程序和[缓存](/guides/caching)中 `import()` 导入」以及学习「如何更加高效地分离代码」的具体示例，请查看[懒加载](/guides/lazy-loading)。

***

> 原文：https://webpack.js.org/guides/code-splitting/
