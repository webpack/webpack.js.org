---
title: EvalSourceMapDevToolPlugin
group: webpack
contributors:
  - johnnyreilly
  - simon04
  - kinseyost
  - byzyk
  - madhavarshney
  - koke
  - jamesgeorge007
  - anshumanv
  - EugeneHlushko
related:
  - title: Building Eval Source Maps
    url: https://survivejs.com/webpack/building/source-maps/#sourcemapdevtoolplugin-and-evalsourcemapdevtoolplugin
---

This plugin enables more fine grained control of source map generation. It is also enabled automatically by certain settings of the [`devtool`](/configuration/devtool/) configuration option.

```js
new webpack.EvalSourceMapDevToolPlugin(options);
```

## Options

The following options are supported:

- `test` (`string|RegExp|array`): Include source maps for modules based on their extension (defaults to `.js` and `.css`).
- `include` (`string|RegExp|array`): Include source maps for module paths that match the given value.
- `exclude` (`string|RegExp|array`): Exclude modules that match the given value from source map generation.
- `append` (`string`): Appends the given value to the original asset. Usually the `#sourceMappingURL` comment. `[url]` is replaced with a URL to the source map file. `false` disables the appending.
- `moduleFilenameTemplate` (`string`): See [`output.devtoolModuleFilenameTemplate`](/configuration/output/#outputdevtoolmodulefilenametemplate).
- `module` (`boolean`): Indicates whether loaders should generate source maps (defaults to `true`).
- `columns` (`boolean`): Indicates whether column mappings should be used (defaults to `true`).
- `protocol` (`string`): Allows user to override default protocol (`webpack-internal://`)

T> Setting `module` and/or `columns` to `false` will yield less accurate source maps but will also improve compilation performance significantly.

T> If you want to use a custom configuration for this plugin in [development mode](/configuration/mode/#mode-development), make sure to disable the default one. I.e. set `devtool: false`.

## Examples

The following examples demonstrate some common use cases for this plugin.

### Basic Use Case

You can use the following code to replace the configuration option `devtool: eval-source-map` with an equivalent custom plugin configuration:

```js
module.exports = {
  // ...
  devtool: false,
  plugins: [new webpack.EvalSourceMapDevToolPlugin({})],
};
```

### Exclude Vendor Maps

The following code would exclude source maps for any modules in the `vendor.js` bundle:

```js
new webpack.EvalSourceMapDevToolPlugin({
  exclude: ['vendor.js'],
});
```
