---
title: Compilation Hooks
group: Plugins
sort: 2
contributors:
  - byzyk
  - madhavarshney
  - misterdev
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


### `buildModule`

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


### `rebuildModule`

`SyncHook`

Fired before rebuilding a module.

- Callback Parameters: `module`


### `failedModule`

`SyncHook`

Run when a module build has failed.

- Callback Parameters: `module` `error`


### `succeedModule`

`SyncHook`

Executed when a module has been built successfully.

- Callback Parameters: `module`


### `finishModules`

`SyncHook`

Called when all modules have been built without errors.

- Callback Parameters: `modules`


### `finishRebuildingModule`

`SyncHook`

Executed when a module has been rebuilt successfully or with errors.

- Callback Parameters: `module`


### `seal`

`SyncHook`

Fired when the compilation stops accepting new modules.


### `unseal`

`SyncHook`

Fired when a compilation begins accepting new modules.


### `optimizeDependencies`

`SyncBailHook`

Fired at the beginning of dependency optimization.

- Callback Parameters: `modules`


### `afterOptimizeDependencies`

`SyncHook`

Fired after the dependency optimization.

- Callback Parameters: `modules`


### `optimize`

`SyncHook`

Triggered at the beginning of the optimization phase, that 


### `optimizeModules`

`SyncBailHook`

Called before optimizing modules. ...

- Callback Parameters: `modules`


### `afterOptimizeModules`

`SyncHook`

Fired after modules optimization has completed.

- Callback Parameters: `modules`


### `optimizeChunksBasic`

`SyncBailHook`

...

- Callback Parameters: `chunks`


### `optimizeChunks`

`SyncBailHook`

Optimize the chunks.

- Callback Parameters: `chunks`


### `optimizeChunksAdvanced`

`SyncBailHook`

...

- Callback Parameters: `chunks`


### `afterOptimizeChunks`

`SyncHook`

Fired after chunk optimization has completed.

- Callback Parameters: `chunks`


### `optimizeTree`

`AsyncSeriesHook`

Optimize the dependency tree asynchronously.

- Callback Parameters: `chunks` `modules`


### `afterOptimizeTree`

`SyncHook`

Fired after the dependency three optimization has completed.

- Callback Parameters: `chunks` `modules`


### `optimizeChunkModulesBasic`

`SyncBailHook`

...

- Callback Parameters: `chunks` `modules`


### `optimizeChunkModules`

`SyncBailHook`

...

- Callback Parameters: `chunks` `modules`


### `optimizeChunkModulesAdvanced`

`SyncBailHook`

...

- Callback Parameters: `chunks` `modules`


### `afterOptimizeChunkModules`

`SyncHook`

...

- Callback Parameters: `chunks` `modules`


### `shouldRecord`

`SyncBailHook`

Called to determine wheter or not storing records. Returning anything `!== false` will prevent every other "record" hook from being executed (`record`, `recordModules`, `recordChunks` and `recordHash` )


### `reviveModules`

`SyncHook`

Restore module information from records.

- Callback Parameters: `modules` `records`


### `optimizeModuleOrder`

`SyncHook`

Sort the modules in from most to least important.

- Callback Parameters: `modules`


### `advancedOptimizeModuleOrder`

`SyncHook`

...

- Callback Parameters: `modules`


### `beforeModuleIds`

`SyncHook`

...

- Callback Parameters: `modules`


### `moduleIds`

`SyncHook`

...

- Callback Parameters: `modules`


### `optimizeModuleIds`

`SyncHook`

...

- Callback Parameters: `chunks`


### `afterOptimizeModuleIds`

`SyncHook`

...

- Callback Parameters: `chunks`


### `reviveChunks`

`SyncHook`

Restore chunk information from records.

- Callback Parameters: `modules` `records`


### `optimizeChunkOrder`

`SyncHook`

Sort the chunks in from most to least important.

- Callback Parameters: `chunks`


### `beforeOptimizeChunkIds`

`SyncHook`

Fired before chunk `id` optimization.

- Callback Parameters: `chunks`


### `optimizeChunkIds`

`SyncHook`

Optimize the `id` of each chunk.

- Callback Parameters: `chunks`


### `afterOptimizeChunkIds`

`SyncHook`

Triggered after chunk `id` optimization has finished.

- Callback Parameters: `chunks`


### `recordModules`

`SyncHook`

Store module info to the records.

- Callback Parameters: `modules` `records`


### `recordChunks`

`SyncHook`

Store chunk info to the records.

- Callback Parameters: `chunks` `records`


### `beforeHash`

`SyncHook`

Before the compilation is hashed.


### `afterHash`

`SyncHook`

After the compilation is hashed.


### `recordHash`

`SyncHook`

...

- Callback Parameters: `records`


### `record`

`SyncHook`

Store information about the `compilation` to the `records`.

- Callback Parameters: `compilation` `records`


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

- Callback Parameters: `chunks`


### `records`

`SyncHook`

...

- Callback Parameters: `compilation` `records`


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
  });
});
```


### `optimizeChunkAssets`

`AsyncSeriesHook`

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


### `afterOptimizeChunkAssets`

`SyncHook`

The chunk assets have been optimized.

- Callback Parameters: `chunks`

Here's an example plugin from [@boopathi](https://github.com/boopathi) that outputs exactly what went into each chunk.

``` js
compilation.hooks.afterOptimizeChunkAssets.tap('MyPlugin', chunks => {
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

- Callback Parameters: `assets`


### `afterOptimizeAssets`

`SyncHook`

The assets has been optimized.

- Callback Parameters: `assets`


### `needAdditionalSeal`

`SyncBailHook`

...


### `afterSeal`

`AsyncSeriesHook`

...


### `chunkHash`

`SyncHook`

...

- Callback Parameters: `chunk` `chunkHash`


### `moduleAsset`

`SyncHook`

An asset from a module was added to the compilation.

- Callback Parameters: `module` `filename`


### `chunkAsset`

`SyncHook`

An asset from a chunk was added to the compilation.

- Callback Parameters: `chunk` `filename`


### `assetPath`

`SyncWaterfallHook`

...

- Callback Parameters: `filename` `data`


### `needAdditionalPass`

`SyncBailHook`

...


### `childCompiler`

`SyncHook`

...

- Callback Parameters: `childCompiler` `compilerName` `compilerIndex`


### `normalModuleLoader`

`SyncHook`

The normal module loader is the function that actually loads all the modules
in the module graph (one-by-one).

- Callback Parameters: `loaderContext` `module`

### `dependencyReference`

`SyncWaterfallHook`

`Compilation.hooks.dependencyReference(depRef, dependency, module)` allows to change the references reported by dependencies.

- Callback Parameters: `depRef` `dependency` `module`
