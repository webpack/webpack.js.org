---
title: 构建目标(Targets)
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

webpack 能够为多种环境或 _target_ 构建编译。想要理解什么是 `target` 的详细信息，
请阅读 [target 概念页面](/concepts/targets/)。

## `target` {#target}

`string` `[string]` `false`

<<<<<<< HEAD
告知 webpack 为目标(target)指定一个环境。
=======
Instructs webpack to target a specific environment. Defaults to `'browserslist'` or to `'web'` when no browserslist configuration was found.
>>>>>>> ef81ee1f2d496c6a49e61e34ffb7692db1ba54e7


### `string` {#string}

通过 [`WebpackOptionsApply`](https://github.com/webpack/webpack/blob/master/lib/WebpackOptionsApply.js) ，
可以支持以下字符串值：

<<<<<<< HEAD
选项                | 描述
--------------------- | -----------------------
`async-node`          | 编译为类 Node.js 环境可用（使用 fs 和 vm 异步加载分块）
`electron-main`       |  编译为 [Electron](https://electronjs.org/) 主进程。
`electron-renderer`   | 编译为 [Electron](https://electronjs.org/) 渲染进程，使用 `JsonpTemplatePlugin`, 
`FunctionModulePlugin` 来为浏览器环境提供目标，使用 `NodeTargetPlugin` 和 `ExternalsPlugin`
为 CommonJS 和 Electron 内置模块提供目标。
`electron-preload`    | 编译为 [Electron](https://electronjs.org/) 渲染进程，
使用 `NodeTemplatePlugin` 且 `asyncChunkLoading` 设置为 `true` ，`FunctionModulePlugin` 来为浏览器提供目标，使用 `NodeTargetPlugin` 和 `ExternalsPlugin` 为 CommonJS 和 Electron 内置模块提供目标。
`node`                | 编译为类 Node.js 环境可用（使用 Node.js `require` 加载 chunks）
`node-webkit`         | 编译为 Webkit 可用，并且使用 jsonp 去加载分块。支持 Node.js 内置模块和 [`nw.gui`](http://docs.nwjs.io/en/latest/) 
导入（实验性质）
`web`                 | 编译为类浏览器环境里可用 __（默认）__
`webworker`           | 编译成一个 WebWorker

例如，当 `target` 设置为 `"electron-main"`，webpack 引入多个 electron 特定的变量。
有关使用哪些模板和 externals 的更多信息，
你可以 [直接参考 webpack 源码](https://github.com/webpack/webpack/blob/master/lib/WebpackOptionsApply.js#L148-L183)。
=======
Option                     | Description
-------------------------- | -----------------------
`async-node[[X].Y]`        | Compile for usage in a Node.js-like environment (uses `fs` and `vm` to load chunks asynchronously)
`electron[[X].Y]-main`     | Compile for [Electron](https://electronjs.org/) for main process.
`electron[[X].Y]-renderer` | Compile for [Electron](https://electronjs.org/) for renderer process, providing a target using `JsonpTemplatePlugin`, `FunctionModulePlugin` for browser environments and `NodeTargetPlugin` and `ExternalsPlugin` for CommonJS and Electron built-in modules.
`electron[[X].Y]-preload`  | Compile for [Electron](https://electronjs.org/) for renderer process, providing a target using `NodeTemplatePlugin` with `asyncChunkLoading` set to `true`, `FunctionModulePlugin` for browser environments and `NodeTargetPlugin` and `ExternalsPlugin` for CommonJS and Electron built-in modules.
`node[[X].Y]`              | Compile for usage in a Node.js-like environment (uses Node.js `require` to load chunks)
`node-webkit[[X].Y]`       | Compile for usage in WebKit and uses JSONP for chunk loading. Allows importing of built-in Node.js modules and [`nw.gui`](http://docs.nwjs.io/en/latest/) (experimental)
`nwjs[[X].Y]`              | The same as `node-webkit`
`web`                      | Compile for usage in a browser-like environment __(default)__
`webworker`                | Compile as WebWorker
`esX`                      | Compile for specified ECMAScript version. Examples: es5, es2020.
`browserslist`             | Infer a platform and the ES-features from a browserslist-config __(default if browserlist config is available)__

For example, when the `target` is set to `"electron-main"`, webpack includes multiple electron specific variables.
>>>>>>> ef81ee1f2d496c6a49e61e34ffb7692db1ba54e7

A version of `node` or `electron` may be optionally specified. This is denoted by the `[[X].Y]` in the table above.

<<<<<<< HEAD
### `function` {#function}

如果传入一个函数，此函数调用时会传入一个 编译器（compiler） 作为参数。如果以上列表中没有一个预定义的目标(target)符合你的要求，
请将其设置为一个函数。

例如，如果你不需要使用以上任何插件：
=======
__webpack.config.js__

```js
module.exports = {
  // ...
  target: 'node12.18'
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
>>>>>>> ef81ee1f2d496c6a49e61e34ffb7692db1ba54e7

__webpack.config.js__

```js
module.exports = {
  // ...
  target: ['web', 'es5']
};
```

webpack will generate a runtime code for web platform and will use only ES5 features.

Not all targets may be mixed for now.

__webpack.config.js__

```js
module.exports = {
  // ...
  target: ['web', 'node']
};
```

Will cause an error. webpack does not support universal target for now.

### `false`

Set `target` to `false` if none of the predefined targets from the list above meet your needs, no plugins will be applied.

__webpack.config.js__

```js
module.exports = {
  // ...
  target: false
};
```

或者可以使用你想要指定的插件

__webpack.config.js__

```js
const webpack = require('webpack');

module.exports = {
  // ...
  target: false,
  plugins: [
    new webpack.JsonpTemplatePlugin(options.output),
    new webpack.LoaderTargetPlugin('web')
  ]
};
```

When no information about the target or the [environment](/configuration/output/#outputenvironment) features is provided, then ES2015 will be used.
