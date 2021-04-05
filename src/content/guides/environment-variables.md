---
title: 环境变量
sort: 8
contributors:
  - simon04
  - grisanu
  - tbroadley
  - legalcodes
  - byzyk
  - jceipek
---

想要消除 `webpack.config.js` 在 [开发环境](/guides/development) 和 [生产环境](/guides/production) 之间的差异，你可能需要环境变量(environment variable)。

T> webpack 环境变量，与操作系统中的 `bash` 和 `CMD.exe` 这些 shell [环境变量](https://en.wikipedia.org/wiki/Environment_variable) 不同。

<<<<<<< HEAD
webpack 命令行 [环境配置](/api/cli/#environment-options) 的 `--env` 参数，可以允许你传入任意数量的环境变量。而在 `webpack.config.js` 中可以访问到这些环境变量。例如，`--env production` 或 `--env NODE_ENV=local`（`NODE_ENV` 通常约定用于定义环境类型，查看 [这里](https://dzone.com/articles/what-you-should-know-about-node-env)）。
=======
The webpack command line [environment option](/api/cli/#environment-options) `--env` allows you to pass in as many environment variables as you like. Environment variables will be made accessible in your `webpack.config.js`. For example, `--env production` or `--env goal=local`.
>>>>>>> 6d4e5617620f76812e9cf005117db90db69c257c

```bash
npx webpack --env NODE_ENV=local --env production --progress
```

T> 如果设置 `env` 变量，却没有赋值，`--env production` 默认表示将 `env.production` 设置为 `true`。还有许多其他可以使用的语法。更多详细信息，请查看 [webpack CLI](/api/cli/#environment-options) 文档。

对于我们的 webpack 配置，有一个必须要修改之处。通常，`module.exports` 指向配置对象。要使用 `env` 变量，你必须将 `module.exports` 转换成一个函数：

**webpack.config.js**

```js
const path = require('path');

module.exports = (env) => {
  // Use env.<YOUR VARIABLE> here:
  console.log('Goal: ', env.goal); // 'local'
  console.log('Production: ', env.production); // true

  return {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
  };
};
```

T> webpack CLI 提供一些你可以在 webpack 配置中访问的[内建环境变量](/api/cli/#environment-variables)。
