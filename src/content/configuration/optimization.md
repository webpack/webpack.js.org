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

Since version 4 webpack runs optimizations for you depending on the chosen `mode`, still all optimizations are available for manual configuration and overrides.


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

Allows you to override the default minimizer by providing a different one or more customized [UglifyjsWebpackPlugin](/plugins/uglifyjs-webpack-plugin/) instances.

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


## `optimization.nodeEnv`

`string` `bool: false`

Tells webpack to set `process.env.NODE_ENV` to a given string value. `optimization.nodeEnv` uses (DefinePlugin)[/plugins/define-plugin/] unless set to `false`. `optimization.nodeEnv` __defaults__ to [mode](/concepts/mode/) if set, else falls back to `"production"`. Possible values:

- any string: the value to set `process.env.NODE_ENV` to.
- false: do not modify/set the value of `process.env.NODE_ENV`.
