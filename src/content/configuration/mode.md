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

或者从 [CLI](/api/cli/) 参数中传递：

```bash
webpack --mode=development
```

支持以下字符串值：

选项                  | 描述
--------------------- | -----------------------
`development`         | 会将 `DefinePlugin` 中 `process.env.NODE_ENV` 的值设置为 `development`. 为模块和 chunk 启用有效的名。
`production`          | 会将 `DefinePlugin` 中 `process.env.NODE_ENV` 的值设置为 `production`。为模块和 chunk 启用确定性的混淆名称，`FlagDependencyUsagePlugin`，`FlagIncludedChunksPlugin`，`ModuleConcatenationPlugin`，`NoEmitOnErrorsPlugin` 和 `TerserPlugin` 。
`none`                | 不使用任何默认优化选项

如果没有设置，webpack 会给 `mode` 的默认值设置为 `production`。

<<<<<<< HEAD
T> 请注意，设置 `NODE_ENV` 并不会自动地设置 `mode`。
=======
T> If `mode` is not provided via configuration or CLI, CLI will use any valid `NODE_ENV` value for `mode`.
>>>>>>> 02213e4bfb40c7571a086a66ddd5c3f0dca1def8

### Mode: development {#mode-development}

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

### Mode: production {#mode-production}

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

### Mode: none {#mode-none}

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

如果要根据 *webpack.config.js* 中的 **mode** 变量更改打包行为，则必须将配置导出为函数，而不是导出对象：

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
