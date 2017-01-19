---
title: 输出(Output)
sort: 5
contributors:
  - sokra
  - skipjack
  - tomasAlabes
---

位于对象最顶级 `output` 键，包括了一组选项，指示 webpack 如何去输出、以及在哪里输出你的「bundle、asset 和其他你所打包或使用 webpack 载入的任何内容」。


## `output.chunkFilename`

`string`

此选项决定了按需加载(on-demand loaded)的 chunk 文件的名称。有关可取的值的详细信息，请查看 [`output.filename`](#output-filename) 选项。

注意，这些文件名需要在 runtime 根据 chunk 发送的请求去生成。因此，需要在 webpack runtime 输出 bundle 值时，将 chunk id 的值对应映射到占位符(如 `[name]` 和 `[chunkhash]`)。这会增加文件大小，并且在任何 chunk 的占位符值修改后，都会使 bundle 失效。

默认使用 `[id].js` 或从 [`output.filename`](#output-filename) 中推断出的值（`[name]` 会被预先替换为 `[id]` 或 `[id].`）。


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

(弃用：无用，不可用，如果你有其他意见请写 issue 给我们)

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

模板字符串(template string)中做以下替换：

``` js
[all-loaders] // Automatic and explicit loaders and params up to the name of the first loader
[loaders] // Explicit loaders and params up to the name of the first loader
[resource] // The path used to resolve the file and any query params used on the first loader
[resource-path] // Same as above without the query params
[absolute-resource-path] // 绝对路径文件名
[all-loaders] // 自动和显式的 loader，以及第一个 loader 名称的参数
[hash] // 模块标识符的 hash
[id] // 模块标识符
[loaders] // 显式的 loader，以及第一个 loader 名称的参数
[resource] // 用于解析文件的路径和用于第一个 loader 的任意查询参数
```

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

默认值是 `"[name].js"`。

注意此选项被称为文件名，但是你还是可以创建像 `"js/[name]/bundle.js"` 这样的文件夹结构。

注意，此选项不会影响那些「按需加载 chunk」的输出文件。对于这些文件，请使用 [`output.chunkFilename`](#output-chunkfilename) 选项来控制输出。同样也不影响通过 loader 创建的文件，对于这些文件，请查看 loader 选项来输出控制。


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

`function`

只在 [`target`](/configuration/target) 是 web 时使用，用于按需加载(load on-demand) chunk 的 JSONP 函数。

JSONP 函数用于异步加载(async load) chunk，或者拼接多个初始 chunk(CommonsChunkPlugin, AggressiveSplittingPlugin)。

如果在同一网页中使用了多个（来自不同编译(compilation)的）webpack runtime，则需要修改此选项。

如果使用了 [`output.library`](#output-library) 选项，library 名称时自动追加的。


## `output.library`

`string`

Read the [library guide](/guides/author-libraries) for details.

Use `library`, and `libraryTarget` below, when writing a JavaScript library that should export values, which can be used by other code depending on it. Pass a string with the name of the library:

``` js
library: "MyLibrary"
```

The name is used depending on the value of the [`output.libraryTarget`](#output-librarytarget) options.

Note that `output.libraryTarget` defaults to `var`. This means if only `output.library` is used it is exported as variable declaration (when used as script tag it's available in the global scope after execution).


## `output.libraryTarget`

`string`

> Default: `"var"`

Read the [library guide](/guides/author-libraries) for details.

Configure how the library will be exposed. Any one of the following options can be used.

> To give your library a name, set the `output.library` config to it (the examples assume `library: "MyLibrary"`)

The following options are supported:


`libraryTarget: "var"` - (default) When your library is loaded, the **return value of your entry point** will be assigned to a variable:

```javascript
var MyLibrary = _entry_return_;

// your users will use your library like:
MyLibrary.doSomething();
```
(Not specifying a `output.library` will cancel this var configuration)


`libraryTarget: "this"` - When your library is loaded, the **return value of your entry point** will be assigned to this, the meaning of `this` is up to you:

```javascript
this["MyLibrary"] = _entry_return_;

// your users will use your library like:
this.MyLibrary.doSomething();
MyLibrary.doSomething(); //if this is window
```


`libraryTarget: "commonjs"` - When your library is loaded, the return value of your entry point will be part of the exports object. As the name implies, this is used in CommonJS environments:

```javascript
exports["MyLibrary"] = _entry_return_;

//your users will use your library like:
require("MyLibrary").doSomething();
```

`libraryTarget: "commonjs2"` - When your library is loaded, the return value of your entry point will be part of the exports object. As the name implies, this is used in CommonJS environments:

```javascript
module.exports = _entry_return_;

//your users will use your library like:
require("MyLibrary").doSomething();
```

_Wondering the difference between CommonJS and CommonJS2? Check [this](https://github.com/webpack/webpack/issues/1114) out (they are pretty much the same)._


`libraryTarget: "commonjs-module"` - Expose it using the `module.exports` object (`output.library` is ignored), `__esModule` is defined (it's threaded as ES2015 Module in interop mode)


`libraryTarget: "amd"` - In this case webpack will make your library an AMD module.

But there is a very important pre-requisite, your entry chunk must be defined with the define property, if not, webpack will create the AMD module, but without dependencies. 
The output will be something like this:

```javascript
define([], function() {
	//what this module returns is what your entry chunk returns
});
```
But if you download this script, first you may get a error: `define is not defined`, it’s ok! 
If you are distributing your library with AMD, then your users need to use RequireJS to load it. 

Now that you have RequireJS loaded, you can load your library.

But, `require([ _what?_ ])`? 

`output.library`!

```javascript
output: {
	library: "MyLibrary",
	libraryTarget: "amd"
}
```

So your module will be like:

```javascript
define("MyLibrary", [], function() {
	//what this module returns is what your entry chunk returns
});
```

And you can use it like this:

```javascript
// And then your users will be able to do:
require(["MyLibrary"], function(MyLibrary){
	MyLibrary.doSomething();
});
```

`libraryTarget: "umd"` - This is a way for your library to work with all the module definitions (and where aren't modules at all). 
It will work with CommonJS, AMD and as global variable. You can check the [UMD Repository](https://github.com/umdjs/umd) to know more about it. 

In this case, you need the another property to name your module:

```javascript
output: {
	library: "MyLibrary",
	libraryTarget: "umd"
}
```

And finally the output is:
```javascript
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("MyLibrary", [], factory);
	else if(typeof exports === 'object')
		exports["MyLibrary"] = factory();
	else
		root["MyLibrary"] = factory();
})(this, function() {
	//what this module returns is what your entry chunk returns
});
```

Module proof library.

The dependencies for your library will be defined by the [`externals`](/configuration/externals/) config.


## `output.path`

`string`

The output directory as an **absolute** path.

```js
path: path.resolve(__dirname, 'dist/assets')
```

Note that `[hash]` in this parameter will be replaced with an hash of the compilation. See the [Caching guide](/guides/caching) for details.


## `output.pathinfo`

`boolean`

Tell webpack to include comments in bundles with information about the contained modules. This option defaults to `false` and **should not** be used in production, but it's very useful in development when reading the generated code.

``` js
pathinfo: true
```

Note it also adds some info about tree shaking to the generated bundle.


## `output.publicPath`

`string`

This is an important option when using on-demand-loading or loading external resources like images, files, etc. If an incorrect value is specified you'll receive 404 errors while loading these resources.

This option specifies the **public URL** of the output directory when referenced in a browser. A relative URL is resolved relative to the HTML page (or `<base>` tag). Server-relative URLs, protocol-relative URLs or absolute URLs are also possible and sometimes required, i. e. when hosting assets on a CDN.

The value of the option is prefixed to every URL created by the runtime or loaders. Because of this **the value of this option ends with `/`** in most cases.

The default value is an empty string `""`.

Simple rule: The URL of your [`output.path`](#output-path) from the view of the HTML page.

```js
path: path.resolve(__dirname, "public/assets"),
publicPath: "https://cdn.example.com/assets/"
```

For this configuration:

```js
publicPath: "/assets/",
chunkFilename: "[id].chunk.js"
```

A request to a chunk will look like `/assets/4.chunk.js`.

A loader outputting HTML might emit something like this:

```html
<link href="/assets/spinner.gif" />
```

or when loading an image in CSS:

```css
background-image: url(/assets/spinner.gif);
```

The webpack-dev-server also takes a hint from `publicPath`, using it to determine where to serve the output files from.

Note that `[hash]` in this parameter will be replaced with an hash of the compilation. See the [Caching guide](/guides/caching) for details.

Examples:

``` js
publicPath: "https://cdn.example.com/assets/", // CDN (always HTTPS)
publicPath: "//cdn.example.com/assets/", // CDN (same protocol)
publicPath: "/assets/", // server-relative
publicPath: "assets/", // relative to HTML page
publicPath: "../assets/", // relative to HTML page
publicPath: "", // relative to HTML page (same directory)
```


## `output.sourceMapFilename`

`string`

This option is only used when [`devtool`](/configuration/devtool) uses a SourceMap option which writes an output file.

Configure how source maps are named. By default `"[file].map"` is used.

Technically the `[name]`, `[id]`, `[hash]` and `[chunkhash]` [placeholders](#output-filename) can be used, if generating a SourceMap for chunks. In addition to that the `[file]` placeholder is replaced with the filename of the original file. It's recommended to only use the `[file]` placeholder, as the other placeholders won't work when generating SourceMaps for non-chunk files. Best leave the default.


## `output.sourcePrefix`

`string`

Change the prefix for each line in the output bundles.

``` js
sourcePrefix: "\t"
```

Note by default an empty string is used. Using some kind of indention makes bundles look more pretty, but will cause issues with multi-line string.

There is no need to change it.


## `output.umdNamedDefine`

`boolean`

When using `libraryTarget: "umd"`, setting:

``` js
umdNamedDefine: true
```

will name the AMD module of the UMD build. Otherwise an anonymous `define` is used.

***

> 原文：https://webpack.js.org/configuration/output/
