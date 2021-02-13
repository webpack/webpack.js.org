---
title: Optimization
sort: 9
contributors:
  - EugeneHlushko
  - jeremenichelli
  - simon04
  - byzyk
  - madhavarshney
  - dhurlburtusa
  - jamesgeorge007
  - anikethsaha
  - snitin315
  - pixel-ray
  - chenxsan
related:
  - title: 'webpack 4: Code Splitting, chunk graph and the splitChunks optimization'
    url: https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
---

Since version 4 webpack runs optimizations for you depending on the chosen [`mode`](/configuration/mode/), still all optimizations are available for manual configuration and overrides.

## `optimization.minimize`

`boolean = true`

Tell webpack to minimize the bundle using the [TerserPlugin](/plugins/terser-webpack-plugin/) or the plugin(s) specified in [`optimization.minimizer`](#optimizationminimizer).

**webpack.config.js**

```js
module.exports = {
  //...
  optimization: {
    minimize: false,
  },
};
```

T> Learn how [mode](/configuration/mode/) works.

## `optimization.minimizer`

`[TerserPlugin]` and or `[function (compiler)]`

Allows you to override the default minimizer by providing a different one or more customized [TerserPlugin](/plugins/terser-webpack-plugin/) instances.

**webpack.config.js**

```js
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true, // Must be set to true if using source-maps in production
        terserOptions: {
          // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
        },
      }),
    ],
  },
};
```

Or, as function:

```js
module.exports = {
  optimization: {
    minimizer: [
      (compiler) => {
        const TerserPlugin = require('terser-webpack-plugin');
        new TerserPlugin({
          /* your config */
        }).apply(compiler);
      },
    ],
  },
};
```

`'...'` can be used in `optimization.minimizer` to access the defaults.

```js
module.exports = {
  optimization: {
    minimizer: [new CssMinimizer(), '...'],
  },
};
```

## `optimization.splitChunks`

`object`

By default webpack v4+ provides new common chunks strategies out of the box for dynamically imported modules. See available options for configuring this behavior in the [SplitChunksPlugin](/plugins/split-chunks-plugin/) page.

## `optimization.runtimeChunk`

`object` `string` `boolean`

Setting `optimization.runtimeChunk` to `true` or `'multiple'` adds an additional chunk containing only the runtime to each entrypoint. This setting is an alias for:

**webpack.config.js**

```js
module.exports = {
  //...
  optimization: {
    runtimeChunk: {
      name: (entrypoint) => `runtime~${entrypoint.name}`,
    },
  },
};
```

The value `'single'` instead creates a runtime file to be shared for all generated chunks. This setting is an alias for:

**webpack.config.js**

```js
module.exports = {
  //...
  optimization: {
    runtimeChunk: {
      name: 'runtime',
    },
  },
};
```

By setting `optimization.runtimeChunk` to `object` it is only possible to provide the `name` property which stands for the name or name factory for the runtime chunks.

Default is `false`: each entry chunk embeds runtime.

W> Imported modules are initialized for each runtime chunk separately, so if you include multiple entry points on a page, beware of this behavior. You will probably want to set it to `single` or use another configuration that allows you to only have one runtime instance.

**webpack.config.js**

```js
module.exports = {
  //...
  optimization: {
    runtimeChunk: {
      name: (entrypoint) => `runtimechunk~${entrypoint.name}`,
    },
  },
};
```

## `optimization.emitOnErrors`

`boolean = false`

Use the `optimization.emitOnErrors` to emit assets whenever there are errors while compiling. This ensures that erroring assets are emitted. Critical errors are emitted into the generated code and will cause errors at runtime.

**webpack.config.js**

```js
module.exports = {
  //...
  optimization: {
    emitOnErrors: true,
  },
};
```

W> If you are using webpack [CLI](/api/cli/), the webpack process will not exit with an error code while this plugin is enabled. If you want webpack to "fail" when using the CLI, please check out the [`bail` option](/api/cli/#advanced-options).

## `optimization.moduleIds`

`boolean = false` `string: 'natural' | 'named' | 'deterministic' | 'size'`

Tells webpack which algorithm to use when choosing module ids. Setting `optimization.moduleIds` to `false` tells webpack that none of built-in algorithms should be used, as custom one can be provided via plugin. By default `optimization.moduleIds` is set to `false`.

The following string values are supported:

| Option          | Description                                           |
| --------------- | ----------------------------------------------------- |
| `natural`       | Numeric ids in order of usage.                        |
| `named`         | Readable ids for better debugging.                    |
| `deterministic` | Module names are hashed into small numeric values.    |
| `size`          | Numeric ids focused on minimal initial download size. |

**webpack.config.js**

```js
module.exports = {
  //...
  optimization: {
    moduleIds: 'deterministic',
  },
};
```

`deterministic` option is useful for long term caching, but still results in smaller bundles compared to `hashed`. Length of the numeric value is chosen to fill a maximum of 80% of the id space. By default a minimum length of 3 digits is used when `optimization.moduleIds` is set to `deterministic`. To override the default behaviour set `optimization.moduleIds` to `false` and use the `webpack.ids.DeterministicModuleIdsPlugin`.

**webpack.config.js**

```js
module.exports = {
  //...
  optimization: {
    moduleIds: false,
  },
  plugins: [
    new webpack.ids.DeterministicModuleIdsPlugin({
      maxLength: 5,
    }),
  ],
};
```

W> `moduleIds: 'deterministic'` was added in webpack 5 and `moduleIds: 'hashed'` is deprecated in favor of it.

W> `moduleIds: total-size` has been removed in webpack 5.

## `optimization.chunkIds`

`boolean = false` `string: 'natural' | 'named' | 'size' | 'total-size' | 'deterministic'`

Tells webpack which algorithm to use when choosing chunk ids. Setting `optimization.chunkIds` to `false` tells webpack that none of built-in algorithms should be used, as custom one can be provided via plugin. There are a couple of defaults for `optimization.chunkIds`:

- Also if the environment is development then `optimization.chunkIds` is set to `'named'`, while in production it is set to `'deterministic'`
- if none of the above, `optimization.chunkIds` will be defaulted to `'natural'`

The following string values are supported:

| Option            | Description                                                                                                                           |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `'natural'`       | Numeric ids in order of usage.                                                                                                        |
| `'named'`         | Readable ids for better debugging.                                                                                                    |
| `'deterministic'` | Short numeric ids which will not be changing between compilation. Good for long term caching. Enabled by default for production mode. |
| `'size'`          | Numeric ids focused on minimal initial download size.                                                                                 |
| `'total-size'`    | numeric ids focused on minimal total download size.                                                                                   |

**webpack.config.js**

```js
module.exports = {
  //...
  optimization: {
    chunkIds: 'named',
  },
};
```

By default, a minimum length of 3 digits is used when `optimization.chunkIds` is set to `'deterministic'`. To override the default behaviour, set `optimization.chunkIds` to `false` and use the `webpack.ids.DeterministicChunkIdsPlugin`.

**webpack.config.js**

```js
module.exports = {
  //...
  optimization: {
    chunkIds: false,
  },
  plugins: [
    new webpack.ids.DeterministicChunkIdsPlugin({
      maxLength: 5,
    }),
  ],
};
```

## `optimization.nodeEnv`

`boolean = false` `string`

Tells webpack to set `process.env.NODE_ENV` to a given string value. `optimization.nodeEnv` uses [DefinePlugin](/plugins/define-plugin/) unless set to `false`. `optimization.nodeEnv` **defaults** to [mode](/configuration/mode/) if set, else falls back to `'production'`.

Possible values:

- any string: the value to set `process.env.NODE_ENV` to.
- false: do not modify/set the value of `process.env.NODE_ENV`.

**webpack.config.js**

```js
module.exports = {
  //...
  optimization: {
    nodeEnv: 'production',
  },
};
```

T> When [mode](/configuration/mode/) is set to `'none'`, `optimization.nodeEnv` defaults to `false`.

## `optimization.mangleWasmImports`

`boolean = false`

When set to `true` tells webpack to reduce the size of WASM by changing imports to shorter strings. It mangles module and export names.

**webpack.config.js**

```js
module.exports = {
  //...
  optimization: {
    mangleWasmImports: true,
  },
};
```

## `optimization.removeAvailableModules`

`boolean = false`

Tells webpack to detect and remove modules from chunks when these modules are already included in all parents. Setting `optimization.removeAvailableModules` to `true` will enable this optimization. Enabled by default in [`production` mode](/configuration/mode/).

**webpack.config.js**

```js
module.exports = {
  //...
  optimization: {
    removeAvailableModules: true,
  },
};
```

W> `optimization.removeAvailableModules` reduces the performance of webpack, and will be disabled in `production` mode by default in next major release. Disable it in `production` mode if you want extra build performance.

## `optimization.removeEmptyChunks`

`boolean = true`

Tells webpack to detect and remove chunks which are empty. Setting `optimization.removeEmptyChunks` to `false` will disable this optimization.

**webpack.config.js**

```js
module.exports = {
  //...
  optimization: {
    removeEmptyChunks: false,
  },
};
```

## `optimization.mergeDuplicateChunks`

`boolean = true`

Tells webpack to merge chunks which contain the same modules. Setting `optimization.mergeDuplicateChunks` to `false` will disable this optimization.

**webpack.config.js**

```js
module.exports = {
  //...
  optimization: {
    mergeDuplicateChunks: false,
  },
};
```

## `optimization.flagIncludedChunks`

`boolean`

Tells webpack to determine and flag chunks which are subsets of other chunks in a way that subsets don’t have to be loaded when the bigger chunk has been already loaded. By default `optimization.flagIncludedChunks` is enabled in `production` [mode](/configuration/mode/) and disabled elsewise.

**webpack.config.js**

```js
module.exports = {
  //...
  optimization: {
    flagIncludedChunks: true,
  },
};
```

## `optimization.providedExports`

`boolean`

Tells webpack to figure out which exports are provided by modules to generate more efficient code for `export * from ...`. By default `optimization.providedExports` is enabled.

**webpack.config.js**

```js
module.exports = {
  //...
  optimization: {
    providedExports: false,
  },
};
```

## `optimization.usedExports`

`boolean = true` `string: 'global'`

Tells webpack to determine used exports for each module. This depends on [`optimization.providedExports`](#optimizationoccurrenceorder). Information collected by `optimization.usedExports` is used by other optimizations or code generation i.e. exports are not generated for unused exports, export names are mangled to single char identifiers when all usages are compatible.
Dead code elimination in minimizers will benefit from this and can remove unused exports.

**webpack.config.js**

```js
module.exports = {
  //...
  optimization: {
    usedExports: false,
  },
};
```

To opt-out from used exports analysis per runtime:

```js
module.exports = {
  //...
  optimization: {
    usedExports: 'global',
  },
};
```

## `optimization.concatenateModules`

`boolean`

Tells webpack to find segments of the module graph which can be safely concatenated into a single module. Depends on [`optimization.providedExports`](#optimizationprovidedexports) and [`optimization.usedExports`](#optimizationusedexports).
By default `optimization.concatenateModules` is enabled in `production` [mode](/configuration/mode/) and disabled elsewise.

**webpack.config.js**

```js
module.exports = {
  //...
  optimization: {
    concatenateModules: true,
  },
};
```

## `optimization.sideEffects`

`boolean = true` `string: 'flag'`

Tells webpack to recognise the [`sideEffects`](https://github.com/webpack/webpack/blob/master/examples/side-effects/README.md) flag in `package.json` or rules to skip over modules which are flagged to contain no side effects when exports are not used.

**package.json**

```json
{
  "name": "awesome npm module",
  "version": "1.0.0",
  "sideEffects": false
}
```

T> Please note that `sideEffects` should be in the npm module's `package.json` file and doesn't mean that you need to set `sideEffects` to `false` in your own project's `package.json` which requires that big module.

`optimization.sideEffects` depends on [`optimization.providedExports`](#optimizationprovidedexports) to be enabled. This dependency has a build time cost, but eliminating modules has positive impact on performance because of less code generation. Effect of this optimization depends on your codebase, try it for possible performance wins.

**webpack.config.js**

```js
module.exports = {
  //...
  optimization: {
    sideEffects: true,
  },
};
```

To only use the manual flag and do not analyse source code:

```js
module.exports = {
  //...
  optimization: {
    sideEffects: 'flag',
  },
};
```

The `'flag'` value is used by default in non-production builds.

T> `optimization.sideEffects` will also flag modules as side effect free when they contain only side effect free statements.

## `optimization.portableRecords`

`boolean`

`optimization.portableRecords` tells webpack to generate records with relative paths to be able to move the context folder.

By default `optimization.portableRecords` is disabled. Automatically enabled if at least one of the records options provided to webpack config: [`recordsPath`](/configuration/other-options/#recordspath), [`recordsInputPath`](/configuration/other-options/#recordsinputpath), [`recordsOutputPath`](/configuration/other-options/#recordsoutputpath).

**webpack.config.js**

```js
module.exports = {
  //...
  optimization: {
    portableRecords: true,
  },
};
```

## `optimization.mangleExports`

`boolean` `string: 'deterministic' | 'size'`

`optimization.mangleExports` allows to control export mangling.

By default `optimization.mangleExports: 'deterministic'` is enabled in `production` [mode](/configuration/mode/) and disabled elsewise.

The following values are supported:

| Option            | Description                                                                                                          |
| ----------------- | -------------------------------------------------------------------------------------------------------------------- |
| `'size'`          | Short names - usually a single char - focused on minimal download size.                                              |
| `'deterministic'` | Short names - usually two chars - which will not change when adding or removing exports. Good for long term caching. |
| `true`            | Same as `'deterministic'`                                                                                            |
| `false`           | Keep original name. Good for readablility and debugging.                                                             |

**webpack.config.js**

```js
module.exports = {
  //...
  optimization: {
    mangleExports: true,
  },
};
```

## `optimization.innerGraph`

`boolean = true`

`optimization.innerGraph` tells webpack whether to conduct inner graph analysis for unused exports.

**webpack.config.js**

```js
module.exports = {
  //...
  optimization: {
    innerGraph: false,
  },
};
```

## `optimization.realContentHash`

`boolean = true`

Adds an additional hash compilation pass after the assets have been processed to get the correct asset content hashes. If `realContentHash` is set to `false`, internal data is used to calculate the hash and it can change when assets are identical.

**webpack.config.js**

```js
module.exports = {
  //...
  optimization: {
    realContentHash: false,
  },
};
```
