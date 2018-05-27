---
title: Writing a Plugin
sort: 4
contributors:
  - tbroadley
  - iamakulov
---

Plugins expose the full potential of the webpack engine to third-party developers. Using staged build callbacks, developers can introduce their own behaviors into the webpack build process. Building plugins is a bit more advanced than building loaders, because you'll need to understand some of the webpack low-level internals to hook into them. Be prepared to read some source code!

## Creating a Plugin

A plugin for `webpack` consists of a named JavaScript function that:

- Defines `apply` method in its prototype.
- Specifies an [event hook](/api/compiler-hooks/) on which to bind itself.
- Manipulates webpack internal instance specific data.

```javascript
// A named JavaScript function.
function MyExampleWebpackPlugin() {

}

// Defines `apply` method in its prototype.
MyExampleWebpackPlugin.prototype.apply = function(compiler) {
  // Specifies webpack's event hook to attach itself
  compiler.hooks.compile.tapAsync('afterCompile', function(compilation /* Manipulates webpack internal instance specific data. */, callback) {
    console.log('This is an example plugin!!!');

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
  compiler.hooks.done.tap('HelloWorldPlugin', function() {
    console.log('Hello World!');
  });
};

module.exports = HelloWorldPlugin;
```

Then to use the plugin, just include an instance in your webpack config `plugins` array:

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

Using the compiler object, you may setup event hooks that provide a reference to each new compilation. These compilations provide additional event hooks for hooking into steps within the build process.

```javascript
function HelloCompilationPlugin(options) {}

HelloCompilationPlugin.prototype.apply = function(compiler) {
  // Setup callback for accessing a compilation:
  compiler.hooks.compilation.tap("HelloCompilationPlugin", function(compilation) {

    // Now setup callbacks for accessing compilation steps:
    compilation.hooks.optimize.tap("HelloCompilationPlugin", function() {
      console.log("Assets are being optimized.");
    });
  });
};

module.exports = HelloCompilationPlugin;
```

For more information on what hooks are available on the `compiler`, `compilation`, and other important objects, see the [plugins](/api/plugins/) doc.

## Async event hooks

Some event hooks are asynchronous. Apart from `tap`, they also have `tapAsync` and `tapPromise` methods. By tapping using these methods, you can do asynchronous actions inside hooks:

```javascript
function HelloAsyncPlugin(options) {}

HelloAsyncPlugin.prototype.apply = function(compiler) {
  // tapAsync() is callback-based
  compiler.hooks.emit.tapAsync('HelloAsyncPlugin', function(compilation, callback) {
    // Do something async...
    setTimeout(function() {
      console.log("Done with async work...");
      callback();
    }, 1000);
  });
  
  // tapPromise() is promise-based
  compiler.hooks.emit.tapPromise('HelloAsyncPlugin', function(compilation) {
    // Do something async...
    return doSomethingAsync()
      .then(() => {
        console.log("Done with async work...");
      });
  });
  
  // Plain old tap() is still here:
  compiler.hooks.emit.tap('HelloAsyncPlugin', function() {
    // No async work here
    console.log("Done with sync work...");
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
  compiler.hooks.emit.tapAsync('FileListPlugin', function(compilation, callback) {
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

## Under the hood

Under the hood, webpack uses [Tapable](https://github.com/webpack/tapable) to create and run hooks. This is how it looks:

```javascript
import { SyncHook, AsyncSeriesHook } from 'tapable';

class SomeWebpackInternalClass {
  constructor() {
    this.hooks = {
      // Create hooks:
      compilation: new SyncHook(),
      run: new AsyncSeriesHook(),
    };
  }
  
  someMethod() {
    // Call a hook:
    this.hooks.run.call();
  
    // Call another hook:
    // (This is an async one, so webpack passes a callback into it)
    this.hooks.run.callAsync(() => {
      // The callback is called when all tapped functions finish executing
    });
  }
}
```

There’re multiple types of hooks which run tapped functions a bit differently. They are described [in the Tapable docs](https://github.com/webpack/tapable#hook-types).
