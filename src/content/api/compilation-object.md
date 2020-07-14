---
title: Compilation Object
group: Objects
sort: 14
contributors:
  - EugeneHlushko
  - wizardofhogwarts
  - jamesgeorge007
---

The Compilation object has many methods and hooks available. On this page, we will list the available methods and properties.

## compilation object methods {#compilation-object-methods}

### getStats {#getstats}

`function`

Returns Stats object for the current compilation.

### addModule {#addmodule}

`function (module, cacheGroup)`

Adds a module to the current compilation.

Parameters:

- `module` - module to be added
- `cacheGroup` - `cacheGroup` of the module

### getModule {#getmodule}

`function (module)`

Fetches a module from a compilation by its identifier.

Parameters:

- `module` - module to be fetched. The identifier is extracted from the module by the compilation using `module.identifier()` method.

### findModule {#findmodule}

`function (module)`

Attempts to search for a module by its identifier.

Parameters:

- `module` - module to be searched for. The identifier is extracted from the module by the compilation using `module.identifier()` method.

### waitForBuildingFinished {#waitforbuildingfinished}

`function (module, callback)`

Runs a given `callback` function when the given module was built.

Parameters:

- `module` - the module at question.
- `callback` - the function to be invoked.

### buildModule {#buildmodule}

`function (module, optional, origin, dependencies)`

Builds the given module.

Parameters:

- `module` - the module to be built.
- `optional` - optional flag.
- `origin` - origin module from which this module build was requested.
- `dependencies` - optional dependencies of the module to be built.

### processModuleDependencies {#processmoduledependencies}

`function (module, callback)`

Process the given module dependencies.

Parameters:

- `module` - module to be processed for the dependencies.
- `callback` - function to be invoked when dependencies of the module had been processed.

### addModuleDependencies {#addmoduledependencies}

`function (module, dependencies, bail, cacheGroup, recursive, callback)`

Adds dependencies to the module. Automatically called by `processModuleDependencies` after processing dependencies.

Parameters:

- `module` - module to add dependencies to.
- `dependencies` - set of sorted dependencies to iterate through and add to the module.
- `bail` - whether to bail or not when an error occurs.
- `cacheGroup` - `cacheGroup` of the module.
- `recursive` - whether it is a recursive traversal.
- `callback` - function to invoke after adding the module dependencies.


### addEntry {#addentry}

`function (context, entry, name, callback)`

Adds an entry to the compilation.

Parameters:

- `context` - context path for entry.
- `entry` - entry dependency.
- `name` - the name of entry.
- `callback` - function to be invoked when addEntry finishes.

### prefetch {#prefetch}

`function (context, dependency, callback)`

Creates a module from a given dependency.

Parameters:

- `context` - context path.
- `dependency` - the dependency that was used to create the module.
- `callback` - module callback that sends a module up one level.

### rebuildModule {#rebuildmodule}

`function (module, thisCallback)`

Triggers a re-build of the module.

Parameters:

- `module` - module to be rebuilt.
- `thisCallback` - function to be invoked when the module finishes rebuilding.

### finish {#finish}

`function (callback)`

Finishes compilation and invokes the given callback.

Parameters:

- `callback` - function to be invoked when the compilation has been finished.

### seal {#seal}

`function (callback)`

Seals the compilation.

Parameters:

- `callback` - function to be invoked when the compilation has been sealed.

### unseal {#unseal}

`function`

Unseals the compilation.

Parameters:

- `callback` - function to be invoked when the compilation has been unsealed.

### reportDependencyErrorsAndWarnings {#reportdependencyerrorsandwarnings}

`function (module, blocks)`

Adds errors and warnings of the given module to the compilation errors and warnings.

Parameters:

- `module` - the module whose errors and warnings are to be reported.
- `blocks` - a set of dependency blocks to report from.

### addChunkInGroup {#addchunkingroup}

`function (groupOptions, module, loc, request)`

Adds module to an existing chunk group or creates a new one. Returns a `chunkGroup`.

Parameters:

- `groupOptions` - options for the chunk group.
- `module` - a module that references the chunk group.
- `loc` - the location from which the chunk group is referenced (inside of the module).
- `request` - the request from which the chunk group is referenced.

### addChunk {#addchunk}

`function (name)`

Creates and adds a new chunk to the `compilation.chunks`. Returns that `chunk`.

Parameters:

- `name` - the name of the chunk.

### assignDepth {#assigndepth}

`function (module)`

Assigns `depth` to the given module and its dependency blocks recursively.

Parameters:

- `module` - the module to assign depth to.

### getDependencyReference {#getdependencyreference}

`function (module, dependency)`

Returns the reference to the dependency from a given module.

Parameters:

- `module` - the module at question.
- `dependency` - the dependency to get reference to.

### processDependenciesBlocksForChunkGroups {#processdependenciesblocksforchunkgroups}

`function (inputChunkGroups)`

Creates the `Chunk` graph from the `Module` graph. The process is done in two phases. Phase one: traverse the module graph and build a basic chunks graph in `chunkDependencies`. Phase two: traverse every possible way through the basic chunk graph and track the available modules. While traversing, `processDependenciesBlocksForChunkGroups` connects chunks with each other and `Blocks` with `Chunks`. It stops traversing when all modules for a chunk are already available and it doesn't connect unneeded chunks.

Parameters:

- `inputChunkGroups` - chunk groups that are processed.

### removeReasonsOfDependencyBlock {#removereasonsofdependencyblock}

`function (module, block)`

Removes relation of the module to the dependency block.

Parameters:

- `module` - a module relationship to be removed.
- `block` - dependency block.

### patchChunksAfterReasonRemoval {#patchchunksafterreasonremoval}

`function (module, chunk)`

Patches ties of module and chunk after removing dependency reasons. Called automatically by `removeReasonsOfDependencyBlock`.

Parameters:

- `module` - a module to patch tie.
- `chunk` - a chunk to patch tie.

### removeChunkFromDependencies {#removechunkfromdependencies}

`function (block, chunk)`

Removes given chunk from a dependencies block module and chunks after removing dependency reasons. Called automatically by `removeReasonsOfDependencyBlock`.

Parameters:

- `block` - block tie for `Chunk`.
- `chunk` - a chunk to remove from dependencies.

### sortItemsWithModuleIds {#sortitemswithmoduleids}

`function`

### sortItemsWithChunkIds {#sortitemswithchunkids}

`function`

### summarizeDependencies {#summarizedependencies}

`function`

### createHash {#createhash}

`function`

### modifyHash {#modifyhash}

`function (update)`

### createModuleAssets {#createmoduleassets}

`function`

### createChunkAssets {#createchunkassets}

`function`

### getPath {#getpath}

`function (filename, data)`

Returns the interpolated path.

Parameters:

- `filename` - used to get asset path with hash.
- `data` - data object.

### getPathWithInfo {#getpathwithinfo}

`function (filename, data)`

Returns interpolated path and asset information.

Parameters:

- `filename` - used to get asset path with hash.
- `data` - data object.

### createChildCompiler {#createchildcompiler}

`function (name, outputOptions, plugins)`

Allows running another instance of webpack inside of webpack. However, as a child with different settings and configurations applied. It copies all hooks and plugins from the parent (or top-level compiler) and creates a child `Compiler` instance. Returns the created `Compiler`.

Parameters:

- `name` - name for the child `Compiler`.
- `outputOptions` - output options object.
- `plugins` - webpack plugins that will be applied.

### checkConstraints {#checkconstraints}

`function`

### emitAsset {#emitasset}

`function (file, source, assetInfo = {})`

W> Available since webpack 4.40.0

Parameters:

- `file` - file name of the asset
- `source` - the source of the asset
- `assetInfo` - additional asset information

### updateAsset {#updateasset}

`function (file, newSourceOrFunction, assetInfoUpdateOrFunction)`

W> Available since webpack 4.40.0

Parameters:

- `file` - file name of the asset
- `newSourceOrFunction` - new asset source or function converting old to new
- `assetInfoUpdateOrFunction` - new asset info or function converting old to new

### getAssets {#getassets}

`function`

W> Available since webpack 4.40.0

Returns array of all assets under the current compilation.

### getAsset {#getasset}

`function (name)`

W> Available since webpack 4.40.0

Parameters:

`name` - the name of the asset to return
