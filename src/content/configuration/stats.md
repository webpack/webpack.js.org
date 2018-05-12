---
title: 统计信息(stats)
sort: 15
contributors:
  - SpaceK33z
  - sallar
  - jungomi
  - ldrick
  - jasonblanchard
---

如果你不希望使用 `quiet` 或 `noInfo` 这样的不显示信息，而是又不想得到全部的信息，只是想要获取某部分 bundle 的信息，使用 stats 选项是比较好的折衷方式。

T> 对于 webpack-dev-server，这个属性要放在 `devServer` 对象里。

W> 在使用 Node.js API 时，此选项无效。

## `stats`

`object` `string`

有一些预设选项，可作为快捷方式。像这样使用它们：

```js
stats: "errors-only"
```

| Preset | Alternative | Description |
|--------|-------------|-------------|
| `"errors-only"` | *none*  | 只在发生错误时输出 |
| `"minimal"`     | *none*  | 只在发生错误或有新的编译时输出 |
| `"none"`        | `false` | 没有输出 |
| `"normal"`      | `true`  | 标准输出 |
| `"verbose"`     | *none*  | 全部输出 |

对于更加精细的控制，下列这些选项可以准确地控制并展示你想要的信息。请注意，此对象中的所有选项都是可选的。

``` js
stats: {

  // 未定义选项时，stats 选项的备用值(fallback value)（优先级高于 webpack 本地默认值）
  all: undefined,

  // 添加资源信息
  assets: true,

  // 对资源按指定的字段进行排序
  // 你可以使用 `!field` 来反转排序。
  assetsSort: "field",

  // 添加构建日期和构建时间信息
  builtAt: true,

  // 添加缓存（但未构建）模块的信息
  cached: true,

  // 显示缓存的资源（将其设置为 `false` 则仅显示输出的文件）
  cachedAssets: true,

  // 添加 children 信息
  children: true,

  // 添加 chunk 信息（设置为 `false` 能允许较少的冗长输出）
  chunks: true,

  // 将构建模块信息添加到 chunk 信息
  chunkModules: true,

  // 添加 chunk 和 chunk merge 来源的信息
  chunkOrigins: true,

  // 按指定的字段，对 chunk 进行排序
  // 你可以使用 `!field` 来反转排序。默认是按照 `id` 排序。
  chunksSort: "field",

  // 用于缩短 request 的上下文目录
  context: "../src/",

  // `webpack --colors` 等同于
  colors: false,

  // 显示每个模块到入口起点的距离(distance)
  depth: false,

  // 通过对应的 bundle 显示入口起点
  entrypoints: false,

  // 添加 --env information
  env: false,

  // 添加错误信息
  errors: true,

  // 添加错误的详细信息（就像解析日志一样）
  errorDetails: true,

  // 将资源显示在 stats 中的情况排除
  // 这可以通过 String, RegExp, 获取 assetName 的函数来实现
  // 并返回一个布尔值或如下所述的数组。
  excludeAssets: "filter" | /filter/ | (assetName) => ... return true|false |
    ["filter"] | [/filter/] | [(assetName) => ... return true|false],

  // 将模块显示在 stats 中的情况排除
  // 这可以通过 String, RegExp, 获取 moduleSource 的函数来实现
  // 并返回一个布尔值或如下所述的数组。
  excludeModules: "filter" | /filter/ | (moduleSource) => ... return true|false |
    ["filter"] | [/filter/] | [(moduleSource) => ... return true|false],

  // 和 excludeModules 相同
  exclude: "filter" | /filter/ | (moduleSource) => ... return true|false |
    ["filter"] | [/filter/] | [(moduleSource) => ... return true|false],

  // 添加 compilation 的哈希值
  hash: true,

  // 设置要显示的模块的最大数量
  maxModules: 15,

  // 添加构建模块信息
  modules: true,

  // 按指定的字段，对模块进行排序
  // 你可以使用 `!field` 来反转排序。默认是按照 `id` 排序。
  modulesSort: "field",

  // 显示警告/错误的依赖和来源（从 webpack 2.5.0 开始）
  moduleTrace: true,

  // 当文件大小超过 `performance.maxAssetSize` 时显示性能提示
  performance: true,

  // 显示模块的导出
  providedExports: false,

  // 添加 public path 的信息
  publicPath: true,

  // 添加模块被引入的原因
  reasons: true,

  // 添加模块的源码
  source: true,

  // 添加时间信息
  timings: true,

  // 显示哪个模块导出被用到
  usedExports: false,

  // 添加 webpack 版本信息
  version: true,

  // 添加警告
  warnings: true,

  // 过滤警告显示（从 webpack 2.4.0 开始），
  // 可以是 String, Regexp, 一个获取 warning 的函数
  // 并返回一个布尔值或上述组合的数组。第一个匹配到的为胜(First match wins.)。
  warningsFilter: "filter" | /filter/ | ["filter", /filter/] | (warning) => ... return true|false
};
```
