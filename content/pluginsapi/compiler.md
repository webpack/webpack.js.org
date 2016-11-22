---
title: Compiler
sort: 2
---

The `Compiler` module of webpack is the main engine that creates a compilation instance with all the options passed through webpack CLI or `webpack` api or webpack comfiguration file.

It is exported by `webpack` api under `webpack.Compiler`.

The compiler is used by webpack by instantiating it and then calling the `run` method. Below is a trivial example of how one might use the `Compiler`. In fact, this is very close to how webpack itself uses it.

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
            console.log('should i emit');
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
All user facing plugins are first registered on the `Compiler`.
The working of a Compiler can be condensed into the following highlights
 - Usually there is one master instance of Compiler. Child compilers can be created for delegating specific tasks.
 - A lot of the complexity in creating a compiler goes into populating all the relevant options for it.
 - `webpack` has [`WebpackOptionsDefaulter`](https://github.com/webpack/webpack/blob/master/lib/WebpackOptionsDefaulter.js) and [`WebpackOptionsApply`](https://github.com/webpack/webpack/blob/master/lib/WebpackOptionsApply.js) specifically designed to provide the `Compiler` with all the intial data it requires.
 - The `Compiler` is just ultimately just a function which performs bare minimum functionality to keep a lifecycle running. It delegates all the loading/bundling/writing work to various plugins.
 - `new LogPlugin(args).apply(compiler)` registers the plugin to any particular hook event in the `Compiler`'s lifecycle.
 - The `Compiler` exposes a `run` method which kickstarts all compilation work for `webpack`. When that is done, it should call the passed in `callback` function. All the tail end work of logging stats and errors are done in this callback function.

## Watching

However, the `Compiler` supports two flavors of execution. One on watch mode and one on a normal single run.
While it essentially performs the same functionality while watching, there are some subtle changes to the lifecycle events. This allows `webpack` to have Watch specific plugins.

## MultiCompiler

?> Can create child compilers?

## Event Hooks

This a reference guide to all the event hooks exposed by the `Compiler`.

?>TODO: For each hook follow template of
1. event name
2. reason for event.
3. async or sync or parallel or waterfall
4. some usage examples.

`environment()`

`after-environment()`

`before-run(compiler: Compiler, callback)`

`run(callback)`

`watch-run(watching: Watching, callback)`

`normal-module-factory(normalModuleFactory: NormalModuleFactory)`

`context-module-factory(contextModuleFactory: ContextModuleFactory)`

`compilation(compilation: Compilation, params: Object)`

`this-compilation(compilation: Compilation, params: Object)`

`after-plugins(compiler: Compiler)`

`after-resolvers(compiler: Compiler)`

`should-emit(compilation: Compilation)`

`emit(compilation: Compilation, callback)`    

`after-emit(compilation: Compilation, callback)`

`done(stats: Stats)`

`additional-pass(callback)`

`failed(err: Error)`

`invalid(fileName: string, changeTime)`

`entry-option(context, entry)`

## Examples