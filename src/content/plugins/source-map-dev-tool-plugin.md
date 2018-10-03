---
title: SourceMapDevToolPlugin
contributors:
  - johnnyreilly
  - simon04
  - neilkennedy
  - byzyk
related:
  - title: Building Source Maps
    url: https://survivejs.com/webpack/building/source-maps/#-sourcemapdevtoolplugin-and-evalsourcemapdevtoolplugin-
---

This plugin enables more fine grained control of source map generation. It is also enabled automatically by certain settings of the [`devtool`](/configuration/devtool/) configuration option.

```js
new webpack.SourceMapDevToolPlugin(options);
```


## Options

The following options are supported:

- `test` (`string|regex|array`): Include source maps for modules based on their extension (defaults to `.js`, `.mjs`, and `.css`).
- `include` (`string|regex|array`): Include source maps for module paths that match the given value.
- `exclude` (`string|regex|array`): Exclude modules that match the given value from source map generation.
- `filename` (`string`): Defines the output filename of the SourceMap (will be inlined if no value is provided).
- `append` (`string`): Appends the given value to the original asset. Usually the `#sourceMappingURL` comment. `[url]` is replaced with a URL to the source map file. `false` disables the appending.
- `moduleFilenameTemplate` (`string`): See [`output.devtoolModuleFilenameTemplate`](/configuration/output/#output-devtoolmodulefilenametemplate).
- `fallbackModuleFilenameTemplate` (`string`): See link above.
- `module` (`boolean`): Indicates whether loaders should generate source maps (defaults to `true`).
- `columns` (`boolean`): Indicates whether column mappings should be used (defaults to `true`).
- `lineToLine` (`boolean` or `object`): Simplify and speed up source mapping by using line to line source mappings for matched modules.
- `noSources` (`boolean`): Prevents the source file content from being included in the source map (defaults to `false`).
- `publicPath` (`string`): Emits absolute URLs with public path prefix, e.g. `https://example.com/project/`.
- `fileContext` (`string`): Makes the `[file]` argument relative to this directory.

The `lineToLine` object allows for the same `test`, `include`, and `exclude` options described above.

The `fileContext` option is useful when you want to store source maps in an upper level directory to avoid `../../` appearing in the absolute `[url]`.

T> Setting `module` and/or `columns` to `false` will yield less accurate source maps but will also improve compilation performance significantly.

T> If you want to use a custom configuration for this plugin in [development mode](/concepts/mode/#mode-development), make sure to disable the default one. I.e. set `devtool: false`.

W> Remember that when using the [`UglifyJSPlugin`](/plugins/uglifyjs-webpack-plugin), you must utilize the `sourceMap` option.

## Examples

The following examples demonstrate some common use cases for this plugin.

### Basic Use Case

You can use the following code to replace the configuration option `devtool: inline-source-map` with an equivalent custom plugin configuration:

```js
module.exports = {
  // ...
  devtool: false,
  plugins: [
    new webpack.SourceMapDevToolPlugin({})
  ]
};
```

### Exclude Vendor Maps

The following code would exclude source maps for any modules in the `vendor.js` bundle:

```js
new webpack.SourceMapDevToolPlugin({
  filename: '[name].js.map',
  exclude: ['vendor.js']
});
```

### Host Source Maps Externally

Set a URL for source maps. Useful for hosting them on a host that requires authorization.

```js
new webpack.SourceMapDevToolPlugin({
  append: '\n//# sourceMappingURL=http://example.com/sourcemap/[url]',
  filename: '[name].map'
});
```

And for cases when source maps are stored in the upper level directory:

```code
project
|- dist
  |- public
    |- bundle-[hash].js
  |- sourcemaps
    |- bundle-[hash].js.map
```

With next config:

```js
new webpack.SourceMapDevToolPlugin({
  filename: 'sourcemaps/[file].map',
  publicPath: 'https://example.com/project/',
  fileContext: 'public'
});
```

Will produce the following URL:

```code
https://example.com/project/sourcemaps/bundle-[hash].js.map
```
