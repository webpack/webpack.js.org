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

在和 [`output.library`](#output-library) 和 [`output.libraryTarget`](#output-librarytarget) 一起使用时，此选项允许用户向导出容器(export wrapper)中插入注释。要为 `libraryTarget` 每种类型都插入相同的注释，将 `auxiliaryComment` 设置为一个字符串：

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

| 模板 | 描述 |
| ----------- | ----------------------------------------------------------------------------------- |
| [hash]      | 模块标识符(module identifier)的 hash |
| [chunkhash] | chunk 内容的 hash |
| [name]      | 模块名称 |
| [id]        | 模块标识符(module identifier) |
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

`string` 或 `object`（从 webpack 3.1.0 开始；用于 `libraryTarget: "umd"`）

`output.library` 的值的作用，取决于[`output.libraryTarget`](#output-librarytarget) 选项的值；完整的详细信息请查阅该章节。注意，`output.libraryTarget` 的默认选项是 `var`，所以如果使用以下配置选项：

```javascript
output: {
  library: "MyLibrary"
}
```

如果生成的输出文件，是在 HTML 页面中作为一个 script 标签引入，则变量 `MyLibrary` 将与入口文件的返回值绑定。

T> 有关 `output.library` 以及 `output.libraryTarget` 详细信息，请查看[创建 library 指南](/guides/author-libraries)。


## `output.libraryExport`

`string` or `string[]` (since webpack 3.0.0)

> Default: `_entry_return_`

Configure which module or modules will be exposed via the `libraryTarget`.

The default value `_entry_return_` is the namespace or default module returned by your entry file.

The examples below demonstrate the effect of this config when using `libraryTarget: "var"`, but any target may be used.

The following configurations are supported:

`libraryExport: "default"` - The **default export of your entry point** will be assigned to the library target:

```javascript
// if your entry has a default export of `MyDefaultModule`
var MyDefaultModule = _entry_return_.default;
```

`libraryExport: "MyModule"` - The **specified module** will be assigned to the library target:

```javascript
var MyModule = _entry_return_.MyModule;
```

`libraryExport: ["MyModule", "MySubModule"]` - The array is interpreted as a **path to a module** to be assigned to the library target:

```javascript
var MySubModule = _entry_return_.MyModule.MySubModule;
```

如同以上示例中所展示，入口起点的返回值，与这些具名变量绑定在一起，因此，生成的 library 的用法如下：

```javascript
MyDefaultModule.doSomething();
MyModule.doSomething();
MySubModule.doSomething();
```

## `output.libraryTarget`

`string`

> 默认值： `"var"`

配置如何暴露 library。可以使用下面的选项中的任意一个。注意，此选项与分配给 [`output.library`](#output-library) 的值一同使用。对于下面的所有示例，都假定将 `output.library` 的值配置为 `MyLibrary`。

T> 注意，下面的示例代码中的 `_entry_return_` 是入口起点返回的值。在 bundle 本身中，它是从入口起点、由 webpack 生成的函数的输出结果。

### 暴露为一个变量

这些选项将入口起点的返回值（例如，入口起点的任何导出值），在 bundle 包所引入的位置，赋值给 output.library 提供的变量名。

`libraryTarget: "var"` - （默认值）当 library 加载完成，**入口起点的返回值**将分配给一个变量：

```javascript
var MyLibrary = _entry_return_;

// 在一个单独的 script……
MyLibrary.doSomething();
```

W> 当使用此选项时，将 `output.library` 设置为空，会因为没有变量导致无法赋值。


`libraryTarget: "assign"` - 这将产生一个隐含的全局变量，可能会潜在地重新分配到全局中已存在的值（谨慎使用）。.

``` javascript
MyLibrary = _entry_return_;
```

注意，如果 `MyLibrary` 在作用域中未在前面代码进行定义，则你的 library 将被设置在全局作用域内。

W> 当使用此选项时，将 `output.library` 设置为空，将产生一个破损的输出 bundle。


### 通过在对象上赋值暴露

这些选项将入口起点的返回值（例如，入口起点的任何导出值）赋值给一个特定对象的属性（此名称由 `output.library` 定义）下。

如果 `output.library` 未赋值为一个非空字符串，则默认行为是，将入口起点返回的所有属性都赋值给一个对象（此对象由 `output.libraryTarget` 特定），通过如下代码片段：

```javascript
(function(e, a) { for(var i in a) e[i] = a[i]; }(${output.libraryTarget}, _entry_return_)
```

W> 注意，不设置 `output.library` 将导致由入口起点返回的所有属性，都会被赋值给给定的对象；这里并不会检查现有的属性名是否存在。

`libraryTarget: "this"` - **入口起点的返回值**将分配给 this 的一个属性（此名称由 `output.library` 定义）下，`this` 的含义取决于你：

```javascript
this["MyLibrary"] = _entry_return_;

// 在一个单独的 script……
this.MyLibrary.doSomething();
MyLibrary.doSomething(); // 如果 this 是 window
```

`libraryTarget: "window"` - **入口起点的返回值**将使用 `output.library` 中定义的值，分配给 `window` 对象的这个属性下。

```javascript
window["MyLibrary"] = _entry_return_;

window.MyLibrary.doSomething();
```


`libraryTarget: "global"` - **入口起点的返回值**将使用 `output.library` 中定义的值，分配给 `global` 对象的这个属性下。

```javascript
global["MyLibrary"] = _entry_return_;

global.MyLibrary.doSomething();
```


`libraryTarget: "commonjs"` - **入口起点的返回值**将使用 `output.library` 中定义的值，分配给 exports 对象。这个名称也意味着，模块用于 CommonJS 环境：

```javascript
exports["MyLibrary"] = _entry_return_;

require("MyLibrary").doSomething();
```

### 模块定义系统

这些选项将导致 bundle 带有更完整的模块头部，以确保与各种模块系统的兼容性。根据 `output.libraryTarget` 选项不同，`output.library` 选项将具有不同的含义。


`libraryTarget: "commonjs2"` - **入口起点的返回值**将分配给 `module.exports` 对象。这个名称也意味着模块用于 CommonJS 环境：

```javascript
module.exports = _entry_return_;

require("MyLibrary").doSomething();
```

注意，`output.library` 会被省略，因此对于此特定的 `output.libraryTarget`，无需再设置 `output.library` 。

T> 想要弄清楚 CommonJS 和 CommonJS2 之间的区别？虽然它们很相似，但二者之间存在一些微妙的差异，这通常与 webpack 上下文没有关联。（更多详细信息，请[阅读此 issue](https://github.com/webpack/webpack/issues/1114)。）


`libraryTarget: "amd"` - 将你的 library 暴露为 AMD 模块。

AMD 模块要求入口 chunk（例如使用 `<script>` 标签加载的第一个脚本）通过特定的属性定义，例如 `define` 和 `require`，它们通常由 RequireJS 或任何兼容的模块加载器提供（例如 almond）。否则，直接加载生成的 AMD bundle 将导致报错，如 `define is not defined`。

所以，使用以下配置……

```javascript
output: {
  library: "MyLibrary",
  libraryTarget: "amd"
}
```

生成的 output 将会使用 "MyLibrary" 作为模块名定义，即

```javascript
define("MyLibrary", [], function() {
  // 此模块返回值，是入口 chunk 返回的值
});
```

可以在 script 标签中，将 bundle 作为一个模块整体引入，并且可以像这样调用 bundle：

```javascript
require(['MyLibrary'], function(MyLibrary) {
  // 使用 library 做一些事……
});
```

如果 `output.library` 未定义，将会生成以下内容。

```javascript
define([], function() {
  // 这个模块返回入口 chunk 返回的
});
```

如果直接加载 `<script>` 标签，此 bundle 无法按预期运行，或者根本无法正常运行（在 almond loader 中）。只能通过文件的实际路径，在 RequireJS 兼容的异步模块加载器中运行，因此在这种情况下，如果这些设置直接暴露在服务器上，那么 `output.path` 和 `output.filename` 对于这个特定的设置可能变得很重要。


`libraryTarget: "umd"` - 将你的 library 暴露为所有的模块定义下都可运行的方式。它将在 CommonJS, AMD 环境下运行，或将模块导出到 global 下的变量。了解更多请查看 [UMD 仓库](https://github.com/umdjs/umd)。

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

注意，省略 `library` 会导致将入口起点返回的所有属性，直接赋值给 root 对象，就像[对象分配章节](#exposing-the-library-via-object-assignment)。例如：

```javascript
output: {
  libraryTarget: "umd"
}
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
})(this, function() {
  //这个模块会返回你的入口 chunk 所返回的
});
```

从 webpack 3.1.0 开始，你可以将 `library` 指定为一个对象，用于给每个 target 起不同的名称：

```javascript
output: {
  library: {
    root: "MyLibrary",
    amd: "my-library",
    commonjs: "my-common-library"
  },
  libraryTarget: "umd"
}
```

模块验证 library。


### 其他 Targets

`libraryTarget: "jsonp"` - 这将把入口起点的返回值，包裹到一个 jsonp 包装容器中

``` javascript
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

可以使用 [#output-filename](#output-filename) 中的 `[name]`, `[id]`, `[hash]` 和 `[chunkhash]` 替换符号。除此之外，还可以使用以下替换符号。`[file]` 占位符会被替换为原始文件的文件名。我们建议__只使用 `[file]` 占位符__，因为其他占位符在非 chunk 文件(non-chunk files)生成的 SourceMap 时不起作用。

| 模板 | 描述 |
| -------------------------- | ----------------------------------------------------------------------------------- |
| [file] | 模块文件名称 |
| [filebase] | 模块 [basename](https://nodejs.org/api/path.html#path_path_basename_path_ext) |


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
