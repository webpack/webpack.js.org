---
title: 环境(Environment)
contributors:
  - simon04
---

最终，你会发现需要在[开发](/guides/development)和[生产构建](/guides/production-build)之间，消除 `webpack.config.js` 的差异。你（至少）需要两个选项：

## 使用 `--env`

webpack CLI 支持通过 `--cli` 指定构建环境键(build environment key)（如 `--env.production` 或 `--env.platform=web`）。要使用这些设置，请将 `webpack.config.js` 中的配置对象(configuration object)更改为一个函数：

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

## 使用环境变量

或者，可以使用 Node.js 中的标准方式：在运行 webpack 时设置环境变量，并且使用 Node.js 的 [`process.env`](https://nodejs.org/api/process.html#process_process_env) 引用变量。`NODE_ENV` 变量通常被视为事实标准（查看[这里](https://dzone.com/articles/what-you-should-know-about-node-env)）。

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

## References
* https://blog.flennik.com/the-fine-art-of-the-webpack-2-config-dc4d19d7f172#.297u8iuz1
