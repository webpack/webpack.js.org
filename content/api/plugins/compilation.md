---
title: Compilation
sort: 3
---

The Compilation instance extends from the compiler i.e. `compiler.compilation`. It is the literal compilation of all the objects in the require graph. This object has access to all the modules and their dependencies (most of which are circular references). In the compilation phase, modules are loaded, sealed, optimized, chunked, hashed and restored, etc. This would be the main lifecycle of any operations of the compilation.

```javascript
compiler.plugin("compilation", function(compilation) {
    //the main compilation instance
    //all subsequent methods are derived from compilation.plugin
});
```

## `normal-module-loader`

The normal module loader, is the function that actually loads all the modules in the module graph (one-by-one).

```javascript
compilation.plugin('normal-module-loader', function(loaderContext, module) {
    //this is where all the modules are loaded
    //one by one, no dependencies are created yet
});
```

## `seal`

The sealing of the compilation has started.

```javascript
compilation.plugin('seal', function() {
    //you are not accepting any more modules
    //no arguments
});
```

## `optimize`

Optimize the compilation.

```javascript
compilation.plugin('optimize', function() {
    //webpack is begining the optimization phase
    // no arguments
});
```

## `optimize-tree(chunks, modules)` async

Async optimization of the tree.

```javascript
compilation.plugin('optimize-tree', function(chunks, modules) {

});
```

#### `optimize-modules(modules: Module[])`
Optimize the modules.
```javascript
compilation.plugin('optimize-modules', function(modules) {
    //handle to the modules array during tree optimization
});
```

## `after-optimize-modules(modules: Module[])`

Optimizing the modules has finished.

## `optimize-chunks(chunks: Chunk[])`

Optimize the chunks.

```javascript
//optimize chunks may be run several times in a compilation

compilation.plugin('optimize-chunks', function(chunks) {
    //unless you specified multiple entries in your config
    //there's only one chunk at this point
    chunks.forEach(function (chunk) {
        //chunks have circular references to their modules
        chunk.modules.forEach(function (module){
            //module.loaders, module.rawRequest, module.dependencies, etc.
        });
    });
});
```

## `after-optimize-chunks(chunks: Chunk[])`

Optimizing the chunks has finished.

## `revive-modules(modules: Module[], records)`

Restore module info from records.

## `optimize-module-order(modules: Module[])`

Sort the modules in order of importance. The first is the most important module. It will get the smallest id.

## `optimize-module-ids(modules: Module[])`

Optimize the module ids.

## `after-optimize-module-ids(modules: Module[])`

Optimizing the module ids has finished.

## `record-modules(modules: Module[], records)`

Store module info to the records.

## `revive-chunks(chunks: Chunk[], records)`

Restore chunk info from records.

## `optimize-chunk-order(chunks: Chunk[])`

Sort the chunks in order of importance. The first is the most important chunk. It will get the smallest id.

## `optimize-chunk-ids(chunks: Chunk[])`

Optimize the chunk ids.

## `after-optimize-chunk-ids(chunks: Chunk[])`

Optimizing the chunk ids has finished.

## `record-chunks(chunks: Chunk[], records)`

Store chunk info to the records.

## `before-hash`

Before the compilation is hashed.

## `after-hash`

After the compilation is hashed.

## `before-chunk-assets`

Before creating the chunk assets.

## `additional-chunk-assets(chunks: Chunk[])`

Create additional assets for the chunks.

## `record(compilation, records)`

Store info about the compilation to the records

## `optimize-chunk-assets(chunks: Chunk[])` async

Optimize the assets for the chunks.

The assets are stored in `this.assets`, but not all of them are chunk assets. A `Chunk` has a property `files` which points to all files created by this chunk. The additional chunk assets are stored in `this.additionalChunkAssets`.

Here's an example that simply adds a banner to each chunk.

```javascript
compilation.plugin("optimize-chunk-assets", function(chunks, callback) {
    chunks.forEach(function(chunk) {
        chunk.files.forEach(function(file) {
            compilation.assets[file] = new ConcatSource("\/**Sweet Banner**\/", "\n", compilation.assets[file]);
        });
    });
    callback();
});
```

## `after-optimize-chunk-assets(chunks: Chunk[])`

The chunk assets have been optimized. Here's an example plugin from [@boopathi](https://github.com/boopathi) that outputs exactly what went into each chunk.

```javascript
var PrintChunksPlugin = function() {};
PrintChunksPlugin.prototype.apply = function(compiler) {
    compiler.plugin('compilation', function(compilation, params) {
        compilation.plugin('after-optimize-chunk-assets', function(chunks) {
            console.log(chunks.map(function(c) {
                return {
                    id: c.id,
                    name: c.name,
                    includes: c.modules.map(function(m) {
                        return m.request;
                    })
                };
            }));
        });
    });
};
```

## `optimize-assets(assets: Object{name: Source})` async

Optimize all assets.

The assets are stored in `this.assets`.

## `after-optimize-assets(assets: Object{name: Source})`

The assets has been optimized.

## `build-module(module)`

Before a module build has started.

```javascript
compilation.plugin('build-module', function(module){
    console.log('build module');
    console.log(module);
});
```

## `succeed-module(module)`

A module has been built successfully.
```javascript
compilation.plugin('succeed-module', function(module){
    console.log('succeed module');
    console.log(module);
});
```

## `failed-module(module)`

The module build has failed.
```javascript
compilation.plugin('failed-module', function(module){
    console.log('failed module');
    console.log(module);
});
```

## `module-asset(module, filename)`

An asset from a module was added to the compilation.

## `chunk-asset(chunk, filename)`

An asset from a chunk was added to the compilation.
