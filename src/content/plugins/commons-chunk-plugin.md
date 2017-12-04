---
title: CommonsChunkPlugin
contributors:
  - bebraw
  - simon04
  - christopher4lis
  - kevinzwhuang
  - jdbevan
---

`CommonsChunkPlugin` 插件，是一个可选的用于建立一个独立文件(又称作 chunk)的功能，这个文件包括多个入口 `chunk` 的公共模块。通过将公共模块拆出来，最终合成的文件能够在最开始的时候加载一次，便存起来到缓存中供后续使用。这个带来速度上的提升，因为浏览器会迅速将公共的代码从缓存中取出来，而不是每次访问一个新页面时，再去加载一个更大的文件。

```javascript
new webpack.optimize.CommonsChunkPlugin(options)
```


## 配置

```javascript
{
  name: string, // or
  names: string[],
  // 这是 common chunk 的名称。已经存在的 chunk 可以通过传入一个已存在的 chunk 名称而被选择。
  // 如果一个字符串数组被传入，这相当于插件针对每个 chunk 名被多次调用
  // 如果该选项被忽略，同时 `options.async` 或者 `options.children` 被设置，所有的 chunk 都会被使用，
  // 否则 `options.filename` 会用于作为 chunk 名。
  // When using `options.async` to create common chunks from other async chunks you must specify an entry-point
  // chunk name here instead of omitting the `option.name`.

  filename: string,
  // common chunk 的文件名模板。可以包含与 `output.filename` 相同的占位符。
  // 如果被忽略，原本的文件名不会被修改(通常是 `output.filename` 或者 `output.chunkFilename`)。
  // This option is not permitted if you're using `options.async` as well, see below for more details.

  minChunks: number|Infinity|function(module, count) -> boolean,
  // 在传入  公共chunk(commons chunk) 之前所需要包含的最少数量的 chunks 。
  // 数量必须大于等于2，或者少于等于 chunks的数量
  // 传入 `Infinity` 会马上生成 公共chunk，但里面没有模块。
  // 你可以传入一个 `function` ，以添加定制的逻辑（默认是 chunk 的数量）

  chunks: string[],
  // 通过 chunk name 去选择 chunks 的来源。chunk 必须是  公共chunk 的子模块。
  // 如果被忽略，所有的，所有的 入口chunk (entry chunk) 都会被选择。


  children: boolean,
  // 如果设置为 `true`，所有  公共chunk 的子模块都会被选择

  deepChildren: boolean,
  // If `true` all descendants of the commons chunk are selected

  async: boolean|string,
  // 如果设置为 `true`，一个异步的  公共chunk 会作为 `options.name` 的子模块，和 `options.chunks` 的兄弟模块被创建。
  // 它会与 `options.chunks` 并行被加载。
  // Instead of using `option.filename`, it is possible to change the name of the output file by providing
  // the desired string here instead of `true`.

  minSize: number,
  // 在 公共chunk 被创建立之前，所有 公共模块 (common module) 的最少大小。
}
```

T> webpack1 构造函数 `new webpack.optimize.CommonsChunkPlugin(options, filenameTemplate, selectedChunks, minChunks)` 不再被支持。请使用相应的选项对象。


## 例子

### 公共chunk 用于 入口chunk (entry chunk)

生成一个额外的 chunk 包含入口chunk 的公共模块。

```javascript
new webpack.optimize.CommonsChunkPlugin({
  name: "commons",
  // ( 公共chunk(commnons chunk) 的名称)

  filename: "commons.js",
  // ( 公共chunk 的文件名)

  // minChunks: 3,
  // (模块必须被3个 入口chunk 共享)

  // chunks: ["pageA", "pageB"],
  // (只使用这些 入口chunk)
})
```

你必须在 入口chunk 之前加载生成的这个 公共chunk:

```html
<script src="commons.js" charset="utf-8"></script>
<script src="entry.bundle.js" charset="utf-8"></script>
```


### 明确第三方库 chunk

将你的代码拆分成公共代码和应用代码。

```javascript
entry: {
  vendor: ["jquery", "other-lib"],
  app: "./entry"
},
plugins: [
  new webpack.optimize.CommonsChunkPlugin({
    name: "vendor",
    // filename: "vendor.js"
    // (给 chunk 一个不同的名字)

    minChunks: Infinity,
    // (随着 entry chunk 越来越多，
    // 这个配置保证没其它的模块会打包进 vendor chunk)
  })
]
```

```html
<script src="vendor.js" charset="utf-8"></script>
<script src="app.js" charset="utf-8"></script>
```

T> 结合长期缓存，你可能需要使用这个[插件](https://github.com/diurnalist/chunk-manifest-webpack-plugin)去避免 公共chunk 改变。 你也需要使用 `records` 去保持稳定的模块 id，例如，使用 [`NamedModulesPlugin`](/plugins/named-modules-plugin) 或 [`HashedModuleIdsPlugin`](/plugins/hashed-module-ids-plugin)。


###  将公共模块打包进父 chunk

使用[代码拆分](/guides/code-splitting)功能，一个 chunk 的多个子 chunk 会有公共的依赖。为了防止重复，可以将这些公共模块移入父 chunk。这会减少总体的大小，但会对首次加载时间产生不良影响。如果预期到用户需要下载许多兄弟 chunks（例如，入口 trunk 的子 chunk），那这对改善加载时间将非常有用。

```javascript
new webpack.optimize.CommonsChunkPlugin({
  // names: ["app", "subPageA"]
  // (选择 chunks，或者忽略该项设置以选择全部 chunks)

  children: true,
  // (选择所有被选 chunks 的子 chunks)

  // minChunks: 3,
  // (在提取之前需要至少三个子 chunk 共享这个模块)
})
```


### 额外的异步 公共chunk

与上面的类似，但是并非将公共模块移动到父 chunk（增加初始加载时间），而是使用新的异步加载的额外公共chunk。当下载额外的 chunk 时，它将自动并行下载。

```javascript
new webpack.optimize.CommonsChunkPlugin({
  name: "app",
  // or
  names: ["app", "subPageA"]
  // the name or list of names must match the name or names
  // of the entry points that create the async chunks

  children: true,
  // (选择所有被选 chunks 的子 chunks)

  async: true,
  // (创建一个异步 公共chunk)

  minChunks: 3,
  // (在提取之前需要至少三个子 chunk 共享这个模块)
})
```


### 给 `minChunks` 配置传入函数

你也可以给 `minChunks` 传入一个函数。这个函数会被 `CommonsChunkPlugin` 插件回调，并且调用函数时会传入 `module` 和 `count` 参数。

`module` 参数代表每个 chunks 里的模块，这些 chunks 是你通过 `name`/`names` 参数传入的。
`module` has the shape of a [NormalModule](https://github.com/webpack/webpack/blob/master/lib/NormalModule.js), which has two particularly useful properties for this use case:

- `module.context`: The directory that stores the file. For example: `'/my_project/node_modules/example-dependency'`
- `module.resource`: The name of the file being processed. For example: `'/my_project/node_modules/example-dependency/index.js'`

`count` 参数表示 `module` 被使用的 chunk 数量。

当你想要对 `CommonsChunk` 如何决定模块被打包到哪里的算法有更为细致的控制， 这个配置就会非常有用。

```javascript
new webpack.optimize.CommonsChunkPlugin({
  name: "my-single-lib-chunk",
  filename: "my-single-lib-chunk.js",
  minChunks: function(module, count) {
    // 如果模块是一个路径，而且在路径中有 "somelib" 这个名字出现，
    // 而且它还被三个不同的 chunks/入口chunk 所使用，那请将它拆分到
    // 另一个分开的 chunk 中，chunk 的 keyname 是 "my-single-lib-chunk"，而文件名是 "my-single-lib-chunk.js"
    return module.resource && (/somelib/).test(module.resource) && count === 3;
  }
});
```

正如上面看到的，这个例子允许你只将其中一个库移到一个分开的文件当中，当而仅当函数中的所有条件都被满足了。

This concept may be used to obtain implicit common vendor chunks:

```javascript
new webpack.optimize.CommonsChunkPlugin({
  name: "vendor",
  minChunks: function (module) {
    // this assumes your vendor imports exist in the node_modules directory
    return module.context && module.context.includes("node_modules");
  }
})
```

In order to obtain a single CSS file containing your application and vendor CSS, use the following `minChunks` function together with [`ExtractTextPlugin`](/plugins/extract-text-webpack-plugin/):

```javascript
new webpack.optimize.CommonsChunkPlugin({
  name: "vendor",
  minChunks: function (module) {
    // This prevents stylesheet resources with the .css or .scss extension
    // from being moved from their original chunk to the vendor chunk
    if(module.resource && (/^.*\.(css|scss)$/).test(module.resource)) {
      return false;
    }
    return module.context && module.context.indexOf("node_modules") !== -1;
  }
})
```

## Manifest file

To extract the webpack bootstrap logic into a separate file, use the `CommonsChunkPlugin` on a `name` which is not defined as `entry`. Commonly the name `manifest` is used. See the [caching guide](/guides/caching) for details.

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

## More Examples

- [Common and Vendor Chunks](https://github.com/webpack/webpack/tree/master/examples/common-chunk-and-vendor-chunk)
- [Multiple Common Chunks](https://github.com/webpack/webpack/tree/master/examples/multiple-commons-chunks)
- [Multiple Entry Points with Commons Chunk](https://github.com/webpack/webpack/tree/master/examples/multiple-entry-points-commons-chunk-css-bundle)

***

> 原文：https://webpack.js.org/plugins/commons-chunk-plugin/
