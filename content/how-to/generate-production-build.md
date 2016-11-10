---
title: 如何生成一个生产构建？
contributors:
  - henriquea
  - xie qianyue
---

使用 webpack 来构建生产版本 (production build) 并不困难。只需要记住下面三点：

- Source Maps
- Node 环境
- Minification

## Source Maps

我们鼓励你在生产环境中也使用 Source Maps。它有助于你进行调试和基准测试 (benchmark test)。Webpack 能够在打包文件 (bundle) 中嵌入 inline Source Maps，或者生成 Source Maps 到新的文件中。

在配置文件中使用 `devtools` 对象来设置 Source Maps 的类别。现阶段我们支持七种类别。你可以在[配置](configuration/devtool)页面里找到关于类别的更多信息。

`cheap-module-source-map` 是诸多实用选项之一，它能够简化 Source Maps，使其只包含对应的行信息。

## Node environment variable

The second step is to tell webpack to generate a production build by setting the Node.js environment variable to `production`. webpack will not include any extra useful code, warnings and checks used in development.

The `DefinePlugin` creates **compile** time constants. Useful for injecting your Node.js environment as seen below.

?> TODO: Add a link to the `ProvidePlugin` documentation

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

T> Spoiler: Setting the env var only won't make your bundle smaller. This take us to the last step:

## Minification

webpack comes with UglifyJS plugin which minimize the output. You can pass an object containing [UglifyJS options](https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin).

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

That's it! You're all set to ship production code.

?> TODO: Add reading reference link to "How to manage multiple configurations"
?> TODO: Add reference link to "Splitting configuration"
