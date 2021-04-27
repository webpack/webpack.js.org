---
title: SourceMapDevToolPlugin
contributors:
  - johnnyreilly
  - simon04
  - neilkennedy
  - byzyk
  - EugeneHlushko
translators:
  - jacob-lcs
related:
  - title: Building Source Maps
    url: https://survivejs.com/webpack/building/source-maps/#-sourcemapdevtoolplugin-and-evalsourcemapdevtoolplugin-
---

本插件实现了对 source map 生成内容进行更细粒度的控制。它也可以根据 [`devtool`](/configuration/devtool/) 配置选项的某些设置来自动启用。

```js
new webpack.SourceMapDevToolPlugin(options);
```

## 配置项 {#options}

支持以下配置项：

- `test`（`string` `RegExp` `[string, RegExp]`）：包含基于扩展名的模块的 source map（默认是 `.js`, `.mjs` 和 `.css`）。
- `include`（`string` `RegExp` `[string, RegExp]`）：使路径与该值匹配的模块生成 source map。
- `exclude`（`string` `RegExp` `[string, RegExp]`）：使匹配该值的模块不生成 source map。
- `filename`（`string`）：定义生成的 SourceMap 的名称（不设置将默认置为 inlined）。
- `append`（`string`）：在原始资源后追加给定值。通常是 `#sourceMappingURL` 注释。`[url]` 被替换成 source map 文件的 URL。webpack v4.36.0 之后支持 path 参数：`[chunk]`、`[filename]` 和 `[contenthash]`。设置 `append` 为 `false` 会禁止追加。
- `moduleFilenameTemplate`（`string`）：查看 [`output.devtoolModuleFilenameTemplate`](/configuration/output/#outputdevtoolmodulefilenametemplate)。
- `fallbackModuleFilenameTemplate`（`string`）：查看上面的链接。
- `namespace`（`string`）：查看 [`output.devtoolNamespace`](/configuration/output/#outputdevtoolnamespace)。
- `module = true`（`boolean`）：表示 loader 是否生成 source map。
- `columns = true`（`boolean`）：表示是否应该使用 column mapping。
- `noSources = false`（`boolean`）：防止源文件的内容被包含在 source map 中。
- `publicPath` (`string`)：生成带 public path 前缀的绝对 URL，例如：`https://example.com/project/`。
- `fileContext` (`string`)：使得 `[file]` 参数作为本目录的相对路径。
- `sourceRoot`（`string`）：给 SourceMap 中的 `sourceRoot` 属性提供一个自定义值。

`fileContext` 配置在你想要将 source map 存储到上层目录，以避免 `../../` 出现在绝对路径 `[url]` 里面时是有用的。

T> 设置 `module` 和/或 `columns` 为 `false` 将会生成不太精确的 source map，但同时会显著地提升编译性能。

T> 如果你想在[开发模式](/configuration/mode/#mode-development)中使用该插件的自定义配置，请确保禁用默认配置。即设置 `devtool: false`。

W> 如果默认的 webpack `minimizer` 已经被覆盖（比如自定义 `TerserPlugin` 配置），请确保将其替换为 `sourceMap: true` 以启动 SourceMap 支持。

## 示例 {#examples}

下面的示例展示了本插件的一些常见用例。

### 基本使用 {#basic-use-case}

你可以使用以下代码将配置项 `devtool: inline-source-map` 替换为等效的自定义插件配置：

```js
module.exports = {
  // ...
  devtool: false,
  plugins: [new webpack.SourceMapDevToolPlugin({})],
};
```

### 排除 Vendor Maps {#exclude-vendor-maps}

以下代码会排除 `vendor.js` bundle 内模块的 source map。

```js
new webpack.SourceMapDevToolPlugin({
  filename: '[name].js.map',
  exclude: ['vendor.js'],
});
```

### 在宿主环境外部化 source map {#host-source-maps-externally}

设置 source map 的 URL。在宿主环境需要授权的情况下很有用。

```js
new webpack.SourceMapDevToolPlugin({
  append: '\n//# sourceMappingURL=https://example.com/sourcemap/[url]',
  filename: '[name].map',
});
```

还有一种场景，source map 存储在上层目录中时：

```code
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
  filename: 'sourcemaps/[file].map',
  publicPath: 'https://example.com/project/',
  fileContext: 'public',
});
```

将会生成以下 URL：

```code
https://example.com/project/sourcemaps/bundle-[hash].js.map
```
