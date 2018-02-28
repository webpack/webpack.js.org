---
title: Plugins
sort: 8
contributors:
  - sokra
  - skipjack
  - yatharthk
  - arturparkhisenko
---

The `plugins` option is used to customize the webpack build process in a variety of ways. webpack comes with a variety built-in plugins available under `webpack.[plugin-name]`. See [this page](/plugins) for a list of plugins and documentation but note that there are a lot more out in the community.

T> Note: This page only discusses using plugins, however if you are interested in writing your own please visit [Writing a Plugin](/development/how-to-write-a-plugin/).


## `plugins`

`array`

A list of webpack plugins. For example, when your bundles are big, the `UglifyJsPlugin` could be useful to reduce bundles size by minifying scripts. This could be added like so:

```js
plugins: [
  new webpack.optimize.UglifyJsPlugin({
    ...
  })
]
```

A more complex example, using multiple plugins, might look something like this:

```js
var webpack = require('webpack');
// importing plugins that do not come by default in webpack
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var DashboardPlugin = require('webpack-dashboard/plugin');

// adding plugins to your configuration
plugins: [
  // build optimization plugins
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      drop_console: false,
    }
  }),
  new ExtractTextPlugin({
    filename: 'build.min.css',
    allChunks: true,
  }),
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  // compile time plugins
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': '"production"',
  }),
  // webpack-dev-server enhancement plugins
  new DashboardPlugin(),
  new webpack.HotModuleReplacementPlugin(),
]
```
