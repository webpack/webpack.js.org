---
title: Node.js API
---
Webpack provides a Node.js API which can be used directly in Node.js runtime. To get started with the Node.js API, require the `webpack` module:

``` js
const webpack = require("webpack");
```

Or if you’re using the ES6 modules interface:

``` js
import webpack from "webpack";
```

## Quick Run

The imported `webpack` function is fed a Webpack [Configuration Object](/configuration/) and runs the webpack compiler if a callback funtion is provided:

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

If you don’t pass the `webpack` runner function a callback, it will return a Webpack `Compiler` intance. This instance can be used to manually trigger the Webpack runner or have it build and watch for changes. Much like the [CLI](/api/cli/) Api. The `Compiler` intance provides the following methods:

* `.run(callback)`
* `.watch(watchOptions, handler)`

## Run

Calling the `run` method on the `Compiler` intance is much like the quick run method mentioned above:

``` js-with-links
const webpack = require("webpack");

const compiler = webpack({
  // [Configuration Object](/configuration/)
});

comiler.run((err, [stats](#stats-object)) => {
  // ...
});
```

## Watch

Calling the `watch` method, triggers the Webpack runner, but then watches for changes (much like CLI: `webpack --watch`), as soon as Webpack detects a change, runs again:

``` js-with-links
watch([watchOptions](#watch-options), callback)
```

``` js-with-links
const webpack = require("webpack");

const compiler = webpack({
  // [Configuration Object](/configuration/)
});

const watcher = comiler.watch({ /* watchOptions */}, (err, [stats](#stats-object)) => {
  // Print watch/build result here...
  console.log(stats);
});
```

#### Watch Options

First parameter is watchOptions object:

| Key               | Default         | Explanation                                                                                                                           |
|-------------------|-----------------|---------------------------------------------------------------------------------------------------------------------------------------|
| aggregateTimeout  | 300             | After a change the watcher waits that time (in milliseconds) for more changes.                                                        |
| poll              | undefind (auto) | The watcher uses polling instead of native watchers. `true` uses the default interval, a number specifies a interval in milliseconds. |

### End Watching

The `watch` method returns an intance that exposes `.close(callback)` method. Calling this method will end watching:

``` js
watcher.close(() => {
  console.log("Watching Ended.");
})
```

## Stats Object

...
