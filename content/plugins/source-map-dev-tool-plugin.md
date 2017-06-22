---
title: SourceMapDevToolPlugin
contributors:
  - johnnyreilly
  - simon04
related:
  - title: Building Source Maps
    url: https://survivejs.com/webpack/building/source-maps/#-sourcemapdevtoolplugin-and-evalsourcemapdevtoolplugin-
---

该插件可以对[通过 `devtool` 选项添加的 source map] 进行更细粒度的控制(fine grained control)。

```javascript
new webpack.SourceMapDevToolPlugin(options)
```


## 选项

支持以下选项：

* `options.test` / `options.include` / `options.exclude` (`string|RegExp|Array`)：用于决定应该处理哪个资源。其中每个都可以是一个`正则表达式`（匹配资源文件名），或一个`字符串`（资源文件名需要以此字符串开头），或一个`数组`（必须匹配数组中的每一项）。如果省略不设置，`test` 默认是 `.js` 和 `.css` 文件。
* `options.filename` (`string`)：定义 SourceMap 的输出文件名。如果没有提供值，则 source map 是内联的。
* `options.append` (`string`): 追加到原始资源。通常以 `#sourceMappingURL` 注释。`[url]` 替换为 source map 文件的 URL。`false` 禁止追加。
* `options.moduleFilenameTemplate` / `options.fallbackModuleFilenameTemplate` (`string`)：查看 [`output.devtoolModuleFilenameTemplate`](/configuration/output/#output-devtoolmodulefilenametemplate)。
* `options.module` (`boolean`):  (defaults to `true`) 为 `false` 时， loader 不再生成 source map，并且转换过的代码被用作源码。
* `options.columns` (`boolean`):  (defaults to `true`) 为 `false` 时，source map 中的列映射(column mapping)被忽略，并且使用更快速的 source map 实现。
* `options.lineToLine` (`{test: string|RegExp|Array, include: string|RegExp|Array, exclude: string|RegExp|Array}`) 匹配的模块使用简单（快速）的行到行(line to line) source map。


## 用法：排除 Vendor 的 Map 文件

以下代码将排除 `vendor.js` bundle 中任何模块的 source map：

```javascript
new webpack.SourceMapDevToolPlugin({
  filename: '[name].js.map',
  exclude: ['vendor.js']
})
```

***

> 原文：https://webpack.js.org/plugins/source-map-dev-tool-plugin/