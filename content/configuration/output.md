---
title: Output
contributors:
  - sokra
  - gregvenech
---

The top-level `output` key contains set of options instructing webpack on how and where it should output your bundles, assets and anything else you bundle or load with webpack. 

### `output`

`object`

Below is a simple example followed by descriptions of each individual `output` option:

```js
output: {
  filename: ‘[name].bundle.js’,
  path: path.resolve(__dirname, ‘dist/assets’),
  publicPath: ‘/assets/’
}
```


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


### `output.path`

`string`

The output directory as an **absolute** path. Note that the `[hash]` subsitution may be used here as well.

```js
path: path.resolve(__dirname, 'dist/assets')
```


### `output.publicPath`

`string`

This option specifies the public address of the output files when referenced in a browser. For [loaders](/concepts/loaders) that embed `<script>` or `<link>` tags or reference assets like images, `publicPath` is used as the `href` or `url()` to the file when it’s different than their location on disk (as specified by `path`). This can be helpful when you want to host some or all output files on a different domain or CDN. As with `path` you can use the `[hash]` substitution for a better caching profile.

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

[webpack-dev-server]() also takes a hint from `publicPath`, using it to determine where to serve the output files from. 


### `output.chunkFilename`

`string`

?> Is this just an option for naming child chunks and loader generated chunks?


### `output.sourceMapFilename`

`string`

Configure how source maps are named. The substitutions allowed here are `[id]` for chunk ID, `[file]` for the name of file being mapped, and `[hash]` (same as above).


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


### `output.devtoolFallbackModuleFilenameTemplate`

`string` `function`

A fallback used when the template string or function above yields duplicates. 


### `output.devtoolLineToLine`

`boolean` `object`

Enables line to line mapping for all or some modules. This produces a simple source map where each line of the generated source is mapped to the same line of the original source. This is a performance optimization and should only be used if all input lines match generated lines. 

Pass a boolean to enable or disable this feature for all modules (defaults to `false`). An object similar to [loader objects](#loader-objects) is also allowed. For example, to enable this feature for all javascript files within a certain directory:

```js
devtoolLineToLine: { test: /\.js$/, include: 'src/utilities' }
```


### `output.hotUpdateChunkFilename`

`string`

Customize the filenames of hot update chunks. The only subsitutions allowed here are `[id]` and `[hash]`, the default being:

```js
hotUpdateChunkFilename: "[id].[hash].hot-update.js"
```


### `output.hotUpdateMainFilename`

`string`

Customize the main hot update filename. `[hash]` is the only available subsitution, the default being:

```js
hotUpdateMainFilename: "[hash].hot-update.json"
```


### `output.hotUpdateFunction`

`function`

A JSONP function used to asynchronously load hot-update chunks.

?> Add more details


### `output.jsonpFunction`

`function`

A JSONP function used to asynchronously load chunks. A shorter function may reduce filesize a bit.

?> Add more details


### `output.pathinfo`

`boolean`

Tell webpack to include comments in bundles with information about the contained modules. This option defaults to `false` and **should not** be used in production.

```js
pathinfo: true
```


### `output.library`

`string`

Use `library`, and `libraryTarget` below, when writing a JavaScript library that should be published as a single file. Pass a string with the name of the library:

```js
library: "MyLibrary"
```


### `output.libraryTarget`

`string`

Configure how the library will be exposed. Any one of the following options can be used:

`libraryTarget: "var"` - Expose it as a variable (i.e. `var MyLibrary = ...`)

`libraryTarget: "this"` - Expose it as a property of `this` (i.e. `this.MyLibrary = ...`)

`libraryTarget: "commonjs"` - Expose it using the `exports` object (i.e. `exports["MyLibrary"] = ...`)

`libraryTarget: "commonjs2"` - Expose it using the `module.exports` object

`libraryTarget: "amd"` - Expose it using [Asynchronous Module Defintion](http://davidbcalhoun.com/2014/what-is-amd-commonjs-and-umd/) (AMD)

`libraryTarget: "umd"` - Expose it using [Universal Module Definition](http://davidbcalhoun.com/2014/what-is-amd-commonjs-and-umd/) (UMD)


### `output.umdNamedDefine`

`boolean`

When using `libraryTarget: "umd"`, setting:

```js
umdNamedDefine: true
```

will name the AMD module of the UMD build.


### `output.sourcePrefix`

`string`

Change the prefix for each line in the output bundles. The default is tabs:

```js
sourcePrefix: "\t"
```

T> This option can be helpful in [fixing issues with multiline strings](https://github.com/webpack/webpack/issues/1161).


### `output.crossOriginLoading`

`boolean` `string`

Enable [cross-origin](https://developer.mozilla.org/en/docs/Web/HTML/Element/script#attr-crossorigin) loading of [chunks](). The following values are accepted...

`crossOriginLoading: false` - Disables cross-origin loading (default)

`crossOriginLoading: "anonymous"` - Enable cross-origin loading **without credentials**

`crossOriginLoading: "use-credentials"` - Enable cross-origin loading **with credentials**
