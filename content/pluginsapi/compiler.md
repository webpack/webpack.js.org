---
title: Compiler
sort: 2
---

The `Compiler` module of webpack is the main engine that creates a compilation instance with all the options passed through webpack CLI or `webpack` api or webpack comfiguration file.

It is exported by `webpack` api under `webpack.Compiler`.

The compiler is used by webpack by instantiating it and then calling the `run` method.

[__compiler-examples__](https://github.com/pksjce/webpack-internal-examples/blob/master/compiler-example.js)

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
const callback = () => {
    console.log('Compiler has finished execution.')
};

// call run on the compiler along with the callback
compiler.run(callback);
```

?>TODO: Add more explanation of how above code works explaining compiler parts and hooks.
Also tell Tapable is mixed in with Compiler.Differentiate between Compiler's and Tapable's methods

## Watching

?>TODO: Add that compiler duplicates all above functionality and adds watch functionality to it. Highlight differences.

## MultiCompiler

?> Can create child compilers?

## Event Hooks

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