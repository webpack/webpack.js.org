---
title: plugin
sort: 4
contributors:
  - TheLarkInn
  - jhnns
  - rouzbeh84
  - johnstew
  - MisterDev
  - byzyk
  - chenxsan
---

<<<<<<< HEAD
__插件__是 webpack 的 [支柱](https://github.com/webpack/tapable) 功能。webpack 自身也是构建于你在 webpack 配置中用到的__相同的插件系统__之上！

插件目的在于解决 [loader](/concepts/loaders) 无法实现的__其他事__。
=======
**Plugins** are the [backbone](https://github.com/webpack/tapable) of webpack. webpack itself is built on the **same plugin system** that you use in your webpack configuration!

They also serve the purpose of doing **anything else** that a [loader](/concepts/loaders) cannot do.
>>>>>>> 2a79b6b70d9af5bbff0bb3f044dcb2d575090ce5

T> 如果在插件中使用了 [`webpack-sources`](https://github.com/webpack/webpack-sources) 的 package，请使用 `require('webpack').sources` 替代 `require('webpack-sources')`，以避免持久缓存的版本冲突。

<<<<<<< HEAD

## 剖析 {#anatomy}

webpack __插件__是一个具有 [`apply`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply) 方法的 JavaScript 对象。`apply` 方法会被 webpack compiler 调用，并且在__整个__编译生命周期都可以访问 compiler 对象。
=======
## Anatomy

A webpack **plugin** is a JavaScript object that has an [`apply`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply) method. This `apply` method is called by the webpack compiler, giving access to the **entire** compilation lifecycle.
>>>>>>> 2a79b6b70d9af5bbff0bb3f044dcb2d575090ce5

**ConsoleLogOnBuildWebpackPlugin.js**

```javascript
const pluginName = 'ConsoleLogOnBuildWebpackPlugin';

class ConsoleLogOnBuildWebpackPlugin {
  apply(compiler) {
<<<<<<< HEAD
    compiler.hooks.run.tap(pluginName, compilation => {
      console.log('webpack 构建过程开始！');
=======
    compiler.hooks.run.tap(pluginName, (compilation) => {
      console.log('The webpack build process is starting!!!');
>>>>>>> 2a79b6b70d9af5bbff0bb3f044dcb2d575090ce5
    });
  }
}

module.exports = ConsoleLogOnBuildWebpackPlugin;
```

compiler hook 的 tap 方法的第一个参数，应该是驼峰式命名的插件名称。建议为此使用一个常量，以便它可以在所有 hook 中重复使用。

## 用法 {#usage}

<<<<<<< HEAD
由于__插件__可以携带参数/选项，你必须在 webpack 配置中，向 `plugins` 属性传入一个 `new` 实例。
=======
Since **plugins** can take arguments/options, you must pass a `new` instance to the `plugins` property in your webpack configuration.
>>>>>>> 2a79b6b70d9af5bbff0bb3f044dcb2d575090ce5

取决于你的 webpack 用法，对应有多种使用插件的方式。

<<<<<<< HEAD

### 配置方式 {#configuration}
=======
### Configuration
>>>>>>> 2a79b6b70d9af5bbff0bb3f044dcb2d575090ce5

**webpack.config.js**

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装
const webpack = require('webpack'); // 访问内置的插件
const path = require('path');

module.exports = {
  entry: './path/to/my/entry/file.js',
  output: {
    filename: 'my-first-webpack.bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
      },
    ],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({ template: './src/index.html' }),
  ],
};
```

`ProgressPlugin` 用于自定义编译过程中的进度报告，`HtmlWebpackPlugin` 将生成一个 HTML 文件，并在其中使用 `script` 引入一个名为 `my-first-webpack.bundle.js` 的 JS 文件。

### Node API 方式 {#node-api}

在使用 Node API 时，还可以通过配置中的 `plugins` 属性传入插件。

**some-node-script.js**

```javascript
const webpack = require('webpack'); // 访问 webpack 运行时(runtime)
const configuration = require('./webpack.config.js');

let compiler = webpack(configuration);

new webpack.ProgressPlugin().apply(compiler);

compiler.run(function (err, stats) {
  // ...
});
```

T> 你知道吗：以上看到的示例和 [webpack 运行时(runtime)本身](https://github.com/webpack/webpack/blob/e7087ffeda7fa37dfe2ca70b5593c6e899629a2c/bin/webpack.js#L290-L292) 极其类似。[webpack 源码](https://github.com/webpack/webpack) 中隐藏有大量使用示例，你可以将其应用在自己的配置和脚本中。
