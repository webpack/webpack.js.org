---
title: ProgressPlugin
group: webpack
contributors:
  - elliottsj
  - EugeneHlushko
  - byzyk
  - smelukov
---

`object = { boolean activeModules = true, boolean entries = false, function (number percentage, string message, [string] ...args) handler, boolean modules = true, number modulesCount = 500, boolean profile = false }`

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

- `activeModules` (`boolean = false`): Shows active modules count and one active module in progress message.
- `entries` (`boolean = true`): Shows entries count in progress message.
- `handler` (See [Providing function](#providing-function))
- `modules` (`boolean = true`): Shows modules count in progress message.
- `modulesCount` (`number = 5000`): A minimum modules count to start with. Takes effect when `modules` property is enabled.
- `profile` (`boolean = false`): Tells `ProgressPlugin` to collect profile data for progress steps.
- `dependencies` (`boolean = true`): Shows the count of dependencies in progress message.
- `dependenciesCount` (`number = 10000`): A minimum dependencies count to start with. Takes effect when `dependencies` property is enabled.
- `percentBy` (`string = null: 'entries' | 'dependencies' | 'modules' | null`): Tells `ProgressPlugin` how to calculate progress percentage.

```js
new webpack.ProgressPlugin({
  activeModules: false,
  entries: true,
  handler(percentage, message, ...args) {
    // custom logic
  },
  modules: true,
  modulesCount: 5000,
  profile: false,
  dependencies: true,
  dependenciesCount: 10000,
  percentBy: null,
});
```

## Percentage calculation

By default, progress percentage is calculated based on built modules count and total modules count: `built / total`

The total modules count is unknown in advance and changes during the build. This may cause inaccurate progress percentage.

To solve this problem `ProgressPlugin` caches the last known total modules count and reuses this value on the next build. The first build will warm the cache but the following builds will use and update this value.

> We recommend using `percentBy: 'entries'` setting for projects with [multiple configured entry points](/configuration/entry-context/#entry). Percentage calculation will become more accurate because the amount of entry points is known in advance.

## Supported Hooks

The following hooks report progress information to `ProgressPlugin`.

T> _Hooks marked with \* allow plugins to report progress information using `reportProgress`. For more, see [Plugin API: Reporting Progress](/api/plugins/#reporting-progress)_

**Compiler**

- compilation
- emit\*
- afterEmit\*
- done

**Compilation**

- buildModule
- failedModule
- succeedModule
- finishModules\*
- seal\*
- optimizeDependenciesBasic\*
- optimizeDependencies\*
- optimizeDependenciesAdvanced\*
- afterOptimizeDependencies\*
- optimize\*
- optimizeModulesBasic\*
- optimizeModules\*
- optimizeModulesAdvanced\*
- afterOptimizeModules\*
- optimizeChunksBasic\*
- optimizeChunks\*
- optimizeChunksAdvanced\*
- afterOptimizeChunks\*
- optimizeTree\*
- afterOptimizeTree\*
- optimizeChunkModulesBasic\*
- optimizeChunkModules\*
- optimizeChunkModulesAdvanced\*
- afterOptimizeChunkModules\*
- reviveModules\*
- optimizeModuleOrder\*
- advancedOptimizeModuleOrder\*
- beforeModuleIds\*
- moduleIds\*
- optimizeModuleIds\*
- afterOptimizeModuleIds\*
- reviveChunks\*
- optimizeChunkOrder\*
- beforeChunkIds\*
- optimizeChunkIds\*
- afterOptimizeChunkIds\*
- recordModules\*
- recordChunks\*
- beforeHash\*
- afterHash\*
- recordHash\*
- beforeModuleAssets\*
- beforeChunkAssets\*
- additionalChunkAssets\*
- record\*
- additionalAssets\*
- optimizeChunkAssets\*
- afterOptimizeChunkAssets\*
- optimizeAssets\*
- afterOptimizeAssets\*
- afterSeal\*

## Source

- [`ProgressPlugin` source](https://github.com/webpack/webpack/blob/master/lib/ProgressPlugin.js)
