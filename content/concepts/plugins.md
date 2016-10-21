---
title: 插件
sort: 3
contributors:
  - TheLarkInn
  - dear-lizhihua
---

插件是 wepback 的[支柱](https://github.com/webpack/tapable)功能。在你使用 webpack 配置时，webpack 自身也构建于**同样的插件系统**上！

插件目的在于解决 [loader](/concepts/loaders) 无法实现的其他事。

## 剖析

webpack **插件**是一个具有 `apply` 属性的 JavaScript 对象。 `apply` 属性会被 webpack 解析器(compiler)调用，并且可在整个编译生命周期(compilation lifecycle)访问。


**ConsoleLogOnBuildWebpackPlugin.js**

```javascript
function ConsoleLogOnBuildWebpackPlugin() {

};

ConsoleLogOnBuildWebpackPlugin.prototype.apply = function(compiler) {
  compiler.plugin('run', function(compiler, callback) {
    console.log("The webpack build process is starting!!!");

    callback();
  });
};
```

## 用法

由于**插件**可以接收参数/选项，你必须在wepback配置中，向 `plugins` 属性传入 `new` 实例。

基于您如何使用 webpack，有多种使用插件的方式。

### 配置

**webpack.config.js**

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin'); //通过 npm 安装
const webpack = require('webpack'); //访问内置的插件

const config = {
  entry: './path/to/my/entry/file.js',
  output: {
    filename: 'my-first-webpack.bundle.js',
    path: './dist'
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
};

module.exports = config;
```

### Node API

**some-node-script.js**

```javascript
  const webpack = require('webpack'); //运行时(runtime)访问 webpack
  const configuration = require('./webpack.config.js');

  let compiler = webpack(configuration);
  compiler.apply(new webpack.ProgressPlugin());

  compiler.run(function(err, stats) {
    // ...
  });
```

T> 你知道吗：以上看到的例子和[webpack 本身运行时](https://github.com/webpack/webpack/blob/master/bin/webpack.js#L290-L292)极其类似。[wepback 源码](https://github.com/webpack/webpack)中隐藏有大量使用示例，你可以应用到自己的配置和脚本中。
