---
title: 生产环境构建
sort: 13
contributors:
  - henriquea
  - xie-qianyue
---

使用 webpack 来构建生产版本 (production build) 并不困难。只需要记住下面三点：

- Source Maps
- Node 环境
- Minification

## Source Maps

我们鼓励你在生产环境中也使用 Source Maps。它有助于你进行调试和基准测试 (benchmark test)。Webpack 能够在打包文件 (bundle) 中嵌入 inline Source Maps，或者生成 Source Maps 到新的文件中。

在配置文件中使用 `devtools` 对象来设置 Source Maps 的类别。现阶段我们支持七种类别。你可以在[配置](configuration/devtool)页面里找到关于类别的更多信息。

`cheap-module-source-map` 是诸多实用选项之一，它能够简化 Source Maps，使其只包含对应的行信息。

## Node 环境变量

第二步便是设置 Node.js 环境变量为 `production`，以便 webpack 生成生产构建。Webpack 此时将不会生成或执行开发环境的额外代码，warning 和检查。

`DefinePlugin` 属性能够配置**编译**时常量。这对配置 Node.js 的环境变量非常有用，看下面的例子。

?> TODO: 加上 `ProvidePlugin` 属性的文档链接

```js
// webpack.config.js
const webpack = require('webpack');

module.exports = {
  /*...*/
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ]
  /*...*/
};
```

T> 小提示: 配置环境变量并不能够使打包文件变小。Minification 将会在下一步也是最后一步谈到：

## Minification

Webpack 使用 UglifyJS 插件来缩小打包文件。你可以在初始化时传入一个包含 [UglifyJS 选项](https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin) 的对象。

```js
// webpack.config.js
const webpack = require('webpack');

module.exports = {
  /*...*/
  plugins:[
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress:{
        warnings: true
      }
    })
  ]
  /*...*/
};
```

好了！到这里为止，你已经为构建生产代码做好配置了。

?> TODO: 加上一条 "How to manage multiple configurations" 的参考链接
?> TODO: 加上一条 "Splitting configuration" 的参考链接
