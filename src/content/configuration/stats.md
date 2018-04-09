---
title: Stats
sort: 15
contributors:
  - SpaceK33z
  - sallar
  - jungomi
  - ldrick
  - jasonblanchard
  - TeffenEllis
  - jbottigliero
  - sokra
  - renjithvk
  - pierreneter
  - jasonblanchard
  - Hoten
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

  // fallback value for stats options when an option is not defined (has precedence over local webpack defaults)
  all: undefined,
  
  // Add asset Information
  assets: true,
  
  // Sort assets by a field
  // You can reverse the sort with `!field`.
  assetsSort: "field",
  
  // Add build date and time information
  builtAt: true,
  
  // Add information about cached (not built) modules
  cached: true,
  
  // Show cached assets (setting this to `false` only shows emitted files)
  cachedAssets: true,
  
  // Add children information
  children: true,
  
  // Add chunk information (setting this to `false` allows for a less verbose output)
  chunks: true,
  
  // Add built modules information to chunk information
  chunkModules: true,
  
  // Add the origins of chunks and chunk merging info
  chunkOrigins: true,
  
  // Sort the chunks by a field
  // You can reverse the sort with `!field`. Default is `id`.
  chunksSort: "field",
  
  // Context directory for request shortening
  context: "../src/",
  
  // `webpack --colors` equivalent
  colors: false,
  
  // Display the distance from the entry point for each module
  depth: false,
  
  // Display the entry points with the corresponding bundles
  entrypoints: false,
  
  // Add --env information
  env: false,
  
  // Add errors
  errors: true,
  
  // Add details to errors (like resolving log)
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
    
  // Add the hash of the compilation
  hash: true,
  
  // Set the maximum number of modules to be shown
  maxModules: 15,
  
  // Add built modules information
  modules: true,
  
  // Sort the modules by a field
  // You can reverse the sort with `!field`. Default is `id`.
  modulesSort: "field",
  
  // Show dependencies and origin of warnings/errors (since webpack 2.5.0)
  moduleTrace: true,
  
  // Show performance hint when file size exceeds `performance.maxAssetSize`
  performance: true,
  
  // Show the exports of the modules
  providedExports: false,
  
  // Add public path information
  publicPath: true,
  
  // Add information about the reasons why modules are included
  reasons: true,
  
  // Add the source code of modules
  source: true,
  
  // Add timing information
  timings: true,
  
  // Show which exports of a module are used
  usedExports: false,
  
  // Add webpack version information
  version: true,
  
  // Add warnings
  warnings: true,
  
  // Filter warnings to be shown (since webpack 2.4.0),
  // can be a String, Regexp, a function getting the warning and returning a boolean
  // or an Array of a combination of the above. First match wins.
  warningsFilter: "filter" | /filter/ | ["filter", /filter/] | (warning) => ... return true|false
};
```
