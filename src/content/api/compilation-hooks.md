---
title: Compilation Hooks
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

The `Compilation` module is used by the `Compiler` to create new compilations
(or builds). A `compilation` instance has access to all modules and their
dependencies (most of which are circular references). It is the literal
compilation of all the modules in the dependency graph of an application.
During the compilation phase, modules are loaded, sealed, optimized, chunked,
hashed and restored.

The `Compilation` class also extends `Tapable` and provides the following
lifecycle hooks. They can be tapped the same way as compiler hooks:

``` js
compilation.hooks.someHook.tap(/* ... */);
```

As with the `compiler`, `tapAsync` and `tapPromise` may also be available
depending on the type of hook.


### `buildModule` {#buildmodule}

`SyncHook`

Triggered before a module build has started, can be used to modify the module.

- Callback Parameters: `module`


```js
compilation.hooks.buildModule.tap('SourceMapDevToolModuleOptionsPlugin',
  module => {
    module.useSourceMap = true;
  }
);
```


### `rebuildModule` {#rebuildmodule}

`SyncHook`

Fired before rebuilding a module.

- Callback Parameters: `module`


### `failedModule` {#failedmodule}

`SyncHook`

Run when a module build has failed.

- Callback Parameters: `module` `error`


### `succeedModule` {#succeedmodule}

`SyncHook`

Executed when a module has been built successfully.

- Callback Parameters: `module`


### `finishModules` {#finishmodules}

`AsyncSeriesHook`

Called when all modules have been built without errors.

- Callback Parameters: `modules`


### `finishRebuildingModule` {#finishrebuildingmodule}

`SyncHook`

Executed when a module has been rebuilt, in case of both success or with errors.

- Callback Parameters: `module`


### `seal` {#seal}

`SyncHook`

Fired when the compilation stops accepting new modules.


### `unseal` {#unseal}

`SyncHook`

Fired when a compilation begins accepting new modules.


### `optimizeDependencies` {#optimizedependencies}

`SyncBailHook`

Fired at the beginning of dependency optimization.

- Callback Parameters: `modules`


### `afterOptimizeDependencies` {#afteroptimizedependencies}

`SyncHook`

Fired after the dependency optimization.

- Callback Parameters: `modules`


### `optimize` {#optimize}

`SyncHook`

Triggered at the beginning of the optimization phase.


### `optimizeModules` {#optimizemodules}

`SyncBailHook`

Called at the beginning of the module optimization phase. A plugin can tap into this hook to perform optimizations on modules.

- Callback Parameters: `modules`


### `afterOptimizeModules` {#afteroptimizemodules}

`SyncHook`

Called after modules optimization has completed.

- Callback Parameters: `modules`


### `optimizeChunks` {#optimizechunks}

`SyncBailHook`

Called at the beginning of the chunk optimization phase. A plugin can tap into this hook to perform optimizations on chunks.

- Callback Parameters: `chunks`


### `afterOptimizeChunks` {#afteroptimizechunks}

`SyncHook`

Fired after chunk optimization has completed.

- Callback Parameters: `chunks`


### `optimizeTree` {#optimizetree}

`AsyncSeriesHook`

Called before optimizing the dependency tree. A plugin can tap into this hook to perform a dependency tree optimization.

- Callback Parameters: `chunks` `modules`


### `afterOptimizeTree` {#afteroptimizetree}

`SyncHook`

Called after the dependency tree optimization has completed with success.

- Callback Parameters: `chunks` `modules`


### `optimizeChunkModules` {#optimizechunkmodules}

`SyncBailHook`

Called after the tree optimization, at the beginning of the chunk modules optimization. A plugin can tap into this hook to perform optimizations of chunk modules.

- Callback Parameters: `chunks` `modules`


### `afterOptimizeChunkModules` {#afteroptimizechunkmodules}

`SyncHook`

Called after the chunkmodules optimization has completed successfully.

- Callback Parameters: `chunks` `modules`


### `shouldRecord` {#shouldrecord}

`SyncBailHook`

Called to determine whether or not to store records. Returning anything `!== false` will prevent every other "record" hook from being executed ([`record`](#record), [`recordModules`](#recordmodules), [`recordChunks`](#recordchunks) and [`recordHash`](#recordhash)).


### `reviveModules` {#revivemodules}

`SyncHook`

Restore module information from records.

- Callback Parameters: `modules` `records`


### `beforeModuleIds` {#beforemoduleids}

`SyncHook`

Executed before assigning an `id` to each module.

- Callback Parameters: `modules`


### `moduleIds` {#moduleids}

`SyncHook`

Called to assign an `id` to each module.

- Callback Parameters: `modules`


### `optimizeModuleIds` {#optimizemoduleids}

`SyncHook`

Called at the beginning of the modules `id` optimization.

- Callback Parameters: `modules`


### `afterOptimizeModuleIds` {#afteroptimizemoduleids}

`SyncHook`

Called when the modules `id` optimization phase has completed.

- Callback Parameters: `modules`


### `reviveChunks` {#revivechunks}

`SyncHook`

Restore chunk information from records.

- Callback Parameters: `chunks` `records`


### `beforeChunkIds` {#beforechunkids}

`SyncHook`

Executed before assigning an `id` to each chunk.

- Callback Parameters: `chunks`


### `optimizeChunkIds` {#optimizechunkids}

`SyncHook`

Called at the beginning of the chunks `id` optimization phase.

- Callback Parameters: `chunks`


### `afterOptimizeChunkIds` {#afteroptimizechunkids}

`SyncHook`

Triggered after chunk `id` optimization has finished.

- Callback Parameters: `chunks`


### `recordModules` {#recordmodules}

`SyncHook`

Store module info to the records. This is triggered if [`shouldRecord`](#shouldrecord) returns a truthy value.

- Callback Parameters: `modules` `records`


### `recordChunks` {#recordchunks}

`SyncHook`

Store chunk info to the records. This is only triggered if [`shouldRecord`](#shouldrecord) returns a truthy value.

- Callback Parameters: `chunks` `records`


### `beforeHash` {#beforehash}

`SyncHook`

Called before the compilation is hashed.


### `afterHash` {#afterhash}

`SyncHook`

Called after the compilation is hashed.


### `recordHash` {#recordhash}

`SyncHook`

Store information about record hash to the `records`. This is only triggered if [`shouldRecord`](#shouldrecord) returns a truthy value.

- Callback Parameters: `records`


### `record` {#record}

`SyncHook`

Store information about the `compilation` to the `records`. This is only triggered if [`shouldRecord`](#shouldrecord) returns a truthy value.

- Callback Parameters: `compilation` `records`


### `beforeModuleAssets` {#beforemoduleassets}

`SyncHook`

Executed before module assets creation.


### `additionalChunkAssets` {#additionalchunkassets}

`SyncHook`

W> `additionalChunkAssets` is deprecated (use the [Compilation.hook.processAssets](#processassets) instead and use one of the Compilation.PROCESS_ASSETS_STAGE_* as a stage option)

Create additional assets for the chunks.

- Callback Parameters: `chunks`


### `shouldGenerateChunkAssets` {#shouldgeneratechunkassets}

`SyncBailHook`

Called to determine whether or not generate chunks assets. Returning anything `!== false` will allow chunk assets generation.


### `beforeChunkAssets` {#beforechunkassets}

`SyncHook`

Executed before creating the chunks assets.



### `additionalAssets` {#additionalassets}

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
  });
});
```

### `optimizeChunkAssets` {#optimizechunkassets}

`AsyncSeriesHook`

W> `optimizeChunkAssets` is deprecated (use the [Compilation.hook.processAssets](#processassets) instead and use one of the Compilation.PROCESS_ASSETS_STAGE_* as a stage option)

Optimize any chunk assets. The assets are stored in `compilation.assets`. A
`Chunk` has a property `files` which points to all files created by a chunk.
Any additional chunk assets are stored in `compilation.additionalChunkAssets`.

- Callback Parameters: `chunks`

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


### `afterOptimizeChunkAssets` {#afteroptimizechunkassets}

`SyncHook`

W> `afterOptimizeChunkAssets` is deprecated (use the [Compilation.hook.processAssets](#processassets) instead and use one of the Compilation.PROCESS_ASSETS_STAGE_* as a stage option)

The chunk assets have been optimized.

- Callback Parameters: `chunks`

Here's an example plugin from [@boopathi](https://github.com/boopathi) that outputs exactly what went into each chunk.

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



### `optimizeAssets` {#optimizeassets}

`AsyncSeriesHook`

Optimize all assets stored in `compilation.assets`.

- Callback Parameters: `assets`


### `afterOptimizeAssets` {#afteroptimizeassets}

`SyncHook`

The assets have been optimized.

- Callback Parameters: `assets`


### `processAssets` {#processassets}

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

### `afterProcessAssets` {#afterprocessassets}

`SyncHook`

Called after the [`processAssets`](#processassets) hook had finished without error.

### `needAdditionalSeal` {#needadditionalseal}

`SyncBailHook`

Called to determine if the compilation needs to be unsealed to include other files.


### `afterSeal` {#afterseal}

`AsyncSeriesHook`

Executed right after `needAdditionalSeal`.


### `chunkHash` {#chunkhash}

`SyncHook`

Triggered to emit the hash for each chunk.

- Callback Parameters: `chunk` `chunkHash`


### `moduleAsset` {#moduleasset}

`SyncHook`

Called when an asset from a module was added to the compilation.

- Callback Parameters: `module` `filename`


### `chunkAsset` {#chunkasset}

`SyncHook`

Triggered when an asset from a chunk was added to the compilation.

- Callback Parameters: `chunk` `filename`


### `assetPath` {#assetpath}

`SyncWaterfallHook`

Called to determine the path of an asset.

- Callback Parameters: `path` `options`


### `needAdditionalPass` {#needadditionalpass}

`SyncBailHook`

Called to determine if an asset needs to be processed further after being emitted.


### `childCompiler` {#childcompiler}

`SyncHook`

Executed after setting up a child compiler.

- Callback Parameters: `childCompiler` `compilerName` `compilerIndex`


### `normalModuleLoader` {#normalmoduleloader}

Since webpack v5 `normalModuleLoader` hook was removed. Now to access the loader use `NormalModule.getCompilationHooks(compilation).loader` instead.
