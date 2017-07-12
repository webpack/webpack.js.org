---
title: 缓存
sort: 11
contributors:
  - okonet
  - jouni-kantola
related:
  - title: 可预测的长效缓存
    url: https://medium.com/webpack/predictable-long-term-caching-with-webpack-d3eee1d3fa31
---

为了能够长期缓存 webpack 生成的静态资源:

1. 使用 `[chunkhash]` 向每个文件添加一个依赖于内容的缓存杀手(cache-buster)。
2. 将 webpack mainfest 提取到一个单独的文件中去。
3. 对于一组依赖关系相同的资源，确保包含引导代码的入口起点(entry point) chunk 不会随时间的推移而更改它的哈希值。

对于更优化的设置：

1. 当需要在 HTML 中加载资源时，使用 compiler 统计信息(stats)来获取文件名。
2. 生成 chunk 清单(manifest)的 JSON 内容，并在页面资源加载之前内联进HTML中去。


## 问题

每次需要在代码中更新内容时，服务器都必须重新部署，然后再由所有客户端重新下载。 这显然是低效的，因为通过网络获取资源可能会很慢。 这也就是为什么浏览器需要缓存资源的原因。

但是采用这种方式有一个缺陷：如果我们在部署新版本时不更改资源的文件名，浏览器可能会认为它没有被更新，就会使用它的缓存版本。

告诉浏览器下载较新版本的一种简单方法就是更改资源的文件名。在 webpack 之前的时代，我们一般会添加一个内部版本号作为参数，然后逐次递增：

```bash
application.js?build=1
application.css?build=1
```

使用 webpack 就更简单了。通过包含输出[占位符(substitutions)](/configuration/output#output-filename)，每次webpack构建时都会生成一个唯一的哈希值用来构成文件名。
以下这个配置示例会生成两个在文件名中带有哈希值的文件（每个都有一个入口起点）：

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

使用这个配置文件运行 webpack 会生成下面的结果：

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

但是这里的问题是，在*任何文件更新*之后构建就会更新所有文件名，然后客户端就不得不重新下载所有代码。 那么我们如何保证客户端始终获得最新版本的资源，而又不需要重新下载所有的资源呢？


## 为每个文件生成唯一的哈希值

如果文件内容在两次构建之间没有变化，就生成相同的文件名的话会怎么样？例如，当依赖没有更新，只有应用代码更新的时候，就没有必要去重新下载一个公共库(vendor)文件。

webpack 允许你根据文件内容生成哈希值，只要用 `[chunkhash]` 替换 `[hash]` 就可以了。以下是新的配置：

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

这个配置文件也会生成两个文件，但是在这种情况下，每个文件会获得自己唯一的哈希值。

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

T> 不要在开发环境下使用 [chunkhash]，因为这会增加编译时间。将开发和生产模式的配置分开，并在开发模式中使用 [name].js 的文件名， 在生产模式中使用 [name].[chunkhash].js 文件名。


## 从 webpack 编译统计中获取文件名

在开发模式下，你只要在 HTML 中直接引用 JavaScript 文件：

```html
<script src="vendor.js"></script>
<script src="main.js"></script>
```

而每次在生产环境中构建，我们都会得到不同的文件名。类似这样：

```html
<script src="vendor.50cfb8f89ce2262e5325.js"></script>
<script src="main.70b594fe8b07bcedaa98.js"></script>
```

为了在 HTML 中引用正确的文件，我们需要一些有关构建的信息。这可以使用下面这个插件，从 webpack 编译统计中提取：

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

或者，只需使用以下其中一个插件去导出 JSON 文件：

* https://www.npmjs.com/package/webpack-manifest-plugin
* https://www.npmjs.com/package/assets-webpack-plugin

在我们当前配置下，使用 `WebpackManifestPlugin` 后一个示例输出像这样：

```json
{
  "main.js": "main.155567618f4367cd1cb8.js",
  "vendor.js": "vendor.c2330c22cd2decb5da5a.js"
}
```


## 确定性的(Deterministic)哈希值

为了最小化生成的文件大小，webpack 使用标识符而不是模块名称。在编译期间，生成标识符并映射到块文件名，然后放入一个名为 *chunk manifest* 的 JavaScript 对象中。
为了生成保存在构建中的标识符，webpack 提供了 `NamedModulesPlugin`（推荐用于开发模式）和 `HashedModuleIdsPlugin`（推荐用于生产模式）这两个插件。

?> When exist, link to `NamedModulesPlugin` and `HashedModuleIdsPlugin` docs pages

?> Describe how the option `recordsPath` option works

然后将 chunk manifest（与引导/运行时代码一起）放入 entry chunk，这对 webpack 打包的代码工作是至关重要的。

T> 使用 [CommonsChunkPlugin](/plugins/commons-chunk-plugin) 将公共库(vendor)和应用程序代码分离开来，并创建一个显式的 vendor chunk 以防止它频繁更改。 当使用 `CommonsChunkPlugin` 时，运行时代码会被移动到*最后*一个公共入口(entry)。

这个问题和以前一样：每当我们改变代码的任何部分时，即使它的内容的其余部分没有改变，都会更新我们的入口块以便包含新的映射(manifest)。 这反过来，将产生一个新的哈希值并且使长效缓存失效。

要解决这个问题，我们应该使用 [`ChunkManifestWebpackPlugin`](https://github.com/diurnalist/chunk-manifest-webpack-plugin)，它会将 manifest 提取到一个单独的 JSON 文件中。 这将用一个 webpack runtime 的变量替换掉chunk manifest。 但我们可以做得更好；我们可以使用 `CommonsChunkPlugin` 将运行时提取到一个单独的入口起点(entry)中去。这里是一个更新后的 `webpack.config.js`，将生成我们的构建目录中的 manifest 和 runtime 文件：

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

因为我们从入口块(entry chunk)中移除了 manifest，所以我们现在有责任为 webpack 提供它。上面示例中的 `manifestVariable` 选项是全局变量的名称，webpack 将利用它查找 manifest JSON 对象。这个变量*应该在我们引入 bundle 到 HTML 之前就定义好*。这是通过在 HTML 中内联 JSON 的内容来实现的。我们的 HTML 头部应该像这样：

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

在结束时，文件的哈希值应该基于文件的内容。对此，我们可以使用 [webpack-chunk-hash](https://github.com/alexindigo/webpack-chunk-hash) 或者 [webpack-md5-hash](https://github.com/erm0l0v/webpack-md5-hash)。

所以最终的 `webpack.config.js` 看起来像这样：

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
      manifestVariable: "webpackManifest",
      inlineManifest: true
    })
  ]
};
```

使用这个配置，vendor chunk 就不会更改哈希值，除非你修改了它的代码或者依赖。下面是两次构建的输出，在运行期间修改了 `moduleB.js`：

``` bash
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

``` bash
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

注意，**vendor chunk具有相同的文件名**，manifest 也是一样的，因为我们已经提取了 manifest chunk！


## 内联 Manifest

要内联 chunk manifest 还是选择 webpack runtime（以防止额外的HTTP请求），取决于你的服务器设置。这有一个很好的[演练 Rails 基础](https://brigade.engineering/setting-up-webpack-with-rails-c62aea149679)的项目。 对于在 Node.js 中的服务器端渲染，你可以使用 [webpack-isomorphic-tools](https://github.com/halt-hammerzeit/webpack-isomorphic-tools)。

T> 如果你的应用程序不依赖于任何服务器端渲染，通常只需为应用程序生成一个 `index.html` 文件即可。 为此，请使用如 [`HtmlWebpackPlugin`](https://github.com/ampedandwired/html-webpack-plugin)加上 [`ScriptExtHtmlWebpackPlugin`](https://github.com/numical/script-ext-html-webpack-plugin) 或者 [`InlineManifestWebpackPlugin`](https://github.com/szrenwei/inline-manifest-webpack-plugin) 的组合。这将会大大地简化设置。


## 参考

* https://medium.com/@okonetchnikov/long-term-caching-of-static-assets-with-webpack-1ecb139adb95#.vtwnssps4
* https://gist.github.com/sokra/ff1b0290282bfa2c037bdb6dcca1a7aa
* https://github.com/webpack/webpack/issues/1315
* https://github.com/webpack/webpack.js.org/issues/652
* https://presentations.survivejs.com/advanced-webpack/

***

https://webpack.js.org/guides/caching/
