---
title: compilation 钩子
group: Plugins
sort: 10
contributors:
  - byzyk
  - madhavarshney
  - misterdev
  - wizardofhogwarts
  - EugeneHlushko
  - chenxsan
---

`Compilation` 模块会被 `Compiler` 用来创建新的 compilation 对象（或新的 build 对象）。
`compilation` 实例能够访问所有的模块和它们的依赖（大部分是循环依赖）。
它会对应用程序的依赖图中所有模块，
进行字面上的编译(literal compilation)。
在编译阶段，模块会被加载(load)、封存(seal)、优化(optimize)、
分块(chunk)、哈希(hash)和重新创建(restore)。

`Compilation` 类扩展(extend)自 `Tapable`，并提供了以下生命周期钩子。
可以按照 compiler 钩子的相同方式来调用 tap：

``` js
compilation.hooks.someHook.tap(/* ... */);
```

和 `compiler` 用法相同，取决于不同的钩子类型，
所以也可以在某些钩子上访问 `tapAsync` 和 `tapPromise`。


### `buildModule`

`SyncHook`

在模块构建开始之前触发，可以用来修改模块。

- 回调参数：`module`


```js
compilation.hooks.buildModule.tap('SourceMapDevToolModuleOptionsPlugin',
  module => {
    module.useSourceMap = true;
  }
);
```


### `rebuildModule`

`SyncHook`

在重新构建一个模块之前触发。

- 回调参数：`module`


### `failedModule`

`SyncHook`

模块构建失败时执行。

- 回调参数：`module` `error`


### `succeedModule`

`SyncHook`

模块构建成功时执行。

- 回调参数：`module`


### `finishModules`

`AsyncSeriesHook`

所有模块都完成构建并且没有错误时执行。

- 回调参数：`modules`


### `finishRebuildingModule`

`SyncHook`

一个模块完成重新构建时执行，在都成功或有错误的情况下。

- 回调参数：`module`


### `seal`

`SyncHook`

compilation 对象停止接收新的模块时触发。


### `unseal`

`SyncHook`

compilation 对象开始接收新模块时触发。


### `optimizeDependencies`

`SyncBailHook`

依赖优化开始时触发。

- 回调参数：`modules`


### `afterOptimizeDependencies`

`SyncHook`

依赖优化之后触发。

- 回调参数：`modules`


### `optimize`

`SyncHook`

优化阶段开始时触发。


### `optimizeModules`

`SyncBailHook`

在模块优化阶段开始时调用。插件可以 tap 此钩子对模块进行优化。

- 回调参数：`modules`


### `afterOptimizeModules`

`SyncHook`

在模块优化完成之后调用。

- 回调参数：`modules`


### `optimizeChunks`

`SyncBailHook`

在 chunk 优化阶段开始时调用。插件可以 tap 此钩子对 chunk 执行优化。

- 回调参数：`chunks`


### `afterOptimizeChunks`

`SyncHook`

chunk 优化完成之后触发。

- 回调参数：`chunks`


### `optimizeTree`

`AsyncSeriesHook`

在优化依赖树之前调用。插件可以 tap 此钩子执行依赖树优化。

- 回调参数：`chunks` `modules`


### `afterOptimizeTree`

`SyncHook`

在依赖树优化成功完成之后调用。

- 回调参数：`chunks` `modules`


### `optimizeChunkModules`

`SyncBailHook`

在树优化之后，chunk 模块优化开始时调用。插件可以 tap 此钩子来执行 chunk 模块的优化。

- 回调参数：`chunks` `modules`


### `afterOptimizeChunkModules`

`SyncHook`

在 chunk 模块优化成功完成之后调用。

- 回调参数：`chunks` `modules`


### `shouldRecord`

`SyncBailHook`

调用来决定是否存储 record。返回任何内容 `!== false` 将阻止执行所有其他 "record" 钩子（[`record`](#record), [`recordModules`](#recordmodules), [`recordChunks`](#recordchunks) 和 [`recordHash`](#recordhash)）。


### `reviveModules`

`SyncHook`

从 record 中恢复模块信息。

- 回调参数：`modules` `records`


### `beforeModuleIds`

`SyncHook`

在为每个模块分配 `id` 之前执行。

- 回调参数：`modules`


### `moduleIds`

`SyncHook`

调用来每个模块分配一个 `id`。

- 回调参数：`modules`


### `optimizeModuleIds`

`SyncHook`

在模块 `id` 优化开始时调用。

- 回调参数：`modules`


### `afterOptimizeModuleIds`

`SyncHook`

在模块 `id` 优化完成时调用。

- 回调参数：`modules`


### `reviveChunks`

`SyncHook`

从 record 中恢复 chunk 信息。

- 回调参数：`chunks` `records`


### `beforeChunkIds`

`SyncHook`

在为每个 chunk 分配 `id` 之前执行。

- 回调参数：`chunks`


### `optimizeChunkIds`

`SyncHook`

在 chunk `id` 优化阶段开始时调用。

- 回调参数：`chunks`


### `afterOptimizeChunkIds`

`SyncHook`

chunk `id` 优化结束之后触发。

- 回调参数：`chunks`


### `recordModules`

`SyncHook`

将模块信息存储到 record 中。[`shouldRecord`](#shouldrecord) 返回 truthy 值时触发。

- 回调参数：`modules` `records`


### `recordChunks`

`SyncHook`

将 chunk 存储到 record 中。[`shouldRecord`](#shouldrecord) 返回 truthy 值时触发。

- 回调参数：`chunks` `records`


### `beforeHash`

`SyncHook`

在 compilation 添加哈希(hash)之前。


### `afterHash`

`SyncHook`

在 compilation 添加哈希(hash)之后。


### `recordHash`

`SyncHook`

将有关 record 的信息存储到 `records` 中。仅在 [`shouldRecord`](#shouldrecord) 返回 truthy 值时触发。

- 回调参数：`records`


### `record`

`SyncHook`

将 `compilation` 相关信息存储到 `record` 中。仅在 [`shouldRecord`](#shouldrecord) 返回 truthy 值时触发。

- 回调参数：`compilation` `records`


### `beforeModuleAssets`

`SyncHook`

在创建模块 asset 之前执行。


### `additionalChunkAssets`

`SyncHook`

W> `additionalChunkAssets` 已弃用（可使用 [Compilation.hook.processAssets](#processassets) 来代替，并且可使用 Compilation.PROCESS_ASSETS_STAGE_* 作为其选项参数。）

为这些 chunk 创建其他 asset。

- 回调参数：`chunks`


### `shouldGenerateChunkAssets`

`SyncBailHook`

调用以确定是否生成 chunk asset。返回任何 `!== false` 将允许生成 chunk asset。


### `beforeChunkAssets`

`SyncHook`

在创建 chunk asset 之前。



### `additionalAssets`

`AsyncSeriesHook`

为 compilation 创建额外 asset。
这个钩子可以用来下载图像，例如：

``` js
compilation.hooks.additionalAssets.tapAsync('MyPlugin', callback => {
  download('https://img.shields.io/npm/v/webpack.svg', function(resp) {
    if(resp.status === 200) {
      compilation.assets['webpack-version.svg'] = toAsset(resp);
      callback();
    } else {
      callback(new Error('[webpack-example-plugin] Unable to download the image'));
    }
  });
});
```

### `optimizeChunkAssets`

`AsyncSeriesHook`

W> `optimizeChunkAssets` 已弃用。（可使用 [Compilation.hook.processAssets](#processassets) 来代替，并且可使用 Compilation.PROCESS_ASSETS_STAGE_* 作为其选项参数。

优化所有 chunk asset。asset 存储在 `compilation.assets` 中。
每个 `Chunk` 都具有一个 `files` 属性，其指向由一个 chunk 创建的所有文件。
任何额外 chunk asset 都存储在 `compilation.additionalChunkAssets` 中。

- 回调参数：`chunks`

Here's an example that simply adds a banner to each chunk.

``` js
compilation.hooks
  .optimizeChunkAssets
  .tapAsync('MyPlugin', (chunks, callback) => {
    chunks.forEach(chunk => {
      chunk.files.forEach(file => {
        compilation.assets[file] = new ConcatSource(
          '\/**Sweet Banner**\/',
          '\n',
          compilation.assets[file]
        );
      });
    });

    callback();
  });
```


### `afterOptimizeChunkAssets`

`SyncHook`

W> `afterOptimizeChunkAssets` 已弃用。（可使用 [Compilation.hook.processAssets](#processassets) 来代替，并且可使用 Compilation.PROCESS_ASSETS_STAGE_* 作为其选项参数。

chunk asset 已经被优化。

- 回调参数：`chunks`

这里是一个来自 [@boopathi](https://github.com/boopathi) 的示例插件，详细地输出每个 chunk 里有什么。

``` js
compilation.hooks.afterOptimizeChunkAssets.tap('MyPlugin', chunks => {
  chunks.forEach(chunk => {
    console.log({
      id: chunk.id,
      name: chunk.name,
      includes: chunk.getModules().map(module => module.request)
    });
  });
});
```



### `optimizeAssets`

`AsyncSeriesHook`

优化存储在 `compilation.assets` 中的所有 asset。

- 回调参数：`assets`


### `afterOptimizeAssets`

`SyncHook`

asset 已经优化。

- 回调参数：`assets`


### `processAssets`

`AsyncSeriesHook`

Asset processing.

- Callback Parameters: `assets`

Here's an example:

```js
compilation.hooks.processAssets.tap(
  {
    name: 'MyPlugin',
    stage: Compilation.PROCESS_ASSETS_STAGE_ADDITIONS,
  },
  (assets) => {
    // code here
  }
);
```

There're many stages to use:

- `PROCESS_ASSETS_STAGE_ADDITIONAL` - Add additional assets to the compilation.
- `PROCESS_ASSETS_STAGE_PRE_PROCESS` - Basic preprocessing of the assets.
- `PROCESS_ASSETS_STAGE_DERIVED` - Derive new assets from the existing assets.
- `PROCESS_ASSETS_STAGE_ADDITIONS` - Add additional sections to the existing assets e.g. banner or initialization code.
- `PROCESS_ASSETS_STAGE_OPTIMIZE` - Optimize existing assets in a general way.
- `PROCESS_ASSETS_STAGE_OPTIMIZE_COUNT` - Optimize the count of existing assets, e.g. by merging them.
- `PROCESS_ASSETS_STAGE_OPTIMIZE_COMPATIBILITY` - Optimize the compatibility of existing assets, e.g. add polyfills or vendor prefixes.
- `PROCESS_ASSETS_STAGE_OPTIMIZE_SIZE` - Optimize the size of existing assets, e.g. by minimizing or omitting whitespace.
- `PROCESS_ASSETS_STAGE_SUMMARIZE` - Summarize the list of existing assets.
- `PROCESS_ASSETS_STAGE_DEV_TOOLING` - Add development tooling to the assets, e.g. by extracting a source map.
- `PROCESS_ASSETS_STAGE_OPTIMIZE_TRANSFER` - Optimize the transfer of existing assets, e.g. by preparing a compressed (gzip) file as separate asset.
- `PROCESS_ASSETS_STAGE_ANALYSE` - Analyze the existing assets.
- `PROCESS_ASSETS_STAGE_REPORT` - Creating assets for the reporting purposes.

### `afterProcessAssets`

`SyncHook`

Called after the [`processAssets`](#processassets) hook had finished without error.

### `needAdditionalSeal`

`SyncBailHook`

调用来决定 compilation 是否需要解除 seal 以引入其他文件。


### `afterSeal`

`AsyncSeriesHook`

在 `needAdditionalSeal` 之后立即执行。


### `chunkHash`

`SyncHook`

触发来为每个 chunk 生成 hash。

- 回调参数：`chunk` `chunkHash`


### `moduleAsset`

`SyncHook`

一个模块中的一个 asset 被添加到 compilation 时调用。

- 回调参数：`module` `filename`


### `chunkAsset`

`SyncHook`

一个 chunk 中的一个 asset 被添加到 compilation 时调用。

- 回调参数：`chunk` `filename`


### `assetPath`

`SyncWaterfallHook`

调用以决定 asset 的路径。

- 回调参数：`path` `options`


### `needAdditionalPass`

`SyncBailHook`

调用以决定 asset 在输出后是否需要进一步处理。


### `childCompiler`

`SyncHook`

子 compiler 设置之后执行。

- 回调参数：`childCompiler` `compilerName` `compilerIndex`


### `normalModuleLoader`

从 webpack v5 开始，`normalModuleLoader` 钩子已经删除。现在要访问loader 请改用 `NormalModule.getCompilationHooks(compilation).loader`。
