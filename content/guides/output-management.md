---
title: Output Management
sort: 4
contributors:
  - skipjack
---

Managing webpack's [output](/configuration/output) and including it in your HTML files may not seem tough at first, but once you start [using hashes in filenames](/guides/caching) and outputting [multiple bundles](/guides/code-splitting-libraries), things can start to get a bit hairy. However, there's no need to fear as a few plugins exist that will make this process much easier to manage.

First let's take a look at where you might stand without these plugins:

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

Here we've loaded a favicon, our stylesheet (extracted with the [`ExtractTextWebpackPlugin`](/plugins/extract-text-webpack-plugin)), any libraries (split into [a separate bundle](/guides/code-splitting-libraries)), and finally our main bundle (`app.bundle.js`). This is ok, but what happens if we change our entry point names? What if we decide to take advantage of [better caching practices](/guides/caching)?


## Auto-Generated HTML

In comes the [`HtmlWebpackPlugin`](/plugins/html-webpack-plugin) to save the day. Using this plugin, you can stop hard-coding the output filenames into a manually-managed file and, instead, sit back as webpack auto-generates an `index.html` file for you. Let's take a look at what you'll need to add to your configuration:

__webpack.config.js__

``` js
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: './index.js',
    vendor: [ 'react', 'react-dom' ]
  },

  output: {
    path: 'dist',
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
