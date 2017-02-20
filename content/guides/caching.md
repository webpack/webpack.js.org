---
title: Caching
sort: 41
contributors:
  - okonet
  - jouni-kantola
---

To enable long-term caching of static resources produced by webpack:

1. Use `[chunkhash]` to add a content-dependent cache-buster to each file.
2. Extract the webpack manifest into a separate file.
3. Ensure that the entry point chunk containing the bootstrapping code doesn’t change hash over time for the same set of dependencies.

    For even more optimized setup:
4. Use compiler stats to get the file names when requiring resources in HTML.
5. Generate the chunk manifest JSON and inline it into the HTML page before loading resources.


## The problem

Each time something needs to be updated in our code, it has to be re-deployed on the server and then re-downloaded by all clients. This is clearly inefficient since fetching resources over the network can be slow. This is why browsers cache static resources.

The way it works has a pitfall: If we don’t change filenames of our resources when deploying a new version, the browser might think it hasn’t been updated and client will get a cached version of it.

A simple way to tell the browser to download a newer version is to alter the asset’s file name. In a pre-webpack era we used to add a build number to the filenames as a parameter and then increment it:

```bash
application.js?build=1
application.css?build=1
```

It is even easier to do with webpack. Each webpack build generates a unique hash which can be used to compose a filename, by including output [placeholders](/concepts/output/#options).
The following example config will generate 2 files (1 per entry) with hashes in filenames:

```js
// webpack.config.js
const path = require("path");

module.exports = {
  entry: {
    vendor: "./src/vendor.js",
    main: "./src/index.js"
  },
  output: {
    path: path.join(__dirname, "build"),
    filename: "[name].[hash].js"
  }
};
```

Running webpack with this config will produce the following output:

```bash
Hash: 2a6c1fee4b5b0d2c9285
Version: webpack 2.2.0
Time: 62ms
                         Asset     Size  Chunks             Chunk Names
vendor.2a6c1fee4b5b0d2c9285.js  2.58 kB       0  [emitted]  vendor
  main.2a6c1fee4b5b0d2c9285.js  2.57 kB       1  [emitted]  main
   [0] ./src/index.js 63 bytes {1} [built]
   [1] ./src/vendor.js 63 bytes {0} [built]
```

But the problem here is, builds after *any file update* will update all filenames and clients will have to re-download all application code. So how can we guarantee that clients always get the latest versions of assets without re-downloading all of them?

## Generating unique hashes for each file

What if we could produce the same filename, if the contents of the file did not change between builds? For example, it would be unnecessary to re-download a vendor file, when no dependencies have been updated, only application code.

webpack allows you to generate hashes depending on file contents, by replacing the placeholder `[hash]` with `[chunkhash]`. Here is the updated config:

```diff
module.exports = {
  /*...*/
  output: {
    /*...*/
-   filename: "[name].[hash].js"
+   filename: "[name].[chunkhash].js"
  }
};
```

This config will also create 2 files, but in this case, each file will get its own unique hash.

```bash
Hash: cfba4af36e2b11ef15db
Version: webpack 2.2.0
Time: 66ms
                         Asset     Size  Chunks             Chunk Names
vendor.50cfb8f89ce2262e5325.js  2.58 kB       0  [emitted]  vendor
  main.70b594fe8b07bcedaa98.js  2.57 kB       1  [emitted]  main
   [0] ./src/index.js 63 bytes {1} [built]
   [1] ./src/vendor.js 63 bytes {0} [built]
```

T> Don’t use [chunkhash] in development since this will increase compilation time. Separate development and production configs and use [name].js for development and [name].[chunkhash].js in production.

## Get filenames from webpack compilation stats

When working in development mode, you just reference JavaScript files by entry point name in your HTML.

```html
<script src="vendor.js"></script>
<script src="main.js"></script>
```

Although, each time we build for production, we’ll get different file names. Something, that looks like this:

```html
<script src="vendor.50cfb8f89ce2262e5325.js"></script>
<script src="main.70b594fe8b07bcedaa98.js"></script>
```

In order to reference a correct file in the HTML, we’ll need information about our build. This can be extracted from webpack compilation stats by using this plugin:

```js
// webpack.config.js
const path = require("path");

module.exports = {
  /*...*/
  plugins: [
    function() {
      this.plugin("done", function(stats) {
        require("fs").writeFileSync(
          path.join(__dirname, "build", "stats.json"),
          JSON.stringify(stats.toJson()));
      });
    }
  ]
};
```

Alternatively, just use one of these plugins to export JSON files:

* https://www.npmjs.com/package/webpack-manifest-plugin
* https://www.npmjs.com/package/assets-webpack-plugin

A sample output when using `WebpackManifestPlugin` in our config looks like:

```json
{
  "main.js": "main.155567618f4367cd1cb8.js",
  "vendor.js": "vendor.c2330c22cd2decb5da5a.js"
}
```

## Deterministic hashes

To minimize the size of generated files, webpack uses identifiers instead of module names. During compilation, identifiers are generated, mapped to chunk filenames and then put into a JavaScript object called *chunk manifest*.
To generate identifiers that are preserved over builds, webpack supplies the `NamedModulesPlugin` (recommended for development) and `HashedModuleIdsPlugin` (recommended for production).

?> When exist, link to `NamedModulesPlugin` and `HashedModuleIdsPlugin` docs pages

?> Describe how the option `recordsPath` option works

The chunk manifest (along with bootstrapping/runtime code) is then placed into the entry chunk and it is crucial for webpack-packaged code to work.

T> Separate your vendor and application code with [CommonsChunkPlugin](/plugins/commons-chunk-plugin) and create an explicit vendor chunk to prevent it from changing too often. When `CommonsChunkPlugin` is used, the runtime code is moved to the *last* common entry.

The problem with this, is the same as before: Whenever we change any part of the code it will, even if the rest of its contents wasn’t altered, update our entry chunk to include the new manifest. This in turn, will lead to a new hash and dismiss the long-term caching.

To fix that, we should use [`ChunkManifestWebpackPlugin`](https://github.com/diurnalist/chunk-manifest-webpack-plugin), which will extract the manifest to a separate JSON file. This replaces the chunk manifest with a variable in the webpack runtime. But we can do even better; we can extract the runtime into a separate entry by using `CommonsChunkPlugin`. Here is an updated `webpack.config.js` which will produce the manifest and runtime files in our build directory:

```js
// webpack.config.js
var ChunkManifestPlugin = require("chunk-manifest-webpack-plugin");

module.exports = {
  /*...*/
  plugins: [
    /*...*/
    new webpack.optimize.CommonsChunkPlugin({
      name: ["vendor", "manifest"], // vendor libs + extracted manifest
      minChunks: Infinity,
    }),
    /*...*/
    new ChunkManifestPlugin({
      filename: "chunk-manifest.json",
      manifestVariable: "webpackManifest"
    })
  ]
};
```

As we removed the manifest from the entry chunk, now it’s our responsibility to provide webpack with it. The `manifestVariable` option in the example above is the name of the global variable where webpack will look for the manifest JSON. This *should be defined before we require our bundle in HTML*. This is achieved by inlining the contents of the JSON in HTML. Our HTML head section should look like this:

```html
<html>
  <head>
    <script>
    //<![CDATA[
    window.webpackManifest = {"0":"main.5f020f80c23aa50ebedf.js","1":"vendor.81adc64d405c8b218485.js"}
    //]]>
    </script>
  </head>
  <body>
  </body>
</html>
```

At the end of the day, the hashes for the files should be based on the file content. For this use [webpack-chunk-hash](https://github.com/alexindigo/webpack-chunk-hash) or [webpack-md5-hash](https://github.com/erm0l0v/webpack-md5-hash).

So the final `webpack.config.js` should look like this:

```js
var path = require("path");
var webpack = require("webpack");
var ChunkManifestPlugin = require("chunk-manifest-webpack-plugin");
var WebpackChunkHash = require("webpack-chunk-hash");

module.exports = {
  entry: {
    vendor: "./src/vendor.js", // vendor reference file(s)
    main: "./src/index.js" // application code
  },
  output: {
    path: path.join(__dirname, "build"),
    filename: "[name].[chunkhash].js",
    chunkFilename: "[name].[chunkhash].js"
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ["vendor", "manifest"], // vendor libs + extracted manifest
      minChunks: Infinity,
    }),
    new webpack.HashedModuleIdsPlugin(),
    new WebpackChunkHash(),
    new ChunkManifestPlugin({
      filename: "chunk-manifest.json",
      manifestVariable: "webpackManifest"
    })
  ]
};
```

Using this config the vendor chunk should not be changing its hash, unless you update its code or dependencies. Here is a sample output for 2 runs with `moduleB.js` being changed between the runs:

```bash
> node_modules/.bin/webpack

Hash: f0ae5bf7c6a1fd3b2127
Version: webpack 2.2.0
Time: 102ms
                           Asset       Size  Chunks             Chunk Names
    main.9ebe4bf7d99ffc17e75f.js  509 bytes    0, 2  [emitted]  main
  vendor.81adc64d405c8b218485.js  159 bytes    1, 2  [emitted]  vendor
             chunk-manifest.json   73 bytes          [emitted]
manifest.d41d8cd98f00b204e980.js    5.56 kB       2  [emitted]  manifest
```
```bash
> node_modules/.bin/webpack

Hash: b5fb8e138b039ab515f3
Version: webpack 2.2.0
Time: 87ms
                           Asset       Size  Chunks             Chunk Names
    main.5f020f80c23aa50ebedf.js  521 bytes    0, 2  [emitted]  main
  vendor.81adc64d405c8b218485.js  159 bytes    1, 2  [emitted]  vendor
             chunk-manifest.json   73 bytes          [emitted]
manifest.d41d8cd98f00b204e980.js    5.56 kB       2  [emitted]  manifest
```

Notice that **vendor chunk has the same filename**, and **so does the manifest** since we’ve extracted the manifest chunk!

## Manifest inlining

Inlining the chunk manifest and webpack runtime (to prevent extra HTTP requests), depends on your server setup. There is a nice [walkthrough for Rails-based projects](https://brigade.engineering/setting-up-webpack-with-rails-c62aea149679). For server-side rendering in Node.js you can use [webpack-isomorphic-tools](https://github.com/halt-hammerzeit/webpack-isomorphic-tools).

T> If your application doesn’t rely on any server-side rendering, it’s often enough to generate a single `index.html` file for your application. To do so, use i.e. [`HtmlWebpackPlugin`](https://github.com/ampedandwired/html-webpack-plugin) in combination with [`ScriptExtHtmlWebpackPlugin`](https://github.com/numical/script-ext-html-webpack-plugin) or [`InlineManifestWebpackPlugin`](https://github.com/szrenwei/inline-manifest-webpack-plugin). It will simplify the setup dramatically.

## References

* https://medium.com/@okonetchnikov/long-term-caching-of-static-assets-with-webpack-1ecb139adb95#.vtwnssps4
* https://gist.github.com/sokra/ff1b0290282bfa2c037bdb6dcca1a7aa
* https://github.com/webpack/webpack/issues/1315
* https://github.com/webpack/webpack.js.org/issues/652
* https://presentations.survivejs.com/advanced-webpack/
