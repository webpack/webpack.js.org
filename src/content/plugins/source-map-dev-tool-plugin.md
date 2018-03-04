---
title: SourceMapDevToolPlugin
contributors:
  - johnnyreilly
  - simon04
related:
  - title: Building Source Maps
    url: https://survivejs.com/webpack/building/source-maps/#-sourcemapdevtoolplugin-and-evalsourcemapdevtoolplugin-
---

本插件实现了对source map的产生的更细粒度的控制。它可以替代`devtool`选项。

```js
new webpack.SourceMapDevToolPlugin(options)
```

## 选项
支持的选项如下：

- `test`: (`string|regex|array`)：包含基于扩展名的模块的source map（默认是`.js`和`.css`）。
- `include` (`string|regex|array`)：使路径与该值匹配的模块产出source map。
- `exclude` (`string|regex|array`)：使匹配该值的模块不产出 source map。
- `filename` (`string`)：定义产出source map的名称（如果没有值将会变成 inlined）。
- `append` (`string`)：在原素材后追加给定值。通常是`#sourceMappingURL`评论。`[url]`被替换成source map文件的URL。`false`将禁用追加。
- `moduleFilenameTemplate` (`string`): 查看 [`output.devtoolModuleFilenameTemplate`](/configuration/output/#output-devtoolmodulefilenametemplate).
- `fallbackModuleFilenameTemplate` (`string`)：同上。
- `module` (`boolean`)：表示loader是否产出source map（默认为`true`）。
- `columns` (`boolean`)：表示是否应该使用column mapping（默认为`true`）。
- `lineToLine` (`object`)：通过line to line源代码映射简化和提升匹配模块的源代码映射速度。
- `noSources` (`boolean`)：防止源文件的内容被包含在source map里（默认为`false`）。
- `publicPath` (`string`)：产出带public path前缀的绝对URL，例如：`https://example.com/project/`。
- `fileContext` (`string`)：使得`[file]`参数作为本目录的相对路径。

`lineToLine`对象允许的值和上面`test`，`include`，`exclude`选项一样。

`fileContext` 选项在你想要将source maps存储到上层目录，避免`../../`出现在绝对路径`[url]`里面时有用。

T> 设置`module`和/或`columns`为`false`将会产出不太精确的source map，但同时会显著地提升编译性能。

W> 记得在使用[`UglifyJSPlugin`](/plugins/uglify-js-plugin)时，必须使用`sourceMap`选项。

## 例子
下面的例子展示了本插件的一些常见用例。

### 排除 vendor map
以下代码会排除`vendor.js`内模块的source map。

```js
new webpack.SourceMapDevToolPlugin({
  filename: '[name].js.map',
  exclude: ['vendor.js']
})
```

### 外部 source map
设置 source map的 URL。在主机需要授权的情况下很有用。

```js
new webpack.SourceMapDevToolPlugin({
  append: "\n//# sourceMappingURL=http://example.com/sourcemap/[url]",
  filename: '[name].map'
})
```

还有 source map 存储在上层目录中时：

```js
project
|- dist
  |- public
    |- bundle-[hash].js
  |- sourcemaps
    |- bundle-[hash].js.map
```

如下设置：

```js
new webpack.SourceMapDevToolPlugin({
  filename: "sourcemaps/[file].map",
  publicPath: "https://example.com/project/",
  fileContext: "public"
})
```

将会产出：

```js
https://example.com/project/sourcemaps/bundle-[hash].js.map`
```

***

> 原文：https://webpack.js.org/plugins/source-map-dev-tool-plugin/
