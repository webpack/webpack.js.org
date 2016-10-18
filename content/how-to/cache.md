---
title: 如何缓存？
contributors:
  - okonet
---

To enable long-term caching of static resources produced by webpack:

1. Use `[chunkhash]` to add a content-dependent cache-buster to each file.
2. Use compiler stats to get the file names when requiring resources in HTML.
3. Generate the chunk-manifest JSON and inline it into the HTML page before loading resources.
4. Ensure that the entry point chunk containing the bootstrapping code doesn’t change its hash over time for the same set of dependencies.

## The problem

Each time something needs to be updated in our code, it has to be re-deployed on the server and then re-downloaded by all clients. This is clearly inefficient since fetching resources over the network can be slow. This is why browsers cache static resources.

The way it works has a pitfall: if we don’t change filenames of our resources when deploying a new version, browser might think it hasn’t been updated and client will get a cached version of it.

Probably the simplest way to tell the browser to download a newer version is to alter asset’s file name. In a pre-webpack era we used to add a build number to the filenames as a parameter and then increment it:

```bash
application.js?build=1
application.css?build=1
```

It is even easier to do with webpack: each webpack build generates a unique hash which can be used to compose a filename. The following example config will generate 2 files (1 per entry point) with a hash in filenames:

```js
// webpack.config.js
const path = require('path');

module.exports = {
  entry: {
    vendor: './src/vendor.js',
    main: './src/index.js'
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].[hash].js'
  }
};
```

Running webpack with this config will produce the following output:

```bash
Hash: 55e783391098c2496a8f
Version: webpack 1.10.1
Time: 58ms
Asset Size Chunks Chunk Names
main.55e783391098c2496a8f.js 1.43 kB 0 [emitted] main
vendor.55e783391098c2496a8f.js 1.43 kB 1 [emitted] vendor
[0] ./src/index.js 46 bytes {0} [built]
[0] ./src/vendor.js 40 bytes {1} [built]
```

But the problem here is that, *each* time we create a new build, all filenames will get altered and clients will have to re-download the whole application code again. So how can we guarantee that clients always get the latest versions of assets without re-downloading all of them?

## Generating unique hashes for each file

What if we could produce the same filename if the contents of the file did not change between builds? For example, the file where we put all our libraries and other vendor stuff does not change that often.

T> Separate your vendor and application code with [CommonsChunkPlugin](https://webpack.github.io/docs/list-of-plugins.html#2-explicit-vendor-chunk) and create an explicit vendor chunk to prevent it from changing too often.

Webpack allows you to generate hashes depending on the file contents. Here is the updated config:

```js
// webpack.config.js
module.exports = {
  /*...*/
  output: {
    /*...*/
    filename: '[name].[chunkhash].js'
  }
};
```

This config will also create 2 files, but in this case, each file will get its own unique hash.

```bash
main.155567618f4367cd1cb8.js 1.43 kB 0 [emitted] main
vendor.c2330c22cd2decb5da5a.js 1.43 kB 1 [emitted] vendor
```

T> Don’t use [chunkhash] in development since this will increase compilation time. Separate development and production configs and use [name].js for development and [name].[chunkhash].js in production.

W> Due to this [issue in Webpack](https://github.com/webpack/webpack/issues/1315), this method of generating hashes still isn’t deterministic. To ensure hashes are generated based on the file contents, use [webpack-md5-hash plugin](https://github.com/erm0l0v/webpack-md5-hash). Here is an example how to integrate it into your project: https://github.com/okonet/webpack-long-term-cache-demo/pull/3/files

## Get filenames from webpack compilation stats

When working in development mode, you just reference a JavaScript file by entry point name in your HTML.

```html
<script src="main.js"></script>
```

Although, each time we build for production, we’ll get different file names. Something, that looks like this:

```html
<script src="main.155567618f4367cd1cb8.js"></script>
```

In order to reference a correct file in the HTML, we’ll need some information about our build. This can be extracted from webpack compilation stats by using this simple plugin:

```js
// webpack.config.js
const path = require('path');

module.exports = {
  /*...*/
  plugins: [
    function() {
      this.plugin("done", function(stats) {
        require("fs").writeFileSync(
          path.join(__dirname, "…", "stats.json"),
          JSON.stringify(stats.toJson()));
      });
    }
  ]
};
```

Alternatively, just use one of these plugins to export JSON files:

* https://www.npmjs.com/package/webpack-manifest-plugin
* https://www.npmjs.com/package/assets-webpack-plugin

A sample output of webpack-manifest-plugin for our config looks like:

```json
{
  "main.js": "main.155567618f4367cd1cb8.js",
  "vendor.js": "vendor.c2330c22cd2decb5da5a.js"
}
```

The rest depends on your server setup. There is a nice [walk through for Rails-based projects](http://clarkdave.net/2015/01/how-to-use-webpack-with-rails/#including-precompiled-assets-in-views). For serverside rendering in node you can use [webpack-isomorphic-tools](https://github.com/halt-hammerzeit/webpack-isomorphic-tools). Or, if your application doesn’t rely on any server-side rendering, it’s often enough to generate a single `index.html` file for your application. To do so, just use these 2 amazing plugins:

* https://github.com/ampedandwired/html-webpack-plugin
* https://github.com/szrenwei/inline-manifest-webpack-plugin

It will simplify the setup dramatically.

We’re done, you might think. Well, almost.

## Deterministic hashes

To minimise the size of generated files, webpack uses identifiers instead of module names. During compilation identifiers are generated, mapped to chunk filenames and then put into a JavaScript object called *chunk manifest*. It is (along with some bootstrapping code) then placed into the entry chunk and it is crucial for webpack-packaged code to work.

The problem with this is the same as before: whenever we change any part of the code, it will, even if the rest of its contents wasn’t altered, update our entry chunk to include the new manifest. This, in turn, will lead to a new hash and dismiss the long-term caching.

To fix that, we should use [chunk-manifest-webpack-plugin](https://github.com/diurnalist/chunk-manifest-webpack-plugin) which will extract that manifest to a separate JSON file. Here is an updated webpack.config.js which will produce chunk-manifest.json in our build directory:

```js
// webpack.config.js
var ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');

module.exports = {
  // your config values here
  plugins: [
    new ChunkManifestPlugin({
      filename: "chunk-manifest.json",
      manifestVariable: "webpackManifest"
    })
  ]
};
```

Since we removed the manifest from entry chunk, now it’s our responsibility to provide webpack with it. You have probably noticed the `manifestVariable` option in the example above. This is the name of the global variable where webpack will look for the manifest JSON and this is why *it should be defined before we require our bundle in HTML*. This is easy as inlining the contents of the JSON in HTML. Our HTML head section should look like this:

```html
<html>
  <head>
    <script>
    //<![CDATA[
    window.webpackManifest = {"0":"main.3d038f325b02fdee5724.js","1":"1.c4116058de00860e5aa8.js"}
    //]]>
    </script>
  </head>
  <body>
  </body>
</html>
```

So the final webpack.config.js should look like this:

```js
var path = require('path');
var webpack = require('webpack');
var ManifestPlugin = require('webpack-manifest-plugin');
var ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
var WebpackMd5Hash = require('webpack-md5-hash');

module.exports = {
  entry: {
    vendor: './src/vendor.js',
    main: './src/index.js'
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      minChunks: Infinity,
    }),
    new WebpackMd5Hash(),
    new ManifestPlugin(),
    new ChunkManifestPlugin({
      filename: "chunk-manifest.json",
      manifestVariable: "webpackManifest"
    }),
    new webpack.optimize.OccurenceOrderPlugin()
  ]
};
```

T> If you're using [webpack-html-plugin](https://github.com/ampedandwired/html-webpack-plugin), you can use [inline-manifest-webpack-plugin](https://github.com/szrenwei/inline-manifest-webpack-plugin) to do this.

Using this config the vendor chunk should not be changing its hash unless you change its code or dependencies. Here is a sample output for 2 runs with `moduleB.js` being changed between the runs:

```bash
> webpack

Hash: 92670583f688a262fdad
Version: webpack 1.10.1
Time: 65ms

Asset Size Chunks Chunk Names
chunk-manifest.json 68 bytes [emitted]
vendor.6d107863983028982ef4.js 3.71 kB 0 [emitted] vendor
1.c4116058de00860e5aa8.js 107 bytes 1 [emitted]
main.5e17f4dff47bc1a007c0.js 373 bytes 2 [emitted] main

[0] ./src/index.js 186 bytes {2} [built]
[0] ./src/vendor.js 40 bytes {0} [built]
[1] ./src/moduleA.js 28 bytes {2} [built]
[2] ./src/moduleB.js 28 bytes {1} [built]

> webpack

Hash: a9ee1d1e46a538469d7f
Version: webpack 1.10.1
Time: 67ms

Asset Size Chunks Chunk Names
chunk-manifest.json 68 bytes [emitted]
vendor.6d107863983028982ef4.js 3.71 kB 0 [emitted] vendor
1.2883246944b1147092b1.js 107 bytes 1 [emitted]
main.5e17f4dff47bc1a007c0.js 373 bytes 2 [emitted] main

[0] ./src/index.js 186 bytes {2} [built]
[0] ./src/vendor.js 40 bytes {0} [built]
[1] ./src/moduleA.js 28 bytes {2} [built]
[2] ./src/moduleB.js 28 bytes {1} [built]
```

Notice that vendor chunk has the same filename!

## References

* https://medium.com/@okonetchnikov/long-term-caching-of-static-assets-with-webpack-1ecb139adb95#.vtwnssps4
* https://gist.github.com/sokra/ff1b0290282bfa2c037bdb6dcca1a7aa
