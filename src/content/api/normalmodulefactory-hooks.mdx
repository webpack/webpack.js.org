---
title: NormalModuleFactory Hooks
group: Plugins
sort: 13
contributors:
  - iguessitsokay
---

The `NormalModuleFactory` module is used by the `Compiler` to generate modules. Starting with entry points, it resolves each request, parses the content to find further requests, and keeps crawling through files by resolving all and parsing any new files. At last stage, each dependency becomes a Module instance.

The `NormalModuleFactory` class extends `Tapable` and provides the following
lifecycle hooks. They can be tapped the same way as compiler hooks:

```js
NormalModuleFactory.hooks.someHook.tap(/* ... */);
```

NormaleModuleFactory creates `Parser` and `Generator` instances which can be accessed by HookMaps. Identifier must be passed to tap into these:

```js
NormalModuleFactory.hooks.someHook.for('identifier').tap(/* ... */);
```

As with the `compiler`, `tapAsync` and `tapPromise` may also be available
depending on the type of hook.

### beforeResolve

`AsyncSeriesBailHook`

Called when a new dependency request is encountered. A dependency can be ignored by returning `false`. Otherwise, it should return `undefined` to proceed.

- Callback Parameters: `ResolveData`

### factorize

`AsyncSeriesBailHook`

Called before initiating resolve. It should return `undefined` to proceed.

- Callback Parameters: `resolveData`

### resolve

`AsyncSeriesBailHook`

Called before the request is resolved. A dependency can be ignored by returning `false`. Returning a Module instance would finalize the process. Otherwise, it should return `undefined` to proceed.

- Callback Parameters: `resolveData`

### resolveForScheme

`AsyncSeriesBailHook`

Called before a request with scheme (URI) is resolved.

- Callback Parameters: `resolveData`

### afterResolve

`AsyncSeriesBailHook`

Called after the request is resolved.

- Callback Parameters: `resolveData`

### createModule

`AsyncSeriesBailHook`

Called before a `NormalModule` instance is created.

- Callback Parameters: `createData` `resolveData`

### module

`SyncWaterfallHook`

Called after a `NormalModule` instance is created.

- Callback Parameters: `module` `createData` `resolveData`

### createParser

`HookMap<SyncBailHook>`

Called before a `Parser` instance is created. `parserOptions` is options in [module.parser](/configuration/module/#moduleparser) for the corresponding identifier or an empty object.

- Hook Parameters: `identifier`

- Callback Parameters: `parserOptions`

### parser

`HookMap<SyncHook>`

Fired after a `Parser` instance is created.

- Hook Parameters: `identifier`

- Callback Parameters: `parser` `parserOptions`

Possible default identifiers:

1. `javascript/auto`
2. `javascript/dynamic`
3. `javascript/esm`
4. `json`
5. `webassembly/sync`
6. `webassembly/async`
7. `asset`

### createGenerator

`HookMap<SyncBailHook>`

Called before a `Generator` instance is created. `generatorOptions` is options in [module.parser](/configuration/module/#modulegenerator) for the corresponding identifier or an empty object.

- Hook Parameters: `identifier`

- Callback Parameters: `generatorOptions`

### generator

`HookMap<SyncHook>`

Called after a `Generator` instance is created.

- Hook Parameters: `identifier`

- Callback Parameters: `generator` `generatorOptions`

Possible default identifiers:

1. `json`
2. `webassembly/sync`
3. `webassembly/async`
4. `asset`
5. `asset/source`
6. `asset/resource`
7. `asset/inline`
