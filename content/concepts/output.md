---
title: Output
sort: 1
contributors:
  - sokra
  - tomasAlabes
---

Options affecting the output of the compilation. `output` options tell Webpack how to write the compiled files to disk. Note, that while there can be multiple `entry` points, only one `output` configuration is specified.

If you use any hashing (`[hash]` or `[chunkhash]`), make sure to have a consistent ordering of modules. Use the `OccurrenceOrderPlugin` or `recordsPath`.

## Usage

To set the `output` property, you simply set the output value in your webpack config:

**webpack.config.js**

```javascript
const config = {
  output: 'bundle.js'
};

module.exports = config;
```

## Options

The following is a list of values you can pass to the `output` property.

### `output.chunkFilename`

The filename of non-entry chunks as a relative path inside the `output.path` directory.

`[id]` is replaced by the id of the chunk.

`[name]` is replaced by the name of the chunk (or with the id when the chunk has no name).

`[hash]` is replaced by the hash of the compilation.

`[chunkhash]` is replaced by the hash of the chunk.

### `output.crossOriginLoading`

This option enables cross-origin loading of chunks.

Possible values are:

`false` - Disable cross-origin loading.

`"anonymous"` - Cross-origin loading is enabled. When using `anonymous` no credentials will be sent with the request.

`"use-credentials"` - Cross-origin loading is enabled and credentials will be send with the request.

For more information on cross-origin loading see [MDN](https://developer.mozilla.org/en/docs/Web/HTML/Element/script#attr-crossorigin)

> Default: `false`

> see also [[library and externals]]
> see also [[Development Tools]]

### `output.devtoolLineToLine`

Enable line-to-line mapped mode for all/specified modules. Line-to-line mapped mode uses a simple SourceMap where each line of the generated source is mapped to the same line of the original source. It's a performance optimization. Only use it if your performance needs to be better and you are sure that input lines match which generated lines.

`true` enables it for all modules (not recommended)

An object `{test, include, exclude}` similar to `module.loaders` enables it for specific files.

> Default: `false`

### `output.filename`

Specifies the name of each output file on disk. You must **not** specify an absolute path here! The `output.path` option determines the location on disk the files are written. `filename` is used solely for naming the individual files.

**single entry**
``` javascript
{
  entry: './src/app.js',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/build'
  }
}

// writes to disk: ./build/bundle.js
```

**multiple entries**

If your configuration creates more than a single "chunk" (as with multiple entry points or when using plugins like CommonsChunkPlugin), you should use substitutions to ensure that each file has a unique name.

`[name]` is replaced by the name of the chunk.

`[hash]` is replaced by the hash of the compilation.

`[chunkhash]` is replaced by the hash of the chunk.

``` javascript
{
  entry: {
    app: './src/app.js',
    search: './src/search.js'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/build'
  }
}

// writes to disk: ./build/app.js, ./build/search.js
```

### `output.hotUpdateChunkFilename`

The filename of the Hot Update Chunks. They are inside the `output.path` directory.

`[id]` is replaced by the id of the chunk.

`[hash]` is replaced by the hash of the compilation. (The last hash stored in the records)

> Default: `"[id].[hash].hot-update.js"`

### `output.hotUpdateFunction`

The JSONP function used by webpack for async loading of hot update chunks.

> Default: `"webpackHotUpdate"`

### `output.hotUpdateMainFilename`

The filename of the Hot Update Main File. It is inside the `output.path` directory.

`[hash]` is replaced by the hash of the compilation. (The last hash stored in the records)

> Default: `"[hash].hot-update.json"`

### `output.jsonpFunction`

The JSONP function used by webpack for asnyc loading of chunks.

A shorter function may reduce the filesize a bit. Use a different identifier when having multiple webpack instances on a single page.

> Default: `"webpackJsonp"`

### `output.library`

If set, export the bundle as library. `output.library` is the name.

Use this if you are writing a library and want to publish it as single file.

### `output.libraryTarget`

> Default: `"var"`

You developed your library in a very modular fashion using all the power of webpack. But have you thought how your users are going to consume it? Here’s where `libraryTarget` config comes in.

_First a quick note, to give your library a name (you should), set the output.library config to it._

The following options are supported:

`target: "var"` - (default) When your library is loaded, the **return value of your entry point** will be assigned to a variable:

```javascript
var yourLib = _entry_return_;
// your users will use your library like:
yourLib.doSomething();
```
(Not specifying a `output.library` will cancel this var configuration)

`target: "this"` - When your library is loaded, the **return value of your entry point** will be assigned to this, the meaning of `this` is up to you:

```javascript
this["yourLib"] = _entry_return_;
// your users will use your library like:
this.yourLib.doSomething();
yourLib.doSomething(); //if this is window
```

`target: "commonjs"` - When your library is loaded, the return value of your entry point will be part of the exports object. As the name implies, this is used in commonjs environments:

```javascript
exports["yourLib"] = _entry_return_;
//your users will use your library like:
require("yourLib").doSomething();
```
`target: "commonjs2"` - When your library is loaded, the return value of your entry point will be part of the exports object. As the name implies, this is used in commonjs environments:

```javascript
module.exports = _entry_return_;
//your users will use your library like:
require("yourLib").doSomething();
```

_Wondering the difference between commonjs and commonjs2? Check [this](https://github.com/webpack/webpack/issues/1114) out. (They are pretty much the same)_

`target: "amd "` - In this case webpack will surround you library with an AMD.
But there is a very important pre-requisite, your entry chunk must be defined with the define property, if not, webpack wil create the AMD module, but without dependencies. I learned this the hard way, it’s logical but not obvious I think. Anyway… the output will be something like this:

```javascript
define([], function() {
	//what this module returns is what your entry chunk returns
});
```
But if you download this script, first you may get a error: define is not defined, it’s ok! if you are distributing your library as amd, then your users need to use requirejs to load it. But, require([_what_])? `output.library`!

```javascript
output: {
	name: "yourLib",
	libraryTarget: "amd"
}
```
And the module will be:
```javascript
define("yourLib", [], function() {
	//what this module returns is what your entry chunk returns
});
```

```javascript
// And then your users will be able to do:
require(["yourLib"], function(yourLib){
	yourLib.doSomething();
});
```

`target: "umd"` - This is a way for your library to work with all module definitions (and where aren’t modules at all). It will work with commonjs, amd and as global variable.
Here to name your module you need the another property:

```javascript
output: {
	name: "yourLib",
	libraryTarget: "umd",
	umdNamedDefine: true
}
```

And finally the output is:
```javascript
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("yourLib", [], factory);
	else if(typeof exports === 'object')
		exports["yourLib"] = factory();
	else
		root["yourLib"] = factory();
})(this, function() {
	//what this module returns is what your entry chunk returns
});
```

Module proof library.

### `output.path`

The output directory as an **absolute path** (required).

`[hash]` is replaced by the hash of the compilation.


**config.js**

``` javascript
output: {
	path: "/home/proj/public/assets",
	publicPath: "/assets/"
}
```

**index.html**
``` html
<head>
  <link href="/assets/spinner.gif"/>
</head>
```
And a more complicated example of using a CDN and hashes for assets.

**config.js**

``` javascript
output: {
	path: "/home/proj/cdn/assets/[hash]",
	publicPath: "http://cdn.example.com/assets/[hash]/"
}
```

**Note:** In cases when the eventual `publicPath` of output files isn't known at compile time, it can be left blank and set dynamically at runtime in the entry point file. If you don't know the `publicPath` while compiling, you can omit it and set `__webpack_public_path__` on your entry point.

``` javascript
 __webpack_public_path__ = myRuntimePublicPath

// rest of your application entry
```

### `output.sourceMapFilename`

The filename of the SourceMaps for the JavaScript files. They are inside the `output.path` directory.

`[file]` is replaced by the filename of the JavaScript file.

`[id]` is replaced by the id of the chunk.

`[hash]` is replaced by the hash of the compilation.

> Default: `"[file].map"`
