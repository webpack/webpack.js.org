---
title: ContextModuleFactory Hooks
group: Plugins
sort: 11
contributors:
  - iguessitsokay
translators:
  - KimYangOfCat
---

`Compiler` 使用 `ContextModuleFactory` 模块从 webpack 独特的 [require.context](/api/module-methods/#requirecontext) API 生成依赖关系。它会解析请求的目录，为每个文件生成请求，并依据传递来的 regExp 进行过滤。最后匹配成功的依赖关系将被传入 [NormalModuleFactory](/api/normalmodulefactory-hooks)。

`ContextModuleFactory` 类扩展了 `Tapable` 并提供了以下的生命周期钩子。
你可以像使用编译器钩子一样使用它们：

```js
ContextModuleFactory.hooks.someHook.tap(/* ... */);
```

与 `compiler` 一样，`tapAsync` 和 `tapPromise` 是否可用
取决于钩子的类型。

### beforeResolve {#beforeresolve}

`AsyncSeriesWaterfallHook`

在解析请求的目录之前调用。请求可以通过返回 `false` 来忽略。

- 回调参数：`data`

### afterResolve {#afterresolve}

`AsyncSeriesWaterfallHook`

在请求的目录解析后调用。

- 回调参数：`data`

### contextModuleFiles {#contextmodulefiles}

`SyncWaterfallHook`

读取目录内容后调用。在递归模式下，也会读取每个子目录。回调参数是一个包含每个目录中所有文件和文件夹名称的数组。

- 回调参数：`fileNames`

### alternativeRequests {#alternativerequests}

`AsyncSeriesWaterfallHook`

在创建请求之后但依据 regExp 进行过滤之前，为每个文件调用。

- 回调参数：`request` `options`
