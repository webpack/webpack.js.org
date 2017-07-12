---
title: 输出(Output)
sort: 5
contributors:
  - sokra
  - skipjack
  - tomasAlabes
  - mattce
  - irth
  - fvgs
  - dhurlburtusa
---

`output` 位于对象最顶级键(key)，包括了一组选项，指示 webpack 如何去输出、以及在哪里输出你的「bundle、asset 和其他你所打包或使用 webpack 载入的任何内容」。


## `output.auxiliaryComment`

`string` `object`

在和 [`output.library`](#output-library) 和 [`output.libraryTarget`](#output-librarytarget) 一起使用时，此选项允许用户向导出容器(export wrapper)中插入注释。要为 `libraryTarget` 每种类型都插入相同的注释，只需将 `auxiliaryComment` 设置为一个字符串：

``` js
output: {
  library: "someLibName",
  libraryTarget: "umd",
  filename: "someLibName.js",
  auxiliaryComment: "Test Comment"
}
```

将会生成如下：

``` js
(function webpackUniversalModuleDefinition(root, factory) {
  // Test Comment
  if(typeof exports === 'object' && typeof module === 'object')
    module.exports = factory(require("lodash"));
  // Test Comment
  else if(typeof define === 'function' && define.amd)
    define(["lodash"], factory);
  // Test Comment
  else if(typeof exports === 'object')
    exports["someLibName"] = factory(require("lodash"));
  // Test Comment
  else
    root["someLibName"] = factory(root["_"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
  // ...
});
```

对于 `libraryTarget` 每种类型的注释进行更细粒度地控制，请传入一个对象：

``` js
auxiliaryComment: {
  root: "Root Comment",
  commonjs: "CommonJS Comment",
  commonjs2: "CommonJS2 Comment",
  amd: "AMD Comment"
}
```


## `output.chunkFilename`

`string`

此选项决定了非入口(non-entry) chunk 文件的名称。有关可取的值的详细信息，请查看 [`output.filename`](#output-filename) 选项。

注意，这些文件名需要在 runtime 根据 chunk 发送的请求去生成。因此，需要在 webpack runtime 输出 bundle 值时，将 chunk id 的值对应映射到占位符(如 `[name]` 和 `[chunkhash]`)。这会增加文件大小，并且在任何 chunk 的占位符值修改后，都会使 bundle 失效。

默认使用 `[id].js` 或从 [`output.filename`](#output-filename) 中推断出的值（`[name]` 会被预先替换为 `[id]` 或 `[id].`）。


## `output.chunkLoadTimeout`

`integer`

chunk 请求到期之前的毫秒数，默认为 120 000。从 webpack 2.6.0 开始支持此选项。


## `output.crossOriginLoading`

`boolean` `string`

只用于 [`target`](/configuration/target) 是 web，使用了通过 script 标签的 JSONP 来按需加载 chunk。

启用 [cross-origin 属性](https://developer.mozilla.org/en/docs/Web/HTML/Element/script#attr-crossorigin) 加载 chunk。以下是可接收的值……

`crossOriginLoading: false` - 禁用跨域加载（默认）

`crossOriginLoading: "anonymous"` - **不带凭据(credential)**启用跨域加载

`crossOriginLoading: "use-credentials"` - **带凭据(credential)**启用跨域加载 **with credentials**


## `output.devtoolFallbackModuleFilenameTemplate`

`string | function(info)`

当上面的模板字符串或函数产生重复时使用的备用内容。

查看 [`output.devtoolModuleFilenameTemplate`](#output-devtoolmodulefilenametemplate)。


## `output.devtoolLineToLine`

`boolean | object`

> 避免使用此选项，因为它们已废弃，并将很快删除。 it is __deprecated__ and will soon be removed.

对所有或某些模块启用「行到行映射(line to line mapping)」。这将生成基本的源映射(source map)，即生成资源(generated source)的每一行，映射到原始资源(original source)的同一行。这是一个性能优化点，并且应该只需要输入行(input line)和生成行(generated line)相匹配时才使用。

传入 boolean 值，对所有模块启用或禁用此功能（默认 `false`）。对象可有 `test`, `include`, `exclude` 三种属性。例如，对某个特定目录中所有 javascript 文件启用此功能：

``` js
devtoolLineToLine: { test: /\.js$/, include: 'src/utilities' }
```


## `output.devtoolModuleFilenameTemplate`

`string | function(info)`

此选项仅在 「[`devtool`](/configuration/devtool) 使用了需要模块名称的选项」时使用。

自定义每个 source map 的 `sources` 数组中使用的名称。可以通过传递模板字符串(template string)或者函数来完成。例如，当使用 `devtool: 'eval'`，默认值是：

``` js
devtoolModuleFilenameTemplate: "webpack:///[resource-path]?[loaders]"
```

模板字符串(template string)中做以下替换（通过 webpack 内部的 [`ModuleFilenameHelpers`](https://github.com/webpack/webpack/blob/master/lib/ModuleFilenameHelpers.js)）：

| 模板                 | 描述 |
| ------------------------ | ----------- |
| [absolute-resource-path] | 绝对路径文件名 |
| [all-loaders]            | 自动和显式的 loader，并且参数取决于第一个 loader 名称 |
| [hash]                   | 模块标识符的 hash |
| [id]                     | 模块标识符 |
| [loaders]                | 显式的 loader，并且参数取决于第一个 loader 名称 |
| [resource]               | 用于解析文件的路径和用于第一个 loader 的任意查询参数 |
| [resource-path]          | 不带任何查询参数，用于解析文件的路径 |

当使用一个函数，同样的选项要通过 `info` 参数并使用驼峰式(camel-cased)：

``` js
devtoolModuleFilenameTemplate: info => {
  return `webpack:///${info.resourcePath}?${info.loaders}`
}
```

如果多个模块产生相同的名称，使用 [`output.devtoolFallbackModuleFilenameTemplate`](#output-devtoolfallbackmodulefilenametemplate) 来代替这些模块。


## `output.filename`

`string`

此选项决定了每个输出 bundle 的名称。这些 bundle 将写入到 [`output.path`](#output-path) 选项指定的目录下。

对于单个[`入口`](/configuration/entry-context#entry)起点，filename 会是一个静态名称。

``` js
filename: "bundle.js"
```

然而，当通过多个入口起点(entry point)、代码拆分(code splitting)或各种插件(plugin)创建多个 bundle，应该使用以下一种替换方式，来赋予每个 bundle 一个唯一的名称……

使用入口名称：

``` js
filename: "[name].bundle.js"
```

使用内部 chunk id

``` js
filename: "[id].bundle.js"
```

使用每次构建过程中，唯一的 hash 生成

``` js
filename: "[name].[hash].bundle.js"
```

使用基于每个 chunk 内容的 hash：

``` js
filename: "[chunkhash].bundle.js"
```

请确保已阅读过[指南 - 缓存](/guides/caching)的详细信息。这里涉及更多步骤，不仅仅是设置此选项。

注意此选项被称为文件名，但是你还是可以使用像 `"js/[name]/bundle.js"` 这样的文件夹结构。

注意，此选项不会影响那些「按需加载 chunk」的输出文件。对于这些文件，请使用 [`output.chunkFilename`](#output-chunkfilename) 选项来控制输出。同样也不影响通过 loader 创建的文件，对于这些文件，请查看 loader 选项来输出控制。

可以使用以下替换模板字符串（通过 webpack 内部的[`TemplatedPathPlugin`][`TemplatedPathPlugin`](https://github.com/webpack/webpack/blob/master/lib/TemplatedPathPlugin.js)）：

| Template    | Description |
| ----------- | ----------- |
| [hash]      | 模块标识符(module identifier)的 hash |
| [chunkhash] | chunk 内容的 hash |
| [name]      | 模块名称 |
| [id]        | 模块标识符(module identifier) |
| [file]      | 模块文件名称 |
| [filebase]  | 模块 [basename](https://nodejs.org/api/path.html#path_path_basename_path_ext) |
| [query]     | 模块的 query，例如，文件名 `?` 后面的字符串 |

`[hash]` 和 `[chunkhash]` 的长度可以使用 `[hash:16]`（默认为20）来指定。或者，通过指定[`output.hashDigestLength`](#output-hashdigestlength) 在全局配置长度。

T> 在使用 [`ExtractTextWebpackPlugin`](/plugins/extract-text-webpack-plugin) 时，可以用 `[contenthash]` 来获取提取文件的 hash（既不是 `[hash]` 也不是 `[chunkhash]`）。


## `output.hashDigest`

在生成 hash 时使用的编码方式，默认为 `'hex'`。支持 Node.js [`hash.digest`](https://nodejs.org/api/crypto.html#crypto_hash_digest_encoding) 的所有编码。


## `output.hashDigestLength`

散列摘要的前缀长度，默认为 `20`。


## `output.hashFunction`

散列算法，默认为 `'md5'`。支持 Node.JS [`crypto.createHash`](https://nodejs.org/api/crypto.html#crypto_crypto_createhash_algorithm) 的所有功能。


## `output.hashSalt`

一个可选的加盐值，通过 Node.JS [`hash.update`](https://nodejs.org/api/crypto.html#crypto_hash_update_data_input_encoding) 来更新哈希。


## `output.hotUpdateChunkFilename`

`string`

自定义热更新 chunk 的文件名。可选的值的详细信息，请查看 [`output.filename`](#output-filename) 选项。

占位符只能是 `[id]` 和 `[hash]`，默认值是：

``` js
hotUpdateChunkFilename: "[id].[hash].hot-update.js"
```

这里没有必要修改它。


## `output.hotUpdateFunction`

`function`

只在 [`target`](/configuration/target) 是 web 时使用，用于加载热更新(hot update)的 JSONP 函数。

JSONP 函数用于异步加载(async load)热更新(hot-update) chunk。

详细请查看 [`output.jsonpFunction`](#output-jsonpfunction)。


## `output.hotUpdateMainFilename`

`string`

自定义热更新的主文件名(main filename)。可选的值的详细信息，请查看 [`output.filename`](#output-filename) 选项

占位符只能是 `[hash]`，默认值是：

``` js
hotUpdateMainFilename: "[hash].hot-update.json"
```

这里没有必要修改它。


## `output.jsonpFunction`

`string`

只在 [`target`](/configuration/target) 是 web 时使用，用于按需加载(load on-demand) chunk 的 JSONP 函数。

JSONP 函数用于异步加载(async load) chunk，或者拼接多个初始 chunk(CommonsChunkPlugin, AggressiveSplittingPlugin)。

如果在同一网页中使用了多个（来自不同编译过程(compilation)的）webpack runtime，则需要修改此选项。

如果使用了 [`output.library`](#output-library) 选项，library 名称时自动追加的。


## `output.library`

`string`

在编写一个导出值的 JavaScript library 时，可以使用下面的 `library` 和 `libraryTarget`，导出值可以作为其他代码的依赖。传入 library 名称的字符串：

``` js
library: "MyLibrary"
```

library 名称取决于 [`output.libraryTarget`](#output-librarytarget) 选项的值。

注意，`output.libraryTarget` 的默认值是 var。这意味着，如果使用 `output.libraryTarget` 的默认值，`output.library` 会将值作为变量声明导出（当使用 script 标签时，其执行后在全局作用域可用）。

有关 `output.library` 以及 `ouput.libraryTarget` 详细信息，请查看[创建 library 指南](/guides/author-libraries)。


## `output.libraryExport`

`string` or `string[]` (since webpack 3.0.0)

Allows to select an export for the library.


## `output.libraryTarget`

`string`

> 默认值： `"var"`

配置如何暴露 library。可以使用下面的选项中的任意一个。

支持以下选项：

`libraryTarget: "var"` - （默认值）当 library 加载完成，**入口起点的返回值**将分配给一个变量：

```javascript
var MyLibrary = _entry_return_;

// 使用者将会这样调用你的 library：
MyLibrary.doSomething();
```

W> （不指定 `output.library` 将取消这个 `"var"` 配置）


`libraryTarget: "this"` - 当 library 加载完成，**入口起点的返回值**将分配给 this，`this` 的含义取决于你：

```javascript
this["MyLibrary"] = _entry_return_;

// 使用者将会这样调用你的 library：
this.MyLibrary.doSomething();
MyLibrary.doSomething(); //如果 this 是 window
```


`libraryTarget: "window"` - 当 library 加载完成，**入口起点的返回值**将分配给 `window` 对象。

 ```javascript
 window["MyLibrary"] = _entry_return_;

// 使用者将会这样调用你的 library：
window.MyLibrary.doSomething();
 ```


`libraryTarget: "global"` - 当 library 加载完成，**入口起点的返回值**将分配给 `global` 对象。

 ```javascript
 global["MyLibrary"] = _entry_return_;

// 使用者将会这样调用你的 library：
global.MyLibrary.doSomething();
 ```


`libraryTarget: "commonjs"` - 当 library 加载完成，**入口起点的返回值**将分配给 exports 对象。这个名称也意味着模块用于 CommonJS 环境：

```javascript
exports["MyLibrary"] = _entry_return_;

// 使用者将会这样调用你的 library：
require("MyLibrary").doSomething();
```


`libraryTarget: "commonjs2"` - 当 library 加载完成，**入口起点的返回值**将分配给 exports 对象。这个名称也意味着模块用于 CommonJS 环境：

```javascript
module.exports = _entry_return_;

// 使用者将会这样调用你的 library：
require("MyLibrary").doSomething();
```

T> 想要弄清楚 CommonJS 和 CommonJS2 之间的区别？查看[这里](https://github.com/webpack/webpack/issues/1114)（它们之间非常相似）。


`libraryTarget: "amd"` - webpack 将你的 library 转为 AMD 模块。

注意，入口 chunk 必须使用 `define` 属性定义，如果不是，webpack 将创建无依赖的 AMD 模块。输出结果就像这样：

```javascript
define([], function() {
  // 这个模块会返回你的入口 chunk 所返回的
});
```

如果你下载完这个 script，首先你可能收到一个错误：`define is not defined`，就是这样！如果你使用 AMD 来发布你的 library，那么使用者需要使用 RequireJS 来加载它。只要你已经加载过 RequireJS，你就能够加载 library。

所以，使用以下配置……

```javascript
output: {
  library: "MyLibrary",
  libraryTarget: "amd"
}
```

用户会像这样调用你的 library：

```javascript
require(['MyLibrary'], function(MyLibrary) {
  // 使用 library 做一些事……
});
```


`libraryTarget: "umd"` - 这是一种可以将你的 library 能够在所有的模块定义下都可运行的方式（并且导出的完全不是模块）。它将在 CommonJS, AMD 环境下运行，或将模块导出到 global 下的变量。了解更多请查看 [UMD 仓库](https://github.com/umdjs/umd)。

在这个例子中，你需要 `library` 属性来命名你的模块：

```javascript
output: {
  library: "MyLibrary",
  libraryTarget: "umd"
}
```

最终输出如下：

```javascript
(function webpackUniversalModuleDefinition(root, factory) {
  if(typeof exports === 'object' && typeof module === 'object')
    module.exports = factory();
  else if(typeof define === 'function' && define.amd)
    define([], factory);
  else if(typeof exports === 'object')
    exports["MyLibrary"] = factory();
  else
    root["MyLibrary"] = factory();
})(this, function() {
  //这个模块会返回你的入口 chunk 所返回的
});
```

模块验证 library。


`libraryTarget: "assign"` - 这里 webpack 会轻率地产生隐含的全局变量。

```javascript
MyLibrary = _entry_return_;
```
请注意，如果前面没有定义 `MyLibrary`，则 library 将被设置在全局范围内。


`libraryTarget: "jsonp"` - 这将把入口起点的返回值，包裹到一个 jsonp 包装容器中

```javascript
MyLibrary(_entry_return_);
```

你的 library 的依赖将由 [`externals`](/configuration/externals/) 配置定义。


## `output.path`

`string`

output 目录对应一个**绝对路径**。

```js
path: path.resolve(__dirname, 'dist/assets')
```

注意，`[hash]` 在参数中被替换为编译过程(compilation)的 hash。详细信息请查看[指南 - 缓存](/guides/caching)。


## `output.pathinfo`

`boolean`

告诉 webpack 在 bundle 中引入「所包含模块信息」的相关注释。此选项默认值是 `false`，并且**不应该**用于生产环境(production)，但是对阅读开发环境(development)中的生成代码(generated code)极其有用。

``` js
pathinfo: true
```

注意，这些注释也会被添加至经过 tree shaking 后生成的 bundle 中。


## `output.publicPath`

`string`

对于按需加载(on-demand-load)或加载外部资源(external resources)（如图片、文件等）来说，output.publicPath 是很重要的选项。如果指定了一个错误的值，则在加载这些资源时会收到 404 错误。

此选项指定在浏览器中所引用的「此输出目录对应的**公开 URL**」。相对 URL(relative URL) 会被相对于 HTML 页面（或 `<base>` 标签）解析。相对于服务的 URL(Server-relative URL)，相对于协议的 URL(protocol-relative URL) 或绝对 URL(absolute URL) 也可是可能用到的，或者有时必须用到，例如：当将资源托管到 CDN 时。

该选项的值是以 runtime(运行时) 或 loader(载入时) 所创建的每个 URL 为前缀。因此，在多数情况下，**此选项的值都会以`/`结束**。

默认值是一个空字符串 `""`。

简单规则如下：[`output.path`](#output-path) 中的 URL 以 HTML 页面为基准。

```js
path: path.resolve(__dirname, "public/assets"),
publicPath: "https://cdn.example.com/assets/"
```

对于这个配置：

```js
publicPath: "/assets/",
chunkFilename: "[id].chunk.js"
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

``` js
publicPath: "https://cdn.example.com/assets/", // CDN（总是 HTTPS 协议）
publicPath: "//cdn.example.com/assets/", // CDN (协议相同)
publicPath: "/assets/", // 相对于服务(server-relative)
publicPath: "assets/", // 相对于 HTML 页面
publicPath: "../assets/", // 相对于 HTML 页面
publicPath: "", // 相对于 HTML 页面（目录相同）
```

在编译时(compile time)无法知道输出文件的 `publicPath` 的情况下，可以留空，然后在入口文件(entry file)处使用[自由变量(free variable)](http://stackoverflow.com/questions/12934929/what-are-free-variables) `__webpack_public_path__`，以便在运行时(runtime)进行动态设置。

```javascript
 __webpack_public_path__ = myRuntimePublicPath

// 应用程序入口的其他部分
```

有关 `__webpack_public_path__` 的更多信息，请查看[此讨论](https://github.com/webpack/webpack/issues/2776#issuecomment-233208623)。


## `output.sourceMapFilename`

`string`

 此选项会向硬盘写入一个输出文件，只在 [`devtool`](/configuration/devtool) 启用了 SourceMap 选项时才使用。

配置 source map 的命名方式。默认使用 `"[file].map"`。

技术上看，对于 chunk 生成的 SourceMap，可以使用 `[name]`, `[id]`, `[hash]` 和 `[chunkhash]` [占位符(placeholder)](#output-filename)。除了替换这些占位符，`[file]` 占位符还可以被替换为原始文件(original file)的文件名。建议只使用 `[file]` 占位符，因为其他占位符在非 chunk 文件生成的 SourceMap 时不起作用。最好保持默认。


## `output.sourcePrefix`

`string`

修改输出 bundle 中每行的前缀。

``` js
sourcePrefix: "\t"
```

注意，默认情况下使用空字符串。使用一些缩进会看起来更美观，但是可能导致多行字符串中的问题。

这里没有必要修改它。


## `output.strictModuleExceptionHandling`

`boolean`

如果一个模块是在 `require` 时抛出异常，告诉 webpack 从模块实例缓存(`require.cache`)中删除这个模块。

出于性能原因，默认为 `false`。

当设置为 `false` 时，该模块不会从缓存中删除，这将造成仅在第一次 `require` 调用时抛出异常（会导致与 node.js 不兼容）。

例如，设想一下 `module.js`：

``` js
throw new Error("error");
```

将 `strictModuleExceptionHandling` 设置为 `false`，只有第一个 `require` 抛出异常：

``` js
// with strictModuleExceptionHandling = false
require("module") // <- 抛出
require("module") // <- 不抛出
```

相反，将 `strictModuleExceptionHandling` 设置为 `true`，这个模块所有的 `require` 都抛出异常：

``` js
// with strictModuleExceptionHandling = true
require("module") // <- 抛出
require("module") // <- 仍然抛出
```


## `output.umdNamedDefine`

`boolean`

当使用了 `libraryTarget: "umd"`，设置：

``` js
umdNamedDefine: true
```

会对 UMD 的构建过程中的 AMD 模块进行命名。否则就使用匿名的 `define`。

***

> 原文：https://webpack.js.org/configuration/output/
