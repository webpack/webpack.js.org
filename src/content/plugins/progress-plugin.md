---
title: ProgressPlugin
contributors:
  - elliottsj
  - EugeneHlushko
  - byzyk
---

The `ProgressPlugin` provides a way to customize how progress is reported during a compilation.

## Usage

Create an instance of `ProgressPlugin` with a handler function which will be called when hooks report progress:

```js
const handler = (percentage, message, ...args) => {
  // e.g. Output each progress message directly to the console:
  console.info(percentage, message, ...args);
};

new webpack.ProgressPlugin(handler);
```

- `handler` is a function which takes these arguments:
- `percentage`: a number between 0 and 1 indicating the completion percentage of the compilation.
- `message`: a short description of the currently-executing hook.
- `...args`: zero or more additional strings describing the current progress.

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
