---
title: Optimization
sort: 8
contributors:
  - EugeneHlushko
  - jeremenichelli
related:
  - title: 'webpack 4: Code Splitting, chunk graph and the splitChunks optimization'
    url: https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
---

Since version 4 webpack runs optimizations for you depending on the `mode` set, but you can modify them indepentently too.


## `optimization.minimize`

`boolean`

Tell webpack to minimize the bundle using the [UglifyjsWebpackPlugin](/plugins/uglifyjs-webpack-plugin/).

This is `true` by default in `production` mode.

__webpack.config.js__


```js
module.exports = {
  //...
  optimization: {
    minimize: false
  }
}
```

T> Learn how [mode](/concepts/mode/) works.

## `optimization.minimizer`

`UglifyjsWebpackPlugin | [UglifyjsWebpackPlugin]`

Allows you to override the default minimizer by providing a different one or more customized [UglifyjsWebpackPlugin](/plugins/uglifyjs-webpack-plugin/) instance.

__webpack.config.js__


```js
module.exports = {
  //...
  optimization: {
    minimizer: [
      new webpack.optimize.UglifyJsPlugin({ /* your config */ })
    ]
  }
}
```

## `optimization.splitChunks`

`object`

By default webpack v4+ provides new common chunks strategies out of the box for dynamically imported modules. See available options for configuring this behavior in the [SplitChunksPlugin](/plugins/split-chunks-plugin/) page.
