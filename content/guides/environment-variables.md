---
title: 使用环境变量
sort: 13
contributors:
  - simon04
---

要在[开发](/guides/development)和[生产构建](/guides/production)之间，消除 `webpack.config.js` 的差异。你可能需要环境变量。

可以使用 Node.js 模块的标准方式：在运行 webpack 时设置环境变量，并且使用 Node.js 的 [`process.env`](https://nodejs.org/api/process.html#process_process_env) 来引用变量。`NODE_ENV` 变量通常被视为事实标准（查看[这里](https://dzone.com/articles/what-you-should-know-about-node-env)）。

**webpack.config.js**

```diff
module.exports = {
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
+      compress: process.env.NODE_ENV === 'production'
    })
  ]
};
```

使用 [`cross-env`](https://www.npmjs.com/package/cross-env) 包来跨平台设置(cross-platform-set)环境变量：

**package.json**

```json
{
  "scripts": {
    "build": "cross-env NODE_ENV=production PLATFORM=web webpack"
  }
}
```


## 参考
* https://blog.flennik.com/the-fine-art-of-the-webpack-2-config-dc4d19d7f172#.297u8iuz1

***

> 原文：https://webpack.js.org/guides/environment-variables/
