---
title: ProgressPlugin
contributors:
  - elliottsj
  - EugeneHlushko
  - byzyk
---

`object` `function (percentage: number, message: string, ...args: string[])`

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

- `activeModules: boolean = true` show's active modules count and one active module in progress message
- `entries: boolean = false` show's entries count in progress message
- [`handler: function(percentage, message, ...args)`](#providing-function)
- `modules: boolean = true` show's modules count in progress message
- `modulesCount: number = 500` a minimum modules count to start with. Takes effect when `modules` property is enabled.
- `profile: true | false | null = false` tells `ProgressPlugin` to collect profile data for progress steps.


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
