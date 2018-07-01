---
title: Mode
sort: 4
contributors:
  - EugeneHlushko
  - byzyk
---

Providing the `mode` configuration option tells webpack to use its built-in optimizations accordingly.

`string`

T> The default value for `mode` is `production`.

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

The following string values are supported:

Option                | Description
--------------------- | -----------------------
`development`         | Provides `process.env.NODE_ENV` with value `development`. Enables `NamedChunksPlugin` and `NamedModulesPlugin`.
`production`          | Provides `process.env.NODE_ENV` with value `production`. Enables `FlagDependencyUsagePlugin`, `FlagIncludedChunksPlugin`, `ModuleConcatenationPlugin`, `NoEmitOnErrorsPlugin`, `OccurrenceOrderPlugin`, `SideEffectsFlagPlugin` and `UglifyJsPlugin`.
`none`                | Opts out of any default optimization options

If not set, webpack sets `production` as the default value for `mode`. The supported values for mode are:

T> Please remember that setting `NODE_ENV` doesn't automatically set `mode`.


### Mode: development


```diff
// webpack.development.config.js
module.exports = {
+ mode: 'development'
- plugins: [
-   new webpack.NamedModulesPlugin(),
-   new webpack.NamedChunksPlugin(),
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

If you want to change the behavior according the **mode** variable inside the *webpack.config.js* you have to export a function instead of an object:

```javascript
var config = {
  entry: './app.js'
  //...
};

module.exports = (env, argv) => {

  if (argv.mode === 'development') {
    config.devtool = 'source-map';
  }

  if (argv.mode === 'production') {
    //...
  }

  return config;
};
```
