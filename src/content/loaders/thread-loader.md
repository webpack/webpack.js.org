---
title: thread-loader
source: https://raw.githubusercontent.com/webpack-contrib/thread-loader/master/README.md
edit: https://github.com/webpack-contrib/thread-loader/edit/master/README.md
repo: https://github.com/webpack-contrib/thread-loader
---
Runs the following loaders in a worker pool.

## 安装

```bash
npm install --save-dev thread-loader
```

## 用法

把这个 loader 放置在其他 loader 之前， 放置在这个 loader 之后的 loader 就会在一个单独的 worker 池(worker pool)中运行

在工人池(worker pool)中运行的 loader 是受到限制的。例如：

* 这些 loader 不能产生新的文件。
* 这些 loader 不能使用定制的 loader API（也就是说，通过插件）。
* 这些 loader 无法获取 webpack 的选项设置。

每个 worker 都是一个单独的有 600ms 限制的 node.js 进程。同时跨进程的数据交换也会被限制。

请仅在耗时的 loader 上使用

## 示例

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve("src"),
        use: [
          "thread-loader",
          "expensive-loader"
        ]
      }
    ]
  }
}
```

**可配选项**

```js
use: [
  {
    loader: "thread-loader",
    // 有同样配置的 loader 会共享一个 worker 池(worker pool)
    options: {
      // 产生的 worker 的数量，默认是 cpu 的核心数
      workers: 2,

      // 一个 worker 进程中并行执行工作的数量
      // 默认为 20
      workerParallelJobs: 50,

      // 额外的 node.js 参数
      workerNodeArgs: ['--max-old-space-size', '1024'],

      // 闲置时定时删除 worker 进程
      // 默认为 500ms
      // 可以设置为无穷大， 这样在监视模式(--watch)下可以保持 worker 持续存在
      poolTimeout: 2000,

      // 池(pool)分配给 worker 的工作数量
      // 默认为 200
      // 降低这个数值会降低总体的效率，但是会提升工作分布更均一
      poolParallelJobs: 50,

      // 池(pool)的名称
      // 可以修改名称来创建其余选项都一样的池(pool)
      name: "my-pool"
    }
  },
  "expensive-loader"
]
```

**预热**

可以通过预热 worker 池(worker pool)来防止启动 worker 时的高延时。

这会启动池(pool)内最大数量的 worker 并把指定的模块载入 node.js 的模块缓存中。

``` js
const threadLoader = require('thread-loader');

threadLoader.warmup({
  // pool options, like passed to loader options
  // must match loader options to boot the correct pool
}, [
  // modules to load
  // can be any module, i. e.
  'babel-loader',
  'babel-preset-es2015',
  'sass-loader',
]);
```


## 维护人员

<table>
  <tbody>
    <tr>
      <td align="center">
        <a href="https://github.com/sokra">
          <img width="150" height="150" src="https://github.com/sokra.png?size=150">
          </br>
          sokra
        </a>
      </td>
    </tr>
  <tbody>
</table>


[npm]: https://img.shields.io/npm/v/thread-loader.svg
[npm-url]: https://npmjs.com/package/thread-loader

[deps]: https://david-dm.org/webpack-contrib/thread-loader.svg
[deps-url]: https://david-dm.org/webpack-contrib/thread-loader

[chat]: https://img.shields.io/badge/gitter-webpack%2Fwebpack-brightgreen.svg
[chat-url]: https://gitter.im/webpack/webpack

[test]: http://img.shields.io/travis/webpack-contrib/thread-loader.svg
[test-url]: https://travis-ci.org/webpack-contrib/thread-loader

[cover]: https://codecov.io/gh/webpack-contrib/thread-loader/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/thread-loader

***

> 原文：https://webpack.js.org/loaders/thread-loader/
