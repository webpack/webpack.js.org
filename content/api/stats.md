---
title: Stats JSON
sort: 1
contributors:
  - skipjack
---

When compiling source code with webpack, users can generate a JSON file containing statistics about modules. These statistics can be used to analyze an application's dependency graph as well as to optimize compilation speed. The file is typically generated with the following CLI command:

``` bash
webpack --profile --json > compilation-stats.json
```

The `--json > compilation-stats.json` flag indicates to webpack that it should emit the `compilation-stats.json` containing the dependency graph and various other build information. Typically, the `--profile` flag is also added so that a `profile` section is added to each [`modules` object]() containing module-specific compilation stats.


## Structure

``` js-with-links
{
  "version": "1.4.13", // Version of webpack used for the compilation
  "hash": "11593e3b3ac85436984a", // Compilation specific hash
  "time": 2469, // Compilation time in milliseconds (?)
  "filteredModules": 0, // ?
  "assetsByChunkName": {
    // Chunk name to emitted asset mapping
    "main": "web.js?h=11593e3b3ac85436984a",
    "named-chunk": "named-chunk.web.js"
  },
  "assets": [
    // A list of [asset objects](#assets-objects)
  ],
  "chunks": [
    // A list of [chunk objects](#chunks-objects)
  ],
  "modules": [
    // A list of [module objects](#modules-objects)
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

Each `assets` object represents an `output` file emitted from the compilation. They all follow the a similar structure:

``` js
{
  "chunkNames": [], // The chunks this asset contains ?
  "chunks": [ 10, 6 ], // The chunk IDs this asset contains ?
  "emitted": true, // Whether or not the asset made it to the `output` directory ?
  "name": "10.web.js", // The `output` filename
  "size": 1058 // The size of the file in bytes ?
}
```


### Chunk Objects

Each `chunks` object represents a group of modules known as a [chunk](/glossary#chunk). Each object follows the following structure:

``` js
{
  "entry": true, // Whether or not it's an entry chunk
  "files": [
    // An array of filename strings that contain this chunk (?)
  ],
  "filteredModules": 0, // ?
  "id": 0, // The ID of this chunk
  "initial": true, // ?
  "modules": [
    // A list of [module objects](#modules-objects)
  ],
  "names": [
    // An list of chunk names contained within this chunk (?)
  ],
  "origins": [
    // See the description below...
  ],
  "parents": [], // Parent chunk IDs? Names?
  "rendered": true, // ?
  "size": 188057 // Chunk size in bytes (?)
}
```

The `chunks` object will also contain a list of `origins` describing how the given chunk originated. Each `origins` object follows the following schema:

``` js
{
  "loc": "", // Lines of code that generated this chunk (?)
  "module": "(webpack)\\test\\browsertest\\lib\\index.web.js", // ?
  "moduleId": 0, // The ID of the module
  "moduleIdentifier": "(webpack)\\test\\browsertest\\lib\\index.web.js", // ?
  "moduleName": "./lib/index.web.js", // ?
  "name": "main", // ?
  "reasons": [
    // A list of the same `reasons` found in [module objects](#module-objects)
  ]
}
```


### Module Objects

What good would these statistics be without some description of the compiled application's actual modules? Each module in the dependency graph is represented by the following structure:

``` js
{
  "assets": [], // A list of [asset objects](#asset-objects) (?)
  "built": true, // Maybe this means compiled, loaded or output (?)
  "cacheable": true, // Whether or not this module is cacheable (?)
  "chunks": [
    // IDs of chunks that contain this module (?)
  ],
  "errors": 0, // Number of errors when resolving or processing the module (?)
  "failed": false, // Whether or not compilation failed on this module (?)
  "id": 0, // The ID of the module
  "identifier": "(webpack)\\test\\browsertest\\lib\\index.web.js", // Another ID ?
  "name": "./lib/index.web.js", // Path to the actual file
  "optional": false, // ?
  "prefetched": false, // Whether or not the module was prefetched (a build optimization)
  "profile": {
    // Module specific compilation stats corresponding to the [`--profile` flag](/api/cli#profiling)
    "building": 73,
    "dependencies": 242,
    "factory": 11
  },
  "reasons": [
    // See the description below...
  ],
  "size": 3593, // Module size in bytes?
  "source": "// Should not break it...\r\nif(typeof...", // The stringified raw source (?)
  "warnings": 0 // Number of warnings when resolving or processing the module (?)
}
```

Every module also contains a list of `reasons` objects describing why that module was included in the dependency graph. Each "reason" is very similar to the `origins` objects seen above in the [chunk objects](#chunk-objects) section:

``` js
{
  "loc": "33:24-93", // Lines of code that caused the module to be included
  "module": "./lib/index.web.js", // ?
  "moduleId": 0, // The ID of the module
  "moduleIdentifier": "(webpack)\\test\\browsertest\\lib\\index.web.js", // ?
  "moduleName": "./lib/index.web.js", // ?
  "type": "require.context", // The [type of request](/api/module-methods) used
  "userRequest": "../../cases" // ?
}
```


### Errors and Warnings

The `errors` and `warnings` properties each contain a list of strings. Each string contains a message and stack trace:

``` bash
../cases/parsing/browserify/index.js
Critical dependencies:
2:114-121 This seem to be a pre-built javascript file. Even while this is possible, it's not recommended. Try to require to orginal source to get better results.
 @ ../cases/parsing/browserify/index.js 2:114-121
```
