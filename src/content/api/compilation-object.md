---
title: Compilation Object
group: Objects
sort: 14
contributors:
  - EugeneHlushko
  - wizardofhogwarts
  - jamesgeorge007
  - snitin315
---

Compilation 对象有很多可用的方法和钩子。在此页面，我们将会列举出这些可用的方法和属性。

## compilation 对象方法 {#compilation-object-methods}

### getStats {#getstats}

`function`

返回当前编译的状态对象。

### addModule {#addmodule}

`function (module, cacheGroup)`

向当前编译添加一个模块。

参数：

- `module` - 要添加的模块
- `cacheGroup` - 模块的 `cacheGroup`

### getModule {#getmodule}

`function (module)`

通过编译的标识符获取其模块。

参数：

- `module` - 要获取的模块。标识符是通过编译使用 `module.identifier()` 方法从模块中提取的。

### findModule {#findmodule}

`function (module)`

尝试通过其标识符搜索模块。

参数：

- `module` - 要搜索的模块。标识符是通过编译使用 `module.identifier()` 方法从模块中提取的。

### buildModule {#buildmodule}

`function (module, optional, origin, dependencies)`

构建给定的模块。

参数：

- `module` - 要构建的模块。
- `optional` - 可选标志。
- `origin` - 请求此模块构建的原始模块。
- `dependencies` - 要构建模块的可选依赖。

### processModuleDependencies {#processmoduledependencies}

`function (module, callback)`

处理给定模块依赖。

参数：

- `module` - 要被处理依赖的模块。
- `callback` - 模块依赖处理完成时回调的函数。

### addEntry {#addentry}

`function (context, entry, name, callback)`

为编译添加入口。

参数：

- `context` - 入口的上下文路径。
- `entry` - 入口依赖。
- `name` - 入口名称。
- `callback` - 添加入口完成之后回调的函数。

### rebuildModule {#rebuildmodule}

`function (module, thisCallback)`

触发模块的重建。

参数：

- `module` - 要被重建的模块。
- `thisCallback` - 模块重建完成之后调用的函数。

### finish {#finish}

`function (callback)`

完成编译并调用给定的回调。

参数：

- `callback` - 编译完成之后调用的函数。

### seal {#seal}

`function (callback)`

封闭编译。

参数：

- `callback` - 封闭编译时回调的函数。

### unseal {#unseal}

`function`

解除封闭编译。

参数：

- `callback` - 解除封闭编译时回调的函数。

### reportDependencyErrorsAndWarnings {#reportdependencyerrorsandwarnings}

`function (module, blocks)`

将给定模块的错误和警告添加到编译的错误和警告中。

参数：

- `module` - 要被报告错误与警告的模块。
- `blocks` - 一组要报告的依赖块。

### addChunkInGroup {#addchunkingroup}

`function (groupOptions, module, loc, request)`

将模块添加到现有 chunk 组或创建一个新的组。返回一个 `chunkGroup`。

参数：

- `groupOptions` - chunk  组的选项。
- `module` - 引用 chunk 组的模块。
- `loc` - 引用 chunk 组的位置（模块内部）。
- `request` - 引用 chunk 组的请求。

### addChunk {#addchunk}

`function (name)`

向 `compilation.chunks` 创建或添加一个新的 chunk。返回这个 `chunk`.

参数：

- `name` - chunk 的名称。

### assignDepth {#assigndepth}

`function (module)`

为给定的模块及其依赖块递归分配 `depth` 。

参数：

- `module` - 要被分配 depth 的模块。

### getDependencyReference {#getdependencyreference}

`function (module, dependency)`

返回给定模块对依赖的引用。

参数：

- `module` - 有问题的模块。
- `dependency` - 要引用的依赖。

### processDependenciesBlocksForChunkGroups {#processdependenciesblocksforchunkgroups}

`function (inputChunkGroups)`

通过 `Module` 图创建 `Chunk` 图。该过程分为两个阶段完成。阶段一：遍历模块图，在 `chunkDependencies` 中创建一个基础 chunk 图。阶段二：通过基本 chunk 图遍历所有可能的方法并且跟踪可用模块。遍历过程中 `processDependenciesBlocksForChunkGroups` 将 chunk 相互连接，并将 `Blocks` 与 `Chunks` 连接. 当一个 chunk 的所有模块都已经可用且未连接不需要的 chunk 时，它将停止遍历。

参数：

- `inputChunkGroups` - 被处理的 chunk 组。

### removeReasonsOfDependencyBlock {#removereasonsofdependencyblock}

`function (module, block)`

移除模块与依赖块之间的关系。

参数：

- `module` - 要移除的模块关系。
- `block` - 依赖块。

### patchChunksAfterReasonRemoval {#patchchunksafterreasonremoval}

`function (module, chunk)`

删除依赖性原因后，修补模块和 chunk 的关系。被 `removeReasonsOfDependencyBlock` 自动调用。

参数：

- `module` - 要修复关系的模块。
- `chunk` - 要修复关系的 chunk。

### removeChunkFromDependencies {#removechunkfromdependencies}

`function (block, chunk)`

在除去依赖性原因后，从依赖块模块和 chunk 中移除给定的 chunk。会被 `removeReasonsOfDependencyBlock` 自动调用。

参数：

- `block` - `Chunk` 的块连接。
- `chunk` - 从依赖中删除的块。

### sortItemsWithModuleIds {#sortitemswithmoduleids}

`function`

### sortItemsWithChunkIds {#sortitemswithchunkids}

`function`

### summarizeDependencies {#summarizedependencies}

`function`

### createHash {#createhash}

`function`

### createModuleAssets {#createmoduleassets}

`function`

### createChunkAssets {#createchunkassets}

`function`

### getPath {#getpath}

`function (filename, data)`

返回插值路径。

参数：

- `filename` - 用于通过哈希获取资源路径。
- `data` - 数据对象。

### getPathWithInfo {#getpathwithinfo}

`function (filename, data)`

返回插值路径和资源信息。

参数：

- `filename` - 用于通过哈希获取资源路径。
- `data` - 数据对象。

### createChildCompiler {#createchildcompiler}

`function (name, outputOptions, plugins)`

允许在 webpack 中运行另一个 webpack 实例。但是，子编译器会应用不同的设置和配置。他会从父编译器（或者顶级编译器）中复制所有的钩子(hook)和插件(plugin)，并且创建一个子 `Compiler` 实例。 返回值为创建好的 `Compiler` 实例。

参数：

- `name` -  子 `Compiler` 的名称。
- `outputOptions` - 输出选项。
- `plugins` - 将被提供的 webpack 插件。

### checkConstraints {#checkconstraints}

`function`

### emitAsset {#emitasset}

`function (file, source, assetInfo = {})`

W> webpack 4.40.0 后可用。

参数：

- `file` - 资源名称。
- `source` - 资源来源。
- `assetInfo` - 附加资源信息。

### updateAsset {#updateasset}

`function (file, newSourceOrFunction, assetInfoUpdateOrFunction)`

W> webpack 4.40.0 后可用。

参数：

- `file` - 资源名称。
- `newSourceOrFunction` - 新资源来源或将旧资源转换为新资源的函数。
- `assetInfoUpdateOrFunction` - 新资源信息或将旧资源转换为新资源的函数。

### deleteAsset {#deleteasset}

`function (file)`

参数：

- `file` —— 资源的文件名

### getAssets {#getassets}

`function`

W> webpack 4.40.0 后可用。

返回当前编译下所有资源的数组。

### getAsset {#getasset}

`function (name)`

W> webpack 4.40.0 后可用。

参数：

- `name` - 要返回的资源名称。
