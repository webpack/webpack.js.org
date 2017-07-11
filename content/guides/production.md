---
title: 生产环境构建
sort: 7
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
---

以下文章描述了最佳实践，和在使用 webpack 构建生产环境中的站点或应用程序时，所使用的工具。


## 自动方式

运行`webpack -p` (也可以运行 `webpack --optimize-minimize --define process.env.NODE_ENV="'production'"`，他们是等效的)。它会执行如下步骤：

- 使用 `UglifyJsPlugin` 进行 JS 文件压缩
- 运行`LoaderOptionsPlugin`，查看其[文档](/plugins/loader-options-plugin)
- 设置 NodeJS 环境变量，触发某些 package 包，以不同的方式进行编译。


### JS文件压缩

webpack 自带了 `UglifyJsPlugin`，它运行 [UglifyJS](http://lisperator.net/uglifyjs/) 来压缩输出文件。此插件支持所有的 [UglifyJS 选项](https://github.com/mishoo/UglifyJS2#usage)。在命令行中指定 `--optimize-minimize`，或在 plugins 配置中添加：


```js
// webpack.config.js
const webpack = require('webpack');

module.exports = {
  /*...*/
  plugins:[
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: options.devtool && (options.devtool.indexOf("sourcemap") >= 0 || options.devtool.indexOf("source-map") >= 0)
    })
  ]
};
```

因此，通过设置[devtool options](/configuration/devtool)可以生成Source Maps。


### Source Maps

我们推荐你在生产环境中使用 source map，因为 Source Maps 对于 debug 和运行基准测试(benchmark tests)非常有用。webpack 可以在 bundle 中生成内联的 source map 或生成到独立文件。

在你的配置中，使用 `devtool` 对象来设置 Source Maps 的类型。我们现在支持七种类型的 source map。你可以在我们的 [配置](/configuration/devtool) 文档页面找到更多相关的信息（`cheap-module-source-map` 是其中一种基本选项，对每行使用单独映射）


### Node 环境变量

运行 `webpack -p` (或者 `--define process.env.NODE_ENV="'production'"`) 会通过如下方式调用[`DefinePlugin`](/plugins/define-plugin) ：

```js
// webpack.config.js
const webpack = require('webpack');

module.exports = {
  /*...*/
  plugins:[
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
};
```

`DefinePlugin` 在原始的源码中执行查找和替换操作，在导入的代码中，任何出现 `process.env.NODE_ENV`的地方都会被替换为`"production"`。因此，形如`if (process.env.NODE_ENV !== 'production') console.log('...')` 的代码就会等价于 `if (false) console.log('...')` 并且最终通过`UglifyJS`等价替换掉。

T> 从技术角度而言，`NODE_ENV`是一个Node.js暴露给运行脚本的系统环境变量。服务端的工具/构建脚本以及客户端库都可以方便的使用该环境变量确定自己的开发-生产行为。然而与期望的相反，构建脚本 `webpack.config.js` 中的 `process.env.NODE_ENV` 并不会被设置为 `"production"` ，详情见[#2537](https://github.com/webpack/webpack/issues/2537)。 因此，条件判定，形如 `process.env.NODE_ENV === 'production' ? '[name].[hash].bundle.js' : '[name].bundle.js'` 并不会按预想的起作用。查看如何使用[环境变量](/guides/environment-variables)。


## 手动方式

当我们确实有为针对多种环境而分别配置的需求时，最简单的途径就是，为不同的环境编写独立的 webpack 配置文件。


### 简单途径

最简单的方式是，定义两个完全独立的配置文件，就像这样：

__webpack.dev.js__

```js
module.exports = {
  devtool: 'cheap-module-source-map',

  output: {
    path: path.join(__dirname, '/../dist/assets'),
    filename: '[name].bundle.js',
    publicPath: publicPath,
    sourceMapFilename: '[name].map'
  },

  devServer: {
    port: 7777,
    host: 'localhost',
    historyApiFallback: true,
    noInfo: false,
    stats: 'minimal',
    publicPath: publicPath
  }
}
```

__webpack.prod.js__

```js
module.exports = {
  output: {
    path: path.join(__dirname, '/../dist/assets'),
    filename: '[name].bundle.js',
    publicPath: publicPath,
    sourceMapFilename: '[name].map'
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true
      },
      comments: false
    })
  ]
}
```

然后，在 `package.json` 中调整 `scripts`，就像这样：

__package.json__

```js
"scripts": {
  ...
  "build:dev": "webpack --env=dev --progress --profile --colors",
  "build:dist": "webpack --env=prod --progress --profile --colors"
}
```

现在你可以将我们的基本配置转为一个函数，然后接受 `env` 参数，并在两个配置之间切换（通过 `--env` 设置）：

__webpack.config.js__

```js
module.exports = function(env) {
  return require(`./webpack.${env}.js`)
}
```

有关如何使用 `env` 标志(flag)的更多详细信息，请查看 CLI 的[常见选项章节](/api/cli#common-options)。


### 高级途径

一个更复杂的方法是，有一个基本配置文件，其中包含两个环境通用的配置，然后将其与特定于环境的配置进行合并。这将为每个环境产生完整配置，并防止重复公共部分代码。

用于执行此"合并"工作的工具简称为 [webpack-merge](https://github.com/survivejs/webpack-merge)，提供了各种合并选项，但下面我们只使用最简单的版本。

We'll start by adding our base configuration:

__webpack.common.js__

```js
module.exports = {
  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'main': './src/main.ts'
  },

  output: {
    path: path.join(__dirname, '/../dist/assets'),
    filename: '[name].bundle.js',
    publicPath: publicPath,
    sourceMapFilename: '[name].map'
  },

  resolve: {
    extensions: ['.ts', '.js', '.json'],
    modules: [path.join(__dirname, 'src'), 'node_modules']
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: [/\.(spec|e2e)\.ts$/],
        use: [
          'awesome-typescript-loader',
          'angular2-template-loader'
        ]
      },
      {
        test: /\.css$/,
        use: ['to-string-loader', 'css-loader']
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: 'file-loader'
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000
          }
        }
      }
    ]
  },

  plugins: [
    new ForkCheckerPlugin(),

    new webpack.optimize.CommonsChunkPlugin({
      name: ['polyfills', 'vendor'].reverse()
    }),

    new HtmlWebpackPlugin({
      template: 'src/index.html',
      chunksSortMode: 'dependency'
    })
  ]
}
```

然后，使用 `webpack-merge`，把通用配置和环境特定配置合并在一起。让我们看一个合并生产环境文件的简单示例：

__webpack.prod.js__

```js
const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');

module.exports = Merge(CommonConfig, {
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true
      },
      comments: false
    })
  ]
})
```

你将会注意到 'webpack.prod.js' 文件的三点主要变化：

- 使用 `webpack-merge` 合并'webpack.common.js'。
- 我们把 `output` 属性放到 `webpack.common.js` 文件中，因为它是所有环境通用的。
- 我们只在 `webpack.prod.js` 中使用 `DefinePlugin`，并把 `'process.env.NODE_ENV'` 定义为 `'production'`。

以上示例仅演示了每个（或两个）环境中使用的一些典型配置选项。现在你应该已经知道如何拆分配置了，选择把选项放置到哪里，都是由你来决定的。

***

> 原文：https://webpack.js.org/guides/production/
