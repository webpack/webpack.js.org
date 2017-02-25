---
title: 生产环境构建
sort: 13
contributors:
  - henriquea
  - rajagopal4890
  - markerikson
  - simon04
  - kisnows
  - muchen
---

该页面说明了如何通过`webpack`生成生产环境所用的文件。

## 自动方式

运行`webpack -p` (也可以运行 `webpack --optimize-minimize --define process.env.NODE_ENV="'production'"`，他们是等效的)。它会执行如下步骤：

- 使用`UglifyJsPlugin`进行 JS文件压缩；
- 运行`LoaderOptionsPlugin`，详情见[文档](/plugins/loader-options-plugin)；
- 设置Node环境变量。

### JS文件压缩

webpack 自带了 `UglifyJsPlugin`，它运行 [UglifyJS](http://lisperator.net/uglifyjs/) 来压缩输出文件。此插件支持所有的 [UglifyJS 选项](https://github.com/mishoo/UglifyJS2#usage)。在命令行中指定 `--optimize-minimize`，会在 plugins 配置中添加：


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

我们推荐你在生产环境中使用Source Maps。Source Maps对DEBUG和跑基准测试十分有用。Webpack可以在bundle与独立文件内生成内联的Source Maps。

在你的配置中，使用`devtool`对象来设置Source Maps的类型。我们现在支持7种类型的Source Maps。你可以在[devtool设置](/configuration/devtool)文档页面找到更多相关的信息。

其中一个好的选项就是使用`cheap-module-source-map`。这能够简化Source Maps为对于每一行的单一映射。

### Node环境变量

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

## 手动方式：为多环境配置Webpack

当我们确实有为针对多种环境而分别配置的需求时，最简单的方式就是为不同的环境编写独立的js文件，例如：

** dev.js **
```js
module.exports = function (env) {
  return {
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
}
```

** prod.js **
```js
module.exports = function (env) {
  return {
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
        new UglifyJsPlugin({
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
}
```
在我们的webpack.config.js中加入如下的代码片段：
```js
function buildConfig(env) {
  return require('./config/' + env + '.js')({ env: env })
}

module.exports = buildConfig(env);
```
在 package.json 文件中我们使用webpack构建我们的应用，所需需要在 package.json 中添加以下命令：
```js
 "build:dev": "webpack --env=dev --progress --profile --colors",
 "build:dist": "webpack --env=prod --progress --profile --colors",
```

可以看到，我们给把环境变量传递给了 webpack.config.js 文件。在这里我们使用一个简单的 switch-case 载入正确的 JS 文件，来做到针对不同的环境进行构建。

一个高阶的方式是编写一个基本配置文件，把所有公用的功能放在里面。再编写特定环境的文件,使用 'webpack-merge' 来合并他们.这样能够避免代码重复。
你可以把所有的基本配置，如处理 js、ts、png、jpeg、json 等文件的配置放在公用的 `base` 文件中，代码样例如下：

** base.js **
```js
module.exports = function() {
  return {
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
      extensions: ['', '.ts', '.js', '.json'],
      modules: [path.join(__dirname, 'src'), 'node_modules']
    },
    module: {
      loaders: [{
        test: /\.ts$/,
        loaders: [
          'awesome-typescript-loader',
          'angular2-template-loader'
        ],
        exclude: [/\.(spec|e2e)\.ts$/]
      }, {
        test: /\.css$/,
        loaders: ['to-string-loader', 'css-loader']
      }, {
        test: /\.(jpg|png|gif)$/,
        loader: 'file-loader'
      }, {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      }],
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
    ],
  };
}
```
然后，使用'webpack-merge'合并这个基础配置和针对环境的特定的配置。
让我们看一个简单的样例，在这个样例中我们使用'webpack-merge'将上文中提及的 `prod` 文件与基础配置文件进行合并：

** prod.js (updated) **
```js
const webpackMerge = require('webpack-merge');

const commonConfig = require('./base.js');

module.exports = function(env) {
  return webpackMerge(commonConfig(), {
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
}
```
你会注意到'prod.js'文件三点主要的变化.
* 使用'webpack-merge'合并'base.js'；
* 我们把'output'属性挪到了'base.js'文件，需要强调的是此处我们从`prod.js`抽取出来到`base.js`文件的'output'属性是公用的，贯穿所有的环境的，才把它抽取出来；
* 我们使用'DefinePlugin'把'process.env.NODE_ENV'定义为'定义为production'。当我们构建生产环境的应用时，整个应用中的'process.env.NODE_ENV'都会是这个值——'定义为production'。 像这样，我们可以管理我们选择指定的针对不同环境的不同变量。

选择哪些配置是贯穿所有环境的取决于你，然而，当我们构建应用的时候，我们已经演示了一些典型的能在所有环境通用的配置。
你刚看到了，'webpack-merge'是如此的强大，它能够把我们从大量的代码重复中解救出来。

***

> 原文：https://webpack.js.org/guides/production-build/
