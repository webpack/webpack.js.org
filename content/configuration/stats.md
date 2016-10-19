---
title: Stats
contributors:
  - SpaceK33z
  - sallar
---

The `stats` option lets you precisely control what bundle information gets displayed. This can be a nice middle ground if you don't want to use `quiet` or `noInfo` because you want some bundle information, but not all of it.

T> For webpack-dev-server, this property needs to be in the `devServer` object.

## `stats`

`object` `string`

There are some presets available to use as a shortcut. Use them like this:

```js
stats: "errors-only"
```

| Preset | Alternative | Description |
|--------|-------------|-------------|
| `"none"`        | `false` | Output nothing |
| `"errors-only"` | *none*  | Only output when errors happen |
| `"minimal"`     | *none*  | Only output when errors or new compilation happen |
| `"normal"`      | `true`  | Standard output |
| `"verbose"`     | *none*  | Output everything |

For more granular control, it is possible to specify exactly what information you want. Please note that all of the options in this object are optional.

``` js
stats: {
  // Context directory for request shortening
  context: "../src/",
  // Add the hash of the compilation
  hash: true,
  // Add webpack version information
  version: true,
  // Add timing information
  timings: true,
  // Add asset Information
  assets: true,
  // Add chunk information (setting this to `false` allows for a less verbose output)
  chunks: true,
  // Add built modules information to chunk information
  chunkModules: true,
  // Add built modules information
  modules: true,
  // Add children information
  children: true,
  // Add information about cached (not built) modules
  cached: true,
  // Add information about the reasons why modules are included
  reasons: true,
  // Add the source code of modules
  source: true,
  // Add warnings
  warnings: true,
  // Add errors
  errors: true,
  // Add details to errors (like resolving log)
  errorDetails: true,
  // Add the origins of chunks and chunk merging info
  chunkOrigins: true,
  // Add public path information
  publicPath: true,
  // Sort the modules by a field
  modulesSort: "field",
  // Sort the chunks by a field
  chunksSort: "field",
  // Sort assets by a filed
  assetsSort: "field"
};
```
