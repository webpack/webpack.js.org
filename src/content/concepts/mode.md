---
title: 模式(Mode)
sort: 4
contributors:
  - EugeneHlushko
---

提供 `mode` 配置选项，告知 webpack 使用相应模式的内置优化。

`string`

## 用法

只在配置中提供 `mode` 选项：

```javascript
module.exports = {
  mode: 'production'
};
```

或者从 CLI 参数中传递：

```bash
webpack --mode=production
```

支持以下字符串值：

选项                | 描述
--------------------- | -----------------------
`development`         | 会将 `process.env.NODE_ENV` 的值设为 `development`。启用 `NamedModulesPlugin`。
`production`          | 会将 `process.env.NODE_ENV` 的值设为 `production`。启用 `UglifyJsPlugin`, `ModuleConcatenationPlugin` 和 `NoEmitOnErrorsPlugin`。


### mode: development


```diff
// webpack.production.config.js
module.exports = {
+ mode: 'development'
- plugins: [
-   new webpack.NamedModulesPlugin(),
-   new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("development") }),
- ]
}
```


### mode: production


```diff
// webpack.production.config.js
module.exports = {
+  mode: 'production',
-  plugins: [
-    new UglifyJsPlugin(/* ... */),
-    new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("production") }),
-    new webpack.optimize.ModuleConcatenationPlugin(),
-    new webpack.NoEmitOnErrorsPlugin()
-  ]
}
```
