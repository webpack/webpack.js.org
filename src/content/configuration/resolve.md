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

这些选项能设置模块如何被解析。webpack 提供合理的默认值，但是还是可能会修改一些解析的细节。关于 resolver 具体如何工作的更多解释说明，请查看[模块解析方式](/concepts/module-resolution)。


## `resolve`

`object`

配置模块如何解析。例如，当在 ES2015 中调用 `import "lodash"`，`resolve` 选项能够对 webpack 查找 `"lodash"` 的方式去做修改（查看[`模块`](#resolve-modules)）。


### `resolve.alias`

`object`

创建 `import` 或 `require` 的别名，来确保模块引入变得更简单。例如，一些位于 `src/` 文件夹下的常用模块：

``` js
alias: {
  Utilities: path.resolve(__dirname, 'src/utilities/'),
  Templates: path.resolve(__dirname, 'src/templates/')
}
```

现在，替换「在导入时使用相对路径」这种方式，就像这样：

``` js
import Utility from '../../utilities/utility';
```

你可以这样使用别名：

``` js
import Utility from 'Utilities/utility';
```

也可以在给定对象的键后的末尾添加 `$`，以表示精准匹配：

``` js
alias: {
  xyz$: path.resolve(__dirname, 'path/to/file.js')
}
```

这将产生以下结果：

``` js
import Test1 from 'xyz'; // 精确匹配，所以 path/to/file.js 被解析和导入
import Test2 from 'xyz/file.js'; // 精确匹配，触发普通解析
```

下面的表格展示了一些其他情况：

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


### `resolve.aliasFields`

`string`

指定一个字段，例如 `browser`，根据[此规范](https://github.com/defunctzombie/package-browser-field-spec)进行解析。默认：

``` js
aliasFields: ["browser"]
```


### `resolve.cacheWithContext`

`boolean` (since webpack 3.1.0)

If unsafe cache is enabled, includes `request.context` in the cache key. This option is taken into account by the [`enhanced-resolve`](https://github.com/webpack/enhanced-resolve/) module. Since webpack 3.1.0 context in resolve caching is ignored when resolve or resolveLoader plugins are provided. This addresses a performance regression.


### `resolve.descriptionFiles`

`array`

用于描述的 JSON 文件。默认：

``` js
descriptionFiles: ["package.json"]
```


### `resolve.enforceExtension`

`boolean`

如果是 `true`，将不允许无扩展名(extension-less)文件。默认如果 `./foo` 有 `.js` 扩展，`require('./foo')` 可以正常运行。但如果启用此选项，只有 `require('./foo.js')` 能够正常工作。默认：

```js
enforceExtension: false
```


### `resolve.enforceModuleExtension`

`boolean`

对模块是否需要使用的扩展（例如 loader）。默认：

``` js
enforceModuleExtension: false
```


### `resolve.extensions`

`array`

自动解析确定的扩展。默认值为：

``` js
extensions: [".js", ".json"]
```

能够使用户在引入模块时不带扩展：

``` js
import File from '../path/to/file'
```

W> 使用此选项，会**覆盖默认数组**，这就意味着 webpack 将不再尝试使用默认扩展来解析模块。对于使用其扩展导入的模块，例如，`import SomeFile from "./somefile.ext"`，要想正确的解析，一个包含“\*”的字符串必须包含在数组中。


### `resolve.mainFields`

`array`

当从 npm 包中导入模块时（例如，`import * as D3 from "d3"`），此选项将决定在 `package.json` 中使用哪个字段导入模块。根据 webpack 配置中指定的 [`target`](/concepts/targets) 不同，默认值也会有所不同。

当 `target` 属性设置为 `webworker`, `web` 或者没有指定，默认值为：


``` js
mainFields: ["browser", "module", "main"]
```

对于其他任意的 target（包括 `node`），默认值为：

``` js
mainFields: ["module", "main"]
```

例如，[D3](https://d3js.org/) 的 `package.json` 含有这些字段：

``` js
{
  ...
  main: 'build/d3.Node.js',
  browser: 'build/d3.js',
  module: 'index',
  ...
}
```

这意味着当我们 `import * as D3 from "d3"`，实际从 `browser` 属性解析文件。在这里 `browser` 属性是最优先选择的，因为它是 `mainFields` 的第一项。同时，由 webpack 打包的 Node.js 应用程序默认会从 `module` 字段中解析文件。


### `resolve.mainFiles`

`array`

解析目录时要使用的文件名。默认：

``` js
mainFiles: ["index"]
```


### `resolve.modules`

`array`

告诉 webpack 解析模块时应该搜索的目录。

绝对路径和相对路径都能使用，但是要知道它们之间有一点差异。

通过查看当前目录以及祖先路径（即 `./node_modules`, `../node_modules` 等等），相对路径将类似于 Node 查找 'node_modules' 的方式进行查找。

使用绝对路径，将只在给定目录中搜索。

`resolve.modules` defaults to:

``` js
modules: ["node_modules"]
```

如果你想要添加一个目录到模块搜索目录，此目录优先于 `node_modules/` 搜索：

``` js
modules: [path.resolve(__dirname, "src"), "node_modules"]
```


### `resolve.unsafeCache`

`regex` `array` `boolean`

启用，会主动缓存模块，但并**不安全**。传递 `true` 将缓存一切。默认：

``` js
unsafeCache: true
```

正则表达式，或正则表达式数组，可以用于匹配文件路径或只缓存某些模块。例如，只缓存 utilities 模块：

``` js
unsafeCache: /src\/utilities/
```

W> 修改缓存路径可能在极少数情况下导致失败。


## `resolve.plugins`

应该使用的额外的解析插件列表。它允许插件，如 [`DirectoryNamedWebpackPlugin`](https://www.npmjs.com/package/directory-named-webpack-plugin)。

``` js
plugins: [
  new DirectoryNamedWebpackPlugin()
]
```


## `resolve.symlinks`

`boolean`

是否将符号链接(symlink)解析到它们的符号链接位置(symlink location)。默认：

```js
symlinks: true
```


## `resolve.cachePredicate`

`function`

决定请求是否应该被缓存的函数。函数传入一个带有 `path` 和 `request` 属性的对象。默认：

```js
cachePredicate: function() { return true }
```


## `resolveLoader`

`object`

这组选项与上面的 `resolve` 对象的属性集合相同，但仅用于解析 webpack 的 [loader](/concepts/loaders) 包。默认：

``` js
{
  modules: [ 'node_modules' ],
  extensions: [ '.js', '.json' ],
  mainFields: [ 'loader', 'main' ]
}
```

T> 注意，这里你可以使用别名，并且其他特性类似于 resolve 对象。例如，`{ txt: 'raw-loader' }` 会使用 `raw-loader` 去 shim(填充) `txt!templates/demo.txt`。


## `resolveLoader.moduleExtensions`

`array`

The extensions/suffixes which that are used when resolving loaders. Since version two, we [strongly recommend](/guides/migrating#automatic-loader-module-name-extension-removed) using the full name, e.g. `example-loader`, as much as possible for clarity. However, if you really wanted to exclude the `-loader` bit, i.e. just use `example`, you can use this option to do so:

``` js
moduleExtensions: [ '-loader' ]
```

***

> 原文：https://webpack.js.org/configuration/resolve/
