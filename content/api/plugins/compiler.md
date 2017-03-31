---
title: Compiler
sort: 2
---

The `Compiler` module of webpack is the main engine that creates a compilation instance with all the options passed through webpack CLI or `webpack` api or webpack configuration file.

It is exported by `webpack` api under `webpack.Compiler`.

The compiler is used by webpack by instantiating it and then calling the `run` method. Below is a trivial example of how one might use the `Compiler`. In fact, this is really close to how webpack itself uses it.

[__compiler-example__](https://github.com/pksjce/webpack-internal-examples/blob/master/compiler-example.js)

```javascript
// Can be imported from webpack package
import {Compiler} from 'webpack';

// Create a new compiler instance
const compiler = new Compiler();

// Populate all required options
compiler.options = {...};

// Creating a plugin.
class LogPlugin {
    apply (compiler) {
        compiler.plugin('should-emit', compilation => {
            console.log('should i emit?');
            return true;
        })
    }
}

// Apply the compiler to the plugin
new LogPlugin().apply(compiler);

/* Add other supporting plugins */

// Callback to be executed after run is complete
const callback = (err, stats) => {
    console.log('Compiler has finished execution.');
    /* Do something to show the stats */
};

// call run on the compiler along with the callback
compiler.run(callback);
```

The `Compiler` is what we call a `Tapable` instance. By this, we mean that it mixes in `Tapable` class to imbibe functionality to register and call plugins on itself.
Most user facing plugins are first registered on the `Compiler`.
The working of a Compiler can be condensed into the following highlights
 - Usually there is one master instance of Compiler. Child compilers can be created for delegating specific tasks.
 - A lot of the complexity in creating a compiler goes into populating all the relevant options for it.
 - `webpack` has [`WebpackOptionsDefaulter`](https://github.com/webpack/webpack/blob/master/lib/WebpackOptionsDefaulter.js) and [`WebpackOptionsApply`](https://github.com/webpack/webpack/blob/master/lib/WebpackOptionsApply.js) specifically designed to provide the `Compiler` with all the intial data it requires.
 - The `Compiler` is just ultimately just a function which performs bare minimum functionality to keep a lifecycle running. It delegates all the loading/bundling/writing work to various plugins.
 - `new LogPlugin(args).apply(compiler)` registers the plugin to any particular hook event in the `Compiler`'s lifecycle.
 - The `Compiler` exposes a `run` method which kickstarts all compilation work for `webpack`. When that is done, it should call the passed in `callback` function. All the tail end work of logging stats and errors are done in this callback function.

## Watching

However, the `Compiler` supports two flavors of execution. One on watch mode and one on a normal single run.
While it essentially performs the same functionality while watching, there are some additions to the lifecycle events. This allows `webpack` to have Watch specific plugins.

## MultiCompiler

This module, MultiCompiler, allows webpack to run multiple configurations in separate compiler.
If the `options` parameter in the webpack's NodeJS api is an array of options, webpack applies separate compilers and calls the `callback` method at the end of each compiler execution.

```javascript
var webpack = require('webpack');

var config1 = {
  entry: './index1.js',
  output: {filename: 'bundle1.js'}
}
var config2 = {
  entry: './index2.js',
  output: {filename:'bundle2.js'}
}

webpack([config1, config2], (err, stats) => {
  process.stdout.write(stats.toString() + "\n");
})
```

## Event Hooks

This a reference guide to all the event hooks exposed by the `Compiler`.

| Event name                 | Reason                              | Params               | Type       |
|----------------------------|-------------------------------------|----------------------|------------|
| __`entry-option`__         |                  -                  |           -          | bailResult |
| __`after-plugins`__        | After setting up initial set of plugins | `compiler`       | sync       |
| __`after-resolvers`__      | After setting up the resolvers      | `compiler`           | sync       |
| __`environment`__          |                  -                  |           -          | sync       |
| __`after-environment`__    | Environment setup complete          |           -          | sync       |
| __`before-run`__           | `compiler.run()` starts             | `compiler`           | async      |
| __`run`__                  | Before reading records              | `compiler`           | async      |
| __`watch-run`__            | Before starting compilation after watch | `compiler`           | async      |
| __`normal-module-factory`__ | After creating a `NormalModuleFactory` | `normalModuleFactory`| sync      |
| __`context-module-factory`__ | After creating a `ContextModuleFactory` | `contextModuleFactory`| sync      |
| __`before-compile`__       | Compilation parameters created      | `compilationParams`  | sync       |
| __`compile`__              | Before creating new compilation     | `compilationParams`  | sync       |
| __`this-compilation`__     | Before emitting `compilation` event | `compilation`        | sync       |
| __`compilation`__          | Compilation creation completed      | `compilation`        | sync       |
| __`make`__                 |                                     | `compilation`        | parallel   |
| __`after-compile`__        |                                     | `compilation`        | async      |
| __`should-emit`__          | Can return true/false at this point | `compilation`        | bailResult |
| __`need-additional-pass`__ |                                     |           -          | bailResult |
| __`emit`__                 | Before writing emitted assets to output dir | `compilation` | async      |
| __`after-emit`__           | After writing emitted assets to output dir | `compilation` | async      |
| __`done`__                 | Completion of compile               | `stats`              | sync       |
| __`fail`__                 | Failure of compile                  | `error`              | sync       |
| __`invalid`__              | After invalidating a watch compile  | `fileName`, `changeTime` | sync       |

## Examples

?> Adds examples of usage for some of the above events
