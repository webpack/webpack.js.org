---
title: Internal webpack plugins
contributors:
  - EugeneHlushko
---

This is a list of plugins which are used by webpack internally.

W>You should only care about them if you are building your own compiler based on webpack, or introspect the internals.

categories of internal plugins:

* [environment](#environment)
* [compiler](#compiler)
* [entry](#entry)
* [output](#output)
* [source](#source)
* [optimize](#optimize)

## environment

Plugins affecting the environment of the compiler.

__`node/NodeEnvironmentPlugin`__

Applies node.js style filesystem to the compiler.

## compiler

Plugins affecting the compiler

__`CachePlugin([cache])`__

Adds a cache to the compiler, where modules are cached.

You can pass a `cache` object, where the modules are cached. Otherwise one is created per plugin instance.

__`ProgressPlugin(handler)`__

Hook into the compiler to extract progress information. The `handler` must have the signature `function(percentage, message)`. It's called with `0 <= percentage <= 1`. `percentage == 0` indicates the start. `percentage == 1` indicates the end.

__`RecordIdsPlugin()`__

Saves and restores module and chunk ids from records.

## entry

Plugins, which add entry chunks to the compilation.

__`SingleEntryPlugin(context, request, chunkName)`__

Adds a entry chunk on compilation. The chunk is named `chunkName` and contains only one module (plus dependencies). The module is resolved from `request` in `context` (absolute path).

__`MultiEntryPlugin(context, requests, chunkName)`__

Adds a entry chunk on compilation. The chunk is named `chunkName` and contains a module for each item in the `requests` array (plus dependencies). Each item in `requests` is resolved in `context` (absolute path).

__`PrefetchPlugin(context, request)`__

Prefetches `request` and dependencies to enables more parallel compilation. It doesn't create any chunk. The module is resolved from `request` in `context` (absolute path).

## output

__`FunctionModulePlugin(context, options)`__

Each emitted module is wrapped in a function.

`options` are the output options.

If `options.pathinfo` is set, each module function is annotated with a comment containing the module identifier shortened to `context` (absolute path).

__`JsonpTemplatePlugin(options)`__

Chunks are wrapped into JSONP-calls. A loading algorithm is included in entry chunks. It loads chunks by adding a `<script>` tag.

`options` are the output options.

`options.jsonpFunction` is the JSONP function.

`options.publicPath` is uses as path for loading the chunks.

`options.chunkFilename` is the filename under that chunks are expected.

__`node/NodeTemplatePlugin(options)`__

Chunks are wrapped into node.js modules exporting the bundled modules. The entry chunks loads chunks by requiring them.

`options` are the output options.

`options.chunkFilename` is the filename under that chunks are expected.

__`LibraryTemplatePlugin(name, target)`__

The entries chunks are decorated to form a library `name` of type `type`.

__`webworker/WebWorkerTemplatePlugin(options)`__

Chunks are loaded by `importScripts`. Else it's similar to `JsonpTemplatePlugin`.

`options` are the output options.

__`EvalDevToolModulePlugin`__

Decorates the module template by wrapping each module in a `eval` annotated with `// @sourceURL`.

__`SourceMapDevToolPlugin(sourceMapFilename, sourceMappingURLComment, moduleFilenameTemplate, fallbackModuleFilenameTemplate)`__

Decorates the templates by generating a SourceMap for each chunk.

`sourceMapFilename` the filename template of the SourceMap. `[hash]`, `[name]`, `[id]`, `[file]` and `[filebase]` are replaced. If this argument is missing, the SourceMap will be inlined as DataUrl.

__`NoHotModuleReplacementPlugin()`__

Defines `module.hot` as `false` to remove hot module replacement code.

__`HotModuleReplacementPlugin(options)`__

Add support for hot module replacement. Decorates the templates to add runtime code. Adds `module.hot` API.

__`options.hotUpdateChunkFilename`__

The filename for hot update chunks.

__`options.hotUpdateMainFilename`__

The filename for the hot update manifest.

__`options.hotUpdateFunction`__

JSON function name for the hot update.

## source

Plugins affecting the source code of modules.

__`APIPlugin`__

Make `__webpack_public_path__`, `__webpack_require__`, `__webpack_modules__`, `__webpack_chunk_load__` accessible. Ensures that `require.valueOf` and `require.onError` are not processed by other plugins.

__`CompatibilityPlugin`__

Currently useless. Ensures compatibility with other module loaders.

__`ConsolePlugin`__

Offers a pseudo `console` if it is not available.

__`ConstPlugin`__

Tries to evaluate expressions in `if (...)` conditions and replace them with `true`/`false`. May result in dead branches elimination.

Example #1:

__myGreatModule.js__

```javascript
import { foo } from './helpers';

const a = false;

if (a) {
  foo();
}
```

Becausse `a` will evaluate as `false` in the `if (a)` condition and `foo()` call will never happen, the whole import will get pruned thanks to `ConstPlugin` run.

__`ProvidePlugin(name, request)`__

If `name` is used in a module it is filled by a module loaded by `require(<request>)`.

__`NodeStuffPlugin(options, context)`__

Provide stuff that is normally available in node.js modules.

It also ensures that `module` is filled with some node.js stuff if you use it.

__`RequireJsStuffPlugin`__

Provide stuff that is normally available in require.js.

`require[js].config` is removed. `require.version` is `0.0.0`. `requirejs.onError` is mapped to `require.onError`.

__`node/NodeSourcePlugin(options)`__

This module adds stuff from node.js that is not available in non-node.js environments.

It adds polyfills for `process`, `console`, `Buffer` and `global` if used. It also binds the built in Node.js replacement modules.

__`node/NodeTargetPlugin`__

The plugins should be used if you run the bundle in a node.js environment.

If ensures that native modules are loaded correctly even if bundled.

__`dependencies/AMDPlugin(options)`__

Provides AMD-style `define` and `require` to modules. Also bind `require.amd`, `define.amd` and `__webpack_amd_options__` to the `options` passed as parameter.

__`dependencies/CommonJsPlugin`__

Provides CommonJs-style `require` to modules.

__`dependencies/LabeledModulesPlugin`__

Provide labels `require:` and `exports:` to modules.

__`dependencies/RequireContextPlugin(modulesDirectories, extensions)`__

Provides `require.context`. The parameter `modulesDirectories` and `extensions` are used to find alternative requests for files. It's useful to provide the same arrays as you provide to the resolver.

__`dependencies/RequireEnsurePlugin`__

Provides `require.ensure`.

__`dependencies/RequireIncludePlugin`__

Provides `require.include`.

__`DefinePlugin(definitions)`__

Define constants for identifier.

`definitions` is an object.

## optimize

__`optimize/LimitChunkCountPlugin(options)`__

Merge chunks limit chunk count is lower than `options.maxChunks`.

The overhead for each chunks is provided by `options.chunkOverhead` or defaults to 10000. Entry chunks sizes are multiplied by `options.entryChunkMultiplicator` (or 10).

Chunks that reduce the total size the most are merged first. If multiple combinations are equal the minimal merged size wins.

__`optimize/MergeDuplicateChunksPlugin`__

Chunks with the same modules are merged.

__`optimize/RemoveEmptyChunksPlugin`__

Modules that are included in every parent chunk are removed from the chunk.

__`optimize/MinChunkSizePlugin(minChunkSize)`__

Merges chunks until each chunk has the minimum size of `minChunkSize`.

__`optimize/FlagIncludedChunksPlugin`__

Adds chunk ids of chunks which are included in the chunk. This eliminates unnecessary chunk loads.

__`optimize/UglifyJsPlugin(options)`__

Minimizes the chunks with `uglify.js`.

`options` are uglifyjs options.

__`optimize/OccurenceOrderPlugin(preferEntry)`__

Order the modules and chunks by occurrence. This saves space, because often referenced modules and chunks get smaller ids.

`preferEntry` If true, references in entry chunks have higher priority

__`optimize/DedupePlugin`__

Deduplicates modules and adds runtime code.