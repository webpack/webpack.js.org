---
title: 生产环境构建
sort: 8
contributors:
  - henriquea
  - rajagopal4890
  - markerikson
  - simon04
  - kisnows
  - chrisVillanueva
  - swapnilmishra
  - bring2dip
  - redian
  - skipjack
  - xgqfrms
  - kelset
  - xgirma
---

在本指南中，我们将深入一些最佳实践，并且使用工具，将网站或应用程序构建到生产环境中。

T> 以下示例来源于 [tree shaking](/guides/tree-shaking) 和 [开发](/guides/development)。在继续之前，请确保你已经熟悉这些指南中所介绍的概念/配置。


## 配置

_开发环境(development)_和_生产环境(production)_的构建目标差异很大。在_开发环境_中，我们需要具有强大的、具有实时重新加载(live reloading)或热模块替换(hot module replacement)能力的 source map 和 localhost server。而在_生产环境_中，我们的目标则转向于关注更小的 bundle，更轻量的 source map，以及更优化的资源，以改善加载时间。由于要遵循逻辑分离，我们通常建议为每个环境编写__彼此独立的 webpack 配置__。

虽然，以上我们将_生产环境_和_开发环境_做了略微区分，但是，请注意，我们还是会遵循不重复原则(Don't repeat yourself - DRY)，保留一个“通用”配置。为了将这些配置合并在一起，我们将使用一个名为 [`webpack-merge`](https://github.com/survivejs/webpack-merge) 的工具。通过“通用”配置，我们不必在环境特定(environment-specific)的配置中重复代码。

我们先从安装 `webpack-merge` 开始，并将之前指南中已经成型的那些代码再次进行分离：

``` bash
npm install --save-dev webpack-merge
```

__project__

``` diff
  webpack-demo
  |- package.json
- |- webpack.config.js
+ |- webpack.common.js
+ |- webpack.dev.js
+ |- webpack.prod.js
  |- /dist
  |- /src
    |- index.js
    |- math.js
  |- /node_modules
```

__webpack.common.js__

``` diff
+ const path = require('path');
+ const CleanWebpackPlugin = require('clean-webpack-plugin');
+ const HtmlWebpackPlugin = require('html-webpack-plugin');
+
+ module.exports = {
+   entry: {
+     app: './src/index.js'
+   },
+   plugins: [
+     new CleanWebpackPlugin(['dist']),
+     new HtmlWebpackPlugin({
+       title: 'Production'
+     })
+   ],
+   output: {
+     filename: '[name].bundle.js',
+     path: path.resolve(__dirname, 'dist')
+   }
+ };
```

__webpack.dev.js__

``` diff
+ const merge = require('webpack-merge');
+ const common = require('./webpack.common.js');
+
+ module.exports = merge(common, {
+   devtool: 'inline-source-map',
+   devServer: {
+     contentBase: './dist'
+   }
+ });
```

__webpack.prod.js__

``` diff
+ const merge = require('webpack-merge');
+ const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
+ const common = require('./webpack.common.js');
+
+ module.exports = merge(common, {
+   plugins: [
+     new UglifyJSPlugin()
+   ]
+ });
```

现在，在 `webpack.common.js` 中，我们设置了 `entry` 和 `output` 配置，并且在其中引入这两个环境公用的全部插件。在 `webpack.dev.js` 中，我们为此环境添加了推荐的 `devtool`（强大的 source map）和简单的 `devServer` 配置。最后，在 `webpack.prod.js` 中，我们引入了之前在 [tree shaking](/guides/tree-shaking) 指南中介绍过的 `UglifyJSPlugin`。

注意，在环境特定的配置中使用 `merge()` 很容易地包含我们在 `dev` 和 `prod` 中的常见配置。`webpack-merge` 工具提供了多种合并(merge)的高级功能，但是在我们的用例中，无需用到这些功能。


## NPM Scripts

现在，我们把 `scripts` 重新指向到新配置。我们将 `npm start` 定义为_开发环境_脚本，并在其中使用 `webpack-dev-server`，将 `npm run build` 定义为_生产环境_脚本：

__package.json__

``` diff
  {
    "name": "development",
    "version": "1.0.0",
    "description": "",
    "main": "webpack.config.js",
    "scripts": {
-     "start": "webpack-dev-server --open",
+     "start": "webpack-dev-server --open --config webpack.dev.js",
-     "build": "webpack"
+     "build": "webpack --config webpack.prod.js"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "devDependencies": {
      "clean-webpack-plugin": "^0.1.17",
      "css-loader": "^0.28.4",
      "csv-loader": "^2.1.1",
      "express": "^4.15.3",
      "file-loader": "^0.11.2",
      "html-webpack-plugin": "^2.29.0",
      "style-loader": "^0.18.2",
      "webpack": "^3.0.0",
      "webpack-dev-middleware": "^1.12.0",
      "webpack-dev-server": "^2.9.1",
      "webpack-merge": "^4.1.0",
      "xml-loader": "^1.2.1"
    }
  }
```

随意运行这些脚本，然后查看输出结果的变化，然后我们继续添加一些_生产环境_配置。


## Minification

注意，虽然 [`UglifyJSPlugin`](/plugins/uglifyjs-webpack-plugin) 是代码压缩方面比较好的选择，但是还有一些其他可选择项。以下有几个同样很受欢迎的插件：

- [`BabelMinifyWebpackPlugin`](https://github.com/webpack-contrib/babel-minify-webpack-plugin)
- [`ClosureCompilerPlugin`](https://github.com/roman01la/webpack-closure-compiler)

如果决定尝试以上这些，只要确保新插件也会按照 [tree shake](/guides/tree-shaking) 指南中所陈述的，具有删除未引用代码(dead code)的能力足矣。


## source map

我们鼓励你在生产环境中启用 source map，因为它们对调试源码(debug)和运行基准测试(benchmark tests)很有帮助。虽然有如此强大的功能，然而还是应该针对生成环境用途，选择一个构建快速的推荐配置（具体细节请查看 [`devtool`](/configuration/devtool)）。对于本指南，我们将在_生产环境_中使用 `source-map` 选项，而不是我们在_开发环境_中用到的 `inline-source-map`：

__webpack.prod.js__

``` diff
  const merge = require('webpack-merge');
  const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
  const common = require('./webpack.common.js');

  module.exports = merge(common, {
+   devtool: 'source-map',
    plugins: [
-     new UglifyJSPlugin()
+     new UglifyJSPlugin({
+       sourceMap: true
+     })
    ]
  })
```

T> 避免在生产中使用 `inline-***` 和 `eval-***`，因为它们可以增加 bundle 大小，并降低整体性能。

## 指定环境

许多 library 将通过与 `process.env.NODE_ENV` 环境变量关联，以决定 library 中应该引用哪些内容。例如，当不处于_生产环境_中时，某些 library 为了使调试变得容易，可能会添加额外的日志记录(log)和测试(test)。其实，当使用 `process.env.NODE_ENV === 'production'` 时，一些 library 可能针对具体用户的环境进行代码优化，从而删除或添加一些重要代码。我们可以使用 webpack 内置的 [`DefinePlugin`](/plugins/define-plugin) 为所有的依赖定义这个变量：

__webpack.prod.js__

``` diff
+ const webpack = require('webpack');
  const merge = require('webpack-merge');
  const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
  const common = require('./webpack.common.js');

  module.exports = merge(common, {
    devtool: 'cheap-module-source-map',
    plugins: [
      new UglifyJSPlugin({
        sourceMap: true
      }),
+     new webpack.DefinePlugin({
+       'process.env.NODE_ENV': JSON.stringify('production')
+     })
    ]
  })
```

T> 技术上讲，`NODE_ENV` 是一个由 Node.js 暴露给执行脚本的系统环境变量。通常用于决定在开发环境与生产环境(dev-vs-prod)下，服务器工具、构建脚本和客户端 library 的行为。然而，与预期不同的是，无法在构建脚本 `webpack.config.js` 中，将 `process.env.NODE_ENV` 设置为 `"production"`，请查看 [#2537](https://github.com/webpack/webpack/issues/2537)。因此，例如 `process.env.NODE_ENV === 'production' ? '[name].[hash].bundle.js' : '[name].bundle.js'` 这样的条件语句，在 webpack 配置文件中，无法按照预期运行。

如果您正在使用像 [`react`](https://facebook.github.io/react/) 这样的 library，那么在添加此 DefinePlugin 插件后，你应该看到 bundle 大小显著下降。还要注意，任何位于 `/src` 的本地代码都可以关联到 process.env.NODE_ENV 环境变量，所以以下检查也是有效的：

__src/index.js__

``` diff
  import { cube } from './math.js';
+
+ if (process.env.NODE_ENV !== 'production') {
+   console.log('Looks like we are in development mode!');
+ }

  function component() {
    var element = document.createElement('pre');

    element.innerHTML = [
      'Hello webpack!',
      '5 cubed is equal to ' + cube(5)
    ].join('\n\n');

    return element;
  }

  document.body.appendChild(component());
```


## CLI 替代选项

以上描述也可以通过命令行实现。例如，`--optimize-minimize` 标记将在后台引用 `UglifyJSPlugin`。和以上描述的 `DefinePlugin` 实例相同，`--define process.env.NODE_ENV="'production'"` 也会做同样的事情。并且，`webpack -p` 将自动地调用上述这些标记，从而调用需要引入的插件。

这些简便方式虽然都很不错，但是我们通常建议只使用配置方式，因为在这两种场景中下，配置方式能够更好地帮助你了解自己正在做的事情。配置方式还可以让你更方便地控制这两个插件中的其他选项。

***

> 原文：https://webpack.js.org/guides/production/
