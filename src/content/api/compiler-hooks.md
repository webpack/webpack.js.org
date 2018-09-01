---
title: Compiler Hooks
group: Plugins
sort: 1
contributors:
  - rishantagarwal
  - byzyk
  - madhavarshney
---

The `Compiler` module is the main engine that creates a compilation instance
with all the options passed through the [CLI](/api/cli) or [Node API](/api/node). It extends the
`Tapable` class in order to register and call plugins. Most user facing plugins
are first registered on the `Compiler`.

T> This module is exposed as `webpack.Compiler` and can be used directly. See
[this example](https://github.com/pksjce/webpack-internal-examples/tree/master/compiler-example)
for more information.

When developing a plugin for webpack, you might want to know where each hook is called. To learn this, search for `hooks.<hook name>.call` across the webpack source


## Watching

The `Compiler` supports [watching](/api/node/#watching) which monitors the file
system and recompiles as files change. When in watch mode, the compiler will
emit the additional events such as `watchRun`, `watchClose`, and `invalid`.
This is typically used in [development](/guides/development), usually under
the hood of tools like `webpack-dev-server`, so that the developer doesn't
need to re-compile manually every time. Watch mode can also be entered via the
[CLI](/api/cli/#watch-options).


## Hooks

The following lifecycle hooks are exposed by the `compiler` and can be accessed
as such:

``` js
compiler.hooks.someHook.tap(/* ... */);
```

Depending on the hook type, `tapAsync` and `tapPromise` may also be available.

For the description of hook types, see [the Tapable docs](https://github.com/webpack/tapable#hook-types).


### `entryOption`

`SyncBailHook`

Executes a plugin after [the `entry` configuration](https://webpack.js.org/configuration/entry-context/#entry) from webpack options has been processed.


### `afterPlugins`

`SyncHook`

Runs a plugin after setting up initial set of plugins.

Parameters: `compiler`


### `afterResolvers`

`SyncHook`

Executes a plugin after resolver setup is complete.

Parameters: `compiler`


### `environment`

`SyncHook`

Runs a plugin before the environment is prepared.


### `afterEnvironment`

`SyncHook`

Executes a plugin a environment setup is complete.


### `beforeRun`

`AsyncSeriesHook`

Adds a hook right before `compiler.run()` is executed.

Parameters: `compiler`


### `run`

`AsyncSeriesHook`

Hook into the compiler before it begins reading records.

Parameters: `compiler`


### `watchRun`

`AsyncSeriesHook`

Executes a plugin during watch mode after a new compilation is triggered
but before the compilation is actually started.

Parameters: `compiler`


### `normalModuleFactory`

`SyncHook`

Runs a plugin after a `NormalModuleFactory` is created.

Parameters: `normalModuleFactory`


### `contextModuleFactory`

Runs a plugin after a `ContextModuleFactory` is created.

Parameters: `contextModuleFactory`


### `beforeCompile`

`AsyncSeriesHook`

Executes a plugin after compilation parameters are created.

Parameters: `compilationParams`


### `compile`

`SyncHook`

Hook into the compiler before a new compilation is created.

Parameters: `compilationParams`


### `thisCompilation`

`SyncHook`

Executed before emitting the `compilation` event (see below).

Parameters: `compilation`


### `compilation`

`SyncHook`

Runs a plugin after a compilation has been created.

Parameters: `compilation`


### `make`

`AsyncParallelHook`

...

Parameters: `compilation`


### `afterCompile`

`AsyncSeriesHook`

...

Parameters: `compilation`


### `shouldEmit`

`SyncBailHook`

Can return true/false at this point

Parameters: `compilation`


### `emit`

`AsyncSeriesHook`

Before emitting assets to output dir

Parameters: `compilation`


### `afterEmit`

`AsyncSeriesHook`

After emitting assets to output dir

Parameters: `compilation`


### `done`

`AsyncSeriesHook`

Compilation has completed.

Parameters: `stats`


### `failed`

`SyncHook`

Compilation has failed.

Parameters: `error`


### `invalid`

`SyncHook`

Watch compilation has been invalidated.

Parameters: `fileName`, `changeTime`


### `watchClose`

`SyncHook`

Watch mode has stopped.
