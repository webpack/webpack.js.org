---
title: compilation 钩子
group: Plugins
sort: 2
---

`Compilation` 模块会被 `Compiler` 用来创建新的编译（或新的构建）。`compilation` 实例能够访问所有的模块和它们的依赖（大部分是循环依赖）。它会对应用程序的依赖图中所有模块进行字面上的编译(literal compilation)。在编译阶段，模块会被加载(loaded)、封存(sealed)、优化(optimized)、分块(chunked)、哈希(hashed)和重新创建(restored)。

`Compilation` 类扩展(extend)自 `Tapable`，并提供了以下生命周期钩子。可以按照 compiler 钩子的相同方式，调用 tap：

``` js
compilation.hooks.someHook.tap(...)
```

和 `compiler` 用法相同，取决于不同的钩子类型，也可以在某些钩子上访问 `tapAsync` 和 `tapPromise`。


### `buildModule`

`SyncHook`

在模块构建开始之前触发。

参数：`module`


### `rebuildModule`

`SyncHook`

在重新构建一个模块之前触发。

参数：`module`


### `failedModule`

`SyncHook`

模块构建失败时执行。

参数：`module` `error`


### `succeedModule`

`SyncHook`

模块构建成功时执行。

参数：`module`


### `finishModules`

`SyncHook`

所有模块都完成构建。

参数：`modules`


### `finishRebuildingModule`

`SyncHook`

一个模块完成重新构建。

参数：`module`


### `seal`

`SyncHook`

编译(compilation)停止接收新模块时触发。


### `unseal`

`SyncHook`

编译(compilation)开始接收新模块时触发。


### `optimizeDependenciesBasic`

`SyncBailHook`

...

参数：`modules`


### `optimizeDependencies`

`SyncBailHook`

依赖优化开始时触发。

参数：`modules`


### `optimizeDependenciesAdvanced`

`SyncBailHook`

...

参数：`modules`


### `afterOptimizeDependencies`

`SyncHook`

...

参数：`modules`


### `optimize`

`SyncHook`

优化阶段开始时触发。


### `optimizeModulesBasic`

`SyncBailHook`

...

参数：`modules`


### `optimizeModules`

`SyncBailHook`

...

参数：`modules`


### `optimizeModulesAdvanced`

`SyncBailHook`

...

参数：`modules`


### `afterOptimizeModules`

`SyncHook`

...

参数：`modules`


### `optimizeChunksBasic`

`SyncBailHook`

...

参数：`chunks`


### `optimizeChunks`

`SyncBailHook`

优化 chunk。

参数：`chunks`


### `optimizeChunksAdvanced`

`SyncBailHook`

...

参数：`chunks`


### `afterOptimizeChunks`

`SyncHook`

chunk 优化完成之后触发。

参数：`chunks`


### `optimizeTree`

`AsyncSeriesHook`

异步优化依赖树。

参数：`chunks` `modules`


### `afterOptimizeTree`

`SyncHook`

...

参数：`chunks` `modules`


### `optimizeChunkModulesBasic`

`SyncBailHook`

...

参数：`chunks` `modules`


### `optimizeChunkModules`

`SyncBailHook`

...

参数：`chunks` `modules`


### `optimizeChunkModulesAdvanced`

`SyncBailHook`

...

参数：`chunks` `modules`


### `afterOptimizeChunkModules`

`SyncHook`

...

参数：`chunks` `modules`


### `shouldRecord`

`SyncBailHook`

...


### `reviveModules`

`SyncHook`

从 records 中恢复模块信息。

参数：`modules` `records`


### `optimizeModuleOrder`

`SyncHook`

将模块从最重要的到最不重要的进行排序。

参数：`modules`


### `advancedOptimizeModuleOrder`

`SyncHook`

...

参数：`modules`


### `beforeModuleIds`

`SyncHook`

...

参数：`modules`


### `moduleIds`

`SyncHook`

...

参数：`modules`


### `optimizeModuleIds`

`SyncHook`

...

参数：`chunks`


### `afterOptimizeModuleIds`

`SyncHook`

...

参数：`chunks`


### `reviveChunks`

`SyncHook`

从 records 中恢复 chunk 信息。

参数：`modules` `records`


### `optimizeChunkOrder`

`SyncHook`

将 chunk 从最重要的到最不重要的进行排序。

参数：`chunks`


### `beforeOptimizeChunkIds`

`SyncHook`

chunk `id` 优化之前触发。

参数：`chunks`


### `optimizeChunkIds`

`SyncHook`

优化每个 chunk 的 `id`。

参数：`chunks`


### `afterOptimizeChunkIds`

`SyncHook`

chunk `id` 优化完成之后触发。

参数：`chunks`


### `recordModules`

`SyncHook`

将模块信息存储到 records。

参数：`modules` `records`


### `recordChunks`

`SyncHook`

将 chunk 信息存储到 records。

参数：`chunks` `records`


### `beforeHash`

`SyncHook`

在编译被哈希(hashed)之前。


### `afterHash`

`SyncHook`

在编译被哈希(hashed)之后。


### `recordHash`

`SyncHook`

...

参数：`records`


### `record`

`SyncHook`

将 `compilation` 相关信息存储到 `records` 中。

参数：`compilation` `records`


### `beforeModuleAssets`

`SyncHook`

...


### `shouldGenerateChunkAssets`

`SyncBailHook`

...


### `beforeChunkAssets`

`SyncHook`

在创建 chunk 资源(asset)之前。


### `additionalChunkAssets`

`SyncHook`

为 chunk 创建附加资源(asset)

参数：`chunks`


### `records`

`SyncHook`

...

参数：`compilation` `records`


### `additionalAssets`

`AsyncSeriesHook`

为编译(compilation)创建附加资源(asset)。这个钩子可以用来下载图像，例如：

``` js
compilation.hooks.additionalAssets.tapAsync('MyPlugin', callback => {
  download('https://img.shields.io/npm/v/webpack.svg', function(resp) {
    if(resp.status === 200) {
      compilation.assets['webpack-version.svg'] = toAsset(resp);
      callback();
    } else {
      callback(new Error('[webpack-example-plugin] Unable to download the image'));
    }
  })
});
```


### `optimizeChunkAssets`

`AsyncSeriesHook`

优化所有 chunk 资源(asset)。资源(asset)会被存储在 `compilation.assets`。每个 `Chunk` 都有一个 files 属性，指向这个 chunk 创建的所有文件。附加资源(asset)被存储在 `compilation.additionalChunkAssets` 中。

参数：`chunks`

以下是为每个 chunk 添加 banner 的简单示例。

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

chunk 资源(asset)已经被优化。

参数：`chunks`

这里是一个来自 [@boopathi](https://github.com/boopathi) 的示例插件，详细地输出每个 chunk 里有什么。

``` js
compilation.hooks.afterOptimizeChunkAssets.tap(chunks => {
  chunks.forEach(chunk => {
    console.log({
      id: chunk.id,
      name: chunk.name,
      includes: chunk.modules.map(module => module.request)
    });
  });
});
```


### `optimizeAssets`

`AsyncSeriesHook`

优化存储在 `compilation.assets` 中的所有资源(asset)。

参数：`assets`


### `afterOptimizeAssets`

`SyncHook`

资源优化已经结束。

参数：`assets`


### `needAdditionalSeal`

`SyncBailHook`

...


### `afterSeal`

`AsyncSeriesHook`

...


### `chunkHash`

`SyncHook`

...

参数：`chunk` `chunkHash`


### `moduleAsset`

`SyncHook`

一个模块中的一个资源被添加到编译中。

参数：`module` `filename`


### `chunkAsset`

`SyncHook`

一个 chunk 中的一个资源被添加到编译中。

参数：`chunk` `filename`


### `assetPath`

`SyncWaterfallHook`

...

参数：`filename` `data`


### `needAdditionalPass`

`SyncBailHook`

...


### `childCompiler`

`SyncHook`

...

参数：`childCompiler` `compilerName` `compilerIndex`


### `normalModuleLoader`

`SyncHook`

普通模块 loader，真正（一个接一个地）加载模块图(graph)中所有模块的函数。

参数：`loaderContext` `module`
