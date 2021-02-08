---
title: 模式（Mode）
sort: 5
contributors:
  - EugeneHlushko
  - byzyk
  - mrichmond
  - Fental
  - snitin315
related:
  - title: 'webpack default options (source code)'
    url: https://github.com/webpack/webpack/blob/master/lib/WebpackOptionsDefaulter.js
---

提供 `mode` 配置选项，告知 webpack 使用相应模式的内置优化。

`string = 'production': 'none' | 'development' | 'production'`

## 用法 {#usage}

只需在配置对象中提供 `mode` 选项：

```javascript
module.exports = {
  mode: 'development',
};
```

<<<<<<< HEAD

或者从 [CLI](/api/cli/) 参数中传递：
=======
or pass it as a [CLI](/api/cli/) argument:
>>>>>>> 2a79b6b70d9af5bbff0bb3f044dcb2d575090ce5

```bash
webpack --mode=development
```

支持以下字符串值：

<<<<<<< HEAD
选项                  | 描述
--------------------- | -----------------------
`development`         | 会将 `DefinePlugin` 中 `process.env.NODE_ENV` 的值设置为 `development`. 为模块和 chunk 启用有效的名。
`production`          | 会将 `DefinePlugin` 中 `process.env.NODE_ENV` 的值设置为 `production`。为模块和 chunk 启用确定性的混淆名称，`FlagDependencyUsagePlugin`，`FlagIncludedChunksPlugin`，`ModuleConcatenationPlugin`，`NoEmitOnErrorsPlugin` 和 `TerserPlugin` 。
`none`                | 不使用任何默认优化选项
=======
| Option        | Description                                                                                                                                                                                                                                                       |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `development` | Sets `process.env.NODE_ENV` on `DefinePlugin` to value `development`. Enables useful names for modules and chunks.                                                                                                                                                |
| `production`  | Sets `process.env.NODE_ENV` on `DefinePlugin` to value `production`. Enables deterministic mangled names for modules and chunks, `FlagDependencyUsagePlugin`, `FlagIncludedChunksPlugin`, `ModuleConcatenationPlugin`, `NoEmitOnErrorsPlugin` and `TerserPlugin`. |
| `none`        | Opts out of any default optimization options                                                                                                                                                                                                                      |
>>>>>>> 2a79b6b70d9af5bbff0bb3f044dcb2d575090ce5

如果没有设置，webpack 会给 `mode` 的默认值设置为 `production`。

T> 请注意，设置 `NODE_ENV` 并不会自动地设置 `mode`。

<<<<<<< HEAD

### Mode: development {#mode-development}
=======
### Mode: development
>>>>>>> 2a79b6b70d9af5bbff0bb3f044dcb2d575090ce5

```diff
// webpack.development.config.js
module.exports = {
+ mode: 'development'
- devtool: 'eval',
- cache: true,
- performance: {
-   hints: false
- },
- output: {
-   pathinfo: true
- },
- optimization: {
-   moduleIds: 'named',
-   chunkIds: 'named',
-   mangleExports: false,
-   nodeEnv: 'development',
-   flagIncludedChunks: false,
-   occurrenceOrder: false,
-   concatenateModules: false,
-   splitChunks: {
-     hidePathInfo: false,
-     minSize: 10000,
-     maxAsyncRequests: Infinity,
-     maxInitialRequests: Infinity,
-   },
-   emitOnErrors: true,
-   checkWasmTypes: false,
-   minimize: false,
-   removeAvailableModules: false
- },
- plugins: [
-   new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("development") }),
- ]
}
```

<<<<<<< HEAD

### Mode: production {#mode-production}
=======
### Mode: production
>>>>>>> 2a79b6b70d9af5bbff0bb3f044dcb2d575090ce5

```diff
// webpack.production.config.js
module.exports = {
+  mode: 'production',
- performance: {
-   hints: 'warning'
- },
- output: {
-   pathinfo: false
- },
- optimization: {
-   moduleIds: 'deterministic',
-   chunkIds: 'deterministic',
-   mangleExports: 'deterministic',
-   nodeEnv: 'production',
-   flagIncludedChunks: true,
-   occurrenceOrder: true,
-   concatenateModules: true,
-   splitChunks: {
-     hidePathInfo: true,
-     minSize: 30000,
-     maxAsyncRequests: 5,
-     maxInitialRequests: 3,
-   },
-   emitOnErrors: false,
-   checkWasmTypes: true,
-   minimize: true,
- },
- plugins: [
-   new TerserPlugin(/* ... */),
-   new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("production") }),
-   new webpack.optimize.ModuleConcatenationPlugin(),
-   new webpack.NoEmitOnErrorsPlugin()
- ]
}
```

<<<<<<< HEAD

### Mode: none {#mode-none}
=======
### Mode: none
>>>>>>> 2a79b6b70d9af5bbff0bb3f044dcb2d575090ce5

```diff
// webpack.custom.config.js
module.exports = {
+ mode: 'none',
- performance: {
-  hints: false
- },
- optimization: {
-   flagIncludedChunks: false,
-   occurrenceOrder: false,
-   concatenateModules: false,
-   splitChunks: {
-     hidePathInfo: false,
-     minSize: 10000,
-     maxAsyncRequests: Infinity,
-     maxInitialRequests: Infinity,
-   },
-   emitOnErrors: true,
-   checkWasmTypes: false,
-   minimize: false,
- },
- plugins: []
}
```

<<<<<<< HEAD
如果要根据 _webpack.config.js_ 中的 __mode__ 变量更改打包行为，则必须将配置导出为函数，而不是导出对象：
=======
If you want to change the behavior according to the **mode** variable inside the _webpack.config.js_, you have to export a function instead of an object:
>>>>>>> 2a79b6b70d9af5bbff0bb3f044dcb2d575090ce5

```javascript
var config = {
  entry: './app.js',
  //...
};

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    config.devtool = 'source-map';
  }

  if (argv.mode === 'production') {
    //...
  }

  return config;
};
```
