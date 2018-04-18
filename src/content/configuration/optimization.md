---
title: Optimization
sort: 8
contributors:
  - EugeneHlushko
---

Optimization configuration allows you to control the webpack output optimization level.


## `optimization.minimize`

`boolean`

Tell webpack to minimize the JavaScript output using the [UglifyjsWebpackPlugin](/plugins/uglifyjs-webpack-plugin/)
It is set to `true` by default in `production` [mode](/concepts/mode/)

__webpack.config.js__


```js
module.exports = {
  //...
  optimization: {
    minimize: true
  }
}
```

## `optimization.minimizer`

`UglifyjsWebpackPlugin | [UglifyjsWebpackPlugin]`

Allows to override default minimizer by providing one or more custom configured [UglifyjsWebpackPlugin](/plugins/uglifyjs-webpack-plugin/) instance(s)

__webpack.config.js__


```js
module.exports = {
  //...
  optimization: {
    minimizer: [
      new UglifyJsPlugin({ /* … */ })
    ]
  }
}
```

## `optimization.splitChunks`

`object`

Tells webpack how to deal with code splitting. See configuration and available options on the [SplitChunksPlugin](/plugins/split-chunks-plugin/) page.
