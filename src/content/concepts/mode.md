---
title: Mode
sort: 4
contributors:
  - EugeneHlushko
---

Providing the `mode` configuration option tells webpack to use its built-in optimizations accordingly.

`string`

## Usage

Just provide the `mode` option in the config:

```javascript
module.exports = {
  mode: 'production'
};
```


or pass it as a [CLI](/api/cli/) argument:

```bash
webpack --mode=production
```

If unset, webpack sets `production` as a default for mode and warns to let you know about this behavior. The supported values for mode are:

Option                | Description
--------------------- | -----------------------
`development`         | Provides `process.env.NODE_ENV` with value `development`. Enables `NamedModulesPlugin`.
`production`          | Provides `process.env.NODE_ENV` with value `production`. Enables `UglifyJsPlugin`, `ModuleConcatenationPlugin` and `NoEmitOnErrorsPlugin`.
`none`                | Opts out of any default optimization options

T> Please remember that setting `NODE_ENV` doesn't automatically set `mode`.


### Mode: development


```diff
// webpack.development.config.js
module.exports = {
+ mode: 'development'
- plugins: [
-   new webpack.NamedModulesPlugin(),
-   new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("development") }),
- ]
}
```


### Mode: production


```diff
// webpack.production.config.js
module.exports = {
+  mode: 'production',
-  plugins: [
-    new UglifyJsPlugin(/* ... */),
-    new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("production") }),
-    new webpack.optimize.ModuleConcatenationPlugin(),
-    new webpack.NoEmitOnErrorsPlugin()
-  ]
}
```


### Mode: none


```diff
// webpack.custom.config.js
module.exports = {
+  mode: 'none',
-  plugins: [
-  ]
}
```
