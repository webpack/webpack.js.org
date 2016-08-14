---
title: Configuration
---
> configuration file
> possible extensions, i. e. .babel.js
> exporting a function and --env
> returning a Promise
> exporting multiple configurations

> see also [[Using the Cli]]


> webpack is fed a configuration object. Depending on your usage of webpack there are two ways to pass this configuration object:

### CLI

If you use the [[CLI]] it will read a file `webpack.config.js` (or the file passed by the `--config` option). This file should export the configuration object:

``` javascript
module.exports = {
  // configuration
};
```

### node.js API

If you use the [[node.js API]] you need to pass the configuration object as parameter:

``` javascript
webpack({
  // configuration
}, callback);
```

### multiple configurations

In both cases you can also use an array of configurations, which are processed in parallel. They share filesystem cache and watchers so this is more efficient than calling webpack multiple times.


# configuration object content

> Hint: Keep in mind that you don't need to write pure JSON into the configuration. Use any JavaScript you want. It's just a node.js module...

Very simple configuration object example:

``` javascript
{
  context: __dirname + "/app",
  entry: "./entry",
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js"
  }
}
```



## `context`
The base directory (absolute path!) for resolving the `entry` option. If `output.pathinfo` is set, the included pathinfo is shortened to this directory.

> Default: `process.cwd()`



## `entry`

The entry point for the bundle.

If you pass a string: The string is resolved to a module which is loaded upon startup.

If you pass an array: All modules are loaded upon startup. The last one is exported.

``` javascript
entry: ["./entry1", "./entry2"]
```

If you pass an object: Multiple entry bundles are created. The key is the chunk name. The value can be a string or an array.

``` javascript
{
  entry: {
    page1: "./page1",
    page2: ["./entry1", "./entry2"]
  },
  output: {
    // Make sure to use [name] or [id] in output.filename
    //  when using multiple entry points
    filename: "[name].bundle.js",
    chunkFilename: "[id].bundle.js"
  }
}
```

> **NOTE**: It is not possible to configure other options specific to entry points. If you need entry point specific configuration you need to use [multiple configurations](#multiple-configurations).



## `output`

Options affecting the output of the compilation. `output` options tell Webpack how to write the compiled files to disk. Note, that while there can be multiple `entry` points, only one `output` configuration is specified.

If you use any hashing (`[hash]` or `[chunkhash]`), make sure to have a consistent ordering of modules. Use the `OccurrenceOrderPlugin` or `recordsPath`.

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

### `output.path`

The output directory as an **absolute path** (required).

`[hash]` is replaced by the hash of the compilation.


### `output.publicPath`

The `publicPath` specifies the public URL address of the output files when referenced in a browser. For loaders that embed `<script>` or `<link>` tags or reference assets like images, `publicPath` is used as the `href` or `url()` to the file when it's different than their location on disk (as specified by `path`). This can be helpful when you want to host some or all output files on a different domain or on a CDN. The Webpack Dev Server also uses this to determine the path where the output files are expected to be served from. As with `path` you can use the `[hash]` substitution for a better caching profile.

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

### `output.chunkFilename`

The filename of non-entry chunks as a relative path inside the `output.path` directory.

`[id]` is replaced by the id of the chunk.

`[name]` is replaced by the name of the chunk (or with the id when the chunk has no name).

`[hash]` is replaced by the hash of the compilation.

`[chunkhash]` is replaced by the hash of the chunk.

### `output.sourceMapFilename`

The filename of the SourceMaps for the JavaScript files. They are inside the `output.path` directory.

`[file]` is replaced by the filename of the JavaScript file.

`[id]` is replaced by the id of the chunk.

`[hash]` is replaced by the hash of the compilation.

> Default: `"[file].map"`

### `output.devtoolModuleFilenameTemplate`

Filename template string of function for the `sources` array in a generated SourceMap.

`[resource]` is replaced by the path used by Webpack to resolve the file, including the query params to the rightmost loader (if any).

`[resource-path]` is the same as `[resource]` but without the loader query params.

`[loaders]` is the list of loaders and params up to the name of the rightmost loader (only explict loaders).

`[all-loaders]` is the list of loaders and params up to the name of the rightmost loader (including automatic loaders).

`[id]` is replaced by the id of the module.

`[hash]` is replaced by the hash of the module identifier.

`[absolute-resource-path]` is replaced with the absolute filename.

> Default (devtool=`[inline-]source-map`): `"webpack:///[resource-path]"`  
> Default (devtool=`eval`): `"webpack:///[resource-path]?[loaders]"`  
> Default (devtool=`eval-source-map`): `"webpack:///[resource-path]?[hash]"`

Can also be defined as a function instead of a string template.
The function will accept an `info` object parameter which exposes the following properties:
- identifier
- shortIdentifier
- resource
- resourcePath
- absoluteResourcePath
- allLoaders
- query
- moduleId
- hash

### `output.devtoolFallbackModuleFilenameTemplate`

Similar to `output.devtoolModuleFilenameTemplate` but used in the case of duplicate module identifiers.

> Default: `"webpack:///[resourcePath]?[hash]"`

### `output.devtoolLineToLine`

Enable line-to-line mapped mode for all/specified modules. Line-to-line mapped mode uses a simple SourceMap where each line of the generated source is mapped to the same line of the original source. It's a performance optimization. Only use it if your performance needs to be better and you are sure that input lines match which generated lines.

`true` enables it for all modules (not recommended)

An object `{test, include, exclude}` similar to `module.loaders` enables it for specific files.

> Default: disabled

### `output.hotUpdateChunkFilename`

The filename of the Hot Update Chunks. They are inside the `output.path` directory.

`[id]` is replaced by the id of the chunk.

`[hash]` is replaced by the hash of the compilation. (The last hash stored in the records)

> Default: `"[id].[hash].hot-update.js"`

### `output.hotUpdateMainFilename`

The filename of the Hot Update Main File. It is inside the `output.path` directory.

`[hash]` is replaced by the hash of the compilation. (The last hash stored in the records)

> Default: `"[hash].hot-update.json"`

### `output.jsonpFunction`

The JSONP function used by webpack for asnyc loading of chunks.

A shorter function may reduce the filesize a bit. Use a different identifier when having multiple webpack instances on a single page.

> Default: `"webpackJsonp"`

### `output.hotUpdateFunction`

The JSONP function used by webpack for async loading of hot update chunks.

> Default: `"webpackHotUpdate"`

### `output.pathinfo`

Include comments with information about the modules.

`require(/* ./test */23)`

Do not use this in production.

> Default: `false`

### `output.library`

If set, export the bundle as library. `output.library` is the name.

Use this if you are writing a library and want to publish it as single file.

### `output.libraryTarget`

Which format to export the library:

`"var"` - Export by setting a variable: `var Library = xxx` (default)

`"this"` - Export by setting a property of `this`: `this["Library"] = xxx`

`"commonjs"` - Export by setting a property of `exports`: `exports["Library"] = xxx`

`"commonjs2"` - Export by setting `module.exports`: `module.exports = xxx`

`"amd"` - Export to AMD (optionally named - set the name via the library option)

`"umd"` - Export to AMD, CommonJS2 or as property in root

> Default: `"var"`

If `output.library` is not set, but `output.libraryTarget` is set to a value other than `var`, every property of the exported object is copied (Except `amd`, `commonjs2` and `umd`).

### `output.umdNamedDefine`

If `output.libraryTarget` is set to `umd` and `output.library` is set, setting this to `true` will name the AMD module.

### `output.sourcePrefix`

Prefixes every line of the source in the bundle with this string.

> Default: `"\t"`

### `output.auxillaryComments (string | Object)`

Append a comment above UMD Function. This is useful for telling instrumenters and code coverage to ignore UMD bootstrap 'noise'. If you pass a single string the same comment will be appended to each line. If an object you can pass separate strings to each module type. This feature will only work if `output.libraryTarget` is set to `"umd"`. If using the `Object` syntax, only properties specified will appear. 

#### `string` same comment per line. 
```
output: {
    library: "someLibName",
    libraryTarget: "umd",
    filename: "someLibName.js",
    auxiliaryComment: "istanbul ignore next"
}
```


#### `Object` Separate comments per line. 
```
output: {
    library: "someLibName",
    libraryTarget: "umd",
    filename: "someLibName.js",
    auxiliaryComment: {
        root: "", // or leaving root out could indicate "no comment here"
        commonjs: "istanbul ignore next",
        commonjs2: "istanbul ignore next",
        amd: "some other random comment"
    }
}
```

Resulting Code:
```
  (function webpackUniversalModuleDefinition(root, factory) {
      // istanbul ignore next
      if(typeof exports === 'object' && typeof module === 'object')
          module.exports = factory(require("lodash"));
      // istanbul ignore next
      else if(typeof define === 'function' && define.amd)
          define(["lodash"], factory);
      // istanbul ignore next
      else if(typeof exports === 'object')
          exports["someLibName"] = factory(require("lodash"));
      // istanbul ignore next
      else
          root["someLibName"] = factory(root["_"]);
  })(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
  // other code
  });
```

> Default: `false`

### `output.crossOriginLoading`

This option enables cross-origin loading of chunks.

Possible values are:

`false` - Disable cross-origin loading.

`"anonymous"` - Cross-origin loading is enabled. When using `anonymous` no credentials will be sent with the request.

`"use-credentials"` - Cross-origin loading is enabled and credentials will be send with the request.

For more information on cross-origin loading see [MDN](https://developer.mozilla.org/en/docs/Web/HTML/Element/script#attr-crossorigin)

> Default: `false`



## `module`

Options affecting the normal modules (`NormalModuleFactory`)

### `module.loaders`

An array of automatically applied loaders.

Each item can have these properties:

* `test`: A condition that must be met
* `exclude`: A condition that must not be met
* `include`: An array of paths or files where the imported files will be transformed by the loader
* `loader`: A string of "!" separated loaders
* `loaders`: An array of loaders as string

A condition may be a `RegExp` (tested against absolute path), a `string` containing the absolute path, a `function(absPath): bool`, or an array of one of these combined with "and".

See more: [[loaders]]

*IMPORTANT*: The loaders here are resolved *relative to the resource* which they are applied to. This means they are not resolved relative to the configuration file. If you have loaders installed from npm and your `node_modules` folder is not in a parent folder of all source files, webpack cannot find the loader. You need to add the `node_modules` folder as an absolute path to the `resolveLoader.root` option. (`resolveLoader: { root: path.join(__dirname, "node_modules") }`)

Example:

``` javascript
module: {
  loaders: [
    {
      // "test" is commonly used to match the file extension
      test: /\.jsx$/,

      // "include" is commonly used to match the directories
      include: [
        path.resolve(__dirname, "app/src"),
        path.resolve(__dirname, "app/test")
      ],

      // "exclude" should be used to exclude exceptions
      // try to prefer "include" when possible

      // the "loader"
      loader: "babel-loader" // or "babel" because webpack adds the '-loader' automatically
    }
  ]
}
```

### `module.preLoaders`, `module.postLoaders`

Syntax like `module.loaders`.

An array of applied pre and post loaders.

### `module.noParse`

Don't parse files matching a RegExp or an array of RegExps.

It's matched against the full resolved request.

This can boost the performance when ignoring big libraries.

The files are expected to have no call to `require`, `define`, or similar. They are allowed to use `exports` and `module.exports`.

### automatically created contexts defaults `module.xxxContextXxx`

There are multiple options to configure the defaults for an automatically created context. We differentiate three types of automatically created contexts:

* `exprContext`: An expression as a dependency (i. e. `require(expr)`)
* `wrappedContext`: An expression plus pre- and/or suffixed string (i. e. `require("./templates/" + expr)`)
* `unknownContext`: Any other unparsable usage of `require` (i. e. `require`)

Four options are possible for automatically created contexts:

* `request`: The request for context.
* `recursive`: Subdirectories should be traversed.
* `regExp`: The RegExp for the expression.
* `critical`: This type of dependency should be consider as critical (emits a warning).

All options and defaults:

`unknownContextRequest = "."`, `unknownContextRecursive = true`, `unknownContextRegExp = /^\.\/.*$/`, `unknownContextCritical = true`

`exprContextRequest = "."`, `exprContextRegExp = /^\.\/.*$/`, `exprContextRecursive = true`, `exprContextCritical = true`

`wrappedContextRegExp = /.*/`, `wrappedContextRecursive = true`, `wrappedContextCritical = false`

> Note: `module.wrappedContextRegExp` only refers to the middle part of the full RegExp. The remaining is generated from prefix and suffix.

Example:

``` javascript
{
  module: {
  // Disable handling of unknown requires
  unknownContextRegExp: /$^/,
  unknownContextCritical: false,

  // Disable handling of requires with a single expression
  exprContextRegExp: /$^/,
  exprContextCritical: false,

  // Warn for every expression in require
  wrappedContextCritical: true
  }
}
```



## `resolve`

Options affecting the resolving of modules.

### `resolve.alias`

Replace modules with other modules or paths.

Expects an object with keys being module names. The value is the new path. It's similar to a replace but a bit more clever. If the key ends with `$` only the exact match (without the `$`) will be replaced.

If the value is a relative path it will be relative to the file containing the require.

Examples: Calling a require from `/abc/entry.js` with different alias settings.

| `alias:` | `require("xyz")` | `require("xyz/file.js")` |
|---|---|---|
| `{}` | `/abc/node_modules/xyz/index.js` | `/abc/node_modules/xyz/file.js` |
| `{ xyz: "/absolute/path/to/file.js" }` | `/absolute/path/to/file.js` | `/abc/node_modules/xyz/file.js` |
| `{ xyz$: "/absolute/path/to/file.js" }` | `/absolute/path/to/file.js` | error |
| `{ xyz: "./dir/file.js" }` | `/abc/dir/file.js` | `/abc/node_modules/xyz/file.js` |
| `{ xyz$: "./dir/file.js" }` | `/abc/dir/file.js` | error |
| `{ xyz: "/some/dir" }` | `/some/dir/index.js` | `/some/dir/file.js` |
| `{ xyz$: "/some/dir" }` | `/some/dir/index.js` | `/abc/node_modules/xyz/file.js` |
| `{ xyz: "./dir" }` | `/abc/dir/index.js` | `/abc/dir/file.js` |
| `{ xyz: "modu" }` | `/abc/node_modules/modu/index.js` | `/abc/node_modules/modu/file.js` |
| `{ xyz$: "modu" }` | `/abc/node_modules/modu/index.js` | `/abc/node_modules/xyz/file.js` |
| `{ xyz: "modu/some/file.js" }` | `/abc/node_modules/modu/some/file.js` | error |
| `{ xyz: "modu/dir" }` | `/abc/node_modules/modu/dir/index.js` | `/abc/node_modules/dir/file.js` |
| `{ xyz: "xyz/dir" }` | `/abc/node_modules/xyz/dir/index.js` | `/abc/node_modules/xyz/dir/file.js` |
| `{ xyz$: "xyz/dir" }` | `/abc/node_modules/xyz/dir/index.js` | `/abc/node_modules/xyz/file.js` |

`index.js` may resolve to another file if defined in the `package.json`.

`/abc/node_modules` may resolve in `/node_modules` too.

### `resolve.root`

The directory (**absolute path**) that contains your modules. May also be an array of directories. This setting should be used to add individual directories to the search path.

> It **must** be an **absolute path**! Don't pass something like `./app/modules`.

Example:

``` javascript
var path = require('path');

// ...
resolve: {
  root: [
    path.resolve('./app/modules'),
    path.resolve('./vendor/modules')
  ]
}
```

### `resolve.modulesDirectories`

An array of directory names to be resolved to the current directory as well as its ancestors, and searched for modules. This functions similarly to how node finds "node_modules" directories. For example, if the value is `["mydir"]`, webpack will look in "./mydir", "../mydir", "../../mydir", etc.

> Default: `["web_modules", "node_modules"]`

> Note: Passing `"../someDir"`, `"app"`, `"."` or an absolute path isn't necessary here. Just use a directory name, not a path. Use only if you expect to have a hierarchy within these folders. Otherwise you may want to use the `resolve.root` option instead.

### `resolve.fallback`

A directory (or array of directories **absolute paths**), in which webpack should look for modules that weren't found in `resolve.root` or `resolve.modulesDirectories`.

### `resolve.extensions`

An array of extensions that should be used to resolve modules. For example, in order to discover CoffeeScript files, your array should contain the string `".coffee"`.

> Default: `["", ".webpack.js", ".web.js", ".js"]`

**IMPORTANT**: Setting this option will override the default, meaning that webpack will no longer try to resolve modules using the default extensions. If you want modules that were required with their extension (e.g. `require('./somefile.ext')`) to be properly resolved, you **must** include an empty string in your array. Similarly, if you want modules that were required without extensions (e.g. `require('underscore')`) to be resolved to files with ".js" extensions, you **must** include `".js"` in your array.

### `resolve.packageMains`

Check these fields in the `package.json` for suitable files.

> Default: `["webpack", "browser", "web", "browserify", ["jam", "main"], "main"]`

**Note**: This option has been changed to `resolve.mainFields` in webpack 2.

### `resolve.packageAlias`

Check this field in the `package.json` for an object. Key-value-pairs are treated as aliasing according to [this spec](https://github.com/defunctzombie/package-browser-field-spec)

> Not set by default

Example: `"browser"` to check the browser field.

### `resolve.unsafeCache`

Enable aggressive but unsafe caching for the resolving of a part of your files. Changes to cached paths may cause failure (in rare cases). An array of RegExps, only a RegExp or `true` (all files) is expected. If the resolved path matches, it'll be cached.

> Default: `[]`



## `resolveLoader`

Like `resolve` but for loaders.

``` javascript
// Default:
{
  modulesDirectories: ["web_loaders", "web_modules", "node_loaders", "node_modules"],
  extensions: ["", ".webpack-loader.js", ".web-loader.js", ".loader.js", ".js"],
  packageMains: ["webpackLoader", "webLoader", "loader", "main"]
}
```

Note that you can use `alias` here and other features familiar from `resolve`. For example `{ txt: 'raw-loader' }` would shim `txt!templates/demo.txt` to use `raw-loader`.

### `resolveLoader.moduleTemplates`

That's a `resolveLoader` only property.

It describes alternatives for the module name that are tried.

> Default: `["*-webpack-loader", "*-web-loader", "*-loader", "*"]`



## `externals`

Specify dependencies that shouldn't be resolved by webpack, but should become dependencies of the resulting bundle. The kind of the dependency depends on `output.libraryTarget`.

As value an object, a string, a function, a RegExp, and an array is accepted.

* string: An exact matched dependency becomes external. The same string is used as external dependency.
* object: If an dependency matches exactly a property of the object, the property value is used as dependency. The property value may contain a dependency type prefixed and separated with a space. If the property value is `true` the property name is used instead. If the property value is `false` the externals test is aborted and the dependency is not external. See example below.
* function: `function(context, request, callback(err, result))` The function is called on each dependency. If a result is passed to the callback function this value is handled like a property value of an object (above bullet point).
* RegExp: Every matched dependency becomes external. The matched text is used as the `request` for the external dependency.  Because the `request` _is the exact code_ used to generate the external code hook, if you are matching a commonjs package (e.g. '../some/package.js'), instead use the function external strategy. You can import the package via `callback(null, "require('" + request + "')"`, which generates a `module.exports = require('../some/package.js');`, using require outside of webpack context.
* array: Multiple values of the scheme (recursive).

Example:

``` javascript
{
  output: { libraryTarget: "commonjs" },
  externals: [
    {
      a: false, // a is not external
      b: true, // b is external (require("b"))
      "./c": "c", // "./c" is external (require("c"))
      "./d": "var d" // "./d" is external (d)
    },
    // Every non-relative module is external
    // abc -> require("abc")
    /^[a-z\-0-9]+$/,
    function(context, request, callback) {
      // Every module prefixed with "global-" becomes external
      // "global-abc" -> abc
      if(/^global-/.test(request))
        return callback(null, "var " + request.substr(7));
      callback();
    },
    "./e" // "./e" is external (require("./e"))
  ]
}
```

| type        | value               | resulting import code |
|-------------|---------------------|-----------------------|
| "var"       | `"abc"`             | `module.exports = abc;` |
| "var"       | `"abc.def"`         | `module.exports = abc.def;` |
| "this"      | `"abc"`             | `(function() { module.exports = this["abc"]; }());` |
| "this"      | `["abc", "def"]`    | `(function() { module.exports = this["abc"]["def"]; }());` |
| "commonjs"  | `"abc"`             | `module.exports = require("abc");` |
| "commonjs"  | `["abc", "def"]`    | `module.exports = require("abc").def;` |
| "amd"       | `"abc"`             | `define(["abc"], function(X) { module.exports = X; })` |
| "umd"       | `"abc"`             | everything above |

Enforcing `amd` or `umd` in a external value will break if not compiling as amd/umd target.

> Note: If using `umd` you can specify an object as external value with property `commonjs`, `commonjs2`, `amd` and `root` to set different values for each import kind.




## `target`

* `"web"` Compile for usage in a browser-like environment (default)
* `"webworker"` Compile as WebWorker
* `"node"` Compile for usage in a node.js-like environment (use `require` to load chunks)
* `"async-node"` Compile for usage in a node.js-like environment (use `fs` and `vm` to load chunks async)
* `"node-webkit"` Compile for usage in webkit, uses jsonp chunk loading but also supports build in node.js modules plus require("nw.gui") (experimental)
* `"electron"` Compile for usage in [Electron](http://electron.atom.io/) – supports `require`-ing Electron-specific modules.
* `"electron-renderer"` Compile for electron renderer process, provide a target using `JsonpTemplatePlugin`, `FunctionModulePlugin` for browser environment and `NodeTargetPlugin` and `ExternalsPlugin` for commonjs and electron bulit-in modules. *Note: need `webpack` >= 1.12.15.*



## `bail`

Report the first error as a hard error instead of tolerating it.



## `profile`

Capture timing information for each module.

> Hint: Use the [analyze tool](http://webpack.github.io/analyse) to visualize it. `--json` or `stats.toJson()` will give you the stats as JSON.



## `cache`

Cache generated modules and chunks to improve performance for multiple incremental builds.

This is enabled by default in watch mode.

You can pass `false` to disable it.

You can pass an object to enable it and let webpack use the passed object as cache. This way you can share the cache object between multiple compiler calls. Note: Don't share the cache between calls with different options.


## `debug`

Switch loaders to debug mode.



## `devtool`

Choose a developer tool to enhance debugging.

`eval` - Each module is executed with `eval` and `//@ sourceURL`.

`source-map` - A SourceMap is emitted. See also `output.sourceMapFilename`.

`hidden-source-map` - Same as `source-map`, but doesn't add a reference comment to the bundle.

`inline-source-map` - A SourceMap is added as DataUrl to the JavaScript file.

`eval-source-map` - Each module is executed with `eval` and a SourceMap is added as DataUrl to the `eval`.

`cheap-source-map` - A SourceMap without column-mappings. SourceMaps from loaders are not used.

`cheap-module-source-map` - A SourceMap without column-mappings. SourceMaps from loaders are simplified to a single mapping per line.

Prefixing `@`, `#` or `#@` will enforce a pragma style. (Defaults to `@` in `webpack@1` and `#` in `webpack@2`; using `#` is recommended)

Combinations are possible. `hidden`, `inline`, `eval` and pragma style are exclusive.

i. e. `cheap-module-inline-source-map`, `cheap-eval-source-map`, `#@source-map`

> Hint: If your modules already contain SourceMaps you'll need to use the [source-map-loader](https://github.com/webpack/source-map-loader) to merge it with the emitted SourceMap.

| devtool                      | build speed | rebuild speed | production supported | quality                 |
|------------------------------|-------------|---------------|----------------------|-------------------------|
| eval                         |     +++     |      +++      |       no       | generated code                |
| cheap-eval-source-map        |      +      |      ++       |       no       | transformed code (lines only) |
| cheap-source-map             |      +      |       o       |       yes      | transformed code (lines only) |
| cheap-module-eval-source-map |      o      |      ++       |       no       | original source (lines only)  |
| cheap-module-source-map      |      o      |       -       |       yes      | original source (lines only)  |
| eval-source-map              |     --      |       +       |       no       | original source               |
| source-map                   |     --      |       --      |       yes      | original source               |

Example:

``` javascript
{
  devtool: "#inline-source-map"
}
// =>
//# sourceMappingURL=...
```

> Note: With the next major version the default for `-d` will change to `cheap-module-eval-source-map`

## `devServer`

Can be used to configure the behaviour of [webpack-dev-server](https://github.com/webpack/webpack-dev-server) when the webpack config is passed to webpack-dev-server CLI.

Example:

``` javascript
{
  devServer: {
    contentBase: "./build",
  }
}
```

## `node`

Include polyfills or mocks for various node stuff:

* `console`: `true` or `false`
* `global`: `true` or `false`
* `process`: `true`, `"mock"` or `false`
* `Buffer`: `true` or `false`
* `__filename`: `true` (real filename relative to the context option), `"mock"` (`"/index.js"`) or `false` (normal node __dirname)
* `__dirname`: `true` (real dirname relative to the context option), `"mock"` (`"/"`) or `false` (normal node __dirname)
* `<node buildin>`: `true`, `"mock"`, `"empty"` or `false`


``` javascript
// Default:
{
  console: false,
  global: true,
  process: true,
  Buffer: true,
  __filename: "mock",
  __dirname: "mock",
  setImmediate: true
}
```


## `amd`

Set the value of `require.amd` and `define.amd`.

Example: `amd: { jQuery: true }` (for old 1.x AMD versions of jquery)



## `loader`

Custom values available in the loader context.



## `recordsPath`, `recordsInputPath`, `recordsOutputPath`

Store/Load compiler state from/to a json file. This will result in persistent IDs of modules and chunks.

An **absolute path** is expected. `recordsPath` is used for `recordsInputPath` and `recordsOutputPath` if they left undefined.

This is required when using Hot Code Replacement between multiple calls to the compiler.



## `plugins`

Add additional plugins to the compiler.