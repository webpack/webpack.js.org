---
title: 统计(Stats)
sort: 15
contributors:
  - SpaceK33z
  - sallar
  - jungomi
  - ldrick
  - jasonblanchard
---

`stats` 选项能让你准确地控制显示哪些包的信息。如果你希望得到部分包的信息（而不是一股脑全部输出），而不想使用 `quiet` 或者 `noInfo` 模式的时候，这个选项是一个很好的折衷办法。

T> 对于 webpack-dev-server ，这个属性要放在 `devServer` 对象里。

W> 在使用 Node.js API 后，此选项无效。

## `stats`

`object` `string`

预设选项：`none`, `errors-only`, `minimal` 和 `verbose`。使用方法：

```js
stats: "errors-only"
```

| Preset | Alternative | Description |
|--------|-------------|-------------|
| `"errors-only"` | *none*  | 只在发生错误时输出 |
| `"minimal"`     | *none*  | 只在发生错误 或是 新的编译时输出 |
| `"none"`        | `false` | 没有输出 |
| `"normal"`      | `true`  | 标准输出 |
| `"detailed"`    | *none*  | 详细输出（从 webpack 3.0.0 开始） |
| `"verbose"`     | *none*  | 全部输出 |

对于更加精细的控制，这些选项可以准确地列出你想要的信息。请注意，此对象中的所有选项都是可选的。

``` js
stats: {
  // fallback value for stats options when an option is not defined (has precedence over local webpack defaults)
  all: undefined,
  // 增加资源信息
  assets: true,
  // 对资源按指定的项进行排序
  // 你可以使用 `!field` 来反转排序。
  assetsSort: "field",
  // 增加缓存了的（但没构建）模块的信息
  cached: true,
  // Show cached assets (setting this to `false` only shows emitted files)
  cachedAssets: true,
  // 增加子级的信息
  children: true,
  // 增加包信息（设置为 `false` 能允许较少的冗长输出）
  chunks: true,
  // 将内置模块信息增加到包信息
  chunkModules: true,
  // 增加包 和 包合并 的来源信息
  chunkOrigins: true,
  // 对包按指定的项进行排序
  // 你可以使用 `!field` 来反转排序。默认是按照 `id` 排序。
  chunksSort: "field",
  // 用于缩短请求的上下文目录
  context: "../src/",
  // `webpack --colors` 等同于
  colors: true,
  // Display the distance from the entry point for each module
  depth: false,
  // Display the entry points with the corresponding bundles
  entrypoints: false,
  // 增加 --env information
  env: false,
  // 增加错误信息
  errors: true,
  // 增加错误的详细信息（就像解析日志一样）
  errorDetails: true,
  // Exclude assets from being displayed in stats
  // This can be done with a String, a RegExp, a Function getting the assets name
  // and returning a boolean or an Array of the above.
  excludeAssets: "filter" | /filter/ | (assetName) => ... return true|false |
    ["filter"] | [/filter/] | [(assetName) => ... return true|false],
  // Exclude modules from being displayed in stats
  // This can be done with a String, a RegExp, a Function getting the modules source
  // and returning a boolean or an Array of the above.
  excludeModules: "filter" | /filter/ | (moduleSource) => ... return true|false |
    ["filter"] | [/filter/] | [(moduleSource) => ... return true|false],
  // See excludeModules
  exclude: "filter" | /filter/ | (moduleSource) => ... return true|false |
    ["filter"] | [/filter/] | [(moduleSource) => ... return true|false],
  // 增加编译的哈希值
  hash: true,
  // Set the maximum number of modules to be shown
  maxModules: 15,
  // 增加内置的模块信息
  modules: true,
  // 对模块按指定的项进行排序
  // 你可以使用 `!field` 来反转排序。默认是按照 `id` 排序。
  modulesSort: "field",
  // Show dependencies and origin of warnings/errors (since webpack 2.5.0)
  moduleTrace: true,
  // Show performance hint when file size exceeds `performance.maxAssetSize`
  performance: true,
  // Show the exports of the modules
  providedExports: false,
  // 增加 public path 的信息
  publicPath: true,
  // 增加模块被引入的原因
  reasons: true,
  // 增加模块的源码
  source: true,
  // 增加时间信息
  timings: true,
  // Show which exports of a module are used
  usedExports: false,
  // 增加 webpack 版本信息
  version: true,
  // 增加提示
  warnings: true,
  // Filter warnings to be shown (since webpack 2.4.0),
  // can be a String, Regexp, a function getting the warning and returning a boolean
  // or an Array of a combination of the above. First match wins.
  warningsFilter: "filter" | /filter/ | ["filter", /filter/] | (warning) => ... return true|false
};
```

***

> 原文：https://webpack.js.org/configuration/stats/
