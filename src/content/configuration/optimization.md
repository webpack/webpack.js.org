---
title: 优化(Optimization)
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

从 webpack 4 开始，会根据你选择的 [`mode`](/concepts/mode/) 来执行不同的优化，
不过所有的优化还是可以手动配置和重写。


## `optimization.minimize` {#optimizationminimize}

`boolean`

告知 webpack 使用 [TerserPlugin](/plugins/terser-webpack-plugin/) 或其它在 [`optimization.minimizer`](#optimizationminimizer) 
定义的插件压缩 bundle。

`production` 模式下，这里默认是 `true`。

__webpack.config.js__


```js
module.exports = {
  //...
  optimization: {
    minimize: false
  }
};
```

T> 了解 [mode](/concepts/mode/) 工作机制。

## `optimization.minimizer` {#optimizationminimizer}

`[TerserPlugin]` 或 `[function (compiler)]`

允许你通过提供一个或多个定制过的 [TerserPlugin](/plugins/terser-webpack-plugin/) 实例，
覆盖默认压缩工具(minimizer)。

__webpack.config.js__

```js
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true, // 如果在生产环境中使用 source-maps，必须设置为 true
        terserOptions: {
          // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
        }
      }),
    ],
  }
};
```

或，使用函数的形式：

```js
module.exports = {
  optimization: {
    minimizer: [
      (compiler) => {
        const TerserPlugin = require('terser-webpack-plugin');
        new TerserPlugin({ /* 你的选项 */ }).apply(compiler);
      }
    ],
  }
};
```

在 `optimization.minimizer` 中可以使用 `'...'` 来访问默认值。

```js
module.exports = {
  optimization: {
    minimizer: [new CssMinimizer(), '...'],
  }
};
```

## `optimization.splitChunks` {#optimizationsplitchunks}

`object`

对于动态导入模块，默认使用 webpack v4+ 提供的全新的通用分块策略(common chunk strategy)。请在 [SplitChunksPlugin](/plugins/split-chunks-plugin/) 
页面中查看配置其行为的可用选项。

## `optimization.runtimeChunk` {#optimizationruntimechunk}

`object` `string` `boolean`

将 `optimization.runtimeChunk` 设置为 `true` 或 `'multiple'`，会为每个只含有 runtime 的入口添加一个额外 chunk。此配置的别名如下：

__webpack.config.js__

```js
module.exports = {
  //...
  optimization: {
    runtimeChunk: {
      name: entrypoint => `runtime~${entrypoint.name}`
    }
  }
};
```

值 `"single"` 会创建一个在所有生成 chunk 之间共享的运行时文件。此设置是如下设置的别名：

__webpack.config.js__

```js
module.exports = {
  //...
  optimization: {
    runtimeChunk: {
      name: 'runtime'
    }
  }
};
```

通过将 `optimization.runtimeChunk` 设置为 `object`，对象中可以设置只有 `name` 属性，其中属性值可以是名称或者返回名称的函数，
用于为 runtime chunks 命名。

默认值是 `false`：每个入口 chunk 中直接嵌入 runtime。

W> 对于每个 runtime chunk，导入的模块会被分别初始化，因此如果你在同一个页面中引用多个入口起点，请注意此行为。你或许应该将其设置为 `single`，或者使用其他只有一个 runtime 实例的配置。

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

## `optimization.noEmitOnErrors` {#optimizationnoemitonerrors}

`boolean`

在编译出错时，使用 `optimization.noEmitOnErrors` 来跳过生成阶段(emitting phase)。这可以确保没有生成出错误资源。而 stats 中所有 assets 
中的 `emitted` 标记都是 `false`。

__webpack.config.js__

```js
module.exports = {
  //...
  optimization: {
    noEmitOnErrors: true
  }
};
```

W>如果你正在使用 webpack [CLI](/api/cli/)，在此插件开启时，webpack 处理过程不会因为错误代码而退出。如果你希望在使用 CLI 时 webpack "失败(fail)"，
请查看 [`bail` 选项](/api/cli/#advanced-options)。

## `optimization.namedModules` {#optimizationnamedmodules}

`boolean = false`

告知 webpack 使用可读取模块标识符(readable module identifiers)，来帮助更好地调试。webpack 配置中如果没有设置此选项，默认会在 [mode](/concepts/mode/) `development` 启用，在 [mode](/concepts/mode/) `production` 禁用。

__webpack.config.js__

```js
module.exports = {
  //...
  optimization: {
    namedModules: true
  }
};
```

## `optimization.namedChunks` {#optimizationnamedchunks}

`boolean = false`

告知 webpack 使用可读取 chunk 标识符(readable chunk identifiers)，来帮助更好地调试。webpack 配置中如果没有设置此选项，默认会在 [mode](/concepts/mode/) `development` 启用，在 [mode](/concepts/mode/) `production` 禁用。

__webpack.config.js__

```js
module.exports = {
  //...
  optimization: {
    namedChunks: true
  }
};
```

## `optimization.moduleIds` {#optimizationmoduleids}

`boolean = false` `string: 'natural' | 'named' | 'deterministic' | 'size'`

告知 webpack 当选择模块 id 时需要使用哪种算法。将 `optimization.moduleIds` 设置为  `false` 会告知 webpack 没有任何内置的算法会被使用，但自定义的算法会由插件提供。`optimization.moduleIds` 的默认值是 `false`。

下面的字符串值均被支持：

选荐值                | 描述
--------------------- | -----------------------
`natural`             | 按使用顺序的数字 id。
`named`               | 对调试更友好的可读的 id。
`deterministic`       | 被哈希转化成的小位数值模块名。
`size`                | 专注于让初始下载包大小更小的数字 id。

__webpack.config.js__

```js
module.exports = {
  //...
  optimization: {
    moduleIds: 'hashed'
  }
};
```

`deterministic` 选项有益于长期缓存，但对比于 `hashed` 来说，它会导致更小的文件 bundles。数字值的长度会被选作用于填满最多80%的id空间。
当  `optimization.moduleIds` 被设置成 `deterministic`，默认最小3位数字会被使用。
要覆盖默认行为，要将 `optimization.moduleIds` 设置成 `false`，
并且要使用 `webpack.ids.DeterministicModuleIdsPlugin`。

__webpack.config.js__

```js
module.exports = {
  //...
  optimization: {
    moduleIds: false
  },
  plugins: [
    new webpack.ids.DeterministicModuleIdsPlugin({
      maxLength: 5
    })
  ]
};
```

W> `moduleIds: 'deterministic'` 在 webpack 5 中被添加，而且 `moduleIds: 'hashed'` 相应地会在 webpack 5 中废弃。

W> `moduleIds: total-size` 在 webpack 5 中被废弃。

## `optimization.chunkIds` {#optimizationchunkids}

`boolean = false` `string: 'natural' | 'named' | 'size' | 'total-size' | 'deterministic' `

告知 webpack 当选择模块 id 时需要使用哪种算法。将 `optimization.chunkIds` 设置为  `false` 会告知 webpack 没有任何内置的算法会被使用，但自定义的算法会由插件提供。`optimization.chunkIds` 的默认值是 `false`：

- 如果 [`optimization.occurrenceOrder`](#optimizationoccurrenceorder) 被启用 `optimization.chunkIds` 会被设置成 `'total-size'`
- 不考虑上一条的条件，如果 [`optimization.namedChunks`](#optimizationnamedchunks) 被启用 `optimization.chunkIds` 会被设置成 `'named'`
- 如果环境是开发环境，那么 `optimization.chunkIds` 会被设置成 `'named'`, 
但当在生产环境中时，它会被设置成 `'deterministic'`
- 如果上述的条件都不符合, `optimization.chunkIds` 会被默认设置为 `'natural'`

下述选项字符串值均为被支持:

选项值                  | 描述
----------------------- | -----------------------
`'natural'`             | 按使用顺序的数字 id。
`'named'`               | 对调试更友好的可读的 id。
`'deterministic'`       | 在不同的编译中不变的短数字 id。有益于长期昏村。
在生产模式中会默认开启。
`'size'`                | 专注于让初始下载包大小更小的数字 id。
`'total-size'`          | 专注于让总下载包大小更小的数字 id。


__webpack.config.js__

```js
module.exports = {
  //...
  optimization: {
    chunkIds: 'named'
  }
};
```

默认地，当 `optimization.chunkIds` 被设置为 `'deterministic'` 时，最少3位数字会被使用。要覆盖默认的行为，
要将 `optimization.chunkIds` 设置为 `false`，同时要使用 `webpack.ids.DeterministicChunkIdsPlugin`。

__webpack.config.js__

```js
module.exports = {
  //...
  optimization: {
    chunkIds: false
  },
  plugins: [
    new webpack.ids.DeterministicChunkIdsPlugin({
      maxLength: 5
    })
  ]
};
```

## `optimization.nodeEnv` {#optimizationnodeenv}

`boolean = false` `string`

告知 webpack 将 `process.env.NODE_ENV` 设置为一个给定字符串。如果 `optimization.nodeEnv` 不是 `false`，则会使用 [DefinePlugin](/plugins/define-plugin/)，`optimization.nodeEnv` __默认值__取决于 [mode](/concepts/mode/)，如果为 falsy 值，则会回退到 `"production"`。

可能的值有：

- 任何字符串：用于设置 `process.env.NODE_ENV` 的值。
- false：不修改/设置 `process.env.NODE_ENV`的值。

__webpack.config.js__

```js
module.exports = {
  //...
  optimization: {
    nodeEnv: 'production'
  }
};
```

## `optimization.mangleWasmImports` {#optimizationmanglewasmimports}

`boolean = false`

在设置为 `true` 时，告知 webpack 通过将导入修改为更短的字符串，来减少 WASM 大小。这会破坏模块和导出名称。

__webpack.config.js__

```js
module.exports = {
  //...
  optimization: {
    mangleWasmImports: true
  }
};
```

## `optimization.removeAvailableModules` {#optimizationremoveavailablemodules}

`boolean = false`

如果模块已经包含在所有父级模块中，告知 webpack 从 chunk 中检测出这些模块，或移除这些模块。将 `optimization.removeAvailableModules` 设置为 `true` 以启用这项优化。在 [`生产` 模式](/configuration/mode/) 中默认会被开启。

__webpack.config.js__

```js
module.exports = {
  //...
  optimization: {
    removeAvailableModules: true
  }
};
```

W> `optimization.removeAvailableModules` 会削减了 webapck 的性能表现，而且将会在下一个主要发布版本中，在 `生产` 模式下会被禁用。
如果你想获得额外的构建性能，请在 `生产` 模式中禁用它。

## `optimization.removeEmptyChunks` {#optimizationremoveemptychunks}

`boolean = true`

如果 chunk 为空，告知 webpack 检测或移除这些 chunk。将 `optimization.removeEmptyChunks` 设置为 `false` 以禁用这项优化。

__webpack.config.js__

```js
module.exports = {
  //...
  optimization: {
    removeEmptyChunks: false
  }
};
```

## `optimization.mergeDuplicateChunks` {#optimizationmergeduplicatechunks}

`boolean = true`

告知 webpack 合并含有相同模块的 chunk。将 `optimization.mergeDuplicateChunks` 设置为 `false` 以禁用这项优化。

__webpack.config.js__

```js
module.exports = {
  //...
  optimization: {
    mergeDuplicateChunks: false
  }
};
```

## `optimization.flagIncludedChunks` {#optimizationflagincludedchunks}

`boolean`

告知 webpack 确定和标记出作为其他 chunk 子集的那些 chunk，其方式是在已经加载过较大的 chunk 之后，就不再去加载这些 chunk 子集。`optimization.flagIncludedChunks` 默认会在 `生产` [模式](/concepts/mode/) 中启用，其他情况禁用。

__webpack.config.js__

```js
module.exports = {
  //...
  optimization: {
    flagIncludedChunks: true
  }
};
```

## `optimization.occurrenceOrder` {#optimizationoccurrenceorder}

`boolean`

告知 webpack 去确定那些会引致更小的初始化文件 bundle 的模块顺序。`optimization.occurrenceOrder` 
默认会在 `生产` [模式](/concepts/mode/) 中启用，其他情况禁用。

__webpack.config.js__

```js
module.exports = {
  //...
  optimization: {
    occurrenceOrder: false
  }
};
```

## `optimization.providedExports` {#optimizationprovidedexports}

`boolean`

告知 webpack 去确定那些由模块提供的导出内容，为 `export * from ...` 生成更多高效的代码。
默认 `optimization.providedExports` 会被启用。

__webpack.config.js__

```js
module.exports = {
  //...
  optimization: {
    providedExports: false
  }
};
```

## `optimization.usedExports` {#optimizationusedexports}

`boolean = true`

告知 webpack 去决定每个模块使用的导出内容。这取决于 [`optimization.providedExports`](#optimizationoccurrenceorder) 选项。由 `optimization.usedExports` 收集的信息会被其它优化手段或者代码生成使用，比如未使用的导出内容不会被生成，
当所有的使用都适配，导出名称会被处理做单个标记字符。
在压缩工具中的无用代码清除会受益于该选项，而且能够去除未使用的导出内容。

__webpack.config.js__

```js
module.exports = {
  //...
  optimization: {
    usedExports: false
  }
};
```

## `optimization.concatenateModules` {#optimizationconcatenatemodules}

`boolean`

告知 webpack 去寻找模块图形中的片段，哪些是可以安全地被合并到单一模块中。这取决于 [`optimization.providedExports`](#optimizationprovidedexports) 和 [`optimization.usedExports`](#optimizationusedexports)。
默认 `optimization.concatenateModules` 在 `生产` [模式](/configuration/mode/) 下被启用，而在其它情况下被禁用。

__webpack.config.js__

```js
module.exports = {
  //...
  optimization: {
    concatenateModules: true
  }
};
```

## `optimization.sideEffects` {#optimizationsideeffects}

`boolean = true`

告知 webpack 去辨识 `package.json` 中的  [`副作用`](https://github.com/webpack/webpack/blob/master/examples/side-effects/README.md) 标记或规则，以跳过那些当导出不被使用且被标记不包含副作用的模块。

__package.json__

``` json
{
  "name": "awesome npm module",
  "version": "1.0.0",
  "sideEffects": false
}
```

T> 请注意的是 `（副作用）sideEffects` 需要在 npm 模块的 `package.json` 文件中，但并不意味着你需要在你自己的引用那个大模块的项目中的
`package.json` 中将 `sideEffects` 设置成 `false`。

`optimization.sideEffects` 取决于 [`optimization.providedExports`](#optimizationprovidedexports) 被设置成启用。这个依赖会有构建时间的损耗，但去掉模块会对性能有正面的影响，因为更少的代码被生成。该优化的效果取决于你的代码库，
可以尝试这个特性以获取一些可能的性能优化。

__webpack.config.js__

```js
module.exports = {
  //...
  optimization: {
    sideEffects: true
  }
};
```

## `optimization.portableRecords` {#optimizationportablerecords}

`boolean`

`optimization.portableRecords` 告知 webpack 生成带有相对路径的记录(records)使得可以移动上下文目录。

默认 `optimization.portableRecords` 被禁用。如果下列至少一个选项在 webpack 中被设置，该选项也会自动启用：[`recordsPath`](/configuration/other-options/#recordspath), [`recordsInputPath`](/configuration/other-options/#recordsinputpath), 
[`recordsOutputPath`](/configuration/other-options/#recordsoutputpath)。

__webpack.config.js__

```js
module.exports = {
  //...
  optimization: {
    portableRecords: true
  }
};
```

## `optimization.mangleExports` {#optimizationmangleexports}

`boolean`

`optimization.mangleExports` 允许控制导出处理(export mangling)。

默认 `optimization.mangleExports` 会在 `生产` [模式下](/configuration/mode/) 启用而其它情况会被禁用。

__webpack.config.js__

```js
module.exports = {
  //...
  optimization: {
    mangleExports: true
  }
};
```

## `optimization.innerGraph` {#optimizationinnergraph}

`boolean = true`

`optimization.innerGraph` 告知 webpack 是否对未使用的导出内容，实施内部图形分析(graph analysis)。

__webpack.config.js__

```js
module.exports = {
  //...
  optimization: {
    innerGraph: false
  }
};
```
