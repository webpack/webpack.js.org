---
title: 管理输出
sort: 4
contributors:
  - skipjack
---

最初，管理 webpack 的[输出](/configuration/output)并在 HTML 文件中引入这些输出文件，可能看起来并不困难，然而一旦开始对[文件名使用哈希(hash)](/guides/caching)]并输出[多个 bundle](/guides/code-splitting)，一切就开始变得毫无头绪。然而，没有必要担心，因为通过一些插件，会使这个过程更容易操控。

首先，让我们来看没有使用这些插件时的初始情况：

__index.html__

``` html
<!doctype html>

<html>
  <head>
    <title>Output Management</title>
    <link rel="shortcut icon" href="/favicon.ico" />
    <link rel="stylesheet" href="/styles.min.css" />
    <script src="/vendor.bundle.js"></script>
  </head>
  <body>
    <script src="/app.bundle.js"></script>
  </body>
</html>
```

在这里，我们加载了一个 favicon，以及我们的样式表（通过使用 [`ExtractTextWebpackPlugin`](/plugins/extract-text-webpack-plugin)提取），以及任何 library（分离到[一个单独的 bundle](/guides/code-splitting)），最后，还有我们的主要 bundle(main bundle)（即 `app.bundle.js`）。一切都是可以正常运行的，但是如果我们修改入口起点的名称，会发生​​什么？如果我们决定充分利用[更优的缓存实践](/guides/caching)，会发生​​什么？


## Auto-Generated HTML

In comes the [`HtmlWebpackPlugin`](/plugins/html-webpack-plugin) to save the day. Using this plugin, you can stop hard-coding the output filenames into a manually-managed file and, instead, sit back as webpack auto-generates an `index.html` file for you. Let's take a look at what you'll need to add to your configuration:

__webpack.config.js__

``` js
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.js',
    vendor: [ 'react', 'react-dom' ]
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Output Management',
      favicon: './favicon.ico'
    })
  ]
};
```

This setup will generate the same HTML shown in the example above, excluding the extracted CSS. The plugin allows for many settings including extending your own template, minifying the output, and changing the script injection site. See [its documentation](/plugins/html-webpack-plugin) for more details.

T> Check out the [`HTMLWebpackTemplate`](https://github.com/jaketrent/html-webpack-template) extension for even more options including easy insertion of an `appMountId`, `meta` tags, and a `baseHref`.


## Multiple HTML Files

To generate multiple HTML files, say for a multi-page web application, you can utilize the [`MultipageWebpackPlugin`](https://github.com/mutualofomaha/multipage-webpack-plugin). This plugin is similar to the `html-webpack-plugin`, in fact it uses that plugin under the hood, however it can be used to generate an HTML file per entry point.


## The Manifest

Let's step back for a second now and ask a more high-level question -- how do these plugins know what files are being spit out? The answer is in the manifest webpack keeps to track how all your modules map to the output bundles. If you're interested in managing webpack's [output](/configuration/output) in other ways, the manifest would be a good place to start.

This data can be extracted into a json file for easy consumption using the [`WebpackManifestPlugin`](https://github.com/danethurber/webpack-manifest-plugin) or [`ChunkManifestPlugin`](https://github.com/soundcloud/chunk-manifest-webpack-plugin). Using the `ChunkManifestPlugin`, you would specify what to name it, what variable to expose it under, and whether or not to inline it via the `html-webpack-plugin`:

``` js
new ChunkManifestPlugin({
  filename: 'manifest.json',
  manifestVariable: 'webpackManifest',
  inlineManifest: false
})
```

See [the concepts page](/concepts/manifest) for more background information and the [caching guide](/guides/caching) guide to find out how this ties into long term caching.
