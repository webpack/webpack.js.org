---
title: Target
sort: 11
contributors:
  - juangl
  - sokra
  - skipjack
  - SpaceK33z
---

webpack can compile to multiple environments. We call this _targets_. This page shows what targets are supported. [The concept page](/concepts/targets) explains in greater detail what a target is.

## `target`

`string`

Tell webpack what environment the application is targeting. The following values are supported:

* `"async-node"` Compile for usage in a Node.js-like environment (use `fs` and `vm` to load chunks async)
* `"electron"` Compile for [Electron](http://electron.atom.io/) renderer process, provide a target using `JsonpTemplatePlugin`, `FunctionModulePlugin` for browser environment and `NodeTargetPlugin` and `ExternalsPlugin` for CommonJs and Electron built-in modules.
* `"electron-renderer"` - Compile for [Electron](http://electron.atom.io/) for `renderer-process`
* `"node"` Compile for usage in a Node.js-like environment (uses Node.js `require` to load chunks)
* `"node-webkit"` Compile for usage in WebKit and uses jsonp chunk loading. Allows importing of built-in Node.js modules and [`nw.gui`](http://docs.nwjs.io/en/latest/) (experimental)
* `"web"` Compile for usage in a browser-like environment (default)
* `"webworker"` Compile as WebWorker

For example, when you use the `"electron"` _target_, *webpack* includes multiple Electron specific variables. For more information on which templates and _externals_ are used, you can refer [directly to the webpack source code](https://github.com/webpack/webpack/blob/master/lib/WebpackOptionsApply.js#L70-L185).

The target option defaults to:

```js
target: "web"
```
