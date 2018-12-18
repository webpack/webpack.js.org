---
title: Stats Data
sort: 3
contributors:
  - skipjack
  - franjohn21
  - byzyk
---

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
