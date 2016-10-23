---
title: 如何从 webpack1 升级？
contributors:
  - sokra
---

### `resolve.root`, `resolve.fallback`, `resolve.modulesDirectories`

These options were replaced by a single option `resolve.modules`. See [resolving](/configuration/resolve) for more usage.

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

This option no longer requires passing an empty string. This behavior was moved to `resolve.enforceExtension`. See [resolving](/configuration/resolve) for more usage.

### `resolve.*`

More stuff was changed here. Not listed in detail as it's not commonly used. See [resolving](/configuration/resolve) for details.

### `debug`

The `debug` option switched loaders to debug mode in webpack 1. This need to be passed via loader options in long-term. See loader documentation for relevant options.

The debug mode for loaders will be removed in webpack 3 or later.

To keep compatibility with old loaders, loaders can be switched to debug mode via plugin:

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

### `UglifyJsPlugin` minimize loaders

The UglifyJsPlugin does not longer switch loaders into minimize mode. This need to be passed via loader options in long-term. See loader documentation for relevant options.

The minimize mode for loaders will be removed in webpack 3 or later.

To keep compatibility with old loaders, loaders can be switched to minimize mode via plugin:

``` diff
  plugins: [
+   new webpack.LoaderOptionsPlugin({
+     minimize: true
+   })
  ]
```

### `OccurrenceOrderPlugin` is now on by default

It's no longer neccessary to specify it in configuration.

``` diff
  plugins: [
-   new webpack.optimize.OccurrenceOrderPlugin()
  ]
```

### `ExtractTextWebpackPlugin` - breaking change

[ExtractTextPlugin](https://github.com/webpack/extract-text-webpack-plugin) 1.0.0 does not work with webpack 2. The changes are mainly syntactical

#### `ExtractTextPlugin.extract`

```diff
module: {
  loaders: [
    test: /.css$/,
-    loader: ExtractTextPlugin.extract['css-loader']
+    loader: ExtractTextPlugin.extract({
+               fallbackLoader: "style-loader",
+               loader: "css-loader",
+               publicPath: "/dist" // Overrides output.publicPath
+     })
  ]
}
```

#### `new ExtractTextPlugin({options})`

```diff
plugins: [
-  new ExtractTextPlugin("bundle.css", {allChunks: true, disable: false})
+  new ExtractTextPlugin({
+   filename: "bundle.css",
+   disable: false,
+   allChunks: true
+  })
]
```


### full dynamic requires now fail by default

A dependency with only an expression (i. e. `require(expr)`) will now create an empty context instead of an context of the complete directory.

Best refactor this code as it won't work with ES6 Modules. If this is not possible you can use the `ContextReplacementPlugin` to hint the compiler to the correct resolvings. See [dynamic dependencies](dynamic-dependencies).

### Using custom arguments in CLI and configuration

If you abused the CLI to pass custom arguments to the configration like so:

`webpack --custom-stuff`

``` js
// webpack.config.js
var customStuff = process.argv.indexOf("--custom-stuff") >= 0;
/*...*/
```

You may notice that this is no longer allowed. The CLI is more strict now.

Instead there is an interface for passing arguments to the configuration. This should be used instead. Future tool may rely on this.

`webpack --env.customStuff`

``` js
module.exports = function(env) {
  var config, customStuff = env.customStuff;
  /*...*/
  return config;
};
```

See [CLI](../api/cli).

### `require.ensure` and AMD `require` is async

These functions are now always async instead of calling their callback sync if the chunk is already loaded.

### `module.loaders` is now `module.rules`

The old loader configuration was superseeded by a more powerful rules system, which allows to configure loaders and more.

For compatibility reasons the old syntax is still valid and the old names are parsed.

The new naming is easier to understand to there are good reasons to upgrade the configuration.

``` diff
  module: {
-   loaders: [
+   rules: [
      {
        test: /\.css$/,
-       loaders: [
+       use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
-           query: {
+           options: {
              modules: true
            }
        ]
      }
    ]
  }
```

### `module.preLoaders` and `module.postLoaders` was removed

``` diff
  module: {
-   preLoaders: [
+   rules: [
      {
        test: /\.js$/,
+       enforce: "pre",
        loader: "eslint-loader"
      }
    ]
  }
```

### `LoaderOptionPlugin` context

Some loaders need context information and read them from the configuration. This need to be passed via loader options in long-term. See loader documentation for relevant options.

To keep compatibility with old loaders, this information can be passed via plugin:

``` diff
  plugins: [
+   new webpack.LoaderOptionsPlugin({
+     options: {
+       context: __dirname
+     }
+   })
  ]
```

#### Code Splitting with ES6

In webpack v1, you could use `require.ensure` as a method to lazily-load chunks for your application:

```javascript
require.ensure([], function(require) {
  var foo = require("./module");
});
```

The ES6 Loader spec defines `System.import` as method to load ES6 Modules dynamically on runtime.

webpack treats `System.import` as a split-point and puts the requested module in a separate chunk.

`System.import` takes the module name as argument and returns a Promise.

``` js
function onClick() {
	System.import("./module").then(module => {
		module.default;
	}).catch(err => {
		console.log("Chunk loading failed");
	});
}
```

Good news: Failure to load a chunk can be handled now because they are `Promise` based.

#### Dynamic expressions

It's possible to pass an partial expression to `System.import`. This is handled similar to expressions in CommonJS (webpack creates a [context](https://webpack.github.io/docs/context.html) with all possible files).

`System.import` creates a separate chunk for each possible module.

``` js
function route(path, query) {
	return System.import("./routes/" + path + "/route")
		.then(route => new route.Route(query));
}
// This creates a separate chunk for each possible route
```

#### Mixing ES6 with AMD and CommonJS

As for AMD and CommonJS you can freely mix all three module types (even within the same file). Webpack behaves similar to babel in this case:

``` js
// CommonJS consuming ES6 Module
var book = require("./book");

book.currentPage;
book.readPage();
book.default === "This is a book";
```

``` js
// ES6 Module consuming CommonJS
import fs from "fs"; // module.exports map to default
import { readFileSync } from "fs"; // named exports are read from returned object+

typeof fs.readFileSync === "function";
typeof readFileSync === "function";
```

It is important to note that you will want to tell Babel to not parse these module symbols so webpack can use them. You can do this by setting the following in your `.babelrc` or babel-loader options.

**.babelrc**

```json
{
  "presets": [
    ["es2015", { "modules": false }]
  ]
}
```
