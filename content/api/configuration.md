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

## Basic configuration options

``` js-with-links
{ // click on the name of the option to get more details

  [entry](#entry): "./app/entry", // string | object | array
  // Here the application starts executing
  // and webpack starts bundling

  [output](#output): {
    // options related how webpack emits results

    [path](#output-path): __dirname, // string
    // the target directory for all output files
    // must be an absolute path

    [filename](#output-filename): "[name].js", // string
    // the filename template for [entry chunks](chunks)

    [chunkFilename](#output-chunkFilename): "[id].js",
    // the filename template for additional chunks

    [library](#output-library): "MyLibrary", // string,
    // the name of the exported library

    [libraryTarget](#output-libraryTarget): "commonjs" | "amd" | "umd"

    // [...](#Advanced-configuration-options)

  },

  context: __dirname, // string
  // The home directory for webpack
  // The [entry](#entry) option is resolved relative to this directory

}
```




### `entry`

### `output`

### `output.path`

### `output.filename`

### `output.chunkFilename`

### `output.library`

### `output.libraryTarget`


## Advanced configuration options

``` js-with-links
{ // click on the name of the option to get more details

  externals: string | array | function | RegExp

}
```


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

?> TODO: Finish and add links to the necessary areas for further reading. Would be nice to [figure out](https://github.com/chjj/marked/issues/310) reference-style links in marked first.

?> TODO: consider breaking out template string substitutions into its own section and then referrring to it from throughout the rest of the page. It seems like there's a lot of overlap between sections there.

---

[1]: http://davidbcalhoun.com/2014/what-is-amd-commonjs-and-umd/
[2]: https://developer.mozilla.org/en/docs/Web/HTML/Element/script#attr-crossorigin
[3]: https://github.com/webpack/webpack/issues/1161
