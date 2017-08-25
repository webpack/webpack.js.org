---
title: 多种配置类型(Configuration Types)
sort: 3
contributors:
  - sokra
  - skipjack
  - kbariotis
  - simon04
---

除了导出单个配置对象，还有一些方式满足其他需求。


## 导出为一个函数

最终，你会发现需要在[开发](/guides/development)和[生产构建](/guides/production)之间，消除 `webpack.config.js` 的差异。（至少）有两种选项：

作为导出一个配置对象的替代，还有一种可选的导出方式是，从 webpack 配置文件中导出一个函数。该函数在调用时，可传入两个参数：

* 环境对象(environment)作为第一个参数。有关语法示例，请查看[CLI 文档的环境选项](/api/cli#environment-options)。
一个选项 map 对象（`argv`）作为第二个参数。这个对象描述了传递给 webpack 的选项，并且具有 [`output-filename`](/api/cli/#output-options) 和 [`optimize-minimize`](/api/cli/#optimize-options) 等 key。

```diff
-module.exports = {
+module.exports = function(env, argv) {
+  return {
+    devtool: env.production ? 'source-maps' : 'eval',
     plugins: [
       new webpack.optimize.UglifyJsPlugin({
+        compress: argv['optimize-minimize'] // 只有传入 -p 或 --optimize-minimize
       })
     ]
+  };
};
```


## 导出一个 Promise

webpack 将运行由配置文件导出的函数，并且等待 Promise 返回。便于需要异步地加载所需的配置变量。

```js
module.exports = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        entry: './app.js',
        /* ... */
      })
    }, 5000)
  })
}
```


## 导出多个配置对象

作为导出一个配置对象/配置函数的替代，你可能需要导出多个配置对象（从 webpack 3.1.0 开始支持导出多个函数）。当运行 webpack 时，所有的配置对象都会构建。例如，导出多个配置对象，对于针对多个[构建目标](/configuration/output#output-librarytarget)（例如 AMD 和 CommonJS）[打包一个 library](/guides/author-libraries) 非常有用。

```js
module.exports = [{
  output: {
    filename: './dist-amd.js',
    libraryTarget: 'amd'
  },
  entry: './app.js',
}, {
  output: {
    filename: './dist-commonjs.js',
    libraryTarget: 'commonjs'
  },
  entry: './app.js',
}]
```

***

> 原文：https://webpack.js.org/configuration/configuration-types/
