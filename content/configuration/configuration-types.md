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


## 使用 `--env` 导出一个函数

最终，你会发现需要在[开发](/guides/development)和[生产构建](/guides/production)之间，消除 `webpack.config.js` 的差异。（至少）有两种选项：

作为导出一个配置对象的替代，你可以返回一个函数，此函数接受 environment 作为参数。当运行 webpack 时，你可以通过 `--env` 指定构建环境的键，例如 `--env.production` 或者 `--env.platform=web`。

```diff
-module.exports = {
+module.exports = function(env) {
+  return {
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
+        compress: env.production // 只在生产环境构建时压缩
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
