---
title: Output
sort: 3
contributors:
  - TheLarkInn
  - chyipin
  - rouzbeh84
---

Options affecting the output of the compilation. `output` options tell webpack how to write the compiled files to disk. Note, that while there can be multiple `entry` points, only one `output` configuration is specified.

If you use any hashing (`[hash]` or `[chunkhash]`), make sure to have a consistent ordering of modules. Use the `OccurrenceOrderPlugin` or `recordsPath`.

## Usage

The minimum requirements for the `output` property in your webpack config is to set its value to an object including the following two things :

Your preferred `filename` of the compiled file: `// main.js || bundle.js || index.js`

An [`output.path`](#output-path) as an **absolute path** for what directory you prefer it to go in once bundled.

**webpack.config.js**

```javascript
const config = {
  output: {
    filename: 'bundle.js',
    path: '/home/proj/public/assets'
  }
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

> see also [library](/guides/author-libraries/)

> see also [Development Tools](/guides/development/#choosing-a-tool)

### `output.devtoolLineToLine`

Enable line-to-line mapped mode for all/specified modules. Line-to-line mapped mode uses a simple SourceMap where each line of the generated source is mapped to the same line of the original source. It's a performance optimization. Only use it if your performance needs to be better and you are sure that input lines match which generated lines.

`true` enables it for all modules (not recommended)

An object `{test, include, exclude}` similar to `module.loaders` enables it for specific files.

> Default: `false`

### `output.filename`

Specifies the name of each output file on disk. You must **not** specify an absolute path here! The `output.path` option determines the location on disk the files are written. `filename` is used solely for naming the individual files.

**single entry**

```javascript
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

```javascript
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

The JSONP function used by webpack for async loading of chunks.

A shorter function may reduce the file size a bit. Use a different identifier when having multiple webpack instances on a single page.

> Default: `"webpackJsonp"`

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

### `output.path`

The output directory as an **absolute path** (required).

`[hash]` is replaced by the hash of the compilation.

**config.js**

```javascript
output: {
    path: "/home/proj/public/assets",
    publicPath: "/assets/"
}
```

**index.html**

```html
<head>
  <link href="/assets/spinner.gif"/>
</head>
```

And a more complicated example of using a CDN and hashes for assets.

**config.js**

```javascript
output: {
    path: "/home/proj/cdn/assets/[hash]",
    publicPath: "http://cdn.example.com/assets/[hash]/"
}
```

**Note:** In cases when the eventual `publicPath` of output files isn't known at compile time, it can be left blank and set dynamically at runtime in the entry point file. If you don't know the `publicPath` while compiling, you can omit it and set `__webpack_public_path__` on your entry point.

```javascript
 __webpack_public_path__ = myRuntimePublicPath

// rest of your application entry
```

### `output.sourceMapFilename`

The filename of the SourceMaps for the JavaScript files. They are inside the `output.path` directory.

`[file]` is replaced by the filename of the JavaScript file.

`[id]` is replaced by the id of the chunk.

`[hash]` is replaced by the hash of the compilation.

> Default: `"[file].map"`

