---
title: SourceMapDevToolPlugin
contributors:
    - johnnyreilly
---

?> Review this content

Adds SourceMaps for assets.

```javascript
new webpack.SourceMapDevToolPlugin(options)
```

* `options.test` / `options.include` / `options.exclude` (`string|RegExp|Array`): Used to determine which assets should be processed. Each one can be a `RegExp` (asset filename is matched), a `string` (asset filename need to start with this string) or an `Array` of those (any of them need to be matched). `test` defaults to `.js` files if omitted.
* `options.filename` (`string`): defines the output filename of the SourceMap. If no value is provided the SourceMap is inlined.
* `options.append` (`string`): is appended to the original asset. Usually the `#sourceMappingURL` comment. `[url]` is replaced with a URL to the SourceMap file. `false` disables the appending.
* `options.moduleFilenameTemplate` / `options.fallbackModuleFilenameTemplate` (`string`): see `output.devtoolModuleFilenameTemplate`.
* `options.module` (`boolean`):  (defaults to `true`) When `false` loaders do not generate SourceMaps and the transformed code is used as source instead.
* `options.columns` (`boolean`):  (defaults to `true`) When `false` column mappings in SourceMaps are ignored and a faster SourceMap implementation is used.
* `options.lineToLine` (`{test: string|RegExp|Array, include: string|RegExp|Array, exclude: string|RegExp|Array}` matched modules uses simple (faster) line to line source mappings.

## Examples

?> TODO
