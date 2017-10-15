---
title: 缓存
sort: 11
contributors:
  - okonet
  - jouni-kantola
  - skipjack
  - dannycjones
related:
  - title: 可预测的长效缓存
    url: https://medium.com/webpack/predictable-long-term-caching-with-webpack-d3eee1d3fa31
  - title: Long Term Caching of Static Assets
    url: https://medium.com/@okonetchnikov/long-term-caching-of-static-assets-with-webpack-1ecb139adb95#.vtwnssps4
  - title: Webpack & Caching
    url: https://gist.github.com/sokra/ff1b0290282bfa2c037bdb6dcca1a7aa
  - title: Advanced Webpack Presentation
    url: https://presentations.survivejs.com/advanced-webpack/
  - title: Issue 1315
    url: https://github.com/webpack/webpack/issues/1315
  - title: Issue 652
    url: https://github.com/webpack/webpack.js.org/issues/652
---

T> 本指南中的示例来自[起步](/guides/getting-started)、[管理输出](/guides/output-management)和[代码分离](/guides/code-splitting)。

以上，我们使用 webpack 来打包我们的模块化后的应用程序，webpack 会生成一个可部署的 `/dist` 目录，然后把打包后的内容放置在此目录中。只要 `/dist` 目录中的内容部署到服务器上，客户端（通常是浏览器）就能够访问网站此服务器的网站及其资源。而最后一步获取资源是比较耗费时间的，这就是为什么浏览器使用一种名为[缓存](http://searchstorage.techtarget.com/definition/cache)的技术。可以通过命中缓存，以降低网络流量，使网站加载速度更快，然而，如果我们在部署新版本时不更改资源的文件名，浏览器可能会认为它没有被更新，就会使用它的缓存版本。由于缓存的存在，当你需要获取新的代码时，就会显得很棘手。

此指南的重点在于通过必要的配置，以确保 webpack 编译生成的文件能够被客户端缓存，而在文件内容变化后，能够请求到新的文件。


## 输出文件的文件名(Output Filenames)

通过使用 `output.filename` 进行[文件名替换](/configuration/output#output-filename)，可以确保浏览器获取到修改后的文件。`[hash]` 替换可以用于在文件名中包含一个构建相关(build-specific)的 hash，但是更好的方式是使用 `[chunkhash]` 替换，在文件名中包含一个 chunk 相关(chunk-specific)的哈希。

让我们使用[起步](/guides/getting-started) 中的示例，以及[管理输出](/guides/output-management) 中的 `plugins` 来作为项目的基础，所以我们不必手动处理维护 `index.html` 文件：

__project__

``` diff
webpack-demo
|- package.json
|- webpack.config.js
|- /dist
|- /src
  |- index.js
|- /node_modules
```

__webpack.config.js__

``` diff
  const path = require('path');
  const CleanWebpackPlugin = require('clean-webpack-plugin');
  const HtmlWebpackPlugin = require('html-webpack-plugin');

  module.exports = {
    entry: './src/index.js',
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
-       title: 'Output Management'
+       title: 'Caching'
      })
    ],
    output: {
-     filename: 'bundle.js',
+     filename: '[name].[chunkhash].js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```

使用此配置，然后运行我们的构建脚本 `npm run build`，应该产生以下输出：

``` bash
Hash: f7a289a94c5e4cd1e566
Version: webpack 3.5.1
Time: 835ms
                       Asset       Size  Chunks                    Chunk Names
main.7e2c49a622975ebd9b7e.js     544 kB       0  [emitted]  [big]  main
                  index.html  197 bytes          [emitted]
   [0] ./src/index.js 216 bytes {0} [built]
   [2] (webpack)/buildin/global.js 509 bytes {0} [built]
   [3] (webpack)/buildin/module.js 517 bytes {0} [built]
    + 1 hidden module
Child html-webpack-plugin for "index.html":
     1 asset
       [2] (webpack)/buildin/global.js 509 bytes {0} [built]
       [3] (webpack)/buildin/module.js 517 bytes {0} [built]
        + 2 hidden modules
```

可以看到，bundle 的名称是它内容（通过 hash）的映射。如果我们不做修改，然后再次运行构建，我们的文件名按照期望，依然保持不变。然而，如果我们再次运行，可能会发现情况并非如此：

``` bash
Hash: f7a289a94c5e4cd1e566
Version: webpack 3.5.1
Time: 835ms
                       Asset       Size  Chunks                    Chunk Names
main.205199ab45963f6a62ec.js     544 kB       0  [emitted]  [big]  main
                  index.html  197 bytes          [emitted]
   [0] ./src/index.js 216 bytes {0} [built]
   [2] (webpack)/buildin/global.js 509 bytes {0} [built]
   [3] (webpack)/buildin/module.js 517 bytes {0} [built]
    + 1 hidden module
Child html-webpack-plugin for "index.html":
     1 asset
       [2] (webpack)/buildin/global.js 509 bytes {0} [built]
       [3] (webpack)/buildin/module.js 517 bytes {0} [built]
        + 2 hidden modules
```

这也是因为 webpack 在入口 chunk 中，包含了某些样板(boilerplate)，特别是 runtime 和 manifest。（译注：样板(boilerplate)指 webpack 运行时的引导代码）

W> 输出可能会因当前的 webpack 版本而稍有差异。新版本不一定有和旧版本相同的 hash 问题，但我们以下推荐的步骤，仍然是可靠的。

## 提取模板(Extracting Boilerplate)

就像我们之前从[代码分离](/guides/code-splitting)了解到的，[`CommonsChunkPlugin`](/plugins/commons-chunk-plugin) 可以用于将模块分离到单独的文件中。然而 `CommonsChunkPlugin` 有一个较少有人知道的功能是，能够在每次修改后的构建结果中，将 webpack 的样板(boilerplate)和 manifest 提取出来。通过指定 `entry` 配置中未用到的名称，此插件会自动将我们需要的内容提取到单独的包中：

__webpack.config.js__

``` diff
  const path = require('path');
+ const webpack = require('webpack');
  const CleanWebpackPlugin = require('clean-webpack-plugin');
  const HtmlWebpackPlugin = require('html-webpack-plugin');

  module.exports = {
    entry: './src/index.js',
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
        title: 'Caching'
-     })
+     }),
+     new webpack.optimize.CommonsChunkPlugin({
+       name: 'runtime'
+     })
    ],
    output: {
      filename: '[name].[chunkhash].js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```

让我们再次构建，然后查看提取出来的 `runtime` bundle：

``` bash
Hash: 80552632979856ddab34
Version: webpack 3.3.0
Time: 1512ms
                          Asset       Size  Chunks                    Chunk Names
   main.5ec8e954e32d66dee1aa.js     542 kB       0  [emitted]  [big]  main
runtime.719796322be98041fff2.js    5.82 kB       1  [emitted]         runtime
                     index.html  275 bytes          [emitted]
   [0] ./src/index.js 336 bytes {0} [built]
   [2] (webpack)/buildin/global.js 509 bytes {0} [built]
   [3] (webpack)/buildin/module.js 517 bytes {0} [built]
    + 1 hidden module
```

将第三方库(library)（例如 `lodash` 或 `react`）提取到单独的 `vendor` chunk 文件中，是比较推荐的做法，这是因为，它们很少像本地的源代码那样频繁修改。因此通过实现以上步骤，利用客户端的长效缓存机制，可以通过命中缓存来消除请求，并减少向服务器获取资源，同时还能保证客户端代码和服务器端代码版本一致。这可以通过使用新的 `entry(入口)` 起点，以及再额外配置一个 `CommonsChunkPlugin` 实例的组合方式来实现：

__webpack.config.js__

``` diff
  var path = require('path');
  const webpack = require('webpack');
  const CleanWebpackPlugin = require('clean-webpack-plugin');
  const HtmlWebpackPlugin = require('html-webpack-plugin');

  module.exports = {
-   entry: './src/index.js',
+   entry: {
+     main: './src/index.js',
+     vendor: [
+       'lodash'
+     ]
+   },
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
        title: 'Caching'
      }),
+     new webpack.optimize.CommonsChunkPlugin({
+       name: 'vendor'
+     }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'runtime'
      })
    ],
    output: {
      filename: '[name].[chunkhash].js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```

W> 注意，引入顺序在这里很重要。`CommonsChunkPlugin` 的 `'vendor'` 实例，必须在 `'runtime'` 实例之前引入。

让我们再次构建，然后查看新的 `vendor` bundle：

``` bash
Hash: 69eb92ebf8935413280d
Version: webpack 3.3.0
Time: 1502ms
                          Asset       Size  Chunks                    Chunk Names
 vendor.8196d409d2f988123318.js     541 kB       0  [emitted]  [big]  vendor
   main.0ac0ae2d4a11214ccd19.js  791 bytes       1  [emitted]         main
runtime.004a1114de8bcf026622.js    5.85 kB       2  [emitted]         runtime
                     index.html  352 bytes          [emitted]
   [1] ./src/index.js 336 bytes {1} [built]
   [2] (webpack)/buildin/global.js 509 bytes {0} [built]
   [3] (webpack)/buildin/module.js 517 bytes {0} [built]
   [4] multi lodash 28 bytes {0} [built]
    + 1 hidden module
```


## 模块标识符(Module Identifiers)

让我们向项目中再添加一个模块 `print.js`：

__project__

``` diff
webpack-demo
|- package.json
|- webpack.config.js
|- /dist
|- /src
  |- index.js
+ |- print.js
|- /node_modules
```

__print.js__

``` diff
+ export default function print(text) {
+   console.log(text);
+ };
```

__src/index.js__

``` diff
  import _ from 'lodash';
+ import Print from './print';

  function component() {
    var element = document.createElement('div');

    // lodash 是由当前 script 脚本 import 导入进来的
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
+   element.onclick = Print.bind(null, 'Hello webpack!');

    return element;
  }

  document.body.appendChild(component());
```

再次运行构建，然后我们期望的是，只有 `main` bundle 的 hash 发生变化，然而……

``` bash
Hash: d38a06644fdbb898d795
Version: webpack 3.3.0
Time: 1445ms
                          Asset       Size  Chunks                    Chunk Names
 vendor.a7561fb0e9a071baadb9.js     541 kB       0  [emitted]  [big]  vendor
   main.b746e3eb72875af2caa9.js    1.22 kB       1  [emitted]         main
runtime.1400d5af64fc1b7b3a45.js    5.85 kB       2  [emitted]         runtime
                     index.html  352 bytes          [emitted]
   [1] ./src/index.js 421 bytes {1} [built]
   [2] (webpack)/buildin/global.js 509 bytes {0} [built]
   [3] (webpack)/buildin/module.js 517 bytes {0} [built]
   [4] ./src/print.js 62 bytes {1} [built]
   [5] multi lodash 28 bytes {0} [built]
    + 1 hidden module
```

……我们可以看到这三个文件的 hash 都变化了。这是因为每个 [`module.id`](/api/module-variables#module-id-commonjs-) 会基于默认的解析顺序(resolve order)进行增量。也就是说，当解析顺序发生变化，ID 也会随之改变。因此，简要概括：

- `main` bundle 会随着自身的新增内容的修改，而发生变化。
- `vendor` bundle 会随着自身的 `module.id` 的修改，而发生变化。
- `runtime` bundle 会因为当前包含一个新模块的引用，而发生变化。

第一个和最后一个都是符合预期的行为 -- 而 `vendor` 的 hash 发生变化是我们要修复的。幸运的是，可以使用两个插件来解决这个问题。第一个插件是 [`NamedModulesPlugin`](/plugins/named-modules-plugin)，将使用模块的路径，而不是数字标识符。虽然此插件有助于在开发过程中输出结果的可读性，然而执行时间会长一些。第二个选择是使用 [`HashedModuleIdsPlugin`](/plugins/hashed-module-ids-plugin)，推荐用于生产环境构建：

__webpack.config.js__

``` diff
  const path = require('path');
  const webpack = require('webpack');
  const CleanWebpackPlugin = require('clean-webpack-plugin');
  const HtmlWebpackPlugin = require('html-webpack-plugin');

  module.exports = {
    entry: {
      main: './src/index.js',
      vendor: [
        'lodash'
      ]
    },
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
        title: 'Caching'
      }),
+     new webpack.HashedModuleIdsPlugin(),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor'
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'runtime'
      })
    ],
    output: {
      filename: '[name].[chunkhash].js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```

现在，不管再添加任何新的本地依赖，对于每次构建，`vendor` hash 都应该保持一致：

``` bash
Hash: 1f49b42afb9a5acfbaff
Version: webpack 3.3.0
Time: 1372ms
                          Asset       Size  Chunks                    Chunk Names
 vendor.eed6dcc3b30cfa138aaa.js     541 kB       0  [emitted]  [big]  vendor
   main.d103ac311788fcb7e329.js    1.22 kB       1  [emitted]         main
runtime.d2a6dc1ccece13f5a164.js    5.85 kB       2  [emitted]         runtime
                     index.html  352 bytes          [emitted]
[3Di9] ./src/print.js 62 bytes {1} [built]
[3IRH] (webpack)/buildin/module.js 517 bytes {0} [built]
[DuR2] (webpack)/buildin/global.js 509 bytes {0} [built]
   [0] multi lodash 28 bytes {0} [built]
[lVK7] ./src/index.js 421 bytes {1} [built]
    + 1 hidden module
```

然后，修改我们的 `src/index.js`，临时移除额外的依赖：

__src/index.js__

``` diff
  import _ from 'lodash';
- import Print from './print';
+ // import Print from './print';

  function component() {
    var element = document.createElement('div');

    // lodash 是由当前 script 脚本 import 导入进来的
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
-   element.onclick = Print.bind(null, 'Hello webpack!');
+   // element.onclick = Print.bind(null, 'Hello webpack!');

    return element;
  }

  document.body.appendChild(component());
```

最后，再次运行我们的构建：

``` bash
Hash: 37e1358f135c0b992f72
Version: webpack 3.3.0
Time: 1557ms
                          Asset       Size  Chunks                    Chunk Names
 vendor.eed6dcc3b30cfa138aaa.js     541 kB       0  [emitted]  [big]  vendor
   main.fc7f38e648da79db2aba.js  891 bytes       1  [emitted]         main
runtime.bb5820632fb66c3fb357.js    5.85 kB       2  [emitted]         runtime
                     index.html  352 bytes          [emitted]
[3IRH] (webpack)/buildin/module.js 517 bytes {0} [built]
[DuR2] (webpack)/buildin/global.js 509 bytes {0} [built]
   [0] multi lodash 28 bytes {0} [built]
[lVK7] ./src/index.js 427 bytes {1} [built]
    + 1 hidden module
```

我们可以看到，这两次构建中，`vendor` bundle 的文件名称，都是 `eed6dcc3b30cfa138aaa`。


## 结论

缓存从凌乱变得清晰直接。然而以上预先演示，只能帮助你在部署一致性(deploying consistent)和资源可缓存(cachable assets)方面，有个好的开始。想要了解更多信息，请查看以下的_进一步阅读_部分。

***

## 译注

章节示例：[dear-lizhihua/webpack.js.org-demos](https://github.com/dear-lizhihua/webpack.js.org-demos/tree/webpack.js.org/guides/caching)

***

***

> 原文：https://webpack.js.org/guides/caching/
