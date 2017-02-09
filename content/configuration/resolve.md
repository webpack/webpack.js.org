---
title: 解析(Resolve)
sort: 7
contributors:
  - sokra
  - skipjack
  - SpaceK33z
  - pksjce
  - sebastiandeutsch
---

这些选项能设置模块如何被解析。webpack 提供合理的默认值，但是还是可能会修改一些解析的细节。
关于 resolver 具体如何工作的更多解释说明，请查看[模块解析方式](/concepts/module-resolution)。

## `resolve`

`object`

配置模块如何解析。例如，当在 ES2015 中调用 `import "lodash"`，`resolve` 选项能够对 webpack 查找 `"lodash"` 的方式去做修改（查看[`模块`](#resolve-modules)）。

## `resolve.alias`

`object`

创建 `import` 或 `require` 的别名，来确保模块引入变得更简单。例如，一些位于 `src/` 文件夹下的常用模块：

```js
alias: {
  Utilities: path.resolve(__dirname, 'src/utilities/'),
  Templates: path.resolve(__dirname, 'src/templates/')
}
```

现在，替换「在导入时使用相对路径」这种方式，就像这样：

```js
import Utility from '../../utilities/utility';
```

你可以这样使用别名：

```js
import Utility from 'Utilities/utility';
```

也可以在给定对象的键后的末尾添加 `$`，以表示精准匹配：

```js
alias: {
  xyz$: path.resolve(__dirname, 'path/to/file.js')
}
```

这将产生以下结果：

```js
import Test1 from 'xyz'; // 成功，file.js 被解析和导入。
import Test2 from 'xyz/file.js'; // 错误，/path/to/file.js/file.js 是无效的
```

下面的表格展示了许多情况：

| `别名：` | `import "xyz"` | `import "xyz/file.js"` |
| -------- | ---------------- | -------------------------|
| `{}` | `/abc/node_modules/xyz/index.js` | `/abc/node_modules/xyz/file.js` |
| `{ xyz: "/abs/path/to/file.js" }` | `/abs/path/to/file.js` | error |
| `{ xyz$: "/abs/path/to/file.js" }` | `/abs/path/to/file.js` | `/abc/node_modules/xyz/file.js` |
| `{ xyz: "./dir/file.js" }` | `/abc/dir/file.js` | error |
| `{ xyz$: "./dir/file.js" }` | `/abc/dir/file.js` | `/abc/node_modules/xyz/file.js` |
| `{ xyz: "/some/dir" }` | `/some/dir/index.js` | `/some/dir/file.js` |
| `{ xyz$: "/some/dir" }` | `/some/dir/index.js` | `/abc/node_modules/xyz/file.js` |
| `{ xyz: "./dir" }` | `/abc/dir/index.js` | `/abc/dir/file.js` |
| `{ xyz: "modu" }` | `/abc/node_modules/modu/index.js` | `/abc/node_modules/modu/file.js` |
| `{ xyz$: "modu" }` | `/abc/node_modules/modu/index.js` | `/abc/node_modules/xyz/file.js` |
| `{ xyz: "modu/some/file.js" }` | `/abc/node_modules/modu/some/file.js` | error |
| `{ xyz: "modu/dir" }` | `/abc/node_modules/modu/dir/index.js` | `/abc/node_modules/dir/file.js` |
| `{ xyz: "xyz/dir" }` | `/abc/node_modules/xyz/dir/index.js` | `/abc/node_modules/xyz/dir/file.js` |
| `{ xyz$: "xyz/dir" }` | `/abc/node_modules/xyz/dir/index.js` | `/abc/node_modules/xyz/file.js` |

如果在 `package.json` 中定义，`index.js` 可能会被解析为另一个文件。

`/abc/node_modules` 也可能在 `/node_modules` 中解析。


## `resolve.aliasFields`

`string`

指定一个字段，例如 `browser`，根据[此规范](https://github.com/defunctzombie/package-browser-field-spec)进行解析。默认：

```js
aliasFields: ["browser"]
```


## `resolve.descriptionFiles`

`array`

用于描述的 JSON 文件。默认：

```js
descriptionFiles: ["package.json"]
```


## `resolve.enforceExtension`

`boolean`

如果是 `true`，将不允许无扩展名(extension-less)文件。默认如果 `./foo` 有 `.js` 扩展，`require('./foo')` 可以正常运行。但如果启用此选项，只有 `require('./foo.js')` 能够正常工作。默认：

```js
enforceExtension: false
```


## `resolve.enforceModuleExtension`

`boolean`

对模块是否需要使用的扩展（例如 loader）。默认：

```js
enforceModuleExtension: false
```


## `resolve.extensions`

`array`

自动解析确定的扩展。默认值为：

```js
extensions: [".js", ".json"]
```

能够使用户在引入模块时不带扩展：

```js
import File from '../path/to/file'
```

W> 使用此选项，会**覆盖默认数组**，这就意味着 webpack 将不再尝试使用默认扩展来解析模块。对于使用其扩展导入的模块，例如，`import SomeFile from "./somefile.ext"`，要想正确的解析，一个包含“\*”的字符串必须包含在数组中。


## `resolve.mainFields`

`array`

When importing from an npm package, e.g. `import * as D3 from "d3"`, this option will determine which fields in it's `package.json` are checked. The default values will vary based upon the [`target`](/concepts/targets) specified in your webpack configuration.

When the `target` property is set to `webworker`, `web`, or left unspecified:


```js
mainFields: ["browser", "module", "main"]
```

For any other target (including `node`):

```js
mainFields: ["module", "main"]
```

For example, the `package.json` of [D3](https://d3js.org/) contains these fields:

```js
{
  ...
  main: 'build/d3.Node.js',
  browser: 'build/d3.js',
  module: 'index',
  ...
}
```

This means that when we `import * as D3 from "d3"` this will really resolve to the file in the `browser` property. The `browser` property takes precedence here because it's the first item in `mainFields`. Meanwhile, a Node.js application bundled by webpack will resolve by default to the file in the `module` field.


## `resolve.mainFiles`

`array`

The filename to be used while resolving directories. Default:

```js
mainFiles: ["index"]
```


## `resolve.modules`

`array`

Tell webpack what directories should be searched when resolving modules.

Absolute and relative paths can both be used, but be aware that they will behave a bit differently.

A relative path will be scanned simarly to how Node scans for `node_modules`, by looking through the current directory as well as it's ancestors (i.e. `./node_modules`, `../node_modules`, and on).

With an absolute path, it will only search in the given directory.

`resolve.modules` defaults to:

```js
modules: ["node_modules"]
```

If you want to add a directory to search in that takes precedences over `node_modules/`:

```js
modules: [path.resolve(__dirname, "src"), "node_modules"]
```


## `resolve.unsafeCache`

`regex` `array` `boolean`

Enable aggressive, but **unsafe**, caching of modules. Passing `true` will cache everything. Default:

```js
unsafeCache: true
```

A regular expression, or an array of regular expressions, can be used to test file paths and only cache certain modules. For example, to only cache utilities:

```js
unsafeCache: /src\/utilities/
```

W> Changes to cached paths may cause failure in rare cases.


## `resolveLoader`

`object`

This set of options is identical to the `resolve` property set above, but is used only to resolve webpack's [loader](/concepts/loaders) packages. Default:

```js
{
    modules: ["web_loaders", "web_modules", "node_loaders", "node_modules"],
    extensions: [".webpack-loader.js", ".web-loader.js", ".loader.js", ".js"],
    packageMains: ["webpackLoader", "webLoader", "loader", "main"]
}
```

T> Note that you can use alias here and other features familiar from resolve. For example `{ txt: 'raw-loader' }` would shim `txt!templates/demo.txt` to use `raw-loader`.


## `resolveLoader.moduleExtensions`

`array`

The extensions which are tried when resolving a module (e.g. loaders). By default this is an empty array.

If you want to use loaders without the `-loader` suffix, you can use this:

```js
moduleExtensions: ['-loader']
```


## `resolve.plugins`

A list of additional resolve plugins which should be applied. It allows plugins such as [`DirectoryNamedWebpackPlugin`](https://www.npmjs.com/package/directory-named-webpack-plugin).

```js
plugins: [new DirectoryNamedWebpackPlugin()]
```


## `resolve.symlinks`

`boolean`

Whether to resolve symlinks to their symlinked location. Default:

```js
symlinks: true
```


## `resolve.cachePredicate`

`function`

A function which decides whether a request should be cached or not. An object is passed to the function with `path` and `request` properties. Default:

```js
cachePredicate: function() { return true }
```

***

> 原文：https://webpack.js.org/configuration/resolve/
