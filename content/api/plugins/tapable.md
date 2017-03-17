---
title: Tapable
sort: 1
contributors:
  - thelarkinn
  - pksjce
  - e-cloud
---

[Tapable](https://github.com/webpack/tapable) is small library that allows you to add and apply plugins to a javascript module.
It can be inherited or mixed in to other modules. It is similar to NodeJS's `EventEmitter` class, focusing on custom event emission and manipulation.
However, in addition to this, `Tapable` allows you to have access to the "emittee" or "producer" of the event through callbacks arguments.

`Tapable` has four groups of member functions:

* `plugin(name:string, handler:function)` - This allows a custom plugin to register into a **Tapable instance**'s event.
This acts as the same as `on()` of `EventEmitter`, for registering a handler/listener to do something when the signal/event happens.

* `apply(…pluginInstances: (AnyPlugin|function)[])` - `AnyPlugin` should be subclass of [AbstractPlugin](https://github.com/webpack/webpack/blob/master/lib/AbstractPlugin.js), or a class (or object, rare case) has an `apply` method, or just a function with some registration code inside.
This method is just to **apply** plugins' definition, so that the real event listeners can be registered into the **Tapable instance**'s registry.

* `applyPlugins*(name:string, …)` - The **Tapable instance** can apply all the plugins under a particular hash using these functions.
These group of method act like `emit()` of `EventEmitter`, to control the event emission meticulously with various strategy for various use cases.

* `mixin(pt: Object)` - a simple method to extend `Tapable`'s prototype as a mixin rather than inheritance.

The different `applyPlugins*` methods cover the following use cases:

* Plugins can run serially

* Plugins can run in parallel

* Plugins can run one after the other but taking input from the previous plugin (waterfall)

* Plugins can run asynchronously

* Quit runing plugins on bail: that is once one plugin returns non-`undefined`, jump out of the run flow and return *the return of that plugin*. This sounds like `once()` of `EventEmitter` but is totally different.

## Example
One of webpack's **Tapable instances**, [Compiler](./compiler), is responsible for compiling the webpack configuration object and returning a [Compilation](./compilation) instance. When the Compilation instance runs, it creates the required bundles.

See below is a simplified version of how this looks using `Tapable`.

**node_modules/webpack/lib/Compiler.js**

```javascript
var Tapable = require("tapable");
function Compiler() {
	Tapable.call(this);
}
Compiler.prototype = Object.create(Tapable.prototype);
```

Now to write a plugin on the compiler,

**my-custom-plugin.js**

```javascript
function CustomPlugin() {}
CustomPlugin.prototype.apply = function(compiler) {
    compiler.plugin('emit', pluginFunction);
}
```

The compiler executes the plugin at the appropriate point in its lifecycle by

**node_modules/webpack/lib/Compiler.js**

```javascript
this.apply*("emit",options) // will fetch all plugins under 'emit' name and run them.
```