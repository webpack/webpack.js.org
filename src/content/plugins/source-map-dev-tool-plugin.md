---
title: SourceMapDevToolPlugin
group: webpack
contributors:
  - johnnyreilly
  - simon04
  - neilkennedy
  - byzyk
  - EugeneHlushko
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

- `test` (`string` `RegExp` `[string, RegExp]`): Include source maps for modules based on their extension (defaults to `.js`, `.mjs`, and `.css`).
- `include` (`string` `RegExp` `[string, RegExp]`): Include source maps for module paths that match the given value.
- `exclude` (`string` `RegExp` `[string, RegExp]`): Exclude modules that match the given value from source map generation.
- `filename` (`string`): Defines the output filename of the SourceMap (will be inlined if no value is provided).
- `append` (`string`): Appends the given value to the original asset. Usually the `#sourceMappingURL` comment. `[url]` is replaced with a URL to the source map file. Since webpack v4.36.0, path parameters are supported: `[chunk]`, `[filename]` and `[contenthash]`. Setting `append` to `false` disables the appending.
- `moduleFilenameTemplate` (`string`): See [`output.devtoolModuleFilenameTemplate`](/configuration/output/#outputdevtoolmodulefilenametemplate).
- `fallbackModuleFilenameTemplate` (`string`): See link above.
- `namespace` (`string`): See [`output.devtoolNamespace`](/configuration/output/#outputdevtoolnamespace).
- `module = true` (`boolean`): Indicates whether loaders should generate source maps.
- `columns = true` (`boolean`): Indicates whether column mappings should be used.
- `noSources = false` (`boolean`): Prevents the source file content from being included in the source map.
- `publicPath` (`string`): Emits absolute URLs with public path prefix, e.g. `https://example.com/project/`.
- `fileContext` (`string`): Makes the `[file]` argument relative to this directory.
- `sourceRoot` (`string`): Provide a custom value for the `sourceRoot` property in the SourceMap.

The `fileContext` option is useful when you want to store source maps in an upper level directory to avoid `../../` appearing in the absolute `[url]`.

T> Setting `module` and/or `columns` to `false` will yield less accurate source maps but will also improve compilation performance significantly.

T> If you want to use a custom configuration for this plugin in [development mode](/configuration/mode/#mode-development), make sure to disable the default one. I.e. set `devtool: false`.

W> If the default webpack `minimizer` has been overridden (such as to customise the `TerserPlugin` options), make sure to configure its replacement with `sourceMap: true` to enable SourceMap support.

## Examples

The following examples demonstrate some common use cases for this plugin.

### Basic Use Case

You can use the following code to replace the configuration option `devtool: inline-source-map` with an equivalent custom plugin configuration:

```js
module.exports = {
  // ...
  devtool: false,
  plugins: [new webpack.SourceMapDevToolPlugin({})],
};
```

### Exclude Vendor Maps

The following code would exclude source maps for any modules in the `vendor.js` bundle:

```js
new webpack.SourceMapDevToolPlugin({
  filename: '[name].js.map',
  exclude: ['vendor.js'],
});
```

### Host Source Maps Externally

Set a URL for source maps. Useful for hosting them on a host that requires authorization.

```js
new webpack.SourceMapDevToolPlugin({
  append: '\n//# sourceMappingURL=https://example.com/sourcemap/[url]',
  filename: '[name].map',
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
  fileContext: 'public',
});
```

Will produce the following URL:

```code
https://example.com/project/sourcemaps/bundle-[hash].js.map
```
