---
title: Mode
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

Providing the `mode` configuration option tells webpack to use its built-in optimizations accordingly.

`string = 'production': 'none' | 'development' | 'production'`

## Usage

Provide the `mode` option in the config:

```javascript
module.exports = {
  mode: 'development',
};
```

or pass it as a [CLI](/api/cli/) argument:

```bash
webpack --mode=development
```

The following string values are supported:

| Option        | Description                                                                                                                                                                                                                                                       |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `development` | Sets `process.env.NODE_ENV` on `DefinePlugin` to value `development`. Enables useful names for modules and chunks.                                                                                                                                                |
| `production`  | Sets `process.env.NODE_ENV` on `DefinePlugin` to value `production`. Enables deterministic mangled names for modules and chunks, `FlagDependencyUsagePlugin`, `FlagIncludedChunksPlugin`, `ModuleConcatenationPlugin`, `NoEmitOnErrorsPlugin` and `TerserPlugin`. |
| `none`        | Opts out of any default optimization options                                                                                                                                                                                                                      |

If not set, webpack sets `production` as the default value for `mode`.

T> Please remember that setting `NODE_ENV` doesn't automatically set `mode`.

### Mode: development

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

### Mode: production

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

### Mode: none

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

If you want to change the behavior according to the **mode** variable inside the _webpack.config.js_, you have to export a function instead of an object:

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
