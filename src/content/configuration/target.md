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

`string` `[string]` `false`

Instructs webpack to target a specific environment. Defaults to `'browserslist'` or to `'web'` when no browserslist configuration was found.

### `string`

The following string values are supported via [`WebpackOptionsApply`](https://github.com/webpack/webpack/blob/master/lib/WebpackOptionsApply.js):

| Option                     | Description                                                                                                                                                                                                                                                                                          |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `async-node[[X].Y]`        | Compile for usage in a Node.js-like environment (uses `fs` and `vm` to load chunks asynchronously)                                                                                                                                                                                                   |
| `electron[[X].Y]-main`     | Compile for [Electron](https://electronjs.org/) for main process.                                                                                                                                                                                                                                    |
| `electron[[X].Y]-renderer` | Compile for [Electron](https://electronjs.org/) for renderer process, providing a target using `JsonpTemplatePlugin`, `FunctionModulePlugin` for browser environments and `NodeTargetPlugin` and `ExternalsPlugin` for CommonJS and Electron built-in modules.                                       |
| `electron[[X].Y]-preload`  | Compile for [Electron](https://electronjs.org/) for renderer process, providing a target using `NodeTemplatePlugin` with `asyncChunkLoading` set to `true`, `FunctionModulePlugin` for browser environments and `NodeTargetPlugin` and `ExternalsPlugin` for CommonJS and Electron built-in modules. |
| `node[[X].Y]`              | Compile for usage in a Node.js-like environment (uses Node.js `require` to load chunks)                                                                                                                                                                                                              |
| `node-webkit[[X].Y]`       | Compile for usage in WebKit and uses JSONP for chunk loading. Allows importing of built-in Node.js modules and [`nw.gui`](http://docs.nwjs.io/en/latest/) (experimental)                                                                                                                             |
| `nwjs[[X].Y]`              | The same as `node-webkit`                                                                                                                                                                                                                                                                            |
| `web`                      | Compile for usage in a browser-like environment **(default)**                                                                                                                                                                                                                                        |
| `webworker`                | Compile as WebWorker                                                                                                                                                                                                                                                                                 |
| `esX`                      | Compile for specified ECMAScript version. Examples: es5, es2020.                                                                                                                                                                                                                                     |
| `browserslist`             | Infer a platform and the ES-features from a browserslist-config **(default if browserslist config is available)**                                                                                                                                                                                    |

For example, when the `target` is set to `"electron-main"`, webpack includes multiple electron specific variables.

A version of `node` or `electron` may be optionally specified. This is denoted by the `[[X].Y]` in the table above.

**webpack.config.js**

```js
module.exports = {
  // ...
  target: 'node12.18',
};
```

It helps determinate ES-features that may be used to generate a runtime-code (all the chunks and modules are wrapped by runtime code).

#### `browserslist`

If a project has a browserslist config, then webpack will use it for:

- Determinate ES-features that may be used to generate a runtime-code.
- Infer an environment (e.g: `last 2 node versions` the same as `target: "node"` with some [`output.environment`](/configuration/output/#outputenvironment) settings).

Supported browserslist values:

- `browserslist` - use automatically resolved browserslist config and environment (from the nearest `package.json` or `BROWSERSLIST` environment variable, see [browserslist documentation](https://github.com/browserslist/browserslist#queries) for details)
- `browserslist:modern` - use `modern` environment from automatically resolved browserslist config
- `browserslist:last 2 versions` - use an explicit browserslist query (config will be ignored)
- `browserslist:/path/to/config` - explicitly specify browserslist config
- `browserslist:/path/to/config:modern` - explicitly specify browserslist config and an environment

### `[string]`

When multiple targets are passed, then common subset of features will be used:

**webpack.config.js**

```js
module.exports = {
  // ...
  target: ['web', 'es5'],
};
```

webpack will generate a runtime code for web platform and will use only ES5 features.

Not all targets may be mixed for now.

**webpack.config.js**

```js
module.exports = {
  // ...
  target: ['web', 'node'],
};
```

Will cause an error. webpack does not support universal target for now.

### `false`

Set `target` to `false` if none of the predefined targets from the list above meet your needs, no plugins will be applied.

**webpack.config.js**

```js
module.exports = {
  // ...
  target: false,
};
```

Or you can apply specific plugins you want:

**webpack.config.js**

```js
const webpack = require('webpack');

module.exports = {
  // ...
  target: false,
  plugins: [
    new webpack.web.JsonpTemplatePlugin(options.output),
    new webpack.LoaderTargetPlugin('web'),
  ],
};
```

When no information about the target or the [environment](/configuration/output/#outputenvironment) features is provided, then ES2015 will be used.
