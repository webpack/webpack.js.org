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

 
or pass it as a cli argument:

```bash
webpack --mode=production
```

The following string values are supported:

Option                | Description
--------------------- | -----------------------
`development`         | Provides `process.env.NODE_ENV` with value `development`. Enables `NamedModulesPlugin`.
`production`          | Provides `process.env.NODE_ENV` with value `production`. Enables `UglifyJsPlugin`, `ModuleConcatenationPlugin` and `NoEmitOnErrorsPlugin`.


### Mode: development


```diff
// webpack.production.config.js
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
