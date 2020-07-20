---
title: 输出(output)
sort: 6
contributors:
  - sokra
  - skipjack
  - tomasAlabes
  - mattce
  - irth
  - fvgs
  - dhurlburtusa
  - MagicDuck
  - fadysamirsadek
  - byzyk
  - madhavarshney
  - harshwardhansingh
  - eemeli
  - EugeneHlushko
  - g-plane
  - smelukov
  - Neob91
  - anikethsaha
  - jamesgeorge007
  - hiroppy
  - chenxsan
  - snitin315
---

`output` 位于对象最顶级键(key)，包括了一组选项，指示 webpack 如何去输出、以及在哪里输出你的「bundle、asset 和其他你所打包或使用 webpack 载入的任何内容」。


## `output.auxiliaryComment` {#outputauxiliarycomment}

`string` `object`

在和 [`output.library`](#outputlibrary) 和 [`output.libraryTarget`](#outputlibrarytarget) 一起使用时，此选项允许用户向导出容器(export wrapper)中插入注释。要为 `libraryTarget` 每种类型都插入相同的注释，将 `auxiliaryComment` 设置为一个字符串：

__webpack.config.js__

```javascript
module.exports = {
  //...
  output: {
    library: 'someLibName',
    libraryTarget: 'umd',
    filename: 'someLibName.js',
    auxiliaryComment: 'Test Comment'
  }
};
```

将会生成如下：

__someLibName.js__

```javascript
(function webpackUniversalModuleDefinition(root, factory) {
  // Test Comment
  if(typeof exports === 'object' && typeof module === 'object')
    module.exports = factory(require('lodash'));
  // Test Comment
  else if(typeof define === 'function' && define.amd)
    define(['lodash'], factory);
  // Test Comment
  else if(typeof exports === 'object')
    exports['someLibName'] = factory(require('lodash'));
  // Test Comment
  else
    root['someLibName'] = factory(root['_']);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
  // ...
});
```

对于 `libraryTarget` 每种类型的注释进行更细粒度地控制，请传入一个对象：

__webpack.config.js__

```javascript
module.exports = {
  //...
  output: {
    //...
    auxiliaryComment: {
      root: 'Root Comment',
      commonjs: 'CommonJS Comment',
      commonjs2: 'CommonJS2 Comment',
      amd: 'AMD Comment'
    }
  }
};
```


## `output.chunkFilename` {#outputchunkfilename}

`string = '[id].js'`

此选项决定了非入口(non-entry) chunk 文件的名称。有关可取的值的详细信息，请查看 [`output.filename`](#outputfilename) 选项。

注意，这些文件名需要在运行时根据 chunk 发送的请求去生成。因此，需要在 webpack runtime 输出 bundle 值时，将 chunk id 的值对应映射到占位符(如 `[name]` 和 `[chunkhash]`)。这会增加文件大小，并且在任何 chunk 的占位符值修改后，都会使 bundle 失效。

默认使用 `[id].js` 或从 [`output.filename`](#outputfilename) 中推断出的值（`[name]` 会被预先替换为 `[id]` 或 `[id].`）。

__webpack.config.js__

```javascript
module.exports = {
  //...
  output: {
    //...
    chunkFilename: '[id].js'
  }
};
```


## `output.chunkLoadTimeout` {#outputchunkloadtimeout}

`number = 120000`

chunk 请求到期之前的毫秒数，默认为 120000。从 webpack 2.6.0 开始支持此选项。

__webpack.config.js__

```javascript
module.exports = {
  //...
  output: {
    //...
    chunkLoadTimeout: 30000
  }
};
```


## `output.chunkCallbackName` {#outputchunkcallbackname}

`string = 'webpackChunkwebpack'`

回调函数的名称在 Web Workers 环境中 webpack 加载 chunks 时使用。

__webpack.config.js__

```javascript
module.exports = {
  //...
  output: {
    //...
    chunkCallbackName: 'myCustomFunc'
  }
};
```


## `output.crossOriginLoading` {#outputcrossoriginloading}

`boolean = false` `string: 'anonymous' | 'use-credentials'`

告诉 webpack 启用 [cross-origin 属性](https://developer.mozilla.org/en/docs/Web/HTML/Element/script#attr-crossorigin) 加载 chunk。仅在 [`target`](/configuration/target/) 设置为 `'web'` 时生效，通过使用 JSONP 来添加脚本标签，实现按需加载模块。

- `'anonymous'` - __不带凭据(credential)__ 启用跨域加载
- `'use-credentials'` - __携带凭据(credential)__ 启用跨域加载


## `output.devtoolFallbackModuleFilenameTemplate` {#outputdevtoolfallbackmodulefilenametemplate}

`string` `function (info)`

当上面的模板字符串或函数产生重复时使用的备用内容。

查看 [`output.devtoolModuleFilenameTemplate`](#outputdevtoolmodulefilenametemplate)。


## `output.devtoolModuleFilenameTemplate` {#outputdevtoolmodulefilenametemplate}

`string = 'webpack://[namespace]/[resource-path]?[loaders]'` `function (info) => string`

此选项仅在 「[`devtool`](/configuration/devtool) 使用了需要模块名称的选项」时使用。

自定义每个 source map 的 `sources` 数组中使用的名称。可以通过传递模板字符串(template string)或者函数来完成。例如，当使用 `devtool: 'eval'`，默认值是：

__webpack.config.js__

```javascript
module.exports = {
  //...
  output: {
    devtoolModuleFilenameTemplate: 'webpack://[namespace]/[resource-path]?[loaders]'
  }
};
```

模板字符串(template string)中做以下替换（通过 webpack 内部的 [`ModuleFilenameHelpers`](https://github.com/webpack/webpack/blob/master/lib/ModuleFilenameHelpers.js)）：

| Template                 | Description |
| ------------------------ | ----------- |
| [absolute-resource-path] | 绝对路径文件名|
| [all-loaders]            | 自动和显式的 loader，并且参数取决于第一个 loader 名称|
| [hash]                   | 模块标识符的 hash|
| [id]                     | 模块标识符|
| [loaders]                | 显式的 loader，并且参数取决于第一个 loader 名称|
| [resource]               | 用于解析文件的路径和用于第一个 loader 的任意查询参数|
| [resource-path]          | 不带任何查询参数，用于解析文件的路径|
| [namespace]              | 模块命名空间。在构建成为一个 library 之后，通常也是 library 名称，否则为空|

当使用一个函数，同样的选项要通过 `info` 参数并使用驼峰式(camel-cased)：

```javascript
module.exports = {
  //...
  output: {
    devtoolModuleFilenameTemplate: info => {
      return `webpack:///${info.resourcePath}?${info.loaders}`;
    }
  }
};
```

如果多个模块产生相同的名称，使用 [`output.devtoolFallbackModuleFilenameTemplate`](#outputdevtoolfallbackmodulefilenametemplate) 来代替这些模块。


## `output.devtoolNamespace` {#outputdevtoolnamespace}

`string`

此选项确定 [`output.devtoolModuleFilenameTemplate`](#outputdevtoolmodulefilenametemplate) 使用的模块名称空间。未指定时的默认值为：[`output.library`](#outputlibrary)。在加载多个通过 webpack 构建的 library 时，用于防止 source map 中源文件路径冲突。

例如，如果你有两个 library，分别使用命名空间 `library1` 和 `library2`，并且都有一个文件 `./src/index.js`（可能具有不同内容），它们会将这些文件暴露为 `webpack://library1/./src/index.js` 和 `webpack://library2/./src/index.js`。


## `output.filename` {#outputfilename}

`string` `function (pathData, assetInfo) => string`

此选项决定了每个输出 bundle 的名称。这些 bundle 将写入到 [`output.path`](#outputpath) 选项指定的目录下。

对于单个[`入口`](/configuration/entry-context#entry)起点，filename 会是一个静态名称。

__webpack.config.js__

```javascript
module.exports = {
  //...
  output: {
    filename: 'bundle.js'
  }
};
```

然而，当通过多个入口起点(entry point)、代码拆分(code splitting)或各种插件(plugin)创建多个 bundle，应该使用以下一种替换方式，来赋予每个 bundle 一个唯一的名称……

使用入口名称：

__webpack.config.js__

```javascript
module.exports = {
  //...
  output: {
    filename: '[name].bundle.js'
  }
};
```

使用内部 chunk id

__webpack.config.js__

```javascript
module.exports = {
  //...
  output: {
    filename: '[id].bundle.js'
  }
};
```

使用每次构建过程中，唯一的 hash 生成

__webpack.config.js__

```javascript
module.exports = {
  //...
  output: {
    filename: '[name].[hash].bundle.js'
  }
};
```

使用基于每个 chunk 内容的 hash：

__webpack.config.js__

```javascript
module.exports = {
  //...
  output: {
    filename: '[chunkhash].bundle.js'
  }
};
```

Using hashes generated for extracted content:

__webpack.config.js__

```javascript
module.exports = {
  //...
  output: {
    filename: '[contenthash].bundle.css'
  }
};
```

Using function to return the filename:

__webpack.config.js__

```javascript
module.exports = {
  //...
  output: {
    filename: (pathData) => {
      return pathData.chunk.name === 'main' ? '[name].js': '[name]/[name].js';
    },
  }
};
```

请确保已阅读过 [指南 - 缓存](/guides/caching) 的详细信息。这里涉及更多步骤，不仅仅是设置此选项。

注意此选项被称为文件名，但是你还是可以使用像 `'js/[name]/bundle.js'` 这样的文件夹结构。

注意，此选项不会影响那些「按需加载 chunk」的输出文件。对于这些文件，请使用 [`output.chunkFilename`](#outputchunkfilename) 选项来控制输出。通过 loader 创建的文件也不受影响。在这种情况下，你必须尝试 loader 特定的可用选项。

## Template strings {#template-strings}

可以使用以下替换模板字符串（通过 webpack 内部的[`TemplatedPathPlugin`](https://github.com/webpack/webpack/blob/master/lib/TemplatedPathPlugin.js)）:

| 模板        | 描述                                                                         |
| ------------- | ----------------------------------------------------------------------------------- |
| [hash]        | 模块标识符(module identifier)的 hash                                                   |
| [contenthash] | 文件内容 hash，每个资源生成的 hash 都是不同的               |
| [chunkhash] | chunk 内容的 hash                                                       |
| [name]        | 模块名称                                                                     |
| [id]          | 模块标识符(module identifier)                                                               |
| [query]       | 模块的 query，例如，文件名 `?` 后面的字符串                    |
| [function]    | The function, which can return filename [string]                                    |

`[hash]` 和 `[chunkhash]` 的长度可以使用 `[hash:16]`（默认为 20）来指定。或者，通过指定[`output.hashDigestLength`](#outputhashdigestlength) 在全局配置长度。

当你要在实际文件名中使用占位符时，webpack 会过滤出需要替换的占位符。例如，输出一个文件 `[name].js`， 你必须通过在括号之间添加反斜杠来转义`[name]`占位符。 因此，`[\name\]` 生成 `[name]` 而不是 `name`。

例如：`[\id\]` 生成 `[id]` 而不是 `id`。

如果将这个选项设为一个函数，函数将返回一个包含上面表格中替换信息的对象。

T> 在使用 [`ExtractTextWebpackPlugin`](/plugins/extract-text-webpack-plugin) 时，可以用 `[contenthash]` 来获取提取文件的 hash（既不是 `[hash]` 也不是 `[chunkhash]`）。

## `output.assetModuleFilename` {#outputassetmodulefilename}

参考 [`output.filename`](#outputfilename) 不过应用于 [Asset Modules](/guides/asset-modules/)

## `output.globalObject` {#outputglobalobject}

`string = 'window'`

When targeting a library, especially when `libraryTarget` is `'umd'`, this option indicates what global object will be used to mount the library. To make UMD build available on both browsers and Node.js, set `output.globalObject` option to `'this'`.

For example:

__webpack.config.js__

```javascript
module.exports = {
  // ...
  output: {
    library: 'myLib',
    libraryTarget: 'umd',
    filename: 'myLib.js',
    globalObject: 'this'
  }
};
```

## `output.uniqueName` {#outputuniquename}

`string`

在全局环境下为防止多个 webpack 运行时 冲突所使用的唯一名称。默认使用 [`output.library`](/configuration/output/#outputlibrary) 名称或者上下文中的 `package.json` 的 包名称(package name)， 如果两者都不存在，值为 `''`。

`output.uniqueName` 将用于生成唯一全局变量:

- [`output.jsonpFunction`](/configuration/output/#outputjsonpfunction)
- [`output.chunkCallbackName`](/configuration/output/#outputchunkcallbackname)

__webpack.config.js__

```javascript
module.exports = {
  // ...
  output: {
    uniqueName: 'my-package-xyz'
  }
};
```


## `output.hashDigest` {#outputhashdigest}

`string = 'hex'`

在生成 hash 时使用的编码方式。支持 Node.js [`hash.digest`](https://nodejs.org/api/crypto.html#crypto_hash_digest_encoding) 的所有编码。对文件名使用 `'base64'`，可能会出现问题，因为 base64 字母表中具有 `/` 这个字符(character)。同样的，`'latin1'` 规定可以含有任何字符(character)。


## `output.hashDigestLength` {#outputhashdigestlength}

`number = 20`

散列摘要的前缀长度。


## `output.hashFunction` {#outputhashfunction}

`string = 'md4'` `function`

散列算法。支持 Node.JS [`crypto.createHash`](https://nodejs.org/api/crypto.html#crypto_crypto_createhash_algorithm_options) 的所有功能。从 `4.0.0-alpha2` 开始，`hashFunction` 现在可以是一个返回自定义 hash 的构造函数。出于性能原因，你可以提供一个不加密的哈希函数(non-crypto hash function)。

```javascript
module.exports = {
  //...
  output: {
    hashFunction: require('metrohash').MetroHash64
  }
};
```

确保 hash 函数有可访问的 `update` 和 `digest` 方法。

## `output.hashSalt` {#outputhashsalt}

一个可选的加盐值，通过 Node.JS [`hash.update`](https://nodejs.org/api/crypto.html#crypto_hash_update_data_inputencoding) 来更新哈希。


## `output.hotUpdateChunkFilename` {#outputhotupdatechunkfilename}

`string = '[id].[hash].hot-update.js'`

自定义热更新 chunk 的文件名。可选的值的详细信息，请查看 [`output.filename`](#outputfilename) 选项。

占位符只能是 `[id]` 和 `[hash]`，默认值是：

__webpack.config.js__

```javascript
module.exports = {
  //...
  output: {
    hotUpdateChunkFilename: '[id].[hash].hot-update.js'
  }
};
```

T> 通常，你不需要修改 `output.hotUpdateChunkFilename`.

## `output.hotUpdateFunction` {#outputhotupdatefunction}

`string`

只在 [`target`](/configuration/target/) 设置为 `'web'` 时使用，用于加载热更新(hot update)的 JSONP 函数。

JSONP 函数用于异步加载(async load)热更新(hot-update) chunk。

详细请查看 [`output.jsonpFunction`](#outputjsonpfunction)。


## `output.hotUpdateMainFilename` {#outputhotupdatemainfilename}

`string = '[hash].hot-update.json'` `function`

自定义热更新的主文件名(main filename)。`[hash]` 是唯一可用的占位符。

T> 通常，你不需要修改 `output.hotUpdateMainFilename`.

## `output.jsonpFunction` {#outputjsonpfunction}

`string = 'webpackJsonp'`

仅在 [`target`](/configuration/target/) 设置为 `'web'` 时生效，通过使用 JSONP 来实现按需加载模块。

JSONP 函数用于异步加载 chunk，或者拼接多个初始 chunk(SplitChunksPlugin, AggressiveSplittingPlugin)。

如果使用了 [`output.library`](#outputlibrary) 选项，library 名称会自动与 `output.jsonpFunction` 的值拼接在一起。

W> 如果在同一网页中使用了多个（来自不同 compilation 的）webpack runtime，在全局名称空间中存在 on-demand chunk(按需 chunk) 冲突的风险。

默认的 on-demand chunk 的输出以如下开始：

__example-on-demand-chunk.js__

```javascript
(window.webpackJsonp = window.webpackJsonp || []).push(/* ... */);
```

修改 `output.jsonpFunction` 以安全使用同一网页上的多个 webpack runtime：

__webpack.config.flight-widget.js__

```javascript
module.exports = {
  //...
  output: {
    jsonpFunction: 'wpJsonpFlightsWidget'
  }
};
```

On-demand chunks content would now change to:

__example-on-demand-chunk.js__

```javascript
(window.wpJsonpFlightsWidget = window.wpJsonpFlightsWidget || []).push(/* ... */);
```

## `output.library` {#outputlibrary}

`string` `object`

T> `object` 从 webpack 3.1.0 开始应用。用于 `libraryTarget: 'umd'`。

`output.library` 的值的作用，取决于[`output.libraryTarget`](#outputlibrarytarget) 选项的值；完整的详细信息请查阅该章节。注意，`output.libraryTarget` 的默认选项是 `var`，所以如果使用以下配置选项：

__webpack.config.js__

```javascript
module.exports = {
  //...
  output: {
    library: 'MyLibrary'
  }
};
```

如果生成的输出文件，是在 HTML 页面中作为一个 script 标签引入，则变量 `MyLibrary` 将与入口文件的返回值绑定。

W> 注意，如果将`数组`作为 `entry`，那么只会暴露数组中的最后一个模块。如果将`对象`作为 `entry`，还可以使用 `array` 语法暴露（具体查看[这个示例](https://github.com/webpack/webpack/tree/master/examples/multi-part-library) for details)）。

T> 有关 `output.library` 以及 `output.libraryTarget` 详细信息，请查看[创建 library 指南](/guides/author-libraries/)。

## ouput.scriptType {#ouputscripttype}

`string: 'module' | 'text/javascript'` `boolean = false`

This option allows loading asynchronous chunks with a custom script type, such as `<script type="module" ...>`.

T> If [`output.module`](#outputmodule) is set to `true`, `ouput.scriptType` will default to `'module'` instead of `false`.

```javascript
module.exports = {
  //...
  output: {
    scriptType: 'module'
  }
};
```

## `output.libraryExport` {#outputlibraryexport}

`string` `[string]`

Configure which module or modules will be exposed via the `libraryTarget`. It is `undefined` by default, same behaviour will be applied if you set `libraryTarget` to an empty string e.g. `''` it will export the whole (namespace) object. The examples below demonstrate the effect of this configuration when using `libraryTarget: 'var'`.

The following configurations are supported:

`libraryExport: 'default'` - The __default export of your entry point__ will be assigned to the library target:

```javascript
// if your entry has a default export of `MyDefaultModule`
var MyDefaultModule = _entry_return_.default;
```

`libraryExport: 'MyModule'` - The __specified module__ will be assigned to the library target:

```javascript
var MyModule = _entry_return_.MyModule;
```

`libraryExport: ['MyModule', 'MySubModule']` - The array is interpreted as a __path to a module__ to be assigned to the library target:

```javascript
var MySubModule = _entry_return_.MyModule.MySubModule;
```

With the `libraryExport` configurations specified above, the resulting libraries could be utilized as such:

```javascript
MyDefaultModule.doSomething();
MyModule.doSomething();
MySubModule.doSomething();
```


## `output.libraryTarget` {#outputlibrarytarget}

`string = 'var'`

配置如何暴露 library。可以使用下面的选项中的任意一个。注意，此选项与分配给 [`output.library`](#outputlibrary) 的值一同使用。对于下面的所有示例，都假定将 `output.library` 的值配置为 `MyLibrary`。

T> 注意，下面的示例代码中的 `_entry_return_` 是入口起点返回的值。在 bundle 本身中，它是从入口起点、由 webpack 生成的函数的输出结果。

### 暴露为一个变量 {#expose-a-variable}

这些选项将入口起点的返回值（例如，入口起点的任何导出值），在 bundle 包所引入的位置，赋值给 output.library 提供的变量名。

`libraryTarget: 'var'` - （默认值）当 library 加载完成，__入口起点的返回值__将分配给一个变量：

```javascript
var MyLibrary = _entry_return_;

// 在一个单独的 script...
MyLibrary.doSomething();
```

W> 当使用此选项时，将 `output.library` 设置为空，会因为没有变量导致无法赋值。

`libraryTarget: 'assign'` - 这将产生一个隐含的全局变量，可能会潜在地重新分配到全局中已存在的值（谨慎使用）。.

```javascript
MyLibrary = _entry_return_;
```

注意，如果 `MyLibrary` 在作用域中未在前面代码进行定义，则你的 library 将被设置在全局作用域内。

W> 当使用此选项时，将 `output.library` 设置为空，将产生一个破损的输出 bundle。


### 通过在对象上赋值暴露 {#expose-via-object-assignment}

这些选项将入口起点的返回值（例如，入口起点的任何导出值）赋值给一个特定对象的属性（此名称由 `output.library` 定义）下。

如果 `output.library` 未赋值为一个非空字符串，则默认行为是，将入口起点返回的所有属性都赋值给一个对象（此对象由 `output.libraryTarget` 特定），通过如下代码片段：

```javascript
(function(e, a) { for(var i in a) { e[i] = a[i]; } }(output.libraryTarget, _entry_return_));
```

W> 注意，不设置 `output.library` 将导致由入口起点返回的所有属性，都会被赋值给给定的对象；这里并不会检查现有的属性名是否存在。

`libraryTarget: "this"` - __入口起点的返回值__将分配给 this 的一个属性（此名称由 `output.library` 定义）下，`this` 的含义取决于你：

```javascript
this['MyLibrary'] = _entry_return_;

// 在一个单独的 script...
this.MyLibrary.doSomething();
MyLibrary.doSomething(); // 如果 this 是 window
```

`libraryTarget: 'window'` - __入口起点的返回值__将使用 `output.library` 中定义的值，分配给 `window` 对象的这个属性下。

```javascript
window['MyLibrary'] = _entry_return_;

window.MyLibrary.doSomething();
```


`libraryTarget: 'global'` - __入口起点的返回值__将使用 `output.library` 中定义的值，分配给 `global` 对象的这个属性下。

```javascript
global['MyLibrary'] = _entry_return_;

global.MyLibrary.doSomething();
```


`libraryTarget: 'commonjs'` - __入口起点的返回值__将使用 `output.library` 中定义的值，分配给 exports 对象。这个名称也意味着，模块用于 CommonJS 环境：

```javascript
exports['MyLibrary'] = _entry_return_;

require('MyLibrary').doSomething();
```

### 模块定义系统 {#module-definition-systems}

这些选项将导致 bundle 带有更完整的模块头部，以确保与各种模块系统的兼容性。根据 `output.libraryTarget` 选项不同，`output.library` 选项将具有不同的含义。


`libraryTarget: 'commonjs2'` - __入口起点的返回值__将分配给 `module.exports` 对象。这个名称也意味着模块用于 CommonJS 环境：

```javascript
module.exports = _entry_return_;

require('MyLibrary').doSomething();
```

注意，`output.library` 会被省略，因此对于此特定的 `output.libraryTarget`，无需再设置 `output.library` 。

T> 想要弄清楚 CommonJS 和 CommonJS2 之间的区别？虽然它们很相似，但二者之间存在一些微妙的差异，这通常与 webpack 上下文没有关联。（更多详细信息，请[阅读此 issue](https://github.com/webpack/webpack/issues/1114)。）


`libraryTarget: 'amd'` - 将你的 library 暴露为 AMD 模块。

AMD 模块要求入口 chunk（例如使用 `<script>` 标签加载的第一个脚本）通过特定的属性定义，例如 `define` 和 `require`，它们通常由 RequireJS 或任何兼容的模块加载器提供（例如 almond）。否则，直接加载生成的 AMD bundle 将导致报错，如 `define is not defined`。

所以，使用以下配置...

```javascript
module.exports = {
  //...
  output: {
    library: 'MyLibrary',
    libraryTarget: 'amd'
  }
};
```

生成的 output 将会使用 "MyLibrary" 作为模块名定义，即

```javascript
define('MyLibrary', [], function() {
  return _entry_return_;
});
```

可以在 script 标签中，将 bundle 作为一个模块整体引入，并且可以像这样调用 bundle：

```javascript
require(['MyLibrary'], function (MyLibrary) {
  // 使用 library 做一些事……
});
```

如果 `output.library` 未定义，将会生成以下内容。

```javascript
define([], function() {
  return _entry_return_; // 此模块返回值，是入口 chunk 返回的值
});
```

如果直接加载 `<script>` 标签，此 bundle 无法按预期运行，或者根本无法正常运行（在 almond loader 中）。只能通过文件的实际路径，在 RequireJS 兼容的异步模块加载器中运行，因此在这种情况下，如果这些设置直接暴露在服务器上，那么 `output.path` 和 `output.filename` 对于这个特定的设置可能变得很重要。


`libraryTarget: 'amd-require'` - 这将使用立即执行的AMD `require(dependencies, factory)` 包装器包装您的输出。

 `'amd-require'` 目标（target）允许使用AMD依赖项，而无需单独的后续调用。与 `'amd'` 目标（target）一样, 这取决于在加载 webpack 输出的环境中适当可用的 [`require` function](https://github.com/amdjs/amdjs-api/blob/master/require.md) 。

对于此目标，库名称将被忽略。


`libraryTarget: 'umd'` - 将你的 library 暴露为所有的模块定义下都可运行的方式。它将在 CommonJS, AMD 环境下运行，或将模块导出到 global 下的变量。了解更多请查看 [UMD 仓库](https://github.com/umdjs/umd)。

在这个例子中，你需要 `library` 属性来命名你的模块：

```javascript
module.exports = {
  //...
  output: {
    library: 'MyLibrary',
    libraryTarget: 'umd'
  }
};
```

最终输出如下：

```javascript
(function webpackUniversalModuleDefinition(root, factory) {
  if(typeof exports === 'object' && typeof module === 'object')
    module.exports = factory();
  else if(typeof define === 'function' && define.amd)
    define([], factory);
  else if(typeof exports === 'object')
    exports['MyLibrary'] = factory();
  else
    root['MyLibrary'] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
  return _entry_return_;
});
```

注意，省略 `library` 会导致将入口起点返回的所有属性，直接赋值给 root 对象，就像[对象分配章节](#expose-via-object-assignment)。例如：

```javascript
module.exports = {
  //...
  output: {
    libraryTarget: 'umd'
  }
};
```

输出结果如下：

```javascript
(function webpackUniversalModuleDefinition(root, factory) {
  if(typeof exports === 'object' && typeof module === 'object')
    module.exports = factory();
  else if(typeof define === 'function' && define.amd)
    define([], factory);
  else {
    var a = factory();
    for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
  }
})(typeof self !== 'undefined' ? self : this, function() {
  return _entry_return_;
});
```

从 webpack 3.1.0 开始，你可以将 `library` 指定为一个对象，用于给每个 target 起不同的名称：

```javascript
module.exports = {
  //...
  output: {
    library: {
      root: 'MyLibrary',
      amd: 'my-library',
      commonjs: 'my-common-library'
    },
    libraryTarget: 'umd'
  }
};
```

`libraryTarget: 'system'` - This will expose your library as a [`System.register`](https://github.com/systemjs/systemjs/blob/master/docs/system-register.md)
module. This feature was first released in [webpack 4.30.0](https://github.com/webpack/webpack/releases/tag/v4.30.0).

System modules require that a global variable `System` is present in the browser when the webpack bundle is executed. Compiling to `System.register` format allows you to `System.import('/bundle.js')` without additional configuration and have your webpack bundle loaded into the System module registry.


```javascript
module.exports = {
  //...
  output: {
    libraryTarget: 'system'
  }
};
```

Output:

```javascript
System.register([], function(_export) {
  return {
    setters: [],
    execute: function() {
      // ...
    },
  };
});
```

By adding `output.library` to configuration in addition to having `output.libraryTarget` set to `system`, the output bundle will have the library name as an argument to `System.register`:

```javascript
System.register('my-library', [], function(_export) {
  return {
    setters: [],
    execute: function() {
      // ...
    },
  };
});
```

你可以通过 [SystemJS context](https://github.com/systemjs/systemjs/blob/master/docs/system-register.md#format-definition) 凭借 `__system_context__`:

```javascript
// 记录当前系统模块的 URL
console.log(__system_context__.meta.url);

// 导入一个系统模块，通过将当前的系统模块的 url 作为 parentUrl
__system_context__.import('./other-file.js').then(m => {
  console.log(m);
});
```

### 其他 Targets {#other-targets}

`libraryTarget: 'jsonp'` - 这将把入口起点的返回值，包裹到一个 jsonp 包装容器中

``` javascript
MyLibrary(_entry_return_);
```

你的 library 的依赖将由 [`externals`](/configuration/externals/) 配置定义。


## `output.importFunctionName` {#outputimportfunctionname}

`string = 'import'`

内部 `import()` 函数的名称. 可用于 polyfilling, 例如 通过 [`dynamic-import-polyfill`](https://github.com/GoogleChromeLabs/dynamic-import-polyfill).

__webpack.config.js__

```javascript
module.exports = {
  //...
  output: {
    importFunctionName: '__import__'
  }
};
```


## `output.path` {#outputpath}

`string = path.join(process.cwd(), 'dist')`

output 目录对应一个__绝对路径__。

__webpack.config.js__

```javascript
const path = require('path');

module.exports = {
  //...
  output: {
    path: path.resolve(__dirname, 'dist/assets')
  }
};
```

注意，`[hash]` 在参数中被替换为编译过程(compilation)的 hash。详细信息请查看[指南 - 缓存](/guides/caching/)。


## `output.pathinfo` {#outputpathinfo}

`boolean`

告知 webpack 在 bundle 中引入「所包含模块信息」的相关注释。此选项在 `development` [模式](/concepts/mode/)时的默认值是 `true`，而在 `production` [模式](/configuration/mode/)时的默认值是 `false`。

W> 对于在开发环境(development)下阅读生成代码时，虽然通过这些注释可以提供非常有用的数据信息，但在生产环境(production)下，__不应该__使用。

__webpack.config.js__

```javascript
module.exports = {
  //...
  output: {
    pathinfo: true
  }
};
```

T> 这些注释也会被添加至经过 tree shaking 后生成的 bundle 中。


## `output.publicPath` {#outputpublicpath}

`string = ''` `function`

对于按需加载(on-demand-load)或加载外部资源(external resources)（如图片、文件等）来说，output.publicPath 是很重要的选项。如果指定了一个错误的值，则在加载这些资源时会收到 404 错误。

此选项指定在浏览器中所引用的「此输出目录对应的__公开 URL__」。相对 URL(relative URL) 会被相对于 HTML 页面（或 `<base>` 标签）解析。相对于服务的 URL(Server-relative URL)，相对于协议的 URL(protocol-relative URL) 或绝对 URL(absolute URL) 也可是可能用到的，或者有时必须用到，例如：当将资源托管到 CDN 时。

该选项的值是以 runtime(运行时) 或 loader(载入时) 所创建的每个 URL 为前缀。因此，在多数情况下，__此选项的值都会以 `/` 结束__。

简单规则如下：[`output.path`](#outputpath) 中的 URL 以 HTML 页面为基准。

__webpack.config.js__

```javascript
const path = require('path');

module.exports = {
  //...
  output: {
    path: path.resolve(__dirname, 'public/assets'),
    publicPath: 'https://cdn.example.com/assets/'
  }
};
```

对于这个配置：

__webpack.config.js__

```javascript
module.exports = {
  //...
  output: {
    publicPath: '/assets/',
    chunkFilename: '[id].chunk.js'
  }
};
```

对于一个 chunk 请求，看起来像这样 `/assets/4.chunk.js`。

对于一个输出 HTML 的 loader 可能会像这样输出：

```html
<link href="/assets/spinner.gif" />
```

或者在加载 CSS 的一个图片时：

```css
background-image: url(/assets/spinner.gif);
```

webpack-dev-server 也会默认从 `publicPath` 为基准，使用它来决定在哪个目录下启用服务，来访问 webpack 输出的文件。

注意，参数中的 `[hash]` 将会被替换为编译过程(compilation) 的 hash。详细信息请查看[指南 - 缓存](/guides/caching)。

示例：

```javascript
module.exports = {
  //...
  output: {
    // One of the below
    publicPath: 'https://cdn.example.com/assets/', // CDN（总是 HTTPS 协议）
    publicPath: '//cdn.example.com/assets/', // CDN（协议相同）
    publicPath: '/assets/', // 相对于服务(server-relative)
    publicPath: 'assets/', // 相对于 HTML 页面
    publicPath: '../assets/', // 相对于 HTML 页面
    publicPath: '', // 相对于 HTML 页面（目录相同）
  }
};
```

在编译时(compile time)无法知道输出文件的 `publicPath` 的情况下，可以留空，然后在入口文件(entry file)处使用[自由变量(free variable)](https://stackoverflow.com/questions/12934929/what-are-free-variables) `__webpack_public_path__`，以便在运行时(runtime)进行动态设置。

```javascript
__webpack_public_path__ = myRuntimePublicPath;

// 应用程序入口的其他部分
```

有关 `__webpack_public_path__` 的更多信息，请查看[此讨论](https://github.com/webpack/webpack/issues/2776#issuecomment-233208623)。


## `output.sourceMapFilename` {#outputsourcemapfilename}

`string = '[file].map[query]'`

仅在 [`devtool`](/configuration/devtool/) 设置为 `'source-map'` 时有效，此选项会向硬盘写入一个输出文件。

可以使用 [#output-filename](#output-filename) 中的 `[name]`, `[id]`, `[hash]` 和 `[chunkhash]` 替换符号。除此之外，还可以使用以下替换符号。`[file]` 占位符会被替换为原始文件的文件名。我们建议__只使用 `[file]` 占位符__，因为其他占位符在非 chunk 文件(non-chunk files)生成的 SourceMap 时不起作用。

|  Template                   | 描述                                                                         |
| -------------------------- | ----------------------------------------------------------------------------------- |
| [file]                     | 模块文件名称                                                                  |
| [filebase]                 | 模块 [basename](https://nodejs.org/api/path.html#path_path_basename_path_ext) |


## `output.sourcePrefix` {#outputsourceprefix}

`string = ''`

修改输出 bundle 中每行的前缀。

__webpack.config.js__

```javascript
module.exports = {
  //...
  output: {
    sourcePrefix: '\t'
  }
};
```

T> 使用一些缩进会使 bundle 看起来更美观，但会导致多行字符串的问题。

T> 通常，你不需要修改 `output.sourcePrefix`。


## `output.strictModuleExceptionHandling` {#outputstrictmoduleexceptionhandling}

`boolean = false`

如果一个模块是在 `require` 时抛出异常，告诉 webpack 从模块实例缓存(`require.cache`)中删除这个模块。

出于性能原因，默认为 `false`。

当设置为 `false` 时，该模块不会从缓存中删除，这将造成仅在第一次 `require` 调用时抛出异常（会导致与 node.js 不兼容）。

例如，设想一下 `module.js`：

```javascript
throw new Error('error');
```

将 `strictModuleExceptionHandling` 设置为 `false`，只有第一个 `require` 抛出异常：

```javascript
// with strictModuleExceptionHandling = false
require('module'); // <- 抛出
require('module'); // <- 不抛出
```

相反，将 `strictModuleExceptionHandling` 设置为 `true`，这个模块所有的 `require` 都抛出异常：

```javascript
// with strictModuleExceptionHandling = true
require('module'); // <- 抛出
require('module'); // <- 仍然抛出
```


## `output.umdNamedDefine` {#outputumdnameddefine}

`boolean`

When using `libraryTarget: "umd"`, setting `output.umdNamedDefine` to `true` will name the AMD module of the UMD build. Otherwise an anonymous `define` is used.

```javascript
module.exports = {
  //...
  output: {
    umdNamedDefine: true
  }
};
```

## `output.enabledLibraryTypes` {#outputenabledlibrarytypes}

`[string]`

入口点可用的 library 类型列表.

```javascript
module.exports = {
  //...
  output: {
    enabledLibraryTypes: ['module']
  }
};
```

## `output.futureEmitAssets` {#outputfutureemitassets}

`boolean = false`

Tells webpack to use the future version of asset emitting logic, which allows freeing memory of assets after emitting. It could break plugins which assume that assets are still readable after they were emitted.

W> `output.futureEmitAssets` option will be removed in webpack v5.0.0 and this behaviour will become the new default.

```javascript
module.exports = {
  //...
  output: {
    futureEmitAssets: true
  }
};
```

## `output.ecmaVersion` {#outputecmaversion}

`number = 6`

告诉 webpack 在生成代码时的最大限度 EcmaScript 版本. 它应该是下列之一:

- 应该 >= 5, 应该 <= 11
- 应该 >= 2009, 应该 <= 2020

```javascript
module.exports = {
  output: {
    ecmaVersion: 6
  }
};
```

T> 在 webpack 4 中  `output.ecmaVersion` 的默认值是 `5`.

## `output.compareBeforeEmit` {#outputcomparebeforeemit}

`boolean = true`

告诉webpack在写入输出文件系统(output file system)之前检查要发出的文件是否已经存在并且具有相同的内容。

W> 当文件存在并且内容没有变更时，webpack 不会输出该文件。

```javascript
module.exports = {
  //...
  output: {
    compareBeforeEmit: false
  }
};
```

## `output.iife` {#outputiife}

`boolean = true`

告诉 webpack 添加 [IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE) 外层包裹生成的代码.

```javascript
module.exports = {
  //...
  output: {
    iife: true
  }
};
```

## `output.module` {#outputmodule}

`boolean = true`

允许输出的 JavaScript 文件作为模块类型。 设置 `output.iife` 为 `false`, `output.libraryTarget` 为 `'module'`, `output.scriptType` 为 `'module'` 和 `terserOptions.module` 为 `true`

W> `output.module` 是一个实验性的功能， 想要使用的话，通过设置 [`experiments.outputModule`](/configuration/experiments/#experiments) 为 `true`.

```javascript
module.exports = {
  //...
  output: {
    module: true
  }
};
```
