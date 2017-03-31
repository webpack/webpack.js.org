---
title: Migrating from v1 to v2
sort: 20
contributors:
  - sokra
  - jhnns
  - grgur
  - domfarolino
  - johnnyreilly
  - jouni-kantola
  - frederikprijck
  - chrisVillanueva
  - bebraw
  - howdy39
  - selbekk
  - ndelangen
---

## `resolve.root`, `resolve.fallback`, `resolve.modulesDirectories`

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

## `resolve.extensions`

This option no longer requires passing an empty string. This behavior was moved to `resolve.enforceExtension`. See [resolving](/configuration/resolve) for more usage.

## `resolve.*`

Several APIs were changed here. Not listed in detail as it's not commonly used. See [resolving](/configuration/resolve) for details.

## `module.loaders` is now `module.rules`

The old loader configuration was superseded by a more powerful rules system, which allows configuration of loaders and more.
For compatibility reasons, the old `module.loaders` syntax is still valid and the old names are parsed.
The new naming conventions are easier to understand and are a good reason to upgrade the configuration to using `module.rules`.

``` diff
  module: {
-   loaders: [
+   rules: [
      {
        test: /\.css$/,
-       loaders: [
-         "style-loader",
-         "css-loader?modules=true"
+       use: [
+         {
+           loader: "style-loader"
+         },
+         {
+           loader: "css-loader",
+           options: {
+             modules: true
+           }
+         }
        ]
      },
      {
        test: /\.jsx$/,
        loader: "babel-loader", // Do not use "use" here
        options: {
          // ...
        }
      }
    ]
  }
```

## Chaining loaders

Like in webpack 1, loaders can be chained to pass results from loader to loader. Using the [rule.use](/configuration/module#rule-use)
 configuration option, `use` can be set to an array of loaders.
In webpack 1, loaders were commonly chained with `!`. This style is only supported using the legacy option `module.loaders`.

``` diff
  module: {
-   loaders: [{
+   rules: [{
      test: /\.less$/,
-     loader: "style-loader!css-loader!less-loader"
+     use: [
+       "style-loader",
+       "css-loader",
+       "less-loader"
+     ]
    }]
  }
```

## Automatic `-loader` module name extension removed

It is not possible anymore to omit the `-loader` extension when referencing loaders:

``` diff
  module: {
    rules: [
      {
        use: [
-         "style",
+         "style-loader",
-         "css",
+         "css-loader",
-         "less",
+         "less-loader",
        ]
      }
    ]
  }
```

You can still opt-in to the old behavior with the `resolveLoader.moduleExtensions` configuration option, but this is not recommended.

``` diff
+ resolveLoader: {
+   moduleExtensions: ["-loader"]
+ }
```

See [#2986](https://github.com/webpack/webpack/issues/2986) for the reason behind this change.

## `json-loader` is not required anymore

When no loader has been configured for a JSON file, webpack will automatically try to load the JSON
file with the [`json-loader`](https://github.com/webpack/json-loader).

``` diff
  module: {
    rules: [
-     {
-       test: /\.json/,
-       loader: "json-loader"
-     }
    ]
  }
```

[We decided to do this](https://github.com/webpack/webpack/issues/3363) in order to iron out environment differences
  between webpack, node.js and browserify.

## Loaders in configuration resolve relative to context

In webpack 1 configured loaders resolve relative to the matched file.
Since webpack 2 configured loaders resolve relative to the `context` option.

This solves some problems with duplicate modules caused by loaders when using `npm link` or referencing modules outside of the `context`.

You may remove some hacks to work around this:

``` diff
  module: {
    rules: [
      {
        // ...
-       loader: require.resolve("my-loader")
+       loader: "my-loader"
      }
    ]
  },
  resolveLoader: {
-   root: path.resolve(__dirname, "node_modules")
  }
```

## `module.preLoaders` and `module.postLoaders` was removed

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

## `UglifyJsPlugin` sourceMap

The `sourceMap` option of the `UglifyJsPlugin` now defaults to `false` instead of `true`.
This means that if you are using source maps for minimized code or want correct line numbers for uglifyjs warnings, you need to set `sourceMap: true` for `UglifyJsPlugin`.

``` diff
  devtool: "source-map",
  plugins: [
    new UglifyJsPlugin({
+     sourceMap: true
    })
  ]
```

## `UglifyJsPlugin` warnings

The `compress.warnings` option of the `UglifyJsPlugin` now defaults to `false` instead of `true`.
This means that if you want to see uglifyjs warnings, you need to set `compress.warnings` to `true`.

``` diff
  devtool: "source-map",
  plugins: [
    new UglifyJsPlugin({
+     compress: {
+       warnings: true
+     }
    })
  ]
```

## `UglifyJsPlugin` minimize loaders

`UglifyJsPlugin` no longer switches loaders into minimize mode. The `minimize: true` setting needs to be passed via loader options in the long-term. See loader documentation for relevant options.

The minimize mode for loaders will be removed in webpack 3 or later.

To keep compatibility with old loaders, loaders can be switched to minimize mode via plugin:

``` diff
  plugins: [
+   new webpack.LoaderOptionsPlugin({
+     minimize: true
+   })
  ]
```

## `DedupePlugin` has been removed

`webpack.optimize.DedupePlugin` isn't needed anymore. Remove it from your configuration.

## `BannerPlugin` - breaking change

`BannerPlugin` no longer accepts two parameters, but a single options object.

``` diff
  plugins: [
-    new webpack.BannerPlugin('Banner', {raw: true, entryOnly: true});
+    new webpack.BannerPlugin({banner: 'Banner', raw: true, entryOnly: true});
  ]
```

## `OccurrenceOrderPlugin` is now on by default

The `OccurrenceOrderPlugin` is now enabled by default and has been renamed (`OccurenceOrderPlugin` in webpack 1).
Thus make sure to remove the plugin from your configuration:

``` diff
  plugins: [
    // webpack 1
-   new webpack.optimize.OccurenceOrderPlugin()
    // webpack 2
-   new webpack.optimize.OccurrenceOrderPlugin()
  ]
```

## `ExtractTextWebpackPlugin` - breaking change

[ExtractTextPlugin](https://github.com/webpack/extract-text-webpack-plugin) requires version 2 to work with webpack 2.

`npm install --save-dev extract-text-webpack-plugin`

The configuration changes for this plugin are mainly syntactical.

### `ExtractTextPlugin.extract`

```diff
module: {
  rules: [
    {
      test: /.css$/,
-      loader: ExtractTextPlugin.extract("style-loader", "css-loader", { publicPath: "/dist" })
+      use: ExtractTextPlugin.extract({
+        fallback: "style-loader",
+        use: "css-loader",
+        publicPath: "/dist"
+      })
    }
  ]
}
```

### `new ExtractTextPlugin({options})`

```diff
plugins: [
-  new ExtractTextPlugin("bundle.css", { allChunks: true, disable: false })
+  new ExtractTextPlugin({
+    filename: "bundle.css",
+    disable: false,
+    allChunks: true
+  })
]
```

## Full dynamic requires now fail by default

A dependency with only an expression (i. e. `require(expr)`) will now create an empty context instead of the context of the complete directory.

Code like this should be refactored as it won't work with ES2015 modules. If this is not possible you can use the `ContextReplacementPlugin` to hint the compiler towards the correct resolving.

?> Link to an article about dynamic dependencies.

### Using custom arguments in CLI and configuration

If you abused the CLI to pass custom arguments to the configuration like so:

`webpack --custom-stuff`

``` js
// webpack.config.js
var customStuff = process.argv.indexOf("--custom-stuff") >= 0;
/* ... */
module.exports = config;
```

You may notice that this is no longer allowed. The CLI is more strict now.

Instead there is an interface for passing arguments to the configuration. This should be used instead. Future tools may rely on this.

`webpack --env.customStuff`

``` js
module.exports = function(env) {
  var customStuff = env.customStuff;
  /* ... */
  return config;
};
```

See [CLI](/api/cli).

## `require.ensure` and AMD `require` are asynchronous

These functions are now always asynchronous instead of calling their callback synchronously if the chunk is already loaded.

**`require.ensure` now depends upon native `Promise`s. If using `require.ensure` in an environment that lacks them then you will need a polyfill. **

## Loader configuration is through `options`

You can *no longer* configure a loader with a custom property in the `webpack.config.js`. It must be done through the `options`. The following configuration with the `ts` property is no longer valid with webpack 2:

```js
module.exports = {
  ...
  module: {
    rules: [{
      test: /\.tsx?$/,
      loader: 'ts-loader'
    }]
  },
  // does not work with webpack 2
  ts: { transpileOnly: false }
}
```

### What are `options`?

Good question. Well, strictly speaking it's 2 possible things; both ways to configure a webpack loader. Classically `options` was called `query` and was a string which could be appended to the name of the loader. Much like a query string but actually with [greater powers](https://github.com/webpack/loader-utils#parsequery):

```js
module.exports = {
  ...
  module: {
    rules: [{
      test: /\.tsx?$/,
      loader: 'ts-loader?' + JSON.stringify({ transpileOnly: false })
    }]
  }
}
```

But it can also be a separately specified object that's supplied alongside a loader:

```js
module.exports = {
  ...
  module: {
    rules: [{
      test: /\.tsx?$/,
      loader: 'ts-loader',
      options:  { transpileOnly: false }
    }]
  }
}
```

## `LoaderOptionsPlugin` context

Some loaders need context information and read them from the configuration. This needs to be passed via loader options in the long-term. See loader documentation for relevant options.

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

## `debug`

The `debug` option switched loaders to debug mode in webpack 1. This needs to be passed via loader options in long-term. See loader documentation for relevant options.

The debug mode for loaders will be removed in webpack 3 or later.

To keep compatibility with old loaders, loaders can be switched to debug mode via a plugin:

``` diff
- debug: true,
  plugins: [
+   new webpack.LoaderOptionsPlugin({
+     debug: true
+   })
  ]
```

## Code Splitting with ES2015

In webpack 1, you could use [`require.ensure`](/guides/code-splitting-require) as a method to lazily-load chunks for your application:

```javascript
require.ensure([], function(require) {
  var foo = require("./module");
});
```

The ES2015 Loader spec defines [`import()`](/guides/code-splitting-import) as method to load ES2015 Modules dynamically on runtime.
webpack treats `import()` as a split-point and puts the requested module in a separate chunk.
`import()` takes the module name as argument and returns a Promise.

``` js
function onClick() {
  import("./module").then(module => {
    return module.default;
  }).catch(err => {
    console.log("Chunk loading failed");
  });
}
```

Good news: Failure to load a chunk can now be handled because they are `Promise` based.

Caveat: `require.ensure` allows for easy chunk naming with the optional third argument, but `import` API doesn't offer that capability yet. If you want to keep that functionality, you can continue using `require.ensure`.

```javascript
require.ensure([], function(require) {
  var foo = require("./module");
}, "custom-chunk-name");
```

## Dynamic expressions

It's possible to pass a partial expression to `import()`. This is handled similar to expressions in CommonJS (webpack creates a [context](https://webpack.github.io/docs/context.html) with all possible files).

`import()` creates a separate chunk for each possible module.

``` js
function route(path, query) {
  return import(`./routes/${path}/route`)
    .then(route => new route.Route(query));
}
// This creates a separate chunk for each possible route
```

## Mixing ES2015 with AMD and CommonJS

As for AMD and CommonJS you can freely mix all three module types (even within the same file). webpack behaves similar to babel and node-eps in this case:

```javascript
// CommonJS consuming ES2015 Module
var book = require("./book");

book.currentPage;
book.readPage();
book.default === "This is a book";
```

```javascript
// ES2015 Module consuming CommonJS
import fs from "fs"; // module.exports map to default
import { readFileSync } from "fs"; // named exports are read from returned object+

typeof fs.readFileSync === "function";
typeof readFileSync === "function";
```

It is important to note that you will want to tell Babel to not parse these module symbols so webpack can use them. You can do this by setting the following in your `.babelrc` or `babel-loader` options.

**.babelrc**

```json
{
  "presets": [
    ["es2015", { "modules": false }]
  ]
}
```

## Hints

No need to change something, but opportunities

### Template strings

webpack now supports template strings in expressions. This means you can start using them in webpack constructs:

``` diff
- require("./templates/" + name);
+ require(`./templates/${name}`);
```

### Configuration Promise

webpack now supports returning a `Promise` from the configuration file. This allows to do async processing in you configuration file.

**webpack.config.js**

``` js
module.exports = function() {
  return fetchLangs().then(lang => ({
    entry: "...",
    // ...
    plugins: [
      new DefinePlugin({ LANGUAGE: lang })
    ]
  }));
};
```

### Advanced loader matching

webpack now supports more things to match on for loaders.

``` js
module: {
  rules: [
    {
      resource: /filename/, // matches "/path/filename.js"
      resourceQuery: /^\?querystring$/, // matches "?querystring"
      issuer: /filename/, // matches "/path/something.js" if requested from "/path/filename.js"
    }
  ]
}
```

### More CLI options

There are some new CLI options for you to use:

`--define process.env.NODE_ENV="production"` See [`DefinePlugin`](/plugins/define-plugin/).

`--display-depth` displays the distance to the entry point for each module.

`--display-used-exports` display info about which exports are used in a module.

`--display-max-modules` sets the number for modules displayed in the output (defaults to 15).

`-p` also defines `process.env.NODE_ENV` to `"production"` now.

## Loader changes

Changes only relevant for loader authors.

### Cacheable

Loaders are now cacheable by default. Loaders must opt-out if they are not cacheable.

``` diff
  // Cacheable loader
  module.exports = function(source) {
-   this.cacheable();
    return source;
  }
```

``` diff
  // Not cacheable loader
  module.exports = function(source) {
+   this.cacheable(false);
    return source;
  }
```

### Complex options

webpack 1 only supports `JSON.stringify`-able options for loaders.
webpack 2 now supports any JS object as loader options.

Using complex options comes with one restriction. You may need to have a `ident` for the option object to make it referenceable by other loaders.

Having an `ident` on the options object means to be able to reference this options object in inline loaders. Here is an example:

`require("some-loader??by-ident!resource")`

``` js
{
  test: /.../,
  loader: "...",
  options: {
    ident: "by-ident",
    magic: () => return Math.random()
  }
}
```

This inline style should not be used by regular code, but it's often used by loader generated code.
I. e. the `style-loader` generates a module that `require`s the remaining request (which exports the CSS).

``` js
// style-loader generated code (simplified)
var addStyle = require("./add-style");
var css = require("-!css-loader?{"modules":true}!postcss-loader??postcss-ident");

addStyle(css);
```

So if you use complex options tell your users about the `ident`.
