---
title: 统计
contributors:
  - SpaceK33z
---

The `stats` option lets you precisely control what bundle information gets displayed. This can be a nice middle ground if you don't want to use `quiet` or `noInfo` because you want some bundle information, but not all of it.

T> For webpack-dev-server, this property needs to be in the `devServer` object.

## `stats`

`object` `string`

There are some presets: `none`, `errors-only`, `minimal` and `verbose`. Use them like this:

```js
stats: "errors-only"
```

For more granular control, it is possible to specify exactly what information you want:

```js
stats: {
  chunks: false,
  hash: false
}
```

The available properties in this object are:

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
