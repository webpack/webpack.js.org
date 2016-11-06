---
title: commons-chunk-plugin
---

?> Review this content

```javascript
new webpack.optimize.CommonsChunkPlugin(options)
```

* `options.name` or `options.names` (`string|string[]`): The chunk name of the commons chunk. An existing chunk can be selected by passing a name of an existing chunk. If an array of strings is passed this is equal to invoking the plugin multiple times for each chunk name. If omitted and `options.async` or `options.children` is set all chunks are used, otherwise `options.filename` is used as chunk name.
* `options.filename` (`string`): The filename template for the commons chunk. Can contain the same placeholder as `output.filename`. If omitted the original filename is not modified (usually `output.filename` or `output.chunkFilename`).
* `options.minChunks` (`number|Infinity|function(module, count) -> boolean`): The minimum number of chunks which need to contain a module before it's moved into the commons chunk. The number must be greater than or equal 2 and lower than or equal to the number of chunks. Passing `Infinity` just creates the commons chunk, but moves no modules into it. By providing a `function` you can add custom logic. (Defaults to the number of chunks)
* `options.chunks` (`string[]`): Select the source chunks by chunk names. The chunk must be a child of the commons chunk. If omitted all entry chunks are selected.
* `options.children` (`boolean`): If `true` all children of the commons chunk are selected
* `options.async` (`boolean|string`): If `true` a new async commons chunk is created as child of `options.name` and sibling of `options.chunks`. It is loaded in parallel with `options.chunks`. It is possible to change the name of the output file by providing the desired string instead of `true`.
* `options.minSize` (`number`): Minimum size of all common module before a commons chunk is created.

## Examples

### Commons chunk for entries

Generate an extra chunk, which contains common modules shared between entry points.

```javascript
new CommonsChunkPlugin({
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
new CommonsChunkPlugin({
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

Hint: In combination with long term caching you may need to use [this plugin](https://github.com/diurnalist/chunk-manifest-webpack-plugin) to avoid that the vendor chunk changes. You should also use records to ensure stable module ids.

###  Move common modules into the parent chunk

With Code Splitting multiple child chunks of a chunk can have common modules. You can move these common modules into the parent (This reduces overall size, but has a negative effect on the initial load time. It can be useful if it is expected that a user need to download many sibling chunks).

```javascript
new CommonsChunkPlugin({
  // names: ["app", "subPageA"]
  // (choose the chunks, or omit for all chunks)

  children: true,
  // (select all children of chosen chunks)

  // minChunks: 3,
  // (3 children must share the module before it's moved)
})
```

### Extra async commons chunk

Similar to 3., but instead of moving common modules into the parent (which increases initial load time) a new async-loaded additional commons chunk is used. This is automatically downloaded in parallel when the additional chunk is downloaded.

```javascript
new CommonsChunkPlugin({
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
