---
title: NormalModuleFactory Hooks
group: Plugins
sort: 13
contributors:
  - iguessitsokay
translators:
  - KimYangOfCat
---

`Compiler` 使用 `NormalModuleFactory` 模块生成各类模块。从入口点开始，此模块会分解每个请求，解析文件内容以查找进一步的请求，然后通过分解所有请求以及解析新的文件来爬取全部文件。在最后阶段，每个依赖项都会成为一个模块实例。

`NormalModuleFactory` 类扩展了 `Tapable` 并提供了以下的生命周期钩子。 
你可以像使用编译器钩子一样使用它们：

```js
NormalModuleFactory.hooks.someHook.tap(/* ... */);
```

`NormalModuleFactory` 创建了可由 `HookMaps` 访问的 `Parser` 和 `Generator` 实例。同时必须传入 `identifier` 才能使用以下代码：

```js
NormalModuleFactory.hooks.someHook.for('identifier').tap(/* ... */);
```

与 `compiler` 一样，`tapAsync` 和 `tapPromise` 是否可用
取决于钩子的类型。

### beforeResolve {#beforeresolve}

`AsyncSeriesBailHook`

当遇到新的依赖项请求时调用。可以通过返回 `false` 来忽略依赖项。否则，返回 `undefined` 以继续。

- 回调参数：`ResolveData`

### factorize {#factorize}

`AsyncSeriesBailHook`

在初始化解析之前调用。它应该返回 `undefined` 以继续。

- 回调参数：`resolveData`

### resolve {#resolve}

`AsyncSeriesBailHook`

在请求被解析之前调用。可以通过返回 `false` 来忽略依赖项。返回一个模块实例将结束进程。否则，返回 `undefined` 以继续。

- 回调参数：`resolveData`

### resolveForScheme {#resolveForScheme}

`AsyncSeriesBailHook`

在解析符合统一资源标志符方案(URI)的请求之前调用。

- 回调参数：`resolveData`

### afterResolve {#afterResolve}

`AsyncSeriesBailHook`

在请求解析后调用。

- 回调参数：`resolveData`

### createModule {#createModule}

`AsyncSeriesBailHook`

在创建 `NormalModule` 实例之前调用。

- 回调参数：`createData` `resolveData`

### module {#module}

`SyncWaterfallHook`

在创建 `NormalModule` 实例后调用。

- 回调参数：`module` `createData` `resolveData`

### createParser {#createParser}

`HookMap<SyncBailHook>`

在 `Parser` 实例创建后调用。`parserOptions` 是 [module.parser](/configuration/module/#moduleparser) 中对应标识符或空对象的选项。

- 钩子参数：`identifier`

- 回调参数：`parserOptions`

### parser {#parser}

`HookMap<SyncHook>`

在创建 `Parser` 实例后触发。

- 钩子参数：`identifier`

- 回调参数：`parser` `parserOptions`

可能的默认标识符：

1. `javascript/auto`
2. `javascript/dynamic`
3. `javascript/esm`
4. `json`
5. `webassembly/sync`
6. `webassembly/async`
7. `asset`

### createGenerator {#createGenerator}

`HookMap<SyncBailHook>`

在 `Generator` 实例创建后调用。`generatorOptions` 是 [module.parser](/configuration/module/#modulegenerator) 中对应标识符或空对象的选项。

- 钩子参数：`identifier`

- 回调参数：`generatorOptions`

### generator {#generator}

`HookMap<SyncHook>`

在 `Generator` 实例创建之后调用。

- 钩子参数：`identifier`

- 回调参数：`generator` `generatorOptions`

可能的默认标识符：

1. `json`
2. `webassembly/sync`
3. `webassembly/async`
4. `asset`
5. `asset/source`
6. `asset/resource`
7. `asset/inline`
