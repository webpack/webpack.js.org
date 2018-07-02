---
title: Optimization
sort: 8
contributors:
  - EugeneHlushko
  - jeremenichelli
  - simon04
  - byzyk
  - madhavarshney
related:
  - title: 'webpack 4: Code Splitting, chunk graph and the splitChunks optimization'
    url: https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
---

Since version 4 webpack runs optimizations for you depending on the chosen `mode`, still all optimizations are available for manual configuration and overrides.


## `optimization.minimize`

`boolean`

Tell webpack to minimize the bundle using the [UglifyjsWebpackPlugin](/plugins/uglifyjs-webpack-plugin/).

This is `true` by default in `production` mode.

__webpack.config.js__


```js
module.exports = {
  //...
  optimization: {
    minimize: false
  }
};
```

T> Learn how [mode](/concepts/mode/) works.

## `optimization.minimizer`

`UglifyjsWebpackPlugin | [UglifyjsWebpackPlugin]`

Allows you to override the default minimizer by providing a different one or more customized [UglifyjsWebpackPlugin](/plugins/uglifyjs-webpack-plugin/) instances.

__webpack.config.js__


```js
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  //...
  optimization: {
    minimizer: [
      new UglifyJsPlugin({ /* your config */ })
    ]
  }
};
```

## `optimization.splitChunks`

`object`

By default webpack v4+ provides new common chunks strategies out of the box for dynamically imported modules. See available options for configuring this behavior in the [SplitChunksPlugin](/plugins/split-chunks-plugin/) page.

## `optimization.runtimeChunk`

`object` `string` `boolean`

Setting `optimization.runtimeChunk` to `true` adds an additional chunk to each entry point containing only the runtime.
It is possible to use preset mode of the plugin by providing a string value:

- `single`: creates a runtime file to be shared for all generated chunks.
- `multiple`: creates multiple runtime files for common chunks.

By setting `optimization.runtimeChunk` to `object` it is only possible to provide the `name` property which stands for the name or name factory for the runtime chunks.

Default is `false`: each entry chunk embeds runtime.

W> Imported modules are initialized for each runtime chunk separately, so if you include multiple entry points on a page, beware of this behavior. You will probably want to set it to `single` or use another configuration that allows you to only have one runtime instance.

__webpack.config.js__


```js
module.exports = {
  //...
  optimization: {
    runtimeChunk: {
      name: entrypoint => `runtimechunk~${entrypoint.name}`
    }
  }
};
```

## `optimization.noEmitOnErrors`

`boolean`

Use the `optimization.noEmitOnErrors` to skip the emitting phase whenever there are errors while compiling. This ensures that no erroring assets are emitted. The `emitted` flag in the stats is `false` for all assets.

__webpack.config.js__

```js
module.exports = {
  //...
  optimization: {
    noEmitOnErrors: true
  }
};
```

W> If you are using webpack [CLI](/api/cli/), the webpack process will not exit with an error code while this plugin is enabled. If you want webpack to "fail" when using the CLI, please check out the [`bail` option](/api/cli/#advanced-options).

## `optimization.namedModules`

`boolean: false`

Tells webpack to use readable module identifiers for better debugging. When `optimization.namedModules` is not set in webpack config, webpack will enable it by default for [mode](/concepts/mode/) `development` and disable for [mode](/concepts/mode/) `production`.

__webpack.config.js__

```js
module.exports = {
  //...
  optimization: {
    namedModules: true
  }
};
```

## `optimization.namedChunks`

`boolean: false`

Tells webpack to use readable chunk identifiers for better debugging. This option is enabled by default for [mode](/concepts/mode/) `development` and disabled for [mode](/concepts/mode/) `production` if no option is provided in webpack config. 

__webpack.config.js__

```js
module.exports = {
  //...
  optimization: {
    namedChunks: true
  }
};
```

## `optimization.nodeEnv`

`string` `bool: false`

Tells webpack to set `process.env.NODE_ENV` to a given string value. `optimization.nodeEnv` uses [DefinePlugin](/plugins/define-plugin/) unless set to `false`. `optimization.nodeEnv` __defaults__ to [mode](/concepts/mode/) if set, else falls back to `"production"`.

Possible values:

- any string: the value to set `process.env.NODE_ENV` to.
- false: do not modify/set the value of `process.env.NODE_ENV`.

__webpack.config.js__

```js
module.exports = {
  //...
  optimization: {
    nodeEnv: 'production'
  }
};
```

## `optimization.mangleWasmImports`

`bool: false`

When set to `true` tells webpack to reduce the size of WASM by changing imports to shorter strings. It mangles module and export names.

__webpack.config.js__

```js
module.exports = {
  //...
  optimization: {
    mangleWasmImports: true
  }
};
```

## `optimization.removeAvailableModules`

`bool: true`

Tells webpack to detect and remove modules from chunks when these modules are already included in all parents. Setting `optimization.removeAvailableModules` to `false` will disable this optimization.

__webpack.config.js__

```js
module.exports = {
  //...
  optimization: {
    removeAvailableModules: false
  }
};
```

## `optimization.removeEmptyChunks`

`bool: true`

Tells webpack to detect and remove chunks which are empty. Setting `optimization.removeEmptyChunks` to `false` will disable this optimization.

__webpack.config.js__

```js
module.exports = {
  //...
  optimization: {
    removeEmptyChunks: false
  }
};
```

## `optimization.mergeDuplicateChunks`

`bool: true`

Tells webpack to merge chunks which contain the same modules. Setting `optimization.mergeDuplicateChunks` to `false` will disable this optimization.

__webpack.config.js__

```js
module.exports = {
  //...
  optimization: {
    mergeDuplicateChunks: false
  }
};
```

## `optimization.flagIncludedChunks`

`bool`

Tells webpack to determine and flag chunks which are subsets of other chunks in a way that subsets don’t have to be loaded when the bigger chunk has been already loaded. By default `optimization.flagIncludedChunks` is enabled in `production` [mode](/concepts/mode/) and disabled elsewise.

__webpack.config.js__

```js
module.exports = {
  //...
  optimization: {
    flagIncludedChunks: true
  }
};
```
