---
title: SourceMapDevToolPlugin
contributors:
  - johnnyreilly
  - simon04
  - neilkennedy
related:
  - title: Building Source Maps
    url: https://survivejs.com/webpack/building/source-maps/#-sourcemapdevtoolplugin-and-evalsourcemapdevtoolplugin-
---

本插件实现了对 source map 生成，进行更细粒度的控制。它可以替代 [`devtool`](/configuration/devtool/) 选项。

``` js
new webpack.SourceMapDevToolPlugin(options)
```


## 选项

支持以下选项：

- `test` (`string|regex|array`)：包含基于扩展名的模块的 source map（默认是 `.js` 和 `.css`）。
- `include` (`string|regex|array`)：使路径与该值匹配的模块生成 source map。
- `exclude` (`string|regex|array`)：使匹配该值的模块不生成 source map。
- `filename` (`string`)：定义生成的 source map 的名称（如果没有值将会变成 inlined）。
- `append` (`string`)：在原始资源后追加给定值。通常是 `#sourceMappingURL` 注释。`[url]` 被替换成 source map 文件的 URL。`false` 将禁用追加。
- `moduleFilenameTemplate` (`string`): 查看 [`output.devtoolModuleFilenameTemplate`](/configuration/output/#output-devtoolmodulefilenametemplate).
- `fallbackModuleFilenameTemplate` (`string`)：同上。
- `module` (`boolean`)：表示 loader 是否生成 source map（默认为 `true`）。
- `columns` (`boolean`)：表示是否应该使用 column mapping（默认为 `true`）。
- `lineToLine` (`object`)：通过行到行源代码映射(line to line source mappings)简化和提升匹配模块的源代码映射速度。
- `noSources` (`boolean`)：防止源文件的内容被包含在 source map 里（默认为 `false`）。
- `publicPath` (`string`)：生成带 public path 前缀的绝对 URL，例如：`https://example.com/project/`。
- `fileContext` (`string`)：使得 `[file]` 参数作为本目录的相对路径。

`lineToLine` 对象允许的值和上面 `test`，`include`，`exclude` 选项一样。

`fileContext` 选项在你想要将 source maps 存储到上层目录，避免 `../../` 出现在绝对路径 `[url]` 里面时有用。

T> 设置 `module` 和/或 `columns` 为 `false` 将会生成不太精确的 source map，但同时会显著地提升编译性能。

W> 记得在使用 [`UglifyJSPlugin`](/plugins/uglify-js-plugin) 时，必须使用 `sourceMap` 选项。

## 用法

下面的示例展示了本插件的一些常见用例。

### 排除 vendor 的 map

以下代码会排除 `vendor.js` 内模块的 source map。

``` js
new webpack.SourceMapDevToolPlugin({
  filename: '[name].js.map',
  exclude: ['vendor.js']
})
```

### 在宿主环境外部化 source map

设置 source map 的 URL。在宿主环境需要授权的情况下很有用。

``` js
new webpack.SourceMapDevToolPlugin({
  append: "\n//# sourceMappingURL=http://example.com/sourcemap/[url]",
  filename: '[name].map'
})
```

还有一种场景，source map 存储在上层目录中时：

``` js
project
|- dist
  |- public
    |- bundle-[hash].js
  |- sourcemaps
    |- bundle-[hash].js.map
```

如下设置：

``` js
new webpack.SourceMapDevToolPlugin({
  filename: "sourcemaps/[file].map",
  publicPath: "https://example.com/project/",
  fileContext: "public"
})
```

将会生成以下 URL：

``` js
https://example.com/project/sourcemaps/bundle-[hash].js.map`
```

***

> 原文：https://webpack.js.org/plugins/source-map-dev-tool-plugin/
