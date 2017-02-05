---
title: Plugins API
sort: 1
---

webpack provides flexible and powerful customization api in the form of plugins. Using plugins, we can plug functionality into webpack. Additionally, webpack provides lifecycle hooks into which plugins can be registered. At each of these lifecycle points, webpack will run all of the registered plugins and provide them with the current state of the webpack compilation.

## Tapable & Tapable instances

The plugin architecture is mainly possible for webpack due to an internal library named `Tapable`.
**Tapable Instances** are classes in the webpack source code which have been extended or mixed in from class `Tapable`.

For plugin authors, it is important to know which are the `Tapable` instances in the webpack source code. These instances provide a variety of event hooks into which custom plugins can be attached.
Hence, throughout this section are a list of all of the webpack `Tapable` instances (and their event hooks), which plugin authors can utilize.

For more information on `Tapable` visit the [tapable repository](https://github.com/webpack/tapable) or visit the [complete overview](./tapable)

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

### Different Plugin Shapes

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



