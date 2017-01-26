---
title: source-map-dev-tool-plugin.md
contributors:
    - johnnyreilly
---

?> Review this content

给资源添加 SourceMap。

```javascript
new webpack.SourceMapDevToolPlugin(options)
```

* `options.test` / `options.include` / `options.exclude` (`string|RegExp|Array`): 用来规定哪些资源应该被处理。可以是 `RegExp`（匹配资源文件名），也可以是 `string`（资源文件名的开头）或者包含以上两种的 `Array`（需要匹配其中一个），`test` 如果没有设置，默认为 `.js` 文件。
* `options.filename` (`string`): 定义 SourceMap 输出的文件名。如果不设置，SourceMap 会放在代码文件里。
* `options.append` (`string`): 添加到原始资源之后。通常是 `#sourceMappingURL` 注释。`[url]`会被替换成 SourceMap 文件的路径。`false` 禁用添加。
* `options.moduleFilenameTemplate` / `options.fallbackModuleFilenameTemplate` (`string`): 请查阅 `output.devtoolModuleFilenameTemplate`。
* `options.module` (`boolean`):  (默认为 `true`) 当 `false` loaders 不产生 SourceMaps 时，将转换后的代码作为源.
* `options.columns` (`boolean`):  (默认为 `true`) 当 SourceMaps 里的 `false` column 映射 (mappings) 被忽略时，会使用一个更快的 SourceMap 实现。
* `options.lineToLine` (`{test: string|RegExp|Array, include: string|RegExp|Array, exclude: string|RegExp|Array}` 使用简单（快速）的「行到行资源映射(line to line source mappings)」来匹配模块。

## Examples

?> TODO

***

> 原文：https://webpack.js.org/plugins/source-map-dev-tool-plugin/