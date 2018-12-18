---
title: Target
sort: 11
contributors:
  - juangl
  - sokra
  - skipjack
  - SpaceK33z
  - pastelsky
  - tbroadley
  - byzyk
  - EugeneHlushko
---

webpack can compile for multiple environments or _targets_. To understand what a `target` is in detail, read through [the targets concept page](/concepts/targets/).

## `target`

`string | function (compiler)`

Instructs webpack to target a specific environment.


### `string`

The following string values are supported via [`WebpackOptionsApply`](https://github.com/webpack/webpack/blob/master/lib/WebpackOptionsApply.js):

Option                | Description
--------------------- | -----------------------
`async-node`          | Compile for usage in a Node.js-like environment (uses `fs` and `vm` to load chunks asynchronously)
`electron-main`       | Compile for [Electron](https://electronjs.org/) for main process.
`electron-renderer`   | Compile for [Electron](https://electronjs.org/) for renderer process, providing a target using `JsonpTemplatePlugin`, `FunctionModulePlugin` for browser environments and `NodeTargetPlugin` and `ExternalsPlugin` for CommonJS and Electron built-in modules.
`node`                | Compile for usage in a Node.js-like environment (uses Node.js `require` to load chunks)
`node-webkit`         | Compile for usage in WebKit and uses JSONP for chunk loading. Allows importing of built-in Node.js modules and [`nw.gui`](http://docs.nwjs.io/en/latest/) (experimental)
`web`                 | Compile for usage in a browser-like environment __(default)__
`webworker`           | Compile as WebWorker

For example, when the `target` is set to `"electron-main"`, webpack includes multiple electron specific variables. For more information on which templates and externals are used, you can refer to webpack's [source code](https://github.com/webpack/webpack/blob/master/lib/WebpackOptionsApply.js#L148-L183).


### `function`

If a function is passed, then it will be called with the compiler as a parameter. Set it to a function if none of the predefined targets from the list above meet your needs.

For example, if you don't want any of the plugins they applied:

```js
const options = {
  target: () => undefined
};
```

Or you can apply specific plugins you want:

```js
const webpack = require('webpack');

const options = {
  target: (compiler) => {
    compiler.apply(
      new webpack.JsonpTemplatePlugin(options.output),
      new webpack.LoaderTargetPlugin('web')
    );
  }
};
```
