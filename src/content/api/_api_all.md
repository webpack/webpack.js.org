

# Compiler Hooks

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


# Introduction

A variety of interfaces are available to customize the compilation process.
Some features overlap between interfaces, e.g. a configuration option may be
available via a CLI flag, while others exist only through a single interface.
The following high-level information should get you started.


## CLI

The Command Line Interface (CLI) to configure and interact with your build. It
is especially useful in the case of early prototyping and profiling. For the
most part, the CLI is simply used to kick off the process using a configuration
file and a few flags (e.g. `--env`).

[Learn more about the CLI!](/api/cli)


## Module

When processing modules with webpack, it is important to understand the
different module syntaxes -- specifically the [methods](/api/module-methods)
and [variables](/api/module-variables) -- that are supported.

[Learn more about modules!](/api/module-methods)


## Node

While most users can get away with just using the CLI along with a
configuration file, more fine-grained control of the compilation can be
achieved via the Node interface. This includes passing multiple configurations,
programmatically running or watching, and collecting stats.

[Learn more about the Node API!](/api/node)


## Loaders

Loaders are transformations that are applied to the source code of a module.
They are written as functions that accept source code as a parameter and return
a new version of that code with transformations applied.

[Learn more about loaders!](/api/loaders)


## Plugins

The plugin interface allows users to tap directly into the compilation process.
Plugins can register handlers on lifecycle hooks that run at different points
throughout a compilation. When each hook is executed, the plugin will have full
access to the current state of the compilation.

[Learn more about plugins!](/api/plugins)


# Command Line Interface

For proper usage and easy distribution of this configuration, webpack can be configured with `webpack.config.js`. Any parameters sent to the CLI will map to a corresponding parameter in the config file.

Read the [installation guide](/guides/installation) if you don't already have webpack and CLI installed.


## Usage with config file

```sh
webpack [--config webpack.config.js]
```

See [configuration](/configuration) for the options in the configuration file.


## Usage without config file

```sh
webpack <entry> [<entry>] -o <output>
```

__`<entry>`__

A filename or a set of named filenames which act as the entry point to build your project. You can pass multiple entries (every entry is loaded on startup). If you pass a pair in the form `<name>=<request>` you can create an additional entry point. It will be mapped to the configuration option `entry`.

__`<output>`__

A path and filename for the bundled file to be saved in. It will be mapped to the configuration options `output.path` and `output.filename`.

__Example__

If your project structure is as follows -

```bash
.
├── dist
├── index.html
└── src
    ├── index.js
    ├── index2.js
    └── others.js
```

```bash
webpack src/index.js -o dist/bundle.js
```

This will bundle your source code with entry as `index.js` and the output bundle file will have a path of `dist` and the filename will be `bundle.js`

```bash
	| Asset     | Size    | Chunks      | Chunk Names |
	|-----------|---------|-------------|-------------|
	| bundle.js | 1.54 kB | 0 [emitted] | index       |
	[0] ./src/index.js 51 bytes {0} [built]
	[1] ./src/others.js 29 bytes {0} [built]
```

```bash
webpack index=./src/index.js entry2=./src/index2.js dist/bundle.js
```

This will form the bundle with both the files as separate entry points.

```bash
	| Asset     | Size    | Chunks        | Chunk Names   |
	|-----------|---------|---------------|---------------|
	| bundle.js | 1.55 kB | 0,1 [emitted] | index, entry2 |
	[0] ./src/index.js 51 bytes {0} [built]
	[0] ./src/index2.js 54 bytes {1} [built]
	[1] ./src/others.js 29 bytes {0} {1} [built]
```


### Common Options

W> Note that Command Line Interface has a higher precedence for the arguments you use it with than your configuration file. For instance, if you pass [`--mode="production"`](/concepts/mode/#usage) to webpack CLI and your configuration file uses `development`, `production` will be used.

__List all of the options available on the cli__

```bash
webpack --help
webpack -h
```

__Build source using a config file__

Specifies a different [configuration](/configuration) file to pick up. Use this if you want to specify something different than `webpack.config.js`, which is the default.

```bash
webpack --config example.config.js
```

__Print result of webpack as a JSON__

```bash
webpack --json
webpack --json > stats.json
```

In every other case, webpack prints out a set of stats showing bundle, chunk and timing details. Using this option the output can be a JSON object. This response is accepted by webpack's [analyse tool](https://webpack.github.io/analyse/), or chrisbateman's [webpack-visualizer](https://chrisbateman.github.io/webpack-visualizer/), or th0r's [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer). The analyse tool will take in the JSON and provide all the details of the build in graphical form.

### Environment Options

When the webpack configuration [exports a function](/configuration/configuration-types#exporting-a-function), an "environment" may be passed to it.

```bash
webpack --env.production    # sets env.production == true
webpack --env.platform=web  # sets env.platform == "web"
```

The `--env` argument accepts various syntaxes:

Invocation                               | Resulting environment
---------------------------------------- | ---------------------------
`webpack --env prod`                     | `"prod"`
`webpack --env.prod`                     | `{ prod: true }`
`webpack --env.prod=1`                   | `{ prod: 1 }`
`webpack --env.prod=foo`                 | `{ prod: "foo" }`
`webpack --env.prod --env.min`           | `{ prod: true, min: true }`
`webpack --env.prod --env min`           | `[{ prod: true }, "min"]`
`webpack --env.prod=foo --env.prod=bar`  | `{prod: [ "foo", "bar" ]}`

T> See the [environment variables](/guides/environment-variables) guide for more information on its usage.

### Config Options

Parameter                 | Explanation                                 | Input type | Default
------------------------- | ------------------------------------------- | ---------- | ------------------
`--config`                | Path to the config file                     | string     | webpack.config.js or webpackfile.js
`--config-register, -r`   | Preload one or more modules before loading the webpack configuration | array |
`--config-name`           | Name of the config to use                   | string     |
`--env`                   | Environment passed to the config, when it is a function  | |
`--mode`                  | Mode to use, either "development" or "production" | string |

### Output Options

This set of options allows you to manipulate certain [output](/configuration/output) parameters of your build.

Parameter                 | Explanation                                 | Input type | Default
------------------------- | ------------------------------------------- | ---------- | ------------------
`--output-chunk-filename` | The output filename for additional chunks   | string     | filename with [id] instead of [name] or [id] prefixed
`--output-filename`       | The output filename of the bundle           | string     | [name].js
`--output-jsonp-function` | The name of the JSONP function used for chunk loading | string | webpackJsonp
`--output-library`        | Expose the exports of the entry point as library | string |
`--output-library-target` | The type for exposing the exports of the entry point as library | string | var
`--output-path`           | The output path for compilation assets      | string     | Current directory
`--output-pathinfo`       | Include a comment with the request for every dependency | boolean | false
`--output-public-path`    | The public path for the assets              | string     | /
`--output-source-map-filename` | The output filename for the SourceMap  | string     | [name].map or [outputFilename].map
`--build-delimiter` | Display custom text after build output | string | Default string is null. You could provide a string such as `=== Build done ===`


#### Example Usage

```bash
webpack index=./src/index.js index2=./src/index2.js --output-path='./dist' --output-filename='[name][hash].bundle.js'

| Asset                                | Size    | Chunks      | Chunk Names   |
|--------------------------------------|---------|-------------|---------------|
| index2740fdca26e9348bedbec.bundle.js |  2.6 kB | 0 [emitted] | index2        |
| index740fdca26e9348bedbec.bundle.js  | 2.59 kB | 1 [emitted] | index         |
	[0] ./src/others.js 29 bytes {0} {1} [built]
	[1] ./src/index.js 51 bytes {1} [built]
	[2] ./src/index2.js 54 bytes {0} [built]
```

```bash
webpack.js index=./src/index.js index2=./src/index2.js --output-path='./dist' --output-filename='[name][hash].bundle.js' --devtool source-map --output-source-map-filename='[name]123.map'

| Asset                                | Size    | Chunks      | Chunk Names   |
|--------------------------------------|---------|-------------|---------------|
| index2740fdca26e9348bedbec.bundle.js | 2.76 kB | 0 [emitted] | index2        |
|  index740fdca26e9348bedbec.bundle.js | 2.74 kB | 1 [emitted] | index         |
|                        index2123.map | 2.95 kB | 0 [emitted] | index2        |
|                         index123.map | 2.95 kB | 1 [emitted] | index         |
	[0] ./src/others.js 29 bytes {0} {1} [built]
	[1] ./src/index.js 51 bytes {1} [built]
	[2] ./src/index2.js 54 bytes {0} [built]
```


### Debug Options

This set of options allows you to better debug the application containing assets compiled with webpack

Parameter    | Explanation                                      | Input type | Default value
------------ | ------------------------------------------------ | ---------- | -------------
`--debug`    | Switch loaders to debug mode                     | boolean    | false
`--devtool`  | Define [source map type](/configuration/devtool/) for the bundled resources | string | -
`--progress` | Print compilation progress in percentage         | boolean    | false
`--display-error-details` | Display details about errors | boolean | false

### Module Options

These options allow you to bind [modules](/configuration/module/) as allowed by webpack

Parameter            | Explanation                            | Usage
-------------------- | -------------------------------------- | ----------------
`--module-bind`      | Bind a file extension to a loader      | `--module-bind js=babel-loader`
`--module-bind-post` | Bind a file extension to a post loader |
`--module-bind-pre`  | Bind a file extension to a pre loader  |


### Watch Options

These options makes the build [watch](/configuration/watch/) for changes in files of the dependency graph and perform the build again.

Parameter                 | Explanation
------------------------- | ----------------------
`--watch`, `-w`           | Watch the filesystem for changes
`--watch-aggregate-timeout` | Timeout for gathering changes while watching
`--watch-poll`            | The polling interval for watching (also enable polling)
`--watch-stdin`, `--stdin` | Exit the process when stdin is closed


### Optimize Options

These options allow you to manipulate optimisations for a production build using webpack

Parameter                   | Explanation                                            | Plugin Used
--------------------------- | -------------------------------------------------------|----------------------
`--optimize-max-chunks`     | Try to keep the chunk count below a limit              | [LimitChunkCountPlugin](/plugins/limit-chunk-count-plugin)
`--optimize-min-chunk-size` | Try to keep the chunk size above a limit               | [MinChunkSizePlugin](/plugins/min-chunk-size-plugin)
`--optimize-minimize`       | Minimize javascript and switches loaders to minimizing | [TerserPlugin](/plugins/terser-webpack-plugin/) & [LoaderOptionsPlugin](/plugins/loader-options-plugin/)


### Resolve Options

These allow you to configure the webpack [resolver](/configuration/resolve/) with aliases and extensions.

Parameter              | Explanation                                             | Example
---------------------- | ------------------------------------------------------- | -------------
`--resolve-alias`        | Setup a module alias for resolving                      | --resolve-alias jquery-plugin=jquery.plugin
`--resolve-extensions`   | Setup extensions that should be used to resolve modules | --resolve-extensions .es6 .js .ts
`--resolve-loader-alias` | Minimize javascript and switches loaders to minimizing  |


### Stats Options

These options allow webpack to display various [stats](/configuration/stats/) and style them differently in the console output.

Parameter                        | Explanation                                                        | Type
-------------------------------- | ------------------------------------------------------------------ | -------
`--color`, `--colors`            | Force colors on the console [default: enabled for TTY output only] | boolean
`--no-color`, `--no-colors`      | Force no colors on the console                                     | boolean
`--display`                      | Select [display preset](/configuration/stats) (verbose, detailed, normal, minimal, errors-only, none; since webpack 3.0.0) | string
`--display-cached`               | Display also cached modules in the output                          | boolean
`--display-cached-assets`        | Display also cached assets in the output                           | boolean
`--display-chunks`               | Display chunks in the output                                       | boolean
`--display-depth`                | Display distance from entry point for each module                  | boolean
`--display-entrypoints`          | Display entry points in the output                                 | boolean
`--display-error-details`        | Display details about errors                                       | boolean
`--display-exclude`              | Exclude modules in the output                                      | boolean
`--display-max-modules`          | Sets the maximum number of visible modules in output               | number
`--display-modules`              | Display even excluded modules in the output                        | boolean
`--display-optimization-bailout` | Scope hoisting fallback trigger (since webpack 3.0.0)              | boolean
`--display-origins`              | Display origins of chunks in the output                            | boolean
`--display-provided-exports`     | Display information about exports provided from modules            | boolean
`--display-reasons`              | Display reasons about module inclusion in the output               | boolean
`--display-used-exports`         | Display information about used exports in modules (Tree Shaking)   | boolean
`--hide-modules`                 | Hides info about modules                                           | boolean
`--sort-assets-by`               | Sorts the assets list by property in asset                         | string
`--sort-chunks-by`               | Sorts the chunks list by property in chunk                         | string
`--sort-modules-by`              | Sorts the modules list by property in module                       | string
`--verbose`                      | Show more details                                                  | boolean


### Advanced Options

Parameter         | Explanation                              | Usage
----------------- | ---------------------------------------- | -----
`--bail`          | Abort the compilation on first error     |
`--cache`         | Enable in memory caching [Enabled by default for watch] | `--cache=false`
`--define`        | Define any free variable, see [shimming](/guides/shimming) | `--define process.env.NODE_ENV="'development'"`
`--hot`           | Enables [Hot Module Replacement](/concepts/hot-module-replacement) | `--hot=true`
`--labeled-modules` | Enables labeled modules [Uses LabeledModulesPlugin] |
`--plugin`        | Load this [plugin](/configuration/plugins/) |
`--prefetch`      | Prefetch the particular file             | `--prefetch=./files.js`
`--provide`       | Provide these modules as globals, see [shimming](/guides/shimming) | `--provide jQuery=jquery`
`--records-input-path` | Path to the records file (reading)  |
`--records-output-path` | Path to the records file (writing) |
`--records-path`  | Path to the records file                 |
`--target`        | The [targeted](/configuration/target/) execution environment | `--target='node'`

### Shortcuts

Shortcut | Replaces
---------|----------------------------
-d       | `--debug --devtool cheap-module-eval-source-map --output-pathinfo`
-p       | `--optimize-minimize --define process.env.NODE_ENV="production"`, see [building for production](/guides/production)

### Profiling

The `--profile` option captures timing information for each step of the compilation and includes this in the output.

```bash
webpack --profile

⋮
[0] ./src/index.js 90 bytes {0} [built]
    factory:22ms building:16ms = 38ms
```

For each module, the following details are included in the output as applicable:

- `factory`: time to collect module metadata (e.g. resolving the filename)
- `building`: time to build the module (e.g. loaders and parsing)
- `dependencies`: time to identify and connect the module’s dependencies

Paired with `--progress`, `--profile` gives you an in depth idea of which step in the compilation is taking how long. This can help you optimise your build in a more informed manner.

```bash
webpack --progress --profile

30ms building modules
1ms sealing
1ms optimizing
0ms basic module optimization
1ms module optimization
1ms advanced module optimization
0ms basic chunk optimization
0ms chunk optimization
1ms advanced chunk optimization
0ms module and chunk tree optimization
1ms module reviving
0ms module order optimization
1ms module id optimization
1ms chunk reviving
0ms chunk order optimization
1ms chunk id optimization
10ms hashing
0ms module assets processing
13ms chunk assets processing
1ms additional chunk assets processing
0ms recording
0ms additional asset processing
26ms chunk asset optimization
1ms asset optimization
6ms emitting
⋮
```


# Compilation Hooks

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

All modules have been built.

Parameters: `modules`


### `finishRebuildingModule`

`SyncHook`

A module has been rebuilt.

Parameters: `module`


### `seal`

`SyncHook`

Fired when the compilation stops accepting new modules.


### `unseal`

`SyncHook`

Fired when a compilation begins accepting new modules.


### `optimizeDependenciesBasic`

`SyncBailHook`

...

Parameters: `modules`


### `optimizeDependencies`

`SyncBailHook`

Fired at the beginning of dependency optimization.

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

Parameters: `modules`


### `moduleIds`

`SyncHook`

...

Parameters: `modules`


### `optimizeModuleIds`

`SyncHook`

...

Parameters: `chunks`


### `afterOptimizeModuleIds`

`SyncHook`

...

Parameters: `chunks`


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

Parameters: `chunks`


### `optimizeChunkIds`

`SyncHook`

Optimize the `id` of each chunk.

Parameters: `chunks`


### `afterOptimizeChunkIds`

`SyncHook`

Triggered after chunk `id` optimization has finished.

Parameters: `chunks`


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
  });
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

### `dependencyReference`

`SyncWaterfallHook`

`Compilation.hooks.dependencyReference(depRef, dependency, module)` allows to change the references reported by dependencies.

Parameters: `depRef` `dependency` `module`


# Module Methods

This section covers all methods available in code compiled with webpack. When using webpack to bundle your application, you can pick from a variety of module syntax styles including [ES6](https://en.wikipedia.org/wiki/ECMAScript#6th_Edition_-_ECMAScript_2015), [CommonJS](https://en.wikipedia.org/wiki/CommonJS), and [AMD](https://en.wikipedia.org/wiki/Asynchronous_module_definition).

W> While webpack supports multiple module syntaxes, we recommend following a single syntax for consistency and to avoid odd behaviors/bugs. Here's [one example](https://github.com/webpack/webpack.js.org/issues/552) of mixing ES6 and CommonJS, however there are surely others.


## ES6 (Recommended)

Version 2 of webpack supports ES6 module syntax natively, meaning you can use `import` and `export` without a tool like babel to handle this for you. Keep in mind that you will still probably need babel for other ES6+ features. The following methods are supported by webpack:


### `import`

Statically `import` the `export`s of another module.

``` javascript
import MyModule from './my-module.js';
import { NamedExport } from './other-module.js';
```

W> The keyword here is __statically__. Normal `import` statement cannot be used dynamically within other logic or contain variables. See the [spec](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) for more information and `import()` below for dynamic usage.


### `export`

Export anything as a `default` or named export.

``` javascript
// Named exports
export var Count = 5;
export function Multiply(a, b) {
  return a * b;
}

// Default export
export default {
  // Some data...
};
```


### `import()`

`import('path/to/module') -> Promise`

Dynamically load modules. Calls to `import()` are treated as split points, meaning the requested module and it's children are split out into a separate chunk.

T> The [ES2015 Loader spec](https://whatwg.github.io/loader/) defines `import()` as method to load ES2015 modules dynamically on runtime.

``` javascript
if ( module.hot ) {
  import('lodash').then(_ => {
    // Do something with lodash (a.k.a '_')...
  });
}
```

W> This feature relies on [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) internally. If you use `import()` with older browsers, remember to shim `Promise` using a polyfill such as [es6-promise](https://github.com/stefanpenner/es6-promise) or [promise-polyfill](https://github.com/taylorhakes/promise-polyfill).

The spec for `import` doesn't allow control over the chunk's name or other properties as "chunks" are only a concept within webpack. Luckily webpack allows some special parameters via comments so as to not break the spec:

``` js
// Single target
import(
  /* webpackChunkName: "my-chunk-name" */
  /* webpackMode: "lazy" */
  'module'
);

// Multiple possible targets
import(
  /* webpackInclude: /\.json$/ */
  /* webpackExclude: /\.noimport\.json$/ */
  /* webpackChunkName: "my-chunk-name" */
  /* webpackMode: "lazy" */
  `./locale/${language}`
);
```

```js
import(/* webpackIgnore: true */ 'ignored-module.js');
```

`webpackIgnore`: Disables dynamic import parsing when set to `true`.

W> Note that setting `webpackIgnore` to `true` opts out of code splitting.

`webpackChunkName`: A name for the new chunk. Since webpack 2.6.0, the placeholders `[index]` and `[request]` are supported within the given string to an incremented number or the actual resolved filename respectively.

`webpackMode`: Since webpack 2.6.0, different modes for resolving dynamic imports can be specified. The following options are supported:

- `"lazy"` (default): Generates a lazy-loadable chunk for each `import()`ed module.
- `"lazy-once"`: Generates a single lazy-loadable chunk that can satisfy all calls to `import()`. The chunk will be fetched on the first call to `import()`, and subsequent calls to `import()` will use the same network response. Note that this only makes sense in the case of a partially dynamic statement, e.g. ``import(`./locales/${language}.json`)``, where there are multiple module paths that could potentially be requested.
- `"eager"`: Generates no extra chunk. All modules are included in the current chunk and no additional network requests are made. A `Promise` is still returned but is already resolved. In contrast to a static import, the module isn't executed until the call to `import()` is made.
- `"weak"`: Tries to load the module if the module function has already been loaded in some other way (i. e. another chunk imported it or a script containing the module was loaded). A `Promise` is still returned but, only successfully resolves if the chunks are already on the client. If the module is not available, the `Promise` is rejected. A network request will never be performed. This is useful for universal rendering when required chunks are always manually served in initial requests (embedded within the page), but not in cases where app navigation will trigger an import not initially served.

T> Note that all options can be combined like so `/* webpackMode: "lazy-once", webpackChunkName: "all-i18n-data" */`. This is wrapped in a JavaScript object and executed using [node VM](https://nodejs.org/dist/latest-v8.x/docs/api/vm.html). You do not need to add curly brackets.

`webpackInclude`: A regular expression that will be matched against during import resolution. Only modules that match __will be bundled__.

`webpackExclude`: A regular expression that will be matched against during import resolution. Any module that matches __will not be bundled__.

T> Note that `webpackInclude` and `webpackExclude` options do not interfere with the prefix. eg: `./locale`.

W> Fully dynamic statements, such as `import(foo)`, __will fail__ because webpack requires at least some file location information. This is because `foo` could potentially be any path to any file in your system or project. The `import()` must contain at least some information about where the module is located, so bundling can be limited to a specific directory or set of files.

W> Every module that could potentially be requested on an `import()` call is included. For example, ``import(`./locale/${language}.json`)`` will cause every `.json` file in the `./locale` directory to be bundled into the new chunk. At run time, when the variable `language` has been computed, any file like `english.json` or `german.json` will be available for consumption. Using the `webpackInclude` and `webpackExclude` options allows us to add regex patterns that reduce the files that webpack will bundle for this import.

W> The use of `System.import` in webpack [did not fit the proposed spec](https://github.com/webpack/webpack/issues/2163), so it was deprecated in webpack [2.1.0-beta.28](https://github.com/webpack/webpack/releases/tag/v2.1.0-beta.28) in favor of `import()`.


## CommonJS

The goal of CommonJS is to specify an ecosystem for JavaScript outside the browser. The following CommonJS methods are supported by webpack:


### `require`

``` javascript
require(dependency: String);
```

Synchronously retrieve the exports from another module. The compiler will ensure that the dependency is available in the output bundle.

``` javascript
var $ = require('jquery');
var myModule = require('my-module');
```

W> Using it asynchronously may not have the expected effect.


### `require.resolve`

``` javascript
require.resolve(dependency: String);
```

Synchronously retrieve a module's ID. The compiler will ensure that the dependency is available in the output bundle. See [`module.id`](/api/module-variables#module-id-commonjs-) for more information.

W> Module ID is a number in webpack (in contrast to NodeJS where it is a string -- the filename).


### `require.cache`

Multiple requires to the same module result in only one module execution and only one export. Therefore a cache in the runtime exists. Removing values from this cache cause new module execution and a new export.

W> This is only needed in rare cases for compatibility!

``` javascript
var d1 = require('dependency');
require('dependency') === d1;
delete require.cache[require.resolve('dependency')];
require('dependency') !== d1;
```

``` javascript
// in file.js
require.cache[module.id] === module;
require('./file.js') === module.exports;
delete require.cache[module.id];
require.cache[module.id] === undefined;
require('./file.js') !== module.exports; // in theory; in praxis this causes a stack overflow
require.cache[module.id] !== module;
```


### `require.ensure`

W> `require.ensure()` is specific to webpack and superseded by `import()`.

<!-- eslint-skip -->

```js
require.ensure(
  dependencies: String[],
  callback: function(require),
  errorCallback: function(error),
  chunkName: String
)
```

Split out the given `dependencies` to a separate bundle that that will be loaded asynchronously. When using CommonJS module syntax, this is the only way to dynamically load dependencies. Meaning, this code can be run within execution, only loading the `dependencies` if certain conditions are met.

W> This feature relies on [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) internally. If you use `require.ensure` with older browsers, remember to shim `Promise` using a polyfill such as [es6-promise](https://github.com/stefanpenner/es6-promise) or [promise-polyfill](https://github.com/taylorhakes/promise-polyfill).

``` javascript
var a = require('normal-dep');

if ( module.hot ) {
  require.ensure(['b'], function(require) {
    var c = require('c');

    // Do something special...
  });
}
```

The following parameters are supported in the order specified above:

- `dependencies`: An array of strings declaring all modules required for the code in the `callback` to execute.
- `callback`: A function that webpack will execute once the dependencies are loaded. An implementation of the `require` function is sent as a parameter to this function. The function body can use this to further `require()` modules it needs for execution.
- `errorCallback`: A function that is executed when webpack fails to load the dependencies.
- `chunkName`: A name given to the chunk created by this particular `require.ensure()`. By passing the same `chunkName` to various `require.ensure()` calls, we can combine their code into a single chunk, resulting in only one bundle that the browser must load.

W> Although the implementation of `require` is passed as an argument to the `callback` function, using an arbitrary name e.g. `require.ensure([], function(request) { request('someModule'); })` isn't handled by webpack's static parser. Use `require` instead, e.g. `require.ensure([], function(require) { require('someModule'); })`.



## AMD

Asynchronous Module Definition (AMD) is a JavaScript specification that defines an interface for writing and loading modules. The following AMD methods are supported by webpack:


### `define` (with factory)

<!-- eslint-skip -->

```js
define([name: String], [dependencies: String[]], factoryMethod: function(...))
```

If `dependencies` are provided, `factoryMethod` will be called with the exports of each dependency (in the same order). If `dependencies` are not provided, `factoryMethod` is called with `require`, `exports` and `module` (for compatibility!). If this function returns a value, this value is exported by the module. The compiler ensures that each dependency is available.

W> Note that webpack ignores the `name` argument.

``` javascript
define(['jquery', 'my-module'], function($, myModule) {
  // Do something with $ and myModule...

  // Export a function
  return function doSomething() {
    // ...
  };
});
```

W> This CANNOT be used in an asynchronous function.


### `define` (with value)

<!-- eslint-skip -->

```js
define(value: !Function)
```

This will simply export the provided `value`. The `value` here can be anything except a function.

``` javascript
define({
  answer: 42
});
```

W> This CANNOT be used in an async function.


### `require` (amd-version)

<!-- eslint-skip -->

```js
require(dependencies: String[], [callback: function(...)])
```

Similar to `require.ensure`, this will split the given `dependencies` into a separate bundle that will be loaded asynchronously. The `callback` will be called with the exports of each dependency in the `dependencies` array.

W> This feature relies on [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) internally. If you use AMD with older browsers (e.g. Internet Explorer 11), remember to shim `Promise` using a polyfill such as [es6-promise](https://github.com/stefanpenner/es6-promise) or [promise-polyfill](https://github.com/taylorhakes/promise-polyfill).

``` javascript
require(['b'], function(b) {
  var c = require('c');
});
```

W> There is no option to provide a chunk name.



## Labeled Modules

The internal `LabeledModulesPlugin` enables you to use the following methods for exporting and requiring within your modules:


### `export` label

Export the given `value`. The label can occur before a function declaration or a variable declaration. The function name or variable name is the identifier under which the value is exported.

<!-- eslint-skip -->

```js
export: var answer = 42;
export: function method(value) {
  // Do something...
};
```

W> Using it in an async function may not have the expected effect.


### `require` label

Make all exports from the dependency available in the current scope. The `require` label can occur before a string. The dependency must export values with the `export` label. CommonJS or AMD modules cannot be consumed.

__some-dependency.js__

<!-- eslint-skip -->

```js
export: var answer = 42;
export: function method(value) {
  // Do something...
};
```

<!-- eslint-skip -->

```js
require: 'some-dependency';
console.log(answer);
method(...);
```



## Webpack

Aside from the module syntaxes described above, webpack also allows a few custom, webpack-specific methods:


### `require.context`

<!-- eslint-skip -->

```js
require.context(
  directory: String,
  includeSubdirs: Boolean /* optional, default true */,
  filter: RegExp /* optional, default /^\.\/.*$/, any file */,
  mode: String  /* optional, 'sync' | 'eager' | 'weak' | 'lazy' | 'lazy-once', default 'sync' */
)
```

Specify a whole group of dependencies using a path to the `directory`, an option to `includeSubdirs`, a `filter` for more fine grained control of the modules included, and a `mode` to define the way how loading will work. Underlying modules can then be easily resolved later on:

```javascript
var context = require.context('components', true, /\.html$/);
var componentA = context.resolve('componentA');
```

If `mode` is specified as "lazy", the underlying modules will be loaded asynchronously:

```javascript
var context = require.context('locales', true, /\.json$/, 'lazy');
context('localeA').then(locale => {
  // do something with locale
});
```

The full list of available modes and its behavior is described in [`import()`](#import-) documentation.

### `require.include`

<!-- eslint-skip -->

```js
require.include(dependency: String)
```

Include a `dependency` without executing it. This can be used for optimizing the position of a module in the output chunks.

``` javascript
require.include('a');
require.ensure(['a', 'b'], function(require) { /* ... */ });
require.ensure(['a', 'c'], function(require) { /* ... */ });
```

This will result in following output:

- entry chunk: `file.js` and `a`
- anonymous chunk: `b`
- anonymous chunk: `c`

Without `require.include('a')` it would be duplicated in both anonymous chunks.


### `require.resolveWeak`

Similar to `require.resolve`, but this won't pull the `module` into the bundle. It's what is considered a "weak" dependency.

``` javascript
if(__webpack_modules__[require.resolveWeak('module')]) {
  // Do something when module is available...
}
if(require.cache[require.resolveWeak('module')]) {
  // Do something when module was loaded before...
}

// You can perform dynamic resolves ("context")
// just as with other require/import methods.
const page = 'Foo';
__webpack_modules__[require.resolveWeak(`./page/${page}`)];
```

T> `require.resolveWeak` is the foundation of _universal rendering_ (SSR + Code Splitting), as used in packages such as [react-universal-component](https://github.com/faceyspacey/react-universal-component). It allows code to render synchronously on both the server and initial page-loads on the client. It requires that chunks are manually served or somehow available. It's able to require modules without indicating they should be bundled into a chunk. It's used in conjunction with `import()` which takes over when user navigation triggers additional imports.


# Node.js API

webpack provides a Node.js API which can be used directly in Node.js runtime.

The Node.js API is useful in scenarios in which you need to customize the build or development process since all the reporting and error handling must be done manually and webpack only does the compiling part. For this reason the [`stats`](/configuration/stats) configuration options will not have any effect in the `webpack()` call.


## Installation

To start using webpack Node.js API, first install webpack if you haven’t yet:

``` bash
npm install --save-dev webpack
```

Then require the webpack module in your Node.js script:

``` js
const webpack = require('webpack');
```

Or if you prefer ES2015:

``` js
import webpack from 'webpack';
```


## `webpack()`

The imported `webpack` function is fed a webpack [Configuration Object](/configuration/) and runs the webpack compiler if a callback function is provided:

``` js-with-links
const webpack = require("webpack");

webpack({
  // [Configuration Object](/configuration/)
}, (err, [stats](#stats-object)) => {
  if (err || stats.hasErrors()) {
    // [Handle errors here](#error-handling)
  }
  // Done processing
});
```

T> The `err` object __will not__ include compilation errors and those must be handled separately using `stats.hasErrors()` which will be covered in detail in [Error Handling](#error-handling) section of this guide. The `err` object will only contain webpack-related issues, such as misconfiguration, etc.

T> You can provide the `webpack` function with an array of configurations. See
the [MultiCompiler](#multicompiler) section below for more information.


## Compiler Instance

If you don’t pass the `webpack` runner function a callback, it will return a
webpack `Compiler` instance. This instance can be used to manually trigger the
webpack runner or have it build and watch for changes, much like the
[CLI](/api/cli/). The `Compiler` instance provides the following methods:

- `.run(callback)`
- `.watch(watchOptions, handler)`

Typically, only one master `Compiler` instance is created, although child
compilers can be created in order to delegate specific tasks. The `Compiler` is
ultimately just a function which performs bare minimum functionality to keep a
lifecycle running. It delegates all the loading, bundling, and writing work to
registered plugins.

The `hooks` property on a `Compiler` instance is used to register a plugin to
any hook event in the `Compiler`'s lifecycle. The
[`WebpackOptionsDefaulter`](https://github.com/webpack/webpack/blob/master/lib/WebpackOptionsDefaulter.js)
and [`WebpackOptionsApply`](https://github.com/webpack/webpack/blob/master/lib/WebpackOptionsApply.js)
utilities are used by webpack to configure its `Compiler` instance with all the
built-in plugins.

The `run` method is then used to kickstart all compilation work. Upon
completion, the given `callback` function is executed. The final logging of
stats and errors should be done in this `callback` function.

W> The API only supports a single concurrent compilation at a time. When using
`run`, wait for it to finish before calling `run` or `watch` again. When using
`watch`, call `close` and wait for it to finish before calling `run` or `watch`
again. Concurrent compilations will corrupt the output files.


## Run

Calling the `run` method on the `Compiler` instance is much like the quick run
method mentioned above:

``` js-with-links
const webpack = require("webpack");

const compiler = webpack({
  // [Configuration Object](/configuration/)
});

compiler.run((err, [stats](#stats-object)) => {
  // ...
});
```


## Watching

Calling the `watch` method, triggers the webpack runner, but then watches for
changes (much like CLI: `webpack --watch`), as soon as webpack detects a
change, runs again. Returns an instance of `Watching`.

``` js
watch(watchOptions, callback);
```

``` js-with-links
const webpack = require("webpack");

const compiler = webpack({
  // [Configuration Object](/configuration/)
});

const watching = compiler.watch({
  // Example [watchOptions](/configuration/watch/#watchoptions)
  aggregateTimeout: 300,
  poll: undefined
}, (err, [stats](#stats-object)) => {
  // Print watch/build result here...
  console.log(stats);
});
```

`Watching` options are covered in detail
[here](/configuration/watch/#watchoptions).

W> Filesystem inaccuracies may trigger multiple builds for a single change. So,
in the example above, the `console.log` statement may fire multiple times for a
single modification. Users should expect this behavior and may check
`stats.hash` to see if the file hash has actually changed.


### Close `Watching`

The `watch` method returns a `Watching` instance that exposes
`.close(callback)` method. Calling this method will end watching:

``` js
watching.close(() => {
  console.log('Watching Ended.');
});
```

W> It’s not allowed to watch or run again before the existing watcher has been
closed or invalidated.


### Invalidate `Watching`

Using `watching.invalidate`, you can manually invalidate the current compiling
round, without stopping the watch process:

``` js
watching.invalidate();
```


## Stats Object

The `stats` object that is passed as a second argument of the
[`webpack()`](#webpack-) callback, is a good source of information about the
code compilation process. It includes:

- Errors and Warnings (if any)
- Timings
- Module and Chunk information

The [webpack CLI](/api/cli) uses this information to display nicely formatted
output in your console.

T> When using the [`MultiCompiler`](/api/plugins/compiler#multicompiler), a
`MultiStats` instance is returned that fulfills the same interface as `stats`,
i.e. the methods described below.

This `stats` object exposes the following methods:


### `stats.hasErrors()`

Can be used to check if there were errors while compiling. Returns `true` or
`false`.


### `stats.hasWarnings()`

Can be used to check if there were warnings while compiling. Returns `true` or
`false`.


### `stats.toJson(options)`

Returns compilation information as a JSON object. `options` can be either a
string (a preset) or an object for more granular control:

``` js-with-links
stats.toJson("minimal"); // [more options: "verbose", etc](/configuration/stats).
```

``` js
stats.toJson({
  assets: false,
  hash: true
});
```

All available options and presets are described in the stats [documentation](/configuration/stats).

> Here’s an [example]
(https://github.com/webpack/analyse/blob/master/app/pages/upload/example.json)
of this function’s output.


### `stats.toString(options)`

Returns a formatted string of the compilation information (similar to
[CLI](/api/cli) output).

Options are the same as [`stats.toJson(options)`](/api/node#stats-tojson-options-) with one addition:

``` js
stats.toString({
  // Add console colors
  colors: true
});
```

Here’s an example of `stats.toString()` usage:

``` js-with-links
const webpack = require("webpack");

webpack({
  // [Configuration Object](/configuration/)
}, (err, stats) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(stats.toString({
    chunks: false,  // Makes the build much quieter
    colors: true    // Shows colors in the console
  }));
});
```


## MultiCompiler

The `MultiCompiler` module allows webpack to run multiple configurations in
separate compilers. If the `options` parameter in the webpack's NodeJS api is
an array of options, webpack applies separate compilers and calls the
`callback` method at the end of each compiler execution.

``` js-with-links
var webpack = require('webpack');

webpack([
  { entry: './index1.js', output: { filename: 'bundle1.js' } },
  { entry: './index2.js', output: { filename: 'bundle2.js' } }
], (err, [stats](#stats-object)) => {
  process.stdout.write(stats.toString() + "\n");
})
```

W> Multiple configurations will __not be run in parallel__. Each
configuration is only processed after the previous one has finished
processing. To process them in parallel, you can use a third-party solution
like [parallel-webpack](https://www.npmjs.com/package/parallel-webpack).


## Error Handling

For a good error handling, you need to account for these three types of errors:

- Fatal webpack errors (wrong configuration, etc)
- Compilation errors (missing modules, syntax errors, etc)
- Compilation warnings

Here’s an example that does all that:

``` js-with-links
const webpack = require("webpack");

webpack({
  // [Configuration Object](/configuration/)
}, (err, stats) => {
  if (err) {
    console.error(err.stack || err);
    if (err.details) {
      console.error(err.details);
    }
    return;
  }

  const info = stats.toJson();

  if (stats.hasErrors()) {
    console.error(info.errors);
  }

  if (stats.hasWarnings()) {
    console.warn(info.warnings);
  }

  // Log result...
});
```


## Custom File Systems

By default, webpack reads files and writes files to disk using a normal file
system. However, it is possible to change the input or output behavior using a
different kind of file system (memory, webDAV, etc). To accomplish this, one
can change the `inputFileSystem` or `outputFileSystem`. For example, you can
replace the default `outputFileSystem` with
[`memory-fs`](https://github.com/webpack/memory-fs) to write files to memory
instead of to disk:

``` js
const MemoryFS = require('memory-fs');
const webpack = require('webpack');

const fs = new MemoryFS();
const compiler = webpack({ /* options*/ });

compiler.outputFileSystem = fs;
compiler.run((err, stats) => {
  // Read the output later:
  const content = fs.readFileSync('...');
});
```

Note that this is what
[webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware),
used by [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
and many other packages, uses to mysteriously hide your files but continue
serving them up to the browser!

T> The output file system you provide needs to be compatible with Node’s own
[`fs`](https://nodejs.org/api/fs.html) interface, which requires the `mkdirp`
and `join` helper methods.


# Resolvers

Resolvers are created using the `enhanced-resolve` package. The `Resolver`
class extends the `tapable` class and uses `tapable` to provide a few hooks.
The `enhanced-resolve` package can be used directly to create new resolvers,
however any [`compiler` instance](/api/node/#compiler-instance) has a few resolver instances that can be
tapped into.

Before reading on, make sure you at least skim through the
[`enhanced-resolve`](https://github.com/webpack/enhanced-resolve) and [`tapable`](/api/plugins/#tapable) documentation.


## Types

There are three types of built-in resolvers available on the `compiler` class:

- Normal: Resolves a module via an absolute or relative path.
- Context: Resolves a module within a given context.
- Loader: Resolves a webpack [loader](/loaders).

Depending on need, any one of these built-in resolver used by the `compiler`
can be customized via plugins as such:

``` js
compiler.resolverFactory.plugin('resolver [type]', resolver => {
  resolver.hooks.resolve.tapAsync('MyPlugin', params => {
    // ...
  });
});
```

Where `[type]` is one of the three resolvers mention above, specified as:

- `normal`
- `context`
- `loader`


See the `enhanced-resolve` [documentation](https://github.com/webpack/enhanced-resolve) for a full list of hooks and
descriptions.


## Configuration Options

The resolvers mentioned above can also be customized via a configuration file
with the [`resolve`](/configuration/resolve/) or [`resolveLoader`](/configuration/resolve/#resolveloader) options. These options allow
users to change the resolving behavior through a variety of options including
through resolve `plugins`.

The resolver plugins, e.g. [`DirectoryNamedPlugin`](https://github.com/shaketbaby/directory-named-webpack-plugin), can be included
directly in `resolve.plugins` rather than using standard plugins. Note that the
`resolve` configuration affects the `normal` and `context` resolvers while
`resolveLoader` is used to modify the `loader` resolver.


# Stats Data

When compiling source code with webpack, users can generate a JSON file containing statistics about modules. These statistics can be used to analyze an application's dependency graph as well as to optimize compilation speed. The file is typically generated with the following CLI command:

``` bash
webpack --profile --json > compilation-stats.json
```

The `--json > compilation-stats.json` flag indicates to webpack that it should emit the `compilation-stats.json` containing the dependency graph and various other build information. Typically, the `--profile` flag is also added so that a `profile` section is added to each [`modules` object](#module-objects) containing module-specific compilation stats.


## Structure

The top-level structure of the output JSON file is fairly straightforward but there are a few nested data structures as well. Each nested structure has a dedicated section below to make this document more consumable. Note that you can click links within the top-level structure below to jump to relevant sections and documentation:

```js-with-links
{
  "version": "1.4.13", // Version of webpack used for the compilation
  "hash": "11593e3b3ac85436984a", // Compilation specific hash
  "time": 2469, // Compilation time in milliseconds
  "filteredModules": 0, // A count of excluded modules when [`exclude`](/configuration/stats/#stats) is passed to the [`toJson`](/api/node/#stats-tojson-options-) method
  "outputPath": "/", // path to webpack output directory
  "assetsByChunkName": {
    // Chunk name to emitted asset(s) mapping
    "main": "web.js?h=11593e3b3ac85436984a",
    "named-chunk": "named-chunk.web.js",
    "other-chunk": [
      "other-chunk.js",
      "other-chunk.css"
    ]
  },
  "assets": [
    // A list of [asset objects](#asset-objects)
  ],
  "chunks": [
    // A list of [chunk objects](#chunk-objects)
  ],
  "modules": [
    // A list of [module objects](#module-objects)
  ],
  "errors": [
    // A list of [error strings](#errors-and-warnings)
  ],
  "warnings": [
    // A list of [warning strings](#errors-and-warnings)
  ]
}
```


### Asset Objects

Each `assets` object represents an `output` file emitted from the compilation. They all follow a similar structure:

<!-- eslint-skip -->

```js
{
  "chunkNames": [], // The chunks this asset contains
  "chunks": [ 10, 6 ], // The chunk IDs this asset contains
  "emitted": true, // Indicates whether or not the asset made it to the `output` directory
  "name": "10.web.js", // The `output` filename
  "size": 1058 // The size of the file in bytes
}
```


### Chunk Objects

Each `chunks` object represents a group of modules known as a [chunk](/glossary#c). Each object follows the following structure:

```js-with-links
{
  "entry": true, // Indicates whether or not the chunk contains the webpack runtime
  "files": [
    // An array of filename strings that contain this chunk
  ],
  "filteredModules": 0, // See the description in the [top-level structure](#structure) above
  "id": 0, // The ID of this chunk
  "initial": true, // Indicates whether this chunk is loaded on initial page load or [on demand](/guides/lazy-loading)
  "modules": [
    // A list of [module objects](#module-objects)
    "web.js?h=11593e3b3ac85436984a"
  ],
  "names": [
    // An list of chunk names contained within this chunk
  ],
  "origins": [
    // See the description below...
  ],
  "parents": [], // Parent chunk IDs
  "rendered": true, // Indicates whether or not the chunk went through Code Generation
  "size": 188057 // Chunk size in bytes
}
```

The `chunks` object will also contain a list of `origins` describing how the given chunk originated. Each `origins` object follows the following schema:

```js-with-links
{
  "loc": "", // Lines of code that generated this chunk
  "module": "(webpack)\\test\\browsertest\\lib\\index.web.js", // Path to the module
  "moduleId": 0, // The ID of the module
  "moduleIdentifier": "(webpack)\\test\\browsertest\\lib\\index.web.js", // Path to the module
  "moduleName": "./lib/index.web.js", // Relative path to the module
  "name": "main", // The name of the chunk
  "reasons": [
    // A list of the same `reasons` found in [module objects](#module-objects)
  ]
}
```


### Module Objects

What good would these statistics be without some description of the compiled application's actual modules? Each module in the dependency graph is represented by the following structure:

```js-with-links
{
  "assets": [
    // A list of [asset objects](#asset-objects)
  ],
  "built": true, // Indicates that the module went through [Loaders](/concepts/loaders), Parsing, and Code Generation
  "cacheable": true, // Whether or not this module is cacheable
  "chunks": [
    // IDs of chunks that contain this module
  ],
  "errors": 0, // Number of errors when resolving or processing the module
  "failed": false, // Whether or not compilation failed on this module
  "id": 0, // The ID of the module (analagous to [`module.id`](/api/module-variables#module-id-commonjs-))
  "identifier": "(webpack)\\test\\browsertest\\lib\\index.web.js", // A unique ID used internally
  "name": "./lib/index.web.js", // Path to the actual file
  "optional": false, // All requests to this module are with `try... catch` blocks (irrelevant with ESM)
  "prefetched": false, // Indicates whether or not the module was [prefetched](/plugins/prefetch-plugin)
  "profile": {
    // Module specific compilation stats corresponding to the [`--profile` flag](/api/cli#profiling) (in milliseconds)
    "building": 73, // Loading and parsing
    "dependencies": 242, // Building dependencies
    "factory": 11 // Resolving dependencies
  },
  "reasons": [
    // See the description below...
  ],
  "size": 3593, // Estimated size of the module in bytes
  "source": "// Should not break it...\r\nif(typeof...", // The stringified raw source
  "warnings": 0 // Number of warnings when resolving or processing the module
}
```

Every module also contains a list of `reasons` objects describing why that module was included in the dependency graph. Each "reason" is similar to the `origins` seen above in the [chunk objects](#chunk-objects) section:

```js-with-links
{
  "loc": "33:24-93", // Lines of code that caused the module to be included
  "module": "./lib/index.web.js", // Relative path to the module based on [context](/configuration/entry-context/#context)
  "moduleId": 0, // The ID of the module
  "moduleIdentifier": "(webpack)\\test\\browsertest\\lib\\index.web.js", // Path to the module
  "moduleName": "./lib/index.web.js", // A more readable name for the module (used for "pretty-printing")
  "type": "require.context", // The [type of request](/api/module-methods) used
  "userRequest": "../../cases" // Raw string used for the `import` or `require` request
}
```


### Errors and Warnings

The `errors` and `warnings` properties each contain a list of strings. Each string contains a message and stack trace:

``` bash
../cases/parsing/browserify/index.js
Critical dependencies:
2:114-121 This seem to be a pre-built javascript file. Even while this is possible, it's not recommended. Try to require to original source to get better results.
 @ ../cases/parsing/browserify/index.js 2:114-121
```

W> Note that the stack traces are removed when `errorDetails: false` is passed to the `toJson` method. The `errorDetails` option is set to `true` by default.


# Loader API

A loader is just a JavaScript module that exports a function. The [loader runner](https://github.com/webpack/loader-runner) calls this function and passes the result of the previous loader or the resource file into it. The `this` context of the function is filled-in by webpack and the [loader runner](https://github.com/webpack/loader-runner) with some useful methods that allow the loader (among other things) to change its invocation style to async, or get query parameters.

The first loader is passed one argument: the content of the resource file. The compiler expects a result from the last loader. The result should be a `String` or a `Buffer` (which is converted to a string), representing the JavaScript source code of the module. An optional SourceMap result (as JSON object) may also be passed.

A single result can be returned in __sync mode__. For multiple results the `this.callback()` must be called. In __async mode__ `this.async()` must be called to indicate that the [loader runner](https://github.com/webpack/loader-runner) should wait for an asynchronous result. It returns `this.callback()`. Then the loader must return `undefined` and call that callback.


## Examples

The following sections provide some basic examples of the different types of loaders. Note that the `map` and `meta` parameters are optional, see [`this.callback`](/api/loaders#this-callback) below.

### Synchronous Loaders

Either `return` or `this.callback` can be used to return the transformed `content` synchronously:

__sync-loader.js__

``` js
module.exports = function(content, map, meta) {
  return someSyncOperation(content);
};
```

The `this.callback` method is more flexible as it allows multiple arguments to be passed as opposed to just the `content`.

__sync-loader-with-multiple-results.js__

``` js
module.exports = function(content, map, meta) {
  this.callback(null, someSyncOperation(content), map, meta);
  return; // always return undefined when calling callback()
};
```

### Asynchronous Loaders

For asynchronous loaders, [`this.async`](/api/loaders#this-async) is used to retrieve the `callback` function:

__async-loader.js__

``` js
module.exports = function(content, map, meta) {
  var callback = this.async();
  someAsyncOperation(content, function(err, result) {
    if (err) return callback(err);
    callback(null, result, map, meta);
  });
};
```

__async-loader-with-multiple-results.js__

``` js
module.exports = function(content, map, meta) {
  var callback = this.async();
  someAsyncOperation(content, function(err, result, sourceMaps, meta) {
    if (err) return callback(err);
    callback(null, result, sourceMaps, meta);
  });
};
```

T> Loaders were originally designed to work in synchronous loader pipelines, like Node.js (using [enhanced-require](https://github.com/webpack/enhanced-require)), _and_ asynchronous pipelines, like in webpack. However, since expensive synchronous computations are a bad idea in a single-threaded environment like Node.js, we advise to make your loader asynchronously if possible. Synchronous loaders are ok if the amount of computation is trivial.


### "Raw" Loader

By default, the resource file is converted to a UTF-8 string and passed to the loader. By setting the `raw` flag, the loader will receive the raw `Buffer`. Every loader is allowed to deliver its result as `String` or as `Buffer`. The compiler converts them between loaders.

__raw-loader.js__

``` js
module.exports = function(content) {
  assert(content instanceof Buffer);
  return someSyncOperation(content);
  // return value can be a `Buffer` too
  // This is also allowed if loader is not "raw"
};
module.exports.raw = true;
```


### Pitching Loader

Loaders are __always__ called from right to left. There are some instances where the loader only cares about the __metadata__ behind a request and can ignore the results of the previous loader. The `pitch` method on loaders is called from __left to right__ before the loaders are actually executed (from right to left). For the following [`use`](/configuration/module#rule-use) configuration:

``` js
module.exports = {
  //...
  module: {
    rules: [
      {
        //...
        use: [
          'a-loader',
          'b-loader',
          'c-loader'
        ]
      }
    ]
  }
};
```

These steps would occur:

``` diff
|- a-loader `pitch`
  |- b-loader `pitch`
    |- c-loader `pitch`
      |- requested module is picked up as a dependency
    |- c-loader normal execution
  |- b-loader normal execution
|- a-loader normal execution
```

So why might a loader take advantage of the "pitching" phase?

First, the `data` passed to the `pitch` method is exposed in the execution phase as well under `this.data` and could be useful for capturing and sharing information from earlier in the cycle.

``` js
module.exports = function(content) {
  return someSyncOperation(content, this.data.value);
};

module.exports.pitch = function(remainingRequest, precedingRequest, data) {
  data.value = 42;
};
```

Second, if a loader delivers a result in the `pitch` method the process turns around and skips the remaining loaders. In our example above, if the `b-loader`s `pitch` method returned something:

``` js
module.exports = function(content) {
  return someSyncOperation(content);
};

module.exports.pitch = function(remainingRequest, precedingRequest, data) {
  if (someCondition()) {
    return 'module.exports = require(' + JSON.stringify('-!' + remainingRequest) + ');';
  }
};
```

The steps above would be shortened to:

``` diff
|- a-loader `pitch`
  |- b-loader `pitch` returns a module
|- a-loader normal execution
```

See the [bundle-loader](https://github.com/webpack-contrib/bundle-loader) for a good example of how this process can be used in a more meaningful way.


## The Loader Context

The loader context represents the properties that are available inside of a loader assigned to the `this` property.

Given the following example this require call is used:
In `/abc/file.js`:

``` js
require('./loader1?xyz!loader2!./resource?rrr');
```


### `this.version`

__Loader API version.__ Currently `2`. This is useful for providing backwards compatibility. Using the version you can specify custom logic or fallbacks for breaking changes.


### `this.context`

__The directory of the module.__ Can be used as context for resolving other stuff.

In the example: `/abc` because `resource.js` is in this directory


### `this.rootContext`

Starting with webpack 4, the formerly `this.options.context` is provided as `this.rootContext`.


### `this.request`

The resolved request string.

In the example: `"/abc/loader1.js?xyz!/abc/node_modules/loader2/index.js!/abc/resource.js?rrr"`


### `this.query`

1. If the loader was configured with an [`options`](/configuration/module/#useentry) object, this will point to that object.
2. If the loader has no `options`, but was invoked with a query string, this will be a string starting with `?`.

T> Use the [`getOptions` method](https://github.com/webpack/loader-utils#getoptions) from `loader-utils` to extract given loader options.


### `this.callback`

A function that can be called synchronously or asynchronously in order to return multiple results. The expected arguments are:

<!-- eslint-skip -->

```js
this.callback(
  err: Error | null,
  content: string | Buffer,
  sourceMap?: SourceMap,
  meta?: any
);
```

1. The first argument must be an `Error` or `null`
2. The second argument a `string` or a [`Buffer`](https://nodejs.org/api/buffer.html).
3. Optional: The third argument must be a source map that is parsable by [this module](https://github.com/mozilla/source-map).
4. Optional: The fourth option, ignored by webpack, can be anything (e.g. some meta data).

T> It can be useful to pass an abstract syntax tree (AST), like [`ESTree`](https://github.com/estree/estree), as the fourth argument (`meta`) to speed up the build time if you want to share common ASTs between loaders.

In case this function is called, you should return undefined to avoid ambiguous loader results.


### `this.async`

Tells the [loader-runner](https://github.com/webpack/loader-runner) that the loader intends to call back asynchronously. Returns `this.callback`.


### `this.data`

A data object shared between the pitch and the normal phase.


### `this.cacheable`

A function that sets the cacheable flag:

``` typescript
cacheable(flag = true: boolean)
```

By default, loader results are flagged as cacheable. Call this method passing `false` to make the loader's result not cacheable.

A cacheable loader must have a deterministic result, when inputs and dependencies haven't changed. This means the loader shouldn't have other dependencies than specified with `this.addDependency`.


### `this.loaders`

An array of all the loaders. It is writeable in the pitch phase.

<!-- eslint-skip -->

```js
loaders = [{request: string, path: string, query: string, module: function}]
```

In the example:

``` js
[
  {
    request: '/abc/loader1.js?xyz',
    path: '/abc/loader1.js',
    query: '?xyz',
    module: [Function]
  },
  {
    request: '/abc/node_modules/loader2/index.js',
    path: '/abc/node_modules/loader2/index.js',
    query: '',
    module: [Function]
  }
];
```


### `this.loaderIndex`

The index in the loaders array of the current loader.

In the example: in loader1: `0`, in loader2: `1`


### `this.resource`

The resource part of the request, including query.

In the example: `"/abc/resource.js?rrr"`


### `this.resourcePath`

The resource file.

In the example: `"/abc/resource.js"`


### `this.resourceQuery`

The query of the resource.

In the example: `"?rrr"`


### `this.target`

Target of compilation. Passed from configuration options.

Example values: `"web"`, `"node"`


### `this.webpack`

This boolean is set to true when this is compiled by webpack.

T> Loaders were originally designed to also work as Babel transforms. Therefore if you write a loader that works for both, you can use this property to know if there is access to additional loaderContext and webpack features.


### `this.sourceMap`

Should a source map be generated. Since generating source maps can be an expensive task, you should check if source maps are actually requested.


### `this.emitWarning`

``` typescript
emitWarning(warning: Error)
```

Emit a warning.


### `this.emitError`

``` typescript
emitError(error: Error)
```

Emit an error.


### `this.loadModule`

``` typescript
loadModule(request: string, callback: function(err, source, sourceMap, module))
```

Resolves the given request to a module, applies all configured loaders and calls back with the generated source, the sourceMap and the module instance (usually an instance of [`NormalModule`](https://github.com/webpack/webpack/blob/master/lib/NormalModule.js)). Use this function if you need to know the source code of another module to generate the result.


### `this.resolve`

``` typescript
resolve(context: string, request: string, callback: function(err, result: string))
```

Resolve a request like a require expression.


### `this.addDependency`

``` typescript
addDependency(file: string)
dependency(file: string) // shortcut
```

Adds a file as dependency of the loader result in order to make them watchable. For example, [`html-loader`](https://github.com/webpack-contrib/html-loader) uses this technique as it finds `src` and `src-set` attributes. Then, it sets the url's for those attributes as dependencies of the html file that is parsed.


### `this.addContextDependency`

``` typescript
addContextDependency(directory: string)
```

Add a directory as dependency of the loader result.


### `this.clearDependencies`

``` typescript
clearDependencies()
```

Remove all dependencies of the loader result. Even initial dependencies and these of other loaders. Consider using `pitch`.


### `this.emitFile`

``` typescript
emitFile(name: string, content: Buffer|string, sourceMap: {...})
```

Emit a file. This is webpack-specific.


### `this.fs`

Access to the `compilation`'s `inputFileSystem` property.


## Deprecated context properties

W> The usage of these properties is highly discouraged since we are planning to remove them from the context. They are still listed here for documentation purposes.


### `this.exec`

``` typescript
exec(code: string, filename: string)
```

Execute some code fragment like a module. See [this comment](https://github.com/webpack/webpack.js.org/issues/1268#issuecomment-313513988) for a replacement method if needed.


### `this.resolveSync`

``` typescript
resolveSync(context: string, request: string) -> string
```

Resolve a request like a require expression.


### `this.value`

Pass values to the next loader. If you know what your result exports if executed as module, set this value here (as a only element array).


### `this.inputValue`

Passed from the last loader. If you would execute the input argument as module, consider reading this variable for a shortcut (for performance).


### `this.options`

W> The `options` property has been deprecated in webpack 3 and removed in webpack 4.


### `this.debug`

A boolean flag. It is set when in debug mode.


### `this.minimize`

Should the result be minimized.


### `this._compilation`

Hacky access to the Compilation object of webpack.


### `this._compiler`

Hacky access to the Compiler object of webpack.


### `this._module`

Hacky access to the Module object being loaded.


# Module Variables

This section covers all __variables__ available in code compiled with webpack. Modules will have access to certain data from the compilation process through `module` and other variables.


### `module.loaded` (NodeJS)

This is `false` if the module is currently executing, and `true` if the sync execution has finished.


### `module.hot` (webpack-specific)

Indicates whether or not [Hot Module Replacement](/concepts/hot-module-replacement) is enabled and provides an interface to the process. See the [HMR API page](/api/hot-module-replacement) for details.


### `module.id` (CommonJS)

The ID of the current module.

``` javascript
module.id === require.resolve('./file.js');
```


### `module.exports` (CommonJS)

Defines the value that will be returned when a consumer makes a `require` call to the module (defaults to a new object).

``` javascript
module.exports = function doSomething() {
  // Do something...
};
```

W> This CANNOT be used in an asynchronous function.


### `exports` (CommonJS)

This variable is equal to default value of `module.exports` (i.e. an object). If `module.exports` gets overwritten, `exports` will no longer be exported.

``` javascript
exports.someValue = 42;
exports.anObject = {
  x: 123
};
exports.aFunction = function doSomething() {
  // Do something
};
```


### `global` (NodeJS)

See [node.js global](https://nodejs.org/api/globals.html#globals_global).


### `process` (NodeJS)

See [node.js process](https://nodejs.org/api/process.html).


### `__dirname` (NodeJS)

Depending on the config option `node.__dirname`:

- `false`: Not defined
- `mock`: equal "/"
- `true`: [node.js __dirname](https://nodejs.org/api/globals.html#globals_dirname)

If used inside a expression that is parsed by the Parser, the config option is treated as `true`.


### `__filename` (NodeJS)

Depending on the config option `node.__filename`:

- `false`: Not defined
- `mock`: equal "/index.js"
- `true`: [node.js __filename](https://nodejs.org/api/globals.html#globals_filename)

If used inside a expression that is parsed by the Parser, the config option is treated as `true`.


### `__resourceQuery` (webpack-specific)

The resource query of the current module. If the following `require` call were made, then the query string would be available in `file.js`.

``` javascript
require('file.js?test');
```

__file.js__

``` javascript
__resourceQuery === '?test';
```


### `__webpack_public_path__` (webpack-specific)

Equals the config options `output.publicPath`.


### `__webpack_require__` (webpack-specific)

The raw require function. This expression isn't parsed by the Parser for dependencies.


### `__webpack_chunk_load__` (webpack-specific)

The internal chunk loading function. Takes two arguments:

- `chunkId` The id for the chunk to load.
- `callback(require)` A callback function called once the chunk is loaded.


### `__webpack_modules__` (webpack-specific)

Access to the internal object of all modules.


### `__webpack_hash__` (webpack-specific)

This variable is only available with the `HotModuleReplacementPlugin` or the `ExtendedAPIPlugin`. It provides access to the hash of the compilation.


### `__non_webpack_require__` (webpack-specific)

Generates a `require` function that is not parsed by webpack. Can be used to do cool stuff with a global require function if available.


### `DEBUG`  (webpack-specific)

Equals the config option `debug`.


# Parser

The `parser` instance, found in the `compiler`, is used to parse each module
being processed by webpack. The `parser` is yet another webpack class that
extends `tapable` and provides a variety of `tapable` hooks that can be used by
plugin authors to customize the parsing process.

The `parser` is found within [module factories](/api/compiler-hooks/#normalmodulefactory) and therefore takes little
more work to access:

``` js
compiler.hooks.normalModuleFactory.tap('MyPlugin', factory => {
  factory.hooks.parser.for('javascript/auto').tap('MyPlugin', (parser, options) => {
    parser.hooks.someHook.tap(/* ... */);
  });
});
```

As with the `compiler`, `tapAsync` and `tapPromise` may also be available
depending on the type of hook.


## Hooks

The following lifecycle hooks are exposed by the `parser` and can be accessed
as such:


### evaluateTypeof

`SyncBailHook`

Evaluate the type of an identifier.

Parameters: `expression`


### evaluate

`SyncBailHook`

Evaluate an expression.

Parameters: `expression`


### evaluateIdentifier

`SyncBailHook`

Evaluate an identifier that is a free variable.

Parameters: `expression`


### evaluateDefinedIdentifier

`SyncBailHook`

Evaluate an identifier that is a defined variable.

Parameters: `expression`


### evaluateCallExpressionMember

`SyncBailHook`

Evaluate a call to a member function of a successfully evaluated expression.

Parameters: `expression` `param`


### statement

`SyncBailHook`

General purpose hook that is called when parsing statements in a code fragment.

Parameters: `statement`


### statementIf

`SyncBailHook`

...

Parameters: `statement`


### label

`SyncBailHook`

...

Parameters: `statement`


### import

`SyncBailHook`

...

Parameters: `statement` `source`


### importSpecifier

`SyncBailHook`

...

Parameters: `statement` `source` `exportName` `identifierName`


### export

`SyncBailHook`

...

Parameters: `statement`


### exportImport

`SyncBailHook`

...

Parameters: `statement` `source`


### exportDeclaration

`SyncBailHook`

...

Parameters: `statement` `declaration`


### exportExpression

`SyncBailHook`

...

Parameters: `statement` `declaration`


### exportSpecifier

`SyncBailHook`

...

Parameters: `statement` `identifierName` `exportName` `index`


### exportImportSpecifier

`SyncBailHook`

...

Parameters: `statement` `source` `identifierName` `exportName` `index`


### varDeclaration

`SyncBailHook`

...

Parameters: `declaration`


### varDeclarationLet

`SyncBailHook`

...

Parameters: `declaration`


### varDeclarationConst

`SyncBailHook`

...

Parameters: `declaration`


### varDeclarationVar

`SyncBailHook`

...

Parameters: `declaration`


### canRename

`SyncBailHook`

...

Parameters: `initExpression`


### rename

`SyncBailHook`

...

Parameters: `initExpression`


### assigned

`SyncBailHook`

...

Parameters: `expression`


### assign

`SyncBailHook`

...

Parameters: `expression`


### typeof

`SyncBailHook`

...

Parameters: `expression`


### call

`SyncBailHook`

...

Parameters: `expression`


### callAnyMember

`SyncBailHook`

...

Parameters: `expression`


### new

`SyncBailHook`

...

Parameters: `expression`


### expression

`SyncBailHook`

...

Parameters: `expression`


### expressionAnyMember

`SyncBailHook`

...

Parameters: `expression`


### expressionConditionalOperator

`SyncBailHook`

...

Parameters: `expression`


### program

`SyncBailHook`

Get access to the abstract syntax tree (AST) of a code fragment

Parameters: `ast` `comments`
