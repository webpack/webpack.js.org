---
title: Writing a Plugin
sort: 4
contributors:
  - tbroadley
  - nveenjain
---

Plugins expose the full potential of the webpack engine to third-party developers. Using staged build callbacks, developers can introduce their own behaviors into the webpack build process. Building plugins is a bit more advanced than building loaders, because you'll need to understand some of the webpack low-level internals to hook into them. Be prepared to read some source code!

## Creating a Plugin

A plugin for `webpack` consists of

- A named JavaScript function.
- Defines `apply` method in its prototype.
- Specifies an [event hook](/api/compiler-hooks/) to tap into.
- Manipulates webpack internal instance specific data.
- Invokes webpack provided callback after functionality is complete.

```javascript
// A JavaScript class.
class MyExampleWebpackPlugin {
  // Define `apply` as it's prototype method which is supplied with compiler as it's argument
  apply(compiler) {
    // Specifiy Hook in which you want to plugin to
    compiler.hooks.some_hook_you_wish_to_plugin_to.tap(
      "Name of your plugin for debugging purposes",
      compilation => {
        /* Manipulate webpack internal instance specific data using compilation */
        console.log("This is example of synchronouse plugin");
      }
    );
  }
}
```

## Compiler and Compilation

Among the two most important resources while developing plugins are the `compiler` and `compilation` objects. Understanding their roles is an important first step in extending the webpack engine.

- The `compiler` object represents the fully configured webpack environment. This object is built once upon starting webpack, and is configured with all operational settings including options, loaders, and plugins. When applying a plugin to the webpack environment, the plugin will receive a reference to this compiler. Use the compiler to access the main webpack environment.

- A `compilation` object represents a single build of versioned assets. While running webpack development middleware, a new compilation will be created each time a file change is detected, thus generating a new set of compiled assets. A compilation surfaces information about the present state of module resources, compiled assets, changed files, and watched dependencies. The compilation also provides many callback points at which a plugin may choose to perform custom actions.

These two components are an integral part of any webpack plugin (especially a `compilation`), so developers will benefit by familiarizing themselves with these source files:

- [Compiler Source](https://github.com/webpack/webpack/blob/master/lib/Compiler.js)
- [Compilation Source](https://github.com/webpack/webpack/blob/master/lib/Compilation.js)

## Basic plugin architecture

Plugins are instantiated objects with an `apply` method on their prototype. This `apply` method is called once by the webpack compiler while installing the plugin. The `apply` method is given a reference to the underlying webpack compiler, which grants access to compiler callbacks. A simple plugin is structured as follows:

```javascript
class HelloWorldPlugin {
  apply(compiler) {
    compiler.hooks.done.tap("Hello World Plugin", (
      stats /* stats is passed as argument when done hook is tapped.  */
    ) => {
      console.log("Hello World!");
    });
  }
}

module.exports = HelloWorldPlugin;
```

Then to install the plugin, just include an instance in your webpack config `plugins` array:

```javascript
var HelloWorldPlugin = require("hello-world");

var webpackConfig = {
  // ... config settings here ...
  plugins: [new HelloWorldPlugin({ options: true })]
};
```

## Accessing the compilation

Using the compiler object, you may bind callbacks that provide a reference to each new compilation. These compilations provide callbacks for hooking into numerous steps within the build process.

```javascript
class HelloCompilationPlugin {
  apply(compiler) {
    // Tap into compilation hook which gives compilation as argument to the callback function
    compiler.hooks.compilation.tap("HelloCompilationPlugin", compilation => {
      // Now we can tap into various hooks available through compilation
      compilation.hooks.optimize.tap("HelloCompilationPlugin", () => {
        console.log("Assets are being optimized.");
      });
    });
  }
}

module.exports = HelloCompilationPlugin;
```

For more information on what callbacks are available on the `compiler`, `compilation`, and other important objects, see the [plugins](/api/plugins/) doc.

## Async compilation plugins

Some plugin hooks are asynchronous. To tap into them, we can use `tap` method which will behave in synchronous manner or use one of `tapAsync` method or `tapPromise` method which are asyncronous methods.

### tapAsync

When we use tapAsync method to tap into plugins, we need to call the callback function which is supplied as the last argument to our function.

```javascript
class HelloAsyncPlugin{
  apply(compiler){

    compiler.hooks.emit.tapAsync("HelloAsyncPlugin", (compilation, callback) => {
      // Do something async...
      setTimeout(function() {
        console.log("Done with async work...");
        callback();
      }, 1000);
    }
  }
};

module.exports = HelloAsyncPlugin;
```

#### tapPromise

When we use tapPromise method to tap into plugins, we need to return a promise which resolves when our asynchronous task is completed.

```javascript
class HelloAsyncPlugin{
  apply(compiler){

    compiler.hooks.emit.tapPromise("HelloAsyncPlugin", compilation => {
      // return a Promise that resolves when we are done...
      return new Promise((resolve,reject)=>{
        setTimeout(function() {
          console.log("Done with async work...");
          resolve();
        }, 1000);
      })
    }
  }
};

module.exports = HelloAsyncPlugin;
```

## Example

Once we can latch onto the webpack compiler and each individual compilations, the possibilities become endless for what we can do with the engine itself. We can reformat existing files, create derivative files, or fabricate entirely new assets.

Let's write a simple example plugin that generates a new build file called `filelist.md`; the contents of which will list all of the asset files in our build. This plugin might look something like this:

```javascript
class FileListPlugin {
  apply(compiler) {
    // emit is asynchronous hook, tapping into it using tapAsync, you can use tapPromise/tap(synchronous) as well
    compiler.hooks.emit.tapAsync("FileListPlugin", (compiler, callback) => {
      // Create a header string for the generated file:
      var filelist = "In this build:\n\n";

      // Loop through all compiled assets,
      // adding a new line item for each filename.
      for (var filename in compilation.assets) {
        filelist += "- " + filename + "\n";
      }

      // Insert this list into the webpack build as a new file asset:
      compilation.assets["filelist.md"] = {
        source: function() {
          return filelist;
        },
        size: function() {
          return filelist.length;
        }
      };

      callback();
    });
  }
}

module.exports = FileListPlugin;
```

## Different Plugin Shapes

A plugin can be classified into types based on the event hooks it taps into. Every event hook is pre-defined as synchronous/asynchronous/waterfall/parallel and hook is called internally using call/callAsync method. The list of hooks that are supported/can be tapped into are generally specified in this.hooks property.

For example:-

```javascript
this.hooks = {
  shouldEmit: new SyncBailHook(["compilation"])
};
```

It represents that the only hook supported is shouldEmit which is a hook of `SyncBailHook` type and the only parameter which will be passed to any plugin that taps into shouldEmit hook is compilation.

Various types of hooks supported are :-

### Synchronous Hooks

- **SyncHook**
  - defined as `new SyncHook([params])`
  - Tapped into using `tap` method.
  - Called using `call(...params)` method.

- **Bail Hooks**
  - defined using `SyncBailHook[params]`
  - Tapped into using `tap` method.
  - Called using `call(...params)` method.

  In these type of hooks, each of the plugin callbacks will be invoked one after the other with the specific `args`. If any value is returned except undefined by any plugin, then that value is returned by hook and no further plugin callback is invoked. Many useful events like `"optimizeChunks"`, `"optimizeChunkModules"` are SyncBailHooks.

- **Waterfall Hooks**
  - defined using `SyncWaterfallHook[params]`
  - Tapped into using `tap` method.
  - Called using `call( ... params)` method

  Here each of the plugins are called one after the other with the args from the return value of the previous plugin. The plugin must take the order of its execution into account.
  It must accept arguments from the previous plugin that was executed. The value for the first plugin is `init`. Hence atleast 1 param must be supplied for waterfall Hooks. This pattern is used in the Tapable instances which are related to the `webpack` templates like `ModuleTemplate`, `ChunkTemplate` etc.

### Asynchronous Hooks

- **Async Series Hook**
  - defined using `AsyncSeriesHook[params]`
  - Tapped into using `tap`/`tapAsync`/`tapPromise` method.
  - Called using `callAsync( ... params)` method

  The plugin handler functions are called with all args and a callback function with the signature `(err?: Error) -> void`. The handler functions are called in order of registration. `callback` is called after all the handlers are called.
  This is also a commonly used pattern for events like `"emit"`, `"run"`.

- **Async waterfall** The plugins will be applied asynchronously in the waterfall manner.
  - defined using `AsyncWaterfallHook[params]`
  - Tapped into using `tap`/`tapAsync`/`tapPromise` method.
  - Called using `callAsync( ... params)` method

  The plugin handler functions are called with the current value and a callback function with the signature `(err: Error, nextValue: any) -> void.` When called `nextValue` is the current value for the next handler. The current value for the first handler is `init`. After all handlers are applied, callback is called with the last value. If any handler passes a value for `err`, the callback is called with this error and no more handlers are called.
  This plugin pattern is expected for events like `"before-resolve"` and `"after-resolve"`.

- **Async Series Bail**
  - defined using `AsyncSeriesBailHook[params]`
  - Tapped into using `tap`/`tapAsync`/`tapPromise` method.
  - Called using `callAsync( ... params)` method

-**parallel** -

- **Async Parallel**
  - defined using `AsyncParallelHook[params]`
  - Tapped into using `tap`/`tapAsync`/`tapPromise` method.
  - Called using `callAsync( ... params)` method

- **Async Series Bail**
  - defined using `AsyncSeriesBailHook[params]`
  - Tapped into using `tap`/`tapAsync`/`tapPromise` method.
  - Called using `callAsync( ... params)` method
