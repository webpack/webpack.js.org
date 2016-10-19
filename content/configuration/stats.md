---
title: 统计
contributors:
  - SpaceK33z
  - viko16
---

`stats` 选项能让你准确地控制显示哪些包的信息。如果你希望得到部分包的信息（而不是一股脑全部输出），而不想使用 `quiet` 或者 `noInfo` 模式的时候，这个选项会是一个很好的折衷办法。

T> 对于 webpack-dev-server ，这个属性要放在 `devServer` 对象里。

## `stats`

`object` `string`

预设选项：`none`, `errors-only`, `minimal` 和 `verbose`。使用方法：

```js
stats: "errors-only"
```

对于更精细的控制，这样可以准确地指定你想要的信息：

```js
stats: {
  chunks: false,
  hash: false
}
```

此对象的可用属性包括：

* `assets`
* `children`
* `chunks`
* `errorDetails`
* `errors`
* `hash`
* `modules`
* `publicPath`
* `reasons`
* `source`
* `timings`
* `version`
* `warnings`
