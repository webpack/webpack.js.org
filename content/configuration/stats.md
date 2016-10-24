---
title: 统计
contributors:
  - SpaceK33z
  - sallar
  - viko16
---

`stats` 选项能让你准确地控制显示哪些包的信息。如果你希望得到部分包的信息（而不是一股脑全部输出），而不想使用 `quiet` 或者 `noInfo` 模式的时候，这个选项是一个很好的折衷办法。

T> 对于 webpack-dev-server ，这个属性要放在 `devServer` 对象里。

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
| `"verbose"`     | *none*  | 全部输出 |

对于更加精细的控制，这些选项可以准确地列出你想要的信息。请注意，此对象中的所有选项都是可选的。

``` js
stats: {
  // 增加资源信息
  assets: true,
  // 对资源按指定的项进行排序
  assetsSort: "field",
  // 增加缓存了的（但没构建）模块的信息
  cached: true,
  // 增加子级的信息
  children: true,
  // 增加包信息（设置为 `false` 能允许较少的冗长输出）
  chunks: true,
  // 将内置模块信息增加到包信息
  chunkModules: true,
  // 增加包 和 包合并 的来源信息
  chunkOrigins: true,
  // 对包按指定的项进行排序
  chunksSort: "field",
  // 用于缩短请求的上下文目录
  context: "../src/",
  // 增加错误信息
  errors: true,
  // 增加错误的详细信息（就像解析日志一样）
  errorDetails: true,
  // 增加编译的哈希值
  hash: true,
  // 增加内置的模块信息
  modules: true,
  // 对模块按指定的项进行排序
  modulesSort: "field",
  // 增加 publicPath 的信息
  publicPath: true,
  // 增加模块被引入的原因
  reasons: true,
  // 增加模块的源码
  source: true,
  // 增加时间信息
  timings: true,
  // 增加 webpack 版本信息
  version: true,
  // 增加提示
  warnings: true
};
```
