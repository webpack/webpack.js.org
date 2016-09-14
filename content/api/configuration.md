---
title: Configuration
---

?> TODO: Add a reference to [[Using the Cli]]

### Passing a Configuration

?> TODO: exporting a function and --env

?> TODO: returning a Promise

?> TODO: exporting multiple configurations

---

### External Configurations

?> TODO: possible extensions, i. e. .babel.js

---

Webpack is fed a configuration object. It is passed in one of two ways depending on how you are using webpack: through the Command Line (CLI) or via Node. Either method also allows an array of configuration objects, which are processed in parallel. This is more efficient than calling webpack multiple times. All the available configuration options are specified below...

---

### Configuration Options

``` js-with-links-with-details
{
  // click on the name of the option to get to the detailed documentation
  // click on the items with arrows to show more examples / advanced options

  <details><summary>[entry](#entry): "./app/entry", // string | object | array</summary>
  [entry](#entry): ["./app/entry1", "./app/entry2"],
  [entry](#entry): {
    a: "./app/entry-a",
    b: ["./app/entry-b1", "./app/entry-b2"]
  },
  </details>
  // Here the application starts executing
  // and webpack starts bundling

  [output](#output): {
    // options related how webpack emits results

    [path](#output-path): path.resolve(__dirname, "dist"), // string
    // the target directory for all output files
    // must be an absolute path (use the node.js path module)

    <details><summary>[filename](#output-filename): "bundle.js", // string</summary>
    [filename](#output-filename): "[name].js", // for multiple entry points
    [filename](#output-filename): "[chunkhash].js", // for [long term caching](/how-to/cache)
    </details>
    // the filename template for [entry chunks](chunks)

    <details><summary>[publicPath](#output-publicPath): "/assets/", // string</summary>
    [publicPath](#output-publicPath): "",
    [publicPath](#output-publicPath): "https://cdn.example.com/",
    </details>
    // the url to the output directory resolved relative to the HTML page

    [library](#output-library): "MyLibrary", // string,
    // the name of the exported library

    <details><summary>[libraryTarget](#output-librarytarget): "umd", // enum</summary>
    [libraryTarget](#output-librarytarget): "umd-module", // ES6 module wrapped in UMD
    [libraryTarget](#output-librarytarget): "commonjs-module", // ES6 module wrapped in CommonJs
    [libraryTarget](#output-librarytarget): "commonjs2", // exported with module.exports
    [libraryTarget](#output-librarytarget): "commonjs", // exported as properties to exports
    [libraryTarget](#output-librarytarget): "amd", // defined with AMD defined method
    [libraryTarget](#output-librarytarget): "this", // property set on this
    [libraryTarget](#output-librarytarget): "var", // variable defined in root scope
    </details>
    // the type of the exported library

    <details><summary>/* Advanced output configuration (click to show) */</summary>

    [pathinfo](#output-pathinfo): true, // boolean
    // include useful path info about modules, exports, requests, etc. into the generated code

    [chunkFilename](#output-chunkfilename): "[id].js",
    [chunkFilename](#output-chunkfilename): "[chunkhash].js", // for [long term caching](/how-to/cache)
    // the filename template for additional chunks

    [jsonpFunction](#output-jsonpFunction): "myWebpackJsonp", // string
    // name of the JSONP function used to load chunks

    [sourceMapFilename](#output-sourceMapFilename): "[file].map", // string
    [sourceMapFilename](#output-sourceMapFilename): "sourcemaps/[file].map", // string
    // the filename template of the source map location

    [devtoolModuleFilenameTemplate](#output-devtoolModuleFilenameTemplate): "webpack:///[resource-path]", // string
    // the name template for modules in a devtool

    [devtoolFallbackModuleFilenameTemplate](#output-devtoolFallbackModuleFilenameTemplate): "webpack:///[resource-path]?[hash]", // string
    // the name template for modules in a devtool (used for conflicts)

    [umdNamedDefine](#output-umdNamedDefine): true, // boolean
    // use a named AMD module in UMD library

    [crossOriginLoading](#output-crossOriginLoading): "use-credentials", // enum
    [crossOriginLoading](#output-crossOriginLoading): "anonymous",
    [crossOriginLoading](#output-crossOriginLoading): false,
    // specifies how cross origin request are issued by the runtime

    <details><summary>/* Expert output configuration (on own risk) */</summary>

    [devtoolLineToLine](#output-devtoolLineToLine): {
      test: /\.jsx$/
    },
    // use a simple 1:1 mapped SourceMaps for these modules (faster)

    [hotUpdateMainFilename](#output-hotUpdateMainFilename): "[hash].hot-update.json", // string
    // filename template for HMR manifest

    [hotUpdateChunkFilename](#output-hotUpdateChunkFilename): "[id].[hash].hot-update.js", // string
    // filename template for HMR chunks

    [sourcePrefix](#output-sourcePrefix): "\t", // string
    // prefix module sources in bundle for better readablitity
    </details>
    </details>
  },

  [module](#module): {
    // configuration regarding modules

    [loaders](#module-loaders): [
      // rules to assign loaders to modules

      {
        [test](#module-loaders-test): /\.jsx?$/,
        [include](#module-loaders-include): [
          path.resolve(__dirname, "app")
        ],
        [exclude](#module-loaders-exclude): [
          path.resolve(__dirname, "app/demo-files")
        ]
        // matching conditions, each accepting regular expression or string
        // test and include behave equal, both must be matched
        // exclude must not be matched
        // Best practices:
        // - Use RegExp only in test and for filename matching
        // - Use arrays of absolute paths in include and exclude
        // - Try to avoid exclude and prefer include

        [loader](#module-loaders-loader): "babel-loader",
        // the loader which should be applied, it'll be resolve relative to the context

        [options](#module-loaders-options): {
          presets: ["es2015"]
        }
        // options for the loader

        enforce: "before",
        enforce: "after",
        // (deprecated) apply these rule even if rules are overriden
      },

      {
        test: "\.html$"

        [loaders](#module-loaders-loaders): [
          // apply multiple loaders
          "htmllint-loader",
          {
            loader: "html-loader",
            options: {
              /* ... */
            }
          }
        ]
      }

    ],

    <details><summary>/* Advanced module configuration (click to show) */</summary>

    [noParse](#module.noParse): [
      /special-library\.js$/
    ],
    // do not parse this module

    unknownContextRequest: ".",
    unknownContextRecursive: true,
    unknownContextRegExp: /^\.\/.*$/,
    unknownContextCritical: true,
    exprContextRequest: ".",
    exprContextRegExp: /^\.\/.*$/,
    exprContextRecursive: true,
    exprContextCritical: true,
    wrappedContextRegExp: /.*/,
    wrappedContextRecursive: true,
    wrappedContextCritical: false,
    // specifies default behavior for dynamic requests
    </details>
  },

  [resolve](#resolve): {
    // options for resolving module requests
    // (does not apply to resolving to loaders)

    [modules](#resolve-modules): [
      "node_modules",
      path.resolve(__dirname, "app")
    ],
    // directories where to look for modules

    [extensions](#resolve-extensions): [".js", ".json", ".jsx", ".css"],
    // extensions that are used

    [alias](#resolve-alias): [
      // a list of module name aliasings

      {
        [name](#resolve-alias-name): "module",
        // the old request

        [alias](#resolve-alias-alias): "new-module",
        // the new request

        [onlyModule](#resolve-alias-onlyModule): true
        // if true only "module" is aliased
        // if false "module/inner/path" is also aliased
      }
    ],
    [alias](#resolve-alias): {
      // alternative syntax (recommended)

      "only-module$": "new-module",
      "module": "new-module"
    },

    <details><summary>/* Advanced resolve configuration (click to show) */</summary>

    [symlinks](#resolve-symlinks): true,
    // follow symlinks to new location

    [descriptionFiles](#resolve-descriptionFiles): ["package.json"],
    // files that are read for package description

    [mainFields](#resolve-mainFields): ["main"],
    // properties that are read from description file
    // when a folder is requested

    [aliasFields](#resolve-aliasFields): ["browser"],
    // properites that are read from description file
    // to alias requests in this package

    [enforceExtension](#resolve-enforceExtension): false,
    // if true request must not include an extensions
    // if false request may already include an extension

    [moduleExtensions](#resolve-moduleExtensions): ["-module"],
    [enforceModuleExtension](#resolve-enforceModuleExtension): false,
    // like extensions/enforceExtension but for module names instead of files

    [unsafeCache](#resolve-unsafeCache): true,
    [unsafeCache](#resolve-unsafeCache): {},
    // enables caching for resolved requests
    // this is unsafe as folder structure may change
    // but preformance improvement is really big

    [cachePredicate](#resolve-cachePredicate): (path, request) => true,
    // predicate function which selects requests for caching

    [plugins](#resolve-plugins): [
      // ...
    ]
    // additional plugins applied to the resolver
    </details>
  },

  <details><summary>[devtool](#devtool): "source-map", // enum</summary>
  [devtool](#devtool): "inline-source-map", // inlines SourceMap into orginal file
  [devtool](#devtool): "eval-source-map", // inlines SourceMap per module
  [devtool](#devtool): "hidden-source-map", // SourceMap without reference in original file
  [devtool](#devtool): "cheap-source-map", // cheap-variant of SourceMap without module mappings
  [devtool](#devtool): "cheap-module-source-map", // cheap-variant of SourceMap with module mappings
  [devtool](#devtool): "eval", // no SourceMap, but named modules
  </details>
  // enhance debugging by adding meta info for the browser devtools

  [context](#context): __dirname, // string
  // the home directory for webpack
  // the [entry](#entry) and [module.loaders.loader](#module-loaders-loader) option
  //   is resolved relative to this directory

  <details><summary>[target](#target): "web", // enum</summary>
  [target](#target): "webworker", // WebWorker
  [target](#target): "node", // node.js via require
  [target](#target): "async-node", // node.js via fs and vm
  [target](#target): "node-webkit", // nw.js
  [target](#target): "electron-main", // electron, main process
  [target](#target): "electron-renderer", // electron, renderer process
  [target](#target): (compiler) => { /* ... */ }, // custom
  </details>
  // the environment in which the bundle should run
  // changes chunk loading behavior and available modules

  [externals](#externals): ["angular", "react"], // array
  [externals](#externals): /^[a-z\-]+($|\/)/, // Regex
  [externals](#externals): {
    angular: "this angular", // this["angular"]
    react: { // UMD
      commonjs: "react",
      commonjs2: "react",
      amd: "react",
      root: "React"
    }
  }
  [externals](#externals): (request) => { /* ... */ return "commonjs " + request }
  // Don't follow/bundle these modules, but request them at runtime from the environment

  [stats](#stats): {
    /* TODO */
  },

  [devServer](#devServer): {
    /* TODO */
  },

  [plugins](#plugins): [
    // ...
  ],
  // list of additional plugins

  <details><summary>/* Advanced configuration (click to show) */</summary>

  [resolveLoader](#resolveLoader): { /* same as resolve */ }
  // separate resolve options for loaders

  [profile](#profile): true, // boolean
  // capture timing information

  [cache](#cache): false, // boolean
  // disable/enable caching

  [watch](#watch): true, // boolean
  // enables watching

  [watchOptions](#watchOptions): {
    [aggregateTimeout](#watchOptions.aggregateTimeout): 1000, // in ms
    // aggregates multiple changes to a single rebuild

    [poll](#watchOptions.poll): true,
    [poll](#watchOptions.poll): 500, // intervall in ms
    // enables polling mode for watching
    // must be used on filesystems that doesn't notify on change
    // i. e. nfs shares
  },

  [node](#node): {
    /* TODO */
  },

  [recordsPath](#recordsPath): path.resolve(__dirname, "build/records.json"),
  [recordsInputPath](#recordsInputPath): path.resolve(__dirname, "build/records.json"),
  [recordsOutputPath](#recordsOutputPath): path.resolve(__dirname, "build/records.json"),
  // TODO

  </details>
}
```

---


### `context`

`string`

The base directory, an absolute path, for resolving entry points.

```js
context: __dirname + ‘/src’
```

---

### `entry`

`string` `array` `object`

The point or points to enter the application. 

```js
entry: {
  home: ‘./home.js’,
  about: ‘./about.js’,
  contact: ‘./contact.js’
}
```

?> TODO: Add more details on passing a string/array and how this will affect bundle names

---

### `output`

`object`

A set of options instructing webpack on how and where it should output your bundles, assets and anything else you bundle up or load with webpack. Below is a simple example followed by descriptions of each individual `output` option.

```js
output: {
  filename: ‘[name].bundle.js’,
  path: __dirname + ‘/dist/assets’,
  publicPath: ‘/assets/’
}
```

---

### `output.filename`

`string`

This option determines the name of each output bundle. For a single `entry` point with no children, this can be a static name. However, when creating multiple bundles via more than one entry point, [code splitting](), or various [plugins](), you should use one of the following substitutions to give each bundle a unique name...

Using entry/chunk names:
```js
filename: [name].bundle.js
```

Using the unique hash generated for every build:
```js 
filename: [name].[hash].bundle.js
```

Using hashes based on each chunks' content:
```js
filename: [chunkhash].bundle.js
```

---

### `output.path`

`string`

The output directory as an **absolute** path. Note that the `[hash]` subsitution may be used here as well.

```js
path: __dirname + '/dist/assets'
```

---

### `output.publicPath`

`string`

This option specifies the public address of the output files when referenced in a browser. For [loaders]() that embed `<script>` or `<link>` tags or reference assets like images, `publicPath` is used as the `href` or `url()` to the file when it’s different than their location on disk (as specified by `path`). This can be helpful when you want to host some or all output files on a different domain or CDN. As with `path` you can use the `[hash]` substitution for a better caching profile.

```js
publicPath: '/assets/'
```

A loader outputting HTML might emit something like this:

```html
<link href="/assets/spinner.gif" />
```

or when loading an image in CSS:

```css
background-image: url(/assets/spinner.gif);
```

[webpack Dev Server]() also takes a hint from `publicPath`, using it to determine where to serve the output files from. 

---

### `output.chunkFilename`

`string`

?> TODO: Is this just an option for naming child chunks and loader generated chunks?

---

### `output.sourceMapFilename`

`string`

Configure how source maps are named. The substitutions allowed here are `[id]` for chunk ID, `[file]` for the name of file being mapped, and `[hash]` (same as above).

---

### `output.devtoolModuleFilenameTemplate`

`string` `function`

Customize the names used in each source map's `sources` array. This can be done by passing a template string or function. For example, when using `devtool: 'eval'`, this is the default:

```js
devtoolModuleFilenameTemplate: "webpack:///[resource-path]?[loaders]"
```

The following substitutions are available in template strings:

```js
[id] // The module identifier
[hash] // The hash of the module identifier
[resource] // The path used to resolve the file and any query params used on the first loader
[resource-path] // Same as above without the query params
[absolute-resource-path] // The absolute filename
[loaders] // Explicit loaders and params up to the name of the first loader
[all-loaders] // Automatic and explicit loaders and params up to the name of the first loader
```

When using a function, the same options are available camel-cased via the `info` parameter:

```js
devtoolModuleFilenameTemplate: info => {
  return `webpack:///${info.resourcePath}?${info.loaders}`
}
```

---

### `output.devtoolFallbackModuleFilenameTemplate`

`string` `function`

A fallback used when the template string or function above yields duplicates. 

---

### `output.devtoolLineToLine`

`boolean` `object`

Enables line to line mapping for all or some modules. This produces a simple source map where each line of the generated source is mapped to the same line of the original source. This is a performance optimization and should only be used if all input lines match generated lines. 

Pass a boolean to enable or disable this feature for all modules (defaults to `false`). An object similar to [loader objects]() is also allowed. For example, to enable this feature for all javascript files within a certain directory:

```js
devtoolLineToLine: { test: /\.js$/, include: 'src/utilities' }
```

---

### `output.hotUpdateChunkFilename`

`string`

Customize the filenames of hot update chunks. The only subsitutions allowed here are `[id]` and `[hash]`, the default being:

```js
hotUpdateChunkFilename: "[id].[hash].hot-update.js"
```

---

### `output.hotUpdateMainFilename`

`string`

Customize the main hot update filename. `[hash]` is the only available subsitution, the default being:

```js
hotUpdateMainFilename: "[hash].hot-update.json"
```

---

### `output.hotUpdateFunction`

`function`

A JSONP function used to asynchronously load hot-update chunks.

?> TODO: Add more details

---

### `output.jsonpFunction`

`function`

A JSONP function used to asynchronously load chunks. A shorter function may reduce filesize a bit.

?> TODO: Add more details

---

### `output.pathinfo`

`boolean`

Tell webpack to include comments in bundles with information about the contained modules. This option defaults to `false` and **should not** be used in production.

```js
pathinfo: true
```

---

### `output.library`

`string`

Use `library`, and `libraryTarget` below, when writing a JavaScript library that should be published as a single file. Pass a string with the name of the library:

```js
library: "MyLibrary"
```

---

### `output.libraryTarget`

`string`

Configure how the library will be exposed. Any one of the following options can be used:

`libraryTarget: "var"` - Expose it as a variable (i.e. `var MyLibrary = ...`)

`libraryTarget: "this"` - Expose it as a property of `this` (i.e. `this.MyLibrary = ...`)

`libraryTarget: "commonjs"` - Expose it using the `exports` object (i.e. `exports["MyLibrary"] = ...`)

`libraryTarget: "commonjs2"` - Expose it using the `module.exports` object

`libraryTarget: "amd"` - Expose it using [Asynchronous Module Defintion]() (AMD)

`libraryTarget: "umd"` - Expose it using [Universal Module Definition]() (UMD)

---

### `output.umdNamedDefine`

`boolean`

When using `libraryTarget: "umd"`, setting:

```js
umdNamedDefine: true
```

will name the AMD module of the UMD build.

---

### `output.sourcePrefix`

`string`

Change the prefix for each line in the output bundles. The default is tabs:

```js
sourcePrefix: "\t"
```

T> This option can be helpful in [fixing issues with multiline strings]().

---

### `output.crossOriginLoading`

`boolean` `string`

Enable [cross-origin]() loading of [chunks](). The following values are accepted...

`crossOriginLoading: false` - Disables cross-origin loading (default)

`crossOriginLoading: "anonymous"` - Enable cross-origin loading **without credentials**

`crossOriginLoading: "use-credentials"` - Enable cross-origin loading **with credentials**

---

### `module`

`object`

These options determine how the [different types of modules](/concepts/everything-is-a-module) within a project will be treated.

---

### Loader Objects

Loader objects are used in a few places throughout the configuration. They identify groups of modules using regular expressions. [Loaders](/concepts/loaders) can then be used, and chained together, to process, transform, or manipulate that group of modules. Loader objects can contain the following properties:

`test: /\.js/` - Identify one or more file extensions using a [regex](), string, or function

`include: /\/src/` - Include modules using a regex, string, or function

`exclude: /node_modules/` - Exclude modules using a regex, string, or function

`loader: "babel!eslint"` - A ! delimited string of loaders to use on these modules

`loaders: [ "babel", "eslint" ]` - An array of loaders to use on these modules

W> Note that loaders are always read from **right to left** whether passed via a delimited string or an array. In the example above, the [eslint-loader]() will lint, and possibly fix syntax in, the JavaScript modules and then hand them off to the [babel-loader]() for transpiling.

---

### `module.preLoaders`

`array`

An array of [loader objects]() to be used as the first step in the loading process. In the example above, linting could be broken out into a *preLoader*:

```js
module: {
  preLoaders: [
    { test: /\.js/, exclude: /node_modules/, loader: 'eslint' }
  ],
  ...
}
```

---

### `module.loaders`

`array`

An array of [loader objects]() to be used as the second step in the loading process. Many times `module.loaders` will be the only set of loader objects needed. A basic configuration might look like this:

```js
module: {
  loaders: [
    { test: /\.js/, exclude: /node_modules/, loader: 'babel!eslint' },
    { test: /\.css/, loader: 'style!css' },
    { test: /\.(jpg|png|gif), loader: 'file!img' }
  ]
}
```

---

### `module.postLoaders`

`array`

An array of [loader objects]() to be used as the last step in the loading process.

?> TODO: any good examples?

---

### `module.noParse`

`regex` `array`

Prevent webpack from parsing any files matching the given regular expression(s). Ignored files **should not** have calls to `import`, `require`, `define` or any other importing mechanism. This can boost build performance when ignoring large libraries...

```js
noParse: /jquery|backbone/
```

---

### Module Contexts

General description...

Here are the available options with their defaults:

```js
module: {
  ...,
  unknownContextRequest: ".",
  unknownContextRegExp: /^\.\/.*$/,
  unknownContextRecursive: true,
  unknownContextCritical: true,
  exprContextRequest: ".",
  exprContextRegExp: /^\.\/.*$/,
  exprContextRecursive: true,
  exprContextCritical: true,
  wrappedContextRegExp: /.*/,
  wrappedContextRecursive: true,
  wrappedContextCritical: false
}
```

?> TODO: need help on this, frankly I haven't needed these options and am a bit confused about what they're used for even after reading through the [current section](http://webpack.github.io/docs/configuration.html#automatically-created-contexts-defaults-module-xxxcontextxxx) a few times.

---

### `plugins`

`array`

A list of [webpack plugins]() used for a wide variety of tasks. For example, when multiple bundles share some of the same dependencies the [CommonsChunkPlugin]() could be useful to extract these into a shared bundle. This could be added like so:

```js
plugins: [
  new webpack.optimize.CommonsChunkPlugin({
    ...
  })
]
```

### `resolve`

`object`

Configure how modules are resolved. For example, when calling `import "lodash"` in ES6, the `resolve` options can change where webpack goes to look for `"lodash"` (see [modulesDirectories]()).

---

### `resolve.root`

`string` `array`

Tell webpack what directories should be searched when resolving modules. 

```js
root: __dirname + '/src'
```

W> The value or values **must be an absolute path(s)**.

---

### `resolve.fallback`

`string` `array`

Add a fallback(s) for instances where webpack is unable to resolve a module in the given `root` or `modulesDirectories`. This option takes the same values as `root` above.

W> As with `root`, the value or values **must be an absolute path(s)**.

---

### `resolve.modulesDirectories`

`array`

Determine what directories should be searched for installed packages and libraries. These directories will be scanned for similarly to how Node scans for `node_modules`... by looking through the current directory as well as it's ancestors (i.e. `./node_modules`, `../node_modules`, and on). It defaults to:

```js
modulesDirectories: [ "node_modules", "web_modules" ]
```

Unlike `root` and `fallback`, **absolute paths are not necessary** and should only be used when there is a hierarchy within these folders.

---

### `resolve.extensions`

`array`

Automatically resolve certain extensions. This defaults to:

```js
extensions: [ "", ".webpack.js", ".web.js", ".js" ]
```

which is what enables users to leave off the extension when importing:

```js
import File from '../path/to/file'
```

W> Setting this option will **override the default array**, meaning that webpack will no longer try to resolve modules using the default extensions. For modules that are imported with their extension, e.g. `import SomeFile from "./somefile.ext"`, to be properly resolved, an empty string must be included in the array. Similarly, for modules that are imported without extensions, e.g. `import _ from "underscore"`, to be resolved to files with `.js` extensions, you must include ".js" in your array.

---

### `resolve.alias`

`object`

Create aliases to `import` or `require` certain modules more easily. For example, to alias a bunch of commonly used `src/` folders:

```js
alias: {
  Utilities: __dirname + '/src/utilities/',
  Templates: __dirname + '/src/templates/'
}
```

Now, instead of using relative paths when importing like so:

```js
import Utility from '../../utilities/utility';
```

you can use the alias:

```js
import Utility from 'Utilities/utility';
```

A trailing `$` can also be added to the given object's keys to signify an exact match:

```js
alias: {
  xyz$: __dirname + '/path/to/file.js'
}
```

which would yield these results:

```js
import Test1 from 'xyz'; // Success, file.js is resolved and imported
import Test2 from 'xyz/file.js'; // Error, /path/to/file.js/file.js is invalid
```

---

### `resolve.packageMains`

`array`

When importing from an npm package, e.g. `import * as D3 from "d3"`, this option will determine which fields in it's `package.json` are checked. It defaults to:

```js
packageMains: [ "webpack", "browser", "web", "browserify", [ "jam", "main" ], "main" ]
```

For example, the current version of [D3]() (4.2.2) contains these fields:

```js
{
  ...
  main: 'build/d3.node.js',
  browser: 'build/d3.js',
  module: 'index',
  'jsnext:main': 'index',
  ...
}
```

This means that when we `import * as D3 from "d3"` this will really resolve to either the `main` or `browser` files. 

?> TODO: Discuss order here... I'm assuming they're read from left to right meaning `browser` is what would be imported in the example? What does the nested array, i.e. `[ "jam", "main" ]`, do?

---

### `resolve.packageAlias`

`string`

Specify a field, such as `browser`, to be parsed according to [this specification](https://github.com/defunctzombie/package-browser-field-spec).

---

### `resolve.unsafeCache`

`regex` `array` `boolean`

Enable aggressive, but **unsafe**, caching of modules. Passing `true` will cache everything. A regular expression, or an array of regular expressions, can be used to test file paths and only cache certain modules. For example, to only cache utilities:

```js
unsafeCache: /src\/utilities/
```

W> Changes to cached paths may cause failure in rare cases.

---

### `resolveLoader`

`object`

This set of options is almost identical to the `resolve` set above, but is used only to resolve webpack's [loader]() packages. Here's the default:

```js
resolveLoader: {
  modulesDirectories: [ "web_loaders", "web_modules", "node_loaders", "node_modules" ],
  extensions: [ "", ".webpack-loader.js", ".web-loader.js", ".loader.js", ".js" ],
  packageMains: [ "webpackLoader", "webLoader", "loader", "main" ],
  moduleTemplates: [ "*-webpack-loader", "*-web-loader", "*-loader", "*" ]
}
```

The rest of the `resolve` options are also available. For example to `alias` certain loaders:

```js
alias: {
  txt: 'raw-loader'
}
```

which would allow `import Text from "txt!./myText" or `loader: "txt"` within a [loader object](). The only additional option is `moduleTemplates`, detailed below...

---

### `resolveLoader.moduleTemplates`

`array`

Specify templates to help webpack resolve loader packages. Using the defaults shown above, when a module is imported through [loader objects]() or like so:

```js
import Module from 'babel!eslint!./path/to/my/module';
```

webpack will try to find the [babel loader]() using "babel-webpack-loader", "babel-web-loader", and so on on until the package is found.

W> This option is only available in `resolveLoader` **not** `resolve`.

---

### `externals`

`string` `regex` `function` `array` `object`

**Prevent bundling** of certain `import`ed packages and instead retrieve these *external packages at runtime*. For example, to include [jQuery]() from a CDN instead of bundling it:

**index.html**

```html
...
<script src="https://code.jquery.com/jquery-3.1.0.js"
  integrity="sha256-slogkvB1K3VOkzAI8QITxV3VzpOnkeNVsKvtkYLMjfk="
  crossorigin="anonymous"></script>
...
```

**webpack.config.js**

```js
externals: {
  jquery: 'jQuery'
}
```

This leaves any dependant modules unchanged, i.e. the code shown below will still work:

```js
import $ from 'jquery';

$('.my-element').animate(...);
```

?> TODO: Add more details on the various ways of doing this using an `object`, `function`, etc. Also add how this is connected to [`output.libraryTarget`]() and maybe how it's useful when building libraries if this isn't already evident.

---

### `target`

`string`

Tell webpack what environment the application is targeting. The following options are supported:

`target: "web"` - Compile for usage in a browser

`target: "webworker"` - Compile as a [WebWorker]()

`target: "node"` - Compile for [NodeJS](), using `require` to load chunks

`target: "node-webkit"` - Compile for [Webkit](), using [JSONP]() to load chunks

T> Allows importing of built-in node modules and [`nw.gui`]() (experimental).

`target: "async-node"` - Use `fs` and `vm` to load chunks asynchronously

`target: "electron"` - Compile for [Electron](http://electron.atom.io/)

T> Allows importing of Electron-specific modules.

It defaults to:

```js
target: "web"
```

---

### `bail`

`boolean`

Fail out on the first error instead of tolerating it. By default webpack will log these errors in red in the terminal, as well as the browser console when using [HMR](), but continue bundling. Turning it on:

```js
bail: true
```

will force webpack to exit it's bundling process.

W> Note that this will become the default behavior in webpack 2.x

---

### `profile`

`boolean`

Capture a "profile" of the application, including statistics and hints, which can then be dissected using the [Analyze]() tool.

T> Use the [StatsPlugin](https://www.npmjs.com/package/stats-webpack-plugin) for more control over the generated profile.

---

### `cache`

`boolean` `object`

Cache the generated webpack modules and chunks to improve build speed. Caching is enabled by default while in [watch mode](). To disable caching simply pass:

```js
cache: false
```

If an object is passed, webpack will use this object for caching. Keeping a reference to this object will allow one to share the same cache between compiler calls:

```js
let SharedCache = {};

export default {
  ...,
  cache: SharedCache
}
```

W> Don't share the cache between calls with different options.
?> TODO: Elaborate on the warning and example - calls with different configuration options?

---

### `watch`

`boolean`

Turn on watch mode. This means that after the initial build, webpack will continue to watch for changes in any of the resolved files. Watch mode is turned off by default:

```js
watch: false
```

---

### `watchOptions`

`object`

A set of options used to customize watch mode:

```js
watchOptions: {
  aggregateTimeout: 300,
  poll: 1000
}
```

---

### `watchOptions.aggregateTimeout`

`number`

Add a delay before rebuilding once the first file changed. This allows webpack to aggregate any other changes made during this time period into one rebuild. Pass a value in milliseconds:

```js
aggregateTimeout: 300 // The default
```

---

### `watchOptions.poll`

`boolean` `number`

Turn on [polling]() by passing `true`, or specifying a poll interval in milliseconds:

```js
poll: 1000 // Check for changes every second
```

---

### `debug`

`boolean`

Switch all loaders into debug mode to get more verbose feedback. This defaults to `false` to prevent unnecessary logging but can be easily turned on:

```js
debug: true
```

?> TODO: Consider adding an example of a certain loader emitting more details.

---

### `devtool`

`string`

Choose a style of [source mapping]() to enhance the debugging process. Be aware that the following options can affect build and rebuild speed dramatically...

`eval` - Each module is executed with `eval` and `//@ sourceURL`

`source-map` - A full SourceMap is emitted

`hidden-source-map` - Same as `source-map`, but doesn't add a reference comment to the bundle

`inline-source-map` - A SourceMap is added as DataUrl to the bundle

`eval-source-map` - Each module is executed with `eval` and a SourceMap is added as DataUrl to the `eval`

`cheap-source-map` - A SourceMap without column-mappings ignoring [loaded source maps]()

`cheap-module-source-map` - A SourceMap without column-mappings that simplifies [loaded source maps]() to a single mapping per line

 devtool                      | build | rebuild | production | quality                       
------------------------------|-------|---------|------------|-------------------------------
 eval                         | +++   | +++     | no         | generated code                
 cheap-eval-source-map        | +     | ++      | no         | transformed code (lines only) 
 cheap-source-map             | +     | o       | yes        | transformed code (lines only) 
 cheap-module-eval-source-map | o     | ++      | no         | original source (lines only)  
 cheap-module-source-map      | o     | -       | yes        | original source (lines only)  
 eval-source-map              | --    | +       | no         | original source               
 source-map                   | --    | --      | yes        | original source               


T> See [`output.sourceMapFilename`](#output-sourcemapfilename) to customize the filenames of generated source maps.

?> TODO: This section is pretty much just copied over from existing docs... imo more background is needed on the different types of source mapping, maybe via links to external sites that discuss the different types of source maps in more detail.

---

### `devServer`

`object`

This set of options is picked up by [webpack-dev-server]() and can be used to change it's behavior in various ways. Here's a simple example that [gzips]() and serves everything from our `/dist` directory:

```js
devServer: {
  contentBase: "dist/",
  compress: true,
  port:9000
}
```

When the server is started, there will be a message prior to the list of resolved modules:

```bash
http://localhost:9000/
webpack result is served from /build/
content is served from dist/
```

that will give some background on where the server is located and what it's serving.

---

### `devServer.contentBase`

`string` `array`

Tell the server where to serve content from. [`output.publicPath`]() will also be used to determine where the bundles should be served from.

```js
contentBase: "path/to/dist/"
```

TODO: Add more details/examples, for example how is an array handled? Absolute or relative paths both allowed? Recommended?

---

### `devServer.hot`

`boolean`

Enable webpack's [Hot Module Replacement]() feature:

```js
hot: true
```

?> TODO: Add various other steps needed for this to work. (From my experience, and the current docs it looks like other steps are needed here - not like in the cmd line where it's just a flag)

---

### `devServer.inline`

`boolean`

Toggle between the dev-server's [two different modes](). By default the application will be served in an `<iframe>` under a notification bar with messages about the build (this is called *iframe mode*). To switch to *inline mode*:

```js
inline: true
```

and see the application rendered normally with build messages in the browser console.

T> Inline mode is recommended when using [Hot Module Replacement]().

---

### `devServer.historyApiFallback`

`boolean` `object`

When using the [HTML5 History API](), the `index.html` page will likely have be served in place of any `404` responses. Enable this by passing:

```js
historyApiFallback: true
```

By passing an object, this behavior can be controlled further using options like `rewrites`:

```js
historyApiFallback: {
  rewrites: [
    { from: /^\/$/, to: '/views/landing.html' },
    { from: /^\/subpage/, to: '/views/subpage.html' },
    { from: /./, to: '/views/404.html' }
  ]
}
```

?> TODO: Are other options available besides `rewrites`?

---

### `devServer.compress`

`boolean`

Enable [gzip compression]() for everything served:

```js
compress: true
```

---

### `devServer.port`

`number`

Specify a port number to listen for requests on:

```js
port: 8080
```

---

?> TODO: Finish and add links to the necessary areas for further reading. Would be nice to [figure out](https://github.com/chjj/marked/issues/310) reference-style links in marked first.

?> TODO: consider breaking out template string substitutions into its own section and then referrring to it from throughout the rest of the page. It seems like there's a lot of overlap between sections there.

---

[1]: http://davidbcalhoun.com/2014/what-is-amd-commonjs-and-umd/
[2]: https://developer.mozilla.org/en/docs/Web/HTML/Element/script#attr-crossorigin
[3]: https://github.com/webpack/webpack/issues/1161
