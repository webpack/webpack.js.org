---
title: Target
sort: 11
contributors:
  - juangl
  - sokra
  - skipjack
  - SpaceK33z
  - pastelsky
---

webpack can compile for multiple environments or _targets_. To understand what a target is in detail, read [the concepts](/concepts/targets).

## `target`

`string`

Tells webpack which environment the application is targeting. The following values are supported via [`WebpackOptionsApply`](https://github.com/webpack/webpack/blob/master/lib/WebpackOptionsApply.js):

| `target`      | Description            |
| ------------- |------------------------|
| `async-node`| Compile for usage in a Node.js-like environment (uses `fs` and `vm` to load chunks asynchronously)    |
| ~~`atom`~~      | Alias for `electron-main` |
| ~~`electron`~~      | Alias for `electron-main` |
| `electron-main`      | Compile for [Electron](http://electron.atom.io/) for main process. |
| `electron-renderer`      | Compile for [Electron](http://electron.atom.io/) for renderer process, providing a target using `JsonpTemplatePlugin`, `FunctionModulePlugin` for browser environments and `NodeTargetPlugin` and `ExternalsPlugin` for CommonJS and Electron built-in modules. |
| `node` | Compile for usage in a Node.js-like environment (uses Node.js `require` to load chunks) |
|`node-webkit`|  Compile for usage in WebKit and uses JSONP for chunk loading. Allows importing of built-in Node.js modules and [`nw.gui`](http://docs.nwjs.io/en/latest/) (experimental) |
|`web`| Compile for usage in a browser-like environment **(default)** |
|`webworker`| Compile as WebWorker |

For example, when the `target` is set to `"electron"`, webpack includes multiple electron specific variables. For more information on which templates and externals are used, you can refer to webpack's [source code](https://github.com/webpack/webpack/blob/master/lib/WebpackOptionsApply.js#L70-L185).
