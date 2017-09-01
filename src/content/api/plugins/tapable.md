---
title: Tapable
sort: 1
contributors:
  - thelarkinn
  - pksjce
  - e-cloud
---

[Tapable](https://github.com/webpack/tapable)是一个小型库,能够让我们为javascript模块添加并应用插件。
它可以被其它模块继承或混合。它类似于NodeJS的 `EventEmitter` 类,专注于自定义事件的发射和操作。
除此之外, `Tapable` 允许你通过回调函数的参数访问事件的生产者。

`Tapable` 有四组成员函数:

* `plugin(name:string, handler:function)` - 这个方法允许给**Tapable实例**事件注册一个自定义插件。
这个操作类似于 `EventEmitter` 的 `on()`, 注册一个处理函数/监听器到某个信号/事件发生时执行。

* `apply(…pluginInstances: (AnyPlugin|function)[])` - `AnyPlugin` 是 [AbstractPlugin](https://github.com/webpack/webpack/blob/master/lib/AbstractPlugin.js) 的子类，或者是一个有 `apply` 方法的类（或者，少数情况下是一个对象），或者只是一个有注册代码的函数。这个方法只是 **apply** 插件的定义,所以正真的事件监听器会被注册到**Tapable实例**的注册表。

* `applyPlugins*(name:string, …)` - 使用此函数，**Tapable 实例**可以对指定 hash 下的所有插件执行 apply。
这些方法执行类似于 `EventEmitter` 的 `emit()`, 可以针对不同的使用情况采用不同的策略控制事件发射。

* `mixin(pt: Object)` - 一个简单的方法能够以混合的方式扩展 `Tapable` 的原型,而非继承。

不同的 `applyPlugins*` 方法对应以下使用情况:

* 串行执行插件

* 并行执行插件

* 插件一个接一个的执行,并且每个插件接收上一个插件的返回值(瀑布)

* 异步执行插件

* 保护模式终止插件执行: 一旦某个插件返回 non-`undefined`，会退出运行流程并返回 *这个插件的返回值*。这看起来像 `EventEmitter` 的 `once()`，但他们是完全不同的。


## 示例

webpack 的其中一个 Tapable 实例 [Compiler](/api/plugins/compiler)， 它的职责是编译 webpack 的配置对象，并返回一个 [Compilation](/api/plugins/compilation) 实例。当 Compilation 实例运行时，它会创建所需的 bundle。

下面是一个使用 `Tapable` 的小例子。

**node_modules/webpack/lib/Compiler.js**

```javascript
var Tapable = require("tapable");
function Compiler() {
	Tapable.call(this);
}
Compiler.prototype = Object.create(Tapable.prototype);
```

接着写一个编译器的插件

**my-custom-plugin.js**

```javascript
function CustomPlugin() {}
CustomPlugin.prototype.apply = function(compiler) {
    compiler.plugin('emit', pluginFunction);
}
```

这个编译器会依下面的代码在合适的生命周期点执行插件

**node_modules/webpack/lib/Compiler.js**

```javascript
this.apply*("emit",options) // 将会更新 'emit' 名称下的所有插件，并执行它们。
```

***

> 原文：https://webpack.js.org/pluginsapi/tapable/
