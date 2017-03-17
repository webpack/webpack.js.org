---
title: Output
sort: 5
contributors:
  - sokra
  - skipjack
  - tomasAlabes
  - mattce
  - irth
---

The top-level `output` key contains set of options instructing webpack on how and where it should output your bundles, assets and anything else you bundle or load with webpack.


## `output.chunkFilename`

`string`

This option determines the name of on-demand loaded chunk files. See [`output.filename`](#output-filename) option for details on the possible values.

Note that these filenames need to be generated at runtime to send the requests for chunks. Because of this, placeholders like `[name]` and `[chunkhash]` need to add a mapping from chunk id to placeholder value to the output bundle with the webpack runtime. This increases the size and may invalidate the bundle when placeholder value for any chunk changes.

By default `[id].js` is used or a value inferred from [`output.filename`](#output-filename) (`[name]` is replaced with `[id]` or `[id].` is prepended).


## `output.crossOriginLoading`

`boolean` `string`

Only used when [`target`](/configuration/target) is web, which uses JSONP for loading on-demand chunks, by adding script tags.

Enable [cross-origin](https://developer.mozilla.org/en/docs/Web/HTML/Element/script#attr-crossorigin) loading of chunks. The following values are accepted...

`crossOriginLoading: false` - Disable cross-origin loading (default)

`crossOriginLoading: "anonymous"` - Enable cross-origin loading **without credentials**

`crossOriginLoading: "use-credentials"` - Enable cross-origin loading **with credentials**


## `output.devtoolFallbackModuleFilenameTemplate`

`string | function(info)`

A fallback used when the template string or function above yields duplicates.

See [`output.devtoolModuleFilenameTemplate`](#output-devtoolmodulefilenametemplate).


## `output.devtoolLineToLine`

`boolean | object`

(Deprecated: Not really used, not really usable, write an issue if you have a different opinion)

Enables line to line mapping for all or some modules. This produces a simple source map where each line of the generated source is mapped to the same line of the original source. This is a performance optimization and should only be used if all input lines match generated lines.

Pass a boolean to enable or disable this feature for all modules (defaults to `false`). An object with `test`, `include`, `exclude` is also allowed. For example, to enable this feature for all javascript files within a certain directory:

``` js
devtoolLineToLine: { test: /\.js$/, include: 'src/utilities' }
```


## `output.devtoolModuleFilenameTemplate`

`string | function(info)`

This option is only used when [`devtool`](/configuration/devtool) uses an options which requires module names.

Customize the names used in each source map's `sources` array. This can be done by passing a template string or function. For example, when using `devtool: 'eval'`, this is the default:

``` js
devtoolModuleFilenameTemplate: "webpack:///[resource-path]?[loaders]"
```

The following substitutions are available in template strings (via webpack's internal [`ModuleFilenameHelpers`](https://github.com/webpack/webpack/blob/master/lib/ModuleFilenameHelpers.js)):

| Template                 | Description |
| ------------------------ | ----------- |
| [absolute-resource-path] | The absolute filename |
| [all-loaders]            | Automatic and explicit loaders and params up to the name of the first loader |
| [hash]                   | The hash of the module identifier |
| [id]                     | The module identifier |
| [loaders]                | Explicit loaders and params up to the name of the first loader |
| [resource]               | The path used to resolve the file and any query params used on the first loader |
| [resource-path]          | The path used to resolve the file without any query params |

When using a function, the same options are available camel-cased via the `info` parameter:

``` js
devtoolModuleFilenameTemplate: info => {
  return `webpack:///${info.resourcePath}?${info.loaders}`
}
```

If multiple modules would result in the same name, [`output.devtoolFallbackModuleFilenameTemplate`](#output-devtoolfallbackmodulefilenametemplate) is used instead for these modules.

## `output.hashFunction`

The hashing algorithm to use, defaults to `'md5'`. All functions from Node.JS' [`crypto.createHash`](https://nodejs.org/api/crypto.html#crypto_crypto_createhash_algorithm) are supported.

## `output.hashDigest`

The hashing algorithm to use, defaults to `'hex'`. All functions from Node.JS' [`hash.digest`](https://nodejs.org/api/crypto.html#crypto_hash_digest_encoding) are supported.

## `output.hashDigestLength`

The prefix length of the hash digest to use, defaults to `20`.

## `output.hashSalt`

An optional salt to update the hash via Node.JS' [`hash.update`](https://nodejs.org/api/crypto.html#crypto_hash_update_data_input_encoding).

## `output.filename`

`string`

This option determines the name of each output bundle. The bundle is written to the directory specified by the [`output.path`](#output-path) option.

For a single [`entry`](/configuration/entry-context#entry) point, this can be a static name.

``` js
filename: "bundle.js"
```

However, when creating multiple bundles via more than one entry point, code splitting, or various plugins, you should use one of the following substitutions to give each bundle a unique name...

Using entry name:

``` js
filename: "[name].bundle.js"
```

Using internal chunk id:

``` js
filename: "[id].bundle.js"
```

Using the unique hash generated for every build:

``` js
filename: "[name].[hash].bundle.js"
```

Using hashes based on each chunks' content:

``` js
filename: "[chunkhash].bundle.js"
```

Make sure the read the [Caching guide](/guides/caching) for details. There are more steps involved than just setting this option.

The default value is `"[name].js"`.

Note this option is called filename but you are still allowed to something like `"js/[name]/bundle.js"` to create a folder structure.

Note this options does not affect output files for on-demand-loaded chunks. For these files the [`output.chunkFilename`](#output-chunkfilename) option is used. It also doesn't affect files created by loaders. For these files see loader options.

The following substitutions are available in template strings (via webpack's internal [`TemplatedPathPlugin`](https://github.com/webpack/webpack/blob/master/lib/TemplatedPathPlugin.js)):

| Template    | Description |
| ----------- | ----------- |
| [hash]      | The hash of the module identifier |
| [chunkhash] | The hash of the chunk content |
| [name]      | The module name |
| [id]        | The module identifier |
| [file]      | The module filename |
| [filebase]  | The module [basename](https://nodejs.org/api/path.html#path_path_basename_path_ext) |
| [query]     | The module query, i.e., the string following `?` in the filename |

The lengths of `[hash]` and `[chunkhash]` can be specified using `[hash:16]` (defaults to 20). Alternatively, specify [`output.hashDigestLength`](#output-hashdigestlength) to configure the length globally.

T> When using the [`ExtractTextWebpackPlugin`](/plugins/extract-text-webpack-plugin), use `[contenthash]` to obtain a hash of the extracted file (neither `[hash]` nor `[chunkhash]` work).


## `output.hotUpdateChunkFilename`

`string`

Customize the filenames of hot update chunks. See [`output.filename`](#output-filename) option for details on the possible values.

The only placeholders allowed here are `[id]` and `[hash]`, the default being:

``` js
hotUpdateChunkFilename: "[id].[hash].hot-update.js"
```

Here is no need to change it.


## `output.hotUpdateFunction`

`function`

Only used when [`target`](/configuration/target) is web, which uses JSONP for loading hot updates.

A JSONP function used to asynchronously load hot-update chunks.

For details see [`output.jsonpFunction`](#output-jsonpfunction).


## `output.hotUpdateMainFilename`

`string`

Customize the main hot update filename. See [`output.filename`](#output-filename) option for details on the possible values.

`[hash]` is the only available placeholder, the default being:

``` js
hotUpdateMainFilename: "[hash].hot-update.json"
```

Here is no need to change it.


## `output.jsonpFunction`

`string`

Only used when [`target`](/configuration/target) is web, which uses JSONP for loading on-demand chunks.

A JSONP function name used to asynchronously load chunks or join multiple initial chunks (CommonsChunkPlugin, AggressiveSplittingPlugin).

This needs to be changed if multiple webpack runtimes (from different compilation) are used on the same webpage.

If using the [`output.library`](#output-library) option, the library name is automatically appended.


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


`libraryTarget: "window"` - When your library is loaded, **the return value of your entry point** will be part `window` object.
 
 ```javascript
 window["MyLibrary"] = _entry_return_;

//your users will use your library like:
window.MyLibrary.doSomething();
 ```


`libraryTarget: "global"` - When your library is loaded, **the return value of your entry point** will be part `global` object.
 
 ```javascript
 global["MyLibrary"] = _entry_return_;

//your users will use your library like:
global.MyLibrary.doSomething();
 ```


`libraryTarget: "commonjs"` - When your library is loaded, **the return value of your entry point** will be part of the exports object. As the name implies, this is used in CommonJS environments:

```javascript
exports["MyLibrary"] = _entry_return_;

//your users will use your library like:
require("MyLibrary").doSomething();
```


`libraryTarget: "commonjs2"` - When your library is loaded, **the return value of your entry point** will be part of the exports object. As the name implies, this is used in CommonJS environments:

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

In this case, you need the `library` property to name your module:

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


`libraryTarget: "assign"` - Here webpack will blindly generate an implied global.
 
 ```javascript
 MyLibrary = _entry_return_;
 ```
Be aware that if `MyLibrary` isn't defined earlier your library will be set in global scope.


`libraryTarget: "jsonp"` - This will wrap the return value of your entry point into a jsonp wrapper.
 
 ```javascript
 MyLibrary(_entry_return_);
 ```

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

Technically, the `[name]`, `[id]`, `[hash]` and `[chunkhash]` [placeholders](#output-filename) can be used, if generating a SourceMap for chunks. In addition to that, the `[file]` placeholder is replaced with the filename of the original file. It's recommended to only use the `[file]` placeholder, as the other placeholders won't work when generating SourceMaps for non-chunk files. Best leave the default.


## `output.sourcePrefix`

`string`

Change the prefix for each line in the output bundles.

``` js
sourcePrefix: "\t"
```

Note by default an empty string is used. Using some kind of indentation makes bundles look more pretty, but will cause issues with multi-line strings.

There is no need to change it.


## `output.strictModuleExceptionHandling`

`boolean`

Tell webpack to remove a module from cache if it throws an exception when it is `require`d. 

It defaults to `false` for performance reasons.

When set to `false`, the module is not removed from cache, which results in the exception getting thrown only on the first `require` call (making it incompatible with node.js).


## `output.umdNamedDefine`

`boolean`

When using `libraryTarget: "umd"`, setting:

``` js
umdNamedDefine: true
```

will name the AMD module of the UMD build. Otherwise an anonymous `define` is used.
