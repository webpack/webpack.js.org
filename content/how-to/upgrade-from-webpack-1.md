---
title: How to Upgrade from Webpack 1?
---

### `resolve.root`, `resolve.fallback`, `resolve.modulesDirectories`

These options were replaced by a single option `resolve.modules`. See [resolving](../api/resolving.md) for more usage.

``` diff
  resolve: {
-   root: path.join(__dirname, "src")
+   modules: [
+     path.join(__dirname, "src"),
+     "node_modules"
+   ]
  }
```

### `resolve.extensions`

This option no longer requires passing an empty string. This behavior was moved to `resolve.enforceExtension`. See [resolving](../api/resolving.md) for more usage.

### `resolve.*`

More stuff was changed here. Not listed in detail as not commonly used. See [resolving](../api/resolving.md) for details.

### `debug`

The `debug` option was replaced by a plugin.

``` diff
- debug: true,
  plugins: [
+   new webpack.LoaderOptionsPlugin({
+     debug: true
+   })
  ]
```

### `UglifyJsPlugin` sourceMap

The `sourceMap` option of the `UglifyJsPlugin` now defaults to `false` instead of `true`.
This means if using SourceMaps for the minimized code you need to pass `sourceMap: true`.

``` diff
  devtool: "source-map",
  plugins: [
    new UglifyJsPlugin({
+     sourceMap: true
    })
  ]
```

### `OccurrenceOrderPlugin` is now on by default

It's no longer neccessary to specify it in configuration.

``` diff
  plugins: [
-   new webpack.optimize.OccurrenceOrderPlugin()
  ]
```

### full dynamic requires now fail by default

A dependency with only an expression (i. e. `require(expr)`) will now create an empty context instead of an context of the complete directory.

Best refactor this code as it won't work with ES6 Modules. If this is not possible you can use the `ContextReplacementPlugin` to hint the compiler to the correct resolvings. See [dynamic dependencies](dynamic-dependencies.md).

### Using custom arguments in CLI and configuration

If you abused the CLI to pass custom arguments to the configration like so:

`webpack --custom-stuff`

``` js
// webpack.config.js
var customStuff = process.argv.indexOf("--custom-stuff") >= 0;
/*...*/
```

You may notice that this is no longer allowed. CLI is more strict now.

Instead there is an interface for passing arguments to the configuration. This should be used instead. Future tool may rely on this.

`webpack --env.customStuff`

``` js
module.exports = function(env) {
  var config, customStuff = env.customStuff;
  /*...*/
  return config;
};
```

See [CLI](../api/cli.md).

### `require.ensure` and AMD `require` is async

These functions are now always async instead of calling their callback sync if the chunk is already loaded.
