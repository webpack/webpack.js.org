---
title: 使用环境变量
sort: 16
contributors:
  - simon04
  - grisanu
related:
  - title: The Fine Art of the webpack 3 Config
    url: https://blog.flennik.com/the-fine-art-of-the-webpack-2-config-dc4d19d7f172#d60a
---

要在[开发](/guides/development)和[生产构建](/guides/production)之间，消除 `webpack.config.js` 的差异。你可能需要环境变量。

webpack 命令行[环境配置](/api/cli/#environment-options)中，通过设置 `--env` 可以使你根据需要，传入尽可能多的环境变量。在 `webpack.config.js` 文件中可以访问到这些环境变量。例如，`--env.production` 或 `--env.NODE_ENV=local`（`NODE_ENV` 通常约定用于定义环境类型，查看[这里](https://dzone.com/articles/what-you-should-know-about-node-env)）。

```bash
webpack --env.NODE_ENV=local --env.production --progress
```

T> 如果设置 `env` 变量，却没有赋值，`--env.production` 默认将 `--env.production` 设置为 `true`。还有其他可以使用的语法。有关详细信息，请查看 [webpack CLI](/api/cli/#environment-options) 文档。

然而，你必须对 webpack 配置进行一处修改。通常，在 webpack config 中，`module.exports` 指向配置对象。要使用 `env` 变量，你必须将 `module.exports` 转换成一个函数：

__webpack.config.js__

``` js
module.exports = env => {
  // Use env.<YOUR VARIABLE> here:
  console.log('NODE_ENV: ', env.NODE_ENV) // 'local'
  console.log('Production: ', env.production) // true

  return {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  }
}
```

***

> 原文：https://webpack.js.org/guides/environment-variables/
