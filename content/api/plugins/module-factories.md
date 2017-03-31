---
title: Context/Normal Module Factories
sort: 5
---

## `NormalModuleFactory`

### `before-resolve(data)` async waterfall

Before the factory starts resolving. The `data` object has these properties:

* `context` The absolute path of the directory for resolving.
* `request` The request of the expression.

Plugins are allowed to modify the object or to pass a new similar object to the callback.

### `after-resolve(data)` async waterfall

After the factory has resolved the request. The `data` object has these properties:

* `request` The resolved request. It acts as an identifier for the NormalModule.
* `userRequest` The request the user entered. It's resolved, but does not contain pre or post loaders.
* `rawRequest` The unresolved request.
* `loaders` A array of resolved loaders. This is passed to the NormalModule and they will be executed.
* `resource` The resource. It will be loaded by the NormalModule.
* `parser` The parser that will be used by the NormalModule.

## `ContextModuleFactory`

### `before-resolve(data)` async waterfall

### `after-resolve(data)` async waterfall

### `alternatives(options: Array)` async waterfall
