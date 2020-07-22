---
title: Mode
sort: 5
contributors:
  - EugeneHlushko
  - byzyk
  - mrichmond
  - Fental
  - mattsacks
related:
  - title: 'webpack default options (source code)'
    url: https://github.com/webpack/webpack/blob/master/lib/WebpackOptionsDefaulter.js
---

Providing the `mode` configuration option tells webpack to use its built-in optimizations accordingly.

`string = 'production': 'none' | 'development' | 'production'`

## Usage

Provide the `mode` option in the config:

```javascript
module.exports = {
  mode: 'development'
};
```


or pass it as a [CLI](/api/cli/) argument:

```bash
webpack --mode=development
```

The following string values are supported:

Option                | Description
--------------------- | -----------------------
`development`         | Sets `process.env.NODE_ENV` on `DefinePlugin` to value `development`. Enables `NamedChunksPlugin` and `NamedModulesPlugin`.
`production`          | Sets `process.env.NODE_ENV` on `DefinePlugin` to value `production`. Enables `FlagDependencyUsagePlugin`, `FlagIncludedChunksPlugin`, `ModuleConcatenationPlugin`, `NoEmitOnErrorsPlugin`, `OccurrenceOrderPlugin`, `SideEffectsFlagPlugin` and `TerserPlugin`.
`none`                | Opts out of any default optimization options

If not set, webpack sets `production` as the default value for `mode`.

T> Please remember that setting `NODE_ENV` doesn't automatically set `mode`.


### Mode: development

Adding the option `mode: 'development'` to your configuration will enable the following:

```javascript
// webpack.development.config.js
module.exports = {
  // Enabling this option...
  mode: 'development',

  // ...turns on the following:
  devtool: 'eval',
  cache: true,
  performance: {
    hints: false
  },
  output: {
    pathinfo: true
  },
  optimization: {
    namedModules: true,
    namedChunks: true,
    nodeEnv: 'development',
    flagIncludedChunks: false,
    occurrenceOrder: false,
    concatenateModules: false,
    splitChunks: {
      hidePathInfo: false,
      minSize: 10000,
      maxAsyncRequests: Infinity,
      maxInitialRequests: Infinity,
    },
    noEmitOnErrors: false,
    checkWasmTypes: false,
    minimize: false,
    removeAvailableModules: false
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.NamedChunksPlugin(),
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('development') }),
  ]
};
```


### Mode: production

Adding the option `mode: 'production'` to your configuration will enable the following:

```javascript
// webpack.development.config.js
module.exports = {
  // Enabling this option...
  mode: 'production',

  // ...turns on the following:
  performance: {
    hints: 'warning'
  },
  output: {
    pathinfo: false
  },
  optimization: {
    namedModules: false,
    namedChunks: false,
    nodeEnv: 'production',
    flagIncludedChunks: true,
    occurrenceOrder: true,
    concatenateModules: true,
    splitChunks: {
      hidePathInfo: true,
      minSize: 30000,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
    },
    noEmitOnErrors: true,
    checkWasmTypes: true,
    minimize: true,
  },
  plugins: [
    new TerserPlugin(/* ... */),
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
};
```


### Mode: none

Adding the option `mode: 'none'` to your configuration will enable the following:

```javascript
// webpack.custom.config.js
module.exports = {
  // Enabling this option...
  mode: 'none',
  
  // ...turns on the following:
  performance: {
    hints: false
  },
  optimization: {
    flagIncludedChunks: false,
    occurrenceOrder: false,
    concatenateModules: false,
    splitChunks: {
      hidePathInfo: false,
      minSize: 10000,
      maxAsyncRequests: Infinity,
      maxInitialRequests: Infinity,
    },
    noEmitOnErrors: false,
    checkWasmTypes: false,
    minimize: false,
  },
  plugins: []
};
```

### Overrides

If you want to change the options configured by the `mode` variable, you’ll need to export a function instead of an object to update your `config` object:

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
