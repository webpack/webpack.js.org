---
title: ContextModuleFactory Hooks
group: Plugins
sort: 11
contributors:
  - iguessitsokay
---

The `ContextModuleFactory` module is used by the `Compiler` to generate dependencies from webpack specific [require.context](/api/module-methods/#requirecontext) API. It resolves the requested directory, generates requests for each file and filters against passed regExp. Matching dependencies then passes through [NormalModuleFactory](/api/normalmodulefactory-hooks).

The `ContextModuleFactory` class extends `Tapable` and provides the following
lifecycle hooks. They can be tapped the same way as compiler hooks:

```js
ContextModuleFactory.hooks.someHook.tap(/* ... */);
```

As with the `compiler`, `tapAsync` and `tapPromise` may also be available
depending on the type of hook.

### beforeResolve

`AsyncSeriesWaterfallHook`

Called before resolving the requested directory. The request can be ignored by returning `false`.

- Callback Parameters: `data`

### afterResolve

`AsyncSeriesWaterfallHook`

Called after the requested directory resolved.

- Callback Parameters: `data`

### contextModuleFiles

`SyncWaterfallHook`

Called after directory contents are read. On recursive mode, calls for each sub-directory as well. Callback parameter is an array of all file and folder names in each directory.

- Callback Parameters: `fileNames`

### alternativeRequests

`AsyncSeriesWaterfallHook`

Called for each file after the request is created but before filtering against regExp.

- Callback Parameters: `request` `options`
