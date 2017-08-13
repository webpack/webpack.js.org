---
title: Production
sort: 8
contributors:
  - henriquea
  - rajagopal4890
  - markerikson
  - simon04
  - kisnows
  - chrisVillanueva
  - swapnilmishra
  - bring2dip
  - redian
  - skipjack
  - xgqfrms
---

In this guide we'll dive into some of the best practices and utilities for building a production site or application.

T> This walkthrough stems from [Tree Shaking](/guides/tree-shaking) and [Development](/guides/development). Please ensure you are familiar with the concepts/setup introduced in those guides before continuing on.


## Setup

The goals of _development_ and _production_ builds differ greatly. In _development_, we want strong source mapping and a localhost server with live reloading or hot module replacement. In _production_, our goals shift to a focus on minified bundles, lighter weight source maps, and optimized assets to improve load time. With this logical separation at hand, we typically recommend writing __separate webpack configurations__ for each environment.

While we will separate the _production_ and _development_ specific bits out, note that we'll still maintain a "common" configuration to keep things DRY. In order to merge these configurations together, we'll use a utility called [`webpack-merge`](). With the "common" configuration in place, we won't have to duplicate code within the environment-specific configurations.

Let's start by splitting out the bits we've already work on in previous guides:

__project__

``` diff
  webpack-demo
  |- package.json
- |- webpack.config.js
+ |- webpack.common.js
+ |- webpack.dev.js
+ |- webpack.prod.js
  |- /dist
  |- /src
    |- index.js
    |- math.js
  |- /node_modules
```

__webpack.common.js__

``` diff
+ const path = require('path');
+ const CleanWebpackPlugin = require('clean-webpack-plugin');
+ const HtmlWebpackPlugin = require('html-webpack-plugin');
+
+ module.exports = {
+   entry: {
+     app: './src/index.js'
+   },
+   plugins: [
+     new CleanWebpackPlugin(['dist']),
+     new HtmlWebpackPlugin({
+       title: 'Production'
+     })
+   ],
+   output: {
+     filename: '[name].bundle.js',
+     path: path.resolve(__dirname, 'dist')
+   }
+ };
```

__webpack.dev.js__

``` diff
+ module.exports = {
+   devtool: 'inline-source-map',
+   devServer: {
+     contentBase: './dist'
+   }
+ }
```

__webpack.prod.js__

``` diff
+ const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
+
+ module.exports = {
+   plugins: [
+     new UglifyJSPlugin()
+   ]
+ }
```

In `webpack.common.js`, we now have our `entry` and `output` setup configured and we've included any plugins that are required for both environments. In `webpack.dev.js`, we've added the recommended `devtool` for that environment (strong source mapping), as well as our simple `devServer` configuration. Finally, in `webpack.prod.js`, we included the `UglifyJSPlugin` which was first introduced by the [tree shaking]() guide.


## Merging Configurations

...


## Minification

...


## Production Source Mapping

...














## CLI Alternatives

...
