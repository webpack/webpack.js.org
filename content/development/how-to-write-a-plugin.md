---
title: How to write a plugin?
sort: 2
---

Plugins expose the full potential of the webpack engine to third-party developers. Using staged build callbacks, developers can introduce their own behaviors into the webpack build process. Building plugins is a bit more advanced than building loaders, because you'll need to understand some of the webpack low-level internals to hook into them. Be prepared to read some source code!

## Creating a Plugin

A plugin for `webpack` consists of

  - A named JavaScript function.
  - Defines `apply` method in it's prototype.
  - Specifies webpack's event hook to attach itself.
  - Manipulates webpack internal instance specific data.
  - Invokes webpack provided callback after functionality is complete.

```javascript
// A named JavaScript function.
function MyExampleWebpackPlugin() {

};

// Defines `apply` method in it's prototype.
MyExampleWebpackPlugin.prototype.apply = function(compiler) {
  // Specifies webpack's event hook to attach itself.
  compiler.plugin('webpacksEventHook', function(compilation /* Manipulates webpack internal instance specific data. */, callback) {
    console.log("This is an example plugin!!!");

    // Invokes webpack provided callback after functionality is complete.
    callback();
  });
};
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
function HelloWorldPlugin(options) {
  // Setup the plugin instance with options...
}

HelloWorldPlugin.prototype.apply = function(compiler) {
  compiler.plugin('done', function() {
    console.log('Hello World!');
  });
};

module.exports = HelloWorldPlugin;
```

Then to install the plugin, just include an instance in your webpack config `plugins` array:

```javascript
var HelloWorldPlugin = require('hello-world');

var webpackConfig = {
  // ... config settings here ...
  plugins: [
    new HelloWorldPlugin({options: true})
  ]
};
```

## Accessing the compilation

Using the compiler object, you may bind callbacks that provide a reference to each new compilation. These compilations provide callbacks for hooking into numerous steps within the build process.

```javascript
function HelloCompilationPlugin(options) {}

HelloCompilationPlugin.prototype.apply = function(compiler) {

  // Setup callback for accessing a compilation:
  compiler.plugin("compilation", function(compilation) {

    // Now setup callbacks for accessing compilation steps:
    compilation.plugin("optimize", function() {
      console.log("Assets are being optimized.");
    });
  });
};

module.exports = HelloCompilationPlugin;
```

For more information on what callbacks are available on the `compiler`, `compilation`, and other important objects, see the [plugins](/api/plugins/) doc.

## Async compilation plugins

Some compilation plugin steps are asynchronous, and pass a callback function that _must_ be invoked when your plugin is finished running.

```javascript
function HelloAsyncPlugin(options) {}

HelloAsyncPlugin.prototype.apply = function(compiler) {
  compiler.plugin("emit", function(compilation, callback) {

    // Do something async...
    setTimeout(function() {
      console.log("Done with async work...");
      callback();
    }, 1000);

  });
};

module.exports = HelloAsyncPlugin;
```

## Example

Once we can latch onto the webpack compiler and each individual compilations, the possibilities become endless for what we can do with the engine itself. We can reformat existing files, create derivative files, or fabricate entirely new assets.

Let's write a simple example plugin that generates a new build file called `filelist.md`; the contents of which will list all of the asset files in our build. This plugin might look something like this:

```javascript
function FileListPlugin(options) {}

FileListPlugin.prototype.apply = function(compiler) {
  compiler.plugin('emit', function(compilation, callback) {
    // Create a header string for the generated file:
    var filelist = 'In this build:\n\n';

    // Loop through all compiled assets,
    // adding a new line item for each filename.
    for (var filename in compilation.assets) {
      filelist += ('- '+ filename +'\n');
    }

    // Insert this list into the webpack build as a new file asset:
    compilation.assets['filelist.md'] = {
      source: function() {
        return filelist;
      },
      size: function() {
        return filelist.length;
      }
    };

    callback();
  });
};

module.exports = FileListPlugin;
```

## Different Plugin Shapes

A plugin can be classified into types based on the event it is registered to. Every event hook decides how it is going to apply the plugins in its registry.

- __synchronous__ The Tapable instance applies plugins using

`applyPlugins(name: string, args: any...)`

`applyPluginsBailResult(name: string, args: any...)`

This means that each of the plugin callbacks will be invoked one after the other with the specific `args`.
This is the simplest format for a plugin. Many useful events like `"compile"`, `"this-compilation"` expect plugins to have synchronous execution.

- __waterfall__ Plugins applied using

`applyPluginsWaterfall(name: string, init: any, args: any...)`

Here each of the plugins are called one after the other with the args from the return value of the previous plugin. The plugin must take into consider the order of its execution.
It must accept arguments from the previous plugin that was executed. The value for the first plugin is `init`. This pattern is used in the Tapable instances which are related to the `webpack` templates like `ModuleTemplate`, `ChunkTemplate` etc.

- __asynchronous__ When all the plugins are applied asynchronously using

`applyPluginsAsync(name: string, args: any..., callback: (err?: Error) -> void)`

The plugin handler functions are called with all args and a callback function with the signature `(err?: Error) -> void`. The handler functions are called in order of registration.`callback` is called after all the handlers are called.
This is also a commonly used pattern for events like `"emit"`, `"run"`.

- __async waterfall__ The plugins will be applied asynchronously in the waterfall manner.

`applyPluginsAsyncWaterfall(name: string, init: any, callback: (err: Error, result: any) -> void)`

The plugin handler functions are called with the current value and a callback function with the signature `(err: Error, nextValue: any) -> void.` When called `nextValue` is the current value for the next handler. The current value for the first handler is `init`. After all handlers are applied, callback is called with the last value. If any handler passes a value for `err`, the callback is called with this error and no more handlers are called.
This plugin pattern is expected for events like `"before-resolve"` and `"after-resolve"`.

- __async series__ It is the same as asynchronous but if any of the plugins registered fails, then no more plugins are called.

`applyPluginsAsyncSeries(name: string, args: any..., callback: (err: Error, result: any) -> void)`

-__parallel__ -

`applyPluginsParallel(name: string, args: any..., callback: (err?: Error) -> void)`

`applyPluginsParallelBailResult(name: string, args: any..., callback: (err: Error, result: any) -> void)`
