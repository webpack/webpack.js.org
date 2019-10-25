---
title: ProgressPlugin
contributors:
  - elliottsj
  - EugeneHlushko
  - byzyk
---

`
object = { boolean activeModules = true, boolean entries = false, function (number percentage, string message, [string] ...args) handler, boolean modules = true, number modulesCount = 500, boolean profile = false }`

`function (number percentage, string message, [string] ...args)`

The `ProgressPlugin` provides a way to customize how progress is reported during a compilation.

## Usage

Create an instance of `ProgressPlugin` and provide one of the allowed params.

### Providing `function`

Provide a handler function which will be called when hooks report progress. `handler` function arguments:

- `percentage`: a number between 0 and 1 indicating the completion percentage of the compilation
- `message`: a short description of the currently-executing hook
- `...args`: zero or more additional strings describing the current progress


```js
const handler = (percentage, message, ...args) => {
  // e.g. Output each progress message directly to the console:
  console.info(percentage, message, ...args);
};

new webpack.ProgressPlugin(handler);
```

### Providing `object`

When providing an `object` to the `ProgressPlugin`, following properties are supported:

- `activeModules` show's active modules count and one active module in progress message
- `entries` show's entries count in progress message
- [`handler: function (percentage, message, ...args)`](#providing-function)
- `modules` show's modules count in progress message
- `modulesCount` a minimum modules count to start with. Takes effect when `modules` property is enabled.
- `profile` tells `ProgressPlugin` to collect profile data for progress steps.


```js
new webpack.ProgressPlugin({
  entries: true,
  modules: true,
  modulesCount: 100,
  profile: true,
  handler: (percentage, message, ...args) => {
    // custom logic
  }
});
```


## Supported Hooks

The following hooks report progress information to `ProgressPlugin`.

T> _Hooks marked with * allow plugins to report progress information using `reportProgress`. For more, see [Plugin API: Reporting Progress](/api/plugins/#reporting-progress)_

__Compiler__

- compilation
- emit*
- afterEmit*
- done

__Compilation__

- buildModule
- failedModule
- succeedModule
- finishModules*
- seal*
- optimizeDependenciesBasic*
- optimizeDependencies*
- optimizeDependenciesAdvanced*
- afterOptimizeDependencies*
- optimize*
- optimizeModulesBasic*
- optimizeModules*
- optimizeModulesAdvanced*
- afterOptimizeModules*
- optimizeChunksBasic*
- optimizeChunks*
- optimizeChunksAdvanced*
- afterOptimizeChunks*
- optimizeTree*
- afterOptimizeTree*
- optimizeChunkModulesBasic*
- optimizeChunkModules*
- optimizeChunkModulesAdvanced*
- afterOptimizeChunkModules*
- reviveModules*
- optimizeModuleOrder*
- advancedOptimizeModuleOrder*
- beforeModuleIds*
- moduleIds*
- optimizeModuleIds*
- afterOptimizeModuleIds*
- reviveChunks*
- optimizeChunkOrder*
- beforeChunkIds*
- optimizeChunkIds*
- afterOptimizeChunkIds*
- recordModules*
- recordChunks*
- beforeHash*
- afterHash*
- recordHash*
- beforeModuleAssets*
- beforeChunkAssets*
- additionalChunkAssets*
- record*
- additionalAssets*
- optimizeChunkAssets*
- afterOptimizeChunkAssets*
- optimizeAssets*
- afterOptimizeAssets*
- afterSeal*

## Source

- [`ProgressPlugin` source](https://github.com/webpack/webpack/blob/master/lib/ProgressPlugin.js)
