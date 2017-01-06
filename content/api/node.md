---
title: Node.js API
sort: 3
contributors:
  - sallar
  - rynclark
---

webpack provides a Node.js API which can be used directly in Node.js runtime.

The Node.js API is useful in scenarios in which you need to customize the build or development process since all the reporting and error handling must be done manually and webpack only does the compiling part. For this reason the [`stats`](/configuration/stats) configuration options will not have any effect in the `webpack()` call.

## Installation

To start using webpack Node.js API, first install webpack if you haven’t yet:

```
npm install webpack --save-dev
```

Then require the webpack module in your Node.js script:

``` js
const webpack = require("webpack");

// Or if you prefer ES2015:
import webpack from "webpack";
```

## `webpack()`

The imported `webpack` function is fed a webpack [Configuration Object](/configuration/) and runs the webpack compiler if a callback function is provided:

``` js-with-links
const webpack = require("webpack");

webpack({
  // [Configuration Object](/configuration/)
}, (err, [stats](#stats-object)) => {
  if (err || stats.hasErrors()) {
    // [Handle errors here](#error-handling)
  }
  // Done processing
});
```

T> The `err` object **will not** include compilation errors and those must be handled separately using `stats.hasErrors()` which will be covered in detail in [Error Handling](#error-handling) section of this guide. The `err` object will only contain webpack-related issues, such as misconfiguration, etc.

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
T> webpack will **not** run the multiple configurations in parallel. Each configuration is only processed after the previous one has finished processing. To have webpack process them in parallel, you can use a third-party solution like [parallel-webpack](https://www.npmjs.com/package/parallel-webpack). 

## Compiler Instance

If you don’t pass the `webpack` runner function a callback, it will return a webpack `Compiler` instance. This instance can be used to manually trigger the webpack runner or have it build and watch for changes. Much like the [CLI](/api/cli/) Api. The `Compiler` instance provides the following methods:

* `.run(callback)`
* `.watch(watchOptions, handler)`

## Run

Calling the `run` method on the `Compiler` instance is much like the quick run method mentioned above:

``` js-with-links
const webpack = require("webpack");

const compiler = webpack({
  // [Configuration Object](/configuration/)
});

compiler.run((err, [stats](#stats-object)) => {
  // ...
});
```

## Watching

Calling the `watch` method, triggers the webpack runner, but then watches for changes (much like CLI: `webpack --watch`), as soon as webpack detects a change, runs again. Returns an instance of `Watching`.

``` js-with-links
watch(watchOptions, callback)
```

``` js-with-links-with-details
const webpack = require("webpack");

const compiler = webpack({
  // [Configuration Object](/configuration/)
});

const watching = compiler.watch({
  <details><summary>/* [watchOptions](/configuration/watch/#watchoptions) */</summary>
  aggregateTimeout: 300,
  poll: undefined
  </details>
}, (err, [stats](#stats-object)) => {
  // Print watch/build result here...
  console.log(stats);
});
```

`Watching` options are [covered in detail here](/configuration/watch/#watchoptions).

### Close `Watching`

The `watch` method returns a `Watching` instance that exposes `.close(callback)` method. Calling this method will end watching:

``` js
watching.close(() => {
  console.log("Watching Ended.");
});
```

T> It’s not allowed to watch or run again before the existing watcher has been closed or invalidated.

### Invalidate `Watching`

Manually invalidate the current compiling round, but don’t stop watching.

``` js
watching.invalidate(() => {
  console.warn("Invalidated.");
});
```

## Stats Object

The `stats` object that is passed as a second argument of the [`webpack()`](#webpack-) callback, is a good source of information about the code compilation process. It includes:

- Errors and Warnings (if any)
- Timings
- Module and Chunk information
- etc.

The [webpack CLI](/api/cli) uses this information to display a nicely formatted output in your console.

This object exposes these methods:

### `stats.hasErrors()`

Can be used to check if there were errors while compiling. Returns `true` or `false`.

### `stats.hasWarnings()`

Can be used to check if there were warnings while compiling. Returns `true` or `false`.

### `stats.toJson(options)`

Returns compilation information as a JSON object. `options` can be either a string (a preset) or an object for more granular control:

``` js-with-links
stats.toJson("minimal"); // [more options: "verbose", etc](/configuration/stats).
```
``` js
stats.toJson({
  assets: false,
  hash: true
});
```

All available options and presets are described in [Stats documentation](/configuration/stats)

> Here’s [an example of this function’s output](https://github.com/webpack/analyse/blob/master/app/pages/upload/example.json)

### `stats.toString(options)`

Returns a formatted string of the compilation information (similar to [CLI](/api/cli) output).

Options are the same as [`stats.toJson(options)`](/api/node#stats-tojson-options-) with one addition:

``` js
stats.toString({
  // ...
  // Add console colors
  colors: true
});
```

Here’s an example of `stats.toString()` usage:

``` js-with-links
const webpack = require("webpack");

webpack({
  // [Configuration Object](/configuration/)
}, (err, stats) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(stats.toString({
    chunks: false,  // Makes the build much quieter
    colors: true    // Shows colors in the console
  }));
});
```

## Error Handling

For a good error handling, you need to account for these three types of errors:

- Fatal webpack errors (wrong configuration, etc)
- Compilation errors (missing modules, syntax errors, etc)
- Compilation warnings

Here’s an example that does all that:

``` js-with-links
const webpack = require("webpack");

webpack({
  // [Configuration Object](/configuration/)
}, (err, stats) => {
  if (err) {
    console.error(err.stack || err);
    if (err.details) {
      console.error(err.details);
    }
    return;
  }

  const info = stats.toJson();

  if (stats.hasErrors()) {
    console.error(info.errors);
  }

  if (stats.hasWarnings()) {
    console.warn(info.warnings)
  }

  // Log result...
});
```

## Compiling to Memory

webpack writes the output to the specified files on disk. If you want webpack to output them to a different kind of file system (memory, webDAV, etc), you can set the `outputFileSystem` option on the compiler:

``` js
const MemoryFS = require("memory-fs");
const webpack = require("webpack");

const fs = new MemoryFS();
const compiler = webpack({ /* options*/ });

compiler.outputFileSystem = fs;
compiler.run((err, stats) => {
  // Read the output later:
  const content = fs.readFileSync("...");
});
```

T> The output file system you provide needs to be compatible with Node’s own [`fs`](https://nodejs.org/api/fs.html) module interface. 
