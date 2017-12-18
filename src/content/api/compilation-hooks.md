---
title: Compilation Hooks
group: Plugins
sort: 2
---

The `Compilation` module is used by the `Compiler` to create new compilations
(or builds). A `Compilation` instance has access to all modules and their
dependencies (most of which are circular references). It is the literal
compilation of all the modules in the dependency graph of an application.
During the compilation phase, modules are loaded, sealed, optimized, chunked,
hashed and restored.

The `Compilation` class also extends `Tapable` and provides the following
lifecycle hooks. They can be tapped the same way as compiler hooks:

``` js
compilation.hooks.someHook.tap(...)
```

As with the compiler, `tapAsync` and `tapPromise` may also be available
depending on the type of hook.


### `buildModule`

`SyncHook`

Triggered before a module build has started.

Parameters: `module`


### `rebuildModule`

`SyncHook`

Fired before rebuilding a module.

Parameters: `module`


### `failedModule`

`SyncHook`

Run when a module build has failed.

Parameters: `module` `error`


### `succeedModule`

`SyncHook`

Executed when a module has been built successfully.

Parameters: `module`


### `finishModules`

`SyncHook`

...

Parameters: `modules`


### `finishRebuildingModule`

`SyncHook`

...

Parameters: `module`


### `seal`

`SyncHook`

Fired when the compilation stops accepting new modules.


### `unseal`

`SyncHook`

...


### `optimizeDependenciesBasic`

`SyncBailHook`

...

Parameters: `modules`


### `optimizeDependencies`

`SyncBailHook`

...

Parameters: `modules`


### `optimizeDependenciesAdvanced`

`SyncBailHook`

...

Parameters: `modules`


### `afterOptimizeDependencies`

`SyncHook`

...

Parameters: `modules`


### `optimize`

`SyncHook`

Triggered at the beginning of the optimization phase.


### `optimizeModulesBasic`

`SyncBailHook`

...

Parameters: `modules`


### `optimizeModules`

`SyncBailHook`

...

Parameters: `modules`


### `optimizeModulesAdvanced`

`SyncBailHook`

...

Parameters: `modules`


### `afterOptimizeModules`

`SyncHook`

...

Parameters: `modules`


### `optimizeChunksBasic`

`SyncBailHook`

...

Parameters: `chunks`


### `optimizeChunks`

`SyncBailHook`

Optimize the chunks.

Parameters: `chunks`


### `optimizeChunksAdvanced`

`SyncBailHook`

...

Parameters: `chunks`


### `afterOptimizeChunks`

`SyncHook`

Fired after chunk optimization has completed.

Parameters: `chunks`


### `optimizeTree`

`AsyncSeriesHook`

Optimize the dependency tree asynchronously.

Parameters: `chunks` `modules`


### `afterOptimizeTree`

`SyncHook`

...

Parameters: `chunks` `modules`


### `optimizeChunkModulesBasic`

`SyncBailHook`

...

Parameters: `chunks` `modules`


### `optimizeChunkModules`

`SyncBailHook`

...

Parameters: `chunks` `modules`


### `optimizeChunkModulesAdvanced`

`SyncBailHook`

...

Parameters: `chunks` `modules`


### `afterOptimizeChunkModules`

`SyncHook`

...

Parameters: `chunks` `modules`


### `shouldRecord`

`SyncBailHook`

...


### `reviveModules`

`SyncHook`

Restore module information from records.

Parameters: `modules` `records`


### `optimizeModuleOrder`

`SyncHook`

Sort the modules in from most to least important.

Parameters: `modules`


### `advancedOptimizeModuleOrder`

`SyncHook`

...

Parameters: `modules`


### `beforeModuleIds`

`SyncHook`

...

Paramters: `modules`


### `moduleIds`

`SyncHook`

...

Parameters: `modules`


### `optimizeModuleIds`

`SyncHook`

...

Paramters: `chunks`


### `afterOptimizeModuleIds`

`SyncHook`

...

Paramters: `chunks`


### `reviveChunks`

`SyncHook`

Restore chunk information from records.

Parameters: `modules` `records`


### `optimizeChunkOrder`

`SyncHook`

Sort the chunks in from most to least important.

Parameters: `chunks`


### `beforeOptimizeChunkIds`

`SyncHook`

Fired before chunk `id` optimization.

Paramters: `chunks`


### `optimizeChunkIds`

`SyncHook`

Optimize the `id` of each chunk.

Parameters: `chunks`


### `afterOptimizeChunkIds`

`SyncHook`

Triggered after chunk `id` optimization has finished.

Paramters: `chunks`


### `recordModules`

`SyncHook`

Store module info to the records.

Parameters: `modules` `records`


### `recordChunks`

`SyncHook`

Store chunk info to the records.

Parameters: `chunks` `records`


### `beforeHash`

`SyncHook`

Before the compilation is hashed.


### `afterHash`

`SyncHook`

After the compilation is hashed.


### `recordHash`

`SyncHook`

...

Parameters: `records`


### `record`

`SyncHook`

Store information about the `compilation` to the `records`.

Parameters: `compilation` `records`


### `beforeModuleAssets`

`SyncHook`

...


### `shouldGenerateChunkAssets`

`SyncBailHook`

...


### `beforeChunkAssets`

`SyncHook`

Before creating the chunk assets.


### `additionalChunkAssets`

`SyncHook`

Create additional assets for the chunks.

Parameters: `chunks`


### `records`

`SyncHook`

...

Parameters: `compilation` `records`


### `additionalAssets`

`AsyncSeriesHook`

Create additional assets for the compilation. This hook can be used to download
an image, for example:

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

Optimize any chunk assets. The assets are stored in `compilation.assets`. A
`Chunk` has a property `files` which points to all files created by a chunk.
Any additional chunk assets are stored in `compilation.additionalChunkAssets`.

Parameters: `chunks`

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

The chunk assets have been optimized.

Parameters: `chunks`

Here's an example plugin from [@boopathi](https://github.com/boopathi) that outputs exactly what went into each chunk.

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

Optimize all assets stored in `compilation.assets`.

Parameters: `assets`


### `afterOptimizeAssets`

`SyncHook`

The assets has been optimized.

Parameters: `assets`


### `needAdditionalSeal`

`SyncBailHook`

...


### `afterSeal`

`AsyncSeriesHook`

...


### `chunkHash`

`SyncHook`

...

Parameters: `chunk` `chunkHash`


### `moduleAsset`

`SyncHook`

An asset from a module was added to the compilation.

Parameters: `module` `filename`


### `chunkAsset`

`SyncHook`

An asset from a chunk was added to the compilation.

Parameters: `chunk` `filename`


### `assetPath`

`SyncWaterfallHook`

...

Parameters: `filename` `data`


### `needAdditionalPass`

`SyncBailHook`

...


### `childCompiler`

`SyncHook`

...

Parameters: `childCompiler` `compilerName` `compilerIndex`


### `normalModuleLoader`

`SyncHook`

The normal module loader is the function that actually loads all the modules
in the module graph (one-by-one).

Parameters: `loaderContext` `module`
