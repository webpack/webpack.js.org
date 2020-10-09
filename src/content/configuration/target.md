---
title: Target
sort: 13
contributors:
  - juangl
  - sokra
  - skipjack
  - SpaceK33z
  - pastelsky
  - tbroadley
  - byzyk
  - EugeneHlushko
  - smelukov
---

webpack can compile for multiple environments or _targets_. To understand what a `target` is in detail, read through [the targets concept page](/concepts/targets/).

## `target`

`string` `function (compiler) => string`

Instructs webpack to target a specific environment. Defaults to `'browserslist'` or to `'web'` when no browserslist configuration was found.


### `string`

The following string values are supported via [`WebpackOptionsApply`](https://github.com/webpack/webpack/blob/master/lib/WebpackOptionsApply.js):

Option                | Description
--------------------- | -----------------------
`async-node`          | Compile for usage in a Node.js-like environment (uses `fs` and `vm` to load chunks asynchronously)
`electron-main`       | Compile for [Electron](https://electronjs.org/) for main process.
`electron-renderer`   | Compile for [Electron](https://electronjs.org/) for renderer process, providing a target using `JsonpTemplatePlugin`, `FunctionModulePlugin` for browser environments and `NodeTargetPlugin` and `ExternalsPlugin` for CommonJS and Electron built-in modules.
`electron-preload`    | Compile for [Electron](https://electronjs.org/) for renderer process, providing a target using `NodeTemplatePlugin` with `asyncChunkLoading` set to `true`, `FunctionModulePlugin` for browser environments and `NodeTargetPlugin` and `ExternalsPlugin` for CommonJS and Electron built-in modules.
`node`                | Compile for usage in a Node.js-like environment (uses Node.js `require` to load chunks)
`node-webkit`         | Compile for usage in WebKit and uses JSONP for chunk loading. Allows importing of built-in Node.js modules and [`nw.gui`](http://docs.nwjs.io/en/latest/) (experimental)
`web`                 | Compile for usage in a browser-like environment __(default)__
`webworker`           | Compile as WebWorker
`browserslist`        | Infer a platform and the ES-features from a browserslist-config

For example, when the `target` is set to `"electron-main"`, webpack includes multiple electron specific variables. For more information on which templates and externals are used, you can refer to webpack's [source code](https://github.com/webpack/webpack/blob/master/lib/WebpackOptionsApply.js#L148-L183).

#### `browserslist`

If a project has a browserslist config, then webpack will use it for:

- Determinate ES-features that may be used to generate a runtime-code (all the chunks and modules are wrapped by runtime code).
- Infer an environment (e.g: `last 2 node versions` the same as `target: "node"` with some [`output.environment`](/configuration/output/#outputenvironment) settings).

Supported browserslist values:

- `browserslist` - use automatically resolved browserslist config and environment (from the nearest `package.json` or `BROWSERSLIST` environment variable)
- `browserslist:modern` - use `modern` environment from automatically resolved browserslist config
- `browserslist:last 2 versions` - use an explicit browserslist query (config will be ignored)
- `browserslist:/path/to/config` - explicitly specify browserslist config
- `browserslist:/path/to/config:modern` - explicitly specify browserslist config and an environment

### `function`

If a function is passed, then it will be called with the compiler as a parameter. Set `target` to a `function` if none of the predefined targets from the list above meet your needs.

For example, if you don't want any of the plugins applied:

__webpack.config.js__

```js
module.exports = {
  // ...
  target: () => undefined
};
```

Or you can apply specific plugins you want:

__webpack.config.js__

```js
const webpack = require('webpack');

module.exports = {
  // ...
  target: (compiler) => {
    new webpack.JsonpTemplatePlugin(options.output).apply(compiler);
    new webpack.LoaderTargetPlugin('web').apply(compiler);
  }
};
```
