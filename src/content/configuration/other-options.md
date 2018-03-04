---
title: 其它选项(Other Options)
sort: 16
contributors:
  - sokra
  - skipjack
  - terinjokes
related:
  - title: Using Records
    url: https://survivejs.com/webpack/optimizing/separating-manifest/#using-records
---


这里是 webpack 支持的其它选项。

W> 寻求帮助：这个页面还在更新中，如果你发现本页面内有描述不准确或者不完整，请在 [webpack 的文档仓库](https://github.com/webpack/webpack.js.org)中创建 issue 或者 pull request


## `amd`

`object`

设置 `require.amd` 或 `define.amd` 的值：

```js
amd: {
  jQuery: true
}
```

某些流行的模块是按照 AMD 规范编写的，最引人瞩目的 jQuery 版本在 1.7.0 到 1.9.1，如果 loader 提示它对页面包含的多个版本采取了[特殊许可](https://github.com/amdjs/amdjs-api/wiki/jQuery-and-AMD)时，才会注册为 AMD 模块。

许可权限是具有「限制指定版本注册」或「支持有不同定义模块的不同沙盒」的能力。

此选项允许将模块查找的键(key)设置为真值(truthy value)。
发生这种情况时，webpack 中的 AMD 支持将忽略定义的名称。


## `bail`

`boolean`

在第一个错误出现时抛出失败结果，而不是容忍它。默认情况下，当使用 HMR 时，webpack 会将在终端以及浏览器控制台中，以红色文字记录这些错误，但仍然继续进行打包。要启用它：

```js
bail: true
```

这将迫使 webpack 退出其打包过程。


## `cache`

`boolean` `object`

缓存生成的 webpack 模块和 chunk，来改善构建速度。缓存默认在观察模式(watch mode)启用。禁用缓存只需简单传入：

```js
cache: false
```

如果传递一个对象，webpack 将使用这个对象进行缓存。保持对此对象的引用，将可以在 compiler 调用之间共享同一缓存：

```js
let SharedCache = {};

export default {
  ...,
  cache: SharedCache
}
```

W> 不要在不同选项的调用之间共享缓存。

?> Elaborate on the warning and example - calls with different configuration options?


## `loader`

`object`

在 loader 上下文中暴露自定义值。

?> Add an example...


## `parallelism`

`number`

Limit the number of parallel processed modules. Can be used to fine tune performance or to get more reliable profiling results.


## `profile`

`boolean`

捕获一个应用程序"配置文件"，包括统计和提示，然后可以使用 [Analyze](https://webpack.github.io/analyse/) 分析工具进行详细分析。

T> 使用 [StatsPlugin](https://www.npmjs.com/package/stats-webpack-plugin) 可以更好地控制生成的配置文件。

T> Combine with `parallelism: 1` for better results.


## `recordsPath`

开启这个选项可以生成一个 JSON 文件，其中含有 webpack 的 "records" 记录 - 即「用于存储跨多次构建(across multiple builds)的模块标识符」的数据片段。可以使用此文件来跟踪在每次构建之间的模块变化。只要简单的设置一下路径,就可以生成这个 JSON 文件：

``` js
recordsPath: path.join(__dirname, 'records.json')
```

如果你使用了[代码分离(code splittnig)](/guides/code-splitting)这样的复杂配置，records 会特别有用。这些数据用于确保拆分 bundle，以便实现你需要的[缓存(caching)](/guides/caching)行为。

T> 注意，虽然这个文件是由编译器(compiler)生成的，但你可能仍然希望在源代码管理中追踪它，以便随时记录它的变化情况。

W> 设置 `recordsPath` 本质上会把 `recordsInputPath` 和 `recordsOutputPath` 都设置成相同的路径。通常来讲这也是符合逻辑的，除非你决定改变记录文件的名称。可以查看下面的实例：


## `recordsInputPath`

指定读取最后一条记录的文件的名称。这可以用来重命名一个记录文件，可以查看下面的实例：


## `recordsOutputPath`

指定记录要写入的位置。以下示例描述了如何用这个选项和 `recordsInptuPaht` 来重命名一个记录文件：

``` js
recordsInputPath: path.join(__dirname, 'records.json'),
recordsOutputPath: path.join(__dirname, 'newRecords.json')
```

***

> 原文：https://webpack.js.org/configuration/other-options/
