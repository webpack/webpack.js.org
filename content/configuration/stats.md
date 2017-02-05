---
title: Stats
sort: 15
contributors:
  - SpaceK33z
  - sallar
---

The `stats` option lets you precisely control what bundle information gets displayed. This can be a nice middle ground if you don't want to use `quiet` or `noInfo` because you want some bundle information, but not all of it.

T> For webpack-dev-server, this property needs to be in the `devServer` object.

W> This option does not have any effect when using the Node.js API.

## `stats`

`object` `string`

There are some presets available to use as a shortcut. Use them like this:

```js
stats: "errors-only"
```

| Preset | Alternative | Description |
|--------|-------------|-------------|
| `"errors-only"` | *none*  | Only output when errors happen |
| `"minimal"`     | *none*  | Only output when errors or new compilation happen |
| `"none"`        | `false` | Output nothing |
| `"normal"`      | `true`  | Standard output |
| `"verbose"`     | *none*  | Output everything |

For more granular control, it is possible to specify exactly what information you want. Please note that all of the options in this object are optional.

``` js
stats: {
  // Add asset Information
  assets: true,
  // Sort assets by a field
  assetsSort: "field",
  // Add information about cached (not built) modules
  cached: true,
  // Add children information
  children: true,
  // Add chunk information (setting this to `false` allows for a less verbose output)
  chunks: true,
  // Add built modules information to chunk information
  chunkModules: true,
  // Add the origins of chunks and chunk merging info
  chunkOrigins: true,
  // Sort the chunks by a field
  chunksSort: "field",
  // Context directory for request shortening
  context: "../src/",
  // `webpack --colors` equivalent
  colors: true,
  // Add errors
  errors: true,
  // Add details to errors (like resolving log)
  errorDetails: true,
  // Add the hash of the compilation
  hash: true,
  // Add built modules information
  modules: true,
  // Sort the modules by a field
  modulesSort: "field",
  // Add public path information
  publicPath: true,
  // Add information about the reasons why modules are included
  reasons: true,
  // Add the source code of modules
  source: true,
  // Add timing information
  timings: true,
  // Add webpack version information
  version: true,
  // Add warnings
  warnings: true
};
```
