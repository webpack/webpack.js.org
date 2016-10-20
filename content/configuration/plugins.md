---
title: 插件
contributors:
  - sokra
  - skipjack
---

?> `plugins` customize the webpack build process in a variety of ways. This page discusses using existing plugins, however if you are interested in writing your own please visit Writing a Plugin.

## `plugins`

`array`

A list of webpack plugins. For example, when multiple bundles share some of the same dependencies, the `CommonsChunkPlugin` could be useful to extract those dependencies into a shared bundle to avoid duplication. This could be added like so:

```js
plugins: [
  new webpack.optimize.CommonsChunkPlugin({
    ...
  })
]
```

A more complex example, using multiple plugins, might look something like this:

?> Add a more detailed example
