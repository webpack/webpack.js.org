---
title: Tapable
group: Plugins
sort: 1
contributors:
  - thelarkinn
  - pksjce
  - e-cloud
---

[Tapable](https://github.com/webpack/tapable) is a small library that allows you to add and apply plugins to a javascript module. It can be inherited or mixed in to other modules. It is similar to NodeJS's `EventEmitter` class, focusing on custom event emission and manipulation. However, in addition to this, `Tapable` allows you to have access to the "emittee" or "producer" of the event through callbacks arguments.

`Tapable` has four groups of member functions:

- `plugin(name:string, handler:function)`: This allows a custom plugin to register into a **Tapable instance**'s event. This acts similar to the `on()` method of the `EventEmitter`, which is used for registering a handler/listener to do something when the signal/event happens.
- `apply(…pluginInstances: (AnyPlugin|function)[])`: `AnyPlugin` should be a class (or, rarely, an object) that has an `apply` method, or just a function with some registration code inside. This method is just to **apply** plugins' definition, so that the real event listeners can be registered into the _Tapable_ instance's registry.
- `applyPlugins*(name:string, …)`: The _Tapable_ instance can apply all the plugins under a particular hash using these functions. This group of methods act like the `emit()` method of the `EventEmitter`, controlling event emission meticulously using various strategies.
- `mixin(pt: Object)`: a simple method to extend `Tapable`'s prototype as a mixin rather than inheritance.

The different `applyPlugins*` methods cover the following use cases:

- Plugins can run serially.
- Plugins can run in parallel.
- Plugins can run one after the other but taking input from the previous plugin (waterfall).
- Plugins can run asynchronously.
- Quit running plugins on bail: that is, once one plugin returns non-`undefined`, jump out of the run flow and return _the return of that plugin_. This sounds like `once()` of `EventEmitter` but is totally different.


## Example

One of webpack's _Tapable_ instances, [Compiler](/api/compiler), is responsible for compiling the webpack configuration object and returning a [Compilation](/api/compilation) instance. When the Compilation instance runs, it creates the required bundles.

See below for a simplified version of how this looks using `Tapable`:

__node_modules/webpack/lib/Compiler.js__

``` js
var Tapable = require("tapable");

function Compiler() {
	Tapable.call(this);
}

Compiler.prototype = Object.create(Tapable.prototype);
```

Now to write a plugin on the compiler,

__my-custom-plugin.js__

``` js
function CustomPlugin() {}
CustomPlugin.prototype.apply = function(compiler) {
  compiler.plugin('emit', pluginFunction);
}
```

The compiler executes the plugin at the appropriate point in its lifecycle by

__node_modules/webpack/lib/Compiler.js__

``` js
this.apply*("emit",options) // will fetch all plugins under 'emit' name and run them.
```
