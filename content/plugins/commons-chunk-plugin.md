---
title: CommonsChunkPlugin
contributors:
  - bebraw
  - simon04
  - christopher4lis
---

```javascript
new webpack.optimize.CommonsChunkPlugin(options)
```
The `CommonsChunkPlugin` is an opt-in feature that creates a separate file (known as a chunk), consisting of common modules shared between multiple entry points. By separating common modules from bundles, the resulting chunked file can be loaded once initially, and stored in cache for later use. This results in pagespeed optimizations as the browser can quickly serve the shared code from cache, rather than being forced to load a larger bundle whenever a new page is visited.

## Options

```javascript
{
  name: string, // or
  names: string[],
  // The chunk name of the commons chunk. An existing chunk can be selected by passing a name of an existing chunk.
  // If an array of strings is passed this is equal to invoking the plugin multiple times for each chunk name.
  // If omitted and `options.async` or `options.children` is set all chunks are used,
  // otherwise `options.filename` is used as chunk name.

  filename: string,
  // The filename template for the commons chunk. Can contain the same placeholder as `output.filename`.
  // If omitted the original filename is not modified (usually `output.filename` or `output.chunkFilename`).

  minChunks: number|Infinity|function(module, count) -> boolean,
  // The minimum number of chunks which need to contain a module before it's moved into the commons chunk.
  // The number must be greater than or equal 2 and lower than or equal to the number of chunks.
  // Passing `Infinity` just creates the commons chunk, but moves no modules into it.
  // By providing a `function` you can add custom logic. (Defaults to the number of chunks)

  chunks: string[],
  // Select the source chunks by chunk names. The chunk must be a child of the commons chunk.
  // If omitted all entry chunks are selected.

  children: boolean,
  // If `true` all children of the commons chunk are selected

  async: boolean|string,
  // If `true` a new async commons chunk is created as child of `options.name` and sibling of `options.chunks`.
  // It is loaded in parallel with `options.chunks`. It is possible to change the name of the output file
  // by providing the desired string instead of `true`.

  minSize: number,
  // Minimum size of all common module before a commons chunk is created.
}
```

T> The deprecated webpack 1 constructor `new webpack.optimize.CommonsChunkPlugin(options, filenameTemplate, selectedChunks, minChunks)` is no longer supported. Use a corresponding options object instead.

## Examples

### Commons chunk for entries

Generate an extra chunk, which contains common modules shared between entry points.

```javascript
new webpack.optimize.CommonsChunkPlugin({
  name: "commons",
  // (the commons chunk name)

  filename: "commons.js",
  // (the filename of the commons chunk)

  // minChunks: 3,
  // (Modules must be shared between 3 entries)

  // chunks: ["pageA", "pageB"],
  // (Only use these entries)
})
```

You must load the generated chunk before the entry point:

```html
<script src="commons.js" charset="utf-8"></script>
<script src="entry.bundle.js" charset="utf-8"></script>
```

### Explicit vendor chunk

Split your code into vendor and application.

```javascript
entry: {
  vendor: ["jquery", "other-lib"],
  app: "./entry"
}
new webpack.optimize.CommonsChunkPlugin({
  name: "vendor",

  // filename: "vendor.js"
  // (Give the chunk a different name)

  minChunks: Infinity,
  // (with more entries, this ensures that no other module
  //  goes into the vendor chunk)
})
```

```html
<script src="vendor.js" charset="utf-8"></script>
<script src="app.js" charset="utf-8"></script>
```

Hint: In combination with long term caching you may need to use the [`ChunkManifestWebpackPlugin`](https://github.com/diurnalist/chunk-manifest-webpack-plugin) to avoid that the vendor chunk changes. You should also use records to ensure stable module ids.

###  Move common modules into the parent chunk

With [Code Splitting](/guides/code-splitting) multiple child chunks of an entry chunk can have common dependencies. To prevent duplication these can be moved into the parent. This reduces overall size, but does have a negative effect on the initial load time. If it is expected that users will need to download many sibling chunks, i.e. children of the entry chunk, then this should improve load time overall.

```javascript
new webpack.optimize.CommonsChunkPlugin({
  // names: ["app", "subPageA"]
  // (choose the chunks, or omit for all chunks)

  children: true,
  // (select all children of chosen chunks)

  // minChunks: 3,
  // (3 children must share the module before it's moved)
})
```

### Extra async commons chunk

Similar to the above one, but instead of moving common modules into the parent (which increases initial load time) a new async-loaded additional commons chunk is used. This is automatically downloaded in parallel when the additional chunk is downloaded.

```javascript
new webpack.optimize.CommonsChunkPlugin({
  // names: ["app", "subPageA"]
  // (choose the chunks, or omit for all chunks)

  children: true,
  // (use all children of the chunk)

  async: true,
  // (create an async commons chunk)

  // minChunks: 3,
  // (3 children must share the module before it's separated)
})
```

### Passing the `minChunks` property a function

You also have the ability to pass the `minChunks` property a function. This function is called by the `CommonsChunkPlugin` and calls the function with `module` and `count` arguments.

The `module` property represents each module in the chunks you have provided via the `names` property.

The `count` property represents how many chunks the `module` is used in.

This option is useful when you want to have fine-grained control over how the CommonsChunk algorithm determines where modules should be moved to.

```javascript
new webpack.optimize.CommonsChunkPlugin({
  name: "my-single-lib-chunk",
  filename: "my-single-lib-chunk.js",
  minChunks: function(module, count) {
    // If module has a path, and inside of the path exists the name "somelib",
    // and it is used in 3 separate chunks/entries, then break it out into
    // a separate chunk with chunk keyname "my-single-lib-chunk", and filename "my-single-lib-chunk.js"
    return module.resource && (/somelib/).test(module.resource) && count === 3;
  }
});
```

As seen above, this example allows you to move only one lib to a separate file if and only if all conditions are met inside the function.

This concept may be used to obtain implicit common vendor chunks:

```javascript
new webpack.optimize.CommonsChunkPlugin({
  name: "vendor",
  minChunks: function (module) {
    // this assumes your vendor imports exist in the node_modules directory
    return module.context && module.context.indexOf("node_modules") !== -1;
  }
})
```

## Manifest file

To extract the webpack bootstrap logic into a separate file, use the `CommonsChunkPlugin` on a `name` which is not defined as `entry`. Commonly the name `manifest` is used. See the [code splitting libraries guide](/guides/code-splitting-libraries/#manifest-file) for details.

```javascript
new webpack.optimize.CommonsChunkPlugin({
  name: "manifest",
  minChunks: Infinity
})

```

## Combining implicit common vendor chunks and manifest file

Since the `vendor` and `manifest` chunk use a different definition for `minChunks`, you need to invoke the plugin twice:

```javascript
[
  new webpack.optimize.CommonsChunkPlugin({
    name: "vendor",
    minChunks: function(module){
      return module.context && module.context.indexOf("node_modules") !== -1;
    }
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: "manifest",
    minChunks: Infinity
  }),
]
```

## Examples

* https://github.com/webpack/webpack/tree/master/examples/common-chunk-and-vendor-chunk
* https://github.com/webpack/webpack/tree/master/examples/multiple-commons-chunks
* https://github.com/webpack/webpack/tree/master/examples/multiple-entry-points-commons-chunk-css-bundle
