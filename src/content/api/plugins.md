---
title: Plugin API
group: Plugins
sort: 0
---

T> For a high-level introduction to writing plugins, start with [writing a plugin](/contribute/writing-a-plugin).

Many objects in webpack extend the `Tapable` class, which exposes a `plugin` method. And with the `plugin` method, plugins can inject custom build steps. You will see `compiler.plugin` and `compilation.plugin` used a lot. Essentially, each one of these plugin calls binds a callback to fire at specific steps throughout the build process.

There are two types of plugin interfaces...

__Timing Based__

- sync (default): The plugin runs synchronously and returns its output.
- async: The plugin runs asynchronously and uses the give `callback` to return its output.
- parallel: The handlers are invoked in parallel.

__Return Value__

- not bailing (default): No return value.
- bailing: The handlers are invoked in order until one handler returns something.
- parallel bailing: The handlers are invoked in parallel (async). The first returned value (by order) is significant.
- waterfall: Each handler gets the result value of the last handler as an argument.

A plugin is installed once as webpack starts up. webpack installs a plugin by calling its `apply` method, and passes a reference to the webpack `compiler` object. You may then call `compiler.plugin` to access asset compilations and their individual build steps. An example would look like this:

__my-plugin.js__

``` js
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

__webpack.config.js__

``` js
plugins: [
  new MyPlugin({
    options: 'nada'
  })
]
```


## Tapable & Tapable Instances

The plugin architecture is mainly possible for webpack due to an internal library named `Tapable`.
**Tapable Instances** are classes in the webpack source code which have been extended or mixed in from class `Tapable`.

For plugin authors, it is important to know which are the `Tapable` instances in the webpack source code. These instances provide a variety of event hooks into which custom plugins can be attached.
Hence, throughout this section are a list of all of the webpack `Tapable` instances (and their event hooks), which plugin authors can utilize.

For more information on `Tapable` visit the [complete overview](/api/tapable) or the [tapable repository](https://github.com/webpack/tapable).
