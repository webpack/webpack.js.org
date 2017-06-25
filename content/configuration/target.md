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

`string | function(compiler)`

Tells webpack which environment the application is targeting. The value can be a string or a function.

### `string`

If it's a `string`, then the following values are supported via [`WebpackOptionsApply`](https://github.com/webpack/webpack/blob/master/lib/WebpackOptionsApply.js):


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


### `function`

If it's a `function`, then it will be called with the compiler as a parameter. You can set it to a function if none of the predefined targets above meet your needs.

For example, if you don't want any of the plugins they applied, then you can do:

```js
const options = {
  target: () => undefined
};
```

Or you can apply specific plugins you want:

```js
const webpack = require("webpack");

const options = {
  target: (compiler) => {
    compiler.apply(
      new webpack.JsonpTemplatePlugin(options.output),
      new webpack.LoaderTargetPlugin("web")
    );
  }
};
```
