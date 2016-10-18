---
title: Node.js API
contributors:
  - sallar
---
webpack provides a Node.js API which can be used directly in Node.js runtime. To get started with the Node.js API, require the `webpack` module:

``` js
const webpack = require("webpack");
```

Or if you’re using the ES6 modules interface:

``` js
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
watch([watchOptions](#watch-options), callback)
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
