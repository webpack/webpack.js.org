---
title: 插件(Plugins)
sort: 5
contributors:
  - TheLarkInn
  - jhnns
  - rouzbeh84
  - johnstew
---

插件是 wepback 的[支柱](https://github.com/webpack/tapable)功能。在你使用 webpack 配置时，webpack 自身也构建于**同样的插件系统**上！

插件目的在于解决 [loader](/concepts/loaders) 无法实现的**其他事**。


## 剖析

webpack **插件**是一个具有 [`apply`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply) 属性的 JavaScript 对象。 `apply` 属性会被 webpack compiler 调用，并且 compiler 对象可在**整个** compilation 生命周期访问。


**ConsoleLogOnBuildWebpackPlugin.js**

```javascript
function ConsoleLogOnBuildWebpackPlugin() {

};

ConsoleLogOnBuildWebpackPlugin.prototype.apply = function(compiler) {
  compiler.plugin('run', function(compiler, callback) {
    console.log("webpack 构建过程开始！！！");

    callback();
  });
};
```

T> 作为一个聪明的 JavaScript 开发者，你可能还记得 `Function.prototype.apply` 方法。通过这个方法你可以把任意函数作为插件传递（`this` 将指向 `compiler`）。你可以在配置中使用这样的方式来内联自定义插件。


## 用法

由于 **plugin** 可以携带参数/选项，你必须在 wepback 配置中，向 `plugins` 属性传入 `new` 实例。

根据你如何使用 webpack，这里有多种方式使用插件。


### 配置

**webpack.config.js**

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin'); //通过 npm 安装
const webpack = require('webpack'); //访问内置的插件
const path = require('path');

const config = {
  entry: './path/to/my/entry/file.js',
  output: {
    filename: 'my-first-webpack.bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader'
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

?> Even when using the Node API, users should pass plugins via the `plugins` property in the configuration. Using `compiler.apply` should not be the recommended way.

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

T> 你知道吗：以上看到的示例和 [webpack 自身运行时(runtime)](https://github.com/webpack/webpack/blob/e7087ffeda7fa37dfe2ca70b5593c6e899629a2c/bin/webpack.js#L290-L292) 极其类似。[wepback 源码](https://github.com/webpack/webpack)中隐藏有大量使用示例，你可以用在自己的配置和脚本中。

***

> 原文：https://webpack.js.org/concepts/plugins/