---
title: Node.js API
contributors:
  - sallar
---
## Overview

webpack provides a Node.js API which can be used directly in Node.js runtime.

The Node.js API is useful in scenarios in which you need to customize the build or development process since all the reporting and error handling must be done manually and webpack only does the compiling part.

## Installation

To start using webpack Node.js API, first install webpack if you haven’t yet:

```
npm install webpack --save-dev
```

Then require the webpack module in your Node.js script:

``` js
const webpack = require("webpack");

// Or if you prefer ES6:
import webpack from "webpack";
```

## `webpack()`

The imported `webpack` function is fed a webpack [Configuration Object](/configuration/) and runs the webpack compiler if a callback function is provided:

``` js-with-links
const webpack = require("webpack");

webpack({
  // [Configuration Object](/configuration/)
}, (err, [stats](#stats-object)) => {
  // Done
  console.log(stats);
});
```

**Note** that you can provide the `webpack` function with an array of configurations:

``` js-with-links
webpack([
  { /* Configuration Object */ },
  { /* Configuration Object */ },
  { /* Configuration Object */ }
], (err, [stats](#stats-object)) => {
  // ...
});
```

T> The `err` object **will not** include compilation errors and those must be handled separately using `stats.hasErrors()` which will be covered in detail in [Error Handling](#error-handling) section of this guide. The `err` object will only contain webpack-related issues, such as misconfiguration, etc.

## Compiler Instance

If you don’t pass the `webpack` runner function a callback, it will return a webpack `Compiler` intance. This instance can be used to manually trigger the webpack runner or have it build and watch for changes. Much like the [CLI](/api/cli/) Api. The `Compiler` intance provides the following methods:

* `.run(callback)`
* `.watch(watchOptions, handler)`

## Run

Calling the `run` method on the `Compiler` intance is much like the quick run method mentioned above:

``` js-with-links
const webpack = require("webpack");

const compiler = webpack({
  // [Configuration Object](/configuration/)
});

compiler.run((err, [stats](#stats-object)) => {
  // ...
});
```

## Watch

Calling the `watch` method, triggers the webpack runner, but then watches for changes (much like CLI: `webpack --watch`), as soon as webpack detects a change, runs again:

``` js-with-links
watch(watchOptions, callback)
```

``` js-with-links-with-details
const webpack = require("webpack");

const compiler = webpack({
  // [Configuration Object](/configuration/)
});

const watcher = compiler.watch({
  <details><summary>/* [watchOptions](/configuration/watch/#watchoptions) */</summary>
  aggregateTimeout: 300,
  poll: undefined
  </details>
}, (err, [stats](#stats-object)) => {
  // Print watch/build result here...
  console.log(stats);
});
```

Watch options are [covered in detail here](/configuration/watch/#watchoptions).

### Close Watcher

The `watch` method returns an instance that exposes `.close(callback)` method. Calling this method will end watching:

``` js
watcher.close(() => {
  console.log("Watching Ended.");
})
```

T> It’s not allowed to watch or run again before the existing watcher has been closed or invalidated.

### Invalidate Watcher

...

## Stats Object

...

## Error Handling

...
