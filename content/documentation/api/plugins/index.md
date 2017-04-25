---
title: Plugin API
sort: 1
---

T> For a high-level introduction to writing plugins, start with [How to write a plugin](/development/how-to-write-a-plugin).

webpack provides flexible and powerful customization api in the form of plugins. Using plugins, we can plug functionality into webpack. Additionally, webpack provides lifecycle hooks into which plugins can be registered. At each of these lifecycle points, webpack will run all of the registered plugins and provide them with the current state of the webpack compilation.

Many objects in webpack extend the `Tapable` class, which exposes a `plugin` method. And with the `plugin` method, plugins can inject custom build steps. You will see `compiler.plugin` and `compilation.plugin` used a lot. Essentially, each one of these plugin calls binds a callback to fire at specific steps throughout the build process.

A plugin is installed once as webpack starts up. webpack installs a plugin by calling its `apply` method, and passes a reference to the webpack `compiler` object. You may then call `compiler.plugin` to access asset compilations and their individual build steps. An example would look like this:

```javascript
// MyPlugin.js

function MyPlugin(options) {
  // Configure your plugin with options...
}

MyPlugin.prototype.apply = function(compiler) {
  compiler.plugin("compile", function(params) {
    console.log("The compiler is starting to compile...");
  });

  compiler.plugin("compilation", function(compilation) {
    console.log("The compiler is starting a new compilation...");

    compilation.plugin("optimize", function() {
      console.log("The compilation is starting to optimize files...");
    });
  });

  compiler.plugin("emit", function(compilation, callback) {
    console.log("The compilation is going to emit files...");
    callback();
  });
};

module.exports = MyPlugin;
```

Then in `webpack.config.js`

```javascript
    plugins: [
        new MyPlugin({options: 'nada'})
    ]
```

## Plugin Interfaces

There are two types of plugin interfaces.

* Timing based
  * sync (default): As seen above. Use return.
  * async: Last parameter is a callback. Signature: function(err, result)
  * parallel: The handlers are invoked parallel (async).

* Return value
  * not bailing (default): No return value.
  * bailing: The handlers are invoked in order until one handler returns something.
  * parallel bailing: The handlers are invoked in parallel (async). The first returned value (by order) is significant.
  * waterfall: Each handler gets the result value of the last handler as an argument.

## Tapable & Tapable instances

The plugin architecture is mainly possible for webpack due to an internal library named `Tapable`.
**Tapable Instances** are classes in the webpack source code which have been extended or mixed in from class `Tapable`.

For plugin authors, it is important to know which are the `Tapable` instances in the webpack source code. These instances provide a variety of event hooks into which custom plugins can be attached.
Hence, throughout this section are a list of all of the webpack `Tapable` instances (and their event hooks), which plugin authors can utilize.

For more information on `Tapable` visit the [tapable repository](https://github.com/webpack/tapable) or visit the [complete overview](./tapable)
