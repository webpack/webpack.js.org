---
title: Plugins
contributors:
  - sokra
  - gregvenech
---

The top-level `plugins` key allows customizing the webpack build process in a variety of ways. This page discusses using existing plugins, however if you are interested in writing your own please jump to the [Writing a Plugin]().

### `plugins`

`array`

A list of [webpack plugins]() used for a wide variety of tasks. For example, when multiple bundles share some of the same dependencies the [CommonsChunkPlugin]() could be useful to extract these into a shared bundle. This could be added like so:

```js
plugins: [
  new webpack.optimize.CommonsChunkPlugin({
    ...
  })
]
```

A more complex example, using multiple plugins, might look something like this:

?> Add a more detailed example
