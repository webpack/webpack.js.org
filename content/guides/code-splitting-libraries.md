---
title: 代码分离 - Libraries
sort: 32
contributors:
  - pksjce
  - chrisVillanueva
  - johnstew
  - rafde
  - bartushek
  - shaunwallace
---

一个典型的应用程序会使用第三方框架、工具库。这些库一般使用特定的版本并且其代码不经常改变。然而，应用本身的代码会频繁改变。

把第三方代码和应用本身的代码一起打包是非常低效的。因为浏览器会根据缓存头来缓存资源文件，如果文件没有被改变，文件将会被缓存从而不用去再次请求 cdn。为了利用这一特性，我们希望不管应用本身的代码如何改变，vendor 文件的 hash 始终恒定不变。

只有当我们把 vendor 和应用代码的 bundle 分离时，才能实现这一点。

让我们考虑一个使用了 [momentjs](https://www.npmjs.com/package/moment)（一种常用的时间格式化库）的示例应用程序。

在你的应用路径下安装 `moment`，如下：

`npm install --save moment`

index.js 文件会引用 `moment` 并且输出当前的时间，代码如下：

__index.js__
```javascript
var moment = require('moment');
console.log(moment().format());

```

我们可以用 webpack 通过如下的配置来打包（bundle）该应用：

__webpack.config.js__

```javascript
var path = require('path');

module.exports = function(env) {
    return {
        entry: './index.js',
        output: {
            filename: '[name].[chunkhash].js',
            path: path.resolve(__dirname, 'dist')
        }
    }
}
```

在项目中运行 `webpack`，如果你查看生成的包，会发现 `moment` 和 `index.js` 都被打包进了 `bundle.js`。

这对于该应用来说是很不理想的。如果 `index.js` 中的代码改变了，那么整个 bundle 都会重新构建。浏览器就需要加载新的 bundle，即使其中大部分代码都没改变。

## 多入口

让我们尝试通过为 `moment` 添加一个单独的入口点并将其命名为 `vendor` 来缓解这一情况。

__webpack.config.js__

```javascript
var path = require('path');

module.exports = function(env) {
    return {
        entry: {
            main: './index.js',
            vendor: 'moment'
        },
        output: {
            filename: '[name].[chunkhash].js',
            path: path.resolve(__dirname, 'dist')
        }
    }
}
```

再次运行 `webpack`，可以发现生成了两个 bundle。然而如果查看他们的代码，会发现 `moment` 的代码在两个文件中都出现了！其原因是 `moment` 是主应用程序（例如 index.js）的依赖模块，每个入口起点都会打包自己的依赖模块。

正是由于这个原因，我们需要使用 [CommonsChunkPlugin](/plugins/commons-chunk-plugin)。

## `CommonsChunkPlugin`

这是一个非常复杂的插件。它从根本上允许我们从不同的 bundle 中提取所有的公共模块，并且将他们加入公共 bundle 中。如果公共 bundle 不存在，那么它将会创建一个出来。

我们可以通过修改 webpack 配置文件来使用 `CommonsChunkPlugin`，代码如下：

__webpack.config.js__

```javascript
var webpack = require('webpack');
var path = require('path');

module.exports = function(env) {
    return {
        entry: {
            main: './index.js',
            vendor: 'moment'
        },
        output: {
            filename: '[name].[chunkhash].js',
            path: path.resolve(__dirname, 'dist')
        },
        plugins: [
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor' // 指定公共 bundle 的名字。
            })
        ]
    }
}
```
现在运行 `webpack`。查看结果会发现 `moment` 代码只会出现在 vendor bundle 中。

## 隐式公共 vendor chunk

你可以将 `CommonsChunkPlugin` 配置为只接受 vendor 库。

 __webpack.config.js__

```javascript
var webpack = require('webpack');
var path = require('path');

module.exports = function() {
    return {
        entry: {
            main: './index.js'
        },
        output: {
            filename: '[name].[chunkhash].js',
            path: path.resolve(__dirname, 'dist')
        },
        plugins: [
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor',
                minChunks: function (module) {
                   // 该配置假定你引入的 vendor 存在于 node_modules 目录中
                   return module.context && module.context.indexOf('node_modules') !== -1;
                }
            })
        ]
    };
}
```

## Manifest 文件

但是，如果我们改变应用的代码并且再次运行 `webpack`，可以看到 vendor 文件的 hash 改变了。即使我们把 `vendor` 和 `main` 的 bundle 分开了，也会发现 `vendor` bundle 会随着应用代码改变。
这意味着我们还是无法从浏览器缓存机制中受益，因为 vendor 的 hash 在每次构建中都会改变，浏览器也必须重新加载文件。

这里的问题在于，每次构建时，webpack 生成了一些 webpack runtime 代码，用来帮助 webpack 完成其工作。当只有一个 bundle 的时候，runtime 代码驻留在其中。但是当生成多个 bundle 的时候，运行时代码被提取到了公共模块中，在这里就是 `vendor` 文件。

为了防止这种情况，我们需要将运行时代码提取到一个单独的 manifest 文件中。尽管我们又创建了另一个 bundle，其开销也被我们在 `vendor` 文件的长期缓存中获得的好处所抵消。

__webpack.config.js__

```javascript
var webpack = require('webpack');
var path = require('path');

module.exports = function(env) {
    return {
        entry: {
            main: './index.js',
            vendor: 'moment'
        },
        output: {
            filename: '[name].[chunkhash].js',
            path: path.resolve(__dirname, 'dist')
        },
        plugins: [
            new webpack.optimize.CommonsChunkPlugin({
                names: ['vendor', 'manifest'] // 指定公共 bundle 的名字。
            })
        ]
    }
};
```

使用上面的 webpack 配置，我们看到生成了三个bundle：`vendor`、`main`和`manifest`。

使用我们迄今为止所学到的知识，我们也可以通过一个隐含的通用 vendor chunk 实现相同的结果。

 __webpack.config.js__

```javascript
var webpack = require('webpack');
var path = require('path');

module.exports = function() {
    return {
        entry: {
            main: './index.js' //Notice that we do not have an explicit vendor entry here
        },
        output: {
            filename: '[name].[chunkhash].js',
            path: path.resolve(__dirname, 'dist')
        },
        plugins: [
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor',
                minChunks: function (module) {
                   // this assumes your vendor imports exist in the node_modules directory
                   return module.context && module.context.indexOf('node_modules') !== -1;
                }
            }),
            //CommonChunksPlugin will now extract all the common modules from vendor and main bundles
            new webpack.optimize.CommonsChunkPlugin({
                name: 'manifest' //But since there are no more common modules between them we end up with just the runtime code included in the manifest file
            })
        ]
    };
}
```

T> 注意，长效的 bundle 缓存是通过“基于内容的 hash 策略”来实现的（content-based hashing）。查阅更多关于[缓存](/guides/caching/)。

***

> 原文：https://webpack.js.org/guides/code-splitting-libraries/