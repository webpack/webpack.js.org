---
title: SourceMapDevToolPlugin
contributors:
  - johnnyreilly
  - simon04
related:
  - title: Building Source Maps
    url: https://survivejs.com/webpack/building/source-maps/#-sourcemapdevtoolplugin-and-evalsourcemapdevtoolplugin-
---

This plugin enables a more fine grained control of [source maps added via the `devtool` option](/configuration/devtool/).

```javascript
new webpack.SourceMapDevToolPlugin(options)
```


## Options

The following options are supported:

* `options.test` / `options.include` / `options.exclude` (`string|RegExp|Array`): Used to determine which assets should be processed. Each one can be a `RegExp` (asset filename is matched), a `string` (asset filename need to start with this string) or an `Array` of those (any of them need to be matched). `test` defaults to `.js` and `.css` files if omitted.
* `options.filename` (`string`): defines the output filename of the SourceMap. If no value is provided the source map is inlined.
* `options.append` (`string`): is appended to the original asset. Usually the `#sourceMappingURL` comment. `[url]` is replaced with a URL to the source map file. `false` disables the appending.
* `options.moduleFilenameTemplate` / `options.fallbackModuleFilenameTemplate` (`string`): see [`output.devtoolModuleFilenameTemplate`](/configuration/output/#output-devtoolmodulefilenametemplate).
* `options.module` (`boolean`):  (defaults to `true`) When `false` loaders do not generate source maps and the transformed code is used as source instead.
* `options.columns` (`boolean`):  (defaults to `true`) When `false` column mappings in source maps are ignored and a faster source map implementation is used.
* `options.lineToLine` (`{test: string|RegExp|Array, include: string|RegExp|Array, exclude: string|RegExp|Array}` matched modules uses simple (faster) line to line source mappings.


## Usage: Exclude Vendor Maps

The following code would exclude source maps for any modules in the `vendor.js` bundle:

```javascript
new webpack.SourceMapDevToolPlugin({
  filename: '[name].js.map',
  exclude: ['vendor.js']
})
```
