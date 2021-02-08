---
title: DllPlugin
contributors:
  - aretecode
  - sokra
  - opiepj
  - simon04
  - skipjack
  - byzyk
  - EugeneHlushko
  - EslamHiko
related:
  - title: Code Splitting Example
    url: https://github.com/webpack/webpack/blob/master/examples/explicit-vendor-chunk/README.md
---

`DllPlugin` 和 `DllReferencePlugin` 用某种方法实现了拆分 bundles，同时还大幅度提升了构建的速度。"DLL" 一词代表微软最初引入的动态链接库。

<<<<<<< HEAD

## `DllPlugin` {#dllplugin}
=======
## `DllPlugin`
>>>>>>> 2a79b6b70d9af5bbff0bb3f044dcb2d575090ce5

此插件用于在单独的 webpack 配置中创建一个 dll-only-bundle。 此插件会生成一个名为 `manifest.json` 的文件，这个文件是用于让 [`DllReferencePlugin`](#dllreferenceplugin) 能够映射到相应的依赖上。

<<<<<<< HEAD
- `context`（可选）： manifest 文件中请求的 context (默认值为 webpack 的 context)
- `format` (boolean = false)：如果为 `true`，则 manifest json 文件 (输出文件) 将被格式化。
- `name`：暴露出的 DLL 的函数名（[TemplatePaths](https://github.com/webpack/webpack/blob/master/lib/TemplatedPathPlugin.js)：`[fullhash]` & `[name]` ）
- `path`：manifest.json 文件的 __绝对路径__（输出文件）
- `entryOnly` (boolean = true)：如果为 `true`，则仅暴露入口
- `type`：dll bundle 的类型
=======
- `context` (optional): context of requests in the manifest file (defaults to the webpack context.)
- `format` (boolean = false): If `true`, manifest json file (output) will be formatted.
- `name`: name of the exposed dll function ([TemplatePaths](https://github.com/webpack/webpack/blob/master/lib/TemplatedPathPlugin.js): `[fullhash]` & `[name]` )
- `path`: **absolute path** to the manifest json file (output)
- `entryOnly` (boolean = true): if `true`, only entry points will be exposed
- `type`: type of the dll bundle
>>>>>>> 2a79b6b70d9af5bbff0bb3f044dcb2d575090ce5

```javascript
new webpack.DllPlugin(options);
```

W> 我们建议 DllPlugin 只在 `entryOnly: true` 时使用，否则 DLL 中的 tree shaking 将无法工作，因为所有 exports 均可使用。

在给定的 `path` 路径下创建一个 `manifest.json` 文件。这个文件包含了从 require 和 import 中 request 到模块 id 的映射。 `DllReferencePlugin` 也会用到这个文件。

此插件与 [`output.library`](/configuration/output/#outputlibrary) 的选项相结合可以暴露出（也称为放入全局作用域）dll 函数。

<<<<<<< HEAD

## `DllReferencePlugin` {#dllreferenceplugin}
=======
## `DllReferencePlugin`
>>>>>>> 2a79b6b70d9af5bbff0bb3f044dcb2d575090ce5

此插件配置在 webpack 的主配置文件中，此插件会把 dll-only-bundles 引用到需要的预编译的依赖中。

<<<<<<< HEAD
- `context`：（__绝对路径__） manifest (或者是内容属性)中请求的上下文
- `extensions`：用于解析 dll bundle 中模块的扩展名 (仅在使用 'scope' 时使用)。
- `manifest` ：包含 `content` 和 `name` 的对象，或者是一个字符串 —— 编译时用于加载 JSON manifest 的绝对路径
- `content` (可选)： 请求到模块 id 的映射（默认值为 `manifest.content`）
- `name` (可选)：dll 暴露地方的名称（默认值为 `manifest.name`）（可参考[`externals`](/configuration/externals/)）
- `scope` (可选)：dll 中内容的前缀
- `sourceType` (可选)：dll 是如何暴露的 ([libraryTarget](/configuration/output/#outputlibrarytarget))
=======
- `context`: (**absolute path**) context of requests in the manifest (or content property)
- `extensions`: Extensions used to resolve modules in the dll bundle (only used when using 'scope').
- `manifest` : an object containing `content` and `name` or a string to the absolute path of the JSON manifest to be loaded upon compilation
- `content` (optional): the mappings from request to module id (defaults to `manifest.content`)
- `name` (optional): an identifier where the dll is exposed (defaults to `manifest.name`) (see also [`externals`](/configuration/externals/))
- `scope` (optional): prefix which is used for accessing the content of the dll
- `sourceType` (optional): how the dll is exposed ([libraryTarget](/configuration/output/#outputlibrarytarget))
>>>>>>> 2a79b6b70d9af5bbff0bb3f044dcb2d575090ce5

```javascript
new webpack.DllReferencePlugin(options);
```

通过引用 dll 的 manifest 文件来把依赖的名称映射到模块的 id 上，之后再在需要的时候通过内置的 `__webpack_require__` 函数来 `require` 对应的模块

W> 保持 `name` 与 [`output.library`](/configuration/output/#outputlibrary) 一致。

<<<<<<< HEAD

### 模式(Modes) {#modes}
=======
### Modes
>>>>>>> 2a79b6b70d9af5bbff0bb3f044dcb2d575090ce5

这个插件支持两种模式，分别是作用域（_scoped_）和映射（_mapped_）。

#### Scoped Mode {#scoped-mode}

dll 中的内容可以使用模块前缀的方式引用，举例来说，设置 `scope = 'xyz'`，这个 dll 中的名为 `abc` 的文件可以通过 `require('xyz/abc')` 来获取。

T> [查看 scope 的使用示例](https://github.com/webpack/webpack/tree/master/examples/dll-user)

#### Mapped Mode {#mapped-mode}

dll 中的内容会被映射到当前目录下。如果被 `require` 的文件与 dll 中的某个文件匹配（解析之后），那么这个 dll 中的文件就会被使用。

由于这是在解析了 dll 中每个文件之后才触发的，因此相同的路径必须能够确保这个 dll bundle 的使用者（不一定是人，可指某些代码）有权限访问。 举例来说， 假如一个 dll bundle 中含有 `loadash` 库以及文件 `abc`， 那么 `require("lodash")` 和 `require("./abc")` 都不会被编译进主 bundle 文件中，而是会被 dll 所使用。

<<<<<<< HEAD

## 用法(Usage) {#usage}
=======
## Usage
>>>>>>> 2a79b6b70d9af5bbff0bb3f044dcb2d575090ce5

W> `DllReferencePlugin` 和 `DllPlugin` 都是在 _单独的_ webpack 配置中使用的。

**webpack.vendor.config.js**

```javascript
const path = require('path');

new webpack.DllPlugin({
  context: __dirname,
  name: '[name]_[fullhash]',
  path: path.join(__dirname, 'manifest.json'),
});
```

**webpack.app.config.js**

```javascript
new webpack.DllReferencePlugin({
  context: __dirname,
  manifest: require('./manifest.json'),
  scope: 'xyz',
  sourceType: 'commonjs2',
});
```

<<<<<<< HEAD

## 示例 {#examples}
=======
## Examples
>>>>>>> 2a79b6b70d9af5bbff0bb3f044dcb2d575090ce5

[Vendor](https://github.com/webpack/webpack/tree/master/examples/dll) 和 [User](https://github.com/webpack/webpack/tree/master/examples/dll-user)

_两个单独的用例，用来分别演示作用域（scope）和上下文（context）。_

T> 多个 `DllPlugins` 和 `DllReferencePlugins`。

<<<<<<< HEAD

## 参考 {#references}
=======
## References
>>>>>>> 2a79b6b70d9af5bbff0bb3f044dcb2d575090ce5

### Source {#source}

- [DllPlugin source](https://github.com/webpack/webpack/blob/master/lib/DllPlugin.js)
- [DllReferencePlugin source](https://github.com/webpack/webpack/blob/master/lib/DllReferencePlugin.js)
- [DllEntryPlugin source](https://github.com/webpack/webpack/blob/master/lib/DllEntryPlugin.js)
- [DllModuleFactory source](https://github.com/webpack/webpack/blob/master/lib/DllModuleFactory.js)
- [ManifestPlugin source](https://github.com/webpack/webpack/blob/master/lib/LibManifestPlugin.js)

### Tests {#tests}

- [DllPlugin creation test](https://github.com/webpack/webpack/blob/master/test/configCases/dll-plugin/0-create-dll/webpack.config.js)
- [DllPlugin without scope test](https://github.com/webpack/webpack/blob/master/test/configCases/dll-plugin/2-use-dll-without-scope/webpack.config.js)
- [DllReferencePlugin use Dll test](https://github.com/webpack/webpack/tree/master/test/configCases/dll-plugin)
